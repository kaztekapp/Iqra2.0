import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuranReference } from '../../types/prophetStories';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { TajweedText } from '../quran/TajweedText';
import { font, color, radius } from '../../theme/tokens';
import { withAlpha } from '../ui/Primitives';

interface QuranSourceCardProps {
  source: QuranReference;
  isPlaying?: boolean;
  isLoading?: boolean;
  onPlayArabic?: () => void;
}

export function QuranSourceCard({
  source,
  isPlaying = false,
  isLoading = false,
  onPlayArabic,
}: QuranSourceCardProps) {
  const { lc } = useLocalizedContent();
  const ayahRange = source.ayahStart === source.ayahEnd
    ? `${source.ayahStart}`
    : `${source.ayahStart}-${source.ayahEnd}`;

  return (
    <View style={styles.container}>
      {/* Header with Surah reference */}
      <View style={styles.header}>
        <View style={styles.referenceContainer}>
          <Ionicons name="book" size={14} color={color.progress} />
          <Text style={styles.referenceText}>
            {source.surahNameEnglish} {source.surahNumber}:{ayahRange}
          </Text>
          <Text style={styles.referenceArabic}>
            {source.surahNameArabic}
          </Text>
        </View>
        {onPlayArabic && (
          <Pressable
            style={[styles.playButton, isPlaying && styles.playButtonActive]}
            onPress={onPlayArabic}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={color.text} />
            ) : (
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={14}
                color={color.text}
              />
            )}
          </Pressable>
        )}
      </View>

      {/* Arabic Text — the same rendering as the surah reading screen: the
          AmiriQuran face at 32 on a 2.0 line height, one continuous run,
          right-aligned. The words used to be split into separate Text nodes
          in the system face, which broke the script's joins between words
          and read nothing like the Quran screens. */}
      <View style={styles.arabicContainer}>
        <TajweedText text={source.arabicText} fontSize={32} />
      </View>

      {/* Translation */}
      <Text style={styles.translation}>{lc(source.translation, source.translationFr)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: withAlpha(color.progress, 0.06),
    borderRadius: radius.md,
    padding: 12,
    marginVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: color.progress,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  referenceText: {
    color: color.progress,
    fontSize: 12,
    fontWeight: '600',
  },
  referenceArabic: {
    fontFamily: font.arabic,
    lineHeight: 26,
    color: color.progress,
    fontSize: 16,
    marginLeft: 4,
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: radius.md,
    backgroundColor: color.progress,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: color.accent,
  },
  arabicContainer: {
    marginBottom: 16,
    width: '100%',
  },
  translation: {
    color: color.textMuted,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default QuranSourceCard;
