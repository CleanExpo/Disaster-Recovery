/**
 * Shared Zod validation registry.
 *
 * Goal: every API route imports primitives + composed schemas from HERE,
 * not defines its own. Fixes the change-amplification finding from the
 * Foundation Sprint audit where Claim was defined in 5 places and every
 * API route invented its own phone regex.
 *
 * Prisma remains the database source of truth for `InsuranceClaimAU`,
 * `Booking`, `Enquiry` etc. This file is the *API-layer* source of truth.
 *
 * Scope boundary: schemas here validate REQUEST BODIES entering our API.
 * Response shapes are separate (and intentionally not mirrored here —
 * avoid the trap of making DB schema = API schema = UI schema).
 *
 * Scope boundary (composed schemas): field sets mirror the existing three
 * API contracts (claims/submit, contact/submit, bookings/create). We are
 * consolidating the PRIMITIVES, not renaming fields. Any field rename or
 * required/optional change would break live callers — out of scope for
 * Day 7-8.
 */

import { z } from 'zod';

// ─── Primitives ─────────────────────────────────────────────────────────────

/**
 * Australian mobile + landline format.
 * Accepts: 04xx xxx xxx, +614xx xxx xxx, 02/03/07/08 area codes, 1300/1800/13xxxx.
 * Whitespace + hyphens normalised on parse so `0412 345 678` and `0412-345-678`
 * both pass.
 */
export const australianPhoneSchema = z
  .string()
  .trim()
  .transform((s) => s.replace(/[\s-]+/g, ''))
  .pipe(
    z
      .string()
      .regex(
        /^(?:\+?61\d{9}|0[234578]\d{8}|13\d{4}|1300\d{6}|1800\d{6})$/,
        'Enter a valid Australian phone number (mobile, landline, 1300 or 1800)',
      ),
  );

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Enter a valid email address')
  .max(320, 'Email too long');

/**
 * Australian Business Number — 11 digits with ABN checksum (weighted modulo 89).
 * Accepts with or without spaces.
 */
export const abnSchema = z
  .string()
  .trim()
  .transform((s) => s.replace(/\s+/g, ''))
  .pipe(
    z
      .string()
      .length(11, 'ABN must be 11 digits')
      .regex(/^\d{11}$/, 'ABN must be digits only')
      .refine((abn) => {
        // ABN checksum: subtract 1 from the leftmost digit, then compute
        // weighted sum with weights [10,1,3,5,7,9,11,13,15,17,19]; valid if divisible by 89.
        const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        const digits = abn.split('').map(Number);
        digits[0] -= 1;
        const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
        return sum % 89 === 0;
      }, 'ABN checksum is invalid'),
  );

export const australianPostcodeSchema = z
  .string()
  .trim()
  .regex(/^\d{4}$/, 'Australian postcode must be 4 digits');

/** NZ 4-digit postcode (permissive; NZ has 4-digit postcodes). */
export const newZealandPostcodeSchema = z
  .string()
  .trim()
  .regex(/^\d{4}$/, 'NZ postcode must be 4 digits');

export const suburbSchema = z
  .string()
  .trim()
  .min(2, 'Suburb too short')
  .max(100, 'Suburb too long');

export const stateSchema = z.enum(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'NZ'] as const);

export const damageTypeSchema = z.enum([
  'water',
  'fire',
  'storm',
  'flood',
  'mould',
  'biohazard',
  'sewage',
  'structural',
  'other',
] as const);

export const urgencyLevelSchema = z.enum(['emergency', 'urgent', 'standard', 'routine', 'planning'] as const);

export const propertyTypeSchema = z.enum(['residential', 'commercial', 'industrial', 'strata'] as const);

// ─── Composed schemas ───────────────────────────────────────────────────────

/**
 * Contact form (light-touch enquiry, no property yet committed).
 * Replaces the ad-hoc contactSchema in app/api/contact/submit/route.ts.
 *
 * NOTE: field is `name` (not `fullName`) to match the live API contract.
 * Renaming is an out-of-scope breaking change.
 */
