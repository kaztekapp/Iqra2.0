import { useProgressStore } from '../stores/progressStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useAIChatStore } from '../stores/aiChatStore';
import { AIModuleContext, AIContextPayload } from '../types/aiChat';
import { Exercise } from '../types/arabic';
import { getLetterById } from '../data/arabic/alphabet/letters';
import { getThemeById, getWordsByTheme } from '../data/arabic/vocabulary/index';
import { getLessonById } from '../data/arabic/grammar/lessons';
import { getTextById } from '../data/arabic/reading/texts';
import {
  getExercisesForGrammarLesson,
  getQuizExercisesForVocabularyTheme,
  getExercisesByModule,
} from '../data/arabic/exercises/index';

/**
 * Serializes up to 5 random non-writing exercises into a text block
 * for inclusion in the AI system prompt.
 */
function buildExerciseContext(exercises: Exercise[]): string {
  const quizExercises = exercises.filter(ex => ex.type !== 'writing');
  if (quizExercises.length === 0) return '';

  // Shuffle and pick up to 5
  const shuffled = [...quizExercises].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);

  const lines: string[] = ['\nQuiz questions available for this lesson:'];

  selected.forEach((ex, i) => {
    lines.push(`Q${i + 1}: [${ex.type}] ${ex.question}`);
    if (ex.options) {
      const optionTexts = ex.options.map(
        o => `${o.id.toUpperCase()}) ${o.text}${o.isCorrect ? ' ✓' : ''}`
      );
      lines.push(`  ${optionTexts.join('  ')}`);
    } else if (Array.isArray(ex.correctAnswer)) {
      lines.push(`  Answer: ${ex.correctAnswer[0]}`);
    } else {
      lines.push(`  Answer: ${ex.correctAnswer}`);
    }
    if (ex.hint) lines.push(`  Hint: ${ex.hint}`);
    if (ex.explanation) lines.push(`  Explanation: ${ex.explanation}`);
  });

  return lines.join('\n');
}

/**
 * Maps Expo Router segments to an AI module context.
 */
export function getModuleFromSegments(segments: string[]): AIModuleContext {
  const path = segments.join('/');

  if (path.includes('alphabet')) return 'alphabet';
  if (path.includes('vocabulary') || path.includes('flashcard')) return 'vocabulary';
  if (path.includes('grammar')) return 'grammar';
  if (path.includes('verb')) return 'verbs';
  if (path.includes('reading')) return 'reading';
  if (path.includes('exercise') || path.includes('practice') || path.includes('typing')) return 'practice';

  return 'general';
}

/**
 * Checks if the current route is within the Learn Arabic section.
 */
export function isInLearnSection(segments: string[]): boolean {
  const learnRoutes = [
    'alphabet', 'vocabulary', 'grammar', 'reading',
    'exercise', 'verb', 'practice', 'typing',
  ];
  const path = segments.join('/');
  // Also include the learn tab itself
  if (segments[0] === '(tabs)' && segments[1] === 'learn') return true;
  return learnRoutes.some((route) => path.includes(route));
}

/**
 * Builds a rich content string for a specific Arabic letter,
 * including forms, pronunciation, and example words.
 */
function buildLetterContent(letterId: string, isFr: boolean): string {
  const letter = getLetterById(letterId);
  if (!letter) return '';

  const lines: string[] = [
    `Letter: ${letter.letter} — ${letter.name} (${letter.nameArabic})`,
    `Transliteration: ${letter.transliteration}`,
    `Pronunciation: ${isFr ? (letter.soundDescriptionFr || letter.soundDescription) : letter.soundDescription}`,
    `Connectable: ${letter.connectable ? 'yes' : 'no (does not connect to the next letter)'}`,
    `Forms: isolated=${letter.forms.isolated}, initial=${letter.forms.initial}, medial=${letter.forms.medial}, final=${letter.forms.final}`,
    `Example words:`,
  ];

  for (const ex of letter.examples) {
    const meaning = isFr ? (ex.meaningFr || ex.meaning) : ex.meaning;
    lines.push(`  - ${ex.word} (${ex.transliteration}) = ${meaning} [${ex.position} position]`);
  }

  // Append quiz exercises for this letter's module
  const alphabetExercises = getExercisesByModule('alphabet');
  const letterExercises = alphabetExercises.filter(
    ex => ex.question.includes(letter.letter) || ex.question.includes(letter.name)
  );
  const exerciseContext = buildExerciseContext(letterExercises);
  if (exerciseContext) lines.push(exerciseContext);

  return lines.join('\n');
}

/**
 * Builds a rich content string for a vocabulary theme,
 * including all words with their Arabic, transliteration, and meaning.
 */
