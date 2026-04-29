import { useEffect, useState } from "react";

/* =============================================================
   STUDIO Y — ATELIÊ DA METAMORFOSE
   Conceito editorial brutalista para um salão de beleza premium
   em Goiânia. Cada decisão validada por: Designer Visionário,
   Arquiteto de Informação, Engenheiro Elite, Psicólogo (Cialdini/
   Kahneman), CRO, Storyteller, Futurista e Guardião da A11y.
   ============================================================= */

/* ---------- Dados reais do negócio ---------- */
const BUSINESS = {
  name: "Studio Y",
  rating: 4.7,
  reviews: 239,
  category: "Salão de Beleza · VIP",
  city: "Goiânia",
  address: "Alameda Ricardo Paranhos, 251 — St. Marista, Goiânia · GO · 74175-020",
  phone: "(62) 99421-0710",
  phoneLink: "tel:+5562994210710",
  whatsapp: "https://wa.me/5562994210710?text=Ol%C3%A1%2C+gostaria+de+agendar+um+hor%C3%A1rio+no+Studio+Y",
  instagram: "https://instagram.com",
  hours: "Fechado · Abre quarta às 08h00",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Studio+Y+Alameda+Ricardo+Paranhos+251+Goiania",
  mapsEmbed:
    "https://www.google.com/maps?q=Studio%20Y%20Alameda%20Ricardo%20Paranhos%20251%20Goi%C3%A2nia&z=17&output=embed",
};

const SERVICES = [
  { n: "01", title: "Corte & Escova", tag: "Cabelo", note: "Linhas que respeitam o desenho do rosto." },
  { n: "02", title: "Penteados & Apliques", tag: "Cabelo", note: "Da cerimônia à festa silenciosa." },
  { n: "03", title: "Tranças & Texturas", tag: "Cabelo", note: "Tradição contemporânea, fio a fio." },
  { n: "04", title: "Design de Sobrancelhas", tag: "Olhar", note: "Linha, cera, henna e brow lamination." },
  { n: "05", title: "Cuidados com a Pele", tag: "Estética", note: "Protocolos clínicos e tratamentos para acne." },
  { n: "06", title: "Depilação a Laser", tag: "Estética", note: "Permanente, brasileira, com cera ou linha." },
  { n: "07", title: "Manicure & Pedicure", tag: "Mãos & Pés", note: "Inclui esculpidas em acrílico." },
  { n: "08", title: "Massagem Relaxante", tag: "Corpo", note: "Pausa entre dois atos do dia." },
  { n: "09", title: "Rituais Nupciais", tag: "Noivas", note: "Curadoria do véu ao último brilho." },
  { n: "10", title: "Studio Kids", tag: "Infantil", note: "Primeiros gestos de cuidado." },
  { n: "11", title: "Studio Men", tag: "Masculino", note: "Barba, cabelo, presença." },
  { n: "12", title: "Sala VIP", tag: "Privê", note: "Atendimento privado mediante reserva." },
];

const MARQUEE_WORDS = [
  "Cabelo", "Sobrancelhas", "Pele", "Unhas", "Noivas", "Massagem",
  "Depilação a Laser", "Brow Lamination", "Tranças", "Studio Kids",
  "Studio Men", "Sala VIP",
];

const TESTIMONIALS = [
  {
    quote:
      "Sem dúvidas uma das melhores referências de salão de beleza em Goiânia.",
    author: "Cliente verificada",
    src: "Avaliação Google",
  },
  {
    quote:
      "Mudei de cidade e volto pra Goiânia só para fazer meu cabelo aqui.",
    author: "Cliente verificada",
    src: "Avaliação Google",
  },
  {
    quote:
      "Recomendo a Luciene, melhor esteticista corporal. Profissional, dedicada e atenciosa.",
    author: "Cliente verificada",
    src: "Avaliação Google",
  },
];

/* ============================================================= */

