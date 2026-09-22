import { AppState, Linking, Platform } from 'react-native';
import { router } from 'expo-router';
import i18n from 'i18next';
import { useSettingsStore } from '../../stores/settingsStore';
import { useProgressStore, ModuleType } from '../../stores/progressStore';
import { useQuranStore } from '../../stores/quranStore';
import { useProphetStoriesStore } from '../../stores/prophetStoriesStore';
import { useQuranStoriesStore } from '../../stores/quranStoriesStore';
import { PROPHETS } from '../../data/arabic/prophets/prophets';
import { getQuranStoryById } from '../../data/arabic/quranStories';
import { getSurahMetadataById } from '../staticQuranService';
import { quietly } from '../../lib/report';
import { planReminders, PlannedReminder, ReminderInputs, ResumeTarget } from './plan';

/**
 * Local reminders: "continue the story of Musa", "your 12-day streak ends at
 * midnight", "8 verses are due", "it's Friday — Surah al-Kahf". Scheduled on
 * the device, so they need no server and work offline.
 *
 * What to schedule is decided in `./plan.ts`; this file only gathers the
 * inputs, talks to the OS and routes a tap to the right screen.
 *
 * expo-notifications is loaded lazily, inside `native()`. The module throws
 * on import when its native side is missing, and an OTA update reaches
 * builds made before it was added; a top-level import would crash every one
 * of those at launch. Until the next store build, reminders simply report
 * themselves unavailable.
 */

type Notifications = typeof import('expo-notifications');

let nativeModule: Notifications | null | undefined;
function native(): Notifications | null {
  if (nativeModule === undefined) {
    try {
      nativeModule = require('expo-notifications') as Notifications;
    } catch {
      nativeModule = null;
    }
  }
  return nativeModule;
}

/** False on builds that predate expo-notifications, and on web. */
export function remindersSupported(): boolean {
  return Platform.OS !== 'web' && native() !== null;
}

/** Marks our notifications so reconcile can clear exactly them. */
const TAG = 'iqra-reminder';
const CHANNEL = 'reminders';

type ReminderData = Record<string, unknown> & {
  app: typeof TAG;
  kind: PlannedReminder['kind'];
  route: string;
};

let configured = false;
export async function configureReminders(): Promise<void> {
  const N = native();
  if (!N || configured) return;
  configured = true;
  N.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  if (Platform.OS === 'android') {
    await N.setNotificationChannelAsync(CHANNEL, {
      name: i18n.t('reminders.channel'),
      importance: N.AndroidImportance.DEFAULT,
      lightColor: '#1F7A4D',
    });
  }
}

export type PermissionState = 'granted' | 'denied' | 'undetermined' | 'unsupported';

export async function reminderPermission(): Promise<PermissionState> {
  const N = native();
  if (!N || Platform.OS === 'web') return 'unsupported';
  const p = await N.getPermissionsAsync();
  if (p.granted) return 'granted';
  return p.canAskAgain ? 'undetermined' : 'denied';
}

/** Ask once; on a refusal returns 'denied' and never asks again by itself. */
export async function askReminderPermission(): Promise<PermissionState> {
  const N = native();
  if (!N || Platform.OS === 'web') return 'unsupported';
  const current = await N.getPermissionsAsync();
  if (current.granted) return 'granted';
  if (!current.canAskAgain) return 'denied';
  const req = await N.requestPermissionsAsync();
  return req.granted ? 'granted' : 'denied';
}

/** Takes the user to the app's notification settings when they said no earlier. */
export function openNotificationSettings(): void {
  Linking.openSettings().catch(() => {});
}

// ---- Inputs ------------------------------------------------------------

/** Same calendar day as the progress store's `lastStudyDate` (UTC date string). */
function isoDay(d: Date): string {
  return d.toISOString().split('T')[0];
}

