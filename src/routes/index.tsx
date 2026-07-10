import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, Star, ChevronDown, ChevronLeft, ChevronRight, Timer, TrendingUp, Briefcase, Home, Users, PiggyBank, GraduationCap, MessageCircle } from "lucide-react";
import { SaleNotifications } from "@/components/SaleNotifications";
import { StickyUrgencyBar } from "@/components/StickyUrgencyBar";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import heroBg from "@/assets/brigadeiro-hero.jpg";
import logo from "@/assets/logo-brigadeiro.png";
import sabores from "@/assets/sabores-brigadeiro.png.asset.json";
import garantia from "@/assets/garantia-7dias.png";
import certificado from "@/assets/certificado-brigadeiro.png";
import avatarMariana from "@/assets/avatar-mariana.jpg.asset.json";
import avatarPatricia from "@/assets/avatar-patricia.jpg.asset.json";
import avatarThais from "@/assets/avatar-thais.jpg.asset.json";
import avatarJuliana from "@/assets/avatar-juliana.jpg.asset.json";

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
  { nome: "TRADICIONAL", cor: "from-amber-600 to-amber-800" },
  { nome: "BEIJINHO", cor: "from-[#5d3a1a] to-[#3d2314]" },
  { nome: "PISTACHE", cor: "from-amber-500 to-amber-700" },
  { nome: "MORANGO", cor: "from-[#7c4d24] to-[#4a2c18]" },
  { nome: "OREO", cor: "from-[#3d2314] to-[#1a0d06]" },
  { nome: "AMENDOIN", cor: "from-amber-400 to-amber-600" },
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
    a: "Assim que o pagamento for confirmado, você receberá as aulas e o acesso pelo WhatsApp — rápido e prático!",
  },
  {
    q: "Como faço para receber o certificado?",
    a: "Após finalizar as videoaulas, marque todas as caixinhas do conteúdo para atingir 100% de finalização. Seu certificado aparecerá para Download.",
  },
];

