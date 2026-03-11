import { useState, useCallback, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';

// Try to import expo-speech-recognition (requires dev build)
let ExpoSpeechRecognitionModule: any = null;

try {
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
} catch {
  // Module not available (Expo Go or missing native module)
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

  // Register native event listeners while listening
  useEffect(() => {
    if (!isListening || !ExpoSpeechRecognitionModule) return;

    const resultSub = ExpoSpeechRecognitionModule.addListener('result', (event: any) => {
      const text = event.results?.[0]?.transcript || '';
      setTranscript(text);

      if (event.isFinal && text && onTranscriptRef.current) {
        onTranscriptRef.current(text);
      }
    });

    const errorSub = ExpoSpeechRecognitionModule.addListener('error', (event: any) => {
      setIsListening(false);
      setError(event.error || 'Recognition failed');
    });

    const endSub = ExpoSpeechRecognitionModule.addListener('end', () => {
      setIsListening(false);
    });

    return () => {
      resultSub.remove();
      errorSub.remove();
      endSub.remove();
    };
  }, [isListening]);

  const startListening = useCallback(
    async (onResult: (text: string) => void) => {
      if (!ExpoSpeechRecognitionModule) {
        Alert.alert(
          'Development Build Required',
          'Voice input requires a development build. It is not available in Expo Go.',
        );
        return;
      }

      try {
        const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!granted) {
          Alert.alert('Permission Denied', 'Microphone permission is required for voice input.');
          return;
        }

        onTranscriptRef.current = onResult;
        setTranscript('');
        setError(null);
        setIsListening(true);

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