function buildVocabContent(themeId: string, isFr: boolean): string {
  const theme = getThemeById(themeId);
  if (!theme) return '';

  const words = getWordsByTheme(themeId);
  const lines: string[] = [
    `Theme: ${isFr ? (theme.nameFr || theme.name) : theme.name} (${theme.nameArabic})`,
    `Level: ${theme.level} — ${theme.wordCount} words`,
    `${isFr ? (theme.descriptionFr || theme.description) : theme.description}`,
    `Words in this theme:`,
  ];

  for (const w of words) {
    const meaning = isFr ? (w.french || w.english) : w.english;
    let line = `  - ${w.arabicWithVowels} (${w.transliteration}) = ${meaning}`;
    if (w.partOfSpeech) line += ` [${w.partOfSpeech}]`;
    if (w.gender) line += ` [${w.gender}]`;
    if (w.plural) line += ` pl: ${w.plural}`;
    lines.push(line);
    if (w.exampleSentence) {
      const exMeaning = isFr ? (w.exampleSentence.french || w.exampleSentence.english) : w.exampleSentence.english;
      lines.push(`    e.g. ${w.exampleSentence.arabic} (${w.exampleSentence.transliteration}) = ${exMeaning}`);
    }
  }

  // Append quiz exercises for this vocabulary theme
  const themeExercises = getQuizExercisesForVocabularyTheme(themeId);
  const exerciseContext = buildExerciseContext(themeExercises);
  if (exerciseContext) lines.push(exerciseContext);

  return lines.join('\n');
}

/**
 * Builds a rich content string for a grammar lesson,
 * including the text content, rules, and examples.
 */
function buildGrammarContent(lessonId: string, isFr: boolean): string {
  const lesson = getLessonById(lessonId);
  if (!lesson) return '';

  const lines: string[] = [
    `Lesson: ${isFr ? (lesson.titleFr || lesson.title) : lesson.title} (${lesson.titleArabic})`,
    `Level: ${lesson.level} — Category: ${lesson.category}`,
    `${isFr ? (lesson.descriptionFr || lesson.description) : lesson.description}`,
    `Content:`,
  ];

  for (const block of lesson.content) {
    const text = isFr ? (block.contentFr || block.content) : block.content;
    if (block.type === 'text' || block.type === 'description' || block.type === 'rule' || block.type === 'note') {
      if (text) lines.push(text);
      if (block.arabic) {
        const translation = isFr ? (block.arabicTranslationFr || block.arabicTranslation || '') : (block.arabicTranslation || '');
        lines.push(`  ${block.arabic}${translation ? ` — ${translation}` : ''}`);
      }
    } else if (block.type === 'example' && block.arabic) {
      const translation = isFr ? (block.translationFr || block.translation || '') : (block.translation || '');
      lines.push(`  Example: ${block.arabic} (${block.transliteration || ''}) = ${translation}`);
    } else if (block.type === 'examples_grid' && block.examples) {
      if (text) lines.push(text);
      for (const ex of block.examples) {
        const meaning = isFr ? (ex.french || ex.english) : ex.english;
        lines.push(`  - ${ex.arabic} = ${meaning}`);
      }
    } else if (block.type === 'letters_grid' && block.letters) {
      if (text) lines.push(text);
      lines.push(`  Letters: ${block.letters.join(' ')}`);
      if (block.letterType) lines.push(`  Type: ${block.letterType} letters`);
    } else if (block.type === 'table' && block.tableData) {
      const tableData = isFr ? (block.tableDataFr || block.tableData) : block.tableData;
      if (text) lines.push(text);
      lines.push(`  ${tableData.headers.join(' | ')}`);
      for (const row of tableData.rows) {
        lines.push(`  ${row.join(' | ')}`);
      }
    } else if (block.type === 'comparison_grid' && block.comparisons) {
      if (text) lines.push(text);
      for (const comp of block.comparisons) {
        const leftLabel = isFr ? (comp.left.labelFr || comp.left.label) : comp.left.label;
        const rightLabel = isFr ? (comp.right.labelFr || comp.right.label) : comp.right.label;
        lines.push(`  ${comp.left.arabic} (${leftLabel}) vs ${comp.right.arabic} (${rightLabel})`);
      }
    }
  }

  // Append quiz exercises for this grammar lesson
  const lessonExercises = getExercisesForGrammarLesson(lessonId);
  const exerciseContext = buildExerciseContext(lessonExercises);
  if (exerciseContext) lines.push(exerciseContext);

  return lines.join('\n');
}

/**
 * Builds a rich content string for a reading text,
 * including the full Arabic text, transliteration, and translation.
 */
