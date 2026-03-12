import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export interface MessageBubbleMessage {
  id: string;
  userId?: string;
  authorName: string;
  avatar: string;
  body: string;
  type: 'message' | 'milestone' | 'system' | 'chat' | 'voice';
  createdAt: string;
  audioUrl?: string;
  durationMs?: number;
  isPinned?: boolean;
}

interface Props {
  msg: MessageBubbleMessage;
  getTimeAgo: (d: string) => string;
  groupColor: string;
  isMe: boolean;
  showAvatar: boolean;
  onLongPress?: () => void;
  reactionRow?: React.ReactNode;
}

export function MessageBubble({ msg, getTimeAgo, groupColor, isMe, showAvatar, onLongPress, reactionRow }: Props) {
  if (msg.type === 'system') {
    return (
      <View style={styles.systemMsg}>
        <Text style={styles.systemMsgText}>{msg.body}</Text>
      </View>
    );
  }

  if (msg.type === 'milestone') {
    return (
      <View style={[styles.milestoneMsg, { borderColor: `${groupColor}40` }]}>
        <Ionicons name="trophy" size={16} color={groupColor} />
        <Text style={[styles.milestoneMsgText, { color: groupColor }]}>{msg.body}</Text>
      </View>
    );
  }

  if (msg.type === 'voice') {
    return (
      <VoiceBubble
        msg={msg}
        getTimeAgo={getTimeAgo}
        groupColor={groupColor}
        isMe={isMe}
        showAvatar={showAvatar}
        onLongPress={onLongPress}
        reactionRow={reactionRow}
      />
    );
  }

  if (isMe) {
    return (
      <View style={[styles.bubbleRowMe, !showAvatar && { marginTop: 2 }]}>
        <Pressable style={styles.bubbleMe} onLongPress={onLongPress}>
          {msg.isPinned && (
            <View style={styles.pinnedIndicator}>
              <Ionicons name="pin" size={10} color="rgba(255,255,255,0.6)" />
            </View>
          )}
          <Text style={styles.bubbleMeBody}>{msg.body}</Text>
          <Text style={styles.bubbleMeTime}>{getTimeAgo(msg.createdAt)}</Text>
        </Pressable>
        {reactionRow}
      </View>
    );
  }

  return (
    <View style={[styles.bubbleRowOther, !showAvatar && { marginTop: 2 }]}>
      {showAvatar ? (
        <View style={[styles.msgAvatar, { backgroundColor: `${groupColor}25` }]}>
          <Text style={[styles.msgAvatarText, { color: groupColor }]}>{msg.avatar}</Text>
        </View>
      ) : (
        <View style={styles.avatarSpacer} />
      )}
      <View style={{ flex: 1 }}>
        <Pressable style={styles.bubbleOther} onLongPress={onLongPress}>
          {msg.isPinned && (
            <View style={styles.pinnedIndicator}>
              <Ionicons name="pin" size={10} color="#94a3b8" />
            </View>
          )}
          {showAvatar && <Text style={[styles.bubbleOtherName, { color: groupColor }]}>{msg.authorName}</Text>}
          <Text style={styles.bubbleOtherBody}>{msg.body}</Text>
          <Text style={styles.bubbleOtherTime}>{getTimeAgo(msg.createdAt)}</Text>
        </Pressable>
        {reactionRow}
      </View>
    </View>
  );
}

