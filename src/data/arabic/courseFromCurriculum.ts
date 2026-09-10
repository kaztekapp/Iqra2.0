// Turns one of the app's own lessons into a board course, with no AI.
//
// A group board used to draft its course with a language model, grounded in
// a digest of one of these lessons. The model rewrote what the lesson already
// said, cost credits, and sometimes got it wrong. The lesson itself is the
// course: this reads it directly into the same CourseSpec the board's layout
// engine already draws, so the result looks identical and says exactly what
// the curriculum says.

import type { CourseSpec, CourseSection } from '../../types/aiBoard';
import type { GrammarContent } from '../../types/arabic';
import { grammarLessons } from './grammar';
import { vocabularyThemes, getWordsByTheme } from './vocabulary';

/** A board fits about this many sections before it becomes a scroll. */
const MAX_SECTIONS = 6;
const MAX_WORDS = 8;

/**
 * Lesson prose carries the grammar screen's own markup — [[highlight]] and
 * **bold** — which the board would print literally. Strip it to plain text.
 */
const plain = (s: string): string =>
  s.replace(/\[\[(.*?)\]\]/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1');

const pick = (en?: string, fr?: string | null, lang = 'en'): string =>
  plain(((lang === 'fr' ? fr || en : en) || '').trim());

const clip = (s: string, n: number): string =>
  s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;

/** The opening sentence, which is what a heading wants; the rest is a bullet. */
function splitLead(text: string): [string, string] {
  const m = text.match(/^(.{12,100}?[.!?:])(?:\s+|$)/);
  if (!m) return [clip(text, 90), ''];
  return [clip(m[1].trim(), 100), text.slice(m[0].length).trim()];
}

/** `id` is prefixed as the curriculum list gives it: "g:<lesson>" or "v:<theme>". */
export function courseSpecFromCurriculum(id: string, lang: string): CourseSpec | null {
  const at = id.indexOf(':');
  const kind = id.slice(0, at);
  const rawId = id.slice(at + 1);
  return kind === 'v' ? fromVocabulary(rawId, lang) : fromGrammar(rawId, lang);
}

function fromGrammar(lessonId: string, lang: string): CourseSpec | null {
  const lesson = grammarLessons.find((l) => l.id === lessonId);
  if (!lesson) return null;

  const sections: CourseSection[] = [];
  for (const block of lesson.content) {
    if (sections.length >= MAX_SECTIONS) break;
    const section = sectionFromBlock(block, lang);
    if (section) sections.push(section);
  }
  if (!sections.length) return null;

  return {
    title: pick(lesson.title, lesson.titleFr, lang),
    subtitle: lesson.titleArabic || undefined,
    sections,
    summary: clip(pick(lesson.description, lesson.descriptionFr, lang), 140) || undefined,
  };
}

function sectionFromBlock(b: GrammarContent, lang: string): CourseSection | null {
  const text = pick(b.content, b.contentFr, lang);
  const example = b.examples?.[0];

  // Whichever Arabic the block carries, in order of how deliberate it is.
  const arabic =
    b.arabic ||
    b.arabicDescription ||
    example?.arabic ||
    (b.letters?.length ? b.letters.join('  ') : undefined);
  const translation = b.arabic
    ? pick(b.translation, b.translationFr, lang)
    : b.arabicDescription
      ? pick(b.arabicTranslation, b.arabicTranslationFr, lang)
      : example
        ? pick(example.english, example.french, lang)
        : '';

  if (!text && !arabic) return null;

  const [heading, rest] = text ? splitLead(text) : [translation || '', ''];
  const points: string[] = [];
  if (rest) points.push(clip(rest, 160));
  const second = b.examples?.[1];
  if (second) points.push(`${second.arabic} — ${pick(second.english, second.french, lang)}`);

  return {
    heading,
    points,
    arabic: arabic || undefined,
    translit: b.transliteration || undefined,
    translation: translation || undefined,
  };
}

function fromVocabulary(themeId: string, lang: string): CourseSpec | null {
  const theme = vocabularyThemes.find((t) => t.id === themeId);
  if (!theme) return null;
  const words = getWordsByTheme(themeId).slice(0, MAX_WORDS);
  if (!words.length) return null;

  return {
    title: pick(theme.name, theme.nameFr, lang),
    subtitle: theme.nameArabic || undefined,
    // The heading is the meaning, so no translation line: it would only
    // repeat the heading under the word.
    sections: words.map((w) => ({
      heading: pick(w.english, w.french, lang),
      points: [],
      arabic: w.arabicWithVowels || w.arabic,
      translit: w.transliteration,
    })),
    summary: clip(pick(theme.description, theme.descriptionFr, lang), 140) || undefined,
  };
}
