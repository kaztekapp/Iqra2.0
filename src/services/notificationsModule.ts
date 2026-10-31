import { Platform } from 'react-native';
import { requireOptionalNativeModule } from 'expo';

/**
 * expo-notifications, or null on a binary that does not contain it.
 *
 * Over-the-air updates reach every installed build with the same runtime
 * version, including Android previews made before expo-notifications was
 * added. Requiring the package there crashed the app at launch with "Cannot
 * find native module 'ExpoPushTokenManager'" (Sentry IQRA2-3) even inside a
 * try/catch, because the package's own modules look up their native halves
 * as they load. So the native modules are asked for first, without throwing,
 * and the package is only loaded when they are really there.
 *
 * Shared by the reminders and the push services.
 */
type Notifications = typeof import('expo-notifications');

let loaded: Notifications | null | undefined;

export function notificationsModule(): Notifications | null {
  if (loaded !== undefined) return loaded;
  loaded = null;
  if (Platform.OS === 'web') return loaded;
  const present =
    requireOptionalNativeModule('ExpoPushTokenManager') !== null &&
    requireOptionalNativeModule('ExpoNotificationScheduler') !== null;
  if (!present) return loaded;
  try {
    loaded = require('expo-notifications') as Notifications;
  } catch {
    loaded = null;
  }
  return loaded;
}
