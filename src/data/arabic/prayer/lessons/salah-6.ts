// Lesson 6: Introduction to Sujud as-Sahw
// مقدمة سجود السهو

import { PrayerContent } from '../../../../types/prayer';

export const salah6Content: PrayerContent[] = [
  {
    type: 'description',
    title: 'What is Sujud as-Sahw?',
    titleArabic: 'ما هو سجود السهو؟',
    content: 'Sujud as-Sahw (prostration of forgetfulness) is two prostrations performed to compensate for mistakes made during prayer due to forgetfulness. It is a mercy from Allah that allows us to correct our prayer rather than repeat it entirely.',
    arabic: 'سُجُودُ السَّهْوِ',
  },
  {
    type: 'rule',
    title: 'When is Sujud as-Sahw Required?',
    content: 'Sujud as-Sahw is performed in three situations: (1) Adding something extra to the prayer (Ziyadah), such as an extra rak\'ah. (2) Omitting something from the prayer (Naqs), such as forgetting the first Tashahhud. (3) Doubt about the number of rak\'ahs (Shakk).',
    icon: 'help-circle',
  },
  {
    type: 'step_list',
    title: 'The Three Causes',
    titleArabic: 'الأسباب الثلاثة',
    steps: [
      {
        stepNumber: 1,
        title: 'Addition (Ziyadah)',
        titleArabic: 'الزيادة',
        description: 'Adding an extra standing, sitting, bowing, or prostration to the prayer. For example, praying 5 rak\'ahs instead of 4. If you realize during the addition, return to the correct position and perform Sujud as-Sahw.',
      },
      {
        stepNumber: 2,
        title: 'Omission (Naqs)',
        titleArabic: 'النقص',
        description: 'Forgetting an obligatory part of the prayer, such as skipping the first Tashahhud or forgetting to say "Subhana rabbiyal-a\'la" in sujud. If you remember before reaching the next equivalent position, go back and do it. Otherwise, continue and perform Sujud as-Sahw.',
      },
      {
        stepNumber: 3,
        title: 'Doubt (Shakk)',
        titleArabic: 'الشك',
        description: 'Being unsure about the number of rak\'ahs performed. For example, not knowing if you prayed 3 or 4 rak\'ahs. Build on what you are certain of (the lesser number) and complete the prayer, then perform Sujud as-Sahw.',
      },
    ],
  },
  {
    type: 'prayer_step',
    title: 'How to Perform Sujud as-Sahw',
    step: {
      stepNumber: 1,
      positionName: 'The Prostrations',
      positionNameArabic: 'كيفية سجود السهو',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
      transliteration: 'Subhana rabbiyal-a\'la',
      translation: 'Glory be to my Lord, the Most High',
      instruction: 'Perform two prostrations just like the regular prostrations in prayer, with a brief sitting between them. Say "Subhana rabbiyal-a\'la" in each prostration at least once (three times is recommended).',
      repetitions: 3,
    },
  },
  {
    type: 'table',
    title: 'Before or After the Tasleem?',
    titleArabic: 'قبل أم بعد التسليم؟',
    headers: ['Situation', 'When to Perform', 'Reason'],
    rows: [
      ['Omission (forgot something)', 'Before Tasleem', 'To complete the prayer before ending it'],
      ['Addition (added something extra)', 'After Tasleem', 'As a correction after the prayer'],
      ['Doubt (unsure of count)', 'Before Tasleem', 'Building on certainty, completing before ending'],
    ],
  },
  {
    type: 'note',
    title: 'The Scholarly View',
    content: 'There are different opinions among the madhahib (schools of jurisprudence). The Hanafi madhab generally performs Sujud as-Sahw after the Tasleem in all cases. The Shafi\'i madhab generally performs it before the Tasleem. The description above follows the Hanbali position which differentiates based on the situation, and is supported by multiple hadiths.',
  },
  {
    type: 'rule',
    title: 'Important Principles',
    content: 'If you are certain about a mistake, act on your certainty. If you are in doubt, build on the lesser count (what you are sure of). Sujud as-Sahw does not make up for missing a pillar (rukn) of prayer - if you miss a pillar, you must make up the entire rak\'ah.',
    icon: 'bulb',
  },
  {
    type: 'examples_grid',
    title: 'Key Terms',
    titleArabic: 'مصطلحات مهمة',
    examples: [
      {
        arabic: 'سُجُودُ السَّهْوِ',
        transliteration: 'Sujud as-Sahw',
        translation: 'Prostration of Forgetfulness',
      },
      {
        arabic: 'زِيَادَة',
        transliteration: 'Ziyadah',
        translation: 'Addition (extra action in prayer)',
      },
      {
        arabic: 'نَقْص',
        transliteration: 'Naqs',
        translation: 'Omission (missing something)',
      },
      {
        arabic: 'شَكّ',
        transliteration: 'Shakk',
        translation: 'Doubt (uncertainty about count)',
      },
    ],
  },
];
