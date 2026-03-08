# Ustadh - AI Arabic Teacher

## Overview
Ustadh (أُسْتَاذ) is an AI-powered Arabic language teacher built into the Iqra app. It provides personalized, conversational Arabic instruction across all learning modules.

## Architecture

### Backend
- All AI calls route through a **Supabase Edge Function** (`supabase/functions/ai-chat/index.ts`)
- Anthropic API key is stored server-side as a Supabase secret — never exposed to the client
- JWT authentication required — only signed-in users can access the AI
- Rate limiting: 50 messages per user per day, tracked in `ai_chat_usage` table
- SSE streaming: responses stream token-by-token for real-time display

### Models
- **Haiku** (Standard): `claude-haiku-4-5-20251001` — fast, 1024 max tokens
- **Sonnet** (Premium): `claude-sonnet-4-5-20250929` — deeper explanations, 1536 max tokens
- User can toggle between models in the chat header

### Key Files
| File | Purpose |
|------|---------|
| `src/services/aiChatService.ts` | Sends messages to Edge Function, handles SSE streaming |
| `src/data/ai/systemPrompts.ts` | System prompt builder with module-specific instructions |
| `src/stores/aiChatStore.ts` | Chat state — conversations, streaming, model preference |
| `src/stores/aiMemoryStore.ts` | Persistent conversation memory per module |
| `src/services/aiMemoryService.ts` | Conversation analysis — topics, mistakes, strengths |
| `src/services/aiContextService.ts` | Gathers student progress data for context |
| `src/components/ai/AIChatSheet.tsx` | Bottom sheet modal container |
| `src/components/ai/AIChatBubble.tsx` | Message rendering — text, Arabic, quizzes, TTS |
| `src/components/ai/AIChatMessageList.tsx` | Message list with quiz and TTS wiring |
| `src/components/ai/AIChatInput.tsx` | Text input with voice button |
| `supabase/functions/ai-chat/index.ts` | Edge Function — auth, rate limit, proxy to Anthropic |

## Features

### 1. Module-Aware Teaching
Ustadh adapts its teaching style based on which module the student is in:
- **Alphabet** — letter forms, pronunciation, comparisons to familiar sounds
- **Vocabulary** — word meanings, roots, gender, plurals, memory tricks
- **Grammar** — rules with before/after examples, step-by-step explanations
- **Verbs** — conjugation tables, root patterns, example sentences
- **Reading** — letter-by-letter word breakdown, slow pronunciation guidance
- **Practice** — error review, targeted suggestions
- **General** — any Arabic question, study strategies, cultural context

### 2. Arabic Text Rendering
- Arabic text is detected via regex and rendered in **gold (#D4AF37)** at 22px bold
- All Arabic includes full tashkeel (vowel marks)
- Format: Arabic + transliteration + translation on the same line
- The alif in ال never carries a sukun (hamzat al-wasl rule enforced)

### 3. Interactive Quizzes
- Quizzes always use **multiple choice (A/B/C/D)** format
- Options render as **tappable cards** with emerald left accent border
- Questions are numbered (Q1, Q2, Q3...)
- Options are designed to be clearly distinct — never near-identical diacritical variants
- "Tap to select your answer" hint shown above active options
- **Wrong answer retry**: when the student answers wrong, the "Not quite!" card re-attaches the same quiz options with "Tap to try again" — saves an API call
- Hints nudge toward the answer without revealing it
- After 2 wrong attempts, the correct answer is shown with explanation

### 4. Arabic Text-to-Speech (TTS)
- Speaker icon appears on assistant messages containing Arabic text
- Uses device's built-in Arabic voice via `audioService.speakArabic()`
- Icon states: `volume-high-outline` (idle, gray) / `stop-circle-outline` (playing, amber)
- Only one message can play at a time
- No API calls — uses on-device speech synthesis

### 5. Conversation Memory
Ustadh remembers the student across sessions:
- **Topics covered** — Arabic words and subjects discussed
- **Mistakes** — what was gotten wrong, with frequency counts
- **Strengths** — what was gotten right
- **Mastered** — items that were mistakes but later answered correctly
- **Weak areas** — mistakes that haven't been mastered yet

Memory is per-module, persisted to AsyncStorage (`iqra-ai-memory`), and injected into the system prompt.

Analysis triggers on `closeChat()` and `clearConversation()` when 4+ messages exist.

### 6. Adaptive Difficulty
Based on conversation memory:
- **Proactive review** — when the student asks a general question, Ustadh revisits weak areas: "Last time you had trouble with X — let's practice that!"
- **Mistake frequency** — weak areas are ranked by how many times they were gotten wrong
- **Mastery celebration** — when a previously struggled topic is gotten right: "You got it this time!"
- **Inactivity awareness** — after 3+ days away, welcomes the student back with review suggestions
- **Difficulty scaling** — simpler explanations for weak areas, harder challenges after consecutive correct answers
- **Repeated mistake detection** — acknowledges patterns: "This is something we've seen before — let's try a different approach"

### 7. Voice Input
- Microphone button in chat input for speech-to-text
- Transcribed text inserted into the input field
- Uses `useAIChatSpeechInput` hook

### 8. Student Context
Every message includes the student's current profile:
- Level, letters learned, words learned, lessons completed
- Current streak, exercise accuracy
- Current lesson title and content (when applicable)
- Language preference (EN/FR)

### 9. Bilingual Support
- Responds in English or French based on user's language setting
- Arabic script with transliteration in the user's language

### 10. Streaming Responses
- Responses stream in real-time via SSE
- Typing indicator shows while waiting for first token
- User can stop streaming mid-response with the stop button
- Partial responses are preserved if stopped

## UI Components

### Chat Sheet
- Bottom sheet modal covering 85% of screen height
- Drag-to-dismiss on the header area
- Spring animation on open, timing animation on close
- Keyboard-avoiding behavior on iOS

### Message Bubbles
- **Assistant**: full-width dark card (`#334155`), no avatar, rounded corners
- **User**: emerald green (`#10b981`), right-aligned, max 80% width
- **Errors**: centered red italic text for offline/rate limit/auth errors

### Chat Header
- Module name badge
- Model toggle (Standard/Premium)
- Clear conversation button
- Close button

## Data Flow

```
User taps send
  → aiChatService.sendAIChatMessage()
    → gatherAIContext() — student progress
    → buildSystemPrompt() — base + module + memory + context
    → fetch Edge Function with auth token
      → Edge Function validates JWT
      → Edge Function checks rate limit
      → Edge Function calls Anthropic API (streaming)
      → SSE stream proxied back to client
    → appendStreamChunk() updates store
    → finalizeStreamedMessage() saves to conversation
  → closeChat() or clearConversation()
    → analyzeConversation() extracts topics/mistakes/strengths
    → aiMemoryStore persists memory
```

## Configuration

### Environment Variables
- `EXPO_PUBLIC_SUPABASE_URL` — Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key

### Supabase Secrets (server-side)
- `ANTHROPIC_API_KEY` — Anthropic API key (set via `supabase secrets set`)

### Constants
- `AI_MAX_TOKENS` in `src/types/aiChat.ts` — per-model token limits
- `AI_MODEL_IDS` in `src/types/aiChat.ts` — model identifiers
- `MAX_HISTORY_MESSAGES = 10` — conversation history window sent to API
- `DAILY_MESSAGE_LIMIT = 50` — rate limit in Edge Function

## Deployment
1. Set API key: `supabase secrets set ANTHROPIC_API_KEY=sk-ant-...`
2. Deploy function: `supabase functions deploy ai-chat --no-verify-jwt`
3. Push to main to trigger OTA update for client changes
