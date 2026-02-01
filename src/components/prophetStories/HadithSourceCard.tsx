import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HadithReference, HadithCollection, HadithGrade } from '../../types/prophetStories';

interface HadithSourceCardProps {
  source: HadithReference;
}

const COLLECTION_NAMES: Record<HadithCollection, string> = {
  bukhari: 'Sahih al-Bukhari',
  muslim: 'Sahih Muslim',
  tirmidhi: 'Jami\' at-Tirmidhi',
  abu_dawud: 'Sunan Abu Dawud',
  nasai: 'Sunan an-Nasa\'i',
  ibn_majah: 'Sunan Ibn Majah',
  ahmad: 'Musnad Ahmad',
  malik: 'Muwatta Malik',
  darimi: 'Sunan ad-Darimi',
  other: 'Other Collection',
};

const GRADE_COLORS: Record<HadithGrade, string> = {
  sahih: '#10b981',
  hasan: '#3b82f6',
  daif: '#f59e0b',
  mutawatir: '#8b5cf6',
};

const GRADE_LABELS: Record<HadithGrade, string> = {
  sahih: 'Sahih (Authentic)',
  hasan: 'Hasan (Good)',
  daif: 'Da\'if (Weak)',
  mutawatir: 'Mutawatir (Mass-transmitted)',
};

export function HadithSourceCard({ source }: HadithSourceCardProps) {
  const collectionName = COLLECTION_NAMES[source.collection];
  const gradeColor = source.grade ? GRADE_COLORS[source.grade] : '#64748b';
  const gradeLabel = source.grade ? GRADE_LABELS[source.grade] : null;

  return (
    <View style={styles.container}>
      {/* Header with Hadith reference */}
      <View style={styles.header}>
        <View style={styles.referenceContainer}>
          <Ionicons name="document-text" size={14} color="#f59e0b" />
          <Text style={styles.referenceText}>{collectionName}</Text>
          {source.hadithNumber && (
            <Text style={styles.hadithNumber}>#{source.hadithNumber}</Text>
          )}
        </View>
        {source.grade && (
          <View style={[styles.gradeBadge, { backgroundColor: `${gradeColor}20` }]}>
            <Text style={[styles.gradeText, { color: gradeColor }]}>
              {source.grade.charAt(0).toUpperCase() + source.grade.slice(1)}
            </Text>
          </View>
        )}
      </View>

      {/* Narrator */}
      {source.narrator && (
        <View style={styles.narratorContainer}>
          <Ionicons name="person-outline" size={12} color="#94a3b8" />
          <Text style={styles.narratorText}>Narrated by {source.narrator}</Text>
        </View>
      )}

      {/* Arabic Text (if available) */}
      {source.arabicText && (
        <Text style={styles.arabicText}>{source.arabicText}</Text>
      )}

      {/* English Translation */}
      <Text style={styles.translation}>"{source.translation}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  hadithNumber: {
    color: '#fbbf24',
    fontSize: 11,
    marginLeft: 4,
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  gradeText: {
    fontSize: 10,
    fontWeight: '600',
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
  arabicText: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 10,
    fontFamily: 'System',
  },
  translation: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default HadithSourceCard;
