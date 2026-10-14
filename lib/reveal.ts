const STAGGER_MS = 70;
const MAX_STEPS = 6;

/**
 * Entrance delay for the item at `index` in a list, so siblings reveal one
 * after another. Capped so long lists don't lag.
 */
export function revealDelay(index = 0): string {
  return `${Math.min(Math.max(index, 0), MAX_STEPS) * STAGGER_MS}ms`;
}
