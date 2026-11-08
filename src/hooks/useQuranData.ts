// Hook for the Quran's data: surah details (in code) and verses (data files
// that ship with the app, read on first use - offline from the start).

import { useCallback, useEffect, useMemo, useState } from 'react';
import { cachedSurah, loadSurah } from '../services/quranText';
import { quietly } from '../lib/report';
import { Ayah, Surah } from '../types/quran';
import {
  getSurahNumber,
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
 * A surah's details and verses. The verses are read from the surah's data
 * file the first time (services/quranText): instant for most surahs, a
 * moment for the longest, shown by isLoading. After that they are in memory.
 * @param surahIdOrNumber - Either surah ID string ('al-ikhlas') or surah number (112)
 */
export function useQuranSurah(surahIdOrNumber: string | number): UseQuranDataReturn {
  const surahNumber = typeof surahIdOrNumber === 'string'
    ? getSurahNumber(surahIdOrNumber)
    : surahIdOrNumber;

  const surah = useMemo(() =>
    surahNumber ? getSurahMetadata(surahNumber) : null,
    [surahNumber]
  );

  const [state, setState] = useState<{ n: number | null; ayahs: Ayah[]; failed: boolean }>(() => ({
    n: surahNumber,
    ayahs: (surahNumber && cachedSurah(surahNumber)) || [],
    failed: false,
  }));
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!surahNumber) return;
    const ready = cachedSurah(surahNumber);
    if (ready) {
      setState({ n: surahNumber, ayahs: ready, failed: false });
      return;
    }
    let live = true;
    setState({ n: surahNumber, ayahs: [], failed: false });
    loadSurah(surahNumber)
      .then((ayahs) => live && setState({ n: surahNumber, ayahs, failed: false }))
      .catch((e) => {
        quietly(e, 'hooks/useQuranSurah');
        if (live) setState({ n: surahNumber, ayahs: [], failed: true });
      });
    return () => {
      live = false;
    };
  }, [surahNumber, attempt]);

  // A different surah than the one in state is still loading: never show the
  // previous surah's verses under the new one's title.
  const current = state.n === surahNumber;
  const ayahs = current ? state.ayahs : (surahNumber && cachedSurah(surahNumber)) || [];
  const isLoading = !!surahNumber && ayahs.length === 0 && !(current && state.failed);
  const error = !surahNumber ? 'Invalid surah ID' : current && state.failed ? 'Could not read this surah' : null;
  const refetch = useCallback(() => setAttempt((a) => a + 1), []);

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
