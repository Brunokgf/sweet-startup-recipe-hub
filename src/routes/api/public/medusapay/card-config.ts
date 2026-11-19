import { createFileRoute } from "@tanstack/react-router";

const DEFAULT_MEDUSA_BASE = "https://api.medusapayoficial.pro/api/v1";

export const Route = createFileRoute("/api/public/medusapay/card-config")({
  server: {
    handlers: {
      GET: async () => {
        try {
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

          const res = await fetch(`${base}/api/pagamentos/config-cartao`, {
            headers: {
              authorization: `Bearer ${secret}`,
              accept: "application/json",
            },
          });

          const json: any = await res.json().catch(() => null);
          if (!res.ok) {
            return Response.json(
              { error: "MedusaPay error", status: res.status, details: json },
              { status: 502 },
            );
          }

          return Response.json({
            publicToken: json?.cartao?.publicToken ?? null,
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
