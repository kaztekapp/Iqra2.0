import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * What a study group looked like the last time it was open.
 *
 * Opening a group used to start from nothing: spinners until six network
 * calls came back, every time, even for a group left ten seconds earlier.
 * This keeps the last-loaded content for the session so a reopened group
 * paints at once, and the network refreshes it in the background.
 *
 * Two layers. In memory for the session, and a trimmed copy on disk so a
 * cold launch paints the last forty messages before the network answers.
 * The disk copy drops board drawings (a whole lesson's strokes can run to
 * hundreds of kilobytes); a board shows as an empty card for the second it
 * takes the refresh to fill it in.
 */
export interface GroupSnapshot {
  messages: any[];
  reactions: Record<string, any[]>;
  members: any[];
  sessions: any[];
  challenges: any[];
  leaderboard: any[];
}

/** Enough for the groups someone flips between; the oldest is dropped. */
const MAX_GROUPS = 8;

const snapshots = new Map<string, GroupSnapshot>();

export function getGroupSnapshot(groupId: string): GroupSnapshot | null {
  const s = snapshots.get(groupId);
  if (!s) return null;
  // Re-insert so the most recently opened group is the last to be evicted.
  snapshots.delete(groupId);
  snapshots.set(groupId, s);
  return s;
}

export function setGroupSnapshot(groupId: string, snapshot: GroupSnapshot): void {
  snapshots.delete(groupId);
  snapshots.set(groupId, snapshot);
  while (snapshots.size > MAX_GROUPS) {
    const oldest = snapshots.keys().next().value;
    if (oldest === undefined) break;
    snapshots.delete(oldest);
  }
}

export function clearGroupSnapshot(groupId: string): void {
  snapshots.delete(groupId);
  AsyncStorage.removeItem(DISK_KEY + groupId).catch(() => {});
}

// ---- disk ------------------------------------------------------------------

const DISK_KEY = 'group-snapshot:';
const DISK_MESSAGES = 40;
const timers = new Map<string, ReturnType<typeof setTimeout>>();

/** A message with any board drawing stripped, so the disk copy stays small. */
function slim(m: any): any {
  if (m?.type === 'board' && m.classContent?.elements?.length) {
    return { ...m, classContent: { ...m.classContent, elements: [] } };
  }
  return m;
}

/** Write the snapshot to disk, a moment after the last change. */
export function persistGroupSnapshot(groupId: string, snapshot: GroupSnapshot): void {
  const pending = timers.get(groupId);
  if (pending) clearTimeout(pending);
  timers.set(
    groupId,
    setTimeout(() => {
      timers.delete(groupId);
      const messages = snapshot.messages.slice(-DISK_MESSAGES).map(slim);
      const ids = new Set(messages.map((m) => m.id));
      const reactions: Record<string, any[]> = {};
      for (const k of Object.keys(snapshot.reactions)) if (ids.has(k)) reactions[k] = snapshot.reactions[k];
      const copy: GroupSnapshot = { ...snapshot, messages, reactions };
      AsyncStorage.setItem(DISK_KEY + groupId, JSON.stringify(copy)).catch(() => {});
    }, 800)
  );
}

/** The last snapshot written to disk for this group, if any. */
export async function loadPersistedGroupSnapshot(groupId: string): Promise<GroupSnapshot | null> {
  try {
    const raw = await AsyncStorage.getItem(DISK_KEY + groupId);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.messages)) return null;
    return parsed as GroupSnapshot;
  } catch {
    return null;
  }
}
