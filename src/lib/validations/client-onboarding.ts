/**
 * Client Onboarding Validation Schemas
 *
 * Zod validation schemas for all 7 phases of client onboarding
 * Reuses Australian validation patterns for phone numbers, postcodes, etc.
 */

import { z } from 'zod';
import { australianPhoneSchema, australianPostcodeSchema, australianABNSchema } from './australia';

// ============================================================================
// PHASE 1: WELCOME & PROFILE SETUP
// ============================================================================

export const profileSetupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  displayName: z.string().max(50, 'Display name must be less than 50 characters').optional(),
  phoneNumber: australianPhoneSchema,
  preferredContactMethod: z.enum(['email', 'phone', 'sms'], {
    errorMap: () => ({ message: 'Select email, phone, or SMS' }),
  }),
  timezone: z.enum(
    [
      'Australia/Sydney',
      'Australia/Melbourne',
      'Australia/Brisbane',
      'Australia/Adelaide',
      'Australia/Perth',
      'Australia/Hobart',
      'Australia/Darwin',
      'Australia/Eucla', // WA/SA border
    ],
    {
      errorMap: () => ({ message: 'Select a valid Australian timezone' }),
    }
  ),
  propertyOwnershipStatus: z.enum(
    ['owner', 'tenant', 'property_manager', 'strata_manager'],
    {
      errorMap: () => ({ message: 'Select ownership status' }),
    }
  ),
});

export type ProfileSetup = z.infer<typeof profileSetupSchema>;

// ============================================================================
// PHASE 2: SERVICE PREFERENCES & NEEDS
// ============================================================================

export const servicePreferencesSchema = z.object({
  primaryServiceTypes: z
    .array(
      z.enum([
        'WATER_DAMAGE',
        'FIRE_DAMAGE',
        'SMOKE_DAMAGE',
        'MOULD_REMEDIATION',
        'ODOUR_REMEDIATION',
        'CRIME_SCENE_CLEANING',
        'BIOHAZARD_REMEDIATION',
        'CARPET_CLEANING',
        'HOARDING_CLEANUP',
        'VANDALISM_CLEANUP',
        'STORM_DAMAGE',
        'COMMERCIAL_WATER_DAMAGE',
        'COMMERCIAL_FIRE_DAMAGE',
        'COMMERCIAL_MOULD',
        'GENERAL_RESTORATION',
      ])
    )
    .min(1, 'Select at least one service type'),
  urgencyPreference: z.enum(['URGENT', 'HIGH', 'STANDARD', 'SCHEDULED'], {
    errorMap: () => ({ message: 'Select urgency preference' }),
  }),
  typicalBudgetRange: z.enum(
    ['under-1000', '1000-5000', '5000-10000', '10000-25000', '25000-plus'],
    {
      errorMap: () => ({ message: 'Select budget range' }),
    }
  ),
  serviceFrequency: z.enum(['one-time', 'occasional', 'regular', 'ongoing'], {
    errorMap: () => ({ message: 'Select service frequency' }),
  }),
  pastServiceExperience: z.boolean(),
  emergencyContactAvailable: z.boolean(),
});

export type ServicePreferences = z.infer<typeof servicePreferencesSchema>;

// ============================================================================
// PHASE 3: LOCATION & PROPERTY DETAILS
// ============================================================================

export const propertyDetailsSchema = z.object({
  streetAddress: z
    .string()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must be less than 200 characters'),
  suburb: z
    .string()
    .min(2, 'Suburb must be at least 2 characters')
    .max(100, 'Suburb must be less than 100 characters'),
  postcode: australianPostcodeSchema,
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'], {
    errorMap: () => ({ message: 'Select Australian state or territory' }),
  }),
  country: z.literal('AU'),
  propertyType: z.enum(
    [
      'residential_house',
      'residential_unit',
      'residential_townhouse',
      'commercial_office',
      'commercial_retail',
      'commercial_warehouse',
      'industrial',
      'strata_building',
    ],
    {
      errorMap: () => ({ message: 'Select property type' }),
    }
  ),
  propertySize: z.string().max(50).optional(),
  buildingAge: z
    .enum(['under-5', '5-10', '10-20', '20-50', 'over-50'], {
      errorMap: () => ({ message: 'Select building age range' }),
    })
    .optional(),
  accessInstructions: z
    .string()
    .max(500, 'Access instructions must be less than 500 characters')
    .optional(),
  parkingAvailable: z.boolean(),
  securityAccess: z.boolean(),
  petOnPremises: z.boolean(),
  petDetails: z.string().max(200, 'Pet details must be less than 200 characters').optional(),
});

