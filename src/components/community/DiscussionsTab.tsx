import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { useCommunityStore } from '../../stores/communityStore';
import { DiscussionCategory, DiscussionThread } from '../../types/community';
import { color, radius } from '../../theme/tokens';
import { withAlpha } from '../ui/Primitives';
import type { IoniconName } from '../../theme/icons';

const CATEGORIES: { key: DiscussionCategory | 'all'; icon: string; color: string }[] = [
  { key: 'all', icon: 'apps', color: color.textMuted },
  { key: 'general', icon: 'globe', color: color.textFaint },
  { key: 'quran', icon: 'book', color: color.progress },
  { key: 'arabic', icon: 'language', color: color.warning },
  { key: 'prayer', icon: 'moon', color: color.accent },
  { key: 'tips', icon: 'bulb', color: color.warning },
];

// Fixed for the life of the app, so it is built once rather than on every
// render of the tab.
const CATEGORY_COLORS: Record<string, string> = {
  general: color.textFaint,
  quran: color.progress,
  arabic: color.warning,
  prayer: color.accent,
  tips: color.warning,
};

interface ThreadCardProps {
  thread: DiscussionThread;
  onLike: (threadId: string) => void;
}

/**
 * One discussion in the list, memoized for the same reason as a group card:
 * liking a thread or pulling to refresh should not rebuild the other forty.
 */
const ThreadCard = memo(function ThreadCard({ thread, onLike }: ThreadCardProps) {
  const { t } = useTranslation();
  const { lc } = useLocalizedContent();
  const catColor = CATEGORY_COLORS[thread.category] || color.textMuted;

  const timeAgo = () => {
    const diff = Date.now() - new Date(thread.createdAt).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return t('community.justNow');
    if (hours < 24) return t('community.hoursAgo', { count: hours });
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <Pressable
      style={styles.threadCard}
      onPress={() => router.push(`/community/thread/${thread.id}`)}
    >
      {/* Pinned indicator */}
      {thread.isPinned && (
        <View style={styles.pinnedRow}>
          <Ionicons name="pin" size={12} color={color.warning} />
          <Text style={styles.pinnedText}>{t('community.pinned')}</Text>
        </View>
      )}

      <Text style={styles.threadTitle}>{lc(thread.title, thread.titleFr)}</Text>
      <Text style={styles.threadBody} numberOfLines={2}>{lc(thread.body, thread.bodyFr)}</Text>

      <View style={styles.threadFooter}>
        <View style={[styles.catBadge, { backgroundColor: `${catColor}20` }]}>
          <Text style={[styles.catBadgeText, { color: catColor }]}>
            {t(`community.category${thread.category.charAt(0).toUpperCase() + thread.category.slice(1)}`)}
          </Text>
        </View>
        <Text style={styles.threadAuthor}>{thread.authorName}</Text>
        <Text style={styles.threadDot}>{'·'}</Text>
        <Text style={styles.threadTime}>{timeAgo()}</Text>
        <View style={styles.threadStats}>
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onLike(thread.id);
            }}
            hitSlop={8}
          >
            <Ionicons name="heart-outline" size={13} color={color.textFaint} />
          </Pressable>
          <Text style={styles.threadStatNum}>{thread.likeCount}</Text>
          <Ionicons name="chatbubble-outline" size={13} color={color.textFaint} />
          <Text style={styles.threadStatNum}>{thread.replyCount}</Text>
        </View>
      </View>

      {thread.isHot && (
        <View style={styles.hotTag}>
          <Ionicons name="flame" size={11} color={color.warning} />
          <Text style={styles.hotTagText}>{t('community.hot')}</Text>
        </View>
      )}
    </Pressable>
  );
});

