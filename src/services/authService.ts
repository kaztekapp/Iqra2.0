import { supabase } from '../lib/supabase';
import { useSettingsStore } from '../stores/settingsStore';

function getClient() {
  if (!supabase) throw new Error('Supabase is not configured. Add your credentials to .env');
  return supabase;
}

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  const { data, error } = await getClient().auth.signUp({
    email,
    password,
    options: fullName ? { data: { full_name: fullName } } : undefined,
  });
  if (error) throw error;
  return data;
}


export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await getClient().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await getClient().auth.signOut();
  if (error) throw error;
  useSettingsStore.getState().setSession(null);
}

export async function resetPassword(email: string) {
  const { error } = await getClient().auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await getClient().auth.getSession();
  if (error) throw error;
  return data.session;
}
