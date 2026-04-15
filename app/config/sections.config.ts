export type SectionId =
  | 'alertBanner'
  | 'header'
  | 'hero'
  | 'features'
  | 'howItWorks'
  | 'gallery'
  | 'testimonials'
  | 'cta'
  | 'contact'
  | 'schedule'
  | 'footer';

export interface SectionConfig {
  id: SectionId;
  active: boolean;
  /** Optional props forwarded to the section component */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>;
}

export const sectionsConfig: SectionConfig[] = [
  {
    id: 'alertBanner',
    active: true,
    props: {
      icon: '🌊',
      gradient: 'from-orange-500 via-amber-400 to-yellow-400',
      dismissible: true,
      href: '#cta',  // uncomment to make banner clickable
    },
  },
  { id: 'header', active: true },
  { id: 'hero', active: true, props: { variant: 'split' } },
  { id: 'features', active: true },
  { id: 'testimonials', active: true },
  { id: 'howItWorks', active: true },
  { id: 'gallery', active: false },
  { id: 'cta', active: false },
  { id: 'contact', active: true },
  { id: 'schedule', active: false },
  { id: 'footer', active: true },
];