export function DiscussionsTab({ active = true }: { active?: boolean }) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<DiscussionCategory | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postCategory, setPostCategory] = useState<DiscussionCategory>('general');
  const [isPosting, setIsPosting] = useState(false);

  // Narrow subscriptions: this tab used to re-render on any community state
  // change at all, including ones it never shows.
  const discussions = useCommunityStore((s) => s.discussions);
  const isLoadingDiscussions = useCommunityStore((s) => s.isLoadingDiscussions);
  const loadDiscussions = useCommunityStore((s) => s.loadDiscussions);
  const postThread = useCommunityStore((s) => s.postThread);
  const toggleLikeThread = useCommunityStore((s) => s.toggleLikeThread);

  useEffect(() => {
    if (active) loadDiscussions(selectedCategory === 'all' ? undefined : selectedCategory);
  }, [active, selectedCategory, loadDiscussions]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDiscussions(selectedCategory === 'all' ? undefined : selectedCategory, true);
    setRefreshing(false);
  }, [selectedCategory, loadDiscussions]);

  const handleLike = useCallback((threadId: string) => {
    void toggleLikeThread(threadId);
  }, [toggleLikeThread]);

  const handlePost = async () => {
    if (!postTitle.trim() || !postBody.trim()) return;
    setIsPosting(true);
    await postThread(postTitle.trim(), postBody.trim(), postCategory);
    setIsPosting(false);
    setPostTitle('');
    setPostBody('');
    setPostCategory('general');
    setShowPostModal(false);
  };

  // Sort: pinned first, then by recency
  const sorted = useMemo(
    () =>
      [...discussions].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }),
    [discussions],
  );

  const renderThread = useCallback(
    ({ item }: { item: DiscussionThread }) => <ThreadCard thread={item} onLike={handleLike} />,
    [handleLike],
  );
  const keyExtractor = useCallback((th: DiscussionThread) => th.id, []);

  return (
    <View style={styles.container}>
      {/* Category filter */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            const label = cat.key === 'all'
              ? t('common.all')
              : t(`community.category${cat.key.charAt(0).toUpperCase() + cat.key.slice(1)}`);
            return (
              <Pressable
                key={cat.key}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat.key)}
              >
                <Ionicons
                  name={cat.icon as IoniconName}
                  size={14}
                  color={isActive ? color.surface : cat.color}
                />
                <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Threads list */}
      {isLoadingDiscussions && discussions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={color.progress} size="large" />
        </View>
      ) : (
        <FlatList
          data={sorted}
          renderItem={renderThread}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.threadList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={7}
          ListEmptyComponent={<Text style={styles.emptyText}>{t('community.noDiscussions')}</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={color.progress} />
          }
        />
      )}

      {/* FAB — New Post */}
      <Pressable style={styles.fab} onPress={() => setShowPostModal(true)}>
        <Ionicons name="add" size={24} color={color.text} />
      </Pressable>

      {/* ── New Post Modal ──────────────────────────────────── */}
      <Modal visible={showPostModal} animationType="slide" transparent>
        {showPostModal && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setShowPostModal(false)}>
                <Ionicons name="close" size={24} color={color.textMuted} />
              </Pressable>
              <Text style={styles.modalTitle}>{t('community.newDiscussion')}</Text>
              <Pressable
                style={[styles.postBtn, (!postTitle.trim() || !postBody.trim() || isPosting) && styles.postBtnDisabled]}
                onPress={handlePost}
                disabled={!postTitle.trim() || !postBody.trim() || isPosting}
              >
                <Text style={styles.postBtnText}>
                  {isPosting ? t('community.posting') : t('community.post')}
                </Text>
              </Pressable>
            </View>

            {/* Category picker */}
            <Text style={styles.inputLabel}>{t('community.postCategory')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catPickerRow}>
              {CATEGORIES.filter((c) => c.key !== 'all').map((cat) => {
                const isSelected = postCategory === cat.key;
                return (
                  <Pressable
                    key={cat.key}
                    style={[styles.catPickerChip, isSelected && { backgroundColor: cat.color, borderColor: cat.color }]}
                    onPress={() => setPostCategory(cat.key as DiscussionCategory)}
                  >
                    <Text style={[styles.catPickerText, isSelected && { color: color.text }]}>
                      {t(`community.category${cat.key.charAt(0).toUpperCase() + cat.key.slice(1)}`)}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <TextInput
              style={styles.titleInput}
              placeholder={t('community.postTitle')}
              placeholderTextColor={color.textFaint}
              value={postTitle}
              onChangeText={setPostTitle}
              maxLength={120}
            />
            <TextInput
              style={styles.bodyInput}
              placeholder={t('community.postBody')}
              placeholderTextColor={color.textFaint}
              value={postBody}
              onChangeText={setPostBody}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
          </View>
        </KeyboardAvoidingView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: color.textFaint,
    textAlign: 'center',
    paddingVertical: 40,
  },

  // Category filter
  categoryWrapper: {
    flexShrink: 0,
  },
  categoryRow: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 14,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.xl,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
  },
  categoryChipActive: {
    backgroundColor: color.progress,
    borderColor: color.progress,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: color.textMuted,
  },
  categoryChipTextActive: {
    color: color.text,
  },

  // Thread list
  threadList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  threadCard: {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: color.border,
    position: 'relative',
  },
  pinnedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  pinnedText: {
    fontSize: 11,
    fontWeight: '600',
    color: color.warning,
  },
  threadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: color.text,
    marginBottom: 6,
  },
  threadBody: {
    fontSize: 13,
    color: color.textMuted,
    lineHeight: 18,
    marginBottom: 10,
  },
  threadFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  catBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  threadAuthor: {
    fontSize: 12,
    color: color.textFaint,
  },
  threadDot: {
    fontSize: 12,
    color: color.textFaint,
  },
  threadTime: {
    fontSize: 12,
    color: color.textFaint,
  },
  threadStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  threadStatNum: {
    fontSize: 12,
    color: color.textFaint,
    marginRight: 6,
  },
  hotTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: withAlpha(color.warning, 0.08),
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  hotTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: color.warning,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: color.progress,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: color.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: color.text,
  },
  postBtn: {
    backgroundColor: color.progress,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  postBtnDisabled: {
    opacity: 0.4,
  },
  postBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: color.text,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: color.textMuted,
    marginBottom: 8,
  },
  catPickerRow: {
    marginBottom: 16,
    maxHeight: 40,
  },
  catPickerChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.xl,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    marginRight: 8,
  },
  catPickerText: {
    fontSize: 13,
    fontWeight: '600',
    color: color.textMuted,
  },
  titleInput: {
    backgroundColor: color.bg,
    borderRadius: radius.md,
    padding: 14,
    fontSize: 16,
    fontWeight: '600',
    color: color.text,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: color.border,
  },
  bodyInput: {
    backgroundColor: color.bg,
    borderRadius: radius.md,
    padding: 14,
    fontSize: 14,
    color: color.text,
    minHeight: 120,
    borderWidth: 1,
    borderColor: color.border,
  },
});
