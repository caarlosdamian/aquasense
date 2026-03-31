"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface HeroProps {
  dict: {
    hero: {
      tagline: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      statusPill: string;
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
        <span className="animate-on-scroll mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          <span>⭐⭐⭐⭐⭐</span>
          <span>{t.tagline}</span>
        </span>

        <h1 className="animate-on-scroll stagger-1 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
            {t.title.split(" ").slice(0, 2).join(" ")}
          </span>{" "}
          {t.title.split(" ").slice(2).join(" ")}
        </h1>

        <p className="animate-on-scroll stagger-2 mt-6 max-w-2xl text-lg leading-relaxed text-white/85 drop-shadow-md sm:text-xl">
          {t.subtitle}
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
  return (
    <section ref={ref} className="relative overflow-visible bg-transparent">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-cyan-400/15 blur-3xl" />

      {/* ── Floating background bubbles ── */}
      {/* Left side */}
      <span className="bubble pointer-events-none" style={{ "--duration": "5s", "--delay": "0s", width: "40px", height: "40px", left: "4%", bottom: "20%", opacity: 0.25 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "7s", "--delay": "1s", width: "18px", height: "18px", left: "9%", bottom: "10%", opacity: 0.2 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "6s", "--delay": "2.5s", width: "28px", height: "28px", left: "16%", bottom: "5%", opacity: 0.18 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "4s", "--delay": "0.8s", width: "12px", height: "12px", left: "22%", bottom: "30%", opacity: 0.22 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "8s", "--delay": "3s", width: "52px", height: "52px", left: "2%", bottom: "40%", opacity: 0.12 } as React.CSSProperties} />
      {/* Center */}
      <span className="bubble pointer-events-none" style={{ "--duration": "6s", "--delay": "1.5s", width: "22px", height: "22px", left: "35%", bottom: "8%", opacity: 0.15 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "5s", "--delay": "0.3s", width: "10px", height: "10px", left: "42%", bottom: "25%", opacity: 0.2 } as React.CSSProperties} />
      {/* Right side */}
      <span className="bubble pointer-events-none" style={{ "--duration": "7s", "--delay": "2s", width: "16px", height: "16px", left: "68%", bottom: "5%", opacity: 0.2 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "4.5s", "--delay": "0.5s", width: "30px", height: "30px", left: "80%", bottom: "15%", opacity: 0.15 } as React.CSSProperties} />
      <span className="bubble pointer-events-none" style={{ "--duration": "6.5s", "--delay": "1.8s", width: "14px", height: "14px", left: "90%", bottom: "30%", opacity: 0.18 } as React.CSSProperties} />


      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* ── LEFT: CTA content ── */}
        <div className="animate-on-scroll order-1 flex flex-col items-start">
          {/* Tagline pill */}
          <span className="mb-5 inline-flex items-center gap-2 rounded-full  pr-4 py-1.5 text-md font-semibold uppercase tracking-widest ">
            <span className="text-xl">⭐⭐⭐⭐⭐</span>
            <span>{t.tagline}</span>
          </span>

          <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-foreground">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {t.title.split(" ").slice(0, 2).join(" ")}
            </span>{" "}
            {t.title.split(" ").slice(2).join(" ")}
          </h1>

          <p className="stagger-2 mt-4 max-w-lg text-lg leading-relaxed text-slate-500 dark:text-muted-foreground">
            {t.subtitle}
          </p>

          {/* Stats row */}
          <div className="stagger-3 mt-8 grid grid-cols-4 gap-4 border-t border-slate-100 pt-6 w-full max-w-sm dark:border-border">
            {[
              { value: "2026", label: "Launch Year" },
              { value: "99.9%", label: "Success Rate" },
              { value: "24/7", label: "Support" },
              { value: "50+", label: "Experts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold text-blue-600 dark:text-primary">{stat.value}</p>
                <p className="text-[10px] leading-tight text-slate-500 dark:text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="stagger-4 mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            >
              {t.primaryCta} →
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-blue-200 bg-white px-8 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:scale-105 dark:border-border dark:bg-surface-raised dark:text-foreground dark:hover:bg-surface"
            >
              {t.secondaryCta}
            </a>
          </div>
        </div>

        {/* ── RIGHT: Image card ── */}
        <div className="animate-on-scroll order-2 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Floating achievement badge */}
            <div className="absolute -top-4 left-6 z-10 flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-lg backdrop-blur-sm dark:border-border dark:bg-surface-raised">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-foreground">🎯 {t.statusPill}</span>
            </div>

            {/* Main image card — hover scale + glow */}
            <div className="hero-image-card overflow-hidden rounded-3xl shadow-2xl ring-1 ring-blue-100 dark:ring-border cursor-pointer">
              {/* Image wrapper with overflow:hidden to contain bubbles */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/pool.jpg"
                  alt="Crystal clear swimming pool monitored by AquaSense"
                  fill
                  priority
                  className="hero-image-inner object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Bubbles — each with different size, delay, horizontal position */}
                <span
                  className="bubble"
                  style={{ "--duration": "3.2s", "--delay": "0s", width: "18px", height: "18px", left: "12%" } as React.CSSProperties}
                />
                <span
                  className="bubble"
                  style={{ "--duration": "2.8s", "--delay": "0.6s", width: "10px", height: "10px", left: "28%" } as React.CSSProperties}
                />
                <span
                  className="bubble"
                  style={{ "--duration": "4s", "--delay": "1.2s", width: "24px", height: "24px", left: "45%" } as React.CSSProperties}
                />
                <span
                  className="bubble"
                  style={{ "--duration": "3s", "--delay": "0.9s", width: "14px", height: "14px", left: "62%" } as React.CSSProperties}
                />
                <span
                  className="bubble"
                  style={{ "--duration": "2.5s", "--delay": "0.3s", width: "8px", height: "8px", left: "75%" } as React.CSSProperties}
                />
                <span
                  className="bubble"
                  style={{ "--duration": "3.6s", "--delay": "1.8s", width: "20px", height: "20px", left: "88%" } as React.CSSProperties}
                />

                {/* Subtle blue shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 pointer-events-none" />
              </div>

              {/* Metrics bar */}
              <div className="flex items-center justify-around bg-white px-6 py-4 dark:bg-surface-raised">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600 dark:text-primary">8.2</p>
                  <p className="text-xs text-slate-500 dark:text-muted-foreground">pH Level</p>
                </div>
                <div className="h-8 w-px bg-slate-100 dark:bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600 dark:text-primary">2.5ppm</p>
                  <p className="text-xs text-slate-500 dark:text-muted-foreground">Chlorine</p>
                </div>
                <div className="h-8 w-px bg-slate-100 dark:bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600 dark:text-primary">95°F</p>
                  <p className="text-xs text-slate-500 dark:text-muted-foreground">Temperature</p>
                </div>
              </div>
            </div>
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
