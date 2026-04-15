"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/app/context/signup-context";

// ─── SVG gate illustrations ───────────────────────────────────────────────────
function GateIcon({ type }: { type: string }) {
  const base = "w-full h-14";
  if (type === "Left Gate") return (
    <svg className={base} viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="20" width="78" height="27" rx="2" fill="currentColor" opacity=".08"/>
      <rect x="30" y="10" width="50" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="30" y="18" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <rect x="56" y="18" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <polygon points="40,10 55,10 55,0 40,0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Left gate highlighted */}
      <rect x="1" y="22" width="22" height="26" rx="2" fill="currentColor" opacity=".3" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="22" x2="8" y2="48" stroke="currentColor" strokeWidth="1" opacity=".5"/>
      <line x1="15" y1="22" x2="15" y2="48" stroke="currentColor" strokeWidth="1" opacity=".5"/>
    </svg>
  );
  if (type === "Right Gate") return (
    <svg className={base} viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="20" width="78" height="27" rx="2" fill="currentColor" opacity=".08"/>
      <rect x="0" y="10" width="50" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="0" y="18" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <rect x="26" y="18" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <polygon points="20,10 35,10 35,0 20,0" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Right gate highlighted */}
      <rect x="57" y="22" width="22" height="26" rx="2" fill="currentColor" opacity=".3" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="64" y1="22" x2="64" y2="48" stroke="currentColor" strokeWidth="1" opacity=".5"/>
      <line x1="71" y1="22" x2="71" y2="48" stroke="currentColor" strokeWidth="1" opacity=".5"/>
    </svg>
  );
  if (type === "Front Access") return (
    <svg className={base} viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="60" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="10" y="20" width="28" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <rect x="42" y="20" width="28" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <polygon points="10,12 40,0 70,12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Front path highlighted */}
      <rect x="32" y="34" width="16" height="14" rx="1" fill="currentColor" opacity=".3" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="36" y1="34" x2="36" y2="48" stroke="currentColor" strokeWidth="1" opacity=".5"/>
      <line x1="44" y1="34" x2="44" y2="48" stroke="currentColor" strokeWidth="1" opacity=".5"/>
    </svg>
  );
  // No Gate
  return (
    <svg className={base} viewBox="0 0 80 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="60" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="10" y="20" width="28" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <rect x="42" y="20" width="28" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <polygon points="10,12 40,0 70,12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Open yard — dotted line */}
      <line x1="20" y1="48" x2="60" y2="48" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity=".5"/>
    </svg>
  );
}

// ─── Pool shape icons ─────────────────────────────────────────────────────────
function PoolShapeIcon({ shape }: { shape: string }) {
  if (shape === "Square" || shape === "Cuadrada") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
  );
  if (shape === "Rectangular" ) return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="5" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
  );
  if (shape === "Oval" || shape === "Ovalada") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="10" rx="8" ry="5" stroke="currentColor" strokeWidth="2"/></svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14 L6 4 L14 3 L17 8 L12 17 L5 16 Z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
  );
}

interface JoinStep3Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any;
  lang: string;
}

