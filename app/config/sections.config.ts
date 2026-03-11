export type SectionId = 'header' | 'hero' | 'features' | 'howItWorks' | 'testimonials' | 'cta' | 'contact' | 'schedule' | 'footer';

export interface SectionConfig {
  id: SectionId;
  active: boolean;
}

export const sectionsConfig: SectionConfig[] = [
  { id: 'header', active: true },
  { id: 'hero', active: true },
  { id: 'features', active: true },
  { id: 'howItWorks', active: true },
  { id: 'testimonials', active: true },
  { id: 'cta', active: true },
  { id: 'contact', active: true },
  { id: 'schedule', active: true },
  { id: 'footer', active: true },
];