export default function App() {
  /* ----- Loader (primeira impressão controlada — Kahneman: ancoragem) ----- */
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1400);
    return () => clearTimeout(t);
  }, []);

  /* ----- Custom cursor (Designer + Futurista) ----- */
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    const dot = document.querySelector<HTMLDivElement>(".cursor-dot");
    const ring = document.querySelector<HTMLDivElement>(".cursor-ring");
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(tick);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, .hoverable")) ring.classList.add("hover");
      else ring.classList.remove("hover");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    tick();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  /* ----- Scroll progress (CRO: feedback contínuo de jornada) ----- */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----- Reveal on scroll ----- */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  /* ----- Bento card glow (mouse position) ----- */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".bento-glow");
    const handler = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    cards.forEach((c) => c.addEventListener("mousemove", handler));
    return () => cards.forEach((c) => c.removeEventListener("mousemove", handler));
  }, [loaded]);

  /* ----- Hora local Goiânia (ritual de presença) ----- */
  const [time, setTime] = useState(currentGoiania());
  useEffect(() => {
    const t = setInterval(() => setTime(currentGoiania()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grain min-h-screen">
      {/* Cursor */}
      <div className="cursor-ring" aria-hidden />
      <div className="cursor-dot" aria-hidden />

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden />

      {/* Loader */}
      <div className={`loader ${loaded ? "hidden" : ""}`} aria-hidden={loaded}>
        <div className="loader-y">Y</div>
      </div>

      {/* Skip link (a11y) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--bone)] focus:text-[var(--ink)] focus:px-4 focus:py-2 focus:rounded-full"
      >
        Pular para o conteúdo
      </a>

      <Nav time={time} />
      <main id="main">
        <Hero />
        <Marquee />
        <Manifesto />
        <Stats />
        <Services />
        <Testimonials />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* =============================================================
   NAV — minimalista, sticky, ancoragem editorial
   ============================================================= */
function Nav({ time }: { time: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-md bg-[rgba(12,10,9,0.65)] border-b border-[var(--ink-3)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 flex items-center justify-between">
        <a href="#main" className="hoverable flex items-center gap-3">
          <YMark />
          <span className="font-display text-lg tracking-tight">Studio Y</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-[var(--bone-2)]">
          <a href="#manifesto" className="hover:text-[var(--copper)] transition-colors">Manifesto</a>
          <a href="#servicos" className="hover:text-[var(--copper)] transition-colors">Serviços</a>
          <a href="#vozes" className="hover:text-[var(--copper)] transition-colors">Vozes</a>
          <a href="#visita" className="hover:text-[var(--copper)] transition-colors">Visita</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[11px] tracking-eyebrow text-[var(--bone-2)]/70">
            Goiânia · {time}
          </span>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener" className="btn-ghost !py-2 !px-4 text-xs">
            Agendar
          </a>
        </div>
      </div>
    </header>
  );
}

function YMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M5 5 L20 22 L35 5 M20 22 L20 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* =============================================================
   HERO — silêncio + tipografia gigante (impacto em 3s)
   ============================================================= */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-32 pb-16">
      {/* Atmospheric fog */}
      <div className="fog" style={{ width: 600, height: 600, background: "var(--copper)", top: "20%", left: "-10%" }} />
      <div className="fog" style={{ width: 500, height: 500, background: "var(--rose)", top: "55%", right: "-12%", opacity: 0.35 }} />
      <div className="fog" style={{ width: 700, height: 700, background: "var(--moss)", bottom: "-30%", left: "30%", opacity: 0.18 }} />

      {/* Giant Y backdrop */}
      <svg
        className="giant-y absolute right-[-6vw] top-[8vh] w-[60vw] max-w-[820px] opacity-[0.07] pointer-events-none drift"
        viewBox="0 0 200 240"
        fill="none"
        aria-hidden
      >
        <path d="M10 10 L100 130 L190 10 M100 130 L100 230" stroke="var(--bone)" strokeWidth="1.4" />
      </svg>

      <div className="relative mx-auto max-w-[1500px] w-full px-6 md:px-12">
        {/* Eyebrow row */}
        <div className="flex items-end justify-between mb-8 md:mb-14">
          <div className="flex items-center gap-3 text-[var(--bone-2)]">
            <span className="w-10 h-px bg-[var(--copper)]" />
            <span className="tracking-eyebrow">Ateliê de Beleza · Desde Goiânia</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[var(--bone-2)] text-xs">
            <Stars rating={BUSINESS.rating} />
            <span className="ml-2">{BUSINESS.rating.toFixed(1)} · {BUSINESS.reviews} avaliações Google</span>
          </div>
        </div>

        {/* Display headline */}
        <h1 className="font-display font-light leading-[0.86] tracking-[-0.03em] text-[16vw] md:text-[12.5vw] lg:text-[11rem] xl:text-[14rem]">
          <span className="block overflow-hidden">
            <SplitWord word="Studio" delay={0.1} />
          </span>
          <span className="block overflow-hidden italic font-italic-serif text-[var(--copper-2)]">
            <SplitWord word="Y." delay={0.55} accent />
          </span>
        </h1>

        {/* Subline */}
        <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-5 reveal text-[var(--bone-2)] text-base md:text-lg leading-relaxed max-w-md">
            Um lugar onde o cabelo, a pele e a presença são tratados como
            matéria de criação. Aqui não fazemos apenas beleza —{" "}
            <em className="font-italic-serif text-[var(--bone)]">orquestramos metamorfoses</em>.
          </p>
          <div className="md:col-span-4 md:col-start-8 flex flex-col sm:flex-row gap-4 reveal">
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener" className="btn-primary hoverable">
              Reservar um horário
              <span className="arr" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a href={BUSINESS.phoneLink} className="btn-ghost hoverable">
              <Phone /> {BUSINESS.phone}
            </a>
          </div>
        </div>

        {/* Editorial beauty collage */}
        <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-5 reveal">
          <figure className="col-span-2 md:col-span-4 rounded-[24px] overflow-hidden border border-[var(--ink-3)] bg-[var(--ink-2)] salon-shot salon-shot-tall">
            <img
              src="/images/studioy-hero-model.png"
              alt="Mulher com cabelo longo e brilhante em campanha editorial de salão"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </figure>
          <figure className="hidden md:block md:col-span-3 rounded-[24px] overflow-hidden border border-[var(--ink-3)] bg-[var(--ink-2)] salon-shot">
            <img
              src="/images/studioy-salon-interior.png"
              alt="Interior sofisticado de salão de beleza premium"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
          <figure className="col-span-2 md:col-span-5 rounded-[24px] overflow-hidden border border-[var(--ink-3)] bg-[var(--ink-2)] salon-shot salon-shot-wide">
            <img
              src="/images/studioy-hair-motion.png"
              alt="Modelo exibindo movimento e brilho do cabelo em ensaio de beleza"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>

        {/* Scroll cue */}
        <div className="mt-10 md:mt-12 flex items-center justify-between text-xs text-[var(--bone-2)]/60">
          <div className="flex items-center gap-3">
            <span className="inline-block w-px h-10 bg-[var(--bone-2)]/40 animate-pulse" />
            <span className="tracking-eyebrow">Role · descubra o ritual</span>
          </div>
          <span className="hidden md:inline tracking-eyebrow">{BUSINESS.hours}</span>
        </div>
      </div>
    </section>
  );
}

function SplitWord({ word, delay = 0, accent = false }: { word: string; delay?: number; accent?: boolean }) {
  return (
    <span className="rise inline-block">
      {word.split("").map((c, i) => (
        <span
          key={i}
          style={{ animationDelay: `${delay + i * 0.06}s` }}
          className={accent ? "" : ""}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" className="twinkle" style={{ animationDelay: `${i * 0.2}s` }}>
            <defs>
              <linearGradient id={`g${i}`}>
                <stop offset={`${fill * 100}%`} stopColor="var(--copper-2)" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(244,237,228,0.25)" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l2.9 6.9L22 10l-5.5 4.7L18.2 22 12 18.3 5.8 22l1.7-7.3L2 10l7.1-1.1L12 2z"
              fill={`url(#g${i})`}
            />
          </svg>
        );
      })}
    </span>
  );
}

function Phone() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =============================================================
   MARQUEE — ritmo + repetição (Cialdini: familiaridade)
   ============================================================= */
function Marquee() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <section className="marquee py-10 md:py-14 border-y border-[var(--ink-3)] bg-[var(--ink-2)]/40 overflow-hidden">
      <div className="marquee-track">
        {items.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-10 px-6">
            <span className="font-display text-4xl md:text-6xl font-light tracking-tight text-[var(--bone)] hover:text-[var(--copper)] transition-colors">
              {w}
            </span>
            <Asterisk />
          </span>
        ))}
      </div>
    </section>
  );
}

