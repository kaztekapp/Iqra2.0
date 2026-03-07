import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSegments, useGlobalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAIChatStore } from '../../stores/aiChatStore';
import { useAudioPlayerStore } from '../../stores/audioPlayerStore';
import { isInLearnSection, getModuleFromSegments } from '../../services/aiContextService';

export function AIFloatingButton() {
  const segments = useSegments();
  const params = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const { openChat, isOpen } = useAIChatStore();
  const currentlyPlaying = useAudioPlayerStore((s) => s.currentlyPlaying);

  // Pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Only show in Learn Arabic section
  const visible = isInLearnSection(segments as string[]) && !isOpen;
  if (!visible) return null;

  // Position: above tab bar, adjusted if MiniAudioPlayer is showing
  const isInTabs = segments[0] === '(tabs)';
  const tabBarHeight = Platform.OS === 'ios' ? 60 : 60;
  const tabBarPadding = Platform.OS === 'ios' ? 28 : Math.max(insets.bottom, 24);
  let bottomOffset = isInTabs ? tabBarHeight + tabBarPadding + 12 : insets.bottom + 12;

  // If MiniAudioPlayer is visible, push up further
  if (currentlyPlaying) {
    bottomOffset += 64;
  }

  const handlePress = () => {
    const segs = segments as string[];
    // Resolve template segments like '[lessonId]' to actual values from params
    const resolvedSegs = segs.map((seg) => {
      if (seg.startsWith('[') && seg.endsWith(']')) {
        const paramName = seg.slice(1, -1);
        const value = params[paramName];
        return typeof value === 'string' ? value : seg;
      }
      return seg;
    });
    const module = getModuleFromSegments(resolvedSegs);
    openChat(module, resolvedSegs);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomOffset,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Ionicons name="sparkles" size={26} color="#fff" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    zIndex: 100,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.95 }],
  },
});
