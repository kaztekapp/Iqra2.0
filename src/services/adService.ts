import { Platform } from 'react-native';
import { useAdStore } from '../stores/adStore';

// ── Feature flag ──────────────────────────────────────────────────
// Set to false to disable all ads and SDK calls (same pattern as ENABLE_SOCIAL_LOGIN)
export const ENABLE_ADS = false;

// ── Interstitial frequency cap ────────────────────────────────────
const INTERSTITIAL_FREQUENCY = 4; // Show every Nth qualifying navigation
let navigationCount = 0;
let interstitialAd: any = null;
let unsubscribeLoaded: (() => void) | null = null;
let unsubscribeClosed: (() => void) | null = null;

// ── Lazy-load the AdMob SDK (only when ads are enabled) ──────────
// String concatenation prevents Metro from statically resolving the module
function getAdMob() {
  const pkg = 'react-native-' + 'google-mobile-ads';
  return require(pkg);
}

function getInterstitialAdUnitId(): string {
  const { TestIds } = getAdMob();
  const INTERSTITIAL_ID_IOS = process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID_IOS || '';
  const INTERSTITIAL_ID_ANDROID = process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID_ANDROID || '';
  return __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({ ios: INTERSTITIAL_ID_IOS, android: INTERSTITIAL_ID_ANDROID }) || '';
}

// ── Single source of truth ────────────────────────────────────────
export function shouldShowAds(): boolean {
  if (!ENABLE_ADS) return false;
  return !useAdStore.getState().isPremium;
}

// ── Load an interstitial ──────────────────────────────────────────
function loadInterstitial(): void {
  if (!shouldShowAds()) return;

  const store = useAdStore.getState();
  if (store.interstitialLoadAttempts >= 3) return;

  const { InterstitialAd, AdEventType } = getAdMob();

  interstitialAd = InterstitialAd.createForAdRequest(getInterstitialAdUnitId(), {
    requestNonPersonalizedAdsOnly: true,
  });

  // Clean up previous listeners
  unsubscribeLoaded?.();
  unsubscribeClosed?.();

  unsubscribeLoaded = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
    useAdStore.getState().setInterstitialReady(true);
    useAdStore.getState().setInterstitialLoadAttempts(0);
  });

  unsubscribeClosed = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
    useAdStore.getState().setInterstitialReady(false);
    // Pre-load the next one
    loadInterstitial();
  });

  interstitialAd.addAdEventListener(AdEventType.ERROR, () => {
    useAdStore.getState().setInterstitialReady(false);
    const attempts = useAdStore.getState().interstitialLoadAttempts;
    useAdStore.getState().setInterstitialLoadAttempts(attempts + 1);
  });

  interstitialAd.load();
}

// ── Public API ────────────────────────────────────────────────────

/** Call once in _layout.tsx onLayoutRootView */
export function initialize(): void {
  if (!shouldShowAds()) return;
  loadInterstitial();
}

/** Call on qualifying navigations (e.g. surah detail entry).
 *  Only shows an ad every INTERSTITIAL_FREQUENCY navigations. */
export function showInterstitialIfReady(): void {
  if (!shouldShowAds()) return;

  navigationCount += 1;
  if (navigationCount % INTERSTITIAL_FREQUENCY !== 0) return;

  const { isInterstitialReady } = useAdStore.getState();
  if (isInterstitialReady && interstitialAd) {
    interstitialAd.show();
  }
}

/** Tear down listeners (not usually needed — ads live for app lifetime) */
export function cleanup(): void {
  unsubscribeLoaded?.();
  unsubscribeClosed?.();
  interstitialAd = null;
}

export const adService = {
  initialize,
  showInterstitialIfReady,
  shouldShowAds,
  cleanup,
};
