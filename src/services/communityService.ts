import { supabase } from '../lib/supabase';
import { LeaderboardEntry, LeaderboardType, CommunityStats } from '../types/community';

function getClient() {
  if (!supabase) throw new Error('Supabase is not configured. Add your credentials to .env');
  return supabase;
}

/**
 * Upsert the user's XP and streak data to user_arabic_progress.
 * Fire-and-forget — errors are silently logged.
 */
export async function syncProgress(
  userId: string,
  totalXp: number,
  currentStreak: number,
  longestStreak: number
) {
  try {
    const { error } = await getClient()
      .from('user_arabic_progress')
      .upsert(
        {
          user_id: userId,
          total_xp: totalXp,
          current_streak: currentStreak,
          longest_streak: longestStreak,
          last_study_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

    if (error) {
      if (__DEV__) console.warn('[communityService] syncProgress error:', error.message);
    }
  } catch (e) {
    if (__DEV__) console.warn('[communityService] syncProgress exception:', e);
  }
}

/**
 * Upsert today's daily log row, incrementing xp_earned.
 * Fire-and-forget — errors are silently logged.
 */
export async function logDailyXp(userId: string, xpAmount: number) {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Try to fetch existing row for today
    const { data: existing, error: fetchError } = await getClient()
      .from('user_daily_log')
      .select('id, xp_earned')
      .eq('user_id', userId)
      .eq('study_date', today)
      .maybeSingle();

    if (fetchError) {
      if (__DEV__) console.warn('[communityService] logDailyXp fetch error:', fetchError.message);
      return;
    }

    if (existing) {
      // Update existing row
      const { error } = await getClient()
        .from('user_daily_log')
        .update({ xp_earned: existing.xp_earned + xpAmount })
        .eq('id', existing.id);

      if (error && __DEV__) console.warn('[communityService] logDailyXp update error:', error.message);
    } else {
      // Insert new row
      const { error } = await getClient()
        .from('user_daily_log')
        .insert({
          user_id: userId,
          study_date: today,
          xp_earned: xpAmount,
        });

      if (error && __DEV__) console.warn('[communityService] logDailyXp insert error:', error.message);
    }
  } catch (e) {
    if (__DEV__) console.warn('[communityService] logDailyXp exception:', e);
  }
}

/**
 * Fetch the leaderboard from Supabase.
 * - allTime: leaderboard VIEW ordered by total_xp DESC
 * - streaks: leaderboard VIEW ordered by current_streak DESC
 * - weekly: user_daily_log joined with user_profiles for last 7 days
 */
export async function fetchLeaderboard(
  type: LeaderboardType,
  currentUserId?: string
): Promise<LeaderboardEntry[]> {
  const client = getClient();

  if (type === 'weekly') {
    // Weekly: aggregate xp from user_daily_log for last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sinceDate = sevenDaysAgo.toISOString().split('T')[0];

    const { data, error } = await client.rpc('get_weekly_leaderboard', {
      since_date: sinceDate,
      result_limit: 25,
    });

    // If RPC doesn't exist, fall back to a direct query
    if (error) {
      if (__DEV__) console.warn('[communityService] weekly RPC fallback:', error.message);

      // Fallback: query the leaderboard view (shows all-time XP but still useful)
      const { data: fallbackData, error: fallbackError } = await client
        .from('leaderboard')
        .select('user_id, display_name, avatar_url, total_xp, current_streak')
        .order('total_xp', { ascending: false })
        .limit(25);

      if (fallbackError) throw fallbackError;
      return mapLeaderboardRows(fallbackData || [], currentUserId);
    }

    return mapLeaderboardRows(data || [], currentUserId);
  }

  // allTime or streaks: query leaderboard VIEW
  const orderColumn = type === 'streaks' ? 'current_streak' : 'total_xp';

  const { data, error } = await client
    .from('leaderboard')
    .select('user_id, display_name, avatar_url, total_xp, current_streak')
    .order(orderColumn, { ascending: false })
    .limit(25);

  if (error) throw error;
  return mapLeaderboardRows(data || [], currentUserId);
}

/**
 * Format a display name: capitalize each word.
 * "alassaneba" → "Alassaneba", "mamadou anne" → "Mamadou Anne"
 */
function formatName(raw: string | null | undefined): string {
  if (!raw) return 'Learner';
  return raw
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Map raw Supabase rows to LeaderboardEntry[].
 */
function mapLeaderboardRows(
  rows: Array<{
    user_id: string;
    display_name?: string | null;
    avatar_url?: string | null;
    total_xp?: number | null;
    current_streak?: number | null;
    weekly_xp?: number | null;
  }>,
  currentUserId?: string
): LeaderboardEntry[] {
  return rows.map((row, index) => ({
    id: row.user_id,
    name: formatName(row.display_name),
    nameArabic: '',
    avatarUrl: row.avatar_url || undefined,
    xp: row.weekly_xp ?? row.total_xp ?? 0,
    streak: row.current_streak ?? 0,
    rank: index + 1,
    isCurrentUser: row.user_id === currentUserId,
  }));
}

/**
 * Fetch real community stats from Supabase.
 */
export async function fetchCommunityStats(): Promise<CommunityStats> {
  const client = getClient();
  const today = new Date().toISOString().split('T')[0];

  // Run queries in parallel
  const [activeResult, xpResult, streaksResult] = await Promise.all([
    // Count users who studied today
    client
      .from('user_daily_log')
      .select('user_id', { count: 'exact', head: true })
      .eq('study_date', today),

    // Sum today's XP
    client
      .from('user_daily_log')
      .select('xp_earned')
      .eq('study_date', today),

    // Count users with active streaks
    client
      .from('user_arabic_progress')
      .select('user_id', { count: 'exact', head: true })
      .gt('current_streak', 0),
  ]);

  const activeLearnersTodayCount = activeResult.count ?? 0;
  const totalXpEarnedToday = (xpResult.data || []).reduce(
    (sum: number, row: { xp_earned: number }) => sum + (row.xp_earned || 0),
    0
  );
  const activeStreaksCount = streaksResult.count ?? 0;

  return {
    activeLearnersTodayCount,
    totalWordsLearnedToday: 0,
    totalXpEarnedToday,
    activeStreaksCount,
  };
}
