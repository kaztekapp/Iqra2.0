/**
 * What the app's voices have already said, kept on the phone.
 *
 * Every line used to be synthesized, played, and deleted, so the same dua cost
 * a round trip every time and was silent without a signal. A clip is the same
 * every time it is made - the same words, the same voice, the same tempo - so
 * it is worth keeping, and a line heard once can be heard again on a train
 * with no bars.
 *
 * Files live beside the Quran recitations in the document directory rather
 * than in the cache directory, because the system empties the cache directory
 * whenever it wants space and offline audio that vanishes is not offline
 * audio. The store is capped and the oldest files go first.
 *
 * The directory is made with the legacy FileSystem call, the same one the
 * Quran audio cache has always used on device, and the bytes are written the
 * way every synthesized clip in this app is written. Nothing here invents a
 * new way to touch the disk: the first version of this file did, and the
 * result was a Save button that quietly saved nothing.
 */
import * as LegacyFileSystem from 'expo-file-system/legacy';
import { Directory, File, Paths } from 'expo-file-system';

/** Roughly forty minutes of speech. All 100 duas come to about 7 MB. */
const MAX_BYTES = 30 * 1024 * 1024;

let dirUri: string | null = null;
let dirReady = false;

/**
 * `Paths.document` is native-only and throws where it is unavailable, so it is
 * read on first use and never at import: an exception at module scope would
 * take the whole bundle down before anything rendered.
 */
function storeUri(): string | null {
  if (dirUri) return dirUri;
  try {
    dirUri = `${Paths.document.uri}arabic-voice/`;
    return dirUri;
  } catch {
    return null;
  }
}

/** Make the directory once. Safe to call on every save. */
async function ensureStore(): Promise<string | null> {
  const uri = storeUri();
  if (!uri) return null;
  if (dirReady) return uri;
  try {
    const info = await LegacyFileSystem.getInfoAsync(uri);
    if (!info.exists) {
      await LegacyFileSystem.makeDirectoryAsync(uri, { intermediates: true });
    }
    dirReady = true;
    return uri;
  } catch {
    return null;
  }
}

/**
 * A name for a clip, from everything that decides how it sounds.
 *
 * A collision here would play the wrong line - the wrong verse of the Quran,
 * in a voice that sounds certain - so the name carries two independent hashes
 * over the text, the voice and the tempo, plus the length. djb2 multiplies by
 * 33 and sdbm by 65599, so a pair of texts that collide in one will not
 * collide in the other; 64 bits and a length is not a risk this app runs.
 */
export function clipName(spoken: string, voice: string, rate: string): string {
  const seed = `${voice}|${rate}|${spoken}`;
  let a = 5381;
  let b = 0;
  for (let i = 0; i < seed.length; i++) {
    const c = seed.charCodeAt(i);
    a = ((a << 5) + a + c) >>> 0;
    b = (c + (b << 6) + (b << 16) - b) >>> 0;
  }
  return `${a.toString(36)}-${b.toString(36)}-${seed.length.toString(36)}.mp3`;
}

/**
 * The stored clip for this line, or null if it has never been spoken.
 *
 * Takes the same three things the name is made from, so no caller has to know
 * how a clip is named.
 */
export function findClip(spoken: string, voice: string, rate: string): string | null {
  const uri = storeUri();
  if (!uri) return null;
  try {
    const f = new File(uri + clipName(spoken, voice, rate));
    return f.exists && (f.size ?? 0) > 0 ? f.uri : null;
  } catch {
    return null;
  }
}

/**
 * Keep a clip.
 *
 * Throws rather than returning null when the store will not take it: a save
 * that fails silently is what made this feature look like it worked.
 */
export async function keepClip(name: string, bytes: Uint8Array): Promise<string> {
  const uri = await ensureStore();
  if (!uri) throw new Error('voice_store_unavailable');
  const f = new File(uri + name);
  try {
    if (f.exists) f.delete();
  } catch {
    // An old clip that will not delete is not a reason to fail the write.
  }
  f.write(bytes);
  if (!f.exists || (f.size ?? 0) === 0) throw new Error('voice_store_write_failed');
  return f.uri;
}

/** True when this uri is a kept clip rather than a temporary one. */
export function isKeptClip(uri: string): boolean {
  const dir = storeUri();
  return !!dir && uri.startsWith(dir);
}

/**
 * Drop the oldest clips until the store is under its cap.
 *
 * Called after a save rather than on a timer: the store only grows when
 * something is saved, and walking the directory is cheap next to synthesis.
 */
export function pruneClips(): void {
  const uri = storeUri();
  // Not gated on the directory having been made this session: it survives
  // restarts, and gating meant a store that was full from yesterday was never
  // trimmed until something new was saved into it.
  if (!uri) return;
  try {
    const files = new Directory(uri).list().filter((e): e is File => e instanceof File);
    let total = 0;
    const rows: { f: File; size: number; at: number }[] = [];
    for (const f of files) {
      const size = f.size ?? 0;
      total += size;
      rows.push({ f, size, at: f.modificationTime ?? 0 });
    }
    if (total <= MAX_BYTES) return;
    rows.sort((a, b) => a.at - b.at); // oldest first
    for (const row of rows) {
      if (total <= MAX_BYTES) break;
      try {
        row.f.delete();
        total -= row.size;
      } catch {
        // A file that will not delete is not worth failing a save over.
      }
    }
  } catch {
    // Pruning is housekeeping: never let it break playback.
  }
}

/** How much is stored, in bytes. */
export function clipStoreSize(): number {
  const uri = storeUri();
  if (!uri) return 0;
  try {
    return new Directory(uri)
      .list()
      .filter((e): e is File => e instanceof File)
      .reduce((sum, f) => sum + (f.size ?? 0), 0);
  } catch {
    return 0;
  }
}

/** Forget everything the voices have said. */
export function clearClips(): void {
  const uri = storeUri();
  if (!uri) return;
  try {
    for (const e of new Directory(uri).list()) {
      try {
        e.delete();
      } catch {}
    }
  } catch {}
}
