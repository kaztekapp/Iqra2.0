// Upload store/screenshots/app-store/{en,fr}/1..7.png (from make-store-screenshots.cjs) into the
// 6.9" iPhone screenshot set of the app's newest App Store version, replacing what is there.
//   node scripts/upload-asc-screenshots.cjs
const fs = require('fs'), path = require('path'), crypto = require('crypto'), https = require('https');
const { call } = require('./asc.cjs');
const ROOT = path.join(__dirname, '../store/screenshots/app-store');
const LOCALES = { 'en-US': 'en', 'fr-FR': 'fr' };
const TYPE = 'APP_IPHONE_67';
function put(op, buf) {
  return new Promise((res, rej) => {
    const u = new URL(op.url);
    const headers = {}; for (const h of op.requestHeaders || []) headers[h.name] = h.value;
    headers['Content-Length'] = op.length;
    const req = https.request({ host: u.host, path: u.pathname + u.search, method: op.method, headers }, (r) => { r.resume(); r.on('end', () => (r.statusCode < 300 ? res() : rej(new Error('upload ' + r.statusCode)))); });
    req.on('error', rej); req.write(buf.subarray(op.offset, op.offset + op.length)); req.end();
  });
}
(async () => {
  const v = await call('GET', '/v1/apps/6801198221/appStoreVersions?limit=1');
  const locs = await call('GET', `/v1/appStoreVersions/${v.body.data[0].id}/appStoreVersionLocalizations`);
  for (const loc of locs.body.data) {
    const dir = LOCALES[loc.attributes.locale]; if (!dir) continue;
    const sets = await call('GET', `/v1/appStoreVersionLocalizations/${loc.id}/appScreenshotSets`);
    let set = sets.body.data.find((s) => s.attributes.screenshotDisplayType === TYPE);
    if (!set) {
      const c = await call('POST', '/v1/appScreenshotSets', { data: { type: 'appScreenshotSets', attributes: { screenshotDisplayType: TYPE },
        relationships: { appStoreVersionLocalization: { data: { type: 'appStoreVersionLocalizations', id: loc.id } } } } });
      if (c.status >= 300) throw new Error(JSON.stringify(c.body)); set = c.body.data;
    }
    const existing = await call('GET', `/v1/appScreenshotSets/${set.id}/appScreenshots`);
    // Replace the set: remove what is there before uploading the new images.
    for (const old of existing.body.data) { const d = await call('DELETE', `/v1/appScreenshots/${old.id}`); console.log(loc.attributes.locale, 'removed leftover', old.id, d.status); }
    const ids = [];
    for (let n = 1; n <= 7; n++) {
      const file = path.join(ROOT, dir, `${n}.png`); const buf = fs.readFileSync(file);
      const r = await call('POST', '/v1/appScreenshots', { data: { type: 'appScreenshots', attributes: { fileName: `iqra-${dir}-${n}.png`, fileSize: buf.length },
        relationships: { appScreenshotSet: { data: { type: 'appScreenshotSets', id: set.id } } } } });
      if (r.status >= 300) throw new Error(JSON.stringify(r.body));
      const shot = r.body.data;
      for (const op of shot.attributes.uploadOperations) await put(op, buf);
      const md5 = crypto.createHash('md5').update(buf).digest('hex');
      const c = await call('PATCH', `/v1/appScreenshots/${shot.id}`, { data: { type: 'appScreenshots', id: shot.id, attributes: { uploaded: true, sourceFileChecksum: md5 } } });
      if (c.status >= 300) throw new Error(JSON.stringify(c.body));
      ids.push(shot.id); console.log(loc.attributes.locale, n, 'uploaded');
    }
    const o = await call('PATCH', `/v1/appScreenshotSets/${set.id}/relationships/appScreenshots`, { data: ids.map((id) => ({ type: 'appScreenshots', id })) });
    console.log(loc.attributes.locale, 'order set:', o.status);
  }
})().catch((e) => { console.error('FAILED', e.message); process.exit(1); });
