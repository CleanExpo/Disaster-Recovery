/**
 * Contact Form Validation Schema
 *
 * Zod schema for validating contact form submissions
 */

import { z } from 'zod';

/**
 * Contact Form Schema - Validates public contact form submissions
 */
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
  phone: z.string()
    .regex(/^[\d\-\+\s\(\)]{10,}$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
  category: z.enum(['general', 'support', 'billing', 'partnership'], {
    errorMap: () => ({ message: 'Invalid category selected' }),
  }).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Contact Form Response Schema - Validates admin response to contact
 */
export const contactFormResponseSchema = z.object({
  contactId: z.string().min(1, 'Contact ID is required'),
  response: z.string()
    .min(10, 'Response must be at least 10 characters')
    .max(5000, 'Response must be less than 5000 characters')
    .trim(),
  status: z.enum(['responded', 'escalated'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }).optional(),
});

export type ContactFormResponse = z.infer<typeof contactFormResponseSchema>;
