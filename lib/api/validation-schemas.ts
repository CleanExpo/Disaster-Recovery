/**
 * Shared Validation Schemas for Public API Endpoints
 * Uses Zod for runtime type validation
 */

import { z } from 'zod';

// ============================================================================
// COMMON SCHEMAS
// ============================================================================

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters')
  .max(255, 'Email must be less than 255 characters')
  .toLowerCase()
  .trim();

export const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(20, 'Phone number must be less than 20 digits')
  .regex(
    /^(\+61|0)[2-9]\d{8}$/,
    'Invalid Australian phone number format. Use format: 04XX XXX XXX or 0X XXXX XXXX'
  )
  .transform((val) => val.replace(/[\s\-()]/g, ''));

export const postcodeSchema = z
  .string()
  .length(4, 'Australian postcode must be 4 digits')
  .regex(/^\d{4}$/, 'Postcode must contain only numbers');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .trim();

export const addressSchema = z
  .string()
  .min(5, 'Address must be at least 5 characters')
  .max(255, 'Address must be less than 255 characters')
  .trim();

export const stateSchema = z.enum(
  ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'],
  {
    errorMap: () => ({
      message:
        'Invalid Australian state. Must be one of: NSW, VIC, QLD, WA, SA, TAS, ACT, NT',
    }),
  }
);

export const captchaSchema = z
  .string()
  .min(1, 'CAPTCHA verification is required')
  .optional();

export const honeypotSchema = z.string().optional();

// ============================================================================
// LEAD CAPTURE (Claim Form Submissions)
// ============================================================================

