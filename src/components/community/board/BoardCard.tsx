import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BoardCanvas, boardContentBounds } from './BoardCanvas';
import { BoardViewer } from './BoardViewer';
import type { BoardContent, BoardElement } from '../../../types/classContent';
import { BOARD_BG } from '../../../types/classContent';
import { color, radius } from '../../../theme/tokens';

interface Props {
  board: BoardContent;
  groupColor: string;
  authorName: string;
  canEdit: boolean;
  onEdit?: () => void;
  onLongPress?: () => void;
}

// Fixed teaser height — the preview shows the TOP of the board at full width,
// like a document preview, and fades out if there's more below.
const PREVIEW_H = 200;

export const BoardCard = React.memo(function BoardCard({ board, groupColor, authorName, canEdit, onEdit, onLongPress }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  /**
   * The card's width, known before layout. It used to start at 1 and wait
   * for onLayout, so every board in a chat first drew as a 60px empty box
   * and then grew to its real height a frame later - and each growth moved
   * the list under the reader. The chat list insets are fixed (12 list
   * padding, 2 row padding, 1 border, per side), so the width is computed
   * up front; onLayout only corrects it if some other host differs.
   */
  const { width: windowW } = useWindowDimensions();
  const [w, setW] = useState(() => Math.max(1, Math.round(windowW - 30)));

  const bg = BOARD_BG[board.background];
  const bounds = useMemo(() => boardContentBounds(board.elements, board.width), [board]);

  // Scale the content so its width fills the card, then show only the top slice.
  const scale = bounds ? w / bounds.w : 1;
  const fullH = bounds ? bounds.h * scale : PREVIEW_H;
  const previewH = Math.max(60, Math.min(PREVIEW_H, Math.round(fullH)));
  const cropped = fullH > PREVIEW_H + 8;
  const vbH = bounds ? previewH / scale : 0;
  const viewBox = bounds ? `${bounds.x} ${bounds.y} ${bounds.w} ${vbH}` : undefined;

  /**
   * Draw only what the teaser can show. The canvas renders every element it
   * is given whatever the viewBox, so a board holding a whole lesson —
   * hundreds of elements — was being built in full to show its top 200px,
   * once per post in the chat. Anything that starts below the visible band
   * cannot appear in it, so it is left out; the opened viewer still gets the
   * full board.
   */
  const previewBoard = useMemo<BoardContent>(() => {
    if (!bounds) return board;
    const bottom = bounds.y + vbH;
    const visible = (el: BoardElement): boolean => {
      if (el.type === 'text') return el.y - el.size <= bottom;
      if (el.type === 'stroke') return el.bbox[1] <= bottom;
      return Math.min(el.y1, el.y2) <= bottom;
    };
    return { ...board, elements: board.elements.filter(visible) };
  }, [board, bounds, vbH]);

  return (
    <>
      <Pressable style={styles.card} onPress={() => setOpen(true)} onLongPress={onLongPress} delayLongPress={300}>
        <View style={[styles.band, { backgroundColor: `${groupColor}18` }]}>
          <View style={[styles.badge, { backgroundColor: groupColor }]}>
            <Ionicons name="brush" size={13} color={color.text} />
            <Text style={styles.badgeText}>{t('community.badgeBoard')}</Text>
          </View>
          <Text style={styles.byline} numberOfLines={1}>{authorName}</Text>
        </View>

        <View
          style={[styles.preview, { height: previewH, backgroundColor: bg }]}
          onLayout={(e) => {
            const measured = Math.round(e.nativeEvent.layout.width);
            if (measured > 0 && measured !== w) setW(measured);
          }}
        >
          <BoardCanvas content={previewBoard} width={w} height={previewH} viewBox={viewBox} />
          {cropped && (
            <LinearGradient
              colors={['transparent', bg]}
              style={styles.fade}
              pointerEvents="none"
            />
          )}
        </View>

        <View style={styles.footer}>
          <Ionicons name="expand" size={15} color={groupColor} />
          <Text style={[styles.footerText, { color: groupColor }]}>{t('community.openFullBoard')}</Text>
        </View>
      </Pressable>

      {open && (
        <BoardViewer
          visible={open}
          board={board}
          groupColor={groupColor}
          authorName={authorName}
          canEdit={canEdit}
          onEdit={() => { setOpen(false); onEdit?.(); }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  card: { width: '100%', backgroundColor: color.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: color.border, overflow: 'hidden' },
  band: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.sm },
  badgeText: { fontSize: 10, fontWeight: '700', color: color.text, letterSpacing: 0.6 },
  byline: { fontSize: 12, color: color.textMuted, maxWidth: 130 },
  preview: { width: '100%', overflow: 'hidden' },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 56 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderTopWidth: 1, borderTopColor: color.border },
  footerText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.2 },
});
