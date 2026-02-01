import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlaybackSpeed, AudioPlaybackState } from '../../types/prophetStories';

interface StoryAudioPlayerProps {
  playbackState: AudioPlaybackState;
  currentBlockIndex: number;
  totalBlocks: number;
  playbackSpeed: PlaybackSpeed;
  onPlayPause: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  onPrevious: () => void;
  onNext: () => void;
  onClose?: () => void;
}

const SPEED_OPTIONS: PlaybackSpeed[] = [0.75, 1, 1.25, 1.5];

export function StoryAudioPlayer({
  playbackState,
  currentBlockIndex,
  totalBlocks,
  playbackSpeed,
  onPlayPause,
  onSpeedChange,
  onPrevious,
  onNext,
  onClose,
}: StoryAudioPlayerProps) {
  const isPlaying = playbackState === 'playing';
  const isLoading = playbackState === 'loading';
  const isIdle = playbackState === 'idle';

  const handleSpeedCycle = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    onSpeedChange(SPEED_OPTIONS[nextIndex]);
  };

  const progress = totalBlocks > 0 ? ((currentBlockIndex + 1) / totalBlocks) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.controls}>
        {/* Left Section: Speed */}
        <Pressable style={styles.speedButton} onPress={handleSpeedCycle}>
          <Text style={styles.speedText}>{playbackSpeed}x</Text>
        </Pressable>

        {/* Center Section: Play Controls */}
        <View style={styles.playControls}>
          <Pressable
            style={[styles.navButton, currentBlockIndex === 0 && styles.navButtonDisabled]}
            onPress={onPrevious}
            disabled={currentBlockIndex === 0}
          >
            <Ionicons
              name="play-skip-back"
              size={20}
              color={currentBlockIndex === 0 ? '#475569' : '#ffffff'}
            />
          </Pressable>

          <Pressable
            style={[styles.playButton, isPlaying && styles.playButtonActive]}
            onPress={onPlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <Ionicons name="hourglass" size={24} color="#ffffff" />
            ) : (
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color="#ffffff"
              />
            )}
          </Pressable>

          <Pressable
            style={[styles.navButton, currentBlockIndex >= totalBlocks - 1 && styles.navButtonDisabled]}
            onPress={onNext}
            disabled={currentBlockIndex >= totalBlocks - 1}
          >
            <Ionicons
              name="play-skip-forward"
              size={20}
              color={currentBlockIndex >= totalBlocks - 1 ? '#475569' : '#ffffff'}
            />
          </Pressable>
        </View>

        {/* Right Section: Progress Text and Close */}
        <View style={styles.rightSection}>
          <Text style={styles.progressText}>
            {currentBlockIndex + 1}/{totalBlocks}
          </Text>
          {onClose && (
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={18} color="#94a3b8" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingBottom: 8,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#334155',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  speedButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    minWidth: 50,
    alignItems: 'center',
  },
  speedText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  playControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#1e293b',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonActive: {
    backgroundColor: '#3b82f6',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 70,
    justifyContent: 'flex-end',
  },
  progressText: {
    color: '#64748b',
    fontSize: 12,
  },
  closeButton: {
    padding: 4,
  },
});

export default StoryAudioPlayer;
