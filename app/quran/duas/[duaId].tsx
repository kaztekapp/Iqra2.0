import { useEffect, useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { getDuaById } from '../../../src/data/arabic/duas';
import { useDuasStore } from '../../../src/stores/duasStore';
import { useArabicSpeech } from '../../../src/hooks/useArabicSpeech';
import {
  DUA_CATEGORY_LABELS,
  HADITH_COLLECTION_NAMES,
} from '../../../src/types/duas';

export default function DuaDetailScreen() {
  const { duaId } = useLocalSearchParams<{ duaId: string }>();

  const {
    isFavorite,
    isMemorized,
    toggleFavorite,
    toggleMemorized,
    setLastViewed,
  } = useDuasStore();

  // Audio/Speech functionality
  const { speak, speakSlow, stop, isSpeaking } = useArabicSpeech();
  const [isSlowMode, setIsSlowMode] = useState(true);

  // Get dua data
  const dua = duaId ? getDuaById(duaId) : undefined;

  // Track view
  useEffect(() => {
    if (duaId && dua) {
      setLastViewed(duaId);
    }
  }, [duaId, dua, setLastViewed]);

  const handleToggleFavorite = useCallback(() => {
    if (duaId) {
      toggleFavorite(duaId);
    }
  }, [duaId, toggleFavorite]);

  const handleToggleMemorized = useCallback(() => {
    if (duaId) {
      toggleMemorized(duaId);
    }
  }, [duaId, toggleMemorized]);

  // Handle playing the Arabic text
  const handlePlayDua = useCallback(async () => {
    if (!dua) return;

    if (isSpeaking) {
      await stop();
    } else {
      if (isSlowMode) {
        await speakSlow(dua.arabicText);
      } else {
        await speak(dua.arabicText);
      }
    }
  }, [dua, isSpeaking, isSlowMode, speak, speakSlow, stop]);

  // Toggle speed mode
  const handleToggleSpeed = useCallback(() => {
    setIsSlowMode(prev => !prev);
  }, []);

  // Stop speech when leaving screen
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  if (!dua) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={styles.loadingText}>Loading dua...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const favorite = duaId ? isFavorite(duaId) : false;
  const memorized = duaId ? isMemorized(duaId) : false;
  const categoryLabel = DUA_CATEGORY_LABELS[dua.category];
  const collectionName = HADITH_COLLECTION_NAMES[dua.source.collection];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.duaNameArabic}>{dua.titleArabic}</Text>
          <Text style={styles.duaNameEnglish}>{dua.titleEnglish}</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.actionButton} onPress={handleToggleFavorite}>
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={22}
              color={favorite ? '#f59e0b' : '#94a3b8'}
            />
          </Pressable>
        </View>
      </View>

      {/* Category Badge */}
      <View style={styles.subHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{categoryLabel.english}</Text>
          <Text style={styles.categoryTextArabic}>{categoryLabel.arabic}</Text>
        </View>
        <View style={styles.orderBadge}>
          <Text style={styles.orderText}>#{dua.order}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Arabic Text */}
        <View style={styles.arabicCard}>
          <Text style={styles.arabicText}>{dua.arabicText}</Text>

          {/* Audio Controls */}
          <View style={styles.audioControls}>
            <Pressable
              style={styles.speedButton}
              onPress={handleToggleSpeed}
            >
              <Ionicons
                name="speedometer-outline"
                size={18}
                color={isSlowMode ? '#f59e0b' : '#94a3b8'}
              />
              <Text style={[styles.speedText, isSlowMode && styles.speedTextActive]}>
                {isSlowMode ? 'Slow' : 'Normal'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.playButton, isSpeaking && styles.playButtonActive]}
              onPress={handlePlayDua}
            >
              <Ionicons
                name={isSpeaking ? 'stop' : 'play'}
                size={24}
                color="#ffffff"
              />
              <Text style={styles.playButtonText}>
                {isSpeaking ? 'Stop' : 'Listen'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Transliteration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transliteration</Text>
          <Text style={styles.transliterationText}>{dua.transliteration}</Text>
        </View>

        {/* Translation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Translation</Text>
          <Text style={styles.translationText}>{dua.translation}</Text>
        </View>

        {/* Source Card */}
        <View style={styles.sourceCard}>
          <View style={styles.sourceHeader}>
            <Ionicons name="book" size={18} color="#818cf8" />
            <Text style={styles.sourceTitle}>Source</Text>
          </View>
          <Text style={styles.sourceCollection}>{collectionName}</Text>
          <Text style={styles.sourceHadith}>Hadith #{dua.source.hadithNumber}</Text>
          {dua.source.narrator && (
            <Text style={styles.sourceNarrator}>
              Narrated by: {dua.source.narrator}
            </Text>
          )}
        </View>

        {/* Occasion */}
        {dua.occasion && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={18} color="#f59e0b" />
              <Text style={[styles.sectionTitle, { marginLeft: 8, marginBottom: 0 }]}>
                When to Recite
              </Text>
            </View>
            <Text style={styles.occasionText}>{dua.occasion}</Text>
          </View>
        )}

        {/* Virtues */}
        {dua.virtues && (
          <View style={styles.virtuesCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="star" size={18} color="#10b981" />
              <Text style={[styles.sectionTitle, { color: '#10b981', marginLeft: 8, marginBottom: 0 }]}>
                Virtues & Rewards
              </Text>
            </View>
            <Text style={styles.virtuesText}>{dua.virtues}</Text>
          </View>
        )}

        {/* Story */}
        {dua.story && (
          <View style={styles.storyCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="book-outline" size={18} color="#8b5cf6" />
              <Text style={[styles.sectionTitle, { color: '#8b5cf6', marginLeft: 8, marginBottom: 0 }]}>
                Background Story
              </Text>
            </View>
            <Text style={styles.storyText}>{dua.story}</Text>
          </View>
        )}

        {/* Memorized Toggle */}
        <Pressable
          style={[
            styles.memorizedButton,
            memorized && styles.memorizedButtonActive,
          ]}
          onPress={handleToggleMemorized}
        >
          <Ionicons
            name={memorized ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={22}
            color={memorized ? '#10b981' : '#94a3b8'}
          />
          <Text
            style={[
              styles.memorizedButtonText,
              memorized && styles.memorizedButtonTextActive,
            ]}
          >
            {memorized ? 'Memorized' : 'Mark as Memorized'}
          </Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 8,
  },
  duaNameArabic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  duaNameEnglish: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#1e293b',
    borderRadius: 10,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f59e0b20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTextArabic: {
    color: '#f59e0b',
    fontSize: 12,
  },
  orderBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  orderText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  arabicCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    borderWidth: 1,
    borderColor: '#f59e0b30',
  },
  arabicText: {
    fontSize: 26,
    lineHeight: 48,
    color: '#ffffff',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
  },
  speedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  speedText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  speedTextActive: {
    color: '#f59e0b',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f59e0b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  playButtonActive: {
    backgroundColor: '#ef4444',
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 10,
  },
  transliterationText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#94a3b8',
    lineHeight: 24,
  },
  translationText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  sourceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#818cf8',
  },
  sourceCollection: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  sourceHadith: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  sourceNarrator: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
    fontStyle: 'italic',
  },
  occasionText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
    marginTop: 8,
  },
  virtuesCard: {
    backgroundColor: '#10b98110',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  virtuesText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
    marginTop: 8,
  },
  storyCard: {
    backgroundColor: '#8b5cf610',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#8b5cf630',
  },
  storyText: {
    fontSize: 14,
    color: '#e2e8f0',
    lineHeight: 22,
    marginTop: 8,
  },
  memorizedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  memorizedButtonActive: {
    backgroundColor: '#10b98120',
    borderColor: '#10b98140',
  },
  memorizedButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94a3b8',
  },
  memorizedButtonTextActive: {
    color: '#10b981',
  },
});
