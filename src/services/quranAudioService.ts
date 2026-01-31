// Quran Audio Service
// Uses pre-recorded recitations from professional reciters for authentic Tajweed pronunciation

import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';

// Available reciters with their audio base URLs from EveryAyah.com
// Format: https://everyayah.com/data/{reciter_folder}/{surah_number}{ayah_number}.mp3
// Surah and ayah are zero-padded to 3 digits each (e.g., 001001.mp3 for Al-Fatiha:1)

export const QURAN_RECITERS = {
  'mishary-alafasy': {
    id: 'mishary-alafasy',
    nameArabic: 'مشاري راشد العفاسي',
    nameEnglish: 'Mishary Rashid Alafasy',
    style: 'murattal' as const,
    folder: 'Alafasy_128kbps',
    quality: '128kbps',
    recommended: true,
  },
  'abdul-basit-murattal': {
    id: 'abdul-basit-murattal',
    nameArabic: 'عبد الباسط عبد الصمد',
    nameEnglish: 'Abdul Basit (Murattal)',
    style: 'murattal' as const,
    folder: 'Abdul_Basit_Murattal_192kbps',
    quality: '192kbps',
    recommended: true,
  },
  'abdul-basit-mujawwad': {
    id: 'abdul-basit-mujawwad',
    nameArabic: 'عبد الباسط عبد الصمد',
    nameEnglish: 'Abdul Basit (Mujawwad)',
    style: 'mujawwad' as const,
    folder: 'Abdul_Basit_Mujawwad_128kbps',
    quality: '128kbps',
    recommended: false,
  },
  'mahmoud-khalil-husary': {
    id: 'mahmoud-khalil-husary',
    nameArabic: 'محمود خليل الحصري',
    nameEnglish: 'Mahmoud Khalil Al-Husary',
    style: 'murattal' as const,
    folder: 'Husary_128kbps',
    quality: '128kbps',
    recommended: true,
  },
  'minshawi-murattal': {
    id: 'minshawi-murattal',
    nameArabic: 'محمد صديق المنشاوي',
    nameEnglish: 'Mohamed Siddiq Al-Minshawi',
    style: 'murattal' as const,
    folder: 'Minshawy_Murattal_128kbps',
    quality: '128kbps',
    recommended: false,
  },
  'sudais': {
    id: 'sudais',
    nameArabic: 'عبد الرحمن السديس',
    nameEnglish: 'Abdurrahman As-Sudais',
    style: 'murattal' as const,
    folder: 'Abdurrahmaan_As-Sudais_192kbps',
    quality: '192kbps',
    recommended: false,
  },
  'saad-al-ghamdi': {
    id: 'saad-al-ghamdi',
    nameArabic: 'سعد الغامدي',
    nameEnglish: 'Saad Al-Ghamdi',
    style: 'murattal' as const,
    folder: 'Ghamadi_40kbps',
    quality: '40kbps',
    recommended: false,
  },
  'hani-rifai': {
    id: 'hani-rifai',
    nameArabic: 'هاني الرفاعي',
    nameEnglish: 'Hani Ar-Rifai',
    style: 'murattal' as const,
    folder: 'Hani_Rifai_192kbps',
    quality: '192kbps',
    recommended: false,
  },
};

export type ReciterId = keyof typeof QURAN_RECITERS;

const EVERYAYAH_BASE_URL = 'https://everyayah.com/data';

export type AudioState = 'idle' | 'loading' | 'playing' | 'paused';

