import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProphetListItem } from '../../types/prophetStories';

interface ProphetCardProps {
  prophet: ProphetListItem;
  onPress?: () => void;
}

export function ProphetCard({ prophet, onPress }: ProphetCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.orderContainer}>
        <Text style={styles.orderNumber}>{prophet.order}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.nameArabic}>{prophet.nameArabic}</Text>
          <Text style={styles.nameEnglish}>{prophet.nameEnglish}</Text>
        </View>
        {prophet.title && (
          <Text style={styles.title}>{prophet.title}</Text>
        )}
        <Text style={styles.summary} numberOfLines={2}>
          {prophet.summary}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={12} color="#64748b" />
            <Text style={styles.metaText}>{prophet.estimatedReadTime} min</Text>
          </View>
          {prophet.progress > 0 && prophet.progress < 100 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${prophet.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{prophet.progress}%</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.statusContainer}>
        {prophet.isCompleted ? (
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
  orderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f120',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  orderNumber: {
    color: '#818cf8',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 20,
    fontWeight: '600',
  },
  nameEnglish: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    color: '#818cf8',
    fontSize: 12,
    marginBottom: 4,
  },
  summary: {
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
    backgroundColor: '#10b981',
    borderRadius: 2,
  },
  progressText: {
    color: '#10b981',
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

export default ProphetCard;
