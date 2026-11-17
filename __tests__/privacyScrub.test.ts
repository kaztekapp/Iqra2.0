// What leaves the phone: request queries never reach Sentry, and a
// notification can only open a screen inside the app.
jest.mock('@sentry/react-native', () => ({}));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: {} } }));
jest.mock('expo-updates', () => ({}));

import { scrubSpan, stripQuery, withoutQueries } from '../src/lib/report';
import { isAppRoute } from '../src/services/reminders/route';

describe('Sentry scrubbing', () => {
  it('cuts an address at its query or fragment', () => {
    expect(stripQuery('https://x.supabase.co/rest/v1/t?user_id=eq.abc')).toBe('https://x.supabase.co/rest/v1/t');
    expect(stripQuery('https://tts.example/say#q=hello')).toBe('https://tts.example/say');
    expect(stripQuery('https://plain.example/a')).toBe('https://plain.example/a');
  });

  it('drops the query fields of a traced request', () => {
    const span = scrubSpan({
      description: 'GET https://translate.example/tts?q=%D8%A8%D8%B3%D9%85&tl=ar',
      data: { url: 'https://translate.example/tts?q=secret', 'http.query': '?q=secret', 'http.method': 'GET' },
    });
    expect(span.description).toBe('GET https://translate.example/tts');
    expect(span.data).toEqual({ url: 'https://translate.example/tts', 'http.method': 'GET' });
    expect(JSON.stringify(span)).not.toContain('secret');
  });

  it('leaves non-address values alone', () => {
    expect(withoutQueries({ status: 200, note: 'a?b' })).toEqual({ status: 200, note: 'a?b' });
  });
});

describe('notification routes', () => {
  it('accepts screens inside the app', () => {
    expect(isAppRoute('/community/groups/abc')).toBe(true);
    expect(isAppRoute('/(tabs)')).toBe(true);
  });

  it('refuses outside addresses and anything that is not a path', () => {
    for (const r of ['https://evil.example', '//evil.example/x', 'mailto:a@b.c', 'tel:123', '/\\evil.example', '', 42, null, undefined]) {
      expect(isAppRoute(r)).toBe(false);
    }
  });
});
