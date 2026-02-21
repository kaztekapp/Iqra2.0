import { Platform } from 'react-native';
import { useAdStore } from '../stores/adStore';
import { ENABLE_ADS } from './adService';

const PRODUCT_ID =
  process.env.EXPO_PUBLIC_IAP_REMOVE_ADS_PRODUCT_ID || 'com.iqra2.app.remove_ads';

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;
let isConnected = false;

// ── Lazy-load react-native-iap (only when ads are enabled) ───────
// String concatenation prevents Metro from statically resolving the module
function getIAP() {
  const pkg = 'react-native-' + 'iap';
  return require(pkg);
}

// ── Initialize ────────────────────────────────────────────────────
async function initialize(): Promise<void> {
  if (!ENABLE_ADS) return;
  try {
    const { initConnection, purchaseUpdatedListener, purchaseErrorListener } = getIAP();
    await initConnection();
    isConnected = true;

    // Listen for successful purchases
    purchaseUpdateSubscription = purchaseUpdatedListener(
      (purchase: any) => {
        if (purchase.productId === PRODUCT_ID) {
          const token =
            purchase.purchaseToken ||
            purchase.transactionId ||
            'restored';
          useAdStore.getState().setPremium(token);
        }
      }
    );

    // Listen for purchase errors (logged, but not surfaced here)
    purchaseErrorSubscription = purchaseErrorListener(
      (error: any) => {
        console.warn('[IAP] Purchase error:', error.code, error.message);
      }
    );
  } catch (e) {
    console.warn('[IAP] initConnection failed:', e);
  }
}

// ── Get product info ──────────────────────────────────────────────
async function getRemoveAdsProduct(): Promise<any | null> {
  if (!ENABLE_ADS) return null;
  try {
    const { fetchProducts } = getIAP();
    const products = await fetchProducts({
      skus: [PRODUCT_ID],
    });
    return products?.[0] ?? null;
  } catch (e) {
    console.warn('[IAP] fetchProducts failed:', e);
    return null;
  }
}

// ── Trigger purchase ──────────────────────────────────────────────
async function purchaseRemoveAds(): Promise<void> {
  try {
    const { requestPurchase } = getIAP();
    await requestPurchase({
      type: 'in-app',
      request:
        Platform.OS === 'ios'
          ? { apple: { sku: PRODUCT_ID } }
          : { google: { skus: [PRODUCT_ID] } },
    });
  } catch (e) {
    console.warn('[IAP] requestPurchase failed:', e);
    throw e;
  }
}

// ── Restore purchases (required by Apple) ─────────────────────────
async function restorePurchases(): Promise<boolean> {
  try {
    const { getAvailablePurchases } = getIAP();
    const purchases = await getAvailablePurchases();
    const removeAdsPurchase = purchases.find(
      (p: any) => p.productId === PRODUCT_ID
    );
    if (removeAdsPurchase) {
      const token =
        removeAdsPurchase.purchaseToken ||
        removeAdsPurchase.transactionId ||
        'restored';
      useAdStore.getState().restorePurchase(token);
      return true;
    }
    return false;
  } catch (e) {
    console.warn('[IAP] restorePurchases failed:', e);
    throw e;
  }
}

// ── Cleanup ───────────────────────────────────────────────────────
function cleanup(): void {
  if (!ENABLE_ADS) return;
  purchaseUpdateSubscription?.remove();
  purchaseErrorSubscription?.remove();
  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;
  if (isConnected) {
    try {
      const { endConnection } = getIAP();
      endConnection();
    } catch (e) {
      // ignore
    }
    isConnected = false;
  }
}

export const iapService = {
  initialize,
  getRemoveAdsProduct,
  purchaseRemoveAds,
  restorePurchases,
  cleanup,
};
