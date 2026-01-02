/**
 * Input Validation Schemas using Zod
 *
 * This module provides comprehensive validation schemas for all forms
 * to prevent XSS, injection attacks, and invalid data.
 */

import { z } from 'zod';

/**
 * Common validation patterns
 */
const PATTERNS = {
  // Email: RFC 5322 compliant
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone: Various formats (US, international)
  PHONE: /^[\d\s\-\+\(\)\.]+$/,

  // Name: Letters, spaces, hyphens, apostrophes only
  NAME: /^[a-zA-Z\s\-'\.]+$/,

  // Address: Alphanumeric with common punctuation
  ADDRESS: /^[a-zA-Z0-9\s\-\#\.,']+$/,

  // Zip code: US format
  ZIP_CODE: /^\d{5}(-\d{4})?$/,

  // URL: Basic URL validation
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,

  // No HTML tags
  NO_HTML: /^[^<>]*$/,

  // Safe text: No script tags or dangerous characters
  SAFE_TEXT: /^[^<>{}]*$/,
};

/**
 * Sanitize string by removing dangerous characters
 */
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Base validation schemas
 */
export const BaseSchemas = {
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(255, 'Email is too long')
    .regex(PATTERNS.EMAIL, 'Invalid email format')
    .transform(sanitizeString),

  phone: z
    .string()
    .trim()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number is too long')
    .regex(PATTERNS.PHONE, 'Invalid phone number format')
    .transform(sanitizeString),

  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(PATTERNS.NAME, 'Name contains invalid characters')
    .transform(sanitizeString),

  address: z
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address is too long')
    .regex(PATTERNS.ADDRESS, 'Address contains invalid characters')
    .transform(sanitizeString),

  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City name is too long')
    .regex(PATTERNS.NAME, 'City name contains invalid characters')
    .transform(sanitizeString),

  state: z
    .string()
    .trim()
    .length(2, 'State must be a 2-letter code')
    .regex(/^[A-Z]{2}$/, 'Invalid state code')
    .transform((val) => val.toUpperCase()),

  zipCode: z
    .string()
    .trim()
    .regex(PATTERNS.ZIP_CODE, 'Invalid ZIP code format')
    .transform(sanitizeString),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long')
    .regex(PATTERNS.SAFE_TEXT, 'Message contains invalid characters')
    .transform(sanitizeString),

  url: z
    .string()
    .trim()
    .url('Invalid URL')
    .regex(PATTERNS.URL, 'Invalid URL format')
    .max(2000, 'URL is too long'),

  captchaToken: z
    .string()
    .min(1, 'CAPTCHA verification is required')
    .max(10000, 'Invalid CAPTCHA token'),
};

/**
 * Lead Capture Form Schema
 * Max 3 submissions per hour per IP
 */
export const LeadCaptureSchema = z.object({
  firstName: BaseSchemas.name,
  lastName: BaseSchemas.name,
  email: BaseSchemas.email,
  phone: BaseSchemas.phone,
  address: BaseSchemas.address.optional(),
  city: BaseSchemas.city.optional(),
  state: BaseSchemas.state.optional(),
  zipCode: BaseSchemas.zipCode.optional(),
  claimType: z.enum(['water', 'fire', 'storm', 'mold', 'other']),
  message: BaseSchemas.message.optional(),
  captchaToken: BaseSchemas.captchaToken,
  source: z.string().max(100).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
});

export type LeadCaptureInput = z.infer<typeof LeadCaptureSchema>;

/**
 * Contractor Inquiry Form Schema
 * Max 5 submissions per day per IP
 */
export const ContractorInquirySchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, 'Company name is required')
    .max(200, 'Company name is too long')
    .regex(PATTERNS.SAFE_TEXT, 'Company name contains invalid characters')
    .transform(sanitizeString),
  contactName: BaseSchemas.name,
  email: BaseSchemas.email,
  phone: BaseSchemas.phone,
  website: BaseSchemas.url.optional(),
  licenseNumber: z
    .string()
    .trim()
    .max(50, 'License number is too long')
    .regex(/^[a-zA-Z0-9\-]+$/, 'Invalid license number format')
    .transform(sanitizeString)
    .optional(),
  serviceTypes: z
    .array(z.enum(['water', 'fire', 'storm', 'mold', 'reconstruction', 'other']))
    .min(1, 'Select at least one service type')
    .max(10, 'Too many service types selected'),
  serviceAreas: z
    .array(z.string().max(100))
    .min(1, 'Specify at least one service area')
    .max(20, 'Too many service areas'),
  yearsInBusiness: z
    .number()
    .int()
    .min(0, 'Years in business must be positive')
    .max(200, 'Invalid years in business'),
  message: BaseSchemas.message,
  captchaToken: BaseSchemas.captchaToken,
});

export type ContractorInquiryInput = z.infer<typeof ContractorInquirySchema>;

/**
 * Claim Submission Form Schema
 */
