"use client";

import { useState } from "react";

interface AlertBannerProps {
  dict: {
    alertBanner: {
      message: string;
      linkLabel?: string;
    };
  };
  /** Emoji/icon prefix – defaults to sparkles */
  icon?: string;
  /** Link URL — wraps the message in an anchor if provided */
  href?: string;
  gradient?: string;
  /** Whether the user can dismiss the banner */
  dismissible?: boolean;
}

export default function AlertBanner({
  dict,
  icon = "✨",
  href,
  gradient = "from-amber-500 to-orange-500",
  dismissible = true,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const t = dict.alertBanner;

  if (dismissed) return null;

  const inner = (
    <span className="inline-flex items-center gap-2 text-lg font-bold">
      <span aria-hidden="true">{icon}</span>
      <span>{t.message}</span>
      {t.linkLabel && (
        <span className="ml-1 inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 decoration-white/60 hover:decoration-white transition-all">
          {t.linkLabel}
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      )}
      <span aria-hidden="true">{icon}</span>
    </span>
  );

  return (
    <div
      role="banner"
      className={`relative z-50 bg-gradient-to-r ${gradient} py-3 text-center text-white overflow-hidden`}
    >
      {/* Shimmer sweep — exact match from Lovable Landing.tsx:96:6 child element */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer opacity-80 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-10">
        {href ? (
          <a href={href} className="hover:opacity-90 transition-opacity">
            {inner}
          </a>
        ) : (
          inner
        )}
      </div>

      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
