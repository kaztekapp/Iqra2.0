import { mergeSnapshots, type ProgressSnapshot, type Json } from '../src/services/progressSync/merge';

function snap(state: Json, changedAt: string, epoch = 0, version = 0): ProgressSnapshot {
  return { format: 1, epoch, changedAt, stores: { progress: { version, state } } };
}

function progress(over: Record<string, Json>): Json {
  return {
    progress: {
      totalXp: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: '',
      alphabetProgress: { lettersLearned: [], masteredLetters: [] },
      exerciseResults: { totalCompleted: 0, byType: { writing: { completed: 0, correct: 0 } } },
      ...over,
    },
    showVowels: true,
  };
}

const state = (s: ProgressSnapshot) => (s.stores.progress.state as { progress: Record<string, Json>; showVowels: boolean });

describe('progress sync merge', () => {
  it('joins learned letters from both phones without duplicates', () => {
    const a = snap(progress({ alphabetProgress: { lettersLearned: ['alif', 'ba'], masteredLetters: [] } }), '2026-10-06T10:00:00Z');
    const b = snap(progress({ alphabetProgress: { lettersLearned: ['ba', 'ta'], masteredLetters: ['alif'] } }), '2026-10-06T09:00:00Z');
    const m = state(mergeSnapshots(a, b)).progress.alphabetProgress as Record<string, string[]>;
    expect(m.lettersLearned.sort()).toEqual(['alif', 'ba', 'ta']);
    expect(m.masteredLetters).toEqual(['alif']);
  });

  it('keeps the larger XP and running totals, whichever phone changed last', () => {
    const a = snap(progress({ totalXp: 120, exerciseResults: { totalCompleted: 4, byType: { writing: { completed: 4, correct: 3 } } } }), '2026-10-06T10:00:00Z');
    const b = snap(progress({ totalXp: 300, exerciseResults: { totalCompleted: 9, byType: { writing: { completed: 2, correct: 2 } } } }), '2026-10-06T09:00:00Z');
    const m = state(mergeSnapshots(a, b)).progress;
    expect(m.totalXp).toBe(300);
    expect((m.exerciseResults as Record<string, Json>).totalCompleted).toBe(9);
    expect(((m.exerciseResults as Record<string, Record<string, Record<string, number>>>).byType.writing)).toEqual({ completed: 4, correct: 3 });
  });

  it('takes the streak from the phone that studied most recently, not the larger one', () => {
    const a = snap(progress({ currentStreak: 12, longestStreak: 12, lastStudyDate: '2026-10-01' }), '2026-10-06T10:00:00Z');
    const b = snap(progress({ currentStreak: 1, longestStreak: 3, lastStudyDate: '2026-10-06' }), '2026-10-06T09:00:00Z');
    const m = state(mergeSnapshots(a, b)).progress;
    expect(m.currentStreak).toBe(1);
    expect(m.lastStudyDate).toBe('2026-10-06');
    expect(m.longestStreak).toBe(12);
  });

  it('takes settings from the copy changed last', () => {
    const fresh = snap({ ...(progress({}) as object), showVowels: true }, '');
    const saved = snap({ ...(progress({}) as object), showVowels: false }, '2026-10-05T09:00:00Z');
    expect(state(mergeSnapshots(fresh, saved)).showVowels).toBe(false);
  });

  it('a phone that never changed anything adopts the saved copy whole', () => {
    const fresh = snap(progress({}), '');
    const saved = snap(progress({ totalXp: 500, lastStudyDate: '2026-10-05', currentStreak: 4 }), '2026-10-05T09:00:00Z');
    const m = state(mergeSnapshots(fresh, saved)).progress;
    expect(m.totalXp).toBe(500);
    expect(m.currentStreak).toBe(4);
  });

  it('a reset replaces older progress instead of merging it back', () => {
    const reset = snap(progress({}), '2026-10-06T10:00:00Z', 1_000);
    const old = snap(progress({ totalXp: 900, alphabetProgress: { lettersLearned: ['alif'], masteredLetters: [] } }), '2026-10-06T11:00:00Z', 0);
    expect(state(mergeSnapshots(reset, old)).progress.totalXp).toBe(0);
    expect(state(mergeSnapshots(old, reset)).progress.totalXp).toBe(0);
  });

  it('merges list items with the same id instead of duplicating them', () => {
    const a = snap({ schedule: [{ id: 'w1', interval: 4, dueDate: '2026-10-09' }] }, '2026-10-06T10:00:00Z');
    const b = snap({ schedule: [{ id: 'w1', interval: 1, dueDate: '2026-10-07' }, { id: 'w2', interval: 1, dueDate: '2026-10-07' }] }, '2026-10-06T09:00:00Z');
    const m = (mergeSnapshots(a, b).stores.progress.state as { schedule: { id: string; interval: number }[] }).schedule;
    expect(m).toHaveLength(2);
    expect(m.find((x) => x.id === 'w1')?.interval).toBe(4);
  });

  it('keeps the newer saved format when the two phones run different app versions', () => {
    const a: ProgressSnapshot = { format: 1, epoch: 0, changedAt: '2026-10-06T10:00:00Z', stores: { quran: { version: 0, state: { a: 1 } } } };
    const b: ProgressSnapshot = { format: 1, epoch: 0, changedAt: '2026-10-06T09:00:00Z', stores: { quran: { version: 1, state: { b: 2 } } } };
    expect(mergeSnapshots(a, b).stores.quran).toEqual({ version: 1, state: { b: 2 } });
  });

  it('keeps a "passed" flag set on either phone', () => {
    const a = snap({ hasPassed: { quiz1: false, quiz2: true } }, '2026-10-06T10:00:00Z');
    const b = snap({ hasPassed: { quiz1: true } }, '2026-10-06T09:00:00Z');
    expect(mergeSnapshots(a, b).stores.progress.state).toEqual({ hasPassed: { quiz1: true, quiz2: true } });
  });
});
