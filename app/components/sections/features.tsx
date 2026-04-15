"use client";

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeatureBottomCard {
  title: string;
  description: string;
  cta: string;
}

interface FeaturesProps {
  dict: {
    features: {
      sectionTag: string;
      title: string;
      subtitle: string;
      items: FeatureItem[];
      bottomCard?: FeatureBottomCard;
    };
  };
  sectionBg?: string;
}

// Rotating gradient backgrounds per card — matches Lovable's colored icon squares
const iconGradients = [
  "from-orange-400 to-amber-500",
  "from-blue-500 to-cyan-400",
  "from-pink-500 to-rose-400",
  "from-emerald-500 to-teal-400",
];

const iconMap: Record<string, React.ReactNode> = {
  droplet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  "bar-chart": (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
};

export default function Features({ dict, sectionBg = "bg-transparent" }: FeaturesProps) {
  const t = dict.features;
  const ref = useScrollAnimation();

  return (
    <section id="features" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="animate-on-scroll text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-foreground">
            {t.title}
          </h2>
          <p className="animate-on-scroll stagger-1 mt-6 text-lg tracking-wide leading-relaxed text-slate-600 dark:text-muted-foreground/90">
            {t.subtitle}
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => (
            <div
              key={index}
              className={`animate-on-scroll stagger-${index + 1} flex flex-col items-start rounded-[2rem] bg-white p-8 shadow-sm transition-transform hover:scale-[1.03] dark:bg-surface-raised`}
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-[1rem] bg-gradient-to-br ${iconGradients[index % iconGradients.length]} text-white shadow-lg`}
              >
                {iconMap[item.icon] || null}
              </div>
              <h3 className="mb-3 text-[1.05rem] font-bold text-slate-900 dark:text-foreground leading-tight">
                {item.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-slate-500 dark:text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Wide Bottom Banner */}
        {t.bottomCard && (
          <div className="animate-on-scroll stagger-5 mt-8 flex flex-col items-center justify-between gap-8 rounded-[2.5rem] bg-white/80 p-8 shadow-lg backdrop-blur-sm sm:p-10 lg:flex-row lg:p-12 dark:bg-surface-raised/80">

            <div className="flex flex-1 flex-col sm:flex-row gap-6">
              {/* Optional big custom icon bubble */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-500 shadow-md sm:h-20 sm:w-20 lg:rounded-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                  <line x1="8" x2="12" y1="8" y2="8" />
                </svg>
              </div>

              <div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-foreground">
                  {t.bottomCard.title}
                </h3>
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-slate-600 dark:text-muted-foreground">
                  {t.bottomCard.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-4 lg:pt-0">
              <a
                href="#schedule"
                className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-[0.95rem] font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-700"
              >
                {t.bottomCard.cta}
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
