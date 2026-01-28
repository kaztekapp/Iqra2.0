import * as Speech from 'expo-speech';
import { setAudioModeAsync } from 'expo-audio';

interface SpeakOptions {
  text: string;
  rate?: number;
  onDone?: () => void;
  onError?: (error: any) => void;
}

class AudioService {
  private isSpeaking: boolean = false;
  private audioConfigured: boolean = false;
  private bestVoice: string | null = null;
  private voiceInitialized: boolean = false;

  private async configureAudio(): Promise<void> {
    if (this.audioConfigured) return;

    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
      });
      this.audioConfigured = true;
    } catch (error) {
      console.log('Audio config error:', error);
    }
  }

  // Find the best Arabic voice available
  private async findBestVoice(): Promise<void> {
    if (this.voiceInitialized) return;

    try {
      const voices = await Speech.getAvailableVoicesAsync();

      // Filter Arabic voices
      const arabicVoices = voices.filter(v =>
        v.language.startsWith('ar') || v.language.includes('Arab')
      );

      console.log('Arabic voices found:', arabicVoices.length);
      arabicVoices.forEach(v => {
        console.log(`  - ${v.identifier} (${v.language}) quality: ${v.quality}`);
      });

      // Priority order for voice selection:
      // 1. Enhanced quality voices (downloaded high-quality voices)
      // 2. Default quality voices
      // 3. Compact voices (avoid if possible)
      // 4. Super-compact voices (last resort)

      const enhancedVoice = arabicVoices.find(v =>
        v.quality === 'Enhanced' ||
        v.identifier.includes('premium') ||
        v.identifier.includes('enhanced')
      );

      const defaultVoice = arabicVoices.find(v =>
        v.quality === 'Default' &&
        !v.identifier.includes('compact')
      );

      const anyNonCompact = arabicVoices.find(v =>
        !v.identifier.includes('compact')
      );

      const compactVoice = arabicVoices.find(v =>
        v.identifier.includes('compact') &&
        !v.identifier.includes('super-compact')
      );

      // Select best available
      const selected = enhancedVoice || defaultVoice || anyNonCompact || compactVoice || arabicVoices[0];

      if (selected) {
        this.bestVoice = selected.identifier;
        console.log('Selected voice:', selected.identifier, 'Quality:', selected.quality);
      } else {
        console.log('No Arabic voice found, using system default');
      }

      this.voiceInitialized = true;
    } catch (error) {
      console.log('Voice search error:', error);
      this.voiceInitialized = true;
    }
  }

  async speakArabic(options: SpeakOptions): Promise<void> {
    const { text, rate = 0.75, onDone, onError } = options;

    if (!text || text.trim() === '') return;

    await this.configureAudio();
    await this.findBestVoice();

    if (this.isSpeaking) {
      await this.stop();
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      this.isSpeaking = true;

      const speechOptions: Speech.SpeechOptions = {
        language: 'ar-SA',
        rate: rate,
        pitch: 1.0,
        onStart: () => console.log('Speaking:', text),
        onDone: () => {
          this.isSpeaking = false;
          onDone?.();
        },
        onError: (error) => {
          console.log('TTS error:', error);
          this.isSpeaking = false;
          onError?.(error);
        },
      };

      // Use the best voice if found
      if (this.bestVoice) {
        speechOptions.voice = this.bestVoice;
      }

      Speech.speak(text, speechOptions);
    } catch (error) {
      console.log('Speak error:', error);
      this.isSpeaking = false;
      onError?.(error);
    }
  }

  async speakSlow(text: string): Promise<void> {
    return this.speakArabic({ text, rate: 0.5 });
  }

  async speakNormal(text: string): Promise<void> {
    return this.speakArabic({ text, rate: 0.75 });
  }

  async stop(): Promise<void> {
    try {
      await Speech.stop();
    } catch (error) {
      console.log('Stop error:', error);
    }
    this.isSpeaking = false;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      return voices.some(voice => voice.language.startsWith('ar'));
    } catch {
      return false;
    }
  }

  // For debugging - list all Arabic voices
  async listArabicVoices(): Promise<void> {
    const voices = await Speech.getAvailableVoicesAsync();
    const arabic = voices.filter(v => v.language.startsWith('ar'));
    console.log('=== Available Arabic Voices ===');
    arabic.forEach(v => {
      console.log(`${v.name || v.identifier}`);
      console.log(`  ID: ${v.identifier}`);
      console.log(`  Language: ${v.language}`);
      console.log(`  Quality: ${v.quality}`);
      console.log('---');
    });
  }

  async testAudioOutput(): Promise<void> {
    try {
      await this.configureAudio();
      // Test audio using TTS
      Speech.speak('Test', { language: 'en-US', rate: 1.0 });
    } catch (error) {
      console.log('Audio test error:', error);
    }
  }

  async testEnglish(): Promise<void> {
    await this.configureAudio();
    Speech.speak('Hello, testing audio', {
      language: 'en-US',
      rate: 0.8,
    });
  }
}

export const audioService = new AudioService();
export default audioService;