function buildReadingContent(textId: string, isFr: boolean): string {
  const text = getTextById(textId);
  if (!text) return '';

  const lines: string[] = [
    `Reading: ${isFr ? (text.titleFr || text.title) : text.title} (${text.titleArabic})`,
    `Level: ${text.level}`,
    `Arabic text (with vowels):`,
    text.textWithVowels,
    `Transliteration: ${text.transliteration}`,
    `Translation: ${isFr ? (text.translationFr || text.translation) : text.translation}`,
  ];

  return lines.join('\n');
}

/**
 * Extracts the lesson/item ID and name from route segments + data files.
 * Returns rich content from local data so the AI has full lesson context.
 */
function getLessonInfo(segments: string[], language: 'en' | 'fr'): {
  lessonId?: string;
  lessonTitle?: string;
  currentContent?: string;
} {
  const isFr = language === 'fr';

  // Routes: /alphabet/[letterId], /vocabulary/[themeId], /grammar/[lessonId], /reading/[textId]
  const alphabetIdx = segments.indexOf('alphabet');
  if (alphabetIdx !== -1 && segments[alphabetIdx + 1]) {
    const id = segments[alphabetIdx + 1];
    const letter = getLetterById(id);
    if (letter) {
      return {
        lessonId: id,
        lessonTitle: isFr ? (letter.nameFr || letter.name) : letter.name,
        currentContent: buildLetterContent(id, isFr),
      };
    }
  }

  const vocabIdx = segments.indexOf('vocabulary');
  if (vocabIdx !== -1 && segments[vocabIdx + 1]) {
    const id = segments[vocabIdx + 1];
    const theme = getThemeById(id);
    if (theme) {
      return {
        lessonId: id,
        lessonTitle: isFr ? (theme.nameFr || theme.name) : theme.name,
        currentContent: buildVocabContent(id, isFr),
      };
    }
  }

  const grammarIdx = segments.indexOf('grammar');
  if (grammarIdx !== -1 && segments[grammarIdx + 1]) {
    const id = segments[grammarIdx + 1];
    const lesson = getLessonById(id);
    if (lesson) {
      return {
        lessonId: id,
        lessonTitle: isFr ? (lesson.titleFr || lesson.title) : lesson.title,
        currentContent: buildGrammarContent(id, isFr),
      };
    }
  }

  const readingIdx = segments.indexOf('reading');
  if (readingIdx !== -1 && segments[readingIdx + 1]) {
    const id = segments[readingIdx + 1];
    const text = getTextById(id);
    if (text) {
      return {
        lessonId: id,
        lessonTitle: isFr ? (text.titleFr || text.title) : text.title,
        currentContent: buildReadingContent(id, isFr),
      };
    }
  }

  return {};
}

/**
 * Detects route tier and detail segment from route segments.
 * Tier 1: specific lesson (has dynamic ID after module name)
 * Tier 2: module index (at /alphabet, /vocabulary, etc. with no ID)
 * Tier 3: learn tab or general
 */
function getRouteTier(segments: string[]): {
  tier: 1 | 2 | 3;
  module: string;
  itemId?: string;
} {
  const modules = ['alphabet', 'vocabulary', 'grammar', 'reading'];

  for (const mod of modules) {
    const idx = segments.indexOf(mod);
    if (idx !== -1) {
      const nextSeg = segments[idx + 1];
      if (nextSeg && !nextSeg.startsWith('(') && nextSeg !== 'index') {
        return { tier: 1, module: mod, itemId: nextSeg };
      }
      return { tier: 2, module: mod };
    }
  }

  return { tier: 3, module: 'general' };
}

/**
 * Returns 4 contextual suggestion strings based on the current route.
 */
