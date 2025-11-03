import { z } from 'zod';

/**
 * Centralized Zod validation schemas following Anthropic best practices
 * Ensures consistent validation across API routes
 */

// ============ AUTH SCHEMAS ============

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  userType: z.enum(['CLIENT', 'CONTRACTOR', 'ADMIN']),
});

// ============ SERVICE REQUEST SCHEMAS ============

export const serviceRequestSchema = z.object({
  serviceCategory: z.string().min(1, 'Service category is required'),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']),
  serviceTitle: z.string().min(5, 'Service title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().min(5, 'Location is required'),
  budget: z.string().optional(),
  phone: z.string().optional(),
  preferredTime: z.string().optional(),
  insurance: z.boolean().optional(),
  urgentResponse: z.boolean().optional(),
});

// ============ CONTRACTOR PROFILE SCHEMAS ============

export const contractorProfileCreateSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{4,}$/, 'Invalid zip code'),
  licenseNumber: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insuranceExpiry: z.string().datetime().optional(),
  services: z.array(z.string()).min(1, 'At least one service is required'),
  serviceAreas: z.array(z.string()).min(1, 'At least one service area is required'),
  hourlyRate: z.union([z.string(), z.number()]).transform(val =>
    typeof val === 'string' ? parseFloat(val) : val
  ).refine(val => val > 0, 'Hourly rate must be positive'),
  experience: z.union([z.string(), z.number()]).transform(val =>
    typeof val === 'string' ? parseInt(val, 10) : val
  ).refine(val => val >= 0, 'Experience must be non-negative'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').optional(),
  availability: z.enum(['AVAILABLE', 'BUSY', 'OFFLINE']).optional(),
});

export const contractorProfileUpdateSchema = contractorProfileCreateSchema.partial();

// ============ BID SCHEMAS ============

export const bidSchema = z.object({
  amount: z.union([z.string(), z.number()]).transform(val =>
    typeof val === 'string' ? parseFloat(val) : val
  ).refine(val => val > 0, 'Bid amount must be positive'),
  proposedTimeline: z.string().min(5, 'Proposed timeline is required'),
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
});

// ============ MESSAGE SCHEMAS ============

export const messageSchema = z.object({
  receiverId: z.string().uuid('Invalid receiver ID'),
  content: z.string().min(1, 'Message content is required').max(2000, 'Message too long'),
});

// ============ FEEDBACK SCHEMAS ============

export const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').optional(),
  contractorId: z.string().uuid('Invalid contractor ID'),
  projectId: z.string().uuid('Invalid project ID'),
});

// ============ TRAINING SCHEMAS ============

export const trainingActionSchema = z.object({
  moduleId: z.string().optional(),
  lessonId: z.string().optional(),
  action: z.enum(['start_module', 'complete_lesson', 'complete_module', 'update_progress']),
  score: z.number().min(0).max(100).optional(),
});

// ============ WHITE LABEL SCHEMAS ============

export const whiteLabelConfigSchema = z.object({
  section: z.enum(['branding', 'customization', 'integrations', 'deployment']),
  config: z.record(z.unknown()),
});

// ============ TYPE EXPORTS ============

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
export type ContractorProfileCreateInput = z.infer<typeof contractorProfileCreateSchema>;
export type ContractorProfileUpdateInput = z.infer<typeof contractorProfileUpdateSchema>;
export type BidInput = z.infer<typeof bidSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type TrainingActionInput = z.infer<typeof trainingActionSchema>;
export type WhiteLabelConfigInput = z.infer<typeof whiteLabelConfigSchema>;
