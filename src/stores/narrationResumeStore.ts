import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Where each story reading was left, kept on the phone, so closing the app
 * (or the phone ending it) no longer sends the listener back to the first
 * sentence. Keyed by the reading's key (story, chapter, language), which is
 * the same from one launch to the next.
 */
type Position = { index: number; at: number };

/** Readings remembered; the oldest go first past this. */
const KEEP = 60;

type NarrationResumeState = {
  positions: Record<string, Position>;
  savePosition: (key: string, index: number) => void;
  clearPosition: (key: string) => void;
};

export const useNarrationResumeStore = create<NarrationResumeState>()(
  persist(
    (set) => ({
      positions: {},
      savePosition: (key, index) =>
        set((state) => {
          if (index <= 0) {
            if (!(key in state.positions)) return state;
            const { [key]: _gone, ...rest } = state.positions;
            return { positions: rest };
          }
          const next = { ...state.positions, [key]: { index, at: Date.now() } };
          const keys = Object.keys(next);
          if (keys.length > KEEP) {
            keys.sort((a, b) => next[a].at - next[b].at);
            for (const k of keys.slice(0, keys.length - KEEP)) delete next[k];
          }
          return { positions: next };
        }),
      clearPosition: (key) =>
        set((state) => {
          if (!(key in state.positions)) return state;
          const { [key]: _gone, ...rest } = state.positions;
          return { positions: rest };
        }),
    }),
    {
      name: 'iqra-narration-resume',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
