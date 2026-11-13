/**
 * Which player holds the lock-screen controls right now.
 *
 * Claiming them is not free, so it is done only when the owner changes:
 * - iOS: expo-audio adds a fresh set of remote-command handlers on every
 *   claim and never removes them, so claiming on every sentence piled up
 *   thousands of them over a long story.
 * - Android: every claim rebuilds the media notification and session.
 */
let owner: unknown = null;

export function lockScreenClaimed(player: unknown): void {
  owner = player;
}

export function lockScreenOwnedBy(player: unknown): boolean {
  return player != null && owner === player;
}

/** The player is going away or giving the controls up. */
export function lockScreenReleased(player: unknown): void {
  if (owner === player) owner = null;
}
