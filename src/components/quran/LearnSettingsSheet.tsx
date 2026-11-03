/**
 * The four Learn mode settings, one sheet each: the voice, how many times a
 * verse repeats (and what happens after), the speed, and which verses.
 *
 * Each opens from a chip that already shows its current choice, so the main
 * screen stays one verse and one button. Follows the listen and voice sheets:
 * same scrim, sheet, handle and row rhythm. Styles are plain arrays: NativeWind
 * drops Pressable's style function on device (see Card in Primitives).
 */
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { color, radius, type, weight, space, gutter } from '../../theme/tokens';

export type LearnSheetKind = 'voice' | 'repeat' | 'speed' | 'verses';

export const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];
export const REPEAT_OPTIONS = [1, 2, 3, 5, 10];
/** Any count can be chosen with - and +, up to this. */
export const MAX_REPEAT = 99;

interface Props {
  kind: LearnSheetKind | null;
  onClose: () => void;
  // voice
  useLearningVoice: boolean;
  reciterName: string;
  onVoice: (learning: boolean) => void;
  // repeat
  repeatCount: number;
  autoAdvance: boolean;
  onRepeat: (count: number) => void;
  onAutoAdvance: (on: boolean) => void;
  // speed
  speed: number;
  onSpeed: (speed: number) => void;
  // verses
  verseCount: number;
  currentVerse: number;
  startVerse: number;
  endVerse: number;
  onVerses: (start: number, end: number) => void;
}

/** One choice in a list: a radio, a title and a line saying what it does. */
function Option({ selected, title, note, onPress }: { selected: boolean; title: string; note: string; onPress: () => void }) {
  return (
    <Pressable
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={[styles.radio, selected && styles.radioSelected]} />
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionNote}>{note}</Text>
      </View>
    </Pressable>
  );
}

