// Tajweed Rules Data
// Comprehensive rules for proper Quran recitation

import { TajweedRule, TajweedRuleId } from '../../../../types/quran';
import { TAJWEED_COLORS } from './colors';

export const TAJWEED_RULES: TajweedRule[] = [
  // ============ Noon Sakinah & Tanween Rules ============
  {
    id: 'izhar',
    nameArabic: 'إظهار',
    nameEnglish: 'Izhar (Clear)',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.izhar,
    description:
      'Clear pronunciation of Noon Sakinah or Tanween when followed by throat letters (ء ه ع ح غ خ). The noon is pronounced clearly without nasalization or merging.',
    descriptionArabic:
      'إظهار النون الساكنة أو التنوين عند حروف الحلق الستة: الهمزة والهاء والعين والحاء والغين والخاء',
    letters: ['ء', 'ه', 'ع', 'ح', 'غ', 'خ'],
    examples: [
      {
        text: 'مِنْ هَادٍ',
        transliteration: "min hādin",
        surahName: 'Ar-Ra\'d',
        ayahNumber: 33,
        explanation: 'Noon sakinah before Ha - pronounced clearly',
      },
      {
        text: 'مَنْ آمَنَ',
        transliteration: "man āmana",
        surahName: 'Al-Baqarah',
        ayahNumber: 62,
        explanation: 'Noon sakinah before Hamza - clear pronunciation',
      },
    ],
  },
  {
    id: 'ikhfa',
    nameArabic: 'إخفاء',
    nameEnglish: 'Ikhfa (Hiding)',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.ikhfa,
    description:
      'Hidden pronunciation of Noon Sakinah or Tanween when followed by 15 specific letters. The noon sound is softened with a nasal sound (ghunnah) for 2 counts.',
    descriptionArabic:
      'إخفاء النون الساكنة أو التنوين عند خمسة عشر حرفاً مع الغنة',
    letters: ['ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ف', 'ق', 'ك'],
    duration: 2,
    examples: [
      {
        text: 'مِن قَبْلِ',
        transliteration: "min qabli",
        surahName: 'Al-Baqarah',
        ayahNumber: 25,
        explanation: 'Noon sakinah before Qaf - hidden with ghunnah',
      },
      {
        text: 'أَنتُمْ',
        transliteration: "antum",
        surahName: 'Al-Baqarah',
        ayahNumber: 85,
        explanation: 'Noon sakinah before Ta - ikhfa applied',
      },
    ],
  },
  {
    id: 'iqlab',
    nameArabic: 'إقلاب',
    nameEnglish: 'Iqlab (Conversion)',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.iqlab,
    description:
      'Conversion of Noon Sakinah or Tanween to a Meem sound when followed by the letter Ba (ب). Pronounced with ghunnah for 2 counts.',
    descriptionArabic:
      'قلب النون الساكنة أو التنوين ميماً مخفاة عند الباء مع الغنة',
    letters: ['ب'],
    duration: 2,
    examples: [
      {
        text: 'مِن بَعْدِ',
        transliteration: "mim ba\'di",
        surahName: 'Al-Baqarah',
        ayahNumber: 27,
        explanation: 'Noon becomes Meem before Ba',
      },
      {
        text: 'أَنبِئْهُم',
        transliteration: "ambi\'hum",
        surahName: 'Al-Baqarah',
        ayahNumber: 33,
        explanation: 'Noon converts to Meem sound',
      },
    ],
  },
  {
    id: 'idgham_with_ghunnah',
    nameArabic: 'إدغام بغنة',
    nameEnglish: 'Idgham with Ghunnah',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.idgham_with_ghunnah,
    description:
      'Merging of Noon Sakinah or Tanween into the following letter with nasalization when followed by ي ن م و (Yanmu letters). The ghunnah lasts 2 counts.',
    descriptionArabic:
      'إدغام النون الساكنة أو التنوين في حروف ينمو مع الغنة',
    letters: ['ي', 'ن', 'م', 'و'],
    duration: 2,
    examples: [
      {
        text: 'مَن يَقُولُ',
        transliteration: "may-yaqūlu",
        surahName: 'Al-Baqarah',
        ayahNumber: 8,
        explanation: 'Noon merges into Ya with ghunnah',
      },
      {
        text: 'مِن وَلِيٍّ',
        transliteration: "miw-waliyyin",
        surahName: 'Al-Baqarah',
        ayahNumber: 107,
        explanation: 'Noon merges into Waw with ghunnah',
      },
    ],
  },
  {
    id: 'idgham_without_ghunnah',
    nameArabic: 'إدغام بلا غنة',
    nameEnglish: 'Idgham without Ghunnah',
    category: 'noon_sakinah',
    colorCode: TAJWEED_COLORS.idgham_without_ghunnah,
    description:
      'Complete merging of Noon Sakinah or Tanween into the following letter without nasalization when followed by ل or ر.',
    descriptionArabic:
      'إدغام النون الساكنة أو التنوين في اللام والراء بدون غنة',
    letters: ['ل', 'ر'],
    examples: [
      {
        text: 'مِن رَّبِّهِمْ',
        transliteration: "mir-rabbihim",
        surahName: 'Al-Baqarah',
        ayahNumber: 5,
        explanation: 'Noon completely merges into Ra',
      },
      {
        text: 'مِن لَّدُنْهُ',
        transliteration: "mil-ladunhu",
        surahName: 'An-Nisa',
        ayahNumber: 40,
        explanation: 'Noon completely merges into Lam',
      },
    ],
  },

  // ============ Meem Sakinah Rules ============
  {
    id: 'ikhfa_shafawi',
    nameArabic: 'إخفاء شفوي',
    nameEnglish: 'Ikhfa Shafawi (Labial Hiding)',
    category: 'meem_sakinah',
    colorCode: TAJWEED_COLORS.ikhfa_shafawi,
    description:
      'Hiding of Meem Sakinah when followed by the letter Ba (ب). Pronounced with lips slightly apart and ghunnah for 2 counts.',
    descriptionArabic:
      'إخفاء الميم الساكنة عند الباء مع الغنة',
    letters: ['ب'],
    duration: 2,
    examples: [
      {
        text: 'تَرْمِيهِم بِحِجَارَةٍ',
        transliteration: "tarmīhim bihijāratin",
        surahName: 'Al-Fil',
        ayahNumber: 4,
        explanation: 'Meem hidden before Ba',
      },
    ],
  },
  {
    id: 'idgham_shafawi',
    nameArabic: 'إدغام شفوي',
    nameEnglish: 'Idgham Shafawi (Labial Merging)',
    category: 'meem_sakinah',
    colorCode: TAJWEED_COLORS.idgham_shafawi,
    description:
      'Merging of Meem Sakinah into another Meem when followed by Meem (م). Results in one extended Meem with ghunnah.',
    descriptionArabic:
      'إدغام الميم الساكنة في الميم المتحركة مع الغنة',
    letters: ['م'],
    duration: 2,
    examples: [
      {
        text: 'لَهُم مَّا يَشَاءُونَ',
        transliteration: "lahum-mā yashā\'ūn",
        surahName: 'An-Nahl',
        ayahNumber: 31,
        explanation: 'Two Meems merge into one',
      },
    ],
  },
  {
    id: 'izhar_shafawi',
    nameArabic: 'إظهار شفوي',
    nameEnglish: 'Izhar Shafawi (Labial Clear)',
    category: 'meem_sakinah',
    colorCode: TAJWEED_COLORS.izhar_shafawi,
    description:
      'Clear pronunciation of Meem Sakinah when followed by any letter except Ba (ب) or Meem (م). No ghunnah is added.',
    descriptionArabic:
      'إظهار الميم الساكنة عند جميع الحروف ما عدا الباء والميم',
    letters: [],
    examples: [
      {
        text: 'أَمْ لَمْ',
        transliteration: "am lam",
        surahName: 'Al-Baqarah',
        ayahNumber: 6,
        explanation: 'Meem clearly pronounced before Lam',
      },
    ],
  },

  // ============ Madd (Elongation) Rules ============
  {
    id: 'madd_tabii',
    nameArabic: 'مد طبيعي',
    nameEnglish: 'Madd Tabii (Natural)',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_tabii,
    description:
      'Natural elongation of 2 counts when a vowel letter (ا و ي) follows its corresponding short vowel. This is the foundation of all madd.',
    descriptionArabic:
      'المد الأصلي الذي لا تقوم ذات الحرف إلا به - مقدار حركتين',
    duration: 2,
    examples: [
      {
        text: 'قَالُوا',
        transliteration: "qālū",
        surahName: 'Al-Baqarah',
        ayahNumber: 11,
        explanation: 'Alif after fatha - 2 counts',
      },
    ],
  },
  {
    id: 'madd_wajib',
    nameArabic: 'مد واجب متصل',
    nameEnglish: 'Madd Wajib (Required Connected)',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_wajib,
    description:
      'Required elongation of 4-5 counts when a hamza follows a madd letter within the same word.',
    descriptionArabic:
      'المد المتصل الواجب - أن يأتي بعد حرف المد همزة في كلمة واحدة',
    duration: 5,
    examples: [
      {
        text: 'جَاءَ',
        transliteration: "jā\'a",
        surahName: 'An-Nasr',
        ayahNumber: 1,
        explanation: 'Alif followed by hamza - 4-5 counts',
      },
      {
        text: 'السُّوءَ',
        transliteration: "as-sū\'a",
        surahName: 'An-Nisa',
        ayahNumber: 17,
        explanation: 'Waw followed by hamza - must elongate',
      },
    ],
  },
  {
    id: 'madd_jaiz',
    nameArabic: 'مد جائز منفصل',
    nameEnglish: 'Madd Jaiz (Permissible Separated)',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_jaiz,
    description:
      'Permissible elongation of 2-4-6 counts when a hamza at the beginning of the next word follows a madd letter.',
    descriptionArabic:
      'المد المنفصل الجائز - أن يأتي بعد حرف المد همزة في كلمة أخرى',
    duration: 4,
    examples: [
      {
        text: 'يَا أَيُّهَا',
        transliteration: "yā ayyuhā",
        surahName: 'Al-Baqarah',
        ayahNumber: 21,
        explanation: 'Ya of yā followed by hamza of ayyuhā',
      },
    ],
  },
  {
    id: 'madd_lazim',
    nameArabic: 'مد لازم',
    nameEnglish: 'Madd Lazim (Obligatory)',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_lazim,
    description:
      'Obligatory elongation of 6 counts when a sukoon or shaddah follows a madd letter.',
    descriptionArabic:
      'المد اللازم - أن يأتي بعد حرف المد سكون أصلي أو شدة',
    duration: 6,
    examples: [
      {
        text: 'الضَّالِّينَ',
        transliteration: "ad-dāllīn",
        surahName: 'Al-Fatiha',
        ayahNumber: 7,
        explanation: 'Alif before shaddah on Lam - 6 counts',
      },
    ],
  },
  {
    id: 'madd_arid',
    nameArabic: 'مد عارض للسكون',
    nameEnglish: 'Madd Arid (Due to Stopping)',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_arid,
    description:
      'Elongation of 2-4-6 counts when stopping on a word that has a madd letter before the last letter.',
    descriptionArabic:
      'المد العارض للسكون - السكون بسبب الوقف',
    examples: [
      {
        text: 'الْعَالَمِينَ',
        transliteration: "al-\'ālamīn",
        surahName: 'Al-Fatiha',
        ayahNumber: 2,
        explanation: 'When stopping, Ya before Noon can be elongated',
      },
    ],
  },
  {
    id: 'madd_leen',
    nameArabic: 'مد لين',
    nameEnglish: 'Madd Leen (Soft)',
    category: 'madd',
    colorCode: TAJWEED_COLORS.madd_leen,
    description:
      'Soft elongation of Waw or Ya sakinah preceded by a fatha when stopping on the following letter.',
    descriptionArabic:
      'مد الواو والياء الساكنتين المفتوح ما قبلهما عند الوقف',
    examples: [
      {
        text: 'قُرَيْشٍ',
        transliteration: "Quraysh",
        surahName: 'Quraysh',
        ayahNumber: 1,
        explanation: 'Ya sakinah after fatha - soft elongation when stopping',
      },
    ],
  },

  // ============ Qalqalah Rules ============
  {
    id: 'qalqalah_sughra',
    nameArabic: 'قلقلة صغرى',
    nameEnglish: 'Qalqalah Sughra (Minor Echo)',
    category: 'qalqalah',
    colorCode: TAJWEED_COLORS.qalqalah_sughra,
    description:
      'Minor echoing sound on the letters ق ط ب ج د when they have sukoon in the middle of a word. The echo is subtle.',
    descriptionArabic:
      'القلقلة الصغرى - اضطراب الحرف في وسط الكلمة',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    examples: [
      {
        text: 'يَقْطَعُونَ',
        transliteration: "yaqta\'ūn",
        surahName: 'Al-Baqarah',
        ayahNumber: 27,
        explanation: 'Qaf with sukoon in middle - minor qalqalah',
      },
    ],
  },
  {
    id: 'qalqalah_kubra',
    nameArabic: 'قلقلة كبرى',
    nameEnglish: 'Qalqalah Kubra (Major Echo)',
    category: 'qalqalah',
    colorCode: TAJWEED_COLORS.qalqalah_kubra,
    description:
      'Major echoing sound on the letters ق ط ب ج د when they appear at the end of a word or when stopping. The echo is stronger.',
    descriptionArabic:
      'القلقلة الكبرى - اضطراب الحرف في آخر الكلمة أو عند الوقف',
    letters: ['ق', 'ط', 'ب', 'ج', 'د'],
    examples: [
      {
        text: 'الْفَلَقِ',
        transliteration: "al-falaq",
        surahName: 'Al-Falaq',
        ayahNumber: 1,
        explanation: 'Qaf at end when stopping - strong qalqalah',
      },
      {
        text: 'مَسَدٍ',
        transliteration: "masad",
        surahName: 'Al-Masad',
        ayahNumber: 5,
        explanation: 'Dal at end when stopping - strong qalqalah',
      },
    ],
  },

  // ============ Ghunnah Rules ============
  {
    id: 'ghunnah',
    nameArabic: 'غنة',
    nameEnglish: 'Ghunnah (Nasalization)',
    category: 'ghunnah',
    colorCode: TAJWEED_COLORS.ghunnah,
    description:
      'Nasal sound produced through the nose for 2 counts. Required with noon and meem when they have shaddah.',
    descriptionArabic:
      'صوت أغن يخرج من الخيشوم مقدار حركتين - واجبة في النون والميم المشددتين',
    letters: ['ن', 'م'],
    duration: 2,
    examples: [
      {
        text: 'إِنَّ',
        transliteration: "inna",
        surahName: 'Al-Baqarah',
        ayahNumber: 6,
        explanation: 'Noon with shaddah - ghunnah for 2 counts',
      },
      {
        text: 'ثُمَّ',
        transliteration: "thumma",
        surahName: 'Al-Baqarah',
        ayahNumber: 28,
        explanation: 'Meem with shaddah - ghunnah for 2 counts',
      },
    ],
  },

  // ============ Lam Rules ============
  {
    id: 'lam_shamsiyyah',
    nameArabic: 'لام شمسية',
    nameEnglish: 'Lam Shamsiyyah (Sun Letters)',
    category: 'lam_shamsiyyah',
    colorCode: TAJWEED_COLORS.lam_shamsiyyah,
    description:
      'The Lam of "Al" is not pronounced when followed by sun letters (ت ث د ذ ر ز س ش ص ض ط ظ ل ن). The following letter is doubled.',
    descriptionArabic:
      'اللام الشمسية لا تُنطق وتُدغم في الحرف الذي بعدها',
    letters: ['ت', 'ث', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ل', 'ن'],
    examples: [
      {
        text: 'الشَّمْسِ',
        transliteration: "ash-shams",
        surahName: 'Ash-Shams',
        ayahNumber: 1,
        explanation: 'Lam not pronounced, Shin is doubled',
      },
      {
        text: 'النَّاسِ',
        transliteration: "an-nās",
        surahName: 'An-Nas',
        ayahNumber: 1,
        explanation: 'Lam merges into Noon',
      },
    ],
  },
  {
    id: 'lam_qamariyyah',
    nameArabic: 'لام قمرية',
    nameEnglish: 'Lam Qamariyyah (Moon Letters)',
    category: 'lam_shamsiyyah',
    colorCode: TAJWEED_COLORS.lam_qamariyyah,
    description:
      'The Lam of "Al" is clearly pronounced when followed by moon letters (ا ب ج ح خ ع غ ف ق ك م و ه ي).',
    descriptionArabic:
      'اللام القمرية تُنطق ظاهرة قبل الحروف القمرية',
    letters: ['ا', 'ب', 'ج', 'ح', 'خ', 'ع', 'غ', 'ف', 'ق', 'ك', 'م', 'و', 'ه', 'ي'],
    examples: [
      {
        text: 'الْقَمَرِ',
        transliteration: "al-qamar",
        surahName: 'Al-Qamar',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Qaf',
      },
      {
        text: 'الْكَوْثَرَ',
        transliteration: "al-kawthar",
        surahName: 'Al-Kawthar',
        ayahNumber: 1,
        explanation: 'Lam clearly pronounced before Kaf',
      },
    ],
  },
];

// Helper functions
export const getTajweedRuleById = (id: TajweedRuleId): TajweedRule | undefined => {
  return TAJWEED_RULES.find((rule) => rule.id === id);
};

export const getTajweedRulesByCategory = (category: string): TajweedRule[] => {
  return TAJWEED_RULES.filter((rule) => rule.category === category);
};

export const getAllTajweedCategories = (): string[] => {
  const categories = new Set(TAJWEED_RULES.map((rule) => rule.category));
  return Array.from(categories);
};
