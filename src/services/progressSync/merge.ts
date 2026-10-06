/**
 * How two copies of someone's progress become one, when they have studied on
 * two phones. Pure functions: no storage, no network, so they can be tested.
 *
 * Progress mostly only grows, so the rules lean towards keeping everything:
 * - lists (letters learned, words, bookmarks) are joined;
 * - running totals (XP, attempts, best scores) keep the larger number;
 * - "done" flags (passed, mastered) stay true once either phone set them;
 * - dates keep the later one;
 * - anything else (settings, the streak) comes from the copy changed last.
 */

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type StoreSnapshot = { version: number; state: Json };

export type ProgressSnapshot = {
  format: 1;
  /** Bumped by "Reset all progress"; a newer epoch replaces an older one outright. */
  epoch: number;
  /** When this copy last changed. Empty on a phone that has never changed anything. */
  changedAt: string;
  stores: Record<string, StoreSnapshot>;
};

/** Numbers under these keys only grow, so the larger one is the right one. */
const GROWS = /xp|longest|total|completed|correct|attempt|best|count|tensesReviewed/i;
/** Flags under these keys stay true once set on either phone. */
const STICKY = /passed|mastered|completed|learned|memorized|finished|unlocked|read/i;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;

type Side = 'local' | 'remote';

function isPlainObject(v: Json | undefined): v is { [key: string]: Json } {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function identity(item: Json): string {
  if (isPlainObject(item)) {
    const id = item.id ?? item.surahId ?? item.letterId ?? item.wordId ?? item.storyId;
    if (typeof id === 'string' || typeof id === 'number') return `id:${id}`;
  }
  return `json:${JSON.stringify(item)}`;
}

function mergeArrays(local: Json[], remote: Json[], path: string[], newer: Side): Json[] {
  const byId = new Map<string, Json>();
  // The older side goes in first so the newer side's version of an item wins,
  // after being merged with it.
  const [first, second] = newer === 'local' ? [remote, local] : [local, remote];
  for (const item of first) byId.set(identity(item), item);
  for (const item of second) {
    const key = identity(item);
    const existing = byId.get(key);
    byId.set(key, existing === undefined ? item : mergeValue(
      newer === 'local' ? item : existing,
      newer === 'local' ? existing : item,
      path,
      newer,
    ));
  }
  return [...byId.values()];
}

export function mergeValue(local: Json | undefined, remote: Json | undefined, path: string[], newer: Side): Json {
  if (local === undefined || local === null) return remote ?? null;
  if (remote === undefined || remote === null) return local;
  const pick = newer === 'local' ? local : remote;

  if (Array.isArray(local) && Array.isArray(remote)) return mergeArrays(local, remote, path, newer);
  if (isPlainObject(local) && isPlainObject(remote)) {
    const out: { [key: string]: Json } = {};
    for (const k of new Set([...Object.keys(local), ...Object.keys(remote)])) {
      out[k] = mergeValue(local[k], remote[k], [...path, k], newer);
    }
    return out;
  }
  if (typeof local === 'number' && typeof remote === 'number') {
    return path.some((p) => GROWS.test(p)) ? Math.max(local, remote) : pick;
  }
  if (typeof local === 'boolean' && typeof remote === 'boolean') {
    return path.some((p) => STICKY.test(p)) ? local || remote : pick;
  }
  if (typeof local === 'string' && typeof remote === 'string' && ISO_DATE.test(local) && ISO_DATE.test(remote)) {
    return local > remote ? local : remote;
  }
  return pick;
}

/**
 * The streak belongs to whichever phone studied most recently: taking the
 * larger number would revive a streak that has since been broken.
 */
function fixStreak(merged: Json, local: Json, remote: Json): Json {
  const m = isPlainObject(merged) ? merged.progress : undefined;
  const l = isPlainObject(local) ? local.progress : undefined;
  const r = isPlainObject(remote) ? remote.progress : undefined;
  if (!isPlainObject(m) || !isPlainObject(l) || !isPlainObject(r)) return merged;
  const lDate = typeof l.lastStudyDate === 'string' ? l.lastStudyDate : '';
  const rDate = typeof r.lastStudyDate === 'string' ? r.lastStudyDate : '';
  const latest = lDate >= rDate ? l : r;
  m.currentStreak = latest.currentStreak ?? 0;
  m.lastStudyDate = latest.lastStudyDate ?? '';
  return merged;
}

export function mergeSnapshots(local: ProgressSnapshot, remote: ProgressSnapshot): ProgressSnapshot {
  if (local.epoch !== remote.epoch) return local.epoch > remote.epoch ? local : remote;
  const newer: Side = local.changedAt > remote.changedAt ? 'local' : 'remote';
  const stores: Record<string, StoreSnapshot> = {};
  for (const name of new Set([...Object.keys(local.stores), ...Object.keys(remote.stores)])) {
    const l = local.stores[name];
    const r = remote.stores[name];
    if (!l || !r) { stores[name] = (l ?? r)!; continue; }
    // Different saved formats cannot be merged field by field; keep the newer format.
    if (l.version !== r.version) { stores[name] = l.version > r.version ? l : r; continue; }
    let state = mergeValue(l.state, r.state, [], newer);
    if (name === 'progress') state = fixStreak(state, l.state, r.state);
    stores[name] = { version: l.version, state };
  }
  return {
    format: 1,
    epoch: local.epoch,
    changedAt: local.changedAt > remote.changedAt ? local.changedAt : remote.changedAt,
    stores,
  };
}
