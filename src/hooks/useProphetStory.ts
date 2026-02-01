// Hook for Prophet Story data fetching and audio control
import { useState, useEffect, useCallback, useRef } from 'react';
import { getProphetStory, hasProphetStory } from '../data/arabic/prophets';
import { useProphetStoriesStore } from '../stores/prophetStoriesStore';
import { storyAudioService } from '../services/storyAudioService';
import {
  Prophet,
  SubStory,
  StoryContentBlock,
  PlaybackSpeed,
  AudioPlaybackState,
} from '../types/prophetStories';

interface UseProphetStoryReturn {
  // Data
  prophet: Prophet | null;
  subStories: SubStory[];
  currentSubStory: SubStory | null;
  currentContent: StoryContentBlock[];
  hasFullStory: boolean;
  isLoading: boolean;

  // Progress
  completedSubStories: string[];
  isStoryCompleted: boolean;
  storyProgress: number;

  // Navigation
  currentSubStoryId: string | null;
  setCurrentSubStoryId: (id: string) => void;
  goToNextSubStory: () => void;
  goToPreviousSubStory: () => void;

  // Audio
  playbackState: AudioPlaybackState;
  currentBlockIndex: number;
  playbackSpeed: PlaybackSpeed;
  playBlock: (index: number) => Promise<void>;
  playPause: () => Promise<void>;
  stop: () => Promise<void>;
  setSpeed: (speed: PlaybackSpeed) => void;
  goToNextBlock: () => void;
  goToPreviousBlock: () => void;

  // Actions
  markSubStoryComplete: () => void;
  markStoryComplete: () => void;
}

