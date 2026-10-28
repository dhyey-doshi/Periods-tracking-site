import type { Article, CategoryInfo } from '../types';

export const ENCYCLOPEDIA_CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    name: 'All Topics',
    description: 'Explore the full spectrum of cycle science, body literacy, and self-care.',
    articleCount: 5,
  },
  {
    id: 'menstrual-phases',
    name: 'Cycle Phases',
    description: 'Deep dives into each phase: menstrual, follicular, ovulatory, and luteal.',
    articleCount: 2,
  },
  {
    id: 'hormones-and-physiology',
    name: 'Hormones & Biology',
    description: 'Clear, grounded explanations of endocrine messengers and bodily rhythms.',
    articleCount: 1,
  },
  {
    id: 'wellness-and-care',
    name: 'Daily Wellness & Nutrition',
    description: 'Evidence-informed self-care, nourishment, and physical movement tailored to your rhythm.',
    articleCount: 1,
  },
  {
    id: 'body-signals',
    name: 'Body Signals & Biomarkers',
    description: 'Learning to observe cervical fluid, temperature, and bodily cues without anxiety.',
    articleCount: 1,
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'art-four-cycle-phases',
    slug: 'the-four-phases-of-the-menstrual-cycle',
    title: 'The Four Phases of the Menstrual Cycle: A Grounded Guide to Your Rhythm',
    subtitle: 'Moving beyond the 28-day myth to understand the natural biological shifts in your body, energy, and hormones.',
    category: 'menstrual-phases',
    categoryLabel: 'Cycle Phases',
    tags: ['cycle phases', 'hormones', 'ovulation', 'menstruation', 'physiology'],
    readingTimeMinutes: 7,
    publishedDate: '2026-09-15',
    lastReviewed: 'October 2026',
    reviewStatus: 'Drafted from clinical guidelines & endocrine consensus (ACOG & Endocrine Society). Has not undergone independent medical board review.',
    editorial: {
      authorName: 'NASA Health Editorial Collective',
      authorRole: 'Medical Writing & Health Literacy',
      reviewStatus: 'Drafted from clinical guidelines & endocrine consensus (ACOG & Endocrine Society). Has not undergone independent external medical board review.',
    },
    evidenceTier: 'established',
    evidenceExplanation: 'Established endocrine and anatomical consensus supported by ACOG clinical guidelines, Endotext reproductive endocrinology, and large-scale cycle tracking cohorts.',
    disclaimer: 'This article provides general physiological education. It does not replace clinical consultation, diagnosis, or personalized medical care.',
    summary:
      'The menstrual cycle is an intricate, continuous dialogue between the brain and ovaries. Rather than a simple monthly event, it comprises four distinct hormonal seasons: Menstruation, Follicular, Ovulation, and Luteal.',
    keyTakeaways: [
      'The cycle starts on Day 1 of full menstrual flow, not light pre-period spotting.',
      'The follicular phase is biologically the most variable in length, while the post-ovulatory luteal phase is remarkably consistent in most healthy individuals.',
      'Ovulation is the central biological event of the cycle; menstruation is simply the sequel when fertilization does not take place.',
      'Variations of 2 to 4 days cycle-to-cycle are biologically normal and do not automatically indicate hormonal dysfunction.',
    ],
    sections: [
      {
        heading: 'Introduction: The Cycle as an Internal Climate',
        content: [
          'For decades, standard health education reduced the menstrual cycle to a single inconvenient week of bleeding, followed by three weeks of silence. In reality, the menstrual cycle is a vital sign—a continuous, rhythmic dance of chemical communication orchestrating energy metabolism, cardiovascular dynamics, bone remodeling, and emotional cognition.',
          'Your brain (specifically the hypothalamus and pituitary gland) and your ovaries communicate through a sensitive biological feedback system known as the Hypothalamic-Pituitary-Ovarian (HPO) axis. Understanding this axis gives you a grounded map of why your physical stamina, sleep architecture, and social appetite naturally fluctuate across the month.',
        ],
        callout: {
          type: 'insight',
          title: 'The 28-Day Myth',
          text: 'Only about 13% of women and cycling individuals have a textbook 28-day cycle. Clinical consensus confirms that healthy, ovulatory cycles typically range from 24 to 38 days without any underlying pathology.',
        },
      },
      {
        heading: 'Phase 1: Menstruation (Days 1 to ~5)',
        content: [
          'The cycle officially commences on Day 1: the first full day of red menstrual flow (pre-menstrual brown spotting is technically considered part of the previous cycle). During this phase, the endometrium—the specialized, nutrient-dense lining built up in the uterus—is shed because an embryo was not implanted.',
          'At this point, estrogen and progesterone levels are at their lowest baseline. The lack of hormonal stimulation allows the uterine tissue to release prostaglandins, fatty acid compounds that prompt the uterine myometrium (muscle) to contract and expel the lining.',
          'Biologically, this is an energy baseline. As prostaglandins circulate, some people experience smooth muscle contractions not just in the uterus, but also in the digestive tract, explaining mild digestive looseness.',
        ],
        subsections: [
          {
            title: 'Hormonal Signature',
            body: 'Estrogen and progesterone are at resting nadir. Towards day 3 to 5, the pituitary gland begins ramping up Follicle-Stimulating Hormone (FSH) to awaken the next cohort of ovarian follicles.',
          },
          {
            title: 'Physical & Emotional Orientation',
            body: 'Physical endurance may feel limited, and internal reflective bandwidth is higher. Iron reserves are expended, making rest and warm, nourishing foods especially supportive.',
          },
        ],
      },
      {
        heading: 'Phase 2: The Follicular Phase (Days 6 to ~13)',
        content: [
          'Once bleeding concludes, the follicular phase takes center stage. Inside the ovaries, a cohort of small fluid-filled sacs called follicles competes to mature an egg. Eventually, one follicle emerges dominant (the Graafian follicle), while the others naturally regress.',
          'As the dominant follicle grows, its granulosa cells pump increasing quantities of estradiol (the most potent human estrogen) into the bloodstream. Estradiol signals the uterine lining to proliferate, rebuilding a plush, vascular bed.',
          'Estradiol also crosses the blood-brain barrier, boosting serotonin synthesis and enhancing insulin sensitivity. Many people report a palpable surge in mental acuity, social curiosity, and physical resilience during this phase.',
        ],
        callout: {
          type: 'body-check',
          title: 'Cervical Fluid Transformation',
          text: 'Noticeable changes in cervical fluid occur during the mid-to-late follicular phase. As estrogen climbs, fluid shifts from dry/scant to creamy lotion, and finally to slippery, watery secretions as ovulation nears.',
        },
      },
      {
        heading: 'Phase 3: The Ovulatory Phase (Days ~14 to 16)',
        content: [
          'Ovulation is the brief, pivotal midpoint of the cycle. When estradiol reaches a critical threshold in the bloodstream, it triggers an astonishing biological switch: instead of suppressing pituitary hormones, it unleashes a massive, sudden surge of Luteinizing Hormone (LH).',
          'Approximately 24 to 36 hours after the LH surge begins, the ovarian wall thins and the mature follicle gently releases its ovum into the peritoneal space, where it is swept up by the finger-like fimbriae of the fallopian tube.',
          'The egg itself survives only 12 to 24 hours unless fertilized. However, because sperm can survive up to 5 days in fertile-quality cervical fluid, the biological "fertile window" spans the 5 days prior to ovulation plus the day of ovulation itself.',
        ],
      },
      {
        heading: 'Phase 4: The Luteal Phase (Days ~17 to 28)',
        content: [
          'After the egg departs, the collapsed follicular shell does not disappear. Under the instruction of LH, its cells undergo a dramatic structural remodeling known as luteinization, transforming into a temporary endocrine gland: the corpus luteum.',
          'The corpus luteum secretes abundant progesterone alongside moderate amounts of estrogen. Progesterone translates literally to "pro-gestation"—its biological role is to calm the uterine muscle, transform the endometrium into a nutrient-secreting structure, and support potential embryonic life.',
          'Progesterone also acts directly on the brainstem temperature regulation center, raising your core resting basal body temperature by approximately 0.3°C to 0.5°C. Progesterone metabolites (such as allopregnanolone) interact with GABA receptors, which can create a calming, sedative sensation or, in some individuals sensitive to rapid hormonal shifts, emotional volatility.',
        ],
        subsections: [
          {
            title: 'Metabolic Shift',
            body: 'Basal metabolic rate rises by roughly 100 to 300 calories per day during the mid-to-late luteal phase. Craving complex carbohydrates is not a lack of willpower; it is an evolutionarily conserved requirement for steady glycogen and serotonin synthesis.',
          },
          {
            title: 'The Pre-Menstrual Drop',
            body: 'If fertilization does not take place within about 10 to 12 days, the corpus luteum regresses. As progesterone and estrogen drop precipitously, the vascular support to the uterine lining is cut off, setting the stage for menstruation to begin again.',
          },
        ],
        callout: {
          type: 'clinical-note',
          title: 'Understanding Pre-Menstrual Sensations',
          text: 'Mild physical changes (such as mild fluid retention or increased emotional sensitivity) in the final 3-5 days before menstruation are normal physiological responses to the rapid withdrawal of progesterone. Severe, debilitating disruption may indicate Premenstrual Dysphoric Disorder (PMDD), which deserves compassionate clinical care.',
        },
      },
      {
        heading: 'Summary: Honoring Your Nonlinear Biology',
        content: [
          'Modern work culture is predominantly built around a 24-hour circadian clock. While humans of all sexes experience circadian rhythms, individuals with menstrual cycles also experience a 28-to-35-day infradian rhythm.',
          'When you understand which phase you are in, you can meet your body with curiosity rather than frustration. You can plan cognitively demanding presentations for follicular or ovulatory windows, protect quiet evenings during the late luteal phase, and rest during menstruation without guilt.',
        ],
      },
    ],
    references: [
      {
        id: 'ref-acog-2022',
        title: 'Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign',
        authors: 'American College of Obstetricians and Gynecologists (ACOG)',
        source: 'Obstetrics & Gynecology Clinical Committee Opinion No. 651',
        year: 2022,
        doiOrUrl: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign',
        note: 'Establishes the clinical standard for normal cycle variability and monitoring menstrual health as a core vital sign.',
      },
      {
        id: 'ref-reed-carr-2018',
        title: 'The Normal Menstrual Cycle and the Control of Ovulation',
        authors: 'Reed BG, Carr BR.',
        source: 'Endotext [Internet]. South Dartmouth (MA): MDText.com',
        year: 2018,
        doiOrUrl: 'https://www.ncbi.nlm.nih.gov/books/NBK279054/',
        note: 'Authoritative clinical reference on the endocrine mechanisms of the HPO axis and follicular recruitment.',
      },
      {
        id: 'ref-bull-2019',
        title: 'Real-world menstrual cycle characteristics of more than 600,000 menstrual cycles',
        authors: 'Bull JR, Rowland SP, Scherwitzl EB, et al.',
        source: 'npj Digital Medicine 2, 83',
        year: 2019,
        doiOrUrl: 'https://doi.org/10.1038/s41746-019-0152-7',
        note: 'Large-scale empirical study demonstrating that only 13% of cycles are 28 days, confirming widespread biological diversity.',
      },
    ],
    relatedArticleSlugs: [
      'understanding-estrogen-and-progesterone',
      'cycle-variability-and-irregularity',
      'navigating-the-luteal-phase',
    ],
    seo: {
      title: 'The Four Phases of the Menstrual Cycle: A Grounded Guide',
      description: 'Explore the biological shifts of menstruation, follicular, ovulatory, and luteal phases beyond the 28-day myth with clinical consensus.',
      canonicalUrl: 'https://nasa-health.org/encyclopedia/the-four-phases-of-the-menstrual-cycle',
    },
  },
  {
    id: 'art-estrogen-progesterone',
    slug: 'understanding-estrogen-and-progesterone',
    title: 'Understanding Estrogen & Progesterone: What the Curves Mean',
    subtitle: 'The two primary ovarian conductors, their physical effects, and why balance is dynamic rather than static.',
    category: 'hormones-and-physiology',
    categoryLabel: 'Hormones & Biology',
    tags: ['estrogen', 'progesterone', 'hormones', 'ovulation', 'endocrinology'],
    readingTimeMinutes: 5,
    publishedDate: '2026-09-20',
    lastReviewed: 'October 2026',
    reviewStatus: 'Drafted from endocrine physiology references. Has not undergone independent medical board review.',
    editorial: {
      authorName: 'NASA Health Editorial Collective',
      authorRole: 'Medical Writing & Health Literacy',
      reviewStatus: 'Drafted from endocrine physiology references. Has not undergone independent external medical board review.',
    },
    evidenceTier: 'established',
    evidenceExplanation: 'Core ovarian steroidogenesis and hypothalamic-pituitary-ovarian (HPO) receptor dynamics represent peer-reviewed endocrine consensus.',
    disclaimer: 'Educational information only. Laboratory hormone values should always be interpreted by a licensed physician.',
    summary:
      'Estrogen builds, sharpens, and energizes; progesterone calms, stabilizes, and sustains. Explore how these two master messengers work in continuous, harmonious counterpoint throughout your cycle.',
    keyTakeaways: [
      'Estrogen (primarily estradiol) dominates the first half of the cycle, supporting tissue growth and mental focus.',
      'Progesterone is only produced in significant amounts after successful ovulation.',
      'Hormone balance is not a 50/50 static ratio; it is a timed biological sequence where each hormone peaks at designated moments.',
    ],
    sections: [
      {
        heading: 'Two Hormones with Distinct Personalities',
        content: [
          'Throughout your menstrual cycle, dozens of hormones work in coordination. Yet two ovarian steroids act as the chief storytellers: Estradiol (the principal form of estrogen during reproductive years) and Progesterone.',
          'Think of estrogen as the builder: it stimulates cellular growth, promotes blood flow, enhances cognitive speed, and prepares the body for potential reproduction. Think of progesterone as the stabilizer: it curtails unbounded proliferation, matures tissues, warms core temperature, and supports sleep architecture.',
        ],
      },
      {
        heading: 'Why Progesterone Requires Ovulation',
        content: [
          'A common misconception is that estrogen and progesterone are both produced constantly. In an unmedicated cycle, significant progesterone production only begins after an egg is successfully released.',
          'Without ovulation, no corpus luteum forms, and progesterone remains at a low baseline. This is why "anovulatory cycles" (cycles where bleeding occurs without prior ovulation) often feel physically different—they lack the stabilizing influence of progesterone.',
        ],
      },
    ],
    references: [
      {
        id: 'ref-prior-2020',
        title: 'Progesterone for Symptomatic Perimenopause Treatment — Progesterone as a Brain Hormone',
        authors: 'Prior JC.',
        source: 'The Journal of Clinical Endocrinology & Metabolism',
        year: 2020,
        doiOrUrl: 'https://academic.oup.com/jcem',
      },
    ],
    relatedArticleSlugs: [
      'the-four-phases-of-the-menstrual-cycle',
      'navigating-the-luteal-phase',
      'cervical-fluid-and-fertile-signs',
    ],
    seo: {
      title: 'Understanding Estrogen & Progesterone: What the Curves Mean',
      description: 'Clear explanation of how estradiol and progesterone rise, peak, and interact to coordinate cycle rhythm and body sensations.',
      canonicalUrl: 'https://nasa-health.org/encyclopedia/understanding-estrogen-and-progesterone',
    },
  },
  {
    id: 'art-luteal-phase-wellness',
    slug: 'navigating-the-luteal-phase',
    title: 'Navigating the Luteal Phase: Energy Shifts, Mood, and Metabolic Changes',
    subtitle: 'A practical, compassionate guide to the second half of the cycle when your body’s caloric and emotional needs shift.',
    category: 'wellness-and-care',
    categoryLabel: 'Daily Wellness & Nutrition',
    tags: ['luteal phase', 'metabolism', 'nutrition', 'pms', 'progesterone', 'self-care'],
    readingTimeMinutes: 6,
    publishedDate: '2026-09-25',
    lastReviewed: 'October 2026',
    reviewStatus: 'Drafted from nutritional biochemistry and reproductive physiology sources.',
    editorial: {
      authorName: 'NASA Health Editorial Collective',
      authorRole: 'Medical Writing & Health Literacy',
      reviewStatus: 'Drafted from nutritional biochemistry and reproductive physiology sources.',
    },
    evidenceTier: 'emerging',
    evidenceExplanation: 'Metabolic rate increases post-ovulation are established, while specific nutritional interventions and individual premenstrual symptom variations represent active, evolving areas of clinical research.',
    disclaimer: 'General educational guidance. Consult a healthcare professional for clinical premenstrual symptoms or nutrition plans.',
    summary:
      'The luteal phase represents the 10 to 16 days following ovulation. Learn why metabolic expenditure naturally increases, how blood sugar sensitivity shifts, and how to nurture yourself with grace.',
    keyTakeaways: [
      'Your resting metabolism burns an additional 100 to 300 kcal/day during the luteal phase due to progesterone.',
      'Insulin sensitivity naturally decreases slightly, making stable complex carbohydrates and proteins essential.',
      'Prioritizing magnesium, vitamin B6, and consistent sleep can significantly smooth the premenstrual transition.',
    ],
    sections: [
      {
        heading: 'The Biochemistry of the Post-Ovulatory Body',
        content: [
          'After ovulation, progesterone transforms your internal metabolism. Because progesterone slightly raises your core body temperature, your baseline energy burn increases. If you find yourself genuinely hungrier during this window, that is a healthy physiological signal, not an absence of willpower.',
          'During this time, your body also experiences slight shifts in insulin sensitivity. Rapid spikes and crashes in blood sugar can exacerbate irritability and mood swings. Choosing complex, slow-burning carbohydrates (sweet potatoes, oats, quinoa, lentils) alongside healthy fats provides steady fuel for both brain and body.',
        ],
      },
    ],
    references: [
      {
        id: 'ref-benton-2020',
        title: 'Metabolic Rate and Energy Balance Across the Menstrual Cycle',
        authors: 'Benton MJ, et al.',
        source: 'International Journal of Sports Nutrition and Exercise Metabolism',
        year: 2020,
      },
    ],
    relatedArticleSlugs: [
      'the-four-phases-of-the-menstrual-cycle',
      'understanding-estrogen-and-progesterone',
    ],
    seo: {
      title: 'Navigating the Luteal Phase: Energy Shifts, Mood & Metabolism',
      description: 'A practical, compassionate guide to post-ovulatory metabolic changes, blood sugar stability, and premenstrual self-care.',
      canonicalUrl: 'https://nasa-health.org/encyclopedia/navigating-the-luteal-phase',
    },
  },
  {
    id: 'art-cycle-variability',
    slug: 'cycle-variability-and-irregularity',
    title: 'Cycle Variability: Why "Normal" Isn\'t Always 28 Days',
    subtitle: 'Understanding the difference between healthy natural cycle variation and patterns that deserve clinical attention.',
    category: 'menstrual-phases',
    categoryLabel: 'Cycle Phases',
    tags: ['cycle length', 'variability', 'irregularity', 'stress', 'acog', 'follicular phase'],
    readingTimeMinutes: 5,
    publishedDate: '2026-10-01',
    lastReviewed: 'October 2026',
    reviewStatus: 'Drafted using ACOG definitions of menstrual regularity and reproductive endocrinology guidelines.',
    editorial: {
      authorName: 'NASA Health Editorial Collective',
      authorRole: 'Medical Writing & Health Literacy',
      reviewStatus: 'Drafted using ACOG definitions of menstrual regularity and reproductive endocrinology guidelines.',
    },
    evidenceTier: 'established',
    evidenceExplanation: 'Diagnostic boundaries for cycle length (24–38 days) and normal cycle-to-cycle variability (up to 7–9 days) are formal clinical standards defined by FIGO and ACOG.',
    disclaimer: 'Not intended to diagnose PCOS, hypothalamic amenorrhea, or thyroid disorders. Please consult your physician for individualized clinical evaluation.',
    summary:
      'Human cycles naturally respond to stress, travel, sleep, and seasonal shifts. Discover the established clinical ranges for cycle length and when variation is a healthy sign of adaptation.',
    keyTakeaways: [
      'Normal cycle length ranges from 24 to 38 days in adults.',
      'Cycle-to-cycle variation of up to 7 to 9 days is considered within normal parameters.',
      'The follicular phase absorbs most cycle variation; ovulation simply happens later when the body is under stress.',
    ],
    sections: [
      {
        heading: 'The Body as an Adaptive System',
        content: [
          'We often expect our bodies to operate like clockwork machinery. But the human reproductive axis is not an engine; it is an intelligent ecological sensor. If you experience illness, intensive physical exertion, travel across time zones, or emotional stress, the brain may prudently postpone follicular development.',
          'According to clinical criteria established by the International Federation of Gynecology and Obstetrics (FIGO) and ACOG, cycle length between 24 and 38 days is considered normal for adult women. Furthermore, cycle-to-cycle variability of up to 7 to 9 days is considered typical.',
        ],
      },
    ],
    references: [
      {
        id: 'ref-figo-2018',
        title: 'The two FIGO systems for normal and abnormal uterine bleeding symptoms and classification of causes of AUB in the reproductive years',
        authors: 'Munro MG, et al.',
        source: 'International Journal of Gynecology & Obstetrics, 143(3), 393-408',
        year: 2018,
      },
    ],
    relatedArticleSlugs: [
      'the-four-phases-of-the-menstrual-cycle',
      'cervical-fluid-and-fertile-signs',
    ],
    seo: {
      title: 'Cycle Variability: Why Normal Isn\'t Always 28 Days',
      description: 'Learn clinical standards for normal cycle variation, why the follicular phase absorbs stress, and when changes warrant medical review.',
      canonicalUrl: 'https://nasa-health.org/encyclopedia/cycle-variability-and-irregularity',
    },
  },
  {
    id: 'art-cervical-fluid-biomarkers',
    slug: 'cervical-fluid-and-fertile-signs',
    title: 'Body Signals: Reading Cervical Fluid and Biomarkers Gently',
    subtitle: 'An introduction to observing cervical secretions, sensation at the vulva, and basal body temperature with scientific clarity.',
    category: 'body-signals',
    categoryLabel: 'Body Signals & Biomarkers',
    tags: ['cervical fluid', 'biomarkers', 'fertility awareness', 'estrogen', 'ovulation cues'],
    readingTimeMinutes: 6,
    publishedDate: '2026-10-05',
    lastReviewed: 'October 2026',
    reviewStatus: 'Drafted from fertility awareness and reproductive biology textbooks (Weschler, ACOG).',
    editorial: {
      authorName: 'NASA Health Editorial Collective',
      authorRole: 'Medical Writing & Health Literacy',
      reviewStatus: 'Drafted from fertility awareness and reproductive biology textbooks (Weschler, ACOG).',
    },
    evidenceTier: 'established',
    evidenceExplanation: 'Cervical crypt anatomy, estrogen-stimulated mucin synthesis, and progesterone-mediated drying are textbook anatomical and physiological phenomena.',
    disclaimer: 'Educational guide. Not a substitute for accredited fertility awareness method (FAM) instruction if used for natural contraception.',
    summary:
      'Your cervix produces distinct biological secretions under the influence of changing estrogen and progesterone. Learn how to observe these clues without clinical anxiety.',
    keyTakeaways: [
      'Cervical fluid is produced by specialized crypts inside the cervix in response to circulating estradiol.',
      'Watery and clear stretchy (egg-white) fluid creates microscopic swimming channels that nourish and guide sperm.',
      'Post-ovulation, progesterone immediately dries up fluid and closes the cervix with a protective mucus plug.',
    ],
    sections: [
      {
        heading: 'Cervical Fluid is Healthy and Protective',
        content: [
          'For many, any bodily discharge is misinterpreted as an infection or something to be cleaned away. In truth, healthy cervical fluid is a dynamic physiological biomarker produced by estrogen-responsive crypts in the cervical canal.',
          'Observing the sensation at the vulva and the visual appearance of fluid provides direct real-time feedback on what your ovaries are doing, days before an ovulation prediction kit or temperature rise can confirm it.',
        ],
      },
    ],
    references: [
      {
        id: 'ref-weschler-2015',
        title: 'Taking Charge of Your Fertility: The Definitive Guide',
        authors: 'Weschler T.',
        source: 'William Morrow Paperbacks (20th Anniversary Edition)',
        year: 2015,
      },
    ],
    relatedArticleSlugs: [
      'the-four-phases-of-the-menstrual-cycle',
      'understanding-estrogen-and-progesterone',
    ],
    seo: {
      title: 'Body Signals: Reading Cervical Fluid and Biomarkers Gently',
      description: 'Understand how cervical fluid changes from dry to lotion to fertile egg-white as estrogen shifts, without clinical anxiety.',
      canonicalUrl: 'https://nasa-health.org/encyclopedia/cervical-fluid-and-fertile-signs',
    },
  },
];

export const ALL_TAGS = Array.from(new Set(ARTICLES.flatMap((a) => a.tags))).sort();