export const ClaimSubmissionSchema = z.object({
  // Personal Information
  firstName: BaseSchemas.name,
  lastName: BaseSchemas.name,
  email: BaseSchemas.email,
  phone: BaseSchemas.phone,

  // Property Information
  propertyAddress: BaseSchemas.address,
  propertyCity: BaseSchemas.city,
  propertyState: BaseSchemas.state,
  propertyZipCode: BaseSchemas.zipCode,
  propertyType: z.enum(['single-family', 'multi-family', 'condo', 'commercial', 'other']),

  // Claim Details
  claimType: z.enum(['water', 'fire', 'storm', 'mold', 'vandalism', 'theft', 'other']),
  incidentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => new Date(date) <= new Date(), 'Incident date cannot be in the future'),
  description: BaseSchemas.message,
  estimatedDamage: z
    .number()
    .min(0, 'Damage amount must be positive')
    .max(10000000, 'Damage amount is too high')
    .optional(),

  // Insurance Information
  insuranceCompany: z
    .string()
    .trim()
    .max(200)
    .regex(PATTERNS.SAFE_TEXT)
    .transform(sanitizeString)
    .optional(),
  policyNumber: z
    .string()
    .trim()
    .max(100)
    .regex(/^[a-zA-Z0-9\-]+$/, 'Invalid policy number format')
    .transform(sanitizeString)
    .optional(),

  // Verification
  captchaToken: BaseSchemas.captchaToken,

  // Optional metadata
  urgency: z.enum(['low', 'medium', 'high', 'emergency']).optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'text']).optional(),
});

export type ClaimSubmissionInput = z.infer<typeof ClaimSubmissionSchema>;

/**
 * Contact Form Schema
 */
export const ContactFormSchema = z.object({
  name: BaseSchemas.name,
  email: BaseSchemas.email,
  phone: BaseSchemas.phone.optional(),
  subject: z
    .string()
    .trim()
    .min(3, 'Subject is required')
    .max(200, 'Subject is too long')
    .regex(PATTERNS.SAFE_TEXT, 'Subject contains invalid characters')
    .transform(sanitizeString),
  message: BaseSchemas.message,
  captchaToken: BaseSchemas.captchaToken,
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * NRPG Application Form Schema
 */
export const NRPGApplicationSchema = z.object({
  // Company Information
  companyName: z
    .string()
    .trim()
    .min(2, 'Company name is required')
    .max(200, 'Company name is too long')
    .regex(PATTERNS.SAFE_TEXT)
    .transform(sanitizeString),
  dbaName: z
    .string()
    .trim()
    .max(200)
    .regex(PATTERNS.SAFE_TEXT)
    .transform(sanitizeString)
    .optional(),
  ein: z
    .string()
    .trim()
    .regex(/^\d{2}-\d{7}$/, 'Invalid EIN format (XX-XXXXXXX)')
    .transform(sanitizeString),
  yearsInBusiness: z.number().int().min(0).max(200),

  // Contact Information
  primaryContactName: BaseSchemas.name,
  primaryContactEmail: BaseSchemas.email,
  primaryContactPhone: BaseSchemas.phone,
  businessAddress: BaseSchemas.address,
  businessCity: BaseSchemas.city,
  businessState: BaseSchemas.state,
  businessZipCode: BaseSchemas.zipCode,
  website: BaseSchemas.url.optional(),

  // Licensing
  licenseNumber: z
    .string()
    .trim()
    .max(50)
    .regex(/^[a-zA-Z0-9\-]+$/)
    .transform(sanitizeString),
  licenseState: BaseSchemas.state,
  licenseExpiration: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((date) => new Date(date) > new Date(), 'License must not be expired'),

  // Insurance
  generalLiabilityAmount: z.number().min(1000000, 'Minimum $1M general liability required'),
  generalLiabilityCarrier: z.string().trim().max(200).transform(sanitizeString),
  workersCompAmount: z.number().min(500000, 'Minimum $500K workers compensation required'),
  workersCompCarrier: z.string().trim().max(200).transform(sanitizeString),

  // Services
  serviceTypes: z
    .array(z.enum(['water', 'fire', 'storm', 'mold', 'reconstruction', 'contents', 'other']))
    .min(1, 'Select at least one service type')
    .max(10),
  serviceAreas: z.array(z.string().max(100)).min(1).max(50),

  // Additional Information
  employeeCount: z.number().int().min(1).max(10000),
  annualRevenue: z.number().min(0).max(1000000000).optional(),
  certifications: z.array(z.string().max(100)).max(20).optional(),
  references: z
    .array(
      z.object({
        name: BaseSchemas.name,
        company: z.string().max(200),
        phone: BaseSchemas.phone,
        email: BaseSchemas.email,
      })
    )
    .min(2, 'Provide at least 2 references')
    .max(5, 'Maximum 5 references allowed')
    .optional(),

  // Agreement
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
  agreeToBackgroundCheck: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the background check' }),
  }),

  // Verification
  captchaToken: BaseSchemas.captchaToken,
});

export type NRPGApplicationInput = z.infer<typeof NRPGApplicationSchema>;

/**
 * File Upload Validation
 */
export const FileUploadSchema = z.object({
  fileName: z
    .string()
    .trim()
    .min(1, 'File name is required')
    .max(255, 'File name is too long')
    .regex(/^[a-zA-Z0-9\-_\.]+$/, 'Invalid file name'),
  fileSize: z
    .number()
    .int()
    .min(1, 'File is empty')
    .max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  fileType: z.enum([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]),
});

export type FileUploadInput = z.infer<typeof FileUploadSchema>;

/**
 * Sanitize and validate arbitrary text input
 */
export function sanitizeTextInput(input: string, maxLength: number = 5000): string {
  if (!input) return '';

  return sanitizeString(input).slice(0, maxLength);
}

/**
 * Validate email without schema (quick check)
 */
export function isValidEmail(email: string): boolean {
  return PATTERNS.EMAIL.test(email);
}

/**
 * Validate phone number without schema (quick check)
 */
export function isValidPhone(phone: string): boolean {
  return PATTERNS.PHONE.test(phone);
}
