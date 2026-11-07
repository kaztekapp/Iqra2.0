import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Paths } from 'expo-file-system';
import { audioCacheService } from '../src/services/audioCacheService';
import { QURAN_RECITERS, type ReciterId } from '../src/services/quranAudioService';
import { clipStoreSize, clearClips, VOICE_STORE_LIMIT } from '../src/services/speech/arabicVoiceCache';
import { color, font, radius } from '../src/theme/tokens';
import { quietly } from '../src/lib/report';

type Usage = {
  reciters: { reciterId: string; bytes: number; verses: number }[];
  voices: number;
  free: number | null;
};

/** Read from the files themselves each time: nothing to keep in sync. */
function measure(): Usage {
  let free: number | null = null;
  try {
    free = Paths.availableDiskSpace;
  } catch {
    free = null;
  }
  return { reciters: audioCacheService.reciterUsage(), voices: clipStoreSize(), free };
}

/**
 * What the app keeps on the phone so it plays without internet: the Quran
 * recitations, per reciter, and the voices (stories, duas, the learning
 * voice). Each can be cleared; cleared audio streams again and is kept again
 * as it is heard. Gold is the Quran here as everywhere in the app, emerald
 * the voices.
 */
export default function StorageScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [usage, setUsage] = useState<Usage | null>(null);

  const refresh = useCallback(() => setUsage(measure()), []);
  // Measured after the screen is up: listing thousands of verse files must
  // not hold up the slide in.
  useEffect(() => {
    const id = setTimeout(refresh, 50);
    return () => clearTimeout(id);
  }, [refresh]);

  const size = (bytes: number) => {
    const fmt = (n: number, digits: number) =>
      n.toLocaleString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { maximumFractionDigits: digits });
    if (bytes >= 1024 ** 3) return t('storage.gb', { n: fmt(bytes / 1024 ** 3, 2) });
    return t('storage.mb', { n: fmt(bytes / 1024 ** 2, bytes < 10 * 1024 ** 2 ? 1 : 0) });
  };

  const reciterName = (id: string) => QURAN_RECITERS[id as ReciterId]?.nameEnglish ?? id;
  const reciterArabic = (id: string) => QURAN_RECITERS[id as ReciterId]?.nameArabic;

  const clearReciter = (id: string) => {
    Alert.alert(t('storage.clearReciterTitle', { name: reciterName(id) }), t('storage.clearBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('storage.clear'),
        style: 'destructive',
        onPress: () => {
          audioCacheService
            .clearReciter(id)
            .catch((e) => quietly(e, 'storage.clearReciter'))
            .finally(refresh);
        },
      },
    ]);
  };

  const clearVoices = () => {
    Alert.alert(t('storage.clearVoicesTitle'), t('storage.clearBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('storage.clear'),
        style: 'destructive',
        onPress: () => {
          clearClips();
          refresh();
        },
      },
    ]);
  };

  const quran = usage ? usage.reciters.reduce((n, r) => n + r.bytes, 0) : 0;
  const total = quran + (usage?.voices ?? 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('a11y.back')} style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={color.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{t('storage.title')}</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.arabic} allowFontScaling={false}>الاِسْتِمَاعُ دُونَ اتِّصَالٍ</Text>

        {!usage ? (
          <ActivityIndicator color={color.progress} style={styles.loading} />
        ) : (
          <>
            {/* How much, and of what: one bar, gold for the Quran, emerald for the voices. */}
            <View style={styles.summary} accessible accessibilityLabel={`${t('storage.kept')}: ${size(total)}`}>
              <Text style={styles.summaryLabel}>{t('storage.kept')}</Text>
              <Text style={styles.summaryValue}>{size(total)}</Text>
              <View style={styles.bar}>
                {total > 0 ? (
                  <>
                    {quran > 0 && <View style={[styles.barPart, { flex: quran, backgroundColor: color.sacred }]} />}
                    {usage.voices > 0 && <View style={[styles.barPart, { flex: usage.voices, backgroundColor: color.accent }]} />}
                  </>
                ) : null}
              </View>
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: color.sacred }]} />
                  <Text style={styles.legendText}>{t('storage.quran')} {size(quran)}</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: color.accent }]} />
                  <Text style={styles.legendText}>{t('storage.voices')} {size(usage.voices)}</Text>
                </View>
              </View>
              {usage.free != null && usage.free > 0 && (
                <Text style={styles.free}>{t('storage.free', { size: size(usage.free) })}</Text>
              )}
            </View>

            <Text style={styles.note}>{t('storage.note')}</Text>

            {/* Quran recitation, one row per reciter */}
            <Text style={styles.sectionTitle}>{t('storage.quran')}</Text>
            <View style={styles.card}>
              {usage.reciters.length === 0 ? (
                <Text style={styles.empty}>{t('storage.quranEmpty')}</Text>
              ) : (
                usage.reciters.map((r, i) => (
                  <View key={r.reciterId} style={[styles.row, i > 0 && styles.rowDivided]}>
                    <View style={styles.rowText}>
                      <Text style={styles.rowTitle} numberOfLines={1}>{reciterName(r.reciterId)}</Text>
                      {reciterArabic(r.reciterId) ? (
                        <Text style={styles.rowArabic} allowFontScaling={false} numberOfLines={1}>{reciterArabic(r.reciterId)}</Text>
                      ) : null}
                      <Text style={styles.rowMeta}>
                        {size(r.bytes)}, {t('storage.verses', { count: r.verses })}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => clearReciter(r.reciterId)}
                      style={styles.clear}
                      hitSlop={6}
                      accessibilityRole="button"
                      accessibilityLabel={`${t('storage.clear')} ${reciterName(r.reciterId)}`}
                    >
                      <Text style={styles.clearText}>{t('storage.clear')}</Text>
                    </Pressable>
                  </View>
                ))
              )}
            </View>

            {/* The voices */}
            <Text style={styles.sectionTitle}>{t('storage.voices')}</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>{t('storage.voicesWhat')}</Text>
                  <Text style={styles.rowMeta}>
                    {usage.voices > 0
                      ? t('storage.ofLimit', { size: size(usage.voices), limit: size(VOICE_STORE_LIMIT) })
                      : t('storage.voicesEmpty')}
                  </Text>
                </View>
                {usage.voices > 0 && (
                  <Pressable
                    onPress={clearVoices}
                    style={styles.clear}
                    hitSlop={6}
                    accessibilityRole="button"
                    accessibilityLabel={`${t('storage.clear')} ${t('storage.voices')}`}
                  >
                    <Text style={styles.clearText}>{t('storage.clear')}</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: color.text,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  arabic: {
    fontFamily: font.quran,
    fontSize: 26,
    lineHeight: 52,
    color: color.sacred,
    textAlign: 'center',
    marginBottom: 16,
  },
  loading: {
    marginTop: 40,
  },
  summary: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    padding: 18,
  },
  summaryLabel: {
    fontSize: 14,
    color: color.textMuted,
  },
  summaryValue: {
    fontSize: 34,
    fontWeight: '700',
    color: color.text,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
  bar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: color.surfaceSunken,
    marginTop: 14,
    gap: 2,
  },
  barPart: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
    rowGap: 6,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    color: color.textMuted,
    fontVariant: ['tabular-nums'],
  },
  free: {
    fontSize: 13,
    color: color.textFaint,
    marginTop: 12,
  },
  note: {
    fontSize: 14,
    color: color.textMuted,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: color.text,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  empty: {
    fontSize: 14,
    color: color.textMuted,
    lineHeight: 21,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  rowDivided: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.border,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: color.text,
  },
  rowArabic: {
    fontFamily: font.quran,
    fontSize: 15,
    lineHeight: 28,
    color: color.sacred,
    textAlign: 'left',
  },
  rowMeta: {
    fontSize: 13,
    color: color.textMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
  clear: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.bg,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '600',
    color: color.danger,
  },
});
