import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_MEDUSA_BASE = "https://api.medusapayoficial.pro/api/v1";

function pick(obj: any, keys: string[]): string | null {
  for (const k of keys) {
    const parts = k.split(".");
    let cur = obj;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in cur) cur = cur[p];
      else {
        cur = undefined;
        break;
      }
    }
    if (typeof cur === "string" && cur.length > 0) return cur;
  }
  return null;
}

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
            productTitle = "Brigadeiro Gourmet",
            externalRef,
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
          const MEDUSA_URL = `${base}/transactions`;

          const authHeader =
            "Basic " + Buffer.from(`${secret}:x`).toString("base64");

          const payload = {
            paymentMethod: "pix",
            pix: { expiresInDays: 1 },
            items: [
              {
                title: productTitle,
                quantity: 1,
                tangible: false,
                unitPrice: amount,
              },
            ],
            amount,
            customer: {
              name,
              email,
              phone: String(phone).replace(/\D/g, ""),
              document: {
                type: "cpf",
                number: String(document).replace(/\D/g, ""),
              },
            },
            externalRef: externalRef ?? `order_${Date.now()}`,
          };

          const res = await fetch(MEDUSA_URL, {
            method: "POST",
            headers: {
              authorization: authHeader,
              "x-api-key": secret,
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

          const data = json?.data ?? json;

          const qrCodeBase64 = pick(data, [
            "pix.qrcodeBase64",
            "pix.qrCodeBase64",
            "pix.encodedImage",
            "pix.base64",
            "qrcodeBase64",
            "qrCodeBase64",
            "encodedImage",
          ]);

          const qrCode = pick(data, [
            "pix.qrcode",
            "pix.qrCode",
            "pix.payload",
            "pix.copyPaste",
            "pix.code",
            "qrcode",
            "qrCode",
            "payload",
          ]);

          const transactionId =
            pick(data, ["secureId", "id"]) ?? String(data?.id ?? "");

          return Response.json({
            ok: true,
            transactionId,
            qrCodeBase64,
            qrCode,
            secureUrl: pick(data, ["secureUrl"]),
            status: data?.status ?? "pending",
            raw: data,
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
