/**
 * Reusable Australian Field Validators
 * ======================================
 * Zod primitives for common Australian data fields.
 * Import these into domain schemas in validations.ts.
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Contact fields
// ---------------------------------------------------------------------------

/** Trimmed, lowercased email. */
export const email = z
  .string()
  .trim()
  .toLowerCase()
  .email('Please enter a valid email address');

/**
 * Australian phone number — accepts:
 *   04xx xxx xxx  (mobile)
 *   02/03/07/08 xxxx xxxx  (landline)
 *   +61 variants
 * Strips spaces, dashes, parens before validation.
 */
export const auPhone = z
  .string()
  .transform((v) => v.replace(/[\s\-()]/g, ''))
  .pipe(
    z
      .string()
      .regex(
        /^(?:\+?61|0)[2-478]\d{8}$/,
        'Please enter a valid Australian phone number',
      ),
  );

/** Optional phone — allows empty string or undefined. */
export const auPhoneOptional = z
  .string()
  .optional()
  .transform((v) => (v ? v.replace(/[\s\-()]/g, '') : v))
  .pipe(
    z
      .string()
      .regex(/^(?:\+?61|0)[2-478]\d{8}$/, 'Please enter a valid Australian phone number')
      .optional(),
  );

/** Full name — at least 2 characters, trimmed, max 200. */
export const fullName = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .max(200, 'Name must be under 200 characters');

// ---------------------------------------------------------------------------
// Address fields
// ---------------------------------------------------------------------------

/** Australian 4-digit postcode (0200–9999). */
export const auPostcode = z
  .string()
  .regex(/^\d{4}$/, 'Postcode must be 4 digits');

/** Australian state / territory enum. */
export const auState = z.enum(
  ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
  { errorMap: () => ({ message: 'Must be a valid Australian state/territory' }) },
);

/** Generic address line — trimmed, 2–500 chars. */
export const addressLine = z
  .string()
  .trim()
  .min(2, 'Address is required')
  .max(500, 'Address is too long');

/** Suburb — trimmed, 2–100 chars. */
export const suburb = z
  .string()
  .trim()
  .min(2, 'Suburb is required')
  .max(100, 'Suburb name is too long');

// ---------------------------------------------------------------------------
// Insurance / business fields
// ---------------------------------------------------------------------------

/** Insurance policy number — alphanumeric, 4–30 chars. */
export const policyNumber = z
  .string()
  .trim()
  .min(4, 'Policy number must be at least 4 characters')
  .max(30, 'Policy number is too long');

/** Optional insurance claim number. */
export const claimNumber = z
  .string()
  .trim()
  .max(50, 'Claim number is too long')
  .optional()
  .nullable();

// ---------------------------------------------------------------------------
// Content / description fields
// ---------------------------------------------------------------------------

/** Free-text description — trimmed, 10–5000 chars. */
export const description = z
  .string()
  .trim()
  .min(10, 'Description must be at least 10 characters')
  .max(5000, 'Description is too long');

/** Shorter free-text — trimmed, 0–2000 chars. */
export const shortText = z
  .string()
  .trim()
  .max(2000, 'Text is too long');

// ---------------------------------------------------------------------------
// Enums shared across domains
// ---------------------------------------------------------------------------

export const urgencyLevel = z.enum(
  ['emergency', 'urgent', 'soon', 'planning', 'standard'],
  { errorMap: () => ({ message: 'Invalid urgency level' }) },
);

export const propertyType = z.enum(
  ['residential', 'commercial', 'industrial', 'institutional', 'strata'],
  { errorMap: () => ({ message: 'Invalid property type' }) },
);

export const damageType = z.array(
  z.string().trim().min(1).max(100),
).min(1, 'At least one damage type is required');

// ---------------------------------------------------------------------------
// Pagination helpers
// ---------------------------------------------------------------------------

/** Page number — integer ≥ 1, defaults to 1. */
export const pageNumber = z.coerce.number().int().min(1).default(1);

/** Page size — integer 1–100, defaults to 10. */
export const pageSize = z.coerce.number().int().min(1).max(100).default(10);

// ---------------------------------------------------------------------------
// ID fields
// ---------------------------------------------------------------------------

/** CUID or UUID string — at least 1 char. */
export const entityId = z.string().trim().min(1, 'ID is required');
