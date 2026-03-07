import { useState, useRef } from 'react';
import { View, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface Props {
  onSend: (message: string) => void;
  onVoicePress: () => void;
  isStreaming: boolean;
  onStopStreaming: () => void;
  isListening: boolean;
}

export function AIChatInput({ onSend, onVoicePress, isStreaming, onStopStreaming, isListening }: Props) {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    onSend(trimmed);
    setText('');
  };

  const hasText = text.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        {/* Voice input button */}
        <Pressable
          onPress={isStreaming ? undefined : onVoicePress}
          style={[styles.iconButton, isListening && styles.iconButtonActive]}
          disabled={isStreaming}
        >
          <Ionicons
            name={isListening ? 'radio' : 'mic-outline'}
            size={22}
            color={isListening ? '#10b981' : '#94a3b8'}
          />
        </Pressable>

        {/* Text input */}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={t('ai.placeholder')}
          placeholderTextColor="#64748b"
          multiline
          maxLength={500}
          editable={!isStreaming}
          returnKeyType="default"
        />

        {/* Send or Stop button */}
        {isStreaming ? (
          <Pressable onPress={onStopStreaming} style={styles.stopButton}>
            <Ionicons name="stop" size={18} color="#fff" />
          </Pressable>
        ) : (
          <Pressable
            onPress={handleSend}
            style={[styles.sendButton, !hasText && styles.sendButtonDisabled]}
            disabled={!hasText}
          >
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

// Allow parent to insert text (voice transcript)
export function insertTextIntoInput(
  setText: React.Dispatch<React.SetStateAction<string>>,
  transcript: string
) {
  setText((prev) => (prev ? prev + ' ' + transcript : transcript));
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    backgroundColor: '#1e293b',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#10b98120',
  },
  input: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#e2e8f0',
    fontSize: 15,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#334155',
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
