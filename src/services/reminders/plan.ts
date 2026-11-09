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
  /** Days the study reminder comes: 0 = Sunday … 6 = Saturday (Date#getDay). */
  days: number[];
  streakGuard: boolean;
  streakHour: number;
  streakMinute: number;
  reviews: boolean;
  reviewHour: number;
  reviewMinute: number;
  fridayKahf: boolean;
  kahfHour: number;
  kahfMinute: number;
}

export const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  enabled: true,
  hour: 20,
  minute: 0,
  days: EVERY_DAY,
  streakGuard: true,
  streakHour: 21,
  streakMinute: 0,
  reviews: true,
  reviewHour: 9,
  reviewMinute: 0,
  fridayKahf: true,
  kahfHour: 9,
  kahfMinute: 0,
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

const FRIDAY = 6; // expo-notifications weekday: 1 = Sunday … 7 = Saturday
/** How many "continue" reminders are placed ahead; re-planned on every launch anyway. */
const RESUME_COUNT = 3;
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

  // Continue where you left off — at the study time, on the next study days
  // the learner chose (today too, unless already studied).
  const days = settings.days?.length ? settings.days : EVERY_DAY;
  // The next RESUME_COUNT study days, today included even when it is skipped.
  let studyDays = 0;
  for (let d = 0; d < 15 && studyDays < RESUME_COUNT; d++) {
    const when = plusDays(studyToday, d);
    if (!days.includes(when.getDay())) continue;
    studyDays++;
    if ((d === 0 && studiedToday) || when <= now) continue;
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
    const streakToday = at(now, settings.streakHour, settings.streakMinute);
    const crowded = days.includes(now.getDay()) && Math.abs(streakToday.getTime() - studyToday.getTime()) < CROWD_MS;
    if (!crowded) {
      for (let d = 0; d < 2; d++) {
        if (d === 0 && studiedToday) continue;
        const when = plusDays(streakToday, d);
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

  // Reviews — a note at the chosen time tomorrow when something is due.
  // Skipped when tomorrow's study reminder comes first or within the hour
  // after it: that reminder already names what is due.
  const reviewTomorrow = plusDays(at(now, settings.reviewHour, settings.reviewMinute), 1);
  const studyTomorrow = plusDays(studyToday, 1);
  const reviewCrowded =
    days.includes(studyTomorrow.getDay()) && studyTomorrow.getTime() <= reviewTomorrow.getTime() + CROWD_MS;
  if (settings.reviews && (due.verses > 0 || due.words > 0) && !reviewCrowded) {
    const when = reviewTomorrow;
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
      trigger: { type: 'weekly', weekday: FRIDAY, hour: settings.kahfHour, minute: settings.kahfMinute },
      title: t('reminders.kahf.title'),
      body: t('reminders.kahf.body'),
      route: '/quran/surah/al-kahf',
    });
  }

  return out;
}
