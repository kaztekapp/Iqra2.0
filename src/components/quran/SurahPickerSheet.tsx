/**
 * Choose the surah to learn, from inside Learn mode.
 *
 * Follows the listen and voice sheets: same scrim, sheet, handle and row
 * rhythm. Surahs are listed in memorization order (Al-Fatihah, then An-Nas
 * down to Al-Baqarah). Row styles are plain arrays: NativeWind drops Pressable's style
 * function on device (see Card in Primitives). All 114 rows have one fixed height, so the list opens already
 * scrolled to the surah being learned rather than at Al-Fatihah.
 */
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SURAHS } from '../../data/arabic/quran/surahs';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { withAlpha } from '../ui/Primitives';
import { color, font, radius, type, weight, space, gutter } from '../../theme/tokens';

type Surah = (typeof SURAHS)[number];

interface Props {
  visible: boolean;
  currentSurahId: string;
  onPick: (surah: Surah) => void;
  onClose: () => void;
  /** The heading, when choosing for something other than this screen. */
  title?: string;
  /** Only this surah and those after it can be chosen (memorization order):
   * a run of surahs always plays forward. The ones before stay listed, greyed. */
  fromSurahId?: string;
}

const ROW_HEIGHT = 64;

/**
 * The order people memorize in: Al-Fatihah, then from An-Nas back towards
 * Al-Baqarah, the short surahs first.
 */
const MEMORIZATION_ORDER: Surah[] = [
  ...SURAHS.filter((s) => s.surahNumber === 1),
  ...SURAHS.filter((s) => s.surahNumber !== 1).sort((a, b) => b.surahNumber - a.surahNumber),
];

/** Where a surah falls in memorization order (-1 if unknown). */
export function memorizationIndex(surahId: string): number {
  return MEMORIZATION_ORDER.findIndex((s) => s.id === surahId);
}

/** The last surah in memorization order (Al-Baqarah). */
export const LAST_SURAH_TO_LEARN: Surah = MEMORIZATION_ORDER[MEMORIZATION_ORDER.length - 1];

/** The surah learned after this one (memorization order), or null after the last. */
export function nextSurahToLearn(surahId: string): Surah | null {
  const i = MEMORIZATION_ORDER.findIndex((s) => s.id === surahId);
  return i >= 0 && i < MEMORIZATION_ORDER.length - 1 ? MEMORIZATION_ORDER[i + 1] : null;
}

