import { Platform } from 'react-native';
import Constants from 'expo-constants';
import i18n from 'i18next';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useSettingsStore } from '../stores/settingsStore';
import { quietly } from '../lib/report';

/**
 * Group messages that arrive while the app is closed.
 *
 * A local notification cannot do this — the phone has to be told by a server,
 * and the server needs somewhere to send. This registers the device with
 * Expo's push service and keeps that token in `push_tokens`, one row per
 * device; the notify-group-message Edge Function reads them when someone
 * writes to a group.
 *
 * expo-notifications is required lazily for the same reason it is in the
 * reminders service: the module throws when its native side is missing, and
 * an OTA reaches builds made before it existed. See services/reminders.
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

export type PushResult = { ok: boolean; reason: string };

function projectId(): string | undefined {
  return (
    (Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)?.eas?.projectId ??
    (Constants as unknown as { easConfig?: { projectId?: string } }).easConfig?.projectId
  );
}

function lang(): 'en' | 'fr' {
  return (useSettingsStore.getState().language === 'fr' || i18n.language?.startsWith('fr')) ? 'fr' : 'en';
}

/** The Android channel group messages arrive on. */
export async function configureMessageChannel(): Promise<void> {
  const N = native();
  if (!N || Platform.OS !== 'android') return;
  await N.setNotificationChannelAsync('messages', {
    name: i18n.t('push.channel'),
    importance: N.AndroidImportance.HIGH,
    vibrationPattern: [0, 200, 100, 200],
    lightColor: '#1F7A4D',
  });
}

/**
 * Register this device, saying why it did not when it did not — the Profile
 * card shows the reason rather than a switch that silently does nothing.
 *
 * Idempotent: the row is keyed by token, so a re-register on every launch
 * only refreshes the language and the timestamp.
 */
export async function registerPushTokenVerbose(): Promise<PushResult> {
  const N = native();
  if (!N || Platform.OS === 'web') return { ok: false, reason: 'unsupported' };
  if (!isSupabaseConfigured || !supabase) return { ok: false, reason: 'supabase not configured' };

  const userId = useSettingsStore.getState().user?.id;
  if (!userId) return { ok: false, reason: 'not signed in' };

  const permission = await N.getPermissionsAsync();
  if (!permission.granted) return { ok: false, reason: 'permission not granted' };

  const id = projectId();
  if (!id) return { ok: false, reason: 'missing EAS projectId' };

  let token: string;
  try {
    const res = await N.getExpoPushTokenAsync({ projectId: id });
    token = res?.data;
    if (!token) return { ok: false, reason: 'no token returned' };
  } catch (e) {
    // Usually a simulator, or a build without the push entitlement.
    return { ok: false, reason: `no push token: ${(e as Error)?.message ?? e}` };
  }

  const { error } = await supabase
    .from('push_tokens')
    .upsert(
      { token, user_id: userId, platform: Platform.OS === 'ios' ? 'ios' : 'android', lang: lang(), updated_at: new Date().toISOString() },
      { onConflict: 'token' },
    );
  if (error) return { ok: false, reason: `saving token failed: ${error.message}` };

  await configureMessageChannel().catch(() => {});
  return { ok: true, reason: 'registered' };
}

/** Launch-time registration; never throws, never blocks. */
export async function registerPushToken(): Promise<void> {
  try {
    const result = await registerPushTokenVerbose();
    if (!result.ok && __DEV__) console.log('[push]', result.reason);
  } catch (e) {
    quietly(e, 'push.register');
  }
}

/**
 * Forget this device on sign-out, so messages for the person who just left
 * do not keep arriving on their phone.
 */
export async function unregisterPushToken(): Promise<void> {
  const N = native();
  if (!N || !supabase) return;
  try {
    const id = projectId();
    if (!id) return;
    const { data } = await N.getExpoPushTokenAsync({ projectId: id });
    if (data) await supabase.from('push_tokens').delete().eq('token', data);
  } catch (e) {
    quietly(e, 'push.unregister');
  }
}

/**
 * Ask the server to deliver a message we just sent to everyone else in the
 * group. Fire and forget: the message is already saved and will appear in
 * the group either way, so a failure here costs a notification, not content.
 */
export function notifyGroupMessage(messageId: string | null | undefined): void {
  if (!messageId || !supabase) return;
  supabase.functions
    .invoke('notify-group-message', { body: { messageId } })
    .catch((e) => quietly(e, 'push.notifyGroupMessage'));
}
