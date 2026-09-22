// Supabase Edge Function: notify-group-message
//
// Sends one group message to every other member's devices, so a message
// arrives while their app is closed. The sender's phone calls this right
// after the insert succeeds — it is the one device we know is awake.
//
// What stops it being a way to spam people, since any signed-in client can
// call it: the message must exist, the caller must be its author, it must be
// less than five minutes old, and it is marked notified_at the first time,
// so calling twice sends nothing the second time. Nothing here trusts the
// caller for anything beyond the message id.
//
// Deploy:
//   supabase functions deploy notify-group-message --project-ref <ref>

import { createClient } from 'npm:@supabase/supabase-js@2';

const EXPO_PUSH = 'https://exp.host/--/api/v2/push/send';
/** Expo's cap per request. */
const PUSH_BATCH = 100;
/** A message older than this is history, not news. */
const MAX_AGE_MINUTES = 5;

type MessageRow = {
  id: string;
  group_id: string;
  user_id: string;
  author_name: string;
  body: string | null;
  type: string;
  created_at: string;
  notified_at: string | null;
  is_deleted: boolean | null;
};

type TokenRow = { token: string; user_id: string; lang: 'en' | 'fr' };

/** What the notification says for a message that is not plain text. */
const PREVIEW: Record<string, { en: string; fr: string }> = {
  voice: { en: 'Voice message', fr: 'Message vocal' },
  image: { en: 'Photo', fr: 'Photo' },
  shared: { en: 'Shared something', fr: 'A partagé un contenu' },
  lesson: { en: 'Shared a lesson', fr: 'A partagé une leçon' },
  quiz: { en: 'Shared a quiz', fr: 'A partagé un quiz' },
  poll: { en: 'Started a poll', fr: 'A lancé un sondage' },
  board: { en: 'Shared a board', fr: 'A partagé un tableau' },
};

function preview(message: MessageRow, lang: 'en' | 'fr'): string {
  const fixed = PREVIEW[message.type];
  if (fixed) return fixed[lang];
  const body = (message.body ?? '').replace(/\s+/g, ' ').trim();
  if (!body) return lang === 'fr' ? 'Nouveau message' : 'New message';
  // The OS truncates anyway; this keeps the payload small.
  return body.length > 140 ? `${body.slice(0, 139)}…` : body;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  try {
    const { messageId } = await req.json().catch(() => ({ messageId: null }));
    if (!messageId || typeof messageId !== 'string') return json({ error: 'messageId required' }, 400);

    const url = Deno.env.get('SUPABASE_URL')!;
    const authHeader = req.headers.get('Authorization') ?? '';

    // Who is calling. Uses the caller's own token, so this cannot be forged.
    const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await asCaller.auth.getUser();
    const caller = userData?.user;
    if (!caller) return json({ error: 'unauthorized' }, 401);

    // Everything else reads across members' rows, which RLS rightly hides
    // from the caller, so it goes through the service role.
    const supa = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: message, error: msgErr } = await supa
      .from('group_messages')
      .select('id, group_id, user_id, author_name, body, type, created_at, notified_at, is_deleted')
      .eq('id', messageId)
      .single<MessageRow>();
    if (msgErr || !message) return json({ error: 'message not found' }, 404);

    if (message.user_id !== caller.id) return json({ error: 'not the author' }, 403);
    if (message.notified_at) return json({ sent: 0, reason: 'already notified' });
    if (message.is_deleted) return json({ sent: 0, reason: 'deleted' });
    if (message.type === 'system' || message.type === 'milestone') {
      return json({ sent: 0, reason: 'not a person talking' });
    }
    const ageMinutes = (Date.now() - Date.parse(message.created_at)) / 60000;
    if (!(ageMinutes < MAX_AGE_MINUTES)) return json({ sent: 0, reason: 'too old' });

    // Claim it before sending: a second call while this one is in flight gets
    // "already notified" instead of sending everything twice.
    const { data: claimed } = await supa
      .from('group_messages')
      .update({ notified_at: new Date().toISOString() })
      .eq('id', message.id)
      .is('notified_at', null)
      .select('id');
    if (!claimed || claimed.length === 0) return json({ sent: 0, reason: 'already notified' });

    const { data: members } = await supa
      .from('study_group_members')
      .select('user_id, muted')
      .eq('group_id', message.group_id);

    const recipients = (members ?? [])
      .filter((m) => m.user_id !== message.user_id && !m.muted)
      .map((m) => m.user_id);
    if (recipients.length === 0) return json({ sent: 0, reason: 'nobody to tell' });

    const { data: group } = await supa
      .from('study_groups')
      .select('name')
      .eq('id', message.group_id)
      .single<{ name: string }>();

    const { data: tokens } = await supa
      .from('push_tokens')
      .select('token, user_id, lang')
      .in('user_id', recipients);
    if (!tokens || tokens.length === 0) return json({ sent: 0, reason: 'no devices' });

    const route = `/community/groups/${message.group_id}`;
    const messages = (tokens as TokenRow[]).map((t) => {
      const lang = t.lang === 'fr' ? 'fr' : 'en';
      return {
        to: t.token,
        sound: 'default',
        // The group is the headline; who spoke belongs with what they said,
        // the way every chat app writes it.
        title: group?.name ?? (lang === 'fr' ? 'Groupe' : 'Group'),
        body: `${message.author_name}: ${preview(message, lang)}`,
        channelId: 'messages',
        // Collapse to the newest message per group rather than stacking a
        // wall of notifications when a conversation is lively.
        collapseId: message.group_id,
        data: { app: 'iqra-push', kind: 'group_message', route, groupId: message.group_id },
      };
    });

    let sent = 0;
    const stale: string[] = [];
    for (let i = 0; i < messages.length; i += PUSH_BATCH) {
      const batch = messages.slice(i, i + PUSH_BATCH);
      const res = await fetch(EXPO_PUSH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(batch),
      });
      if (!res.ok) continue;
      const out = await res.json().catch(() => null);
      const tickets = out?.data ?? [];
      tickets.forEach((ticket: { status?: string; details?: { error?: string } }, k: number) => {
        if (ticket?.status === 'ok') sent += 1;
        // The app was uninstalled, or the token was replaced. Forget it, or
        // every later push pays for a device that no longer exists.
        else if (ticket?.details?.error === 'DeviceNotRegistered') stale.push(batch[k].to);
      });
    }

    if (stale.length > 0) await supa.from('push_tokens').delete().in('token', stale);

    return json({ sent, devices: messages.length, dropped: stale.length });
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
