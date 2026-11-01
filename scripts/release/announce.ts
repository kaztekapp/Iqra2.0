/**
 * Announce a store release, once it is LIVE in the App Store or Google Play.
 *
 *   npx tsx scripts/release/announce.ts --platform ios --version 1.1.1            show what would change
 *   npx tsx scripts/release/announce.ts --platform ios --version 1.1.1 --publish  update app/latest.json
 *   npx tsx scripts/release/announce.ts --platform ios --version 1.1.1 --push     ...and push every device
 *
 * app/latest.json on the voice CDN is what the app's update prompt reads
 * (src/services/storeVersion.ts): anyone on an older binary is asked to
 * update and sent to the store page. --push also sends a notification to
 * every registered device on that platform, in its language; tapping it
 * opens the same store page (services/reminders followTap). Tokens Expo
 * reports as gone are removed from push_tokens.
 *
 * Needs credentials/r2.json, and for --push the Supabase owner token in
 * ~/.supabase/access-token (used to read the project's service key).
 */
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { r2, r2Config } from '../voice/record';

const PROJECT_REF = 'afrqicwexpogxnxmofff';
const SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;
const STORE_URL = {
  ios: 'https://apps.apple.com/app/id6801198221',
  android: 'https://play.google.com/store/apps/details?id=com.iqra2.app',
} as const;
const MESSAGE = {
  en: { title: 'A new version is available', body: 'Update the app to get the latest features and fixes.' },
  fr: { title: 'Une nouvelle version est disponible', body: "Mettez à jour l'application pour profiter des dernières nouveautés." },
} as const;

type Platform = keyof typeof STORE_URL;
const args = process.argv.slice(2);
const value = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

function serviceKey(): string {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) return process.env.SUPABASE_SERVICE_ROLE_KEY;
  const token = readFileSync(join(homedir(), '.supabase', 'access-token'), 'utf8').trim();
  const out = execFileSync('npx', ['supabase', 'projects', 'api-keys', '--project-ref', PROJECT_REF, '-o', 'json'], {
    encoding: 'utf8',
    env: { ...process.env, SUPABASE_ACCESS_TOKEN: token },
  });
  const key = (JSON.parse(out) as { name: string; api_key: string }[]).find((k) => k.name === 'service_role')?.api_key;
  if (!key) throw new Error('no service_role key');
  return key;
}

async function publishLatest(platform: Platform, version: string, write: boolean) {
  const cfg = r2Config();
  const res = await r2(cfg, 'GET', 'app/latest.json');
  const latest = res.ok ? JSON.parse(await res.text()) : {};
  console.log('now:', JSON.stringify(latest));
  latest[platform] = { version, url: STORE_URL[platform] };
  console.log('new:', JSON.stringify(latest));
  if (!write) return;
  const body = Buffer.from(JSON.stringify(latest, null, 2));
  // Short cache: the app should hear about a release within minutes.
  const put = await r2(cfg, 'PUT', 'app/latest.json', '', body, {
    'content-type': 'application/json',
    'cache-control': 'public, max-age=300',
  });
  if (!put.ok) throw new Error(`r2 put ${put.status}: ${await put.text()}`);
  console.log('published app/latest.json');
}

async function pushAll(platform: Platform) {
  const key = serviceKey();
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/push_tokens?select=token,lang&platform=eq.${platform}`, { headers });
  if (!res.ok) throw new Error(`push_tokens ${res.status}: ${await res.text()}`);
  const devices = (await res.json()) as { token: string; lang: 'en' | 'fr' }[];
  console.log(`${devices.length} ${platform} devices`);

  const gone: string[] = [];
  let sent = 0;
  for (let i = 0; i < devices.length; i += 100) {
    const batch = devices.slice(i, i + 100);
    const messages = batch.map((d) => ({
      to: d.token,
      sound: 'default',
      ...MESSAGE[d.lang === 'fr' ? 'fr' : 'en'],
      data: { app: 'iqra-update', url: STORE_URL[platform] },
    }));
    const r = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(messages),
    });
    const out = (await r.json()) as { data?: { status: string; details?: { error?: string } }[] };
    (out.data ?? []).forEach((ticket, j) => {
      if (ticket.status === 'ok') sent++;
      else if (ticket.details?.error === 'DeviceNotRegistered') gone.push(batch[j].token);
      else console.warn('not sent:', JSON.stringify(ticket));
    });
  }
  if (gone.length) {
    const list = gone.map((t) => `"${t}"`).join(',');
    await fetch(`${SUPABASE_URL}/rest/v1/push_tokens?token=in.(${encodeURIComponent(list)})`, { method: 'DELETE', headers });
  }
  console.log(`sent ${sent}, removed ${gone.length} stale tokens`);
}

async function main() {
  const platform = value('--platform') as Platform;
  const version = value('--version');
  if (!(platform in STORE_URL) || !version || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error('usage: --platform ios|android --version 1.2.3 [--publish] [--push]');
  }
  const push = args.includes('--push');
  await publishLatest(platform, version, push || args.includes('--publish'));
  if (push) await pushAll(platform);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
