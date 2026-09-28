import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Modal, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReportSheet } from './ReportSheet';
import { color, radius, space, type, weight } from '../../theme/tokens';
import { reportContent, type ReportContentType, type ReportReason } from '../../services/moderationService';
import { useModerationStore } from '../../stores/moderationStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { reportError } from '../../lib/report';

/**
 * iOS will not present a Modal (or an Alert) while another is still
 * animating away, so an action chosen in a sheet waits for it to close.
 */
export function afterSheetCloses(fn: () => void): void {
  setTimeout(fn, 350);
}

/** Something in the community a person can report, and who wrote it. */
export interface ModerationTarget {
  contentType: ReportContentType;
  contentId: string;
  authorId?: string | null;
  authorName: string;
  /** The text as shown, kept with the report. */
  snapshot?: string | null;
}

/**
 * Report and block, shared by the group chat and the discussions.
 *
 *   const moderation = useModeration();
 *   moderation.openMenu(target)    // "•••": Report / Block
 *   moderation.openReport(target)  // straight to the report form
 *   moderation.confirmBlock(id, name)
 *   {moderation.element}           // render once in the screen
 */
export function useModeration() {
  const { t } = useTranslation();
  const userId = useSettingsStore((s) => s.user?.id);
  const block = useModerationStore((s) => s.block);
  const [menuTarget, setMenuTarget] = useState<ModerationTarget | null>(null);
  const [reportTarget, setReportTarget] = useState<ModerationTarget | null>(null);

  const canBlockAuthor = (target: ModerationTarget | null) =>
    !!target?.authorId && target.authorId !== userId;

  const requireSignIn = useCallback((): boolean => {
    if (userId) return true;
    Alert.alert(t('moderation.report'), t('moderation.signInToReport'));
    return false;
  }, [userId, t]);

  const openReport = useCallback((target: ModerationTarget) => {
    if (!requireSignIn()) return;
    setReportTarget(target);
  }, [requireSignIn]);

  const confirmBlock = useCallback((authorId: string, authorName: string, onBlocked?: () => void) => {
    if (!requireSignIn()) return;
    const name = authorName || t('moderation.unknownPerson');
    Alert.alert(
      t('moderation.blockConfirmTitle', { name }),
      t('moderation.blockConfirmBody'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('moderation.block'),
          style: 'destructive',
          onPress: async () => {
            try {
              await block(authorId, authorName);
              onBlocked?.();
            } catch (e) {
              reportError(e, { where: 'moderation.block' });
              Alert.alert(t('moderation.blockUser', { name }), t('moderation.blockFailed'));
            }
          },
        },
      ]
    );
  }, [block, requireSignIn, t]);

  const openMenu = useCallback((target: ModerationTarget) => {
    if (!requireSignIn()) return;
    setMenuTarget(target);
  }, [requireSignIn]);

  const submitReport = useCallback(async (reason: ReportReason, details: string, alsoBlock: boolean) => {
    const target = reportTarget;
    if (!target || !userId) throw new Error('Nothing to report');
    try {
      await reportContent(userId, {
        contentType: target.contentType,
        contentId: target.contentId,
        reportedUserId: target.authorId,
        reason,
        details,
        snapshot: target.snapshot,
      });
    } catch (e) {
      reportError(e, { where: 'moderation.report' });
      throw e;
    }
    if (alsoBlock && target.authorId) {
      try {
        await block(target.authorId, target.authorName);
      } catch (e) {
        // The report went through; say only what did not.
        reportError(e, { where: 'moderation.block' });
        Alert.alert(t('moderation.blockUser', { name: target.authorName }), t('moderation.blockFailed'));
      }
    }
  }, [reportTarget, userId, block, t]);

  const reportLabel = (target: ModerationTarget) =>
    target.contentType === 'group_message' ? t('moderation.reportMessage')
      : target.contentType === 'discussion_reply' ? t('moderation.reportReply')
        : t('moderation.reportPost');

  const element = (
    <>
      <Modal visible={!!menuTarget} transparent animationType="fade" onRequestClose={() => setMenuTarget(null)}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('common.cancel')} style={styles.backdrop} onPress={() => setMenuTarget(null)}>
          <Pressable accessibilityRole="none" style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            {menuTarget && (
              <>
                <Pressable
                  accessibilityRole="button"
                  style={styles.row}
                  onPress={() => { const target = menuTarget; setMenuTarget(null); afterSheetCloses(() => setReportTarget(target)); }}
                >
                  <Ionicons name="flag-outline" size={20} color={color.danger} />
                  <Text style={[styles.rowText, { color: color.danger }]}>{reportLabel(menuTarget)}</Text>
                </Pressable>
                {canBlockAuthor(menuTarget) && (
                  <Pressable
                    accessibilityRole="button"
                    style={styles.row}
                    onPress={() => {
                      const target = menuTarget;
                      setMenuTarget(null);
                      afterSheetCloses(() => confirmBlock(target.authorId!, target.authorName));
                    }}
                  >
                    <Ionicons name="ban-outline" size={20} color={color.danger} />
                    <Text style={[styles.rowText, { color: color.danger }]}>
                      {t('moderation.blockUser', { name: menuTarget.authorName || t('moderation.unknownPerson') })}
                    </Text>
                  </Pressable>
                )}
              </>
            )}
            <Pressable accessibilityRole="button" style={styles.cancel} onPress={() => setMenuTarget(null)}>
              <Text style={styles.cancelText}>{t('common.cancel')}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <ReportSheet
        visible={!!reportTarget}
        authorName={reportTarget?.authorName ?? ''}
        canBlock={canBlockAuthor(reportTarget)}
        onSubmit={submitReport}
        onClose={() => setReportTarget(null)}
      />
    </>
  );

  return { openMenu, openReport, confirmBlock, element };
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(20,38,28,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: color.surface, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl,
    paddingTop: space.sm, paddingBottom: 34, paddingHorizontal: space.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: space.lg, paddingVertical: 14, borderRadius: radius.md },
  rowText: { ...type.bodyLarge, fontWeight: weight.medium },
  cancel: { marginTop: space.sm, marginHorizontal: space.sm, paddingVertical: 14, borderRadius: radius.md, backgroundColor: color.bg, alignItems: 'center' },
  cancelText: { ...type.bodyLarge, color: color.textMuted, fontWeight: weight.semibold },
});
