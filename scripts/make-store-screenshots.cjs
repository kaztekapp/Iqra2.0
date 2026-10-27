// Store screenshots: each raw phone screenshot framed under its caption, in the
// app's garden palette, at the exact sizes App Store Connect and Play accept.
//
//   1. Take the shots on the phone (see store/screenshots.md for the list and
//      what each must show), English shots with the app in English, French
//      shots with the app in French.
//   2. Put them in store/raw/en/1.png … 8.png and store/raw/fr/1.png … 8.png
//      (.png, .jpg or .jpeg; the number is the shot number in the table).
//   3. node scripts/make-store-screenshots.cjs
//
// Output (opaque PNG, no alpha, which App Store Connect rejects):
//   store/screenshots/app-store/{en,fr}/N.png   1320 x 2868 (iPhone 6.9")
//   store/screenshots/play/{en,fr}/N.png        1080 x 2340 (phone, 9:19.5)
//
// Captions come from the shot list table in store/screenshots.md, so that
// file stays the one place they are written. Rendering is headless Brave
// (Chrome works too: set BROWSER to its binary).
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const { PNG } = require('pngjs');

const ROOT = path.resolve(__dirname, '..');
const BROWSER =
  process.env.BROWSER ||
  ['/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find((p) => fs.existsSync(p));

const TARGETS = [
  { name: 'app-store', width: 1320, height: 2868 },
  { name: 'play', width: 1080, height: 2340 },
];
// Everything is laid out on a 1320-wide canvas and scaled to each target.
const BASE_WIDTH = 1320;

const C = {
  mint50: '#F3F8F4',
  mint100: '#E6F0E9',
  mint200: '#D2E2D7',
  emerald700: '#176340',
  gold500: '#C9A23A',
  ink900: '#14261C',
};

function captions() {
  const md = fs.readFileSync(path.join(ROOT, 'store/screenshots.md'), 'utf8');
  const out = {};
  for (const line of md.split('\n')) {
    const m = line.match(/^\|\s*(\d+)\s*\|[^|]*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$/);
    if (m) out[m[1]] = { en: m[2], fr: m[3] };
  }
  return out;
}

function findRaw(locale, n) {
  for (const ext of ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG']) {
    const p = path.join(ROOT, 'store/raw', locale, `${n}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page({ caption, imagePath, width, height }) {
  const scale = width / BASE_WIDTH;
  const baseHeight = Math.round(height / scale);
  const mime = /\.png$/i.test(imagePath) ? 'image/png' : 'image/jpeg';
  const data = fs.readFileSync(imagePath).toString('base64');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  html, body { margin: 0; width: ${width}px; height: ${height}px; overflow: hidden; background: ${C.mint50}; }
  .canvas {
    width: ${BASE_WIDTH}px; height: ${baseHeight}px; transform: scale(${scale}); transform-origin: 0 0;
    position: relative; overflow: hidden;
    background: linear-gradient(160deg, ${C.mint50} 0%, ${C.mint100} 100%);
    font-family: -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
  }
  .star { position: absolute; top: -150px; right: -150px; width: 400px; height: 400px; opacity: .35; }
  h1 {
    position: absolute; top: 190px; left: 110px; right: 110px; margin: 0;
    text-align: center; color: ${C.emerald700};
    font-size: 92px; line-height: 1.1; font-weight: 700; letter-spacing: -1.5px;
    text-wrap: balance;
  }
  .phone {
    position: absolute; left: 50%; top: 520px; transform: translateX(-50%);
    width: 1000px; padding: 14px; border-radius: 86px; background: ${C.ink900};
    box-shadow: 0 40px 90px rgba(20, 38, 28, .22), 0 6px 18px rgba(20, 38, 28, .12);
  }
  .phone img { display: block; width: 100%; border-radius: 72px; }
</style></head><body><div class="canvas">
  <svg class="star" viewBox="0 0 120 120" aria-hidden="true">
    <g fill="none" stroke="${C.gold500}" stroke-width="1.2">
      <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z"/>
      <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" transform="rotate(45 60 60)"/>
      <circle cx="60" cy="60" r="14"/>
    </g>
  </svg>
  <h1>${escapeHtml(caption)}</h1>
  <div class="phone"><img src="data:${mime};base64,${data}"></div>
</div></body></html>`;
}

function render(html, out, width, height) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'iqra-shot-'));
  const htmlPath = path.join(tmp, 'shot.html');
  fs.writeFileSync(htmlPath, html);
  execFileSync(BROWSER, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${width},${height}`, `--screenshot=${out}`, `file://${htmlPath}`,
  ], { stdio: 'ignore' });
  fs.rmSync(tmp, { recursive: true, force: true });
  // Opaque, and exactly the size the store asked for.
  const png = PNG.sync.read(fs.readFileSync(out));
  if (png.width !== width || png.height !== height) {
    throw new Error(`${out}: rendered ${png.width}x${png.height}, expected ${width}x${height}`);
  }
  for (let i = 3; i < png.data.length; i += 4) png.data[i] = 255;
  fs.writeFileSync(out, PNG.sync.write(png, { colorType: 2 }));
}

function main() {
  if (!BROWSER) throw new Error('No Brave or Chrome found; set BROWSER to a Chromium binary.');
  const caps = captions();
  const shots = Object.keys(caps).sort((a, b) => a - b);
  let made = 0;
  const missing = [];
  for (const locale of ['en', 'fr']) {
    for (const n of shots) {
      const raw = findRaw(locale, n);
      if (!raw) { missing.push(`store/raw/${locale}/${n}.png`); continue; }
      for (const t of TARGETS) {
        const dir = path.join(ROOT, 'store/screenshots', t.name, locale);
        fs.mkdirSync(dir, { recursive: true });
        const out = path.join(dir, `${n}.png`);
        render(page({ caption: caps[n][locale], imagePath: raw, width: t.width, height: t.height }), out, t.width, t.height);
        made += 1;
      }
      console.log(`${locale} ${n}: ${caps[n][locale]}`);
    }
  }
  console.log(`\n${made} images written under store/screenshots/.`);
  if (missing.length) console.log(`Not taken yet (${missing.length}):\n  ${missing.join('\n  ')}`);
}

main();
