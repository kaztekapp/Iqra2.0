// The app is meant to work offline. A reader whose access token is over an
// hour old must stay signed in when the server cannot be reached to renew it;
// only a definite answer (the refresh token rejected) signs them out.
import { AuthApiError, AuthRetryableFetchError } from '@supabase/supabase-js';

const KEPT = { access_token: 'old', refresh_token: 'r1', expires_at: 1, user: { id: 'u1' } };
const mockStore = new Map<string, string>();
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn((k: string) => Promise.resolve(mockStore.get(k) ?? null)),
  setItemAsync: jest.fn((k: string, v: string) => Promise.resolve(void mockStore.set(k, v))),
  deleteItemAsync: jest.fn((k: string) => Promise.resolve(void mockStore.delete(k))),
}));
const mockGetSession = jest.fn();
const mockSignOut = jest.fn((..._a: unknown[]) => Promise.resolve({ error: null }));
jest.mock('@supabase/supabase-js', () => {
  const actual = jest.requireActual('@supabase/supabase-js');
  return {
    ...actual,
    createClient: () => ({
      auth: {
        storageKey: 'sb-test-auth-token',
        getSession: () => mockGetSession(),
        signOut: (...a: unknown[]) => mockSignOut(...a),
        startAutoRefresh: jest.fn(),
        stopAutoRefresh: jest.fn(),
      },
    }),
  };
});

process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'anon';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { safeGetSession, storedSession } = require('../src/lib/supabase');

describe('signed in without a signal', () => {
  beforeEach(() => {
    mockStore.clear();
    mockStore.set('sb-test-auth-token', JSON.stringify(KEPT));
    mockSignOut.mockClear();
  });

  it('reads the kept sign-in with no network at all', async () => {
    mockGetSession.mockImplementation(() => new Promise(() => {})); // the server never answers
    expect((await storedSession())?.user.id).toBe('u1');
  });

  it('keeps the reader signed in when the token cannot be renewed offline', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: new AuthRetryableFetchError('Failed to fetch', 0) });
    expect((await safeGetSession())?.user.id).toBe('u1');
    expect(mockSignOut).not.toHaveBeenCalled();
  });

  it('keeps the reader signed in when the request throws before any answer', async () => {
    mockGetSession.mockRejectedValue(new TypeError('Network request failed'));
    expect((await safeGetSession())?.user.id).toBe('u1');
    expect(mockSignOut).not.toHaveBeenCalled();
  });

  it('signs out, on this phone only, when the server rejects the session', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: new AuthApiError('Invalid Refresh Token', 400, 'refresh_token_not_found') });
    expect(await safeGetSession()).toBeNull();
    expect(mockSignOut).toHaveBeenCalledWith({ scope: 'local' });
  });

  it('has nothing to keep when nobody signed in', async () => {
    mockStore.clear();
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
    expect(await safeGetSession()).toBeNull();
    expect(await storedSession()).toBeNull();
  });
});