export type PropertyDetails = z.infer<typeof propertyDetailsSchema>;

// ============================================================================
// PHASE 4: INSURANCE & DOCUMENTATION
// ============================================================================

export const insuranceDetailsSchema = z
  .object({
    hasInsurance: z.boolean(),
    insuranceProvider: z
      .enum(['NRMA', 'SUNCORP', 'ALLIANZ', 'QBE', 'IAG', 'CGU', 'MEDIBANK', 'AAMI', 'YOUI', 'OTHER'])
      .optional(),
    policyNumber: z.string().min(5, 'Policy number must be at least 5 characters').max(50).optional(),
    policyExpiryDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
      .transform((date) => new Date(date))
      .optional(),
    policyDocumentUrls: z.array(z.string().url('Invalid document URL')).optional(),
    hasPreviousClaims: z.boolean().optional(),
    claimCount: z.number().int().min(0).max(50, 'Claim count seems unusually high').optional(),
    lastClaimDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .transform((date) => new Date(date))
      .optional(),
    preferredContractors: z.array(z.string().cuid()).optional(),
    restrictedContractors: z.array(z.string().cuid()).optional(),
  })
  .refine(
    (data) => {
      // If hasInsurance is true, require provider and policy number
      if (data.hasInsurance) {
        return data.insuranceProvider && data.policyNumber;
      }
      return true;
    },
    {
      message: 'Insurance provider and policy number required when insurance is active',
      path: ['insuranceProvider'],
    }
  )
  .refine(
    (data) => {
      // If hasPreviousClaims is true, require claim count
      if (data.hasPreviousClaims) {
        return typeof data.claimCount === 'number' && data.claimCount > 0;
      }
      return true;
    },
    {
      message: 'Claim count required when previous claims indicated',
      path: ['claimCount'],
    }
  );

export type InsuranceDetails = z.infer<typeof insuranceDetailsSchema>;

// ============================================================================
// PHASE 5: PAYMENT & BILLING
// ============================================================================

export const paymentSetupSchema = z
  .object({
    stripePaymentMethodId: z.string().min(1, 'Payment method is required'),
    billingAddressSameAs: z.boolean(),
    billingStreet: z.string().min(5).max(200).optional(),
    billingSuburb: z.string().min(2).max(100).optional(),
    billingPostcode: australianPostcodeSchema.optional(),
    billingState: z
      .enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'])
      .optional(),
    autoPayEnabled: z.boolean(),
    invoiceDeliveryMethod: z.enum(['email', 'postal', 'both'], {
      errorMap: () => ({ message: 'Select invoice delivery method' }),
    }),
    taxInvoiceRecipient: z.string().min(2).max(200).optional(),
    abnNumber: australianABNSchema.optional(),
  })
  .refine(
    (data) => {
      // If billing address is different from property, require all billing fields
      if (!data.billingAddressSameAs) {
        return (
          data.billingStreet &&
          data.billingSuburb &&
          data.billingPostcode &&
          data.billingState
        );
      }
      return true;
    },
    {
      message: 'Complete billing address required when different from property address',
      path: ['billingStreet'],
    }
  )
  .refine(
    (data) => {
      // If ABN provided, require tax invoice recipient
      if (data.abnNumber) {
        return data.taxInvoiceRecipient;
      }
      return true;
    },
    {
      message: 'Business name required for tax invoices when ABN provided',
      path: ['taxInvoiceRecipient'],
    }
  );

export type PaymentSetup = z.infer<typeof paymentSetupSchema>;

// ============================================================================
// PHASE 6: COMMUNICATION PREFERENCES
// ============================================================================

