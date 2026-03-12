import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface Props {
  onSend: (uri: string, durationMs: number) => void;
  onCancel: () => void;
}

export function VoiceRecorder({ onSend, onCancel }: Props) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [durationMs, setDurationMs] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    startRecording();
    return () => {
      stopRecording(true);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) { onCancel(); return; }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: rec } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(rec);
      setIsRecording(true);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        setDurationMs(elapsed);
        if (elapsed >= 60000) { handleSend(); }
      }, 100);
    } catch {
      onCancel();
    }
  };

  const stopRecording = async (discard = false) => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (!recording) return null;
    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      if (discard) return null;
      const uri = recording.getURI();
      return uri;
    } catch {
      return null;
    } finally {
      setRecording(null);
      setIsRecording(false);
    }
  };

  const handleSend = async () => {
    const uri = await stopRecording();
    if (uri) onSend(uri, durationMs);
    else onCancel();
  };

  const handleCancel = async () => {
    await stopRecording(true);
    onCancel();
  };

  const secs = Math.floor(durationMs / 1000);
  const timeStr = `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;
  const maxReached = durationMs >= 55000;

  return (
    <View style={styles.container}>
      <Pressable style={styles.cancelBtn} onPress={handleCancel}>
        <Ionicons name="trash" size={20} color="#ef4444" />
      </Pressable>

      <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]}>
        <View style={styles.recordDot} />
      </Animated.View>

      <Text style={[styles.timer, maxReached && { color: '#ef4444' }]}>{timeStr}</Text>
      <Text style={styles.maxLabel}>{maxReached ? 'Max reached' : '/1:00'}</Text>

      <Pressable style={styles.sendBtn} onPress={handleSend}>
        <Ionicons name="send" size={18} color="#ffffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#0f172a', borderTopWidth: 1, borderTopColor: '#1e293b' },
  cancelBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#ef444420', alignItems: 'center', justifyContent: 'center' },
  pulseCircle: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#ef444440', alignItems: 'center', justifyContent: 'center' },
  recordDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  timer: { fontSize: 18, fontWeight: '700', color: '#ffffff', fontVariant: ['tabular-nums'] },
  maxLabel: { fontSize: 12, color: '#64748b', flex: 1 },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#818cf8', alignItems: 'center', justifyContent: 'center' },
});
