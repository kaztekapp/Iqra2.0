/**
 * Lines whose recording was bad although their text is right (a glitch, a
 * stumble). Give the line's spoken text a revision number and run
 * `node scripts/voice/record.mjs`: the clip gets a new name, is recorded
 * again, and phones fetch the new one instead of the copy they kept.
 *
 * Key: the exact spoken text (for Arabic, after pronunciation fixes), as the
 * recording script prints it with `--find "<words>"`.
 */
export const VOICE_REVISIONS: Readonly<Record<string, number>> = {};
