/**
 * The four Learn mode settings, one sheet each: the voice, how many times a
 * verse repeats (and what happens after), the speed, and which verses.
 *
 * Verses are chosen with a Start and an End row: - and + (hold to run),
 * or tap the number to type it.
 *
 * Each opens from a chip that already shows its current choice, so the main
 * screen stays one verse and one button. Follows the listen and voice sheets:
 * same scrim, sheet, handle and row rhythm. Styles are plain arrays: NativeWind
 * drops Pressable's style function on device (see Card in Primitives).
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SurahList, memorizationIndex, LAST_SURAH_TO_LEARN } from './SurahPickerSheet';
import { getSurahById } from '../../data/arabic/quran';
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
  onRepeat: (count: number) => void;
  // speed
  speed: number;
  onSpeed: (speed: number) => void;
  // verses
  verseCount: number;
  currentVerse: number;
  startVerse: number;
  endVerse: number;
  onVerses: (start: number, end: number) => void;
  /** When the last verse of the surah ends: again, or the next surah. */
  afterSurah: 'repeat' | 'next';
  onAfterSurah: (mode: 'repeat' | 'next') => void;
  /** The surah that comes next, null after the last one. */
  nextSurahName: string | null;
  /** Going on to the next surah: the one it starts with (the one on screen) and the one it stops after. */
  startSurahId: string;
  stopSurahId: string;
  /** Applied on Done: the surah to start with and the one to stop after. */
  onRun: (startId: string, stopId: string) => void;
}

/** A row that opens the surah list: what it sets, and the surah chosen. */
function SurahRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <Pressable style={styles.surahRow} onPress={onPress} accessibilityRole="button" accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.surahRowLabel}>{label}</Text>
      <Text style={styles.surahRowValue} numberOfLines={1}>{value}</Text>
      <Ionicons name="chevron-down" size={18} color={color.accentStrong} />
    </Pressable>
  );
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

/**
 * A verse number with - and + either side. A tap moves one verse; holding
 * keeps going, faster after a moment, so verse 250 is a short hold away. The
 * number itself can be tapped and typed.
 */
function VerseStepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const { t } = useTranslation();
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);

  // Holding a button: one step at once, then repeats that speed up.
  const valueRef = useRef(value);
  valueRef.current = value;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => stop, []);
  const start = (delta: number) => {
    stop();
    let steps = 0;
    const tick = () => {
      const next = Math.max(min, Math.min(max, valueRef.current + delta));
      if (next === valueRef.current) return stop();
      valueRef.current = next;
      onChange(next);
      steps += 1;
      timer.current = setTimeout(tick, steps === 1 ? 400 : steps < 10 ? 110 : 40);
    };
    tick();
  };

  const commit = () => {
    const n = parseInt(text, 10);
    if (Number.isFinite(n)) onChange(Math.max(min, Math.min(max, n)));
    else setText(String(value));
  };

  return (
    <View style={styles.stepRow}>
      <Text style={styles.stepLabel}>{label}</Text>
      <Pressable
        style={[styles.stepButton, value <= min && styles.stepperDisabled]}
        onPressIn={() => start(-1)}
        onPressOut={stop}
        disabled={value <= min}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${t('surahLearnMode.verseBefore')}`}
      >
        <Ionicons name="remove" size={22} color={color.text} />
      </Pressable>
      <TextInput
        style={styles.stepInput}
        value={text}
        onChangeText={(v) => {
          if (v === '' || /^\d{1,3}$/.test(v)) setText(v);
        }}
        onEndEditing={commit}
        onSubmitEditing={commit}
        keyboardType="number-pad"
        returnKeyType="done"
        selectTextOnFocus
        maxLength={3}
        accessibilityLabel={label}
      />
      <Pressable
        style={[styles.stepButton, value >= max && styles.stepperDisabled]}
        onPressIn={() => start(1)}
        onPressOut={stop}
        disabled={value >= max}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${t('surahLearnMode.verseAfter')}`}
      >
        <Ionicons name="add" size={22} color={color.text} />
      </Pressable>
    </View>
  );
}

