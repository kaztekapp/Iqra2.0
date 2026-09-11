import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { splitQuranRuns } from '../../services/narrationText';
import { font } from '../../theme/tokens';

interface StoryProseProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

/**
 * A paragraph of story prose.
 *
 * A conversation in a story quotes the Quran line by line, and the Arabic
 * is written into the prose between the ornate brackets: `Musa said,
 * ﴿رَبِّ أَرِنِي أَنظُرْ إِلَيْكَ﴾ "My Lord, show me..."`. Those runs are set in
 * the Quran face, a step larger than the Latin around them with the leading
 * vocalised text needs, so the line reads as the Quran being quoted and not
 * as a foreign word dropped into a sentence. Everything else is the story's
 * own words in the paragraph's style.
 */
export function StoryProse({ text, style }: StoryProseProps) {
  const segments = splitQuranRuns(text);
  return (
    <Text style={style}>
      {segments.map((segment, i) =>
        segment.kind === 'quran' ? (
          <Text key={i} style={styles.quran}>
            {`﴿${segment.text}﴾`}
          </Text>
        ) : (
          <Text key={i}>{segment.text}</Text>
        )
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  quran: {
    fontFamily: font.quran,
    fontSize: 20,
    lineHeight: 30,
    writingDirection: 'rtl',
  },
});

export default StoryProse;
