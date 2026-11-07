import { create } from 'zustand';
import { newerStoreRelease, type StoreRelease } from '../services/storeVersion';

/**
 * The newer store version this install should move to, shared by the update
 * popup and the Home banner so both follow one check. Not persisted: it is
 * asked again on every launch and foreground (components/UpdateModal).
 */
type StoreReleaseState = {
  release: StoreRelease | null;
  /** The banner's close button: hidden until the next launch. */
  bannerClosed: boolean;
  refresh: () => Promise<void>;
  closeBanner: () => void;
};

export const useStoreReleaseStore = create<StoreReleaseState>((set) => ({
  release: null,
  bannerClosed: false,
  refresh: async () => {
    const release = await newerStoreRelease().catch(() => null);
    set({ release });
  },
  closeBanner: () => set({ bannerClosed: true }),
}));
