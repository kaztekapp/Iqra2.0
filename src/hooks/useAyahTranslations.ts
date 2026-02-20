import { useState, useEffect } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { quranApiService } from '../services/quranApiService';

/**
 * Hook to fetch ayah translations based on user's selected language.
 * Returns a Map<ayahNumber, translationText> that can be used to override
 * the static (empty) translations on ayah objects.
 */
export function useAyahTranslations(surahNumber: number | null) {
  const language = useSettingsStore((s) => s.language);
  const [translations, setTranslations] = useState<Map<number, string>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!surahNumber) return;

    let cancelled = false;
    setIsLoading(true);

    quranApiService.fetchSurahTranslations(surahNumber, language)
      .then((result) => {
        if (!cancelled) {
          setTranslations(result);
        }
      })
      .catch(() => {
        // Errors already logged in the service
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [surahNumber, language]);

  return { translations, isLoading };
}
