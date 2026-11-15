import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';
import { DEFAULT_REMINDER_SETTINGS, ReminderSettings } from '../services/reminders/plan';

interface SettingsState {
  // Language
  language: 'en' | 'fr';
  setLanguage: (lang: 'en' | 'fr') => void;

  // Onboarding
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;

  // Learning goals
  learningGoals: string[];
  setLearningGoals: (goals: string[]) => void;

  // Arabic speech playback speed (1.0 = natural). Applies app-wide.
  arabicSpeechSpeed: number;
  setArabicSpeechSpeed: (speed: number) => void;

  // Which voice reads the stories aloud. Persisted, so a listener who
  // settles on one never has to choose again.
  narrationVoice: 'female' | 'male';
  /**
   * Which Arabic voice reads duas, vocabulary and the rest of the Arabic
   * speech. 'online' is the fetched voice with the device as a fallback;
   * 'device' uses the phone's own Arabic voice, and `arabicDeviceVoiceId`
   * says which one when the phone has several.
   */
  arabicVoiceSource: 'online' | 'device';
  arabicDeviceVoiceId: string | null;
  setArabicVoice: (source: 'online' | 'device', voiceId?: string | null) => void;
  setNarrationVoice: (voice: 'female' | 'male') => void;

  // Memorize a Surah: when the last verse ends, play the surah again or go
  // on to the next surah in memorization order. Remembered across surahs.
  learnAfterSurah: 'repeat' | 'next';
  setLearnAfterSurah: (mode: 'repeat' | 'next') => void;
  // Going on to the next surah stops after this one (null: on to the end of the list).
  learnStopAfter: string | null;
  setLearnStopAfter: (surahId: string | null) => void;

  // Local reminders (continue, streak, reviews, Friday al-Kahf)
  reminders: ReminderSettings;
  setReminders: (patch: Partial<ReminderSettings>) => void;
  /** The one automatic permission ask has happened. */
  remindersAsked: boolean;
  setRemindersAsked: () => void;

  // Community rules (zero tolerance for objectionable content), accepted
  // once before the first post. Store review requires it for user content.
  communityRulesAccepted: boolean;
  acceptCommunityRules: () => void;

  // Auth (NOT persisted - Supabase manages its own session)
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (session: Session | null) => void;
}

export const SETTINGS_VERSION = 1;

/**
 * Bring settings saved by an older version up to date.
 *
 * Version 1: the story voice became male by default. Before it every install
 * saved 'female' whether or not anyone chose it, so a saved 'female' cannot
 * be told apart from the old default; everyone moves to male once, and a
 * listener who wants the female voice picks it again in the Listen sheet.
 */
export function migrateSettings(persisted: unknown, version: number): Record<string, unknown> {
  const saved = { ...((persisted ?? {}) as Record<string, unknown>) };
  if (version < 1) saved.narrationVoice = 'male';
  return saved;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Language
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      // Onboarding
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      // Learning goals
      learningGoals: [],
      setLearningGoals: (goals) => set({ learningGoals: goals }),

      // Arabic speech speed
      arabicSpeechSpeed: 1.0,
      setArabicSpeechSpeed: (speed) => set({ arabicSpeechSpeed: speed }),

      // Story narration voice. Male by default (see migrateSettings).
      narrationVoice: 'male',
      setNarrationVoice: (voice) => set({ narrationVoice: voice }),
      learnAfterSurah: 'repeat',
      setLearnAfterSurah: (mode) => set({ learnAfterSurah: mode }),
      learnStopAfter: null,
      setLearnStopAfter: (surahId) => set({ learnStopAfter: surahId }),
      arabicVoiceSource: 'online',
      arabicDeviceVoiceId: null,
      setArabicVoice: (source, voiceId = null) => set({ arabicVoiceSource: source, arabicDeviceVoiceId: voiceId }),

      // Reminders
      reminders: DEFAULT_REMINDER_SETTINGS,
      setReminders: (patch) => set((state) => ({ reminders: { ...state.reminders, ...patch } })),
      remindersAsked: false,
      setRemindersAsked: () => set({ remindersAsked: true }),

      communityRulesAccepted: false,
      acceptCommunityRules: () => set({ communityRulesAccepted: true }),

      // Auth
      session: null,
      user: null,
      isAuthenticated: false,
      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
          isAuthenticated: !!session,
        }),
    }),
    {
      name: 'iqra-settings',
      storage: createJSONStorage(() => AsyncStorage),
      version: SETTINGS_VERSION,
      migrate: (persisted, version) => migrateSettings(persisted, version) as unknown as SettingsState,
      // Settings saved before a reminder field existed still get its default.
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<SettingsState>;
        return { ...current, ...saved, reminders: { ...DEFAULT_REMINDER_SETTINGS, ...(saved.reminders ?? {}) } };
      },
      partialize: (state) => ({
        language: state.language,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        learningGoals: state.learningGoals,
        arabicSpeechSpeed: state.arabicSpeechSpeed,
        narrationVoice: state.narrationVoice,
        learnAfterSurah: state.learnAfterSurah,
        learnStopAfter: state.learnStopAfter,
        arabicVoiceSource: state.arabicVoiceSource,
        arabicDeviceVoiceId: state.arabicDeviceVoiceId,
        reminders: state.reminders,
        remindersAsked: state.remindersAsked,
        communityRulesAccepted: state.communityRulesAccepted,
        // session, user, isAuthenticated are NOT persisted
      }),
    }
  )
);