/** Arabic without its marks, and Latin without case or accents, for search. */
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ًͯ-ٰٟ]/g, '')
    .replace(/[''`ʿʾ-]/g, '')
    .toLowerCase();

export function SurahPickerSheet({ visible, currentSurahId, onPick, onClose, title, fromSurahId }: Props) {
  const { t } = useTranslation();
  const { lc } = useLocalizedContent();
  const [query, setQuery] = useState('');

  const order = MEMORIZATION_ORDER;
  const fromIndex = fromSurahId ? Math.max(0, MEMORIZATION_ORDER.findIndex((s) => s.id === fromSurahId)) : 0;

  const results = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return order;
    if (/^\d+$/.test(q)) return order.filter((s) => String(s.surahNumber).startsWith(q));
    return order.filter((s) =>
      [s.nameEnglish, s.nameTransliteration, s.nameArabic, s.meaning, s.meaningFr].some((f) => f && fold(f).includes(q))
    );
  }, [query, order]);

  const currentIndex = order.findIndex((s) => s.id === currentSurahId);

  const close = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={close}>
      <View style={styles.scrim}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityRole="button" accessibilityLabel={t('listen.close')} />
        <View style={styles.sheet}>
          <SafeAreaView edges={['bottom']} style={styles.safe}>
            <View style={styles.handleRow}>
              <View style={styles.handle} />
            </View>

            <View style={styles.topRow}>
              <Text style={styles.title}>{title ?? t('surahLearnMode.chooseSurah')}</Text>
              <Pressable onPress={close} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('listen.close')}>
                <Ionicons name="close" size={22} color={color.textMuted} />
              </Pressable>
            </View>

            <View style={styles.search}>
              <Ionicons name="search" size={18} color={color.textFaint} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t('surahLearnMode.searchSurah')}
                placeholderTextColor={color.textFaint}
                style={styles.searchInput}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                accessibilityLabel={t('surahLearnMode.searchSurah')}
              />
              {query ? (
                <Pressable onPress={() => setQuery('')} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('common.clear')}>
                  <Ionicons name="close-circle" size={18} color={color.textFaint} />
                </Pressable>
              ) : null}
            </View>

            <FlatList
              data={results}
              keyExtractor={(s) => s.id}
              style={styles.list}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              getItemLayout={(_, index) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index })}
              initialScrollIndex={!query && currentIndex > 2 ? currentIndex - 2 : undefined}
              initialNumToRender={16}
              ListEmptyComponent={<Text style={styles.empty}>{t('surahLearnMode.noSurahFound', { query: query.trim() })}</Text>}
              renderItem={({ item }) => {
                const selected = item.id === currentSurahId;
                const disabled = memorizationIndex(item.id) < fromIndex;
                return (
                  <Pressable
                    style={[styles.row, selected && styles.rowSelected, disabled && styles.rowDisabled]}
                    disabled={disabled}
                    android_ripple={{ color: color.surfaceSunken }}
                    onPress={() => {
                      setQuery('');
                      onPick(item);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected, disabled }}
                    accessibilityLabel={`${item.surahNumber}. ${item.nameEnglish}, ${lc(item.meaning, item.meaningFr)}, ${t('surahLearnMode.ayahCount', { count: item.ayahCount })}`}
                  >
                    <View style={[styles.number, selected && styles.numberSelected]}>
                      <Text style={[styles.numberText, selected && styles.numberTextSelected]}>{item.surahNumber}</Text>
                    </View>
                    <View style={styles.rowText}>
                      <Text style={styles.rowTitle} numberOfLines={1}>{item.nameEnglish}</Text>
                      <Text style={styles.rowSub} numberOfLines={1}>
                        {lc(item.meaning, item.meaningFr)}, {t('surahLearnMode.ayahCount', { count: item.ayahCount })}
                      </Text>
                    </View>
                    <Text style={styles.rowArabic} allowFontScaling={false}>{item.nameArabic}</Text>
                  </Pressable>
                );
              }}
            />
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
    height: '85%',
  },
  safe: {
    flex: 1,
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
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    height: 44,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
    marginTop: space.xs,
    marginBottom: space.sm,
  },
  searchInput: {
    flex: 1,
    ...type.body,
    color: color.text,
    paddingVertical: 0,
  },
  list: {
    flex: 1,
  },
  rowDisabled: {
    opacity: 0.35,
  },
  row: {
    height: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.sm,
    borderRadius: radius.md,
  },
  rowSelected: {
    backgroundColor: color.sacredSoft,
  },
  // The surah number in a ring of gold: Quran content is marked gold across
  // the app; the filled medallion is the surah being learned.
  number: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: withAlpha(color.sacred, 0.45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberSelected: {
    backgroundColor: color.sacred,
    borderColor: color.sacred,
  },
  numberText: {
    ...type.caption,
    fontWeight: weight.semibold,
    color: color.sacred,
    fontVariant: ['tabular-nums'],
  },
  numberTextSelected: {
    color: color.textOnAccent,
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
    marginTop: 1,
  },
  rowArabic: {
    fontFamily: font.quran,
    fontSize: 20,
    lineHeight: 36,
    color: color.sacred,
  },
  empty: {
    ...type.body,
    color: color.textFaint,
    textAlign: 'center',
    paddingVertical: space['2xl'],
  },
});

export default SurahPickerSheet;
