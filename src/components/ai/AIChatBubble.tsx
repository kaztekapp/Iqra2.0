import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from '../../types/aiChat';
import { useTranslation } from 'react-i18next';

interface Props {
  message: ChatMessage;
}

/** Detect Arabic characters to style them with gold color */
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+(?:\s+[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+)*/g;

/** Check if content is an error sentinel */
function getErrorKey(content: string): string | null {
  const match = content.match(/^__error:(\w+)__$/);
  return match ? match[1] : null;
}

/**
 * Strip unsupported markdown syntax so it doesn't leak as raw text.
 * - [[text]] → text
 * - *text* (single italic) → text
 * - # headers → bold text
 * - --- horizontal rules → blank line
 */
function cleanMarkdown(text: string): string {
  return text
    .replace(/\[\[(.*?)\]\]/g, '$1')   // [[wiki-links]] → plain text
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '$1') // *italic* → plain
    .replace(/^#{1,3}\s+(.+)$/gm, '**$1**') // # Header → **bold**
    .replace(/^---+$/gm, '');            // --- → empty (spacing handled by paragraphs)
}

export function AIChatBubble({ message }: Props) {
  const { t } = useTranslation();
  const isUser = message.role === 'user';

  // Handle error messages
  const errorKey = getErrorKey(message.content);
  if (errorKey) {
    const errorMessages: Record<string, string> = {
      offline: t('ai.offline'),
      rate_limit: t('ai.rateLimit'),
      auth: t('ai.errorAuth'),
      generic: t('ai.errorGeneric'),
    };
    return (
      <View style={[styles.bubble, styles.errorBubble]}>
        <Text style={styles.errorText}>
          {errorMessages[errorKey] || errorMessages.generic}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>أ</Text>
        </View>
      )}
      <View style={[styles.contentContainer, isUser && styles.userContent]}>
        {isUser
          ? <Text style={styles.userText}>{message.content}</Text>
          : renderAssistantContent(message.content)
        }
      </View>
    </View>
  );
}

/**
 * Renders assistant content as structured blocks.
 * Splits on double newlines for paragraph spacing,
 * then handles bullets, Arabic text, and bold within each block.
 */
function renderAssistantContent(content: string) {
  const cleaned = cleanMarkdown(content);

  // Split into paragraphs (double newline or more)
  const paragraphs = cleaned.split(/\n{2,}/);

  return (
    <View>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Check if paragraph is a bullet list (lines starting with - or •)
        const lines = trimmed.split('\n');
        const isBulletList = lines.every(
          l => l.trim().startsWith('- ') || l.trim().startsWith('• ') || l.trim() === ''
        );

        if (isBulletList) {
          return (
            <View key={pIdx} style={pIdx > 0 ? styles.paragraphSpacing : undefined}>
              {lines.map((line, lIdx) => {
                const bulletText = line.trim().replace(/^[-•]\s+/, '');
                if (!bulletText) return null;
                return (
                  <View key={lIdx} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>{'  •  '}</Text>
                    <Text style={[styles.assistantText, styles.bulletText]}>
                      {renderRichText(bulletText)}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }

        // Regular paragraph — handle inline newlines as line breaks
        return (
          <Text
            key={pIdx}
            style={[styles.assistantText, pIdx > 0 ? styles.paragraphSpacing : undefined]}
          >
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && '\n'}
                {renderRichText(line)}
              </React.Fragment>
            ))}
          </Text>
        );
      })}
    </View>
  );
}

/**
 * Renders a single line of text with Arabic highlighting and bold support.
 */
function renderRichText(text: string): React.ReactNode[] {
  // First split by Arabic segments
  const segments: { text: string; isArabic: boolean }[] = [];
  let lastIndex = 0;

  text.replace(ARABIC_REGEX, (match, offset) => {
    if (offset > lastIndex) {
      segments.push({ text: text.slice(lastIndex, offset), isArabic: false });
    }
    segments.push({ text: match, isArabic: true });
    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isArabic: false });
  }

  if (segments.length === 0) {
    segments.push({ text, isArabic: false });
  }

  return segments.map((seg, i) => {
    if (seg.isArabic) {
      return <Text key={i} style={styles.arabicText}>{seg.text}</Text>;
    }
    return <Text key={i}>{renderBold(seg.text)}</Text>;
  });
}

/** Render **bold** markers */
function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <Text key={i} style={styles.boldText}>{part}</Text>
    ) : (
      <Text key={i}>{part}</Text>
    )
  );
}

const styles = StyleSheet.create({
  bubble: {
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 12,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  assistantBubble: {
    justifyContent: 'flex-start',
  },
  errorBubble: {
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  avatar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  contentContainer: {
    backgroundColor: '#334155',
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '80%',
  },
  userContent: {
    backgroundColor: '#10b981',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 4,
  },
  userText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  assistantText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
  },
  arabicText: {
    color: '#D4AF37',
    fontSize: 18,
    lineHeight: 28,
  },
  boldText: {
    fontWeight: '700',
    color: '#f8fafc',
  },
  paragraphSpacing: {
    marginTop: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  bulletDot: {
    color: '#10b981',
    fontSize: 14,
    lineHeight: 22,
  },
  bulletText: {
    flex: 1,
  },
  errorText: {
    color: '#f87171',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
