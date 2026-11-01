// The update prompt sends people to the store only for a strictly newer version.
jest.mock('expo', () => ({ requireOptionalNativeModule: () => null }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.1.0' } } }));
import { installedVersion, isNewerVersion } from '../src/services/storeVersion';

describe('store version check', () => {
  it('compares versions part by part, not as text', () => {
    expect(isNewerVersion('1.1.1', '1.1.0')).toBe(true);
    expect(isNewerVersion('1.10.0', '1.9.2')).toBe(true);
    expect(isNewerVersion('2', '1.9.9')).toBe(true);
    expect(isNewerVersion('1.1.0', '1.1.0')).toBe(false);
    expect(isNewerVersion('1.0.9', '1.1.0')).toBe(false);
  });

  it('falls back to the bundle version when expo-application is not in the build', () => {
    expect(installedVersion()).toBe('1.1.0');
  });
});
