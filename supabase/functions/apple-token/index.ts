// Sign in with Apple: keep the user's Apple refresh token, and revoke it when
// they delete their account.
//
// App Store Review Guideline 5.1.1(v): an app that offers Sign in with Apple
// and account deletion must revoke the user's Apple tokens on deletion.
//
//   POST { action: 'store', code }  - right after an Apple sign-in. `code` is
//     the one-time authorizationCode from the device; it is exchanged here for
//     a refresh token, which is kept in public.apple_tokens (service role only).
//   POST { action: 'revoke' }       - before the account is deleted. Revokes the
//     kept token with Apple and forgets it. Succeeds when there is nothing to
//     revoke (not an Apple user, or already revoked).
//
// Secrets: APPLE_TEAM_ID, APPLE_SIWA_KEY_ID, APPLE_SIWA_PRIVATE_KEY_B64 (the
// .p8 file, base64), APPLE_CLIENT_ID (the app's bundle id).

import { createClient } from 'npm:@supabase/supabase-js@2';

const APPLE = 'https://appleid.apple.com';

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const asCaller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
    });
    const { data: userData } = await asCaller.auth.getUser();
    const caller = userData?.user;
    if (!caller) return json({ error: 'unauthorized' }, 401);

    const { action, code } = await req.json().catch(() => ({}));
    const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    if (action === 'store') {
      if (typeof code !== 'string' || !code) return json({ error: 'code required' }, 400);
      const res = await fetch(`${APPLE}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId(),
          client_secret: await clientSecret(),
          code,
          grant_type: 'authorization_code',
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || typeof body.refresh_token !== 'string') {
        console.error('apple-token: exchange refused', res.status, body.error);
        // Apple's error code (invalid_grant: the code is spent or expired;
        // invalid_client: the key or ids are wrong) is safe to show.
        return json({ error: 'exchange failed', apple: body.error ?? null }, 502);
      }
      const { error } = await admin
        .from('apple_tokens')
        .upsert({ user_id: caller.id, refresh_token: body.refresh_token, created_at: new Date().toISOString() });
      if (error) throw error;
      return json({ stored: true });
    }

    if (action === 'revoke') {
      const { data: row, error } = await admin
        .from('apple_tokens')
        .select('refresh_token')
        .eq('user_id', caller.id)
        .maybeSingle();
      if (error) throw error;
      if (!row) return json({ revoked: false, reason: 'nothing kept' });
      const res = await fetch(`${APPLE}/auth/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId(),
          client_secret: await clientSecret(),
          token: row.refresh_token,
          token_type_hint: 'refresh_token',
        }),
      });
      // Apple answers 200 for a token that is already revoked or expired too.
      if (!res.ok) {
        console.error('apple-token: revoke refused', res.status, await res.text());
        return json({ error: 'revoke failed' }, 502);
      }
      await admin.from('apple_tokens').delete().eq('user_id', caller.id);
      return json({ revoked: true });
    }

    return json({ error: 'unknown action' }, 400);
  } catch (e) {
    console.error('apple-token:', e instanceof Error ? e.message : e);
    return json({ error: 'server error' }, 500);
  }
});

function clientId(): string {
  return Deno.env.get('APPLE_CLIENT_ID') ?? 'com.iqra2.app';
}

/** The ES256 client secret Apple wants: a short-lived JWT signed with the SIWA key. */
async function clientSecret(): Promise<string> {
  const teamId = Deno.env.get('APPLE_TEAM_ID');
  const keyId = Deno.env.get('APPLE_SIWA_KEY_ID');
  const pemB64 = Deno.env.get('APPLE_SIWA_PRIVATE_KEY_B64');
  if (!teamId || !keyId || !pemB64) throw new Error('apple secrets missing');
  const pem = atob(pemB64);
  const der = Uint8Array.from(
    atob(pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')),
    (c) => c.charCodeAt(0),
  );
  const key = await crypto.subtle.importKey('pkcs8', der, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const now = Math.floor(Date.now() / 1000);
  const enc = (o: unknown) => b64url(new TextEncoder().encode(JSON.stringify(o)));
  const head = enc({ alg: 'ES256', kid: keyId });
  const claims = enc({ iss: teamId, iat: now, exp: now + 300, aud: APPLE, sub: clientId() });
  const sig = new Uint8Array(
    await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(`${head}.${claims}`)),
  );
  return `${head}.${claims}.${b64url(sig)}`;
}

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}
