// Apple requires the Sign in with Apple token to be revoked when the account
// is deleted (App Store Review Guideline 5.1.1(v)). The revoke call must come
// first, while the session can still prove whose token it is.
const calls: string[] = [];
const mockInvoke = jest.fn((name: string, opts: { body: { action: string } }) => {
  calls.push(`${name}:${opts.body.action}`);
  return Promise.resolve({ data: {}, error: null });
});
const mockRpc = jest.fn((name: string) => {
  calls.push(`rpc:${name}`);
  return Promise.resolve({ data: [], error: null });
});
jest.mock('../src/lib/supabase', () => ({
  supabase: {
    functions: { invoke: (n: string, o: { body: { action: string } }) => mockInvoke(n, o) },
    rpc: (n: string) => mockRpc(n),
    from: () => ({ delete: () => ({ eq: () => Promise.resolve({ error: null }) }) }),
    storage: { from: () => ({ remove: () => Promise.resolve({ error: null }) }) },
    auth: { signOut: () => Promise.resolve({ error: null }) },
  },
}));
jest.mock('../src/services/push', () => ({ unregisterPushToken: jest.fn() }));
jest.mock('../src/services/progressSync', () => ({
  flushProgress: jest.fn(), stopProgressSync: jest.fn(), forgetProgressOwner: jest.fn(() => Promise.resolve()),
}));
jest.mock('../src/services/communityCache', () => ({ clearCommunityCache: jest.fn() }));
jest.mock('../src/services/groupContentCache', () => ({ clearAllGroupSnapshots: jest.fn(() => Promise.resolve()) }));
const mockUser: { current: unknown } = { current: null };
jest.mock('../src/stores/settingsStore', () => ({
  useSettingsStore: { getState: () => ({ user: mockUser.current, setSession: jest.fn() }) },
}));
jest.mock('../src/lib/report', () => ({ quietly: jest.fn() }));

import { deleteAccount } from '../src/services/authService';

describe('deleting an account', () => {
  beforeEach(() => { calls.length = 0; });

  it('revokes the Apple token first when the account used Sign in with Apple', async () => {
    mockUser.current = { id: 'u1', app_metadata: { provider: 'apple', providers: ['apple'] } };
    await deleteAccount();
    expect(calls[0]).toBe('apple-token:revoke');
    expect(calls).toContain('rpc:delete_own_account');
    expect(calls.indexOf('apple-token:revoke')).toBeLessThan(calls.indexOf('rpc:delete_own_account'));
  });

  it('also when Apple was linked to an email account', async () => {
    mockUser.current = { id: 'u1', app_metadata: { provider: 'email', providers: ['email', 'apple'] } };
    await deleteAccount();
    expect(calls[0]).toBe('apple-token:revoke');
  });

  it('does not call Apple for an account that never used it', async () => {
    mockUser.current = { id: 'u1', app_metadata: { provider: 'email', providers: ['email'] } };
    await deleteAccount();
    expect(calls.some((c) => c.startsWith('apple-token'))).toBe(false);
    expect(calls).toContain('rpc:delete_own_account');
  });

  it('stops, so the person can try again, when the revocation fails', async () => {
    mockUser.current = { id: 'u1', app_metadata: { provider: 'apple', providers: ['apple'] } };
    mockInvoke.mockImplementationOnce(() => Promise.resolve({ data: null, error: new Error('revoke failed') }) as never);
    await expect(deleteAccount()).rejects.toThrow('revoke failed');
    expect(calls).not.toContain('rpc:delete_own_account');
  });
});
