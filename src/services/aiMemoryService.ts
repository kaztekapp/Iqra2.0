import { ChatMessage, AIModuleContext, AIConversationMemory } from '../types/aiChat';

const ARABIC_WORD_REGEX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+(?:\s+[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+)*/g;

const CORRECTION_PATTERNS = [
  /not quite/i,
  /the answer is/i,
  /actually,?\s/i,
  /the correct/i,
  /incorrect/i,
  /close!?\s+but/i,
  /almost!?\s/i,
  /try again/i,
];

const PRAISE_PATTERNS = [
  /correct!?\s*🎉/i,
  /excellent/i,
  /well done/i,
  /great job/i,
  /perfect/i,
  /exactly right/i,
  /you got it/i,
  /bravo/i,
  /fantastic/i,
  /mashallah/i,
  /أحسنت/,
  /ممتاز/,
];

const MAX_TOPICS = 30;
const MAX_MISTAKES = 20;
const MAX_STRENGTHS = 20;

/**
 * Analyze a conversation to extract topics, mistakes, and strengths.
 * Merges with existing memory if provided.
 */
export function analyzeConversation(
  messages: ChatMessage[],
  module: AIModuleContext,
  existingMemory?: AIConversationMemory
): AIConversationMemory {
  const topics = new Set<string>(existingMemory?.topicsCovered || []);
  const mistakes = new Set<string>(existingMemory?.mistakes || []);
  const strengths = new Set<string>(existingMemory?.strengths || []);
  const weakAreas = new Set<string>(existingMemory?.weakAreas || []);

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.content.startsWith('__error:')) continue;

    if (msg.role === 'user') {
      // Extract Arabic words the user mentioned (topics they're studying)
      const arabicMatches = msg.content.match(ARABIC_WORD_REGEX);
      if (arabicMatches) {
        arabicMatches.forEach(w => topics.add(w.trim()));
      }

      // Extract question subjects from user messages
      const questionMatch = msg.content.match(/(?:what|how|why|explain|teach|help.*with)\s+(.{3,40})\??/i);
      if (questionMatch) {
        topics.add(questionMatch[1].trim().toLowerCase());
      }
    }

    if (msg.role === 'assistant') {
      const content = msg.content;

      // Check for corrections (mistakes)
      for (const pattern of CORRECTION_PATTERNS) {
        if (pattern.test(content)) {
          // Try to extract what the mistake was about from the surrounding context
          const prevUserMsg = findPreviousUserMessage(messages, i);
          if (prevUserMsg) {
            const arabic = prevUserMsg.match(ARABIC_WORD_REGEX);
            if (arabic) {
              mistakes.add(arabic[0]);
            } else {
              // Use a short summary of the user's question
              const summary = prevUserMsg.slice(0, 50).trim();
              if (summary) mistakes.add(summary);
            }
          }
          break;
        }
      }

      // Check for praise (strengths)
      for (const pattern of PRAISE_PATTERNS) {
        if (pattern.test(content)) {
          const prevUserMsg = findPreviousUserMessage(messages, i);
          if (prevUserMsg) {
            const arabic = prevUserMsg.match(ARABIC_WORD_REGEX);
            if (arabic) {
              strengths.add(arabic[0]);
            } else {
              const summary = prevUserMsg.slice(0, 50).trim();
              if (summary) strengths.add(summary);
            }
          }
          break;
        }
      }
    }
  }

  // Items that appear in mistakes but not strengths are weak areas
  mistakes.forEach(m => {
    if (!strengths.has(m)) weakAreas.add(m);
  });

  return {
    module,
    topicsCovered: [...topics].slice(-MAX_TOPICS),
    mistakes: [...mistakes].slice(-MAX_MISTAKES),
    strengths: [...strengths].slice(-MAX_STRENGTHS),
    weakAreas: [...weakAreas].slice(-MAX_MISTAKES),
    conversationCount: (existingMemory?.conversationCount || 0) + 1,
    messageCount: (existingMemory?.messageCount || 0) + messages.length,
    lastUpdated: Date.now(),
  };
}

function findPreviousUserMessage(messages: ChatMessage[], currentIndex: number): string | null {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (messages[i].role === 'user') return messages[i].content;
  }
  return null;
}

/**
 * Format memory as concise text for injection into the system prompt.
 * Kept short (~100-200 tokens) to avoid inflating prompt size.
 */
export function formatMemoryForPrompt(memory: AIConversationMemory): string {
  const parts: string[] = [
    `Student learning history (${memory.conversationCount} past conversations, ${memory.messageCount} messages):`,
  ];

  if (memory.topicsCovered.length > 0) {
    // Show last 10 topics to keep it concise
    const recent = memory.topicsCovered.slice(-10);
    parts.push(`Topics covered: ${recent.join(', ')}`);
  }

  if (memory.strengths.length > 0) {
    const recent = memory.strengths.slice(-5);
    parts.push(`Strengths: ${recent.join(', ')}`);
  }

  if (memory.weakAreas.length > 0) {
    const recent = memory.weakAreas.slice(-5);
    parts.push(`Areas needing practice: ${recent.join(', ')}`);
  }

  if (memory.mistakes.length > 0) {
    const recent = memory.mistakes.slice(-5);
    parts.push(`Recent mistakes: ${recent.join(', ')}`);
  }

  parts.push('Use this history to personalize teaching — reference past topics, reinforce weak areas, and build on strengths.');

  return parts.join('\n');
}
