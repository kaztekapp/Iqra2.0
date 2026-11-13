/**
 * Arabic marks must not be cut off on Android.
 *
 * Android clips a Text to its own text area, and a lineHeight tighter than the
 * font leaves no room for the marks above the first line and below the last
 * (the tanween of مُسْتَقِيمٍ vanished). ArText gives them room; see
 * src/components/arabic/ArText.tsx. These tests keep the room large enough and
 * keep every Arabic text on ArText.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { markRoom } from '../src/components/arabic/ArText';

describe('markRoom', () => {
  it('covers the deepest and tallest marks of the Quran face at the verse lineHeight', () => {
    // AmiriQuran at lineHeight 2.0: the line box keeps 0.41 em below the
    // baseline and 1.59 above. The deepest word reaches 1.06, the pause signs 1.82.
    const room = markRoom('AmiriQuran', 2.0);
    expect(0.41 + room.down).toBeGreaterThanOrEqual(1.06);
    expect(1.59 + room.up).toBeGreaterThanOrEqual(1.82);
  });

  it('gives more room as the lineHeight tightens', () => {
    expect(markRoom(undefined, 1.2).up).toBeGreaterThan(markRoom(undefined, 1.7).up);
    expect(markRoom(undefined, 1.2).down).toBeGreaterThan(markRoom(undefined, 1.7).down);
    expect(markRoom('AmiriQuran', 1.7).down).toBeGreaterThan(markRoom('AmiriQuran', 2.0).down);
  });

  it('never gives less than the floor, whatever the phone font', () => {
    for (const ratio of [undefined, 1.7, 2.5, 4]) {
      const room = markRoom(undefined, ratio);
      expect(room.up).toBeGreaterThanOrEqual(0.25);
      expect(room.down).toBeGreaterThanOrEqual(0.3);
    }
  });
});

describe('Arabic text is drawn with ArText', () => {
  const ROOT = path.join(__dirname, '..');
  const ARABIC_STYLE = /font\.arabic|font\.quran|writingDirection:\s*'rtl'|AmiriQuran|ArefRuqaa|Nastaliq/;

  function tsxFiles(dir: string, out: string[] = []): string[] {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) tsxFiles(full, out);
      else if (full.endsWith('.tsx')) out.push(full);
    }
    return out;
  }

  it('no plain <Text> uses an Arabic style', () => {
    const offenders: string[] = [];
    for (const file of [...tsxFiles(path.join(ROOT, 'src')), ...tsxFiles(path.join(ROOT, 'app'))]) {
      if (file.endsWith('ArText.tsx')) continue;
      const source = fs.readFileSync(file, 'utf8');
      if (!ARABIC_STYLE.test(source)) continue;
      const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

      // Style names in this file whose block is an Arabic style.
      const arabicNames = new Set<string>();
      const collect = (node: ts.Node) => {
        if (ts.isPropertyAssignment(node) && ts.isObjectLiteralExpression(node.initializer)) {
          const text = node.initializer.getText();
          if (ARABIC_STYLE.test(text) && !text.slice(1).includes('{')) arabicNames.add(node.name.getText());
        }
        ts.forEachChild(node, collect);
      };
      collect(sf);

      // A Text nested in another Text has no box of its own; its parent does the drawing.
      const visit = (node: ts.Node, insideText: boolean) => {
        const opening = ts.isJsxElement(node) ? node.openingElement : ts.isJsxSelfClosingElement(node) ? node : null;
        let nowInside = insideText;
        if (opening) {
          const tag = opening.tagName.getText();
          if (tag === 'Text' || tag === 'ArText') {
            if (tag === 'Text' && !insideText) {
              const style = opening.attributes.properties.find(
                (p) => ts.isJsxAttribute(p) && p.name.getText() === 'style',
              );
              const styleText = style ? style.getText() : '';
              const refs = [...styleText.matchAll(/\.(\w+)\b/g)].map((m) => m[1]);
              if (refs.some((r) => arabicNames.has(r)) || ARABIC_STYLE.test(styleText)) {
                const line = sf.getLineAndCharacterOfPosition(node.getStart()).line + 1;
                offenders.push(`${path.relative(ROOT, file)}:${line}`);
              }
            }
            nowInside = true;
          }
        }
        ts.forEachChild(node, (child) => visit(child, nowInside));
      };
      visit(sf, false);
    }
    // Use <ArText> (same props as Text) so the marks are not cut off on Android.
    expect(offenders).toEqual([]);
  });
});
