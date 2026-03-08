import { useRef, useEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ChatMessage, AIModuleContext } from '../../types/aiChat';
import { AIChatBubble } from './AIChatBubble';
import { AIChatTypingIndicator } from './AIChatTypingIndicator';
import { getWelcomeMessage } from '../../data/ai/systemPrompts';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAIChatStore } from '../../stores/aiChatStore';
import { getContextualSuggestions } from '../../services/aiContextService';
import audioService from '../../services/audioService';

interface Props {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingContent: string;
  module: AIModuleContext;
  segments: string[];
  onSuggestionPress: (text: string) => void;
}

export function AIChatMessageList({
  messages,
  isStreaming,
  streamingContent,
  module,
  segments,
  onSuggestionPress,
}: Props) {
  const flatListRef = useRef<FlatList>(null);
  const language = useSettingsStore((s) => s.language);
  const speakingMessageId = useAIChatStore((s) => s.speakingMessageId);
  const setSpeakingMessageId = useAIChatStore((s) => s.setSpeakingMessageId);

  // Auto-scroll to bottom on new messages or streaming
  useEffect(() => {
    if (messages.length > 0 || isStreaming) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages.length, isStreaming, streamingContent]);

  const handleSpeak = useCallback((messageId: string, arabicText: string) => {
    // If already speaking this message, stop
    if (speakingMessageId === messageId) {
      audioService.stop();
      setSpeakingMessageId(null);
      return;
    }

    // Stop any current speech first
    if (speakingMessageId) {
      audioService.stop();
    }

    setSpeakingMessageId(messageId);
    audioService.speakArabic({
      text: arabicText,
      onDone: () => setSpeakingMessageId(null),
    });
  }, [speakingMessageId, setSpeakingMessageId]);

  // Empty state
  if (messages.length === 0 && !isStreaming) {
    const welcome = getWelcomeMessage(module, language);
    const suggestions = getContextualSuggestions(segments, language as 'en' | 'fr');

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeEmoji}>📚</Text>
          <Text style={styles.welcomeText}>{welcome}</Text>
        </View>
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, i) => (
            <Pressable
              key={i}
              style={styles.suggestionChip}
              onPress={() => onSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  // Build data array with streaming message appended
  const data: (ChatMessage | { id: string; type: 'streaming'; content: string })[] = [
    ...messages,
  ];

  if (isStreaming) {
    if (streamingContent) {
      data.push({
        id: 'streaming',
        type: 'streaming',
        content: streamingContent,
      });
    } else {
      data.push({
        id: 'typing',
        type: 'streaming',
        content: '',
      });
    }
  }

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if ('type' in item && item.type === 'streaming') {
          if (!item.content) {
            return <AIChatTypingIndicator />;
          }
          return (
            <AIChatBubble
              message={{
                id: 'streaming',
                role: 'assistant',
                content: item.content,
                timestamp: Date.now(),
              }}
              isStreamingMessage
            />
          );
        }
        return (
          <AIChatBubble
            message={item as ChatMessage}
            speakingMessageId={speakingMessageId}
            onSpeak={handleSpeak}
          />
        );
      }}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() =>
        flatListRef.current?.scrollToEnd({ animated: true })
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcomeCard: {
    backgroundColor: '#334155',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    maxWidth: 320,
  },
  welcomeEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  welcomeText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  suggestionsContainer: {
    marginTop: 20,
    gap: 8,
    width: '100%',
    maxWidth: 320,
  },
  suggestionChip: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suggestionText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
});
