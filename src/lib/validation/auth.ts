/**
 * Authentication Validation Schemas
 *
 * Zod schemas for validating authentication-related requests
 * including login, signup, password reset, and password change operations.
 */

import { z } from 'zod';

// Password regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

/**
 * Login Schema - Validates user login credentials
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Signup Schema - Validates user registration data
 */
export const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof signupSchema>;

/**
 * Reset Password Request Schema - Validates email for password reset
 */
export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/**
 * Reset Password Confirm Schema - Validates password reset with token
 */
export const resetPasswordConfirmSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordConfirmInput = z.infer<typeof resetPasswordConfirmSchema>;

/**
 * Change Password Schema - Validates password change for authenticated users
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

/**
 * Verify Email Schema - Validates email verification token
 */
export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

/**
 * Two-Factor Authentication Setup Schema
 */
export const setupTwoFactorSchema = z.object({
  method: z.enum(['email', 'sms', 'authenticator'], {
    errorMap: () => ({ message: 'Invalid 2FA method' }),
  }),
});

export type SetupTwoFactorInput = z.infer<typeof setupTwoFactorSchema>;

/**
 * Two-Factor Authentication Verification Schema
 */
export const verifyTwoFactorSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Verification code must be 6 digits'),
});

export type VerifyTwoFactorInput = z.infer<typeof verifyTwoFactorSchema>;
