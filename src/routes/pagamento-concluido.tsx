import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Home, Gift, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { loadOrder, brl, upsellEligible, type Order } from "@/lib/order";

export const Route = createFileRoute("/pagamento-concluido")({
  component: PagamentoConcluido,
  head: () => ({
    meta: [
      { title: "Pagamento Concluído — Curso Brigadeiro Gourmet" },
      {
        name: "description",
        content:
          "Recebemos seus dados. Em instantes você receberá a confirmação e os acessos no seu e-mail.",
      },
    ],
  }),
});

function PagamentoConcluido() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => setOrder(loadOrder()), []);
  const principal = order?.items.filter((i) => i.charge === "principal") ?? [];
  const upsell = order?.items.filter((i) => i.charge === "upsell") ?? [];
  const showUpsell = upsellEligible(order);
  const sum = (l: { cents: number }[]) => l.reduce((a, b) => a + b.cents, 0);
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2a160a] to-[#3d2314] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-8 text-center shadow-xl shadow-black/30 ring-1 ring-amber-500/20 sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
          <CheckCircle2 className="h-12 w-12 text-[#2a160a]" />
        </div>
        <h1 className="mt-6 text-2xl font-black text-amber-100 sm:text-3xl">
          {showUpsell ? "Pagamento em confirmação" : "Pagamento Concluído!"}
        </h1>
        {showUpsell ? (
          <p className="mt-3 text-sm text-amber-200/80 sm:text-base">
            Pagamento em confirmação. Assim que recebermos a confirmação, enviaremos as aulas pelo{" "}
            <strong className="text-amber-300">WhatsApp</strong>.
          </p>
        ) : (
        <p className="mt-3 text-sm text-amber-200/80 sm:text-base">
          Recebemos seus dados com sucesso. Assim que o pagamento for
          confirmado, nossa equipe enviará as aulas e o acesso ao curso
          diretamente pelo seu <strong className="text-amber-300">WhatsApp</strong>.
        </p>
        )}
        {order && (
          <div className="mt-6 rounded-xl bg-[#2a160a]/60 p-4 text-left text-sm text-amber-100 ring-1 ring-amber-500/30">
            <p className="font-bold text-amber-300">🧾 Resumo do que você comprou</p>
            <p className="mt-2 text-xs font-semibold text-amber-200/80">Cobrança 1 — pedido principal</p>
            {principal.map((i) => (
              <div key={i.title} className="flex justify-between text-xs"><span>{i.title}</span><span>{brl(i.cents)}</span></div>
            ))}
            <div className="mt-1 flex justify-between text-xs font-bold"><span>Total cobrança 1</span><span>{brl(sum(principal))}</span></div>
            {upsell.length > 0 && (
              <>
                <p className="mt-3 text-xs font-semibold text-amber-200/80">Cobrança 2 — oferta adicional (separada)</p>
                {upsell.map((i) => (
                  <div key={i.title} className="flex justify-between text-xs"><span>{i.title}</span><span>{brl(i.cents)}</span></div>
                ))}
              </>
            )}
          </div>
        )}
        {showUpsell && (
          <Link
            to="/oferta-especial"
            className="mt-6 flex w-full animate-pulse items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-black uppercase text-white shadow-lg transition hover:bg-emerald-500"
          >
            <Gift className="h-5 w-5" /> Clique aqui e garanta um bônus 🎁
          </Link>
        )}
        <div className="mt-6 rounded-xl bg-[#2a160a]/60 p-4 text-left text-sm text-amber-100 ring-1 ring-amber-500/30">
          <p className="font-bold text-amber-300">📱 Próximos passos</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-200/80">
            <li>
              Assim que o pagamento for confirmado, você receberá as aulas pelo
              WhatsApp.
            </li>
            <li>Fique atento(a) às mensagens no seu celular.</li>
            <li>Qualquer dúvida, fale com nosso suporte no WhatsApp.</li>
          </ul>
        </div>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3 text-sm font-black uppercase tracking-wide text-[#2a160a] shadow-lg shadow-amber-500/30 transition hover:brightness-110"
        >
          <Home className="h-4 w-4" /> Voltar ao início
        </Link>
      </div>
    </main>
  );
}
