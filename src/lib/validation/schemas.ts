/**
 * Zod schema registry — single source of truth for claim, tracking, and
 * proof-of-work shapes shared across API routes, components, and storage.
 *
 * Prefer importing derived types (`z.infer<typeof schema>`) over declaring
 * parallel TypeScript interfaces. When a shape diverges between contexts
 * (e.g. tracking extends submit with server-assigned fields), extend via
 * `z.object({...}).merge(...)` rather than duplicating the shape.
 */

import { z } from 'zod';

// ----- Claim submission (user-facing intake) -----

export const claimClientSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
});

export const claimPropertySchema = z.object({
  address: z.string().min(1),
  suburb: z.string().min(1),
  state: z.string().min(1),
  postcode: z.string().min(1),
});

export const claimDamageSchema = z.object({
  types: z.array(z.string()),
  urgencyLevel: z.string(),
  description: z.string(),
});

export const claimSubmitSchema = z.object({
  client: claimClientSchema,
  property: claimPropertySchema,
  damage: claimDamageSchema,
});

export type ClaimSubmitInput = z.infer<typeof claimSubmitSchema>;

// ----- Claim tracking (server-augmented view) -----

export const claimContractorSchema = z.object({
  companyName: z.string().nullable(),
  contactPerson: z.string().nullable(),
  directPhone: z.string().nullable(),
  assignedAt: z.string().nullable(),
  acceptedAt: z.string().nullable(),
});

export const claimWorkflowSchema = z.object({
  paymentProcessed: z.boolean(),
  contractorAssigned: z.boolean(),
  contractorAccepted: z.boolean(),
  initialContactMade: z.boolean(),
  jobScheduled: z.boolean(),
  makeSafeCompleted: z.boolean(),
  documentationProvided: z.boolean(),
  claimFinalized: z.boolean(),
});

export const claimTrackingSchema = claimSubmitSchema.extend({
  id: z.string(),
  status: z.string(),
  createdAt: z.string(),
  contractor: claimContractorSchema,
  workflow: claimWorkflowSchema,
});

export type ClaimTracking = z.infer<typeof claimTrackingSchema>;

// ----- Proof of work -----

export const proofOfWorkEvidenceTypeSchema = z.enum([
  'BEFORE_PHOTO',
  'AFTER_PHOTO',
  'INVOICE',
  'COMPLETION_CERTIFICATE',
  'CLIENT_TESTIMONIAL',
  'INSURANCE_REPORT',
]);

export const proofOfWorkEvidenceSchema = z.object({
  id: z.string().optional(),
  type: proofOfWorkEvidenceTypeSchema,
  url: z.string(),
  description: z.string(),
  uploadedAt: z.string(),
});

export type ProofOfWorkEvidenceInput = z.infer<typeof proofOfWorkEvidenceSchema>;

export const propertyTypeSchema = z.enum([
  'RESIDENTIAL',
  'COMMERCIAL',
  'INDUSTRIAL',
  'INSTITUTIONAL',
]);

export const verificationStatusSchema = z.enum(['PENDING', 'VERIFIED', 'REJECTED']);

export const proofOfWorkSchema = z.object({
  id: z.string().optional(),
  workType: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  clientContact: z.string(),
  projectAddress: z.string(),
  completionDate: z.string(),
  projectValue: z.number(),
  projectDescription: z.string(),
  damageType: z.array(z.string()),
  propertyType: propertyTypeSchema,
  emergencyResponse: z.boolean(),
  insuranceClaim: z.boolean(),
  insuranceCompany: z.string().optional(),
  evidence: z.array(proofOfWorkEvidenceSchema),
  verificationStatus: verificationStatusSchema.optional(),
  verificationNotes: z.string().optional(),
});

export type ProofOfWorkInput = z.infer<typeof proofOfWorkSchema>;

// ----- Native device token registration (iOS/Android Capacitor) -----
//
// DR-725 Phase 2 PR #1. Posted by src/lib/native-bridge.ts ->
// registerPushNotifications() after APNs/FCM returns a token.
//
// Data-class note: device tokens are CONFIDENTIAL (.claude/rules/privacy.md
// §1). They are not PII on their own but become correlated identifiers
// when joined with a claim or user. Never log in full.

export const nativePlatformSchema = z.enum(['ios', 'android']);

