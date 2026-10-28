import type { EvidenceItem } from '../types';

export interface MethodologicalPrinciple {
  number: string;
  headline: string;
  challenge: string;
  nasaDifference: string;
  badge?: string;
  // Optional backward compatibility
  title?: string;
  description?: string;
  practicalApplication?: string;
}

export const METHODOLOGICAL_PRINCIPLES: MethodologicalPrinciple[] = [
  {
    number: '01',
    headline: "Your cycle isn't a clock.",
    challenge:
      "Your period doesn't run on an exact schedule. Predictions that promise a precise date can create unnecessary worry when your body follows a different timeline.",
    nasaDifference:
      "Design commitment: We aim to show a range of possible dates instead of pretending we know the exact day. As more personal cycle history becomes available in future milestones, estimates can use that history while making uncertainty clear.",
    badge: 'Design Commitment',
    title: "Your cycle isn't a clock.",
    description:
      "Your period doesn't run on an exact schedule. Predictions that promise a precise date can create unnecessary worry when your body follows a different timeline.",
  },
  {
    number: '02',
    headline: 'Your normal is your normal.',
    challenge:
      "A 28-day cycle isn't the rule everyone must follow. Treating one cycle length as the standard can make healthy variation seem like a problem.",
    nasaDifference:
      "We want to help you understand your own patterns instead of judging you against a single number. Different cycle lengths should not automatically be labelled abnormal, though persistent changes or concerning symptoms always deserve professional medical attention.",
    badge: 'Body Literacy',
    title: 'Your normal is your normal.',
    description:
      "A 28-day cycle isn't the rule everyone must follow. Treating one cycle length as the standard can make healthy variation seem like a problem.",
  },
  {
    number: '03',
    headline: 'Real evidence. Clear answers.',
    challenge:
      "Not every health claim online has the same level of scientific support. Early research, popular wellness advice, and established medical evidence are often presented as though they're equally reliable.",
    nasaDifference:
      "We aim to make the strength of the evidence clear. We distinguish established findings from emerging research and clearly label our own estimates or future product experiments.",
    badge: 'Evidence Transparency',
    title: 'Real evidence. Clear answers.',
    description:
      "Not every health claim online has the same level of scientific support. Early research, popular wellness advice, and established medical evidence are often presented as though they're equally reliable.",
  },
  {
    number: '04',
    headline: 'Here to inform, never diagnose.',
    challenge:
      "An app cannot know everything about your health from a few symptoms or cycle dates. Software should not pretend to replace a healthcare professional.",
    nasaDifference:
      "We provide educational information and help you organise your observations and questions. We do not diagnose conditions such as PCOS, endometriosis, or PMDD. We aim to help you have more informed conversations with a qualified healthcare professional.",
    badge: 'Educational Boundary',
    title: 'Here to inform, never diagnose.',
    description:
      "An app cannot know everything about your health from a few symptoms or cycle dates. Software should not pretend to replace a healthcare professional.",
  },
];

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'hpo-axis',
    tier: 'established',
    topic: 'Hypothalamic-Pituitary-Ovarian (HPO) Endocrine Axis',
    statusHeadline: 'Gold-Standard Biological Consensus',
    physiologicalBasis:
      'The regulation of follicular recruitment, LH surge triggering, and corpus luteum formation is mediated by GnRH pulsatility from the hypothalamus, FSH and LH from the anterior pituitary, and estradiol and progesterone from the ovaries.',
    certaintyLevel: 'High Consensus',
    consensusSources: [
      'ACOG Committee Opinion No. 651: Menstruation as a Vital Sign',
      'Endocrine Society Guidelines on Reproductive Endocrinology',
      'Yen & Jaffe\'s Reproductive Endocrinology (8th Edition)',
    ],
    limitations:
      'While mechanisms are universally established, individual sensitivity of peripheral tissues to identical hormone concentrations varies widely.',
  },
  {
    id: 'cycle-variability',
    tier: 'established',
    topic: 'Natural Cycle Length Range (24–38 Days)',
    statusHeadline: 'Broad Epidemiological Consensus',
    physiologicalBasis:
      'FIGO and ACOG clinical standards define adult menstrual cycle length between 24 and 38 days as normal. Cycle-to-cycle variation up to 7–9 days is common and physiological.',
    certaintyLevel: 'High Consensus',
    consensusSources: [
      'FIGO Menstrual Disorders Committee (Munro et al., 2018)',
      'npj Digital Medicine Large-Scale Menstrual Dataset (Bull et al., 2019, n=600k+)',
    ],
    limitations:
      'Adolescents and perimenopausal individuals exhibit wider physiological variation that stabilizes or shifts over years.',
  },
  {
    id: 'bbt-progesterone',
    tier: 'established',
    topic: 'Basal Body Temperature (BBT) Progesterone Elevation',
    statusHeadline: 'Clinically Validated Biomarker',
    physiologicalBasis:
      'Progesterone acts directly on the thermoregulatory preoptic nucleus of the anterior hypothalamus, producing a sustained rise of 0.3°C to 0.5°C (0.5°F to 1.0°F) post-ovulation until luteolysis.',
    certaintyLevel: 'High Consensus',
    consensusSources: [
      'The Cochrane Database of Systematic Reviews: Fertility Awareness Methods',
      'ACOG Practice Bulletin No. 152: Fertility Awareness-Based Methods',
    ],
    limitations:
      'BBT confirms that ovulation has already occurred retrospectively; it cannot predict the upcoming ovulation in advance on its own.',
  },
  {
    id: 'cycle-syncing-exercise',
    tier: 'emerging',
    topic: 'Cycle-Phased Athletic Training & Nutritional Shifts',
    statusHeadline: 'Promising Exploratory Science with Mixed Evidence',
    physiologicalBasis:
      'Fluctuating estrogen and progesterone alter muscle glycogen storage, ligamentous laxity, and substrate oxidation. Estrogen promotes fat utilization; progesterone elevates resting metabolic burn.',
    certaintyLevel: 'Moderate / Developing',
    consensusSources: [
      'Sports Medicine Systematic Review (McNulty et al., 2020)',
      'British Journal of Sports Medicine consensus on female athlete physiology',
    ],
    limitations:
      'Individual variation in performance often exceeds inter-phase variation. Recommendations must be treated as gentle experiments rather than rigid mandates.',
  },
  {
    id: 'gut-estrobolome',
    tier: 'emerging',
    topic: 'Gut Microbiome & Estrogen Deconjugation (The Estrobolome)',
    statusHeadline: 'Active Biomedical Investigation',
    physiologicalBasis:
      'Specific enteric bacterial species express beta-glucuronidase enzymes that uncouple conjugated estrogens in the gut lumen, allowing reabsorption into systemic circulation.',
    certaintyLevel: 'Moderate / Developing',
    consensusSources: [
      'Maturitas Journal of the European Menopause and Andropause Society',
      'Cell Host & Microbe reviews on host-microbial metabolic interplay',
    ],
    limitations:
      'Most studies demonstrate correlation rather than definitive clinical causation in healthy populations.',
  },
  {
    id: 'probabilistic-bayesian',
    tier: 'future-methodology',
    topic: 'Probabilistic Bayesian Window Prediction Architecture',
    statusHeadline: 'Planned Platform Methodology',
    physiologicalBasis:
      'Rather than computing a static rolling arithmetic average, future versions of the platform will use hierarchical Bayesian modeling to update personalized prior distributions with daily subjective and objective biomarkers.',
    certaintyLevel: 'Methodological Hypothesis',
    consensusSources: [
      'NASA Architecture Milestone 1 Specification',
      'Biostatistics & Time-Series Modeling Principles for Infradian Biological Signals',
    ],
    limitations:
      'Requires at least 3–4 tracked cycles before individual predictive variance narrows significantly. Milestone 1 does not execute active prediction algorithms.',
  },
];
