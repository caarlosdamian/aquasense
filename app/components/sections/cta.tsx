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
}

export default function Cta({ dict }: CtaProps) {
  const t = dict.cta;
  const ref = useScrollAnimation();

  return (
    <section id="cta" ref={ref} className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="animate-on-scroll animate-scale rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-primary/5 p-12 sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {t.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
            >
              {t.primaryCta}
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-8 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              {t.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
