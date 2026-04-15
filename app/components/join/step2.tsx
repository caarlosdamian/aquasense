"use client";

import { useRouter } from "next/navigation";
import { useSignup } from "@/app/context/signup-context";

interface Plan {
  price: string;
  label: string;
  description: string;
  badge?: string;
  cta: string;
}

interface JoinStep2Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  lang: string;
}

export default function JoinStep2({ dict, lang }: JoinStep2Props) {
  const router = useRouter();
  const { update } = useSignup();
  const t = dict.join as {
    title: string;
    subtitle: string;
    plans: {
      yearly: Plan;
      monthly: Plan;
      perVisit: { prefix: string; price: string; label: string };
    };
    nextSteps: { title: string; items: string[] };
    footnote: string;
    stepLabel: string;
  };

  function selectPlan(plan: "yearly" | "monthly") {
    update({ selectedPlan: plan });
    router.push(`/${lang}/join/profile`);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{t.subtitle}</p>
      </div>

      {/* Plan cards */}
      <div className="w-full max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Yearly plan */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-surface-raised/80 p-6 shadow-md backdrop-blur-sm">
            {t.plans.yearly.badge && (
              <span className="mb-3 inline-block self-start rounded-full bg-gradient-to-r from-primary-hover to-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                {t.plans.yearly.badge}
              </span>
            )}
            <p className="text-4xl font-extrabold tracking-tight text-foreground">
              {t.plans.yearly.price}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">{t.plans.yearly.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{t.plans.yearly.description}</p>
            <button
              onClick={() => selectPlan("yearly")}
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary-hover to-primary text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-[1.02] hover:opacity-90"
            >
              {t.plans.yearly.cta}
            </button>
          </div>

          {/* Monthly plan */}
          <div className="flex flex-col rounded-2xl border border-border bg-surface-raised/80 p-6 shadow-sm backdrop-blur-sm">
            <p className="text-4xl font-extrabold tracking-tight text-foreground">
              {t.plans.monthly.price}
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">{t.plans.monthly.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{t.plans.monthly.description}</p>
            <button
              onClick={() => selectPlan("monthly")}
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-surface text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary hover:text-primary"
            >
              {t.plans.monthly.cta}
            </button>
          </div>

        </div>

        {/* Per-visit note */}
        <p className="text-center text-sm text-muted">
          {t.plans.perVisit.prefix}{" "}
          <span className="font-bold text-foreground">{t.plans.perVisit.price}</span>{" "}
          {t.plans.perVisit.label}
        </p>

        {/* What happens next */}
        <div className="rounded-2xl border border-border bg-surface-raised/80 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-sm font-bold text-foreground">{t.nextSteps.title}</h2>
          <ul className="space-y-3">
            {t.nextSteps.items.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-hover to-primary text-primary-foreground shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted">{t.footnote}</p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center py-2">
          <span className="inline-block rounded-full border border-border px-8 py-2 text-xs font-bold tracking-widest text-muted uppercase">
            {t.stepLabel}
          </span>
        </div>
      </div>
    </main>
  );
}
