import { useState, useCallback, useEffect } from 'react';
import { useAudioPlayer as useExpoAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';

interface UseAudioPlayerReturn {
  play: (uri: string) => Promise<void>;
  stop: () => Promise<void>;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUri, setCurrentUri] = useState<string | null>(null);

  const player = useExpoAudioPlayer(currentUri || undefined);
  const status = useAudioPlayerStatus(player);

  // Update isPlaying based on player status
  useEffect(() => {
    if (status) {
      setIsPlaying(status.playing);
      setIsLoading(status.isBuffering);
    }
  }, [status]);

  const stop = useCallback(async () => {
    try {
      player.pause();
      player.seekTo(0);
    } catch (err) {
      console.log('Error stopping audio:', err);
    }
    setIsPlaying(false);
  }, [player]);

  const play = useCallback(async (uri: string) => {
    try {
      setError(null);
      setIsLoading(true);

      // Configure audio mode
      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
      });

      // Set new source and play
      setCurrentUri(uri);
      player.play();
    } catch (err) {
      console.error('Error playing audio:', err);
      setError('Failed to play audio');
    } finally {
      setIsLoading(false);
    }
  }, [player]);

  return {
    play,
    stop,
    isPlaying,
    isLoading,
    error,
  };
}

// For playing local assets - simplified version using TTS
export function useLocalAudioPlayer(): UseAudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stop = useCallback(async () => {
    setIsPlaying(false);
  }, []);

  const play = useCallback(async (source: any) => {
    try {
      setError(null);
      setIsLoading(true);

      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: 'duckOthers',
      });

      // For local assets, we'd use the expo-audio player
      // This is a simplified implementation
      setIsPlaying(true);

      // Auto-stop after a delay (placeholder)
      setTimeout(() => setIsPlaying(false), 2000);
    } catch (err) {
      console.error('Error playing audio:', err);
      setError('Failed to play audio');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    play,
    stop,
    isPlaying,
    isLoading,
    error,
  };
}
