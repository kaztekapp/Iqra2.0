// Turns one of the app's own lessons into a board course, with no AI.
//
// A group board used to draft its course with a language model, grounded in
// a digest of one of these lessons. The model rewrote what the lesson already
// said, cost credits, and sometimes got it wrong. The lesson itself is the
// course: this reads it directly into the same CourseSpec the board's layout
// engine already draws, so the result looks identical and says exactly what
// the curriculum says.
//
// It carries the whole lesson. An earlier version kept six sections, one
// example per block and eight words per theme, and the course on the board
// was visibly missing most of the lesson. Nothing is capped or clipped now:
// the board grows to fit and the viewer scrolls it.

import type { CourseSpec, CourseSection } from '../../types/aiBoard';
import type { GrammarContent } from '../../types/arabic';
import { grammarLessons } from './grammar';
import { vocabularyThemes, getWordsByTheme } from './vocabulary';

/**
 * Lesson prose carries the grammar screen's own markup — [[highlight]] and
 * **bold** — which the board would print literally. Strip it to plain text.
 */
const plain = (s: string): string =>
  s.replace(/\[\[(.*?)\]\]/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1');

const pick = (en?: string, fr?: string | null, lang = 'en'): string =>
  plain(((lang === 'fr' ? fr || en : en) || '').trim());

/** Sentences, each of which becomes a bullet. Nothing is dropped. */
const sentences = (text: string): string[] =>
  text.split(/(?<=[.!?:])\s+/).map((s) => s.trim()).filter(Boolean);

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
  for (const block of lesson.content) sections.push(...sectionsFromBlock(block, lang));
  if (!sections.length) return null;

  return {
    title: pick(lesson.title, lesson.titleFr, lang),
    subtitle: lesson.titleArabic || undefined,
    sections,
    summary: pick(lesson.description, lesson.descriptionFr, lang) || undefined,
  };
}

/**
 * One block can become several sections: its own prose, then one section per
 * example and per comparison, so every Arabic item gets a proper card rather
 * than being folded into a bullet.
 */
function sectionsFromBlock(b: GrammarContent, lang: string): CourseSection[] {
  const out: CourseSection[] = [];
  const text = pick(b.content, b.contentFr, lang);
  const lines = sentences(text);

  // The block's own Arabic, if it carries one directly.
  const ownArabic = b.arabic || b.arabicDescription || (b.letters?.length ? b.letters.join('  ') : undefined);
  const ownTranslation = b.arabic
    ? pick(b.translation, b.translationFr, lang)
    : b.arabicDescription
      ? pick(b.arabicTranslation, b.arabicTranslationFr, lang)
      : '';

  const points = lines.slice(1);

  // A table is carried as one bullet per row, headers first.
  const table = lang === 'fr' && b.tableDataFr ? b.tableDataFr : b.tableData;
  if (table) {
    if (table.headers?.length) points.push(table.headers.map(plain).join('  |  '));
    for (const row of table.rows || []) points.push(row.map(plain).join('  |  '));
  }

  if (lines.length || ownArabic || points.length) {
    out.push({
      heading: lines[0] || ownTranslation || '',
      points,
      arabic: ownArabic || undefined,
      translit: b.transliteration || undefined,
      translation: ownTranslation || undefined,
    });
  }

  for (const ex of b.examples || []) {
    out.push({ heading: pick(ex.english, ex.french, lang), points: [], arabic: ex.arabic });
  }

  if (b.comparisons?.length) {
    const left = pick(b.leftLabel, b.leftLabelFr, lang);
    const right = pick(b.rightLabel, b.rightLabelFr, lang);
    for (const c of b.comparisons) {
      const l = pick(c.left.label, c.left.labelFr, lang);
      const r = pick(c.right.label, c.right.labelFr, lang);
      out.push({
        heading: left && right ? `${left} → ${right}` : `${l} → ${r}`,
        points: [],
        arabic: `${c.left.arabic}   ←   ${c.right.arabic}`,
        translation: `${l} → ${r}`,
      });
    }
  }

  return out;
}

function fromVocabulary(themeId: string, lang: string): CourseSpec | null {
  const theme = vocabularyThemes.find((t) => t.id === themeId);
  if (!theme) return null;
  const words = getWordsByTheme(themeId);
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
    summary: pick(theme.description, theme.descriptionFr, lang) || undefined,
  };
}
