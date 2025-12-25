import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format');

// User schemas
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: phoneSchema.optional(),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: phoneSchema.optional(),
  image: z.string().url().optional(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});

// Booking schemas
export const serviceTypes = [
  'WATER_DAMAGE',
  'FIRE_RESTORATION',
  'MOLD_REMEDIATION',
  'STORM_DAMAGE',
  'BIOHAZARD_CLEANUP',
  'SMOKE_DAMAGE',
  'VANDALISM_CLEANUP',
  'GENERAL_RESTORATION',
] as const;

export const emergencyLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;

export const createBookingSchema = z.object({
  serviceType: z.enum(serviceTypes),
  emergencyLevel: z.enum(emergencyLevels),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
  address: z.string().min(5, 'Address is required').max(200),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().length(2, 'State must be 2-letter abbreviation'),
  zipCode: zipCodeSchema,
  estimatedCost: z.number().positive().optional(),
  scheduledDate: z.string().datetime().optional(),
  images: z.array(z.string().url()).max(10).optional(),
});

export const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED']).optional(),
  contractorId: z.string().uuid().optional(),
  scheduledDate: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
  finalCost: z.number().positive().optional(),
});

// Payment schemas
export const createPaymentSchema = z.object({
  bookingId: z.string().uuid(),
  amount: z.number().positive().min(1, 'Amount must be at least $1'),
  paymentMethod: z.enum(['CARD', 'BANK_TRANSFER', 'CHECK', 'CASH', 'INSURANCE']),
  description: z.string().max(500).optional(),
});

export const processPaymentSchema = z.object({
  paymentIntentId: z.string().min(1),
  paymentMethodId: z.string().min(1),
});

export const refundPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  amount: z.number().positive().optional(),
  reason: z.string().max(500).optional(),
});

// Contractor schemas
export const contractorApplicationSchema = z.object({
  businessName: z.string().min(2, 'Business name is required').max(200),
  licenseNumber: z.string().min(5, 'License number is required').max(50),
  insuranceExpiry: z.string().datetime(),
  serviceArea: z.array(zipCodeSchema).min(1, 'At least one service area is required'),
  specialties: z.array(z.enum(serviceTypes)).min(1, 'At least one specialty is required'),
  bankAccountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
});

export const updateContractorSchema = z.object({
  businessName: z.string().min(2).max(200).optional(),
  licenseNumber: z.string().min(5).max(50).optional(),
  insuranceExpiry: z.string().datetime().optional(),
  serviceArea: z.array(zipCodeSchema).optional(),
  specialties: z.array(z.enum(serviceTypes)).optional(),
  isVerified: z.boolean().optional(),
});

// Admin schemas
export const adminSearchSchema = z.object({
  query: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  filters: z.record(z.any()).optional(),
});

export const fraudReviewSchema = z.object({
  transactionId: z.string().uuid(),
  action: z.enum(['APPROVE', 'REJECT', 'FLAG', 'INVESTIGATE']),
  reason: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
});

// Validation helper functions
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
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

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type ContractorApplicationInput = z.infer<typeof contractorApplicationSchema>;
