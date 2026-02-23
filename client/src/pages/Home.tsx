import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Play,
  Pause,
  Heart,
  Users,
  Briefcase,
  Quote,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ============================================================
   ANIMATED SECTION WRAPPER
   ============================================================ */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function StaggerItem({
  children,
  index = 0,
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 hover:bg-card/60 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-foreground/85" style={{ fontFamily: "'Inter', sans-serif" }}>
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-foreground/40 text-xl shrink-0 leading-none"
            >
              +
            </motion.span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-4 pb-4 sm:px-6 sm:pb-5 text-sm text-foreground/60 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              {item.a}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToConcept = () => conceptRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Load Typeform embed script after React renders the data-tf-live div
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, []);

  const matchingDimensions = [
    { icon: Heart, title: t("matching.d1.title"), desc: t("matching.d1.desc") },
    { icon: Users, title: t("matching.d2.title"), desc: t("matching.d2.desc") },
    { icon: Briefcase, title: t("matching.d3.title"), desc: t("matching.d3.desc") },
  ];

  const testimonials = [
    { quote: t("proof.q1"), author: t("proof.q1.author") },
    { quote: t("proof.q2"), author: t("proof.q2.author") },
    { quote: t("proof.q3"), author: t("proof.q3.author") },
  ];

  const painPoints = [
    { title: t("pain.p1.title"), desc: t("pain.p1.desc") },
    { title: t("pain.p2.title"), desc: t("pain.p2.desc") },
    { title: t("pain.p3.title"), desc: t("pain.p3.desc") },
    { title: t("pain.p4.title"), desc: t("pain.p4.desc") },
  ];

  const phases = [
    {
      label: t("story.phase1.label"),
      headline: t("story.phase1.headline"),
      vibe: t("story.phase1.vibe"),
      connection: t("story.phase1.connection"),
      result: t("story.phase1.result"),
      accent: "border-foreground/10",
    },
    {
      label: t("story.phase2.label"),
      headline: t("story.phase2.headline"),
      vibe: t("story.phase2.vibe"),
      connection: t("story.phase2.connection"),
      result: t("story.phase2.result"),
      accent: "border-foreground/10",
    },
    {
      label: t("story.phase3.label"),
      headline: t("story.phase3.headline"),
      vibe: t("story.phase3.vibe"),
      connection: t("story.phase3.connection"),
      result: t("story.phase3.result"),
      accent: "border-foreground/20",
    },
  ];

  return (
    <div className="relative">
      {/* =============================================
          HERO
          ============================================= */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="hero-video-container">
          <video ref={videoRef} autoPlay muted loop playsInline className="hero-video">
            <source src="/Dinner_Table_After_Golden_Hour.mp4" type="video/mp4" />
          </video>
          <div className="hero-gradient-overlay" />
        </div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-12 py-4 sm:py-5 flex items-center justify-between">
          <div className="hero-brand-title">{t("nav.brand")}</div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="lang-toggle">
              <button onClick={() => language !== "de" && toggleLanguage()} className={language === "de" ? "active" : ""}>DE</button>
              <span className="lang-toggle-divider" />
              <button onClick={() => language !== "en" && toggleLanguage()} className={language === "en" ? "active" : ""}>EN</button>
            </div>
            <button className="btn-outlined-white hidden sm:inline-block" onClick={scrollToForm}>{t("nav.apply")}</button>
          </div>
        </nav>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 px-4 sm:px-6 md:px-16 pb-14 sm:pb-20 md:pb-28 max-w-4xl"
        >
          {/* Eyebrow */}
          <p className="mb-4 text-white/55 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t("hero.eyebrow")}
          </p>

          {/* Headline */}
          <h1 className="hero-headline mb-5">{t("hero.headline")}</h1>

          {/* Subheadline */}
          <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t("hero.subheadline")}
          </p>

          {/* Beta badge */}
          <div className="inline-flex items-center gap-2 mb-5 sm:mb-8 px-3 sm:px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-white/80 text-xs tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              {t("hero.beta")}
            </span>
          </div>

          {/* Hook text */}
          <p className="text-white/55 text-sm max-w-xl leading-relaxed mb-5 sm:mb-8 italic hidden sm:block" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t("hero.hook")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <button className="btn-outlined-white" onClick={scrollToForm}>{t("hero.cta")}</button>
            <button
              onClick={scrollToConcept}
              className="text-white/55 text-sm self-center hover:text-white/80 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.03em" }}
            >
              {t("hero.cta2")}
            </button>
          </div>
        </motion.div>

        {/* Video Control */}
        <button onClick={toggleVideo} className="video-control-btn" aria-label="Toggle video">
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
        </button>
      </section>

      {/* =============================================
          CONTENT SECTIONS
          ============================================= */}
      <div className="relative z-10 bg-background">

        {/* =============================================
            FOUNDER STORY — 3-Phase Evolution
            ============================================= */}
        <div ref={conceptRef as any}>
          <AnimatedSection className="section-padding bg-background">
            <div className="container mx-auto max-w-6xl">
              <div className="mb-14">
                <h2>{t("story.title")}</h2>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {phases.map((phase, i) => (
                  <StaggerItem key={i} index={i}>
                    <div className={`h-full rounded-xl border ${phase.accent} bg-card p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 ${i === 2 ? "bg-card/80 border-foreground/15" : ""}`}>
                      {/* Phase label */}
                      <div>
                        <span className="text-xs font-medium tracking-widest uppercase text-foreground/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {phase.label}
                        </span>
                        <h3 className="mt-2 text-lg">{phase.headline}</h3>
                      </div>

                      {/* Vibe */}
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t("story.vibe.label")}
                        </p>
                        <p className="text-sm text-foreground/65 leading-relaxed">{phase.vibe}</p>
                      </div>

                      {/* Connection */}
                      <div>
                        <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t("story.connection.label")}
                        </p>
                        <p className="text-sm text-foreground/65 leading-relaxed">{phase.connection}</p>
                      </div>

                      {/* Result */}
                      <div className="mt-auto pt-4 border-t border-border">
                        <p className="text-xs font-semibold tracking-widest uppercase text-foreground/35 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t("story.result.label")}
                        </p>
                        <p className={`text-sm font-medium ${i === 2 ? "text-foreground" : "text-foreground/55"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                          {phase.result}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* =============================================
            PAIN SECTION
            ============================================= */}
        <AnimatedSection className="section-padding bg-card/40">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-10">
              <h2 className="mb-5">{t("pain.title")}</h2>
              <p className="text-foreground/65 text-lg leading-relaxed max-w-3xl">
                {t("pain.intro")}
              </p>
            </div>

            <div className="section-divider mb-12" />

            <h3 className="text-base font-semibold mb-8 text-foreground/60 tracking-wide uppercase" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
              {t("pain.section.title")}
            </h3>

            <div className="space-y-6">
              {painPoints.map((point, i) => (
                <StaggerItem key={i} index={i}>
                  <div className="p-5 sm:p-7 rounded-xl border border-border bg-background hover:border-foreground/10 transition-all duration-300">
                    <h3 className="text-base mb-3">{point.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{point.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* =============================================
            SOCIAL PROOF — Testimonials
            ============================================= */}
        <AnimatedSection className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-14">
              <h2>{t("proof.title")}</h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((t_item, i) => (
                <StaggerItem key={i} index={i}>
                  <div className="glass-card p-5 sm:p-7 h-full flex flex-col gap-4 sm:gap-5">
                    <Quote className="w-6 h-6 text-foreground/20 shrink-0" />
                    <p className="text-sm text-foreground/75 leading-relaxed flex-1 italic">
                      „{t_item.quote}"
                    </p>
                    <p className="text-xs text-foreground/40 font-medium tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                      — {t_item.author}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* =============================================
            MATCHING SYSTEM
            ============================================= */}
        <AnimatedSection className="section-padding bg-card/40">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-6">
              <h2 className="mb-4">{t("matching.title")}</h2>
              <p className="text-foreground/60 text-lg leading-relaxed max-w-3xl">
                {t("matching.subtitle")}
              </p>
            </div>

            <div className="section-divider mb-14" />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              {matchingDimensions.map((dim, i) => (
                <StaggerItem key={i} index={i}>
                  <div className="glass-card p-5 sm:p-8 h-full">
                    <div className="icon-circle mb-4 sm:mb-6">
                      <dim.icon className="w-5 h-5" style={{ color: "oklch(0.42 0.08 45)" }} />
                    </div>
                    <h3 className="text-base mb-3">{dim.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{dim.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* =============================================
            HOW IT WORKS — 5 Steps
            ============================================= */}
        <AnimatedSection className="section-padding bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-14">
              <h2 className="mb-2">{t("how.title")}</h2>
              <p className="text-foreground/45 text-base" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
                {t("how.subtitle")}
              </p>
            </div>

            <div className="relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[2rem] top-10 bottom-10 w-px bg-border hidden md:block" />

              <div className="space-y-6">
                {([
                  { num: t("how.step1.num"), title: t("how.step1.title"), desc: t("how.step1.desc") },
                  { num: t("how.step2.num"), title: t("how.step2.title"), desc: t("how.step2.desc") },
                  { num: t("how.step3.num"), title: t("how.step3.title"), desc: t("how.step3.desc") },
                  { num: t("how.step4.num"), title: t("how.step4.title"), desc: t("how.step4.desc") },
                  { num: t("how.step5.num"), title: t("how.step5.title"), desc: t("how.step5.desc") },
                ] as { num: string; title: string; desc: string }[]).map((step, i) => (
                  <StaggerItem key={i} index={i}>
                    <div className="flex gap-4 sm:gap-6 md:gap-10 items-start">
                      {/* Step number circle */}
                      <div className="relative z-10 shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-border bg-background flex items-center justify-center">
                        <span
                          className="text-[0.65rem] sm:text-xs font-semibold tracking-widest text-foreground/40"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {step.num}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="pt-3 pb-6 flex-1 border-b border-border last:border-0">
                        <h3 className="text-base mb-2">{step.title}</h3>
                        <p className="text-sm text-foreground/55 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* =============================================
            FAQ
            ============================================= */}
        <AnimatedSection className="section-padding bg-card/40">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-12">
              <h2>{t("faq.title")}</h2>
            </div>
            <FaqAccordion items={[
              { q: t("faq.q1"), a: t("faq.a1") },
              { q: t("faq.q2"), a: t("faq.a2") },
              { q: t("faq.q3"), a: t("faq.a3") },
              { q: t("faq.q4"), a: t("faq.a4") },
              { q: t("faq.q5"), a: t("faq.a5") },
              { q: t("faq.q6"), a: t("faq.a6") },
              { q: t("faq.q7"), a: t("faq.a7") },
              { q: t("faq.q8"), a: t("faq.a8") },
            ]} />
          </div>
        </AnimatedSection>

        {/* =============================================
            APPLICATION FORM
            ============================================= */}
        <div ref={formRef} id="apply">
          <AnimatedSection className="section-padding bg-card/40">
            <div className="container mx-auto max-w-3xl">
              <div className="text-center mb-10">
                <h2 className="mb-3">{t("form.title")}</h2>
                <p className="text-foreground/55 leading-relaxed">{t("form.subtitle")}</p>
              </div>
              <div data-tf-live="01KJ5ASHWCJ5KE6HHXA90W8VKK" className="min-h-[400px] sm:min-h-[540px]" />
            </div>
          </AnimatedSection>
        </div>

        {/* =============================================
            FOOTER
            ============================================= */}
        <footer className="py-8 sm:py-12 bg-background border-t border-border">
          <div className="container mx-auto">
            {/* Closing statement */}
            <p
              className="text-center mb-10 text-foreground/40 text-sm italic"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}
            >
              {t("footer.closing")}
            </p>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-foreground/35 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t("footer.copyright")}
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <a href="#" className="text-foreground/35 hover:text-foreground transition-colors duration-200">{t("footer.privacy")}</a>
                <a href="#" className="text-foreground/35 hover:text-foreground transition-colors duration-200">{t("footer.terms")}</a>
                <a href="/impressum" className="text-foreground/35 hover:text-foreground transition-colors duration-200">Impressum</a>
                <a href="mailto:daniel.schneider@gopassion.io" className="text-foreground/35 hover:text-foreground transition-colors duration-200">{t("footer.contact")}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
