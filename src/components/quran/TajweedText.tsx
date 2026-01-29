import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { TajweedOccurrence, TajweedRuleId } from '../../types/quran';
import { TAJWEED_COLORS } from '../../data/arabic/quran/tajweed/colors';
import { getTajweedRuleById } from '../../data/arabic/quran/tajweed/rules';

interface TajweedTextProps {
  text: string;
  tajweedRules?: TajweedOccurrence[];
  showTajweed?: boolean;
  fontSize?: number;
  highlightWordIndex?: number;
  onWordPress?: (wordIndex: number) => void;
  onTajweedPress?: (ruleId: TajweedRuleId) => void;
}

interface TextSegment {
  text: string;
  ruleId?: TajweedRuleId;
  color?: string;
  startIndex: number;
  endIndex: number;
}

export function TajweedText({
  text,
  tajweedRules = [],
  showTajweed = true,
  fontSize = 28,
  highlightWordIndex,
  onWordPress,
  onTajweedPress,
}: TajweedTextProps) {
  // Handle undefined or empty text
  const safeText = text || '';

  // Parse text into segments with tajweed colors
  const getSegments = (): TextSegment[] => {
    if (!safeText || !showTajweed || tajweedRules.length === 0) {
      return [{ text: safeText, startIndex: 0, endIndex: safeText.length }];
    }

    // Sort rules by start index
    const sortedRules = [...tajweedRules].sort((a, b) => a.startIndex - b.startIndex);
    const segments: TextSegment[] = [];
    let currentIndex = 0;

    for (const rule of sortedRules) {
      // Add plain text before this rule
      if (rule.startIndex > currentIndex) {
        segments.push({
          text: safeText.substring(currentIndex, rule.startIndex),
          startIndex: currentIndex,
          endIndex: rule.startIndex,
        });
      }

      // Add tajweed segment
      const color = TAJWEED_COLORS[rule.ruleId as keyof typeof TAJWEED_COLORS];
      segments.push({
        text: safeText.substring(rule.startIndex, rule.endIndex),
        ruleId: rule.ruleId,
        color: color || '#ffffff',
        startIndex: rule.startIndex,
        endIndex: rule.endIndex,
      });

      currentIndex = rule.endIndex;
    }

    // Add remaining text
    if (currentIndex < safeText.length) {
      segments.push({
        text: safeText.substring(currentIndex),
        startIndex: currentIndex,
        endIndex: safeText.length,
      });
    }

    return segments;
  };

  const segments = getSegments();

  const handleSegmentPress = (segment: TextSegment) => {
    if (segment.ruleId && onTajweedPress) {
      onTajweedPress(segment.ruleId);
    }
  };

  return (
    <Text style={[styles.container, { fontSize, lineHeight: fontSize * 1.8 }]}>
      {segments.map((segment, index) => {
        if (segment.ruleId && showTajweed) {
          return (
            <Text
              key={index}
              style={[
                styles.tajweedText,
                { color: segment.color, fontSize },
              ]}
              onPress={() => handleSegmentPress(segment)}
            >
              {segment.text}
            </Text>
          );
        }
        return (
          <Text
            key={index}
            style={[styles.plainText, { fontSize }]}
          >
            {segment.text}
          </Text>
        );
      })}
    </Text>
  );
}

// Component for word-by-word display with highlighting
interface WordByWordTextProps {
  words: Array<{ text: string; transliteration: string; translation: string }>;
  currentWordIndex?: number;
  showTransliteration?: boolean;
  showTranslation?: boolean;
  fontSize?: number;
  onWordPress?: (index: number) => void;
}

export function WordByWordText({
  words,
  currentWordIndex,
  showTransliteration = true,
  showTranslation = true,
  fontSize = 24,
  onWordPress,
}: WordByWordTextProps) {
  return (
    <View style={styles.wordContainer}>
      {words.map((word, index) => {
        const isHighlighted = currentWordIndex === index;
        return (
          <Pressable
            key={index}
            style={[
              styles.wordItem,
              isHighlighted && styles.wordHighlighted,
            ]}
            onPress={() => onWordPress?.(index)}
          >
            <Text
              style={[
                styles.wordArabic,
                { fontSize },
                isHighlighted && styles.wordArabicHighlighted,
              ]}
            >
              {word.text}
            </Text>
            {showTransliteration && (
              <Text style={[styles.wordTransliteration, isHighlighted && styles.textHighlighted]}>
                {word.transliteration}
              </Text>
            )}
            {showTranslation && (
              <Text style={[styles.wordTranslation, isHighlighted && styles.textHighlighted]}>
                {word.translation}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#ffffff',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  plainText: {
    color: '#ffffff',
  },
  tajweedText: {
    fontWeight: '500',
  },
  wordContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  wordItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    minWidth: 60,
  },
  wordHighlighted: {
    backgroundColor: '#10b981',
  },
  wordArabic: {
    color: '#ffffff',
    marginBottom: 4,
  },
  wordArabicHighlighted: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  wordTransliteration: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 2,
  },
  wordTranslation: {
    color: '#64748b',
    fontSize: 10,
    textAlign: 'center',
    maxWidth: 80,
  },
  textHighlighted: {
    color: 'rgba(255,255,255,0.9)',
  },
});

export default TajweedText;
