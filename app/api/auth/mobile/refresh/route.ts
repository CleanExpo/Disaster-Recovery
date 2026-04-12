/**
 * POST /api/auth/mobile/refresh
 *
 * Refresh access token using a valid refresh token.
 * Returns a new access token (15 min) without requiring re-authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  generateAccessToken,
  verifyToken,
  UserRole,
  getRolePermissions,
} from '@/lib/jwt-auth';

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

function mapRoleToUserRole(role: string): UserRole {
  switch (role) {
    case 'admin':
    case 'super_admin':
      return UserRole.ADMIN;
    case 'contractor':
      return UserRole.CONTRACTOR;
    default:
      return UserRole.CUSTOMER;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = refreshSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'VALIDATION_ERROR', message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    let payload: Awaited<ReturnType<typeof verifyToken>>;
    try {
      payload = await verifyToken(parsed.data.refreshToken);
    } catch {
      return NextResponse.json(
        { success: false, error: 'INVALID_TOKEN', message: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Verify token is a refresh token
    if ((payload as { type?: string }).type !== 'refresh') {
      return NextResponse.json(
        { success: false, error: 'INVALID_TOKEN', message: 'Not a refresh token' },
        { status: 401 }
      );
    }

    // Fetch current user state from DB (validates account still active)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'USER_NOT_FOUND', message: 'User account not found' },
        { status: 401 }
      );
    }

    const userRole = mapRoleToUserRole(user.role);
    const permissions = getRolePermissions(userRole);

    const accessToken = await generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name ?? '',
      role: userRole,
      permissions,
    });

    return NextResponse.json(
      {
        success: true,
        tokens: {
          access: accessToken,
          expiresIn: 900,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[/api/auth/mobile/refresh] Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_ERROR', message: 'An error occurred during token refresh' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
