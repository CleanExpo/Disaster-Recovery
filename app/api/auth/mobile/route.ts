/**
 * POST /api/auth/mobile
 *
 * Mobile authentication endpoint — returns access + refresh JWT tokens
 * for React Native clients (stored in expo-secure-store, not cookies).
 *
 * Access token: 15 minutes (short-lived, refreshed automatically)
 * Refresh token: 7 days (stored in SecureStore, used to obtain new access tokens)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
  UserRole,
  getRolePermissions,
} from '@/lib/jwt-auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  deviceId: z.string().optional(),
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

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          errors: parsed.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const normalisedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalisedEmail },
    });

    // Constant-time rejection — do not reveal whether email exists
    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, error: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { success: false, error: 'INVALID_CREDENTIALS', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const userRole = mapRoleToUserRole(user.role);
    const permissions = getRolePermissions(userRole);

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name ?? '',
      role: userRole,
      permissions,
    };

    const [accessToken, refreshToken] = await Promise.all([
      generateAccessToken(userPayload),
      generateRefreshToken(user.id),
    ]);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: userRole,
        },
        tokens: {
          access: accessToken,
          refresh: refreshToken,
          expiresIn: 900, // 15 minutes in seconds
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[/api/auth/mobile] Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_ERROR', message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
