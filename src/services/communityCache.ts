import AsyncStorage from '@react-native-async-storage/async-storage';
import { DiscussionThread, StudyGroup } from '../types/community';

/**
 * What the community tab looked like last time it was open.
 *
 * The tab used to start from nothing on every visit: a full-screen spinner
 * until Supabase answered, then the list. Leaving for the Quran tab and
 * coming back paid the same price again, and so did switching between
 * Groups and Discussions, because each tab's mount effect refetched and
 * every fetch blanked the list first.
 *
 * Nothing about a study group changes second to second. The last answer is
 * a good answer, so it is kept: in memory for the session and on disk for
 * the next cold launch, painted at once while the network quietly refreshes
 * behind it. The person sees the list, not the loading of the list.
 *
 * This is the same shape as the study-group chat's snapshot - a memory map,
 * a debounced disk copy, a cap on how much is written - kept in its own file
 * because it holds different content and is invalidated at different times.
 */

const DISK_KEY = 'community-cache:v1';

/** Enough to fill more screens than anyone scrolls before the refresh lands. */
const MAX_ROWS = 50;

/** Written a moment after the last change, so a burst of loads writes once. */
const WRITE_DELAY_MS = 800;

export interface CommunityCache {
  groups: StudyGroup[];
  /** Threads by category key; 'all' is the unfiltered list. */
  discussions: Record<string, DiscussionThread[]>;
}

const empty = (): CommunityCache => ({ groups: [], discussions: {} });

let memory: CommunityCache = empty();
let hydrated = false;
let writeTimer: ReturnType<typeof setTimeout> | null = null;

/** The cached rows for this session. Always safe to read, never null. */
export function readCommunityCache(): CommunityCache {
  return memory;
}

/** True once the disk copy has been read, whether or not it held anything. */
export function isCommunityCacheHydrated(): boolean {
  return hydrated;
}

/**
 * Read the disk copy into memory. Called once, early, from the store.
 *
 * A second call is a no-op rather than a second read: the tab mounts three
 * child tabs and any of them may be first.
 */
let hydrating: Promise<CommunityCache> | null = null;
export function hydrateCommunityCache(): Promise<CommunityCache> {
  if (hydrated) return Promise.resolve(memory);
  if (hydrating) return hydrating;
  hydrating = AsyncStorage.getItem(DISK_KEY)
    .then((raw) => {
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.groups)) {
          memory = {
            groups: parsed.groups,
            discussions:
              parsed.discussions && typeof parsed.discussions === 'object' ? parsed.discussions : {},
          };
        }
      }
      return memory;
    })
    .catch(() => memory)
    .finally(() => {
      hydrated = true;
      hydrating = null;
    });
  return hydrating;
}

function scheduleWrite(): void {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    writeTimer = null;
    const copy: CommunityCache = {
      groups: memory.groups.slice(0, MAX_ROWS),
      discussions: {},
    };
    for (const key of Object.keys(memory.discussions)) {
      copy.discussions[key] = memory.discussions[key].slice(0, MAX_ROWS);
    }
    AsyncStorage.setItem(DISK_KEY, JSON.stringify(copy)).catch(() => {});
  }, WRITE_DELAY_MS);
}

/** Keep the groups list. */
export function cacheGroups(groups: StudyGroup[]): void {
  memory = { ...memory, groups };
  scheduleWrite();
}

/** Keep one category's threads. */
export function cacheDiscussions(key: string, threads: DiscussionThread[]): void {
  memory = { ...memory, discussions: { ...memory.discussions, [key]: threads } };
  scheduleWrite();
}

/**
 * Change a cached group in place.
 *
 * Joining a group updates the store immediately so the button responds; the
 * cache has to follow, or leaving the tab and coming back would paint the
 * old membership for as long as the refresh takes.
 */
export function patchCachedGroup(groupId: string, patch: Partial<StudyGroup>): void {
  if (!memory.groups.some((g) => g.id === groupId)) return;
  memory = {
    ...memory,
    groups: memory.groups.map((g) => (g.id === groupId ? { ...g, ...patch } : g)),
  };
  scheduleWrite();
}

/** Drop a group from the cache, for when it has been deleted. */
export function removeCachedGroup(groupId: string): void {
  memory = { ...memory, groups: memory.groups.filter((g) => g.id !== groupId) };
  scheduleWrite();
}

/** Forget everything, for sign-out: another account's groups are not yours. */
export function clearCommunityCache(): void {
  memory = empty();
  if (writeTimer) {
    clearTimeout(writeTimer);
    writeTimer = null;
  }
  AsyncStorage.removeItem(DISK_KEY).catch(() => {});
}
