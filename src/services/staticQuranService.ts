// Static Quran Data Service: surah details, and verses from the data files
// that ship with the app (offline from the start).

import { Ayah, Surah } from '../types/quran';
import { SURAHS } from '../data/arabic/quran/surahs';
import { SURAH_ID_TO_NUMBER } from '../data/arabic/quran/surahIds';
import { cachedSurah, loadSurah } from './quranText';

/**
 * The verses come from one data file per surah (services/quranText), read on
 * first use. They used to be JavaScript: 20 MB of the app's code, which every
 * over-the-air update sent to every phone again.
 */

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
 * The verses if this surah has already been read from its data file, else an
 * empty list (and the read starts). Screens use useQuranSurah, which waits;
 * this is for callers that can do without until it is there.
 */
export function getSurahAyahsSync(surahNumber: number): Ayah[] {
  const ayahs = cachedSurah(surahNumber);
  if (!ayahs) loadSurah(surahNumber).catch(() => {});
  return ayahs ?? [];
}

export function getSurahAyahsByIdSync(surahId: string): Ayah[] {
  const surahNumber = getSurahNumber(surahId);
  return surahNumber ? getSurahAyahsSync(surahNumber) : [];
}

/** The verses of a surah, read from its data file if not yet in memory. */
export function fetchSurahAyahs(surahNumber: number): Promise<Ayah[]> {
  return loadSurah(surahNumber);
}

export async function fetchSurahAyahsById(surahId: string): Promise<Ayah[]> {
  const surahNumber = getSurahNumber(surahId);
  return surahNumber ? loadSurah(surahNumber) : [];
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
