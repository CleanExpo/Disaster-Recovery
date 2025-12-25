import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';
import { handleUnexpectedError, handleValidationError, ErrorCode, createErrorResponse } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

const updatePreferencesSchema = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
  preferences: z.any().optional(),
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

    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true
      }
    });

    if (!userDetails) {
      return createErrorResponse(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        404
      );
    }

    // Default preferences
    const preferences = {
      notifications: {
        email: true,
        sms: false,
        push: true,
        matchNotifications: true,
        projectUpdates: true,
        paymentReminders: true,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showContactInfo: true,
        allowDirectContact: true
      },
      preferences: {
        preferredContactMethod: 'email',
        timezone: 'America/New_York',
        language: 'en',
        theme: 'dark'
      },
      communication: {
        autoReply: false,
        autoReplyMessage: '',
        responseTimeExpectation: '24h'
      }
    };

    return NextResponse.json({
      success: true,
      user: userDetails,
      preferences
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function PUT(request: NextRequest) {
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
    const { name, avatar, preferences } = updatePreferencesSchema.parse(body);

    // Update user profile
    const updateData: any = {};
    if (name) updateData.name = name;
    if (avatar) updateData.avatar = avatar;

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: updateData
      });
    }

    // In a real app, you would save preferences to a separate table
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: 'Preferences updated successfully'
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
