import { useState, useCallback, useEffect } from 'react';
import { audioService, VoiceGender } from '../services/audioService';
import { useSettingsStore } from '../stores/settingsStore';
import {
  setArabicVoicePreference,
  listArabicDeviceVoices,
  type ArabicDeviceVoice,
  type ArabicVoiceSource,
} from '../services/speech/arabicTTS';

// Speed options offered by the numbered speed control.
export const ARABIC_SPEECH_SPEEDS = [0.75, 1.0, 1.25, 1.5] as const;

interface UseArabicSpeechReturn {
  speak: (text: string) => Promise<void>;
  speakSlow: (text: string) => Promise<void>;
  stop: () => Promise<void>;
  isSpeaking: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  voiceGender: VoiceGender;
  setVoiceGender: (gender: VoiceGender) => void;
  swapVoices: () => void;
  hasMultipleVoices: boolean;
  /** 'online' (fetched, device as fallback) or a voice installed on the phone. */
  voiceSource: ArabicVoiceSource;
  deviceVoiceId: string | null;
  setArabicVoice: (source: ArabicVoiceSource, voiceId?: string | null) => void;
  listDeviceVoices: () => Promise<ArabicDeviceVoice[]>;
}

export function useArabicSpeech(): UseArabicSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceGender, setVoiceGenderState] = useState<VoiceGender>(audioService.getVoiceGender());
  const [hasMultipleVoices, setHasMultipleVoices] = useState(true);

  // Global, persisted playback speed (1.0 = natural).
  const speed = useSettingsStore((s) => s.arabicSpeechSpeed);
  const setSpeed = useSettingsStore((s) => s.setArabicSpeechSpeed);

  // Persisted voice choice, handed to the speech service whenever it changes
  // so the next utterance uses it. The service reads nothing from the store
  // itself; this is the one place the two meet.
  const voiceSource = useSettingsStore((s) => s.arabicVoiceSource);
  const deviceVoiceId = useSettingsStore((s) => s.arabicDeviceVoiceId);
  const setArabicVoice = useSettingsStore((s) => s.setArabicVoice);
  useEffect(() => {
    setArabicVoicePreference({ source: voiceSource, voiceId: deviceVoiceId });
  }, [voiceSource, deviceVoiceId]);

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
    setVoiceGenderState(prev => prev);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text) return;
    setIsSpeaking(true);
    await audioService.speakArabic({
      text,
      rate: speed,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  }, [speed]);

  // Kept for backward compatibility — a touch slower than the chosen speed.
  const speakSlow = useCallback(async (text: string) => {
    if (!text) return;
    setIsSpeaking(true);
    await audioService.speakArabic({
      text,
      rate: Math.max(0.5, speed * 0.7),
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  }, [speed]);

  const stop = useCallback(async () => {
    await audioService.stop();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    speakSlow,
    stop,
    isSpeaking,
    speed,
    setSpeed,
    voiceGender,
    setVoiceGender,
    swapVoices,
    hasMultipleVoices,
    voiceSource,
    deviceVoiceId,
    setArabicVoice,
    listDeviceVoices: listArabicDeviceVoices,
  };
}

export default useArabicSpeech;
export type { VoiceGender, ArabicDeviceVoice, ArabicVoiceSource };
