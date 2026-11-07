import { View, Text, Pressable, StyleSheet, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useStoreReleaseStore } from '../../stores/storeReleaseStore';
import { Txt, withAlpha } from '../ui/Primitives';
import { color, type, weight, space, radius, gutter } from '../../theme/tokens';
import { quietly } from '../../lib/report';

/**
 * A quiet line under the masthead while a newer version is in the store:
 * the popup can be put off with "Later", this stays until the app is updated
 * (or is closed until the next launch). Tinted emerald, not a card, so it
 * reads as a notice about the app rather than something to learn.
 */
export function StoreUpdateBanner() {
  const { t } = useTranslation();
  const release = useStoreReleaseStore((s) => s.release);
  const closed = useStoreReleaseStore((s) => s.bannerClosed);
  const closeBanner = useStoreReleaseStore((s) => s.closeBanner);
  if (!release || closed) return null;

  const store = t(Platform.OS === 'ios' ? 'profile.storeNameIos' : 'profile.storeNameAndroid');
  const open = () => Linking.openURL(release.url).catch((e) => quietly(e, 'components/home/StoreUpdateBanner'));

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={open}
        style={({ pressed }) => [styles.banner, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`${t('profile.storeUpdateTitle')}. ${t('home.updateBannerText', { version: release.version, store })}`}
      >
        <Ionicons name="arrow-down-circle" size={26} color={color.accent} />
        <View style={styles.text}>
          <Txt variant="body" weight="semibold" numberOfLines={1}>{t('profile.storeUpdateTitle')}</Txt>
          <Txt variant="caption" tone="muted" numberOfLines={2}>
            {t('home.updateBannerText', { version: release.version, store })}
          </Txt>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{t('profile.openStore')}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={closeBanner}
        hitSlop={10}
        style={styles.close}
        accessibilityRole="button"
        accessibilityLabel={t('home.updateBannerClose')}
      >
        <Ionicons name="close" size={14} color={color.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: gutter,
    marginBottom: space.xl,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.md,
    paddingLeft: space.lg,
    paddingRight: space.lg,
    borderRadius: radius.lg,
    backgroundColor: color.accentSoft,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withAlpha(color.accent, 0.28),
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    flex: 1,
  },
  pill: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.full,
    backgroundColor: color.accent,
  },
  pillText: {
    ...type.caption,
    color: color.textOnAccent,
    fontWeight: weight.bold,
  },
  // A small disc on the top right corner, so the whole strip stays one tap target.
  close: {
    position: 'absolute',
    top: -8,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: color.surface,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
