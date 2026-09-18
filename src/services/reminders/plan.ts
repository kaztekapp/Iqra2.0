/**
 * Decides which reminders to schedule, from a snapshot of the learner's state.
 *
 * Pure: no store, no OS, no clock of its own. The service (`./index.ts`)
 * gathers the inputs, calls `planReminders`, and hands the result to
 * expo-notifications; the tests feed it made-up snapshots. Keeping the rules
 * here means a reminder never fires for a reason that cannot be read off this
 * file.
 *
 * Every reminder is a one-shot at a concrete time (the Friday one is the only
 * repeating trigger). The service re-plans on every launch, foreground and
 * background, so "not studied today" is always judged against the latest
 * state: study at 18:00 and the 21:00 streak reminder is gone by 18:01.
 */

export type ReminderKind = 'resume' | 'streak' | 'review' | 'kahf';

export interface ReminderSettings {
  enabled: boolean;
  /** Daily study time, local. */
  hour: number;
  minute: number;
  streakGuard: boolean;
  reviews: boolean;
  fridayKahf: boolean;
}

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  hour: 20,
  minute: 0,
  streakGuard: true,
  reviews: true,
  fridayKahf: true,
};

/** Where the learner stopped last, and the screen that continues it. */
export interface ResumeTarget {
  kind: 'prophet' | 'quranStory' | 'surah' | 'module';
  title: string;
  route: string;
  /** When it was last opened, ms since epoch. */
  at: number;
}

export interface ReminderInputs {
  now: Date;
  settings: ReminderSettings;
  studiedToday: boolean;
  currentStreak: number;
  resume: ResumeTarget | null;
  /** Items whose review falls due by tomorrow morning. */
  due: { verses: number; words: number };
}

export type Trigger =
  | { type: 'date'; at: Date }
  | { type: 'weekly'; weekday: number; hour: number; minute: number }; // weekday 1 = Sunday

export interface PlannedReminder {
  kind: ReminderKind;
  trigger: Trigger;
  title: string;
  body: string;
  route: string;
}

/** i18n lookup, injected so the planner stays testable without i18next. */
export type Translate = (key: string, params?: Record<string, string | number>) => string;

const STREAK_HOUR = 21;
const REVIEW_HOUR = 9;
const KAHF_HOUR = 9;
const FRIDAY = 6; // expo-notifications weekday: 1 = Sunday … 7 = Saturday
/** Days ahead the "continue" reminder is placed; re-planned on every launch anyway. */
const RESUME_DAYS = 3;
/** Two reminders closer than this are one too many; the study one wins. */
const CROWD_MS = 60 * 60 * 1000;

function at(day: Date, hour: number, minute: number): Date {
  const d = new Date(day);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function plusDays(day: Date, n: number): Date {
  const d = new Date(day);
  d.setDate(d.getDate() + n);
  return d;
}

/** "8 verses and 12 words are due" — or '' when nothing is. */
export function dueSentence(due: ReminderInputs['due'], t: Translate): string {
  if (due.verses > 0 && due.words > 0) return t('reminders.dueBoth', { verses: due.verses, words: due.words });
  if (due.verses > 0) return t('reminders.dueVerses', { count: due.verses });
  if (due.words > 0) return t('reminders.dueWords', { count: due.words });
  return '';
}

function resumeBody(resume: ResumeTarget | null, due: ReminderInputs['due'], t: Translate): string {
  const lead = resume
    ? t(`reminders.resume.${resume.kind}`, { title: resume.title })
    : t('reminders.resume.none');
  const tail = dueSentence(due, t);
  return tail ? `${lead} ${tail}` : lead;
}

export function planReminders(input: ReminderInputs, t: Translate): PlannedReminder[] {
  const { now, settings, studiedToday, currentStreak, resume, due } = input;
  if (!settings.enabled) return [];

  const out: PlannedReminder[] = [];
  const studyToday = at(now, settings.hour, settings.minute);

  // Continue where you left off — at the study time, today (unless already
  // studied) and the next couple of days.
  for (let d = 0; d < RESUME_DAYS; d++) {
    if (d === 0 && studiedToday) continue;
    const when = plusDays(studyToday, d);
    if (when <= now) continue;
    out.push({
      kind: 'resume',
      trigger: { type: 'date', at: when },
      title: t('reminders.resume.title'),
      body: resumeBody(resume, due, t),
      route: resume?.route ?? '/',
    });
  }

  // Streak guard — the evening a streak would otherwise end. Skipped when the
  // study reminder already lands within the hour (a 20:00 study time keeps
  // it: one nudge, then a last call an hour later).
  if (settings.streakGuard && currentStreak >= 1) {
    const crowded = Math.abs(at(now, STREAK_HOUR, 0).getTime() - studyToday.getTime()) < CROWD_MS;
    if (!crowded) {
      for (let d = 0; d < 2; d++) {
        if (d === 0 && studiedToday) continue;
        const when = plusDays(at(now, STREAK_HOUR, 0), d);
        if (when <= now) continue;
        out.push({
          kind: 'streak',
          trigger: { type: 'date', at: when },
          title: t('reminders.streak.title'),
          body: t('reminders.streak.body', { count: currentStreak }),
          route: '/',
        });
      }
    }
  }

  // Reviews — a morning nudge when something is due, only when the study
  // time is in the afternoon or evening (a morning study reminder already
  // names what is due).
  if (settings.reviews && (due.verses > 0 || due.words > 0) && settings.hour >= 12) {
    const when = plusDays(at(now, REVIEW_HOUR, 0), 1);
    out.push({
      kind: 'review',
      trigger: { type: 'date', at: when },
      title: t('reminders.review.title'),
      body: dueSentence(due, t),
      route: due.verses > 0 ? '/quran/surah-learn' : '/vocabulary/review',
    });
  }

  // Friday — Surah al-Kahf.
  if (settings.fridayKahf) {
    out.push({
      kind: 'kahf',
      trigger: { type: 'weekly', weekday: FRIDAY, hour: KAHF_HOUR, minute: 0 },
      title: t('reminders.kahf.title'),
      body: t('reminders.kahf.body'),
      route: '/quran/surah/al-kahf',
    });
  }

  return out;
}
