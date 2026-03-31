"use client";

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  dict: {
    features: {
      sectionTag: string;
      title: string;
      subtitle: string;
      items: FeatureItem[];
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
  "from-violet-500 to-purple-400",
  "from-sky-500 to-blue-400",
];

const iconMap: Record<string, React.ReactNode> = {
  droplet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  "bar-chart": (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  smartphone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />
    </svg>
  ),
};

export default function Features({ dict, sectionBg = "bg-transparent" }: FeaturesProps) {
  const t = dict.features;
  const ref = useScrollAnimation();

  return (
    <section id="features" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => (
            <div
              key={index}
              className={`animate-on-scroll animate-scale stagger-${index + 1} group rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:border-blue-200 hover:shadow-lg dark:border-border dark:bg-surface-raised`}
            >
              {/* Colored gradient icon box */}
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconGradients[index % iconGradients.length]} text-white shadow-md`}
              >
                {iconMap[item.icon] || null}
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-foreground">
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