const MODULE_ROUTES: Record<ModuleType, string> = {
  alphabet: '/alphabet',
  vocabulary: '/vocabulary',
  numbers: '/numbers',
  calendar: '/calendar',
  grammar: '/grammar',
  verbs: '/verbs',
  reading: '/reading',
  writing: '/writing',
  practice: '/practice',
};

function pickTitle(en: string | undefined, fr: string | undefined): string {
  return (i18n.language === 'fr' ? fr : undefined) || en || '';
}

/** The most recently opened thing, across stories, surahs and lessons. */
export function resumeTarget(): ResumeTarget | null {
  const candidates: ResumeTarget[] = [];

  const stories = useProphetStoriesStore.getState().progress;
  if (stories.lastReadProphetId && stories.lastReadDate) {
    const prophet = PROPHETS.find((p) => p.id === stories.lastReadProphetId);
    const done = stories.storiesProgress[stories.lastReadProphetId]?.status === 'completed';
    if (prophet && !done) {
      candidates.push({
        kind: 'prophet',
        title: pickTitle(prophet.nameEnglish, prophet.nameFrench),
        route: `/quran/prophets/${prophet.id}`,
        at: Date.parse(stories.lastReadDate),
      });
    }
  }

  const quranStories = useQuranStoriesStore.getState().storyProgress;
  for (const p of Object.values(quranStories)) {
    if (!p.lastReadAt || p.isCompleted) continue;
    const story = getQuranStoryById(p.storyId);
    if (!story) continue;
    candidates.push({
      kind: 'quranStory',
      title: pickTitle(story.titleEnglish, story.titleFrench),
      route: `/quran/stories/${p.storyId}`,
      at: new Date(p.lastReadAt).getTime(),
    });
  }

  const surahs = useQuranStore.getState().progress.surahProgress;
  for (const p of Object.values(surahs)) {
    if (!p.lastStudiedAt || p.status === 'completed') continue;
    const meta = getSurahMetadataById(p.surahId);
    if (!meta) continue;
    candidates.push({
      kind: 'surah',
      title: meta.nameTransliteration,
      route: `/quran/surah/${p.surahId}`,
      at: Date.parse(p.lastStudiedAt),
    });
  }

  const last = useProgressStore.getState().lastAccessed;
  if (last?.at) {
    candidates.push({
      kind: 'module',
      title: last.lessonTitle || last.moduleName,
      route: MODULE_ROUTES[last.module] ?? '/',
      at: last.at,
    });
  }

  const valid = candidates.filter((c) => Number.isFinite(c.at) && c.title);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => (b.at > a.at ? b : a));
}

function dueByTomorrow(now: Date): ReminderInputs['due'] {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);
  const verses = useQuranStore
    .getState()
    .progress.memorizationProgress.reviewSchedule.filter((i) => new Date(i.nextReviewDate) <= tomorrow).length;
  const tomorrowDay = isoDay(tomorrow);
  const words = useProgressStore
    .getState()
    .vocabularyReviewSchedule.filter((i) => i.nextReviewDate <= tomorrowDay).length;
  return { verses, words };
}

export function gatherInputs(now = new Date()): ReminderInputs {
  const settings = useSettingsStore.getState().reminders;
  const progress = useProgressStore.getState().progress;
  return {
    now,
    settings,
    studiedToday: progress.lastStudyDate === isoDay(now),
    currentStreak: progress.currentStreak,
    resume: resumeTarget(),
    due: dueByTomorrow(now),
  };
}

// ---- Scheduling ----------------------------------------------------------

const t = (key: string, params?: Record<string, string | number>) => i18n.t(key, params) as string;

async function cancelOurs(N: Notifications): Promise<void> {
  const all = await N.getAllScheduledNotificationsAsync();
  await Promise.all(
    all
      .filter((n) => (n.content.data as Partial<ReminderData> | undefined)?.app === TAG)
      .map((n) => N.cancelScheduledNotificationAsync(n.identifier).catch(() => {})),
  );
}

