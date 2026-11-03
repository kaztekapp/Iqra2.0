// The store prompt cannot be dismissed, so every doubt must mean "do not ask".
jest.mock('expo', () => ({ requireOptionalNativeModule: () => null }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.1.0' } } }));
jest.mock('expo-localization', () => ({ getLocales: () => [{ regionCode: 'SN' }] }));
jest.mock('react-native', () => ({ Platform: { OS: 'ios' } }));
import { installedVersion, isNewerVersion, newerStoreRelease } from '../src/services/storeVersion';

const reply = (body: unknown, ok = true) => Promise.resolve({ ok, json: () => Promise.resolve(body) });
const latest = (ios: object) => ({ ios: { url: 'https://apps.apple.com/app/id6801198221', ...ios } });
function serve(file: unknown, appStore: string | null, fail = false) {
  (global as unknown as { fetch: jest.Mock }).fetch = jest.fn((url: string) => {
    if (fail) return Promise.reject(new Error('offline'));
    if (url.includes('itunes.apple.com')) return reply({ results: appStore ? [{ version: appStore }] : [] });
    return reply(file);
  });
}

describe('store version check', () => {
  it('compares versions part by part, not as text', () => {
    expect(isNewerVersion('1.1.1', '1.1.0')).toBe(true);
    expect(isNewerVersion('1.10.0', '1.9.2')).toBe(true);
    expect(isNewerVersion('1.1.0', '1.1.0')).toBe(false);
    expect(isNewerVersion('1.0.9', '1.1.0')).toBe(false);
  });

  it('falls back to the bundle version when expo-application is not in the build', () => {
    expect(installedVersion()).toBe('1.1.0');
  });

  it('asks only when the App Store in this country really has the version', async () => {
    serve(latest({ version: '1.1.1' }), '1.1.1');
    expect((await newerStoreRelease())?.version).toBe('1.1.1');
    const lookup = (global.fetch as jest.Mock).mock.calls.find(([u]) => u.includes('itunes'))[0];
    expect(lookup).toContain('country=sn');
  });

  it('never blocks when in doubt', async () => {
    serve(latest({ version: '1.1.1' }), '1.1.0');           // store not updated here yet
    expect(await newerStoreRelease()).toBeNull();
    serve(latest({ version: '1.1.1' }), null);              // not sold in this country
    expect(await newerStoreRelease()).toBeNull();
    serve(latest({ version: '1.1.1', force: false }), '1.1.1'); // off switch
    expect(await newerStoreRelease()).toBeNull();
    serve(latest({ version: '1.1.1' }), '1.1.1', true);     // offline
    expect(await newerStoreRelease()).toBeNull();
    serve(latest({ version: '1.1.0' }), '1.1.0');           // not newer
    expect(await newerStoreRelease()).toBeNull();
  });
});
