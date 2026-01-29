import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { JUZ_LESSONS, getJuzLesson } from '../../../src/data/arabic/quran/lessons/juzLessons';

// Expandable Section Component
function ExpandableSection({
  title,
  icon,
  iconColor,
  children,
  defaultExpanded = false,
}: {
  title: string;
  icon: string;
  iconColor: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View style={styles.expandableSection}>
      <Pressable
        style={styles.expandableHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={[styles.sectionIcon, { backgroundColor: `${iconColor}20` }]}>
          <Ionicons name={icon as any} size={18} color={iconColor} />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#64748b"
        />
      </Pressable>
      {expanded && <View style={styles.expandableContent}>{children}</View>}
    </View>
  );
}

// Famous Verse Card
function VerseCard({
  verse,
}: {
  verse: { arabic: string; translation: string; reference: string };
}) {
  return (
    <View style={styles.verseCard}>
      <Text style={styles.verseArabic}>{verse.arabic}</Text>
      <Text style={styles.verseTranslation}>"{verse.translation}"</Text>
      <View style={styles.verseReference}>
        <Ionicons name="bookmark" size={12} color="#3b82f6" />
        <Text style={styles.verseReferenceText}>{verse.reference}</Text>
      </View>
    </View>
  );
}

export default function JuzDetailScreen() {
  const { juzId } = useLocalSearchParams<{ juzId: string }>();
  const juzNumber = parseInt(juzId || '1', 10);

  const juz = getJuzLesson(juzNumber);

  if (!juz) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Juz not found</Text>
          <Pressable style={styles.backButtonError} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#22c55e';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const prevJuz = JUZ_LESSONS.find((j) => j.id === juzNumber - 1);
  const nextJuz = JUZ_LESSONS.find((j) => j.id === juzNumber + 1);

  const handleNavigation = (id: number) => {
    router.replace(`/quran/juz/${id}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Juz {juz.id}</Text>
        </View>
        <View style={styles.headerNav}>
          <Pressable
            style={[styles.navArrow, !prevJuz && styles.navArrowDisabled]}
            onPress={() => prevJuz && handleNavigation(prevJuz.id)}
            disabled={!prevJuz}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={prevJuz ? '#ffffff' : '#334155'}
            />
          </Pressable>
          <Pressable
            style={[styles.navArrow, !nextJuz && styles.navArrowDisabled]}
            onPress={() => nextJuz && handleNavigation(nextJuz.id)}
            disabled={!nextJuz}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={nextJuz ? '#ffffff' : '#334155'}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8', '#1e40af']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroNumber}>
              <Text style={styles.heroNumberText}>{juz.id}</Text>
            </View>
            <Text style={styles.heroNameEnglish}>{juz.nameEnglish}</Text>
            <Text style={styles.heroNameArabic}>{juz.nameArabic}</Text>
            {juz.alternativeName && (
              <Text style={styles.heroAltName}>Also known as: {juz.alternativeName}</Text>
            )}

            <View style={styles.heroDivider} />

            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Ionicons name="book" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>
                  {juz.startSurah} {juz.startVerse} → {juz.endSurah} {juz.endVerse}
                </Text>
              </View>
              <View style={styles.heroStat}>
                <Ionicons name="layers" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatText}>{juz.totalSurahs} Surah(s)</Text>
              </View>
            </View>

            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: `${getDifficultyColor(juz.memorization.difficulty)}30` },
              ]}
            >
              <Ionicons
                name="fitness"
                size={14}
                color={getDifficultyColor(juz.memorization.difficulty)}
              />
              <Text
                style={[
                  styles.difficultyText,
                  { color: getDifficultyColor(juz.memorization.difficulty) },
                ]}
              >
                {juz.memorization.difficulty} difficulty
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.content}>
          {/* Key Themes */}
          <ExpandableSection
            title="Key Themes"
            icon="bulb"
            iconColor="#f59e0b"
            defaultExpanded={true}
          >
            <View style={styles.themesList}>
              {juz.keyThemes.map((theme, index) => (
                <View key={index} style={styles.themeItem}>
                  <View style={styles.themeBullet} />
                  <Text style={styles.themeText}>{theme}</Text>
                </View>
              ))}
            </View>
          </ExpandableSection>

          {/* Highlights */}
          <ExpandableSection
            title="Highlights"
            icon="star"
            iconColor="#3b82f6"
            defaultExpanded={true}
          >
            <View style={styles.highlightsList}>
              {juz.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightCard}>
                  <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          </ExpandableSection>

          {/* Famous Verses */}
          {juz.famousVerses && juz.famousVerses.length > 0 && (
            <ExpandableSection
              title="Famous Verses"
              icon="heart"
              iconColor="#ec4899"
              defaultExpanded={true}
            >
              {juz.famousVerses.map((verse, index) => (
                <VerseCard key={index} verse={verse} />
              ))}
            </ExpandableSection>
          )}

          {/* Stories */}
          {juz.stories && juz.stories.length > 0 && (
            <ExpandableSection
              title="Stories & Narratives"
              icon="book"
              iconColor="#8b5cf6"
            >
              <View style={styles.storiesList}>
                {juz.stories.map((story, index) => (
                  <View key={index} style={styles.storyItem}>
                    <View style={styles.storyIcon}>
                      <Ionicons name="chatbubbles" size={14} color="#8b5cf6" />
                    </View>
                    <Text style={styles.storyText}>{story}</Text>
                  </View>
                ))}
              </View>
            </ExpandableSection>
          )}

          {/* Memorization Tips */}
          <ExpandableSection
            title="Memorization Guide"
            icon="school"
            iconColor="#22c55e"
          >
            <View style={styles.memorizationContent}>
              <View style={styles.memorizationHeader}>
                <View style={styles.memorizationStat}>
                  <Ionicons name="time" size={20} color="#3b82f6" />
                  <Text style={styles.memorizationStatValue}>
                    ~{juz.memorization.estimatedDays}
                  </Text>
                  <Text style={styles.memorizationStatLabel}>days</Text>
                </View>
                <View style={styles.memorizationStatDivider} />
                <View style={styles.memorizationStat}>
                  <Ionicons
                    name="speedometer"
                    size={20}
                    color={getDifficultyColor(juz.memorization.difficulty)}
                  />
                  <Text style={styles.memorizationStatValue}>
                    {juz.memorization.difficulty}
                  </Text>
                  <Text style={styles.memorizationStatLabel}>level</Text>
                </View>
              </View>

              <Text style={styles.tipsTitle}>Tips for Success</Text>
              {juz.memorization.tips.map((tip, index) => (
                <View key={index} style={styles.tipCard}>
                  <View style={styles.tipNumber}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </ExpandableSection>

          {/* Quick Navigation */}
          <View style={styles.quickNav}>
            <Text style={styles.quickNavTitle}>Quick Navigation</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickNavContent}
            >
              {JUZ_LESSONS.map((j) => (
                <Pressable
                  key={j.id}
                  style={[
                    styles.quickNavItem,
                    j.id === juz.id && styles.quickNavItemActive,
                  ]}
                  onPress={() => handleNavigation(j.id)}
                >
                  <Text
                    style={[
                      styles.quickNavText,
                      j.id === juz.id && styles.quickNavTextActive,
                    ]}
                  >
                    {j.id}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerNav: {
    flexDirection: 'row',
    gap: 4,
  },
  navArrow: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrowDisabled: {
    opacity: 0.5,
  },
  heroCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroGradient: {
    padding: 24,
    alignItems: 'center',
  },
  heroNumber: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroNumberText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroNameEnglish: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroNameArabic: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    fontWeight: '600',
  },
  heroAltName: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
    fontStyle: 'italic',
  },
  heroDivider: {
    width: 80,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 20,
  },
  heroStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroStatText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  difficultyText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  content: {
    paddingHorizontal: 20,
  },
  expandableSection: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  expandableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 12,
  },
  expandableContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  themesList: {
    gap: 10,
  },
  themeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  themeBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
    marginTop: 6,
  },
  themeText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
  },
  highlightsList: {
    gap: 10,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#22c55e10',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 20,
  },
  verseCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ec4899',
  },
  verseArabic: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'right',
    lineHeight: 38,
    marginBottom: 12,
    fontWeight: '500',
  },
  verseTranslation: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 12,
  },
  verseReference: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  verseReferenceText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  storiesList: {
    gap: 10,
  },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storyIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#8b5cf620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
  },
  memorizationContent: {
    gap: 16,
  },
  memorizationHeader: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
  },
  memorizationStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  memorizationStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  memorizationStatLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  memorizationStatDivider: {
    width: 1,
    backgroundColor: '#334155',
    marginHorizontal: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginTop: 8,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#22c55e20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
  },
  quickNav: {
    marginTop: 24,
    marginBottom: 16,
  },
  quickNavTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
  },
  quickNavContent: {
    gap: 8,
  },
  quickNavItem: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickNavItemActive: {
    backgroundColor: '#3b82f6',
  },
  quickNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  quickNavTextActive: {
    color: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 20,
  },
  backButtonError: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
