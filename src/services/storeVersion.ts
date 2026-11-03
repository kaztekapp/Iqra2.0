import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
import { requireOptionalNativeModule } from 'expo';
import { VOICE_CDN_URL } from './speech/voicePlan';

/**
 * Is a newer version of the app in the App Store or Play Store?
 *
 * The answer comes from a small file on the voice CDN, written by
 * scripts/release/announce.ts only once a version is actually live in the
 * store, so nobody is sent to a store page that does not have it yet. An
 * over-the-air update cannot change the app's binary; this is how people on
 * an old binary learn there is a new one.
 */
export const LATEST_VERSION_URL = `${VOICE_CDN_URL}/app/latest.json`;

/** `force: false` is the remote off switch: nobody is asked, nobody is blocked. */
export type StoreRelease = { version: string; url: string; force?: boolean };
type LatestFile = Partial<Record<'ios' | 'android', StoreRelease | null>>;

/** "1.10.0" > "1.9.2"; missing parts count as 0. */
export function isNewerVersion(candidate: string, installed: string): boolean {
  const a = candidate.split('.').map((n) => parseInt(n, 10) || 0);
  const b = installed.split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0);
  }
  return false;
}

/**
 * The version of the installed binary. expo-application is read only when its
 * native side is in the build; otherwise the running bundle's own version,
 * which matches the binary because an update only reaches the runtime it was
 * published for.
 */
export function installedVersion(): string | null {
  const native = requireOptionalNativeModule<{ nativeApplicationVersion?: string | null }>('ExpoApplication');
  return native?.nativeApplicationVersion ?? Constants.expoConfig?.version ?? null;
}

const APP_STORE_ID = '6801198221';

/**
 * Is this version really on the App Store in the person's own country?
 * Apple rolls a release out over hours, and some countries (China mainland)
 * do not sell the app at all; asking someone there to update would block
 * them for good. Any doubt (no answer, no region) counts as "no".
 */
async function liveOnAppStore(version: string): Promise<boolean> {
  try {
    const region = Localization.getLocales()[0]?.regionCode?.toLowerCase() || 'us';
    const res = await fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${region}`);
    if (!res.ok) return false;
    const live = ((await res.json()) as { results?: { version?: string }[] }).results?.[0]?.version;
    return !!live && !isNewerVersion(version, live);
  } catch {
    return false;
  }
}

/**
 * The store release this install must update to, or null.
 *
 * The prompt this feeds cannot be dismissed, so every way of being wrong
 * answers null and the app is used as normal: no network, no file, a file
 * switched off (`force: false`), a version that is not newer, and on iPhone a
 * version Apple's own store does not show in this country yet.
 */
export async function newerStoreRelease(): Promise<StoreRelease | null> {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return null;
  const installed = installedVersion();
  if (!installed) return null;
  try {
    const res = await fetch(LATEST_VERSION_URL, { headers: { 'Cache-Control': 'no-cache' } });
    if (!res.ok) return null;
    const latest = ((await res.json()) as LatestFile)[Platform.OS];
    if (!latest?.version || !/^https:\/\//.test(latest.url ?? '')) return null;
    if (latest.force === false || !isNewerVersion(latest.version, installed)) return null;
    if (Platform.OS === 'ios' && !(await liveOnAppStore(latest.version))) return null;
    return latest;
  } catch {
    return null;
  }
}
