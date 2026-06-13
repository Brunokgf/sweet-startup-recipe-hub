import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChefHat,
  DollarSign,
  Clock,
  Star,
  CheckCircle2,
  Package,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Users,
  TrendingUp,
  Gift,
  Sparkles,
  Heart,
  Menu,
  X,
} from "lucide-react";
import heroImg from "../assets/brigadeiro-hero.jpg";
import makingImg from "../assets/brigadeiro-making.jpg";
import packagingImg from "../assets/brigadeiro-packaging.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brigadeiro Gourmet — Receitas para Renda Extra" },
      { name: "description", content: "Aprenda a fazer brigadeiros gourmet irresistíveis e lucre de R$2.000 a R$5.000 por mês trabalhando em casa. E-book completo com mais de 50 receitas, dicas de embalagem e estratégias de venda." },
      { property: "og:title", content: "Brigadeiro Gourmet — Receitas para Renda Extra" },
      { property: "og:description", content: "Aprenda a fazer brigadeiros gourmet e lucre de R$2.000 a R$5.000 por mês. Mais de 50 receitas, dicas de venda e embalagem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "O que é", id: "oque" },
    { label: "Conteúdo", id: "conteudo" },
    { label: "Depoimentos", id: "depoimentos" },
    { label: "Oferta", id: "oferta" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 font-bold text-xl text-foreground hover:opacity-80 transition-opacity"
          >
            <ChefHat className="w-7 h-7 text-chocolate" />
            <span className="hidden sm:inline">Brigadeiro Gourmet</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("oferta")}
              className="btn-cta text-sm py-2.5 px-5"
            >
              Quero Começar
            </button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("oferta")}
              className="btn-cta w-full text-sm py-3"
            >
              Quero Começar
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/50 to-background opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-sale/10 text-sale px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Mais de 3.500 alunos já começaram
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
                Brigadeiro Gourmet: a receita para uma{" "}
                <span className="text-gradient-gold">renda extra</span>{" "}
                de verdade
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Aprenda a fazer brigadeiros irresistíveis que vendem por si só.
                De R$<strong>2.000</strong> a R$<strong>5.000</strong> por mês
                trabalhando da sua cozinha, nos seus horários.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => scrollToSection("oferta")}
                  className="btn-cta"
                >
                  Quero Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection("oque")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold rounded-xl border-2 border-border hover:bg-muted transition-colors"
                >
                  Ver o que está incluso
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-chocolate border-2 border-background flex items-center justify-center text-xs text-white font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>
                  <strong className="text-foreground">4.9/5</strong> avaliação média
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-gold/20 to-sale/10 rounded-3xl blur-2xl" />
                <img
                  src={heroImg}
                  alt="Brigadeiros gourmet em várias sabores e decorações"
                  width={512}
                  height={512}
                  className="relative rounded-3xl shadow-2xl animate-float object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-chocolate text-chocolate-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "3.500+", label: "Alunos" },
              { icon: DollarSign, value: "R$5K", label: "Máximo/mês" },
              { icon: Star, value: "4.9/5", label: "Avaliação" },
              { icon: Clock, value: "48h", label: "Prazo de garantia" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <stat.icon className="w-8 h-8 mx-auto text-gold" />
                <div className="text-3xl font-extrabold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que é / Problema */}
      <section id="oque" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={makingImg}
                alt="Preparo de brigadeiro gourmet em casa"
                width={600}
                height={450}
                loading="lazy"
                className="rounded-2xl shadow-xl object-cover w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Você sabia que dá para faturar de <span className="text-sale font-extrabold">R$2.000 a R$5.000</span>{" "}
                por mês fazendo brigadeiro em casa?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A demanda por doces gourmet nunca foi tão alta. Festas, casamentos,
                aniversários, corporativos — todo mundo quer algo delicioso e
                bonito. E o brigadeiro é o queridinho dos brasileiros.
              </p>
              <ul className="space-y-4">
                {[
                  "Não precisa de equipamentos caros",
                  "Ingredientes fáceis de encontrar",
                  "Pode começar com menos de R$100",
                  "Venda pelo WhatsApp, Instagram ou delivery",
                  "Trabalhe nos seus horários, sem patrão",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-sale flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* O que está incluso */}
      <section id="conteudo" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-sale uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              O que você vai receber
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4">
              Tudo que você precisa para começar a vender
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "50+ Receitas Testadas",
                desc: "Receitas clássicas e inovadoras: tradicional, gourmet, com recheios, coberturas especiais e versões diet.",
              },
              {
                icon: Package,
                title: "Guia de Embalagem",
                desc: "Como embalar para vender, quais materiais usar, custos e fornecedores confiáveis para lucrar mais.",
              },
              {
                icon: DollarSign,
                title: "Planilha de Custos",
                desc: "Calcule exatamente quanto custa cada brigadeiro e defina o preço ideal para maximizar seu lucro.",
              },
              {
                icon: TrendingUp,
                title: "Estratégias de Venda",
                desc: "Como vender pelo WhatsApp, Instagram, iFood e para eventos. Passo a passo de como captar clientes.",
              },
              {
                icon: Gift,
                title: "Bônus: Marketing Digital",
                desc: "Templates de stories, legendas prontas e dicas de fotografia para vender mais nas redes sociais.",
              },
              {
                icon: Heart,
                title: "Comunidade de Alunos",
                desc: "Acesso ao grupo exclusivo para tirar dúvidas, trocar experiências e se inspirar com outros confeiteiros.",
              },
            ].map((card) => (
              <div key={card.title} className="card-gourmet space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sale/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-sale" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria / Visual */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Brigadeiros que vendem por si só
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossas receitas foram testadas e aprovadas por mais de 3.500 pessoas.
                O resultado? Brigadeiros com aparência profissional e sabor
                inesquecível — o tipo que o cliente compra, prova e já quer pedir
                de novo.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "50+", label: "Sabores" },
                  { value: "15", label: "Técnicas" },
                  { value: "R$0,50", label: "Custo médio" },
                  { value: "R$3,00", label: "Preço médio de venda" },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-sale">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={packagingImg}
                alt="Brigadeiros embalados para venda em caixas elegantes"
                width={600}
                height={450}
                loading="lazy"
                className="rounded-2xl shadow-xl object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-chocolate text-chocolate-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wider">
              <Star className="w-4 h-4" />
              Depoimentos de alunos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Quem já comprou, está faturando
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Camila R.",
                role: "Mãe e confeiteira",
                text: "Comecei fazendo para a escola da minha filha. Hoje vendo para 3 buffets e já paguei minhas contas só com brigadeiro. O passo a passo é muito claro!",
                rating: 5,
              },
              {
                name: "Pedro S.",
                role: "Ex-entregador de app",
                text: "Perdi meu emprego e resolvi tentar. Em 2 meses já estava faturando R$2.300. O melhor é que trabalho quando quero e não dependo de ninguém.",
                rating: 5,
              },
              {
                name: "Fernanda M.",
                role: "Dona de casa",
                text: "Sempre amei fazer doces mas não sabia vender. As dicas de preço e marketing mudaram tudo. Hoje tenho uma renda fixa de R$1.800/mês.",
                rating: 5,
              },
            ].map((depo) => (
              <div key={depo.name} className="bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-2xl p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: depo.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed opacity-90">"{depo.text}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">
                    {depo.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{depo.name}</div>
                    <div className="text-xs opacity-60">{depo.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oferta */}
      <section id="oferta" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-sale uppercase tracking-wider">
              <Gift className="w-4 h-4" />
              Oferta por tempo limitado
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4">
              Tudo isso por menos que o custo de uma caixa de brigadeiros
            </h2>
          </div>

          <div className="bg-card border-2 border-sale/30 rounded-3xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sale/5 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-sale/10 text-sale px-3 py-1 rounded-full text-sm font-bold">
                70% OFF — Últimas vagas
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-muted-foreground line-through decoration-sale/60">
                  De R$97,00
                </span>
              </div>
              <div className="text-6xl sm:text-7xl font-extrabold text-sale">
                R$29,90
              </div>
              <p className="text-muted-foreground">Pagamento único — acesso vitalício</p>
            </div>

            <div className="space-y-3">
              {[
                "E-book completo com 50+ receitas (PDF)",
                "Guia de embalagem e fornecedores",
                "Planilha de custos e precificação",
                "Estratégias de venda e captação de clientes",
                "Bônus: Kit de marketing digital",
                "Acesso à comunidade exclusiva de alunos",
                "Atualizações gratuitas para sempre",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-sale flex-shrink-0" />
                  <span className="text-foreground text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={() => window.open("https://wa.me/5511999999999?text=Olá!%20Quero%20comprar%20o%20e-book%20Brigadeiro%20Gourmet", "_blank")}
                className="btn-cta text-xl w-full sm:w-auto"
              >
                Quero Aproveitar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-muted-foreground">
                Pague com Pix, cartão ou boleto — acesso imediato após a confirmação
              </p>
            </div>

            {/* Garantia */}
            <div className="flex items-center gap-4 bg-muted/50 rounded-xl p-4">
              <div className="w-14 h-14 rounded-full bg-sale/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7 text-sale" />
              </div>
              <div>
                <div className="font-bold text-foreground">Garantia de 7 dias</div>
                <div className="text-sm text-muted-foreground">
                  Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Dúvidas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Preciso ter experiência na cozinha?",
                a: "Não! As receitas são passo a passo, com fotos e dicas para quem nunca fez nada na cozinha. Muitos alunos começaram do zero.",
              },
              {
                q: "Quanto preciso investir para começar?",
                a: "Com menos de R$100 em ingredientes e embalagens básicas você já consegue fazer as primeiras vendas. Não precisa de equipamentos caros.",
              },
              {
                q: "Como recebo o conteúdo após a compra?",
                a: "Imediatamente após a confirmação do pagamento, você recebe um e-mail com o link de download do e-book e acesso à comunidade.",
              },
              {
                q: "Posso vender os brigadeiros que faço?",
                a: "Sim! O e-book foi feito exatamente para isso. Incluímos inclusive dicas sobre como regularizar e precificar corretamente.",
              },
              {
                q: "E se eu não gostar?",
                a: "Você tem 7 dias de garantia incondicional. Se não gostar por qualquer motivo, devolvemos 100% do seu dinheiro.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none text-foreground font-semibold hover:bg-muted/50 transition-colors">
                  {faq.q}
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-chocolate text-chocolate-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Não deixe essa oportunidade passar
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Por menos que o preço de uma pizza, você pode ter acesso a todo o
            conhecimento que já ajudou mais de 3.500 pessoas a começar uma renda
            extra de verdade.
          </p>
          <button
            onClick={() => scrollToSection("oferta")}
            className="btn-cta text-xl"
          >
            Quero Começar Agora
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-2 text-sm opacity-70">
            <ShieldCheck className="w-4 h-4" />
            Pagamento seguro — Garantia de 7 dias
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground space-y-2">
          <p>
            Brigadeiro Gourmet — E-book para Renda Extra
          </p>
          <p>
            Este site não garante resultados específicos. Seu sucesso depende do
            seu esforço e dedicação.
          </p>
        </div>
      </footer>
    </div>
  );
}
