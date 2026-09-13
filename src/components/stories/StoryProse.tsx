import React from 'react';
import { View, Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { splitQuranRuns } from '../../services/narrationText';
import { font, color } from '../../theme/tokens';

interface StoryProseProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

/**
 * A paragraph of story prose.
 *
 * Where a story quotes the Quran, the verse is written into the prose between
 * the ornate brackets: `…their Lord ﴿رَبَّنَا رَبُّ ٱلسَّمَٰوَٰتِ﴾ the Lord of the
 * heavens…`. A verse and its meaning belong together, so they are kept in one
 * passage — but the two scripts do not share a line well: an Arabic verse set
 * inline in a run of English or French is reordered by the bidirectional layout
 * and wraps into the Latin around it, which reads as a jumble and does the
 * Quran no honour.
 *
 * So when a paragraph carries a verse, it is laid out as a small stack: the
 * verse on its own centred line in the Amiri Quran face — one continuous run,
 * right-to-left, large enough for the vocalisation to breathe — and the meaning
 * flowing beneath it in the story's own voice. A paragraph with no verse is a
 * plain line of prose, exactly as before.
 */
export function StoryProse({ text, style }: StoryProseProps) {
  const segments = splitQuranRuns(text);
  const hasQuran = segments.some((s) => s.kind === 'quran');

  if (!hasQuran) {
    return <Text style={style}>{text}</Text>;
  }

  return (
    <View style={styles.passage}>
      {segments.map((segment, i) => {
        if (segment.kind === 'quran') {
          return (
            <Text key={i} style={styles.ayah} allowFontScaling>
              {`﴿ ${segment.text} ﴾`}
            </Text>
          );
        }
        const prose = segment.text.trim();
        if (!prose) return null;
        return (
          <Text key={i} style={[style, styles.meaning]}>
            {prose}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  passage: {
    width: '100%',
  },
  ayah: {
    fontFamily: font.quran,
    fontSize: 26,
    lineHeight: 52,
    color: color.text,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginVertical: 10,
  },
  // The meaning under a verse: the paragraph's own style, set apart just
  // enough that the verse above it reads as the source and this as its sense.
  meaning: {
    marginBottom: 4,
  },
});

export default StoryProse;