class QuranAudioService {
  private player: AudioPlayer | null = null;
  private audioState: AudioState = 'idle';
  private currentReciter: ReciterId = 'mishary-alafasy';
  private playbackRate = 1.0;
  private onPlaybackStatusUpdate: ((status: PlaybackStatus) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;
  private onStateChangeCallback: ((state: AudioState) => void) | null = null;
  private statusSubscription: { remove: () => void } | null = null;
  private isTransitioning = false; // Prevent race conditions
  private stoppedByUser = false; // Track if playback was stopped by user
  private isAudioConfigured = false; // Track if audio session is configured
  private configurationInProgress = false; // Prevent concurrent configuration
  private playCount = 0; // Track number of plays for periodic reset

  // Track current ayah for toggle play/pause
  private currentSurah: number | null = null;
  private currentAyah: number | null = null;

  constructor() {
    // Audio will be configured on first use
  }

  private async configureAudio(): Promise<boolean> {
    // Already configured successfully
    if (this.isAudioConfigured) {
      return true;
    }

    // Prevent concurrent configuration attempts
    if (this.configurationInProgress) {
      // Wait for ongoing configuration
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.isAudioConfigured;
    }

    this.configurationInProgress = true;

    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
      });
      // Small delay to let iOS audio session initialize
      await new Promise(resolve => setTimeout(resolve, 50));
      this.isAudioConfigured = true;
      this.configurationInProgress = false;
      return true;
    } catch {
      // Audio configuration can fail on simulators or when audio session is busy
      // This is non-fatal - audio playback will likely still work
      this.configurationInProgress = false;
      return false;
    }
  }

  /**
   * Get the audio URL for a specific ayah
   */
  getAyahAudioUrl(surahNumber: number, ayahNumber: number, reciterId?: ReciterId): string {
    const reciter = QURAN_RECITERS[reciterId || this.currentReciter];
    const surahPadded = surahNumber.toString().padStart(3, '0');
    const ayahPadded = ayahNumber.toString().padStart(3, '0');
    return `${EVERYAYAH_BASE_URL}/${reciter.folder}/${surahPadded}${ayahPadded}.mp3`;
  }

  /**
   * Toggle play/pause for an ayah
   * If the same ayah is already playing, pause it
   * If paused, resume it
   * If different ayah or stopped, start playing the new ayah
   */
  async togglePlayPause(
    surahNumber: number,
    ayahNumber: number,
    options?: {
      reciterId?: ReciterId;
      rate?: number;
      onComplete?: () => void;
      onError?: (error: Error) => void;
      onStateChange?: (state: AudioState) => void;
    }
  ): Promise<void> {
    const isSameAyah = this.currentSurah === surahNumber && this.currentAyah === ayahNumber;

    if (isSameAyah && this.audioState === 'playing') {
      // Pause current playback
      await this.pause();
      options?.onStateChange?.('paused');
    } else if (isSameAyah && this.audioState === 'paused') {
      // Resume current playback
      await this.resume();
      options?.onStateChange?.('playing');
    } else {
      // Play new ayah
      await this.playAyah(surahNumber, ayahNumber, options);
    }
  }

  /**
   * Play an ayah
   */
  async playAyah(
    surahNumber: number,
    ayahNumber: number,
    options?: {
      reciterId?: ReciterId;
      rate?: number;
      onComplete?: () => void;
      onError?: (error: Error) => void;
      onStateChange?: (state: AudioState) => void;
    },
    retryCount = 0
  ): Promise<void> {
    // Prevent race conditions
    if (this.isTransitioning) {
      return;
    }
    this.isTransitioning = true;

    try {
      // Stop any current playback first
      await this.stop();

      // Periodically reset audio configuration to prevent accumulating issues
      this.playCount++;
      if (this.playCount > 20) {
        this.isAudioConfigured = false;
        this.playCount = 0;
      }

      // Configure audio session (only done once, failures are non-fatal)
      await this.configureAudio().catch(() => {
        // Audio config failure is non-fatal, playback may still work
      });

      // Update state to loading
      this.audioState = 'loading';
      this.currentSurah = surahNumber;
      this.currentAyah = ayahNumber;
      options?.onStateChange?.('loading');

      const url = this.getAyahAudioUrl(surahNumber, ayahNumber, options?.reciterId);
      const rate = options?.rate || this.playbackRate;

      // Store the callbacks
      this.onCompleteCallback = options?.onComplete || null;
      this.onErrorCallback = options?.onError || null;
      this.onStateChangeCallback = options?.onStateChange || null;

      // Create new audio player
      this.player = createAudioPlayer(url);

      // Set playback rate
      this.player.setPlaybackRate(rate);

      // Listen for playback status
      this.statusSubscription = this.player.addListener('playbackStatusUpdate', (status) => {
        // Update loading state when audio is loaded
        if (status.isLoaded && this.audioState === 'loading') {
          this.audioState = 'playing';
          options?.onStateChange?.('playing');
        }

        // Update playing/paused state
        if (status.isLoaded) {
          if (status.playing && this.audioState !== 'playing') {
            this.audioState = 'playing';
          } else if (!status.playing && this.audioState === 'playing') {
            // Check if finished or just paused
            const isFinished = status.currentTime > 0 && status.currentTime >= (status.duration || 0) - 0.1;
            if (isFinished) {
              // Store callback before cleanup
              const completeCallback = this.onCompleteCallback;

              // Release player resources immediately when finished
              this.releasePlayer();

              this.audioState = 'idle';
              this.currentSurah = null;
              this.currentAyah = null;
              options?.onStateChange?.('idle');
              completeCallback?.();
            }
          }
        }

        if (this.onPlaybackStatusUpdate) {
          this.onPlaybackStatusUpdate({
            isLoading: !status.isLoaded,
            isPlaying: status.playing,
            isPaused: status.isLoaded && !status.playing && this.audioState === 'paused',
            isLoaded: status.isLoaded,
            positionMillis: status.currentTime * 1000,
            durationMillis: (status.duration || 0) * 1000,
            didJustFinish: !status.playing && status.currentTime > 0 && status.currentTime >= (status.duration || 0) - 0.1,
          });
        }
      });

      // Start playing with error handling
      try {
        this.player.play();
      } catch (playError) {
        // If play fails, clean up and retry
        if (retryCount < 2) {
          this.releasePlayer();
          this.isTransitioning = false;
          await new Promise(resolve => setTimeout(resolve, 100));
          return this.playAyah(surahNumber, ayahNumber, options, retryCount + 1);
        }
        throw playError;
      }

      this.isTransitioning = false;
    } catch (error) {
      // Clean up any partially created player
      this.releasePlayer();
      this.isTransitioning = false;

      // Check if it's a session error and retry silently
      const errorMessage = (error as Error)?.message || '';
      if ((errorMessage.includes('Session') || errorMessage.includes('OSStatus') || errorMessage.includes('UnexpectedException')) && retryCount < 3) {
        // Reset audio configuration flag to force reconfiguration
        this.isAudioConfigured = false;
        // Wait a bit and retry
        await new Promise(resolve => setTimeout(resolve, 300 * (retryCount + 1)));
        return this.playAyah(surahNumber, ayahNumber, options, retryCount + 1);
      }

      // Only log error after all retries have failed
      if (retryCount >= 3) {
        console.error('Audio playback failed after retries:', errorMessage);
      }

      this.audioState = 'idle';
      this.currentSurah = null;
      this.currentAyah = null;
      options?.onStateChange?.('idle');
      options?.onError?.(error as Error);
      this.onErrorCallback?.(error as Error);
    }
  }

  /**
   * Play multiple ayahs in sequence
   */
  async playAyahRange(
    surahNumber: number,
    startAyah: number,
    endAyah: number,
    options?: {
      reciterId?: ReciterId;
      rate?: number;
      repeatCount?: number;
      onAyahChange?: (ayahNumber: number) => void;
      onComplete?: () => void;
      onError?: (error: Error) => void;
      onStateChange?: (state: AudioState) => void;
    }
  ): Promise<void> {
    const repeatCount = options?.repeatCount || 1;

    this.stoppedByUser = false;

    for (let repeat = 0; repeat < repeatCount; repeat++) {
      for (let ayah = startAyah; ayah <= endAyah; ayah++) {
        if (this.stoppedByUser) {
          // Playback was stopped by user
          return;
        }

        options?.onAyahChange?.(ayah);

        await new Promise<void>((resolve, reject) => {
          this.playAyah(surahNumber, ayah, {
            reciterId: options?.reciterId,
            rate: options?.rate,
            onComplete: resolve,
            onError: reject,
            onStateChange: options?.onStateChange,
          });
        });

        // Small gap between ayahs
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    options?.onComplete?.();
  }

  /**
   * Pause playback
   */
  async pause(): Promise<void> {
    if (this.player && this.audioState === 'playing') {
      this.player.pause();
      this.audioState = 'paused';
    }
  }

  /**
   * Resume playback
   */
  async resume(): Promise<void> {
    if (this.player && this.audioState === 'paused') {
      this.player.play();
      this.audioState = 'playing';
    }
  }

  /**
   * Release player resources without clearing all state
   */
  private releasePlayer(): void {
    // Remove subscription first to prevent any further updates
    if (this.statusSubscription) {
      this.statusSubscription.remove();
      this.statusSubscription = null;
    }

    // Release the player
    if (this.player) {
      try {
        this.player.pause();
      } catch {
        // Ignore pause errors
      }
      try {
        this.player.remove();
      } catch {
        // Ignore remove errors
      }
      this.player = null;
    }
  }

  /**
   * Stop playback and release
   */
  async stop(): Promise<void> {
    // Notify the current listener that audio was stopped
    const stateCallback = this.onStateChangeCallback;

    // Release player resources
    this.releasePlayer();

    // Reset all state
    this.audioState = 'idle';
    this.currentSurah = null;
    this.currentAyah = null;
    this.onCompleteCallback = null;
    this.onErrorCallback = null;
    this.onStateChangeCallback = null;

    // Call the callback after clearing to notify UI
    stateCallback?.('idle');
  }

  /**
   * Reset the audio service completely (use if audio stops working)
   */
  async reset(): Promise<void> {
    await this.stop();
    this.isAudioConfigured = false;
    this.configurationInProgress = false;
    // Re-configure audio session
    await this.warmUp();
  }

  /**
   * Get current audio state
   */
  getAudioState(): AudioState {
    return this.audioState;
  }

  /**
   * Get current playing ayah info
   */
  getCurrentAyah(): { surah: number; ayah: number } | null {
    if (this.currentSurah && this.currentAyah) {
      return { surah: this.currentSurah, ayah: this.currentAyah };
    }
    return null;
  }

  /**
   * Check if a specific ayah is currently active (playing, paused, or loading)
   */
  isAyahActive(surahNumber: number, ayahNumber: number): boolean {
    return this.currentSurah === surahNumber && this.currentAyah === ayahNumber;
  }

  /**
   * Set playback rate (0.5 to 2.0)
   */
  async setRate(rate: number): Promise<void> {
    this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    if (this.player) {
      this.player.setPlaybackRate(this.playbackRate);
    }
  }

  /**
   * Set current reciter
   */
  setReciter(reciterId: ReciterId): void {
    this.currentReciter = reciterId;
  }

  /**
   * Get current reciter
   */
  getReciter(): ReciterId {
    return this.currentReciter;
  }

  /**
   * Get all available reciters
   */
  getAvailableReciters() {
    return Object.values(QURAN_RECITERS);
  }

  /**
   * Get recommended reciters for learning
   */
  getRecommendedReciters() {
    return Object.values(QURAN_RECITERS).filter((r) => r.recommended);
  }

  /**
   * Check if currently playing
   */
  getIsPlaying(): boolean {
    return this.audioState === 'playing';
  }

  /**
   * Check if currently paused
   */
  getIsPaused(): boolean {
    return this.audioState === 'paused';
  }

  /**
   * Check if currently loading
   */
  getIsLoading(): boolean {
    return this.audioState === 'loading';
  }

  /**
   * Set playback status update callback
   */
  setOnPlaybackStatusUpdate(callback: ((status: PlaybackStatus) => void) | null): void {
    this.onPlaybackStatusUpdate = callback;
  }

  /**
   * Seek to position
   */
  async seekTo(positionMillis: number): Promise<void> {
    if (this.player) {
      await this.player.seekTo(positionMillis / 1000);
    }
  }

  /**
   * Initialize audio session silently (call on app start)
   * This pre-configures the audio session to avoid delays on first play
   */
  async warmUp(): Promise<void> {
    // Try to configure audio silently - failures are expected on simulators
    await this.configureAudio().catch(() => {
      // Silently ignore - audio will be configured on first play
    });
  }
}

export interface PlaybackStatus {
  isLoading: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isLoaded: boolean;
  positionMillis: number;
  durationMillis: number;
  didJustFinish: boolean;
}

// Export singleton instance
export const quranAudioService = new QuranAudioService();

// Export class for testing
export { QuranAudioService };
