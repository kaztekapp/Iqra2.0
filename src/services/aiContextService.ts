import { useProgressStore } from '../stores/progressStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useAIChatStore } from '../stores/aiChatStore';
import { useQuranStore } from '../stores/quranStore';
import { usePrayerStore } from '../stores/prayerStore';
import { useDuasStore } from '../stores/duasStore';
import { AIModuleContext, AIContextPayload } from '../types/aiChat';
import { Exercise } from '../types/arabic';
import { TOTAL_PRAYER_LESSONS } from '../types/prayer';
import { TOTAL_DUAS } from '../types/duas';
import { HADITH_COLLECTION_NAMES } from '../types/duas';
import { getLetterById } from '../data/arabic/alphabet/letters';
import { getThemeById, getWordsByTheme } from '../data/arabic/vocabulary/index';
import { getLessonById } from '../data/arabic/grammar/lessons';
import { getTextById } from '../data/arabic/reading/texts';
import { getSurahById } from '../data/arabic/quran/surahs';
import { getPrayerLessonById } from '../data/arabic/prayer';
import { getDuaById } from '../data/arabic/duas';
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

  // Quran tab features — prayer/duas checks before quran since they nest under /quran/
  if (path.includes('prayer')) return 'prayer';
  if (path.includes('duas')) return 'duas';
  if (path.includes('surah') || path.includes('all-surahs') || path.includes('tajweed') || path.includes('surah-learn') || path.includes('juz')) return 'quran';

  return 'general';
}

const KNOWN_METHODS = ['learn', 'spaced-repetition', 'chunking', 'active-recall', 'visualization', 'write', 'shadowing', 'methods'] as const;
type LearningMethod = typeof KNOWN_METHODS[number];

/**
 * Extracts the memorization method from route segments.
 * Route: /quran/surah/[surahId]/[method]
 */
export function getMethodFromSegments(segments: string[]): LearningMethod | undefined {
  const surahIdx = segments.indexOf('surah');
  if (surahIdx === -1) return undefined;
  const methodSeg = segments[surahIdx + 2];
  if (methodSeg && (KNOWN_METHODS as readonly string[]).includes(methodSeg)) {
    return methodSeg as LearningMethod;
  }
  return undefined;
}

/**
 * Checks if the current route is within the Learn Arabic section.
 */
