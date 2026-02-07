import { useCallback } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

/**
 * Hook that provides localization helpers for content data.
 * Returns lc() to pick between English/French strings,
 * and lcArray() for array fallback.
 */
export function useLocalizedContent() {
  const language = useSettingsStore((s) => s.language);

  /** Pick localized content: returns `fr` when language is French and `fr` is truthy, else `en`. */
  const lc = useCallback(
    <T>(en: T, fr?: T | null): T => {
      if (language === 'fr' && fr != null) return fr;
      return en;
    },
    [language],
  );

  /** Pick localized array: returns `fr` when language is French and `fr` is non-empty, else `en`. */
  const lcArray = useCallback(
    <T>(en: T[], fr?: T[] | null): T[] => {
      if (language === 'fr' && fr && fr.length > 0) return fr;
      return en;
    },
    [language],
  );

  return { lc, lcArray, language };
}
