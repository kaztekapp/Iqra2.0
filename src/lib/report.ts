/**
 * What the app tells us when something goes wrong on a phone we cannot see.
 *
 * Every error path in the app comes through here. With a Sentry DSN set
 * (EXPO_PUBLIC_SENTRY_DSN, an EAS environment variable so it is inlined at
 * bundle time) the errors reach Sentry with the update's identity attached;
 * without one, nothing leaves the phone and the calls cost nothing. Either
 * way, in development they are printed.
 *
 * Two doors:
 *
 *   reportError(e, context) - something failed that should not have. Sent.
 *   quietly(e, where)       - something failed that was allowed to (a cache
 *                             file that would not delete, a probe that timed
 *                             out). Not sent; kept as a breadcrumb so that if
 *                             a real error follows, the trail leading to it
 *                             is in the report.
 */
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

const DSN = process.env.EXPO_PUBLIC_SENTRY_DSN || '';

export const reportingEnabled = DSN.length > 0;

let started = false;

/** Call once, before the root component renders. Safe to call twice. */
export function initReporting(): void {
  if (started || !reportingEnabled) return;
  started = true;
  Sentry.init({
    dsn: DSN,
    enabled: !__DEV__,
    // One in five sessions is traced; errors are always sent.
    tracesSampleRate: 0.2,
    release: `${Constants.expoConfig?.slug ?? 'iqra'}@${Constants.expoConfig?.version ?? '0'}`,
    dist: Updates.updateId ?? undefined,
    sendDefaultPii: false,
  });
  Sentry.setTag('update.channel', Updates.channel ?? 'none');
  Sentry.setTag('update.id', Updates.updateId ?? 'embedded');
}

/** Wrap the root component so navigation and touch events become context. */
export function wrapRoot<P extends object>(component: React.ComponentType<P>): React.ComponentType<P> {
  if (!reportingEnabled) return component;
  // Sentry types the wrapper for a generic props bag; the component is
  // returned unchanged in shape, so the cast is safe.
  return Sentry.wrap(component as React.ComponentType<Record<string, unknown>>) as unknown as React.ComponentType<P>;
}

/** A failure that matters. */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
  if (__DEV__) console.error('[report]', error, context ?? '');
  if (!reportingEnabled) return;
  Sentry.withScope((scope) => {
    if (context) scope.setContext('detail', context);
    Sentry.captureException(error instanceof Error ? error : new Error(String(error)));
  });
}

/** A failure the code was allowed to ignore. Kept as a breadcrumb only. */
export function quietly(error: unknown, where?: string): void {
  if (__DEV__) console.warn('[quiet]', where ?? '', error);
  if (!reportingEnabled) return;
  Sentry.addBreadcrumb({
    category: 'quiet',
    level: 'warning',
    message: where ?? 'ignored failure',
    data: { error: error instanceof Error ? error.message : String(error) },
  });
}

/** Who the report is about, once they sign in. Never the email. */
export function identifyUser(id: string | null): void {
  if (!reportingEnabled) return;
  Sentry.setUser(id ? { id } : null);
}
