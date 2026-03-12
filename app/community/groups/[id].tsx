import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useCommunityStore } from '../../../src/stores/communityStore';
import { useSettingsStore } from '../../../src/stores/settingsStore';
import { SIMULATED_GROUPS } from '../../../src/data/community/socialData';
import type { GroupMember, GroupMessage, GroupLeaderboardEntry } from '../../../src/data/community/socialData';
import {
  fetchGroupMessages,
  sendGroupMessage,
  subscribeToGroupMessages,
  fetchGroupMembers,
  updateMemberRole,
  removeMember,
  pinMessage,
  unpinMessage,
  fetchPinnedMessages,
  generateInviteCode,
  addReaction,
  removeReaction,
  fetchReactions,
  fetchGroupLeaderboard,
  fetchSessions,
  rsvpSession,
  createSession,
  fetchChallenges,
  createChallenge,
  sendVoiceMessage,
  uploadVoiceNote,
  subscribeToReactions,
  GroupMessageRow,
} from '../../../src/services/communitySocialService';
import { StudySession, GroupChallenge, MessageReaction } from '../../../src/types/community';
import { MessageBubble, MessageBubbleMessage } from '../../../src/components/community/MessageBubble';
import { MemberRow, MemberRowData } from '../../../src/components/community/MemberRow';
import { ChatInputBar } from '../../../src/components/community/ChatInputBar';
import { GroupInfoTab } from '../../../src/components/community/GroupInfoTab';
import { ReactionPicker } from '../../../src/components/community/ReactionPicker';
import { ReactionBadges } from '../../../src/components/community/ReactionBadges';
import { PinnedBanner } from '../../../src/components/community/PinnedBanner';
import { ChallengeBanner } from '../../../src/components/community/ChallengeBanner';
import { GroupLeaderboard } from '../../../src/components/community/GroupLeaderboard';
import { VoiceRecorder } from '../../../src/components/community/VoiceRecorder';

type Tab = 'chat' | 'members' | 'info';

type MappedMessage = GroupMessage & { isPinned?: boolean; audioUrl?: string; durationMs?: number };

