// Surah Al-Kawthar (108) - The Abundance

import { Ayah } from '../../../../types/quran';

export const AL_KAWTHAR_AYAHS: Ayah[] = [
  {
    id: 'al-kawthar-1',
    surahId: 'al-kawthar',
    ayahNumber: 1,
    textUthmani: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
    textSimple: 'انا اعطيناك الكوثر',
    transliteration: 'Innā aʿṭaynāka-l-kawthar',
    translation: 'Indeed, We have granted you Al-Kawthar',
    words: [
      { id: 'al-kawthar-1-1', text: 'إِنَّا', transliteration: 'Innā', translation: 'Indeed We', position: 0 },
      { id: 'al-kawthar-1-2', text: 'أَعْطَيْنَاكَ', transliteration: 'aʿṭaynāka', translation: 'have granted you', position: 1 },
      { id: 'al-kawthar-1-3', text: 'الْكَوْثَرَ', transliteration: 'al-kawthar', translation: 'Al-Kawthar', position: 2 },
    ],
    tajweedRules: [
      { ruleId: 'ghunnah', startIndex: 2, endIndex: 4, wordIndex: 0 },
      { ruleId: 'madd_tabii', startIndex: 4, endIndex: 6, wordIndex: 0 },
      { ruleId: 'madd_tabii', startIndex: 13, endIndex: 15, wordIndex: 1 },
      { ruleId: 'lam_qamariyyah', startIndex: 17, endIndex: 19, wordIndex: 2 },
    ],
  },
  {
    id: 'al-kawthar-2',
    surahId: 'al-kawthar',
    ayahNumber: 2,
    textUthmani: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
    textSimple: 'فصل لربك وانحر',
    transliteration: 'Faṣalli li rabbika wa-nḥar',
    translation: 'So pray to your Lord and sacrifice',
    words: [
      { id: 'al-kawthar-2-1', text: 'فَصَلِّ', transliteration: 'Faṣalli', translation: 'So pray', position: 0 },
      { id: 'al-kawthar-2-2', text: 'لِرَبِّكَ', transliteration: 'li rabbika', translation: 'to your Lord', position: 1 },
      { id: 'al-kawthar-2-3', text: 'وَانْحَرْ', transliteration: 'wa-nḥar', translation: 'and sacrifice', position: 2 },
    ],
    tajweedRules: [
      { ruleId: 'ghunnah', startIndex: 4, endIndex: 6, wordIndex: 0 },
      { ruleId: 'idgham_without_ghunnah', startIndex: 7, endIndex: 10, wordIndex: 0 },
      { ruleId: 'ghunnah', startIndex: 12, endIndex: 14, wordIndex: 1 },
      { ruleId: 'izhar', startIndex: 17, endIndex: 20, wordIndex: 2 },
    ],
  },
  {
    id: 'al-kawthar-3',
    surahId: 'al-kawthar',
    ayahNumber: 3,
    textUthmani: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    textSimple: 'ان شانئك هو الابتر',
    transliteration: 'Inna shāniʾaka huwa-l-abtar',
    translation: 'Indeed, your enemy is the one cut off',
    words: [
      { id: 'al-kawthar-3-1', text: 'إِنَّ', transliteration: 'Inna', translation: 'Indeed', position: 0 },
      { id: 'al-kawthar-3-2', text: 'شَانِئَكَ', transliteration: 'shāniʾaka', translation: 'your enemy', position: 1 },
      { id: 'al-kawthar-3-3', text: 'هُوَ', transliteration: 'huwa', translation: 'is he', position: 2 },
      { id: 'al-kawthar-3-4', text: 'الْأَبْتَرُ', transliteration: 'al-abtar', translation: 'the cut off', position: 3 },
    ],
    tajweedRules: [
      { ruleId: 'ghunnah', startIndex: 2, endIndex: 4, wordIndex: 0 },
      { ruleId: 'ikhfa', startIndex: 4, endIndex: 7, wordIndex: 0 },
      { ruleId: 'madd_tabii', startIndex: 7, endIndex: 9, wordIndex: 1 },
      { ruleId: 'lam_qamariyyah', startIndex: 18, endIndex: 20, wordIndex: 3 },
      { ruleId: 'qalqalah_sughra', startIndex: 22, endIndex: 23, wordIndex: 3 },
    ],
  },
];

export default AL_KAWTHAR_AYAHS;
