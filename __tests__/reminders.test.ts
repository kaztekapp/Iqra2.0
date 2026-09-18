import { planReminders, DEFAULT_REMINDER_SETTINGS, ReminderInputs, Translate } from '../src/services/reminders/plan';

// Keys and params come back verbatim so a test can read what was asked for.
const t: Translate = (key, params) => (params ? `${key} ${JSON.stringify(params)}` : key);

// A Wednesday at 10:00 local.
const wednesday = new Date(2026, 8, 16, 10, 0, 0);

function base(over: Partial<ReminderInputs> = {}): ReminderInputs {
  return {
    now: wednesday,
    settings: DEFAULT_REMINDER_SETTINGS,
    studiedToday: false,
    currentStreak: 0,
    resume: { kind: 'prophet', title: 'Musa', route: '/quran/prophets/musa', at: wednesday.getTime() - 3600e3 },
    due: { verses: 0, words: 0 },
    ...over,
  };
}

const dates = (rs: ReturnType<typeof planReminders>, kind: string) =>
  rs.filter((r) => r.kind === kind).map((r) => (r.trigger.type === 'date' ? r.trigger.at : null));

describe('reminder planner', () => {
  it('schedules nothing when reminders are off', () => {
    expect(planReminders(base({ settings: { ...DEFAULT_REMINDER_SETTINGS, enabled: false } }), t)).toEqual([]);
  });

  it('continues where the learner left off, today and the next two days at the study time', () => {
    const rs = planReminders(base(), t);
    const resume = rs.filter((r) => r.kind === 'resume');
    expect(resume).toHaveLength(3);
    expect(resume[0].body).toBe('reminders.resume.prophet {"title":"Musa"}');
    expect(resume[0].route).toBe('/quran/prophets/musa');
    const [d0, d1] = dates(rs, 'resume') as Date[];
    expect([d0.getDate(), d0.getHours(), d0.getMinutes()]).toEqual([16, 20, 0]);
    expect(d1.getDate()).toBe(17);
  });

  it('does not nag today once the learner has studied', () => {
    const rs = planReminders(base({ studiedToday: true, currentStreak: 4 }), t);
    expect((dates(rs, 'resume') as Date[]).map((d) => d.getDate())).toEqual([17, 18]);
    expect((dates(rs, 'streak') as Date[]).map((d) => d.getDate())).toEqual([17]);
  });

  it('skips today when the study time has already passed', () => {
    const rs = planReminders(base({ now: new Date(2026, 8, 16, 22, 0) }), t);
    expect((dates(rs, 'resume') as Date[]).map((d) => d.getDate())).toEqual([17, 18]);
  });

  it('guards a streak at 21:00 with the day count, and not for a streak of zero', () => {
    expect(planReminders(base({ currentStreak: 0 }), t).some((r) => r.kind === 'streak')).toBe(false);
    const rs = planReminders(base({ currentStreak: 12 }), t);
    const streak = rs.filter((r) => r.kind === 'streak');
    expect(streak).toHaveLength(2);
    expect(streak[0].body).toBe('reminders.streak.body {"count":12}');
    expect(streak[1].body).toBe('reminders.streak.body {"count":12}');
    const [d0] = dates(rs, 'streak') as Date[];
    expect([d0.getDate(), d0.getHours()]).toEqual([16, 21]);
  });

  it('drops the streak guard when the study reminder already lands next to it', () => {
    const rs = planReminders(base({ currentStreak: 3, settings: { ...DEFAULT_REMINDER_SETTINGS, hour: 21, minute: 0 } }), t);
    expect(rs.some((r) => r.kind === 'streak')).toBe(false);
  });

  it('names what is due and adds a morning review nudge for evening learners only', () => {
    const evening = planReminders(base({ due: { verses: 8, words: 12 } }), t);
    expect(evening.find((r) => r.kind === 'resume')!.body).toContain('reminders.dueBoth {"verses":8,"words":12}');
    const review = evening.filter((r) => r.kind === 'review');
    expect(review).toHaveLength(1);
    expect(review[0].body).toBe('reminders.dueBoth {"verses":8,"words":12}');
    const [d] = dates(evening, 'review') as Date[];
    expect([d.getDate(), d.getHours()]).toEqual([17, 9]);

    const morning = planReminders(
      base({ due: { verses: 0, words: 3 }, settings: { ...DEFAULT_REMINDER_SETTINGS, hour: 8, minute: 0 } }),
      t,
    );
    expect(morning.some((r) => r.kind === 'review')).toBe(false);
    expect(morning.find((r) => r.kind === 'resume')!.body).toContain('reminders.dueWords {"count":3}');
  });

  it('falls back to a plain nudge when nothing has been opened yet', () => {
    const rs = planReminders(base({ resume: null }), t);
    expect(rs.find((r) => r.kind === 'resume')!.body).toBe('reminders.resume.none');
    expect(rs.find((r) => r.kind === 'resume')!.route).toBe('/');
  });

  it('repeats Surah al-Kahf every Friday morning and can be turned off', () => {
    const on = planReminders(base(), t).find((r) => r.kind === 'kahf')!;
    expect(on.trigger).toEqual({ type: 'weekly', weekday: 6, hour: 9, minute: 0 });
    expect(on.route).toBe('/quran/surah/al-kahf');
    const off = planReminders(base({ settings: { ...DEFAULT_REMINDER_SETTINGS, fridayKahf: false } }), t);
    expect(off.some((r) => r.kind === 'kahf')).toBe(false);
  });

  it('stays well under the 64 pending notifications iOS allows', () => {
    const rs = planReminders(base({ currentStreak: 5, due: { verses: 2, words: 2 } }), t);
    expect(rs.length).toBeLessThanOrEqual(8);
  });
});