export const deviceTokenRegistrationSchema = z.object({
  /** Platform-supplied push token. APNs hex (64+ chars) or FCM token. */
  token: z.string().min(32).max(4096),
  platform: nativePlatformSchema,
  /** Optional stable device identifier for dedup on re-register. */
  deviceId: z.string().min(1).max(128).optional(),
  /** Optional claim ID if registration happens mid-flow. */
  claimId: z.string().min(1).max(128).optional(),
  /** App bundle identifier — authoritative check on the server. */
  appId: z.literal('au.com.disasterrecovery.app'),
  /** App version for compatibility audits (e.g. 1.0.0+12). */
  appVersion: z.string().min(1).max(32),
});

export type DeviceTokenRegistrationInput = z.infer<
  typeof deviceTokenRegistrationSchema
>;

// ----- Reverse geocode (native geolocation auto-fill) -----
//
// DR-725 iOS App epic, Phase 2 PR #3. Posted by the "Use my current
// location" button on /claim so the server can call Google Geocoding
// and pre-fill the address fields.
//
// Privacy note (.claude/rules/privacy.md APP 3 + APP 5): coordinates
// are CONFIDENTIAL. Collect only on user tap. The route never logs the
// payload — only `{ ok, hasResult }`.

export const reverseGeocodeRequestSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export type ReverseGeocodeRequestInput = z.infer<
  typeof reverseGeocodeRequestSchema
>;

// ----- Native claim photo upload (iOS/Android Capacitor) -----
//
// DR-725 Phase 2 PR #2. Posted by src/lib/native-bridge.ts -> capturePhoto()
// after the native camera returns a data URL.
//
// Data-class note: property photos + optional geo coordinates are
// CONFIDENTIAL (.claude/rules/privacy.md §1 / §3). Never log the bytes —
// only size + mime. Geo is only populated if the user granted Geolocation
// permission separately (APP 3 collection-limitation discipline).

/** 10 KB — reject anything smaller as likely garbage / truncation. */
const CLAIM_PHOTO_MIN_BYTES = 10 * 1024;
/** 20 MB — hard cap protects the server, the bucket, and the client's data allowance. */
const CLAIM_PHOTO_MAX_BYTES = 20 * 1024 * 1024;

/** data:image/<mime>;base64,<payload> — inbound from Capacitor Camera. */
const DATA_URL_IMAGE_PREFIX = /^data:image\/[a-zA-Z0-9.+-]+;base64,/;

function base64DecodedLength(dataUrl: string): number {
  const commaIdx = dataUrl.indexOf(',');
  if (commaIdx < 0) return 0;
  const payload = dataUrl.slice(commaIdx + 1);
  // Base64 decoded length = ceil(n/4) * 3 - padding
  const padding = payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0;
  return Math.floor((payload.length * 3) / 4) - padding;
}

export const claimPhotoGeoSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  accuracyMeters: z.number().nonnegative(),
});

export const claimPhotoUploadSchema = z.object({
  /** Must be a base64 data URL for an image MIME type, 10KB-20MB decoded. */
  photoDataUrl: z
    .string()
    .refine((s) => DATA_URL_IMAGE_PREFIX.test(s), {
      message: 'photoDataUrl must start with data:image/<mime>;base64,',
    })
    .refine(
      (s) => {
        const n = base64DecodedLength(s);
        return n >= CLAIM_PHOTO_MIN_BYTES && n <= CLAIM_PHOTO_MAX_BYTES;
      },
      { message: 'photoDataUrl decoded size must be between 10KB and 20MB' },
    ),
  /** Optional — photos may be captured pre-claim and attached later. */
  claimId: z.string().min(1).max(128).optional(),
  platform: nativePlatformSchema,
  /** App bundle identifier — authoritative check on the server (spoof guard). */
  appId: z.literal('au.com.disasterrecovery.app'),
  appVersion: z.string().min(1).max(32),
  /** ISO 8601 capture timestamp from the device clock. */
  capturedAt: z.string().datetime({ offset: true }),
  /** Optional — only populated if user granted Geolocation permission. */
  geo: claimPhotoGeoSchema.optional(),
});

export type ClaimPhotoUploadInput = z.infer<typeof claimPhotoUploadSchema>;
