// Static Quran Data Service
// Loads verified Quran text from bundled static files
// Pre-built cache for instant O(1) lookups

import { Ayah, Surah } from '../types/quran';
import { SURAHS } from '../data/arabic/quran/surahs';
import { QURAN_BY_JUZ } from '../data/arabic/quran/surahs/allSurahs';

// Surah ID to number mapping (includes both metadata IDs and data file IDs)
const SURAH_ID_TO_NUMBER: Record<string, number> = {
  // Standard IDs (from metadata)
  'al-fatihah': 1, 'al-baqarah': 2, 'ali-imran': 3, 'an-nisa': 4,
  'al-maidah': 5, 'al-anam': 6, 'al-araf': 7, 'al-anfal': 8,
  'at-tawbah': 9, 'yunus': 10, 'hud': 11, 'yusuf': 12,
  'ar-rad': 13, 'ibrahim': 14, 'al-hijr': 15, 'an-nahl': 16,
  'al-isra': 17, 'al-kahf': 18, 'maryam': 19, 'ta-ha': 20,
  'al-anbiya': 21, 'al-hajj': 22, 'al-muminun': 23, 'an-nur': 24,
  'al-furqan': 25, 'ash-shuara': 26, 'an-naml': 27, 'al-qasas': 28,
  'al-ankabut': 29, 'ar-rum': 30, 'luqman': 31, 'as-sajdah': 32,
  'al-ahzab': 33, 'saba': 34, 'fatir': 35, 'ya-sin': 36,
  'as-saffat': 37, 'sad': 38, 'az-zumar': 39, 'ghafir': 40,
  'fussilat': 41, 'ash-shura': 42, 'az-zukhruf': 43, 'ad-dukhan': 44,
  'al-jathiyah': 45, 'al-ahqaf': 46, 'muhammad': 47, 'al-fath': 48,
  'al-hujurat': 49, 'qaf': 50, 'adh-dhariyat': 51, 'at-tur': 52,
  'an-najm': 53, 'al-qamar': 54, 'ar-rahman': 55, 'al-waqiah': 56,
  'al-hadid': 57, 'al-mujadila': 58, 'al-hashr': 59, 'al-mumtahanah': 60,
  'as-saf': 61, 'al-jumuah': 62, 'al-munafiqun': 63, 'at-taghabun': 64,
  'at-talaq': 65, 'at-tahrim': 66, 'al-mulk': 67, 'al-qalam': 68,
  'al-haqqah': 69, 'al-maarij': 70, 'nuh': 71, 'al-jinn': 72,
  'al-muzzammil': 73, 'al-muddaththir': 74, 'al-qiyamah': 75, 'al-insan': 76,
  'al-mursalat': 77, 'an-naba': 78, 'an-naziat': 79, 'abasa': 80,
  'at-takwir': 81, 'al-infitar': 82, 'al-mutaffifin': 83, 'al-inshiqaq': 84,
  'al-buruj': 85, 'at-tariq': 86, 'al-ala': 87, 'al-ghashiyah': 88,
  'al-fajr': 89, 'al-balad': 90, 'ash-shams': 91, 'al-layl': 92,
  'ad-duha': 93, 'ash-sharh': 94, 'at-tin': 95, 'al-alaq': 96,
  'al-qadr': 97, 'al-bayyinah': 98, 'az-zalzalah': 99, 'al-adiyat': 100,
  'al-qariah': 101, 'at-takathur': 102, 'al-asr': 103, 'al-humazah': 104,
  'al-fil': 105, 'quraysh': 106, 'al-maun': 107, 'al-kawthar': 108,
  'al-kafirun': 109, 'an-nasr': 110, 'al-masad': 111, 'al-ikhlas': 112,
  'al-falaq': 113, 'an-nas': 114,
  // Alternative IDs (from data files - spelling variations)
  'al-ma-idah': 5, 'al-an-am': 6, 'al-a-raf': 7,
  'ar-ra-d': 13, 'taha': 20,
  'al-anbya': 21, 'al-mu-minun': 23,
  'ash-shu-ara': 26,
  'ash-shuraa': 42,
  'al-waqi-ah': 56,
  'al-jumu-ah': 62,
  'al-ma-arij': 70,
  'an-nazi-at': 79,
  'al-a-la': 87,
  'ad-duhaa': 93,
  'al-qari-ah': 101,
  'al-ma-un': 107,
};

// Pre-build the surah cache at module load time for instant lookups
const SURAH_AYAHS_CACHE: Map<number, Ayah[]> = new Map();

// Build cache immediately when module loads
for (let juz = 1; juz <= 30; juz++) {
  const juzData = QURAN_BY_JUZ[juz];
  if (!juzData) continue;

  for (const [, ayahs] of Object.entries(juzData)) {
    if (ayahs.length > 0) {
      const firstAyah = ayahs[0];
      const surahNum = SURAH_ID_TO_NUMBER[firstAyah.surahId];
      if (surahNum && !SURAH_AYAHS_CACHE.has(surahNum)) {
        SURAH_AYAHS_CACHE.set(surahNum, ayahs);
      }
    }
  }
}

/**
 * Get surah number from surah ID string
 */
export function getSurahNumber(surahId: string): number | null {
  return SURAH_ID_TO_NUMBER[surahId] || null;
}

/**
 * Get surah metadata from SURAHS array
 */
export function getSurahMetadata(surahNumber: number): Surah | null {
  return SURAHS.find(s => s.surahNumber === surahNumber) || null;
}

/**
 * Get surah metadata by ID
 */
export function getSurahMetadataById(surahId: string): Surah | null {
  const surahNumber = getSurahNumber(surahId);
  if (!surahNumber) return null;
  return getSurahMetadata(surahNumber);
}

/**
 * Get ayahs for a surah - instant O(1) lookup from pre-built cache
 */
export function getSurahAyahsSync(surahNumber: number): Ayah[] {
  return SURAH_AYAHS_CACHE.get(surahNumber) || [];
}

/**
 * Get ayahs by surah ID - instant lookup
 */
export function getSurahAyahsByIdSync(surahId: string): Ayah[] {
  const surahNumber = getSurahNumber(surahId);
  if (!surahNumber) return [];
  return SURAH_AYAHS_CACHE.get(surahNumber) || [];
}

/**
 * Async wrapper for backward compatibility
 */
export async function fetchSurahAyahs(surahNumber: number): Promise<Ayah[]> {
  return getSurahAyahsSync(surahNumber);
}

/**
 * Async wrapper for backward compatibility
 */
export async function fetchSurahAyahsById(surahId: string): Promise<Ayah[]> {
  return getSurahAyahsByIdSync(surahId);
}

/**
 * Get list of all surahs
 */
export function getSurahList(): Surah[] {
  return SURAHS;
}

/**
 * No-op functions for backward compatibility
 */
export async function prefetchJuz(_juzNumber: number): Promise<void> {}
export async function prefetchCommonSurahs(): Promise<void> {}
export function clearCache(): void {}

// Export service object
export const staticQuranService = {
  getSurahNumber,
  getSurahMetadata,
  getSurahMetadataById,
  getSurahAyahsSync,
  getSurahAyahsByIdSync,
  fetchSurahAyahs,
  fetchSurahAyahsById,
  getSurahList,
  prefetchJuz,
  prefetchCommonSurahs,
  clearCache,
};

export default staticQuranService;
