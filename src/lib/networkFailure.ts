/**
 * Whether an error is the phone losing its connection rather than the app
 * doing something wrong: the request never got an answer.
 *
 * These are not bugs. The callers already fall back (a recorded clip, the
 * phone's own voice, a sync that runs again on the next foreground), so they
 * are kept as breadcrumbs, not sent as errors. Sentry got two in November
 * 2026 (IQRA2-A and, in French, IQRA2-B) from phones whose signal dropped.
 *
 * iOS writes the reason in the phone's language, so the English and French
 * wordings are both matched, alongside the fetch layers' own words (Expo's
 * "fetch failed", React Native's "Network request failed") and the
 * NSURLError codes that carry no words at all.
 */
const PATTERNS: readonly RegExp[] = [
  /^fetch failed\b/i, // expo/fetch: the request never got an answer
  /network request failed/i, // React Native's fetch
  /network connection was lost/i,
  /internet connection appears to be offline/i,
  /request timed out/i,
  /could not connect to the server/i,
  /connexion internet semble (interrompue|hors ligne|être hors ligne)/i,
  /la requête a expiré/i,
  /NSURLErrorDomain.*-10(01|04|05|09)\b/i,
];

export function isNetworkFailure(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : error && typeof error === 'object' && 'message' in error
          ? String((error as { message: unknown }).message)
          : '';
  return message !== '' && PATTERNS.some((p) => p.test(message));
}
