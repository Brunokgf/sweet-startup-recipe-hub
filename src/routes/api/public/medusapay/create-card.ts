import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_MEDUSA_BASE = "https://api.medusapayoficial.pro/api/v1";

export const Route = createFileRoute("/api/public/medusapay/create-card")({
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
            cardToken,
            idempotencyKey,
            parcelas,
            bandeira,
            enderecoCep,
            enderecoLogradouro,
            enderecoNumero,
            enderecoComplemento,
            enderecoBairro,
            enderecoCidade,
            enderecoUf,
            returnUrl,
          } = body as Record<string, any>;

          if (
            typeof amount !== "number" ||
            amount < 100 ||
            !name ||
            !email ||
            !phone ||
            !document ||
            !cardToken ||
            !idempotencyKey ||
            !enderecoCep ||
            !enderecoLogradouro ||
            !enderecoNumero ||
            !enderecoBairro ||
            !enderecoCidade ||
            !enderecoUf
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

          const payload: Record<string, any> = {
            clienteNome: String(name),
            clienteEmail: String(email),
            clienteCpf: String(document).replace(/\D/g, ""),
            clienteTelefone: String(phone).replace(/\D/g, ""),
            produto: productTitle,
            valor: Number((amount / 100).toFixed(2)),
            metodo: "Cartao",
            cardToken: String(cardToken),
            idempotencyKey: String(idempotencyKey),
            enderecoCep: String(enderecoCep).replace(/\D/g, ""),
            enderecoLogradouro: String(enderecoLogradouro),
            enderecoNumero: String(enderecoNumero),
            enderecoBairro: String(enderecoBairro),
            enderecoCidade: String(enderecoCidade),
            enderecoUf: String(enderecoUf).slice(0, 2).toUpperCase(),
          };
          if (enderecoComplemento)
            payload.enderecoComplemento = String(enderecoComplemento);
          if (bandeira) payload.bandeira = String(bandeira).toLowerCase();
          if (returnUrl) payload.returnUrl = String(returnUrl);
          const nParcelas = Number(parcelas);
          if (Number.isInteger(nParcelas) && nParcelas >= 1 && nParcelas <= 12)
            payload.parcelas = nParcelas;

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
              {
                error:
                  "Não foi possível processar o cartão. Confira os dados ou tente outro cartão.",
                status: res.status,
                details: json,
              },
              { status: 502 },
            );
          }

          const venda = json?.venda ?? {};
          const status = venda?.status ?? "pendente";
          const approved = status === "pago" || status === "aprovada";

          return Response.json({
            ok: true,
            approved,
            status,
            transactionId: String(venda?.id ?? ""),
            cartaoPendente: json?.cartaoPendente ?? false,
            cartaoAcao3ds: json?.cartaoAcao3ds ?? null,
            cartaoCheckoutUrl: json?.cartaoCheckoutUrl ?? null,
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
