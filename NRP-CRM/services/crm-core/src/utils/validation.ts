import { z } from 'zod';
import { ServiceCategory, ContractorStatus, UserRole } from '@/types';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email format');
export const phoneSchema = z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone format');
export const abnSchema = z.string().regex(/^\d{11}$/, 'ABN must be 11 digits');
export const postcodeSchema = z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits');

// Address validation schema
export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  state: z.enum(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'], {
    errorMap: () => ({ message: 'Invalid state' })
  }),
  postcode: postcodeSchema,
  country: z.string().optional().default('Australia'),
});

// Contact person validation schema
export const contactPersonSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: emailSchema,
  phone: phoneSchema,
  position: z.string().min(1, 'Position is required'),
});

// Certification validation schema
export const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuedBy: z.string().min(1, 'Issuing organization is required'),
  issueDate: z.coerce.date(),
  expiryDate: z.coerce.date(),
  certificateNumber: z.string().min(1, 'Certificate number is required'),
  verified: z.boolean().default(false),
  documentUrl: z.string().url().optional(),
}).refine((data) => data.expiryDate > data.issueDate, {
  message: 'Expiry date must be after issue date',
  path: ['expiryDate'],
});

// Insurance validation schema
export const insuranceSchema = z.object({
  provider: z.string().min(1, 'Insurance provider is required'),
  policyNumber: z.string().min(1, 'Policy number is required'),
  coverageAmount: z.number().positive('Coverage amount must be positive'),
  expiryDate: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Expiry date must be in the future',
  }),
  publicLiability: z.boolean().default(false),
  professionalIndemnity: z.boolean().default(false),
  documentUrl: z.string().url().optional(),
});

// Service territory validation schema
export const serviceTerritorySchema = z.object({
  postcodes: z.array(postcodeSchema).min(1, 'At least one postcode is required'),
  suburbs: z.array(z.string().min(1)).optional().default([]),
  radius: z.number().min(1).max(500, 'Service radius cannot exceed 500km'),
  priority: z.number().min(1).max(10).default(1),
  active: z.boolean().default(true),
});

// Contractor creation validation schema
export const contractorCreateSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  abn: abnSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: addressSchema,
  contactPerson: contactPersonSchema,
  services: z.array(z.nativeEnum(ServiceCategory)).min(1, 'At least one service is required'),
  serviceRadius: z.number().min(1).max(500).default(50),
  certifications: z.array(certificationSchema).default([]),
  insuranceDetails: insuranceSchema,
  website: z.string().url().optional(),
  description: z.string().max(1000).optional(),
});

// Contractor update validation schema
export const contractorUpdateSchema = contractorCreateSchema.partial().extend({
  status: z.nativeEnum(ContractorStatus).optional(),
  verified: z.boolean().optional(),
});

// User registration validation schema
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number')
    .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: phoneSchema.optional(),
  role: z.nativeEnum(UserRole).optional().default(UserRole.CONTRACTOR),
});

// User login validation schema
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Pagination validation schema
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Filter validation schema
export const filterSchema = z.object({
  status: z.array(z.nativeEnum(ContractorStatus)).optional(),
  services: z.array(z.nativeEnum(ServiceCategory)).optional(),
  verified: z.coerce.boolean().optional(),
  location: z.object({
    suburb: z.string().optional(),
    state: z.string().optional(),
    postcode: postcodeSchema.optional(),
  }).optional(),
  rating: z.object({
    min: z.coerce.number().min(0).max(5).optional(),
    max: z.coerce.number().min(0).max(5).optional(),
  }).optional(),
  search: z.string().optional(),
});

// Job validation schemas
export const jobCreateSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Job description is required'),
  serviceCategory: z.nativeEnum(ServiceCategory),
  estimatedValue: z.number().positive().optional(),
  startDate: z.coerce.date().optional(),
  address: z.object({
    street: z.string().min(1),
    suburb: z.string().min(1),
    state: z.string().min(1),
    postcode: postcodeSchema,
    country: z.string().default('Australia'),
  }),
  clientDetails: z.object({
    name: z.string().min(1),
    email: emailSchema,
    phone: phoneSchema,
    contactMethod: z.enum(['email', 'phone', 'both']).default('both'),
  }),
  insuranceDetails: z.object({
    claimNumber: z.string().optional(),
    insurer: z.string().optional(),
    excess: z.number().optional(),
  }).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  notes: z.string().max(2000).optional(),
});

