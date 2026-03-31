"use client";

import { sectionsConfig } from "@/app/config/sections.config";
import type { SectionId } from "@/app/config/sections.config";
import Header from "@/app/components/sections/header";
import AlertBanner from "@/app/components/sections/alert-banner";
import Hero from "@/app/components/sections/hero";
import Features from "@/app/components/sections/features";
import HowItWorks from "@/app/components/sections/how-it-works";
import Testimonials from "@/app/components/sections/testimonials";
import Cta from "@/app/components/sections/cta";
import Contact from "@/app/components/sections/contact";
import Schedule from "@/app/components/sections/schedule";
import Footer from "@/app/components/sections/footer";
import Gallery from "./sections/gallery";

interface SectionRendererProps {
  dict: Record<string, unknown>;
  lang: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionComponents: Record<SectionId, React.ComponentType<any>> = {
  alertBanner: AlertBanner,
  header: Header,
  hero: Hero,
  features: Features,
  howItWorks: HowItWorks,
  gallery: Gallery,
  testimonials: Testimonials,
  cta: Cta,
  contact: Contact,
  schedule: Schedule,
  footer: Footer,
};

/**
 * Sections that own their own background (hero has an image, header/footer
 * have their own styles). All others get a computed alternating bg.
 */
const SELF_STYLED: Set<SectionId> = new Set(["alertBanner", "header", "hero", "footer"]);

const ALT_BG = ["bg-white/70", "bg-white/50"] as const;

export default function SectionRenderer({ dict, lang }: SectionRendererProps) {
  const activeSections = sectionsConfig.filter((s) => s.active);

  // Count only body sections (not self-styled) to compute alternating index
  let bodyIndex = 0;

  const chromeSections: typeof activeSections = [];
  const mainSections: typeof activeSections = [];
  let mainStarted = false;

  for (const section of activeSections) {
    if (!mainStarted && (section.id === "alertBanner" || section.id === "header")) {
      chromeSections.push(section);
    } else {
      mainStarted = true;
      mainSections.push(section);
    }
  }

  function renderSection(section: (typeof activeSections)[0]) {
    const Component = sectionComponents[section.id];
    if (!Component) return null;

    let extraProps: Record<string, unknown> = section.props ?? {};

    if (!SELF_STYLED.has(section.id)) {
      extraProps = { ...extraProps, sectionBg: ALT_BG[bodyIndex % 2] };
      bodyIndex++;
    }

    return (
      <Component key={section.id} dict={dict as any} lang={lang} {...extraProps} />
    );
  }

  return (
    <>
      {chromeSections.map(renderSection)}
      <main id="main-content" tabIndex={-1}>
        {mainSections.map(renderSection)}
      </main>
    </>
  );
}
