import { useState, useCallback, useEffect } from 'react';
import { audioService, VoiceGender } from '../services/audioService';

interface UseArabicSpeechReturn {
  speak: (text: string) => Promise<void>;
  speakSlow: (text: string) => Promise<void>;
  stop: () => Promise<void>;
  isSpeaking: boolean;
  voiceGender: VoiceGender;
  setVoiceGender: (gender: VoiceGender) => void;
  swapVoices: () => void;
  hasMultipleVoices: boolean;
}

export function useArabicSpeech(): UseArabicSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceGender, setVoiceGenderState] = useState<VoiceGender>(audioService.getVoiceGender());
  const [hasMultipleVoices, setHasMultipleVoices] = useState(true); // Assume true initially

  // Initialize and check voice availability
  useEffect(() => {
    audioService.initializeAndGetVoiceInfo().then(info => {
      setHasMultipleVoices(info.hasMultipleVoices);
    });
  }, []);

  const setVoiceGender = useCallback((gender: VoiceGender) => {
    audioService.setVoiceGender(gender);
    setVoiceGenderState(gender);
  }, []);

  const swapVoices = useCallback(() => {
    audioService.swapVoices();
    // Force a re-render by toggling the gender
    setVoiceGenderState(prev => prev);
  }, []);

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

  return { speak, speakSlow, stop, isSpeaking, voiceGender, setVoiceGender, swapVoices, hasMultipleVoices };
}

export default useArabicSpeech;
export type { VoiceGender };
