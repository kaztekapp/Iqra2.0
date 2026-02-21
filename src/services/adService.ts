import { useAdStore } from '../stores/adStore';

// ── Feature flag ──────────────────────────────────────────────────
// Set to false to disable all ads and SDK calls (same pattern as ENABLE_SOCIAL_LOGIN)
// To enable ads: install react-native-google-mobile-ads, add config plugin
// to app.json, set ENABLE_ADS = true, and restore the SDK integration code.
export const ENABLE_ADS = false;

// ── Interstitial frequency cap ────────────────────────────────────
const INTERSTITIAL_FREQUENCY = 4; // Show every Nth qualifying navigation
let navigationCount = 0;

// ── Single source of truth ────────────────────────────────────────
export function shouldShowAds(): boolean {
  if (!ENABLE_ADS) return false;
  return !useAdStore.getState().isPremium;
}

// ── Public API (stubs while ENABLE_ADS = false) ──────────────────

/** Call once in _layout.tsx onLayoutRootView */
export function initialize(): void {
  if (!shouldShowAds()) return;
}

/** Call on qualifying navigations (e.g. surah detail entry).
 *  Only shows an ad every INTERSTITIAL_FREQUENCY navigations. */
export function showInterstitialIfReady(): void {
  if (!shouldShowAds()) return;
  navigationCount += 1;
}

/** Tear down listeners */
export function cleanup(): void {
  // No-op while ads are disabled
}

export const adService = {
  initialize,
  showInterstitialIfReady,
  shouldShowAds,
  cleanup,
};
