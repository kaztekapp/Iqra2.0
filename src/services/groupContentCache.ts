/**
 * What a study group looked like the last time it was open.
 *
 * Opening a group used to start from nothing: spinners until six network
 * calls came back, every time, even for a group left ten seconds earlier.
 * This keeps the last-loaded content for the session so a reopened group
 * paints at once, and the network refreshes it in the background.
 *
 * In memory only, on purpose. Board posts carry their full drawing, which
 * for a whole lesson is large, and persisting that to disk on every open
 * would cost more than it saves. A cold launch pays the network once.
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
}
