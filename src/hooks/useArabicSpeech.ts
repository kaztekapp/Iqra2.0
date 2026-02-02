import { useState, useCallback, useEffect } from 'react';
import { audioService } from '../services/audioService';

interface UseArabicSpeechReturn {
  speak: (text: string) => Promise<void>;
  speakSlow: (text: string) => Promise<void>;
  stop: () => Promise<void>;
  isSpeaking: boolean;
}

export function useArabicSpeech(): UseArabicSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(async (text: string) => {
    if (!text) return;
    setIsSpeaking(true);
    await audioService.speakArabic({
      text,
      rate: 0.45,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  }, []);

  const speakSlow = useCallback(async (text: string) => {
    if (!text) return;
    setIsSpeaking(true);
    await audioService.speakArabic({
      text,
      rate: 0.3,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  }, []);

  const stop = useCallback(async () => {
    await audioService.stop();
    setIsSpeaking(false);
  }, []);

  return { speak, speakSlow, stop, isSpeaking };
}

export default useArabicSpeech;
