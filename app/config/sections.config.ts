export type SectionId =
  | 'alertBanner'
  | 'header'
  | 'hero'
  | 'features'
  | 'howItWorks'
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
      icon: '✦',
      gradient: 'from-amber-500 via-orange-500 to-amber-400',
      dismissible: true,
      // href: '#cta',  // uncomment to make banner clickable
    },
  },
  { id: 'header', active: true },
  { id: 'hero', active: true, props: { variant: 'split' } },
  { id: 'features', active: true },
  { id: 'howItWorks', active: true },
  { id: 'testimonials', active: true },
  { id: 'cta', active: true },
  { id: 'contact', active: true },
  { id: 'schedule', active: false },
  { id: 'footer', active: true },
];
