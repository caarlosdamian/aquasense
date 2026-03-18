"use client";

import { useState, FormEvent } from "react";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ScheduleProps {
  dict: {
    schedule: {
      sectionTag: string;
      title: string;
      subtitle: string;
      form: {
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        date: string;
        time: string;
        topic: string;
        topicPlaceholder: string;
        topics: Record<string, string>;
        notes: string;
        notesPlaceholder: string;
        submit: string;
        sending: string;
        success: string;
        error: string;
      };
      benefits: Benefit[];
    };
  };
  sectionBg?: string;
}

const benefitIcons: Record<string, React.ReactNode> = {
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  video: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

/* Generate available time slots */
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM",
];

export default function Schedule({ dict, sectionBg = "bg-surface" }: ScheduleProps) {
  const t = dict.schedule;
  const ref = useScrollAnimation();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  /* Minimum date = tomorrow */
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      time: (form.elements.namedItem("time") as HTMLSelectElement).value,
      topic: (form.elements.namedItem("topic") as HTMLSelectElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="schedule" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
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

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Left: Benefits */}
          <div className="animate-on-scroll stagger-3 space-y-6 lg:col-span-2">
            {t.benefits.map((b, i) => (
              <div
                key={i}
                className={`animate-on-scroll stagger-${i + 3} group flex gap-4 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-md`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  {benefitIcons[b.icon] || null}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.description}</p>
                </div>
              </div>
            ))}

            {/* Decorative calendar icon */}
            <div className="hidden lg:flex items-center justify-center pt-4">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-primary/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Scheduling form */}
          <div className="animate-on-scroll stagger-4 lg:col-span-3">
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="schedule-name" className="mb-2 block text-sm font-medium text-foreground">
                      {t.form.name}
                    </label>
                    <input
                      id="schedule-name"
                      name="name"
                      type="text"
                      required
                      placeholder={t.form.namePlaceholder}
                      className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="schedule-email" className="mb-2 block text-sm font-medium text-foreground">
                      {t.form.email}
                    </label>
                    <input
                      id="schedule-email"
                      name="email"
                      type="email"
                      required
                      placeholder={t.form.emailPlaceholder}
                      className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="schedule-date" className="mb-2 block text-sm font-medium text-foreground">
                      {t.form.date}
                    </label>
                    <input
                      id="schedule-date"
                      name="date"
                      type="date"
                      required
                      min={minDate}
                      className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="schedule-time" className="mb-2 block text-sm font-medium text-foreground">
                      {t.form.time}
                    </label>
                    <select
                      id="schedule-time"
                      name="time"
                      required
                      className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">—</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="schedule-topic" className="mb-2 block text-sm font-medium text-foreground">
                    {t.form.topic}
                  </label>
                  <select
                    id="schedule-topic"
                    name="topic"
                    required
                    className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">{t.form.topicPlaceholder}</option>
                    {Object.entries(t.form.topics).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="schedule-notes" className="mb-2 block text-sm font-medium text-foreground">
                    {t.form.notes}
                  </label>
                  <textarea
                    id="schedule-notes"
                    name="notes"
                    rows={3}
                    placeholder={t.form.notesPlaceholder}
                    className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? t.form.sending : t.form.submit}
                </button>

                {status === "success" && (
                  <p className="text-center text-sm font-medium text-success">{t.form.success}</p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm font-medium text-destructive">{t.form.error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
