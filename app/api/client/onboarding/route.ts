import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, ErrorCode, createErrorResponse } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

const onboardingStepSchema = z.object({
  step: z.enum(['profile', 'preferences', 'complete']),
  data: z.any().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    const userWithRequests = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        serviceRequests: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!userWithRequests) {
      return createErrorResponse(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        404
      );
    }

    // Check onboarding status
    const hasSubmittedRequest = userWithRequests.serviceRequests.length > 0;
    const isOnboarded = hasSubmittedRequest;

    const onboardingSteps = [
      {
        id: 'welcome',
        title: 'Welcome to Restoration Marketplace',
        description: 'Get started by exploring our platform features',
        completed: true,
        icon: '👋'
      },
      {
        id: 'profile',
        title: 'Complete Your Profile',
        description: 'Add your contact information and preferences',
        completed: !!userWithRequests.name,
        icon: '👤'
      },
      {
        id: 'first_request',
        title: 'Submit Your First Request',
        description: 'Create a service request to get matched with contractors',
        completed: hasSubmittedRequest,
        icon: '📝'
      },
      {
        id: 'explore',
        title: 'Explore Services',
        description: 'Browse available services and contractor profiles',
        completed: false,
        icon: '🔍'
      }
    ];

    const progress = onboardingSteps.filter(step => step.completed).length;
    const totalSteps = onboardingSteps.length;
    const progressPercentage = (progress / totalSteps) * 100;

    return NextResponse.json({
      success: true,
      onboarding: {
        isOnboarded,
        progress,
        totalSteps,
        progressPercentage,
        steps: onboardingSteps,
        nextStep: onboardingSteps.find(step => !step.completed)
      }
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    const body = await request.json();
    const { step, data } = onboardingStepSchema.parse(body);

    // Handle different onboarding steps
    switch (step) {
      case 'profile':
        await prisma.user.update({
          where: { id: user.id },
          data: {
            name: data.name,
            avatar: data.avatar
          }
        });
        break;
      
      case 'preferences':
        // In a real app, you would save preferences to a separate table
        break;
      
      case 'complete':
        // Mark onboarding as complete
        break;
    }

    return NextResponse.json({
      success: true,
      message: 'Onboarding step completed'
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
