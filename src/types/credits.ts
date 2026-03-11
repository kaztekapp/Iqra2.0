export type SubscriptionStatus = 'none' | 'active' | 'expired' | 'cancelled';
export type SubscriptionPlan = 'monthly' | 'yearly';

export const FREE_DAILY_LIMIT = 0;

export type CreditSource = 'unlimited' | 'free' | 'credit' | 'empty';

export interface CreditDisplayInfo {
  source: CreditSource;
  remaining: number;
  isPremium: boolean;
  label: string;
}
