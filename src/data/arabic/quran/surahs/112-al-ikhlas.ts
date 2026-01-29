// Surah Al-Ikhlas (112) - The Sincerity

import { Ayah } from '../../../../types/quran';

export const AL_IKHLAS_AYAHS: Ayah[] = [
  {
    id: 'al-ikhlas-1',
    surahId: 'al-ikhlas',
    ayahNumber: 1,
    textUthmani: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    textSimple: 'قل هو الله احد',
    transliteration: 'Qul huwa-llāhu aḥad',
    translation: 'Say, "He is Allah, [who is] One"',
    words: [
      { id: 'al-ikhlas-1-1', text: 'قُلْ', transliteration: 'Qul', translation: 'Say', position: 0 },
      { id: 'al-ikhlas-1-2', text: 'هُوَ', transliteration: 'huwa', translation: 'He is', position: 1 },
      { id: 'al-ikhlas-1-3', text: 'اللَّهُ', transliteration: 'Allāhu', translation: 'Allah', position: 2 },
      { id: 'al-ikhlas-1-4', text: 'أَحَدٌ', transliteration: 'aḥad', translation: 'One', position: 3 },
    ],
    tajweedRules: [
      { ruleId: 'qalqalah_sughra', startIndex: 2, endIndex: 3, wordIndex: 0 },
      { ruleId: 'izhar', startIndex: 4, endIndex: 6, wordIndex: 0 },
      { ruleId: 'lam_shamsiyyah', startIndex: 7, endIndex: 9, wordIndex: 2 },
      { ruleId: 'qalqalah_kubra', startIndex: 15, endIndex: 16, wordIndex: 3 },
    ],
  },
  {
    id: 'al-ikhlas-2',
    surahId: 'al-ikhlas',
    ayahNumber: 2,
    textUthmani: 'اللَّهُ الصَّمَدُ',
    textSimple: 'الله الصمد',
    transliteration: 'Allāhu-ṣ-ṣamad',
    translation: 'Allah, the Eternal Refuge',
    words: [
      { id: 'al-ikhlas-2-1', text: 'اللَّهُ', transliteration: 'Allāhu', translation: 'Allah', position: 0 },
      { id: 'al-ikhlas-2-2', text: 'الصَّمَدُ', transliteration: 'aṣ-ṣamad', translation: 'the Eternal Refuge', position: 1 },
    ],
    tajweedRules: [
      { ruleId: 'lam_shamsiyyah', startIndex: 0, endIndex: 2, wordIndex: 0 },
      { ruleId: 'madd_tabii', startIndex: 4, endIndex: 6, wordIndex: 0 },
      { ruleId: 'lam_shamsiyyah', startIndex: 7, endIndex: 9, wordIndex: 1 },
      { ruleId: 'qalqalah_kubra', startIndex: 14, endIndex: 15, wordIndex: 1 },
    ],
  },
  {
    id: 'al-ikhlas-3',
    surahId: 'al-ikhlas',
    ayahNumber: 3,
    textUthmani: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    textSimple: 'لم يلد ولم يولد',
    transliteration: 'Lam yalid wa lam yūlad',
    translation: 'He neither begets nor is born',
    words: [
      { id: 'al-ikhlas-3-1', text: 'لَمْ', transliteration: 'Lam', translation: 'Not', position: 0 },
      { id: 'al-ikhlas-3-2', text: 'يَلِدْ', transliteration: 'yalid', translation: 'He begets', position: 1 },
      { id: 'al-ikhlas-3-3', text: 'وَلَمْ', transliteration: 'wa lam', translation: 'and not', position: 2 },
      { id: 'al-ikhlas-3-4', text: 'يُولَدْ', transliteration: 'yūlad', translation: 'was He born', position: 3 },
    ],
    tajweedRules: [
      { ruleId: 'izhar_shafawi', startIndex: 2, endIndex: 4, wordIndex: 0 },
      { ruleId: 'qalqalah_kubra', startIndex: 7, endIndex: 8, wordIndex: 1 },
      { ruleId: 'izhar_shafawi', startIndex: 12, endIndex: 14, wordIndex: 2 },
      { ruleId: 'madd_tabii', startIndex: 16, endIndex: 18, wordIndex: 3 },
      { ruleId: 'qalqalah_kubra', startIndex: 21, endIndex: 22, wordIndex: 3 },
    ],
  },
  {
    id: 'al-ikhlas-4',
    surahId: 'al-ikhlas',
    ayahNumber: 4,
    textUthmani: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    textSimple: 'ولم يكن له كفوا احد',
    transliteration: 'Wa lam yakun lahu kufuwan aḥad',
    translation: 'Nor is there to Him any equivalent',
    words: [
      { id: 'al-ikhlas-4-1', text: 'وَلَمْ', transliteration: 'Wa lam', translation: 'And not', position: 0 },
      { id: 'al-ikhlas-4-2', text: 'يَكُن', transliteration: 'yakun', translation: 'is', position: 1 },
      { id: 'al-ikhlas-4-3', text: 'لَّهُ', transliteration: 'lahu', translation: 'for Him', position: 2 },
      { id: 'al-ikhlas-4-4', text: 'كُفُوًا', transliteration: 'kufuwan', translation: 'equivalent', position: 3 },
      { id: 'al-ikhlas-4-5', text: 'أَحَدٌ', transliteration: 'aḥad', translation: 'anyone', position: 4 },
    ],
    tajweedRules: [
      { ruleId: 'izhar_shafawi', startIndex: 4, endIndex: 6, wordIndex: 0 },
      { ruleId: 'idgham_without_ghunnah', startIndex: 9, endIndex: 12, wordIndex: 1 },
      { ruleId: 'qalqalah_kubra', startIndex: 23, endIndex: 24, wordIndex: 4 },
    ],
  },
];

export default AL_IKHLAS_AYAHS;
