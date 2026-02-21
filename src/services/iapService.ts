import { ENABLE_ADS } from './adService';

// ── IAP service (stubs while ENABLE_ADS = false) ─────────────────
// To enable IAP: install react-native-iap, set ENABLE_ADS = true in
// adService.ts, and restore the full IAP integration code.

async function initialize(): Promise<void> {
  if (!ENABLE_ADS) return;
}

async function getRemoveAdsProduct(): Promise<any | null> {
  if (!ENABLE_ADS) return null;
  return null;
}

async function purchaseRemoveAds(): Promise<void> {
  if (!ENABLE_ADS) return;
}

async function restorePurchases(): Promise<boolean> {
  if (!ENABLE_ADS) return false;
  return false;
}

function cleanup(): void {
  if (!ENABLE_ADS) return;
}

export const iapService = {
  initialize,
  getRemoveAdsProduct,
  purchaseRemoveAds,
  restorePurchases,
  cleanup,
};
