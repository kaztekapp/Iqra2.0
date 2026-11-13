import React from 'react';
import { PixelRatio, Platform, StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

/**
 * A <Text> for Arabic. Use it wherever Arabic is shown; it takes the same
 * props as Text and is exactly Text on iOS.
 *
 * Why it exists. On Android a Text is an android.widget.TextView, and it clips
 * what it draws to its own text area. React Native centres a line in its
 * lineHeight, so when the lineHeight is tighter than the font's natural height
 * the first line loses room above and the last line loses room below. Arabic
 * marks live exactly there: the tanween under a final meem (مُسْتَقِيمٍ)
 * vanished, a tanween under a flat letter lost its lower stroke and read as a
 * kasra, and a shadda over a lam-alif lost its top.
 *
 * What it does, on Android only:
 *  - above: padding on the text, which the TextView does draw into, taken
 *    back with an equal negative margin;
 *  - below: a short empty last line, taken back with a negative margin.
 *    Padding does NOT work below - the TextView only draws into bottom
 *    padding when two rounded heights happen to match, so it worked on one
 *    screen size and not on the next.
 * Both are taken back, so nothing moves: the text only gains room to draw.
 *
 * Limits: with numberOfLines the empty line would count as a line, so only
 * the room above is added. A text with its own background or border is left
 * alone, because the extra room would show as a bigger box.
 */

interface FontProfile {
  /** Ascent and descent the line box is built from (hhea), in em. */
  ascent: number;
  descent: number;
  /** How far the marks really reach above and below the baseline, in em. */
  reachUp: number;
  reachDown: number;
}

// Reach was measured by shaping every Arabic word in the app (and every word
// of the Quran for AmiriQuran) with HarfBuzz, then rounded up.
const PROFILES: Record<string, FontProfile> = {
  AmiriQuran: { ascent: 1.815, descent: 0.634, reachUp: 1.85, reachDown: 1.08 },
  ArefRuqaa: { ascent: 1.221, descent: 0.244, reachUp: 1.35, reachDown: 0.65 },
  NotoNastaliq: { ascent: 1.904, descent: 0.596, reachUp: 1.95, reachDown: 1.45 },
};

// The system Arabic face differs by Android version and maker. The two Noto
// Naskh cuts Android ships bound the cases: the tall one leaves the least
// room above, the compact one the least room below.
const SYSTEM_TALL: FontProfile = { ascent: 1.069, descent: 0.634, reachUp: 1.3, reachDown: 0.75 };
const SYSTEM_COMPACT: FontProfile = { ascent: 1.069, descent: 0.293, reachUp: 1.3, reachDown: 0.75 };

/** Never less than this, so an unknown phone font still has some margin. */
const MIN_ROOM_UP = 0.25;
const MIN_ROOM_DOWN = 0.3;

/** Room to add above and below, in em, for a font at a lineHeight ratio. */
export function markRoom(fontFamily: string | undefined, ratio: number | undefined): { up: number; down: number } {
  const known = fontFamily ? PROFILES[fontFamily] : undefined;
  const profiles = known ? [known] : [SYSTEM_TALL, SYSTEM_COMPACT];
  let up = MIN_ROOM_UP;
  let down = MIN_ROOM_DOWN;
  for (const p of profiles) {
    // Half the leading goes above the ascent and half below the descent;
    // negative when the lineHeight is tighter than the font.
    const half = ratio === undefined ? 0 : (ratio - (p.ascent + p.descent)) / 2;
    up = Math.max(up, p.reachUp - (p.ascent + half));
    down = Math.max(down, p.reachDown - (p.descent + half));
  }
  return { up, down };
}

function sideNumber(...candidates: unknown[]): number | null {
  for (const c of candidates) {
    if (c === undefined || c === null) continue;
    return typeof c === 'number' ? c : null;
  }
  return 0;
}

export function ArText({ style, children, ...props }: TextProps) {
  if (Platform.OS !== 'android') {
    return (
      <Text style={style} {...props}>
        {children}
      </Text>
    );
  }

  const flat: TextStyle = StyleSheet.flatten(style) ?? {};
  const boxed =
    (flat.backgroundColor !== undefined && flat.backgroundColor !== 'transparent') ||
    !!flat.borderWidth ||
    !!flat.borderBottomWidth ||
    !!flat.borderTopWidth ||
    flat.height !== undefined;
  if (boxed) {
    return (
      <Text style={style} {...props}>
        {children}
      </Text>
    );
  }

  const fontSize = flat.fontSize ?? 14;
  const ratio = flat.lineHeight ? flat.lineHeight / fontSize : undefined;
  const room = markRoom(flat.fontFamily, ratio);
  // Text grows with the phone's font size setting; margins do not, unless told.
  const scale =
    props.allowFontScaling === false
      ? 1
      : Math.min(PixelRatio.getFontScale(), props.maxFontSizeMultiplier || Infinity);

  const extra: TextStyle = {};
  const marginTop = sideNumber(flat.marginTop, flat.marginVertical, flat.margin);
  const paddingTop = sideNumber(flat.paddingTop, flat.paddingVertical, flat.padding);
  if (marginTop !== null && paddingTop !== null) {
    const up = room.up * fontSize * scale;
    extra.paddingTop = paddingTop + up;
    extra.marginTop = marginTop - up;
  }

  const marginBottom = sideNumber(flat.marginBottom, flat.marginVertical, flat.margin);
  const below = !props.numberOfLines && marginBottom !== null ? room.down * fontSize : 0;
  if (below > 0 && marginBottom !== null) {
    extra.marginBottom = marginBottom - below * scale;
  }

  return (
    <Text style={[style, extra]} {...props}>
      {children}
      {below > 0 && (
        // The line break stays OUTSIDE the nested Text: inside it, the short
        // line height would also apply to the real last line and squash it.
        <>
          {'\n'}
          <Text style={{ fontSize: 1, lineHeight: below }}>{'​'}</Text>
        </>
      )}
    </Text>
  );
}
