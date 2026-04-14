"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface HeroHighlight {
  icon: string;
  title: string;
  description: string;
}

interface HeroProps {
  dict: {
    hero: {
      brand: string;
      tagline: string;
      title: string;
      note: string;
      primaryCta: string;
      secondaryCta: string;
      highlights?: HeroHighlight[];
      metrics: {
        ph: { value: string; label: string };
        chlorine: { value: string; label: string };
        temp: { value: string; label: string };
      };
    };
  };
  variant?: "centered" | "split";
}

// ─── Centered variant ────────────────────────────────────────────────────────
function HeroCentered({ t, ref }: { t: HeroProps["dict"]["hero"]; ref: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      <Image src="/hero-bg.png" alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-500/10" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32 lg:py-40">
        <span className="animate-on-scroll mb-4 text-3xl font-black tracking-tight text-blue-400 sm:text-4xl">
          {t.brand}
        </span>
        <span className="animate-on-scroll mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          <span>{t.tagline}</span>
        </span>

        <h1 className="animate-on-scroll stagger-1 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          {t.title}
        </h1>

        <p className="animate-on-scroll stagger-2 mt-6 max-w-2xl text-lg leading-relaxed text-white/85 drop-shadow-md sm:text-xl">
          {t.note}
        </p>

        <div className="animate-on-scroll stagger-3 mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#cta"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            {t.primaryCta}
          </a>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {t.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Split variant ───────────────────────────────────────────────────────────
function HeroSplit({ t, ref }: { t: HeroProps["dict"]["hero"]; ref: React.RefObject<HTMLElement | null> }) {
  // Helper to highlight specific words in the title for both English and Spanish
  const renderTitle = (title: string) => {
    // Split by the target words while keeping them in the array
    const parts = title.split(/(data|efficiency|eficiencia|transparency|transparencia)/i);

    return parts.map((part, i) => {
      const lowerPart = part.toLowerCase();
      if (lowerPart === "data") {
        return <span key={i} className="text-cyan-500 font-bold italic">{part}</span>;
      }
      if (lowerPart === "efficiency" || lowerPart === "eficiencia") {
        return <span key={i} className="text-emerald-500 font-bold italic">{part}</span>;
      }
      if (lowerPart === "transparency" || lowerPart === "transparencia") {
        return <span key={i} className="text-blue-600 font-bold italic">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "clipboard":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          </svg>
        );
      case "droplets":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6.3-4-6.3S3 9 3 12.3c0 2.2 1.8 4 4 4z" />
            <path d="M17 21c2.8 0 5-2.2 5-5 0-4-5-8-5-8s-5 4-5 8c0 2.8 2.2 5 5 5z" />
          </svg>
        );
      case "eye":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-blue-500/10 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-3xl opacity-50" />

      {/* Floating background bubbles - Preserved */}
      <span className="bubble pointer-events-none" style={{ "--duration": "5s", "--delay": "0s", width: "40px", height: "40px", left: "4%", bottom: "20%", opacity: 0.15 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "8s", "--delay": "3s", width: "52px", height: "52px", left: "2%", bottom: "40%", opacity: 0.1 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "6s", "--delay": "1.5s", width: "22px", height: "22px", left: "35%", bottom: "8%", opacity: 0.1 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "7s", "--delay": "2s", width: "16px", height: "16px", left: "68%", bottom: "5%", opacity: 0.1 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "4.5s", "--delay": "0.5s", width: "30px", height: "30px", left: "80%", bottom: "15%", opacity: 0.1 } as React.CSSProperties} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* ── LEFT: CTA content ── */}
        <div className="animate-on-scroll order-1 flex flex-col items-start">
          <h1 className="mb-2 text-6xl font-black tracking-tight text-blue-600 sm:text-7xl lg:text-8xl dark:text-blue-500">
            {t.brand}
          </h1>
          <h2 className="mb-6 text-2xl font-bold tracking-wide text-blue-500/90 sm:text-3xl dark:text-blue-400">
            {t.tagline}
          </h2>

          <p className="stagger-1 mb-10 max-w-lg text-xl font-medium leading-snug text-foreground/80">
            {renderTitle(t.title)}
          </p>

          <div className="stagger-2 flex flex-col gap-6 w-full max-w-md">
            {t.highlights?.map((item) => (
              <div key={item.title} className="flex gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-raised shadow-sm ring-1 ring-border group-hover:shadow-md transition-shadow">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="stagger-3 mt-12 flex flex-wrap gap-4">
            <a
              href="#cta"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-10 text-base font-bold text-white shadow-xl shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-[1.02] dark:shadow-none"
            >
              {t.primaryCta}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-border bg-surface-raised px-10 text-base font-bold text-foreground/70 transition-all hover:bg-accent hover:border-border-hover dark:bg-transparent dark:border-border dark:text-foreground/80 dark:hover:bg-white/5"
            >
              {t.secondaryCta}
            </a>
          </div>
          <p className="stagger-4 mt-6 text-sm font-medium text-muted-foreground/60">
            {t.note}
          </p>
        </div>

        {/* ── RIGHT: Image card ── */}
        <div className="animate-on-scroll order-2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            {/* Background decorative square */}
            <div className="absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-3xl bg-blue-50/50 blur-2xl dark:bg-blue-900/10" />

            <div className="hero-image-card group relative overflow-hidden rounded-[2.5rem] bg-surface-raised p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] ring-1 ring-border">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
                <Image
                  src="/hero.jpg"
                  alt="AquaSense Professional Pool Service"
                  fill
                  priority
                  className="hero-image-inner object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Metrics Overlay Bar */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between rounded-[1.5rem] bg-surface-raised/90 px-6 py-5 shadow-lg backdrop-blur-md">
                  <div className="text-center">
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">{t.metrics.ph.value}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{t.metrics.ph.label}</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">{t.metrics.chlorine.value}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{t.metrics.chlorine.label}</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">{t.metrics.temp.value}</p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{t.metrics.temp.label}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Chat Button mockup - matching the image */}
            {/* <div className="absolute -bottom-8 -right-4 z-20">
              <div className="flex items-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 shadow-xl transition-transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-sm font-bold text-white">Chat with us</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function Hero({ dict, variant = "centered" }: HeroProps) {
  const t = dict.hero;
  const ref = useScrollAnimation();

  if (variant === "split") {
    return <HeroSplit t={t} ref={ref} />;
  }

  return <HeroCentered t={t} ref={ref} />;
}
