import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useModerationStore, useBlockedMap } from '../../src/stores/moderationStore';
import { color, radius, space, type, weight, gutter, elevation } from '../../src/theme/tokens';
import { reportError } from '../../src/lib/report';

/** Everyone this person has blocked, with a way to unblock each. */
export default function BlockedUsersScreen() {
  const { t, i18n } = useTranslation();
  const blocked = useBlockedMap();
  const sync = useModerationStore((s) => s.sync);
  const unblock = useModerationStore((s) => s.unblock);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    void sync();
  }, [sync]);

  const people = useMemo(
    () => Object.entries(blocked)
      .map(([id, p]) => ({ id, ...p }))
      .sort((a, b) => b.blockedAt.localeCompare(a.blockedAt)),
    [blocked]
  );

  const confirmUnblock = (id: string, rawName: string) => {
    const name = rawName || t('moderation.unknownPerson');
    Alert.alert(
      t('moderation.unblockConfirmTitle', { name }),
      t('moderation.unblockConfirmBody'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('moderation.unblock'),
          onPress: async () => {
            setBusyId(id);
            try {
              await unblock(id);
            } catch (e) {
              reportError(e, { where: 'moderation.unblock' });
              Alert.alert(t('moderation.unblock'), t('moderation.unblockFailed'));
            } finally {
              setBusyId(null);
            }
          },
        },
      ]
    );
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(i18n.language, { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return iso.slice(0, 10);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel={t('a11y.back')} onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={color.text} />
        </Pressable>
        <Text style={styles.headerTitle} accessibilityRole="header">{t('moderation.blockedUsers')}</Text>
        <View style={styles.backBtn} />
      </View>

      <FlatList
        data={people}
        keyExtractor={(p) => p.id}
        contentContainerStyle={people.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="shield-checkmark-outline" size={28} color={color.accent} />
            </View>
            <Text style={styles.emptyText}>{t('moderation.blockedUsersEmpty')}</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => {
          const name = item.name || t('moderation.unknownPerson');
          return (
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <Text style={styles.meta}>{t('moderation.blockedOn', { date: formatDate(item.blockedAt) })}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${t('moderation.unblock')} ${name}`}
                disabled={busyId === item.id}
                style={styles.unblockBtn}
                onPress={() => confirmUnblock(item.id, item.name)}
              >
                {busyId === item.id
                  ? <ActivityIndicator size="small" color={color.accent} />
                  : <Text style={styles.unblockText}>{t('moderation.unblock')}</Text>}
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: color.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: space.lg, paddingBottom: space.md,
  },
  backBtn: { width: 32, padding: 4 },
  headerTitle: { ...type.bodyLarge, fontWeight: weight.bold, color: color.text },
  list: {
    marginHorizontal: gutter, marginTop: space.sm, backgroundColor: color.surface,
    borderRadius: radius.lg, borderWidth: 1, borderColor: color.border, ...elevation.subtle,
  },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: gutter * 2 },
  empty: { alignItems: 'center', gap: space.md },
  emptyIcon: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: color.accentSoft,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyText: { ...type.body, color: color.textMuted, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingHorizontal: space.lg, paddingVertical: space.md },
  divider: { height: 1, backgroundColor: color.borderSubtle, marginLeft: space.lg + 40 + space.md },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: color.surfaceSunken,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { ...type.bodyLarge, fontWeight: weight.semibold, color: color.textMuted },
  info: { flex: 1 },
  name: { ...type.body, fontWeight: weight.semibold, color: color.text },
  meta: { ...type.caption, color: color.textFaint },
  unblockBtn: {
    minWidth: 88, minHeight: 36, paddingHorizontal: space.md, borderRadius: radius.full,
    borderWidth: 1, borderColor: color.accent, alignItems: 'center', justifyContent: 'center',
  },
  unblockText: { ...type.caption, fontWeight: weight.semibold, color: color.accent },
});
