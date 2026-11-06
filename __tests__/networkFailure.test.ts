import { isNetworkFailure } from '../src/lib/networkFailure';

describe('isNetworkFailure', () => {
  it('recognises the two November 2026 Sentry reports', () => {
    expect(
      isNetworkFailure(new Error('fetch failed: UnexpectedException: The network connection was lost. (at ExpoModulesCore/Promise.swift:56)')),
    ).toBe(true);
    expect(
      isNetworkFailure(new Error('fetch failed: UnexpectedException: La connexion Internet semble interrompue. (at ExpoModulesCore/Promise.swift:56)')),
    ).toBe(true);
  });

  it('recognises other ways a request goes unanswered', () => {
    expect(isNetworkFailure(new TypeError('Network request failed'))).toBe(true);
    expect(isNetworkFailure('The Internet connection appears to be offline.')).toBe(true);
    expect(isNetworkFailure({ message: 'The request timed out.' })).toBe(true);
    expect(isNetworkFailure(new Error('Error Domain=NSURLErrorDomain Code=-1009'))).toBe(true);
  });

  it('leaves real failures alone', () => {
    expect(isNetworkFailure(new Error('tts-404'))).toBe(false);
    expect(isNetworkFailure(new Error('Cannot read property x of undefined'))).toBe(false);
    expect(isNetworkFailure(new Error('JSON Parse error: Unexpected character'))).toBe(false);
    expect(isNetworkFailure(null)).toBe(false);
    expect(isNetworkFailure(undefined)).toBe(false);
  });
});