/** A row of equal buttons, one of them chosen. */
function Segments<T extends number>({ values, value, label, onPick, a11y }: { values: T[]; value: T; label: (v: T) => string; onPick: (v: T) => void; a11y: (v: T) => string }) {
  return (
    <View style={styles.segments}>
      {values.map((v) => (
        <Pressable
          key={v}
          style={[styles.segment, v === value && styles.segmentOn]}
          onPress={() => onPick(v)}
          accessibilityRole="radio"
          accessibilityState={{ selected: v === value }}
          accessibilityLabel={a11y(v)}
        >
          <Text style={[styles.segmentText, v === value && styles.segmentTextOn]}>{label(v)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function LearnSettingsSheet(props: Props) {
  const { t } = useTranslation();
  const { kind, onClose } = props;

  // Choosing verses is two taps on the grid - where to start, then where to
  // stop - and only applies when the reader confirms.
  const [pickStart, setPickStart] = useState(props.startVerse);
  const [pickEnd, setPickEnd] = useState(props.endVerse);
  const [awaitingEnd, setAwaitingEnd] = useState(false);
  useEffect(() => {
    if (kind === 'verses') {
      setPickStart(props.startVerse);
      setPickEnd(props.endVerse);
      setAwaitingEnd(false);
    }
  }, [kind]);

  const stepRepeat = (n: number) => props.onRepeat(Math.max(1, Math.min(MAX_REPEAT, n)));

  const tapVerse = (n: number) => {
    if (!awaitingEnd) {
      setPickStart(n);
      setPickEnd(n);
      setAwaitingEnd(true);
    } else {
      setPickStart(Math.min(pickStart, n));
      setPickEnd(Math.max(pickStart, n));
      setAwaitingEnd(false);
    }
  };

  const quick = (start: number, end: number) => {
    setPickStart(start);
    setPickEnd(Math.min(end, props.verseCount));
    setAwaitingEnd(false);
  };

  const title =
    kind === 'voice' ? t('surahLearnMode.sheetVoice')
    : kind === 'repeat' ? t('surahLearnMode.sheetRepeat')
    : kind === 'speed' ? t('surahLearnMode.sheetSpeed')
    : t('surahLearnMode.sheetVerses');

  return (
    <Modal visible={kind !== null} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.scrim}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={t('listen.close')} />
        <View style={styles.sheet}>
          <SafeAreaView edges={['bottom']} style={styles.safe}>
            <View style={styles.handleRow}>
              <View style={styles.handle} />
            </View>
            <View style={styles.topRow}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={onClose} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('listen.close')}>
                <Ionicons name="close" size={22} color={color.textMuted} />
              </Pressable>
            </View>

            {kind === 'voice' && (
              <View style={styles.body}>
                <Option
                  selected={props.useLearningVoice}
                  title={t('surahLearnMode.voiceLearning')}
                  note={t('surahLearnMode.voiceLearningNote')}
                  onPress={() => props.onVoice(true)}
                />
                <Option
                  selected={!props.useLearningVoice}
                  title={`${t('surahLearnMode.voiceReciter')}: ${props.reciterName}`}
                  note={t('surahLearnMode.voiceReciterNote')}
                  onPress={() => props.onVoice(false)}
                />
              </View>
            )}

            {kind === 'repeat' && (
              <View style={styles.body}>
                <Text style={styles.label}>{t('surahLearnMode.howManyTimes')}</Text>
                <Segments
                  values={REPEAT_OPTIONS}
                  value={props.repeatCount}
                  label={(v) => `${v}×`}
                  a11y={(v) => t('surahLearnMode.repeatTimes', { count: v })}
                  onPick={props.onRepeat}
                />
                <View style={styles.customRow}>
                  <Text style={styles.customLabel}>{t('surahLearnMode.customRepeat')}</Text>
                  <Pressable
                    style={[styles.stepper, props.repeatCount <= 1 && styles.stepperDisabled]}
                    onPress={() => stepRepeat(props.repeatCount - 1)}
                    disabled={props.repeatCount <= 1}
                    accessibilityRole="button"
                    accessibilityLabel={t('surahLearnMode.repeatLess')}
                  >
                    <Ionicons name="remove" size={18} color={color.text} />
                  </Pressable>
                  <Text
                    style={[styles.customValue, !REPEAT_OPTIONS.includes(props.repeatCount) && styles.customValueOn]}
                    accessibilityLiveRegion="polite"
                  >
                    {props.repeatCount}×
                  </Text>
                  <Pressable
                    style={[styles.stepper, props.repeatCount >= MAX_REPEAT && styles.stepperDisabled]}
                    onPress={() => stepRepeat(props.repeatCount + 1)}
                    disabled={props.repeatCount >= MAX_REPEAT}
                    accessibilityRole="button"
                    accessibilityLabel={t('surahLearnMode.repeatMore')}
                  >
                    <Ionicons name="add" size={18} color={color.text} />
                  </Pressable>
                </View>
                <Text style={[styles.label, styles.labelGap]}>{t('surahLearnMode.afterLastTime')}</Text>
                <Option
                  selected={props.autoAdvance}
                  title={t('surahLearnMode.goOnTitle')}
                  note={t('surahLearnMode.goOnNote')}
                  onPress={() => props.onAutoAdvance(true)}
                />
                <Option
                  selected={!props.autoAdvance}
                  title={t('surahLearnMode.stayTitle')}
                  note={t('surahLearnMode.stayNote')}
                  onPress={() => props.onAutoAdvance(false)}
                />
              </View>
            )}

            {kind === 'speed' && (
              <View style={styles.body}>
                <Segments
                  values={SPEED_OPTIONS}
                  value={props.speed}
                  label={(v) => `${v}×`}
                  a11y={(v) => `${v}×`}
                  onPick={props.onSpeed}
                />
                <Text style={styles.hint}>{t('surahLearnMode.speedHint')}</Text>
              </View>
            )}

            {kind === 'verses' && (
              <View style={[styles.body, styles.versesBody]}>
                <View style={styles.quickRow}>
                  <Pressable style={styles.quick} onPress={() => quick(1, props.verseCount)} accessibilityRole="button">
                    <Text style={styles.quickText}>{t('surahLearnMode.wholeSurah')}</Text>
                  </Pressable>
                  <Pressable style={styles.quick} onPress={() => quick(props.currentVerse, props.currentVerse + 4)} accessibilityRole="button">
                    <Text style={styles.quickText}>{t('surahLearnMode.next5')}</Text>
                  </Pressable>
                  <Pressable style={styles.quick} onPress={() => quick(props.currentVerse, props.currentVerse + 9)} accessibilityRole="button">
                    <Text style={styles.quickText}>{t('surahLearnMode.next10')}</Text>
                  </Pressable>
                </View>
                <Text style={styles.label}>
                  {awaitingEnd ? t('surahLearnMode.tapEnd') : t('surahLearnMode.tapStart')}
                </Text>
                <ScrollView style={styles.gridScroll} contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: props.verseCount }, (_, i) => i + 1).map((n) => {
                    const edge = n === pickStart || n === pickEnd;
                    const inside = n > pickStart && n < pickEnd;
                    return (
                      <Pressable
                        key={n}
                        style={[styles.cell, inside && styles.cellInside, edge && styles.cellEdge]}
                        onPress={() => tapVerse(n)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: edge || inside }}
                        accessibilityLabel={t('surahLearnMode.verseN', { verse: n })}
                      >
                        <Text style={[styles.cellText, inside && styles.cellTextInside, edge && styles.cellTextEdge]}>{n}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
                <Pressable
                  style={styles.done}
                  onPress={() => {
                    props.onVerses(pickStart, pickEnd);
                    onClose();
                  }}
                  accessibilityRole="button"
                >
                  <Text style={styles.doneText}>
                    {pickStart === pickEnd
                      ? t('surahLearnMode.learnVerse', { verse: pickStart })
                      : t('surahLearnMode.learnVerses', { start: pickStart, end: pickEnd })}
                  </Text>
                </Pressable>
              </View>
            )}

            {kind !== 'verses' && (
              <Pressable style={styles.done} onPress={onClose} accessibilityRole="button">
                <Text style={styles.doneText}>{t('surahLearnMode.done')}</Text>
              </Pressable>
            )}
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
    maxHeight: '85%',
  },
  safe: {
    paddingHorizontal: gutter,
    paddingBottom: space.lg,
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
    gap: space.sm,
    paddingTop: space.xs,
  },
  versesBody: {
    flexShrink: 1,
  },
  label: {
    ...type.caption,
    color: color.textMuted,
  },
  labelGap: {
    marginTop: space.md,
  },
  hint: {
    ...type.caption,
    color: color.textMuted,
    marginTop: space.xs,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
    padding: space.md,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: color.surface,
    borderColor: color.accentStrong,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: color.border,
    marginTop: 1,
  },
  radioSelected: {
    borderWidth: 6,
    borderColor: color.accentStrong,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
  },
  optionNote: {
    ...type.caption,
    color: color.textMuted,
    marginTop: 2,
  },
  segments: {
    flexDirection: 'row',
    gap: space.sm,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: space.md,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
  },
  segmentOn: {
    backgroundColor: color.accent,
  },
  segmentText: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
    fontVariant: ['tabular-nums'],
  },
  segmentTextOn: {
    color: color.textOnAccent,
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.xs,
  },
  customLabel: {
    flex: 1,
    ...type.caption,
    color: color.textMuted,
  },
  stepper: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperDisabled: {
    opacity: 0.35,
  },
  customValue: {
    minWidth: 52,
    textAlign: 'center',
    ...type.bodyLarge,
    fontWeight: weight.semibold,
    color: color.text,
    fontVariant: ['tabular-nums'],
  },
  // A count that is not one of the buttons above is the chosen one.
  customValueOn: {
    color: color.accentStrong,
  },
  quickRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginBottom: space.xs,
  },
  quick: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border,
  },
  quickText: {
    ...type.caption,
    fontWeight: weight.semibold,
    color: color.accentStrong,
  },
  gridScroll: {
    flexGrow: 0,
    maxHeight: 300,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
    paddingVertical: space.xs,
  },
  cell: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellInside: {
    backgroundColor: color.accentSoft,
  },
  cellEdge: {
    backgroundColor: color.accent,
  },
  cellText: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
    fontVariant: ['tabular-nums'],
  },
  cellTextInside: {
    color: color.accentStrong,
  },
  cellTextEdge: {
    color: color.textOnAccent,
  },
  done: {
    marginTop: space.lg,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: radius.md,
    backgroundColor: color.accent,
  },
  doneText: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.textOnAccent,
  },
});

export default LearnSettingsSheet;
