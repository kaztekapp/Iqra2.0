/**
 * Reporting and blocking in the community (App Store guideline 1.2, Google
 * Play UGC policy). Tables: content_reports, blocked_users
 * (supabase/migrations/add_moderation.sql).
 *
 * Unlike most community calls these throw on failure: they answer a button
 * the person pressed, and the screen has to be able to say it did not work.
 */
import { supabase } from '../lib/supabase';
import { maskProfanity } from '../lib/profanityFilter';
import { quietly } from '../lib/report';

export type ReportContentType = 'group_message' | 'discussion_thread' | 'discussion_reply' | 'user';
export type ReportReason = 'spam' | 'harassment' | 'hate' | 'sexual' | 'other';

export const REPORT_REASONS: ReportReason[] = ['spam', 'harassment', 'hate', 'sexual', 'other'];

export interface ReportInput {
  contentType: ReportContentType;
  contentId: string;
  reportedUserId?: string | null;
  reason: ReportReason;
  details?: string;
  /** What the person saw, kept so the report can be judged after an edit or delete. */
  snapshot?: string | null;
}

export interface BlockedUserRow {
  blockedId: string;
  createdAt: string;
}

function getClient() {
  if (!supabase) throw new Error('Supabase not configured');
  return supabase;
}

/** Ids that are not real rows (local fallbacks, simulated content) cannot be blocked server-side. */
function isUuid(id: string | null | undefined): id is string {
  return !!id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export async function reportContent(reporterId: string, input: ReportInput): Promise<void> {
  const client = getClient();
  const details = input.details?.trim().slice(0, 1000) || null;
  const snapshot = input.snapshot ? input.snapshot.slice(0, 4000) : null;
  const { data, error } = await client.from('content_reports').insert({
    reporter_id: reporterId,
    content_type: input.contentType,
    content_id: input.contentId,
    reported_user_id: isUuid(input.reportedUserId) ? input.reportedUserId : null,
    reason: input.reason,
    details,
    content_snapshot: snapshot,
  }).select('id').single<{ id: string }>();
  if (error) throw error;
  // The report is saved; emailing the team is best-effort and must not turn a
  // successful report into an error on screen.
  client.functions
    .invoke('notify-report', { body: { reportId: data.id } })
    .catch((e) => quietly(e, 'moderation.notifyReport'));
}

export async function blockUser(blockerId: string, blockedId: string): Promise<void> {
  if (!isUuid(blockedId)) return; // sample content: hiding it locally is all there is to do
  const client = getClient();
  const { error } = await client
    .from('blocked_users')
    .upsert({ blocker_id: blockerId, blocked_id: blockedId }, { onConflict: 'blocker_id,blocked_id', ignoreDuplicates: true });
  if (error) throw error;
}

export async function unblockUser(blockerId: string, blockedId: string): Promise<void> {
  if (!isUuid(blockedId)) return;
  const client = getClient();
  const { error } = await client
    .from('blocked_users')
    .delete()
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId);
  if (error) throw error;
}

export async function fetchBlockedUsers(blockerId: string): Promise<BlockedUserRow[]> {
  const client = getClient();
  const { data, error } = await client
    .from('blocked_users')
    .select('blocked_id, created_at')
    .eq('blocker_id', blockerId);
  if (error) throw error;
  return (data || []).map((r: any) => ({ blockedId: r.blocked_id, createdAt: r.created_at }));
}

/** Display names for ids blocked on another device, which this one has no name for. */
export async function fetchDisplayNames(userIds: string[]): Promise<Record<string, string>> {
  const ids = userIds.filter(isUuid);
  if (ids.length === 0) return {};
  const client = getClient();
  const { data, error } = await client
    .from('user_profiles')
    .select('user_id, display_name')
    .in('user_id', ids);
  if (error) throw error;
  const out: Record<string, string> = {};
  for (const r of data || []) {
    if ((r as any).display_name) out[(r as any).user_id] = maskProfanity((r as any).display_name);
  }
  return out;
}
