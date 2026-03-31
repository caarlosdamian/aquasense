"use client";

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface Step {
  step: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  dict: {
    howItWorks: {
      sectionTag: string;
      title: string;
      subtitle: string;
      steps: Step[];
    };
  };
  sectionBg?: string;
}

export default function HowItWorks({ dict, sectionBg = "bg-transparent" }: HowItWorksProps) {
  const t = dict.howItWorks;
  const ref = useScrollAnimation();

  return (
    <section id="how-it-works" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="animate-on-scroll mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            {t.sectionTag}
          </span>
          <h2 className="animate-on-scroll stagger-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-foreground">
            {t.title}
          </h2>
          <p className="animate-on-scroll stagger-2 mt-4 text-lg leading-relaxed text-slate-500 dark:text-muted">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {t.steps.map((item, index) => (
            <div key={index} className={`animate-on-scroll stagger-${index + 1} relative text-center`}>
              {/* Gradient step circle */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-xl font-extrabold text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40">
                {item.step}
              </div>
              {/* Connector line with gradient */}
              {index < t.steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-blue-300 to-cyan-200 sm:block dark:from-blue-800 dark:to-cyan-900" />
              )}
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
