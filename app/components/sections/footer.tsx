"use client";

import Image from "next/image";
import { sectionsConfig } from "@/app/config/sections.config";
import type { SectionId } from "@/app/config/sections.config";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

const sectionAnchors: Partial<Record<SectionId, string>> = {
  features: "#features",
  howItWorks: "#how-it-works",
  testimonials: "#testimonials",
  cta: "#cta",
  contact: "#contact",
  schedule: "#schedule",
};

const linkableSections = new Set<SectionId>([
  "features",
  "howItWorks",
  "testimonials",
  "cta",
  "contact",
  "schedule",
]);

interface FooterProps {
  dict: {
    footer: {
      brand: string;
      tagline: string;
      product: string;
      company: string;
      companyLinks: {
        about: string;
        blog: string;
        careers: string;
      };
      support: string;
      supportLinks: {
        help: string;
        status: string;
      };
      copyright: string;
    };
    header?: { nav?: Record<string, string> };
    features?: { sectionTag?: string };
    howItWorks?: { sectionTag?: string };
    testimonials?: { sectionTag?: string };
    cta?: { title?: string };
    contact?: { sectionTag?: string };
    schedule?: { sectionTag?: string };
  };
}

function getSectionLabel(
  id: SectionId,
  dict: FooterProps["dict"]
): string | null {
  switch (id) {
    case "features":
      return dict.features?.sectionTag ?? dict.header?.nav?.features ?? null;
    case "howItWorks":
      return dict.howItWorks?.sectionTag ?? dict.header?.nav?.howItWorks ?? null;
    case "testimonials":
      return dict.testimonials?.sectionTag ?? null;
    case "cta":
      return dict.header?.nav?.schedule ?? "Get Started";
    case "contact":
      return dict.contact?.sectionTag ?? dict.header?.nav?.contact ?? null;
    case "schedule":
      return dict.schedule?.sectionTag ?? dict.header?.nav?.schedule ?? null;
    default:
      return null;
  }
}

export default function Footer({ dict }: FooterProps) {
  const t = dict.footer;
  const ref = useScrollAnimation();

  const activeLinks = sectionsConfig
    .filter((s) => s.active && linkableSections.has(s.id))
    .map((s) => ({
      id: s.id,
      href: sectionAnchors[s.id] ?? "#",
      label: getSectionLabel(s.id, dict),
    }))
    .filter((l) => l.label !== null);

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative z-10"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

          {/* ── Brand column ── */}
          <div className="animate-on-scroll sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/aquasense-branding/logo-aquasense-ps-blanco-1-01.png"
                alt={t.brand}
                width={200}
                height={60}
                className="h-16 w-auto"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.tagline}</p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                { label: "Facebook",  letter: "f", href: "#" },
                { label: "Twitter",   letter: "t", href: "#" },
                { label: "LinkedIn",  letter: "in", href: "#" },
              ].map(({ label, letter, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white transition-colors hover:bg-blue-500"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* ── Services column (dynamic sections) ── */}
          {activeLinks.length > 0 && (
            <div className="animate-on-scroll stagger-1">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                {t.product}
              </h4>
              <ul className="space-y-3">
                {activeLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Contact column ── */}
          <div className="animate-on-scroll stagger-3">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                1-800-AQUASENSE
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                hello@aquasense.com
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                Tucson, Arizona
              </li>
              <li>
                <span className="text-sm font-semibold text-green-400">
                  24/7 Emergency Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="animate-on-scroll animate-fade mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">{t.copyright}</p>
            <div className="flex flex-wrap gap-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
