import { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../../src/stores/progressStore';
import { MODULES } from '../../src/components/home/ContinueLearningCard';
import { useProphetStoriesStore } from '../../src/stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../src/stores/quranStoriesStore';
import { TOTAL_PROPHETS } from '../../src/data/arabic/prophets';
import { TOTAL_QURAN_STORIES } from '../../src/data/arabic/quranStories';
import { useLearnModeStore } from '../../src/stores/learnModeStore';
import { getSurahById } from '../../src/data/arabic/quran';
import {
  Txt,
  Arabic,
  Section,
  Card,
  IconTile,
  IlluminatedRule,
  MastheadWash,
  withAlpha,
} from '../../src/components/ui/Primitives';
import { color, type, weight, space, radius, gutter, font } from '../../src/theme/tokens';


type ExploreCard = { titleKey: string; titleArabic: string; icon: keyof typeof Ionicons.glyphMap; color: string; route: string; arabicChar: string };
const EXPLORE: ExploreCard[] = [
  MODULES.alphabet,
  { titleKey: 'home.quran', titleArabic: 'الْقُرْآن', icon: 'book', color: color.sacred, route: '/quran', arabicChar: '۞' },
  MODULES.grammar,
  MODULES.verbs,
];
const TIPS_COUNT = 5;

export default function HomeScreen() {
  const { t } = useTranslation();
  const progress = useProgressStore((s) => s.progress);
  // Learn mode opens on the surah last learned there, Al-Fatihah the first time.
  const learnSurah = getSurahById(useLearnModeStore((s) => s.lastSurahId) ?? 'al-fatihah') ?? getSurahById('al-fatihah');

  const tipIndex = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    return dayOfYear % TIPS_COUNT;
  }, []);

  // Stories progress, for the Quran Stories card.
  // Selected as numbers, so the count follows a story being finished.
  const prophetStoriesCompleted = useProphetStoriesStore((st) => st.getTotalStoriesCompleted());
  const quranStoriesCompleted = useQuranStoriesStore((st) => st.getTotalStoriesCompleted());
  const storiesCompleted = prophetStoriesCompleted + quranStoriesCompleted;
  const totalStories = TOTAL_PROPHETS + TOTAL_QURAN_STORIES;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MastheadWash />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Masthead — Arabic leads, English supports. The illuminated rule sits
            here and nowhere else on this screen, marking the head of the page
            the way a Mushaf does. */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerText}>
              <Arabic size="display" align="left" style={styles.greetingArabic}>
                {t('home.greeting')}
              </Arabic>
              <Txt variant="body" tone="muted" style={styles.greetingEnglish}>
                {t('home.greetingEnglish')}
              </Txt>
            </View>
            {progress.currentStreak > 0 ? (
              <View style={styles.streak} accessibilityLabel={`${progress.currentStreak} ${t('home.dayStreak')}`}>
                <Ionicons name="flame" size={15} color={color.sacred} />
                <Text style={styles.streakCount}>{progress.currentStreak}</Text>
              </View>
            ) : null}
          </View>
          <IlluminatedRule style={styles.rule} />
        </View>

        {/* Memorize a surah: first on the page, the way into Learn mode. */}
        {learnSurah ? (
          <Section>
            <Card
              onPress={() => router.push(`/quran/surah/${learnSurah.id}/learn` as Href)}
              accent={color.sacred}
              raised
              accessibilityLabel={`${t('home.learnMode')}: ${t('home.learnModeDesc', { surah: learnSurah.nameEnglish })}`}
              style={styles.learnCard}
            >
              <IconTile name="headset" tint={color.sacred} size="lg" />
              <View style={styles.continueText}>
                <Txt variant="bodyLarge" weight="bold" numberOfLines={2}>{t('home.learnMode')}</Txt>
                <Text style={styles.learnArabic} allowFontScaling={false} numberOfLines={1}>{learnSurah.nameArabic}</Text>
                <Txt variant="caption" tone="faint" numberOfLines={1}>
                  {t('home.learnModeDesc', { surah: learnSurah.nameEnglish })}
                </Txt>
              </View>
              <View style={[styles.learnPlay, { backgroundColor: color.sacred }]}>
                <Ionicons name="play" size={18} color={color.textOnAccent} />
              </View>
            </Card>
          </Section>
        ) : null}

        {/* Quran stories: after memorizing, the other way into the Quran. */}
        <Section>
          <Card
            onPress={() => router.push('/quran/stories' as Href)}
            accent={color.sacred}
            accessibilityLabel={`${t('storiesFeature.title')}: ${t('quran.prophetsAndMore')}, ${storiesCompleted}/${totalStories}`}
            style={styles.continueCard}
          >
            <IconTile name="library" tint={color.sacred} />
            <View style={styles.continueText}>
              <Txt variant="body" weight="semibold" numberOfLines={1}>{t('storiesFeature.title')}</Txt>
              <Arabic size="inline" align="left" numberOfLines={1} style={styles.continueArabic}>قَصَصُ الْقُرْآن</Arabic>
              <Txt variant="caption" tone="faint" numberOfLines={1}>{t('quran.prophetsAndMore')}</Txt>
            </View>
            <Text style={styles.storiesCount}>{storiesCompleted}/{totalStories}</Text>
            <Ionicons name="chevron-forward" size={20} color={color.textFaint} />
          </Card>
        </Section>

        {/* Explore */}
        <Section title={t('home.explore')}>
          <View style={styles.grid}>
            {EXPLORE.map((m) => (
              <Card
                key={m.route}
                onPress={() => router.push(m.route as Href)}
                accessibilityLabel={t(m.titleKey)}
                style={styles.moduleCard}
              >
                <Text style={styles.moduleWatermark} allowFontScaling={false}>{m.arabicChar}</Text>
                <IconTile name={m.icon} tint={m.color} />
                <Txt variant="body" weight="semibold" style={styles.moduleTitle}>{t(m.titleKey)}</Txt>
                <Arabic
                  size="inline"
                  align="left"
                  tone={m.color === color.sacred ? 'sacred' : 'accent'}
                  style={styles.moduleArabic}
                >
                  {m.titleArabic}
                </Arabic>
              </Card>
            ))}
          </View>
        </Section>

        {/* Tip of the day */}
        <Section title={t('home.tipOfTheDay')}>
          <Card style={styles.tipCard}>
            <IconTile name="bulb" tint={color.sacred} />
            <View style={styles.tipContent}>
              <Txt variant="body" weight="semibold" style={styles.tipTitle}>{t(`home.tips.${tipIndex}.title`)}</Txt>
              <Txt variant="body" tone="muted">{t(`home.tips.${tipIndex}.text`)}</Txt>
            </View>
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
    paddingBottom: space['2xl'],
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: space.lg,
  },
  headerText: {
    flex: 1,
  },
  greetingArabic: {
    // Amiri sits high in its em box; a negative top margin optically centres it.
    marginTop: -space.xs,
  },
  greetingEnglish: {
    marginTop: space.xs,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.full,
    backgroundColor: color.sacredSoft,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withAlpha(color.sacred, 0.3),
    marginTop: space.sm,
  },
  streakCount: {
    ...type.caption,
    color: color.sacred,
    fontWeight: weight.bold,
  },
  rule: {
    marginTop: space.xl,
  },

  // Continue
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    paddingLeft: space.xl,
  },
  continueText: {
    flex: 1,
  },
  storiesCount: {
    ...type.caption,
    color: color.sacred,
    fontWeight: weight.semibold,
    fontVariant: ['tabular-nums'],
  },
  continueArabic: {
    marginTop: 1,
  },
  // Learn mode: gold, the colour of Quran content; the surah's own name in the
  // Quran face is what sets it apart from the language modules.
  learnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    paddingLeft: space.xl,
    paddingVertical: space.xl,
  },
  // The surah's own name in the Quran face, under the title.
  learnArabic: {
    fontFamily: font.quran,
    fontSize: 22,
    lineHeight: 38,
    color: color.sacred,
    textAlign: 'left',
  },
  learnPlay: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    // Nudge the glyph off-centre so the triangle reads as centred.
    paddingLeft: 3,
  },

  // Explore grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: space.md,
  },
  moduleCard: {
    width: '48%',
    minHeight: 124,
  },
  moduleWatermark: {
    position: 'absolute',
    right: 4,
    bottom: -18,
    fontSize: 88,
    lineHeight: 104,
    color: withAlpha(color.accent, 0.06),
    fontWeight: weight.bold,
  },
  moduleTitle: {
    marginTop: space.md,
  },
  moduleArabic: {
    marginTop: 1,
  },

  // Tip
  tipCard: {
    flexDirection: 'row',
    gap: space.lg,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    marginBottom: space.xs,
  },
});
