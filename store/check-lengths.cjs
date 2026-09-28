/* global __dirname */
// Checks every store field against its limit: node store/check-lengths.cjs
// Pulls the fenced blocks out of the markdown by the bold label above them.
const fs = require('fs');
const path = require('path');

const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');

/** Text of the first ``` block after `label` inside `section` (or the whole file). */
function field(text, label, after = '') {
  const start = after ? text.indexOf(after) : 0;
  if (start < 0) throw new Error(`section not found: ${after}`);
  const at = text.indexOf(label, start);
  if (at < 0) throw new Error(`label not found: ${label} (${after})`);
  const m = /```\n([\s\S]*?)\n```/.exec(text.slice(at));
  return m[1];
}

const as = read('app-store.md');
const gp = read('google-play.md');
const EN = '## en-US';
const FR = '## fr-FR';

// Play full descriptions = App Store description with one line swapped.
const playFull = (loc, from, to) => field(as, '**Description', loc).replace(from, to.replace(/^• /, ''));

const checks = [
  ['AS en name', field(as, '**Name**', EN), 30],
  ['AS en subtitle', field(as, '**Subtitle**', EN), 30],
  ['AS en promo', field(as, '**Promotional text**', EN), 170],
  ['AS en description', field(as, '**Description**', EN), 4000],
  ['AS en keywords', field(as, '**Keywords**', EN), 100],
  ['AS en whats new', field(as, "**What's New", EN), 4000],
  ['AS fr name', field(as, '**Nom**', FR), 30],
  ['AS fr subtitle', field(as, '**Sous-titre**', FR), 30],
  ['AS fr promo', field(as, '**Texte promotionnel**', FR), 170],
  ['AS fr description', field(as, '**Description**', FR), 4000],
  ['AS fr keywords', field(as, '**Mots-clés**', FR), 100],
  ['GP en title', field(gp, '**App name**', EN), 30],
  ['GP en short', field(gp, '**Short description**', EN), 80],
  ['GP en full', playFull(EN, 'Keeps playing in the background with the screen locked', field(gp, '**Full description**', EN)), 4000],
  ['GP fr title', field(gp, "**Nom de l'application**", FR), 30],
  ['GP fr short', field(gp, '**Description courte**', FR), 80],
  ['GP fr full', playFull(FR, 'La lecture continue en arrière-plan, écran verrouillé', field(gp, '**Description complète**', FR)), 4000],
  ['GP notes en', field(gp, 'EN\n', '## Release notes'), 500],
  ['GP notes fr', field(gp, 'FR\n', '## Release notes'), 500],
];

// Screenshot captions: columns 3 and 4 of the shot-list table.
for (const line of read('screenshots.md').split('\n')) {
  const cells = line.split('|').map((c) => c.trim());
  if (/^\d+$/.test(cells[1] || '')) {
    checks.push([`shot ${cells[1]} en`, cells[3], 30], [`shot ${cells[1]} fr`, cells[4], 30]);
  }
}

let bad = 0;
for (const [name, text, max] of checks) {
  const n = [...text].length; // count code points, as the stores do
  const ok = n <= max;
  if (!ok) bad++;
  console.log(`${ok ? 'ok ' : 'OVER'} ${String(n).padStart(4)}/${max}  ${name}`);
}

// Keywords must not repeat words already indexed from the name and subtitle.
for (const [loc, nameL, subL, kwL] of [[EN, '**Name**', '**Subtitle**', '**Keywords**'], [FR, '**Nom**', '**Sous-titre**', '**Mots-clés**']]) {
  const words = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z]+/).filter((w) => w.length > 2);
  const indexed = new Set([...words(field(as, nameL, loc)), ...words(field(as, subL, loc))]);
  const kws = field(as, kwL, loc).split(',');
  if (field(as, kwL, loc).includes(' ')) { bad++; console.log(`OVER ${loc} keywords contain spaces`); }
  const dup = kws.filter((k) => words(k).some((w) => indexed.has(w)));
  if (dup.length) { bad++; console.log(`OVER ${loc} keywords repeat name/subtitle words: ${dup.join(', ')}`); }
}

process.exit(bad ? 1 : 0);
