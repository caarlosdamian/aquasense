"use client";

import { sectionsConfig } from "@/app/config/sections.config";
import type { SectionId } from "@/app/config/sections.config";
import Header from "@/app/components/sections/header";
import Hero from "@/app/components/sections/hero";
import Features from "@/app/components/sections/features";
import HowItWorks from "@/app/components/sections/how-it-works";
import Testimonials from "@/app/components/sections/testimonials";
import Cta from "@/app/components/sections/cta";
import Contact from "@/app/components/sections/contact";
import Schedule from "@/app/components/sections/schedule";
import Footer from "@/app/components/sections/footer";

interface SectionRendererProps {
  dict: Record<string, unknown>;
  lang: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionComponents: Record<SectionId, React.ComponentType<any>> = {
  header: Header,
  hero: Hero,
  features: Features,
  howItWorks: HowItWorks,
  testimonials: Testimonials,
  cta: Cta,
  contact: Contact,
  schedule: Schedule,
  footer: Footer,
};

export default function SectionRenderer({ dict, lang }: SectionRendererProps) {
  const activeSections = sectionsConfig.filter((s) => s.active);

  return (
    <>
      {activeSections.map((section) => {
        const Component = sectionComponents[section.id];
        if (!Component) return null;
        return <Component key={section.id} dict={dict as any} lang={lang} />;
      })}
    </>
  );
}

