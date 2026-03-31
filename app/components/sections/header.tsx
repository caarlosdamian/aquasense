"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/components/theme-provider";

interface HeaderProps {
  dict: {
    header: {
      brand: string;
      nav: {
        features: string;
        howItWorks: string;
        contact: string;
        schedule: string;
      };
      toggleTheme: string;
      getStarted: string;
    };
  };
  lang: string;
}

export default function Header({ dict, lang }: HeaderProps) {
  const { toggleTheme, resolvedTheme } = useTheme();
  const t = dict.header;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 shadow-sm backdrop-blur-md dark:border-border dark:bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image
            src="/aquasense-branding/logo-main-one.png"
            alt={t.brand}
            width={200}
            height={100}
            className="h-20 w-auto show-in-light"
            priority
          />
          <Image
            src="/aquasense-branding/logo-main-one.png"
            alt={t.brand}
            width={200}
            height={100}
            className="h-20 w-auto show-in-dark"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-muted dark:hover:text-foreground"
          >
            {t.nav.features}
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-muted dark:hover:text-foreground"
          >
            {t.nav.howItWorks}
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-muted dark:hover:text-foreground"
          >
            {t.nav.contact}
          </a>
          {/* <a
            href="#schedule"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-muted dark:hover:text-foreground"
          >
            {t.nav.schedule}
          </a> */}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-blue-100 text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-border dark:text-muted dark:hover:bg-accent dark:hover:text-foreground"
            aria-label={t.toggleTheme}
            title={t.toggleTheme}
          >
            {resolvedTheme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* Language switcher */}
          <Link
            href={`/${lang === "en" ? "es" : "en"}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-blue-100 text-xs font-semibold text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:border-border dark:text-muted dark:hover:bg-accent dark:hover:text-foreground"
            title={lang === "en" ? "Español" : "English"}
          >
            {lang === "en" ? "ES" : "EN"}
          </Link>

          {/* Sign In — ghost */}
          <a
            href="#"
            className="hidden rounded-md border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-50 hover:scale-105 sm:inline-flex items-center dark:border-border dark:text-primary dark:hover:bg-accent"
          >
            Sign In
          </a>

          {/* Get Started — solid gradient */}
          <a
            href="#cta"
            className="hidden rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg sm:inline-flex items-center"
          >
            {t.getStarted}
          </a>
        </div>
      </div>
    </header>
  );
}