// Performance metrics validation schema
export const performanceMetricsSchema = z.object({
  contractorId: z.string().uuid(),
  averageRating: z.number().min(0).max(5),
  responseTime: z.number().min(0), // minutes
  completionRate: z.number().min(0).max(100), // percentage
  customerSatisfaction: z.number().min(0).max(100), // percentage
  onTimePercentage: z.number().min(0).max(100), // percentage
});

// Review validation schema
export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: emailSchema,
});

// Document upload validation schema
export const documentUploadSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  type: z.enum(['CERTIFICATION', 'INSURANCE', 'LICENSE', 'CONTRACT', 'INVOICE', 'PHOTO', 'REPORT', 'OTHER']),
  description: z.string().max(500).optional(),
});

// Search validation schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.nativeEnum(ServiceCategory).optional(),
  location: z.object({
    suburb: z.string().optional(),
    state: z.string().optional(),
    postcode: postcodeSchema.optional(),
    radius: z.number().min(1).max(500).optional(),
  }).optional(),
  filters: z.object({
    verified: z.boolean().optional(),
    rating: z.number().min(0).max(5).optional(),
    availability: z.boolean().optional(),
  }).optional(),
});

// Password reset validation schemas
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
});

export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number')
    .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
});

// Notification validation schema
export const notificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  type: z.enum(['JOB_ASSIGNED', 'JOB_UPDATED', 'PAYMENT_DUE', 'CERTIFICATION_EXPIRY', 'INSURANCE_EXPIRY', 'SYSTEM_ALERT', 'PERFORMANCE_REVIEW', 'MESSAGE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  expiresAt: z.coerce.date().optional(),
  data: z.record(z.any()).optional(),
});

// Validation helper functions
export const validateRequest = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown): { success: true; data: T } | { success: false; errors: string[] } => {
    try {
      const result = schema.parse(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return { success: false, errors };
      }
      return { success: false, errors: ['Validation failed'] };
    }
  };
};

export const validateAndTransform = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};

// Custom validation helpers
export const isValidABN = (abn: string): boolean => {
  // Basic ABN validation - in production, you might want to use a proper ABN validation library
  if (!/^\d{11}$/.test(abn)) return false;
  
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let sum = 0;
  
  for (let i = 0; i < 11; i++) {
    sum += parseInt(abn[i]) * weights[i];
  }
  
  return sum % 89 === 0;
};

export const isValidPostcode = (postcode: string, state?: string): boolean => {
  if (!/^\d{4}$/.test(postcode)) return false;
  
  if (!state) return true;
  
  const ranges: Record<string, [number, number][]> = {
    'NSW': [[1000, 2599], [2619, 2899], [2921, 2999]],
    'VIC': [[3000, 3999], [8000, 8999]],
    'QLD': [[4000, 4999], [9000, 9999]],
    'SA': [[5000, 5999]],
    'WA': [[6000, 6799], [6800, 6999]],
    'TAS': [[7000, 7999]],
    'NT': [[800, 999]],
    'ACT': [[200, 299], [2600, 2618], [2900, 2920]],
  };
  
  const code = parseInt(postcode);
  const stateRanges = ranges[state.toUpperCase()];
  
  if (!stateRanges) return false;
  
  return stateRanges.some(([min, max]) => code >= min && code <= max);
};

export default {
  emailSchema,
  phoneSchema,
  abnSchema,
  postcodeSchema,
  addressSchema,
  contactPersonSchema,
  certificationSchema,
  insuranceSchema,
  serviceTerritorySchema,
  contractorCreateSchema,
  contractorUpdateSchema,
  userRegistrationSchema,
  userLoginSchema,
  paginationSchema,
  filterSchema,
  jobCreateSchema,
  performanceMetricsSchema,
  reviewSchema,
  documentUploadSchema,
  searchSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  notificationSchema,
  validateRequest,
  validateAndTransform,
  isValidABN,
  isValidPostcode,
};