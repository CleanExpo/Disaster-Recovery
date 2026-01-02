/**
 * hCaptcha Integration
 *
 * This module provides hCaptcha verification functionality
 * to prevent bot submissions on critical forms.
 */

import axios from 'axios';

const HCAPTCHA_VERIFY_URL = 'https://hcaptcha.com/siteverify';

/**
 * hCaptcha verification response
 */
export interface HCaptchaVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  credit?: boolean;
  'error-codes'?: string[];
  score?: number;
  score_reason?: string[];
}

/**
 * Verify hCaptcha token on the server side
 *
 * @param token - The hCaptcha token from the client
 * @param remoteip - Optional remote IP address for additional validation
 * @returns Promise resolving to verification result
 */
export async function verifyHCaptcha(
  token: string,
  remoteip?: string
): Promise<HCaptchaVerificationResponse> {
  const secretKey = process.env.HCAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error('HCAPTCHA_SECRET_KEY is not configured');
  }

  if (!token) {
    return {
      success: false,
      'error-codes': ['missing-input-response'],
    };
  }

  try {
    const response = await axios.post<HCaptchaVerificationResponse>(
      HCAPTCHA_VERIFY_URL,
      new URLSearchParams({
        secret: secretKey,
        response: token,
        ...(remoteip && { remoteip }),
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000, // 10 second timeout
      }
    );

    return response.data;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return {
      success: false,
      'error-codes': ['network-error'],
    };
  }
}

/**
 * Verify hCaptcha token and throw error if verification fails
 *
 * @param token - The hCaptcha token from the client
 * @param remoteip - Optional remote IP address
 * @throws Error if verification fails
 */
export async function requireValidCaptcha(
  token: string,
  remoteip?: string
): Promise<void> {
  const result = await verifyHCaptcha(token, remoteip);

  if (!result.success) {
    const errors = result['error-codes'] || [];
    throw new Error(
      `CAPTCHA verification failed: ${errors.join(', ') || 'Unknown error'}`
    );
  }
}

/**
 * Check if hCaptcha is properly configured
 */
export function isCaptchaEnabled(): boolean {
  return !!(
    process.env.HCAPTCHA_SECRET_KEY &&
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY
  );
}

/**
 * Get hCaptcha error message for display to users
 */
export function getCaptchaErrorMessage(errorCodes?: string[]): string {
  if (!errorCodes || errorCodes.length === 0) {
    return 'CAPTCHA verification failed. Please try again.';
  }

  const errorMessages: Record<string, string> = {
    'missing-input-secret': 'Server configuration error. Please contact support.',
    'invalid-input-secret': 'Server configuration error. Please contact support.',
    'missing-input-response': 'Please complete the CAPTCHA challenge.',
    'invalid-input-response': 'Invalid CAPTCHA response. Please try again.',
    'bad-request': 'Invalid request. Please refresh and try again.',
    'invalid-or-already-seen-response': 'This CAPTCHA has already been used. Please try again.',
    'not-using-dummy-passcode': 'Invalid test passcode.',
    'sitekey-secret-mismatch': 'Server configuration error. Please contact support.',
    'network-error': 'Network error during verification. Please try again.',
  };

  const firstError = errorCodes[0];
  return errorMessages[firstError] || 'CAPTCHA verification failed. Please try again.';
}

/**
 * Middleware helper to verify CAPTCHA in API routes
 */
export async function verifyCaptchaMiddleware(
  captchaToken: string | undefined,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  // Skip in development if not configured
  if (process.env.NODE_ENV === 'development' && !isCaptchaEnabled()) {
    console.warn('hCaptcha not configured - skipping verification in development');
    return { success: true };
  }

  if (!captchaToken) {
    return {
      success: false,
      error: 'CAPTCHA token is required',
    };
  }

  try {
    await requireValidCaptcha(captchaToken, remoteIp);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'CAPTCHA verification failed';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Client-side configuration
 */
export const HCAPTCHA_CONFIG = {
  siteKey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '',
  size: 'normal' as const,
  theme: 'light' as const,
};
