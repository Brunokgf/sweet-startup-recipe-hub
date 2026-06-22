import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";

const PRICE_CENTS = 3700; // R$ 37,00

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — Brigadeiro Gourmet" },
      { name: "description", content: "Finalize sua inscrição via PIX." },
    ],
  }),
});

type PixResult = {
  ok: boolean;
  transactionId: string;
  qrCodeBase64: string | null;
  qrCode: string | null;
  secureUrl: string | null;
  status: string;
};

function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
  });
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/medusapay/create-pix", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: PRICE_CENTS,
          productTitle: "Curso Brigadeiro Gourmet",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Falha ao gerar PIX");
      }
      setPix(data);
    } catch (err: any) {
      setError(err.message ?? "Erro");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!pix?.qrCode) return;
    await navigator.clipboard.writeText(pix.qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#f5f0eb] py-10 px-4">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-black text-[#5d3a1a]">
          Finalizar Compra
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-600">
          Curso Brigadeiro Gourmet —{" "}
          <strong className="text-[#5d3a1a]">R$ 37,00</strong> via PIX
        </p>

        {!pix ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-[#e8ddd0]"
          >
            <Field
              label="Nome completo"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <Field
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
            <Field
              label="Celular (DDD + número)"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="11987654321"
              required
            />
            <Field
              label="CPF"
              value={form.document}
              onChange={(v) => setForm({ ...form, document: v })}
              placeholder="000.000.000-00"
              required
            />

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5d3a1a] py-4 text-base font-black uppercase tracking-wide text-white shadow-md transition hover:bg-[#4a2d14] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Gerando PIX…
                </>
              ) : (
                "Gerar PIX"
              )}
            </button>
            <p className="text-center text-[10px] uppercase tracking-wider text-zinc-500">
              Pagamento seguro via MedusaPay
            </p>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-[#e8ddd0]">
            <p className="text-sm font-bold uppercase tracking-wide text-[#5d3a1a]">
              Escaneie o QR Code
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Abra o app do seu banco e pague em segundos
            </p>

            {pix.qrCodeBase64 ? (
              <img
                src={
                  pix.qrCodeBase64.startsWith("data:")
                    ? pix.qrCodeBase64
                    : `data:image/png;base64,${pix.qrCodeBase64}`
                }
                alt="QR Code PIX"
                className="mx-auto mt-6 h-64 w-64 rounded-lg border border-zinc-200"
              />
            ) : (
              <p className="mt-6 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
                QR não retornado pela gateway. Use o código copia-e-cola abaixo.
              </p>
            )}

            {pix.qrCode && (
              <div className="mt-6 text-left">
                <label className="text-xs font-bold uppercase text-zinc-600">
                  Código copia-e-cola
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    readOnly
                    value={pix.qrCode}
                    className="flex-1 truncate rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={copy}
                    className="flex items-center gap-1 rounded-md bg-[#5d3a1a] px-3 py-2 text-xs font-bold text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <p className="mt-6 text-xs text-zinc-500">
              ID da transação: <span className="font-mono">{pix.transactionId}</span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Após o pagamento, o acesso será liberado no seu e-mail.
            </p>

            <button
              type="button"
              onClick={() => {
                setPix(null);
                setForm({ name: "", email: "", phone: "", document: "" });
              }}
              className="mt-6 text-xs font-semibold text-[#5d3a1a] underline"
            >
              Gerar novo PIX
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-zinc-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm focus:border-[#5d3a1a] focus:outline-none focus:ring-2 focus:ring-[#5d3a1a]/20"
      />
    </label>
  );
}
