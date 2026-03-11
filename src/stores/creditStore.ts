import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import {
  SubscriptionStatus,
  SubscriptionPlan,
  CreditDisplayInfo,
  FREE_DAILY_LIMIT,
} from '../types/credits';

interface CreditState {
  creditBalance: number;
  subscriptionStatus: SubscriptionStatus;
  subscriptionPlan: SubscriptionPlan | null;
  subscriptionExpiresAt: string | null;
  freeMessagesUsed: number;
  freeMessagesDate: string; // ISO date string YYYY-MM-DD

  syncCredits: () => Promise<void>;
  updateFromHeaders: (headers: Headers) => void;
  reset: () => void;
}

interface CreditData {
  creditBalance: number;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiresAt: string | null;
  freeMessagesUsed: number;
  freeMessagesDate: string;
}

/** Derive display info from raw credit state — call outside selectors to avoid infinite loops */
export function getCreditDisplayInfo(state: CreditData): CreditDisplayInfo {
  const currentDate = today();

  if (
    state.subscriptionStatus === 'active' &&
    (!state.subscriptionExpiresAt || new Date(state.subscriptionExpiresAt) > new Date())
  ) {
    return { source: 'unlimited', remaining: Infinity, isPremium: true, label: 'Premium' };
  }

  if (FREE_DAILY_LIMIT > 0) {
    if (state.freeMessagesDate !== currentDate) {
      return {
        source: 'free',
        remaining: FREE_DAILY_LIMIT,
        isPremium: false,
        label: `${FREE_DAILY_LIMIT}/${FREE_DAILY_LIMIT}`,
      };
    }

    const freeRemaining = FREE_DAILY_LIMIT - state.freeMessagesUsed;
    if (freeRemaining > 0) {
      return {
        source: 'free',
        remaining: freeRemaining,
        isPremium: false,
        label: `${freeRemaining}/${FREE_DAILY_LIMIT}`,
      };
    }
  }

  if (state.creditBalance > 0) {
    return {
      source: 'credit',
      remaining: state.creditBalance,
      isPremium: false,
      label: `${state.creditBalance}`,
    };
  }

  return { source: 'empty', remaining: 0, isPremium: false, label: '0' };
}

const today = () => new Date().toISOString().split('T')[0];

export const useCreditStore = create<CreditState>()(
  persist(
    (set, get) => ({
      creditBalance: 0,
      subscriptionStatus: 'none',
      subscriptionPlan: null,
      subscriptionExpiresAt: null,
      freeMessagesUsed: 0,
      freeMessagesDate: today(),

      syncCredits: async () => {
        if (!supabase) return;
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.user) return;

          const { data, error } = await supabase
            .from('user_credits')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (error || !data) return;

          set({
            creditBalance: data.credit_balance,
            subscriptionStatus: data.subscription_status,
            subscriptionPlan: data.subscription_plan,
            subscriptionExpiresAt: data.subscription_expires_at,
            freeMessagesUsed: data.free_messages_used,
            freeMessagesDate: data.free_messages_date,
          });
        } catch {
          // Silently fail — local state is still usable
        }
      },

      updateFromHeaders: (headers: Headers) => {
        const creditType = headers.get('X-Credit-Type');
        const remaining = headers.get('X-Credits-Remaining');
        const freeRemaining = headers.get('X-Free-Remaining');

        if (!creditType) return;

        const updates: Partial<CreditState> = {};

        if (remaining !== null) {
          updates.creditBalance = parseInt(remaining, 10) || 0;
        }

        if (freeRemaining !== null) {
          const freeLeft = parseInt(freeRemaining, 10) || 0;
          updates.freeMessagesUsed = FREE_DAILY_LIMIT - freeLeft;
          updates.freeMessagesDate = today();
        }

        if (creditType === 'unlimited') {
          updates.subscriptionStatus = 'active';
        }

        set(updates);
      },

      reset: () =>
        set({
          creditBalance: 0,
          subscriptionStatus: 'none',
          subscriptionPlan: null,
          subscriptionExpiresAt: null,
          freeMessagesUsed: 0,
          freeMessagesDate: today(),
        }),
    }),
    {
      name: 'iqra-credits',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        creditBalance: state.creditBalance,
        subscriptionStatus: state.subscriptionStatus,
        subscriptionPlan: state.subscriptionPlan,
        subscriptionExpiresAt: state.subscriptionExpiresAt,
        freeMessagesUsed: state.freeMessagesUsed,
        freeMessagesDate: state.freeMessagesDate,
      }),
    }
  )
);