function rowToMessage(row: GroupMessageRow): MappedMessage {
  return {
    id: row.id,
    userId: row.user_id,
    authorName: row.author_name,
    avatar: row.avatar || row.author_name.charAt(0).toUpperCase(),
    body: row.body,
    type: row.type as GroupMessage['type'],
    createdAt: row.created_at,
    isPinned: row.is_pinned,
    audioUrl: row.audio_url,
    durationMs: row.duration_ms,
  };
}

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);

  const user = useSettingsStore((s) => s.user);
  const { groups, joinGroup, leaveGroup } = useCommunityStore();

  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<MappedMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [memberSearch, setMemberSearch] = useState('');
  // FIX #7: seenIds cleared on group change via useEffect cleanup
  const seenIds = useRef(new Set<string>());
  const reactionSubRef = useRef<{ unsubscribe: () => void; addMessageId: (id: string) => void } | null>(null);

  // Feature state
  const [pinnedMessages, setPinnedMessages] = useState<{ id: string; authorName: string; body: string }[]>([]);
  const [showPinned, setShowPinned] = useState(true);
  const [reactions, setReactions] = useState<Record<string, MessageReaction[]>>({});
  const [reactionPickerMsgId, setReactionPickerMsgId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [challenges, setChallenges] = useState<GroupChallenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<GroupLeaderboardEntry[]>([]);
  const [memberTab, setMemberTab] = useState<'members' | 'leaderboard'>('members');
  const [isRecording, setIsRecording] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Find group
  const group = groups.find((g) => g.id === id) || SIMULATED_GROUPS.find((g) => g.id === id);
  const isJoined = group?.isJoined || false;
  const myMember = members.find((m) => m.userId === user?.id || m.id === user?.id);
  const myRole = myMember?.role || 'member';
  const isAdmin = myRole === 'admin';
  const isModerator = myRole === 'moderator';
  const canManage = isAdmin || isModerator;
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'You';

  // FIX #4: Memoized deduplication
  const dedupedMessages = useMemo(() => {
    const seen = new Set<string>();
    return messages.filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });
  }, [messages]);

  // FIX #8: Memoized reaction groups
  const reactionGroupsMap = useMemo(() => {
    const map: Record<string, { emoji: string; count: number; hasReacted: boolean }[]> = {};
    for (const msgId of Object.keys(reactions)) {
      const msgReactions = reactions[msgId];
      const groups: Record<string, { emoji: string; count: number; hasReacted: boolean }> = {};
      for (const r of msgReactions) {
        if (!groups[r.emoji]) groups[r.emoji] = { emoji: r.emoji, count: 0, hasReacted: false };
        groups[r.emoji].count++;
        if (r.userId === user?.id) groups[r.emoji].hasReacted = true;
      }
      map[msgId] = Object.values(groups);
    }
    return map;
  }, [reactions, user?.id]);

  // FIX #8: Memoized filtered members
  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return members;
    const q = memberSearch.trim().toLowerCase();
    return members.filter((m) => m.name.toLowerCase().includes(q));
  }, [members, memberSearch]);

  const activeChallenge = useMemo(() => challenges.find((c) => c.isActive), [challenges]);
  const topContributorId = leaderboard.length > 0 ? leaderboard[0].userId : null;

  // FIX #6: Single parallelized load for all data
  useEffect(() => {
    if (!id) return;
    let unsubMessages: (() => void) | null = null;
    // FIX #7: Clear seenIds on group change
    seenIds.current.clear();

    (async () => {
      setIsLoadingMessages(true);
      setIsLoadingMembers(true);

      // Parallel fetch: messages, members, pinned, sessions, challenges, leaderboard
      const [rows, membersData, pinned, sessData, challData, lbData] = await Promise.all([
        fetchGroupMessages(id),
        fetchGroupMembers(id),
        fetchPinnedMessages(id),
        fetchSessions(id),
        fetchChallenges(id),
        fetchGroupLeaderboard(id),
      ]);

      // Process messages
      const mapped = rows.map(rowToMessage);
      mapped.forEach((m) => seenIds.current.add(m.id));

      if (mapped.length > 0) {
        setMessages(mapped);
        // Fetch reactions in parallel (needs message IDs)
        const reactionData = await fetchReactions(mapped.map((m) => m.id));
        setReactions(Object.keys(reactionData).length > 0 ? reactionData : {});
      } else {
        // FIX #9: Lazy-load simulated data only when needed
        const { SIMULATED_GROUP_MESSAGES, SIMULATED_REACTIONS } = require('../../../src/data/community/socialData');
        setMessages(SIMULATED_GROUP_MESSAGES[id] || []);
        setReactions(SIMULATED_REACTIONS);
      }
      setIsLoadingMessages(false);

      // Process members
      if (membersData.length > 0) {
        setMembers(membersData);
      } else {
        const { SIMULATED_GROUP_MEMBERS } = require('../../../src/data/community/socialData');
        setMembers(SIMULATED_GROUP_MEMBERS[id] || []);
      }
      setIsLoadingMembers(false);

      // Process pinned
      if (pinned.length > 0) {
        setPinnedMessages(pinned.map((p) => ({ id: p.id, authorName: p.author_name, body: p.body })));
      }

      // Process sessions/challenges/leaderboard
      if (sessData.length > 0) setSessions(sessData);
      else {
        const { SIMULATED_SESSIONS } = require('../../../src/data/community/socialData');
        setSessions(SIMULATED_SESSIONS[id] || []);
      }
      if (challData.length > 0) setChallenges(challData);
      else {
        const { SIMULATED_CHALLENGES } = require('../../../src/data/community/socialData');
        setChallenges(SIMULATED_CHALLENGES[id] || []);
      }
      if (lbData.length > 0) setLeaderboard(lbData);
      else {
        const { SIMULATED_GROUP_LEADERBOARD } = require('../../../src/data/community/socialData');
        setLeaderboard(SIMULATED_GROUP_LEADERBOARD[id] || []);
      }

      // Subscribe to new messages
      unsubMessages = subscribeToGroupMessages(id, (newRow) => {
        if (seenIds.current.has(newRow.id)) return;
        seenIds.current.add(newRow.id);
        // Register new message ID with reaction subscription
        reactionSubRef.current?.addMessageId(newRow.id);
        setMessages((prev) => {
          if (prev.some((m) => m.id === newRow.id)) return prev;
          return [...prev, rowToMessage(newRow)];
        });
      });

      // FIX #1: Subscribe to reactions scoped to this group's messages
      const msgIds = mapped.map((m) => m.id);
      const reactionSub = subscribeToReactions(id, msgIds, (payload) => {
        if (payload.eventType === 'INSERT' && payload.new) {
          const r = payload.new;
          setReactions((prev) => ({
            ...prev,
            [r.message_id]: [...(prev[r.message_id] || []), {
              id: r.id,
              messageId: r.message_id,
              userId: r.user_id,
              emoji: r.emoji,
              createdAt: r.created_at,
            }],
          }));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          const r = payload.old;
          setReactions((prev) => ({
            ...prev,
            [r.message_id]: (prev[r.message_id] || []).filter((rx) => rx.id !== r.id),
          }));
        }
      });
      reactionSubRef.current = reactionSub;
    })();

    return () => {
      if (unsubMessages) unsubMessages();
      reactionSubRef.current?.unsubscribe();
      reactionSubRef.current = null;
    };
  }, [id]);

  // Reload members when join state changes
  useEffect(() => {
    if (!id || !isJoined) return;
    (async () => {
      const membersData = await fetchGroupMembers(id);
      if (membersData.length > 0) setMembers(membersData);
    })();
  }, [isJoined]);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  useEffect(() => {
    if (activeTab === 'chat') {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    }
  }, [activeTab]);

  const handleSend = useCallback(async () => {
    const text = messageText.trim();
    if (!text || isSending || !id || !user) return;
    setIsSending(true);
    setMessageText('');

    const sent = await sendGroupMessage(id, user.id, displayName, text);

    if (!sent) {
      const fallbackMsg: MappedMessage = {
        id: `local-${Date.now()}`,
        userId: user.id,
        authorName: displayName,
        avatar: displayName.charAt(0).toUpperCase(),
        body: text,
        type: 'message',
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
    setIsSending(false);
    scrollToEnd();
  }, [messageText, isSending, id, user, displayName, scrollToEnd]);

  const handleJoinLeave = useCallback(() => {
    if (!id) return;
    if (isJoined) {
      Alert.alert(
        t('community.leaveGroup'),
        t('community.leaveGroupConfirm', { defaultValue: 'Are you sure you want to leave this group?' }),
        [
          { text: t('common.cancel', { defaultValue: 'Cancel' }), style: 'cancel' },
          { text: t('community.leaveGroup'), style: 'destructive', onPress: () => leaveGroup(id) },
        ]
      );
    } else {
      joinGroup(id);
    }
  }, [id, isJoined, t, leaveGroup, joinGroup]);

  const handleMemberAction = useCallback((member: GroupMember) => {
    if (!id || !canManage || member.userId === user?.id || member.id === user?.id) return;
    if (isModerator && member.role === 'admin') return;

    const buttons: any[] = [];
    if (isAdmin) {
      if (member.role === 'member') {
        buttons.push({ text: 'Make Moderator', onPress: async () => {
          await updateMemberRole(id, member.userId || member.id, 'moderator');
          setMembers((prev) => prev.map((m) => m.id === member.id ? { ...m, role: 'moderator' as const } : m));
        }});
      }
      if (member.role === 'moderator') {
        buttons.push({ text: 'Make Admin', onPress: async () => {
          await updateMemberRole(id, member.userId || member.id, 'admin');
          setMembers((prev) => prev.map((m) => m.id === member.id ? { ...m, role: 'admin' as const } : m));
        }});
        buttons.push({ text: 'Remove Moderator', onPress: async () => {
          await updateMemberRole(id, member.userId || member.id, 'member');
          setMembers((prev) => prev.map((m) => m.id === member.id ? { ...m, role: 'member' as const } : m));
        }});
      }
    }
    if (canManage && member.role !== 'admin') {
      buttons.push({ text: 'Remove from Group', style: 'destructive', onPress: async () => {
        await removeMember(id, member.userId || member.id);
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
      }});
    }
    buttons.push({ text: t('common.cancel', { defaultValue: 'Cancel' }), style: 'cancel' });
    Alert.alert(member.name, `Role: ${member.role}`, buttons);
  }, [id, canManage, isAdmin, isModerator, user?.id, t]);

  const handleMessageLongPress = useCallback((msg: MappedMessage) => {
    if (msg.type === 'system' || msg.type === 'milestone') return;

    const buttons: any[] = [];
    buttons.push({ text: t('community.react', { defaultValue: 'React' }), onPress: () => setReactionPickerMsgId(msg.id) });

    if (canManage) {
      if (msg.isPinned) {
        buttons.push({
          text: t('community.unpinMessage', { defaultValue: 'Unpin' }),
          onPress: async () => {
            await unpinMessage(msg.id);
            setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, isPinned: false } : m));
            setPinnedMessages((prev) => prev.filter((p) => p.id !== msg.id));
          },
        });
      } else {
        const pinnedCount = messages.filter((m) => m.isPinned).length;
        if (pinnedCount < 3) {
          buttons.push({
            text: t('community.pinMessage', { defaultValue: 'Pin Message' }),
            onPress: async () => {
              await pinMessage(msg.id);
              setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, isPinned: true } : m));
              setPinnedMessages((prev) => [{ id: msg.id, authorName: msg.authorName, body: msg.body }, ...prev].slice(0, 3));
            },
          });
        }
      }
    }

    buttons.push({ text: t('common.cancel', { defaultValue: 'Cancel' }), style: 'cancel' });
    Alert.alert(msg.authorName, msg.body.substring(0, 80), buttons);
  }, [canManage, messages, t]);

  const handleReaction = useCallback(async (emoji: string) => {
    if (!reactionPickerMsgId || !user) return;
    const msgId = reactionPickerMsgId;
    const existing = (reactions[msgId] || []).find((r) => r.userId === user.id && r.emoji === emoji);

    if (existing) {
      await removeReaction(msgId, user.id, emoji);
      setReactions((prev) => ({
        ...prev,
        [msgId]: (prev[msgId] || []).filter((r) => !(r.userId === user.id && r.emoji === emoji)),
      }));
    } else {
      await addReaction(msgId, user.id, emoji);
      const newReaction: MessageReaction = {
        id: `rx-${Date.now()}`,
        messageId: msgId,
        userId: user.id,
        emoji,
        createdAt: new Date().toISOString(),
      };
      setReactions((prev) => ({
        ...prev,
        [msgId]: [...(prev[msgId] || []), newReaction],
      }));
    }
  }, [reactionPickerMsgId, user, reactions]);

  // FIX #5: Stable callback for reaction toggling
  const handleToggleReaction = useCallback(async (msgId: string, emoji: string) => {
    if (!user) return;
    setReactions((prev) => {
      const existing = (prev[msgId] || []).find((r) => r.userId === user.id && r.emoji === emoji);
      if (existing) {
        removeReaction(msgId, user.id, emoji);
        return { ...prev, [msgId]: (prev[msgId] || []).filter((r) => !(r.userId === user.id && r.emoji === emoji)) };
      } else {
        addReaction(msgId, user.id, emoji);
        return { ...prev, [msgId]: [...(prev[msgId] || []), { id: `rx-${Date.now()}`, messageId: msgId, userId: user.id, emoji, createdAt: new Date().toISOString() }] };
      }
    });
  }, [user]);

  const handleVoiceSend = useCallback(async (uri: string, durationMs: number) => {
    if (!id || !user) { setIsRecording(false); return; }
    setIsRecording(false);

    const audioUrl = await uploadVoiceNote(id, user.id, uri);
    if (audioUrl) {
      const sent = await sendVoiceMessage(id, user.id, displayName, audioUrl, durationMs);
      if (sent) {
        seenIds.current.add(sent.id);
        reactionSubRef.current?.addMessageId(sent.id);
        setMessages((prev) => [...prev, rowToMessage(sent)]);
      }
    } else {
      const fallback: MappedMessage = {
        id: `local-voice-${Date.now()}`,
        userId: user.id,
        authorName: displayName,
        avatar: displayName.charAt(0).toUpperCase(),
        body: 'Voice note',
        type: 'voice' as any,
        createdAt: new Date().toISOString(),
        audioUrl: uri,
        durationMs,
      };
      setMessages((prev) => [...prev, fallback]);
    }
    scrollToEnd();
  }, [id, user, displayName, scrollToEnd]);

  const handleCreateSession = useCallback(async (title: string, description: string, scheduledAt: string, durationMinutes: number) => {
    if (!id || !user) return;
    const result = await createSession(id, user.id, displayName, title, description, scheduledAt, durationMinutes);
    if (result) {
      const newSession: StudySession = {
        id: result.id || `sess-${Date.now()}`,
        groupId: id, creatorId: user.id, creatorName: displayName,
        title, description, scheduledAt, durationMinutes,
        attendeeCount: 0, userRsvp: null, createdAt: new Date().toISOString(),
      };
      setSessions((prev) => [newSession, ...prev]);
    }
  }, [id, user, displayName]);

  const handleCreateChallenge = useCallback(async (title: string, targetType: string, targetValue: number, startDate: string, endDate: string) => {
    if (!id || !user) return;
    const result = await createChallenge(id, user.id, displayName, title, targetType, targetValue, startDate, endDate);
    if (result) {
      const newChallenge: GroupChallenge = {
        id: result.id || `ch-${Date.now()}`,
        groupId: id, creatorId: user.id, creatorName: displayName,
        title, targetType: targetType as any, targetValue,
        currentValue: 0, participantCount: 0,
        startDate, endDate, isActive: true, createdAt: new Date().toISOString(),
      };
      setChallenges((prev) => [newChallenge, ...prev]);
    }
  }, [id, user, displayName]);

  const handleRsvp = useCallback(async (sessionId: string, status: 'going' | 'not_going') => {
    if (!user) return;
    await rsvpSession(sessionId, user.id, status);
    setSessions((prev) => prev.map((s) =>
      s.id === sessionId
        ? { ...s, userRsvp: status, attendeeCount: status === 'going' ? s.attendeeCount + 1 : Math.max(0, s.attendeeCount - 1) }
        : s
    ));
  }, [user]);

  const handleGenerateInvite = useCallback(async () => {
    if (!id) return;
    const code = await generateInviteCode(id);
    if (code) setInviteCode(code);
  }, [id]);

  const getTimeAgo = useCallback((dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return t('community.justNow');
    if (mins < 60) return t('community.minutesAgo', { count: mins });
    const hours = Math.floor(mins / 60);
    if (hours < 24) return t('community.hoursAgo', { count: hours });
    return `${Math.floor(hours / 24)}d`;
  }, [t]);

  const getDaysAgo = useCallback((dateStr: string) => {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / (24 * 3600000));
    if (days === 0) return 'today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  }, []);

  // FIX #3: FlatList renderItem for chat messages
  const renderMessage = useCallback(({ item: msg, index }: { item: MappedMessage; index: number }) => {
    const prevMsg = index > 0 ? dedupedMessages[index - 1] : null;
    const showAvatar = !prevMsg || prevMsg.authorName !== msg.authorName || (prevMsg.type !== 'chat' && prevMsg.type !== 'message');
    const isMe = msg.userId === user?.id || msg.authorName === displayName;
    const reactionGroups = reactionGroupsMap[msg.id] || [];

    return (
      <MessageBubble
        msg={msg as MessageBubbleMessage}
        getTimeAgo={getTimeAgo}
        groupColor={group?.color || '#818cf8'}
        isMe={isMe}
        showAvatar={showAvatar}
        onLongPress={() => handleMessageLongPress(msg)}
        reactionRow={
          reactionGroups.length > 0 ? (
            <ReactionBadges
              reactions={reactionGroups}
              onToggle={(emoji) => handleToggleReaction(msg.id, emoji)}
            />
          ) : undefined
        }
      />
    );
  }, [dedupedMessages, user?.id, displayName, reactionGroupsMap, group?.color, getTimeAgo, handleMessageLongPress, handleToggleReaction]);

  const keyExtractor = useCallback((item: MappedMessage) => item.id, []);

  if (!group) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
          <Text style={styles.headerTitle}>{t('community.studyGroups')}</Text>
          <View style={{ width: 32 }} />
        </View>
        <View style={styles.centered}>
          <ActivityIndicator color="#818cf8" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerTopRow}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTopTitle} numberOfLines={1}>{t('community.studyGroups')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.headerGroupInfo}>
        <View style={[styles.headerIcon, { backgroundColor: `${group.color}20` }]}>
          <Ionicons name={group.icon as any} size={22} color={group.color} />
        </View>
        <View style={styles.headerInfoBlock}>
          <Text style={styles.headerTitle} numberOfLines={2}>{group.name}</Text>
          <View style={styles.headerSubRow}>
            <Ionicons name="people" size={13} color="#94a3b8" />
            <Text style={styles.headerSub}>
              {t('community.members', { count: group.memberCount })}
            </Text>
            {group.isActive && (
              <>
                <View style={styles.headerActiveDot} />
                <Text style={styles.headerActiveText}>{t('community.activeNow')}</Text>
              </>
            )}
          </View>
        </View>
        <Pressable
          style={[styles.headerAction, isJoined ? styles.headerActionLeave : null]}
          onPress={handleJoinLeave}
        >
          <Text style={[styles.headerActionText, isJoined ? styles.headerActionTextLeave : null]}>
            {isJoined ? t('community.leaveGroup') : t('community.joinGroup')}
          </Text>
        </Pressable>
      </View>

      {/* Non-member preview */}
      {!isJoined ? (
        <ScrollView contentContainerStyle={styles.previewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.previewCard}>
            <View style={[styles.previewIconLarge, { backgroundColor: `${group.color}20` }]}>
              <Ionicons name={group.icon as any} size={40} color={group.color} />
            </View>
            <Text style={styles.previewName}>{group.name}</Text>
            <Text style={styles.previewTopic}>{group.topic}</Text>
            <Text style={styles.previewDesc}>{group.description}</Text>
          </View>

          <View style={styles.previewStatsRow}>
            <View style={styles.previewStat}>
              <Ionicons name="people" size={18} color="#818cf8" />
              <Text style={styles.previewStatValue}>{group.memberCount}</Text>
              <Text style={styles.previewStatLabel}>{t('community.groupMembers')}</Text>
            </View>
            <View style={styles.previewStat}>
              <Ionicons name="flag" size={18} color="#10b981" />
              <Text style={styles.previewStatValue}>{group.maxMembers}</Text>
              <Text style={styles.previewStatLabel}>Max</Text>
            </View>
          </View>

          {group.goal ? (
            <View style={styles.previewGoal}>
              <Ionicons name="flag-outline" size={16} color={group.color} />
              <Text style={styles.previewGoalText}>{group.goal}</Text>
            </View>
          ) : null}

          <Pressable style={[styles.previewJoinBtn, { backgroundColor: group.color }]} onPress={() => joinGroup(id!)}>
            <Ionicons name="people" size={20} color="#ffffff" />
            <Text style={styles.previewJoinText}>{t('community.joinGroup')}</Text>
          </Pressable>

          <Text style={styles.previewHint}>Join to see messages and participate in the group chat</Text>
        </ScrollView>
      ) : (
      <>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        {(['chat', 'members', 'info'] as Tab[]).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'chat'
            ? t('community.groupActivity')
            : tab === 'members'
              ? t('community.groupMembers')
              : t('community.groupInfo');
          const icon = tab === 'chat' ? 'chatbubbles-outline' : tab === 'members' ? 'people-outline' : 'information-circle-outline';
          return (
            <Pressable
              key={tab}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Ionicons name={icon as any} size={16} color={isActive ? group.color : '#64748b'} />
              <Text style={[styles.tabText, isActive && { color: group.color }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={90}
      >
        {/* ── Chat tab ────────────────────────────────────── */}
        {activeTab === 'chat' && (
          <>
            {showPinned && pinnedMessages.length > 0 && (
              <PinnedBanner messages={pinnedMessages} onDismiss={() => setShowPinned(false)} />
            )}

            {activeChallenge && (
              <ChallengeBanner challenge={activeChallenge} groupColor={group.color} />
            )}

            {isLoadingMessages ? (
              <View style={styles.centered}>
                <ActivityIndicator color={group.color} size="large" />
              </View>
            ) : (
              // FIX #3: FlatList with virtualization instead of ScrollView
              <FlatList
                ref={flatListRef}
                data={dedupedMessages}
                renderItem={renderMessage}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.chatList}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                removeClippedSubviews={Platform.OS === 'android'}
                maxToRenderPerBatch={15}
                windowSize={11}
              />
            )}

            {isRecording ? (
              <VoiceRecorder
                onSend={handleVoiceSend}
                onCancel={() => setIsRecording(false)}
              />
            ) : (
              <ChatInputBar
                isJoined={isJoined}
                messageText={messageText}
                onChangeText={setMessageText}
                onSend={handleSend}
                isSending={isSending}
                placeholder={t('community.messagePlaceholder')}
                joinLabel={t('community.joinGroup')}
                onMicPress={() => setIsRecording(true)}
                isRecording={isRecording}
              />
            )}

            {reactionPickerMsgId && (
              <ReactionPicker
                onSelect={handleReaction}
                onClose={() => setReactionPickerMsgId(null)}
              />
            )}
          </>
        )}

        {/* ── Members tab ─────────────────────────────────── */}
        {activeTab === 'members' && (
          <>
            <View style={styles.segmentedControl}>
              <Pressable
                style={[styles.segment, memberTab === 'members' && { backgroundColor: `${group.color}25` }]}
                onPress={() => setMemberTab('members')}
              >
                <Text style={[styles.segmentText, memberTab === 'members' && { color: group.color }]}>
                  {t('community.allMembers', { defaultValue: 'All Members' })}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.segment, memberTab === 'leaderboard' && { backgroundColor: `${group.color}25` }]}
                onPress={() => setMemberTab('leaderboard')}
              >
                <Ionicons name="trophy" size={14} color={memberTab === 'leaderboard' ? group.color : '#64748b'} />
                <Text style={[styles.segmentText, memberTab === 'leaderboard' && { color: group.color }]}>
                  {t('community.groupLeaderboard', { defaultValue: 'Leaderboard' })}
                </Text>
              </Pressable>
            </View>

            {memberTab === 'members' ? (
              <>
                <View style={styles.memberSearchBar}>
                  <Ionicons name="search" size={16} color="#64748b" />
                  <TextInput
                    style={styles.memberSearchInput}
                    placeholder="Search members..."
                    placeholderTextColor="#64748b"
                    value={memberSearch}
                    onChangeText={setMemberSearch}
                    autoCorrect={false}
                  />
                  {memberSearch.length > 0 && (
                    <Pressable onPress={() => setMemberSearch('')}>
                      <Ionicons name="close-circle" size={16} color="#64748b" />
                    </Pressable>
                  )}
                </View>

                <ScrollView contentContainerStyle={styles.membersList} showsVerticalScrollIndicator={false}>
                  {isLoadingMembers ? (
                    <View style={styles.centered}>
                      <ActivityIndicator color={group.color} size="large" />
                    </View>
                  ) : filteredMembers.length === 0 ? (
                    <Text style={styles.emptyMembersText}>No members found</Text>
                  ) : (
                    filteredMembers.map((member) => (
                      <MemberRow
                        key={member.id}
                        member={{ ...member, isTopContributor: member.userId === topContributorId || member.id === topContributorId } as MemberRowData}
                        groupColor={group.color}
                        getDaysAgo={getDaysAgo}
                        canManage={canManage}
                        onAction={() => handleMemberAction(member)}
                      />
                    ))
                  )}
                </ScrollView>
              </>
            ) : (
              <ScrollView contentContainerStyle={styles.membersList} showsVerticalScrollIndicator={false}>
                <GroupLeaderboard
                  entries={leaderboard}
                  groupColor={group.color}
                  currentUserId={user?.id}
                />
              </ScrollView>
            )}
          </>
        )}

        {/* ── Info tab ────────────────────────────────────── */}
        {activeTab === 'info' && (
          <ScrollView contentContainerStyle={styles.infoContent} showsVerticalScrollIndicator={false}>
            <GroupInfoTab
              group={group}
              messages={messages}
              sessions={sessions}
              challenges={challenges}
              getDaysAgo={getDaysAgo}
              t={t}
              canManage={canManage}
              inviteCode={inviteCode}
              onGenerateInvite={handleGenerateInvite}
              onRsvpSession={handleRsvp}
              onCreateSession={() => setShowSessionModal(true)}
              onCreateChallenge={() => setShowChallengeModal(true)}
            />
          </ScrollView>
        )}
      </KeyboardAvoidingView>
      </>
      )}

      {/* FIX #10: Only render modals when visible */}
      {showSessionModal && (
        <CreateSessionModalLazy
          visible={showSessionModal}
          onClose={() => setShowSessionModal(false)}
          onCreate={handleCreateSession}
          groupColor={group?.color || '#818cf8'}
        />
      )}
      {showChallengeModal && (
        <CreateChallengeModalLazy
          visible={showChallengeModal}
          onClose={() => setShowChallengeModal(false)}
          onCreate={handleCreateChallenge}
          groupColor={group?.color || '#818cf8'}
        />
      )}
    </SafeAreaView>
  );
}

