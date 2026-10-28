export type QuestionType = 'note' | 'single_choice' | 'checkboxes' | 'paragraph';

export interface QuestionOption {
  value: string;
  label: string;
  isOther?: boolean;
}

export interface QuestionnaireQuestion {
  id: string;
  formIndex: number;
  title: string;
  description: string | null;
  type: QuestionType;
  isRequired: boolean;
  options: QuestionOption[];
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  description?: string;
  questionIds: string[];
}

export interface CheckinFormData {
  periodBloodFlow: string[];
  spotting: string[];
  feelings: string[];
  pain: string[];
  sexLife: string[];
  energy: string[];
  mind: string[];
  socialLife: string[];
  cravings: string[];
  discharge: string[];
  skin: string[];
  hair: string[];
  digestion: string[];
  stool: string[];
  exercise: string[];
  additionalNotes: string;
}

export const INITIAL_CHECKIN_FORM_DATA: CheckinFormData = {
  periodBloodFlow: [],
  spotting: [],
  feelings: ['fine'],
  pain: ['pain free'],
  sexLife: [],
  energy: ['ok'],
  mind: ['calm'],
  socialLife: ['sociable'],
  cravings: ['sweet'],
  discharge: ['none'],
  skin: ['ok'],
  hair: ['ok hair day'],
  digestion: ['ok'],
  stool: ['ok'],
  exercise: ['rest day'],
  additionalNotes: '',
};

export const EMPTY_CHECKIN_FORM_DATA: CheckinFormData = {
  periodBloodFlow: [],
  spotting: [],
  feelings: [],
  pain: [],
  sexLife: [],
  energy: [],
  mind: [],
  socialLife: [],
  cravings: [],
  discharge: [],
  skin: [],
  hair: [],
  digestion: [],
  stool: [],
  exercise: [],
  additionalNotes: '',
};

export const QUESTIONNAIRE_META = {
  title: 'HEALTH TRACKER',
  description: 'help me track your sexual health',
  sourceUrl: 'https://forms.gle/jswSA6mUucs3S3Wv7',
};

