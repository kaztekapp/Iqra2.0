/**
 * What a story or a dua is spoken as, line by line: the plan both the app
 * and the voice-recording script (scripts/voice) follow, so every recorded
 * clip is exactly the line the app asks for. Pure: no React Native, no store.
 */
import { prepareForSpeech, splitSentences, speechKey, splitQuranRuns, hasHadithRun } from './narrationText';
import { hadithReferenceLine } from './hadithReference';
import { asRecitation } from './speech/voicePlan';
import type { NarrationLang } from './storyAudioService';

export interface NarratableBlock {
  id: string;
  type: 'narrative' | 'quran_source' | 'hadith_source';
  content: string;
  contentFr?: string;
  source?: {
    type: 'quran' | 'hadith';
    translation: string;
    translationFr?: string;
    collection?: string;
    hadithNumber?: string;
    narrator?: string;
  } | null;
}

/**
 * A line of the Quran quoted inside the prose is its own utterance, spoken by
 * the app's Arabic voice — the English and French voices cannot read it.
 */
export type UtteranceLang = NarrationLang | 'ar';

export interface Utterance {
  text: string;
  lang: UtteranceLang;
  blockId: string;
  blockIndex: number;
}


type Localize = (en: string, fr?: string) => string;

/** Words that carry meaning: four letters or more, lower case, punctuation gone. */
function meaningWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[\s.,;:!?"'’‘«»()\[\]\-–—]+/)
      .filter((w) => w.length > 3),
  );
}

/**
 * Does a source card's title line only say again what the paragraph before
 * it just said? Stories introduce an ayah in their own words - "Surah
 * Ar-Rahman says it again: clay like that of pottery" - and the card's title
 * then repeated it - "Surah Ar-Rahman: Clay like that of pottery". Such a
 * line is neither shown nor read; the card's badge still names the surah.
 * Compares the title (after "Surah X:") with the last paragraph before it.
 */
export function restatesBefore(caption: string, before: string | undefined): boolean {
  if (!before) return false;
  const body = caption.includes(':') ? caption.slice(caption.indexOf(':') + 1) : caption;
  const said = meaningWords(body);
  if (said.size < 2) return false;
  const last = before.split('\n').filter((l) => l.trim()).pop() ?? '';
  const prior = meaningWords(last);
  const shared = [...said].filter((w) => prior.has(w)).length;
  return shared / said.size >= 0.6;
}

/** The title line of block `index` is hidden (and not read) when it restates the paragraph before. */
export function sourceLeadHidden(blocks: NarratableBlock[], index: number, lc: Localize): boolean {
  const block = blocks[index];
  const prev = blocks[index - 1];
  if (!block || block.type === 'narrative' || !prev || prev.type !== 'narrative') return false;
  return restatesBefore(lc(block.content, block.contentFr), lc(prev.content, prev.contentFr));
}

/**
 * Flatten a story.
 *
 * A Quran block is read by its caption alone. The caption is the verse put
 * into the story's own words, and reading the ayah and then its meaning
 * after it turns the listening into a recitation drill — lead, Arabic,
 * translation, lead, Arabic, translation — which is not what a story sounds
 * like. The verse is on screen to be read. Where a story sets its ayahs a
 * second time as ﴿Arabic﴾ runs in its prose, that prose is what carries them
 * to the ear, woven into the telling rather than announced.
 *
 * A hadith is reported the way the Quran is: after its card, the story sets
 * it as ⟨Arabic⟩ runs, one segment and its meaning at a time, and those runs
 * carry it to the ear. Before the first of them the reference is said once -
 * collection, number, who reported it - so the listener knows what is being
 * read before it is read. A hadith card that has no runs after it yet keeps
 * reading its translation whole, so nothing is passed over in silence while
 * the stories are being reshaped.
 *
 * A caption that merely restates the line before it is dropped rather than
 * said twice - including a card title that repeats the paragraph introducing
 * it (sourceLeadHidden), which the screen hides the same way.
 */
export function buildUtterances(blocks: NarratableBlock[], lang: NarrationLang, lc: Localize): Utterance[] {
  const out: Utterance[] = [];
  let lastKey = '';

  const push = (raw: string, blockId: string, blockIndex: number) => {
    // A conversation in the story quotes the Quran line by line: the Arabic
    // first, then its meaning. "Musa said," is read by the story's voice, the
    // Arabic by the Arabic voice, and the meaning by the story's voice again
    // — the same cadence a teacher uses.
    for (const segment of splitQuranRuns(raw)) {
      if (segment.kind === 'quran' || segment.kind === 'hadith') {
        const key = speechKey(segment.text);
        if (!key || key === lastKey) continue;
        lastKey = key;
        // The Quran is recited (wasl, waqf); a hadith is read.
        const text = segment.kind === 'quran' ? asRecitation(segment.text) : segment.text;
        out.push({ text, lang: 'ar', blockId, blockIndex });
        continue;
      }
      const prepared = prepareForSpeech(segment.text, lang);
      for (const sentence of splitSentences(prepared)) {
        const key = speechKey(sentence);
        if (!key || key === lastKey) continue;
        lastKey = key;
        out.push({ text: sentence, lang, blockId, blockIndex });
      }
    }
  };

  blocks.forEach((block, blockIndex) => {
    const caption = lc(block.content, block.contentFr);
    if (block.type === 'narrative') {
      push(caption, block.id, blockIndex);
      return;
    }
    if (!sourceLeadHidden(blocks, blockIndex, lc)) push(caption, block.id, blockIndex);

    const isHadith = block.source?.type === 'hadith';
    // The paragraph before already named this hadith ("... Sahih al-Bukhari
    // 3364"): its reference is not read a second time.
    const number = block.source?.hadithNumber != null ? String(block.source.hadithNumber) : '';
    const prior = blocks[blockIndex - 1];
    const citedBefore =
      !!number && prior?.type === 'narrative' && new RegExp(`\\b${number}\\b`).test(lc(prior.content, prior.contentFr));
    if (isHadith && block.source && !citedBefore) {
      push(
        hadithReferenceLine(
          {
            collection: block.source.collection ?? '',
            hadithNumber: block.source.hadithNumber,
            narrator: block.source.narrator,
          },
          lang,
        ),
        block.id,
        blockIndex,
      );
    }

    const translation = block.source ? lc(block.source.translation, block.source.translationFr) : '';
    if (!translation) return;

    const next = blocks[blockIndex + 1];
    const hasRuns = isHadith && next?.type === 'narrative' && hasHadithRun(lc(next.content, next.contentFr));

    // Read a verse only when there is no caption to carry the block, so that
    // a block without one is never passed over in silence. A hadith is read
    // whole only until its runs exist.
    const readsTranslation = (isHadith && !hasRuns) || !caption.trim();
    if (readsTranslation) push(translation, block.id, blockIndex);
  });

  return out;
}

