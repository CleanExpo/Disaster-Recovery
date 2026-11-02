/**
 * Single source of truth for the public Disaster Recovery phone number.
 *
 * The number comes only from NEXT_PUBLIC_DR_PHONE_DISPLAY and
 * NEXT_PUBLIC_DR_PHONE_E164. If either is unset or the E.164 value is not valid,
 * the site shows no phone number at all. There is deliberately no default.
 *
 * Next.js inlines these values at build time and only for literal
 * `process.env.NEXT_PUBLIC_*` reads, so changing them needs a redeploy.
 */

export interface DrPhone {
  display: string;
  e164: string;
}

const E164_PATTERN = /^\+[1-9]\d{6,14}$/;

export function resolveDrPhone(
  display: string | undefined,
  e164: string | undefined,
): DrPhone | null {
  const cleanDisplay = display?.trim();
  const cleanE164 = e164?.trim();
  if (!cleanDisplay || !cleanE164 || !E164_PATTERN.test(cleanE164)) return null;
  return { display: cleanDisplay, e164: cleanE164 };
}

const drPhone = resolveDrPhone(
  process.env.NEXT_PUBLIC_DR_PHONE_DISPLAY,
  process.env.NEXT_PUBLIC_DR_PHONE_E164,
);

export const DR_PHONE_DISPLAY: string | null = drPhone?.display ?? null;
export const DR_PHONE_E164: string | null = drPhone?.e164 ?? null;

/** Ends a sentence with ", or call <number>", or adds nothing when there is no number. */
export const DR_CALL_CLAUSE: string = DR_PHONE_DISPLAY ? `, or call ${DR_PHONE_DISPLAY}` : '';
