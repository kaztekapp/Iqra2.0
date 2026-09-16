/**
 * What Hamed has already said, kept on the phone.
 *
 * Every Arabic line used to be synthesized, played, and deleted, so the same
 * dua cost a round trip every single time and was silent without a signal. A
 * clip is the same every time it is made - the same words, the same voice, the
 * same tempo - so it is worth keeping, and a line heard once can be heard
 * again on a train with no bars.
 *
 * Files live beside the Quran recitations in the document directory rather
 * than in the cache directory, because the system empties the cache directory
 * whenever it wants space and offline audio that vanishes is not offline
 * audio. The store is capped and the oldest files go first.
 */
import { Directory, File, Paths } from 'expo-file-system';

/** Roughly forty minutes of speech. Duas and hadith come to a third of it. */
const MAX_BYTES = 30 * 1024 * 1024;

let dir: Directory | null = null;

/**
 * `Paths.document` is native-only and throws where it is unavailable, so it is
 * read on first use and never at import: an exception at module scope would
 * take the whole bundle down before anything rendered.
 */
function store(): Directory | null {
  if (dir) return dir;
  try {
    const d = new Directory(Paths.document, 'arabic-voice');
    if (!d.exists) d.create({ intermediates: true });
    dir = d;
    return d;
  } catch {
    return null;
  }
}

/**
 * A name for a clip, from everything that decides how it sounds.
 *
 * djb2 over the text, the voice and the tempo. A hash collision would play the
 * wrong line, so the length goes into the name as well - two different verses
 * that collide AND match in length are not something this app will meet.
 */
export function clipName(spoken: string, voice: string, rate: string): string {
  const seed = `${voice}|${rate}|${spoken}`;
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0;
  return `${h.toString(36)}-${seed.length.toString(36)}.mp3`;
}

/**
 * The stored clip for this line, or null if it has never been spoken.
 *
 * Takes the same three things the name is made from, so no caller has to know
 * how a clip is named.
 */
export function findClip(spoken: string, voice: string, rate: string): string | null {
  const d = store();
  if (!d) return null;
  try {
    const f = new File(d, clipName(spoken, voice, rate));
    return f.exists && f.size > 0 ? f.uri : null;
  } catch {
    return null;
  }
}

/** Keep a clip. Returns its uri, or null if it could not be stored. */
export function keepClip(name: string, bytes: Uint8Array): string | null {
  const d = store();
  if (!d) return null;
  try {
    const f = new File(d, name);
    if (f.exists) f.delete();
    f.create();
    f.write(bytes);
    return f.uri;
  } catch {
    return null;
  }
}

/** True when this uri is a kept clip rather than a temporary one. */
export function isKeptClip(uri: string): boolean {
  const d = store();
  return !!d && uri.startsWith(d.uri);
}

/**
 * Drop the oldest clips until the store is under its cap.
 *
 * Called after a save rather than on a timer: the store only grows when
 * something is saved, and walking the directory is cheap next to synthesis.
 */
export function pruneClips(): void {
  const d = store();
  if (!d) return;
  try {
    const files = d.list().filter((e): e is File => e instanceof File);
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

/** How much is stored, in bytes. For a settings screen or a download check. */
export function clipStoreSize(): number {
  const d = store();
  if (!d) return 0;
  try {
    return d
      .list()
      .filter((e): e is File => e instanceof File)
      .reduce((sum, f) => sum + (f.size ?? 0), 0);
  } catch {
    return 0;
  }
}

/** Forget everything Hamed has said. */
export function clearClips(): void {
  const d = store();
  if (!d) return;
  try {
    for (const e of d.list()) {
      try {
        e.delete();
      } catch {}
    }
  } catch {}
}
