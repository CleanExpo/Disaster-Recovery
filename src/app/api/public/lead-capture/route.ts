/**
 * Lead Capture API Route
 *
 * This route handles lead capture form submissions with:
 * - Rate limiting (3 per hour per IP)
 * - CAPTCHA verification
 * - Input validation and sanitization
 * - XSS prevention
 */

import { NextRequest, NextResponse } from 'next/server';
import { LeadCaptureSchema } from '@/lib/security/validation-schemas';
import { verifyCaptchaMiddleware } from '@/lib/security/captcha';
import { sanitizeObject } from '@/lib/security/sanitize';
import { getClientIp } from '@/lib/security/rate-limit';
import { ZodError } from 'zod';

/**
 * POST /api/public/lead-capture
 *
 * Rate Limited: 3 submissions per hour per IP
 * CAPTCHA Required: Yes
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Extract CAPTCHA token
    const captchaToken = body.captchaToken;
    const clientIp = getClientIp(request);

    // Verify CAPTCHA
    const captchaResult = await verifyCaptchaMiddleware(captchaToken, clientIp);
    if (!captchaResult.success) {
      return NextResponse.json(
        {
          error: 'CAPTCHA verification failed',
          message: captchaResult.error || 'Please complete the CAPTCHA challenge',
        },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validatedData = LeadCaptureSchema.parse(body);

    // Additional sanitization
    const sanitizedData = sanitizeObject(validatedData, {
      allowHtml: false,
      stripWhitespace: true,
    });

    // TODO: Process lead capture (save to database, send notifications, etc.)
    console.log('Lead captured:', {
      ...sanitizedData,
      captchaToken: '[REDACTED]',
      ip: clientIp,
      timestamp: new Date().toISOString(),
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your information has been received. We will contact you shortly.',
        data: {
          email: sanitizedData.email,
          claimType: sanitizedData.claimType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Please check your input and try again',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Lead capture error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while processing your request',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
