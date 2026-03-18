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
          className={i < rating ? "text-warning" : "text-border"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ dict, sectionBg = "bg-surface" }: TestimonialsProps) {
  const t = dict.testimonials;
  const ref = useScrollAnimation();

  return (
    <section id="testimonials" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
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

        {/* Testimonial cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, index) => (
            <div
              key={index}
              className={`animate-on-scroll animate-scale stagger-${index + 1} group relative rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md`}
            >
              {/* Quote icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.3 2.5c-1.2.7-2.2 1.5-3 2.5S6.8 7.2 6.5 8.5c-.3 1.3-.5 2.7-.5 4.2 0 2.1.5 3.8 1.4 5.2.9 1.3 2.2 2 3.9 2 1.3 0 2.3-.4 3.1-1.3.8-.9 1.2-1.9 1.2-3.2 0-1.2-.4-2.2-1.1-3-.7-.8-1.7-1.2-2.8-1.2-.5 0-1 .1-1.4.3.3-1.5 1-2.9 2.1-4.2L11.3 2.5zM21.3 2.5c-1.2.7-2.2 1.5-3 2.5s-1.5 2.2-1.8 3.5c-.3 1.3-.5 2.7-.5 4.2 0 2.1.5 3.8 1.4 5.2.9 1.3 2.2 2 3.9 2 1.3 0 2.3-.4 3.1-1.3.8-.9 1.2-1.9 1.2-3.2 0-1.2-.4-2.2-1.1-3-.7-.8-1.7-1.2-2.8-1.2-.5 0-1 .1-1.4.3.3-1.5 1-2.9 2.1-4.2L21.3 2.5z" />
                </svg>
              </div>

              {/* Quote text */}
              <p className="mb-6 text-sm leading-relaxed text-muted italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Rating */}
              <StarRating rating={item.rating} />

              {/* Author */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent text-sm font-bold text-primary">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