export const leadCaptureSchema = z.object({
  // Personal Information
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,

  // Property Information
  propertyAddress: addressSchema,
  suburb: z.string().min(2).max(100).trim(),
  state: stateSchema,
  postcode: postcodeSchema,

  // Damage Information
  damageType: z.enum([
    'WATER_DAMAGE',
    'FIRE_DAMAGE',
    'SMOKE_DAMAGE',
    'MOULD_REMEDIATION',
    'STORM_DAMAGE',
    'FLOOD_DAMAGE',
    'OTHER',
  ]),
  damageDescription: z
    .string()
    .min(10, 'Please provide a description of at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .trim(),

  // Insurance Information
  hasInsurance: z.boolean(),
  insuranceProvider: z
    .enum(['NRMA', 'SUNCORP', 'ALLIANZ', 'QBE', 'IAG', 'CGU', 'MEDIBANK', 'OTHER'])
    .optional(),
  claimNumber: z.string().max(100).optional(),

  // Urgency
  urgency: z.enum(['URGENT', 'HIGH', 'STANDARD', 'SCHEDULED']),

  // Marketing
  preferredContactMethod: z.enum(['EMAIL', 'PHONE', 'SMS']).default('EMAIL'),
  marketingConsent: z.boolean().default(false),

  // Security
  captchaToken: captchaSchema,
  honeypot: honeypotSchema,

  // Metadata
  source: z.string().max(100).optional(), // UTM source tracking
  referrer: z.string().max(255).optional(),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

// ============================================================================
// TRIAGE (Damage Assessment Tool)
// ============================================================================

export const triageQuestionSchema = z.object({
  questionId: z.string(),
  answer: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
});

export const triageSchema = z.object({
  // Contact Information
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),

  // Triage Responses
  responses: z.array(triageQuestionSchema).min(1, 'At least one response is required'),

  // Property Information (optional for triage)
  postcode: postcodeSchema.optional(),
  state: stateSchema.optional(),

  // Metadata
  triageSessionId: z.string().uuid().optional(), // For tracking multi-step triage
  completedAt: z.string().datetime().optional(),

  // Security
  captchaToken: captchaSchema,
  honeypot: honeypotSchema,
});

export type TriageInput = z.infer<typeof triageSchema>;

// ============================================================================
// NEWSLETTER SUBSCRIPTION
// ============================================================================

export const newsletterSchema = z.object({
  // Contact Information
  email: emailSchema,
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),

  // Preferences
  interests: z
    .array(
      z.enum([
        'WATER_DAMAGE',
        'FIRE_DAMAGE',
        'MOULD_PREVENTION',
        'STORM_PREPAREDNESS',
        'INSURANCE_TIPS',
        'RESTORATION_NEWS',
        'GENERAL',
      ])
    )
    .min(1, 'Please select at least one interest')
    .optional(),

  // Location (for localized content)
  state: stateSchema.optional(),
  postcode: postcodeSchema.optional(),

  // Consent
  marketingConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to receive marketing emails',
  }),

  // Security
  captchaToken: captchaSchema,
  honeypot: honeypotSchema,

  // Metadata
  source: z.string().max(100).optional(),
  referrer: z.string().max(255).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ============================================================================
// CONTRACTOR INQUIRY (NRPG Application)
// ============================================================================

export const contractorInquirySchema = z.object({
  // Business Information
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(200, 'Business name must be less than 200 characters')
    .trim(),
  abn: z
    .string()
    .length(11, 'ABN must be 11 digits')
    .regex(/^\d{11}$/, 'ABN must contain only numbers'),
  businessType: z.enum(['SOLE_TRADER', 'PARTNERSHIP', 'COMPANY', 'TRUST']),

  // Contact Information
  contactFirstName: nameSchema,
  contactLastName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneSchema,

  // Business Address
  businessAddress: addressSchema,
  suburb: z.string().min(2).max(100).trim(),
  state: stateSchema,
  postcode: postcodeSchema,

  // Services Offered
  servicesOffered: z
    .array(
      z.enum([
        'WATER_DAMAGE',
        'FIRE_DAMAGE',
        'SMOKE_DAMAGE',
        'MOULD_REMEDIATION',
        'ODOUR_REMEDIATION',
        'CARPET_CLEANING',
        'COMMERCIAL_WATER_DAMAGE',
        'COMMERCIAL_FIRE_DAMAGE',
        'COMMERCIAL_MOULD',
        'COMMERCIAL_ODOUR',
        'CRIME_SCENE_CLEANING',
        'BIOHAZARD_REMEDIATION',
        'HOARDING_CLEANUP',
        'VANDALISM_CLEANUP',
        'GENERAL_RESTORATION',
      ])
    )
    .min(1, 'Please select at least one service'),

  // Service Areas (Australian states)
  serviceAreas: z
    .array(stateSchema)
    .min(1, 'Please select at least one service area'),

  // Certifications
  certifications: z
    .array(
      z.object({
        type: z.enum(['IICRC', 'INSURANCE_APPROVED', 'TRADE_LICENSE', 'OTHER']),
        name: z.string().min(2).max(200),
        number: z.string().max(100).optional(),
        expiryDate: z.string().optional(),
      })
    )
    .optional(),

  // Insurance
  hasPublicLiability: z.boolean(),
  publicLiabilityAmount: z.number().min(1000000).optional(), // Minimum $1M
  hasWorkersCompensation: z.boolean(),

  // Experience
  yearsInBusiness: z.number().min(0).max(100),
  numberOfEmployees: z.number().min(0).max(10000),

  // Additional Information
  additionalInfo: z.string().max(2000).optional(),
  website: z.string().url().optional(),

  // Availability
  availability24x7: z.boolean().default(false),
  emergencyResponseTime: z
    .enum(['UNDER_2_HOURS', 'SAME_DAY', 'NEXT_DAY', 'SCHEDULED'])
    .optional(),

  // Consent
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  backgroundCheckConsent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to background check',
  }),

  // Security
  captchaToken: captchaSchema,
  honeypot: honeypotSchema,

  // Metadata
  source: z.string().max(100).optional(),
  referrer: z.string().max(255).optional(),
});

export type ContractorInquiryInput = z.infer<typeof contractorInquirySchema>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Validate and parse request body
 */
export async function validateRequestBody<T>(
  schema: z.ZodSchema<T>,
  body: unknown
): Promise<{ success: true; data: T } | { success: false; errors: z.ZodError }> {
  try {
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

/**
 * Format Zod validation errors for API response
 */
export function formatValidationErrors(error: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};

  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(err.message);
  });

  return formatted;
}
