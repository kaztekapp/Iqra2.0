import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View, Text, StyleSheet, Pressable, Modal, TextInput, ActivityIndicator,
  KeyboardAvoidingView, Platform, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color, radius, space, type, weight, pressedOpacity } from '../../theme/tokens';
import { REPORT_REASONS, type ReportReason } from '../../services/moderationService';

const REASON_KEY: Record<ReportReason, string> = {
  spam: 'moderation.reasonSpam',
  harassment: 'moderation.reasonHarassment',
  hate: 'moderation.reasonHate',
  sexual: 'moderation.reasonSexual',
  other: 'moderation.reasonOther',
};

interface Props {
  visible: boolean;
  /** Name of the person whose content is reported. */
  authorName: string;
  /** Offer "Also block" — false when there is no person to block. */
  canBlock: boolean;
  /** Sends the report (and the block, when asked). Throws when it did not go through. */
  onSubmit: (reason: ReportReason, details: string, alsoBlock: boolean) => Promise<void>;
  onClose: () => void;
}

/**
 * The report form, then its receipt. The receipt replaces the form in the
 * same sheet so the person sees their report landed before it goes away.
 */
export function ReportSheet({ visible, authorName, canBlock, onSubmit, onClose }: Props) {
  const { t } = useTranslation();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [alsoBlock, setAlsoBlock] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  // A fresh form every time the sheet opens.
  useEffect(() => {
    if (visible) {
      setReason(null);
      setDetails('');
      setAlsoBlock(false);
      setSending(false);
      setError(null);
      setSent(false);
    }
  }, [visible]);

  const submit = async () => {
    if (!reason || sending) return;
    setSending(true);
    setError(null);
    try {
      await onSubmit(reason, details, canBlock && alsoBlock);
      setSent(true);
    } catch {
      setError(t('moderation.reportFailed'));
    } finally {
      setSending(false);
    }
  };

  const name = authorName || t('moderation.unknownPerson');

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('common.cancel')} style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.grabber} />
          {sent ? (
            <View style={styles.receipt} accessibilityLiveRegion="polite">
              <View style={styles.receiptIcon}>
                <Ionicons name="checkmark" size={28} color={color.accent} />
              </View>
              <Text style={styles.title}>{t('moderation.reportSent')}</Text>
              <Text style={[styles.subtitle, styles.center]}>{t('moderation.reportSentBody')}</Text>
              <Pressable
                accessibilityRole="button"
                style={({ pressed }) => [styles.primary, pressed && { opacity: pressedOpacity }]}
                onPress={onClose}
              >
                <Text style={styles.primaryText}>{t('common.done')}</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.title}>{t('moderation.reportTitle')}</Text>
              <Text style={styles.subtitle}>{t('moderation.reportSubtitle', { name })}</Text>

              <View style={styles.reasons} accessibilityRole="radiogroup">
                {REPORT_REASONS.map((r) => {
                  const selected = reason === r;
                  return (
                    <Pressable
                      key={r}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                      style={[styles.reason, selected && styles.reasonSelected]}
                      onPress={() => setReason(r)}
                    >
                      <Text style={[styles.reasonText, selected && styles.reasonTextSelected]}>{t(REASON_KEY[r])}</Text>
                      <Ionicons
                        name={selected ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selected ? color.accent : color.borderStrong}
                      />
                    </Pressable>
                  );
                })}
              </View>

              <TextInput
                style={styles.details}
                value={details}
                onChangeText={setDetails}
                placeholder={t('moderation.detailsPlaceholder')}
                placeholderTextColor={color.textFaint}
                multiline
                maxLength={1000}
                accessibilityLabel={t('moderation.detailsPlaceholder')}
              />

              {canBlock && (
                <View style={styles.blockRow}>
                  <Text style={styles.blockText}>{t('moderation.alsoBlock', { name })}</Text>
                  <Switch
                    value={alsoBlock}
                    onValueChange={setAlsoBlock}
                    trackColor={{ true: color.accent, false: color.borderStrong }}
                    accessibilityLabel={t('moderation.alsoBlock', { name })}
                  />
                </View>
              )}

              {error && <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>}

              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: !reason || sending }}
                disabled={!reason || sending}
                style={({ pressed }) => [styles.primary, (!reason || sending) && styles.primaryDisabled, pressed && { opacity: pressedOpacity }]}
                onPress={submit}
              >
                {sending
                  ? <ActivityIndicator color={color.textOnAccent} />
                  : <Text style={styles.primaryText}>{t('moderation.sendReport')}</Text>}
              </Pressable>
              <Pressable accessibilityRole="button" style={styles.cancel} onPress={onClose}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(20,38,28,0.45)' },
  sheet: {
    backgroundColor: color.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: space.xl,
    paddingTop: space.sm,
    paddingBottom: 34,
  },
  grabber: { alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: color.border, marginBottom: space.lg },
  title: { ...type.title, fontWeight: weight.bold, color: color.text },
  subtitle: { ...type.body, color: color.textMuted, marginTop: space.xs },
  center: { textAlign: 'center' },
  reasons: { marginTop: space.lg, gap: space.sm },
  reason: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: space.lg, paddingVertical: space.md,
    borderRadius: radius.md, borderWidth: 1, borderColor: color.border, backgroundColor: color.surface,
  },
  reasonSelected: { borderColor: color.accent, backgroundColor: color.accentSoft },
  reasonText: { ...type.body, color: color.text, fontWeight: weight.medium },
  reasonTextSelected: { color: color.accentStrong, fontWeight: weight.semibold },
  details: {
    ...type.body, color: color.text, marginTop: space.md, minHeight: 72, maxHeight: 140,
    padding: space.md, borderRadius: radius.md, backgroundColor: color.surfaceSunken, textAlignVertical: 'top',
  },
  blockRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: space.md, gap: space.md },
  blockText: { ...type.body, color: color.text, flex: 1 },
  error: { ...type.caption, color: color.danger, marginTop: space.md },
  primary: {
    marginTop: space.lg, minHeight: 50, borderRadius: radius.md, backgroundColor: color.accent,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch',
  },
  primaryDisabled: { backgroundColor: color.borderStrong },
  primaryText: { ...type.bodyLarge, color: color.textOnAccent, fontWeight: weight.semibold },
  cancel: { paddingVertical: space.md, alignItems: 'center' },
  cancelText: { ...type.body, color: color.textMuted, fontWeight: weight.semibold },
  receipt: { alignItems: 'center', paddingTop: space.sm },
  receiptIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: color.accentSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: space.md,
  },
});