export default function JoinStep3({ dict, lang }: JoinStep3Props) {
  const router = useRouter();
  const { data, update, reset } = useSignup();
  const t = dict.profile;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Local form state — pre-filled from context
  const [fullName, setFullName] = useState(data.fullName);
  const [phone, setPhone] = useState(data.phone);
  const [address, setAddress] = useState(data.address);
  const [poolShape, setPoolShape] = useState(data.poolShape || t.poolShape.options[0]);
  const [petName, setPetName] = useState(data.petName);
  const [gateAccess, setGateAccess] = useState(data.gateAccess || t.gateAccess.options[0]);
  const [gateCode, setGateCode] = useState(data.gateCode);
  const [gateNotes, setGateNotes] = useState(data.gateNotes);
  const [timeSlot1, setTimeSlot1] = useState(data.timeSlot1 || t.timePreference.slots[0]);
  const [timeSlot2, setTimeSlot2] = useState(data.timeSlot2 || t.timePreference.slots[2]);
  const [timeNotes, setTimeNotes] = useState(data.timeNotes);

  const inputCls = "w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";
  const textareaCls = `${inputCls} resize-none`;
  const selectCls = `${inputCls} cursor-pointer`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const step3 = { fullName, phone, address, poolShape, petName, gateAccess, gateCode, gateNotes, timeSlot1, timeSlot2, timeNotes };
    update(step3);

    const payload = { ...data, ...step3 };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-hover to-primary shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">{t.success}</h1>
        <button onClick={() => router.push(`/${lang}`)} className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-primary-hover to-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90">
          Back to Home
        </button>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t.title}</h1>
          <p className="mt-2 text-base text-muted">{t.subtitle}</p>
          <span className="mt-4 inline-block rounded-full border border-border px-6 py-1.5 text-xs font-bold tracking-widest text-muted uppercase">
            {t.stepLabel}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ── Section 1: Basic Info ───────────────────────────────────── */}
          <div className="rounded-2xl border border-border bg-surface-raised/80 p-5 backdrop-blur-sm space-y-4">
            <div>
              <h2 className="text-sm font-bold text-foreground">{t.basicInfo.title}</h2>
              <p className="text-xs text-muted">{t.basicInfo.subtitle}</p>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              </span>
              <input required value={fullName} onChange={e => setFullName(e.target.value)} placeholder={t.basicInfo.fullNamePlaceholder} className={`${inputCls} pl-10`}/>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 11.22 19.79 19.79 0 0 1 1 2.44 2 2 0 0 1 2.96 2.26h3.07a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              </span>
              <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.basicInfo.phonePlaceholder} className={`${inputCls} pl-10`}/>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <input required value={address} onChange={e => setAddress(e.target.value)} placeholder={t.basicInfo.addressPlaceholder} className={`${inputCls} pl-10`}/>
            </div>
          </div>

          {/* ── Section 2: Pool Shape ───────────────────────────────────── */}
          <div className="rounded-2xl border border-border bg-surface-raised/80 p-5 backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-foreground">{t.poolShape.title}</h2>
            <div className="flex flex-wrap gap-2">
              {t.poolShape.options.map((shape: string) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => setPoolShape(shape)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    poolShape === shape
                      ? "bg-gradient-to-r from-primary-hover to-primary text-primary-foreground shadow-md"
                      : "border border-border bg-surface text-foreground hover:border-primary"
                  }`}
                >
                  <PoolShapeIcon shape={shape} />
                  {shape}
                </button>
              ))}
            </div>
            <input value={petName} onChange={e => setPetName(e.target.value)} placeholder={t.poolShape.petNamePlaceholder} className={inputCls}/>
            <p className="flex items-center gap-2 text-xs text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4c.34-1.01 1-2 2-2 2.16 0 3 2.58 3 4 0 1.32-.5 2.5-1.38 3.38"/><path d="M8 7c0-1.06.34-2 1-2.7M7 16c.34-1.01 1-2 2-2 2.16 0 3 2.58 3 4 0 1.5-.5 2.5-1.4 3.3"/><path d="M4 11c.34-1.01 1-2 2-2 2.16 0 3 2.58 3 4 0 1.5-.5 2.5-1.4 3.3"/><path d="M14 11c.34-1.01 1-2 2-2 2.16 0 3 2.58 3 4a4 4 0 0 1-4 4c-1.5 0-2.5-.5-3.3-1.4"/></svg>
              {t.poolShape.petNote}
            </p>
          </div>

          {/* ── Section 3: Gate Access ──────────────────────────────────── */}
          <div className="rounded-2xl border border-border bg-surface-raised/80 p-5 backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-foreground">{t.gateAccess.title}</h2>
            <div className="grid grid-cols-4 gap-2">
              {t.gateAccess.options.map((option: string) => {
                const selected = gateAccess === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGateAccess(option)}
                    className={`flex flex-col items-center gap-1 rounded-xl border-2 p-2 text-xs font-medium transition-all ${
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-surface text-muted hover:border-primary/50"
                    }`}
                  >
                    <span className={selected ? "text-primary" : "text-muted-foreground"}>
                      <GateIcon type={option} />
                    </span>
                    <span className="text-center leading-tight">{option}</span>
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input value={gateCode} onChange={e => setGateCode(e.target.value)} placeholder={t.gateAccess.gateCodePlaceholder} className={`${inputCls} pl-10`}/>
            </div>
            <div className="rounded-lg border border-border bg-surface px-4 py-3 space-y-2">
              <p className="flex items-center gap-2 text-xs font-medium text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {t.gateAccess.specialNotesLabel}
              </p>
              <textarea rows={2} value={gateNotes} onChange={e => setGateNotes(e.target.value)} placeholder={t.gateAccess.specialNotesPlaceholder} className={`${textareaCls} bg-transparent border-none p-0 focus:ring-0 text-xs`}/>
            </div>
          </div>

          {/* ── Section 4: Time Preference ──────────────────────────────── */}
          <div className="rounded-2xl border border-border bg-surface-raised/80 p-5 backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-bold text-foreground">{t.timePreference.title}</h2>
            <div className="grid grid-cols-2 gap-3">
              <select value={timeSlot1} onChange={e => setTimeSlot1(e.target.value)} className={selectCls}>
                {t.timePreference.slots.map((s: string) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={timeSlot2} onChange={e => setTimeSlot2(e.target.value)} className={selectCls}>
                {t.timePreference.slots.map((s: string) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="rounded-lg border border-border bg-surface px-4 py-3 space-y-2">
              <p className="flex items-center gap-2 text-xs font-medium text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {t.timePreference.specialNotesLabel}
              </p>
              <textarea rows={2} value={timeNotes} onChange={e => setTimeNotes(e.target.value)} placeholder={t.timePreference.specialNotesPlaceholder} className={`${textareaCls} bg-transparent border-none p-0 focus:ring-0 text-xs`}/>
            </div>
          </div>

          {/* ── Section 5: Inspection notice ────────────────────────────── */}
          <div className="space-y-3 px-1">
            <p className="text-sm font-bold text-foreground">{t.inspection.title}</p>
            <ul className="space-y-2">
              {t.inspection.items.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-hover to-primary text-primary-foreground shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Submit ───────────────────────────────────────────────────── */}
          {status === "error" && (
            <p className="text-center text-sm font-medium text-destructive">{t.error}</p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-hover to-primary text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-[1.02] hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "submitting" ? t.submitting : t.submit}
          </button>

        </form>
      </div>
    </main>
  );
}
