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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2a160a] to-[#3d2314] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-8 text-center shadow-xl shadow-black/30 ring-1 ring-amber-500/20 sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600">
          <CheckCircle2 className="h-12 w-12 text-[#2a160a]" />
        </div>
        <h1 className="mt-6 text-2xl font-black text-amber-100 sm:text-3xl">
          Pagamento Concluído!
        </h1>
        <p className="mt-3 text-sm text-amber-200/80 sm:text-base">
          Recebemos seus dados com sucesso. Assim que o pagamento for
          confirmado, nossa equipe enviará as aulas e o acesso ao curso
          diretamente pelo seu <strong className="text-amber-300">WhatsApp</strong>.
        </p>
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
