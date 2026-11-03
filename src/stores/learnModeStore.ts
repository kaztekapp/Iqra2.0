import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The surah last opened in Learn mode, so the Home shortcut goes back to it.
 * Kept on the phone only: it is a convenience, not progress worth syncing.
 */
interface LearnModeState {
  lastSurahId: string | null;
  setLastSurah: (surahId: string) => void;
}

export const useLearnModeStore = create<LearnModeState>()(
  persist(
    (set) => ({
      lastSurahId: null,
      setLastSurah: (surahId) => set({ lastSurahId: surahId }),
    }),
    {
      name: 'learn-mode',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
