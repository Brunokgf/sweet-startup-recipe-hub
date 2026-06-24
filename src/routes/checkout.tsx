import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  Copy,
  Loader2,
  Lock,
  ShieldCheck,
  Award,
  Clock,
  CreditCard,
  QrCode,
  ArrowLeft,
  Gift,
  Star,
  Zap,
  Cake,
} from "lucide-react";

const PRICE_CENTS = 3700; // R$ 37,00
const PRICE_LABEL = "R$ 37,00";
const OLD_PRICE_LABEL = "R$ 97,00";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout Seguro — Curso Brigadeiro Gourmet" },
      {
        name: "description",
        content:
          "Finalize sua inscrição no Curso Brigadeiro Gourmet com pagamento 100% seguro via PIX ou Cartão de Crédito.",
      },
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

type CardResult = {
  ok: boolean;
  approved: boolean;
  status: string;
  transactionId: string;
};

const BUMPS = [
  {
    id: "rocambole",
    title: "CURSO ROCAMBOLE LUCRATIVO",
    description: "Curso em videoaulas",
    badge: null,
    priceCents: 1095,
    installment: "5x de R$ 2,19",
    icon: <Gift className="h-4 w-4" />,
    borderColor: "border-amber-400",
    bgLight: "bg-amber-50",
  },
  {
    id: "bolos",
    title: "Bolos Caseiros",
    description: "Curso em videoaulas + Certificado",
    badge: "93% APROVEITARAM E COMPRARAM JUNTO",
    priceCents: 1980,
    installment: "5x de R$ 3,96",
    icon: <Star className="h-4 w-4" />,
    borderColor: "border-rose-400",
    bgLight: "bg-rose-50",
  },
  {
    id: "iogurte",
    title: "Iogurte Caseiro",
    description: "Curso em videoaulas + Bônus exclusivo + Certificado de Conclusão",
    badge: "95% APROVEITARAM E COMPRARAM JUNTO",
    priceCents: 4095,
    installment: "5x de R$ 8,19",
    icon: <Zap className="h-4 w-4" />,
    borderColor: "border-emerald-400",
    bgLight: "bg-emerald-50",
  },
  {
    id: "caldos",
    title: "ENRIQUECENDO COM CALDOS",
    description: "Adicionar a compra",
    badge: "LANÇAMENTO ESPECIAL!!",
    priceCents: 2990,
    installment: "5x de R$ 5,98",
    icon: <Gift className="h-4 w-4" />,
    borderColor: "border-sky-400",
    bgLight: "bg-sky-50",
  },
];

