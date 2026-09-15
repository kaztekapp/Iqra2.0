import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HadithReference, HadithCollection, HadithGrade } from '../../types/prophetStories';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { useTranslation } from 'react-i18next';
import { font, color, radius } from '../../theme/tokens';
import { withAlpha } from '../ui/Primitives';

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
  ibn_hibban: 'Sahih Ibn Hibban',
  other: 'Other Collection',
};

const GRADE_COLORS: Record<HadithGrade, string> = {
  sahih: color.progress,
  hasan: color.accent,
  daif: color.warning,
  mutawatir: color.accent,
};

const GRADE_LABELS: Record<HadithGrade, string> = {
  sahih: 'Sahih (Authentic)',
  hasan: 'Hasan (Good)',
  daif: 'Da\'if (Weak)',
  mutawatir: 'Mutawatir (Mass-transmitted)',
};

export function HadithSourceCard({ source }: HadithSourceCardProps) {
  const { lc } = useLocalizedContent();
  const { t } = useTranslation();
  const collectionName = COLLECTION_NAMES[source.collection];
  const gradeColor = source.grade ? GRADE_COLORS[source.grade] : color.textMuted;
  const gradeLabel = source.grade ? GRADE_LABELS[source.grade] : null;

  return (
    <View style={styles.container}>
      {/* Header with Hadith reference */}
      <View style={styles.header}>
        <View style={styles.referenceContainer}>
          <Ionicons name="document-text" size={14} color={color.warning} />
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
          <Ionicons name="person-outline" size={12} color={color.textMuted} />
          <Text style={styles.narratorText}>{t('stories.narratedBy', { narrator: source.narrator })}</Text>
        </View>
      )}

      {/* The hadith in Arabic, chain and all, as the collection records it. */}
      {source.arabicText && <Text style={styles.arabic}>{source.arabicText}</Text>}

      {/* Translation */}
      <Text style={styles.translation}>"{lc(source.translation, source.translationFr)}"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: withAlpha(color.warning, 0.06),
    borderRadius: radius.md,
    padding: 14,
    marginVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: color.warning,
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
    color: color.warning,
    fontSize: 12,
    fontWeight: '600',
  },
  hadithNumber: {
    color: color.sacredBright,
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
    color: color.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
  // A hadith is a paragraph, not a phrase: one right-to-left block, set a
  // little smaller than a quoted ayah and with room between the lines for
  // the vowel marks. Laying it out word by word, as a short phrase can be,
  // would put a hundred separate texts on the page and break the line
  // spacing of a long report.
  arabic: {
    fontFamily: font.arabic,
    color: color.text,
    fontSize: 19,
    lineHeight: 38,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 10,
  },
  translation: {
    color: color.textMuted,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default HadithSourceCard;
