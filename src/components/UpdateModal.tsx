import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Animated, Easing, AppState, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import * as Updates from 'expo-updates';
import { color, radius } from '../theme/tokens';
import { newerStoreRelease, type StoreRelease } from '../services/storeVersion';
import { quietly } from '../lib/report';

/** The store version the user last answered "Later" to; a newer one asks again. */
const STORE_DISMISSED_KEY = 'iqra.storeUpdateDismissed';

/**
 * Self-contained EAS Update (OTA) prompt. On launch, each time the app is
 * foregrounded, and every few minutes while it stays open, it checks for a
 * new update; when one is found it downloads it quietly, then asks the user
 * to restart to apply. Driven by the reactive `Updates.useUpdates()` state
 * (not a one-shot check) so the prompt reliably appears the moment a
 * downloaded update is pending. No-op in Expo Go / dev builds where
 * `Updates.isEnabled` is false.
 *
 * The periodic check exists because an app that is simply left open never
 * changes AppState, so before it the prompt could only appear after the app
 * was backgrounded or relaunched. And the prompt follows the update's id,
 * not the "available" flag: once one update had been found the flag stayed
 * true, so a second update published later was neither fetched nor shown
 * until the next launch.
 *
 * It also tells people on an old binary that a new version is in the App
 * Store or Google Play (services/storeVersion), which an over-the-air update
 * cannot deliver. That prompt comes first: the store version carries the
 * newest code anyway, and after installing it the app picks up any later
 * update the same way as here.
 */
const CHECK_EVERY_MS = 5 * 60 * 1000;
export function UpdateModal() {
  const { t } = useTranslation();
  const { availableUpdate, isUpdatePending } = Updates.useUpdates();
  const availableId = availableUpdate?.updateId ?? null;
  // The id of the update the user last dismissed; a newer one is shown again.
  const [dismissedId, setDismissedId] = useState<string | null>(null);
  const [reloading, setReloading] = useState(false);
  // A fix that cannot be applied must not hold the app hostage: if the
  // restart fails, this prompt stands down until the next update.
  const [otaFailed, setOtaFailed] = useState<string | null>(null);
  const [storeRelease, setStoreRelease] = useState<StoreRelease | null>(null);
  const [storeDismissed, setStoreDismissed] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORE_DISMISSED_KEY)
      .then((v) => setStoreDismissed(v))
      .catch(() => {});
  }, []);

  const scale = useRef(new Animated.Value(0.96)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const check = useCallback(() => {
    newerStoreRelease().then(setStoreRelease).catch(() => {});
    if (!Updates.isEnabled) return;
    Updates.checkForUpdateAsync().catch(() => {});
  }, []);

  // Check on mount, whenever the app returns to the foreground, and on a
  // timer while it stays in the foreground.
  useEffect(() => {
    check();
    let timer: ReturnType<typeof setInterval> | null = AppState.currentState === 'active' ? setInterval(check, CHECK_EVERY_MS) : null;
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') {
        check();
        if (!timer) timer = setInterval(check, CHECK_EVERY_MS);
      } else if (timer) {
        clearInterval(timer);
        timer = null;
      }
    });
    return () => {
      sub.remove();
      if (timer) clearInterval(timer);
    };
  }, [check]);

  // Download in the background as soon as an update is found - each one.
  useEffect(() => {
    if (availableId) Updates.fetchUpdateAsync().catch(() => {});
  }, [availableId]);

  // "Later" holds off this store version (stored) or this update (until the
  // next launch); a failed restart stands the update prompt down too.
  const showStore = !!storeRelease && storeDismissed !== storeRelease.version;
  const showOta = isUpdatePending && dismissedId !== availableId && otaFailed !== (availableId ?? 'unknown');
  const visible = showStore || showOta;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scale, { toValue: 1, friction: 8, tension: 80, useNativeDriver: true }),
      ]).start();
    } else {
      scale.setValue(0.96);
      opacity.setValue(0);
    }
  }, [visible, opacity, scale]);

  const later = () => {
    if (showStore && storeRelease) {
      setStoreDismissed(storeRelease.version);
      AsyncStorage.setItem(STORE_DISMISSED_KEY, storeRelease.version).catch(() => {});
    } else {
      setDismissedId(availableId);
    }
  };

  const openStore = () => {
    if (!storeRelease) return;
    Linking.openURL(storeRelease.url).catch((e) => quietly(e, 'components/UpdateModal'));
  };

  const apply = async () => {
    setReloading(true);
    try {
      await Updates.reloadAsync();
    } catch (e) {
      quietly(e, 'components/UpdateModal.reload');
      setReloading(false);
      setOtaFailed(availableId ?? 'unknown');
    }
  };

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={later}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
          <View style={styles.iconWrap}>
            <Ionicons name={showStore ? 'arrow-down-circle' : 'rocket'} size={28} color={color.progress} />
          </View>

          <Text style={styles.title}>{t(showStore ? 'profile.storeUpdateTitle' : 'profile.updateReadyTitle')}</Text>
          <Text style={styles.message}>
            {showStore && storeRelease
              ? t('profile.storeUpdateMessage', {
                  version: storeRelease.version,
                  store: t(Platform.OS === 'ios' ? 'profile.storeNameIos' : 'profile.storeNameAndroid'),
                })
              : t('profile.updateReadyMessage')}
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={styles.secondaryButton}
              onPress={later}
              disabled={reloading}
              accessibilityRole="button"
              accessibilityLabel={t('profile.later')}
            >
              <Text style={styles.secondaryText}>{t('profile.later')}</Text>
            </Pressable>
            {showStore ? (
              <Pressable
                style={styles.primaryButton}
                onPress={openStore}
                accessibilityRole="button"
                accessibilityLabel={t('profile.openStore')}
              >
                <Ionicons name="open-outline" size={18} color={color.textOnAccent} />
                <Text style={styles.primaryText}>{t('profile.openStore')}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.primaryButton, reloading && styles.primaryButtonDisabled]}
                onPress={apply}
                disabled={reloading}
                accessibilityRole="button"
                accessibilityLabel={t('profile.updateNow')}
              >
                <Ionicons name="refresh" size={18} color={color.textOnAccent} />
                <Text style={styles.primaryText}>{t('profile.updateNow')}</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: color.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: color.border,
    padding: 24,
    alignItems: 'center',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: color.text,
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    color: color.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: radius.md,
    backgroundColor: color.bg,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: color.text,
    fontSize: 15,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 13,
    borderRadius: radius.md,
    backgroundColor: color.progress,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryText: {
    color: color.textOnAccent,
    fontSize: 15,
    fontWeight: '700',
  },
});
