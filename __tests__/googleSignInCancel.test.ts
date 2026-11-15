// google-signin 13+ resolves a dismissed account picker with
// { type: 'cancelled' } instead of throwing. Backing out must not reach
// Supabase or be reported as an error.
const mockSignInWithIdToken = jest.fn(() => Promise.resolve({ data: { session: {} }, error: null }));
jest.mock('../src/lib/supabase', () => ({
  supabase: { auth: { signInWithIdToken: () => mockSignInWithIdToken() } },
}));
jest.mock('../src/services/push', () => ({ unregisterPushToken: jest.fn() }));
jest.mock('../src/services/progressSync', () => ({
  flushProgress: jest.fn(), stopProgressSync: jest.fn(), forgetProgressOwner: jest.fn(),
}));
jest.mock('../src/services/communityCache', () => ({ clearCommunityCache: jest.fn() }));
jest.mock('../src/services/groupContentCache', () => ({ clearAllGroupSnapshots: jest.fn() }));
jest.mock('../src/stores/settingsStore', () => ({ useSettingsStore: { getState: () => ({}) } }));
jest.mock('../src/lib/report', () => ({ quietly: jest.fn() }));

const mockSignIn = jest.fn();
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(() => Promise.resolve(true)),
    signIn: () => mockSignIn(),
  },
}));

import { signInWithGoogle } from '../src/services/authService';

describe('Google sign-in', () => {
  beforeEach(() => mockSignInWithIdToken.mockClear());

  it('returns nothing, quietly, when the account picker is dismissed', async () => {
    mockSignIn.mockResolvedValueOnce({ type: 'cancelled', data: null });
    await expect(signInWithGoogle()).resolves.toBeNull();
    expect(mockSignInWithIdToken).not.toHaveBeenCalled();
  });

  it('signs in to Supabase with the id token when an account is chosen', async () => {
    mockSignIn.mockResolvedValueOnce({ type: 'success', data: { idToken: 'tok' } });
    await expect(signInWithGoogle()).resolves.toEqual({ session: {} });
    expect(mockSignInWithIdToken).toHaveBeenCalledTimes(1);
  });
});
