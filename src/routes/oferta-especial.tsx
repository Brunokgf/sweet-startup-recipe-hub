import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { loadOrder, saveOrder, upsellEligible, type Order } from "@/lib/order";
import { useReturnAfterPay } from "@/lib/use-return-after-pay";

export const Route = createFileRoute("/oferta-especial")({
  component: Upsell,
  head: () => ({
    meta: [
      { title: "Oferta Única — Combo de Cursos Extras" },
      { name: "description", content: "Oferta exclusiva: leve 7 cursos extras de doces lucrativos por R$67." },
      { property: "og:title", content: "Oferta Única — Combo de Cursos Extras" },
      { property: "og:description", content: "Oferta exclusiva: leve 7 cursos extras de doces lucrativos por R$67." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const COMBO = [
  "Bolo de Pote Lucrativo (+30 receitas)",
  "Mousse Lucrativo (+20 receitas)",
  "Cheesecake no Pote (+25 receitas)",
  "Bolos Caseiros (+25 receitas)",
  "Caldas e Coberturas (+15 receitas)",
  "Iogurte Caseiro (+20 receitas)",
  "Curso Rocambole Lucrativo (+15 receitas)",
];

function Upsell() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pix, setPix] = useState<{ qrCodeBase64: string | null; qrCode: string | null } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const o = loadOrder();
    if (!upsellEligible(o)) {
      navigate({ to: "/pagamento-concluido", replace: true });
      return;
    }
    setOrder(o);
  }, [navigate]);

  const goBack = () => navigate({ to: "/checkout" });

  const accept = async () => {
    if (!order) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/public/medusapay/create-pix", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...order.customer, amount: 6700, productTitle: "Combo 7 Cursos Extras (upsell)" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error("Não foi possível gerar o PIX agora. Tente novamente.");
      setPix(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const paid = () => {
    if (!order) return;
    saveOrder({
      ...order,
      upsellDecided: true,
      items: [...order.items, { title: "Combo 7 Cursos Extras", cents: 6700, charge: "upsell" }],
    });
    navigate({ to: "/pagamento-concluido" });
  };

  useReturnAfterPay(!!pix, paid);

  if (!order) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2a160a] to-[#3d2314] px-4 py-10 text-amber-50">
      <div className="mx-auto max-w-lg rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-6 text-center shadow-xl ring-1 ring-amber-500/30 sm:p-8">
        <p className="text-2xl font-black text-amber-300">🎉 Seu acesso ao Brigadeiro Gourmet está garantido!</p>
        <p className="mt-3 text-sm text-amber-200/80">
          Antes de continuar, uma oferta única (só aparece agora, não vai aparecer de novo):
        </p>
        <h1 className="mt-5 text-xl font-black uppercase text-amber-100">
          Leve TODOS os cursos extras com quase 60% de desconto
        </h1>
        <p className="mt-3 text-sm text-amber-200/80">
          Você acabou de garantir o Brigadeiro Gourmet. Que tal completar seu cardápio de vendas com 7 cursos extras e virar referência em doces na sua região?
        </p>
        <ul className="mt-5 space-y-2 text-left text-sm">
          {COMBO.map((c) => (
            <li key={c} className="flex gap-2"><span>✅</span>{c}</li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl bg-[#2a160a]/60 p-4 ring-1 ring-amber-500/30">
          <p className="text-sm text-amber-200/70">Valor separado: <span className="line-through">R$ 164,00</span></p>
          <p className="text-2xl font-black text-amber-300">Hoje, só nesse combo: R$ 67,00</p>
          <p className="mt-2 text-xs text-amber-200/80">
            Você economiza R$ 97,00 — e ainda leva mais de 150 receitas extras pra diversificar seu cardápio.
          </p>
        </div>

        {!pix ? (
          <>
            <p className="mt-5 text-[11px] font-semibold text-amber-300/80">
              ⚠️ Essa é uma cobrança adicional de R$67, separada do pedido que você já fez.
            </p>
            {error && <p className="mt-3 text-sm text-amber-100">{error}</p>}
            <button
              onClick={accept}
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-4 text-sm font-black uppercase text-[#2a160a] shadow-lg disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "SIM, QUERO O COMBO POR R$67 🔥"}
            </button>
            <button onClick={goBack} className="mt-4 block w-full text-center text-xs text-amber-200/70 underline">
              Voltar para a página anterior
            </button>
          </>
        ) : (
          <div className="mt-6">
            <p className="font-bold text-amber-300">Pague R$ 67,00 com PIX (cobrança adicional)</p>
            <img
              src={
                pix.qrCodeBase64
                  ? pix.qrCodeBase64.startsWith("data:") ? pix.qrCodeBase64 : `data:image/png;base64,${pix.qrCodeBase64}`
                  : `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=10&data=${encodeURIComponent(pix.qrCode ?? "")}`
              }
              alt="QR Code PIX do combo"
              className="mx-auto mt-4 h-60 w-60 rounded-lg bg-white p-2"
            />
            {pix.qrCode && (
              <button
                onClick={async () => { await navigator.clipboard.writeText(pix.qrCode!); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="mt-4 inline-flex items-center gap-1 rounded-md bg-amber-500 px-4 py-2 text-xs font-bold text-[#2a160a]"
              >
                {copied ? <><Check className="h-3.5 w-3.5" /> Copiado</> : <><Copy className="h-3.5 w-3.5" /> Copiar código PIX</>}
              </button>
            )}
            <button onClick={paid} className="mt-5 block w-full rounded-xl bg-emerald-600 py-3 text-sm font-black uppercase text-white">
              APÓS O PAGAMENTO, GARANTA SEU ACESSO 🔓
            </button>
            <button onClick={goBack} className="mt-3 block w-full text-center text-xs text-amber-200/70 underline">Voltar para a página anterior</button>
          </div>
        )}
      </div>
    </main>
  );
}
