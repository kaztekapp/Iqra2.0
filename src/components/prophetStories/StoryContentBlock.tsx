import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StoryContentBlock as ContentBlock, QuranReference, HadithReference } from '../../types/prophetStories';
import { QuranSourceCard } from './QuranSourceCard';
import { HadithSourceCard } from './HadithSourceCard';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { StoryProse } from '../stories/StoryProse';
import { color, radius } from '../../theme/tokens';
import { withAlpha } from '../ui/Primitives';

interface StoryContentBlockProps {
  block: ContentBlock;
  isHighlighted?: boolean;
  onPlayQuranAudio?: (source: QuranReference) => void;
  isQuranPlaying?: boolean;
  isQuranLoading?: boolean;
}

/**
 * Memoized: a story is a long list of these, and narration changes the
 * highlight on every sentence. Without this, one block lighting up re-renders
 * every other block on screen.
 */
function StoryContentBlockBase({
  block,
  isHighlighted = false,
  onPlayQuranAudio,
  isQuranPlaying = false,
  isQuranLoading = false,
}: StoryContentBlockProps) {
  const { lc } = useLocalizedContent();

  if (block.type === 'narrative') {
    return (
      <View style={[styles.narrativeContainer, isHighlighted && styles.highlighted]}>
        <StoryProse style={styles.narrativeText} text={lc(block.content, block.contentFr)} />
      </View>
    );
  }

  if (block.type === 'quran_source' && block.source?.type === 'quran') {
    const lead = lc(block.content, block.contentFr);
    return (
      <View style={[styles.sourceContainer, isHighlighted && styles.highlighted]}>
        {!!lead.trim() && <StoryProse style={styles.leadText} text={lead} />}
        <QuranSourceCard
          source={block.source as QuranReference}
          onPlayArabic={onPlayQuranAudio ? () => onPlayQuranAudio(block.source as QuranReference) : undefined}
          isPlaying={isQuranPlaying}
          isLoading={isQuranLoading}
        />
      </View>
    );
  }

  if (block.type === 'hadith_source' && block.source?.type === 'hadith') {
    const lead = lc(block.content, block.contentFr);
    return (
      <View style={[styles.sourceContainer, isHighlighted && styles.highlighted]}>
        {!!lead.trim() && <StoryProse style={styles.leadText} text={lead} />}
        <HadithSourceCard source={block.source as HadithReference} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  narrativeContainer: {
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: radius.sm,
  },
  narrativeText: {
    color: color.text,
    fontSize: 16,
    lineHeight: 26,
  },
  sourceContainer: {
    borderRadius: radius.sm,
  },
  /**
   * The sentence that hands the reader into the verse. It is the story's own
   * voice, so it is set exactly like the story's prose - no label, no eyebrow,
   * no smaller muted type - and it sits tight above the card it introduces.
   * The card's own top margin is the only gap between them, which is what
   * binds the two into one block on the page.
   */
  leadText: {
    color: color.text,
    fontSize: 16,
    lineHeight: 26,
    marginTop: 8,
  },
  highlighted: {
    backgroundColor: withAlpha(color.accent, 0.13),
    borderRadius: radius.md,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
});

export const StoryContentBlock = React.memo(StoryContentBlockBase);

export default StoryContentBlock;