export const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'period_blood_flow',
    formIndex: 3,
    title: 'period blood flow',
    description: null,
    type: 'checkboxes',
    isRequired: false,
    options: [
      { value: 'light', label: 'light' },
      { value: 'medium', label: 'medium' },
      { value: 'heavy', label: 'heavy' },
      { value: 'super heavy', label: 'super heavy' },
    ],
  },
  {
    id: 'spotting',
    formIndex: 4,
    title: 'spotting',
    description: null,
    type: 'checkboxes',
    isRequired: false,
    options: [
      { value: 'red', label: 'red' },
      { value: 'brown', label: 'brown' },
    ],
  },
  {
    id: 'feelings',
    formIndex: 5,
    title: 'feelings',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'mood swings', label: 'mood swings' },
      { value: 'not in control', label: 'not in control' },
      { value: 'fine', label: 'fine' },
      { value: 'happy', label: 'happy' },
      { value: 'sad', label: 'sad' },
      { value: 'sensitive', label: 'sensitive' },
      { value: 'angry', label: 'angry' },
      { value: 'confident', label: 'confident' },
      { value: 'excited', label: 'excited' },
      { value: 'irritable', label: 'irritable' },
      { value: 'anxious', label: 'anxious' },
      { value: 'insecure', label: 'insecure' },
      { value: 'grateful', label: 'grateful' },
      { value: 'indifferent', label: 'indifferent' },
    ],
  },
  {
    id: 'pain',
    formIndex: 6,
    title: 'pain',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'pain free', label: 'pain free' },
      { value: 'cramps', label: 'cramps' },
      { value: 'ovulation', label: 'ovulation' },
      { value: 'breast tenderness', label: 'breast tenderness' },
      { value: 'headache', label: 'headache' },
      { value: 'migrain', label: 'migrain' },
      { value: 'migrain with aura', label: 'migrain with aura' },
      { value: 'lower back', label: 'lower back' },
      { value: 'leg', label: 'leg' },
      { value: 'joints', label: 'joints' },
      { value: 'vulvar', label: 'vulvar' },
    ],
  },
  {
    id: 'sex_life',
    formIndex: 7,
    title: 'sex life',
    description: null,
    type: 'checkboxes',
    isRequired: false,
    options: [
      { value: 'masturbated', label: 'masturbated' },
      { value: 'nothing today', label: 'nothing today' },
      { value: 'high sex drive', label: 'high sex drive' },
      { value: 'low sex drive', label: 'low sex drive' },
      { value: 'orgasm', label: 'orgasm' },
      { value: 'no orgasm', label: 'no orgasm' },
    ],
  },
  {
    id: 'energy',
    formIndex: 8,
    title: 'energy',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'exhausted', label: 'exhausted' },
      { value: 'tired', label: 'tired' },
      { value: 'ok', label: 'ok' },
      { value: 'energetic', label: 'energetic' },
      { value: 'fully energized', label: 'fully energized' },
    ],
  },
  {
    id: 'mind',
    formIndex: 9,
    title: 'mind',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'forgetful', label: 'forgetful' },
      { value: 'brain fog', label: 'brain fog' },
      { value: 'calm', label: 'calm' },
      { value: 'stressed', label: 'stressed' },
      { value: 'focused', label: 'focused' },
      { value: 'distracted', label: 'distracted' },
      { value: 'motivated', label: 'motivated' },
      { value: 'unmotivated', label: 'unmotivated' },
      { value: 'creative', label: 'creative' },
      { value: 'productive', label: 'productive' },
      { value: 'unproductive', label: 'unproductive' },
    ],
  },
  {
    id: 'socail_life',
    formIndex: 10,
    title: 'socail life',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'sociable', label: 'sociable' },
      { value: 'withdrawn', label: 'withdrawn' },
      { value: 'supportive', label: 'supportive' },
      { value: 'argumentative', label: 'argumentative' },
    ],
  },
  {
    id: 'cravings',
    formIndex: 11,
    title: 'cravings (except dhyey)',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'sweet', label: 'sweet' },
      { value: 'salty', label: 'salty' },
      { value: 'greasy', label: 'greasy' },
      { value: 'spicy', label: 'spicy' },
      { value: 'carbs', label: 'carbs' },
    ],
  },
  {
    id: 'discharge',
    formIndex: 12,
    title: 'discharge',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'none', label: 'none' },
      { value: 'sticky', label: 'sticky' },
      { value: 'creamy', label: 'creamy' },
      { value: 'eggwhite', label: 'eggwhite' },
      { value: 'atypical', label: 'atypical' },
    ],
  },
  {
    id: 'skin',
    formIndex: 13,
    title: 'skin',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'ok', label: 'ok' },
      { value: 'good', label: 'good' },
      { value: 'acne', label: 'acne' },
      { value: 'dry skin', label: 'dry skin' },
      { value: 'oily', label: 'oily' },
      { value: 'itchy', label: 'itchy' },
    ],
  },
  {
    id: 'hair',
    formIndex: 14,
    title: 'hair',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'ok hair day', label: 'ok hair day' },
      { value: 'good hair day', label: 'good hair day' },
      { value: 'bad hair day', label: 'bad hair day' },
      { value: 'oily scalp', label: 'oily scalp' },
      { value: 'dry scalp', label: 'dry scalp' },
      { value: 'hair loss', label: 'hair loss' },
    ],
  },
  {
    id: 'digestion',
    formIndex: 15,
    title: 'digestion',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'ok', label: 'ok' },
      { value: 'bloated', label: 'bloated' },
      { value: 'gassy', label: 'gassy' },
      { value: 'heatburn', label: 'heatburn' },
      { value: 'nauseous', label: 'nauseous' },
      { value: 'vomiting', label: 'vomiting' },
    ],
  },
  {
    id: 'stool',
    formIndex: 16,
    title: 'stool',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'ok', label: 'ok' },
      { value: 'constipation', label: 'constipation' },
      { value: 'diarrhea', label: 'diarrhea' },
    ],
  },
  {
    id: 'exercise',
    formIndex: 17,
    title: 'exercise',
    description: null,
    type: 'checkboxes',
    isRequired: true,
    options: [
      { value: 'running', label: 'running' },
      { value: 'yoga', label: 'yoga' },
      { value: 'walking', label: 'walking' },
      { value: 'stretching', label: 'stretching' },
      { value: 'rest day', label: 'rest day' },
    ],
  },
  {
    id: 'notes',
    formIndex: 18,
    title: 'anything else you would  like to mention',
    description: null,
    type: 'paragraph',
    isRequired: false,
    options: [],
  },
];

export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  {
    id: 'bleeding_and_spotting',
    title: '1. Flow & Spotting',
    description:
      'Track period blood flow and spotting as two completely separate signals.',
    questionIds: ['period_blood_flow', 'spotting'],
  },
  {
    id: 'feelings_and_pain',
    title: '2. Sensations, Feelings & Intimacy',
    description: 'Emotional responses, physical aches, and intimacy observations.',
    questionIds: ['feelings', 'pain', 'sex_life'],
  },
  {
    id: 'mind_and_energy',
    title: '3. Mind, Energy & Social Life',
    description: 'Daily stamina, cognitive clarity, and social inclination.',
    questionIds: ['energy', 'mind', 'socail_life'],
  },
  {
    id: 'body_and_skin',
    title: '4. Body, Skin, Hair & Cravings',
    description: 'Cervical discharge, cravings, and skin/hair observations.',
    questionIds: ['cravings', 'discharge', 'skin', 'hair'],
  },
  {
    id: 'digestion_and_habits',
    title: '5. Digestion, Exercise & Additional Notes',
    description: 'Digestive signals, physical activity, and open-ended reflections.',
    questionIds: ['digestion', 'stool', 'exercise', 'notes'],
  },
];
