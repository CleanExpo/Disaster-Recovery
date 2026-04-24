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
