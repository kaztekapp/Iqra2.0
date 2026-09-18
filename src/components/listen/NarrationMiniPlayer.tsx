import { useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname, useSegments, Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNarrationStore, toggleNarration, stopNarration, secondsFrom } from '../../services/storyNarration';
import { color, radius } from '../../theme/tokens';

/**
 * The reading that kept going after the story screen was left.
 *
 * Shown on every screen except the story's own (which has its full listen
 * bar): the story's name, how far along it is, play/pause, stop, and a tap
 * anywhere else brings the story back at the line being read. Sits where
 * the Quran mini player sits; the two are never up at once, since starting
 * one silences the other.
 */
export function NarrationMiniPlayer() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const insets = useSafeAreaInsets();

  const session = useNarrationStore((s) => s.session);
  const status = useNarrationStore((s) => s.status);
  const index = useNarrationStore((s) => s.index);
  const pace = useNarrationStore((s) => s.pace);

  const visible = !!session && status !== 'idle' && pathname !== session.route;
  const slide = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    const anim = Animated.spring(slide, { toValue: visible ? 0 : 100, useNativeDriver: true, tension: 80, friction: 12 });
    anim.start();
    return () => anim.stop();
  }, [visible, slide]);

  if (!visible || !session) return null;

  const total = session.utterances.length;
  const fraction = total ? index / total : 0;
  const remaining = Math.round(secondsFrom(session.utterances, index, pace) / 60);
  const isInTabs = segments[0] === '(tabs)';
  const bottom = isInTabs ? 60 + (Platform.OS === 'ios' ? 28 : Math.max(insets.bottom, 24)) : insets.bottom;
  const playing = status === 'playing' || status === 'loading';

  return (
    <Animated.View style={[styles.container, { bottom, transform: [{ translateY: slide }] }]}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.round(fraction * 100)}%` }]} />
      </View>
      <Pressable
        style={styles.content}
        onPress={() => router.push(session.route as Href)}
        accessibilityRole="button"
        accessibilityLabel={t('listen.backToStory', { title: session.title })}
      >
        <View style={styles.badge}>
          <Ionicons name="book-outline" size={18} color={color.progress} />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{session.title}</Text>
          <Text style={styles.meta} numberOfLines={1}>
            {t('listen.nowReading')}
            {remaining > 0 ? ` · ${t('listen.minutesLeft', { count: remaining })}` : ''}
          </Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={(e) => { e.stopPropagation(); toggleNarration(); }}
          accessibilityRole="button"
          accessibilityLabel={t('a11y.playPause')}
        >
          <Ionicons name={playing ? 'pause' : 'play'} size={22} color={color.textOnAccent} />
        </Pressable>
        <Pressable
          style={styles.close}
          onPress={(e) => { e.stopPropagation(); void stopNarration(); }}
          accessibilityRole="button"
          accessibilityLabel={t('listen.stop')}
        >
          <Ionicons name="close" size={20} color={color.textMuted} />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: color.surface,
    borderTopWidth: 1,
    borderTopColor: color.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },
  track: {
    height: 3,
    backgroundColor: color.surfaceSunken,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: color.progress,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: radius.xl,
    backgroundColor: color.surfaceSunken,
    borderWidth: 2,
    borderColor: color.progress,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: color.text,
  },
  meta: {
    fontSize: 12,
    color: color.textMuted,
    marginTop: 2,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
