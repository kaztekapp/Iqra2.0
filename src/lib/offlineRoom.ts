import { Paths } from 'expo-file-system';
import * as Network from 'expo-network';

/**
 * When the app may keep audio on the phone, and when it may fetch ahead.
 *
 * Audio is kept generously (heard once, played offline after), so two things
 * keep that from costing the person: nothing more is saved once the phone
 * has less than this much space free, and audio is fetched ahead of time only
 * on Wi-Fi, never on mobile data.
 */
export const KEEP_FREE_BYTES = 1024 * 1024 * 1024;

let roomAt = 0;
let room = true;

/** Is there space to keep another file? Any doubt answers yes: a save that
 *  cannot be written fails on its own, and playback never depends on it. */
export function roomToKeep(): boolean {
  if (Date.now() - roomAt < 10_000) return room;
  try {
    const free = Paths.availableDiskSpace;
    room = !(typeof free === 'number' && free > 0 && free < KEEP_FREE_BYTES);
  } catch {
    room = true;
  }
  roomAt = Date.now();
  return room;
}

let wifiAt = 0;
let wifi = false;

/** On Wi-Fi with the internet reachable. Any doubt answers no: fetching
 *  ahead is a convenience, and mobile data is the person's money. */
export async function onWifi(): Promise<boolean> {
  if (Date.now() - wifiAt < 30_000) return wifi;
  try {
    const s = await Network.getNetworkStateAsync();
    wifi = s.type === Network.NetworkStateType.WIFI && s.isInternetReachable !== false;
  } catch {
    wifi = false;
  }
  wifiAt = Date.now();
  return wifi;
}
