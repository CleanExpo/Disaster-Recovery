/**
 * Public API - Claim Submission Endpoint
 *
 * Handles AI-automated claim intake with:
 * - Rate limiting (prevent spam)
 * - CAPTCHA verification
 * - Data validation
 * - Priority calculation
 * - Contractor matching (mock)
 * - Email notifications (mock)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { completeClaimSchema, calculatePriority } from '@/lib/claim-wizard/types';

// Rate limiting storage (in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 claims per hour per IP

// ============================================================================
// Rate Limiting
// ============================================================================

function getRateLimitKey(request: NextRequest): string {
  // Use X-Forwarded-For in production behind proxy
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return `claim_submit_${ip}`;
}

function checkRateLimit(key: string): { allowed: boolean; remainingRequests: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // No record or expired window
  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remainingRequests: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  // Within window
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remainingRequests: 0 };
  }

  // Increment count
  record.count++;
  return { allowed: true, remainingRequests: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// ============================================================================
// CAPTCHA Verification (Mock)
// ============================================================================

async function verifyCaptcha(token: string): Promise<boolean> {
  // In production, verify with hCaptcha or reCAPTCHA API
  // For demo, accept any token that looks valid
  return token.startsWith('captcha_') && token.length > 20;
}

// ============================================================================
// Claim Submission Handler
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many claim submissions. Please try again later.',
          retryAfter: 3600, // seconds
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();

    let validatedData;
    try {
      validatedData = completeClaimSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid claim data',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 3. Verify CAPTCHA
    const captchaValid = await verifyCaptcha(validatedData.captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'CAPTCHA verification failed',
        },
        { status: 400 }
      );
    }

    // 4. Calculate priority
    const priority = calculatePriority({
      step1: validatedData.step1,
      step2: validatedData.step2,
      step3: validatedData.step3,
      currentStep: 3,
      completedSteps: [1, 2, 3],
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    });

    // 5. Generate claim ID
    const claimId = `CLM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // 6. In production, this would:
    // - Save claim to database (Prisma)
    // - Match with contractors using NRPG dispatch algorithm
    // - Send email/SMS to client
    // - Notify contractors via SMS/email
    // - Create incident tracking record

    // Mock contractor matching
    const contractorCount = Math.floor(Math.random() * 3) + 1; // 1-3 contractors
    const estimatedResponseTime = priority === 'critical' ? '15 minutes' : '30 minutes';

    // 7. Mock email notification
    console.log('=== CLAIM SUBMITTED ===');
    console.log('Claim ID:', claimId);
    console.log('Priority:', priority);
    console.log('Client:', validatedData.step2.name, validatedData.step2.email);
    console.log('Location:', validatedData.step2.suburb, validatedData.step2.postcode);
    console.log('Disaster Type:', validatedData.step1.disasterType);
    console.log('Has Insurance:', validatedData.step3.hasInsurance);
    console.log('Contractors Matched:', contractorCount);
    console.log('=======================');

    // 8. Return success response
    return NextResponse.json(
      {
        success: true,
        claimId,
        message: 'Claim submitted successfully',
        estimatedContractorCalls: contractorCount,
        estimatedResponseTime,
        priority,
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remainingRequests.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Claim submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again.',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// OPTIONS Handler (CORS)
// ============================================================================

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
