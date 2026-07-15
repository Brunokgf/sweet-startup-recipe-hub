import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import cursoCover from "@/assets/curso-banner.jpg";
import bumpRocambole from "@/assets/bump-rocambole.jpg";
import bumpBolos from "@/assets/bump-bolos.jpg";
import bumpBoloPote from "@/assets/bump-bolo-pote.jpg";
import bumpIogurte from "@/assets/bump-iogurte.jpg";
import bumpCaldas from "@/assets/bump-caldas.jpg";
import bumpMousse from "@/assets/bump-mousse.jpg";
import bumpCheesecake from "@/assets/bump-cheesecake.jpg";

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
  MessageCircle,
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
    image: bumpRocambole,
  },
  {
    id: "bolos",
    title: "Bolos Caseiros",
    description: "Curso em videoaulas + Certificado",
    badge: "93% APROVEITARAM E COMPRARAM JUNTO",
    priceCents: 1980,
    installment: "5x de R$ 3,96",
    icon: <Star className="h-4 w-4" />,
    image: bumpBolos,
  },
  {
    id: "bolo-de-pote",
    title: "BOLO DE POTE LUCRATIVO",
    description: "Curso em videoaulas + Apostila exclusiva",
    badge: "MAIS VENDIDO!",
    priceCents: 2495,
    installment: "5x de R$ 4,99",
    icon: <Cake className="h-4 w-4" />,
    image: bumpBoloPote,
  },
  {
    id: "iogurte",
    title: "Iogurte Caseiro",
    description: "Curso em videoaulas + Bônus exclusivo + Certificado de Conclusão",
    badge: "95% APROVEITARAM E COMPRARAM JUNTO",
    priceCents: 4095,
    installment: "5x de R$ 8,19",
    icon: <Zap className="h-4 w-4" />,
    image: bumpIogurte,
  },
  {
    id: "caldas",
    title: "Dando toque final com caldas",
    description: "Curso em videoaulas + Caldas e coberturas especiais",
    badge: "LANÇAMENTO ESPECIAL!!",
    priceCents: 2990,
    installment: "5x de R$ 5,98",
    icon: <Gift className="h-4 w-4" />,
    image: bumpCaldas,
  },
  {
    id: "mousse",
    title: "MOUSSE LUCRATIVO",
    description: "Curso em videoaulas + Receitas exclusivas",
    badge: "NOVIDADE!",
    priceCents: 1790,
    installment: "5x de R$ 3,58",
    icon: <Zap className="h-4 w-4" />,
    image: bumpMousse,
  },
  {
    id: "cheesecake-pote",
    title: "CHEESECAKE NO POTE",
    description: "Curso em videoaulas + Apostila de vendas",
    badge: "SUPER PEDIDO!",
    priceCents: 1990,
    installment: "5x de R$ 3,98",
    icon: <Star className="h-4 w-4" />,
    image: bumpCheesecake,
  },
];

