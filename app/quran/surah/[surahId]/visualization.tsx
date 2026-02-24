import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getSurahById } from '../../../../src/data/arabic/quran';
import { useQuranSurah } from '../../../../src/hooks/useQuranData';
import { useQuranStore } from '../../../../src/stores/quranStore';
import { useAyahTranslations } from '../../../../src/hooks/useAyahTranslations';
import { TajweedText } from '../../../../src/components/quran/TajweedText';
import { ReviewRating } from '../../../../src/types/quran';

// ============ Types & Constants ============

type VisualizationMode = 'study' | 'review';

const METHOD_COLOR = '#3b82f6';

interface SceneTheme {
  icon: string;
  nameKey: string;
  color: string;
  rootPatterns: string[];
}

const SCENE_THEMES: SceneTheme[] = [
  { icon: '\u2728', nameKey: 'visualization.themeDivine', color: '#D4AF37', rootPatterns: ['\u0627\u0644\u0644\u0647', '\u0631\u0628', '\u0625\u0644\u0647'] },
  { icon: '\uD83D\uDC9A', nameKey: 'visualization.themeMercy', color: '#10b981', rootPatterns: ['\u0631\u062D\u0645', '\u0631\u062D\u064A\u0645', '\u0631\u062D\u0645\u0646'] },
  { icon: '\uD83C\uDF0C', nameKey: 'visualization.themeSky', color: '#3b82f6', rootPatterns: ['\u0633\u0645\u0627\u0621', '\u0633\u0645\u0627\u0648\u0627\u062A'] },
  { icon: '\uD83D\uDCA7', nameKey: 'visualization.themeWater', color: '#06b6d4', rootPatterns: ['\u0645\u0627\u0621', '\u0628\u062D\u0631', '\u0646\u0647\u0631'] },
  { icon: '\u2600\uFE0F', nameKey: 'visualization.themeLight', color: '#f59e0b', rootPatterns: ['\u0646\u0648\u0631', '\u0634\u0645\u0633', '\u0636\u0648\u0621'] },
  { icon: '\uD83C\uDF0D', nameKey: 'visualization.themeEarth', color: '#84cc16', rootPatterns: ['\u0627\u0631\u0636', '\u0623\u0631\u0636'] },
  { icon: '\uD83D\uDD25', nameKey: 'visualization.themeFire', color: '#ef4444', rootPatterns: ['\u0646\u0627\u0631', '\u062C\u0647\u0646\u0645'] },
  { icon: '\uD83C\uDF33', nameKey: 'visualization.themeGarden', color: '#22c55e', rootPatterns: ['\u062C\u0646\u0629', '\u062C\u0646\u0627\u062A', '\u0634\u062C\u0631'] },
  { icon: '\uD83D\uDCD6', nameKey: 'visualization.themeBook', color: '#a855f7', rootPatterns: ['\u0643\u062A\u0627\u0628', '\u0642\u0631\u0622\u0646', '\u0622\u064A\u0629'] },
  { icon: '\uD83E\uDD32', nameKey: 'visualization.themePrayer', color: '#14b8a6', rootPatterns: ['\u0635\u0644\u0627\u0629', '\u0635\u0644\u0648', '\u0639\u0628\u062F'] },
];

const DEFAULT_THEME: SceneTheme = {
  icon: '\uD83D\uDCDC',
  nameKey: 'visualization.themeVerse',
  color: '#64748b',
  rootPatterns: [],
};

function getAyahTheme(ayahText: string): SceneTheme {
  for (const theme of SCENE_THEMES) {
    for (const pattern of theme.rootPatterns) {
      if (ayahText.includes(pattern)) return theme;
    }
  }
  return DEFAULT_THEME;
}

// ============ Component ============

