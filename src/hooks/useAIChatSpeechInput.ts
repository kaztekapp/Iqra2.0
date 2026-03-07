import { useState, useCallback, useRef } from 'react';
import { useSettingsStore } from '../stores/settingsStore';

// Try to import expo-speech-recognition (same guard as useSpeechRecognition)
let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent: any = null;

try {
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch {
  // Module not available
}

/**
 * Voice dictation hook for the AI chat input.
 * Unlike useSpeechRecognition, this does free dictation (no expected text comparison).
 * Listens in the user's UI language (en-US or fr-FR), not Arabic.
 */
export function useAIChatSpeechInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const onTranscriptRef = useRef<((text: string) => void) | null>(null);

  const isSupported = !!ExpoSpeechRecognitionModule;

  // Register event handlers (must be called unconditionally as per hooks rules)
  useSpeechRecognitionEvent?.('result', (event: any) => {
    const text = event.results[0]?.transcript || '';
    setTranscript(text);

    if (event.isFinal && text && onTranscriptRef.current) {
      onTranscriptRef.current(text);
    }
  });

  useSpeechRecognitionEvent?.('error', (event: any) => {
    setIsListening(false);
    setError(event.error || 'Recognition failed');
  });

  useSpeechRecognitionEvent?.('end', () => {
    setIsListening(false);
  });

  const startListening = useCallback(
    async (onResult: (text: string) => void) => {
      if (!ExpoSpeechRecognitionModule) {
        setError('Speech recognition requires a development build');
        return;
      }

      try {
        const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!granted) {
          setError('Microphone permission denied');
          return;
        }

        onTranscriptRef.current = onResult;
        setIsListening(true);
        setTranscript('');
        setError(null);

        // Use the user's UI language for dictation
        const language = useSettingsStore.getState().language;
        const lang = language === 'fr' ? 'fr-FR' : 'en-US';

        await ExpoSpeechRecognitionModule.start({
          lang,
          interimResults: true,
          maxAlternatives: 1,
          continuous: true,
          requiresOnDeviceRecognition: false,
        });
      } catch (e) {
        setIsListening(false);
        setError('Failed to start recognition');
      }
    },
    []
  );

  const stopListening = useCallback(async () => {
    try {
      await ExpoSpeechRecognitionModule?.stop();
    } catch {
      // ignore
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
  };
}
