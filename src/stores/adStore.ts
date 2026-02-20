import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AdState {
  // Persisted
  isPremium: boolean;
  purchaseToken: string | null;
  purchaseDate: string | null;

  // Transient (not persisted)
  isInterstitialReady: boolean;
  interstitialLoadAttempts: number;

  // Actions
  setPremium: (token: string) => void;
  restorePurchase: (token: string) => void;
  clearPremium: () => void;
  setInterstitialReady: (ready: boolean) => void;
  setInterstitialLoadAttempts: (attempts: number) => void;
}

export const useAdStore = create<AdState>()(
  persist(
    (set) => ({
      // Persisted
      isPremium: false,
      purchaseToken: null,
      purchaseDate: null,

      // Transient
      isInterstitialReady: false,
      interstitialLoadAttempts: 0,

      // Actions
      setPremium: (token) =>
        set({
          isPremium: true,
          purchaseToken: token,
          purchaseDate: new Date().toISOString(),
        }),
      restorePurchase: (token) =>
        set({
          isPremium: true,
          purchaseToken: token,
          purchaseDate: new Date().toISOString(),
        }),
      clearPremium: () =>
        set({
          isPremium: false,
          purchaseToken: null,
          purchaseDate: null,
        }),
      setInterstitialReady: (ready) => set({ isInterstitialReady: ready }),
      setInterstitialLoadAttempts: (attempts) =>
        set({ interstitialLoadAttempts: attempts }),
    }),
    {
      name: 'iqra-ads',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isPremium: state.isPremium,
        purchaseToken: state.purchaseToken,
        purchaseDate: state.purchaseDate,
        // isInterstitialReady, interstitialLoadAttempts are NOT persisted
      }),
    }
  )
);