export function useProphetStory(prophetId: string | undefined): UseProphetStoryReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSubStoryId, setCurrentSubStoryId] = useState<string | null>(null);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [playbackState, setPlaybackState] = useState<AudioPlaybackState>('idle');
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);

  const {
    startStory,
    completeStory,
    markSubStoryCompleted,
    getStoryProgress,
    isStoryCompleted: checkStoryCompleted,
    isSubStoryCompleted,
    progress,
  } = useProphetStoriesStore();

  // Get prophet story data
  const storyData = prophetId ? getProphetStory(prophetId) : undefined;
  const hasFullStory = prophetId ? hasProphetStory(prophetId) : false;
  const prophet = storyData?.prophet || null;
  const subStories = storyData?.subStories || [];

  // Current sub-story
  const currentSubStory = subStories.find((s) => s.id === currentSubStoryId) || null;
  const currentContent = currentSubStory?.content || [];

  // Progress
  const storyProgress = prophetId ? getStoryProgress(prophetId) : null;
  const completedSubStories = storyProgress?.subStoriesCompleted || [];
  const isStoryCompleted = prophetId ? checkStoryCompleted(prophetId) : false;

  // Calculate overall progress percentage
  const progressPercent =
    subStories.length > 0
      ? Math.round((completedSubStories.length / subStories.length) * 100)
      : 0;

  // Initialize on mount
  useEffect(() => {
    if (prophetId && subStories.length > 0) {
      setIsLoading(true);
      startStory(prophetId);

      // Set initial sub-story (from progress or first)
      const savedProgress = getStoryProgress(prophetId);
      const initialSubStoryId = savedProgress.currentSubStoryId || subStories[0].id;
      setCurrentSubStoryId(initialSubStoryId);
      setCurrentBlockIndex(savedProgress.currentBlockIndex || 0);

      setIsLoading(false);
    } else if (prophetId && subStories.length === 0) {
      setIsLoading(false);
    }
  }, [prophetId, subStories.length]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      storyAudioService.stop();
    };
  }, []);

  // Navigation
  const goToNextSubStory = useCallback(() => {
    if (!currentSubStoryId || subStories.length === 0) return;

    const currentIndex = subStories.findIndex((s) => s.id === currentSubStoryId);
    if (currentIndex < subStories.length - 1) {
      setCurrentSubStoryId(subStories[currentIndex + 1].id);
      setCurrentBlockIndex(0);
      storyAudioService.stop();
      setPlaybackState('idle');
    }
  }, [currentSubStoryId, subStories]);

  const goToPreviousSubStory = useCallback(() => {
    if (!currentSubStoryId || subStories.length === 0) return;

    const currentIndex = subStories.findIndex((s) => s.id === currentSubStoryId);
    if (currentIndex > 0) {
      setCurrentSubStoryId(subStories[currentIndex - 1].id);
      setCurrentBlockIndex(0);
      storyAudioService.stop();
      setPlaybackState('idle');
    }
  }, [currentSubStoryId, subStories]);

  // Audio controls - plays through all narrative blocks continuously
  const isPlayingRef = useRef(false);

  const playAllBlocks = useCallback(
    async (startIndex: number) => {
      if (isPlayingRef.current) return;
      isPlayingRef.current = true;

      console.log(`Starting playback from index ${startIndex}, total blocks: ${currentContent.length}`);

      for (let i = startIndex; i < currentContent.length; i++) {
        if (!isPlayingRef.current) {
          console.log('Playback stopped');
          break;
        }

        const block = currentContent[i];
        console.log(`Processing block ${i}, type: ${block?.type}`);

        if (!block || block.type !== 'narrative') {
          console.log(`Block ${i} is not narrative, skipping`);
          setCurrentBlockIndex(i);
          await new Promise(r => setTimeout(r, 300));
          continue;
        }

        setCurrentBlockIndex(i);
        setPlaybackState('playing');

        console.log(`Speaking block ${i}: ${block.content.substring(0, 30)}...`);

        try {
          await storyAudioService.speak(block.content, playbackSpeed);
          console.log(`Block ${i} finished`);
        } catch (e) {
          console.log(`Block ${i} error:`, e);
        }

        // Pause between paragraphs
        if (isPlayingRef.current && i < currentContent.length - 1) {
          await new Promise(r => setTimeout(r, 500));
        }
      }

      console.log('All blocks finished');
      isPlayingRef.current = false;
      setPlaybackState('idle');
    },
    [currentContent, playbackSpeed]
  );

  const playBlock = useCallback(
    async (index: number) => {
      await playAllBlocks(index);
    },
    [playAllBlocks]
  );

  const stopPlayback = useCallback(() => {
    isPlayingRef.current = false;
    storyAudioService.stop();
    setPlaybackState('idle');
  }, []);

  const playPause = useCallback(async () => {
    if (playbackState === 'playing') {
      isPlayingRef.current = false;
      await storyAudioService.pause();
      setPlaybackState('paused');
    } else if (playbackState === 'paused') {
      await storyAudioService.resume();
      setPlaybackState('playing');
    } else {
      await playBlock(currentBlockIndex);
    }
  }, [playbackState, currentBlockIndex, playBlock]);

  const stop = useCallback(async () => {
    isPlayingRef.current = false;
    await storyAudioService.stop();
    setPlaybackState('idle');
  }, []);

  const setSpeed = useCallback((speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed);
    storyAudioService.setSpeed(speed);
  }, []);

  const goToNextBlock = useCallback(() => {
    if (currentBlockIndex < currentContent.length - 1) {
      isPlayingRef.current = false;
      storyAudioService.stop();
      setPlaybackState('idle');
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  }, [currentBlockIndex, currentContent.length]);

  const goToPreviousBlock = useCallback(() => {
    if (currentBlockIndex > 0) {
      isPlayingRef.current = false;
      storyAudioService.stop();
      setPlaybackState('idle');
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  }, [currentBlockIndex]);

  // Progress actions
  const markSubStoryComplete = useCallback(() => {
    if (prophetId && currentSubStoryId) {
      markSubStoryCompleted(prophetId, currentSubStoryId);
    }
  }, [prophetId, currentSubStoryId, markSubStoryCompleted]);

  const markStoryComplete = useCallback(() => {
    if (prophetId) {
      completeStory(prophetId);
    }
  }, [prophetId, completeStory]);

  return {
    // Data
    prophet,
    subStories,
    currentSubStory,
    currentContent,
    hasFullStory,
    isLoading,

    // Progress
    completedSubStories,
    isStoryCompleted,
    storyProgress: progressPercent,

    // Navigation
    currentSubStoryId,
    setCurrentSubStoryId,
    goToNextSubStory,
    goToPreviousSubStory,

    // Audio
    playbackState,
    currentBlockIndex,
    playbackSpeed,
    playBlock,
    playPause,
    stop,
    setSpeed,
    goToNextBlock,
    goToPreviousBlock,

    // Actions
    markSubStoryComplete,
    markStoryComplete,
  };
}

export default useProphetStory;
