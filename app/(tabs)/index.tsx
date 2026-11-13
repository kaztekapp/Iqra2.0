import { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useProgressStore } from '../../src/stores/progressStore';
import { MODULES } from '../../src/components/home/ContinueLearningCard';
import { useProphetStoriesStore } from '../../src/stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../src/stores/quranStoriesStore';
import { TOTAL_PROPHETS } from '../../src/data/arabic/prophets';
import { TOTAL_QURAN_STORIES } from '../../src/data/arabic/quranStories';
import { useLearnModeStore } from '../../src/stores/learnModeStore';
import { getSurahById } from '../../src/data/arabic/quran';
import { StoreUpdateBanner } from '../../src/components/home/StoreUpdateBanner';
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
import { ArText } from '../../src/components/arabic/ArText';


type ExploreCard = { titleKey: string; titleArabic: string; icon: keyof typeof Ionicons.glyphMap; color: string; route: string; arabicChar: string };
const EXPLORE: ExploreCard[] = [
  MODULES.alphabet,
  // The Quran has its own tab and the two cards above; Explore is for Arabic.
  MODULES.vocabulary,
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

        {/* A newer version in the store: stays until updated or closed. */}
        <StoreUpdateBanner />

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
                <ArText style={styles.learnArabic} allowFontScaling={false} numberOfLines={1}>{learnSurah.nameArabic}</ArText>
                <Txt variant="caption" tone="faint" numberOfLines={1}>
                  {t('home.learnModeDesc', { surah: learnSurah.nameEnglish })}
                </Txt>
              </View>
              {/* A gold disc in a soft halo: light gold to deep gold, lit from
                  the top left, with a warm shadow under it. */}
              <View style={styles.learnPlayHalo}>
                <LinearGradient
                  colors={[color.sacredBright, color.sacred]}
                  start={{ x: 0.15, y: 0 }}
                  end={{ x: 0.85, y: 1 }}
                  style={styles.learnPlay}
                >
                  <Ionicons name="play" size={17} color={color.textOnAccent} style={styles.learnPlayGlyph} />
                </LinearGradient>
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
              <Txt variant="body" weight="semibold" numberOfLines={2}>{t('storiesFeature.title')}</Txt>
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
  learnPlayHalo: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: color.sacredSoft,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: color.sacred,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  learnPlay: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  // The triangle's visual centre sits right of its box.
  learnPlayGlyph: {
    marginLeft: 2,
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