function Asterisk() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--copper)] opacity-80" aria-hidden>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* =============================================================
   MANIFESTO — storytelling, ritmo lento
   ============================================================= */
function Manifesto() {
  return (
    <section id="manifesto" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3 reveal">
          <span className="tracking-eyebrow text-[var(--copper)]">— Manifesto</span>
        </div>
        <div className="md:col-span-9">
          <p className="reveal font-display font-light text-3xl md:text-5xl lg:text-6xl leading-[1.08] tracking-[-0.02em] text-[var(--bone)]">
            Acreditamos que beleza não é vaidade.
            <span className="text-[var(--bone-2)]/50"> É </span>
            <em className="font-italic-serif text-[var(--copper-2)]">memória do corpo</em>
            <span className="text-[var(--bone-2)]/50">, é</span> linguagem,
            <span className="text-[var(--bone-2)]/50"> é o</span> gesto silencioso
            <span className="text-[var(--bone-2)]/50"> com que </span>
            cada pessoa se devolve a si mesma.
          </p>
          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 gap-10 max-w-3xl">
            <ManifestoBlock
              n="i."
              title="Ritmo e silêncio"
              text="Cada cadeira é uma ilha. Atendimentos com tempo de respirar — não de produção em série."
            />
            <ManifestoBlock
              n="ii."
              title="Curadoria de mãos"
              text="Profissionais escolhidas a dedo. Esteticistas, cabeleireiros e designers reconhecidos por nome."
            />
            <ManifestoBlock
              n="iii."
              title="Protocolos clínicos"
              text="Da depilação a laser ao tratamento para acne: técnica que sustenta o resultado."
            />
            <ManifestoBlock
              n="iv."
              title="Hospitalidade Marista"
              text="O Setor Marista entra pela porta. Você sai como referência."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoBlock({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="reveal">
      <span className="font-italic-serif text-[var(--copper)] text-2xl">{n}</span>
      <h3 className="mt-2 font-display text-xl md:text-2xl text-[var(--bone)]">{title}</h3>
      <p className="mt-2 text-[var(--bone-2)]/80 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

/* =============================================================
   STATS — prova social numérica (Cialdini)
   ============================================================= */
function Stats() {
  return (
    <section className="border-y border-[var(--ink-3)] bg-[var(--ink-2)]/30">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat big="4,7" label="Avaliação Google" sub={<Stars rating={BUSINESS.rating} />} />
        <Stat big="239" label="Vozes registradas" sub={<span className="text-[var(--bone-2)]/60 text-xs">e contando</span>} />
        <Stat big="27+" label="Rituais & serviços" />
        <Stat big="20h" label="Aberto até diariamente" sub={<span className="text-[var(--bone-2)]/60 text-xs">Qua–Sáb</span>} />
      </div>
    </section>
  );
}

function Stat({ big, label, sub }: { big: string; label: string; sub?: React.ReactNode }) {
  return (
    <div className="reveal">
      <div className="font-display text-5xl md:text-7xl font-light tracking-tight">{big}</div>
      <div className="mt-2 tracking-eyebrow text-[var(--bone-2)]/70">{label}</div>
      {sub && <div className="mt-3">{sub}</div>}
    </div>
  );
}

/* =============================================================
   SERVICES — bento grid + lista numerada hoverable
   ============================================================= */
function Services() {
  return (
    <section id="servicos" className="py-32 md:py-44 relative">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5 reveal">
            <span className="tracking-eyebrow text-[var(--copper)]">— O ofício</span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
              Doze gestos.
              <br />
              <em className="font-italic-serif text-[var(--bone-2)]/70">Uma assinatura.</em>
            </h2>
          </div>
          <p className="md:col-span-5 md:col-start-8 reveal text-[var(--bone-2)] leading-relaxed self-end">
            Do corte ao laser, da noiva ao cliente que vem pela primeira vez.
            Cada serviço é desenhado em torno da pessoa — nunca o contrário.
          </p>
        </div>

        {/* Bento featured */}
        <div className="grid md:grid-cols-6 gap-4 md:gap-5 mb-5">
          <BentoFeature
            className="md:col-span-4 md:row-span-2 md:min-h-[480px]"
            tag="Estrela da casa"
            title="Cabelo & Cor"
            text="Da escova clássica à coloração editorial. A nossa especialidade é fazer com que o cabelo não pareça feito — pareça nascido assim."
            image="/images/studioy-hair-motion.png"
            imageAlt="Mulher exibindo cabelo com brilho e movimento em estilo editorial"
            big
          />
          <BentoFeature
            className="md:col-span-2"
            tag="Olhar"
            title="Brow Lamination"
            text="A sobrancelha que desperta o rosto."
            image="/images/studioy-hero-model.png"
            imageAlt="Retrato de beleza com foco em fios bem tratados e visual sofisticado"
          />
          <BentoFeature
            className="md:col-span-2"
            tag="Ambiente"
            title="Experiência Studio"
            text="Conforto, espelhos, luz quente e atmosfera premium do início ao fim."
            image="/images/studioy-salon-interior.png"
            imageAlt="Interior elegante de salão de beleza premium"
          />
        </div>

        {/* Numbered list */}
        <ul className="mt-16 border-t border-[var(--ink-3)]">
          {SERVICES.map((s) => (
            <li
              key={s.n}
              className="svc hoverable group flex items-center gap-6 md:gap-10 py-6 md:py-8 border-b border-[var(--ink-3)] cursor-pointer relative"
            >
              <span className="svc-num font-italic-serif text-[var(--bone-2)]/40 text-sm w-10">{s.n}</span>
              <span className="font-display text-2xl md:text-4xl font-light tracking-tight flex-1">{s.title}</span>
              <span className="hidden md:block text-[var(--bone-2)]/60 text-sm max-w-xs italic font-italic-serif">{s.note}</span>
              <span className="tracking-eyebrow text-[var(--bone-2)]/40 text-[10px]">{s.tag}</span>
              <span className="svc-arrow text-2xl">→</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center reveal">
          <p className="text-[var(--bone-2)]/70 text-sm mb-6 font-italic-serif italic">
            Não encontrou o que procura? Atendemos sob consulta.
          </p>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener" className="btn-primary hoverable">
            Conversar no WhatsApp
            <span className="arr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </a>
        </div>
      </div>
    </section>
  );
}

function BentoFeature({
  className = "",
  tag,
  title,
  text,
  image,
  imageAlt,
  big = false,
}: {
  className?: string;
  tag: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  big?: boolean;
}) {
  return (
    <article className={`bento bento-glow hoverable flex flex-col justify-between ${className}`}>
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt={imageAlt || title} className="w-full h-full object-cover opacity-60" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,10,9,0.92)] via-[rgba(12,10,9,0.45)] to-[rgba(12,10,9,0.15)]" />
        </div>
      )}
      <div className="relative p-6 md:p-10 h-full flex flex-col justify-between min-h-[260px]">
        <span className="tracking-eyebrow text-[var(--copper)]">{tag}</span>
        <div className="mt-auto">
          <h3 className={`font-display font-light tracking-tight leading-[0.95] ${big ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"}`}>
            {title}
          </h3>
          <p className={`mt-4 text-[var(--bone-2)]/90 ${big ? "max-w-md" : "text-sm max-w-sm"} leading-relaxed`}>{text}</p>
        </div>
      </div>
      <DecorativeCircle />
    </article>
  );
}

function DecorativeCircle() {
  return (
    <svg
      className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10 pointer-events-none"
      viewBox="0 0 200 200"
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--copper)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="var(--copper)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="var(--copper)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="30" fill="none" stroke="var(--copper)" strokeWidth="0.5" />
    </svg>
  );
}

/* =============================================================
   TESTIMONIALS — palavras reais do Google (prova social)
   ============================================================= */
function Testimonials() {
  return (
    <section id="vozes" className="py-32 md:py-44 relative overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="reveal">
            <span className="tracking-eyebrow text-[var(--copper)]">— Vozes</span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl font-light leading-[0.95] tracking-[-0.02em]">
              239 pessoas <em className="font-italic-serif text-[var(--bone-2)]/70">já disseram</em>.
            </h2>
          </div>
          <div className="flex items-center gap-3 reveal">
            <div className="text-right">
              <div className="font-display text-5xl">4,7</div>
              <div className="tracking-eyebrow text-[var(--bone-2)]/60 text-[10px]">Google · {BUSINESS.reviews} avaliações</div>
            </div>
            <Stars rating={BUSINESS.rating} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="bento bento-glow p-8 md:p-10 reveal hoverable" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="font-display text-6xl text-[var(--copper)] leading-none mb-4">"</div>
              <blockquote className="font-display text-xl md:text-2xl font-light leading-snug tracking-tight">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between text-xs text-[var(--bone-2)]/60">
                <span>— {t.author}</span>
                <span className="tracking-eyebrow">{t.src}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   VISIT — endereço, horários, mapa SVG estilizado
   ============================================================= */
function Visit() {
  return (
    <section id="visita" className="py-32 md:py-44 border-t border-[var(--ink-3)] bg-[var(--ink-2)]/40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 reveal">
          <span className="tracking-eyebrow text-[var(--copper)]">— A visita</span>
          <h2 className="mt-4 font-display text-5xl md:text-6xl font-light leading-[0.95] tracking-[-0.02em]">
            Encontre-nos
            <br />
            <em className="font-italic-serif text-[var(--bone-2)]/70">no Marista</em>.
          </h2>
          <dl className="mt-12 space-y-6 text-[var(--bone-2)]">
            <div>
              <dt className="tracking-eyebrow text-[var(--bone-2)]/50 mb-1">Endereço</dt>
              <dd className="text-lg leading-relaxed">{BUSINESS.address}</dd>
            </div>
            <div>
              <dt className="tracking-eyebrow text-[var(--bone-2)]/50 mb-1">Horário</dt>
              <dd className="text-lg flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--copper)] twinkle" />
                Quarta a sábado · 08h00 — 20h00
              </dd>
            </div>
            <div>
              <dt className="tracking-eyebrow text-[var(--bone-2)]/50 mb-1">Telefone</dt>
              <dd className="text-lg">
                <a href={BUSINESS.phoneLink} className="hover:text-[var(--copper)] transition-colors hoverable">
                  {BUSINESS.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className="btn-primary hoverable">
              Traçar rota
              <span className="arr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </a>
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener" className="btn-ghost hoverable">
              <WhatsappIcon /> WhatsApp
            </a>
          </div>
        </div>

        {/* Real Google Maps embed */}
        <div className="md:col-span-7 reveal">
          <div className="bento bento-glow relative overflow-hidden group min-h-[420px] md:min-h-[560px]">
            <iframe
              title="Localização do Studio Y no Google Maps"
              src={BUSINESS.mapsEmbed}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 pointer-events-none">
              <div className="rounded-[22px] border border-white/10 bg-[rgba(12,10,9,0.76)] backdrop-blur-md p-5 md:p-6 flex items-end justify-between gap-4 pointer-events-auto">
                <div>
                  <div className="tracking-eyebrow text-[var(--copper)] mb-2">Localização real · Google Maps</div>
                  <div className="font-display text-xl md:text-3xl">Alameda Ricardo Paranhos, 251</div>
                  <div className="text-sm text-[var(--bone-2)]/70 mt-1">St. Marista · Goiânia</div>
                </div>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="hoverable shrink-0 rounded-full w-12 h-12 grid place-items-center bg-[var(--bone)] text-[var(--ink)] hover:rotate-[-45deg] transition-transform duration-500"
                  aria-label="Abrir localização do Studio Y no Google Maps"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsappIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.4 17.2L2 22l4.9-1.4A11 11 0 1 0 20.5 3.5zM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1l-.7 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c-.1-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3 5.3 5.3 0 0 0 1.1 2.8 12.1 12.1 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.5 3.5 0 0 0 1.5 0 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.3-.2-.5-.3z" fill="currentColor"/>
    </svg>
  );
}


/* =============================================================
   FINAL CTA — único, irresistível (CRO: foco máximo)
   ============================================================= */
function FinalCTA() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="fog" style={{ width: 700, height: 700, background: "var(--copper)", top: "-20%", left: "20%", opacity: 0.25 }} />
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 text-center relative">
        <span className="tracking-eyebrow text-[var(--copper)] reveal inline-block">— O próximo gesto é seu</span>
        <h2 className="reveal mt-6 font-display font-light text-6xl md:text-9xl leading-[0.9] tracking-[-0.03em]">
          Reserve sua
          <br />
          <em className="font-italic-serif text-[var(--copper-2)]">metamorfose</em>.
        </h2>
        <p className="reveal mt-8 text-[var(--bone-2)]/80 max-w-xl mx-auto leading-relaxed">
          Agendas abrem na quarta às 08h. Atendimento por horário marcado para garantir
          o tempo justo entre você e a profissional.
        </p>
        <div className="reveal mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener" className="btn-primary hoverable">
            Agendar no WhatsApp
            <span className="arr"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          </a>
          <a href={BUSINESS.phoneLink} className="btn-ghost hoverable">
            <Phone /> Ligar agora
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   FOOTER
   ============================================================= */
function Footer() {
  return (
    <footer className="border-t border-[var(--ink-3)] py-14 md:py-20">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <YMark />
            <span className="font-display text-2xl">Studio Y</span>
          </div>
          <p className="mt-4 text-[var(--bone-2)]/70 max-w-sm text-sm leading-relaxed">
            Ateliê de beleza no Setor Marista, Goiânia. Cabelo, estética,
            sobrancelhas, unhas, noivas e atendimento VIP.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="tracking-eyebrow text-[var(--bone-2)]/50 mb-3">Visite</div>
          <p className="text-sm text-[var(--bone-2)] leading-relaxed">{BUSINESS.address}</p>
          <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className="mt-3 inline-block text-[var(--copper)] hover:underline text-sm hoverable">Abrir no Google Maps ↗</a>
        </div>
        <div className="md:col-span-2">
          <div className="tracking-eyebrow text-[var(--bone-2)]/50 mb-3">Fale</div>
          <ul className="space-y-2 text-sm">
            <li><a href={BUSINESS.phoneLink} className="hover:text-[var(--copper)] hoverable">{BUSINESS.phone}</a></li>
            <li><a href={BUSINESS.whatsapp} target="_blank" rel="noopener" className="hover:text-[var(--copper)] hoverable">WhatsApp ↗</a></li>
            <li><a href={BUSINESS.instagram} target="_blank" rel="noopener" className="hover:text-[var(--copper)] hoverable">Instagram ↗</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="tracking-eyebrow text-[var(--bone-2)]/50 mb-3">Navegue</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#manifesto" className="hover:text-[var(--copper)]">Manifesto</a></li>
            <li><a href="#servicos" className="hover:text-[var(--copper)]">Serviços</a></li>
            <li><a href="#vozes" className="hover:text-[var(--copper)]">Vozes</a></li>
            <li><a href="#visita" className="hover:text-[var(--copper)]">Visita</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 mt-14 pt-8 border-t border-[var(--ink-3)] flex flex-col md:flex-row justify-between gap-4 text-xs text-[var(--bone-2)]/50">
        <span>© {new Date().getFullYear()} Studio Y · Todos os direitos reservados</span>
        <span className="font-italic-serif italic">Feito com gesto e atenção em Goiânia.</span>
      </div>
    </footer>
  );
}

/* =============================================================
   Helpers
   ============================================================= */
function currentGoiania(): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    }).format(new Date());
  } catch {
    return "";
  }
}
