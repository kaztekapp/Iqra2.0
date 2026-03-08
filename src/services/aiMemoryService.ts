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
  const mistakeCounts: Record<string, number> = { ...(existingMemory?.mistakeCounts || {}) };
  const mastered = new Set<string>(existingMemory?.mastered || []);

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
          const prevUserMsg = findPreviousUserMessage(messages, i);
          if (prevUserMsg) {
            const mistakeKey = extractMistakeKey(prevUserMsg);
            if (mistakeKey) {
              mistakes.add(mistakeKey);
              mistakeCounts[mistakeKey] = (mistakeCounts[mistakeKey] || 0) + 1;
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
            const strengthKey = extractMistakeKey(prevUserMsg);
            if (strengthKey) {
              strengths.add(strengthKey);
              // If this was previously a mistake, it's now mastered
              if (mistakes.has(strengthKey)) {
                mastered.add(strengthKey);
                weakAreas.delete(strengthKey);
              }
            }
          }
          break;
        }
      }
    }
  }

  // Items that appear in mistakes but not mastered are weak areas
  mistakes.forEach(m => {
    if (!mastered.has(m)) weakAreas.add(m);
  });

  return {
    module,
    topicsCovered: [...topics].slice(-MAX_TOPICS),
    mistakes: [...mistakes].slice(-MAX_MISTAKES),
    strengths: [...strengths].slice(-MAX_STRENGTHS),
    weakAreas: [...weakAreas].slice(-MAX_MISTAKES),
    mistakeCounts,
    mastered: [...mastered].slice(-MAX_STRENGTHS),
    conversationCount: (existingMemory?.conversationCount || 0) + 1,
    messageCount: (existingMemory?.messageCount || 0) + messages.length,
    lastUpdated: Date.now(),
  };
}

function extractMistakeKey(userMsg: string): string | null {
  const arabic = userMsg.match(ARABIC_WORD_REGEX);
  if (arabic) return arabic[0];
  const summary = userMsg.slice(0, 50).trim();
  return summary || null;
}

function findPreviousUserMessage(messages: ChatMessage[], currentIndex: number): string | null {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (messages[i].role === 'user') return messages[i].content;
  }
  return null;
}

/**
 * Format memory as concise text for injection into the system prompt.
 * Includes adaptive teaching directives based on weak areas and mastery.
 */
export function formatMemoryForPrompt(memory: AIConversationMemory): string {
  const parts: string[] = [
    `STUDENT LEARNING HISTORY (${memory.conversationCount} past conversations):`,
  ];

  if (memory.topicsCovered.length > 0) {
    const recent = memory.topicsCovered.slice(-10);
    parts.push(`Topics covered: ${recent.join(', ')}`);
  }

  if (memory.strengths.length > 0) {
    const recent = memory.strengths.slice(-5);
    parts.push(`Strengths: ${recent.join(', ')}`);
  }

  if (memory.mastered.length > 0) {
    const recent = memory.mastered.slice(-5);
    parts.push(`Previously struggled but now mastered: ${recent.join(', ')}`);
  }

  // Sort weak areas by mistake frequency — most struggled first
  if (memory.weakAreas.length > 0) {
    const sorted = [...memory.weakAreas].sort(
      (a, b) => (memory.mistakeCounts[b] || 1) - (memory.mistakeCounts[a] || 1)
    );
    const top = sorted.slice(0, 5);
    const labeled = top.map(w => {
      const count = memory.mistakeCounts[w] || 1;
      return count > 1 ? `${w} (${count}x wrong)` : w;
    });
    parts.push(`Weak areas needing review: ${labeled.join(', ')}`);
  }

  // Calculate days since last session
  const daysSince = Math.floor((Date.now() - memory.lastUpdated) / (1000 * 60 * 60 * 24));

  parts.push('');
  parts.push('ADAPTIVE TEACHING RULES (follow these based on the history above):');

  if (memory.weakAreas.length > 0) {
    const topWeak = [...memory.weakAreas]
      .sort((a, b) => (memory.mistakeCounts[b] || 1) - (memory.mistakeCounts[a] || 1))
      .slice(0, 3);
    parts.push(`- When the student asks a general question or says "teach me" / "what should I learn", PROACTIVELY revisit: ${topWeak.join(', ')}. Say something like "Last time you had trouble with X — let's practice that!"`);
    parts.push('- Weave weak areas naturally into examples. If teaching a new concept, use weak-area words in your example sentences when possible.');
  }

  if (memory.mastered.length > 0) {
    parts.push('- Reference mastered topics to build confidence: "You already know X well — this works the same way"');
  }

  if (daysSince >= 3) {
    parts.push(`- The student hasn't practiced in ${daysSince} days. Welcome them back warmly and suggest a quick review of recent topics.`);
  }

  parts.push('- Gradually increase difficulty: if the student gets 2+ answers right in a row, offer a harder challenge.');
  parts.push('- If the student repeats a mistake from their history, point it out gently: "This is something we\'ve seen before — let\'s break it down differently this time"');

  return parts.join('\n');
}