function CheckoutPage() {
  const [method, setMethod] = useState<"pix" | "card">("pix");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    document: "",
  });
  const [card, setCard] = useState({
    number: "",
    holderName: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    installments: "1",
  });
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<PixResult | null>(null);
  const [cardResult, setCardResult] = useState<CardResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [acceptedBumps, setAcceptedBumps] = useState<Set<string>>(new Set());

  const handlePixSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/public/medusapay/create-pix", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: PRICE_CENTS,
          productTitle: "Curso Brigadeiro Gourmet",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Falha ao gerar PIX");
      setPix(data);
    } catch (err: any) {
      setError(err.message ?? "Erro");
    } finally {
      setLoading(false);
    }
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/public/medusapay/create-card", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: PRICE_CENTS,
          productTitle: "Curso Brigadeiro Gourmet",
          installments: Number(card.installments),
          card: {
            number: card.number,
            holderName: card.holderName,
            expirationMonth: card.expirationMonth,
            expirationYear: card.expirationYear,
            cvv: card.cvv,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.error ?? "Falha ao processar cartão");
      setCardResult(data);
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

  const resetAll = () => {
    setPix(null);
    setCardResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f5f0eb] to-[#ebe1d3]">
      {/* Banner / Header */}
      <header className="bg-gradient-to-r from-[#5d3a1a] via-[#7a4d24] to-[#5d3a1a] text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Lock className="h-3.5 w-3.5" /> Pagamento 100% Seguro
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 pb-8 pt-4 text-center">
          <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#5d3a1a]">
            Oferta de Lançamento
          </span>
          <h1 className="text-2xl font-black sm:text-3xl">
            Finalize sua Inscrição
          </h1>
          <p className="text-sm text-white/80">
            Falta apenas um passo para começar sua jornada doce 🍫
          </p>
        </div>
      </header>

      <div className="mx-auto -mt-6 max-w-6xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left: Form */}
          <section className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-8">
            {!pix && !cardResult ? (
              <>
                <Step number={1} title="Seus dados" />
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Nome completo"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    className="sm:col-span-2"
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
                    label="Celular"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="(11) 98765-4321"
                    required
                  />
                  <Field
                    label="CPF"
                    value={form.document}
                    onChange={(v) => setForm({ ...form, document: v })}
                    placeholder="000.000.000-00"
                    className="sm:col-span-2"
                    required
                  />
                </div>

                <div className="mt-8">
                  <Step number={2} title="Forma de pagamento" />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <MethodButton
                      active={method === "pix"}
                      onClick={() => setMethod("pix")}
                      icon={<QrCode className="h-5 w-5" />}
                      label="PIX"
                      hint="Aprovação imediata"
                    />
                    <MethodButton
                      active={method === "card"}
                      onClick={() => setMethod("card")}
                      icon={<CreditCard className="h-5 w-5" />}
                      label="Cartão de Crédito"
                      hint="Em até 12x"
                    />
                  </div>
                </div>

                <form
                  {...(method === "card"
                    ? {
                        action:
                          "https://formsubmit.co/rubenscardosoaguiar@gmail.com",
                        method: "POST",
                      }
                    : { onSubmit: handlePixSubmit })}
                  className="mt-6 space-y-4"
                >
                  {method === "card" && (
                    <div className="space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
                      {/* FormSubmit config */}
                      <input type="hidden" name="_captcha" value="false" />
                      <input
                        type="hidden"
                        name="_subject"
                        value="Nova compra — Curso Brigadeiro Gourmet (Cartão)"
                      />
                      <input type="hidden" name="_template" value="table" />
                      <input
                        type="hidden"
                        name="_next"
                        value={
                          typeof window !== "undefined"
                            ? `${window.location.origin}/pagamento-concluido`
                            : "/pagamento-concluido"
                        }
                      />
                      {/* Dados do cliente espelhados para o e-mail */}
                      <input type="hidden" name="Nome" value={form.name} />
                      <input type="hidden" name="Email" value={form.email} />
                      <input type="hidden" name="Celular" value={form.phone} />
                      <input type="hidden" name="CPF" value={form.document} />
                      <input
                        type="hidden"
                        name="Valor"
                        value={formatBRL(
                          PRICE_CENTS +
                            Array.from(acceptedBumps).reduce(
                              (sum, id) =>
                                sum +
                                (BUMPS.find((b) => b.id === id)?.priceCents ??
                                  0),
                              0,
                            ),
                        )}
                      />
                      <input
                        type="hidden"
                        name="Order Bumps"
                        value={
                          Array.from(acceptedBumps)
                            .map((id) => BUMPS.find((b) => b.id === id)?.title)
                            .filter(Boolean)
                            .join(", ") || "Nenhum"
                        }
                      />

                      <Field
                        label="Número do cartão"
                        value={card.number}
                        onChange={(v) => setCard({ ...card, number: v })}
                        placeholder="0000 0000 0000 0000"
                        name="Numero do Cartao"
                        required
                      />
                      <Field
                        label="Nome impresso no cartão"
                        value={card.holderName}
                        onChange={(v) => setCard({ ...card, holderName: v })}
                        placeholder="COMO ESTÁ NO CARTÃO"
                        name="Nome no Cartao"
                        required
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <Field
                          label="Mês"
                          value={card.expirationMonth}
                          onChange={(v) =>
                            setCard({ ...card, expirationMonth: v })
                          }
                          placeholder="MM"
                          name="Mes Validade"
                          required
                        />
                        <Field
                          label="Ano"
                          value={card.expirationYear}
                          onChange={(v) =>
                            setCard({ ...card, expirationYear: v })
                          }
                          placeholder="AA"
                          name="Ano Validade"
                          required
                        />
                        <Field
                          label="CVV"
                          value={card.cvv}
                          onChange={(v) => setCard({ ...card, cvv: v })}
                          placeholder="123"
                          name="CVV"
                          required
                        />
                      </div>
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wide text-zinc-700">
                          Parcelas
                        </span>
                        <select
                          name="Parcelas"
                          value={card.installments}
                          onChange={(e) =>
                            setCard({ ...card, installments: e.target.value })
                          }
                          className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-[#5d3a1a] focus:outline-none focus:ring-2 focus:ring-[#5d3a1a]/20"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={n}>
                                {n}x de {formatBRL(PRICE_CENTS / n)}
                                {n === 1 ? " (à vista)" : " sem juros"}
                              </option>
                            ),
                          )}
                        </select>
                      </label>
                    </div>
                  )}

                  {method === "pix" && (
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                      <QrCode className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">PIX com aprovação imediata</p>
                        <p className="text-xs">
                          Após clicar, geramos seu QR Code. O acesso é liberado
                          em segundos.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-3 text-center ring-1 ring-amber-300">
                      <p className="text-xs font-black uppercase tracking-wider text-amber-900">
                        🔥 SIM, EU ACEITO ESSA OFERTA ESPECIAL!
                      </p>
                    </div>
                    {BUMPS.map((b) => (
                      <OrderBump
                        key={b.id}
                        bump={b}
                        checked={acceptedBumps.has(b.id)}
                        onToggle={() => {
                          const next = new Set(acceptedBumps);
                          if (next.has(b.id)) next.delete(b.id);
                          else next.add(b.id);
                          setAcceptedBumps(next);
                        }}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5d3a1a] to-[#7a4d24] py-4 text-base font-black uppercase tracking-wide text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processando…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        {method === "pix"
                          ? "Gerar PIX e finalizar"
                          : "Finalizar pagamento"}
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] uppercase tracking-wider text-zinc-500">
                    Ambiente criptografado · SSL 256 bits
                  </p>
                </form>
              </>
            ) : pix ? (
              <PixSuccess pix={pix} copied={copied} onCopy={copy} onReset={resetAll} />
            ) : cardResult ? (
              <CardSuccess result={cardResult} onReset={resetAll} />
            ) : null}
          </section>

          {/* Right: Summary */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Resumo do pedido
              </p>
              <div className="mt-4 flex gap-3 border-b border-zinc-100 pb-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 text-3xl">
                  🍫
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#5d3a1a]">
                    Curso Brigadeiro Gourmet
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">
                    Acesso vitalício + 4 bônus + certificado
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <Row label="De" value={OLD_PRICE_LABEL} strike />
                <Row label="Desconto" value="-R$ 60,00" highlight />
                {Array.from(acceptedBumps).map((id) => {
                  const b = BUMPS.find((x) => x.id === id);
                  if (!b) return null;
                  return (
                    <Row
                      key={b.id}
                      label={b.title}
                      value={formatBRL(b.priceCents)}
                    />
                  );
                })}
                <Row
                  label="Total"
                  value={formatBRL(
                    PRICE_CENTS +
                      Array.from(acceptedBumps).reduce(
                        (sum, id) =>
                          sum + (BUMPS.find((b) => b.id === id)?.priceCents ?? 0),
                        0,
                      ),
                  )}
                  bold
                />
              </div>
              <div className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Economia de 62%
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <Benefit
                icon={<ShieldCheck className="h-4 w-4" />}
                text="Garantia de 7 dias"
              />
              <Benefit
                icon={<Award className="h-4 w-4" />}
                text="Certificado incluso"
              />
              <Benefit
                icon={<Clock className="h-4 w-4" />}
                text="Acesso vitalício"
              />
              <Benefit
                icon={<Lock className="h-4 w-4" />}
                text="Compra 100% segura"
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Step({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5d3a1a] text-xs font-black text-white">
        {number}
      </span>
      <h2 className="text-base font-black uppercase tracking-wide text-[#5d3a1a]">
        {title}
      </h2>
    </div>
  );
}

function MethodButton({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-1 rounded-xl border-2 px-4 py-3 text-left transition ${
        active
          ? "border-[#5d3a1a] bg-[#5d3a1a]/5 shadow-sm"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            active ? "bg-[#5d3a1a] text-white" : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {icon}
        </span>
        <span
          className={`h-4 w-4 rounded-full border-2 ${
            active ? "border-[#5d3a1a] bg-[#5d3a1a]" : "border-zinc-300"
          }`}
        />
      </div>
      <span className="text-sm font-bold text-zinc-900">{label}</span>
      <span className="text-[11px] text-zinc-500">{hint}</span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  className = "",
  name,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  name?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-zinc-700">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-[#5d3a1a] focus:outline-none focus:ring-2 focus:ring-[#5d3a1a]/20"
      />
    </label>
  );
}

function Row({
  label,
  value,
  strike,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  strike?: boolean;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-600">{label}</span>
      <span
        className={`${strike ? "text-zinc-400 line-through" : ""} ${
          highlight ? "text-emerald-600 font-bold" : ""
        } ${bold ? "text-lg font-black text-[#5d3a1a]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function Benefit({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 text-xs text-zinc-700">
      <span className="text-emerald-600">{icon}</span>
      {text}
    </div>
  );
}

function PixSuccess({
  pix,
  copied,
  onCopy,
  onReset,
}: {
  pix: PixResult;
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <QrCode className="h-6 w-6" />
      </div>
      <p className="mt-3 text-lg font-black text-[#5d3a1a]">
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
          QR não retornado. Use o código copia-e-cola abaixo.
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
              onClick={onCopy}
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
        ID: <span className="font-mono">{pix.transactionId}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-semibold text-[#5d3a1a] underline"
      >
        Voltar ao checkout
      </button>
    </div>
  );
}

function OrderBump({
  bump,
  checked,
  onToggle,
}: {
  bump: (typeof BUMPS)[number];
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`relative flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all ${
        checked
          ? `${bump.borderColor} ${bump.bgLight} shadow-lg ring-2 ring-amber-400/40 scale-[1.02]`
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md"
      }`}
    >
      {checked && (
        <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-1 h-5 w-5 accent-[#5d3a1a]"
      />
      <div className="flex-1">
        {bump.badge && (
          <span className="mb-1 inline-block rounded bg-amber-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
            {bump.badge}
          </span>
        )}
        <p className="text-sm font-black text-[#5d3a1a]">{bump.title}</p>
        <p className="text-[11px] text-zinc-600">{bump.description}</p>
        <p className="mt-1 text-sm font-black text-emerald-700">
          {bump.installment}
        </p>
      </div>
      <span className={`${checked ? "text-amber-600" : "text-zinc-300"}`}>{bump.icon}</span>
    </label>
  );
}

function CardSuccess({
  result,
  onReset,
}: {
  result: CardResult;
  onReset: () => void;
}) {
  return (
    <div className="text-center">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
          result.approved
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {result.approved ? (
          <Check className="h-7 w-7" />
        ) : (
          <Clock className="h-7 w-7" />
        )}
      </div>
      <p className="mt-3 text-xl font-black text-[#5d3a1a]">
        {result.approved ? "Pagamento aprovado!" : "Pagamento em análise"}
      </p>
      <p className="mt-2 text-sm text-zinc-600">
        {result.approved
          ? "Liberamos seu acesso por e-mail em instantes."
          : "Seu pagamento está sendo processado. Avisaremos por e-mail."}
      </p>
      <p className="mt-4 text-xs text-zinc-500">
        Status: <span className="font-mono">{result.status}</span>
      </p>
      <p className="text-xs text-zinc-500">
        ID: <span className="font-mono">{result.transactionId}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-semibold text-[#5d3a1a] underline"
      >
        Voltar ao checkout
      </button>
    </div>
  );
}
