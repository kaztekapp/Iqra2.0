import { useAdStore } from '../stores/adStore';

// ── Feature flag ──────────────────────────────────────────────────
// Set to false to disable all ads and SDK calls (same pattern as ENABLE_SOCIAL_LOGIN)
// To enable ads: install react-native-google-mobile-ads, add config plugin
// to app.json, set ENABLE_ADS = true, and restore the SDK integration code.
export const ENABLE_ADS = false;

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

/** Call on qualifying navigations (e.g. surah detail entry). A stub while
 *  ads are off; the frequency cap returns with the SDK. */
export function showInterstitialIfReady(): void {
  if (!shouldShowAds()) return;
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