function VoiceBubble({ msg, getTimeAgo, groupColor, isMe, showAvatar, onLongPress, reactionRow }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const durationSec = Math.round((msg.durationMs || 0) / 1000);
  const durationStr = `${Math.floor(durationSec / 60)}:${(durationSec % 60).toString().padStart(2, '0')}`;

  const handlePlay = async () => {
    if (isPlaying && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      return;
    }
    if (!msg.audioUrl) return;
    try {
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: msg.audioUrl });
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          newSound.unloadAsync();
          setSound(null);
        }
      });
    } catch {
      setIsPlaying(false);
    }
  };

  const waveformBars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.7, 0.5, 0.9, 0.6];

  const voiceBubbleInner = (
    <Pressable
      style={isMe ? styles.voiceBubbleMe : styles.voiceBubbleOther}
      onLongPress={onLongPress}
    >
      <Pressable style={[styles.playBtn, { backgroundColor: isMe ? 'rgba(255,255,255,0.2)' : `${groupColor}30` }]} onPress={handlePlay}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={18} color={isMe ? '#ffffff' : groupColor} />
      </Pressable>
      <View style={styles.waveformContainer}>
        {waveformBars.map((h, i) => (
          <View
            key={i}
            style={[
              styles.waveformBar,
              {
                height: h * 20,
                backgroundColor: isMe ? `rgba(255,255,255,${isPlaying && i <= 4 ? 0.9 : 0.4})` : `${groupColor}${isPlaying && i <= 4 ? '90' : '50'}`,
              },
            ]}
          />
        ))}
      </View>
      <Text style={isMe ? styles.voiceDurationMe : styles.voiceDurationOther}>{durationStr}</Text>
    </Pressable>
  );

  if (isMe) {
    return (
      <View style={[styles.bubbleRowMe, !showAvatar && { marginTop: 2 }]}>
        {voiceBubbleInner}
        <Text style={styles.bubbleMeTime}>{getTimeAgo(msg.createdAt)}</Text>
        {reactionRow}
      </View>
    );
  }

  return (
    <View style={[styles.bubbleRowOther, !showAvatar && { marginTop: 2 }]}>
      {showAvatar ? (
        <View style={[styles.msgAvatar, { backgroundColor: `${groupColor}25` }]}>
          <Text style={[styles.msgAvatarText, { color: groupColor }]}>{msg.avatar}</Text>
        </View>
      ) : (
        <View style={styles.avatarSpacer} />
      )}
      <View style={{ flex: 1 }}>
        {showAvatar && <Text style={[styles.bubbleOtherName, { color: groupColor, marginBottom: 4, marginLeft: 4 }]}>{msg.authorName}</Text>}
        {voiceBubbleInner}
        <Text style={styles.bubbleOtherTime}>{getTimeAgo(msg.createdAt)}</Text>
        {reactionRow}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  systemMsg: { alignSelf: 'center', backgroundColor: '#334155', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginVertical: 8 },
  systemMsgText: { fontSize: 12, color: '#94a3b8', textAlign: 'center' },
  milestoneMsg: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', backgroundColor: '#1e293b', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1, marginVertical: 8 },
  milestoneMsgText: { fontSize: 13, fontWeight: '600' },
  bubbleRowMe: { flexDirection: 'column', alignItems: 'flex-end', marginTop: 8, paddingLeft: 50 },
  bubbleMe: { backgroundColor: '#818cf8', borderRadius: 18, borderBottomRightRadius: 4, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '100%' },
  bubbleMeBody: { fontSize: 15, color: '#ffffff', lineHeight: 21 },
  bubbleMeTime: { fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, alignSelf: 'flex-end' },
  bubbleRowOther: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 8, paddingRight: 50, gap: 8 },
  msgAvatar: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  msgAvatarText: { fontSize: 13, fontWeight: '700' },
  avatarSpacer: { width: 32 },
  bubbleOther: { alignSelf: 'flex-start', backgroundColor: '#1e293b', borderRadius: 18, borderBottomLeftRadius: 4, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '100%', borderWidth: 1, borderColor: '#334155' },
  bubbleOtherName: { fontSize: 12, fontWeight: '700', marginBottom: 3 },
  bubbleOtherBody: { fontSize: 15, color: '#e2e8f0', lineHeight: 21 },
  bubbleOtherTime: { fontSize: 11, color: '#64748b', marginTop: 4, alignSelf: 'flex-end' },
  pinnedIndicator: { position: 'absolute', top: 4, right: 6 },
  // Voice
  voiceBubbleMe: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#818cf8', borderRadius: 18, borderBottomRightRadius: 4, paddingHorizontal: 12, paddingVertical: 10, width: 200 },
  voiceBubbleOther: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1e293b', borderRadius: 18, borderBottomLeftRadius: 4, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: '#334155', alignSelf: 'flex-start', width: 200 },
  playBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  waveformContainer: { flexDirection: 'row', alignItems: 'center', gap: 2, flex: 1 },
  waveformBar: { width: 3, borderRadius: 2 },
  voiceDurationMe: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  voiceDurationOther: { fontSize: 12, color: '#64748b', fontWeight: '600' },
});
