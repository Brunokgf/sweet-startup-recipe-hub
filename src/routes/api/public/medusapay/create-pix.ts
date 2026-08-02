import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_MEDUSA_BASE = "https://api.medusapayoficial.pro/api/v1";

export const Route = createFileRoute("/api/public/medusapay/create-pix")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const {
            amount,
            name,
            email,
            phone,
            document,
            productTitle = "Curso Brigadeiro Gourmet Lucrativo",
          } = body as Record<string, any>;

          if (
            typeof amount !== "number" ||
            amount < 100 ||
            !name ||
            !email ||
            !phone ||
            !document
          ) {
            return Response.json(
              { error: "Campos obrigatórios faltando." },
              { status: 400 },
            );
          }

          const secret =
            process.env.MEDUSAPAY_API_KEY ?? process.env.MEDUSAPAY_SECRET_KEY;
          if (!secret) {
            return Response.json(
              { error: "MEDUSAPAY_API_KEY não configurada." },
              { status: 500 },
            );
          }

          const base = (
            process.env.MEDUSAPAY_API_URL ?? DEFAULT_MEDUSA_BASE
          ).replace(/\/+$/, "");

          const payload = {
            clienteNome: String(name),
            clienteEmail: String(email),
            clienteCpf: String(document).replace(/\D/g, ""),
            clienteTelefone: String(phone).replace(/\D/g, ""),
            produto: productTitle,
            valor: Number((amount / 100).toFixed(2)),
            metodo: "PIX",
          };

          const res = await fetch(`${base}/api/pagamentos`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${secret}`,
              "content-type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(payload),
          });

          const raw = await res.text();
          let json: any = null;
          try {
            json = JSON.parse(raw);
          } catch {
            json = { raw };
          }

          if (!res.ok) {
            return Response.json(
              { error: "MedusaPay error", status: res.status, details: json },
              { status: 502 },
            );
          }

          const venda = json?.venda ?? {};
          const pixData = json?.dadosPagamento ?? venda?.dadosPix ?? {};

          const qrImage: string | null =
            json?.pixQrCode ?? pixData?.qrCode ?? null;
          const copiaECola: string | null =
            json?.pixCopiaECola ?? pixData?.copiaECola ?? null;

          return Response.json({
            ok: true,
            transactionId: String(venda?.id ?? pixData?.txid ?? ""),
            qrCodeBase64: qrImage,
            qrCode: copiaECola,
            secureUrl: null,
            status: venda?.status ?? "pendente",
          });
        } catch (err: any) {
          return Response.json(
            { error: err?.message ?? "Erro desconhecido" },
            { status: 500 },
          );
        }
      },
    },
  },
});
