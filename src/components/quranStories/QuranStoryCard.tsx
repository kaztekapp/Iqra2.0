import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuranStoryListItem, STORY_CATEGORY_LABELS } from '../../types/quranStories';

interface QuranStoryCardProps {
  story: QuranStoryListItem;
  onPress: () => void;
}

export function QuranStoryCard({ story, onPress }: QuranStoryCardProps) {
  const categoryLabel = STORY_CATEGORY_LABELS[story.category];

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{story.icon}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.nameArabic}>{story.titleArabic}</Text>
          <Text style={styles.nameEnglish}>{story.titleEnglish}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{categoryLabel.english}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {story.description}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={styles.metaText}>{story.estimatedReadTime} min</Text>
          </View>
          {story.progress > 0 && story.progress < 100 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${story.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{story.progress}%</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.statusContainer}>
        {story.isCompleted ? (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#64748b" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8b5cf620',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 2,
  },
  nameArabic: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  nameEnglish: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#8b5cf615',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 10,
    color: '#a78bfa',
    fontWeight: '500',
  },
  description: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#64748b',
    fontSize: 11,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    maxWidth: 80,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },
  progressText: {
    color: '#a78bfa',
    fontSize: 11,
    fontWeight: '500',
  },
  statusContainer: {
    marginLeft: 12,
  },
  completedBadge: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QuranStoryCard;