export const communicationPreferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
    matchNotifications: z.boolean(),
    quoteReceived: z.boolean(),
    workCommenced: z.boolean(),
    workCompleted: z.boolean(),
    paymentReminders: z.boolean(),
    insuranceUpdates: z.boolean(),
    marketingEmails: z.boolean(),
  }),
  contactTimes: z.object({
    preferredDays: z.array(
      z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    ),
    preferredTimeStart: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
    preferredTimeEnd: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
    doNotDisturb: z.boolean(),
    dndStart: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format')
      .optional(),
    dndEnd: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format')
      .optional(),
  }),
  emergencyContact: z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters').max(100),
      relationship: z.string().min(2, 'Relationship must be at least 2 characters').max(50),
      phone: australianPhoneSchema,
      email: z.string().email('Invalid email address').optional(),
      allowContractorContact: z.boolean(),
    })
    .optional(),

  // Privacy settings
  shareDataForAnalytics: z.boolean(), // Hotjar/FullStory consent
  allowSessionRecording: z.boolean(), // Explicit session recording consent
});

export type CommunicationPreferences = z.infer<typeof communicationPreferencesSchema>;

// ============================================================================
// PHASE 7: EDUCATION MODULE COMPLETION
// ============================================================================

export const moduleCompletionSchema = z.object({
  clientId: z.string().cuid('Invalid client ID'),
  moduleId: z
    .string()
    .regex(/^MODULE-\d{3}$/, 'Module ID must be in format MODULE-XXX')
    .refine((id) => {
      const num = parseInt(id.split('-')[1]);
      return num >= 1 && num <= 7;
    }, 'Module ID must be between MODULE-001 and MODULE-007'),
  quizScore: z.number().int().min(0).max(100).optional(),
  timeSpentSeconds: z.number().int().min(0).optional(),
});

export type ModuleCompletion = z.infer<typeof moduleCompletionSchema>;

// ============================================================================
// ONBOARDING COMPLETION
// ============================================================================

export const completeOnboardingSchema = z.object({
  clientId: z.string().cuid(),
  autoCreateRequest: z.boolean(),
  requestData: z
    .object({
      serviceType: z.string(),
      urgency: z.enum(['URGENT', 'HIGH', 'STANDARD', 'SCHEDULED']),
      description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
      propertyId: z.string().cuid(),
    })
    .optional(),
  startTour: z.boolean(),
  shareInvite: z.boolean(), // Invite co-owner/family member
  inviteEmail: z.string().email().optional(),
});

export type CompleteOnboarding = z.infer<typeof completeOnboardingSchema>;

// ============================================================================
// CROSS-DEVICE RESUME
// ============================================================================

export const sendResumeLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
  currentPhase: z.enum([
    'profile',
    'services',
    'property',
    'insurance',
    'payment',
    'communication',
    'education',
  ]),
});

export type SendResumeLink = z.infer<typeof sendResumeLinkSchema>;

// ============================================================================
// HELPER VALIDATORS
// ============================================================================

/**
 * Validate property size input
 * Accepts: "150 sqm", "3 bedrooms", "200m2", etc.
 */
export const propertySizeSchema = z
  .string()
  .max(50, 'Property size must be less than 50 characters')
  .optional();

/**
 * Validate access instructions (will be encrypted)
 */
export const accessInstructionsSchema = z
  .string()
  .max(500, 'Access instructions must be less than 500 characters')
  .optional()
  .transform((val) => {
    // Sanitize: remove potential script injection
    return val?.replace(/<script[^>]*>.*?<\/script>/gi, '') || undefined;
  });

/**
 * Validate pet details
 */
export const petDetailsSchema = z
  .string()
  .max(200, 'Pet details must be less than 200 characters')
  .optional();

/**
 * Validate card expiry date is in the future
 */
export const cardExpirySchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(new Date().getFullYear()),
});

/**
 * Validate time range (start before end)
 */
export function validateTimeRange(start: string, end: string): boolean {
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  return startMinutes < endMinutes;
}

/**
 * Validate date is in the future (for expiry dates)
 */
export const futureDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .transform((date) => new Date(date))
  .refine((date) => date > new Date(), {
    message: 'Date must be in the future',
  });

/**
 * Validate Australian state postcode range match
 */
export function validatePostcodeStateMatch(postcode: string, state: string): boolean {
  const code = parseInt(postcode, 10);

  const ranges: Record<string, [number, number]> = {
    NSW: [1000, 2999],
    VIC: [3000, 3999],
    QLD: [4000, 4999],
    SA: [5000, 5999],
    WA: [6000, 6999],
    TAS: [7000, 7999],
    ACT: [200, 999],
    NT: [800, 899],
  };

  const [min, max] = ranges[state] || [0, 0];
  return code >= min && code <= max;
}
