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
            productTitle = "Brigadeiro Gourmet",
            externalRef,
            card,
            installments = 1,
          } = body as Record<string, any>;

          if (
            typeof amount !== "number" ||
            amount < 100 ||
            !name ||
            !email ||
            !phone ||
            !document ||
            !card?.number ||
            !card?.holderName ||
            !card?.expirationMonth ||
            !card?.expirationYear ||
            !card?.cvv
          ) {
            return Response.json(
              { error: "Campos obrigatórios faltando." },
              { status: 400 },
            );
          }

          const secret = process.env.MEDUSAPAY_SECRET_KEY;
          if (!secret) {
            return Response.json(
              { error: "MEDUSAPAY_SECRET_KEY não configurada." },
              { status: 500 },
            );
          }

          const authHeader =
            "Basic " + Buffer.from(`${secret}:x`).toString("base64");

          const payload = {
            paymentMethod: "credit_card",
            installments: Number(installments) || 1,
            card: {
              number: String(card.number).replace(/\D/g, ""),
              holderName: String(card.holderName).toUpperCase(),
              expirationMonth: String(card.expirationMonth).padStart(2, "0"),
              expirationYear: String(card.expirationYear).slice(-2),
              cvv: String(card.cvv).replace(/\D/g, ""),
            },
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
          const status = data?.status ?? "pending";
          const approved =
            status === "paid" ||
            status === "approved" ||
            status === "authorized";

          return Response.json({
            ok: true,
            approved,
            status,
            transactionId: String(data?.secureId ?? data?.id ?? ""),
            secureUrl: data?.secureUrl ?? null,
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
