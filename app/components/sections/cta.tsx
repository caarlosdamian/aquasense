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

export default function Cta({ dict, sectionBg = "bg-white" }: CtaProps) {
  const t = dict.cta;
  const ref = useScrollAnimation();

  return (
    <section id="cta" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div
          className="animate-on-scroll animate-scale relative overflow-hidden rounded-3xl p-12 shadow-2xl sm:p-16"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, #3b82f6 0%, #06b6d4 60%, #0e7490 100%)",
          }}
        >
          {/* Pulsing glow blobs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 animate-pulse rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white drop-shadow sm:text-4xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-100">
              {t.subtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Solid white primary */}
              <a
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-50 hover:shadow-xl"
              >
                {t.primaryCta}
              </a>
              {/* Glassmorphic secondary */}
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 bg-white/20 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
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
