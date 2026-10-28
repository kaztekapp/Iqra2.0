// Minimal App Store Connect API client (ES256 JWT). Usage: node asc.cjs GET /v1/...
const crypto = require('crypto'); const fs = require('fs'); const https = require('https');
const KEY_ID = 'Y69KMN6339', ISSUER = 'b5cc4e16-0d57-4156-9fd0-4a16878ce978';
const key = fs.readFileSync(require('path').join(__dirname, '../credentials/AuthKey_Y69KMN6339.p8'), 'utf8');
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
function jwt() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'ES256', kid: KEY_ID, typ: 'JWT' });
  const body = b64({ iss: ISSUER, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' });
  const sig = crypto.sign('sha256', Buffer.from(`${head}.${body}`), { key, dsaEncoding: 'ieee-p1363' }).toString('base64url');
  return `${head}.${body}.${sig}`;
}
function call(method, path, data) {
  return new Promise((res, rej) => {
    const req = https.request({ host: 'api.appstoreconnect.apple.com', path, method,
      headers: { Authorization: `Bearer ${jwt()}`, 'Content-Type': 'application/json' } }, (r) => {
      let s = ''; r.on('data', (d) => (s += d)); r.on('end', () => res({ status: r.statusCode, body: s ? JSON.parse(s) : null }));
    });
    req.on('error', rej); if (data) req.write(JSON.stringify(data)); req.end();
  });
}
module.exports = { call };
if (require.main === module) call(process.argv[2], process.argv[3]).then((r) => console.log(JSON.stringify(r, null, 1)));
