import { useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useQuranStore } from '../../src/stores/quranStore';
import { useProphetStoriesStore } from '../../src/stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../src/stores/quranStoriesStore';
import { useDuasStore } from '../../src/stores/duasStore';
import { TOTAL_PROPHETS } from '../../src/data/arabic/prophets';
import { TOTAL_QURAN_STORIES } from '../../src/data/arabic/quranStories';
import { TOTAL_DUAS } from '../../src/types/duas';
import { TAJWEED_RULES } from '../../src/data/arabic/quran';
import { TOTAL_PRAYER_LESSONS } from '../../src/types/prayer';
import {
  Txt,
  Arabic,
  Section,
  Card,
  IconTile,
  ProgressBar,
  Stat,
  IlluminatedRule,
  MastheadWash,
  withAlpha,
} from '../../src/components/ui/Primitives';
import { color, space, radius, gutter } from '../../src/theme/tokens';

/**
 * Colour carries meaning on this screen: gold for revealed text, indigo for
 * study activities, emerald for practice. The previous six-hue mix (cyan
 * quizzes, violet stories, amber duas) grouped nothing.
 */
export default function QuranScreen() {
  const { t } = useTranslation();
  const progress = useQuranStore((s) => s.progress);
  const getOverallCompletionPercent = useQuranStore((s) => s.getOverallCompletionPercent);
  const getTotalSurahsCompleted = useQuranStore((s) => s.getTotalSurahsCompleted);
  const getJuzCompleted = useQuranStore((s) => s.getJuzCompleted);
  const getHizbCompleted = useQuranStore((s) => s.getHizbCompleted);

  const getProphetStoriesCompleted = useProphetStoriesStore((s) => s.getTotalStoriesCompleted);
  const getQuranStoriesCompleted = useQuranStoriesStore((s) => s.getTotalStoriesCompleted);
  const getMemorizedCount = useDuasStore((s) => s.getMemorizedCount);

  const overallProgress = useMemo(() => getOverallCompletionPercent(), [progress]);
  const surahsCompleted = useMemo(() => getTotalSurahsCompleted(), [progress]);
  const juzCompleted = useMemo(() => getJuzCompleted(), [progress]);
  const hizbCompleted = useMemo(() => getHizbCompleted(), [progress]);
  const duasMemorized = useMemo(() => getMemorizedCount(), [getMemorizedCount]);
  const prophetStoriesCompleted = useMemo(() => getProphetStoriesCompleted(), [getProphetStoriesCompleted]);
  const quranStoriesCompleted = useMemo(() => getQuranStoriesCompleted(), [getQuranStoriesCompleted]);
  const totalStoriesCompleted = prophetStoriesCompleted + quranStoriesCompleted;
  const tajweedLearned = progress.tajweedProgress.rulesLearned.length;
  const totalStories = TOTAL_PROPHETS + TOTAL_QURAN_STORIES;

  const actions = [
    {
      key: 'stories',
      icon: 'library' as const,
      tint: color.accent,
      title: t('quran.stories'),
      desc: t('quran.prophetsAndMore'),
      badge: `${totalStoriesCompleted}/${totalStories}`,
      onPress: () => router.push('/quran/stories'),
    },
    {
      key: 'duas',
      // Ionicons has no one at prayer; the card draws FontAwesome's instead.
      icon: 'hand-left' as const,
      faIcon: 'person-praying' as const,
      tint: color.sacred,
      title: t('quran.duas'),
      desc: t('quran.propheticPrayers'),
      badge: `${duasMemorized}/${TOTAL_DUAS}`,
      onPress: () => router.push('/quran/duas'),
    },
    {
      key: 'tajweed',
      icon: 'volume-high' as const,
      tint: color.sacred,
      title: t('quran.tajweed'),
      desc: t('quran.tajweedDesc'),
      badge: `${tajweedLearned}/${TAJWEED_RULES.length}`,
      onPress: () => router.push('/quran/tajweed-learn'),
    },
    {
      key: 'quiz',
      icon: 'help-circle' as const,
      tint: color.accent,
      title: t('quran.quizzes'),
      desc: t('quran.testKnowledge'),
      onPress: () => router.push('/quran/quiz'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MastheadWash />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Masthead — the most reverent moment in the app: the Arabic title set
            centred in the Quranic cut, framed by the illuminated rule. */}
        <View style={styles.header}>
          <Arabic size="hero" quranic align="center" style={styles.titleArabic}>
            القرآن الكريم
          </Arabic>
          <Txt variant="caption" tone="faint" style={styles.titleLatin}>
            {t('quran.title')}
          </Txt>
          <IlluminatedRule style={styles.rule} />
        </View>

        {/* The Quran and the reader's progress through it, one card: a tap
            opens all 114 surahs. */}
        <Section style={styles.firstSection}>
          <Card
            onPress={() => router.push('/quran/all-surahs')}
            accent={color.sacred}
            raised
            accessibilityLabel={`${t('quran.quranTitle')}, ${t('quran.allSurahs')}. ${t('quran.yourProgress')} ${overallProgress}%`}
          >
            <View style={styles.progressHead}>
              <IconTile name="book" tint={color.sacred} />
              <View style={styles.quranTitle}>
                <Txt variant="bodyLarge" weight="semibold">{t('quran.quranTitle')}</Txt>
                <Txt variant="caption" tone="faint">{t('quran.allSurahs')}</Txt>
              </View>
              <Txt variant="bodyLarge" weight="bold" tone="progress">{overallProgress}%</Txt>
              <Ionicons name="chevron-forward" size={20} color={color.textFaint} />
            </View>
            <ProgressBar value={overallProgress} style={styles.progressBar} />
            <View style={styles.statsRow}>
              <Stat value={surahsCompleted} label={t('quran.surahs')} tint={color.progress} />
              <View style={styles.statDivider} />
              <Stat value={juzCompleted} label={t('quran.juz')} tint={color.progress} />
              <View style={styles.statDivider} />
              <Stat value={hizbCompleted} label={t('quran.hizb')} tint={color.progress} />
            </View>
            {/* Says what the card does: a stats card did not look like it opened. */}
            <View style={styles.readButton}>
              <Ionicons name="book-outline" size={18} color={color.textOnAccent} />
              <Txt variant="body" weight="semibold" style={styles.readButtonText}>{t('quran.readQuran')}</Txt>
            </View>
          </Card>
        </Section>

        {/* Quick actions */}
        <Section>
          <View style={styles.grid}>
            {actions.map((a) => (
              <Card
                key={a.key}
                onPress={a.onPress}
                accessibilityLabel={a.title}
                style={styles.actionCard}
              >
                <View style={styles.actionTop}>
                  <IconTile name={a.icon} faName={'faIcon' in a ? a.faIcon : undefined} tint={a.tint} />
                  {a.badge ? (
                    <View style={[styles.badge, { backgroundColor: withAlpha(a.tint, 0.16) }]}>
                      <Txt variant="micro" weight="semibold" style={{ color: a.tint }}>{a.badge}</Txt>
                    </View>
                  ) : null}
                </View>
                <Txt variant="body" weight="semibold" style={styles.actionTitle}>{a.title}</Txt>
                <Txt variant="caption" tone="faint">{a.desc}</Txt>
              </Card>
            ))}
          </View>
        </Section>

        {/* Islamic practice */}
        <Section title={t('quran.islamicPractice')}>
          <Card
            onPress={() => router.push('/quran/prayer')}
            accent={color.progress}
            accessibilityLabel={t('quran.prayerPractice')}
            style={styles.practiceCard}
          >
            <IconTile name="body" tint={color.progress} />
            <View style={styles.practiceContent}>
              <Txt variant="body" weight="semibold">{t('quran.prayerPractice')}</Txt>
              <Arabic size="inline" align="left" style={styles.practiceArabic}>تعلم الصلاة</Arabic>
              <Txt variant="caption" tone="faint">
                {t('quran.lessonsCount', { count: TOTAL_PRAYER_LESSONS })}
              </Txt>
            </View>
            <Ionicons name="chevron-forward" size={20} color={color.textFaint} />
          </Card>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
  },
  scroll: {
    paddingBottom: 110,
  },

  // Masthead
  header: {
    paddingHorizontal: gutter,
    paddingTop: space.sm,
    paddingBottom: space.lg,
    alignItems: 'center',
  },
  titleArabic: {
    alignSelf: 'stretch',
  },
  titleLatin: {
    marginTop: space.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  rule: {
    alignSelf: 'stretch',
    marginTop: space.lg,
  },
  firstSection: {
    marginBottom: space['2xl'],
  },

  // Progress
  progressHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    marginBottom: space.sm,
  },
  quranTitle: {
    flex: 1,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    marginTop: space.md,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: color.sacred,
  },
  readButtonText: {
    color: color.textOnAccent,
  },
  progressBar: {
    marginBottom: space.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: StyleSheet.hairlineWidth * 2,
    alignSelf: 'stretch',
    backgroundColor: color.border,
  },

  // Actions
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: space.md,
  },
  actionCard: {
    width: '48%',
    minHeight: 132,
  },
  actionTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  actionTitle: {
    marginTop: space.md,
  },

  // Practice
  practiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    paddingLeft: space.xl,
  },
  practiceContent: {
    flex: 1,
  },
  practiceArabic: {
    marginTop: 1,
    marginBottom: 1,
  },
});