export default function VisualizationScreen() {
  const { t } = useTranslation();
  const { surahId } = useLocalSearchParams<{ surahId: string }>();
  const surah = getSurahById(surahId);
  const { ayahs, isLoading } = useQuranSurah(surahId);
  const { progress, markAyahLearned, scheduleReview, updateReviewItem } = useQuranStore();
  const { translations: langTranslations } = useAyahTranslations(surah?.surahNumber ?? null);

  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [vizMode, setVizMode] = useState<VisualizationMode>('study');
  const [isAyahRevealed, setIsAyahRevealed] = useState(false);
  const [sceneMemorized, setSceneMemorized] = useState(false);

  const currentAyah = ayahs[currentAyahIndex];
  const totalAyahs = ayahs.length;

  const ayahTranslation = currentAyah
    ? langTranslations.get(currentAyah.ayahNumber)
      || currentAyah.translation
      || currentAyah.words.map(w => w.translation).join(' ')
    : '';

  const currentTheme = useMemo(() => {
    if (!currentAyah) return DEFAULT_THEME;
    return getAyahTheme(currentAyah.textUthmani);
  }, [currentAyah]);

  // ---- Guards ----

  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t('common.notFound')}</Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={METHOD_COLOR} />
          <Text style={styles.loadingText}>{t('surahLearnMode.loadingVerses')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentAyah) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{t('common.notFound')}</Text>
      </SafeAreaView>
    );
  }

  // ---- Handlers ----

  const handleMemorized = () => {
    setSceneMemorized(true);
    markAyahLearned(surahId, currentAyah.id);
    advanceAyah();
  };

  const handleReveal = () => {
    setIsAyahRevealed(true);
  };

  const handleRate = (rating: ReviewRating) => {
    scheduleReview(currentAyah.id, surahId);
    updateReviewItem(currentAyah.id, rating);
    advanceAyah();
  };

  const advanceAyah = () => {
    if (currentAyahIndex < totalAyahs - 1) {
      setCurrentAyahIndex((prev) => prev + 1);
    } else {
      router.back();
      return;
    }
    setIsAyahRevealed(false);
    setSceneMemorized(false);
  };

  const handlePrevAyah = () => {
    if (currentAyahIndex > 0) {
      setCurrentAyahIndex((prev) => prev - 1);
      setIsAyahRevealed(false);
      setSceneMemorized(false);
    }
  };

  const handleNextAyah = () => {
    if (currentAyahIndex < totalAyahs - 1) {
      setCurrentAyahIndex((prev) => prev + 1);
      setIsAyahRevealed(false);
      setSceneMemorized(false);
    }
  };

  // ---- Render ----

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.closeButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={t('common.back')}
        >
          <Ionicons name="close" size={24} color="#f5f5f0" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.surahNameArabic}>{surah.nameArabic}</Text>
          <Text style={styles.headerMethodLabel}>{t('visualization.title')}</Text>
        </View>
        <View style={styles.ayahCounter}>
          <Text style={styles.ayahCounterText}>
            {currentAyahIndex + 1}/{totalAyahs}
          </Text>
        </View>
      </View>

      {/* Mode Toggle */}
      <View style={styles.modeToggleContainer}>
        <View style={styles.modeToggle}>
          <Pressable
            style={[styles.modePill, vizMode === 'study' && styles.modePillActive]}
            onPress={() => {
              setVizMode('study');
              setIsAyahRevealed(false);
              setSceneMemorized(false);
            }}
            accessibilityRole="button"
            accessibilityLabel={t('visualization.modeStudy')}
          >
            <Ionicons
              name="book-outline"
              size={16}
              color={vizMode === 'study' ? '#ffffff' : '#a3a398'}
            />
            <Text style={[styles.modePillText, vizMode === 'study' && styles.modePillTextActive]}>
              {t('visualization.modeStudy')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.modePill, vizMode === 'review' && styles.modePillActive]}
            onPress={() => {
              setVizMode('review');
              setIsAyahRevealed(false);
              setSceneMemorized(false);
            }}
            accessibilityRole="button"
            accessibilityLabel={t('visualization.modeReview')}
          >
            <Ionicons
              name="refresh-outline"
              size={16}
              color={vizMode === 'review' ? '#ffffff' : '#a3a398'}
            />
            <Text style={[styles.modePillText, vizMode === 'review' && styles.modePillTextActive]}>
              {t('visualization.modeReview')}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scene Card */}
        <View style={[styles.sceneCard, { borderTopColor: currentTheme.color }]}>
          {/* Scene Icon */}
          <Text style={styles.sceneIcon}>{currentTheme.icon}</Text>
          <Text style={[styles.sceneThemeName, { color: currentTheme.color }]}>
            {t(currentTheme.nameKey)}
          </Text>
          <Text style={styles.sceneRoomLabel}>
            {t('visualization.room', { number: currentAyahIndex + 1 })}
          </Text>

          {/* Ayah Text Area */}
          {vizMode === 'study' && (
            <View style={[styles.ayahTextContainer, { borderLeftColor: currentTheme.color }]}>
              <View style={styles.ayahTextContent}>
                <TajweedText
                  text={currentAyah.textUthmani}
                  tajweedRules={currentAyah.tajweedRules}
                  showTajweed={progress.settings.showTajweedColors}
                  fontSize={24}
                />
                {currentAyah.transliteration && (
                  <Text style={styles.transliteration}>{currentAyah.transliteration}</Text>
                )}
                <Text style={styles.translation}>{ayahTranslation}</Text>
              </View>
            </View>
          )}

          {vizMode === 'review' && isAyahRevealed && (
            <View style={[styles.ayahTextContainer, { borderLeftColor: currentTheme.color }]}>
              <View style={styles.ayahTextContent}>
                <TajweedText
                  text={currentAyah.textUthmani}
                  tajweedRules={currentAyah.tajweedRules}
                  showTajweed={progress.settings.showTajweedColors}
                  fontSize={24}
                />
                <Text style={styles.translation}>{ayahTranslation}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Instruction & Action */}
        {vizMode === 'study' && (
          <View style={styles.instructionCard}>
            <Ionicons name="eye-outline" size={20} color={METHOD_COLOR} />
            <Text style={styles.instructionText}>
              {t('visualization.associateText')}
            </Text>
          </View>
        )}

        {vizMode === 'study' && !sceneMemorized && (
          <Pressable style={styles.actionButton} onPress={handleMemorized}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>
              {t('visualization.memorizedScene')}
            </Text>
          </Pressable>
        )}

        {vizMode === 'review' && !isAyahRevealed && (
          <>
            <View style={styles.instructionCard}>
              <Ionicons name="bulb-outline" size={20} color={METHOD_COLOR} />
              <Text style={styles.instructionText}>
                {t('visualization.thinkOfScene')}
              </Text>
            </View>
            <Pressable style={styles.actionButton} onPress={handleReveal}>
              <Ionicons name="eye-outline" size={20} color="#ffffff" />
              <Text style={styles.actionButtonText}>
                {t('visualization.showAyah')}
              </Text>
            </Pressable>
          </>
        )}

        {vizMode === 'review' && isAyahRevealed && (
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>{t('visualization.rateRecall')}</Text>
            <View style={styles.ratingButtons}>
              <Pressable
                style={[styles.ratingButton, styles.ratingYes]}
                onPress={() => handleRate(5)}
              >
                <Ionicons name="checkmark-circle-outline" size={22} color="#22c55e" />
                <Text style={[styles.ratingButtonText, { color: '#22c55e' }]}>
                  {t('visualization.recallYes')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.ratingButton, styles.ratingPartial]}
                onPress={() => handleRate(3)}
              >
                <Ionicons name="remove-circle-outline" size={22} color="#f59e0b" />
                <Text style={[styles.ratingButtonText, { color: '#f59e0b' }]}>
                  {t('visualization.recallPartial')}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.ratingButton, styles.ratingNo]}
                onPress={() => handleRate(1)}
              >
                <Ionicons name="close-circle-outline" size={22} color="#fb7185" />
                <Text style={[styles.ratingButtonText, { color: '#fb7185' }]}>
                  {t('visualization.recallNo')}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable
          style={[styles.navButton, currentAyahIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevAyah}
          disabled={currentAyahIndex === 0}
          accessibilityRole="button"
          accessibilityLabel={t('common.previous')}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={currentAyahIndex === 0 ? '#334155' : '#f5f5f0'}
          />
          <Text
            style={[styles.navButtonText, currentAyahIndex === 0 && styles.navButtonTextDisabled]}
          >
            {t('common.previous')}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.navButton,
            currentAyahIndex >= totalAyahs - 1 && styles.navButtonDisabled,
          ]}
          onPress={handleNextAyah}
          disabled={currentAyahIndex >= totalAyahs - 1}
          accessibilityRole="button"
          accessibilityLabel={t('common.next')}
        >
          <Text
            style={[
              styles.navButtonText,
              currentAyahIndex >= totalAyahs - 1 && styles.navButtonTextDisabled,
            ]}
          >
            {t('common.next')}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={currentAyahIndex >= totalAyahs - 1 ? '#334155' : '#f5f5f0'}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ============ Styles ============

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  errorText: {
    color: '#a3a398',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  surahNameArabic: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerMethodLabel: {
    color: METHOD_COLOR,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  ayahCounter: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  ayahCounterText: {
    color: '#f5f5f0',
    fontSize: 13,
    fontWeight: '600',
  },

  // Mode Toggle
  modeToggleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 11,
    gap: 6,
  },
  modePillActive: {
    backgroundColor: METHOD_COLOR,
  },
  modePillText: {
    color: '#a3a398',
    fontSize: 14,
    fontWeight: '600',
  },
  modePillTextActive: {
    color: '#ffffff',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },

  // Scene Card
  sceneCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    borderTopWidth: 3,
    padding: 24,
    alignItems: 'center',
  },
  sceneIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  sceneThemeName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sceneRoomLabel: {
    color: '#a3a398',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
  },

  // Ayah Text within Scene Card
  ayahTextContainer: {
    width: '100%',
    borderLeftWidth: 4,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 16,
    marginTop: 4,
  },
  ayahTextContent: {
    gap: 12,
  },
  transliteration: {
    color: '#94a3b8',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Instruction Card
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${METHOD_COLOR}10`,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: `${METHOD_COLOR}30`,
  },
  instructionText: {
    color: METHOD_COLOR,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },

  // Action Button
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: METHOD_COLOR,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Rating Section
  ratingSection: {
    gap: 12,
  },
  ratingTitle: {
    color: '#f5f5f0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  ratingButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
  },
  ratingYes: {
    backgroundColor: '#22c55e15',
    borderColor: '#22c55e30',
  },
  ratingPartial: {
    backgroundColor: '#f59e0b15',
    borderColor: '#f59e0b30',
  },
  ratingNo: {
    backgroundColor: '#fb718515',
    borderColor: '#fb718530',
  },
  ratingButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    backgroundColor: '#0f172a',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    color: '#f5f5f0',
    fontSize: 14,
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: '#334155',
  },
});
