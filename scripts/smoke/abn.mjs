/**
 * Generates valid-checksum AU ABN strings for smoke testing.
 *
 * ABN format: 11 digits where the algorithm is:
 *   1. Subtract 1 from the leading digit
 *   2. Multiply each digit by weight: [10,1,3,5,7,9,11,13,15,17,19]
 *   3. Sum, modulo 89 must equal 0
 *
 * Used by overnight smoke battery to populate `abn` field on
 * /api/contractor/onboarding/submit. The values are valid checksums
 * but won't resolve to real businesses on ABR — exactly what we want
 * for non-destructive smoke testing.
 */

const WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

/** Returns an 11-digit ABN string with a valid checksum, deterministic by seed. */
export function generateAbn(seed) {
  // Use the seed to pick a leading 8 digits deterministically.
  const rng = mulberry32(seed * 31337 + 7);
  const leadingDigits = [];
  for (let i = 0; i < 8; i++) {
    leadingDigits.push(Math.floor(rng() * 10));
  }
  // Make sure first digit isn't 0 (real ABNs start 1-9).
  if (leadingDigits[0] === 0) leadingDigits[0] = 1;

  // Try each possible 3-digit suffix until we find a valid checksum.
  for (let suffix = 0; suffix < 1000; suffix++) {
    const digits = [...leadingDigits, Math.floor(suffix / 100), Math.floor((suffix / 10) % 10), suffix % 10];
    const adjustedFirst = digits[0] - 1;
    const sum = adjustedFirst * WEIGHTS[0] + digits.slice(1).reduce((acc, d, i) => acc + d * WEIGHTS[i + 1], 0);
    if (sum % 89 === 0) {
      return digits.join('');
    }
  }
  // Fallback (should never hit) — unique deterministic-ish 11 digits.
  return [...leadingDigits, 0, 0, 1].join('');
}

/** Tiny seeded PRNG. */
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
