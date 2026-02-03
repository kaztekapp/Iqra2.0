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

  // Preprocess Arabic text to help TTS read diacritics correctly
  private preprocessArabicText(text: string): string {
    // Arabic diacritics (harakat)
    const FATHA = '\u064E';      // ـَ
    const KASRA = '\u0650';      // ـِ
    const DAMMA = '\u064F';      // ـُ
    const SUKUN = '\u0652';      // ـْ
    const SHADDA = '\u0651';     // ـّ
    const FATHATAN = '\u064B';   // ـً
    const KASRATAN = '\u064D';   // ـٍ
    const DAMMATAN = '\u064C';   // ـٌ

    let trimmedText = text.trim();
    if (!trimmedText) return text;

    // Special handling for common words with shadda
    // Replace الله variants with phonetic spelling for proper TTS pronunciation
    // الله (Allah) - the doubled lam needs to be explicit

    // اللهم (Allahumma) - must be processed BEFORE الله to avoid partial replacement
    // Insert space to force TTS to pronounce "Al" then "lahumma" separately
    trimmedText = trimmedText.replace(/اللَّهُمَّ/g, 'أَلْ لَهُمَّ');  // Allahumma (with diacritics)
    trimmedText = trimmedText.replace(/اللهم/g, 'أَلْ لَهُمَّ');       // Allahumma (without diacritics)

    // الله (Allah) variants
    trimmedText = trimmedText.replace(/اللَّهِ/g, 'اَللاهِ');  // Allahi
    trimmedText = trimmedText.replace(/اللَّهُ/g, 'اَللاهُ');  // Allahu
    trimmedText = trimmedText.replace(/اللَّهَ/g, 'اَللاهَ');  // Allaha
    trimmedText = trimmedText.replace(/الله/g, 'اَللاه');     // Allah (without diacritics)
    trimmedText = trimmedText.replace(/لِلَّهِ/g, 'لِلَّاهِ');   // lillahi (lil-lahi)

    // Fix عَلَىٰ عَهْدِكَ ('ala 'ahdika) - TTS adds extra "kha" sound
    // Replace entire phrase with phonetically cleaner version
    trimmedText = trimmedText.replace(/عَلَىٰ عَهْدِكَ/g, 'عَلا أَهْدِكَ');
    trimmedText = trimmedText.replace(/عَلَى عَهْدِكَ/g, 'عَلا أَهْدِكَ');
    // Also fix standalone عَهْدِكَ
    trimmedText = trimmedText.replace(/عَهْدِكَ/g, 'أَهْدِكَ');
    trimmedText = trimmedText.replace(/عَهْدِك/g, 'أَهْدِك');

    // Get the last few characters to check ending
    const lastChar = trimmedText[trimmedText.length - 1];
    const lastTwoChars = trimmedText.slice(-2);

    // Check if text is very short (1-3 characters including diacritics)
    // This typically means it's a single letter with vowel marks
    const withoutDiacritics = trimmedText.replace(/[\u064B-\u065F\u0670]/g, '');

    if (withoutDiacritics.length <= 2) {
      // For single letters with diacritics, add a helping structure
      // This makes TTS engines pronounce the vowel properly

      // Check what vowel is present
      if (trimmedText.includes(FATHA) || trimmedText.includes(FATHATAN)) {
        // Add alif to extend the 'a' sound: بَ becomes بَا (baa)
        return trimmedText + 'ا';
      } else if (trimmedText.includes(KASRA) || trimmedText.includes(KASRATAN)) {
        // Add ya to extend the 'i' sound: بِ becomes بِي (bee)
        return trimmedText + 'ي';
      } else if (trimmedText.includes(DAMMA) || trimmedText.includes(DAMMATAN)) {
        // Add waw to extend the 'u' sound: بُ becomes بُو (boo)
        return trimmedText + 'و';
      } else if (trimmedText.includes(SUKUN)) {
        // For sukun, add a short vowel before to make it pronounceable
        // بْ becomes اَبْ (ab)
        return 'اَ' + trimmedText;
      } else if (trimmedText.includes(SHADDA)) {
        // For shadda alone, add fatha to make it clear
        return trimmedText + FATHA + 'ا';
      }
    }

    // For longer words: check if the word ends with a short vowel
    // TTS engines often drop final short vowels (pausal form)
    // We extend them to make the vowel audible

    // Check if ends with fatha (most common case like كَتَبَ)
    if (lastChar === FATHA) {
      // Add a soft alif to extend: كَتَبَ becomes كَتَبَا (katabaa - but sounds like kataba)
      return trimmedText + 'ا';
    }

    // Check if ends with kasra
    if (lastChar === KASRA) {
      // Add ya to extend the 'i' sound
      return trimmedText + 'ي';
    }

    // Check if ends with damma
    if (lastChar === DAMMA) {
      // Add waw to extend the 'u' sound
      return trimmedText + 'و';
    }

    // Check if ends with shadda + vowel (like حَقّ or رَبّ)
    if (lastTwoChars[0] === SHADDA) {
      if (lastChar === FATHA) {
        return trimmedText + 'ا';
      } else if (lastChar === KASRA) {
        return trimmedText + 'ي';
      } else if (lastChar === DAMMA) {
        return trimmedText + 'و';
      }
    }

    // Check if ends with ta marbuta (ة) + tanween
    // Ta marbuta should be pronounced as "t" when followed by tanween
    const TA_MARBUTA = '\u0629';  // ة
    const lastThreeChars = trimmedText.slice(-3);

    // Check for ta marbuta + tanween pattern
    if (lastThreeChars.length >= 2) {
      const secondToLast = trimmedText[trimmedText.length - 2];

      if (secondToLast === TA_MARBUTA || lastTwoChars[0] === TA_MARBUTA) {
        // Replace ة + tanween with ت + vowel + noon
        if (lastChar === DAMMATAN) {
          return trimmedText.slice(0, -2) + 'تُنْ';
        } else if (lastChar === KASRATAN) {
          return trimmedText.slice(0, -2) + 'تِنْ';
        } else if (lastChar === FATHATAN) {
          return trimmedText.slice(0, -2) + 'تَنْ';
        }
      }
    }

    // Check if ends with tanween (nunation) on regular letters
    // Replace tanween with vowel + noon for proper pronunciation

    // Dammatan (ـٌ) = "un" sound
    if (lastChar === DAMMATAN) {
      return trimmedText.slice(0, -1) + DAMMA + 'نْ';
    }

    // Kasratan (ـٍ) = "in" sound
    if (lastChar === KASRATAN) {
      return trimmedText.slice(0, -1) + KASRA + 'نْ';
    }

    // Fathatan (ـً) = "an" sound
    if (lastChar === FATHATAN) {
      return trimmedText.slice(0, -1) + FATHA + 'نْ';
    }

    return trimmedText;
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

      // Preprocess text to handle single letters with diacritics
      const processedText = this.preprocessArabicText(text);

      const speechOptions: Speech.SpeechOptions = {
        language: 'ar-SA',
        rate: rate,
        pitch: 1.0,
        onStart: () => console.log('Speaking:', text, '-> processed:', processedText),
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

      Speech.speak(processedText, speechOptions);
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
