/**
 * A small objectionable-word filter for community text.
 *
 * App Store guideline 1.2 and Google Play's user-generated content policy
 * ask for a way to filter objectionable material. This is that first line:
 * a short English and French list matched on whole words, applied when a
 * message, thread or reply is sent and again when one is shown (so text
 * written before the filter existed, or by an older app, is masked too).
 * Reports and blocking catch what a word list cannot.
 *
 * Matching is on whole words only, so "class" or "Scunthorpe" pass. Case and
 * Latin accents are ignored ("ENCULÉ" matches "encule"). Arabic script is
 * never altered: the list is Latin-only and an Arabic word cannot match it.
 */

const WORDS = [
  // English
  'fuck', 'fucks', 'fucked', 'fucker', 'fuckers', 'fucking', 'motherfucker', 'motherfuckers',
  'shit', 'shits', 'shitty', 'bullshit', 'bitch', 'bitches', 'bastard', 'bastards',
  'asshole', 'assholes', 'cunt', 'cunts', 'dickhead', 'pussy', 'whore', 'whores',
  'slut', 'sluts', 'nigger', 'niggers', 'nigga', 'niggas', 'faggot', 'faggots', 'fag',
  'retard', 'retarded', 'wanker', 'twat', 'porn', 'porno',
  // French
  'merde', 'putain', 'pute', 'putes', 'salope', 'salopes', 'salaud', 'salauds',
  'connard', 'connards', 'connasse', 'connasses', 'encule', 'encules', 'enculee',
  'niquer', 'nique', 'ntm', 'fdp', 'batard', 'batards', 'pede', 'pedes', 'tapette',
  'bougnoule', 'bougnoules', 'negre', 'negres', 'couille', 'couilles',
];

const BLOCKED = new Set(WORDS);

/** Letters and digits of any script; everything else separates words. */
const WORD_RE = /[\p{L}\p{N}]+/gu;

export const MASK = '***';

/** Lower-case and drop Latin accents, for comparison only. */
function fold(word: string): string {
  return word.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** True when the text contains at least one blocked word. */
export function containsProfanity(text: string | null | undefined): boolean {
  if (!text) return false;
  for (const m of text.matchAll(WORD_RE)) {
    if (BLOCKED.has(fold(m[0]))) return true;
  }
  return false;
}

/** The text with every blocked word replaced by `***`. Everything else is kept as written. */
export function maskProfanity(text: string): string;
export function maskProfanity(text: string | null | undefined): string | null | undefined;
export function maskProfanity(text: string | null | undefined): string | null | undefined {
  if (!text) return text;
  return text.replace(WORD_RE, (word) => (BLOCKED.has(fold(word)) ? MASK : word));
}
