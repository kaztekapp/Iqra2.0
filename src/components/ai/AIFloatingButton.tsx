import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Animated, Platform, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSegments, useGlobalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAIChatStore } from '../../stores/aiChatStore';
import { useAudioPlayerStore } from '../../stores/audioPlayerStore';
import { isInLearnSection, getModuleFromSegments } from '../../services/aiContextService';
import { AIModelChoice } from '../../types/aiChat';

const TEACHER_AVATARS: Record<AIModelChoice, any> = {
  haiku: require('../../../assets/images/teachers/ustadh-ali.png'),
  sonnet: require('../../../assets/images/teachers/ustadh-ibrahim.png'),
};

const TEACHER_COLORS: Record<AIModelChoice, { border: [string, string, string, string]; glow: string }> = {
  haiku: {
    border: ['#10b981', '#34d399', '#f59e0b', '#10b981'],
    glow: '#10b981',
  },
  sonnet: {
    border: ['#D4AF37', '#f59e0b', '#D4AF37', '#f59e0b'],
    glow: '#D4AF37',
  },
};

export function AIFloatingButton() {
  const segments = useSegments();
  const params = useGlobalSearchParams();
  const insets = useSafeAreaInsets();
  const { openChat, isOpen, setActiveModule, setActiveSegments, preferredModel } = useAIChatStore();
  const currentlyPlaying = useAudioPlayerStore((s) => s.currentlyPlaying);

  // Resolve template segments to actual param values
  const resolvedSegs = (segments as string[]).map((seg) => {
    if (seg.startsWith('[') && seg.endsWith(']')) {
      const paramName = seg.slice(1, -1);
      const value = params[paramName];
      return typeof value === 'string' ? value : seg;
    }
    return seg;
  });

  // Keep activeModule + activeSegments in sync as the user navigates
  useEffect(() => {
    const module = getModuleFromSegments(resolvedSegs);
    setActiveModule(module);
    setActiveSegments(resolvedSegs);
  }, [resolvedSegs.join('/')]);

  // Subtle scale breathing (native driver only — no JS thread cost)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
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

  if (currentlyPlaying) {
    bottomOffset += 64;
  }

  const handlePress = () => {
    const module = getModuleFromSegments(resolvedSegs);
    openChat(module, resolvedSegs);
  };

  const colors = TEACHER_COLORS[preferredModel];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomOffset,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Static glow ring */}
      <View style={[styles.glow, { backgroundColor: colors.glow }]} />

      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [pressed && styles.buttonPressed]}
      >
        {/* Gradient border ring */}
        <LinearGradient
          colors={colors.border}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <Image
              source={TEACHER_AVATARS[preferredModel]}
              style={styles.avatar}
            />
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const BTN_SIZE = 44;
const BORDER_WIDTH = 2;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Glow ─────────────────────────────────────────────────────
  glow: {
    position: 'absolute',
    width: BTN_SIZE + 12,
    height: BTN_SIZE + 12,
    borderRadius: (BTN_SIZE + 12) / 2,
    opacity: 0.25,
  },

  // ── Gradient border ──────────────────────────────────────────
  gradientBorder: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },

  // ── Avatar ───────────────────────────────────────────────────
  avatarWrap: {
    width: BTN_SIZE - BORDER_WIDTH * 2,
    height: BTN_SIZE - BORDER_WIDTH * 2,
    borderRadius: (BTN_SIZE - BORDER_WIDTH * 2) / 2,
    overflow: 'hidden',
    backgroundColor: '#0d0d0a',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // ── Press state ──────────────────────────────────────────────
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.93 }],
  },
});
