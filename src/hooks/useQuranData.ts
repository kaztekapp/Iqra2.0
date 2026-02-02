// Hook for fetching Quran data from static files
// Uses bundled verified Quran text for offline-first experience
// Data loads synchronously - no loading state needed

import { useMemo } from 'react';
import { Ayah, Surah } from '../types/quran';
import {
  getSurahNumber,
  getSurahAyahsSync,
  getSurahMetadata,
  getSurahList,
} from '../services/staticQuranService';

// Re-export for backward compatibility
export { getSurahNumber as getSurahNumberFromId } from '../services/staticQuranService';

interface UseQuranDataReturn {
  surah: Surah | null;
  ayahs: Ayah[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to get surah data from static files
 * Data loads synchronously - no loading spinner needed
 * @param surahIdOrNumber - Either surah ID string ('al-ikhlas') or surah number (112)
 */
export function useQuranSurah(surahIdOrNumber: string | number): UseQuranDataReturn {
  // Convert to number if string
  const surahNumber = typeof surahIdOrNumber === 'string'
    ? getSurahNumber(surahIdOrNumber)
    : surahIdOrNumber;

  // Get data synchronously - memoized to avoid recalculation on re-renders
  const surah = useMemo(() =>
    surahNumber ? getSurahMetadata(surahNumber) : null,
    [surahNumber]
  );

  const ayahs = useMemo(() =>
    surahNumber ? getSurahAyahsSync(surahNumber) : [],
    [surahNumber]
  );

  const error = useMemo(() =>
    !surahNumber ? 'Invalid surah ID' : null,
    [surahNumber]
  );

  // No loading state needed - data is synchronous
  const isLoading = false;

  // Refetch is a no-op since data is static
  const refetch = () => {};

  return { surah, ayahs, isLoading, error, refetch };
}

/**
 * Hook to get list of all available surahs
 */
export function useQuranSurahList(): Surah[] {
  return useMemo(() => getSurahList(), []);
}

/**
 * Prefetch - no-op since data is already loaded synchronously
 */
export async function prefetchQuranData(): Promise<void> {
  // No-op - data is statically imported
}

/**
 * Clear cache - no-op since we use static imports
 */
export async function clearQuranCache(): Promise<void> {
  // No-op - no cache with static imports
}
