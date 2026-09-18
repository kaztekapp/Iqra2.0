import { readFileSync } from 'fs';
import { join } from 'path';

// Both locale files are TypeScript objects; compare their key paths.
function keyPaths(src: string): Set<string> {
  const out = new Set<string>();
  const stack: string[] = [];
  for (const line of src.split('\n')) {
    const open = line.match(/^\s*([A-Za-z0-9_]+):\s*\{\s*$/);
    const leaf = line.match(/^\s*([A-Za-z0-9_]+):\s*['"`]/);
    if (open) stack.push(open[1]);
    else if (leaf) out.add([...stack, leaf[1]].join('.'));
    else if (/^\s*\},?\s*$/.test(line)) stack.pop();
  }
  return out;
}

describe('locales', () => {
  const dir = join(__dirname, '..', 'src', 'i18n', 'locales');
  const en = keyPaths(readFileSync(join(dir, 'en.ts'), 'utf8'));
  const fr = keyPaths(readFileSync(join(dir, 'fr.ts'), 'utf8'));

  it('have the same keys in English and French', () => {
    const onlyEn = [...en].filter((k) => !fr.has(k));
    const onlyFr = [...fr].filter((k) => !en.has(k));
    expect({ onlyEn, onlyFr }).toEqual({ onlyEn: [], onlyFr: [] });
  });

  it('have a meaningful number of keys', () => {
    expect(en.size).toBeGreaterThan(1000);
  });
});
