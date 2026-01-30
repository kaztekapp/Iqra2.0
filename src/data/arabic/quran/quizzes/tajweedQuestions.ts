// Tajweed Quiz Questions - أَسْئِلَةُ التَّجْوِيدِ
// Based on the comprehensive Tajweed course
// Covers all rules: Noon Sakinah, Meem Sakinah, Madd, Qalqalah, Ghunnah, Lam Rules

import { QuizQuestion } from '../../../../types/quran';

// ============ الإِظْهَارُ - IZHAR (Clear Pronunciation) ============
const IZHAR_QUESTIONS: QuizQuestion[] = [
  {
    id: 'izhar_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا مَعْنَى الإِظْهَارِ؟\nWhat does Izhar mean?',
    questionArabic: 'مَا مَعْنَى الإِظْهَارِ؟',
    options: [
      'إِظْهَارُ النُّونِ بِوُضُوحٍ - Clear pronunciation of Noon',
      'إِخْفَاءُ النُّونِ - Hiding the Noon',
      'قَلْبُ النُّونِ مِيمًا - Converting Noon to Meem',
      'إِدْغَامُ النُّونِ - Merging the Noon'
    ],
    correctAnswer: 'إِظْهَارُ النُّونِ بِوُضُوحٍ - Clear pronunciation of Noon',
    explanation: 'الإِظْهَارُ يَعْنِي إِخْرَاجَ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ وَاضِحَةً بِدُونِ غُنَّةٍ عِنْدَ حُرُوفِ الحَلْقِ السِّتَّةِ.\nIzhar means pronouncing the Noon Sakinah or Tanween clearly without nasalization before the 6 throat letters.',
  },
  {
    id: 'izhar_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ حُرُوفِ الإِظْهَارِ (حُرُوفُ الحَلْقِ)؟\nHow many Izhar (throat) letters are there?',
    questionArabic: 'كَمْ عَدَدُ حُرُوفِ الإِظْهَارِ؟',
    options: [
      '٦ حُرُوفٍ - 6 letters',
      '٤ حُرُوفٍ - 4 letters',
      '١٥ حَرْفًا - 15 letters',
      '١٤ حَرْفًا - 14 letters'
    ],
    correctAnswer: '٦ حُرُوفٍ - 6 letters',
    explanation: 'حُرُوفُ الإِظْهَارِ سِتَّةٌ وَهِيَ: ء هـ ع ح غ خ - وَتُسَمَّى حُرُوفَ الحَلْقِ.\nThe 6 Izhar letters are: ء هـ ع ح غ خ (Hamza, Ha, Ayn, Haa, Ghayn, Kha) - called throat letters.',
  },
  {
    id: 'izhar_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ حُرُوفُ الإِظْهَارِ الحَلْقِيِّ؟\nWhat are the throat letters of Izhar?',
    questionArabic: 'مَا هِيَ حُرُوفُ الإِظْهَارِ الحَلْقِيِّ؟',
    options: [
      'ء هـ ع ح غ خ - Throat letters (Izhar)',
      'ي ن م و ل ر - Idgham letters',
      'ق ط ب ج د - Qalqalah letters',
      'ت ث ج د ذ - Other letters'
    ],
    correctAnswer: 'ء هـ ع ح غ خ - Throat letters (Izhar)',
    explanation: 'حُرُوفُ الإِظْهَارِ هِيَ: الهَمْزَةُ (ء)، الهَاءُ (هـ)، العَيْنُ (ع)، الحَاءُ (ح)، الغَيْنُ (غ)، الخَاءُ (خ).\nThe Izhar letters are: Hamza, Ha, Ayn, Haa, Ghayn, Kha - all from the throat.',
  },
  {
    id: 'izhar_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي كَلِمَةِ "أَنْعَمْتَ"، مَا الحُكْمُ التَّجْوِيدِيُّ؟\nIn the word "أَنْعَمْتَ" (an\'amta), what is the Tajweed rule?',
    questionArabic: 'مَا الحُكْمُ فِي "أَنْعَمْتَ"؟',
    options: [
      'إِظْهَارٌ - Izhar (Noon before Ayn)',
      'إِخْفَاءٌ - Ikhfa',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِظْهَارٌ - Izhar (Noon before Ayn)',
    explanation: 'النُّونُ السَّاكِنَةُ قَبْلَ العَيْنِ (ع) وَهِيَ مِنْ حُرُوفِ الحَلْقِ، فَيَكُونُ الحُكْمُ إِظْهَارًا.\nThe Noon Sakinah before Ayn (ع) requires Izhar - clear pronunciation without nasalization.',
  },
  {
    id: 'izhar_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "مِنْ خَوْفٍ" مِنْ سُورَةِ قُرَيْشٍ، مَا الحُكْمُ؟\nIn "مِنْ خَوْفٍ" (min khawf) from Surah Quraysh, what rule applies?',
    questionArabic: 'مَا الحُكْمُ فِي "مِنْ خَوْفٍ"؟',
    options: [
      'إِظْهَارٌ حَلْقِيٌّ - Izhar (Noon before Kha خ)',
      'إِخْفَاءٌ - Ikhfa',
      'إِقْلَابٌ - Iqlab',
      'إِدْغَامٌ - Idgham'
    ],
    correctAnswer: 'إِظْهَارٌ حَلْقِيٌّ - Izhar (Noon before Kha خ)',
    explanation: 'الخَاءُ (خ) مِنْ حُرُوفِ الحَلْقِ السِّتَّةِ، فَالنُّونُ السَّاكِنَةُ تُظْهَرُ بِوُضُوحٍ قَبْلَهَا.\nKha (خ) is one of the 6 throat letters, so Noon is pronounced clearly before it.',
  },
];

// ============ الإِخْفَاءُ - IKHFA (Hiding) ============
const IKHFA_QUESTIONS: QuizQuestion[] = [
  {
    id: 'ikhfa_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا مَعْنَى الإِخْفَاءِ؟\nWhat does Ikhfa mean?',
    questionArabic: 'مَا مَعْنَى الإِخْفَاءِ؟',
    options: [
      'إِخْفَاءُ النُّونِ مَعَ غُنَّةٍ - Hiding Noon with nasalization',
      'إِظْهَارُ النُّونِ - Showing the Noon',
      'حَذْفُ النُّونِ - Removing the Noon',
      'تَشْدِيدُ النُّونِ - Doubling the Noon'
    ],
    correctAnswer: 'إِخْفَاءُ النُّونِ مَعَ غُنَّةٍ - Hiding Noon with nasalization',
    explanation: 'الإِخْفَاءُ هُوَ النُّطْقُ بِالنُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ بِحَالَةٍ بَيْنَ الإِظْهَارِ وَالإِدْغَامِ مَعَ بَقَاءِ الغُنَّةِ.\nIkhfa means pronouncing Noon between clear and merged, with ghunnah (nasalization) for 2 counts.',
  },
  {
    id: 'ikhfa_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ حُرُوفِ الإِخْفَاءِ؟\nHow many Ikhfa letters are there?',
    questionArabic: 'كَمْ عَدَدُ حُرُوفِ الإِخْفَاءِ؟',
    options: [
      '١٥ حَرْفًا - 15 letters',
      '٦ حُرُوفٍ - 6 letters',
      '٤ حُرُوفٍ - 4 letters',
      '١٤ حَرْفًا - 14 letters'
    ],
    correctAnswer: '١٥ حَرْفًا - 15 letters',
    explanation: 'حُرُوفُ الإِخْفَاءِ خَمْسَةَ عَشَرَ حَرْفًا: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.\nThere are 15 Ikhfa letters: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.',
  },
  {
    id: 'ikhfa_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ مِقْدَارُ الغُنَّةِ فِي الإِخْفَاءِ؟\nHow long is the Ghunnah in Ikhfa?',
    questionArabic: 'كَمْ مِقْدَارُ الغُنَّةِ فِي الإِخْفَاءِ؟',
    options: [
      'حَرَكَتَانِ - 2 counts',
      'حَرَكَةٌ وَاحِدَةٌ - 1 count',
      '٤ حَرَكَاتٍ - 4 counts',
      '٦ حَرَكَاتٍ - 6 counts'
    ],
    correctAnswer: 'حَرَكَتَانِ - 2 counts',
    explanation: 'الغُنَّةُ فِي الإِخْفَاءِ مِقْدَارُهَا حَرَكَتَانِ - أَيْ بِمِقْدَارِ فَتْحِ الإِصْبَعِ وَإِغْلَاقِهِ مَرَّتَيْنِ.\nGhunnah in Ikhfa lasts 2 counts - the time to open and close a finger twice.',
  },
  {
    id: 'ikhfa_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "مِنْ شَرِّ" مِنْ سُورَةِ الفَلَقِ، مَا الحُكْمُ؟\nIn "مِنْ شَرِّ" (min sharri) from Al-Falaq, what rule applies?',
    questionArabic: 'مَا الحُكْمُ فِي "مِنْ شَرِّ"؟',
    options: [
      'إِخْفَاءٌ - Ikhfa (Noon before Shin)',
      'إِظْهَارٌ - Izhar',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِخْفَاءٌ - Ikhfa (Noon before Shin)',
    explanation: 'الشِّينُ (ش) مِنْ حُرُوفِ الإِخْفَاءِ، فَتُخْفَى النُّونُ مَعَ غُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nShin (ش) is an Ikhfa letter, so Noon is hidden with ghunnah for 2 counts.',
  },
  {
    id: 'ikhfa_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "إِنَّا أَنْزَلْنَاهُ" (سُورَةُ القَدْرِ)، مَا حُكْمُ النُّونِ فِي "أَنْزَلْنَاهُ"؟\nIn "إِنَّا أَنْزَلْنَاهُ", what is the rule for نز?',
    questionArabic: 'مَا حُكْمُ النُّونِ فِي "أَنْزَلْنَاهُ"؟',
    options: [
      'إِخْفَاءٌ - Ikhfa (Noon before Zayn)',
      'إِظْهَارٌ - Izhar',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِخْفَاءٌ - Ikhfa (Noon before Zayn)',
    explanation: 'الزَّايُ (ز) مِنْ حُرُوفِ الإِخْفَاءِ الخَمْسَةَ عَشَرَ، فَالنُّونُ تُخْفَى مَعَ غُنَّةٍ.\nZayn (ز) is one of the 15 Ikhfa letters, so Noon is hidden with ghunnah.',
  },
];

// ============ الإِقْلَابُ - IQLAB (Conversion) ============
const IQLAB_QUESTIONS: QuizQuestion[] = [
  {
    id: 'iqlab_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا مَعْنَى الإِقْلَابِ؟\nWhat does Iqlab mean?',
    questionArabic: 'مَا مَعْنَى الإِقْلَابِ؟',
    options: [
      'قَلْبُ النُّونِ مِيمًا - Converting Noon to Meem',
      'إِخْفَاءُ النُّونِ - Hiding the Noon',
      'إِظْهَارُ النُّونِ - Showing the Noon',
      'حَذْفُ النُّونِ - Removing the Noon'
    ],
    correctAnswer: 'قَلْبُ النُّونِ مِيمًا - Converting Noon to Meem',
    explanation: 'الإِقْلَابُ هُوَ قَلْبُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ مِيمًا مُخْفَاةً مَعَ الغُنَّةِ عِنْدَ البَاءِ.\nIqlab means converting Noon Sakinah or Tanween to a Meem sound with ghunnah before Ba.',
  },
  {
    id: 'iqlab_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'كَمْ عَدَدُ حُرُوفِ الإِقْلَابِ؟\nHow many letters cause Iqlab?',
    questionArabic: 'كَمْ عَدَدُ حُرُوفِ الإِقْلَابِ؟',
    options: [
      'حَرْفٌ وَاحِدٌ فَقَطْ: البَاءُ (ب) - Only 1 letter: Ba',
      '٦ حُرُوفٍ - 6 letters',
      '١٥ حَرْفًا - 15 letters',
      '٤ حُرُوفٍ - 4 letters'
    ],
    correctAnswer: 'حَرْفٌ وَاحِدٌ فَقَطْ: البَاءُ (ب) - Only 1 letter: Ba',
    explanation: 'الإِقْلَابُ يَكُونُ فَقَطْ عِنْدَ حَرْفِ البَاءِ (ب). وَهُوَ أَسْهَلُ أَحْكَامِ النُّونِ السَّاكِنَةِ لِلْحِفْظِ.\nIqlab occurs only before Ba (ب) - the easiest rule to remember!',
  },
  {
    id: 'iqlab_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'لِمَاذَا تُقْلَبُ النُّونُ مِيمًا قَبْلَ البَاءِ؟\nWhy does Noon convert to Meem before Ba?',
    questionArabic: 'لِمَاذَا تُقْلَبُ النُّونُ مِيمًا قَبْلَ البَاءِ؟',
    options: [
      'لِأَنَّ المِيمَ وَالبَاءَ حَرْفَانِ شَفَوِيَّانِ - Meem and Ba are lip letters',
      'لِأَنَّهَا أَسْهَلُ فِي النُّطْقِ - Easier to pronounce',
      'لِأَنَّ البَاءَ حَرْفٌ حَلْقِيٌّ - Ba is a throat letter',
      'لَا يُوجَدُ سَبَبٌ - No reason'
    ],
    correctAnswer: 'لِأَنَّ المِيمَ وَالبَاءَ حَرْفَانِ شَفَوِيَّانِ - Meem and Ba are lip letters',
    explanation: 'المِيمُ وَالبَاءُ كِلَاهُمَا يُنْطَقَانِ مِنَ الشَّفَتَيْنِ، فَالانْتِقَالُ بَيْنَهُمَا طَبِيعِيٌّ وَسَلِسٌ.\nBoth Meem and Ba are pronounced with the lips, making the transition smooth and natural.',
  },
  {
    id: 'iqlab_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "مِنْ بَيْنِ" (سُورَةُ الطَّارِقِ)، كَيْفَ تُنْطَقُ؟\nHow is "مِنْ بَيْنِ" (min bayni) pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "مِنْ بَيْنِ"؟',
    options: [
      'مِمْبَيْنِ - With Ghunnah (Iqlab)',
      'مِنْ بَيْنِ - With Izhar',
      'مِ بَيْنِ - With Idgham',
      'مِنْبَيْنِ - With Ikhfa'
    ],
    correctAnswer: 'مِمْبَيْنِ - With Ghunnah (Iqlab)',
    explanation: 'تُقْلَبُ النُّونُ مِيمًا: "مِمْبَيْنِ" مَعَ إِخْفَاءِ المِيمِ وَغُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nNoon converts to Meem: pronounced "mim-bayni" with ghunnah for 2 counts.',
  },
  {
    id: 'iqlab_5',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'medium',
    question: 'فِي الإِقْلَابِ، تُطْبَقُ الشَّفَتَانِ تَمَامًا كَالمِيمِ العَادِيَّةِ.\nIn Iqlab, the lips close completely like regular Meem.',
    questionArabic: 'فِي الإِقْلَابِ، تُطْبَقُ الشَّفَتَانِ تَمَامًا؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    correctAnswer: 'خَطَأٌ - False',
    explanation: 'فِي الإِقْلَابِ، تَكُونُ الشَّفَتَانِ مُنْفَرِجَتَيْنِ قَلِيلًا (لَا مُطْبَقَتَيْنِ تَمَامًا) مَعَ الغُنَّةِ.\nIn Iqlab, lips should be slightly apart (not fully closed) while producing ghunnah.',
  },
];

// ============ الإِدْغَامُ - IDGHAM (Merging) ============
const IDGHAM_QUESTIONS: QuizQuestion[] = [
  {
    id: 'idgham_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا مَعْنَى الإِدْغَامِ؟\nWhat does Idgham mean?',
    questionArabic: 'مَا مَعْنَى الإِدْغَامِ؟',
    options: [
      'إِدْخَالُ حَرْفٍ فِي حَرْفٍ - Merging one letter into another',
      'إِظْهَارُ الحَرْفِ - Showing the letter',
      'إِخْفَاءُ الحَرْفِ - Hiding the letter',
      'حَذْفُ الحَرْفِ - Removing the letter'
    ],
    correctAnswer: 'إِدْخَالُ حَرْفٍ فِي حَرْفٍ - Merging one letter into another',
    explanation: 'الإِدْغَامُ هُوَ إِدْخَالُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ فِي الحَرْفِ الَّذِي يَلِيهِ فَيَصِيرَانِ حَرْفًا وَاحِدًا مُشَدَّدًا.\nIdgham means merging Noon into the following letter, making them sound as one doubled letter.',
  },
  {
    id: 'idgham_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِغُنَّةٍ؟\nWhat are the Idgham letters WITH Ghunnah?',
    questionArabic: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِغُنَّةٍ؟',
    options: [
      'ي ن م و (يَنْمُو) - Ya, Noon, Meem, Waw',
      'ل ر - Lam, Ra',
      'ء هـ ع ح غ خ - Throat letters',
      'ق ط ب ج د - Qalqalah letters'
    ],
    correctAnswer: 'ي ن م و (يَنْمُو) - Ya, Noon, Meem, Waw',
    explanation: 'حُرُوفُ الإِدْغَامِ بِغُنَّةٍ أَرْبَعَةٌ مَجْمُوعَةٌ فِي كَلِمَةِ "يَنْمُو": اليَاءُ، النُّونُ، المِيمُ، الوَاوُ.\nIdgham with Ghunnah has 4 letters: ي ن م و (Ya, Noon, Meem, Waw) - remember "YaNMaWu".',
  },
  {
    id: 'idgham_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِلَا غُنَّةٍ؟\nWhat are the Idgham letters WITHOUT Ghunnah?',
    questionArabic: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِلَا غُنَّةٍ؟',
    options: [
      'ل ر (اللَّامُ وَالرَّاءُ) - Lam and Ra',
      'ي ن م و - Ya, Noon, Meem, Waw',
      'ء هـ ع ح - Throat letters',
      'ت ث ج د - Other letters'
    ],
    correctAnswer: 'ل ر (اللَّامُ وَالرَّاءُ) - Lam and Ra',
    explanation: 'حَرْفَا الإِدْغَامِ بِلَا غُنَّةٍ هُمَا: اللَّامُ (ل) وَالرَّاءُ (ر) - يُدْغَمُ فِيهِمَا بِدُونِ أَيِّ غُنَّةٍ.\nIdgham without Ghunnah uses only Lam (ل) and Ra (ر) - complete merging with NO nasalization.',
  },
  {
    id: 'idgham_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'شَرْطٌ مُهِمٌّ: مَتَى يَحْدُثُ الإِدْغَامُ؟\nImportant condition: When does Idgham occur?',
    questionArabic: 'مَتَى يَحْدُثُ الإِدْغَامُ؟',
    options: [
      'فَقَطْ بَيْنَ كَلِمَتَيْنِ مُخْتَلِفَتَيْنِ - Only between two words',
      'فِي نَفْسِ الكَلِمَةِ - In the same word',
      'فِي أَيِّ مَوْضِعٍ - In any position',
      'فِي بِدَايَةِ الآيَةِ فَقَطْ - At start of verse only'
    ],
    correctAnswer: 'فَقَطْ بَيْنَ كَلِمَتَيْنِ مُخْتَلِفَتَيْنِ - Only between two words',
    explanation: 'الإِدْغَامُ يَشْتَرِطُ أَنْ تَكُونَ النُّونُ فِي آخِرِ كَلِمَةٍ وَحَرْفُ الإِدْغَامِ فِي أَوَّلِ الكَلِمَةِ التَّالِيَةِ.\nIdgham ONLY occurs between two different words - never within the same word.',
  },
  {
    id: 'idgham_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "مَنْ يَعْمَلْ" (سُورَةُ الزَّلْزَلَةِ)، كَيْفَ تُنْطَقُ؟\nHow is "مَنْ يَعْمَلْ" pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "مَنْ يَعْمَلْ"؟',
    options: [
      'مَيَّعْمَلْ - Idgham with Ghunnah',
      'مَنْ يَعْمَلْ - Izhar',
      'مَ يَعْمَلْ - Without Noon',
      'مِنْيَعْمَلْ - Ikhfa'
    ],
    correctAnswer: 'مَيَّعْمَلْ - Idgham with Ghunnah',
    explanation: 'تُدْغَمُ النُّونُ فِي اليَاءِ مَعَ الغُنَّةِ، فَتُنْطَقُ: "مَيَّعْمَلْ".\nNoon merges into Ya with ghunnah: sounds like "may-ya\'mal".',
  },
  {
    id: 'idgham_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "مِنْ رَبِّهِمْ" (سُورَةُ البَقَرَةِ)، كَيْفَ تُنْطَقُ؟\nHow is "مِنْ رَبِّهِمْ" pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "مِنْ رَبِّهِمْ"؟',
    options: [
      'مِرَّبِّهِمْ - Idgham without Ghunnah',
      'مِنْ رَبِّهِمْ - Izhar',
      'مِمْ رَبِّهِمْ - Iqlab',
      'مِنْرَبِّهِمْ - Ikhfa'
    ],
    correctAnswer: 'مِرَّبِّهِمْ - Idgham without Ghunnah',
    explanation: 'الرَّاءُ مِنْ حُرُوفِ الإِدْغَامِ بِلَا غُنَّةٍ، فَتَخْتَفِي النُّونُ تَمَامًا: "مِرَّبِّهِمْ".\nRa causes Idgham without Ghunnah - Noon disappears completely: "mir-rabbihim".',
  },
  {
    id: 'idgham_7',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'hard',
    question: 'فِي كَلِمَةِ "دُنْيَا"، يَحْدُثُ إِدْغَامٌ لِأَنَّ النُّونَ قَبْلَ اليَاءِ.\nIn the word "دُنْيَا", Idgham occurs because Noon is before Ya.',
    questionArabic: 'هَلْ يَحْدُثُ إِدْغَامٌ فِي "دُنْيَا"؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    correctAnswer: 'خَطَأٌ - False',
    explanation: 'الإِدْغَامُ يَشْتَرِطُ كَلِمَتَيْنِ! فِي "دُنْيَا" النُّونُ وَاليَاءُ فِي نَفْسِ الكَلِمَةِ، فَيَكُونُ إِظْهَارًا.\nIdgham requires TWO words! Since Noon and Ya are in the same word, this is Izhar (clear).',
  },
];

// ============ أَحْكَامُ المِيمِ السَّاكِنَةِ - MEEM SAKINAH RULES ============
const MEEM_SAKINAH_QUESTIONS: QuizQuestion[] = [
  {
    id: 'meem_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ أَحْكَامِ المِيمِ السَّاكِنَةِ؟\nHow many rules apply to Meem Sakinah?',
    questionArabic: 'كَمْ عَدَدُ أَحْكَامِ المِيمِ السَّاكِنَةِ؟',
    options: [
      '٣ أَحْكَامٍ - 3 rules',
      '٤ أَحْكَامٍ - 4 rules',
      '٦ أَحْكَامٍ - 6 rules',
      'حُكْمَانِ - 2 rules'
    ],
    correctAnswer: '٣ أَحْكَامٍ - 3 rules',
    explanation: 'أَحْكَامُ المِيمِ السَّاكِنَةِ ثَلَاثَةٌ: الإِخْفَاءُ الشَّفَوِيُّ، الإِدْغَامُ الشَّفَوِيُّ، الإِظْهَارُ الشَّفَوِيُّ.\nMeem Sakinah has 3 rules: Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi.',
  },
  {
    id: 'meem_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ الإِخْفَاءُ الشَّفَوِيُّ؟\nWhat is Ikhfa Shafawi (Labial Hiding)?',
    questionArabic: 'مَا هُوَ الإِخْفَاءُ الشَّفَوِيُّ؟',
    options: [
      'إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ مَعَ غُنَّةٍ - Hiding Meem before Ba with Ghunnah',
      'إِدْغَامُ المِيمِ فِي المِيمِ - Merging Meem into Meem',
      'إِظْهَارُ المِيمِ عِنْدَ جَمِيعِ الحُرُوفِ - Showing Meem before all letters',
      'قَلْبُ المِيمِ نُونًا - Converting Meem to Noon'
    ],
    correctAnswer: 'إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ مَعَ غُنَّةٍ - Hiding Meem before Ba with Ghunnah',
    explanation: 'الإِخْفَاءُ الشَّفَوِيُّ: إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ فَقَطْ، مَعَ غُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nIkhfa Shafawi: Hiding Meem before Ba (ب) only, with ghunnah for 2 counts.',
  },
  {
    id: 'meem_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ الإِدْغَامُ الشَّفَوِيُّ؟\nWhat is Idgham Shafawi (Labial Merging)?',
    questionArabic: 'مَا هُوَ الإِدْغَامُ الشَّفَوِيُّ؟',
    options: [
      'إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ أُخْرَى - Merging Meem into another Meem',
      'إِخْفَاءُ المِيمِ عِنْدَ البَاءِ - Hiding Meem before Ba',
      'إِظْهَارُ المِيمِ - Showing Meem clearly',
      'قَلْبُ المِيمِ - Converting Meem'
    ],
    correctAnswer: 'إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ أُخْرَى - Merging Meem into another Meem',
    explanation: 'الإِدْغَامُ الشَّفَوِيُّ: إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ مُتَحَرِّكَةٍ، فَتَصِيرَانِ مِيمًا وَاحِدَةً مُشَدَّدَةً مَعَ غُنَّةٍ.\nIdgham Shafawi: Meem Sakinah merges with another Meem, becoming one doubled Meem with ghunnah.',
  },
  {
    id: 'meem_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "تَرْمِيهِمْ بِحِجَارَةٍ" (سُورَةُ الفِيلِ)، مَا حُكْمُ مْ ب؟\nIn "تَرْمِيهِمْ بِحِجَارَةٍ", what rule applies to مْ ب?',
    questionArabic: 'مَا الحُكْمُ فِي "تَرْمِيهِمْ بِحِجَارَةٍ"؟',
    options: [
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi',
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi',
      'لَا حُكْمَ - No rule'
    ],
    correctAnswer: 'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
    explanation: 'المِيمُ السَّاكِنَةُ قَبْلَ البَاءِ = إِخْفَاءٌ شَفَوِيٌّ، مَعَ إِبْقَاءِ الشَّفَتَيْنِ مُنْفَرِجَتَيْنِ وَالغُنَّةِ.\nMeem Sakinah before Ba = Ikhfa Shafawi, with lips slightly apart and ghunnah.',
  },
  {
    id: 'meem_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "لَهُمْ مَا يَشَاءُونَ"، مَا الحُكْمُ؟\nIn "لَهُمْ مَا يَشَاءُونَ", what rule applies?',
    questionArabic: 'مَا الحُكْمُ فِي "لَهُمْ مَا"؟',
    options: [
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi (Two Meems merge)',
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi (Two Meems merge)',
    explanation: 'المِيمُ السَّاكِنَةُ + المِيمُ المُتَحَرِّكَةُ = إِدْغَامٌ شَفَوِيٌّ: "لَهُمَّا" بِغُنَّةٍ.\nMeem Sakinah + Meem = Idgham Shafawi: sounds like "lahum-maa" with ghunnah.',
  },
  {
    id: 'meem_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الْحَمْدُ لِلَّهِ"، مَا حُكْمُ المِيمِ؟\nIn "الْحَمْدُ" (al-hamdu), what is the rule for Meem?',
    questionArabic: 'مَا حُكْمُ المِيمِ فِي "الْحَمْدُ"؟',
    options: [
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi (Meem before Dal)',
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi',
      'المِيمُ صَامِتَةٌ - Meem is silent'
    ],
    correctAnswer: 'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi (Meem before Dal)',
    explanation: 'الدَّالُ لَيْسَتْ بَاءً وَلَا مِيمًا، فَالمِيمُ السَّاكِنَةُ تُظْهَرُ بِوُضُوحٍ (إِظْهَارٌ شَفَوِيٌّ).\nDal is not Ba or Meem, so Meem Sakinah is pronounced clearly (Izhar Shafawi).',
  },
];

// ============ المُدُودُ - MADD (Elongation) ============
const MADD_QUESTIONS: QuizQuestion[] = [
  {
    id: 'madd_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا هِيَ حُرُوفُ المَدِّ؟\nWhat are the Madd (elongation) letters?',
    questionArabic: 'مَا هِيَ حُرُوفُ المَدِّ؟',
    options: [
      'ا و ي (الأَلِفُ وَالوَاوُ وَاليَاءُ) - Alif, Waw, Ya',
      'ق ط ب ج د - Qalqalah letters',
      'ء هـ ع ح غ خ - Throat letters',
      'ن م - Noon, Meem'
    ],
    correctAnswer: 'ا و ي (الأَلِفُ وَالوَاوُ وَاليَاءُ) - Alif, Waw, Ya',
    explanation: 'حُرُوفُ المَدِّ ثَلَاثَةٌ: الأَلِفُ السَّاكِنَةُ بَعْدَ فَتْحٍ، الوَاوُ السَّاكِنَةُ بَعْدَ ضَمٍّ، اليَاءُ السَّاكِنَةُ بَعْدَ كَسْرٍ.\nThe 3 Madd letters: Alif after Fatha, Waw after Damma, Ya after Kasra.',
  },
  {
    id: 'madd_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ المَدُّ الطَّبِيعِيُّ وَمِقْدَارُهُ؟\nWhat is Madd Tabii and its duration?',
    questionArabic: 'مَا هُوَ المَدُّ الطَّبِيعِيُّ وَمِقْدَارُهُ؟',
    options: [
      'المَدُّ الأَصْلِيُّ - Natural Madd (2 counts)',
      'المَدُّ الوَاجِبُ - Required Madd (4 counts)',
      'المَدُّ اللَّازِمُ - Necessary Madd (6 counts)',
      'لَا مَدَّ - No Madd (1 count)'
    ],
    correctAnswer: 'المَدُّ الأَصْلِيُّ - Natural Madd (2 counts)',
    explanation: 'المَدُّ الطَّبِيعِيُّ (الأَصْلِيُّ) هُوَ المَدُّ الَّذِي لَا يَتَوَقَّفُ عَلَى سَبَبٍ، وَمِقْدَارُهُ حَرَكَتَانِ.\nMadd Tabii (Natural) is the basic elongation, lasting exactly 2 counts.',
  },
  {
    id: 'madd_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'مَا هُوَ المَدُّ الوَاجِبُ المُتَّصِلُ؟\nWhat is Madd Wajib Muttasil?',
    questionArabic: 'مَا هُوَ المَدُّ الوَاجِبُ المُتَّصِلُ؟',
    options: [
      'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ فِي نَفْسِ الكَلِمَةِ - Hamza after Madd in same word (4-5 counts)',
      'هَمْزَةٌ فِي الكَلِمَةِ التَّالِيَةِ - Hamza in the next word',
      'سُكُونٌ بَعْدَ حَرْفِ المَدِّ - Sukoon after Madd letter',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd'
    ],
    correctAnswer: 'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ فِي نَفْسِ الكَلِمَةِ - Hamza after Madd in same word (4-5 counts)',
    explanation: 'المَدُّ الوَاجِبُ المُتَّصِلُ: الهَمْزَةُ بَعْدَ حَرْفِ المَدِّ فِي كَلِمَةٍ وَاحِدَةٍ (مِثْلُ: جَاءَ). مِقْدَارُهُ ٤-٥ حَرَكَاتٍ وُجُوبًا.\nMadd Wajib: Hamza after Madd letter in SAME word. Must elongate 4-5 counts.',
  },
  {
    id: 'madd_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "جَاءَ نَصْرُ اللَّهِ" (سُورَةُ النَّصْرِ)، مَا نَوْعُ المَدِّ فِي "جَاءَ"؟\nIn "جَاءَ" from Surah An-Nasr, what type of Madd?',
    questionArabic: 'مَا نَوْعُ المَدِّ فِي "جَاءَ"؟',
    options: [
      'مَدٌّ وَاجِبٌ مُتَّصِلٌ - Required Connected Madd (4-5 counts)',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd (2 counts)',
      'مَدٌّ لَازِمٌ - Necessary Madd (6 counts)',
      'مَدٌّ جَائِزٌ - Permissible Madd'
    ],
    correctAnswer: 'مَدٌّ وَاجِبٌ مُتَّصِلٌ - Required Connected Madd (4-5 counts)',
    explanation: 'الأَلِفُ قَبْلَ الهَمْزَةِ فِي نَفْسِ الكَلِمَةِ = مَدٌّ وَاجِبٌ مُتَّصِلٌ، يَجِبُ مَدُّهُ ٤-٥ حَرَكَاتٍ.\nAlif before Hamza in same word = Madd Wajib Muttasil, requiring 4-5 counts.',
  },
  {
    id: 'madd_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'مَا هُوَ المَدُّ اللَّازِمُ وَمِقْدَارُهُ؟\nWhat is Madd Lazim and its duration?',
    questionArabic: 'مَا هُوَ المَدُّ اللَّازِمُ وَمِقْدَارُهُ؟',
    options: [
      'سُكُونٌ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ - Sukoon/Shaddah after Madd (6 counts)',
      'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ - Hamza after Madd (4 counts)',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd (2 counts)',
      'مَدٌّ عِنْدَ الوَقْفِ - Madd when stopping'
    ],
    correctAnswer: 'سُكُونٌ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ - Sukoon/Shaddah after Madd (6 counts)',
    explanation: 'المَدُّ اللَّازِمُ: سُكُونٌ أَصْلِيٌّ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ. مِقْدَارُهُ ٦ حَرَكَاتٍ وُجُوبًا (مِثْلُ: الضَّالِّينَ).\nMadd Lazim: Sukoon or Shaddah after Madd letter. Exactly 6 counts (e.g., الضَّالِّينَ).',
  },
  {
    id: 'madd_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "الضَّالِّينَ" (سُورَةُ الفَاتِحَةِ)، مَا نَوْعُ المَدِّ؟\nIn "الضَّالِّينَ" from Al-Fatiha, what type of Madd?',
    questionArabic: 'مَا نَوْعُ المَدِّ فِي "الضَّالِّينَ"؟',
    options: [
      'مَدٌّ لَازِمٌ - Necessary Madd (6 counts)',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd (2 counts)',
      'مَدٌّ وَاجِبٌ - Required Madd (4 counts)',
      'مَدٌّ جَائِزٌ - Permissible Madd'
    ],
    correctAnswer: 'مَدٌّ لَازِمٌ - Necessary Madd (6 counts)',
    explanation: 'الأَلِفُ قَبْلَ اللَّامِ المُشَدَّدَةِ = مَدٌّ لَازِمٌ، يَجِبُ مَدُّهُ ٦ حَرَكَاتٍ بِالضَّبْطِ.\nAlif before Shaddah on Lam = Madd Lazim, must elongate exactly 6 counts.',
  },
  {
    id: 'madd_7',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ المَدُّ العَارِضُ لِلسُّكُونِ؟\nWhat is Madd Arid Lis-Sukoon?',
    questionArabic: 'مَا هُوَ المَدُّ العَارِضُ لِلسُّكُونِ؟',
    options: [
      'مَدٌّ عِنْدَ الوَقْفِ - Madd when stopping (2, 4, or 6 counts)',
      'مَدٌّ دَائِمٌ - Permanent Madd (6 counts)',
      'مَدٌّ قَبْلَ الهَمْزَةِ - Madd before Hamza',
      'لَا مَدَّ - No Madd'
    ],
    correctAnswer: 'مَدٌّ عِنْدَ الوَقْفِ - Madd when stopping (2, 4, or 6 counts)',
    explanation: 'المَدُّ العَارِضُ لِلسُّكُونِ يَحْدُثُ عِنْدَ الوَقْفِ عَلَى كَلِمَةٍ فِيهَا حَرْفُ مَدٍّ قَبْلَ الحَرْفِ الأَخِيرِ. يَجُوزُ مَدُّهُ ٢ أَوْ ٤ أَوْ ٦.\nMadd Arid occurs when stopping on a word with Madd before final letter. Flexible: 2, 4, or 6 counts.',
  },
];

// ============ القَلْقَلَةُ - QALQALAH (Echo/Bounce) ============
const QALQALAH_QUESTIONS: QuizQuestion[] = [
  {
    id: 'qalqalah_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا مَعْنَى القَلْقَلَةِ؟\nWhat does Qalqalah mean?',
    questionArabic: 'مَا مَعْنَى القَلْقَلَةِ؟',
    options: [
      'اضْطِرَابُ الحَرْفِ وَارْتِجَاجُهُ - Echoing/bouncing sound',
      'إِطَالَةُ الحَرْفِ - Elongating the letter',
      'إِخْفَاءُ الحَرْفِ - Hiding the letter',
      'غُنَّةٌ مِنَ الأَنْفِ - Nasalization'
    ],
    correctAnswer: 'اضْطِرَابُ الحَرْفِ وَارْتِجَاجُهُ - Echoing/bouncing sound',
    explanation: 'القَلْقَلَةُ هِيَ اضْطِرَابُ الحَرْفِ عِنْدَ النُّطْقِ بِهِ سَاكِنًا حَتَّى يُسْمَعَ لَهُ نَبْرَةٌ قَوِيَّةٌ.\nQalqalah is a bouncing/echoing sound when pronouncing these letters with sukoon.',
  },
  {
    id: 'qalqalah_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا هِيَ حُرُوفُ القَلْقَلَةِ؟\nWhat are the Qalqalah letters?',
    questionArabic: 'مَا هِيَ حُرُوفُ القَلْقَلَةِ؟',
    options: [
      'ق ط ب ج د (قُطْبُ جَدٍّ) - Qaf, Ta, Ba, Jim, Dal',
      'ا و ي - Alif, Waw, Ya (Madd letters)',
      'ء هـ ع ح غ خ - Throat letters',
      'ي ن م و ل ر - Idgham letters'
    ],
    correctAnswer: 'ق ط ب ج د (قُطْبُ جَدٍّ) - Qaf, Ta, Ba, Jim, Dal',
    explanation: 'حُرُوفُ القَلْقَلَةِ خَمْسَةٌ مَجْمُوعَةٌ فِي "قُطْبُ جَدٍّ": القَافُ، الطَّاءُ، البَاءُ، الجِيمُ، الدَّالُ.\nThe 5 Qalqalah letters: ق ط ب ج د - remember "Qutub Jad" (قُطْبُ جَدٍّ).',
  },
  {
    id: 'qalqalah_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَتَى تَحْدُثُ القَلْقَلَةُ؟\nWhen does Qalqalah occur?',
    questionArabic: 'مَتَى تَحْدُثُ القَلْقَلَةُ؟',
    options: [
      'عِنْدَمَا تَكُونُ هَذِهِ الحُرُوفُ سَاكِنَةً - When letters have sukoon',
      'دَائِمًا - Always',
      'عِنْدَمَا تَكُونُ مُتَحَرِّكَةً - When letters have vowels',
      'فِي بِدَايَةِ الكَلِمَةِ فَقَطْ - Only at word beginning'
    ],
    correctAnswer: 'عِنْدَمَا تَكُونُ هَذِهِ الحُرُوفُ سَاكِنَةً - When letters have sukoon',
    explanation: 'القَلْقَلَةُ تَحْدُثُ فَقَطْ عِنْدَمَا تَكُونُ حُرُوفُ (ق ط ب ج د) سَاكِنَةً، لَا عِنْدَمَا تَكُونُ مُتَحَرِّكَةً.\nQalqalah only occurs when these letters have sukoon, not when they have vowels.',
  },
  {
    id: 'qalqalah_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا الفَرْقُ بَيْنَ القَلْقَلَةِ الصُّغْرَى وَالكُبْرَى؟\nWhat is the difference between Qalqalah Sughra and Kubra?',
    questionArabic: 'مَا الفَرْقُ بَيْنَ القَلْقَلَةِ الصُّغْرَى وَالكُبْرَى؟',
    options: [
      'الصُّغْرَى فِي وَسَطِ الكَلِمَةِ، الكُبْرَى فِي آخِرِهَا - Sughra in middle, Kubra at end',
      'لَا فَرْقَ بَيْنَهُمَا - No difference',
      'الصُّغْرَى أَقْوَى - Sughra is stronger',
      'الكُبْرَى فِي وَسَطِ الكَلِمَةِ - Kubra in middle'
    ],
    correctAnswer: 'الصُّغْرَى فِي وَسَطِ الكَلِمَةِ، الكُبْرَى فِي آخِرِهَا - Sughra in middle, Kubra at end',
    explanation: 'القَلْقَلَةُ الصُّغْرَى: فِي وَسَطِ الكَلِمَةِ (نَبْرَةٌ خَفِيفَةٌ). الكُبْرَى: فِي آخِرِ الكَلِمَةِ أَوْ عِنْدَ الوَقْفِ (نَبْرَةٌ أَقْوَى).\nSughra (minor): middle of word. Kubra (major): end of word or when stopping - stronger echo.',
  },
  {
    id: 'qalqalah_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "اقْرَأْ" (سُورَةُ العَلَقِ)، أَيُّ حَرْفٍ فِيهِ قَلْقَلَةٌ؟\nIn "اقْرَأْ" (iqra), which letter has Qalqalah?',
    questionArabic: 'أَيُّ حَرْفٍ فِيهِ قَلْقَلَةٌ فِي "اقْرَأْ"؟',
    options: [
      'القَافُ (ق) - Qaf (Qalqalah Sughra)',
      'الأَلِفُ (ا) - Alif',
      'الرَّاءُ (ر) - Ra',
      'الهَمْزَةُ (ء) - Hamza'
    ],
    correctAnswer: 'القَافُ (ق) - Qaf (Qalqalah Sughra)',
    explanation: 'القَافُ سَاكِنَةٌ فِي وَسَطِ الكَلِمَةِ، فَتَكُونُ قَلْقَلَةً صُغْرَى (نَبْرَةٌ خَفِيفَةٌ).\nQaf has sukoon in the middle of the word, so it has Qalqalah Sughra (minor echo).',
  },
  {
    id: 'qalqalah_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الْفَلَقِ" عِنْدَ الوَقْفِ، أَيُّ قَلْقَلَةٍ؟\nIn "الْفَلَقِ" when stopping, which Qalqalah?',
    questionArabic: 'أَيُّ قَلْقَلَةٍ فِي "الْفَلَقِ" عِنْدَ الوَقْفِ؟',
    options: [
      'قَلْقَلَةٌ كُبْرَى - Qalqalah Kubra (Qaf at end)',
      'قَلْقَلَةٌ صُغْرَى - Qalqalah Sughra',
      'لَا قَلْقَلَةَ - No Qalqalah',
      'قَلْقَلَةٌ مُتَوَسِّطَةٌ - Medium Qalqalah'
    ],
    correctAnswer: 'قَلْقَلَةٌ كُبْرَى - Qalqalah Kubra (Qaf at end)',
    explanation: 'عِنْدَ الوَقْفِ عَلَى "الفَلَقِ"، القَافُ تَصْبِحُ سَاكِنَةً فِي آخِرِ الكَلِمَةِ = قَلْقَلَةٌ كُبْرَى.\nWhen stopping on "al-falaq", Qaf becomes sukoon at word end = Qalqalah Kubra (major).',
  },
  {
    id: 'qalqalah_7',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'medium',
    question: 'فِي "قُلْ"، حَرْفُ القَافِ فِيهِ قَلْقَلَةٌ لِأَنَّهُ مِنْ حُرُوفِ القَلْقَلَةِ.\nIn "قُلْ", the Qaf has Qalqalah because it is a Qalqalah letter.',
    questionArabic: 'هَلْ فِي القَافِ فِي "قُلْ" قَلْقَلَةٌ؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    correctAnswer: 'خَطَأٌ - False',
    explanation: 'القَافُ فِي "قُلْ" مُتَحَرِّكَةٌ بِالضَّمَّةِ (قُ)، وَالقَلْقَلَةُ تَكُونُ فَقَطْ عِنْدَ السُّكُونِ.\nThe Qaf in "قُلْ" has damma (قُ), not sukoon. Qalqalah only occurs with sukoon.',
  },
];

// ============ الغُنَّةُ - GHUNNAH (Nasalization) ============
const GHUNNAH_QUESTIONS: QuizQuestion[] = [
  {
    id: 'ghunnah_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا هِيَ الغُنَّةُ؟\nWhat is Ghunnah?',
    questionArabic: 'مَا هِيَ الغُنَّةُ؟',
    options: [
      'صَوْتٌ أَغَنُّ يَخْرُجُ مِنَ الأَنْفِ - Nasal sound from nose',
      'صَوْتٌ مِنَ الحَلْقِ - Throat sound',
      'صَوْتٌ مِنَ الشَّفَتَيْنِ - Lip sound',
      'صَوْتٌ مِنَ اللِّسَانِ - Tongue sound'
    ],
    correctAnswer: 'صَوْتٌ أَغَنُّ يَخْرُجُ مِنَ الأَنْفِ - Nasal sound from nose',
    explanation: 'الغُنَّةُ صَوْتٌ لَذِيذٌ يَخْرُجُ مِنَ الخَيْشُومِ (الأَنْفِ)، وَلَيْسَ مِنَ الفَمِ.\nGhunnah is a pleasant nasal humming from the nose (khayshoom), not the mouth.',
  },
  {
    id: 'ghunnah_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ مِقْدَارُ الغُنَّةِ الكَامِلَةِ؟\nHow long is a complete Ghunnah?',
    questionArabic: 'كَمْ مِقْدَارُ الغُنَّةِ الكَامِلَةِ؟',
    options: [
      'حَرَكَتَانِ - 2 counts',
      'حَرَكَةٌ وَاحِدَةٌ - 1 count',
      '٤ حَرَكَاتٍ - 4 counts',
      '٦ حَرَكَاتٍ - 6 counts'
    ],
    correctAnswer: 'حَرَكَتَانِ - 2 counts',
    explanation: 'الغُنَّةُ الكَامِلَةُ مِقْدَارُهَا حَرَكَتَانِ - بِمِقْدَارِ فَتْحِ الإِصْبَعِ وَإِغْلَاقِهِ مَرَّتَيْنِ.\nFull ghunnah lasts 2 counts - the time to open and close a finger twice.',
  },
  {
    id: 'ghunnah_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'أَيُّ الحُرُوفِ فِيهَا غُنَّةٌ؟\nWhich letters have Ghunnah?',
    questionArabic: 'أَيُّ الحُرُوفِ فِيهَا غُنَّةٌ؟',
    options: [
      'النُّونُ (ن) وَالمِيمُ (م) - Noon and Meem only',
      'جَمِيعُ الحُرُوفِ - All letters',
      'حُرُوفُ الحَلْقِ فَقَطْ - Throat letters only',
      'حُرُوفُ القَلْقَلَةِ - Qalqalah letters'
    ],
    correctAnswer: 'النُّونُ (ن) وَالمِيمُ (م) - Noon and Meem only',
    explanation: 'الغُنَّةُ صِفَةٌ لَازِمَةٌ لِلنُّونِ وَالمِيمِ فَقَطْ، وَتُسَمَّيَانِ "حَرْفَا الغُنَّةِ".\nGhunnah is a characteristic of only Noon and Meem - called the "Ghunna letters".',
  },
  {
    id: 'ghunnah_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَتَى تَكُونُ الغُنَّةُ أَقْوَى مَا يُمْكِنُ؟\nWhen is Ghunnah at its strongest?',
    questionArabic: 'مَتَى تَكُونُ الغُنَّةُ أَقْوَى مَا يُمْكِنُ؟',
    options: [
      'فِي النُّونِ وَالمِيمِ المُشَدَّدَتَيْنِ - In doubled Noon and Meem (Shaddah)',
      'فِي النُّونِ السَّاكِنَةِ وَحْدَهَا - In Noon Sakinah alone',
      'فِي أَيِّ نُونٍ - In any Noon',
      'لَا تَكُونُ قَوِيَّةً أَبَدًا - Never strong'
    ],
    correctAnswer: 'فِي النُّونِ وَالمِيمِ المُشَدَّدَتَيْنِ - In doubled Noon and Meem (Shaddah)',
    explanation: 'أَقْوَى غُنَّةٍ تَكُونُ فِي النُّونِ المُشَدَّدَةِ (نّ) وَالمِيمِ المُشَدَّدَةِ (مّ) مِثْلُ: إِنَّ، ثُمَّ.\nStrongest ghunnah is with Mushaddad Noon (نّ) or Meem (مّ), like: إِنَّ, ثُمَّ.',
  },
  {
    id: 'ghunnah_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "إِنَّا أَعْطَيْنَاكَ" (سُورَةُ الكَوْثَرِ)، مَا الحُكْمُ فِي "إِنَّ"؟\nIn "إِنَّا" from Al-Kawthar, what happens?',
    questionArabic: 'مَا الحُكْمُ فِي "إِنَّا"؟',
    options: [
      'غُنَّةٌ عَلَى النُّونِ المُشَدَّدَةِ بِمِقْدَارِ حَرَكَتَيْنِ - Ghunnah on doubled Noon (2 counts)',
      'لَا غُنَّةَ - No Ghunnah',
      'غُنَّةٌ بِمِقْدَارِ ٤ حَرَكَاتٍ - Ghunnah for 4 counts',
      'النُّونُ صَامِتَةٌ - Noon is silent'
    ],
    correctAnswer: 'غُنَّةٌ عَلَى النُّونِ المُشَدَّدَةِ بِمِقْدَارِ حَرَكَتَيْنِ - Ghunnah on doubled Noon (2 counts)',
    explanation: 'النُّونُ المُشَدَّدَةُ (نّ) فِيهَا غُنَّةٌ وَاجِبَةٌ بِمِقْدَارِ حَرَكَتَيْنِ.\nThe Mushaddad Noon (نّ) requires ghunnah for 2 counts.',
  },
  {
    id: 'ghunnah_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي أَيِّ حُكْمٍ لَا تُوجَدُ غُنَّةٌ؟\nIn which rule is there NO Ghunnah?',
    questionArabic: 'فِي أَيِّ حُكْمٍ لَا تُوجَدُ غُنَّةٌ؟',
    options: [
      'الإِدْغَامُ بِلَا غُنَّةٍ (ل ر) - Idgham without Ghunnah (Lam, Ra)',
      'الإِخْفَاءُ - Ikhfa',
      'الإِقْلَابُ - Iqlab',
      'النُّونُ المُشَدَّدَةُ - Mushaddad Noon'
    ],
    correctAnswer: 'الإِدْغَامُ بِلَا غُنَّةٍ (ل ر) - Idgham without Ghunnah (Lam, Ra)',
    explanation: 'الإِدْغَامُ فِي اللَّامِ وَالرَّاءِ يَكُونُ بِدُونِ غُنَّةٍ - تَخْتَفِي النُّونُ تَمَامًا بِلَا أَثَرٍ.\nIdgham into Lam and Ra has NO ghunnah - Noon completely disappears.',
  },
  {
    id: 'ghunnah_7',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'hard',
    question: 'يُمْكِنُ اخْتِبَارُ الغُنَّةِ بِإِمْسَاكِ الأَنْفِ - إِذَا تَوَقَّفَ الصَّوْتُ فَالغُنَّةُ صَحِيحَةٌ.\nYou can test Ghunnah by holding your nose - if sound stops, Ghunnah is correct.',
    questionArabic: 'هَلْ يُمْكِنُ اخْتِبَارُ الغُنَّةِ بِإِمْسَاكِ الأَنْفِ؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    correctAnswer: 'صَحِيحٌ - True',
    explanation: 'نَعَمْ، لِأَنَّ الغُنَّةَ تَخْرُجُ مِنَ الأَنْفِ، فَإِذَا أَمْسَكْتَ أَنْفَكَ يَتَوَقَّفُ الصَّوْتُ.\nYes, because Ghunnah comes from the nose - pinching your nose stops the sound.',
  },
];

// ============ اللَّامُ الشَّمْسِيَّةُ وَالقَمَرِيَّةُ - LAM RULES ============
const LAM_RULES_QUESTIONS: QuizQuestion[] = [
  {
    id: 'lam_1',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ اللَّامُ الشَّمْسِيَّةُ؟\nWhat is Lam Shamsiyyah (Sun Lam)?',
    questionArabic: 'مَا هِيَ اللَّامُ الشَّمْسِيَّةُ؟',
    options: [
      'لَامُ (ال) الَّتِي لَا تُنْطَقُ - The Lam that is NOT pronounced',
      'لَامٌ تُنْطَقُ بِوُضُوحٍ - Lam that is clearly pronounced',
      'أَيُّ لَامٍ - Any Lam',
      'لَامٌ مُشَدَّدَةٌ - Doubled Lam'
    ],
    correctAnswer: 'لَامُ (ال) الَّتِي لَا تُنْطَقُ - The Lam that is NOT pronounced',
    explanation: 'اللَّامُ الشَّمْسِيَّةُ: لَامُ (ال) التَّعْرِيفِ لَا تُنْطَقُ وَيُشَدَّدُ الحَرْفُ الَّذِي بَعْدَهَا.\nLam Shamsiyyah: The "L" in "Al" becomes silent and the next letter is doubled.',
  },
  {
    id: 'lam_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ اللَّامُ القَمَرِيَّةُ؟\nWhat is Lam Qamariyyah (Moon Lam)?',
    questionArabic: 'مَا هِيَ اللَّامُ القَمَرِيَّةُ؟',
    options: [
      'لَامُ (ال) الَّتِي تُنْطَقُ بِوُضُوحٍ - The Lam that IS pronounced',
      'لَامٌ صَامِتَةٌ - Silent Lam',
      'لَامٌ مُشَدَّدَةٌ - Doubled Lam',
      'لَامٌ فِي آخِرِ الكَلِمَةِ - Lam at word end'
    ],
    correctAnswer: 'لَامُ (ال) الَّتِي تُنْطَقُ بِوُضُوحٍ - The Lam that IS pronounced',
    explanation: 'اللَّامُ القَمَرِيَّةُ: لَامُ (ال) التَّعْرِيفِ تُنْطَقُ وَاضِحَةً ظَاهِرَةً.\nLam Qamariyyah: The "L" in "Al" is clearly pronounced.',
  },
  {
    id: 'lam_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ الحُرُوفِ الشَّمْسِيَّةِ؟\nHow many Sun Letters are there?',
    questionArabic: 'كَمْ عَدَدُ الحُرُوفِ الشَّمْسِيَّةِ؟',
    options: [
      '١٤ حَرْفًا - 14 letters',
      '٦ حُرُوفٍ - 6 letters',
      '١٥ حَرْفًا - 15 letters',
      '٢٨ حَرْفًا - 28 letters'
    ],
    correctAnswer: '١٤ حَرْفًا - 14 letters',
    explanation: 'الحُرُوفُ الشَّمْسِيَّةُ ١٤ حَرْفًا: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.\nThere are 14 Sun Letters: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.',
  },
  {
    id: 'lam_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَيْفَ تُنْطَقُ "الشَّمْسُ"؟\nHow is "الشَّمْسُ" (the sun) pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الشَّمْسُ"؟',
    options: [
      'أَشَّمْسُ - Lam silent, Shin doubled (ash-shams)',
      'أَلْشَمْسُ - Lam pronounced (al-shams)',
      'أَ شَمْسُ - No Lam at all',
      'أَلشَمْسُ - No Shaddah'
    ],
    correctAnswer: 'أَشَّمْسُ - Lam silent, Shin doubled (ash-shams)',
    explanation: 'الشِّينُ حَرْفٌ شَمْسِيٌّ، فَاللَّامُ لَا تُنْطَقُ وَالشِّينُ تُشَدَّدُ: "أَشَّمْسُ".\nShin is a Sun Letter, so Lam is silent and Shin is doubled: "ash-shams".',
  },
  {
    id: 'lam_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَيْفَ تُنْطَقُ "الْقَمَرُ"؟\nHow is "الْقَمَرُ" (the moon) pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الْقَمَرُ"؟',
    options: [
      'أَلْقَمَرُ - Lam pronounced (al-qamar)',
      'أَقَّمَرُ - Lam silent',
      'أَ قَمَرُ - No Lam at all',
      'أَلقَمَرُ - No sukoon'
    ],
    correctAnswer: 'أَلْقَمَرُ - Lam pronounced (al-qamar)',
    explanation: 'القَافُ حَرْفٌ قَمَرِيٌّ، فَاللَّامُ تُنْطَقُ وَاضِحَةً: "أَلْقَمَرُ".\nQaf is a Moon Letter, so Lam is clearly pronounced: "al-qamar".',
  },
  {
    id: 'lam_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'لِمَاذَا سُمِّيَتْ "شَمْسِيَّةً"؟\nWhy are they called "Sun" letters?',
    questionArabic: 'لِمَاذَا سُمِّيَتِ الحُرُوفُ الشَّمْسِيَّةُ بِهَذَا الاسْمِ؟',
    options: [
      'لِأَنَّ كَلِمَةَ "الشَّمْسِ" مِثَالٌ عَلَيْهَا - "The Sun" is an example',
      'لِأَنَّهَا سَاطِعَةٌ - Because they are bright',
      'لِأَنَّهَا حَارَّةٌ - Because they are hot',
      'لِأَنَّهَا مِنَ الشَّمْسِ - Because they come from the sun'
    ],
    correctAnswer: 'لِأَنَّ كَلِمَةَ "الشَّمْسِ" مِثَالٌ عَلَيْهَا - "The Sun" is an example',
    explanation: 'سُمِّيَتْ شَمْسِيَّةً لِأَنَّ "الشَّمْسَ" مِثَالٌ وَاضِحٌ - الشِّينُ حَرْفٌ شَمْسِيٌّ وَاللَّامُ لَا تُنْطَقُ.\nCalled "Sun" letters because "الشَّمْسُ" (the sun) demonstrates the rule - Lam is silent.',
  },
  {
    id: 'lam_7',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الرَّحْمَٰنِ"، كَيْفَ تُنْطَقُ؟\nHow is "الرَّحْمَٰنِ" pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الرَّحْمَٰنِ"؟',
    options: [
      'أَرَّحْمَٰنِ - Lam silent (ar-rahmaan)',
      'أَلْرَحْمَٰنِ - Lam pronounced',
      'أَ رَحْمَٰنِ - No Lam',
      'أَلرَحْمَٰنِ - No Shaddah'
    ],
    correctAnswer: 'أَرَّحْمَٰنِ - Lam silent (ar-rahmaan)',
    explanation: 'الرَّاءُ حَرْفٌ شَمْسِيٌّ، فَاللَّامُ صَامِتَةٌ وَالرَّاءُ مُشَدَّدَةٌ: "أَرَّحْمَٰنِ".\nRa is a Sun Letter, so Lam is silent and Ra is doubled: "ar-rahmaan".',
  },
  {
    id: 'lam_8',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الْحَمْدُ"، كَيْفَ تُنْطَقُ؟\nHow is "الْحَمْدُ" pronounced?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الْحَمْدُ"؟',
    options: [
      'أَلْحَمْدُ - Lam pronounced (al-hamd)',
      'أَحَّمْدُ - Lam silent',
      'أَ حَمْدُ - No Lam',
      'أَلحَمْدُ - No sukoon'
    ],
    correctAnswer: 'أَلْحَمْدُ - Lam pronounced (al-hamd)',
    explanation: 'الحَاءُ حَرْفٌ قَمَرِيٌّ، فَاللَّامُ تُنْطَقُ وَاضِحَةً: "أَلْحَمْدُ".\nHa (ح) is a Moon Letter, so Lam is clearly pronounced: "al-hamd".',
  },
];

// ============ Export All Questions ============
export const ALL_TAJWEED_QUESTIONS: QuizQuestion[] = [
  ...IZHAR_QUESTIONS,
  ...IKHFA_QUESTIONS,
  ...IQLAB_QUESTIONS,
  ...IDGHAM_QUESTIONS,
  ...MEEM_SAKINAH_QUESTIONS,
  ...MADD_QUESTIONS,
  ...QALQALAH_QUESTIONS,
  ...GHUNNAH_QUESTIONS,
  ...LAM_RULES_QUESTIONS,
];

// Export individual sets for targeted practice
export const TAJWEED_SETS = {
  izhar: IZHAR_QUESTIONS,
  ikhfa: IKHFA_QUESTIONS,
  iqlab: IQLAB_QUESTIONS,
  idgham: IDGHAM_QUESTIONS,
  meem_sakinah: MEEM_SAKINAH_QUESTIONS,
  madd: MADD_QUESTIONS,
  qalqalah: QALQALAH_QUESTIONS,
  ghunnah: GHUNNAH_QUESTIONS,
  lam_rules: LAM_RULES_QUESTIONS,
};

export const TAJWEED_SET_KEYS = Object.keys(TAJWEED_SETS) as (keyof typeof TAJWEED_SETS)[];

export const TAJWEED_SET_NAMES: Record<string, string> = {
  izhar: 'الإِظْهَارُ - Izhar',
  ikhfa: 'الإِخْفَاءُ - Ikhfa',
  iqlab: 'الإِقْلَابُ - Iqlab',
  idgham: 'الإِدْغَامُ - Idgham',
  meem_sakinah: 'المِيمُ السَّاكِنَةُ - Meem Sakinah',
  madd: 'المُدُودُ - Madd',
  qalqalah: 'القَلْقَلَةُ - Qalqalah',
  ghunnah: 'الغُنَّةُ - Ghunnah',
  lam_rules: 'اللَّامُ الشَّمْسِيَّةُ وَالقَمَرِيَّةُ - Lam Rules',
};

export const TAJWEED_SET_INFO: Record<string, { nameArabic: string; nameEnglish: string; description: string }> = {
  izhar: {
    nameArabic: 'الإِظْهَارُ',
    nameEnglish: 'Izhar (Clear Pronunciation)',
    description: 'النُّونُ السَّاكِنَةُ أَوِ التَّنْوِينُ قَبْلَ حُرُوفِ الحَلْقِ السِّتَّةِ',
  },
  ikhfa: {
    nameArabic: 'الإِخْفَاءُ',
    nameEnglish: 'Ikhfa (Hiding)',
    description: 'إِخْفَاءُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ عِنْدَ ١٥ حَرْفًا',
  },
  iqlab: {
    nameArabic: 'الإِقْلَابُ',
    nameEnglish: 'Iqlab (Conversion)',
    description: 'قَلْبُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ مِيمًا عِنْدَ البَاءِ',
  },
  idgham: {
    nameArabic: 'الإِدْغَامُ',
    nameEnglish: 'Idgham (Merging)',
    description: 'إِدْغَامُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ فِي حُرُوفِ يَرْمَلُونَ',
  },
  meem_sakinah: {
    nameArabic: 'أَحْكَامُ المِيمِ السَّاكِنَةِ',
    nameEnglish: 'Meem Sakinah Rules',
    description: 'الإِخْفَاءُ الشَّفَوِيُّ وَالإِدْغَامُ الشَّفَوِيُّ وَالإِظْهَارُ الشَّفَوِيُّ',
  },
  madd: {
    nameArabic: 'المُدُودُ',
    nameEnglish: 'Madd (Elongation)',
    description: 'المَدُّ الطَّبِيعِيُّ وَالوَاجِبُ وَاللَّازِمُ وَالعَارِضُ',
  },
  qalqalah: {
    nameArabic: 'القَلْقَلَةُ',
    nameEnglish: 'Qalqalah (Echo)',
    description: 'اضْطِرَابُ الحَرْفِ عِنْدَ حُرُوفِ قُطْبُ جَدٍّ',
  },
  ghunnah: {
    nameArabic: 'الغُنَّةُ',
    nameEnglish: 'Ghunnah (Nasalization)',
    description: 'الصَّوْتُ الأَغَنُّ مِنَ الخَيْشُومِ فِي النُّونِ وَالمِيمِ',
  },
  lam_rules: {
    nameArabic: 'اللَّامُ الشَّمْسِيَّةُ وَالقَمَرِيَّةُ',
    nameEnglish: 'Lam Rules (Sun & Moon)',
    description: 'أَحْكَامُ لَامِ التَّعْرِيفِ عِنْدَ الحُرُوفِ الشَّمْسِيَّةِ وَالقَمَرِيَّةِ',
  },
};
