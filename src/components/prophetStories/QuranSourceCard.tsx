import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuranReference } from '../../types/prophetStories';

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
  const ayahRange = source.ayahStart === source.ayahEnd
    ? `${source.ayahStart}`
    : `${source.ayahStart}-${source.ayahEnd}`;

  return (
    <View style={styles.container}>
      {/* Header with Surah reference */}
      <View style={styles.header}>
        <View style={styles.referenceContainer}>
          <Ionicons name="book" size={14} color="#10b981" />
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
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={14}
                color="#ffffff"
              />
            )}
          </Pressable>
        )}
      </View>

      {/* Arabic Text - render words separately to avoid RTL wrapping bug */}
      <View style={styles.arabicContainer}>
        {source.arabicText.split(' ').map((word, index) => (
          <Text key={index} style={styles.arabicWord}>{word}</Text>
        ))}
      </View>

      {/* English Translation */}
      <Text style={styles.translation}>{source.translation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#10b98110',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
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
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600',
  },
  referenceArabic: {
    color: '#6ee7b7',
    fontSize: 12,
    marginLeft: 4,
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: '#3b82f6',
  },
  arabicContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 14,
    gap: 8,
  },
  arabicWord: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 44,
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default QuranSourceCard;
