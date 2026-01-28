import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ArabicKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onSubmit: () => void;
}

// Arabic numbers row
const numbersRow = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'];

// Standard Arabic keyboard layout (matches native iOS/Android)
const keyboardRows = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ظ', 'ز', 'و', 'ة', 'ى', 'لا', 'ر', 'ؤ', 'ء', 'ئ'],
  ['ذ', 'د', 'ج', 'إ', 'أ', 'آ', 'ـ'],
];

// Vowel marks (harakat)
const vowelMarks = [
  { key: 'َ', name: 'Fatha' },
  { key: 'ُ', name: 'Damma' },
  { key: 'ِ', name: 'Kasra' },
  { key: 'ْ', name: 'Sukun' },
  { key: 'ً', name: 'Tanwin Fath' },
  { key: 'ٌ', name: 'Tanwin Damm' },
  { key: 'ٍ', name: 'Tanwin Kasr' },
  { key: 'ّ', name: 'Shadda' },
];

export default function ArabicKeyboard({
  onKeyPress,
  onBackspace,
  onSpace,
  onSubmit,
}: ArabicKeyboardProps) {
  const keyWidth = (SCREEN_WIDTH - 32) / 11 - 4;
  const smallKeyWidth = (SCREEN_WIDTH - 32) / 10 - 4;

  return (
    <View style={styles.container}>
      {/* Numbers Row */}
      <View style={styles.numbersRow}>
        {numbersRow.map((num) => (
          <Pressable
            key={num}
            style={[styles.numberKey, { width: smallKeyWidth }]}
            onPress={() => onKeyPress(num)}
          >
            <Text style={styles.numberKeyText}>{num}</Text>
          </Pressable>
        ))}
      </View>

      {/* Vowel Marks Row */}
      <View style={styles.vowelRow}>
        {vowelMarks.map((vowel) => (
          <Pressable
            key={vowel.key}
            style={styles.vowelKey}
            onPress={() => onKeyPress(vowel.key)}
          >
            <Text style={styles.vowelKeyText}>ـ{vowel.key}</Text>
          </Pressable>
        ))}
      </View>

      {/* Main Keyboard */}
      {keyboardRows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => (
            <Pressable
              key={`${key}-${keyIndex}`}
              style={[styles.key, { width: keyWidth, height: keyWidth * 1.1 }]}
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
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 3,
  },
  numberKey: {
    backgroundColor: '#475569',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberKeyText: {
    fontSize: 18,
    color: '#ffffff',
  },
  vowelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 4,
  },
  vowelKey: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  vowelKeyText: {
    fontSize: 18,
    color: '#D4AF37',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    gap: 3,
  },
  key: {
    backgroundColor: '#334155',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 20,
    color: '#ffffff',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    gap: 8,
  },
  backspaceKey: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKey: {
    flex: 1,
    backgroundColor: '#334155',
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceKeyText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  submitKey: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
