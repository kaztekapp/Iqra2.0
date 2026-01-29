// Quran Data Module - Main Export
// NOTE: For accurate Quran text, use the API service (quranApiService)
// The static data below is kept as fallback for offline use

// API Service (recommended - fetches verified text from Quran.com)
export { quranApiService, SURAH_METADATA } from '../../../services/quranApiService';
export { useQuranSurah, useQuranSurahList, prefetchQuranData, clearQuranCache } from '../../../hooks/useQuranData';

// Surah metadata and helpers (static fallback)
export * from './surahs';

// Individual surah ayahs
export { default as AL_FIL_AYAHS } from './surahs/105-al-fil';
export { default as QURAYSH_AYAHS } from './surahs/106-quraysh';
export { default as AL_MAUN_AYAHS } from './surahs/107-al-maun';
export { default as AL_KAWTHAR_AYAHS } from './surahs/108-al-kawthar';
export { default as AL_KAFIRUN_AYAHS } from './surahs/109-al-kafirun';
export { default as AN_NASR_AYAHS } from './surahs/110-an-nasr';
export { default as AL_MASAD_AYAHS } from './surahs/111-al-masad';
export { default as AL_IKHLAS_AYAHS } from './surahs/112-al-ikhlas';
export { default as AL_FALAQ_AYAHS } from './surahs/113-al-falaq';
export { default as AN_NAS_AYAHS } from './surahs/114-an-nas';

// Tajweed rules and colors
export * from './tajweed';

// Reciters
export * from './reciters';

// Import all ayahs for convenience
import AL_FIL_AYAHS from './surahs/105-al-fil';
import QURAYSH_AYAHS from './surahs/106-quraysh';
import AL_MAUN_AYAHS from './surahs/107-al-maun';
import AL_KAWTHAR_AYAHS from './surahs/108-al-kawthar';
import AL_KAFIRUN_AYAHS from './surahs/109-al-kafirun';
import AN_NASR_AYAHS from './surahs/110-an-nasr';
import AL_MASAD_AYAHS from './surahs/111-al-masad';
import AL_IKHLAS_AYAHS from './surahs/112-al-ikhlas';
import AL_FALAQ_AYAHS from './surahs/113-al-falaq';
import AN_NAS_AYAHS from './surahs/114-an-nas';

import { Ayah } from '../../../types/quran';

// Map of surah ID to ayahs
export const SURAH_AYAHS: Record<string, Ayah[]> = {
  'al-fil': AL_FIL_AYAHS,
  'quraysh': QURAYSH_AYAHS,
  'al-maun': AL_MAUN_AYAHS,
  'al-kawthar': AL_KAWTHAR_AYAHS,
  'al-kafirun': AL_KAFIRUN_AYAHS,
  'an-nasr': AN_NASR_AYAHS,
  'al-masad': AL_MASAD_AYAHS,
  'al-ikhlas': AL_IKHLAS_AYAHS,
  'al-falaq': AL_FALAQ_AYAHS,
  'an-nas': AN_NAS_AYAHS,
};

// Helper functions
export const getAyahsBySurahId = (surahId: string): Ayah[] => {
  return SURAH_AYAHS[surahId] || [];
};

export const getAyahById = (ayahId: string): Ayah | undefined => {
  for (const ayahs of Object.values(SURAH_AYAHS)) {
    const ayah = ayahs.find((a) => a.id === ayahId);
    if (ayah) return ayah;
  }
  return undefined;
};

export const getTotalAyahCount = (): number => {
  return Object.values(SURAH_AYAHS).reduce((total, ayahs) => total + ayahs.length, 0);
};

export const getTotalWordCount = (): number => {
  return Object.values(SURAH_AYAHS).reduce((total, ayahs) => {
    return total + ayahs.reduce((ayahTotal, ayah) => ayahTotal + ayah.words.length, 0);
  }, 0);
};
