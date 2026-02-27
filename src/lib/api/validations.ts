/**
 * Domain Zod Schemas — Public API Routes
 * ========================================
 * Each schema matches the expected body/query of a specific API endpoint.
 * Grouped by domain (claims, leads, tickets, upload, search).
 */

import { z } from 'zod';
import {
  email,
  auPhone,
  auPhoneOptional,
  fullName,
  auPostcode,
  auState,
  addressLine,
  suburb,
  policyNumber,
  claimNumber,
  description,
  shortText,
  urgencyLevel,
  propertyType,
  damageType,
  pageNumber,
  pageSize,
  entityId,
} from './validators';

// ---------------------------------------------------------------------------
// Claims
// ---------------------------------------------------------------------------

export const claimSubmitSchema = z.object({
  // Payment gate
  paymentConfirmed: z.literal(true, {
    errorMap: () => ({ message: 'Payment confirmation is required' }),
  }),
  paymentAmount: z.number(),

  // Contact
  fullName,
  email,
  phone: auPhoneOptional,

  // Property
  propertyAddress: addressLine,
  suburb,
  state: auState,
  postcode: auPostcode,

  // Damage
  damageDescription: description,
  damageTypes: z.array(z.string()).optional().default([]),
  damagePhotos: z.array(z.string().url()).optional().default([]),
  uploadedDocuments: z.array(z.string()).optional().default([]),

  // Insurance
  policyNumber,
  insuranceCompany: z.string().trim().max(200).optional(),
  insuranceClaimNumber: claimNumber,

  // Optional context
  urgencyLevel: urgencyLevel.optional().default('standard'),
  totalClaimAmount: z.number().positive().optional(),
  bookingId: z.string().optional().default(''),
  clientId: z.string().optional(),
  tenantId: z.string().nullable().optional(),
});

export type ClaimSubmitInput = z.infer<typeof claimSubmitSchema>;

export const claimGetSchema = z.object({
  id: entityId,
});

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export const leadCaptureSchema = z.object({
  // Contact
  fullName,
  phone: auPhone,
  email,

  // Property
  propertyType: z.string().trim().min(1, 'Property type is required'),
  propertyAddress: addressLine,
  suburb,
  state: auState,
  postcode: auPostcode,

  // Damage
  damageType,
  damageDate: z.string().refine(
    (v) => !isNaN(Date.parse(v)),
    { message: 'Invalid date format' },
  ),
  damageDescription: description,
  estimatedAreaAffected: z.string().optional(),

  // Insurance
  hasInsurance: z.boolean().optional().default(false),
  insuranceCompany: z.string().trim().max(200).optional(),
  claimNumber,
  excessAmount: z.number().nonnegative().optional(),

  // Value indicators
  urgencyLevel: urgencyLevel.optional().default('standard'),
  propertyValue: z.union([z.string(), z.number()]).optional(),
  isBusinessProperty: z.boolean().optional().default(false),
  requiresAccommodation: z.boolean().optional().default(false),

  // Quality signals
  hasPhotos: z.boolean().optional().default(false),
  readyToStart: z.enum(['immediately', 'within_week', 'within_month', 'planning']).optional(),
  budget: z.string().optional().nullable(),
  decisionMaker: z.boolean().optional().default(false),

  // Tracking (set by server, accepted but optional from client)
  source: z.string().max(100).optional(),
  userAgent: z.string().max(500).optional(),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

// ---------------------------------------------------------------------------
// Tickets
// ---------------------------------------------------------------------------

export const ticketCreateSchema = z.object({
  // Contact
  email: email.optional().default('anonymous'),
  phone: auPhoneOptional,

  // Property
  propertyType: z.string().trim().optional().default('residential'),
  propertyAddress: z.string().trim().optional(),
  suburb: z.string().trim().optional(),
  state: z.string().trim().optional(),
  postcode: z.string().trim().optional(),

  // Damage
  damageType: z.union([
    z.array(z.string()),
    z.string(),
  ]).optional(),
  damageDescription: shortText.optional().default(''),
  urgencyLevel: urgencyLevel.optional().default('standard'),

  // Value
  hasInsurance: z.boolean().optional().default(false),
  isBusinessProperty: z.boolean().optional().default(false),
  propertyValue: z.union([z.string(), z.number()]).optional(),
  readyToStart: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  decisionMaker: z.boolean().optional().default(false),
});

export type TicketCreateInput = z.infer<typeof ticketCreateSchema>;

export const ticketGetSchema = z.object({
  id: entityId,
});

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

/** Validated after formData extraction — not a JSON body schema. */
export const uploadOptionsSchema = z.object({
  quality: z.coerce.number().int().min(1).max(100).default(85),
  maxWidth: z.coerce.number().int().min(100).max(8000).default(1920),
  format: z.enum(['jpeg', 'webp', 'avif', 'png']).default('webp'),
});

export type UploadOptions = z.infer<typeof uploadOptionsSchema>;

/** Batch optimisation body. */
export const batchOptimiseSchema = z.object({
  directory: z.string().trim().min(1, 'Directory path is required'),
  options: z.object({
    quality: z.number().int().min(1).max(100).optional(),
    width: z.number().int().min(100).max(8000).optional(),
    format: z.enum(['jpeg', 'webp', 'avif', 'png']).optional(),
  }).optional(),
});

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export const searchParamsSchema = z.object({
  q: z.string().trim().max(500).optional(),
  category: z.string().max(100).optional(),
  location: z.string().max(200).optional(),
  type: z.enum(['service', 'contractor', 'article', 'location']).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxResponseTime: z.coerce.number().optional(),
  emergencyOnly: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((v) => v === true || v === 'true')
    .optional()
    .default(false),
  insuranceApproved: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((v) => v === true || v === 'true')
    .optional()
    .default(false),
  certifiedOnly: z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((v) => v === true || v === 'true')
    .optional()
    .default(false),
  sortBy: z.enum(['relevance', 'rating', 'location', 'price', 'responseTime']).optional().default('relevance'),
  page: pageNumber,
  limit: pageSize,
});

export type SearchParamsInput = z.infer<typeof searchParamsSchema>;
