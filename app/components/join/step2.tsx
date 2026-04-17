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
    plan: {
      annualFee: string;
      monthlyFee: string;
      label: string;
      description: string;
      cta: string;
      perVisit: { prefix: string; price: string; label: string };
    };
    nextSteps: { title: string; items: string[] };
    footnote: string;
    stepLabel: string;
  };

  function proceed() {
    update({ selectedPlan: "membership" });
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

      {/* Plan card */}
      <div className="w-full max-w-xl space-y-6">
        <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-surface-raised/80 p-8 shadow-md backdrop-blur-sm mx-auto text-center">
          <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">{t.plan.label}</p>
          <div className="flex flex-col items-center justify-center gap-1 mt-4 mb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-2xl font-bold">{t.plan.annualFee}</span>
              <span className="text-xl">+</span>
              <span className="text-2xl font-bold">{t.plan.monthlyFee}</span>
            </div>
          </div>
          
          <div className="my-6 rounded-xl bg-gradient-to-r from-primary-hover/10 to-primary/10 py-5 px-4 border border-primary/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <p className="relative text-sm font-semibold text-primary/80 uppercase tracking-wide mb-1">
              {t.plan.perVisit.prefix}
            </p>
            <p className="relative text-primary font-bold">
              <span className="text-5xl tracking-tighter">{t.plan.perVisit.price}</span>
            </p>
            <p className="relative mt-1 text-sm font-medium text-foreground/80">
              {t.plan.perVisit.label}
            </p>
          </div>
          <p className="text-base leading-relaxed text-muted max-w-sm mx-auto mb-8">{t.plan.description}</p>
          
          <button
            onClick={proceed}
            className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-hover to-primary text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:opacity-90"
          >
            {t.plan.cta}
          </button>
        </div>

        {/* No longer displaying the per visit note outside the card */}

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
