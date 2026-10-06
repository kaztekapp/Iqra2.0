/**
 * Progress sync: keeps a copy of the signed-in person's learning progress in
 * Supabase (table user_progress_sync, one row each) so it follows them to
 * another phone.
 *
 * - On sign-in and whenever the app comes back to the foreground, the saved
 *   copy is downloaded and combined with this phone's (see merge.ts).
 * - A few seconds after progress changes, the phone's copy is uploaded.
 * - The phone remembers whose progress it holds. When a different account
 *   signs in, the phone switches to that account's progress instead of
 *   mixing the two people together.
 *
 * Every failure is reported quietly: progress always keeps working on the
 * phone, and the next sync catches up.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StoreApi, UseBoundStore } from 'zustand';
import { supabase } from '../../lib/supabase';
import { quietly } from '../../lib/report';
import { useProgressStore } from '../../stores/progressStore';
import { useQuranStore } from '../../stores/quranStore';
import { useDuasStore } from '../../stores/duasStore';
import { usePrayerStore } from '../../stores/prayerStore';
import { useProphetStoriesStore } from '../../stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../stores/quranStoriesStore';
import { useArabicTextsStore } from '../../stores/arabicTextsStore';
import { useArabicQuizStore } from '../../stores/arabicQuizStore';
import { useGrammarQuizStore } from '../../stores/grammarQuizStore';
import { mergeSnapshots, type Json, type ProgressSnapshot } from './merge';

type PersistedStore = UseBoundStore<StoreApi<object>> & {
  persist: {
    getOptions: () => {
      partialize?: (state: object) => object;
      version?: number;
      migrate?: (persisted: unknown, version: number) => unknown;
    };
    hasHydrated: () => boolean;
    onFinishHydration: (fn: () => void) => () => void;
  };
};

/**
 * The stores that hold learning progress, and the keys in them that belong
 * to the phone rather than the person (a quiz in progress, a pop-up waiting
 * to show, the question bank's version).
 */
const SYNCED: { name: string; store: PersistedStore; deviceOnly: string[] }[] = [
  { name: 'progress', store: useProgressStore as unknown as PersistedStore, deviceOnly: ['newAchievement'] },
  { name: 'quran', store: useQuranStore as unknown as PersistedStore, deviceOnly: [] },
  { name: 'duas', store: useDuasStore as unknown as PersistedStore, deviceOnly: [] },
  { name: 'prayer', store: usePrayerStore as unknown as PersistedStore, deviceOnly: [] },
  { name: 'prophetStories', store: useProphetStoriesStore as unknown as PersistedStore, deviceOnly: [] },
  { name: 'quranStories', store: useQuranStoriesStore as unknown as PersistedStore, deviceOnly: [] },
  { name: 'arabicTexts', store: useArabicTextsStore as unknown as PersistedStore, deviceOnly: [] },
  { name: 'arabicQuiz', store: useArabicQuizStore as unknown as PersistedStore, deviceOnly: ['currentQuestions', 'dataVersion'] },
  { name: 'grammarQuiz', store: useGrammarQuizStore as unknown as PersistedStore, deviceOnly: ['currentQuestions', 'dataVersion'] },
];

const META_KEY = 'iqra-progress-sync';
const PUSH_DELAY_MS = 5_000;
const FOREGROUND_MIN_GAP_MS = 60_000;

type Meta = {
  /** Whose progress this phone holds; null before the first sync. */
  owner: string | null;
  epoch: number;
  changedAt: string;
  /** What was last uploaded, to skip uploads when nothing changed. */
  lastPushed: string | null;
};

let meta: Meta = { owner: null, epoch: 0, changedAt: '', lastPushed: null };
let metaLoaded = false;
let applying = false;
let running: Promise<void> | null = null;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let lastForegroundSync = 0;
let currentUser: string | null = null;

async function loadMeta(): Promise<void> {
  if (metaLoaded) return;
  try {
    const raw = await AsyncStorage.getItem(META_KEY);
    if (raw) meta = { ...meta, ...(JSON.parse(raw) as Partial<Meta>) };
  } catch (e) {
    quietly(e, 'progressSync.loadMeta');
  }
  metaLoaded = true;
}

