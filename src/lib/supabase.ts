import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
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
      console.warn('SecureStore getItem error:', e);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
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
        // Remove leftover old chunks
        const totalChunks = Math.ceil(value.length / CHUNK_SIZE);
        for (let i = totalChunks; ; i++) {
          const old = await SecureStore.getItemAsync(CHUNK_KEY(key, i));
          if (old === null) break;
          await SecureStore.deleteItemAsync(CHUNK_KEY(key, i));
        }
      }
    } catch (e) {
      console.warn('SecureStore setItem error:', e);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.warn('SecureStore removeItem error:', e);
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
      },
    });

    // Start auto-refresh immediately on creation
    _supabase.auth.startAutoRefresh();

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

// Safe session getter that clears stale sessions on error
export async function safeGetSession() {
  if (!_supabase) return null;
  try {
    const { data: { session }, error } = await _supabase.auth.getSession();
    if (error) {
      // Stale/invalid session — sign out to clear it
      await _supabase.auth.signOut().catch(() => {});
      return null;
    }
    return session;
  } catch {
    // Fatal error — clear stored session
    await _supabase.auth.signOut().catch(() => {});
    return null;
  }
}
