import { supabase } from '../lib/supabase';
import { useSettingsStore } from '../stores/settingsStore';

function getClient() {
  if (!supabase) throw new Error('Supabase is not configured. Add your credentials to .env');
  return supabase;
}

/** Race a promise against a timeout. Throws on timeout. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Network timeout. Please check your connection.')), ms),
    ),
  ]);
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
    });
  }
  await googleConfigurePromise;

  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
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

export async function signOut() {
  const { error } = await getClient().auth.signOut();
  if (error) throw error;
  useSettingsStore.getState().setSession(null);
}

export async function resetPassword(email: string) {
  const { error } = await withTimeout(
    getClient().auth.resetPasswordForEmail(email, {
      redirectTo: 'iqra2://reset-password',
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

export async function getSession() {
  const { data, error } = await getClient().auth.getSession();
  if (error) throw error;
  return data.session;
}