export function isInLearnSection(segments: string[]): boolean {
  const learnRoutes = [
    'alphabet', 'vocabulary', 'grammar', 'reading',
    'exercise', 'verb', 'practice', 'typing',
    'surah', 'all-surahs', 'tajweed', 'surah-learn', 'juz',
    'prayer', 'duas',
  ];
  const path = segments.join('/');
  // Also include the learn tab itself
  if (segments[0] === '(tabs)' && segments[1] === 'learn') return true;
  // Include the quran tab
  if (segments[0] === '(tabs)' && segments[1] === 'quran') return true;
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
 * Builds a rich content string for a Quran surah,
 * including surah metadata and student progress on it.
 */
/**
 * Classifies surah length and returns a tier with a tailored teaching strategy.
 */
function getSurahLengthTier(ayahCount: number): { tier: 'short' | 'medium' | 'long'; strategy: string; strategyFr: string } {
  if (ayahCount <= 20) {
    return {
      tier: 'short',
      strategy: 'This is a SHORT surah. Focus on complete memorization: word-by-word breakdown of every ayah, detailed tajweed for each line, and full memorization in one or two sessions. The student can realistically memorize the whole surah.',
      strategyFr: 'Ceci est une sourate COURTE. Concentre-toi sur la mémorisation complète : décomposition mot par mot de chaque verset, tajweed détaillé pour chaque ligne, mémorisation en une ou deux sessions.',
    };
  }
  if (ayahCount <= 80) {
    return {
      tier: 'medium',
      strategy: 'This is a MEDIUM-LENGTH surah. Use a section-by-section approach: group ayahs into thematic passages (5-10 ayahs), focus on key passages first, build connections between sections. Suggest a multi-day memorization plan.',
      strategyFr: 'Ceci est une sourate de LONGUEUR MOYENNE. Utilise une approche section par section : regroupe les versets par passages thématiques (5-10 versets), concentre-toi sur les passages clés, et propose un plan de mémorisation sur plusieurs jours.',
    };
  }
  return {
    tier: 'long',
    strategy: 'This is a LONG surah. Use a theme-based study approach: identify major themes/stories within the surah, focus on the most important or frequently recited passages first, create a gradual multi-week memorization plan. Break it into manageable daily portions (3-5 ayahs).',
    strategyFr: 'Ceci est une sourate LONGUE. Utilise une approche thématique : identifie les grands thèmes/récits, concentre-toi d\'abord sur les passages les plus importants ou les plus récités, et propose un plan de mémorisation progressif sur plusieurs semaines (3-5 versets par jour).',
  };
}

const METHOD_DESCRIPTIONS: Record<LearningMethod, { en: string; fr: string }> = {
  learn: {
    en: 'Surah Learning — the student is studying the surah in depth. They want tafsir (deep meaning), word-by-word understanding, and memorization guidance. Help them understand the meaning behind what they are memorizing.',
    fr: 'Apprentissage de la Sourate — l\'étudiant étudie la sourate en profondeur. Il veut le tafsir (sens profond), la compréhension mot par mot, et des conseils de mémorisation.',
  },
  'spaced-repetition': {
    en: 'Spaced Repetition — the student reviews memorized ayahs at increasing intervals using the SM-2 algorithm. Focus on helping them recall and reinforce weak ayahs.',
    fr: 'Répétition Espacée — l\'étudiant révise les versets mémorisés à intervalles croissants avec l\'algorithme SM-2. Aide-le à se rappeler et renforcer les versets faibles.',
  },
  chunking: {
    en: 'Chunking — the student breaks each ayah into groups of 3 words, learns each chunk, then progressively combines them. Help with meaning connections between chunks and phrase-level understanding.',
    fr: 'Découpage — l\'étudiant divise chaque verset en groupes de 3 mots, apprend chaque segment, puis les combine progressivement. Aide avec les liens de sens entre segments.',
  },
  'active-recall': {
    en: 'Active Recall — the student hides the text and tries to recall ayahs from memory, then checks. Support their self-testing without giving away answers.',
    fr: 'Rappel Actif — l\'étudiant cache le texte et essaie de se rappeler les versets de mémoire, puis vérifie. Soutiens son auto-évaluation sans donner les réponses.',
  },
  visualization: {
    en: 'Visualization / Memory Palace — the student creates vivid mental images and spatial associations for each ayah to anchor them in long-term memory.',
    fr: 'Visualisation / Palais de la Mémoire — l\'étudiant crée des images mentales vives et des associations spatiales pour chaque verset afin de les ancrer en mémoire.',
  },
  write: {
    en: 'Writing from Memory — the student writes out ayahs from memory in Arabic script, checking against the original. Help with letter forms, diacritics, and spelling.',
    fr: 'Écriture de Mémoire — l\'étudiant écrit les versets de mémoire en écriture arabe, puis vérifie. Aide avec les formes des lettres, les diacritiques et l\'orthographe.',
  },
  shadowing: {
    en: 'Shadowing — the student recites along with audio in real-time, matching the reciter\'s pronunciation, speed, and tajweed. Focus on pronunciation and rhythm.',
    fr: 'Shadowing — l\'étudiant récite en même temps que l\'audio, imitant la prononciation, le rythme et le tajweed du récitateur. Concentre-toi sur la prononciation et le rythme.',
  },
  methods: {
    en: 'Method Picker — the student is choosing which memorization method to use. Help them pick the right one based on their learning style and the surah.',
    fr: 'Choix de Méthode — l\'étudiant choisit quelle méthode de mémorisation utiliser. Aide-le à choisir la bonne selon son style d\'apprentissage et la sourate.',
  },
};

function buildQuranContent(surahId: string, isFr: boolean, method?: LearningMethod): string {
  const surah = getSurahById(surahId);
  if (!surah) return '';

  const lengthInfo = getSurahLengthTier(surah.ayahCount);

  const lines: string[] = [
    `Surah: ${surah.nameArabic} — ${surah.nameEnglish} (${surah.nameTransliteration})`,
    `Number: ${surah.surahNumber} | Ayahs: ${surah.ayahCount} | Words: ${surah.wordCount}`,
    `Revelation: ${surah.revelationType} | Juz: ${surah.juz} | Hizb: ${surah.hizb}`,
    `Meaning: ${isFr ? (surah.meaningFr || surah.meaning) : surah.meaning}`,
    `Difficulty: ${surah.difficulty}`,
    `Length tier: ${lengthInfo.tier} (${surah.ayahCount} ayahs)`,
    `\nTEACHING STRATEGY:\n${isFr ? lengthInfo.strategyFr : lengthInfo.strategy}`,
  ];

  // Student's progress on this specific surah
  const quranState = useQuranStore.getState();
  const surahProgress = quranState.getSurahProgress(surahId);
  if (surahProgress) {
    lines.push(`\nStudent progress on this surah:`);
    lines.push(`- Ayahs learned: ${surahProgress.ayahsLearned.length}/${surah.ayahCount}`);
    lines.push(`- Ayahs memorized: ${surahProgress.ayahsMemorized.length}/${surah.ayahCount}`);
    lines.push(`- Completion: ${surahProgress.completionPercent}%`);
    lines.push(`- Time spent: ${surahProgress.timeSpent} minutes`);
  }

  // Method-specific context
  if (method) {
    const desc = METHOD_DESCRIPTIONS[method];
    lines.push(`\nACTIVE METHOD: ${method}`);
    lines.push(isFr ? desc.fr : desc.en);

    // Extra data for spaced repetition
    if (method === 'spaced-repetition') {
      const quranState = useQuranStore.getState();
      const allDue = quranState.getDueReviews();
      const dueForSurah = allDue.filter((r: any) => r.surahId === surahId);
      const memProgress = (quranState as any).progress?.memorizationProgress;
      const streak = memProgress?.currentStreak ?? 0;
      lines.push(`- Reviews due (this surah): ${dueForSurah.length}`);
      lines.push(`- Reviews due (total): ${allDue.length}`);
      lines.push(`- Memorization streak: ${streak} days`);
    }
  }

  return lines.join('\n');
}

/**
 * Builds a rich content string for a prayer lesson,
 * including all content blocks serialized for the AI.
 */
function buildPrayerContent(lessonId: string, isFr: boolean): string {
  const lesson = getPrayerLessonById(lessonId);
  if (!lesson) return '';

  const lines: string[] = [
    `Lesson: ${isFr ? (lesson.titleFr || lesson.title) : lesson.title} (${lesson.titleArabic})`,
    `Category: ${lesson.category} | Estimated: ${lesson.estimatedMinutes} min`,
    `${isFr ? (lesson.descriptionFr || lesson.description) : lesson.description}`,
    `Content:`,
  ];

  for (const block of lesson.content) {
    if (block.type === 'text' || block.type === 'description' || block.type === 'rule' || block.type === 'note') {
      const text = isFr ? ((block as any).contentFr || (block as any).content) : (block as any).content;
      if (text) lines.push(text);
      if ((block as any).arabic) lines.push(`  ${(block as any).arabic}`);
    } else if (block.type === 'prayer_step') {
      const step = (block as any).step;
      if (step) {
        const posName = isFr ? (step.positionNameFr || step.positionName) : step.positionName;
        lines.push(`\n  Step ${step.stepNumber}: ${posName} (${step.positionNameArabic})`);
        lines.push(`  Arabic: ${step.arabic}`);
        lines.push(`  Transliteration: ${step.transliteration}`);
        const translation = isFr ? (step.translationFr || step.translation) : step.translation;
        lines.push(`  Translation: ${translation}`);
        const instruction = isFr ? (step.instructionFr || step.instruction) : step.instruction;
        if (instruction) lines.push(`  Instruction: ${instruction}`);
        if (step.repetitions) lines.push(`  Repetitions: ${step.repetitions}`);
        if (step.isSunnah) lines.push(`  (Sunnah act)`);
      }
    } else if (block.type === 'step_list') {
      const steps = (block as any).steps;
      if (steps) {
        for (const s of steps) {
          const title = isFr ? (s.titleFr || s.title) : s.title;
          const desc = isFr ? (s.descriptionFr || s.description) : s.description;
          lines.push(`  ${s.stepNumber}. ${title}: ${desc}`);
          if (s.arabic) lines.push(`    ${s.arabic} (${s.transliteration || ''}) = ${isFr ? (s.translationFr || s.translation || '') : (s.translation || '')}`);
        }
      }
    } else if (block.type === 'prayer_times_table') {
      const rows = (block as any).rows;
      if (rows) {
        for (const r of rows) {
          const name = isFr ? (r.nameFr || r.name) : r.name;
          const time = isFr ? (r.timeFr || r.time) : r.time;
          lines.push(`  ${name} (${r.nameArabic}): ${r.rakaat} rak'at, ${time}`);
        }
      }
    } else if (block.type === 'examples_grid') {
      const examples = (block as any).examples;
      if (examples) {
        for (const ex of examples) {
          const translation = isFr ? (ex.translationFr || ex.translation) : ex.translation;
          lines.push(`  - ${ex.arabic} (${ex.transliteration}) = ${translation}`);
        }
      }
    }
  }

  return lines.join('\n');
}

/**
 * Builds a rich content string for a dua,
 * including full Arabic text, transliteration, translation, source, and virtues.
 */
function buildDuaContent(duaId: string, isFr: boolean): string {
  const dua = getDuaById(duaId);
  if (!dua) return '';

  const title = isFr ? (dua.titleFrench || dua.titleEnglish) : dua.titleEnglish;
  const lines: string[] = [
    `Dua: ${title} (${dua.titleArabic})`,
    `Category: ${dua.category}`,
    `\nArabic text:\n${dua.arabicText}`,
    `\nTransliteration:\n${dua.transliteration}`,
    `\nTranslation:\n${isFr ? (dua.translationFr || dua.translation) : dua.translation}`,
    `\nSource: ${HADITH_COLLECTION_NAMES[dua.source.collection]} — Hadith ${dua.source.hadithNumber}`,
  ];

  if (dua.source.narrator) lines.push(`Narrator: ${dua.source.narrator}`);

  const occasion = isFr ? (dua.occasionFr || dua.occasion) : dua.occasion;
  if (occasion) lines.push(`\nWhen to recite: ${occasion}`);

  const virtues = isFr ? (dua.virtuesFr || dua.virtues) : dua.virtues;
  if (virtues) lines.push(`Virtues: ${virtues}`);

  const story = isFr ? (dua.storyFr || dua.story) : dua.story;
  if (story) lines.push(`\nStory/Context: ${story}`);

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

  // Quran surah: routes like /quran/surah/[surahId]/[method]
  const surahIdx = segments.indexOf('surah');
  if (surahIdx !== -1 && segments[surahIdx + 1]) {
    const id = segments[surahIdx + 1];
    const surah = getSurahById(id);
    if (surah) {
      const method = getMethodFromSegments(segments);
      return {
        lessonId: id,
        lessonTitle: `${surah.nameEnglish} (${surah.nameArabic})`,
        currentContent: buildQuranContent(id, isFr, method),
      };
    }
  }

  // Prayer lesson: routes like /quran/prayer/[lessonId]
  const prayerIdx = segments.indexOf('prayer');
  if (prayerIdx !== -1 && segments[prayerIdx + 1]) {
    const id = segments[prayerIdx + 1];
    const lesson = getPrayerLessonById(id);
    if (lesson) {
      return {
        lessonId: id,
        lessonTitle: isFr ? (lesson.titleFr || lesson.title) : lesson.title,
        currentContent: buildPrayerContent(id, isFr),
      };
    }
  }

  // Dua: routes like /quran/duas/[duaId]
  const duasIdx = segments.indexOf('duas');
  if (duasIdx !== -1 && segments[duasIdx + 1]) {
    const id = segments[duasIdx + 1];
    const dua = getDuaById(id);
    if (dua) {
      const title = isFr ? (dua.titleFrench || dua.titleEnglish) : dua.titleEnglish;
      return {
        lessonId: id,
        lessonTitle: title,
        currentContent: buildDuaContent(id, isFr),
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

  // Quran: check for surah segment, or fallback to module index routes
  const surahIdx = segments.indexOf('surah');
  if (surahIdx !== -1) {
    const nextSeg = segments[surahIdx + 1];
    if (nextSeg && !nextSeg.startsWith('(') && nextSeg !== 'index') {
      return { tier: 1, module: 'quran', itemId: nextSeg };
    }
    return { tier: 2, module: 'quran' };
  }
  const path = segments.join('/');
  if (path.includes('all-surahs') || path.includes('tajweed') || path.includes('surah-learn') || path.includes('juz')) {
    return { tier: 2, module: 'quran' };
  }

  // Prayer
  const prayerIdx = segments.indexOf('prayer');
  if (prayerIdx !== -1) {
    const nextSeg = segments[prayerIdx + 1];
    if (nextSeg && !nextSeg.startsWith('(') && nextSeg !== 'index') {
      return { tier: 1, module: 'prayer', itemId: nextSeg };
    }
    return { tier: 2, module: 'prayer' };
  }

  // Duas
  const duasIdx = segments.indexOf('duas');
  if (duasIdx !== -1) {
    const nextSeg = segments[duasIdx + 1];
    if (nextSeg && !nextSeg.startsWith('(') && nextSeg !== 'index') {
      return { tier: 1, module: 'duas', itemId: nextSeg };
    }
    return { tier: 2, module: 'duas' };
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

    if (module === 'quran') {
      // Method-specific suggestions override length-aware defaults
      const method = getMethodFromSegments(segments);
      if (method) {
        const methodSuggestions: Record<LearningMethod, { en: string[]; fr: string[] }> = {
          learn: {
            en: ['Tafsir of these ayahs', 'Help me memorize this passage', 'Word-by-word meaning', 'Why was this revealed?'],
            fr: ['Tafsir de ces versets', 'Aide-moi à mémoriser ce passage', 'Sens mot par mot', 'Pourquoi cela a été révélé ?'],
          },
          'spaced-repetition': {
            en: ['Quiz me on my weak ayahs', 'Why do I keep forgetting this?', 'Tips to improve retention', 'Explain this ayah\'s meaning'],
            fr: ['Teste-moi sur mes versets faibles', 'Pourquoi j\'oublie toujours ça ?', 'Astuces pour mieux retenir', 'Explique le sens de ce verset'],
          },
          chunking: {
            en: ['Explain this chunk\'s meaning', 'How do these chunks connect?', 'Help me link the phrases', 'Meaning of these words'],
            fr: ['Explique le sens de ce segment', 'Comment ces segments se lient ?', 'Aide-moi à relier les phrases', 'Sens de ces mots'],
          },
          'active-recall': {
            en: ['Give me a hint (no spoilers)', 'Why is this word correct?', 'What grammar rule here?', 'Tips for better recall'],
            fr: ['Donne-moi un indice (pas de spoiler)', 'Pourquoi ce mot est correct ?', 'Quelle règle de grammaire ici ?', 'Astuces pour mieux se rappeler'],
          },
          visualization: {
            en: ['Help me picture this scene', 'Suggest a memory anchor', 'Create a personal connection', 'Explain the key words'],
            fr: ['Aide-moi à imaginer cette scène', 'Suggère un ancrage mémoriel', 'Crée une connexion personnelle', 'Explique les mots clés'],
          },
          write: {
            en: ['Why did I get this wrong?', 'Explain the letter forms', 'Help with diacritics', 'Common writing mistakes'],
            fr: ['Pourquoi je me suis trompé ?', 'Explique les formes des lettres', 'Aide avec les diacritiques', 'Erreurs d\'écriture courantes'],
          },
          shadowing: {
            en: ['Pronunciation tips for this ayah', 'What sounds to focus on?', 'Common mistakes here', 'Explain the tajweed'],
            fr: ['Conseils de prononciation pour ce verset', 'Quels sons cibler ?', 'Erreurs courantes ici', 'Explique le tajweed'],
          },
          methods: {
            en: ['Which method is best for me?', 'How does chunking work?', 'Best method for long surahs?', 'Combine multiple methods?'],
            fr: ['Quelle méthode me convient ?', 'Comment fonctionne le découpage ?', 'Meilleure méthode pour les longues sourates ?', 'Combiner plusieurs méthodes ?'],
          },
        };
        return isFr ? methodSuggestions[method].fr : methodSuggestions[method].en;
      }

      const surah = itemId ? getSurahById(itemId) : null;
      const name = surah ? surah.nameEnglish : '';

      // Length-aware suggestions
      if (surah) {
        const { tier } = getSurahLengthTier(surah.ayahCount);
        if (tier === 'short') {
          return isFr
            ? [
                `Tafsir de ${name}`,
                'Sens de chaque verset',
                'Aide-moi à tout mémoriser',
                'Contexte de révélation',
              ]
            : [
                `Tafsir of ${name}`,
                'Meaning of each ayah',
                'Help me memorize the whole surah',
                'Context of revelation',
              ];
        }
        if (tier === 'medium') {
          return isFr
            ? [
                `Thèmes principaux de ${name}`,
                'Tafsir des passages clés',
                'Plan de mémorisation',
                'Liens entre les versets',
              ]
            : [
                `Main themes of ${name}`,
                'Tafsir of key passages',
                'Memorization plan',
                'Connections between ayahs',
              ];
        }
        // long
        return isFr
          ? [
              `Thèmes majeurs de ${name}`,
              'Tafsir d\'un passage',
              'Par où commencer la mémorisation ?',
              'Passages les plus importants',
            ]
          : [
              `Major themes of ${name}`,
              'Tafsir of a passage',
              'Where to start memorizing?',
              'Most important passages',
            ];
      }

      return isFr
        ? [
            `Tafsir de ${name || 'cette sourate'}`,
            'Explique le sens des versets',
            `Comment mémoriser ${name || 'cette sourate'} ?`,
            'Contexte de révélation',
          ]
        : [
            `Tafsir of ${name || 'this surah'}`,
            'Explain the meaning of the verses',
            `How do I memorize ${name || 'this surah'}?`,
            'Context of revelation',
          ];
    }

    if (module === 'prayer') {
      const lesson = itemId ? getPrayerLessonById(itemId) : null;
      const name = lesson
        ? isFr ? (lesson.titleFr || lesson.title) : lesson.title
        : '';
      return isFr
        ? [
            `Explique ${name || 'cette leçon'} en détail`,
            'Comment bien prononcer ?',
            'Obligatoire ou sunna ?',
            'Teste-moi sur cette leçon',
          ]
        : [
            `Explain ${name || 'this lesson'} in detail`,
            'Correct pronunciation?',
            'Obligatory vs sunnah?',
            'Quiz me on this lesson',
          ];
    }

    if (module === 'duas') {
      return isFr
        ? [
            'Aide-moi à mémoriser ce dua',
            'Quelle est l\'histoire derrière ce dua ?',
            'Comment prononcer correctement ?',
            'Quand réciter ce dua ?',
          ]
        : [
            'Help me memorize this dua',
            'What is the story behind this dua?',
            'How to pronounce correctly?',
            'When to recite this dua?',
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

    if (module === 'quran') {
      return isFr
        ? [
            'Quelle sourate commencer ?',
            'Comment mémoriser efficacement ?',
            'Règles de tajweed de base',
            'Aide-moi à réviser',
          ]
        : [
            'Which surah should I start with?',
            'How to memorize effectively?',
            'Basic tajweed rules',
            'Help me with revision',
          ];
    }

    if (module === 'prayer') {
      return isFr
        ? [
            'Par quelle leçon commencer ?',
            'Quels sont les piliers de la prière ?',
            'Comment faire le wudu ?',
            'Que faire si je me trompe ?',
          ]
        : [
            'Which lesson should I start with?',
            'What are the pillars of prayer?',
            'How to do wudu?',
            'What if I make a mistake?',
          ];
    }

    if (module === 'duas') {
      return isFr
        ? [
            'Quels sont les duas les plus importants ?',
            'Par quel dua commencer ?',
            'Adhkar du matin',
            'Dua pour les difficultés ?',
          ]
        : [
            'What are the most important duas?',
            'Which dua should I start with?',
            'Morning adhkar',
            'Dua for difficulty?',
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

  const payload: AIContextPayload = {
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

  // Detect learning method from route segments
  const detectedMethod = getMethodFromSegments(activeSegments);
  if (detectedMethod) {
    payload.learningMethod = detectedMethod;
  }

  // Module-specific progress
  if (module === 'quran') {
    const quranState = useQuranStore.getState();
    payload.quranProgress = {
      ayahsLearned: quranState.getTotalAyahsLearned(),
      ayahsMemorized: quranState.getTotalAyahsMemorized(),
      surahsCompleted: quranState.getTotalSurahsCompleted(),
      juzCompleted: quranState.getJuzCompleted(),
      overallPercent: quranState.getOverallCompletionPercent(),
    };
  }

  if (module === 'prayer') {
    const prayerState = usePrayerStore.getState();
    payload.prayerProgress = {
      lessonsCompleted: prayerState.getCompletedCount(),
      totalLessons: TOTAL_PRAYER_LESSONS,
      progressPercent: prayerState.getProgressPercent(),
    };
  }

  if (module === 'duas') {
    const duasState = useDuasStore.getState();
    payload.duasProgress = {
      memorizedCount: duasState.getMemorizedCount(),
      favoritesCount: duasState.getFavoritesCount(),
      totalDuas: TOTAL_DUAS,
      memorizedPercent: duasState.getMemorizedPercent(),
    };
  }

  return payload;
}
