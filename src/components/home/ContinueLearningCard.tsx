import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useProgressStore, ModuleType } from '../../stores/progressStore';
import { Txt, Arabic, Section, Card, IconTile } from '../ui/Primitives';
import { color, space, radius } from '../../theme/tokens';

/**
 * Module colour is semantic, not decorative: gold marks sacred content, indigo
 * marks language study. The old per-module rainbow (pink verbs, teal practice,
 * amber reading) encoded nothing — here the large Arabic glyph on each card
 * carries the individuality instead.
 */
export const MODULES: Record<ModuleType, {
  titleKey: string;
  titleArabic: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
  arabicChar: string;
}> = {
  alphabet: { titleKey: 'home.alphabet', titleArabic: 'الْحُرُوف', icon: 'text', color: color.accent, route: '/alphabet', arabicChar: 'أ' },
  vocabulary: { titleKey: 'home.vocabulary', titleArabic: 'الْمُفْرَدَات', icon: 'library', color: color.accent, route: '/vocabulary', arabicChar: 'ك' },
  numbers: { titleKey: 'learn.numbers', titleArabic: 'الْأَرْقَام', icon: 'keypad', color: color.accent, route: '/numbers', arabicChar: '٥' },
  calendar: { titleKey: 'learn.calendar', titleArabic: 'التَّقْوِيمُ الْهِجْرِيّ', icon: 'moon', color: color.accent, route: '/calendar', arabicChar: 'هـ' },
  grammar: { titleKey: 'learn.grammar', titleArabic: 'الْقَوَاعِد', icon: 'git-branch', color: color.accent, route: '/grammar', arabicChar: 'ق' },
  verbs: { titleKey: 'learn.verbConjugations', titleArabic: 'تَصْرِيفُ الْأَفْعَال', icon: 'swap-horizontal', color: color.accent, route: '/verbs', arabicChar: 'ف' },
  reading: { titleKey: 'learn.reading', titleArabic: 'الْقِرَاءَة', icon: 'document-text', color: color.accent, route: '/reading', arabicChar: 'ر' },
  writing: { titleKey: 'learn.writing', titleArabic: 'الْكِتَابَة', icon: 'create', color: color.accent, route: '/writing', arabicChar: 'خ' },
  practice: { titleKey: 'home.practice', titleArabic: 'التَّدْرِيب', icon: 'pencil', color: color.progress, route: '/practice', arabicChar: 'د' },
};

/**
 * Continue Learning: the Arabic module last opened, one tap back into it.
 * It heads the Arabic tab; Home leads with the Quran instead.
 */
export function ContinueLearningCard() {
  const { t } = useTranslation();
  const progress = useProgressStore((s) => s.progress);
  const lastAccessed = useProgressStore((s) => s.lastAccessed);

  const currentModule = MODULES[lastAccessed?.module || 'alphabet'];
  const moduleName = lastAccessed?.moduleName || t(currentModule.titleKey);
  const lessonShown = !!(lastAccessed?.lessonTitle && lastAccessed?.lessonTitleArabic) && lastAccessed?.lessonTitle !== moduleName;

  const subtitle = (() => {
    switch (lastAccessed?.module) {
      case 'alphabet': return t('home.lettersLearned', { count: progress.alphabetProgress.lettersLearned.length });
      case 'vocabulary': return t('home.themesCompleted', { count: progress.vocabularyProgress.themesCompleted.length });
      case 'grammar': return t('home.lessonsCompletedCount', { count: progress.grammarProgress.lessonsCompleted.length });
      case 'verbs': return t('home.verbsLearned', { count: progress.verbProgress.verbsLearned.length });
      case 'reading': return t('home.textsCompleted', { count: progress.readingProgress.textsCompleted.length });
      case 'practice': return t('home.continuePracticing');
      default: return t('home.lettersLearned', { count: progress.alphabetProgress.lettersLearned.length });
    }
  })();

  return (
    <Section title={t('home.continueLearning')}>
      <Card
        onPress={() => router.push(currentModule.route as Href)}
        accent={currentModule.color}
        raised
        accessibilityLabel={`${t('home.continueLearning')}: ${moduleName}`}
        style={styles.card}
      >
        <IconTile name={currentModule.icon} tint={currentModule.color} size="lg" />
        <View style={styles.text}>
          <Txt variant="bodyLarge" weight="semibold" numberOfLines={1}>
            {lessonShown ? lastAccessed!.lessonTitle : moduleName}
          </Txt>
          <Arabic size="inline" align="left" numberOfLines={1} style={styles.arabic}>
            {lessonShown ? lastAccessed!.lessonTitleArabic : currentModule.titleArabic}
          </Arabic>
          <Txt variant="caption" tone="faint" numberOfLines={1}>{subtitle}</Txt>
        </View>
        <View style={[styles.play, { backgroundColor: currentModule.color }]}>
          <Ionicons name="play" size={17} color={color.textOnAccent} />
        </View>
      </Card>
    </Section>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    paddingLeft: space.xl,
  },
  text: {
    flex: 1,
  },
  arabic: {
    marginTop: 1,
  },
  play: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    // Nudge the glyph off-centre so the triangle reads as centred.
    paddingLeft: 3,
  },
});
