import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { audioCacheService } from '../services/audioCacheService';

interface SurahDownloadStatus {
  surahNumber: number;
  reciterId: string;
  isDownloading: boolean;
  progress: number; // 0-100
  cachedAyahs: number;
  totalAyahs: number;
  downloadedAt?: string;
}

interface OfflineState {
  // Downloaded surahs tracking
  downloadedSurahs: Record<string, SurahDownloadStatus>; // key: `${surahNumber}-${reciterId}`

  // Cache stats
  totalCacheSize: number;
  lastUpdated: string;

  // Current download
  currentDownload: {
    surahNumber: number;
    progress: number;
  } | null;

  // Actions
  startSurahDownload: (surahNumber: number, totalAyahs: number, reciterId: string) => void;
  updateDownloadProgress: (surahNumber: number, reciterId: string, progress: number, cachedAyahs: number) => void;
  completeSurahDownload: (surahNumber: number, reciterId: string, totalAyahs: number) => void;
  deleteSurahDownload: (surahNumber: number, reciterId: string) => Promise<void>;
  getSurahStatus: (surahNumber: number, reciterId: string) => SurahDownloadStatus | null;
  updateCacheSize: () => Promise<void>;
  clearAllDownloads: () => Promise<void>;
}

export const useOfflineStore = create<OfflineState>()(
  persist(
    (set, get) => ({
      downloadedSurahs: {},
      totalCacheSize: 0,
      lastUpdated: '',
      currentDownload: null,

      startSurahDownload: (surahNumber, totalAyahs, reciterId) => {
        const key = `${surahNumber}-${reciterId}`;
        set((state) => ({
          downloadedSurahs: {
            ...state.downloadedSurahs,
            [key]: {
              surahNumber,
              reciterId,
              isDownloading: true,
              progress: 0,
              cachedAyahs: 0,
              totalAyahs,
            },
          },
          currentDownload: { surahNumber, progress: 0 },
        }));
      },

      updateDownloadProgress: (surahNumber, reciterId, progress, cachedAyahs) => {
        const key = `${surahNumber}-${reciterId}`;
        set((state) => ({
          downloadedSurahs: {
            ...state.downloadedSurahs,
            [key]: {
              ...state.downloadedSurahs[key],
              progress,
              cachedAyahs,
            },
          },
          currentDownload: { surahNumber, progress },
        }));
      },

      completeSurahDownload: (surahNumber, reciterId, totalAyahs) => {
        const key = `${surahNumber}-${reciterId}`;
        set((state) => ({
          downloadedSurahs: {
            ...state.downloadedSurahs,
            [key]: {
              surahNumber,
              reciterId,
              isDownloading: false,
              progress: 100,
              cachedAyahs: totalAyahs,
              totalAyahs,
              downloadedAt: new Date().toISOString(),
            },
          },
          currentDownload: null,
          lastUpdated: new Date().toISOString(),
        }));

        // Update cache size
        get().updateCacheSize();
      },

      deleteSurahDownload: async (surahNumber, reciterId) => {
        const key = `${surahNumber}-${reciterId}`;

        // Delete from filesystem
        await audioCacheService.deleteSurahCache(surahNumber, reciterId);

        set((state) => {
          const { [key]: _, ...rest } = state.downloadedSurahs;
          return {
            downloadedSurahs: rest,
            lastUpdated: new Date().toISOString(),
          };
        });

        // Update cache size
        get().updateCacheSize();
      },

      getSurahStatus: (surahNumber, reciterId) => {
        const key = `${surahNumber}-${reciterId}`;
        return get().downloadedSurahs[key] || null;
      },

      updateCacheSize: async () => {
        const size = await audioCacheService.getCacheSize();
        set({ totalCacheSize: size });
      },

      clearAllDownloads: async () => {
        await audioCacheService.clearCache();
        set({
          downloadedSurahs: {},
          totalCacheSize: 0,
          currentDownload: null,
          lastUpdated: new Date().toISOString(),
        });
      },
    }),
    {
      name: 'offline-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
