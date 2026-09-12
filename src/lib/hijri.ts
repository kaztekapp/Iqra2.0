/**
 * Hijri (Islamic) calendar arithmetic.
 *
 * Two layers. When the JavaScript engine can format dates in the Umm al-Qura
 * calendar (`Intl` with `ca-islamic-umalqura`), that is used, because it
 * matches the printed Saudi calendar day for day. Otherwise the classic
 * tabular (arithmetical) calendar is used: a 30-year cycle of 354- and
 * 355-day years that tracks the real months to within a day.
 *
 * Either way the result is an ESTIMATE. The Islamic month begins with the
 * sighting of the crescent, and a community's date can differ from this by a
 * day. The screens that show it say so.
 */

export interface HijriDate {
  year: number;
  month: number; // 1..12
  day: number; // 1..30
}

export const HIJRI_MONTHS_AR = [
  'مُحَرَّم', 'صَفَر', 'رَبِيعُ الْأَوَّل', 'رَبِيعُ الثَّانِي', 'جُمَادَى الْأُولَى', 'جُمَادَى الْآخِرَة',
  'رَجَب', 'شَعْبَان', 'رَمَضَان', 'شَوَّال', 'ذُو الْقَعْدَة', 'ذُو الْحِجَّة',
];
export const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani", 'Jumada al-Ula', 'Jumada al-Akhirah',
  'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhul-Qa'dah", 'Dhul-Hijjah',
];
export const HIJRI_MONTHS_FR = [
  'Mouharram', 'Safar', 'Rabi al-Awwal', 'Rabi ath-Thani', 'Joumada al-Oula', 'Joumada al-Akhira',
  'Rajab', 'Chaabane', 'Ramadan', 'Chawwal', 'Dhoul-Qaada', 'Dhoul-Hijja',
];
export const WEEKDAYS_AR = ['الْأَحَد', 'الْاِثْنَيْن', 'الثُّلَاثَاء', 'الْأَرْبِعَاء', 'الْخَمِيس', 'الْجُمُعَة', 'السَّبْت'];

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
/** 1447 -> ١٤٤٧ */
export function toArabicDigits(n: number | string): string {
  return String(n).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]);
}

// ---- tabular calendar ------------------------------------------------------

/** Julian day number at noon of a Gregorian calendar date. */
function gregorianToJd(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}

function jdToGregorian(jd: number): { year: number; month: number; day: number } {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * b + d - 4800 + Math.floor(m / 10),
  };
}

/** Epoch of the civil (Friday) tabular calendar: 1 Muharram 1 AH = JD 1948440 (16 July 622). */
const HIJRI_EPOCH_JD = 1948440;

/** Julian day number of a tabular Hijri date (the classic integer algorithm). */
function hijriToJd(y: number, m: number, d: number): number {
  return Math.floor((11 * y + 3) / 30) + 354 * y + 30 * m - Math.floor((m - 1) / 2) + d + HIJRI_EPOCH_JD - 385;
}

function jdToHijriTabular(jd: number): HijriDate {
  let l = jd - HIJRI_EPOCH_JD + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

/** The tabular estimate alone - exported for tests and for comparison. */
export function toHijriTabular(date: Date): HijriDate {
  return jdToHijriTabular(gregorianToJd(date.getFullYear(), date.getMonth() + 1, date.getDate()));
}

// ---- Intl (Umm al-Qura) when the engine has it ----------------------------

let umalquraFormatter: Intl.DateTimeFormat | null | undefined;
function umalqura(): Intl.DateTimeFormat | null {
  if (umalquraFormatter !== undefined) return umalquraFormatter;
  try {
    const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { year: 'numeric', month: 'numeric', day: 'numeric' });
    // Prove it actually resolved the calendar and yields sane parts.
    const parts = f.formatToParts(new Date(2024, 2, 11)); // 1 Ramadan 1445 in Umm al-Qura
    const year = Number(parts.find((p) => p.type === 'year')?.value);
    umalquraFormatter = f.resolvedOptions().calendar === 'islamic-umalqura' && year === 1445 ? f : null;
  } catch {
    umalquraFormatter = null;
  }
  return umalquraFormatter;
}

function intlFromDate(date: Date): HijriDate | null {
  const f = umalqura();
  if (!f) return null;
  const parts = f.formatToParts(date);
  const pick = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const year = pick('year'), month = pick('month'), day = pick('day');
  if (!year || !month || !day) return null;
  return { year, month, day };
}

// ---- public ----------------------------------------------------------------

/** The Hijri date of a local calendar day. */
export function toHijri(date: Date = new Date()): HijriDate {
  return intlFromDate(date) ?? toHijriTabular(date);
}

/** True when the Umm al-Qura calendar (not the tabular estimate) is in use. */
export function usesUmmAlQura(): boolean {
  return umalqura() !== null;
}

/**
 * The local calendar day on which a Hijri date falls (estimate). Searches
 * around the tabular answer so that, when Umm al-Qura is available, the
 * result agrees with `toHijri`.
 */
export function fromHijri(h: HijriDate): Date {
  const g = jdToGregorian(hijriToJd(h.year, h.month, h.day));
  const guess = new Date(g.year, g.month - 1, g.day);
  if (!umalqura()) return guess;
  for (let delta = -3; delta <= 3; delta++) {
    const d = new Date(guess.getFullYear(), guess.getMonth(), guess.getDate() + delta);
    const back = toHijri(d);
    if (back.year === h.year && back.month === h.month && back.day === h.day) return d;
  }
  return guess;
}

/** Whole days from today's calendar day to the given day (negative if past). */
export function daysUntil(target: Date, from: Date = new Date()): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.round((b - a) / 86400000);
}

export function formatHijriArabic(h: HijriDate): string {
  return `${toArabicDigits(h.day)} ${HIJRI_MONTHS_AR[h.month - 1]} ${toArabicDigits(h.year)} هـ`;
}

export function formatHijri(h: HijriDate, lang: 'en' | 'fr'): string {
  const names = lang === 'fr' ? HIJRI_MONTHS_FR : HIJRI_MONTHS_EN;
  return `${h.day} ${names[h.month - 1]} ${h.year} AH`;
}

/** Days in a Hijri month, from the calendar in use (29 or 30). */
export function hijriMonthLength(year: number, month: number): number {
  const next = month === 12 ? { year: year + 1, month: 1, day: 1 } : { year, month: month + 1, day: 1 };
  return daysUntil(fromHijri(next), fromHijri({ year, month, day: 1 }));
}
