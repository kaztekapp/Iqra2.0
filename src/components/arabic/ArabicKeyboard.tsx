import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ArabicKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onSubmit: () => void;
  onCursorLeft?: () => void;
  onCursorRight?: () => void;
}

// Modern Arabic keyboard layout (matches iOS/Android)
const keyboardRows = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ة'],
  ['ء', 'ظ', 'ط', 'ذ', 'د', 'ز', 'ر', 'و', 'ى'],
];

// Hamza-carrier letters (needed for Quranic writing)
const hamzaLetters = [
  { key: 'أ', name: 'Alif Hamza Above' },
  { key: 'إ', name: 'Alif Hamza Below' },
  { key: 'ؤ', name: 'Waw Hamza' },
  { key: 'ئ', name: 'Ya Hamza' },
  { key: 'آ', name: 'Alif Maddah' },
];

// Quranic-specific marks (Uthmani script) - top row
const quranicMarks = [
  { key: 'ٓ', name: 'Maddah' },
  { key: 'ۡ', name: 'Sukun Qurani' },
  { key: 'ۢ', name: 'Meem Iqlab' },
  { key: 'ۥ', name: 'Small Waw' },
  { key: 'ۦ', name: 'Small Ya' },
  { key: 'ٱ', name: 'Alef Wasla', isLetter: true },
];

// Basic harakat (vowel marks) - row 1
const basicHarakat = [
  { key: 'َ', name: 'Fatha' },
  { key: 'ُ', name: 'Damma' },
  { key: 'ِ', name: 'Kasra' },
  { key: 'ْ', name: 'Sukun' },
  { key: 'ّ', name: 'Shadda' },
  { key: 'ٰ', name: 'Superscript Alef' },
];

// Tanwin + hamza marks - row 2
const extendedHarakat = [
  { key: 'ً', name: 'Tanwin Fath' },
  { key: 'ٌ', name: 'Tanwin Damm' },
  { key: 'ٍ', name: 'Tanwin Kasr' },
  { key: '\u0654', name: 'Hamza Above' },
  { key: '\u0655', name: 'Hamza Below' },
];

export default function ArabicKeyboard({
  onKeyPress,
  onBackspace,
  onSpace,
  onSubmit,
  onCursorLeft,
  onCursorRight,
}: ArabicKeyboardProps) {
  const keyWidth = (SCREEN_WIDTH - 24) / 11 - 3;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePressIn = (handler: (() => void) | undefined) => {
    if (!handler) return;
    handler();
    intervalRef.current = setInterval(handler, 100);
  };

  const handlePressOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Quranic Marks Row */}
      <View style={styles.quranicRow}>
        {quranicMarks.map((mark) => (
          <Pressable
            key={mark.key}
            style={styles.quranicKey}
            onPress={() => onKeyPress(mark.key)}
          >
            <Text style={styles.quranicKeyText}>
              {mark.isLetter ? mark.key : `ـ${mark.key}`}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Hamza Carriers Row */}
      <View style={styles.hamzaRow}>
        {hamzaLetters.map((letter) => (
          <Pressable
            key={letter.key}
            style={styles.hamzaKey}
            onPress={() => onKeyPress(letter.key)}
          >
            <Text style={styles.hamzaKeyText}>{letter.key}</Text>
          </Pressable>
        ))}
      </View>

      {/* Basic Harakat Row */}
      <View style={styles.harakatRow}>
        {basicHarakat.map((mark) => (
          <Pressable
            key={mark.key}
            style={styles.vowelKey}
            onPress={() => onKeyPress(mark.key)}
          >
            <Text style={styles.vowelKeyText}>ـ{mark.key}</Text>
          </Pressable>
        ))}
      </View>

      {/* Tanwin + Hamza Marks Row */}
      <View style={styles.harakatRow}>
        {extendedHarakat.map((mark) => (
          <Pressable
            key={mark.key}
            style={styles.vowelKey}
            onPress={() => onKeyPress(mark.key)}
          >
            <Text style={styles.vowelKeyText}>ـ{mark.key}</Text>
          </Pressable>
        ))}
      </View>

      {/* Main Keyboard */}
      {keyboardRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => (
            <Pressable
              key={`${key}-${keyIndex}`}
              style={[styles.key, { width: keyWidth, height: keyWidth * 1.4 }]}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
          {rowIndex === keyboardRows.length - 1 && (
            <Pressable style={styles.backspaceKey} onPress={onBackspace}>
              <Ionicons name="backspace" size={22} color="#ffffff" />
            </Pressable>
          )}
        </View>
      ))}

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        {onCursorLeft && (
          <Pressable
            style={styles.arrowKey}
            onPressIn={() => handlePressIn(onCursorLeft)}
            onPressOut={handlePressOut}
          >
            <Ionicons name="chevron-back" size={22} color="#ffffff" />
          </Pressable>
        )}
        {onCursorRight && (
          <Pressable
            style={styles.arrowKey}
            onPressIn={() => handlePressIn(onCursorRight)}
            onPressOut={handlePressOut}
          >
            <Ionicons name="chevron-forward" size={22} color="#ffffff" />
          </Pressable>
        )}
        <Pressable style={styles.spaceKey} onPress={onSpace}>
          <Text style={styles.spaceKeyText}>مسافة</Text>
        </Pressable>
        <Pressable style={styles.submitKey} onPress={onSubmit}>
          <Ionicons name="checkmark" size={24} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 3,
    paddingTop: 10,
    paddingBottom: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  quranicRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8,
  },
  quranicKey: {
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b98140',
  },
  quranicKeyText: {
    fontSize: 20,
    color: '#10b981',
    textAlign: 'center',
  },
  hamzaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8,
  },
  hamzaKey: {
    backgroundColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f59e0b40',
  },
  hamzaKeyText: {
    fontSize: 22,
    color: '#f59e0b',
    textAlign: 'center',
  },
  harakatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8,
  },
  vowelKey: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  vowelKeyText: {
    fontSize: 20,
    color: '#D4AF37',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 5,
  },
  key: {
    backgroundColor: '#334155',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 24,
    color: '#ffffff',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
    paddingHorizontal: 4,
    gap: 8,
  },
  arrowKey: {
    backgroundColor: '#475569',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backspaceKey: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKey: {
    flex: 1,
    backgroundColor: '#334155',
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKeyText: {
    fontSize: 18,
    color: '#94a3b8',
  },
  submitKey: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
