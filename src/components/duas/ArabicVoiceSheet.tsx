/**
 * Choose which Arabic voice reads aloud: the fetched online voice, or one of
 * the voices installed on the phone.
 *
 * Replaces the female/male toggle on the dua screen. That toggle set a
 * preference the speech service never read, so it changed nothing; and it
 * could only guess a voice's gender from its name. Listing the phone's own
 * voices by name lets the learner pick the one they actually want, and
 * "device" as a source means the app never fetches for them at all.
 *
 * Follows the listen sheet: same scrim, sheet, handle and row rhythm.
 */
import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { color, radius, type, weight, space, gutter } from '../../theme/tokens';
import type { ArabicDeviceVoice, ArabicVoiceSource } from '../../services/speech/arabicTTS';

interface Props {
  visible: boolean;
  source: ArabicVoiceSource;
  deviceVoiceId: string | null;
  voices: ArabicDeviceVoice[];
  loading: boolean;
  onPick: (source: ArabicVoiceSource, voiceId: string | null) => void;
  onDownloadHelp: () => void;
  onClose: () => void;
}

export function ArabicVoiceSheet({ visible, source, deviceVoiceId, voices, loading, onPick, onDownloadHelp, onClose }: Props) {
  const { t } = useTranslation();

  const qualityLabel = (q: ArabicDeviceVoice['quality']) =>
    q === 'enhanced' ? t('duasFeature.qualityEnhanced') : q === 'compact' ? t('duasFeature.qualityCompact') : t('duasFeature.qualityDefault');

  const genderIcon = (g: ArabicDeviceVoice['gender']): React.ComponentProps<typeof Ionicons>['name'] =>
    g === 'female' ? 'woman' : g === 'male' ? 'man' : 'person';

  const onlineSelected = source === 'online';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.scrim}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={t('listen.close')} />
        <View style={styles.sheet}>
          <SafeAreaView edges={['bottom']} style={styles.safe}>
            <View style={styles.handleRow}>
              <View style={styles.handle} />
            </View>

            <View style={styles.topRow}>
              <Text style={styles.title}>{t('duasFeature.chooseVoice')}</Text>
              <Pressable onPress={onClose} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('listen.close')}>
                <Ionicons name="close" size={22} color={color.textMuted} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
              <Pressable
                style={[styles.row, onlineSelected && styles.rowSelected]}
                onPress={() => onPick('online', null)}
                accessibilityRole="button"
                accessibilityState={{ selected: onlineSelected }}
              >
                <View style={[styles.rowIcon, onlineSelected && styles.rowIconSelected]}>
                  <Ionicons name="cloud-outline" size={18} color={onlineSelected ? color.textOnAccent : color.textMuted} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>{t('duasFeature.onlineVoice')}</Text>
                  <Text style={styles.rowSub}>{t('duasFeature.onlineVoiceDesc')}</Text>
                </View>
                {onlineSelected && <Ionicons name="checkmark-circle" size={22} color={color.accentStrong} />}
              </Pressable>

              <Text style={styles.section}>{t('duasFeature.deviceVoices')}</Text>

              {loading && (
                <View style={styles.loading}>
                  <ActivityIndicator color={color.accent} />
                </View>
              )}

              {!loading && voices.length === 0 && (
                <Text style={styles.empty}>{t('duasFeature.noDeviceVoices')}</Text>
              )}

              {!loading &&
                voices.map((v) => {
                  const selected = source === 'device' && deviceVoiceId === v.identifier;
                  return (
                    <Pressable
                      key={v.identifier}
                      style={[styles.row, selected && styles.rowSelected]}
                      onPress={() => onPick('device', v.identifier)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <View style={[styles.rowIcon, selected && styles.rowIconSelected]}>
                        <Ionicons name={genderIcon(v.gender)} size={18} color={selected ? color.textOnAccent : color.textMuted} />
                      </View>
                      <View style={styles.rowText}>
                        <Text style={styles.rowTitle} numberOfLines={1}>{v.name}</Text>
                        <Text style={styles.rowSub}>
                          {qualityLabel(v.quality)} · {v.language}
                        </Text>
                      </View>
                      {selected && <Ionicons name="checkmark-circle" size={22} color={color.accentStrong} />}
                    </Pressable>
                  );
                })}

              <Pressable style={styles.linkRow} onPress={onDownloadHelp} accessibilityRole="button">
                <Ionicons name="download-outline" size={18} color={color.accentStrong} />
                <Text style={styles.linkText}>{t('duasFeature.downloadMoreVoices')}</Text>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(20, 38, 28, 0.28)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: color.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: '80%',
  },
  safe: {
    paddingHorizontal: gutter,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: color.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    gap: space.md,
  },
  title: {
    flex: 1,
    ...type.title,
    fontWeight: weight.bold,
    color: color.text,
  },
  body: {
    paddingBottom: space.xl,
  },
  section: {
    ...type.micro,
    fontWeight: weight.semibold,
    color: color.textFaint,
    textTransform: 'uppercase',
    marginTop: space.lg,
    marginBottom: space.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginBottom: 8,
  },
  rowSelected: {
    borderColor: color.accentStrong,
    backgroundColor: color.surface,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: color.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconSelected: {
    backgroundColor: color.accentStrong,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
  },
  rowSub: {
    ...type.caption,
    color: color.textMuted,
    marginTop: 2,
  },
  loading: {
    paddingVertical: space.lg,
    alignItems: 'center',
  },
  empty: {
    ...type.caption,
    color: color.textFaint,
    textAlign: 'center',
    paddingVertical: space.lg,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: 12,
    marginTop: space.xs,
  },
  linkText: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.accentStrong,
  },
});

export default ArabicVoiceSheet;
