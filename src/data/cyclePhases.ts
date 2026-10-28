import type { CyclePhase, CyclePhaseDetails } from '../types';
import { SEMANTIC_TOKENS } from '../theme/tokens';

export const CYCLE_PHASES: Record<CyclePhase, CyclePhaseDetails> = {
  menstrual: {
    id: 'menstrual',
    name: 'Menstrual Phase',
    dayRange: 'Days 1 – 5',
    durationLabel: 'Typically 3 – 7 days',
    themeColor: {
      bg: 'bg-[#FDF1F3]',
      border: 'border-[#F5CDD3]',
      text: 'text-[#8E2235]',
      accent: SEMANTIC_TOKENS.phases.menstrual.accent,
      badge: 'bg-[#FDF1F3] text-[#8E2235] border-[#F5CDD3]',
    },
    summary:
      'The shedding of the uterine lining (endometrium). Progesterone and estrogen are at baseline, signaling the body to reset and rest.',
    biologicalContext:
      'Because fertilization did not occur in the previous cycle, the corpus luteum breaks down, causing a sharp decline in estrogen and progesterone. The pituitary gland responds by beginning to secrete Follicle-Stimulating Hormone (FSH) to mature new ovarian follicles.',
    keyHormones: [
      { name: 'Estrogen', trend: 'low', description: 'At base baseline level, beginning a slow climb toward the end of flow' },
      { name: 'Progesterone', trend: 'low', description: 'At baseline nadir following corpus luteum regression' },
      { name: 'FSH', trend: 'rising', description: 'Begins incremental secretion to recruit follicles for next cycle' },
    ],
    commonSignals: [
      'Uterine cramping or lower back tightness mediated by prostaglandins',
      'Lower systemic physical stamina and higher need for restful sleep',
      'Introspective, reflective emotional bandwidth',
      'Digestive sensitivity or looser bowel movements',
    ],
    selfCareFocus: [
      'Prioritize warm, easily digestible, iron-rich meals (stews, legumes, leafy greens)',
      'Gentle movement: walking, restorative stretching, or pelvic floor release',
      'Hydration and magnesium for smooth muscle relaxation',
      'Permitting slower pacing without self-criticism',
    ],
  },
  follicular: {
    id: 'follicular',
    name: 'Follicular Phase',
    dayRange: 'Days 6 – 13',
    durationLabel: 'Variable: typically 7 – 12 days',
    themeColor: {
      bg: 'bg-[#EFF6F1]',
      border: 'border-[#C5DECA]',
      text: 'text-[#2F5938]',
      accent: SEMANTIC_TOKENS.phases.follicular.accent,
      badge: 'bg-[#EFF6F1] text-[#2F5938] border-[#C5DECA]',
    },
    summary:
      'Follicles mature inside the ovary as estrogen steadily climbs, stimulating the regrowth of the uterine lining and renewing physical vitality.',
    biologicalContext:
      'Under the influence of FSH, several follicles develop, with one dominant Graafian follicle producing increasingly high amounts of estradiol (the primary estrogen). Estradiol thickens the endometrium and enhances neuroplasticity and serotonin signaling.',
    keyHormones: [
      { name: 'Estrogen (Estradiol)', trend: 'rising', description: 'Steadily increasing, promoting endometrial proliferation' },
      { name: 'FSH', trend: 'peaking', description: 'Supports ovarian follicular growth before dominant follicle selection' },
      { name: 'Progesterone', trend: 'low', description: 'Remains quiescent until ovulation occurs' },
    ],
    commonSignals: [
      'Gradual rebound in physical energy and endurance',
      'Enhanced cognitive focus and social curiosity',
      'Shift in cervical fluid from dry/sticky to lotion-like creamy texture',
      'Light, buoyant skin texture and metabolic efficiency',
    ],
    selfCareFocus: [
      'Support energy with vibrant complex carbohydrates and lean proteins',
      'Moderate-to-vigorous resistance training or dynamic cardiovascular movement',
      'Tackling complex planning, creative projects, and collaborative sessions',
      'Healthy microbiome support with fermented foods and prebiotic fiber',
    ],
  },
  ovulatory: {
    id: 'ovulatory',
    name: 'Ovulatory Phase',
    dayRange: 'Days 14 – 16',
    durationLabel: 'Window: ~24 – 48 hours',
    themeColor: {
      bg: 'bg-[#FEF5EE]',
      border: 'border-[#F8D8BF]',
      text: 'text-[#874614]',
      accent: SEMANTIC_TOKENS.phases.ovulatory.accent,
      badge: 'bg-[#FEF5EE] text-[#874614] border-[#F8D8BF]',
    },
    summary:
      'The mature follicle releases an ovum (egg) into the fallopian tube, triggered by a sharp surge in Luteinizing Hormone (LH).',
    biologicalContext:
      'Peak estrogen levels trigger a rapid positive feedback loop in the pituitary gland, unleashing an LH surge. Within 24 to 36 hours of the surge, the mature follicle ruptures, releasing the ovum. The fertile window spans approximately five days prior to ovulation plus the day of ovulation itself.',
    keyHormones: [
      { name: 'LH (Luteinizing Hormone)', trend: 'peaking', description: 'Surges sharply to trigger the physical release of the egg' },
      { name: 'Estrogen', trend: 'peaking', description: 'Reaches highest point of the entire cycle before a temporary post-ovulation dip' },
      { name: 'Testosterone', trend: 'peaking', description: 'Slight transient peak promoting libido and assertiveness' },
    ],
    commonSignals: [
      'Clear, stretchy, egg-white cervical fluid with high lubricity',
      'Transient mild one-sided pelvic twinge (Mittelschmerz)',
      'Peak social charisma, communicative confidence, and libido',
      'Slight elevation in basal body temperature immediately post-release',
    ],
    selfCareFocus: [
      'Channel peak endurance into challenging workouts or creative expression',
      'Anti-inflammatory foods rich in zinc, antioxidants, and cruciferous vegetables',
      'Clear verbal communication and meaningful connection',
      'Attentive body awareness: tracking fluid sensations and bilateral cues',
    ],
  },
  luteal: {
    id: 'luteal',
    name: 'Luteal Phase',
    dayRange: 'Days 17 – 28',
    durationLabel: 'Typically stable: 11 – 16 days',
    themeColor: {
      bg: 'bg-[#F8F2FA]',
      border: 'border-[#E4D5EB]',
      text: 'text-[#5B376E]',
      accent: SEMANTIC_TOKENS.phases.luteal.accent,
      badge: 'bg-[#F8F2FA] text-[#5B376E] border-[#E4D5EB]',
    },
    summary:
      'The ruptured follicle transforms into the corpus luteum, producing progesterone to stabilize the uterine lining and elevate basal metabolism.',
    biologicalContext:
      'Progesterone acts as the dominant hormone in this phase. It converts the endometrium into a receptive secretory state, stimulates GABA receptors for psychological grounding, and raises core basal body temperature by ~0.3°C to 0.5°C. In the late luteal phase, if no pregnancy occurs, hormone levels decline, which can prompt premenstrual sensations.',
    keyHormones: [
      { name: 'Progesterone', trend: 'dominant', description: 'Main hormone of this phase; peaks around cycle day 21' },
      { name: 'Estrogen', trend: 'rising', description: 'A secondary, lower peak occurs in mid-luteal phase' },
      { name: 'LH / FSH', trend: 'low', description: 'Suppressed by negative feedback from progesterone' },
    ],
    commonSignals: [
      'Elevated resting body temperature and mild water retention',
      'Increased metabolic rate (caloric requirement naturally increases by ~100–300 kcal/day)',
      'Shift toward nesting, detail orientation, and emotional boundaries',
      'Breast tenderness or sensory sensitivity in the late days',
    ],
    selfCareFocus: [
      'Complex carbohydrates, b-vitamins, and healthy fats to stabilize blood sugar and serotonin',
      'Transition from intense high-impact workouts to steady state or strength training',
      'Prioritize boundaries, cozy environments, and restorative wind-down routines',
      'Gentle self-compassion for shifting emotional energy and internal focus',
    ],
  },
};
