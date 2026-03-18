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

// ─── Centered variant (original) ────────────────────────────────────────────
function HeroCentered({ t, ref }: { t: HeroProps["dict"]["hero"]; ref: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      {/* Background image */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Gradient accent on top of overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32 lg:py-40">
        <span className="animate-on-scroll mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
          {t.tagline}
        </span>

        <h1 className="animate-on-scroll stagger-1 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
          {t.title}
        </h1>

        <p className="animate-on-scroll stagger-2 mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl drop-shadow-md">
          {t.subtitle}
        </p>

        <div className="animate-on-scroll stagger-3 mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#cta"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
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

// ─── Split variant (image left, CTA right) ──────────────────────────────────
function HeroSplit({ t, ref }: { t: HeroProps["dict"]["hero"]; ref: React.RefObject<HTMLElement | null> }) {
  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background"
    >
      {/* Ambient blobs — themed */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* ── LEFT: CTA content ── */}
        <div className="animate-on-scroll order-1 flex flex-col items-start">
          {/* Tagline pill */}
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span>⭐⭐⭐⭐⭐</span>
            <span>{t.tagline}</span>
          </span>

          <h1 className="stagger-1 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>

          <p className="stagger-2 mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>

          {/* Stats row */}
          <div className="stagger-3 mt-8 grid grid-cols-4 gap-4 border-t border-border pt-6 w-full max-w-sm">
            {[
              { value: "2026", label: "Launch Year" },
              { value: "99.9%", label: "Uptime Rate" },
              { value: "24/7", label: "Support" },
              { value: "50+", label: "Technicians" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold text-primary">{stat.value}</p>
                <p className="text-[10px] leading-tight text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="stagger-4 mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
            >
              {t.primaryCta} →
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface-raised px-8 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              {t.secondaryCta}
            </a>
          </div>
        </div>

        {/* ── RIGHT: Image card ── */}
        <div className="animate-on-scroll order-2 flex justify-center">
          <div className="relative w-full max-w-lg">
            {/* Status pill */}
            <div className="absolute -top-4 left-6 z-10 flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 shadow-lg backdrop-blur-sm">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              <span className="text-sm font-medium text-foreground">🧪 {t.statusPill}</span>
            </div>

            {/* Main image card */}
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/pool.jpg"
                  alt="Crystal clear swimming pool monitored by AquaSense"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Stats bar */}
              <div className="flex items-center justify-around bg-surface-raised px-6 py-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">8.2</p>
                  <p className="text-xs text-muted-foreground">pH Level</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">2.5ppm</p>
                  <p className="text-xs text-muted-foreground">Chlorine</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">95°F</p>
                  <p className="text-xs text-muted-foreground">Temperature</p>
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
