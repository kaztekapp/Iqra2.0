/**
 * Waits that still end while the app is in the background.
 *
 * On Android, React Native pauses JavaScript timers when the app leaves the
 * screen (JavaTimerManager stops on onHostPause unless a headless task is
 * running). A story waits a quarter of a second between two sentences; in
 * the background that wait never ended, so the reading stopped after the
 * sentence that was playing, and Android later killed the silent app
 * (reported 2026-11-13: "the app closes" when a story plays in the background).
 *
 * Events from native code still arrive. The story's keep-alive player reports
 * its status several times a second for the whole reading, and each report
 * calls `audioTick`, which ends every wait that is due. A plain timer runs as
 * well, so a wait in the foreground ends on time with or without reports.
 */
type Waiter = { at: number; fire: () => void };
const waiters = new Set<Waiter>();
const repeaters = new Set<() => void>();

/** A native audio report arrived: end the waits that are due. */
export function audioTick(): void {
  for (const fn of [...repeaters]) fn();
  if (!waiters.size) return;
  const now = Date.now();
  for (const w of [...waiters]) {
    if (now >= w.at) w.fire();
  }
}

/** Run `fn` once, after `ms`. Returns a cancel function. */
export function after(ms: number, fn: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const waiter: Waiter = {
    at: Date.now() + ms,
    fire: () => {
      if (!waiters.delete(waiter)) return;
      if (timer) clearTimeout(timer);
      fn();
    },
  };
  waiters.add(waiter);
  timer = setTimeout(waiter.fire, ms);
  return () => {
    waiters.delete(waiter);
    if (timer) clearTimeout(timer);
  };
}

/** Wait `ms`, in the foreground or the background. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    after(ms, resolve);
  });
}

/**
 * Run `fn` every `ms` in the foreground, and on every audio report in the
 * background. Returns a cancel function.
 */
export function every(ms: number, fn: () => void): () => void {
  const timer = setInterval(fn, ms);
  repeaters.add(fn);
  return () => {
    clearInterval(timer);
    repeaters.delete(fn);
  };
}
