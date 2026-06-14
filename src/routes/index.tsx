import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Star, ChevronDown } from "lucide-react";

import heroBg from "@/assets/brigadeiro-hero.jpg";
import logo from "@/assets/logo-brigadeiro.png";
import sabores from "@/assets/sabores-brigadeiro.jpg";
import garantia from "@/assets/garantia-7dias.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Brigadeiro Gourmet — Receitas para Renda Extra" },
      {
        name: "description",
        content:
          "Aprenda a produzir Brigadeiros Gourmet e crie uma renda extra — mesmo começando do zero. +6.000 alunas já transformaram suas vidas.",
      },
    ],
  }),
});

const CHECKOUT_URL = "#"; // troque pelo link do Kiwify/Hotmart

const SABORES = [
  { nome: "TRADICIONAL", cor: "from-amber-800 to-amber-950" },
  { nome: "BEIJINHO", cor: "from-zinc-100 to-zinc-300" },
  { nome: "PISTACHE", cor: "from-green-400 to-emerald-600" },
  { nome: "MORANGO", cor: "from-pink-400 to-rose-600" },
  { nome: "OREO", cor: "from-zinc-700 to-zinc-900" },
  { nome: "AMENDOIN", cor: "from-amber-500 to-orange-700" },
];

const FAQS = [
  {
    q: "Meus dados estão protegidos nesse site?",
    a: "Sim, o site que gerencia nossos pagamentos é um dos maiores sites de cursos digitais do Brasil.",
  },
  { q: "Quais as formas de Pagamento?", a: "Cartão de Crédito e PIX." },
  {
    q: "Como vou acessar o curso?",
    a: "O acesso ao conteúdo será em uma área de alunas, com login e senha exclusivos enviados em seu e-mail. Você poderá acessar pelo celular, computador, notebook, tablet ou qualquer aparelho com acesso à internet.",
  },
  {
    q: "Como são as aulas?",
    a: "São videoaulas com o passo a passo de cada receita e o modo de preparo na prática. Você também recebe a Apostila de Apoio.",
  },
  {
    q: "Por quanto tempo posso acessar o curso?",
    a: "Seu acesso ao Material Exclusivo é vitalício, a partir da data de sua compra.",
  },
  {
    q: "Qual garantia eu tenho?",
    a: "Ao confirmar sua compra, você tem uma garantia incondicional de 7 dias.",
  },
  {
    q: "Quando vou receber o acesso ao curso?",
    a: "Após a confirmação do pagamento o curso é liberado imediatamente — os dados de acesso são enviados ao seu e-mail.",
  },
  {
    q: "Como faço para receber o certificado?",
    a: "Após finalizar as videoaulas, marque todas as caixinhas do conteúdo para atingir 100% de finalização. Seu certificado aparecerá para Download.",
  },
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-[#fde7ee] text-zinc-900">
      {/* HERO */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#fde7ee]/85 via-[#fde7ee]/70 to-[#fde7ee]" />
        <div className="relative mx-auto max-w-3xl px-4 py-10 text-center">
          <img
            src={logo}
            alt="Receitas Criativas"
            width={160}
            height={160}
            className="mx-auto h-32 w-32 sm:h-40 sm:w-40 drop-shadow-lg"
          />
          <p className="mt-6 text-xl sm:text-2xl font-extrabold tracking-wide text-zinc-900">
            APRENDA A PRODUZIR
          </p>
          <h1 className="mt-2 text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#e91e63] drop-shadow-sm">
            Brigadeiros Gourmet
          </h1>
          <div className="mt-4 inline-block w-full max-w-xl rounded-md bg-[#ec407a] px-4 py-3 text-xl sm:text-2xl font-extrabold uppercase text-white shadow">
            E crie uma renda extra
          </div>
          <p className="mt-4 text-lg sm:text-xl font-semibold text-[#f06292]">
            Mesmo começando do zero!
          </p>
          <p className="mt-6 text-3xl font-black text-zinc-900">+6.000 Alunas</p>
          <p className="text-sm font-medium text-zinc-700">
            Já transformaram sua vida com nossas receitas
          </p>
          <div className="mt-3 flex justify-center gap-1 text-amber-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400" />
            ))}
          </div>

          {/* VSL PLACEHOLDER */}
          <div className="mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-xl border-4 border-white bg-zinc-900 shadow-2xl">
            <div className="relative aspect-video">
              {/* Substitua este bloco pelo embed do seu VSL */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-white">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e91e63] shadow-lg">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-semibold opacity-80">
                  Seu VSL será exibido aqui
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CTA>QUERO COMEÇAR AGORA</CTA>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-600">
            Pagamento 100% seguro • Cartão e PIX
          </p>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-[#e91e63]">
            Pra quem é esse treinamento?
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Quem deseja uma renda extra",
              "Pessoas desempregadas que querem começar a vender",
              "Quem busca trabalhar em casa",
              "Mulheres que desejam independência financeira",
              "Quem procura uma atividade com baixo investimento",
              "Pessoas sem experiência",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-xl bg-[#fde7ee] px-5 py-4 font-semibold text-zinc-800"
              >
                <Check className="mt-0.5 h-5 w-5 flex-none text-[#e91e63]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-xl border-2 border-dashed border-[#f48fb1] p-5 text-center font-medium text-zinc-700">
            Mesmo que você nunca tenha produzido um brigadeiro gourmet, as aulas
            mostram o <strong>passo a passo completo em videoaulas</strong>.
          </p>
        </div>
      </section>

      {/* VOCÊ VAI ENCONTRAR */}
      <section className="bg-[#fde7ee] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-[#e91e63]">
            VOCÊ VAI ENCONTRAR!
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "RECEITAS GOURMET",
                d: "Mais de 50 receitas para todos os gostos, do tradicional ao avançado.",
              },
              {
                t: "CÁLCULO DE LUCRO",
                d: "Saiba exatamente quanto gastar e quanto ganhar em cada sabor.",
              },
              {
                t: "PREÇO DE VENDA",
                d: "Descubra quanto cobrar e aumente seus lucros com estratégias simples.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-pink-100"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e91e63] text-2xl font-black text-white">
                  ★
                </div>
                <h3 className="text-lg font-extrabold text-[#e91e63]">{c.t}</h3>
                <p className="mt-2 text-sm text-zinc-700">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SABORES */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl sm:text-3xl font-black text-zinc-900">
            VEJA ALGUNS SABORES QUE VOCÊ VAI APRENDER A FAZER
          </h2>
          <img
            src={sabores}
            alt="Sabores de brigadeiro gourmet"
            loading="lazy"
            width={1600}
            height={800}
            className="mx-auto mt-8 w-full max-w-3xl rounded-2xl shadow-lg"
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {SABORES.map((s) => (
              <div
                key={s.nome}
                className={`rounded-xl bg-gradient-to-br ${s.cor} p-4 text-center text-xs font-extrabold uppercase text-white shadow-md`}
              >
                {s.nome}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTA>QUERO COMEÇAR AGORA</CTA>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-[#fde7ee] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-[#e91e63]">
            O curso ideal para você que busca:
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                t: "Método de sucesso e comprovado",
                d: "Domine um método totalmente comprovado para produzir os melhores Brigadeiros Gourmet da sua região.",
              },
              {
                t: "Conteúdo 100% em vídeo com aulas didáticas",
                d: "Aulas didáticas e de fácil entendimento — qualquer pessoa consegue aprender e colocar em prática.",
              },
              {
                t: "Domine uma nova profissão em um mercado em alta",
                d: "Esteja pronta para atuar no mercado que mais cresce e se destacar como uma profissional de sucesso.",
              },
              {
                t: "Mais de 6 mil alunas",
                d: "Milhares de pessoas já utilizam nossas receitas para gerar renda extra todos os meses.",
              },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-extrabold text-[#e91e63]">{c.t}</h3>
                <p className="mt-2 text-sm text-zinc-700">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="bg-gradient-to-b from-[#e91e63] to-[#ad1457] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-7xl font-black leading-none">4</p>
          <p className="text-3xl font-extrabold">Super Bônus Exclusivos!</p>
          <p className="mt-4 text-base opacity-90">
            Fazendo sua inscrição <strong>HOJE</strong>, você ganha{" "}
            <strong>4 BÔNUS EXCLUSIVOS + CERTIFICADO</strong>.
          </p>
          <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left">
            {[
              "Bônus 1 — Apostila de embalagens lucrativas",
              "Bônus 2 — Guia de divulgação no WhatsApp e Instagram",
              "Bônus 3 — Planilha de precificação automática",
              "Bônus 4 — Receitas extras de sucesso",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur"
              >
                <Check className="mt-0.5 h-5 w-5 flex-none text-amber-300" />
                <span className="font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OFERTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-xl px-4">
          <div className="rounded-3xl border-4 border-[#e91e63] bg-white p-8 text-center shadow-xl">
            <p className="inline-block rounded-full bg-[#e91e63] px-4 py-1 text-xs font-black uppercase tracking-wider text-white">
              Oferta Especial
            </p>
            <p className="mt-4 text-lg font-bold text-zinc-700">
              PROMOÇÃO DE LANÇAMENTO!
            </p>
            <p className="mt-4 text-lg text-zinc-500">
              DE: <span className="line-through">R$ 97,00</span> POR APENAS
            </p>
            <p className="text-6xl font-black text-[#e91e63]">R$ 37,00</p>
            <p className="text-sm font-semibold text-zinc-600">
              (Pagamento Único)
            </p>
            <ul className="mt-6 space-y-2 text-left text-sm font-semibold text-zinc-800">
              {[
                "CURSO 100% ONLINE EM VIDEOAULAS",
                "ACESSO VITALÍCIO",
                "CERTIFICADO INCLUSO",
                "4 BÔNUS EXCLUSIVOS",
                "GARANTIA DE 7 DIAS",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#e91e63]" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA>COMPRAR AGORA!</CTA>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-wider text-zinc-500">
              Pagamento seguro • Cartão e PIX
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fde7ee] py-16">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-center text-3xl font-black text-[#e91e63]">
            Dúvidas Frequentes
          </h2>
          <div className="mt-8 space-y-3">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center md:flex-row md:text-left">
          <img
            src={garantia}
            alt="Garantia de 7 dias"
            loading="lazy"
            width={180}
            height={180}
            className="h-40 w-40 flex-none"
          />
          <div>
            <p className="text-2xl font-black text-[#e91e63]">
              RISCO ZERO PARA VOCÊ
            </p>
            <p className="mt-2 text-zinc-700">
              O Código de Defesa do Consumidor (Art. 49) garante 7 dias para
              solicitar reembolso em caso de insatisfação. Você terá{" "}
              <strong>7 dias de garantia incondicional</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-900 py-10 text-center text-sm text-zinc-400">
        <img
          src={logo}
          alt="Receitas Criativas"
          width={80}
          height={80}
          className="mx-auto h-20 w-20 opacity-90"
          loading="lazy"
        />
        <p className="mt-4">
          Copyright © Brigadeiro Gourmet — Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}

function CTA({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={CHECKOUT_URL}
      className="inline-block w-full max-w-md animate-pulse-cta rounded-full bg-gradient-to-b from-[#43a047] to-[#1b5e20] px-8 py-5 text-lg font-black uppercase tracking-wide text-white shadow-lg shadow-green-600/30 transition-transform hover:scale-105"
    >
      {children}
    </a>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-pink-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-zinc-900"
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-[#e91e63] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-pink-100 bg-[#fff5f8] px-5 py-4 text-sm text-zinc-700">
          {a}
        </div>
      )}
    </div>
  );
}