// FIX #10: Lazy-loaded modal wrappers
function CreateSessionModalLazy(props: any) {
  const { CreateSessionModal } = require('../../../src/components/community/CreateSessionModal');
  return <CreateSessionModal {...props} />;
}

function CreateChallengeModalLazy(props: any) {
  const { CreateChallengeModal } = require('../../../src/components/community/CreateChallengeModal');
  return <CreateChallengeModal {...props} />;
}

// ── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  flex: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 4 },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 4 },
  backBtn: { padding: 4 },
  headerTopTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '600', color: '#94a3b8' },
  headerGroupInfo: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 14, gap: 12 },
  headerIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  headerInfoBlock: { flex: 1 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#ffffff' },
  headerSubRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  headerSub: { fontSize: 12, color: '#94a3b8' },
  headerActiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981', marginLeft: 4 },
  headerActiveText: { fontSize: 12, color: '#10b981', fontWeight: '500' },
  headerAction: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#818cf8', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  headerActionLeave: { backgroundColor: '#ef444420', borderWidth: 1, borderColor: '#ef4444' },
  headerActionText: { fontSize: 13, fontWeight: '600', color: '#ffffff' },
  headerActionTextLeave: { color: '#ef4444' },

  // Tab bar
  tabBar: { flexDirection: 'row', paddingHorizontal: 16, gap: 4, marginBottom: 4 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, paddingVertical: 8, paddingHorizontal: 4, borderRadius: 10, backgroundColor: '#1e293b' },
  tabActive: { backgroundColor: '#334155' },
  tabText: { fontSize: 11, fontWeight: '600', color: '#64748b', textAlign: 'center' },

  // Chat
  chatList: { paddingHorizontal: 12, paddingVertical: 12, paddingBottom: 8 },

  // Segmented control
  segmentedControl: { flexDirection: 'row', marginHorizontal: 16, marginTop: 8, marginBottom: 4, gap: 4, backgroundColor: '#1e293b', borderRadius: 10, padding: 3 },
  segment: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 8, borderRadius: 8 },
  segmentText: { fontSize: 13, fontWeight: '600', color: '#64748b' },

  // Members
  memberSearchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, marginHorizontal: 16, marginTop: 8, marginBottom: 4, paddingHorizontal: 10, paddingVertical: 8, gap: 6, borderWidth: 1, borderColor: '#334155' },
  memberSearchInput: { flex: 1, fontSize: 14, color: '#ffffff', padding: 0 },
  emptyMembersText: { fontSize: 14, color: '#64748b', textAlign: 'center', paddingVertical: 24 },
  membersList: { paddingHorizontal: 16, paddingVertical: 8 },

  // Info
  infoContent: { paddingHorizontal: 16, paddingVertical: 12, paddingBottom: 40 },

  // Non-member preview
  previewContent: { paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 40, alignItems: 'center' },
  previewCard: { backgroundColor: '#1e293b', borderRadius: 20, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: '#334155', width: '100%', marginBottom: 16 },
  previewIconLarge: { width: 72, height: 72, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  previewName: { fontSize: 22, fontWeight: '800', color: '#ffffff', marginBottom: 6, textAlign: 'center' },
  previewTopic: { fontSize: 14, fontWeight: '600', color: '#94a3b8', marginBottom: 12 },
  previewDesc: { fontSize: 14, color: '#64748b', lineHeight: 21, textAlign: 'center' },
  previewStatsRow: { flexDirection: 'row', gap: 12, width: '100%', marginBottom: 16 },
  previewStat: { flex: 1, backgroundColor: '#1e293b', borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  previewStatValue: { fontSize: 20, fontWeight: '800', color: '#ffffff', marginTop: 6 },
  previewStatLabel: { fontSize: 11, color: '#64748b', marginTop: 2 },
  previewGoal: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1e293b', borderRadius: 14, padding: 16, width: '100%', marginBottom: 24, borderWidth: 1, borderColor: '#334155' },
  previewGoalText: { fontSize: 14, fontWeight: '600', color: '#ffffff', flex: 1 },
  previewJoinBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', paddingVertical: 16, borderRadius: 14 },
  previewJoinText: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
  previewHint: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 12 },
});
