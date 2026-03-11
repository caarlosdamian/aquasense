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
    };
  };
}

export default function Hero({ dict }: HeroProps) {
  const t = dict.hero;
  const ref = useScrollAnimation();

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