export function LearnSettingsSheet(props: Props) {
  const { t } = useTranslation();
  const { kind, onClose } = props;

  // The verses being chosen; they apply only when the reader confirms.
  const [pickStart, setPickStart] = useState(props.startVerse);
  const [pickEnd, setPickEnd] = useState(props.endVerse);
  // A run of surahs being chosen: shown in the sheet, applied on Done. The
  // surah list opens inside the sheet, in place of its content, so choosing
  // never closes it.
  const [runStart, setRunStart] = useState(props.startSurahId);
  const [runStop, setRunStop] = useState(props.stopSurahId);
  const [picking, setPicking] = useState<'start' | 'stop' | null>(null);
  useEffect(() => {
    if (kind === 'verses') {
      setPickStart(props.startVerse);
      setPickEnd(props.endVerse);
      setRunStart(props.startSurahId);
      setRunStop(props.stopSurahId);
      setPicking(null);
    }
  }, [kind]);
  const nameOf = (id: string) => getSurahById(id)?.nameEnglish ?? id;

  const stepRepeat = (n: number) => props.onRepeat(Math.max(1, Math.min(MAX_REPEAT, n)));

  // Start and End never cross: moving one past the other carries it along.
  const changeStart = (n: number) => {
    setPickStart(n);
    if (n > pickEnd) setPickEnd(n);
  };
  const changeEnd = (n: number) => {
    setPickEnd(n);
    if (n < pickStart) setPickStart(n);
  };

  const quick = (start: number, end: number) => {
    setPickStart(start);
    setPickEnd(Math.min(end, props.verseCount));
  };

  const title =
    picking === 'start' ? t('surahLearnMode.startWith')
    : picking === 'stop' ? t('surahLearnMode.stopAfter')
    : kind === 'voice' ? t('surahLearnMode.sheetVoice')
    : kind === 'repeat' ? t('surahLearnMode.sheetRepeat')
    : kind === 'speed' ? t('surahLearnMode.sheetSpeed')
    : t('surahLearnMode.sheetVerses');

  return (
    <Modal visible={kind !== null} animationType="slide" transparent onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.scrim} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={t('listen.close')} />
        <View style={styles.sheet}>
          <SafeAreaView edges={['bottom']} style={styles.safe}>
            <View style={styles.handleRow}>
              <View style={styles.handle} />
            </View>
            <View style={styles.topRow}>
              {picking && (
                <Pressable onPress={() => setPicking(null)} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('a11y.back')}>
                  <Ionicons name="arrow-back" size={22} color={color.text} />
                </Pressable>
              )}
              <Text style={[styles.title, picking && styles.titlePicking]}>{title}</Text>
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

            {kind === 'verses' && picking && (
              <View style={styles.pickList}>
                <SurahList
                  currentSurahId={picking === 'start' ? runStart : runStop}
                  fromSurahId={picking === 'stop' ? runStart : undefined}
                  onPick={(s) => {
                    if (picking === 'start') {
                      setRunStart(s.id);
                      // A start after the stop: the run goes on to the end of the list.
                      if (memorizationIndex(runStop) < memorizationIndex(s.id)) setRunStop(LAST_SURAH_TO_LEARN.id);
                    } else {
                      setRunStop(s.id);
                    }
                    setPicking(null);
                  }}
                />
              </View>
            )}

            {kind === 'verses' && !picking && (
              <View style={styles.body}>
                <Text style={styles.label}>{t('surahLearnMode.whenSurahEnds')}</Text>
                <Option
                  selected={props.afterSurah === 'repeat'}
                  title={t('surahLearnMode.repeatSurahTitle')}
                  note={t('surahLearnMode.repeatSurahNote')}
                  onPress={() => props.onAfterSurah('repeat')}
                />
                {props.nextSurahName && (
                  <Option
                    selected={props.afterSurah === 'next'}
                    title={t('surahLearnMode.nextSurahTitle')}
                    note={t('surahLearnMode.nextSurahNote', { surah: props.nextSurahName })}
                    onPress={() => {
                      // Going on means hearing each surah whole.
                      props.onAfterSurah('next');
                      quick(1, props.verseCount);
                    }}
                  />
                )}
                {/* Going on: which surah to start with and which to stop after. */}
                {props.afterSurah === 'next' && (
                  <>
                    <Text style={[styles.label, styles.labelGap]}>{t('surahLearnMode.whichSurahs')}</Text>
                    <SurahRow label={t('surahLearnMode.startWith')} value={nameOf(runStart)} onPress={() => setPicking('start')} />
                    <SurahRow label={t('surahLearnMode.stopAfter')} value={nameOf(runStop)} onPress={() => setPicking('stop')} />
                    <Text style={styles.hint}>{t('surahLearnMode.surahRunHint', { stop: nameOf(runStop) })}</Text>
                    <Pressable
                      style={styles.done}
                      onPress={() => {
                        props.onRun(runStart, runStop);
                        onClose();
                      }}
                      accessibilityRole="button"
                    >
                      <Text style={styles.doneText}>{t('surahLearnMode.done')}</Text>
                    </Pressable>
                  </>
                )}
                {/* Going on to the next surah plays each one whole: no verses to pick. */}
                {props.afterSurah === 'repeat' && (
                  <>
                    <Text style={[styles.label, styles.labelGap]}>{t('surahLearnMode.whichVerses')}</Text>
                    <View style={styles.quickRow}>
                      <Pressable style={styles.quick} onPress={() => quick(props.currentVerse, props.currentVerse)} accessibilityRole="button">
                        <Text style={styles.quickText}>{t('surahLearnMode.thisVerse')}</Text>
                      </Pressable>
                      <Pressable style={styles.quick} onPress={() => quick(props.currentVerse, props.currentVerse + 4)} accessibilityRole="button">
                        <Text style={styles.quickText}>{t('surahLearnMode.next5')}</Text>
                      </Pressable>
                      <Pressable style={styles.quick} onPress={() => quick(1, props.verseCount)} accessibilityRole="button">
                        <Text style={styles.quickText}>{t('surahLearnMode.wholeSurah')}</Text>
                      </Pressable>
                    </View>
                    <VerseStepper label={t('surahLearnMode.fromVerse')} value={pickStart} min={1} max={props.verseCount} onChange={changeStart} />
                    <VerseStepper label={t('surahLearnMode.toVerse')} value={pickEnd} min={1} max={props.verseCount} onChange={changeEnd} />
                    <Text style={styles.hint}>{t('surahLearnMode.holdHint', { total: props.verseCount })}</Text>
                  </>
                )}
                {props.afterSurah === 'repeat' && (
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
                )}
              </View>
            )}

            {kind !== 'verses' && (
              <Pressable style={styles.done} onPress={onClose} accessibilityRole="button">
                <Text style={styles.doneText}>{t('surahLearnMode.done')}</Text>
              </Pressable>
            )}
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
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
  label: {
    ...type.caption,
    color: color.textMuted,
  },
  labelGap: {
    marginTop: space.md,
  },
  titlePicking: {
    flex: 1,
    marginLeft: space.sm,
  },
  pickList: {
    height: 460,
    gap: space.sm,
  },
  surahRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
  },
  surahRowLabel: {
    ...type.body,
    color: color.textMuted,
  },
  surahRowValue: {
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
    flex: 1,
    textAlign: 'right',
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
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.sm,
  },
  stepLabel: {
    flex: 1,
    ...type.body,
    fontWeight: weight.semibold,
    color: color.text,
  },
  stepButton: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInput: {
    width: 72,
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: color.border,
    textAlign: 'center',
    ...type.bodyLarge,
    fontWeight: weight.semibold,
    color: color.text,
    fontVariant: ['tabular-nums'],
    paddingVertical: 0,
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
