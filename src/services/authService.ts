import { isAuthRetryableFetchError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { unregisterPushToken } from './push';
import { flushProgress, stopProgressSync, forgetProgressOwner } from './progressSync';
import { useSettingsStore } from '../stores/settingsStore';
import { quietly } from '../lib/report';
import { clearCommunityCache } from './communityCache';
import { clearAllGroupSnapshots } from './groupContentCache';

function getClient() {
  if (!supabase) throw new Error('Supabase is not configured. Add your credentials to .env');
  return supabase;
}

/** Race a promise against a timeout. Throws on timeout. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Network timeout. Please check your connection.')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

const AUTH_TIMEOUT = 15_000;

let googleConfigurePromise: Promise<void> | null = null;

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  const { data, error } = await withTimeout(
    getClient().auth.signUp({
      email,
      password,
      options: fullName ? { data: { full_name: fullName } } : undefined,
    }),
    AUTH_TIMEOUT,
  );
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await withTimeout(
    getClient().auth.signInWithPassword({ email, password }),
    AUTH_TIMEOUT,
  );
  if (error) throw error;
  return data;
}

export async function signInWithGoogle() {
  const { GoogleSignin } = require('@react-native-google-signin/google-signin');

  // Use a promise lock to avoid duplicate configure() calls
  if (!googleConfigurePromise) {
    googleConfigurePromise = Promise.resolve().then(() => {
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      });
    }).catch((err) => {
      googleConfigurePromise = null;
      throw err;
    });
  }
  await googleConfigurePromise;

  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  // Since google-signin 13 a dismissed account picker resolves with
  // { type: 'cancelled' } instead of throwing: that is the reader changing
  // their mind, not an error.
  if (response?.type === 'cancelled') return null;
  const idToken = response.data?.idToken;
  if (!idToken) throw new Error('No ID token from Google');

  const { data, error } = await withTimeout(
    getClient().auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    }),
    AUTH_TIMEOUT,
  );
  if (error) throw error;
  return data;
}

export async function signInWithApple() {
  const AppleAuthentication = require('expo-apple-authentication');

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  const idToken = credential.identityToken;
  if (!idToken) throw new Error('No identity token from Apple');

  const { data, error } = await withTimeout(
    getClient().auth.signInWithIdToken({
      provider: 'apple',
      token: idToken,
    }),
    AUTH_TIMEOUT,
  );
  if (error) throw error;

  // Keep Apple's refresh token server-side, so it can be revoked if the
  // account is deleted (App Store Review Guideline 5.1.1(v)). The code is
  // good for five minutes and once; signing in does not wait on this.
  if (credential.authorizationCode) {
    keepAppleToken(credential.authorizationCode).catch((e) => quietly(e, 'authService apple-token store'));
  }

  // Apple only provides the user's name on the first sign-in.
  // Persist it in the Supabase user metadata if available.
  if (credential.fullName) {
    const { givenName, familyName } = credential.fullName;
    if (givenName || familyName) {
      const fullName = [givenName, familyName].filter(Boolean).join(' ');
      await getClient().auth.updateUser({
        data: { full_name: fullName },
      }).catch(() => {});
    }
  }

  return data;
}

async function keepAppleToken(code: string): Promise<void> {
  const { error } = await getClient().functions.invoke('apple-token', { body: { action: 'store', code } });
  if (error) throw error;
}

/**
 * Revoke the account's Sign in with Apple token with Apple, before the
 * account goes (App Store Review Guideline 5.1.1(v)). The server knows whether
 * there is one; for an account that never used Apple this is a no-op.
 */
async function revokeAppleToken(): Promise<void> {
  const user = useSettingsStore.getState().user;
  const usedApple =
    user?.app_metadata?.provider === 'apple' ||
    (Array.isArray(user?.app_metadata?.providers) && user.app_metadata.providers.includes('apple'));
  if (!usedApple) return;
  const { error } = await getClient().functions.invoke('apple-token', { body: { action: 'revoke' } });
  if (error) throw error;
}

export async function signOut() {
  // Upload the last few seconds of progress while the session still works,
  // but never let a slow network hold up signing out.
  await withTimeout(flushProgress(), 4_000).catch(() => {});
  stopProgressSync();
  // Forget the device first, while the session can still prove it is ours -
  // otherwise group messages for the person leaving keep arriving here.
  await unregisterPushToken();
  const { error } = await getClient().auth.signOut();
  if (error) {
    // Offline the server cannot be told; signing out of this phone must still
    // work (the token simply expires on its own).
    if (!isAuthRetryableFetchError(error)) throw error;
    const local = await getClient().auth.signOut({ scope: 'local' });
    if (local.error) throw local.error;
  }
  await forgetCommunityOnDevice();
  useSettingsStore.getState().setSession(null);
}

/** Group lists and the last messages of each group, cached for speed: not for the next person. */
async function forgetCommunityOnDevice() {
  clearCommunityCache();
  await clearAllGroupSnapshots();
}

export async function resetPassword(email: string) {
  const { error } = await withTimeout(
    getClient().auth.resetPasswordForEmail(email, {
      redirectTo: 'https://kaztekapp.github.io/iqra-legal/reset-password.html',
    }),
    AUTH_TIMEOUT,
  );
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await withTimeout(
    getClient().auth.updateUser({ password: newPassword }),
    AUTH_TIMEOUT,
  );
  if (error) throw error;
}

/**
 * Removes the person's uploads (voice notes, chat images) and then the account.
 * The files go first: once the account is gone nothing can list them, and the
 * privacy policy promises they are removed with it. Any failure throws, so
 * the button shows an error and the person can try again.
 */
export async function deleteAccount() {
  const client = getClient();
  // First, while the session can still prove whose token it is.
  await revokeAppleToken();
  await deleteOwnStorageObjects();
  await deleteOwnProgressCopy();
  const { error } = await client.rpc('delete_own_account');
  if (error) throw error;
  await forgetProgressOwner();
  await forgetCommunityOnDevice();
  // The account no longer exists; drop its tokens from this phone too.
  await client.auth.signOut({ scope: 'local' }).catch(() => {});
  useSettingsStore.getState().setSession(null);
}

/** The synced copy of the person's progress (see services/progressSync). */
async function deleteOwnProgressCopy() {
  const userId = useSettingsStore.getState().user?.id;
  if (!userId) return;
  const { error } = await getClient().from('user_progress_sync').delete().eq('user_id', userId);
  // A database without the table yet has nothing to delete.
  if (error && error.code !== '42P01' && error.code !== 'PGRST205') throw error;
}

/** Storage removes at most this many paths per call. */
const STORAGE_REMOVE_BATCH = 100;

async function deleteOwnStorageObjects() {
  const client = getClient();
  const { data, error } = await client.rpc('list_own_storage_objects');
  if (error) throw error;
  const byBucket = new Map<string, string[]>();
  for (const row of (data ?? []) as { bucket_id: string; name: string }[]) {
    const names = byBucket.get(row.bucket_id) ?? [];
    names.push(row.name);
    byBucket.set(row.bucket_id, names);
  }
  for (const [bucket, names] of byBucket) {
    for (let i = 0; i < names.length; i += STORAGE_REMOVE_BATCH) {
      const { error: removeError } = await client.storage
        .from(bucket)
        .remove(names.slice(i, i + STORAGE_REMOVE_BATCH));
      if (removeError) throw removeError;
    }
  }
}

export async function getSession() {
  const { data, error } = await getClient().auth.getSession();
  if (error) throw error;
  return data.session;
}
