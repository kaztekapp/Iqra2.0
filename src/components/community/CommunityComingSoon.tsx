import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Txt, Arabic, MastheadWash, IconTile, withAlpha } from '../ui/Primitives';
import { color, palette, space, radius, gutter } from '../../theme/tokens';

/**
 * What the Community tab shows until the feature is released (see
 * COMMUNITY_ENABLED). The picture is a halaqa, the study circle: learners
 * seated around the Quran, drawn as the app's gold lozenge. One seat, the
 * one nearest the reader, is left empty and outlined: it is theirs.
 */

const RUG = 232;
const SEAT_RING = 84;
const SEATS = 8;

const FEATURES: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }[] = [
  { icon: 'people', title: 'communitySoon.groupsTitle', body: 'communitySoon.groupsBody' },
  { icon: 'chatbubbles', title: 'communitySoon.discussionsTitle', body: 'communitySoon.discussionsBody' },
  { icon: 'flag', title: 'communitySoon.challengesTitle', body: 'communitySoon.challengesBody' },
];

export function CommunityComingSoon() {
  const { t } = useTranslation();
  const [pressed, setPressed] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MastheadWash />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Arabic size="title" align="left">المجتمع</Arabic>
          <Txt variant="caption" tone="faint" style={styles.headerLatin}>
            {t('community.title')}
          </Txt>
        </View>

        <Halaqa label={t('communitySoon.imageLabel')} />

        <View style={styles.copy}>
          <View style={styles.pill}>
            <Txt variant="caption" weight="semibold" tone="accent">{t('communitySoon.badge')}</Txt>
          </View>
          <Txt variant="heading" weight="bold" style={styles.title} accessibilityRole="header">
            {t('communitySoon.title')}
          </Txt>
          <Txt variant="body" tone="muted">{t('communitySoon.body')}</Txt>
        </View>

        <View style={styles.features}>
          {FEATURES.map((f, i) => (
            <View key={f.icon} style={[styles.feature, i > 0 && styles.featureDivided]}>
              <IconTile name={f.icon} tint={color.accent} size="sm" />
              <View style={styles.featureText}>
                <Txt variant="body" weight="semibold">{t(f.title)}</Txt>
                <Txt variant="caption" tone="muted">{t(f.body)}</Txt>
              </View>
            </View>
          ))}
        </View>

        <Txt variant="body" tone="muted" style={styles.seatNote}>{t('communitySoon.seat')}</Txt>

        <Pressable
          onPress={() => router.navigate('/(tabs)/learn' as Href)}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
          accessibilityRole="button"
          accessibilityLabel={t('communitySoon.cta')}
          style={[styles.button, pressed && styles.buttonPressed]}
        >
          <Txt variant="bodyLarge" weight="semibold" style={styles.buttonLabel}>{t('communitySoon.cta')}</Txt>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Eight seats around the Quran; the seat at the bottom, nearest the reader, is empty. */
function Halaqa({ label }: { label: string }) {
  const centre = RUG / 2;
  return (
    <View style={styles.halaqaWrap} accessible accessibilityRole="image" accessibilityLabel={label}>
      <View style={styles.rug}>
        <View style={styles.ring} />
        {Array.from({ length: SEATS }, (_, i) => {
          // Seat 0 sits at the bottom; the rest go round clockwise.
          const angle = 90 + (360 / SEATS) * i;
          const rad = (angle * Math.PI) / 180;
          const x = centre + SEAT_RING * Math.cos(rad);
          const y = centre + SEAT_RING * Math.sin(rad);
          const yours = i === 0;
          return (
            <Animated.View
              key={i}
              entering={(yours ? ZoomIn.delay(140 + SEATS * 70) : FadeIn.delay(140 + i * 70)).duration(360)}
              style={[styles.seatFigure, { left: x - SEAT_W / 2, top: y - SEAT_H / 2, transform: [{ rotate: `${angle - 90}deg` }] }]}
            >
              {yours ? <View style={styles.halo} /> : null}
              <View style={[styles.head, yours ? styles.emptyPart : styles.filledHead]} />
              <View style={[styles.shoulders, yours ? styles.emptyPart : styles.filledShoulders]} />
            </Animated.View>
          );
        })}
        <Animated.View entering={FadeIn.duration(420)} style={styles.lozengeOuter}>
          <View style={styles.lozengeInner} />
        </Animated.View>
      </View>
    </View>
  );
}

const SEAT_W = 30;
const SEAT_H = 34;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  scroll: {
    paddingBottom: space.xl * 2,
  },
  header: {
    paddingHorizontal: gutter,
    paddingTop: space.sm,
    paddingBottom: space.lg,
  },
  headerLatin: {
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },

  // The circle
  halaqaWrap: {
    alignItems: 'center',
    paddingVertical: space.md,
  },
  rug: {
    width: RUG,
    height: RUG,
    borderRadius: RUG / 2,
    backgroundColor: palette.mint100,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: color.border,
  },
  ring: {
    position: 'absolute',
    left: RUG / 2 - SEAT_RING,
    top: RUG / 2 - SEAT_RING,
    width: SEAT_RING * 2,
    height: SEAT_RING * 2,
    borderRadius: SEAT_RING,
    borderWidth: 1,
    borderColor: withAlpha(palette.mint300, 0.8),
  },
  seatFigure: {
    position: 'absolute',
    width: SEAT_W,
    height: SEAT_H,
    alignItems: 'center',
  },
  halo: {
    position: 'absolute',
    left: SEAT_W / 2 - 24,
    top: SEAT_H / 2 - 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color.accentSoft,
  },
  head: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  shoulders: {
    marginTop: 3,
    width: SEAT_W,
    height: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  filledHead: {
    backgroundColor: color.accentStrong,
  },
  filledShoulders: {
    backgroundColor: color.accent,
  },
  emptyPart: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: color.accent,
    backgroundColor: color.surface,
  },
  lozengeOuter: {
    position: 'absolute',
    left: RUG / 2 - 15,
    top: RUG / 2 - 15,
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderColor: withAlpha(color.sacred, 0.6),
    backgroundColor: palette.gold100,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  lozengeInner: {
    width: 12,
    height: 12,
    backgroundColor: color.sacred,
  },

  // Words
  copy: {
    paddingHorizontal: gutter,
    marginTop: space.lg,
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radius.full,
    backgroundColor: color.accentSoft,
    marginBottom: space.md,
  },
  title: {
    marginBottom: space.sm,
  },

  features: {
    marginHorizontal: gutter,
    marginTop: space.xl,
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: color.border,
    paddingHorizontal: space.lg,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
    paddingVertical: space.lg,
  },
  featureDivided: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.borderSubtle,
  },
  featureText: {
    flex: 1,
    gap: 2,
  },

  seatNote: {
    paddingHorizontal: gutter,
    marginTop: space.xl,
  },
  button: {
    marginHorizontal: gutter,
    marginTop: space.lg,
    paddingVertical: space.lg,
    borderRadius: radius.md,
    backgroundColor: color.accent,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: color.accentStrong,
  },
  buttonLabel: {
    color: color.textOnAccent,
  },
});
