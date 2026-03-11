import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChatMessage, AIModuleContext } from '../../types/aiChat';
import { getContextualSuggestions } from '../../services/aiContextService';
import { useSettingsStore } from '../../stores/settingsStore';

const MCQ_LINE_RE = /^[A-D]\)\s+.+$/m;

interface Props {
  messages: ChatMessage[];
  isStreaming: boolean;
  activeModule: AIModuleContext;
  segments: string[];
  onPress: (text: string) => void;
}

export function AIQuickSuggestions({ messages, isStreaming, activeModule, segments, onPress }: Props) {
  const { t } = useTranslation();
  const language = useSettingsStore((s) => s.language);

  if (isStreaming || messages.length === 0) return null;

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'assistant') return null;

  if (MCQ_LINE_RE.test(lastMessage.content)) return null;

  // Get lesson-aware contextual suggestions based on the current route
  const suggestions = getContextualSuggestions(segments, language);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {suggestions.map((label, i) => (
          <TouchableOpacity
            key={`${activeModule}-${i}`}
            style={styles.chip}
            onPress={() => onPress(label)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0f172a',
    height: 52,
  },
  scrollContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 52,
  },
  chip: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipText: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '500',
  },
});
