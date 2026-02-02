// Quran Data Module - Main Export
// NOTE: For accurate Quran text, use the API service (quranApiService)
// The static data below is kept as fallback for offline use

// API Service (recommended - fetches verified text from Quran.com)
export { quranApiService, SURAH_METADATA } from '../../../services/quranApiService';
export { useQuranSurah, useQuranSurahList, prefetchQuranData, clearQuranCache } from '../../../hooks/useQuranData';

// Static Quran Service (lazy loading - recommended for offline)
export {
  staticQuranService,
  fetchSurahAyahs,
  fetchSurahAyahsById,
  getSurahList,
  prefetchJuz,
  prefetchCommonSurahs,
} from '../../../services/staticQuranService';

// Surah metadata and helpers (static fallback)
export * from './surahs';

// Tajweed rules and colors
export * from './tajweed';

// Reciters
export * from './reciters';

// NOTE: Individual surah exports and SURAH_AYAHS have been removed to improve
// startup performance. Use staticQuranService.fetchSurahAyahsById() for lazy loading.