async function saveMeta(): Promise<void> {
  try {
    await AsyncStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch (e) {
    quietly(e, 'progressSync.saveMeta');
  }
}

function waitForHydration(): Promise<void> {
  return Promise.all(
    SYNCED.map(({ store }) =>
      store.persist.hasHydrated()
        ? Promise.resolve()
        : new Promise<void>((resolve) => { const off = store.persist.onFinishHydration(() => { off(); resolve(); }); }),
    ),
  ).then(() => undefined);
}

/** This phone's progress, as plain JSON, without anything device-only. */
function captureStores(): ProgressSnapshot['stores'] {
  const stores: ProgressSnapshot['stores'] = {};
  for (const { name, store, deviceOnly } of SYNCED) {
    const options = store.persist.getOptions();
    const persisted = options.partialize ? options.partialize(store.getState()) : store.getState();
    const state = JSON.parse(JSON.stringify(persisted)) as Record<string, Json>;
    for (const key of deviceOnly) delete state[key];
    stores[name] = { version: options.version ?? 0, state };
  }
  return stores;
}

function localSnapshot(): ProgressSnapshot {
  return { format: 1, epoch: meta.epoch, changedAt: meta.changedAt, stores: captureStores() };
}

/**
 * Writes a snapshot into the stores. With `replace`, each store starts from
 * its empty state first, so nothing of the previous person is left behind.
 */
function applySnapshot(snapshot: ProgressSnapshot | null, replace: boolean): void {
  applying = true;
  try {
    for (const { name, store } of SYNCED) {
      if (replace) store.setState(store.getInitialState(), true);
      const saved = snapshot?.stores[name];
      if (!saved) continue;
      const options = store.persist.getOptions();
      const current = options.version ?? 0;
      let state: unknown = saved.state;
      if (saved.version < current && options.migrate) state = options.migrate(state, saved.version);
      if (saved.version > current) continue; // saved by a newer app; leave it for that app
      store.setState(state as object);
    }
  } finally {
    applying = false;
  }
}

async function pull(userId: string): Promise<ProgressSnapshot | null | 'failed'> {
  if (!supabase) return 'failed';
  const { data, error } = await supabase
    .from('user_progress_sync')
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) { quietly(error, 'progressSync.pull'); return 'failed'; }
  return (data?.data as ProgressSnapshot | undefined) ?? null;
}

async function push(userId: string, snapshot: ProgressSnapshot): Promise<boolean> {
  if (!supabase) return false;
  const body = JSON.stringify(snapshot);
  if (body === meta.lastPushed) return true;
  const { error } = await supabase
    .from('user_progress_sync')
    .upsert({ user_id: userId, data: snapshot, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (error) { quietly(error, 'progressSync.push'); return false; }
  meta.lastPushed = body;
  await saveMeta();
  return true;
}

/** Notes a local change if the phone's progress differs from what was last uploaded. */
function noteLocalChange(snapshot: ProgressSnapshot): ProgressSnapshot {
  if (meta.lastPushed === null) return snapshot;
  const previous = JSON.parse(meta.lastPushed) as ProgressSnapshot;
  if (JSON.stringify(previous.stores) !== JSON.stringify(snapshot.stores)) {
    meta.changedAt = new Date().toISOString();
    return { ...snapshot, changedAt: meta.changedAt };
  }
  return snapshot;
}

async function runSync(userId: string): Promise<void> {
  await loadMeta();
  await waitForHydration();

  const remote = await pull(userId);
  if (remote === 'failed') return; // never upload over a copy we could not read

  if (meta.owner && meta.owner !== userId) {
    // Another person's progress is on this phone: switch to this account's.
    applySnapshot(remote, true);
    meta = { owner: userId, epoch: remote?.epoch ?? 0, changedAt: remote?.changedAt ?? '', lastPushed: remote ? JSON.stringify(remote) : null };
    await saveMeta();
    return;
  }

  const local = noteLocalChange(localSnapshot());
  if (!remote) {
    meta.owner = userId;
    await push(userId, local);
    await saveMeta();
    return;
  }

  const merged = mergeSnapshots(local, remote);
  if (JSON.stringify(merged.stores) !== JSON.stringify(local.stores)) applySnapshot(merged, false);
  meta = { ...meta, owner: userId, epoch: merged.epoch, changedAt: merged.changedAt };
  meta.lastPushed = JSON.stringify(remote);
  await push(userId, { ...localSnapshot(), changedAt: merged.changedAt });
  await saveMeta();
}

/** Download, combine and upload for the signed-in person. Safe to call often. */
export function syncProgress(userId: string): Promise<void> {
  currentUser = userId;
  if (!running) {
    running = runSync(userId)
      .catch((e) => quietly(e, 'progressSync.sync'))
      .finally(() => { running = null; });
  }
  return running;
}

/** Called when the app returns to the foreground; at most once a minute. */
export function syncOnForeground(): void {
  if (!currentUser || Date.now() - lastForegroundSync < FOREGROUND_MIN_GAP_MS) return;
  lastForegroundSync = Date.now();
  void syncProgress(currentUser);
}

function schedulePush(): void {
  if (applying || !currentUser || meta.owner !== currentUser) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    void flushProgress();
  }, PUSH_DELAY_MS);
}

/** Uploads pending changes now. Used before signing out. */
export async function flushProgress(): Promise<void> {
  const userId = currentUser;
  if (!userId || meta.owner !== userId) return;
  if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
  try {
    await push(userId, noteLocalChange(localSnapshot()));
  } catch (e) {
    quietly(e, 'progressSync.flush');
  }
}

/** "Reset all progress": the reset copy replaces the saved one on every phone. */
export function markProgressReset(): void {
  meta.epoch = Date.now();
  meta.changedAt = new Date().toISOString();
  void saveMeta();
  void flushProgress();
}

/** Signed out: stop uploading. The phone keeps its progress and remembers whose it is. */
export function stopProgressSync(): void {
  currentUser = null;
  if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
}

/** Account deleted: its saved copy is gone, and the phone no longer belongs to it. */
export async function forgetProgressOwner(): Promise<void> {
  stopProgressSync();
  meta = { owner: null, epoch: 0, changedAt: '', lastPushed: null };
  await saveMeta();
}

/** Starts watching the synced stores for changes. Call once, at startup. */
export function watchProgressChanges(): () => void {
  const offs = SYNCED.map(({ store }) => store.subscribe(schedulePush));
  return () => offs.forEach((off) => off());
}