export const contactSubmitSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(200),
  email: emailSchema,
  phone: australianPhoneSchema,
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  // Contact form historically accepts a narrower service subset (no 'sewage').
  service: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'biohazard', 'other'] as const),
  // Contact form historically uses a 4-value urgency subset (no 'standard').
  urgency: z.enum(['emergency', 'urgent', 'planning', 'routine'] as const),
  // Contact form historically uses a 3-value property subset (no 'strata').
  propertyType: z.enum(['residential', 'commercial', 'industrial'] as const).optional(),
  hasInsurance: z.boolean().optional(),
  preferredContact: z.enum(['phone', 'email', 'both']).optional(),
});
export type ContactSubmitInput = z.infer<typeof contactSubmitSchema>;

/**
 * Full claim-intake submission. Maps (imperfectly) to Prisma's InsuranceClaimAU
 * model — intentionally. DB has extra fields (status, timestamps, relations) that
 * don't belong at the API boundary.
 *
 * NOTE: `suburb`/`state`/`postcode` are optional to match the live API contract.
 * The existing route accepts claims without a resolved address (e.g. GPS-only
 * intake) and fills defaults downstream.
 */
export const claimSubmitSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: emailSchema,
  phone: australianPhoneSchema.optional(),
  propertyAddress: z.string().trim().min(1).max(300),
  suburb: suburbSchema.optional(),
  state: stateSchema.optional(),
  postcode: z.union([australianPostcodeSchema, newZealandPostcodeSchema]).optional(),
  damageTypes: z.array(z.string().max(100)).min(1).max(20),
  damageDescription: z.string().trim().min(1).max(5000),
  urgencyLevel: z.enum(['emergency', 'urgent', 'standard'] as const).optional(),
  policyNumber: z.string().max(100).optional(),
  insuranceCompany: z.string().max(200).optional(),
  insuranceClaimNumber: z.string().max(100).optional(),
  accessInstructions: z.string().max(500).optional(),
  paymentConfirmed: z.boolean().optional(),
  // Internal fields — validated loosely
  bookingId: z.string().max(100).optional(),
  clientId: z.string().max(254).optional(),
  tenantId: z.string().max(100).optional(),
  damagePhotos: z.array(z.string().url().max(500)).max(20).optional(),
  uploadedDocuments: z.array(z.string().url().max(500)).max(20).optional(),
});
export type ClaimSubmitInput = z.infer<typeof claimSubmitSchema>;

/**
 * Booking — scheduled service (future date/time).
 * Replaces bookingSchema in app/api/bookings/create/route.ts.
 *
 * NOTE: `state` is the 8-state AU enum only here (no NZ) to match the live
 * API contract. `urgency` is the narrower 3-value set the booking form uses.
 */
export const bookingCreateSchema = z.object({
  // Service Details
  serviceType: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'structural', 'biohazard', 'other'] as const),
  urgency: z.enum(['emergency', 'urgent', 'routine'] as const),
  propertyType: z.enum(['residential', 'commercial', 'industrial'] as const),
  estimatedDamage: z.string(),

  // Schedule
  date: z.string(),
  time: z.string(),

  // Contact Information
  firstName: z.string().min(2, 'First name is required').max(100),
  lastName: z.string().min(2, 'Last name is required').max(100),
  email: emailSchema,
  phone: australianPhoneSchema,
  preferredContact: z.enum(['phone', 'email', 'both']),

  // Address
  streetAddress: z.string().min(5, 'Street address is required').max(500),
  suburb: suburbSchema,
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] as const),
  postcode: australianPostcodeSchema,

  // Additional Information
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  claimNumber: z.string().optional(),
  additionalNotes: z.string().optional(),
  photos: z.array(z.string()).optional(),
  accessInstructions: z.string().optional(),
});
export type BookingCreateInput = z.infer<typeof bookingCreateSchema>;

// ─── Discriminated union helper ─────────────────────────────────────────────

/**
 * For a single intake endpoint that accepts any of the three shapes.
 * Not currently used — future convergence.
 */
export const anyIntakeSchema = z.discriminatedUnion('kind', [
  contactSubmitSchema.extend({ kind: z.literal('contact') }),
  claimSubmitSchema.extend({ kind: z.literal('claim') }),
  bookingCreateSchema.extend({ kind: z.literal('booking') }),
]);
export type AnyIntakeInput = z.infer<typeof anyIntakeSchema>;
