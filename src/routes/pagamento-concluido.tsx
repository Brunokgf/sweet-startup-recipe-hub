import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Home } from "lucide-react";

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
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f5f0eb] to-[#ebe1d3] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5 sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>
        <h1 className="mt-6 text-2xl font-black text-[#5d3a1a] sm:text-3xl">
          Pagamento Concluído!
        </h1>
        <p className="mt-3 text-sm text-zinc-600 sm:text-base">
          Recebemos seus dados com sucesso. Assim que o pagamento for
          confirmado, nossa equipe enviará as aulas e o acesso ao curso
          diretamente pelo seu <strong>WhatsApp</strong>.
        </p>
        <div className="mt-6 rounded-xl bg-amber-50 p-4 text-left text-sm text-amber-900 ring-1 ring-amber-200">
          <p className="font-bold">📱 Próximos passos</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
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
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5d3a1a] to-[#7a4d24] px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:brightness-110"
        >
          <Home className="h-4 w-4" /> Voltar ao início
        </Link>
      </div>
    </main>
  );
}