export function getContextualSuggestions(
  segments: string[],
  language: 'en' | 'fr'
): string[] {
  const { tier, module, itemId } = getRouteTier(segments);
  const isFr = language === 'fr';

  // Tier 1: Specific lesson open
  if (tier === 1 && itemId) {
    if (module === 'alphabet') {
      const letter = getLetterById(itemId);
      const name = letter
        ? isFr ? (letter.nameFr || letter.name) : letter.name
        : itemId;
      return isFr
        ? [
            `Comment prononcer ${name} ?`,
            `Montre-moi ${name} dans différentes positions`,
            `Quels mots commencent par ${name} ?`,
            `Compare ${name} avec des lettres similaires`,
          ]
        : [
            `How do I pronounce ${name}?`,
            `Show me ${name} in different positions`,
            `What words start with ${name}?`,
            `Compare ${name} with similar letters`,
          ];
    }

    if (module === 'vocabulary') {
      const theme = getThemeById(itemId);
      const name = theme
        ? isFr ? (theme.nameFr || theme.name) : theme.name
        : itemId;
      return isFr
        ? [
            `Teste-moi sur les mots de ${name}`,
            `Utilise ces mots dans des phrases`,
            `Quels sont les pluriels ?`,
            `Aide-moi à mémoriser les mots de ${name}`,
          ]
        : [
            `Quiz me on ${name} words`,
            `Use these words in sentences`,
            `What are the plurals?`,
            `Help me memorize ${name} words`,
          ];
    }

    if (module === 'grammar') {
      const lesson = getLessonById(itemId);
      const name = lesson
        ? isFr ? (lesson.titleFr || lesson.title) : lesson.title
        : itemId;
      return isFr
        ? [
            `Explique ${name} étape par étape`,
            `Donne-moi des exemples de ${name}`,
            `Teste-moi sur ${name}`,
            `Comment ${name} se connecte aux autres règles ?`,
          ]
        : [
            `Explain ${name} step by step`,
            `Give me examples of ${name}`,
            `Quiz me on ${name}`,
            `How does ${name} connect to other rules?`,
          ];
    }

    if (module === 'reading') {
      return isFr
        ? [
            'Décompose paragraphe par paragraphe',
            'Explique les signes de voyelles',
            'Traduis mot par mot',
            'Quelle grammaire est utilisée ici ?',
          ]
        : [
            'Break down paragraph by paragraph',
            'Explain the vowel marks',
            'Translate word by word',
            'What grammar is used here?',
          ];
    }
  }

  // Tier 2: Module index
  if (tier === 2) {
    if (module === 'alphabet') {
      return isFr
        ? [
            'Quelle lettre devrais-je apprendre ensuite ?',
            'Quelles sont les lettres les plus difficiles ?',
            'Explique les groupes de lettres',
            'Aide-moi à pratiquer l\'écriture',
          ]
        : [
            'Which letter should I learn next?',
            'What are the hardest letters?',
            'Explain letter groups',
            'Help me practice writing',
          ];
    }

    if (module === 'vocabulary') {
      return isFr
        ? [
            'Par quel thème devrais-je commencer ?',
            'Combien de mots par jour devrais-je apprendre ?',
            'Aide-moi à réviser mon vocabulaire',
            'Apprends-moi des phrases courantes',
          ]
        : [
            'What theme should I start with?',
            'How many words should I learn per day?',
            'Help me review my vocabulary',
            'Teach me common phrases',
          ];
    }

    if (module === 'grammar') {
      return isFr
        ? [
            'Par quel sujet de grammaire commencer ?',
            'Explique la structure des phrases arabes',
            'Quelle est la règle la plus importante ?',
            'Crée un plan d\'étude de grammaire',
          ]
        : [
            'What grammar topic should I start with?',
            'Explain Arabic sentence structure',
            'What\'s the most important rule?',
            'Create a grammar study plan',
          ];
    }

    if (module === 'reading') {
      return isFr
        ? [
            'Par quel texte devrais-je commencer ?',
            'Comment améliorer ma lecture ?',
            'Aide-moi à lire sans les voyelles',
            'Crée un plan de lecture',
          ]
        : [
            'Which text should I start with?',
            'How can I improve my reading?',
            'Help me read without vowel marks',
            'Create a reading plan',
          ];
    }
  }

  // Tier 3: Learn tab / general
  return isFr
    ? [
        'Crée un plan d\'apprentissage pour moi',
        'Que devrais-je étudier ensuite ?',
        'Comment est ma progression ?',
        'Fais-moi un quiz rapide en arabe',
      ]
    : [
        'Create a learning plan for me',
        'What should I study next?',
        'How is my progress so far?',
        'Give me a quick Arabic quiz',
      ];
}

/**
 * Gathers context payload from stores for the AI system prompt.
 * Call this outside of React components (reads store state directly).
 */
export function gatherAIContext(module: AIModuleContext): AIContextPayload {
  const progress = useProgressStore.getState();
  const settings = useSettingsStore.getState();
  const { activeSegments } = useAIChatStore.getState();

  const { alphabetProgress, vocabularyProgress, grammarProgress, currentStreak } =
    progress.progress;

  const lessonsCompleted =
    grammarProgress.lessonsCompleted.length +
    vocabularyProgress.themesCompleted.length;

  // Enrich with lesson data from segments
  const lessonInfo = getLessonInfo(activeSegments, settings.language);

  return {
    module,
    userLevel: progress.getOverallLevel(),
    lettersLearned: alphabetProgress.lettersLearned.length,
    wordsLearned: vocabularyProgress.wordsLearned.length,
    lessonsCompleted,
    accuracy: progress.getAccuracy(),
    currentStreak,
    language: settings.language,
    ...lessonInfo,
  };
}
