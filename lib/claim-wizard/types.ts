/**
 * Claim Wizard Types & Validation Schemas
 *
 * Complete type definitions for the multi-step claim reporting wizard
 * with Zod validation schemas for strict type safety and runtime validation
 */

import { z } from 'zod';

// ============================================================================
// Step 1: Triage (Emergency Assessment)
// ============================================================================

export const disasterTypes = [
  { value: 'water-damage', label: 'Water Damage' },
  { value: 'fire-damage', label: 'Fire & Smoke Damage' },
  { value: 'mold', label: 'Mold Remediation' },
  { value: 'storm-damage', label: 'Storm Damage' },
  { value: 'sewage', label: 'Sewage Cleanup' },
  { value: 'biohazard', label: 'Biohazard Restoration' },
] as const;

export const triageSchema = z.object({
  disasterType: z.enum(
    ['water-damage', 'fire-damage', 'mold', 'storm-damage', 'sewage', 'biohazard'],
    { required_error: 'Please select what happened' }
  ),
  incidentDate: z.string().min(1, 'Please select when this happened'),
  isOngoing: z.enum(['yes', 'no'], { required_error: 'Please indicate if this is still happening' }),
  isEmergency: z.enum(['yes', 'no'], { required_error: 'Please indicate if anyone is in danger' }),
});

export type TriageData = z.infer<typeof triageSchema>;

// ============================================================================
// Step 2: Location & Contact
// ============================================================================

export const locationContactSchema = z.object({
  propertyAddress: z.string().min(5, 'Please enter your property address'),
  suburb: z.string().min(2, 'Suburb is required'),
  postcode: z.string()
    .regex(/^\d{4}$/, 'Postcode must be 4 digits')
    .length(4, 'Postcode must be 4 digits'),
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string()
    .regex(/^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/, 'Please enter a valid Australian phone number')
    .transform((val) => val.replace(/\s|-/g, '')), // Normalize phone format
  email: z.string().email('Please enter a valid email address'),
});

export type LocationContactData = z.infer<typeof locationContactSchema>;

// ============================================================================
// Step 3: Details & Insurance
// ============================================================================

export const detailsInsuranceSchema = z.object({
  damageDescription: z.string()
    .min(20, 'Please provide at least 20 characters describing the damage')
    .max(1000, 'Description must be less than 1000 characters'),
  hasInsurance: z.enum(['yes', 'no'], { required_error: 'Please indicate if you have insurance' }),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  photoUrls: z.array(z.string()).optional().default([]),
}).refine(
  (data) => {
    // If has insurance, provider is required
    if (data.hasInsurance === 'yes' && !data.insuranceProvider) {
      return false;
    }
    return true;
  },
  {
    message: 'Insurance provider is required when you have insurance',
    path: ['insuranceProvider'],
  }
);

export type DetailsInsuranceData = z.infer<typeof detailsInsuranceSchema>;

// ============================================================================
// Complete Claim Data
// ============================================================================

export const completeClaimSchema = z.object({
  step1: triageSchema,
  step2: locationContactSchema,
  step3: detailsInsuranceSchema,
  captchaToken: z.string().min(1, 'CAPTCHA verification required'),
});

export type CompleteClaimData = z.infer<typeof completeClaimSchema>;

// ============================================================================
// Form State & Storage
// ============================================================================

export interface ClaimFormState {
  step1?: TriageData;
  step2?: LocationContactData;
  step3?: DetailsInsuranceData;
  currentStep: number;
  completedSteps: number[];
  startedAt: string;
  lastUpdatedAt: string;
}

export const STORAGE_KEY = 'nrpg-claim-wizard-state';
export const STORAGE_VERSION = '1.0.0';

// ============================================================================
// API Response Types
// ============================================================================

export interface ClaimSubmissionResponse {
  success: boolean;
  claimId?: string;
  message: string;
  estimatedContractorCalls?: number;
  estimatedResponseTime?: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

// ============================================================================
// Priority Calculation
// ============================================================================

export type ClaimPriority = 'critical' | 'urgent' | 'high' | 'medium';

export function calculatePriority(data: Partial<ClaimFormState>): ClaimPriority {
  if (data.step1?.isEmergency === 'yes') return 'critical';
  if (data.step1?.isOngoing === 'yes') return 'urgent';

  // High priority for severe disaster types
  const severeDamageTypes = ['fire-damage', 'sewage', 'biohazard'];
  if (data.step1?.disasterType && severeDamageTypes.includes(data.step1.disasterType)) {
    return 'high';
  }

  return 'medium';
}
