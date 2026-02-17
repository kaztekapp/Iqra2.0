import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl.startsWith('http');

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (!isConfigured) return null;
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: false,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });

    // Manually refresh token when app comes to foreground
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
