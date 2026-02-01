import { useState, useCallback, useEffect, useRef } from 'react';

// Try to import expo-speech-recognition, but handle if it's not available
let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent: any = null;

try {
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch (error) {
  // Module not available (e.g., in Expo Go)
  console.log('expo-speech-recognition not available, using fallback mode');
}

interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  isFallbackMode: boolean;
}

// Arabic text normalization for comparison
function normalizeArabicText(text: string): string {
  return text
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u0652\u0670]/g, '')
    // Remove tatweel (kashida)
    .replace(/\u0640/g, '')
    // Normalize alef variants
    .replace(/[\u0622\u0623\u0625\u0627]/g, '\u0627')
    // Normalize taa marbuta to haa
    .replace(/\u0629/g, '\u0647')
    // Normalize yaa variants
    .replace(/[\u0649\u064A]/g, '\u064A')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Calculate similarity between two Arabic strings
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeArabicText(str1);
  const s2 = normalizeArabicText(str2);

  if (s1 === s2) return 100;
  if (s1.length === 0 || s2.length === 0) return 0;

  // Check if one contains the other
  if (s1.includes(s2) || s2.includes(s1)) {
    const minLen = Math.min(s1.length, s2.length);
    const maxLen = Math.max(s1.length, s2.length);
    return Math.round((minLen / maxLen) * 100);
  }

  // Levenshtein distance based similarity
  const matrix: number[][] = [];

  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[s1.length][s2.length];
  const maxLen = Math.max(s1.length, s2.length);
  return Math.round(((maxLen - distance) / maxLen) * 100);
}

export interface PronunciationResult {
  isCorrect: boolean;
  similarity: number;
  transcript: string;
  feedback: string;
}

// Fallback hook for when native module is not available
function useSpeechRecognitionFallback() {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    error: null,
    isSupported: false,
    isFallbackMode: true,
  });

  const startListening = useCallback(
    async (
      _expectedText: string,
      _onResult: (result: PronunciationResult) => void
    ) => {
      setState((prev) => ({ ...prev, error: 'Speech recognition requires a development build' }));
    },
    []
  );

  const stopListening = useCallback(async () => {}, []);
  const checkSupport = useCallback(async () => false, []);

  return {
    ...state,
    startListening,
    stopListening,
    checkSupport,
  };
}

// Native speech recognition hook
function useSpeechRecognitionNative() {
  const [state, setState] = useState<SpeechRecognitionState>({
    isListening: false,
    transcript: '',
    error: null,
    isSupported: true,
    isFallbackMode: false,
  });

  const expectedTextRef = useRef<string>('');
  const onResultRef = useRef<((result: PronunciationResult) => void) | null>(null);

  // Handle speech recognition results
  useSpeechRecognitionEvent?.('result', (event: any) => {
    const transcript = event.results[0]?.transcript || '';
    setState((prev) => ({ ...prev, transcript }));

    if (event.isFinal && expectedTextRef.current && onResultRef.current) {
      const similarity = calculateSimilarity(transcript, expectedTextRef.current);
      const isCorrect = similarity >= 70;

      let feedback = '';
      if (similarity >= 90) {
        feedback = 'Excellent pronunciation!';
      } else if (similarity >= 70) {
        feedback = 'Good job! Keep practicing.';
      } else if (similarity >= 50) {
        feedback = 'Almost there! Try again.';
      } else {
        feedback = 'Keep practicing! Listen to the example again.';
      }

      onResultRef.current({
        isCorrect,
        similarity,
        transcript,
        feedback,
      });
    }
  });

  useSpeechRecognitionEvent?.('error', (event: any) => {
    console.error('Speech recognition error:', event.error);
    setState((prev) => ({
      ...prev,
      isListening: false,
      error: event.error || 'Recognition failed',
    }));
  });

  useSpeechRecognitionEvent?.('end', () => {
    setState((prev) => ({ ...prev, isListening: false }));
  });

  const startListening = useCallback(
    async (
      expectedText: string,
      onResult: (result: PronunciationResult) => void
    ) => {
      try {
        const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!granted) {
          setState((prev) => ({ ...prev, error: 'Microphone permission denied' }));
          return;
        }

        expectedTextRef.current = expectedText;
        onResultRef.current = onResult;

        setState((prev) => ({
          ...prev,
          isListening: true,
          transcript: '',
          error: null,
        }));

        await ExpoSpeechRecognitionModule.start({
          lang: 'ar-SA',
          interimResults: true,
          maxAlternatives: 1,
          continuous: false,
          requiresOnDeviceRecognition: false,
        });
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setState((prev) => ({
          ...prev,
          isListening: false,
          error: 'Failed to start recognition',
        }));
      }
    },
    []
  );

  const stopListening = useCallback(async () => {
    try {
      await ExpoSpeechRecognitionModule?.stop();
      setState((prev) => ({ ...prev, isListening: false }));
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  }, []);

  const checkSupport = useCallback(async () => {
    try {
      const isAvailable = await ExpoSpeechRecognitionModule?.isRecognitionAvailable();
      setState((prev) => ({ ...prev, isSupported: isAvailable }));
      return isAvailable;
    } catch {
      setState((prev) => ({ ...prev, isSupported: false }));
      return false;
    }
  }, []);

  useEffect(() => {
    checkSupport();
  }, [checkSupport]);

  return {
    ...state,
    startListening,
    stopListening,
    checkSupport,
  };
}

// Main hook that selects the appropriate implementation
export function useSpeechRecognition() {
  // Check if native module is available
  if (!ExpoSpeechRecognitionModule) {
    return useSpeechRecognitionFallback();
  }
  return useSpeechRecognitionNative();
}

export { calculateSimilarity, normalizeArabicText };
