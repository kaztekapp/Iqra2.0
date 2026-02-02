import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StoryContentBlock as ContentBlock, QuranReference, HadithReference } from '../../types/quranStories';

interface StoryContentBlockProps {
  block: ContentBlock;
  isHighlighted?: boolean;
  onPlayQuranAudio?: (source: QuranReference) => void;
  isQuranPlaying?: boolean;
  isQuranLoading?: boolean;
}

// Quran Source Card Component
function QuranSourceCard({
  source,
  isPlaying = false,
  isLoading = false,
  onPlayArabic,
}: {
  source: QuranReference;
  isPlaying?: boolean;
  isLoading?: boolean;
  onPlayArabic?: () => void;
}) {
  const ayahRange = source.ayahStart === source.ayahEnd
    ? `${source.ayahStart}`
    : `${source.ayahStart}-${source.ayahEnd}`;

  return (
    <View style={quranStyles.container}>
      <View style={quranStyles.header}>
        <View style={quranStyles.referenceContainer}>
          <Ionicons name="book" size={14} color="#10b981" />
          <Text style={quranStyles.referenceText}>
            {source.surahNameEnglish} {source.surahNumber}:{ayahRange}
          </Text>
          <Text style={quranStyles.referenceArabic}>
            {source.surahNameArabic}
          </Text>
        </View>
        {onPlayArabic && (
          <Pressable
            style={[quranStyles.playButton, isPlaying && quranStyles.playButtonActive]}
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

      <View style={quranStyles.arabicContainer}>
        {source.arabicText.split(' ').map((word, index) => (
          <Text key={index} style={quranStyles.arabicWord}>{word}</Text>
        ))}
      </View>

      <Text style={quranStyles.translation}>{source.translation}</Text>
    </View>
  );
}

// Hadith Source Card Component
function HadithSourceCard({ source }: { source: HadithReference }) {
  return (
    <View style={hadithStyles.container}>
      <View style={hadithStyles.header}>
        <View style={hadithStyles.referenceContainer}>
          <Ionicons name="document-text" size={14} color="#f59e0b" />
          <Text style={hadithStyles.referenceText}>{source.collection}</Text>
        </View>
        {source.grade && (
          <View style={hadithStyles.gradeBadge}>
            <Text style={hadithStyles.gradeText}>
              {source.grade.charAt(0).toUpperCase() + source.grade.slice(1)}
            </Text>
          </View>
        )}
      </View>

      {source.narrator && (
        <View style={hadithStyles.narratorContainer}>
          <Ionicons name="person-outline" size={12} color="#94a3b8" />
          <Text style={hadithStyles.narratorText}>Narrated by {source.narrator}</Text>
        </View>
      )}

      {source.arabicText && (
        <View style={hadithStyles.arabicContainer}>
          {source.arabicText.split(' ').map((word, index) => (
            <Text key={index} style={hadithStyles.arabicWord}>{word}</Text>
          ))}
        </View>
      )}

      <Text style={hadithStyles.translation}>"{source.translation}"</Text>
    </View>
  );
}

export function StoryContentBlock({
  block,
  isHighlighted = false,
  onPlayQuranAudio,
  isQuranPlaying = false,
  isQuranLoading = false,
}: StoryContentBlockProps) {
  if (block.type === 'narrative') {
    return (
      <View style={[styles.narrativeContainer, isHighlighted && styles.highlighted]}>
        <Text style={styles.narrativeText}>{block.content}</Text>
      </View>
    );
  }

  if (block.type === 'quran_source' && block.source?.type === 'quran') {
    return (
      <View style={[styles.sourceContainer, isHighlighted && styles.highlighted]}>
        <QuranSourceCard
          source={block.source as QuranReference}
          onPlayArabic={onPlayQuranAudio ? () => onPlayQuranAudio(block.source as QuranReference) : undefined}
          isPlaying={isQuranPlaying}
          isLoading={isQuranLoading}
        />
      </View>
    );
  }

  if (block.type === 'hadith_source' && block.source?.type === 'hadith') {
    return (
      <View style={[styles.sourceContainer, isHighlighted && styles.highlighted]}>
        <HadithSourceCard source={block.source as HadithReference} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  narrativeContainer: {
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  narrativeText: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 26,
  },
  sourceContainer: {
    borderRadius: 8,
  },
  highlighted: {
    backgroundColor: '#3b82f620',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
});

const quranStyles = StyleSheet.create({
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

const hadithStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f59e0b10',
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  referenceText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: '600',
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#10b98120',
  },
  gradeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10b981',
  },
  narratorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  narratorText: {
    color: '#94a3b8',
    fontSize: 11,
    fontStyle: 'italic',
  },
  arabicContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
    gap: 6,
  },
  arabicWord: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 36,
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default StoryContentBlock;
