/**
 * Contractor Validation Schemas
 *
 * Zod schemas for validating contractor registration, profile updates,
 * and service area management
 */

import { z } from 'zod';

/**
 * Contractor Registration Schema - Validates contractor application
 */
export const contractorRegistrationSchema = z.object({
  name: z.string()
    .min(2, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
  phone: z.string()
    .regex(/^[\d\-\+\s\(\)]{10,}$/, 'Valid phone number required')
    .trim(),
  companyName: z.string()
    .min(2, 'Company name is required')
    .max(200, 'Company name must be less than 200 characters')
    .trim(),
  companyRegistration: z.string()
    .min(1, 'Company registration number is required')
    .max(50, 'Company registration must be less than 50 characters')
    .trim()
    .optional(),
  license: z.string()
    .min(5, 'License number is required')
    .max(50, 'License number must be less than 50 characters')
    .trim(),
  licenseExpiry: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  experience: z.number()
    .int('Experience must be a whole number')
    .min(0, 'Experience must be 0 or more')
    .max(70, 'Experience must be 70 or less'),
  serviceAreas: z.array(
    z.string().regex(/^\d{5}$/, 'Invalid ZIP code format'),
    { errorMap: () => ({ message: 'Service areas must be valid ZIP codes' }) }
  ).min(1, 'Select at least one service area'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  hourlyRate: z.number()
    .positive('Hourly rate must be positive')
    .optional(),
  bio: z.string()
    .max(1000, 'Bio must be less than 1000 characters')
    .optional()
    .or(z.literal('')),
  insuranceProvider: z.string()
    .min(1, 'Insurance provider is required')
    .max(200, 'Insurance provider must be less than 200 characters')
    .optional(),
  insurancePolicyNumber: z.string()
    .min(1, 'Insurance policy number is required')
    .max(50, 'Policy number must be less than 50 characters')
    .optional(),
});

export type ContractorRegistrationInput = z.infer<typeof contractorRegistrationSchema>;

/**
 * Contractor Profile Update Schema - Validates profile changes
 */
export const contractorProfileUpdateSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  phone: z.string()
    .regex(/^[\d\-\+\s\(\)]{10,}$/, 'Invalid phone number format')
    .optional(),
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters')
    .optional(),
  experience: z.number()
    .int('Experience must be a whole number')
    .min(0, 'Experience must be 0 or more')
    .max(70, 'Experience must be 70 or less')
    .optional(),
  hourlyRate: z.number()
    .positive('Hourly rate must be positive')
    .optional(),
  bio: z.string()
    .max(1000, 'Bio must be less than 1000 characters')
    .optional(),
  serviceAreas: z.array(
    z.string().regex(/^\d{5}$/, 'Invalid ZIP code format')
  ).optional(),
  specialties: z.array(z.string()).optional(),
});

export type ContractorProfileUpdateInput = z.infer<typeof contractorProfileUpdateSchema>;

/**
 * Contractor Availability Schema - Validates availability updates
 */
export const contractorAvailabilitySchema = z.object({
  status: z.enum(['available', 'unavailable', 'on_job'], {
    errorMap: () => ({ message: 'Invalid availability status' }),
  }),
  unavailableUntil: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Invalid ISO 8601 datetime format')
    .optional(),
  reason: z.string()
    .max(500, 'Reason must be less than 500 characters')
    .optional(),
});

export type ContractorAvailabilityInput = z.infer<typeof contractorAvailabilitySchema>;

/**
 * Contractor Verification Schema - For admin verification
 */
export const contractorVerificationSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
  verified: z.boolean(),
  reason: z.string()
    .min(1, 'Reason is required')
    .max(500, 'Reason must be less than 500 characters')
    .optional(),
});

export type ContractorVerificationInput = z.infer<typeof contractorVerificationSchema>;
