import { supabase } from '../lib/supabase';

function getClient() {
  if (!supabase) throw new Error('Supabase is not configured. Add your credentials to .env');
  return supabase;
}

interface UserProfile {
  display_name?: string;
  language?: string;
  learning_goals?: string[];
  onboarding_completed?: boolean;
}

export async function upsertProfile(userId: string, profile: UserProfile) {
  const { data, error } = await getClient()
    .from('user_profiles')
    .upsert(
      { user_id: userId, ...profile, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProfile(userId: string) {
  const { data, error } = await getClient()
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}
