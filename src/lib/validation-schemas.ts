import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['CLIENT', 'CONTRACTOR', 'ADMIN']).optional(),
});

export const trainingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  duration: z.number().optional(),
});

export const whiteLabelSchema = z.object({
  tenantId: z.string(),
  brandName: z.string().optional(),
  primaryColor: z.string().optional(),
  logo: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TrainingInput = z.infer<typeof trainingSchema>;
export type WhiteLabelInput = z.infer<typeof whiteLabelSchema>;
