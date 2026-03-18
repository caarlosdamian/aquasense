"use client";

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface CtaProps {
  dict: {
    cta: {
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  sectionBg?: string;
}

export default function Cta({ dict, sectionBg = "bg-surface" }: CtaProps) {
  const t = dict.cta;
  const ref = useScrollAnimation();

  return (
    <section id="cta" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="relative overflow-hidden animate-on-scroll animate-scale rounded-3xl bg-gradient-to-br from-primary-hover to-primary p-12 shadow-2xl sm:p-16">
          {/* Subtle background decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold  text-white sm:text-4xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-50">
              {t.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-primary shadow-lg transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-xl"
              >
                {t.primaryCta}
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
