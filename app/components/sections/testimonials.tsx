"use client";

import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

interface TestimonialsProps {
  dict: {
    testimonials: {
      sectionTag: string;
      title: string;
      subtitle: string;
      items: Testimonial[];
    };
  };
  sectionBg?: string;
}

// Avatar gradient colors — rotate per index
const avatarGradients = [
  "from-blue-500 to-cyan-400",
  "from-orange-400 to-amber-500",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-pink-500 to-rose-400",
  "from-sky-500 to-blue-400",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={i < rating ? "text-amber-400" : "text-slate-300 dark:text-border"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ dict, sectionBg = "bg-transparent" }: TestimonialsProps) {
  const t = dict.testimonials;
  const ref = useScrollAnimation();

  return (
    <section id="testimonials" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="animate-on-scroll mb-4 inline-block text-sm font-semibold tracking-wide text-primary uppercase">
            {t.sectionTag}
          </span>
          <h2 className="animate-on-scroll stagger-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="animate-on-scroll stagger-2 mt-4 text-lg leading-relaxed text-slate-500 dark:text-muted">
            {t.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, index) => (
            <div
              key={index}
              className={`animate-on-scroll animate-scale stagger-${index + 1} group relative rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg dark:border-border dark:bg-surface-raised`}
            >
              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={item.rating} />
              </div>

              {/* Quote */}
              <p className="mb-6 text-sm leading-relaxed text-slate-600 italic dark:text-muted">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} text-sm font-bold text-white shadow-md`}
                >
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-foreground">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