function LandingPage() {
  useScrollReveal();
  return (
    <main className="min-h-screen bg-[#2a160a] text-amber-50">
      <SaleNotifications />
      <StickyUrgencyBar />
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a160a]/90 via-[#3d2314]/80 to-[#2a160a]" />

        {/* Emojis flutuantes */}
        <span className="float-emoji left-[6%] top-[12%]" style={{ animationDelay: "0s" }}>🍫</span>
        <span className="float-emoji right-[8%] top-[18%]" style={{ animationDelay: "1.2s" }}>✨</span>
        <span className="float-emoji left-[10%] top-[55%]" style={{ animationDelay: "2.4s" }}>💰</span>
        <span className="float-emoji right-[6%] top-[60%]" style={{ animationDelay: "0.6s" }}>🎉</span>
        <span className="float-emoji left-[85%] top-[35%] hidden sm:block" style={{ animationDelay: "3s" }}>🍬</span>
        <span className="float-emoji left-[3%] top-[38%] hidden sm:block" style={{ animationDelay: "1.8s" }}>⭐</span>

        <div className="relative mx-auto max-w-3xl px-4 py-10 text-center">
          <img
            src={logo}
            alt="Receitas Criativas"
            width={160}
            height={160}
            className="mx-auto h-32 w-32 sm:h-40 sm:w-40 drop-shadow-[0_8px_30px_rgba(251,191,36,0.35)] animate-bounce-in"
          />
          <p className="mt-6 text-xl sm:text-2xl font-extrabold tracking-wide text-amber-200">
            APRENDA A PRODUZIR
          </p>
          <h1 className="mt-2 text-4xl sm:text-6xl font-black uppercase tracking-tight text-gradient-hot drop-shadow-sm">
            Brigadeiros Gourmet
          </h1>
          <div className="mt-4 inline-block w-full max-w-xl rounded-md bg-gradient-to-r from-[#5d3a1a] to-[#7c4d24] px-4 py-3 text-xl sm:text-2xl font-extrabold uppercase text-amber-100 shadow-lg border border-amber-500/30">
            E crie uma renda extra 💸
          </div>
          <p className="mt-4 text-lg sm:text-xl font-semibold text-amber-300">
            Mesmo começando do zero!
          </p>
          <p className="mt-4 inline-flex animate-wiggle items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 px-4 py-1.5 text-sm font-black uppercase tracking-wide text-[#2a160a] shadow-lg shadow-amber-500/30">
            <Users className="h-4 w-4" />
            Mentorado por Luiza Quadros
          </p>
          <p className="mt-4 text-3xl font-black text-amber-100">
            <span className="sparkle-glow">+6.000 Alunas 🔥</span>
          </p>
          <p className="text-sm font-medium text-amber-300">
            Já transformaram sua vida com nossas receitas
          </p>
          <div className="mt-3 flex justify-center gap-1 text-amber-300">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 fill-amber-300 animate-bounce-in" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>


          {/* VSL PLACEHOLDER */}
          <div className="mx-auto mt-8 w-full max-w-2xl overflow-hidden rounded-xl border-4 border-amber-400/60 bg-[#2a160a] shadow-2xl shadow-amber-900/40">
            <div className="relative aspect-video">
              {/* Substitua este bloco pelo embed do seu VSL */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#3d2314] to-[#1a0d06] text-amber-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/40">
                  <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-[#2a160a]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-semibold text-amber-300">
                  Seu VSL será exibido aqui
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CTA>QUERO COMEÇAR AGORA</CTA>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-amber-300">
            Pagamento 100% seguro • Cartão e PIX
          </p>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="bg-[#3d2314] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#2a160a] shadow-lg shadow-amber-500/20">
              Feito para você
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-amber-300">
              Pra quem é esse treinamento?
            </h2>
            <p className="mt-3 text-lg font-semibold text-amber-200">
              Se você se identifica com algum desses perfis, esse curso é para você!
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Quem deseja uma renda extra",
                icon: TrendingUp,
                cor: "bg-[#4a2c18] border-amber-500/40 text-amber-100",
                iconeCor: "text-amber-300",
              },
              {
                t: "Pessoas desempregadas que querem começar a vender",
                icon: Briefcase,
                cor: "bg-[#4a2c18] border-amber-500/40 text-amber-100",
                iconeCor: "text-amber-300",
              },
              {
                t: "Quem busca trabalhar em casa",
                icon: Home,
                cor: "bg-[#4a2c18] border-amber-500/40 text-amber-100",
                iconeCor: "text-amber-300",
              },
              {
                t: "Mulheres que desejam independência financeira",
                icon: Users,
                cor: "bg-[#4a2c18] border-amber-500/40 text-amber-100",
                iconeCor: "text-amber-300",
              },
              {
                t: "Quem procura uma atividade com baixo investimento",
                icon: PiggyBank,
                cor: "bg-[#4a2c18] border-amber-500/40 text-amber-100",
                iconeCor: "text-amber-300",
              },
              {
                t: "Pessoas sem experiência",
                icon: GraduationCap,
                cor: "bg-[#4a2c18] border-amber-500/40 text-amber-100",
                iconeCor: "text-amber-300",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.t}
                  className={`flex flex-col items-center gap-3 rounded-2xl border-2 ${item.cor} p-6 text-center shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-900/20`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md`}>
                    <Icon className={`h-6 w-6 text-[#2a160a]`} />
                  </div>
                  <span className="font-bold leading-snug">{item.t}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#5d3a1a] to-[#3d2314] p-6 text-center text-amber-50 shadow-xl shadow-black/25 sm:p-8 border border-amber-500/20">
            <p className="text-lg font-bold sm:text-xl">
              Mesmo que você nunca tenha produzido um brigadeiro gourmet, as aulas
              mostram o <span className="underline decoration-amber-300 underline-offset-4">passo a passo completo em videoaulas</span>.
            </p>
            <div className="mt-5">
              <CTA>QUERO COMEÇAR AGORA</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="bg-[#2a160a] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-amber-300">
            O QUE NOSSAS ALUNAS ESTÃO DIZENDO
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                nome: "Ana Paula M.",
                texto:
                  "Comecei a vender brigadeiros na minha vizinhança e em 2 semanas já tinha pedidos fixos de festas. O curso é muito didático!",
              },
              {
                nome: "Juliana R.",
                texto:
                  "Nunca imaginei que daria para ganhar dinheiro com receitas em casa. Agora fatura todos os meses com encomendas pelo WhatsApp.",
              },
              {
                nome: "Camila S.",
                texto:
                  "O cálculo de lucro mudou minha vida. Antes vendia no prejuízo, agora sei exatamente quanto cobrar e tenho lucro real.",
              },
            ].map((d) => (
              <div
                key={d.nome}
                className="rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-6 shadow-lg shadow-black/20 ring-1 ring-amber-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-black text-[#2a160a]">
                    {d.nome
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-extrabold text-amber-100">{d.nome}</p>
                    <div className="flex gap-0.5 text-amber-300">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-300" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-amber-200/90 leading-relaxed">
                  "{d.texto}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVAS SOCIAIS - PRINTS */}
      <section className="bg-[#3d2314] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <span className="mx-auto block w-fit rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#2a160a]">
            Provas Reais
          </span>
          <h2 className="mt-3 text-center text-3xl sm:text-4xl font-black text-amber-300">
            Prints de alunas vendendo de verdade
          </h2>
          <p className="mt-3 text-center text-sm text-amber-200">
            Conversas reais de pedidos fechados pelo WhatsApp 👇
          </p>

          <WhatsAppCarousel />

          <div className="mt-10 text-center">
            <p className="mb-4 text-sm font-semibold text-amber-100">
              Você pode ser a próxima a receber esses prints 💸
            </p>
            <CTA>QUERO COMEÇAR AGORA</CTA>
          </div>
        </div>
      </section>

      {/* VOCÊ VAI ENCONTRAR */}
      <section className="bg-[#2a160a] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-amber-300">
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
                className="rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-6 text-center shadow-lg shadow-black/20 ring-1 ring-amber-500/20"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-2xl font-black text-[#2a160a] shadow-md shadow-amber-900/30">
                  ★
                </div>
                <h3 className="text-lg font-extrabold text-amber-300">{c.t}</h3>
                <p className="mt-2 text-sm text-amber-200/90">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SABORES */}
      <section className="bg-[#3d2314] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-2xl sm:text-3xl font-black text-amber-300">
            VEJA ALGUNS SABORES QUE VOCÊ VAI APRENDER A FAZER
          </h2>
          <img
            src={sabores.url}
            alt="Sabores de brigadeiro gourmet"
            loading="lazy"
            width={1600}
            height={800}
            className="mx-auto mt-8 w-full max-w-3xl rounded-2xl shadow-lg shadow-black/30 ring-1 ring-amber-500/20"
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
      <section className="bg-[#2a160a] py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-amber-300">
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
              <div key={c.t} className="rounded-2xl bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-6 shadow-lg shadow-black/20 ring-1 ring-amber-500/20">
                <h3 className="text-lg font-extrabold text-amber-300">{c.t}</h3>
                <p className="mt-2 text-sm text-amber-200/90">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÔNUS + CERTIFICADO */}
      <section className="bg-gradient-to-b from-[#5d3a1a] to-[#2a160a] py-16 text-amber-50">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Certificado */}
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-3 rounded-2xl bg-amber-400/30 blur-xl" />
                <img
                  src={certificado}
                  alt="Certificado de Conclusão Brigadeiro Gourmet"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="relative w-full rounded-xl shadow-2xl shadow-amber-900/40 ring-2 ring-amber-300/40"
                />
                <p className="relative mt-3 text-center text-sm font-semibold text-amber-200">
                  Certificado de Conclusão incluso ao finalizar o curso
                </p>
              </div>
            </div>

            {/* Bônus */}
            <div className="order-1 text-center lg:order-2 lg:text-left">
              <p className="text-7xl font-black leading-none text-amber-300">4</p>
              <p className="text-3xl font-extrabold text-amber-100">Super Bônus Exclusivos!</p>
              <p className="mt-4 text-base text-amber-200/90">
                Fazendo sua inscrição <strong className="text-amber-300">HOJE</strong>, você ganha{" "}
                <strong className="text-amber-300">4 BÔNUS EXCLUSIVOS + CERTIFICADO</strong>.
              </p>
              <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left lg:mx-0">
                {[
                  "Bônus 1 — Apostila de embalagens lucrativas",
                  "Bônus 2 — Guia de divulgação no WhatsApp e Instagram",
                  "Bônus 3 — Planilha de precificação automática",
                  "Bônus 4 — Receitas extras de sucesso",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-lg bg-[#4a2c18]/80 px-4 py-3 backdrop-blur border border-amber-500/20"
                  >
                    <Check className="mt-0.5 h-5 w-5 flex-none text-amber-300" />
                    <span className="font-medium text-amber-100">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="bg-[#2a160a] py-16">
        <div className="mx-auto max-w-xl px-4">
          <div className="rounded-3xl border-4 border-amber-500/40 bg-gradient-to-br from-[#4a2c18] to-[#3d2314] p-8 text-center shadow-xl shadow-black/30">
            <p className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-1 text-xs font-black uppercase tracking-wider text-[#2a160a]">
              Oferta Especial
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-amber-100 px-4 py-3 text-amber-900 ring-1 ring-amber-300">
              <Timer className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wide">
                Oferta expira em:
              </span>
              <CountdownTimer />
            </div>
            <p className="mt-4 text-lg font-bold text-amber-200">
              PROMOÇÃO DE LANÇAMENTO!
            </p>
            <p className="mt-4 text-lg text-amber-200/80">
              DE: <span className="line-through">R$ 97,00</span> POR APENAS
            </p>
            <p className="text-6xl font-black text-amber-300">R$ 37,00</p>
            <p className="text-sm font-semibold text-amber-200/80">
              (Pagamento Único)
            </p>
            <ul className="mt-6 space-y-2 text-left text-sm font-semibold text-amber-100">
              {[
                "CURSO 100% ONLINE EM VIDEOAULAS",
                "ACESSO VITALÍCIO",
                "CERTIFICADO INCLUSO",
                "4 BÔNUS EXCLUSIVOS",
                "GARANTIA DE 7 DIAS",
                "AULAS ENVIADAS PELO WHATSAPP",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-300" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CTA>COMPRAR AGORA!</CTA>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-100 px-4 py-2.5 text-amber-900 ring-1 ring-amber-300">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-bold">
                As aulas serão enviadas pelo WhatsApp assim que o pagamento for confirmado
              </span>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-wider text-amber-300/70">
              Pagamento seguro • Cartão e PIX
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#2a160a] py-16">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-center text-3xl font-black text-amber-300">
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
      <section className="bg-[#3d2314] py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center md:flex-row md:text-left">
          <img
            src={garantia}
            alt="Garantia de 7 dias"
            loading="lazy"
            width={180}
            height={180}
            className="h-40 w-40 flex-none drop-shadow-[0_8px_30px_rgba(251,191,36,0.25)]"
          />
          <div>
            <p className="text-2xl font-black text-amber-300">
              RISCO ZERO PARA VOCÊ
            </p>
            <p className="mt-2 text-amber-200/90">
              O Código de Defesa do Consumidor (Art. 49) garante 7 dias para
              solicitar reembolso em caso de insatisfação. Você terá{" "}
              <strong className="text-amber-300">7 dias de garantia incondicional</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a0d06] py-10 text-center text-sm text-amber-300/70">
        <img
          src={logo}
          alt="Receitas Criativas"
          width={80}
          height={80}
          className="mx-auto h-20 w-20 opacity-90 drop-shadow-[0_6px_20px_rgba(251,191,36,0.2)]"
          loading="lazy"
        />
        <p className="mt-4 text-amber-200/80">
          Copyright © Brigadeiro Gourmet — Todos os direitos reservados.
        </p>
        <p className="mt-2 text-xs text-amber-400/60">
          CNPJ: 39.450.086/0001-90
        </p>
      </footer>
    </main>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(15 * 60 * 1000);

  useEffect(() => {
    const saved = localStorage.getItem("brigadeiro-timer");
    let end = saved ? parseInt(saved, 10) : Date.now() + 15 * 60 * 1000;
    if (!saved) localStorage.setItem("brigadeiro-timer", String(end));
    setTimeLeft(Math.max(0, end - Date.now()));

    const interval = setInterval(() => {
      const remaining = Math.max(0, end - Date.now());
      if (remaining === 0) {
        end = Date.now() + 15 * 60 * 1000;
        localStorage.setItem("brigadeiro-timer", String(end));
        setTimeLeft(15 * 60 * 1000);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <span className="font-mono text-lg font-black tabular-nums">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}

function CTA({ children }: { children: React.ReactNode }) {
  return (
    <Link
      to="/checkout"
      className="btn-shine inline-block w-full max-w-md animate-pulse-cta rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 px-8 py-5 text-lg font-black uppercase tracking-wide text-[#2a160a] shadow-xl shadow-amber-500/40 transition-transform hover:scale-105 border border-amber-300"
    >
      {children} 🚀
    </Link>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-[#4a2c18] to-[#3d2314]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-amber-100"
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-amber-300 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-amber-500/20 bg-[#3d2314]/80 px-5 py-4 text-sm text-amber-200/90">
          {a}
        </div>
      )}
    </div>
  );
}

function WhatsAppPrint({
  contact,
  status = "online",
  avatarColor = "bg-amber-500",
  initials,
  avatarUrl,
  children,
}: {
  contact: string;
  status?: string;
  avatarColor?: string;
  initials: string;
  avatarUrl?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-2 ring-amber-500/20">
        {/* WA Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#4a2c18] to-[#3d2314] px-4 py-3">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-amber-300">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={contact}
              className="h-10 w-10 rounded-full object-cover shadow ring-2 ring-amber-400/40"
              width={40}
              height={40}
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${avatarColor} text-sm font-black text-white shadow`}
            >
              {initials}
            </div>
          )}
          <div className="flex-1 leading-tight">
            <p className="text-[13px] font-bold text-amber-100">{contact}</p>
            <p className="text-[11px] text-amber-300/80">{status}</p>
          </div>
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-amber-300">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        {/* Chat surface */}
        <div
          className="relative min-h-[340px] space-y-2 p-4"
          style={{
            backgroundColor: "#efeae2",
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(0,0,0,0.03) 1px, transparent 1px), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.02) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 32px 32px",
          }}
        >
          <div className="mx-auto mb-3 w-fit rounded-md bg-[#4a2c18] px-2 py-1 text-[10px] font-medium text-amber-100 shadow-sm">
            HOJE
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Bubble({
  side,
  name,
  time = "14:23",
  read = true,
  children,
}: {
  side: "left" | "right";
  name?: string;
  time?: string;
  read?: boolean;
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[85%] rounded-xl rounded-${isRight ? "tl" : "tr"}-[4px] px-3 py-2 text-[13px] shadow-sm ${
          isRight ? "bg-gradient-to-br from-amber-100 to-amber-200 text-[#2a160a]" : "bg-white text-[#2a160a]"
        }`}
        style={{ borderRadius: isRight ? "16px 16px 4px 16px" : "16px 16px 16px 4px" }}
      >
        {name && !isRight && (
          <p className="text-[11px] font-bold text-amber-700">{name}</p>
        )}
        <p className="pr-14 leading-snug">{children}</p>
        <span className="absolute bottom-1.5 right-2 flex items-center gap-0.5 text-[10px] text-amber-800/60">
          {time}
          {isRight && (
            <svg
              viewBox="0 0 16 11"
              className={`h-3 w-4 ${read ? "fill-amber-600" : "fill-amber-400"}`}
            >
              <path d="M11.07.59 5.65 6.01l-2.12-2.12-1.41 1.41L5.65 8.84 12.49 2 11.07.59zm4.24 0L9.9 6.01l-.62-.62-1.41 1.41 2.03 2.03L16.72 2 15.31.59z" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}

function WhatsAppCarousel() {
  const [index, setIndex] = useState(0);

  const prints = [
    <WhatsAppPrint
      key="1"
      contact="Mariana 💕"
      status="online"
      initials="MC"
      avatarColor="bg-rose-400"
      avatarUrl={avatarMariana.url}
    >
      <Bubble side="left" time="14:18">
        Oii! Vc faz brigadeiro gourmet pra festa? 🎉
      </Bubble>
      <Bubble side="right" time="14:19">
        Faço sim! Tenho 12 sabores 😋 Quantos vc precisa?
      </Bubble>
      <Bubble side="left" time="14:20">
        100 unidades pro aniversário da minha filha 🎂
      </Bubble>
      <Bubble side="right" time="14:21">
        Fechado! Fica R$ 280,00 💕
      </Bubble>
      <Bubble side="left" time="14:23">
        Acabei de fazer o PIX ✅
      </Bubble>
    </WhatsAppPrint>,

    <WhatsAppPrint
      key="2"
      contact="Patrícia 👩‍🍳"
      status="digitando…"
      initials="PA"
      avatarColor="bg-amber-500"
      avatarUrl={avatarPatricia.url}
    >
      <Bubble side="left" name="Patrícia" time="20:11">
        Gente, eu não acredito!! 😭
      </Bubble>
      <Bubble side="left" name="Patrícia" time="20:11">
        Faturei R$ 1.480 só esse mês vendendo no condomínio 🏠
      </Bubble>
      <Bubble side="left" name="Patrícia" time="20:12">
        Obrigada pelo curso, mudou minha vida ❤️
      </Bubble>
      <Bubble side="right" time="20:14">
        Que orgulho de você!! 🥰
      </Bubble>
      <Bubble side="left" name="Patrícia" time="20:15">
        Já tô separando dinheiro pra ampliar 🚀
      </Bubble>
    </WhatsAppPrint>,

    <WhatsAppPrint
      key="3"
      contact="Thaís — Eventos"
      status="visto por último hoje 11:42"
      initials="TE"
      avatarColor="bg-fuchsia-500"
      avatarUrl={avatarThais.url}
    >
      <Bubble side="left" name="Thaís" time="11:30">
        Vi seus brigadeiros no story, são lindos! 😍
      </Bubble>
      <Bubble side="left" name="Thaís" time="11:31">
        Faz pra casamento? Preciso de 500 unidades
      </Bubble>
      <Bubble side="right" time="11:35">
        Faço sim! Te mando o orçamento agora 💌
      </Bubble>
      <Bubble side="right" time="11:38">
        Sai por R$ 1.250 com 4 sabores 🍫
      </Bubble>
      <Bubble side="left" name="Thaís" time="11:42">
        Fechado!! Me passa a chave pix 🙏
      </Bubble>
    </WhatsAppPrint>,

    <WhatsAppPrint
      key="4"
      contact="Juliana 🎂"
      status="online"
      initials="JA"
      avatarColor="bg-emerald-400"
      avatarUrl={avatarJuliana.url}
    >
      <Bubble side="left" time="09:12">
        Bom dia! Queria encomendar 50 brigadeiros para o chá de bebê
      </Bubble>
      <Bubble side="right" time="09:15">
        Bom dia! Com certeza 😊 Qual tema?
      </Bubble>
      <Bubble side="left" time="09:17">
        Rosa e dourado, pode ser?
      </Bubble>
      <Bubble side="right" time="09:18">
        Pode sim! Fica R$ 145,00 com embalagem personalizada 🎀
      </Bubble>
      <Bubble side="left" time="09:22">
        Perfeito! Fiz o pix agora, manda o endereço pra retirada?
      </Bubble>
    </WhatsAppPrint>,
  ];

  const prev = () => setIndex((i) => (i === 0 ? prints.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === prints.length - 1 ? 0 : i + 1));

  return (
    <div className="mt-10">
      <div className="relative mx-auto flex max-w-[400px] items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#e8ddd0] transition hover:scale-105"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5 text-[#5d3a1a]" />
        </button>

        <div className="w-full overflow-hidden rounded-[32px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {prints.map((print, i) => (
              <div key={i} className="w-full flex-none px-1">
                {print}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#e8ddd0] transition hover:scale-105"
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5 text-[#5d3a1a]" />
        </button>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {prints.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "bg-[#5d3a1a] w-5" : "bg-[#d4c4b0]"
            }`}
            aria-label={`Ir para print ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
