import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import * as LegacyFileSystem from 'expo-file-system/legacy';

/**
 * Read one of the app's data files (an asset: the Quran's surahs in
 * assets/quran, the prophet stories in assets/stories) as JSON.
 *
 * They ship inside the store build and come with an update only when they
 * change, so this works with no connection.
 */
export async function readDataFile<T>(module: number): Promise<T> {
  const asset = Asset.fromModule(module);
  if (Platform.OS === 'web') return (await fetch(asset.uri)).json() as Promise<T>;
  // Copies the file out of the app package on Android; a no-op once done.
  if (!asset.localUri) await asset.downloadAsync();
  return JSON.parse(await LegacyFileSystem.readAsStringAsync(asset.localUri ?? asset.uri)) as T;
}
