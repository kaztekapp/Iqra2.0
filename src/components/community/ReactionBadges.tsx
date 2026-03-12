import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface ReactionGroup {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

interface Props {
  reactions: ReactionGroup[];
  onToggle: (emoji: string) => void;
}

export function ReactionBadges({ reactions, onToggle }: Props) {
  if (reactions.length === 0) return null;

  return (
    <View style={styles.container}>
      {reactions.map((r) => {
        const isArabic = r.emoji.length > 2;
        return (
          <Pressable
            key={r.emoji}
            style={[styles.badge, r.hasReacted && styles.badgeActive]}
            onPress={() => onToggle(r.emoji)}
          >
            <Text style={[styles.emoji, isArabic && styles.arabicEmoji]}>{r.emoji}</Text>
            <Text style={[styles.count, r.hasReacted && styles.countActive]}>{r.count}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#1e293b', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: '#334155' },
  badgeActive: { backgroundColor: '#818cf820', borderColor: '#818cf850' },
  emoji: { fontSize: 14 },
  arabicEmoji: { fontSize: 9, fontWeight: '700', color: '#f59e0b' },
  count: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  countActive: { color: '#818cf8' },
});
