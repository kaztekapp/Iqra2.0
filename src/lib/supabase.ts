import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient, isAuthRetryableFetchError, SupabaseClient, type Session } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl.startsWith('http');

// Chunked secure storage adapter — handles values exceeding the 2048-byte
// Android Keystore limit by splitting across multiple SecureStore keys.
const CHUNK_SIZE = 1800;
const CHUNK_KEY = (key: string, i: number) => `${key}__chunk_${i}`;

async function clearChunks(key: string): Promise<void> {
  for (let i = 0; ; i++) {
    try {
      const v = await SecureStore.getItemAsync(CHUNK_KEY(key, i));
      if (v === null) break;
      await SecureStore.deleteItemAsync(CHUNK_KEY(key, i));
    } catch { break; }
  }
}

const secureStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const direct = await SecureStore.getItemAsync(key);
      if (direct !== null) return direct;
      // Try chunked read
      let result = '';
      for (let i = 0; ; i++) {
        const chunk = await SecureStore.getItemAsync(CHUNK_KEY(key, i));
        if (chunk === null) break;
        result += chunk;
      }
      return result || null;
    } catch (e) {
      __DEV__ && console.warn('SecureStore getItem error:', e);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        if (value.length <= CHUNK_SIZE) {
          await SecureStore.setItemAsync(key, value);
          await clearChunks(key);
        } else {
          // Remove direct key, write chunks
          await SecureStore.deleteItemAsync(key).catch(() => {});
          for (let i = 0; i < value.length; i += CHUNK_SIZE) {
            await SecureStore.setItemAsync(CHUNK_KEY(key, Math.floor(i / CHUNK_SIZE)), value.slice(i, i + CHUNK_SIZE));
          }
          // Verify last chunk was written (guard against partial failure)
          const lastIdx = Math.ceil(value.length / CHUNK_SIZE) - 1;
          const verify = await SecureStore.getItemAsync(CHUNK_KEY(key, lastIdx));
          if (verify === null) throw new Error('Chunked write verification failed');
          // Remove leftover old chunks
          const totalChunks = Math.ceil(value.length / CHUNK_SIZE);
          for (let i = totalChunks; ; i++) {
            const old = await SecureStore.getItemAsync(CHUNK_KEY(key, i));
            if (old === null) break;
            await SecureStore.deleteItemAsync(CHUNK_KEY(key, i));
          }
        }
        return; // Success — exit retry loop
      } catch (e) {
        if (attempt === 0) {
          // First failure on chunked write — clear and retry
          await clearChunks(key);
          await SecureStore.deleteItemAsync(key).catch(() => {});
          continue;
        }
        __DEV__ && console.warn('SecureStore setItem error:', e);
      }
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      __DEV__ && console.warn('SecureStore removeItem error:', e);
    }
    await clearChunks(key);
  },
};

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!isConfigured) return null;
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: secureStorage,
        autoRefreshToken: false,
        persistSession: true,
        detectSessionInUrl: false,
        // Password-reset links carry a one-time code, not a session. The code
        // only turns into a session together with the verifier this phone
        // saved when it asked for the reset, so another app that catches the
        // iqra2:// link (Android lets any app claim a custom scheme) gets
        // nothing it can use.
        flowType: 'pkce',
      },
    });

    // Pause/resume refresh based on app foreground state
    AppState.addEventListener('change', (state) => {
      if (state === 'active' && _supabase) {
        _supabase.auth.startAutoRefresh();
      } else if (_supabase) {
        _supabase.auth.stopAutoRefresh();
      }
    });
  }
  return _supabase;
}

export const supabase = getSupabase();
export { isConfigured as isSupabaseConfigured };

/**
 * The sign-in kept on this phone, read straight from storage: no network, no
 * refresh, so it answers at once with or without a signal.
 *
 * The app is meant to work offline. Asking the auth client instead meant that
 * when the access token was more than an hour old it first tried to renew it;
 * offline that cannot succeed (it retries for up to ~30 s), so launch gave up
 * waiting and sent a signed-in reader to the login page. The kept session is
 * still the reader's: the server is asked about it once there is a signal.
 */
export async function storedSession(): Promise<Session | null> {
  if (!_supabase) return null;
  try {
    // GoTrueClient keeps its storage key protected; it is the key the session is saved under.
    const key = (_supabase.auth as unknown as { storageKey: string }).storageKey;
    const raw = await secureStorage.getItem(key);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    return session?.refresh_token && session?.user?.id ? session : null;
  } catch {
    return null;
  }
}

/**
 * The current session, renewed when the network allows.
 *
 * Only a definite answer signs the reader out: the server rejecting the
 * refresh token (the auth client then removes it itself) or a session that
 * cannot be read at all. Not reaching the server is not a sign-out; the kept
 * session is returned and renewed on the next try.
 */
export async function safeGetSession(): Promise<Session | null> {
  if (!_supabase) return null;
  try {
    const { data: { session }, error } = await _supabase.auth.getSession();
    if (session) return session;
    if (error && isAuthRetryableFetchError(error)) return storedSession();
    if (error) {
      // A session the server will not take any more. Local scope: signing out
      // must not depend on reaching the server either.
      await _supabase.auth.signOut({ scope: 'local' }).catch(() => {});
    }
    return null;
  } catch {
    // Something failed before any answer came back: keep what the phone has.
    return storedSession();
  }
}
