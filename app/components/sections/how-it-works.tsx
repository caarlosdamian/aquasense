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
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  const t = dict.howItWorks;
  const ref = useScrollAnimation();

  return (
    <section id="how-it-works" ref={ref} className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="animate-on-scroll mb-4 inline-block text-sm font-semibold tracking-wide text-primary">
            {t.sectionTag}
          </span>
          <h2 className="animate-on-scroll stagger-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="animate-on-scroll stagger-2 mt-4 text-lg leading-relaxed text-muted">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {t.steps.map((item, index) => (
            <div key={index} className={`animate-on-scroll stagger-${index + 1} relative text-center`}>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {item.step}
              </div>
              {index < t.steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-80px)] bg-border sm:block" />
              )}
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
