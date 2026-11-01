/**
 * What a story or a dua is spoken as, line by line: the plan both the app
 * and the voice-recording script (scripts/voice) follow, so every recorded
 * clip is exactly the line the app asks for. Pure: no React Native, no store.
 */
import { prepareForSpeech, splitSentences, speechKey, splitQuranRuns, hasHadithRun } from './narrationText';
import { hadithReferenceLine } from './hadithReference';
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
 * said twice.
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
        out.push({ text: segment.text, lang: 'ar', blockId, blockIndex });
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
    push(caption, block.id, blockIndex);

    const isHadith = block.source?.type === 'hadith';
    if (isHadith && block.source) {
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

