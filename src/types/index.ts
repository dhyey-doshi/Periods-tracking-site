/**
 * Core Data Models & TypeScript Types
 */

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export interface CyclePhaseDetails {
  id: CyclePhase;
  name: string;
  dayRange: string;
  durationLabel: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badge: string;
  };
  summary: string;
  biologicalContext: string;
  keyHormones: {
    name: string;
    trend: 'rising' | 'peaking' | 'falling' | 'low' | 'dominant';
    description: string;
  }[];
  commonSignals: string[];
  selfCareFocus: string[];
}

export interface DailyLogSample {
  date: string;
  dayOfCycle: number;
  phase: CyclePhase;
  flow?: 'none' | 'spotting' | 'light' | 'medium' | 'heavy';
  energy: 1 | 2 | 3 | 4 | 5; // 1 lowest, 5 highest
  mood: 'calm' | 'radiant' | 'focused' | 'reflective' | 'sensitive' | 'fatigued';
  physicalSensations: string[];
  cervicalFluid?: 'dry' | 'sticky' | 'creamy' | 'egg-white' | 'watery';
  notes: string;
}

export interface HistoricalCycle {
  cycleNumber: number;
  startDate: string;
  totalDays: number;
  periodLengthDays: number;
  ovulationEstimatedDay: number;
  primaryMoodPattern: string;
  lutealLengthDays: number;
}

export interface ArticleReference {
  id: string;
  title: string;
  authors: string;
  source: string;
  year: number;
  doiOrUrl?: string;
  note?: string;
}

export interface ArticleSection {
  heading: string;
  content: string[];
  subsections?: {
    title: string;
    body: string;
  }[];
  callout?: {
    type: 'insight' | 'myth-buster' | 'body-check' | 'clinical-note';
    title: string;
    text: string;
  };
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  readingTimeMinutes: number;
  lastReviewed: string;
  reviewStatus: string;
  summary: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  references: ArticleReference[];
  disclaimer?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  articleCount: number;
}

export type EvidenceTier = 'established' | 'emerging' | 'future-methodology';

export interface EvidenceItem {
  id: string;
  tier: EvidenceTier;
  topic: string;
  statusHeadline: string;
  physiologicalBasis: string;
  certaintyLevel: 'High Consensus' | 'Moderate / Developing' | 'Methodological Hypothesis';
  consensusSources: string[];
  limitations: string;
}
