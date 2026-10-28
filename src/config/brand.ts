/**
 * Centralized Brand Configuration
 * 
 * NASA is the temporary internal project codename.
 * Update values in this configuration to change brand naming, taglines,
 * contact references, and visual descriptors across the entire application.
 */

export interface BrandConfig {
  codename: string;
  displayName: string;
  publicBrandPending: boolean;
  version: string;
  tagline: string;
  missionStatement: string;
  medicalDisclaimer: string;
  draftNotice: string;
  navigation: {
    name: string;
    path: string;
    description?: string;
  }[];
  socials: {
    github: string;
    feedbackEmail: string;
  };
}

export const BRAND: BrandConfig = {
  codename: 'NASA',
  displayName: 'NASA Wellness',
  publicBrandPending: true,
  version: 'Milestone 1 — Alpha Foundation',
  tagline: 'A warm, evidence-grounded approach to menstrual health and body literacy.',
  missionStatement:
    'Helping people understand their natural cycles with scientific clarity, emotional calm, and absolute privacy — free from judgment or corporate tracking.',
  medicalDisclaimer:
    'NASA is an educational wellness project currently in development. Content and interactive previews are provided for body literacy and informational purposes only and do not constitute clinical diagnosis, medical treatment, or personalized healthcare advice.',
  draftNotice:
    'NASA is an internal project codename. All data shown in this milestone is fictional preview data. No personal health information is stored or transmitted.',
  navigation: [
    { name: 'Home', path: '/', description: 'Platform overview and entry points' },
    { name: 'Dashboard Preview', path: '/dashboard-preview', description: 'Interactive preview of cycle tracking and daily insights' },
    { name: 'Health Encyclopedia', path: '/encyclopedia', description: 'Curated, accessible educational articles' },
    { name: 'Science & Evidence', path: '/science', description: 'Our methodological framework and clinical grounding' },
    { name: 'About', path: '/about', description: 'Our mission, design philosophy, and principles' },
    { name: 'Privacy', path: '/privacy', description: 'Draft data principles and intended privacy protections' },
  ],
  socials: {
    github: 'https://github.com',
    feedbackEmail: 'project-nasa@wellness.internal',
  },
};

export function getBrandTitle(pageTitle?: string): string {
  if (!pageTitle) return `${BRAND.codename} — Menstrual Health & Body Literacy`;
  return `${pageTitle} | ${BRAND.codename}`;
}
