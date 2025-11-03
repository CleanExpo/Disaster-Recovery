import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { ApiError, ErrorCode } from '@/lib/api-errors';

export interface AuthContext {
  user: User;
  decoded: JWTPayload;
}

/**
 * Centralized authentication middleware following Anthropic best practices
 * Extracts and verifies JWT token, fetches user from database
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<{ success: true; context: AuthContext } | { success: false; response: NextResponse }> {
  // Extract token
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.UNAUTHORIZED,
          message: 'Missing or invalid authorization header'
        },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.substring(7);

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.INVALID_TOKEN,
          message: 'Invalid or expired token'
        },
        { status: 401 }
      ),
    };
  }

  // Fetch user
  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return {
        success: false,
        response: NextResponse.json(
          {
            error: ErrorCode.USER_NOT_FOUND,
            message: 'User not found'
          },
          { status: 404 }
        ),
      };
    }

    return {
      success: true,
      context: { user, decoded },
    };
  } catch (error) {
    console.error('[AUTH_MIDDLEWARE] Database error:', error);
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.DATABASE_ERROR,
          message: 'Database connection failed'
        },
        { status: 500 }
      ),
    };
  }
}

/**
 * Role-based authorization check
 */
export function requireRole(
  user: User,
  allowedRoles: Array<'ADMIN' | 'CONTRACTOR' | 'CLIENT'>
): boolean {
  return allowedRoles.includes(user.userType);
}

/**
 * Creates unauthorized response for role mismatch
 */
export function unauthorizedRoleResponse(requiredRoles: string[]): NextResponse {
  return NextResponse.json(
    {
      error: ErrorCode.FORBIDDEN,
      message: `Access denied. Required roles: ${requiredRoles.join(', ')}`,
    },
    { status: 403 }
  );
}
