import React from 'react';
import { Platform, Text } from 'react-native';

/**
 * Room under the last line of a verse, on Android.
 *
 * Android gives a line of AmiriQuran about 0.4 of the font size below the
 * baseline and cuts what hangs lower. The tanween under a final meem hangs
 * 0.9 below it (مُسْتَقِيمٍ, حَكِيمٍ) and the deepest word in the Quran 0.95,
 * so the mark vanished and a tanween under a flat letter lost its lower stroke
 * and read as a plain kasra. Padding on the Text did not protect them.
 *
 * This puts a short empty line after the verse, so the marks fall inside the
 * text's own box. Render it as the LAST child of the verse's <Text>. The line
 * break sits outside the nested Text on purpose: inside it, the short line
 * height would also apply to the verse's last line and squash it.
 * Do not use on a Text with numberOfLines - the empty line would count.
 * iOS draws past the line box and needs nothing.
 */
export function QuranLastLineRoom({ fontSize }: { fontSize: number }) {
  if (Platform.OS !== 'android') return null;
  return (
    <>
      {'\n'}
      <Text style={{ fontSize: 1, lineHeight: fontSize * 0.6 }}>{'​'}</Text>
    </>
  );
}
