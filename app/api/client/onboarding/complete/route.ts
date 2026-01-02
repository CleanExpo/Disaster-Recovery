import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { completeOnboarding } from '@/lib/services/client-onboarding.service';
import { sendOnboardingCompleteEmail } from '@/lib/services/client-email.service';
import { completeOnboardingSchema } from '@/lib/validations/client-onboarding';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * POST /api/client/onboarding/complete
 *
 * Complete client onboarding with actions:
 * - Award "Prepared Client" badge
 * - Generate completion certificate
 * - Send welcome package email
 * - Optionally create first service request
 * - Optionally start dashboard tour
 * - Optionally invite co-owner
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

    // Parse and validate request
    const body = await request.json();
    const validated = completeOnboardingSchema.parse(body);

    // Complete onboarding
    const result = await completeOnboarding(validated.clientId, {
      awardBadge: true,
      generateCertificate: true,
      sendWelcomeEmail: false, // We'll send custom email below
    });

    // Get completion stats for email
    const onboarding = await prisma.clientOnboarding.findUnique({
      where: { clientId: validated.clientId },
      include: {
        moduleProgress: true,
      },
    });

    const completionTimeHours = onboarding?.startDate && onboarding?.actualCompletionDate
      ? (onboarding.actualCompletionDate.getTime() - onboarding.startDate.getTime()) / (1000 * 60 * 60)
      : 0;

    const modulesCompleted = onboarding?.moduleProgress.filter((m) => m.completed).length || 0;

    // Send welcome package email (non-blocking)
    await sendOnboardingCompleteEmail({
      clientName: user.name || 'Valued Client',
      clientEmail: user.email,
      certificateUrl: result.certificateUrl,
      completionTimeHours,
      modulesCompleted,
    }).catch((err) => {
      console.error('Failed to send completion email:', err);
    });

    // Handle optional actions
    let firstRequestId: string | undefined;

    if (validated.autoCreateRequest && validated.requestData) {
      // Create first service request with pre-filled data
      const property = await prisma.clientProperty.findFirst({
        where: {
          clientProfile: { userId: validated.clientId },
          id: validated.requestData.propertyId,
        },
      });

      if (property) {
        const serviceRequest = await prisma.serviceRequest.create({
          data: {
            userId: validated.clientId,
            serviceCategory: validated.requestData.serviceType,
            serviceTitle: `${validated.requestData.serviceType} - ${property.suburb}`,
            urgency: validated.requestData.urgency,
            description: validated.requestData.description,
            location: `${property.suburb}, ${property.state}`,
            phone: user.email, // Will be updated from profile
            status: 'PENDING',
            insurance: false, // Will be updated if insurance exists
          },
        });

        firstRequestId = serviceRequest.id;

        // Mark first request created
        await prisma.clientOnboarding.update({
          where: { clientId: validated.clientId },
          data: { firstRequestCreated: true },
        });
      }
    }

    // Mark tour completed if requested
    if (validated.startTour) {
      await prisma.clientOnboarding.update({
        where: { clientId: validated.clientId },
        data: { tourCompleted: false }, // Will be marked true when tour actually completes
      });
    }

    return NextResponse.json({
      success: true,
      certificateUrl: result.certificateUrl,
      badgeAwarded: result.badgeAwarded,
      firstRequestId,
      nextSteps: {
        tourUrl: validated.startTour ? '/dashboard/client?tour=start' : undefined,
        requestUrl: firstRequestId ? `/dashboard/client/requests/${firstRequestId}` : undefined,
        dashboardUrl: '/dashboard/client',
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
