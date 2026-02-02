// Arabic Quiz Generator API - Uses dynamic vocabulary from translation APIs
import { DEFAULT_QUIZ_CONFIG } from '../types/arabicQuiz';
import {
  ArabicVocabularyWord,
  getVocabularyForQuiz,
  fetchArabicVocabulary,
} from './arabicVocabularyApi';

export type QuizDirection = 'arabicToEnglish' | 'englishToArabic';

export interface QuizQuestion {
  id: string;
  direction: QuizDirection;
  word: ArabicVocabularyWord;
  question: string;
  questionArabic?: string;
  options: string[];
  correctIndex: number;
  explanation: DetailedExplanation;
}

export interface DetailedExplanation {
  summary: string;
  arabic: string;
  transliteration: string;
  english: string;
  pronunciationTip?: string;
  memoryTip?: string;
}

export interface GenerateQuizResult {
  questions: QuizQuestion[];
  wordsUsed: ArabicVocabularyWord[];
}

// Generate a multiple choice question with detailed explanation
function generateMultipleChoiceQuestion(
  word: ArabicVocabularyWord,
  allWords: ArabicVocabularyWord[],
  direction: QuizDirection,
  index: number
): QuizQuestion {
  // Get 3 random wrong answers (distractors)
  const distractors = allWords
    .filter((w) => w.id !== word.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  let question: string;
  let questionArabic: string | undefined;
  let options: string[];
  let correctIndex: number;

  if (direction === 'arabicToEnglish') {
    // Show Arabic word, ask for English meaning
    question = 'What does this Arabic word mean?';
    questionArabic = word.arabic;

    // Options are English translations
    const wrongOptions = distractors.map((w) => w.english);
    correctIndex = Math.floor(Math.random() * 4);
    options = [...wrongOptions];
    options.splice(correctIndex, 0, word.english);
  } else {
    // Show English word, ask for Arabic translation
    question = `How do you say "${word.english}" in Arabic?`;

    // Options are Arabic words
    const wrongOptions = distractors.map((w) => w.arabic);
    correctIndex = Math.floor(Math.random() * 4);
    options = [...wrongOptions];
    options.splice(correctIndex, 0, word.arabic);
  }

  // Create detailed explanation
  const explanation = createDetailedExplanation(word, direction);

  return {
    id: `quiz-${index}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    direction,
    word,
    question,
    questionArabic,
    options,
    correctIndex,
    explanation,
  };
}

// Create a detailed, educational explanation for each word
function createDetailedExplanation(
  word: ArabicVocabularyWord,
  direction: QuizDirection
): DetailedExplanation {
  const explanation: DetailedExplanation = {
    summary: `"${word.english}" in Arabic is "${word.arabic}"`,
    arabic: word.arabic,
    transliteration: word.transliteration,
    english: word.english,
  };

  // Add pronunciation tip based on transliteration
  explanation.pronunciationTip = generatePronunciationTip(word.transliteration, word.arabic);

  // Add memory tip to help remember the word
  explanation.memoryTip = generateMemoryTip(word.english, word.transliteration);

  return explanation;
}

// Generate helpful pronunciation tips
function generatePronunciationTip(transliteration: string, arabic: string): string {
  const tips: string[] = [];

  // Check for common Arabic sounds that are difficult for English speakers
  if (transliteration.includes("'") || transliteration.includes('ع')) {
    tips.push("The ' sound (ع) is a deep throat sound unique to Arabic");
  }
  if (transliteration.includes('kh')) {
    tips.push("'kh' is pronounced like the 'ch' in Scottish 'loch'");
  }
  if (transliteration.includes('gh')) {
    tips.push("'gh' is a guttural sound, like gargling");
  }
  if (transliteration.includes('q')) {
    tips.push("'q' is pronounced deep in the throat, different from 'k'");
  }
  if (transliteration.includes('aa') || transliteration.includes('ee') || transliteration.includes('oo')) {
    tips.push('Double vowels indicate a longer sound');
  }

  // Check for common Arabic letter patterns
  if (arabic.includes('ال')) {
    tips.push("'ال' (al-) is the Arabic definite article, like 'the' in English");
  }

  if (tips.length === 0) {
    return `Pronounce it as: "${transliteration}"`;
  }

  return `Pronounce it as: "${transliteration}". ${tips[0]}`;
}

// Generate memory tips to help remember words
function generateMemoryTip(english: string, transliteration: string): string {
  // Try to find sound similarities
  const firstSyllable = transliteration.split(/[aeiou]/)[0];

  const memoryTips = [
    `Try to associate "${transliteration}" with the meaning "${english}"`,
    `Repeat "${transliteration}" three times while thinking of "${english}"`,
    `Picture something related to "${english}" while saying "${transliteration}"`,
    `The Arabic word sounds like "${transliteration}" - connect it to "${english}"`,
  ];

  // Check for sound similarities with English
  if (transliteration.toLowerCase().includes(english.substring(0, 2).toLowerCase())) {
    return `Notice how "${transliteration}" starts similarly to "${english}" - use this to remember!`;
  }

  return memoryTips[Math.floor(Math.random() * memoryTips.length)];
}

// Generate a quiz with dynamically fetched vocabulary
export async function generateArabicQuiz(
  questionCount: number = DEFAULT_QUIZ_CONFIG.questionCount,
  mixDirections: boolean = true
): Promise<GenerateQuizResult> {
  // Fetch vocabulary from APIs (with caching)
  const vocabulary = await getVocabularyForQuiz(questionCount + 5);

  if (vocabulary.length < 4) {
    throw new Error('Not enough vocabulary words available. Please try again.');
  }

  // Select words for the quiz
  const selectedWords = vocabulary.slice(0, Math.min(questionCount, vocabulary.length));

  // Generate questions
  const questions: QuizQuestion[] = selectedWords.map((word, index) => {
    // Determine direction - mix or consistent
    let direction: QuizDirection;
    if (mixDirections) {
      direction = Math.random() > 0.5 ? 'arabicToEnglish' : 'englishToArabic';
    } else {
      direction = 'arabicToEnglish';
    }

    return generateMultipleChoiceQuestion(word, vocabulary, direction, index);
  });

  return {
    questions,
    wordsUsed: selectedWords,
  };
}

// Fetch fresh vocabulary (bypassing cache) - use when user passes quiz
export async function fetchFreshVocabulary(count: number = 15): Promise<ArabicVocabularyWord[]> {
  return fetchArabicVocabulary(count);
}

// Calculate quiz score
export function calculateQuizScore(
  correctAnswers: number,
  totalQuestions: number,
  maxStreak: number
): { score: number; xpEarned: number; passed: boolean } {
  const baseXP = correctAnswers * DEFAULT_QUIZ_CONFIG.xpPerCorrect;
  const streakBonus = maxStreak >= 3 ? (maxStreak - 2) * DEFAULT_QUIZ_CONFIG.streakBonus : 0;
  const xpEarned = baseXP + streakBonus;

  const accuracy = (correctAnswers / totalQuestions) * 100;
  const passed = accuracy >= DEFAULT_QUIZ_CONFIG.passingScore;

  return {
    score: Math.round(accuracy),
    xpEarned,
    passed,
  };
}
