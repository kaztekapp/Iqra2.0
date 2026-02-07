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
    questionFr: 'مَا مَعْنَى الإِظْهَارِ؟\nQue signifie Izhar ?',
    questionArabic: 'مَا مَعْنَى الإِظْهَارِ؟',
    options: [
      'إِظْهَارُ النُّونِ بِوُضُوحٍ - Clear pronunciation of Noon',
      'إِخْفَاءُ النُّونِ - Hiding the Noon',
      'قَلْبُ النُّونِ مِيمًا - Converting Noon to Meem',
      'إِدْغَامُ النُّونِ - Merging the Noon'
    ],
    optionsFr: [
      'إِظْهَارُ النُّونِ بِوُضُوحٍ - Prononciation claire du Noun',
      'إِخْفَاءُ النُّونِ - Cacher le Noun',
      'قَلْبُ النُّونِ مِيمًا - Convertir le Noun en Mim',
      'إِدْغَامُ النُّونِ - Fusionner le Noun'
    ],
    correctAnswer: 'إِظْهَارُ النُّونِ بِوُضُوحٍ - Clear pronunciation of Noon',
    explanation: 'الإِظْهَارُ يَعْنِي إِخْرَاجَ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ وَاضِحَةً بِدُونِ غُنَّةٍ عِنْدَ حُرُوفِ الحَلْقِ السِّتَّةِ.\nIzhar means pronouncing the Noon Sakinah or Tanween clearly without nasalization before the 6 throat letters.',
    explanationFr: 'الإِظْهَارُ يَعْنِي إِخْرَاجَ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ وَاضِحَةً بِدُونِ غُنَّةٍ عِنْدَ حُرُوفِ الحَلْقِ السِّتَّةِ.\nIzhar signifie prononcer le Noun Sakinah ou le Tanween clairement sans nasalisation devant les 6 lettres gutturales.',
  },
  {
    id: 'izhar_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ حُرُوفِ الإِظْهَارِ (حُرُوفُ الحَلْقِ)؟\nHow many Izhar (throat) letters are there?',
    questionFr: 'كَمْ عَدَدُ حُرُوفِ الإِظْهَارِ (حُرُوفُ الحَلْقِ)؟\nCombien y a-t-il de lettres d\'Izhar (lettres gutturales) ?',
    questionArabic: 'كَمْ عَدَدُ حُرُوفِ الإِظْهَارِ؟',
    options: [
      '٦ حُرُوفٍ - 6 letters',
      '٤ حُرُوفٍ - 4 letters',
      '١٥ حَرْفًا - 15 letters',
      '١٤ حَرْفًا - 14 letters'
    ],
    optionsFr: [
      '٦ حُرُوفٍ - 6 lettres',
      '٤ حُرُوفٍ - 4 lettres',
      '١٥ حَرْفًا - 15 lettres',
      '١٤ حَرْفًا - 14 lettres'
    ],
    correctAnswer: '٦ حُرُوفٍ - 6 letters',
    explanation: 'حُرُوفُ الإِظْهَارِ سِتَّةٌ وَهِيَ: ء هـ ع ح غ خ - وَتُسَمَّى حُرُوفَ الحَلْقِ.\nThe 6 Izhar letters are: ء هـ ع ح غ خ (Hamza, Ha, Ayn, Haa, Ghayn, Kha) - called throat letters.',
    explanationFr: 'حُرُوفُ الإِظْهَارِ سِتَّةٌ وَهِيَ: ء هـ ع ح غ خ - وَتُسَمَّى حُرُوفَ الحَلْقِ.\nLes 6 lettres d\'Izhar sont : ء هـ ع ح غ خ (Hamza, Ha, Ayn, Haa, Ghayn, Kha) - appelées lettres gutturales.',
  },
  {
    id: 'izhar_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ حُرُوفُ الإِظْهَارِ الحَلْقِيِّ؟\nWhat are the throat letters of Izhar?',
    questionFr: 'مَا هِيَ حُرُوفُ الإِظْهَارِ الحَلْقِيِّ؟\nQuelles sont les lettres gutturales de l\'Izhar ?',
    questionArabic: 'مَا هِيَ حُرُوفُ الإِظْهَارِ الحَلْقِيِّ؟',
    options: [
      'ء هـ ع ح غ خ - Throat letters (Izhar)',
      'ي ن م و ل ر - Idgham letters',
      'ق ط ب ج د - Qalqalah letters',
      'ت ث ج د ذ - Other letters'
    ],
    optionsFr: [
      'ء هـ ع ح غ خ - Lettres gutturales (Izhar)',
      'ي ن م و ل ر - Lettres d\'Idgham',
      'ق ط ب ج د - Lettres de Qalqalah',
      'ت ث ج د ذ - Autres lettres'
    ],
    correctAnswer: 'ء هـ ع ح غ خ - Throat letters (Izhar)',
    explanation: 'حُرُوفُ الإِظْهَارِ هِيَ: الهَمْزَةُ (ء)، الهَاءُ (هـ)، العَيْنُ (ع)، الحَاءُ (ح)، الغَيْنُ (غ)، الخَاءُ (خ).\nThe Izhar letters are: Hamza, Ha, Ayn, Haa, Ghayn, Kha - all from the throat.',
    explanationFr: 'حُرُوفُ الإِظْهَارِ هِيَ: الهَمْزَةُ (ء)، الهَاءُ (هـ)، العَيْنُ (ع)، الحَاءُ (ح)، الغَيْنُ (غ)، الخَاءُ (خ).\nLes lettres d\'Izhar sont : Hamza, Ha, Ayn, Haa, Ghayn, Kha - toutes proviennent de la gorge.',
  },
  {
    id: 'izhar_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي كَلِمَةِ "أَنْعَمْتَ"، مَا الحُكْمُ التَّجْوِيدِيُّ؟\nIn the word "أَنْعَمْتَ" (an\'amta), what is the Tajweed rule?',
    questionFr: 'فِي كَلِمَةِ "أَنْعَمْتَ"، مَا الحُكْمُ التَّجْوِيدِيُّ؟\nDans le mot "أَنْعَمْتَ" (an\'amta), quelle est la regle de Tajweed ?',
    questionArabic: 'مَا الحُكْمُ فِي "أَنْعَمْتَ"؟',
    options: [
      'إِظْهَارٌ - Izhar (Noon before Ayn)',
      'إِخْفَاءٌ - Ikhfa',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    optionsFr: [
      'إِظْهَارٌ - Izhar (Noun avant Ayn)',
      'إِخْفَاءٌ - Ikhfa',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِظْهَارٌ - Izhar (Noon before Ayn)',
    explanation: 'النُّونُ السَّاكِنَةُ قَبْلَ العَيْنِ (ع) وَهِيَ مِنْ حُرُوفِ الحَلْقِ، فَيَكُونُ الحُكْمُ إِظْهَارًا.\nThe Noon Sakinah before Ayn (ع) requires Izhar - clear pronunciation without nasalization.',
    explanationFr: 'النُّونُ السَّاكِنَةُ قَبْلَ العَيْنِ (ع) وَهِيَ مِنْ حُرُوفِ الحَلْقِ، فَيَكُونُ الحُكْمُ إِظْهَارًا.\nLe Noun Sakinah avant Ayn (ع) necessite l\'Izhar - prononciation claire sans nasalisation.',
  },
  {
    id: 'izhar_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "مِنْ خَوْفٍ" مِنْ سُورَةِ قُرَيْشٍ، مَا الحُكْمُ؟\nIn "مِنْ خَوْفٍ" (min khawf) from Surah Quraysh, what rule applies?',
    questionFr: 'فِي "مِنْ خَوْفٍ" مِنْ سُورَةِ قُرَيْشٍ، مَا الحُكْمُ؟\nDans "مِنْ خَوْفٍ" (min khawf) de la sourate Quraysh, quelle regle s\'applique ?',
    questionArabic: 'مَا الحُكْمُ فِي "مِنْ خَوْفٍ"؟',
    options: [
      'إِظْهَارٌ حَلْقِيٌّ - Izhar (Noon before Kha خ)',
      'إِخْفَاءٌ - Ikhfa',
      'إِقْلَابٌ - Iqlab',
      'إِدْغَامٌ - Idgham'
    ],
    optionsFr: [
      'إِظْهَارٌ حَلْقِيٌّ - Izhar (Noun avant Kha خ)',
      'إِخْفَاءٌ - Ikhfa',
      'إِقْلَابٌ - Iqlab',
      'إِدْغَامٌ - Idgham'
    ],
    correctAnswer: 'إِظْهَارٌ حَلْقِيٌّ - Izhar (Noon before Kha خ)',
    explanation: 'الخَاءُ (خ) مِنْ حُرُوفِ الحَلْقِ السِّتَّةِ، فَالنُّونُ السَّاكِنَةُ تُظْهَرُ بِوُضُوحٍ قَبْلَهَا.\nKha (خ) is one of the 6 throat letters, so Noon is pronounced clearly before it.',
    explanationFr: 'الخَاءُ (خ) مِنْ حُرُوفِ الحَلْقِ السِّتَّةِ، فَالنُّونُ السَّاكِنَةُ تُظْهَرُ بِوُضُوحٍ قَبْلَهَا.\nKha (خ) est l\'une des 6 lettres gutturales, donc le Noun est prononce clairement avant elle.',
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
    questionFr: 'مَا مَعْنَى الإِخْفَاءِ؟\nQue signifie Ikhfa ?',
    questionArabic: 'مَا مَعْنَى الإِخْفَاءِ؟',
    options: [
      'إِخْفَاءُ النُّونِ مَعَ غُنَّةٍ - Hiding Noon with nasalization',
      'إِظْهَارُ النُّونِ - Showing the Noon',
      'حَذْفُ النُّونِ - Removing the Noon',
      'تَشْدِيدُ النُّونِ - Doubling the Noon'
    ],
    optionsFr: [
      'إِخْفَاءُ النُّونِ مَعَ غُنَّةٍ - Cacher le Noun avec nasalisation',
      'إِظْهَارُ النُّونِ - Montrer le Noun',
      'حَذْفُ النُّونِ - Supprimer le Noun',
      'تَشْدِيدُ النُّونِ - Doubler le Noun'
    ],
    correctAnswer: 'إِخْفَاءُ النُّونِ مَعَ غُنَّةٍ - Hiding Noon with nasalization',
    explanation: 'الإِخْفَاءُ هُوَ النُّطْقُ بِالنُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ بِحَالَةٍ بَيْنَ الإِظْهَارِ وَالإِدْغَامِ مَعَ بَقَاءِ الغُنَّةِ.\nIkhfa means pronouncing Noon between clear and merged, with ghunnah (nasalization) for 2 counts.',
    explanationFr: 'الإِخْفَاءُ هُوَ النُّطْقُ بِالنُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ بِحَالَةٍ بَيْنَ الإِظْهَارِ وَالإِدْغَامِ مَعَ بَقَاءِ الغُنَّةِ.\nIkhfa signifie prononcer le Noun entre clair et fusionne, avec ghunnah (nasalisation) pendant 2 temps.',
  },
  {
    id: 'ikhfa_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ حُرُوفِ الإِخْفَاءِ؟\nHow many Ikhfa letters are there?',
    questionFr: 'كَمْ عَدَدُ حُرُوفِ الإِخْفَاءِ؟\nCombien y a-t-il de lettres d\'Ikhfa ?',
    questionArabic: 'كَمْ عَدَدُ حُرُوفِ الإِخْفَاءِ؟',
    options: [
      '١٥ حَرْفًا - 15 letters',
      '٦ حُرُوفٍ - 6 letters',
      '٤ حُرُوفٍ - 4 letters',
      '١٤ حَرْفًا - 14 letters'
    ],
    optionsFr: [
      '١٥ حَرْفًا - 15 lettres',
      '٦ حُرُوفٍ - 6 lettres',
      '٤ حُرُوفٍ - 4 lettres',
      '١٤ حَرْفًا - 14 lettres'
    ],
    correctAnswer: '١٥ حَرْفًا - 15 letters',
    explanation: 'حُرُوفُ الإِخْفَاءِ خَمْسَةَ عَشَرَ حَرْفًا: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.\nThere are 15 Ikhfa letters: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.',
    explanationFr: 'حُرُوفُ الإِخْفَاءِ خَمْسَةَ عَشَرَ حَرْفًا: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.\nIl y a 15 lettres d\'Ikhfa : ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك.',
  },
  {
    id: 'ikhfa_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ مِقْدَارُ الغُنَّةِ فِي الإِخْفَاءِ؟\nHow long is the Ghunnah in Ikhfa?',
    questionFr: 'كَمْ مِقْدَارُ الغُنَّةِ فِي الإِخْفَاءِ؟\nQuelle est la duree de la Ghunnah dans l\'Ikhfa ?',
    questionArabic: 'كَمْ مِقْدَارُ الغُنَّةِ فِي الإِخْفَاءِ؟',
    options: [
      'حَرَكَتَانِ - 2 counts',
      'حَرَكَةٌ وَاحِدَةٌ - 1 count',
      '٤ حَرَكَاتٍ - 4 counts',
      '٦ حَرَكَاتٍ - 6 counts'
    ],
    optionsFr: [
      'حَرَكَتَانِ - 2 temps',
      'حَرَكَةٌ وَاحِدَةٌ - 1 temps',
      '٤ حَرَكَاتٍ - 4 temps',
      '٦ حَرَكَاتٍ - 6 temps'
    ],
    correctAnswer: 'حَرَكَتَانِ - 2 counts',
    explanation: 'الغُنَّةُ فِي الإِخْفَاءِ مِقْدَارُهَا حَرَكَتَانِ - أَيْ بِمِقْدَارِ فَتْحِ الإِصْبَعِ وَإِغْلَاقِهِ مَرَّتَيْنِ.\nGhunnah in Ikhfa lasts 2 counts - the time to open and close a finger twice.',
    explanationFr: 'الغُنَّةُ فِي الإِخْفَاءِ مِقْدَارُهَا حَرَكَتَانِ - أَيْ بِمِقْدَارِ فَتْحِ الإِصْبَعِ وَإِغْلَاقِهِ مَرَّتَيْنِ.\nLa Ghunnah dans l\'Ikhfa dure 2 temps - le temps d\'ouvrir et fermer un doigt deux fois.',
  },
  {
    id: 'ikhfa_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "مِنْ شَرِّ" مِنْ سُورَةِ الفَلَقِ، مَا الحُكْمُ؟\nIn "مِنْ شَرِّ" (min sharri) from Al-Falaq, what rule applies?',
    questionFr: 'فِي "مِنْ شَرِّ" مِنْ سُورَةِ الفَلَقِ، مَا الحُكْمُ؟\nDans "مِنْ شَرِّ" (min sharri) de la sourate Al-Falaq, quelle regle s\'applique ?',
    questionArabic: 'مَا الحُكْمُ فِي "مِنْ شَرِّ"؟',
    options: [
      'إِخْفَاءٌ - Ikhfa (Noon before Shin)',
      'إِظْهَارٌ - Izhar',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    optionsFr: [
      'إِخْفَاءٌ - Ikhfa (Noun avant Shin)',
      'إِظْهَارٌ - Izhar',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِخْفَاءٌ - Ikhfa (Noon before Shin)',
    explanation: 'الشِّينُ (ش) مِنْ حُرُوفِ الإِخْفَاءِ، فَتُخْفَى النُّونُ مَعَ غُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nShin (ش) is an Ikhfa letter, so Noon is hidden with ghunnah for 2 counts.',
    explanationFr: 'الشِّينُ (ش) مِنْ حُرُوفِ الإِخْفَاءِ، فَتُخْفَى النُّونُ مَعَ غُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nShin (ش) est une lettre d\'Ikhfa, donc le Noun est cache avec ghunnah pendant 2 temps.',
  },
  {
    id: 'ikhfa_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "إِنَّا أَنْزَلْنَاهُ" (سُورَةُ القَدْرِ)، مَا حُكْمُ النُّونِ فِي "أَنْزَلْنَاهُ"؟\nIn "إِنَّا أَنْزَلْنَاهُ", what is the rule for نز?',
    questionFr: 'فِي "إِنَّا أَنْزَلْنَاهُ" (سُورَةُ القَدْرِ)، مَا حُكْمُ النُّونِ فِي "أَنْزَلْنَاهُ"؟\nDans "إِنَّا أَنْزَلْنَاهُ", quelle est la regle pour نز ?',
    questionArabic: 'مَا حُكْمُ النُّونِ فِي "أَنْزَلْنَاهُ"؟',
    options: [
      'إِخْفَاءٌ - Ikhfa (Noon before Zayn)',
      'إِظْهَارٌ - Izhar',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    optionsFr: [
      'إِخْفَاءٌ - Ikhfa (Noun avant Zayn)',
      'إِظْهَارٌ - Izhar',
      'إِدْغَامٌ - Idgham',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِخْفَاءٌ - Ikhfa (Noon before Zayn)',
    explanation: 'الزَّايُ (ز) مِنْ حُرُوفِ الإِخْفَاءِ الخَمْسَةَ عَشَرَ، فَالنُّونُ تُخْفَى مَعَ غُنَّةٍ.\nZayn (ز) is one of the 15 Ikhfa letters, so Noon is hidden with ghunnah.',
    explanationFr: 'الزَّايُ (ز) مِنْ حُرُوفِ الإِخْفَاءِ الخَمْسَةَ عَشَرَ، فَالنُّونُ تُخْفَى مَعَ غُنَّةٍ.\nZayn (ز) est l\'une des 15 lettres d\'Ikhfa, donc le Noun est cache avec ghunnah.',
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
    questionFr: 'مَا مَعْنَى الإِقْلَابِ؟\nQue signifie Iqlab ?',
    questionArabic: 'مَا مَعْنَى الإِقْلَابِ؟',
    options: [
      'قَلْبُ النُّونِ مِيمًا - Converting Noon to Meem',
      'إِخْفَاءُ النُّونِ - Hiding the Noon',
      'إِظْهَارُ النُّونِ - Showing the Noon',
      'حَذْفُ النُّونِ - Removing the Noon'
    ],
    optionsFr: [
      'قَلْبُ النُّونِ مِيمًا - Convertir le Noun en Mim',
      'إِخْفَاءُ النُّونِ - Cacher le Noun',
      'إِظْهَارُ النُّونِ - Montrer le Noun',
      'حَذْفُ النُّونِ - Supprimer le Noun'
    ],
    correctAnswer: 'قَلْبُ النُّونِ مِيمًا - Converting Noon to Meem',
    explanation: 'الإِقْلَابُ هُوَ قَلْبُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ مِيمًا مُخْفَاةً مَعَ الغُنَّةِ عِنْدَ البَاءِ.\nIqlab means converting Noon Sakinah or Tanween to a Meem sound with ghunnah before Ba.',
    explanationFr: 'الإِقْلَابُ هُوَ قَلْبُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ مِيمًا مُخْفَاةً مَعَ الغُنَّةِ عِنْدَ البَاءِ.\nIqlab signifie convertir le Noun Sakinah ou le Tanween en un son Mim avec ghunnah avant Ba.',
  },
  {
    id: 'iqlab_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'كَمْ عَدَدُ حُرُوفِ الإِقْلَابِ؟\nHow many letters cause Iqlab?',
    questionFr: 'كَمْ عَدَدُ حُرُوفِ الإِقْلَابِ؟\nCombien de lettres causent l\'Iqlab ?',
    questionArabic: 'كَمْ عَدَدُ حُرُوفِ الإِقْلَابِ؟',
    options: [
      'حَرْفٌ وَاحِدٌ فَقَطْ: البَاءُ (ب) - Only 1 letter: Ba',
      '٦ حُرُوفٍ - 6 letters',
      '١٥ حَرْفًا - 15 letters',
      '٤ حُرُوفٍ - 4 letters'
    ],
    optionsFr: [
      'حَرْفٌ وَاحِدٌ فَقَطْ: البَاءُ (ب) - Seulement 1 lettre : Ba',
      '٦ حُرُوفٍ - 6 lettres',
      '١٥ حَرْفًا - 15 lettres',
      '٤ حُرُوفٍ - 4 lettres'
    ],
    correctAnswer: 'حَرْفٌ وَاحِدٌ فَقَطْ: البَاءُ (ب) - Only 1 letter: Ba',
    explanation: 'الإِقْلَابُ يَكُونُ فَقَطْ عِنْدَ حَرْفِ البَاءِ (ب). وَهُوَ أَسْهَلُ أَحْكَامِ النُّونِ السَّاكِنَةِ لِلْحِفْظِ.\nIqlab occurs only before Ba (ب) - the easiest rule to remember!',
    explanationFr: 'الإِقْلَابُ يَكُونُ فَقَطْ عِنْدَ حَرْفِ البَاءِ (ب). وَهُوَ أَسْهَلُ أَحْكَامِ النُّونِ السَّاكِنَةِ لِلْحِفْظِ.\nL\'Iqlab se produit uniquement avant Ba (ب) - la regle la plus facile a retenir !',
  },
  {
    id: 'iqlab_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'لِمَاذَا تُقْلَبُ النُّونُ مِيمًا قَبْلَ البَاءِ؟\nWhy does Noon convert to Meem before Ba?',
    questionFr: 'لِمَاذَا تُقْلَبُ النُّونُ مِيمًا قَبْلَ البَاءِ؟\nPourquoi le Noun se convertit-il en Mim avant Ba ?',
    questionArabic: 'لِمَاذَا تُقْلَبُ النُّونُ مِيمًا قَبْلَ البَاءِ؟',
    options: [
      'لِأَنَّ المِيمَ وَالبَاءَ حَرْفَانِ شَفَوِيَّانِ - Meem and Ba are lip letters',
      'لِأَنَّهَا أَسْهَلُ فِي النُّطْقِ - Easier to pronounce',
      'لِأَنَّ البَاءَ حَرْفٌ حَلْقِيٌّ - Ba is a throat letter',
      'لَا يُوجَدُ سَبَبٌ - No reason'
    ],
    optionsFr: [
      'لِأَنَّ المِيمَ وَالبَاءَ حَرْفَانِ شَفَوِيَّانِ - Mim et Ba sont des lettres labiales',
      'لِأَنَّهَا أَسْهَلُ فِي النُّطْقِ - Plus facile a prononcer',
      'لِأَنَّ البَاءَ حَرْفٌ حَلْقِيٌّ - Ba est une lettre gutturale',
      'لَا يُوجَدُ سَبَبٌ - Pas de raison'
    ],
    correctAnswer: 'لِأَنَّ المِيمَ وَالبَاءَ حَرْفَانِ شَفَوِيَّانِ - Meem and Ba are lip letters',
    explanation: 'المِيمُ وَالبَاءُ كِلَاهُمَا يُنْطَقَانِ مِنَ الشَّفَتَيْنِ، فَالانْتِقَالُ بَيْنَهُمَا طَبِيعِيٌّ وَسَلِسٌ.\nBoth Meem and Ba are pronounced with the lips, making the transition smooth and natural.',
    explanationFr: 'المِيمُ وَالبَاءُ كِلَاهُمَا يُنْطَقَانِ مِنَ الشَّفَتَيْنِ، فَالانْتِقَالُ بَيْنَهُمَا طَبِيعِيٌّ وَسَلِسٌ.\nMim et Ba sont tous deux prononces avec les levres, ce qui rend la transition fluide et naturelle.',
  },
  {
    id: 'iqlab_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "مِنْ بَيْنِ" (سُورَةُ الطَّارِقِ)، كَيْفَ تُنْطَقُ؟\nHow is "مِنْ بَيْنِ" (min bayni) pronounced?',
    questionFr: 'فِي "مِنْ بَيْنِ" (سُورَةُ الطَّارِقِ)، كَيْفَ تُنْطَقُ؟\nComment se prononce "مِنْ بَيْنِ" (min bayni) ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "مِنْ بَيْنِ"؟',
    options: [
      'مِمْبَيْنِ - With Ghunnah (Iqlab)',
      'مِنْ بَيْنِ - With Izhar',
      'مِ بَيْنِ - With Idgham',
      'مِنْبَيْنِ - With Ikhfa'
    ],
    optionsFr: [
      'مِمْبَيْنِ - Avec Ghunnah (Iqlab)',
      'مِنْ بَيْنِ - Avec Izhar',
      'مِ بَيْنِ - Avec Idgham',
      'مِنْبَيْنِ - Avec Ikhfa'
    ],
    correctAnswer: 'مِمْبَيْنِ - With Ghunnah (Iqlab)',
    explanation: 'تُقْلَبُ النُّونُ مِيمًا: "مِمْبَيْنِ" مَعَ إِخْفَاءِ المِيمِ وَغُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nNoon converts to Meem: pronounced "mim-bayni" with ghunnah for 2 counts.',
    explanationFr: 'تُقْلَبُ النُّونُ مِيمًا: "مِمْبَيْنِ" مَعَ إِخْفَاءِ المِيمِ وَغُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nLe Noun se convertit en Mim : prononce "mim-bayni" avec ghunnah pendant 2 temps.',
  },
  {
    id: 'iqlab_5',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'medium',
    question: 'فِي الإِقْلَابِ، تُطْبَقُ الشَّفَتَانِ تَمَامًا كَالمِيمِ العَادِيَّةِ.\nIn Iqlab, the lips close completely like regular Meem.',
    questionFr: 'فِي الإِقْلَابِ، تُطْبَقُ الشَّفَتَانِ تَمَامًا كَالمِيمِ العَادِيَّةِ.\nDans l\'Iqlab, les levres se ferment completement comme un Mim normal.',
    questionArabic: 'فِي الإِقْلَابِ، تُطْبَقُ الشَّفَتَانِ تَمَامًا؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    optionsFr: ['صَحِيحٌ - Vrai', 'خَطَأٌ - Faux'],
    correctAnswer: 'خَطَأٌ - False',
    explanation: 'فِي الإِقْلَابِ، تَكُونُ الشَّفَتَانِ مُنْفَرِجَتَيْنِ قَلِيلًا (لَا مُطْبَقَتَيْنِ تَمَامًا) مَعَ الغُنَّةِ.\nIn Iqlab, lips should be slightly apart (not fully closed) while producing ghunnah.',
    explanationFr: 'فِي الإِقْلَابِ، تَكُونُ الشَّفَتَانِ مُنْفَرِجَتَيْنِ قَلِيلًا (لَا مُطْبَقَتَيْنِ تَمَامًا) مَعَ الغُنَّةِ.\nDans l\'Iqlab, les levres doivent etre legerement ecartees (pas completement fermees) tout en produisant la ghunnah.',
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
    questionFr: 'مَا مَعْنَى الإِدْغَامِ؟\nQue signifie Idgham ?',
    questionArabic: 'مَا مَعْنَى الإِدْغَامِ؟',
    options: [
      'إِدْخَالُ حَرْفٍ فِي حَرْفٍ - Merging one letter into another',
      'إِظْهَارُ الحَرْفِ - Showing the letter',
      'إِخْفَاءُ الحَرْفِ - Hiding the letter',
      'حَذْفُ الحَرْفِ - Removing the letter'
    ],
    optionsFr: [
      'إِدْخَالُ حَرْفٍ فِي حَرْفٍ - Fusionner une lettre dans une autre',
      'إِظْهَارُ الحَرْفِ - Montrer la lettre',
      'إِخْفَاءُ الحَرْفِ - Cacher la lettre',
      'حَذْفُ الحَرْفِ - Supprimer la lettre'
    ],
    correctAnswer: 'إِدْخَالُ حَرْفٍ فِي حَرْفٍ - Merging one letter into another',
    explanation: 'الإِدْغَامُ هُوَ إِدْخَالُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ فِي الحَرْفِ الَّذِي يَلِيهِ فَيَصِيرَانِ حَرْفًا وَاحِدًا مُشَدَّدًا.\nIdgham means merging Noon into the following letter, making them sound as one doubled letter.',
    explanationFr: 'الإِدْغَامُ هُوَ إِدْخَالُ النُّونِ السَّاكِنَةِ أَوِ التَّنْوِينِ فِي الحَرْفِ الَّذِي يَلِيهِ فَيَصِيرَانِ حَرْفًا وَاحِدًا مُشَدَّدًا.\nIdgham signifie fusionner le Noun dans la lettre suivante, les faisant sonner comme une seule lettre doublee.',
  },
  {
    id: 'idgham_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِغُنَّةٍ؟\nWhat are the Idgham letters WITH Ghunnah?',
    questionFr: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِغُنَّةٍ؟\nQuelles sont les lettres d\'Idgham AVEC Ghunnah ?',
    questionArabic: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِغُنَّةٍ؟',
    options: [
      'ي ن م و (يَنْمُو) - Ya, Noon, Meem, Waw',
      'ل ر - Lam, Ra',
      'ء هـ ع ح غ خ - Throat letters',
      'ق ط ب ج د - Qalqalah letters'
    ],
    optionsFr: [
      'ي ن م و (يَنْمُو) - Ya, Noun, Mim, Waw',
      'ل ر - Lam, Ra',
      'ء هـ ع ح غ خ - Lettres gutturales',
      'ق ط ب ج د - Lettres de Qalqalah'
    ],
    correctAnswer: 'ي ن م و (يَنْمُو) - Ya, Noon, Meem, Waw',
    explanation: 'حُرُوفُ الإِدْغَامِ بِغُنَّةٍ أَرْبَعَةٌ مَجْمُوعَةٌ فِي كَلِمَةِ "يَنْمُو": اليَاءُ، النُّونُ، المِيمُ، الوَاوُ.\nIdgham with Ghunnah has 4 letters: ي ن م و (Ya, Noon, Meem, Waw) - remember "YaNMaWu".',
    explanationFr: 'حُرُوفُ الإِدْغَامِ بِغُنَّةٍ أَرْبَعَةٌ مَجْمُوعَةٌ فِي كَلِمَةِ "يَنْمُو": اليَاءُ، النُّونُ، المِيمُ، الوَاوُ.\nL\'Idgham avec Ghunnah a 4 lettres : ي ن م و (Ya, Noun, Mim, Waw) - retenez "YaNMaWu".',
  },
  {
    id: 'idgham_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِلَا غُنَّةٍ؟\nWhat are the Idgham letters WITHOUT Ghunnah?',
    questionFr: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِلَا غُنَّةٍ؟\nQuelles sont les lettres d\'Idgham SANS Ghunnah ?',
    questionArabic: 'مَا هِيَ حُرُوفُ الإِدْغَامِ بِلَا غُنَّةٍ؟',
    options: [
      'ل ر (اللَّامُ وَالرَّاءُ) - Lam and Ra',
      'ي ن م و - Ya, Noon, Meem, Waw',
      'ء هـ ع ح - Throat letters',
      'ت ث ج د - Other letters'
    ],
    optionsFr: [
      'ل ر (اللَّامُ وَالرَّاءُ) - Lam et Ra',
      'ي ن م و - Ya, Noun, Mim, Waw',
      'ء هـ ع ح - Lettres gutturales',
      'ت ث ج د - Autres lettres'
    ],
    correctAnswer: 'ل ر (اللَّامُ وَالرَّاءُ) - Lam and Ra',
    explanation: 'حَرْفَا الإِدْغَامِ بِلَا غُنَّةٍ هُمَا: اللَّامُ (ل) وَالرَّاءُ (ر) - يُدْغَمُ فِيهِمَا بِدُونِ أَيِّ غُنَّةٍ.\nIdgham without Ghunnah uses only Lam (ل) and Ra (ر) - complete merging with NO nasalization.',
    explanationFr: 'حَرْفَا الإِدْغَامِ بِلَا غُنَّةٍ هُمَا: اللَّامُ (ل) وَالرَّاءُ (ر) - يُدْغَمُ فِيهِمَا بِدُونِ أَيِّ غُنَّةٍ.\nL\'Idgham sans Ghunnah utilise uniquement Lam (ل) et Ra (ر) - fusion complete SANS nasalisation.',
  },
  {
    id: 'idgham_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'شَرْطٌ مُهِمٌّ: مَتَى يَحْدُثُ الإِدْغَامُ؟\nImportant condition: When does Idgham occur?',
    questionFr: 'شَرْطٌ مُهِمٌّ: مَتَى يَحْدُثُ الإِدْغَامُ؟\nCondition importante : quand l\'Idgham se produit-il ?',
    questionArabic: 'مَتَى يَحْدُثُ الإِدْغَامُ؟',
    options: [
      'فَقَطْ بَيْنَ كَلِمَتَيْنِ مُخْتَلِفَتَيْنِ - Only between two words',
      'فِي نَفْسِ الكَلِمَةِ - In the same word',
      'فِي أَيِّ مَوْضِعٍ - In any position',
      'فِي بِدَايَةِ الآيَةِ فَقَطْ - At start of verse only'
    ],
    optionsFr: [
      'فَقَطْ بَيْنَ كَلِمَتَيْنِ مُخْتَلِفَتَيْنِ - Uniquement entre deux mots',
      'فِي نَفْسِ الكَلِمَةِ - Dans le meme mot',
      'فِي أَيِّ مَوْضِعٍ - Dans n\'importe quelle position',
      'فِي بِدَايَةِ الآيَةِ فَقَطْ - Au debut du verset uniquement'
    ],
    correctAnswer: 'فَقَطْ بَيْنَ كَلِمَتَيْنِ مُخْتَلِفَتَيْنِ - Only between two words',
    explanation: 'الإِدْغَامُ يَشْتَرِطُ أَنْ تَكُونَ النُّونُ فِي آخِرِ كَلِمَةٍ وَحَرْفُ الإِدْغَامِ فِي أَوَّلِ الكَلِمَةِ التَّالِيَةِ.\nIdgham ONLY occurs between two different words - never within the same word.',
    explanationFr: 'الإِدْغَامُ يَشْتَرِطُ أَنْ تَكُونَ النُّونُ فِي آخِرِ كَلِمَةٍ وَحَرْفُ الإِدْغَامِ فِي أَوَّلِ الكَلِمَةِ التَّالِيَةِ.\nL\'Idgham se produit UNIQUEMENT entre deux mots differents - jamais dans le meme mot.',
  },
  {
    id: 'idgham_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "مَنْ يَعْمَلْ" (سُورَةُ الزَّلْزَلَةِ)، كَيْفَ تُنْطَقُ؟\nHow is "مَنْ يَعْمَلْ" pronounced?',
    questionFr: 'فِي "مَنْ يَعْمَلْ" (سُورَةُ الزَّلْزَلَةِ)، كَيْفَ تُنْطَقُ؟\nComment se prononce "مَنْ يَعْمَلْ" ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "مَنْ يَعْمَلْ"؟',
    options: [
      'مَيَّعْمَلْ - Idgham with Ghunnah',
      'مَنْ يَعْمَلْ - Izhar',
      'مَ يَعْمَلْ - Without Noon',
      'مِنْيَعْمَلْ - Ikhfa'
    ],
    optionsFr: [
      'مَيَّعْمَلْ - Idgham avec Ghunnah',
      'مَنْ يَعْمَلْ - Izhar',
      'مَ يَعْمَلْ - Sans Noun',
      'مِنْيَعْمَلْ - Ikhfa'
    ],
    correctAnswer: 'مَيَّعْمَلْ - Idgham with Ghunnah',
    explanation: 'تُدْغَمُ النُّونُ فِي اليَاءِ مَعَ الغُنَّةِ، فَتُنْطَقُ: "مَيَّعْمَلْ".\nNoon merges into Ya with ghunnah: sounds like "may-ya\'mal".',
    explanationFr: 'تُدْغَمُ النُّونُ فِي اليَاءِ مَعَ الغُنَّةِ، فَتُنْطَقُ: "مَيَّعْمَلْ".\nLe Noun fusionne dans le Ya avec ghunnah : se prononce "may-ya\'mal".',
  },
  {
    id: 'idgham_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "مِنْ رَبِّهِمْ" (سُورَةُ البَقَرَةِ)، كَيْفَ تُنْطَقُ؟\nHow is "مِنْ رَبِّهِمْ" pronounced?',
    questionFr: 'فِي "مِنْ رَبِّهِمْ" (سُورَةُ البَقَرَةِ)، كَيْفَ تُنْطَقُ؟\nComment se prononce "مِنْ رَبِّهِمْ" ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "مِنْ رَبِّهِمْ"؟',
    options: [
      'مِرَّبِّهِمْ - Idgham without Ghunnah',
      'مِنْ رَبِّهِمْ - Izhar',
      'مِمْ رَبِّهِمْ - Iqlab',
      'مِنْرَبِّهِمْ - Ikhfa'
    ],
    optionsFr: [
      'مِرَّبِّهِمْ - Idgham sans Ghunnah',
      'مِنْ رَبِّهِمْ - Izhar',
      'مِمْ رَبِّهِمْ - Iqlab',
      'مِنْرَبِّهِمْ - Ikhfa'
    ],
    correctAnswer: 'مِرَّبِّهِمْ - Idgham without Ghunnah',
    explanation: 'الرَّاءُ مِنْ حُرُوفِ الإِدْغَامِ بِلَا غُنَّةٍ، فَتَخْتَفِي النُّونُ تَمَامًا: "مِرَّبِّهِمْ".\nRa causes Idgham without Ghunnah - Noon disappears completely: "mir-rabbihim".',
    explanationFr: 'الرَّاءُ مِنْ حُرُوفِ الإِدْغَامِ بِلَا غُنَّةٍ، فَتَخْتَفِي النُّونُ تَمَامًا: "مِرَّبِّهِمْ".\nRa provoque l\'Idgham sans Ghunnah - le Noun disparait completement : "mir-rabbihim".',
  },
  {
    id: 'idgham_7',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'hard',
    question: 'فِي كَلِمَةِ "دُنْيَا"، يَحْدُثُ إِدْغَامٌ لِأَنَّ النُّونَ قَبْلَ اليَاءِ.\nIn the word "دُنْيَا", Idgham occurs because Noon is before Ya.',
    questionFr: 'فِي كَلِمَةِ "دُنْيَا"، يَحْدُثُ إِدْغَامٌ لِأَنَّ النُّونَ قَبْلَ اليَاءِ.\nDans le mot "دُنْيَا", l\'Idgham se produit car le Noun est avant Ya.',
    questionArabic: 'هَلْ يَحْدُثُ إِدْغَامٌ فِي "دُنْيَا"؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    optionsFr: ['صَحِيحٌ - Vrai', 'خَطَأٌ - Faux'],
    correctAnswer: 'خَطَأٌ - False',
    explanation: 'الإِدْغَامُ يَشْتَرِطُ كَلِمَتَيْنِ! فِي "دُنْيَا" النُّونُ وَاليَاءُ فِي نَفْسِ الكَلِمَةِ، فَيَكُونُ إِظْهَارًا.\nIdgham requires TWO words! Since Noon and Ya are in the same word, this is Izhar (clear).',
    explanationFr: 'الإِدْغَامُ يَشْتَرِطُ كَلِمَتَيْنِ! فِي "دُنْيَا" النُّونُ وَاليَاءُ فِي نَفْسِ الكَلِمَةِ، فَيَكُونُ إِظْهَارًا.\nL\'Idgham necessite DEUX mots ! Dans "دُنْيَا", le Noun et le Ya sont dans le meme mot, c\'est donc un Izhar (clair).',
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
    questionFr: 'كَمْ عَدَدُ أَحْكَامِ المِيمِ السَّاكِنَةِ؟\nCombien de regles s\'appliquent au Mim Sakinah ?',
    questionArabic: 'كَمْ عَدَدُ أَحْكَامِ المِيمِ السَّاكِنَةِ؟',
    options: [
      '٣ أَحْكَامٍ - 3 rules',
      '٤ أَحْكَامٍ - 4 rules',
      '٦ أَحْكَامٍ - 6 rules',
      'حُكْمَانِ - 2 rules'
    ],
    optionsFr: [
      '٣ أَحْكَامٍ - 3 regles',
      '٤ أَحْكَامٍ - 4 regles',
      '٦ أَحْكَامٍ - 6 regles',
      'حُكْمَانِ - 2 regles'
    ],
    correctAnswer: '٣ أَحْكَامٍ - 3 rules',
    explanation: 'أَحْكَامُ المِيمِ السَّاكِنَةِ ثَلَاثَةٌ: الإِخْفَاءُ الشَّفَوِيُّ، الإِدْغَامُ الشَّفَوِيُّ، الإِظْهَارُ الشَّفَوِيُّ.\nMeem Sakinah has 3 rules: Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi.',
    explanationFr: 'أَحْكَامُ المِيمِ السَّاكِنَةِ ثَلَاثَةٌ: الإِخْفَاءُ الشَّفَوِيُّ، الإِدْغَامُ الشَّفَوِيُّ، الإِظْهَارُ الشَّفَوِيُّ.\nLe Mim Sakinah a 3 regles : Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi.',
  },
  {
    id: 'meem_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ الإِخْفَاءُ الشَّفَوِيُّ؟\nWhat is Ikhfa Shafawi (Labial Hiding)?',
    questionFr: 'مَا هُوَ الإِخْفَاءُ الشَّفَوِيُّ؟\nQu\'est-ce que l\'Ikhfa Shafawi (dissimulation labiale) ?',
    questionArabic: 'مَا هُوَ الإِخْفَاءُ الشَّفَوِيُّ؟',
    options: [
      'إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ مَعَ غُنَّةٍ - Hiding Meem before Ba with Ghunnah',
      'إِدْغَامُ المِيمِ فِي المِيمِ - Merging Meem into Meem',
      'إِظْهَارُ المِيمِ عِنْدَ جَمِيعِ الحُرُوفِ - Showing Meem before all letters',
      'قَلْبُ المِيمِ نُونًا - Converting Meem to Noon'
    ],
    optionsFr: [
      'إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ مَعَ غُنَّةٍ - Cacher le Mim avant Ba avec Ghunnah',
      'إِدْغَامُ المِيمِ فِي المِيمِ - Fusionner le Mim dans le Mim',
      'إِظْهَارُ المِيمِ عِنْدَ جَمِيعِ الحُرُوفِ - Montrer le Mim avant toutes les lettres',
      'قَلْبُ المِيمِ نُونًا - Convertir le Mim en Noun'
    ],
    correctAnswer: 'إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ مَعَ غُنَّةٍ - Hiding Meem before Ba with Ghunnah',
    explanation: 'الإِخْفَاءُ الشَّفَوِيُّ: إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ فَقَطْ، مَعَ غُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nIkhfa Shafawi: Hiding Meem before Ba (ب) only, with ghunnah for 2 counts.',
    explanationFr: 'الإِخْفَاءُ الشَّفَوِيُّ: إِخْفَاءُ المِيمِ السَّاكِنَةِ عِنْدَ البَاءِ فَقَطْ، مَعَ غُنَّةٍ بِمِقْدَارِ حَرَكَتَيْنِ.\nIkhfa Shafawi : cacher le Mim avant Ba (ب) uniquement, avec ghunnah pendant 2 temps.',
  },
  {
    id: 'meem_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ الإِدْغَامُ الشَّفَوِيُّ؟\nWhat is Idgham Shafawi (Labial Merging)?',
    questionFr: 'مَا هُوَ الإِدْغَامُ الشَّفَوِيُّ؟\nQu\'est-ce que l\'Idgham Shafawi (fusion labiale) ?',
    questionArabic: 'مَا هُوَ الإِدْغَامُ الشَّفَوِيُّ؟',
    options: [
      'إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ أُخْرَى - Merging Meem into another Meem',
      'إِخْفَاءُ المِيمِ عِنْدَ البَاءِ - Hiding Meem before Ba',
      'إِظْهَارُ المِيمِ - Showing Meem clearly',
      'قَلْبُ المِيمِ - Converting Meem'
    ],
    optionsFr: [
      'إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ أُخْرَى - Fusionner le Mim dans un autre Mim',
      'إِخْفَاءُ المِيمِ عِنْدَ البَاءِ - Cacher le Mim avant Ba',
      'إِظْهَارُ المِيمِ - Montrer le Mim clairement',
      'قَلْبُ المِيمِ - Convertir le Mim'
    ],
    correctAnswer: 'إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ أُخْرَى - Merging Meem into another Meem',
    explanation: 'الإِدْغَامُ الشَّفَوِيُّ: إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ مُتَحَرِّكَةٍ، فَتَصِيرَانِ مِيمًا وَاحِدَةً مُشَدَّدَةً مَعَ غُنَّةٍ.\nIdgham Shafawi: Meem Sakinah merges with another Meem, becoming one doubled Meem with ghunnah.',
    explanationFr: 'الإِدْغَامُ الشَّفَوِيُّ: إِدْغَامُ المِيمِ السَّاكِنَةِ فِي مِيمٍ مُتَحَرِّكَةٍ، فَتَصِيرَانِ مِيمًا وَاحِدَةً مُشَدَّدَةً مَعَ غُنَّةٍ.\nIdgham Shafawi : le Mim Sakinah fusionne avec un autre Mim, devenant un seul Mim double avec ghunnah.',
  },
  {
    id: 'meem_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "تَرْمِيهِمْ بِحِجَارَةٍ" (سُورَةُ الفِيلِ)، مَا حُكْمُ مْ ب؟\nIn "تَرْمِيهِمْ بِحِجَارَةٍ", what rule applies to مْ ب?',
    questionFr: 'فِي "تَرْمِيهِمْ بِحِجَارَةٍ" (سُورَةُ الفِيلِ)، مَا حُكْمُ مْ ب؟\nDans "تَرْمِيهِمْ بِحِجَارَةٍ", quelle regle s\'applique a مْ ب ?',
    questionArabic: 'مَا الحُكْمُ فِي "تَرْمِيهِمْ بِحِجَارَةٍ"؟',
    options: [
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi',
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi',
      'لَا حُكْمَ - No rule'
    ],
    optionsFr: [
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi',
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi',
      'لَا حُكْمَ - Pas de regle'
    ],
    correctAnswer: 'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
    explanation: 'المِيمُ السَّاكِنَةُ قَبْلَ البَاءِ = إِخْفَاءٌ شَفَوِيٌّ، مَعَ إِبْقَاءِ الشَّفَتَيْنِ مُنْفَرِجَتَيْنِ وَالغُنَّةِ.\nMeem Sakinah before Ba = Ikhfa Shafawi, with lips slightly apart and ghunnah.',
    explanationFr: 'المِيمُ السَّاكِنَةُ قَبْلَ البَاءِ = إِخْفَاءٌ شَفَوِيٌّ، مَعَ إِبْقَاءِ الشَّفَتَيْنِ مُنْفَرِجَتَيْنِ وَالغُنَّةِ.\nMim Sakinah avant Ba = Ikhfa Shafawi, avec les levres legerement ecartees et ghunnah.',
  },
  {
    id: 'meem_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "لَهُمْ مَا يَشَاءُونَ"، مَا الحُكْمُ؟\nIn "لَهُمْ مَا يَشَاءُونَ", what rule applies?',
    questionFr: 'فِي "لَهُمْ مَا يَشَاءُونَ"، مَا الحُكْمُ؟\nDans "لَهُمْ مَا يَشَاءُونَ", quelle regle s\'applique ?',
    questionArabic: 'مَا الحُكْمُ فِي "لَهُمْ مَا"؟',
    options: [
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi (Two Meems merge)',
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi',
      'إِقْلَابٌ - Iqlab'
    ],
    optionsFr: [
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi (Deux Mim fusionnent)',
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi',
      'إِقْلَابٌ - Iqlab'
    ],
    correctAnswer: 'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi (Two Meems merge)',
    explanation: 'المِيمُ السَّاكِنَةُ + المِيمُ المُتَحَرِّكَةُ = إِدْغَامٌ شَفَوِيٌّ: "لَهُمَّا" بِغُنَّةٍ.\nMeem Sakinah + Meem = Idgham Shafawi: sounds like "lahum-maa" with ghunnah.',
    explanationFr: 'المِيمُ السَّاكِنَةُ + المِيمُ المُتَحَرِّكَةُ = إِدْغَامٌ شَفَوِيٌّ: "لَهُمَّا" بِغُنَّةٍ.\nMim Sakinah + Mim = Idgham Shafawi : se prononce "lahum-maa" avec ghunnah.',
  },
  {
    id: 'meem_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الْحَمْدُ لِلَّهِ"، مَا حُكْمُ المِيمِ؟\nIn "الْحَمْدُ" (al-hamdu), what is the rule for Meem?',
    questionFr: 'فِي "الْحَمْدُ لِلَّهِ"، مَا حُكْمُ المِيمِ؟\nDans "الْحَمْدُ" (al-hamdu), quelle est la regle pour le Mim ?',
    questionArabic: 'مَا حُكْمُ المِيمِ فِي "الْحَمْدُ"؟',
    options: [
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi (Meem before Dal)',
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi',
      'المِيمُ صَامِتَةٌ - Meem is silent'
    ],
    optionsFr: [
      'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi (Mim avant Dal)',
      'إِخْفَاءٌ شَفَوِيٌّ - Ikhfa Shafawi',
      'إِدْغَامٌ شَفَوِيٌّ - Idgham Shafawi',
      'المِيمُ صَامِتَةٌ - Le Mim est silencieux'
    ],
    correctAnswer: 'إِظْهَارٌ شَفَوِيٌّ - Izhar Shafawi (Meem before Dal)',
    explanation: 'الدَّالُ لَيْسَتْ بَاءً وَلَا مِيمًا، فَالمِيمُ السَّاكِنَةُ تُظْهَرُ بِوُضُوحٍ (إِظْهَارٌ شَفَوِيٌّ).\nDal is not Ba or Meem, so Meem Sakinah is pronounced clearly (Izhar Shafawi).',
    explanationFr: 'الدَّالُ لَيْسَتْ بَاءً وَلَا مِيمًا، فَالمِيمُ السَّاكِنَةُ تُظْهَرُ بِوُضُوحٍ (إِظْهَارٌ شَفَوِيٌّ).\nDal n\'est ni Ba ni Mim, donc le Mim Sakinah est prononce clairement (Izhar Shafawi).',
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
    questionFr: 'مَا هِيَ حُرُوفُ المَدِّ؟\nQuelles sont les lettres de Madd (prolongation) ?',
    questionArabic: 'مَا هِيَ حُرُوفُ المَدِّ؟',
    options: [
      'ا و ي (الأَلِفُ وَالوَاوُ وَاليَاءُ) - Alif, Waw, Ya',
      'ق ط ب ج د - Qalqalah letters',
      'ء هـ ع ح غ خ - Throat letters',
      'ن م - Noon, Meem'
    ],
    optionsFr: [
      'ا و ي (الأَلِفُ وَالوَاوُ وَاليَاءُ) - Alif, Waw, Ya',
      'ق ط ب ج د - Lettres de Qalqalah',
      'ء هـ ع ح غ خ - Lettres gutturales',
      'ن م - Noun, Mim'
    ],
    correctAnswer: 'ا و ي (الأَلِفُ وَالوَاوُ وَاليَاءُ) - Alif, Waw, Ya',
    explanation: 'حُرُوفُ المَدِّ ثَلَاثَةٌ: الأَلِفُ السَّاكِنَةُ بَعْدَ فَتْحٍ، الوَاوُ السَّاكِنَةُ بَعْدَ ضَمٍّ، اليَاءُ السَّاكِنَةُ بَعْدَ كَسْرٍ.\nThe 3 Madd letters: Alif after Fatha, Waw after Damma, Ya after Kasra.',
    explanationFr: 'حُرُوفُ المَدِّ ثَلَاثَةٌ: الأَلِفُ السَّاكِنَةُ بَعْدَ فَتْحٍ، الوَاوُ السَّاكِنَةُ بَعْدَ ضَمٍّ، اليَاءُ السَّاكِنَةُ بَعْدَ كَسْرٍ.\nLes 3 lettres de Madd : Alif apres Fatha, Waw apres Damma, Ya apres Kasra.',
  },
  {
    id: 'madd_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ المَدُّ الطَّبِيعِيُّ وَمِقْدَارُهُ؟\nWhat is Madd Tabii and its duration?',
    questionFr: 'مَا هُوَ المَدُّ الطَّبِيعِيُّ وَمِقْدَارُهُ؟\nQu\'est-ce que le Madd Tabii et quelle est sa duree ?',
    questionArabic: 'مَا هُوَ المَدُّ الطَّبِيعِيُّ وَمِقْدَارُهُ؟',
    options: [
      'المَدُّ الأَصْلِيُّ - Natural Madd (2 counts)',
      'المَدُّ الوَاجِبُ - Required Madd (4 counts)',
      'المَدُّ اللَّازِمُ - Necessary Madd (6 counts)',
      'لَا مَدَّ - No Madd (1 count)'
    ],
    optionsFr: [
      'المَدُّ الأَصْلِيُّ - Madd naturel (2 temps)',
      'المَدُّ الوَاجِبُ - Madd obligatoire (4 temps)',
      'المَدُّ اللَّازِمُ - Madd necessaire (6 temps)',
      'لَا مَدَّ - Pas de Madd (1 temps)'
    ],
    correctAnswer: 'المَدُّ الأَصْلِيُّ - Natural Madd (2 counts)',
    explanation: 'المَدُّ الطَّبِيعِيُّ (الأَصْلِيُّ) هُوَ المَدُّ الَّذِي لَا يَتَوَقَّفُ عَلَى سَبَبٍ، وَمِقْدَارُهُ حَرَكَتَانِ.\nMadd Tabii (Natural) is the basic elongation, lasting exactly 2 counts.',
    explanationFr: 'المَدُّ الطَّبِيعِيُّ (الأَصْلِيُّ) هُوَ المَدُّ الَّذِي لَا يَتَوَقَّفُ عَلَى سَبَبٍ، وَمِقْدَارُهُ حَرَكَتَانِ.\nLe Madd Tabii (naturel) est la prolongation de base, durant exactement 2 temps.',
  },
  {
    id: 'madd_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'مَا هُوَ المَدُّ الوَاجِبُ المُتَّصِلُ؟\nWhat is Madd Wajib Muttasil?',
    questionFr: 'مَا هُوَ المَدُّ الوَاجِبُ المُتَّصِلُ؟\nQu\'est-ce que le Madd Wajib Muttasil ?',
    questionArabic: 'مَا هُوَ المَدُّ الوَاجِبُ المُتَّصِلُ؟',
    options: [
      'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ فِي نَفْسِ الكَلِمَةِ - Hamza after Madd in same word (4-5 counts)',
      'هَمْزَةٌ فِي الكَلِمَةِ التَّالِيَةِ - Hamza in the next word',
      'سُكُونٌ بَعْدَ حَرْفِ المَدِّ - Sukoon after Madd letter',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd'
    ],
    optionsFr: [
      'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ فِي نَفْسِ الكَلِمَةِ - Hamza apres Madd dans le meme mot (4-5 temps)',
      'هَمْزَةٌ فِي الكَلِمَةِ التَّالِيَةِ - Hamza dans le mot suivant',
      'سُكُونٌ بَعْدَ حَرْفِ المَدِّ - Soukoun apres la lettre de Madd',
      'مَدٌّ طَبِيعِيٌّ - Madd naturel'
    ],
    correctAnswer: 'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ فِي نَفْسِ الكَلِمَةِ - Hamza after Madd in same word (4-5 counts)',
    explanation: 'المَدُّ الوَاجِبُ المُتَّصِلُ: الهَمْزَةُ بَعْدَ حَرْفِ المَدِّ فِي كَلِمَةٍ وَاحِدَةٍ (مِثْلُ: جَاءَ). مِقْدَارُهُ ٤-٥ حَرَكَاتٍ وُجُوبًا.\nMadd Wajib: Hamza after Madd letter in SAME word. Must elongate 4-5 counts.',
    explanationFr: 'المَدُّ الوَاجِبُ المُتَّصِلُ: الهَمْزَةُ بَعْدَ حَرْفِ المَدِّ فِي كَلِمَةٍ وَاحِدَةٍ (مِثْلُ: جَاءَ). مِقْدَارُهُ ٤-٥ حَرَكَاتٍ وُجُوبًا.\nMadd Wajib : Hamza apres la lettre de Madd dans le MEME mot. Il faut prolonger 4-5 temps.',
  },
  {
    id: 'madd_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "جَاءَ نَصْرُ اللَّهِ" (سُورَةُ النَّصْرِ)، مَا نَوْعُ المَدِّ فِي "جَاءَ"؟\nIn "جَاءَ" from Surah An-Nasr, what type of Madd?',
    questionFr: 'فِي "جَاءَ نَصْرُ اللَّهِ" (سُورَةُ النَّصْرِ)، مَا نَوْعُ المَدِّ فِي "جَاءَ"؟\nDans "جَاءَ" de la sourate An-Nasr, quel type de Madd ?',
    questionArabic: 'مَا نَوْعُ المَدِّ فِي "جَاءَ"؟',
    options: [
      'مَدٌّ وَاجِبٌ مُتَّصِلٌ - Required Connected Madd (4-5 counts)',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd (2 counts)',
      'مَدٌّ لَازِمٌ - Necessary Madd (6 counts)',
      'مَدٌّ جَائِزٌ - Permissible Madd'
    ],
    optionsFr: [
      'مَدٌّ وَاجِبٌ مُتَّصِلٌ - Madd connecte obligatoire (4-5 temps)',
      'مَدٌّ طَبِيعِيٌّ - Madd naturel (2 temps)',
      'مَدٌّ لَازِمٌ - Madd necessaire (6 temps)',
      'مَدٌّ جَائِزٌ - Madd permis'
    ],
    correctAnswer: 'مَدٌّ وَاجِبٌ مُتَّصِلٌ - Required Connected Madd (4-5 counts)',
    explanation: 'الأَلِفُ قَبْلَ الهَمْزَةِ فِي نَفْسِ الكَلِمَةِ = مَدٌّ وَاجِبٌ مُتَّصِلٌ، يَجِبُ مَدُّهُ ٤-٥ حَرَكَاتٍ.\nAlif before Hamza in same word = Madd Wajib Muttasil, requiring 4-5 counts.',
    explanationFr: 'الأَلِفُ قَبْلَ الهَمْزَةِ فِي نَفْسِ الكَلِمَةِ = مَدٌّ وَاجِبٌ مُتَّصِلٌ، يَجِبُ مَدُّهُ ٤-٥ حَرَكَاتٍ.\nAlif avant Hamza dans le meme mot = Madd Wajib Muttasil, necessitant 4-5 temps.',
  },
  {
    id: 'madd_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'مَا هُوَ المَدُّ اللَّازِمُ وَمِقْدَارُهُ؟\nWhat is Madd Lazim and its duration?',
    questionFr: 'مَا هُوَ المَدُّ اللَّازِمُ وَمِقْدَارُهُ؟\nQu\'est-ce que le Madd Lazim et quelle est sa duree ?',
    questionArabic: 'مَا هُوَ المَدُّ اللَّازِمُ وَمِقْدَارُهُ؟',
    options: [
      'سُكُونٌ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ - Sukoon/Shaddah after Madd (6 counts)',
      'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ - Hamza after Madd (4 counts)',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd (2 counts)',
      'مَدٌّ عِنْدَ الوَقْفِ - Madd when stopping'
    ],
    optionsFr: [
      'سُكُونٌ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ - Soukoun/Shaddah apres Madd (6 temps)',
      'هَمْزَةٌ بَعْدَ حَرْفِ المَدِّ - Hamza apres Madd (4 temps)',
      'مَدٌّ طَبِيعِيٌّ - Madd naturel (2 temps)',
      'مَدٌّ عِنْدَ الوَقْفِ - Madd a l\'arret'
    ],
    correctAnswer: 'سُكُونٌ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ - Sukoon/Shaddah after Madd (6 counts)',
    explanation: 'المَدُّ اللَّازِمُ: سُكُونٌ أَصْلِيٌّ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ. مِقْدَارُهُ ٦ حَرَكَاتٍ وُجُوبًا (مِثْلُ: الضَّالِّينَ).\nMadd Lazim: Sukoon or Shaddah after Madd letter. Exactly 6 counts (e.g., الضَّالِّينَ).',
    explanationFr: 'المَدُّ اللَّازِمُ: سُكُونٌ أَصْلِيٌّ أَوْ شِدَّةٌ بَعْدَ حَرْفِ المَدِّ. مِقْدَارُهُ ٦ حَرَكَاتٍ وُجُوبًا (مِثْلُ: الضَّالِّينَ).\nMadd Lazim : Soukoun ou Shaddah apres la lettre de Madd. Exactement 6 temps (ex : الضَّالِّينَ).',
  },
  {
    id: 'madd_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي "الضَّالِّينَ" (سُورَةُ الفَاتِحَةِ)، مَا نَوْعُ المَدِّ؟\nIn "الضَّالِّينَ" from Al-Fatiha, what type of Madd?',
    questionFr: 'فِي "الضَّالِّينَ" (سُورَةُ الفَاتِحَةِ)، مَا نَوْعُ المَدِّ؟\nDans "الضَّالِّينَ" de la sourate Al-Fatiha, quel type de Madd ?',
    questionArabic: 'مَا نَوْعُ المَدِّ فِي "الضَّالِّينَ"؟',
    options: [
      'مَدٌّ لَازِمٌ - Necessary Madd (6 counts)',
      'مَدٌّ طَبِيعِيٌّ - Natural Madd (2 counts)',
      'مَدٌّ وَاجِبٌ - Required Madd (4 counts)',
      'مَدٌّ جَائِزٌ - Permissible Madd'
    ],
    optionsFr: [
      'مَدٌّ لَازِمٌ - Madd necessaire (6 temps)',
      'مَدٌّ طَبِيعِيٌّ - Madd naturel (2 temps)',
      'مَدٌّ وَاجِبٌ - Madd obligatoire (4 temps)',
      'مَدٌّ جَائِزٌ - Madd permis'
    ],
    correctAnswer: 'مَدٌّ لَازِمٌ - Necessary Madd (6 counts)',
    explanation: 'الأَلِفُ قَبْلَ اللَّامِ المُشَدَّدَةِ = مَدٌّ لَازِمٌ، يَجِبُ مَدُّهُ ٦ حَرَكَاتٍ بِالضَّبْطِ.\nAlif before Shaddah on Lam = Madd Lazim, must elongate exactly 6 counts.',
    explanationFr: 'الأَلِفُ قَبْلَ اللَّامِ المُشَدَّدَةِ = مَدٌّ لَازِمٌ، يَجِبُ مَدُّهُ ٦ حَرَكَاتٍ بِالضَّبْطِ.\nAlif avant Shaddah sur Lam = Madd Lazim, il faut prolonger exactement 6 temps.',
  },
  {
    id: 'madd_7',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هُوَ المَدُّ العَارِضُ لِلسُّكُونِ؟\nWhat is Madd Arid Lis-Sukoon?',
    questionFr: 'مَا هُوَ المَدُّ العَارِضُ لِلسُّكُونِ؟\nQu\'est-ce que le Madd Arid Lis-Soukoun ?',
    questionArabic: 'مَا هُوَ المَدُّ العَارِضُ لِلسُّكُونِ؟',
    options: [
      'مَدٌّ عِنْدَ الوَقْفِ - Madd when stopping (2, 4, or 6 counts)',
      'مَدٌّ دَائِمٌ - Permanent Madd (6 counts)',
      'مَدٌّ قَبْلَ الهَمْزَةِ - Madd before Hamza',
      'لَا مَدَّ - No Madd'
    ],
    optionsFr: [
      'مَدٌّ عِنْدَ الوَقْفِ - Madd a l\'arret (2, 4, ou 6 temps)',
      'مَدٌّ دَائِمٌ - Madd permanent (6 temps)',
      'مَدٌّ قَبْلَ الهَمْزَةِ - Madd avant Hamza',
      'لَا مَدَّ - Pas de Madd'
    ],
    correctAnswer: 'مَدٌّ عِنْدَ الوَقْفِ - Madd when stopping (2, 4, or 6 counts)',
    explanation: 'المَدُّ العَارِضُ لِلسُّكُونِ يَحْدُثُ عِنْدَ الوَقْفِ عَلَى كَلِمَةٍ فِيهَا حَرْفُ مَدٍّ قَبْلَ الحَرْفِ الأَخِيرِ. يَجُوزُ مَدُّهُ ٢ أَوْ ٤ أَوْ ٦.\nMadd Arid occurs when stopping on a word with Madd before final letter. Flexible: 2, 4, or 6 counts.',
    explanationFr: 'المَدُّ العَارِضُ لِلسُّكُونِ يَحْدُثُ عِنْدَ الوَقْفِ عَلَى كَلِمَةٍ فِيهَا حَرْفُ مَدٍّ قَبْلَ الحَرْفِ الأَخِيرِ. يَجُوزُ مَدُّهُ ٢ أَوْ ٤ أَوْ ٦.\nLe Madd Arid se produit a l\'arret sur un mot avec Madd avant la derniere lettre. Flexible : 2, 4 ou 6 temps.',
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
    questionFr: 'مَا مَعْنَى القَلْقَلَةِ؟\nQue signifie Qalqalah ?',
    questionArabic: 'مَا مَعْنَى القَلْقَلَةِ؟',
    options: [
      'اضْطِرَابُ الحَرْفِ وَارْتِجَاجُهُ - Echoing/bouncing sound',
      'إِطَالَةُ الحَرْفِ - Elongating the letter',
      'إِخْفَاءُ الحَرْفِ - Hiding the letter',
      'غُنَّةٌ مِنَ الأَنْفِ - Nasalization'
    ],
    optionsFr: [
      'اضْطِرَابُ الحَرْفِ وَارْتِجَاجُهُ - Son d\'echo/rebondissement',
      'إِطَالَةُ الحَرْفِ - Prolonger la lettre',
      'إِخْفَاءُ الحَرْفِ - Cacher la lettre',
      'غُنَّةٌ مِنَ الأَنْفِ - Nasalisation'
    ],
    correctAnswer: 'اضْطِرَابُ الحَرْفِ وَارْتِجَاجُهُ - Echoing/bouncing sound',
    explanation: 'القَلْقَلَةُ هِيَ اضْطِرَابُ الحَرْفِ عِنْدَ النُّطْقِ بِهِ سَاكِنًا حَتَّى يُسْمَعَ لَهُ نَبْرَةٌ قَوِيَّةٌ.\nQalqalah is a bouncing/echoing sound when pronouncing these letters with sukoon.',
    explanationFr: 'القَلْقَلَةُ هِيَ اضْطِرَابُ الحَرْفِ عِنْدَ النُّطْقِ بِهِ سَاكِنًا حَتَّى يُسْمَعَ لَهُ نَبْرَةٌ قَوِيَّةٌ.\nLa Qalqalah est un son de rebondissement/echo lors de la prononciation de ces lettres avec soukoun.',
  },
  {
    id: 'qalqalah_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'easy',
    question: 'مَا هِيَ حُرُوفُ القَلْقَلَةِ؟\nWhat are the Qalqalah letters?',
    questionFr: 'مَا هِيَ حُرُوفُ القَلْقَلَةِ؟\nQuelles sont les lettres de Qalqalah ?',
    questionArabic: 'مَا هِيَ حُرُوفُ القَلْقَلَةِ؟',
    options: [
      'ق ط ب ج د (قُطْبُ جَدٍّ) - Qaf, Ta, Ba, Jim, Dal',
      'ا و ي - Alif, Waw, Ya (Madd letters)',
      'ء هـ ع ح غ خ - Throat letters',
      'ي ن م و ل ر - Idgham letters'
    ],
    optionsFr: [
      'ق ط ب ج د (قُطْبُ جَدٍّ) - Qaf, Ta, Ba, Jim, Dal',
      'ا و ي - Alif, Waw, Ya (lettres de Madd)',
      'ء هـ ع ح غ خ - Lettres gutturales',
      'ي ن م و ل ر - Lettres d\'Idgham'
    ],
    correctAnswer: 'ق ط ب ج د (قُطْبُ جَدٍّ) - Qaf, Ta, Ba, Jim, Dal',
    explanation: 'حُرُوفُ القَلْقَلَةِ خَمْسَةٌ مَجْمُوعَةٌ فِي "قُطْبُ جَدٍّ": القَافُ، الطَّاءُ، البَاءُ، الجِيمُ، الدَّالُ.\nThe 5 Qalqalah letters: ق ط ب ج د - remember "Qutub Jad" (قُطْبُ جَدٍّ).',
    explanationFr: 'حُرُوفُ القَلْقَلَةِ خَمْسَةٌ مَجْمُوعَةٌ فِي "قُطْبُ جَدٍّ": القَافُ، الطَّاءُ، البَاءُ، الجِيمُ، الدَّالُ.\nLes 5 lettres de Qalqalah : ق ط ب ج د - retenez "Qutub Jad" (قُطْبُ جَدٍّ).',
  },
  {
    id: 'qalqalah_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَتَى تَحْدُثُ القَلْقَلَةُ؟\nWhen does Qalqalah occur?',
    questionFr: 'مَتَى تَحْدُثُ القَلْقَلَةُ؟\nQuand la Qalqalah se produit-elle ?',
    questionArabic: 'مَتَى تَحْدُثُ القَلْقَلَةُ؟',
    options: [
      'عِنْدَمَا تَكُونُ هَذِهِ الحُرُوفُ سَاكِنَةً - When letters have sukoon',
      'دَائِمًا - Always',
      'عِنْدَمَا تَكُونُ مُتَحَرِّكَةً - When letters have vowels',
      'فِي بِدَايَةِ الكَلِمَةِ فَقَطْ - Only at word beginning'
    ],
    optionsFr: [
      'عِنْدَمَا تَكُونُ هَذِهِ الحُرُوفُ سَاكِنَةً - Quand les lettres ont un soukoun',
      'دَائِمًا - Toujours',
      'عِنْدَمَا تَكُونُ مُتَحَرِّكَةً - Quand les lettres ont des voyelles',
      'فِي بِدَايَةِ الكَلِمَةِ فَقَطْ - Uniquement au debut du mot'
    ],
    correctAnswer: 'عِنْدَمَا تَكُونُ هَذِهِ الحُرُوفُ سَاكِنَةً - When letters have sukoon',
    explanation: 'القَلْقَلَةُ تَحْدُثُ فَقَطْ عِنْدَمَا تَكُونُ حُرُوفُ (ق ط ب ج د) سَاكِنَةً، لَا عِنْدَمَا تَكُونُ مُتَحَرِّكَةً.\nQalqalah only occurs when these letters have sukoon, not when they have vowels.',
    explanationFr: 'القَلْقَلَةُ تَحْدُثُ فَقَطْ عِنْدَمَا تَكُونُ حُرُوفُ (ق ط ب ج د) سَاكِنَةً، لَا عِنْدَمَا تَكُونُ مُتَحَرِّكَةً.\nLa Qalqalah se produit uniquement quand les lettres (ق ط ب ج د) ont un soukoun, pas quand elles ont des voyelles.',
  },
  {
    id: 'qalqalah_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا الفَرْقُ بَيْنَ القَلْقَلَةِ الصُّغْرَى وَالكُبْرَى؟\nWhat is the difference between Qalqalah Sughra and Kubra?',
    questionFr: 'مَا الفَرْقُ بَيْنَ القَلْقَلَةِ الصُّغْرَى وَالكُبْرَى؟\nQuelle est la difference entre Qalqalah Sughra et Kubra ?',
    questionArabic: 'مَا الفَرْقُ بَيْنَ القَلْقَلَةِ الصُّغْرَى وَالكُبْرَى؟',
    options: [
      'الصُّغْرَى فِي وَسَطِ الكَلِمَةِ، الكُبْرَى فِي آخِرِهَا - Sughra in middle, Kubra at end',
      'لَا فَرْقَ بَيْنَهُمَا - No difference',
      'الصُّغْرَى أَقْوَى - Sughra is stronger',
      'الكُبْرَى فِي وَسَطِ الكَلِمَةِ - Kubra in middle'
    ],
    optionsFr: [
      'الصُّغْرَى فِي وَسَطِ الكَلِمَةِ، الكُبْرَى فِي آخِرِهَا - Sughra au milieu, Kubra a la fin',
      'لَا فَرْقَ بَيْنَهُمَا - Pas de difference',
      'الصُّغْرَى أَقْوَى - Sughra est plus fort',
      'الكُبْرَى فِي وَسَطِ الكَلِمَةِ - Kubra au milieu'
    ],
    correctAnswer: 'الصُّغْرَى فِي وَسَطِ الكَلِمَةِ، الكُبْرَى فِي آخِرِهَا - Sughra in middle, Kubra at end',
    explanation: 'القَلْقَلَةُ الصُّغْرَى: فِي وَسَطِ الكَلِمَةِ (نَبْرَةٌ خَفِيفَةٌ). الكُبْرَى: فِي آخِرِ الكَلِمَةِ أَوْ عِنْدَ الوَقْفِ (نَبْرَةٌ أَقْوَى).\nSughra (minor): middle of word. Kubra (major): end of word or when stopping - stronger echo.',
    explanationFr: 'القَلْقَلَةُ الصُّغْرَى: فِي وَسَطِ الكَلِمَةِ (نَبْرَةٌ خَفِيفَةٌ). الكُبْرَى: فِي آخِرِ الكَلِمَةِ أَوْ عِنْدَ الوَقْفِ (نَبْرَةٌ أَقْوَى).\nSughra (mineure) : au milieu du mot. Kubra (majeure) : a la fin du mot ou a l\'arret - echo plus fort.',
  },
  {
    id: 'qalqalah_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "اقْرَأْ" (سُورَةُ العَلَقِ)، أَيُّ حَرْفٍ فِيهِ قَلْقَلَةٌ؟\nIn "اقْرَأْ" (iqra), which letter has Qalqalah?',
    questionFr: 'فِي "اقْرَأْ" (سُورَةُ العَلَقِ)، أَيُّ حَرْفٍ فِيهِ قَلْقَلَةٌ؟\nDans "اقْرَأْ" (iqra), quelle lettre a la Qalqalah ?',
    questionArabic: 'أَيُّ حَرْفٍ فِيهِ قَلْقَلَةٌ فِي "اقْرَأْ"؟',
    options: [
      'القَافُ (ق) - Qaf (Qalqalah Sughra)',
      'الأَلِفُ (ا) - Alif',
      'الرَّاءُ (ر) - Ra',
      'الهَمْزَةُ (ء) - Hamza'
    ],
    optionsFr: [
      'القَافُ (ق) - Qaf (Qalqalah Sughra)',
      'الأَلِفُ (ا) - Alif',
      'الرَّاءُ (ر) - Ra',
      'الهَمْزَةُ (ء) - Hamza'
    ],
    correctAnswer: 'القَافُ (ق) - Qaf (Qalqalah Sughra)',
    explanation: 'القَافُ سَاكِنَةٌ فِي وَسَطِ الكَلِمَةِ، فَتَكُونُ قَلْقَلَةً صُغْرَى (نَبْرَةٌ خَفِيفَةٌ).\nQaf has sukoon in the middle of the word, so it has Qalqalah Sughra (minor echo).',
    explanationFr: 'القَافُ سَاكِنَةٌ فِي وَسَطِ الكَلِمَةِ، فَتَكُونُ قَلْقَلَةً صُغْرَى (نَبْرَةٌ خَفِيفَةٌ).\nQaf a un soukoun au milieu du mot, donc c\'est une Qalqalah Sughra (echo mineur).',
  },
  {
    id: 'qalqalah_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الْفَلَقِ" عِنْدَ الوَقْفِ، أَيُّ قَلْقَلَةٍ؟\nIn "الْفَلَقِ" when stopping, which Qalqalah?',
    questionFr: 'فِي "الْفَلَقِ" عِنْدَ الوَقْفِ، أَيُّ قَلْقَلَةٍ؟\nDans "الْفَلَقِ" a l\'arret, quelle Qalqalah ?',
    questionArabic: 'أَيُّ قَلْقَلَةٍ فِي "الْفَلَقِ" عِنْدَ الوَقْفِ؟',
    options: [
      'قَلْقَلَةٌ كُبْرَى - Qalqalah Kubra (Qaf at end)',
      'قَلْقَلَةٌ صُغْرَى - Qalqalah Sughra',
      'لَا قَلْقَلَةَ - No Qalqalah',
      'قَلْقَلَةٌ مُتَوَسِّطَةٌ - Medium Qalqalah'
    ],
    optionsFr: [
      'قَلْقَلَةٌ كُبْرَى - Qalqalah Kubra (Qaf a la fin)',
      'قَلْقَلَةٌ صُغْرَى - Qalqalah Sughra',
      'لَا قَلْقَلَةَ - Pas de Qalqalah',
      'قَلْقَلَةٌ مُتَوَسِّطَةٌ - Qalqalah moyenne'
    ],
    correctAnswer: 'قَلْقَلَةٌ كُبْرَى - Qalqalah Kubra (Qaf at end)',
    explanation: 'عِنْدَ الوَقْفِ عَلَى "الفَلَقِ"، القَافُ تَصْبِحُ سَاكِنَةً فِي آخِرِ الكَلِمَةِ = قَلْقَلَةٌ كُبْرَى.\nWhen stopping on "al-falaq", Qaf becomes sukoon at word end = Qalqalah Kubra (major).',
    explanationFr: 'عِنْدَ الوَقْفِ عَلَى "الفَلَقِ"، القَافُ تَصْبِحُ سَاكِنَةً فِي آخِرِ الكَلِمَةِ = قَلْقَلَةٌ كُبْرَى.\nA l\'arret sur "al-falaq", Qaf devient soukoun a la fin du mot = Qalqalah Kubra (majeure).',
  },
  {
    id: 'qalqalah_7',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'medium',
    question: 'فِي "قُلْ"، حَرْفُ القَافِ فِيهِ قَلْقَلَةٌ لِأَنَّهُ مِنْ حُرُوفِ القَلْقَلَةِ.\nIn "قُلْ", the Qaf has Qalqalah because it is a Qalqalah letter.',
    questionFr: 'فِي "قُلْ"، حَرْفُ القَافِ فِيهِ قَلْقَلَةٌ لِأَنَّهُ مِنْ حُرُوفِ القَلْقَلَةِ.\nDans "قُلْ", le Qaf a la Qalqalah car c\'est une lettre de Qalqalah.',
    questionArabic: 'هَلْ فِي القَافِ فِي "قُلْ" قَلْقَلَةٌ؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    optionsFr: ['صَحِيحٌ - Vrai', 'خَطَأٌ - Faux'],
    correctAnswer: 'خَطَأٌ - False',
    explanation: 'القَافُ فِي "قُلْ" مُتَحَرِّكَةٌ بِالضَّمَّةِ (قُ)، وَالقَلْقَلَةُ تَكُونُ فَقَطْ عِنْدَ السُّكُونِ.\nThe Qaf in "قُلْ" has damma (قُ), not sukoon. Qalqalah only occurs with sukoon.',
    explanationFr: 'القَافُ فِي "قُلْ" مُتَحَرِّكَةٌ بِالضَّمَّةِ (قُ)، وَالقَلْقَلَةُ تَكُونُ فَقَطْ عِنْدَ السُّكُونِ.\nLe Qaf dans "قُلْ" a une damma (قُ), pas un soukoun. La Qalqalah ne se produit qu\'avec un soukoun.',
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
    questionFr: 'مَا هِيَ الغُنَّةُ؟\nQu\'est-ce que la Ghunnah ?',
    questionArabic: 'مَا هِيَ الغُنَّةُ؟',
    options: [
      'صَوْتٌ أَغَنُّ يَخْرُجُ مِنَ الأَنْفِ - Nasal sound from nose',
      'صَوْتٌ مِنَ الحَلْقِ - Throat sound',
      'صَوْتٌ مِنَ الشَّفَتَيْنِ - Lip sound',
      'صَوْتٌ مِنَ اللِّسَانِ - Tongue sound'
    ],
    optionsFr: [
      'صَوْتٌ أَغَنُّ يَخْرُجُ مِنَ الأَنْفِ - Son nasal du nez',
      'صَوْتٌ مِنَ الحَلْقِ - Son de la gorge',
      'صَوْتٌ مِنَ الشَّفَتَيْنِ - Son des levres',
      'صَوْتٌ مِنَ اللِّسَانِ - Son de la langue'
    ],
    correctAnswer: 'صَوْتٌ أَغَنُّ يَخْرُجُ مِنَ الأَنْفِ - Nasal sound from nose',
    explanation: 'الغُنَّةُ صَوْتٌ لَذِيذٌ يَخْرُجُ مِنَ الخَيْشُومِ (الأَنْفِ)، وَلَيْسَ مِنَ الفَمِ.\nGhunnah is a pleasant nasal humming from the nose (khayshoom), not the mouth.',
    explanationFr: 'الغُنَّةُ صَوْتٌ لَذِيذٌ يَخْرُجُ مِنَ الخَيْشُومِ (الأَنْفِ)، وَلَيْسَ مِنَ الفَمِ.\nLa Ghunnah est un bourdonnement nasal agreable provenant du nez (khayshoom), pas de la bouche.',
  },
  {
    id: 'ghunnah_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ مِقْدَارُ الغُنَّةِ الكَامِلَةِ؟\nHow long is a complete Ghunnah?',
    questionFr: 'كَمْ مِقْدَارُ الغُنَّةِ الكَامِلَةِ؟\nQuelle est la duree d\'une Ghunnah complete ?',
    questionArabic: 'كَمْ مِقْدَارُ الغُنَّةِ الكَامِلَةِ؟',
    options: [
      'حَرَكَتَانِ - 2 counts',
      'حَرَكَةٌ وَاحِدَةٌ - 1 count',
      '٤ حَرَكَاتٍ - 4 counts',
      '٦ حَرَكَاتٍ - 6 counts'
    ],
    optionsFr: [
      'حَرَكَتَانِ - 2 temps',
      'حَرَكَةٌ وَاحِدَةٌ - 1 temps',
      '٤ حَرَكَاتٍ - 4 temps',
      '٦ حَرَكَاتٍ - 6 temps'
    ],
    correctAnswer: 'حَرَكَتَانِ - 2 counts',
    explanation: 'الغُنَّةُ الكَامِلَةُ مِقْدَارُهَا حَرَكَتَانِ - بِمِقْدَارِ فَتْحِ الإِصْبَعِ وَإِغْلَاقِهِ مَرَّتَيْنِ.\nFull ghunnah lasts 2 counts - the time to open and close a finger twice.',
    explanationFr: 'الغُنَّةُ الكَامِلَةُ مِقْدَارُهَا حَرَكَتَانِ - بِمِقْدَارِ فَتْحِ الإِصْبَعِ وَإِغْلَاقِهِ مَرَّتَيْنِ.\nLa Ghunnah complete dure 2 temps - le temps d\'ouvrir et fermer un doigt deux fois.',
  },
  {
    id: 'ghunnah_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'أَيُّ الحُرُوفِ فِيهَا غُنَّةٌ؟\nWhich letters have Ghunnah?',
    questionFr: 'أَيُّ الحُرُوفِ فِيهَا غُنَّةٌ؟\nQuelles lettres ont la Ghunnah ?',
    questionArabic: 'أَيُّ الحُرُوفِ فِيهَا غُنَّةٌ؟',
    options: [
      'النُّونُ (ن) وَالمِيمُ (م) - Noon and Meem only',
      'جَمِيعُ الحُرُوفِ - All letters',
      'حُرُوفُ الحَلْقِ فَقَطْ - Throat letters only',
      'حُرُوفُ القَلْقَلَةِ - Qalqalah letters'
    ],
    optionsFr: [
      'النُّونُ (ن) وَالمِيمُ (م) - Noun et Mim uniquement',
      'جَمِيعُ الحُرُوفِ - Toutes les lettres',
      'حُرُوفُ الحَلْقِ فَقَطْ - Lettres gutturales uniquement',
      'حُرُوفُ القَلْقَلَةِ - Lettres de Qalqalah'
    ],
    correctAnswer: 'النُّونُ (ن) وَالمِيمُ (م) - Noon and Meem only',
    explanation: 'الغُنَّةُ صِفَةٌ لَازِمَةٌ لِلنُّونِ وَالمِيمِ فَقَطْ، وَتُسَمَّيَانِ "حَرْفَا الغُنَّةِ".\nGhunnah is a characteristic of only Noon and Meem - called the "Ghunna letters".',
    explanationFr: 'الغُنَّةُ صِفَةٌ لَازِمَةٌ لِلنُّونِ وَالمِيمِ فَقَطْ، وَتُسَمَّيَانِ "حَرْفَا الغُنَّةِ".\nLa Ghunnah est une caracteristique exclusive du Noun et du Mim - appeles les "lettres de Ghunnah".',
  },
  {
    id: 'ghunnah_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَتَى تَكُونُ الغُنَّةُ أَقْوَى مَا يُمْكِنُ؟\nWhen is Ghunnah at its strongest?',
    questionFr: 'مَتَى تَكُونُ الغُنَّةُ أَقْوَى مَا يُمْكِنُ؟\nQuand la Ghunnah est-elle a son niveau le plus fort ?',
    questionArabic: 'مَتَى تَكُونُ الغُنَّةُ أَقْوَى مَا يُمْكِنُ؟',
    options: [
      'فِي النُّونِ وَالمِيمِ المُشَدَّدَتَيْنِ - In doubled Noon and Meem (Shaddah)',
      'فِي النُّونِ السَّاكِنَةِ وَحْدَهَا - In Noon Sakinah alone',
      'فِي أَيِّ نُونٍ - In any Noon',
      'لَا تَكُونُ قَوِيَّةً أَبَدًا - Never strong'
    ],
    optionsFr: [
      'فِي النُّونِ وَالمِيمِ المُشَدَّدَتَيْنِ - Dans le Noun et le Mim doubles (Shaddah)',
      'فِي النُّونِ السَّاكِنَةِ وَحْدَهَا - Dans le Noun Sakinah seul',
      'فِي أَيِّ نُونٍ - Dans n\'importe quel Noun',
      'لَا تَكُونُ قَوِيَّةً أَبَدًا - Jamais forte'
    ],
    correctAnswer: 'فِي النُّونِ وَالمِيمِ المُشَدَّدَتَيْنِ - In doubled Noon and Meem (Shaddah)',
    explanation: 'أَقْوَى غُنَّةٍ تَكُونُ فِي النُّونِ المُشَدَّدَةِ (نّ) وَالمِيمِ المُشَدَّدَةِ (مّ) مِثْلُ: إِنَّ، ثُمَّ.\nStrongest ghunnah is with Mushaddad Noon (نّ) or Meem (مّ), like: إِنَّ, ثُمَّ.',
    explanationFr: 'أَقْوَى غُنَّةٍ تَكُونُ فِي النُّونِ المُشَدَّدَةِ (نّ) وَالمِيمِ المُشَدَّدَةِ (مّ) مِثْلُ: إِنَّ، ثُمَّ.\nLa Ghunnah la plus forte se produit avec le Noun double (نّ) ou le Mim double (مّ), comme : إِنَّ, ثُمَّ.',
  },
  {
    id: 'ghunnah_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "إِنَّا أَعْطَيْنَاكَ" (سُورَةُ الكَوْثَرِ)، مَا الحُكْمُ فِي "إِنَّ"؟\nIn "إِنَّا" from Al-Kawthar, what happens?',
    questionFr: 'فِي "إِنَّا أَعْطَيْنَاكَ" (سُورَةُ الكَوْثَرِ)، مَا الحُكْمُ فِي "إِنَّ"؟\nDans "إِنَّا" de la sourate Al-Kawthar, que se passe-t-il ?',
    questionArabic: 'مَا الحُكْمُ فِي "إِنَّا"؟',
    options: [
      'غُنَّةٌ عَلَى النُّونِ المُشَدَّدَةِ بِمِقْدَارِ حَرَكَتَيْنِ - Ghunnah on doubled Noon (2 counts)',
      'لَا غُنَّةَ - No Ghunnah',
      'غُنَّةٌ بِمِقْدَارِ ٤ حَرَكَاتٍ - Ghunnah for 4 counts',
      'النُّونُ صَامِتَةٌ - Noon is silent'
    ],
    optionsFr: [
      'غُنَّةٌ عَلَى النُّونِ المُشَدَّدَةِ بِمِقْدَارِ حَرَكَتَيْنِ - Ghunnah sur le Noun double (2 temps)',
      'لَا غُنَّةَ - Pas de Ghunnah',
      'غُنَّةٌ بِمِقْدَارِ ٤ حَرَكَاتٍ - Ghunnah de 4 temps',
      'النُّونُ صَامِتَةٌ - Le Noun est muet'
    ],
    correctAnswer: 'غُنَّةٌ عَلَى النُّونِ المُشَدَّدَةِ بِمِقْدَارِ حَرَكَتَيْنِ - Ghunnah on doubled Noon (2 counts)',
    explanation: 'النُّونُ المُشَدَّدَةُ (نّ) فِيهَا غُنَّةٌ وَاجِبَةٌ بِمِقْدَارِ حَرَكَتَيْنِ.\nThe Mushaddad Noon (نّ) requires ghunnah for 2 counts.',
    explanationFr: 'النُّونُ المُشَدَّدَةُ (نّ) فِيهَا غُنَّةٌ وَاجِبَةٌ بِمِقْدَارِ حَرَكَتَيْنِ.\nLe Noun double (نّ) necessite une Ghunnah obligatoire de 2 temps.',
  },
  {
    id: 'ghunnah_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'فِي أَيِّ حُكْمٍ لَا تُوجَدُ غُنَّةٌ؟\nIn which rule is there NO Ghunnah?',
    questionFr: 'فِي أَيِّ حُكْمٍ لَا تُوجَدُ غُنَّةٌ؟\nDans quelle regle n\'y a-t-il PAS de Ghunnah ?',
    questionArabic: 'فِي أَيِّ حُكْمٍ لَا تُوجَدُ غُنَّةٌ؟',
    options: [
      'الإِدْغَامُ بِلَا غُنَّةٍ (ل ر) - Idgham without Ghunnah (Lam, Ra)',
      'الإِخْفَاءُ - Ikhfa',
      'الإِقْلَابُ - Iqlab',
      'النُّونُ المُشَدَّدَةُ - Mushaddad Noon'
    ],
    optionsFr: [
      'الإِدْغَامُ بِلَا غُنَّةٍ (ل ر) - Idgham sans Ghunnah (Lam, Ra)',
      'الإِخْفَاءُ - Ikhfa',
      'الإِقْلَابُ - Iqlab',
      'النُّونُ المُشَدَّدَةُ - Noun double'
    ],
    correctAnswer: 'الإِدْغَامُ بِلَا غُنَّةٍ (ل ر) - Idgham without Ghunnah (Lam, Ra)',
    explanation: 'الإِدْغَامُ فِي اللَّامِ وَالرَّاءِ يَكُونُ بِدُونِ غُنَّةٍ - تَخْتَفِي النُّونُ تَمَامًا بِلَا أَثَرٍ.\nIdgham into Lam and Ra has NO ghunnah - Noon completely disappears.',
    explanationFr: 'الإِدْغَامُ فِي اللَّامِ وَالرَّاءِ يَكُونُ بِدُونِ غُنَّةٍ - تَخْتَفِي النُّونُ تَمَامًا بِلَا أَثَرٍ.\nL\'Idgham dans le Lam et le Ra se fait SANS Ghunnah - le Noun disparait completement sans laisser de trace.',
  },
  {
    id: 'ghunnah_7',
    category: 'tajweed',
    format: 'true_false',
    difficulty: 'hard',
    question: 'يُمْكِنُ اخْتِبَارُ الغُنَّةِ بِإِمْسَاكِ الأَنْفِ - إِذَا تَوَقَّفَ الصَّوْتُ فَالغُنَّةُ صَحِيحَةٌ.\nYou can test Ghunnah by holding your nose - if sound stops, Ghunnah is correct.',
    questionFr: 'يُمْكِنُ اخْتِبَارُ الغُنَّةِ بِإِمْسَاكِ الأَنْفِ - إِذَا تَوَقَّفَ الصَّوْتُ فَالغُنَّةُ صَحِيحَةٌ.\nOn peut tester la Ghunnah en se bouchant le nez - si le son s\'arrete, la Ghunnah est correcte.',
    questionArabic: 'هَلْ يُمْكِنُ اخْتِبَارُ الغُنَّةِ بِإِمْسَاكِ الأَنْفِ؟',
    options: ['صَحِيحٌ - True', 'خَطَأٌ - False'],
    optionsFr: ['صَحِيحٌ - Vrai', 'خَطَأٌ - Faux'],
    correctAnswer: 'صَحِيحٌ - True',
    explanation: 'نَعَمْ، لِأَنَّ الغُنَّةَ تَخْرُجُ مِنَ الأَنْفِ، فَإِذَا أَمْسَكْتَ أَنْفَكَ يَتَوَقَّفُ الصَّوْتُ.\nYes, because Ghunnah comes from the nose - pinching your nose stops the sound.',
    explanationFr: 'نَعَمْ، لِأَنَّ الغُنَّةَ تَخْرُجُ مِنَ الأَنْفِ، فَإِذَا أَمْسَكْتَ أَنْفَكَ يَتَوَقَّفُ الصَّوْتُ.\nOui, car la Ghunnah provient du nez - se boucher le nez arrete le son.',
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
    questionFr: 'مَا هِيَ اللَّامُ الشَّمْسِيَّةُ؟\nQu\'est-ce que le Lam Shamsiyyah (Lam solaire) ?',
    questionArabic: 'مَا هِيَ اللَّامُ الشَّمْسِيَّةُ؟',
    options: [
      'لَامُ (ال) الَّتِي لَا تُنْطَقُ - The Lam that is NOT pronounced',
      'لَامٌ تُنْطَقُ بِوُضُوحٍ - Lam that is clearly pronounced',
      'أَيُّ لَامٍ - Any Lam',
      'لَامٌ مُشَدَّدَةٌ - Doubled Lam'
    ],
    optionsFr: [
      'لَامُ (ال) الَّتِي لَا تُنْطَقُ - Le Lam qui n\'est PAS prononce',
      'لَامٌ تُنْطَقُ بِوُضُوحٍ - Lam prononce clairement',
      'أَيُّ لَامٍ - N\'importe quel Lam',
      'لَامٌ مُشَدَّدَةٌ - Lam double'
    ],
    correctAnswer: 'لَامُ (ال) الَّتِي لَا تُنْطَقُ - The Lam that is NOT pronounced',
    explanation: 'اللَّامُ الشَّمْسِيَّةُ: لَامُ (ال) التَّعْرِيفِ لَا تُنْطَقُ وَيُشَدَّدُ الحَرْفُ الَّذِي بَعْدَهَا.\nLam Shamsiyyah: The "L" in "Al" becomes silent and the next letter is doubled.',
    explanationFr: 'اللَّامُ الشَّمْسِيَّةُ: لَامُ (ال) التَّعْرِيفِ لَا تُنْطَقُ وَيُشَدَّدُ الحَرْفُ الَّذِي بَعْدَهَا.\nLam Shamsiyyah : le "L" dans "Al" devient muet et la lettre suivante est doublee.',
  },
  {
    id: 'lam_2',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'مَا هِيَ اللَّامُ القَمَرِيَّةُ؟\nWhat is Lam Qamariyyah (Moon Lam)?',
    questionFr: 'مَا هِيَ اللَّامُ القَمَرِيَّةُ؟\nQu\'est-ce que le Lam Qamariyyah (Lam lunaire) ?',
    questionArabic: 'مَا هِيَ اللَّامُ القَمَرِيَّةُ؟',
    options: [
      'لَامُ (ال) الَّتِي تُنْطَقُ بِوُضُوحٍ - The Lam that IS pronounced',
      'لَامٌ صَامِتَةٌ - Silent Lam',
      'لَامٌ مُشَدَّدَةٌ - Doubled Lam',
      'لَامٌ فِي آخِرِ الكَلِمَةِ - Lam at word end'
    ],
    optionsFr: [
      'لَامُ (ال) الَّتِي تُنْطَقُ بِوُضُوحٍ - Le Lam qui EST prononce',
      'لَامٌ صَامِتَةٌ - Lam muet',
      'لَامٌ مُشَدَّدَةٌ - Lam double',
      'لَامٌ فِي آخِرِ الكَلِمَةِ - Lam en fin de mot'
    ],
    correctAnswer: 'لَامُ (ال) الَّتِي تُنْطَقُ بِوُضُوحٍ - The Lam that IS pronounced',
    explanation: 'اللَّامُ القَمَرِيَّةُ: لَامُ (ال) التَّعْرِيفِ تُنْطَقُ وَاضِحَةً ظَاهِرَةً.\nLam Qamariyyah: The "L" in "Al" is clearly pronounced.',
    explanationFr: 'اللَّامُ القَمَرِيَّةُ: لَامُ (ال) التَّعْرِيفِ تُنْطَقُ وَاضِحَةً ظَاهِرَةً.\nLam Qamariyyah : le "L" dans "Al" est prononce clairement et distinctement.',
  },
  {
    id: 'lam_3',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَمْ عَدَدُ الحُرُوفِ الشَّمْسِيَّةِ؟\nHow many Sun Letters are there?',
    questionFr: 'كَمْ عَدَدُ الحُرُوفِ الشَّمْسِيَّةِ؟\nCombien y a-t-il de lettres solaires ?',
    questionArabic: 'كَمْ عَدَدُ الحُرُوفِ الشَّمْسِيَّةِ؟',
    options: [
      '١٤ حَرْفًا - 14 letters',
      '٦ حُرُوفٍ - 6 letters',
      '١٥ حَرْفًا - 15 letters',
      '٢٨ حَرْفًا - 28 letters'
    ],
    optionsFr: [
      '١٤ حَرْفًا - 14 lettres',
      '٦ حُرُوفٍ - 6 lettres',
      '١٥ حَرْفًا - 15 lettres',
      '٢٨ حَرْفًا - 28 lettres'
    ],
    correctAnswer: '١٤ حَرْفًا - 14 letters',
    explanation: 'الحُرُوفُ الشَّمْسِيَّةُ ١٤ حَرْفًا: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.\nThere are 14 Sun Letters: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.',
    explanationFr: 'الحُرُوفُ الشَّمْسِيَّةُ ١٤ حَرْفًا: ت ث د ذ ر ز س ش ص ض ط ظ ل ن.\nIl y a 14 lettres solaires : ت ث د ذ ر ز س ش ص ض ط ظ ل ن.',
  },
  {
    id: 'lam_4',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَيْفَ تُنْطَقُ "الشَّمْسُ"؟\nHow is "الشَّمْسُ" (the sun) pronounced?',
    questionFr: 'كَيْفَ تُنْطَقُ "الشَّمْسُ"؟\nComment se prononce "الشَّمْسُ" (le soleil) ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الشَّمْسُ"؟',
    options: [
      'أَشَّمْسُ - Lam silent, Shin doubled (ash-shams)',
      'أَلْشَمْسُ - Lam pronounced (al-shams)',
      'أَ شَمْسُ - No Lam at all',
      'أَلشَمْسُ - No Shaddah'
    ],
    optionsFr: [
      'أَشَّمْسُ - Lam muet, Shin double (ash-shams)',
      'أَلْشَمْسُ - Lam prononce (al-shams)',
      'أَ شَمْسُ - Pas de Lam du tout',
      'أَلشَمْسُ - Pas de Shaddah'
    ],
    correctAnswer: 'أَشَّمْسُ - Lam silent, Shin doubled (ash-shams)',
    explanation: 'الشِّينُ حَرْفٌ شَمْسِيٌّ، فَاللَّامُ لَا تُنْطَقُ وَالشِّينُ تُشَدَّدُ: "أَشَّمْسُ".\nShin is a Sun Letter, so Lam is silent and Shin is doubled: "ash-shams".',
    explanationFr: 'الشِّينُ حَرْفٌ شَمْسِيٌّ، فَاللَّامُ لَا تُنْطَقُ وَالشِّينُ تُشَدَّدُ: "أَشَّمْسُ".\nShin est une lettre solaire, donc le Lam est muet et le Shin est double : "ash-shams".',
  },
  {
    id: 'lam_5',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'كَيْفَ تُنْطَقُ "الْقَمَرُ"؟\nHow is "الْقَمَرُ" (the moon) pronounced?',
    questionFr: 'كَيْفَ تُنْطَقُ "الْقَمَرُ"؟\nComment se prononce "الْقَمَرُ" (la lune) ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الْقَمَرُ"؟',
    options: [
      'أَلْقَمَرُ - Lam pronounced (al-qamar)',
      'أَقَّمَرُ - Lam silent',
      'أَ قَمَرُ - No Lam at all',
      'أَلقَمَرُ - No sukoon'
    ],
    optionsFr: [
      'أَلْقَمَرُ - Lam prononce (al-qamar)',
      'أَقَّمَرُ - Lam muet',
      'أَ قَمَرُ - Pas de Lam du tout',
      'أَلقَمَرُ - Pas de soukoun'
    ],
    correctAnswer: 'أَلْقَمَرُ - Lam pronounced (al-qamar)',
    explanation: 'القَافُ حَرْفٌ قَمَرِيٌّ، فَاللَّامُ تُنْطَقُ وَاضِحَةً: "أَلْقَمَرُ".\nQaf is a Moon Letter, so Lam is clearly pronounced: "al-qamar".',
    explanationFr: 'القَافُ حَرْفٌ قَمَرِيٌّ، فَاللَّامُ تُنْطَقُ وَاضِحَةً: "أَلْقَمَرُ".\nQaf est une lettre lunaire, donc le Lam est prononce clairement : "al-qamar".',
  },
  {
    id: 'lam_6',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'hard',
    question: 'لِمَاذَا سُمِّيَتْ "شَمْسِيَّةً"؟\nWhy are they called "Sun" letters?',
    questionFr: 'لِمَاذَا سُمِّيَتْ "شَمْسِيَّةً"؟\nPourquoi les appelle-t-on lettres "solaires" ?',
    questionArabic: 'لِمَاذَا سُمِّيَتِ الحُرُوفُ الشَّمْسِيَّةُ بِهَذَا الاسْمِ؟',
    options: [
      'لِأَنَّ كَلِمَةَ "الشَّمْسِ" مِثَالٌ عَلَيْهَا - "The Sun" is an example',
      'لِأَنَّهَا سَاطِعَةٌ - Because they are bright',
      'لِأَنَّهَا حَارَّةٌ - Because they are hot',
      'لِأَنَّهَا مِنَ الشَّمْسِ - Because they come from the sun'
    ],
    optionsFr: [
      'لِأَنَّ كَلِمَةَ "الشَّمْسِ" مِثَالٌ عَلَيْهَا - "Le Soleil" en est un exemple',
      'لِأَنَّهَا سَاطِعَةٌ - Parce qu\'elles sont brillantes',
      'لِأَنَّهَا حَارَّةٌ - Parce qu\'elles sont chaudes',
      'لِأَنَّهَا مِنَ الشَّمْسِ - Parce qu\'elles viennent du soleil'
    ],
    correctAnswer: 'لِأَنَّ كَلِمَةَ "الشَّمْسِ" مِثَالٌ عَلَيْهَا - "The Sun" is an example',
    explanation: 'سُمِّيَتْ شَمْسِيَّةً لِأَنَّ "الشَّمْسَ" مِثَالٌ وَاضِحٌ - الشِّينُ حَرْفٌ شَمْسِيٌّ وَاللَّامُ لَا تُنْطَقُ.\nCalled "Sun" letters because "الشَّمْسُ" (the sun) demonstrates the rule - Lam is silent.',
    explanationFr: 'سُمِّيَتْ شَمْسِيَّةً لِأَنَّ "الشَّمْسَ" مِثَالٌ وَاضِحٌ - الشِّينُ حَرْفٌ شَمْسِيٌّ وَاللَّامُ لَا تُنْطَقُ.\nAppelees lettres "solaires" car "الشَّمْسُ" (le soleil) illustre la regle - le Lam est muet.',
  },
  {
    id: 'lam_7',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الرَّحْمَٰنِ"، كَيْفَ تُنْطَقُ؟\nHow is "الرَّحْمَٰنِ" pronounced?',
    questionFr: 'فِي "الرَّحْمَٰنِ"، كَيْفَ تُنْطَقُ؟\nComment se prononce "الرَّحْمَٰنِ" ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الرَّحْمَٰنِ"؟',
    options: [
      'أَرَّحْمَٰنِ - Lam silent (ar-rahmaan)',
      'أَلْرَحْمَٰنِ - Lam pronounced',
      'أَ رَحْمَٰنِ - No Lam',
      'أَلرَحْمَٰنِ - No Shaddah'
    ],
    optionsFr: [
      'أَرَّحْمَٰنِ - Lam muet (ar-rahmaan)',
      'أَلْرَحْمَٰنِ - Lam prononce',
      'أَ رَحْمَٰنِ - Pas de Lam',
      'أَلرَحْمَٰنِ - Pas de Shaddah'
    ],
    correctAnswer: 'أَرَّحْمَٰنِ - Lam silent (ar-rahmaan)',
    explanation: 'الرَّاءُ حَرْفٌ شَمْسِيٌّ، فَاللَّامُ صَامِتَةٌ وَالرَّاءُ مُشَدَّدَةٌ: "أَرَّحْمَٰنِ".\nRa is a Sun Letter, so Lam is silent and Ra is doubled: "ar-rahmaan".',
    explanationFr: 'الرَّاءُ حَرْفٌ شَمْسِيٌّ، فَاللَّامُ صَامِتَةٌ وَالرَّاءُ مُشَدَّدَةٌ: "أَرَّحْمَٰنِ".\nRa est une lettre solaire, donc le Lam est muet et le Ra est double : "ar-rahmaan".',
  },
  {
    id: 'lam_8',
    category: 'tajweed',
    format: 'multiple_choice',
    difficulty: 'medium',
    question: 'فِي "الْحَمْدُ"، كَيْفَ تُنْطَقُ؟\nHow is "الْحَمْدُ" pronounced?',
    questionFr: 'فِي "الْحَمْدُ"، كَيْفَ تُنْطَقُ؟\nComment se prononce "الْحَمْدُ" ?',
    questionArabic: 'كَيْفَ تُنْطَقُ "الْحَمْدُ"؟',
    options: [
      'أَلْحَمْدُ - Lam pronounced (al-hamd)',
      'أَحَّمْدُ - Lam silent',
      'أَ حَمْدُ - No Lam',
      'أَلحَمْدُ - No sukoon'
    ],
    optionsFr: [
      'أَلْحَمْدُ - Lam prononce (al-hamd)',
      'أَحَّمْدُ - Lam muet',
      'أَ حَمْدُ - Pas de Lam',
      'أَلحَمْدُ - Pas de soukoun'
    ],
    correctAnswer: 'أَلْحَمْدُ - Lam pronounced (al-hamd)',
    explanation: 'الحَاءُ حَرْفٌ قَمَرِيٌّ، فَاللَّامُ تُنْطَقُ وَاضِحَةً: "أَلْحَمْدُ".\nHa (ح) is a Moon Letter, so Lam is clearly pronounced: "al-hamd".',
    explanationFr: 'الحَاءُ حَرْفٌ قَمَرِيٌّ، فَاللَّامُ تُنْطَقُ وَاضِحَةً: "أَلْحَمْدُ".\nHa (ح) est une lettre lunaire, donc le Lam est prononce clairement : "al-hamd".',
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
