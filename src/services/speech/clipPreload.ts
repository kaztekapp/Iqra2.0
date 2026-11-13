import { preload, clearPreloadedSource } from 'expo-audio';
import { quietly } from '../../lib/report';

/**
 * Hand a clip that is about to play to the player ahead of time.
 *
 * A story is a chain of one-sentence clips. On an iPhone each clip, swapped
 * into the player when its turn came, took about a second to load before a
 * sound came out: measured on the simulator, the 0.26 s the narration asks
 * for between two sentences came out as 1.5 s, at every sentence and every
 * change of voice. expo-audio keeps a preloaded clip ready; `replace()` and a
 * new player both pick it up by its URI and start at once.
 *
 * Best effort: a build without the native call, or a failed preload, only
 * means the clip loads the old way.
 */
const ready = new Set<string>();
const LIMIT = 6;

export function preloadClip(uri: string): void {
  if (!uri || ready.has(uri)) return;
  if (ready.size >= LIMIT) {
    const oldest = ready.values().next().value as string;
    forgetClip(oldest);
  }
  ready.add(uri);
  try {
    preload({ uri }).catch((e) => {
      ready.delete(uri);
      quietly(e, 'services/speech/clipPreload');
    });
  } catch (e) {
    ready.delete(uri);
    quietly(e, 'services/speech/clipPreload');
  }
}

/** Let a preloaded clip go: it was played (the player took it) or never will be. */
export function forgetClip(uri: string): void {
  if (!ready.delete(uri)) return;
  try {
    clearPreloadedSource({ uri }).catch(() => {});
  } catch { /* nothing held */ }
}

/**
 * The player has the clip now: let the preloaded copy go. Call it after the
 * player was created with, or swapped to, this clip.
 *
 * iOS hands the preloaded copy over to the player, so this frees nothing
 * there. Android only lends it: the clip's bytes stayed in memory until
 * cleared, one more for every sentence of a story, until the system killed
 * the app in the background. (The player keeps its own reference.)
 */
export function clipTaken(uri: string): void {
  ready.delete(uri);
  try {
    clearPreloadedSource({ uri }).catch(() => {});
  } catch { /* nothing held */ }
}
