// Supabase Edge Function: notify-report
//
// Emails the team when someone reports community content, so the "we review
// reports within 24 hours" promise (App Store guideline 1.2) is kept by a
// person being told, not by someone remembering to open the dashboard.
//
// The reporter's phone calls this right after its insert succeeds, the same
// shape as notify-group-message. The caller must be the reporter, the report
// must be fresh, and alerted_at is claimed before sending, so a repeat call
// sends nothing.
//
// Secrets (supabase secrets set ...):
//   RESEND_API_KEY       — from resend.com
//   REPORT_ALERT_TO      — where alerts go (e.g. support@mkaztek.com)
//   REPORT_ALERT_FROM    — optional; defaults to Resend's test sender, which
//                          can only mail the Resend account's own address
//
// Deploy:
//   supabase functions deploy notify-report --project-ref <ref>

import { createClient } from 'npm:@supabase/supabase-js@2';

/** A report older than this was already seen in the dashboard, or never will be by email. */
const MAX_AGE_MINUTES = 10;

type ReportRow = {
  id: string;
  reporter_id: string;
  content_type: string;
  content_id: string;
  reported_user_id: string | null;
  reason: string;
  details: string | null;
  content_snapshot: string | null;
  created_at: string;
  alerted_at: string | null;
};

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  try {
    const { reportId } = await req.json().catch(() => ({ reportId: null }));
    if (!reportId || typeof reportId !== 'string') return json({ error: 'reportId required' }, 400);

    const apiKey = Deno.env.get('RESEND_API_KEY');
    const to = Deno.env.get('REPORT_ALERT_TO');
    if (!apiKey || !to) return json({ error: 'alerts not configured' }, 503);
    const from = Deno.env.get('REPORT_ALERT_FROM') ?? 'Iqra reports <onboarding@resend.dev>';

    const url = Deno.env.get('SUPABASE_URL')!;
    const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    });
    const { data: userData } = await asCaller.auth.getUser();
    const caller = userData?.user;
    if (!caller) return json({ error: 'unauthorized' }, 401);

    const supa = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: report, error } = await supa
      .from('content_reports')
      .select('id, reporter_id, content_type, content_id, reported_user_id, reason, details, content_snapshot, created_at, alerted_at')
      .eq('id', reportId)
      .single<ReportRow>();
    if (error || !report) return json({ error: 'report not found' }, 404);
    if (report.reporter_id !== caller.id) return json({ error: 'not the reporter' }, 403);
    if (report.alerted_at) return json({ sent: false, reason: 'already alerted' });
    const ageMinutes = (Date.now() - Date.parse(report.created_at)) / 60000;
    if (!(ageMinutes < MAX_AGE_MINUTES)) return json({ sent: false, reason: 'too old' });

    const { data: claimed } = await supa
      .from('content_reports')
      .update({ alerted_at: new Date().toISOString() })
      .eq('id', report.id)
      .is('alerted_at', null)
      .select('id');
    if (!claimed || claimed.length === 0) return json({ sent: false, reason: 'already alerted' });

    // How often this person has been reported helps decide how fast to act.
    const { count: priorReports } = report.reported_user_id
      ? await supa
          .from('content_reports')
          .select('id', { count: 'exact', head: true })
          .eq('reported_user_id', report.reported_user_id)
      : { count: null };

    const lines = [
      `Reason: ${report.reason}`,
      `Content: ${report.content_type} ${report.content_id}`,
      `Reported user: ${report.reported_user_id ?? 'unknown'}${priorReports ? ` (${priorReports} report(s) in total)` : ''}`,
      `Reporter: ${report.reporter_id}`,
      `Details: ${report.details ?? '(none)'}`,
      '',
      'Reported content:',
      report.content_snapshot ?? '(no copy saved)',
      '',
      `Report id: ${report.id}`,
      'Review it in the Supabase dashboard (table content_reports) within 24 hours,',
      "then set status to 'actioned' or 'dismissed'.",
    ];

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `[Iqra] New ${report.reason} report (${report.content_type})`,
        text: lines.join('\n'),
      }),
    });
    if (!res.ok) {
      // Release the claim so a later call (or a person) can still alert.
      await supa.from('content_reports').update({ alerted_at: null }).eq('id', report.id);
      return json({ error: 'email failed', status: res.status, body: await res.text() }, 502);
    }
    return json({ sent: true });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
