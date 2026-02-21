import { useState, useCallback, useEffect, useRef } from 'react';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  AudioModule,
  createAudioPlayer,
} from 'expo-audio';

interface RecordingState {
  isRecording: boolean;
  isPlaying: boolean;
  recordingUri: string | null;
  duration: number;
  error: string | null;
}

export function useVoiceRecording() {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    isPlaying: false,
    recordingUri: null,
    duration: 0,
    error: null,
  });

  const playerRef = useRef<ReturnType<typeof createAudioPlayer> | null>(null);
  const playbackCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Create recorder with high quality preset
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 100);

  // Update state based on recorder state
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isRecording: recorderState.isRecording,
      duration: recorderState.durationMillis,
    }));
  }, [recorderState.isRecording, recorderState.durationMillis]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playbackCheckRef.current) {
        clearInterval(playbackCheckRef.current);
      }
      if (playerRef.current) {
        playerRef.current.remove();
      }
    };
  }, []);

  const requestPermissions = async (): Promise<boolean> => {
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      return status.granted;
    } catch (error) {
      setState((prev) => ({ ...prev, error: 'Failed to request permissions' }));
      return false;
    }
  };

  const startRecording = useCallback(async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setState((prev) => ({ ...prev, error: 'Microphone permission denied' }));
        return;
      }

      // Stop any existing playback
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.remove();
        playerRef.current = null;
      }

      // Prepare and start recording
      await recorder.prepareToRecordAsync();
      recorder.record();

      setState((prev) => ({
        ...prev,
        recordingUri: null,
        error: null,
      }));
    } catch (error) {
      __DEV__ && console.error('Failed to start recording:', error);
      setState((prev) => ({ ...prev, error: 'Failed to start recording' }));
    }
  }, [recorder]);

  const stopRecording = useCallback(async () => {
    try {
      await recorder.stop();
      const uri = recorder.uri;

      setState((prev) => ({
        ...prev,
        recordingUri: uri,
      }));
    } catch (error) {
      __DEV__ && console.error('Failed to stop recording:', error);
      setState((prev) => ({
        ...prev,
        error: 'Failed to stop recording',
      }));
    }
  }, [recorder]);

  const playRecording = useCallback(async () => {
    try {
      if (!state.recordingUri) return;

      // Clean up any existing player
      if (playerRef.current) {
        playerRef.current.remove();
      }

      setState((prev) => ({ ...prev, isPlaying: true }));

      const player = createAudioPlayer({ uri: state.recordingUri });
      playerRef.current = player;

      player.play();

      // Listen for playback completion
      playbackCheckRef.current = setInterval(() => {
        if (playerRef.current && !playerRef.current.playing) {
          if (playbackCheckRef.current) {
            clearInterval(playbackCheckRef.current);
            playbackCheckRef.current = null;
          }
          setState((prev) => ({ ...prev, isPlaying: false }));
        }
      }, 100);
    } catch (error) {
      __DEV__ && console.error('Failed to play recording:', error);
      setState((prev) => ({ ...prev, isPlaying: false, error: 'Failed to play recording' }));
    }
  }, [state.recordingUri]);

  const stopPlayback = useCallback(async () => {
    try {
      if (playbackCheckRef.current) {
        clearInterval(playbackCheckRef.current);
        playbackCheckRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.pause();
        setState((prev) => ({ ...prev, isPlaying: false }));
      }
    } catch (error) {
      __DEV__ && console.error('Failed to stop playback:', error);
    }
  }, []);

  const clearRecording = useCallback(() => {
    setState((prev) => ({
      ...prev,
      recordingUri: null,
      duration: 0,
    }));
  }, []);

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    ...state,
    formattedDuration: formatDuration(state.duration),
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    clearRecording,
  };
}
