import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { initializeOnboarding } from '@/lib/services/client-onboarding.service';
import { sendClientWelcomeEmail } from '@/lib/services/client-email.service';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const startOnboardingSchema = z.object({
  flowType: z.enum(['standard', 'fast_track', 'vip']).optional(),
});

/**
 * POST /api/client/onboarding/start
 *
 * Initialize client onboarding process
 * - Creates ClientOnboarding record
 * - Creates ClientProfile if doesn't exist
 * - Creates education modules (if standard/vip flow)
 * - Sends welcome email
 *
 * Returns current phase and resume URL
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CLIENT', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const validated = startOnboardingSchema.parse(body);

    // Create client profile if doesn't exist
    let profile = await prisma.clientProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      profile = await prisma.clientProfile.create({
        data: {
          userId: user.id,
          phoneNumber: null,
          preferredContactMethod: 'email',
          timezone: 'Australia/Sydney',
          language: 'en-AU',
          tier: 'standard',
          isProfileComplete: false,
        },
      });
    }

    // Initialize onboarding
    const result = await initializeOnboarding(user.id, validated.flowType);

    // Send welcome email (non-blocking)
    await sendClientWelcomeEmail({
      clientName: user.name || 'Valued Client',
      clientEmail: user.email,
    }).catch((err) => {
      console.error('Failed to send welcome email:', err);
      // Don't fail the request if email fails
    });

    return NextResponse.json(
      {
        success: true,
        ...result,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
