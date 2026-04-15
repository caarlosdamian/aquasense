"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface Step {
  step: string;
  title: string;
  description: string;
}

interface BottomCard {
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
      bottomCard?: BottomCard;
    };
  };
  sectionBg?: string;
}

const stepImages = [
  "/singup-e.jpg",
  "/noti-e.jpg",
  "/person-e.jpg",
  "/person-2-e.jpg",
  "/ph-e.jpg",
];

export default function HowItWorks({ dict, sectionBg = "bg-transparent" }: HowItWorksProps) {
  const t = dict.howItWorks;
  const ref = useScrollAnimation();

  return (
    <section id="how-it-works" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="animate-on-scroll text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-foreground">
            {t.title}
          </h2>
          <p className="animate-on-scroll stagger-1 mt-6 text-lg tracking-wide leading-relaxed text-slate-600 dark:text-muted-foreground/90">
            {t.subtitle}
          </p>
        </div>

        {/* 5-column Row for Steps */}
        <div className="mt-16 flex flex-col lg:flex-row lg:items-stretch gap-6 relative">
          {t.steps.map((item, index) => (
            <div key={index} className={`animate-on-scroll stagger-${index + 1} flex flex-1 flex-col relative`}>
              <div className="flex-1 rounded-[1.5rem] bg-white p-6 shadow-sm transition-transform hover:scale-[1.03] dark:bg-surface-raised flex flex-col text-center border ring-1 ring-black/5 dark:ring-white/5 border-transparent">
                <h3 className="mb-4 text-[1.1rem] font-bold text-slate-900 dark:text-foreground flex items-center justify-center gap-2 leading-tight">
                  <span className="text-blue-500">{item.step}</span> {item.title}
                </h3>
                {/* Image replacing the placeholder */}
                <div className="mx-auto mb-6 h-32 w-full relative overflow-hidden rounded-xl bg-blue-50/50 dark:bg-blue-900/10">
                  <Image
                    src={stepImages[index] || "/singup-e.jpg"}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 20vw"
                  />
                </div>
                <p className="text-[0.9rem] leading-relaxed text-slate-500 dark:text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {/* Arrow Connector for large screens between cards */}
              {index < t.steps.length - 1 && (
                <div className="absolute right-[-1.5rem] top-1/2 -mt-3 z-10 hidden lg:flex h-6 w-6 items-center justify-center text-blue-200 dark:text-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Wide Bottom Banner */}
        {t.bottomCard && (
          <div className="animate-on-scroll stagger-5 mt-12 flex flex-col items-center justify-between gap-8 rounded-[2.5rem] bg-white/80 p-8 shadow-lg backdrop-blur-sm sm:p-10 lg:flex-row lg:p-12 dark:bg-surface-raised/80">
            
            <div className="flex flex-1 flex-col sm:flex-row gap-6">
              {/* Optional big custom icon bubble */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-500 shadow-md sm:h-20 sm:w-20 lg:rounded-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                </svg>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-foreground">
                  {t.bottomCard.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-slate-600 dark:text-muted-foreground max-w-4xl">
                  {t.bottomCard.description}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