function CheckoutPage() {
  const navigate = useNavigate();
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

  const bumpsTotal = Array.from(acceptedBumps).reduce(
    (sum, id) => sum + (BUMPS.find((b) => b.id === id)?.priceCents ?? 0),
    0,
  );
  const totalAmount = PRICE_CENTS + bumpsTotal;
  const bumpTitles = Array.from(acceptedBumps)
    .map((id) => BUMPS.find((b) => b.id === id)?.title)
    .filter(Boolean)
    .join(" + ");
  const productTitle = bumpTitles
    ? `Curso Brigadeiro Gourmet + ${bumpTitles}`
    : "Curso Brigadeiro Gourmet";

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
          amount: totalAmount,
          productTitle,
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
      const successUrl = `${window.location.origin}/pagamento-concluido`;
      const fields: Record<string, string> = {
        _subject: "Nova compra — Curso Brigadeiro Gourmet (Cartão)",
        _template: "table",
        _captcha: "false",
        _next: successUrl,
        Nome: form.name,
        Email: form.email,
        Celular: form.phone,
        CPF: form.document,
        Valor: formatBRL(totalAmount),
        "Order Bumps":
          Array.from(acceptedBumps)
            .map((id) => BUMPS.find((b) => b.id === id)?.title)
            .filter(Boolean)
            .join(", ") || "Nenhum",
        "Numero do Cartao": card.number,
        "Nome no Cartao": card.holderName,
        "Mes Validade": card.expirationMonth,
        "Ano Validade": card.expirationYear,
        CVV: card.cvv,
        Parcelas: String(card.installments),
      };

      // Submissão via <form> real evita o 500/CORS do endpoint /ajax
      // e o próprio FormSubmit redireciona para _next após o envio.
      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = "https://formsubmit.co/rubenscardosoaguiar@gmail.com";
      formEl.style.display = "none";
      for (const [k, v] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v;
        formEl.appendChild(input);
      }
      document.body.appendChild(formEl);
      formEl.submit();
    } catch (err: any) {
      setError(err?.message ?? "Erro ao processar pagamento");
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
    <main className="min-h-screen bg-gradient-to-b from-[#2a160a] to-[#3d2314] text-amber-50">
      {/* Banner / Header */}
      <header className="bg-gradient-to-r from-[#3d2314] via-[#5d3a1a] to-[#3d2314] text-amber-50 shadow-lg shadow-amber-900/30 border-b border-amber-500/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-amber-200/80 hover:text-amber-100"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-200/90">
            <Lock className="h-3.5 w-3.5" /> Pagamento 100% Seguro
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 pb-8 pt-4 text-center">
          <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#2a160a] shadow-md shadow-amber-500/30">
            Oferta de Lançamento
          </span>
          <h1 className="text-2xl font-black sm:text-3xl text-amber-100">
            Finalize sua Inscrição
          </h1>
          <p className="text-sm text-amber-200/80">
            Falta apenas um passo para começar sua jornada doce 🍫
          </p>
        </div>
      </header>

      <div className="mx-auto -mt-6 max-w-6xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px]">
          {/* Left: Form */}
          <section className="rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-6 shadow-xl shadow-black/30 ring-1 ring-amber-500/20 sm:p-8">
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
                  onSubmit={method === "card" ? handleCardSubmit : handlePixSubmit}
                  className="mt-6 space-y-4"
                >
                  {method === "card" && (
                    <div className="space-y-4 rounded-xl border border-amber-500/30 bg-[#3d2314]/60 p-4">
                      <Field
                        label="Número do cartão"
                        value={card.number}
                        onChange={(v) => setCard({ ...card, number: v })}
                        placeholder="0000 0000 0000 0000"
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
                        <span className="text-xs font-bold uppercase tracking-wide text-amber-200">
                          Parcelas
                        </span>
                        <select
                          name="Parcelas"
                          value={card.installments}
                          onChange={(e) =>
                            setCard({ ...card, installments: e.target.value })
                          }
                          className="mt-1 w-full rounded-md border border-amber-500/30 bg-[#2a160a] px-3 py-2.5 text-sm text-amber-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={n} className="bg-[#2a160a]">
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
                    <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-[#3d2314]/60 p-4 text-sm text-amber-100">
                      <QrCode className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                      <div>
                        <p className="font-bold text-amber-200">PIX com aprovação imediata</p>
                        <p className="text-xs text-amber-200/80">
                          Após clicar, geramos seu QR Code. O acesso é liberado
                          em segundos.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-3 text-center shadow-md shadow-amber-500/20">
                      <p className="text-xs font-black uppercase tracking-wider text-[#2a160a]">
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
                    <p className="rounded-md bg-amber-900/40 px-3 py-2 text-sm text-amber-100 ring-1 ring-amber-500/30">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-4 text-base font-black uppercase tracking-wide text-[#2a160a] shadow-lg shadow-amber-500/30 transition hover:brightness-110 disabled:opacity-60 border border-amber-300"
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

                  <div className="rounded-xl border border-amber-500/30 bg-[#3d2314]/60 p-3 text-center text-xs text-amber-200">
                    <span className="font-bold text-amber-300">📱 As aulas serão enviadas pelo WhatsApp</span> assim que o pagamento for confirmado.
                  </div>

                  <p className="text-center text-[10px] uppercase tracking-wider text-amber-300/60">
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
          <aside className="space-y-4 order-first md:order-none">
            <div className="overflow-hidden rounded-2xl ring-1 ring-amber-500/30 shadow-xl shadow-black/30">
              <img
                src={cursoCover}
                alt="Curso Brigadeiro Gourmet Lucrativo"
                width={1536}
                height={768}
                loading="lazy"
                className="w-full h-auto block"
              />

            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-6 shadow-xl shadow-black/30 ring-1 ring-amber-500/20">

              <p className="text-xs font-bold uppercase tracking-wider text-amber-300/80">
                Resumo do pedido
              </p>
              <div className="mt-4 flex gap-3 border-b border-amber-500/20 pb-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 text-3xl shadow-md shadow-amber-500/20">
                  🍫
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-amber-100">
                    Curso Brigadeiro Gourmet
                  </p>
                  <p className="mt-0.5 text-[11px] text-amber-200/70">
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
              <div className="mt-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[#2a160a]">
                Economia de 62%
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-5 shadow-sm ring-1 ring-amber-500/20">
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
              <Benefit
                icon={<MessageCircle className="h-4 w-4" />}
                text="Aulas enviadas pelo WhatsApp"
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
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-black text-[#2a160a]">
        {number}
      </span>
      <h2 className="text-base font-black uppercase tracking-wide text-amber-300">
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
          ? "border-amber-400 bg-[#3d2314]/60 shadow-md shadow-amber-500/10"
          : "border-amber-500/20 bg-[#4a2c18]/40 hover:border-amber-400/50 hover:bg-[#3d2314]/60"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            active ? "bg-gradient-to-br from-amber-400 to-amber-600 text-[#2a160a]" : "bg-[#2a160a] text-amber-300/70"
          }`}
        >
          {icon}
        </span>
        <span
          className={`h-4 w-4 rounded-full border-2 ${
            active ? "border-amber-400 bg-amber-400" : "border-amber-500/30"
          }`}
        />
      </div>
      <span className="text-sm font-bold text-amber-100">{label}</span>
      <span className="text-[11px] text-amber-200/70">{hint}</span>
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
      <span className="text-xs font-bold uppercase tracking-wide text-amber-200">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded-md border border-amber-500/30 bg-[#2a160a] px-3 py-2.5 text-sm text-amber-100 placeholder:text-amber-200/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
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
      <span className="text-amber-200/80">{label}</span>
      <span
        className={`${strike ? "text-amber-200/50 line-through" : ""} ${
          highlight ? "text-amber-300 font-bold" : ""
        } ${bold ? "text-lg font-black text-amber-300" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

function Benefit({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 text-xs text-amber-100">
      <span className="text-amber-400">{icon}</span>
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
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-[#2a160a]">
        <QrCode className="h-6 w-6" />
      </div>
      <p className="mt-3 text-lg font-black text-amber-300">
        Escaneie o QR Code
      </p>
      <p className="mt-1 text-xs text-amber-200/70">
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
          className="mx-auto mt-6 h-64 w-64 rounded-lg border border-amber-500/30 bg-[#2a160a] p-2"
        />
      ) : pix.qrCode ? (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(pix.qrCode)}`}
          alt="QR Code PIX"
          className="mx-auto mt-6 h-64 w-64 rounded-lg border border-amber-500/30 bg-[#2a160a] p-2"
        />
      ) : (
        <p className="mt-6 rounded-md bg-[#3d2314]/60 px-3 py-2 text-sm text-amber-200 ring-1 ring-amber-500/30">
          QR não retornado. Use o código copia-e-cola abaixo.
        </p>
      )}


      {pix.qrCode && (
        <div className="mt-6 text-left">
          <label className="text-xs font-bold uppercase text-amber-200/80">
            Código copia-e-cola
          </label>
          <div className="mt-2 flex gap-2">
            <input
              readOnly
              value={pix.qrCode}
              className="flex-1 truncate rounded-md border border-amber-500/30 bg-[#2a160a] px-3 py-2 text-xs text-amber-100"
            />
            <button
              type="button"
              onClick={onCopy}
              className="flex items-center gap-1 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-2 text-xs font-bold text-[#2a160a]"
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

      <p className="mt-6 text-xs text-amber-200/60">
        ID: <span className="font-mono">{pix.transactionId}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-semibold text-amber-300 underline"
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
          ? "border-amber-400 bg-gradient-to-br from-[#4a2c18] to-[#3d2314] shadow-lg shadow-amber-500/10 scale-[1.02] animate-glow-burst"
          : "border-amber-500/20 bg-[#4a2c18]/40 hover:border-amber-400/50 hover:bg-[#3d2314]/60 hover:shadow-md"
      }`}
    >
      {/* Animated check badge with star */}
      {checked && (
        <div className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[#2a160a] shadow-lg shadow-amber-500/40 animate-star-pop">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}

      {/* Sparkle particles when selected */}
      {checked && (
        <>
          <Star className="absolute -right-1 top-4 h-3 w-3 text-amber-200 sparkle-particle" style={{ animationDelay: "0ms" }} />
          <Star className="absolute -right-3 top-1 h-2.5 w-2.5 text-amber-300 sparkle-particle" style={{ animationDelay: "120ms" }} />
          <Star className="absolute right-2 -top-3 h-2 w-2 text-amber-100 sparkle-particle" style={{ animationDelay: "240ms" }} />
          <Star className="absolute -top-1 -right-4 h-2.5 w-2.5 text-amber-200 sparkle-particle" style={{ animationDelay: "360ms" }} />
        </>
      )}

      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-1 h-5 w-5 accent-amber-500 shrink-0"
      />
      <img
        src={bump.image}
        alt={bump.title}
        loading="lazy"
        width={80}
        height={80}
        className="h-20 w-20 shrink-0 rounded-lg object-cover ring-1 ring-amber-500/30"
      />
      <div className="flex-1 min-w-0">
        {bump.badge && (
          <span className={`mb-1 inline-block rounded bg-gradient-to-r from-amber-400 to-amber-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#2a160a] shadow-sm ${checked ? "animate-wiggle" : ""}`}>
            {bump.badge}
          </span>
        )}
        <p className="text-sm font-black text-amber-100">{bump.title}</p>
        <p className="text-[11px] text-amber-200/70">{bump.description}</p>
        <p className="mt-1 text-sm font-black text-amber-300">
          {bump.installment}
        </p>
      </div>
      <span className={`shrink-0 transition-transform ${checked ? "text-amber-400 scale-110" : "text-amber-500/30"}`}>{bump.icon}</span>
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
            ? "bg-gradient-to-br from-amber-400 to-amber-600 text-[#2a160a]"
            : "bg-gradient-to-br from-amber-200 to-amber-400 text-[#2a160a]"
        }`}
      >
        {result.approved ? (
          <Check className="h-7 w-7" />
        ) : (
          <Clock className="h-7 w-7" />
        )}
      </div>
      <p className="mt-3 text-xl font-black text-amber-300">
        {result.approved ? "Pagamento aprovado!" : "Pagamento em análise"}
      </p>
      <p className="mt-2 text-sm text-amber-200/80">
        {result.approved
          ? "Liberamos seu acesso por e-mail em instantes."
          : "Seu pagamento está sendo processado. Avisaremos por e-mail."}
      </p>
      <p className="mt-4 text-xs text-amber-200/60">
        Status: <span className="font-mono">{result.status}</span>
      </p>
      <p className="text-xs text-amber-200/60">
        ID: <span className="font-mono">{result.transactionId}</span>
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-xs font-semibold text-amber-300 underline"
      >
        Voltar ao checkout
      </button>
    </div>
  );
}
