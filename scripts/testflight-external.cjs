#!/usr/bin/env node
// Push a TestFlight build to the External Testers group.
//
//   node scripts/testflight-external.cjs <buildNumber> [version]
//   node scripts/testflight-external.cjs 8 1.1.0
//
// Creates the Beta App Review submission for the build (Apple requires one
// before external testers can see it) and adds the build to every external
// beta group. Uses the App Store Connect key from eas.json's submit profile;
// nothing else is read or changed.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const [, , buildNumber, version = '1.1.0'] = process.argv;
if (!buildNumber) {
  console.error('usage: node scripts/testflight-external.cjs <buildNumber> [version]');
  process.exit(1);
}

const submit = require(path.join(__dirname, '..', 'eas.json')).submit.production.ios;
const key = fs.readFileSync(path.join(__dirname, '..', submit.ascApiKeyPath), 'utf8');
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const head = b64({ alg: 'ES256', kid: submit.ascApiKeyId, typ: 'JWT' });
const body = b64({ iss: submit.ascApiKeyIssuerId, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' });
const sig = crypto.sign('sha256', Buffer.from(`${head}.${body}`), { key, dsaEncoding: 'ieee-p1363' }).toString('base64url');
const jwt = `${head}.${body}.${sig}`;

async function api(method, route, payload) {
  const res = await fetch(`https://api.appstoreconnect.apple.com/v1${route}`, {
    method,
    headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  const text = await res.text();
  let json = {};
  try { json = JSON.parse(text); } catch { /* empty 204 bodies */ }
  if (!res.ok) {
    const detail = (json.errors || []).map((e) => `${e.code}: ${e.detail}`).join('; ') || text.slice(0, 300);
    // Already submitted / already in the group are fine: keep going.
    if (res.status === 409 && /already|exists/i.test(detail)) { console.log(`  ${method} ${route}: ${detail}`); return json; }
    throw new Error(`${method} ${route} → ${res.status} ${detail}`);
  }
  return json;
}

(async () => {
  const app = submit.ascAppId;
  const found = await api('GET', `/builds?filter[app]=${app}&filter[version]=${buildNumber}&filter[preReleaseVersion.version]=${version}&fields[builds]=version,processingState,expired`);
  const build = (found.data || [])[0];
  if (!build) throw new Error(`no build ${buildNumber} for version ${version}`);
  console.log(`build ${buildNumber} (${version}) id ${build.id}, ${build.attributes.processingState}${build.attributes.expired ? ', EXPIRED' : ''}`);

  const groups = await api('GET', `/apps/${app}/betaGroups?fields[betaGroups]=name,isInternalGroup`);
  const external = (groups.data || []).filter((g) => !g.attributes.isInternalGroup);
  if (external.length === 0) throw new Error('no external beta group on this app');

  console.log('submitting for Beta App Review...');
  await api('POST', '/betaAppReviewSubmissions', {
    data: { type: 'betaAppReviewSubmissions', relationships: { build: { data: { type: 'builds', id: build.id } } } },
  });

  for (const g of external) {
    await api('POST', `/betaGroups/${g.id}/relationships/builds`, { data: [{ type: 'builds', id: build.id }] });
    const inGroup = await api('GET', `/betaGroups/${g.id}/builds?fields[builds]=version&limit=20`);
    console.log(`added to "${g.attributes.name}" — builds in group now: ${(inGroup.data || []).map((b) => b.attributes.version).join(', ')}`);
  }

  const detail = await api('GET', `/builds/${build.id}/buildBetaDetail?fields[buildBetaDetails]=externalBuildState,internalBuildState`);
  console.log('build state:', detail.data && detail.data.attributes);
  console.log('\nDone. Testers get the TestFlight notification once Apple approves the beta review.');
})().catch((e) => { console.error(e.message); process.exit(1); });
