jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { migrateSettings, SETTINGS_VERSION, useSettingsStore } from '../src/stores/settingsStore';

describe('story voice default', () => {
  it('is male on a fresh install', () => {
    expect(useSettingsStore.getState().narrationVoice).toBe('male');
  });

  it('moves settings saved before version 1 to the male voice once', () => {
    const out = migrateSettings({ narrationVoice: 'female', language: 'fr' }, 0);
    expect(out.narrationVoice).toBe('male');
    expect(out.language).toBe('fr');
  });

  it('keeps a female voice chosen after the change', () => {
    const out = migrateSettings({ narrationVoice: 'female' }, SETTINGS_VERSION);
    expect(out.narrationVoice).toBe('female');
  });
});
