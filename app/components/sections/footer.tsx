"use client";

import Image from "next/image";
import { sectionsConfig } from "@/app/config/sections.config";
import type { SectionId } from "@/app/config/sections.config";
import { useScrollAnimation } from "@/app/hooks/use-scroll-animation";

/**
 * Maps section IDs to their anchor href.
 * Sections like header/hero/footer don't need footer links.
 */
const sectionAnchors: Partial<Record<SectionId, string>> = {
  features: "#features",
  howItWorks: "#how-it-works",
  testimonials: "#testimonials",
  cta: "#cta",
  contact: "#contact",
  schedule: "#schedule",
};

/** Sections that are linkable from the footer (excludes header, hero, footer) */
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
    /* We pull section labels from the top-level dict keys */
    header?: { nav?: Record<string, string> };
    features?: { sectionTag?: string };
    howItWorks?: { sectionTag?: string };
    testimonials?: { sectionTag?: string };
    cta?: { title?: string };
    contact?: { sectionTag?: string };
    schedule?: { sectionTag?: string };
  };
}

/** Resolve a human-readable label for each section */
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

  /* Build the list of active, linkable sections */
  const activeLinks = sectionsConfig
    .filter((s) => s.active && linkableSections.has(s.id))
    .map((s) => ({
      id: s.id,
      href: sectionAnchors[s.id] ?? "#",
      label: getSectionLabel(s.id, dict),
    }))
    .filter((l) => l.label !== null);

  return (
    <footer id="footer" ref={ref} className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="animate-on-scroll sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/aquasense-branding/logo-aquasense-pool-services-1-01.png"
                alt={t.brand}
                width={200}
                height={60}
                className="h-16 w-auto show-in-light"
              />
              <Image
                src="/aquasense-branding/logo-aquasense-ps-blanco-1-01.png"
                alt={t.brand}
                width={200}
                height={60}
                className="h-16 w-auto show-in-dark"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.tagline}</p>
          </div>

          {/* Sections — dynamically built from config */}
          {activeLinks.length > 0 && (
            <div className="animate-on-scroll stagger-1">
              <h4 className="mb-4 text-sm font-semibold text-foreground">{t.product}</h4>
              <ul className="space-y-3">
                {activeLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company */}
          <div className="animate-on-scroll stagger-2">
            <h4 className="mb-4 text-sm font-semibold text-foreground">{t.company}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted transition-colors hover:text-foreground">{t.companyLinks.about}</a></li>
              <li><a href="#" className="text-sm text-muted transition-colors hover:text-foreground">{t.companyLinks.blog}</a></li>
              <li><a href="#" className="text-sm text-muted transition-colors hover:text-foreground">{t.companyLinks.careers}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-on-scroll stagger-3">
            <h4 className="mb-4 text-sm font-semibold text-foreground">{t.support}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted transition-colors hover:text-foreground">{t.supportLinks.help}</a></li>
              <li><a href="#" className="text-sm text-muted transition-colors hover:text-foreground">{t.supportLinks.status}</a></li>
            </ul>
          </div>
        </div>

        <div className="animate-on-scroll animate-fade mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
