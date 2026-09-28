// Regenerates docs/privacy-policy.html and docs/terms-of-service.html from
// src/data/legal/index.ts so the web copy matches the app word for word.
// Run from the repo root: node scripts/generate-legal-html.cjs
const fs = require('fs'), path = require('path');
const ts = require(path.resolve('node_modules/typescript'));
const src = fs.readFileSync('src/data/legal/index.ts', 'utf8');
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const m = { exports: {} }; new Function('module', 'exports', js)(m, m.exports);
const { LEGAL_CONSTANTS: C, PRIVACY_POLICY_SECTIONS: P, TERMS_OF_SERVICE_SECTIONS: T } = m.exports;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const style = fs.readFileSync('docs/privacy-policy.html', 'utf8').match(/<style>[\s\S]*?<\/style>/)[0]
  .replace('</style>', `    .lang { font-size: 14px; margin-bottom: 24px; }
    .lang a { margin-right: 12px; }
    ul { margin: 0 0 12px 20px; color: #334155; }
    li { margin-bottom: 6px; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 48px 0 32px; }
  </style>`);
const date = { en: 'September 28, 2026', fr: '28 septembre 2026' };
function body(sections) {
  return sections.map((s) => {
    let out = '', list = [];
    const flush = () => { if (list.length) { out += `      <ul>\n${list.map((l) => `        <li>${esc(l)}</li>`).join('\n')}\n      </ul>\n`; list = []; } };
    for (const line of s.content) {
      if (line.startsWith('• ')) list.push(line.slice(2));
      else { flush(); out += `      <p>${esc(line).replace(C.email, `<a href="mailto:${C.email}">${C.email}</a>`)}</p>\n`; }
    }
    flush();
    return `    <div class="section">\n      <h2>${esc(s.title)}</h2>\n${out}    </div>`;
  }).join('\n\n');
}
function page(file, titles, sections) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titles.en} - Iqra</title>
  ${style}
</head>
<body>
  <!-- Generated from src/data/legal/index.ts — edit that file and run node scripts/generate-legal-html.cjs. -->
  <div class="container">
    <h1>${titles.en}</h1>
    <p class="date">${esc(C.appName)} · Effective Date: ${date.en}</p>
    <p class="lang"><a href="#en">English</a><a href="#fr">Français</a></p>

    <div id="en">
${body(sections.en)}
    </div>

    <hr>

    <div id="fr" lang="fr">
    <h1>${titles.fr}</h1>
    <p class="date">${esc(C.appName)} · Date d'entrée en vigueur : ${date.fr}</p>

${body(sections.fr)}
    </div>

    <div class="footer">
      <p>${C.company}</p>
      <a href="mailto:${C.email}">Contact Us: ${C.email}</a>
    </div>
  </div>
</body>
</html>
`;
  fs.writeFileSync(file, html);
}
page('docs/privacy-policy.html', { en: 'Privacy Policy', fr: 'Politique de confidentialité' }, P);
page('docs/terms-of-service.html', { en: 'Terms of Service', fr: "Conditions d'utilisation" }, T);
