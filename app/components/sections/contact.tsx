"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";
import { useSignup } from "@/app/context/signup-context";

interface ContactProps {
  dict: {
    contact: {
      sectionTag: string;
      title: string;
      subtitle: string;
      form: {
        stepLabel: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
        confirmPasswordPlaceholder: string;
        submit: string;
        sending: string;
        note: string;
        passwordMismatch: string;
        success: string;
        error: string;
      };
      info: {
        tagline: string;
        description: string;
        email: string;
        address: string;
        hours: string;
        contactBtn: string;
      };
    };
  };
  lang?: string;
  sectionBg?: string;
}

export default function Contact({ dict, lang = "en", sectionBg = "bg-transparent" }: ContactProps) {
  const t = dict.contact;
  const ref = useScrollAnimation();
  const router = useRouter();
  const { update } = useSignup();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;
    if (password !== confirmPassword) {
      setStatus("error");
      return;
    }
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    update({ email });
    router.push(`/${lang}/join`);
  }

  return (
    <section id="contact" ref={ref} className={`${sectionBg} py-24 sm:py-32`}>
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

        {/* Two-column layout */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">

          {/* Left: Membership form */}
          <div className="animate-on-scroll stagger-3">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Step indicator */}
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">
                {t.form.stepLabel}
              </p>

              {/* Email */}
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder={t.form.emailPlaceholder}
                className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              {/* Password */}
              <div className="relative">
                <input
                  id="contact-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder={t.form.passwordPlaceholder}
                  className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  id="contact-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder={t.form.confirmPasswordPlaceholder}
                  className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary-hover to-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-[1.02] hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? t.form.sending : t.form.submit}
              </button>

              {/* Note */}
              <p className="text-center text-xs leading-relaxed text-muted">
                {t.form.note}
              </p>

              {status === "success" && (
                <p className="text-sm font-medium text-success">{t.form.success}</p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-destructive">
                  {t.form.passwordMismatch}
                </p>
              )}
            </form>
          </div>

          {/* Right: Brand info card */}
          <div className="animate-on-scroll stagger-4">
            <div className="rounded-xl border border-border bg-surface p-6 space-y-6">

              {/* Brand header */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-hover to-primary shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12c2-4 5-6 10-6s8 2 10 6c-2 4-5 6-10 6S4 16 2 12z"/>
                    <path d="M5 14q3.5-4 7 0t7 0"/>
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold text-foreground">Aquasense</p>
                  <p className="text-xs text-muted">{t.info.tagline}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted">{t.info.description}</p>

              {/* Info items */}
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <span className="text-sm text-muted">{t.info.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <span className="text-sm text-muted">{t.info.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </span>
                  <span className="text-sm text-muted">{t.info.hours}</span>
                </li>
              </ul>

              {/* Contact Us button + social icons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-hover to-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  {t.info.contactBtn}
                </button>

                {/* Social icons */}
                <div className="flex items-center gap-2">
                  <a href="#" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.262 5.633 5.902-5.633z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
