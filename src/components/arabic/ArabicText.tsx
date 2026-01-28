import { Text, TextProps, Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProgressStore } from '../../stores/progressStore';

interface ArabicTextProps extends TextProps {
  children: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  withVowels?: string; // The voweled version of the text
  showSpeaker?: boolean;
  onPlayAudio?: () => void;
  isPlaying?: boolean;
  color?: string;
  centered?: boolean;
}

const fontSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 34,
  '3xl': 42,
  '4xl': 52,
};

const lineHeights = {
  sm: 28,
  md: 36,
  lg: 42,
  xl: 48,
  '2xl': 58,
  '3xl': 72,
  '4xl': 88,
};

export function ArabicText({
  children,
  size = 'lg',
  withVowels,
  showSpeaker = false,
  onPlayAudio,
  isPlaying = false,
  color = '#ffffff',
  centered = false,
  style,
  ...props
}: ArabicTextProps) {
  const { showVowels } = useProgressStore();

  // Use voweled text if available and showVowels is true
  const displayText = showVowels && withVowels ? withVowels : children;

  const textStyle = StyleSheet.flatten([
    {
      fontFamily: 'System', // Will use Amiri when loaded
      fontSize: fontSizes[size],
      lineHeight: lineHeights[size],
      color,
      writingDirection: 'rtl' as const,
      textAlign: centered ? 'center' as const : 'right' as const,
    },
    style,
  ]);

  const textElement = (
    <Text style={textStyle} {...props}>
      {displayText}
    </Text>
  );

  if (showSpeaker && onPlayAudio) {
    return (
      <View style={styles.speakerContainer}>
        <Pressable
          onPress={onPlayAudio}
          style={[
            styles.speakerButton,
            isPlaying && styles.speakerButtonActive,
          ]}
        >
          <Ionicons
            name={isPlaying ? 'volume-high' : 'volume-medium'}
            size={18}
            color={isPlaying ? '#ffffff' : '#D4AF37'}
          />
        </Pressable>
        {textElement}
      </View>
    );
  }

  return textElement;
}

// Tappable version that plays audio when pressed
interface TappableArabicTextProps extends ArabicTextProps {
  onPress?: () => void;
}

export function TappableArabicText({
  children,
  onPress,
  onPlayAudio,
  isPlaying,
  ...props
}: TappableArabicTextProps) {
  const handlePress = () => {
    if (onPlayAudio) {
      onPlayAudio();
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.tappable}>
      <View style={styles.tappableContent}>
        <ArabicText {...props}>{children}</ArabicText>
        {onPlayAudio && (
          <View style={[styles.miniSpeaker, isPlaying && styles.miniSpeakerActive]}>
            <Ionicons
              name="volume-medium"
              size={14}
              color={isPlaying ? '#ffffff' : '#D4AF37'}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}

// Large display for learning screens
interface ArabicDisplayProps {
  text: string;
  textWithVowels?: string;
  transliteration?: string;
  translation?: string;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  onPlayAudio?: () => void;
  isPlaying?: boolean;
}

export function ArabicDisplay({
  text,
  textWithVowels,
  transliteration,
  translation,
  size = '3xl',
  onPlayAudio,
  isPlaying,
}: ArabicDisplayProps) {
  return (
    <View style={styles.displayContainer}>
      <Pressable
        onPress={onPlayAudio}
        disabled={!onPlayAudio}
        style={styles.displayPressable}
      >
        <ArabicText
          size={size}
          withVowels={textWithVowels}
          centered
          color="#ffffff"
        >
          {text}
        </ArabicText>
        {onPlayAudio && (
          <View style={[styles.displaySpeaker, isPlaying && styles.displaySpeakerActive]}>
            <Ionicons
              name={isPlaying ? 'volume-high' : 'volume-medium'}
              size={24}
              color={isPlaying ? '#ffffff' : '#D4AF37'}
            />
          </View>
        )}
      </Pressable>
      {transliteration && (
        <Text style={styles.transliteration}>{transliteration}</Text>
      )}
      {translation && (
        <Text style={styles.translation}>{translation}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  speakerButtonActive: {
    backgroundColor: '#6366f1',
  },
  tappable: {
    opacity: 1,
  },
  tappableContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniSpeaker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  miniSpeakerActive: {
    backgroundColor: '#6366f1',
  },
  displayContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  displayPressable: {
    alignItems: 'center',
  },
  displaySpeaker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  displaySpeakerActive: {
    backgroundColor: '#6366f1',
  },
  transliteration: {
    fontSize: 18,
    color: '#D4AF37',
    marginTop: 12,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
  },
});