function toTrigger(N: Notifications, r: PlannedReminder): import('expo-notifications').NotificationTriggerInput {
  const android = Platform.OS === 'android' ? { channelId: CHANNEL } : {};
  if (r.trigger.type === 'weekly') {
    return {
      type: N.SchedulableTriggerInputTypes.WEEKLY,
      weekday: r.trigger.weekday,
      hour: r.trigger.hour,
      minute: r.trigger.minute,
      ...android,
    };
  }
  return { type: N.SchedulableTriggerInputTypes.DATE, date: r.trigger.at, ...android };
}

let reconciling: Promise<void> | null = null;

/**
 * Replace every scheduled reminder with what the current state calls for.
 * Cheap enough to run on each launch, foreground and background; serialised
 * so two triggers in a row cannot interleave cancel and schedule.
 */
export function reconcileReminders(): Promise<void> {
  if (reconciling) return reconciling;
  reconciling = (async () => {
    const N = native();
    if (!N || Platform.OS === 'web') return;
    await cancelOurs(N);
    if ((await reminderPermission()) !== 'granted') return;
    const planned = planReminders(gatherInputs(), t);
    for (const r of planned) {
      const data: ReminderData = { app: TAG, kind: r.kind, route: r.route };
      await N.scheduleNotificationAsync({
        content: { title: r.title, body: r.body, data, sound: 'default' },
        trigger: toTrigger(N, r),
      });
    }
  })()
    .catch((e) => quietly(e, 'reminders.reconcile'))
    .finally(() => {
      reconciling = null;
    });
  return reconciling;
}

// ---- Responding to a tap -------------------------------------------------

function open(route: string): void {
  try {
    router.navigate(route as never);
  } catch {
    // The router is not ready yet on a cold start; the pending tap is
    // replayed by handleColdStartTap once it is.
  }
}

/**
 * Wire everything: OS configuration, the tap handler, and a re-plan on
 * launch and on every foreground/background change. Returns a cleanup.
 */
export function startReminders(): () => void {
  const N = native();
  if (!N || Platform.OS === 'web') return () => {};

  configureReminders().catch((e) => quietly(e, 'reminders.configure'));

  // Every notification this app sends - the local reminders tagged here and
  // the group messages pushed from the server - says where it leads. One
  // listener routes them all; anything else on the phone is ignored.
  const tap = N.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data as Partial<ReminderData> | undefined;
    if (typeof data?.app === 'string' && data.app.startsWith('iqra-') && data.route) open(data.route);
  });

  // Not on the launch path: wait for the first screen before touching the
  // OS schedule and, for the "continue" body, a story's title.
  const first = setTimeout(() => reconcileReminders(), 4000);
  const sub = AppState.addEventListener('change', (s) => {
    if (s === 'active' || s === 'background') reconcileReminders();
  });

  return () => {
    clearTimeout(first);
    sub.remove();
    tap.remove();
  };
}

/** The reminder that cold-launched the app, once, after the router is ready. */
let coldStartHandled = false;
export async function handleColdStartTap(): Promise<void> {
  const N = native();
  if (!N || coldStartHandled) return;
  coldStartHandled = true;
  const last = await N.getLastNotificationResponseAsync();
  const data = last?.notification.request.content.data as Partial<ReminderData> | undefined;
  if (typeof data?.app === 'string' && data.app.startsWith('iqra-') && data.route) open(data.route);
}

/**
 * First-run ask: once the learner has actually done something, request the
 * permission a single time. Any later change goes through the Profile card.
 */
export async function maybeAskOnce(): Promise<void> {
  const settings = useSettingsStore.getState();
  if (!remindersSupported() || settings.remindersAsked || !settings.reminders.enabled) return;
  if (useProgressStore.getState().progress.totalXp <= 0) return;
  settings.setRemindersAsked();
  const state = await askReminderPermission();
  if (state === 'granted') await reconcileReminders();
}
