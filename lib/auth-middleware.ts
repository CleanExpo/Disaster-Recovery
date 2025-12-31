import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { verifyToken, JWTPayload } from '@/lib/auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { ErrorCode } from '@/lib/api-errors';

export interface AuthContext {
  user: User;
  decoded: JWTPayload;
}

export interface AuthenticateRequestOptions {
  /**
   * Legacy fallback for non-browser clients that still send `Authorization: Bearer ...`.
   *
   * Default: `false` (cookie-based NextAuth session only).
   */
  allowBearerToken?: boolean;
}

/**
 * Centralized authentication middleware following Anthropic best practices
 * Extracts and verifies JWT token, fetches user from database
 */
export async function authenticateRequest(
  request: NextRequest,
  options: AuthenticateRequestOptions = {}
): Promise<{ success: true; context: AuthContext } | { success: false; response: NextResponse }> {
  // Prefer NextAuth cookie-based sessions when available.
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as unknown as { id?: string; email?: string | null } | undefined;

    const sessionUserId = sessionUser?.id;
    const sessionUserEmail = sessionUser?.email?.toLowerCase().trim();

    if (sessionUserId || sessionUserEmail) {
      const user = await prisma.user.findUnique({
        where: sessionUserId ? { id: sessionUserId } : { email: sessionUserEmail! },
      });

      if (user) {
        return {
          success: true,
          context: {
            user,
            decoded: {
              userId: user.id,
              email: user.email,
              userType: user.userType,
              type: 'auth',
            },
          },
        };
      }
    }
  } catch {
    // Ignore session errors and fall back to Bearer token auth when enabled.
  }

  if (!options.allowBearerToken) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.UNAUTHORIZED,
          message: 'Authentication required',
        },
        { status: 401 }
      ),
    };
  }

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
  allowedRoles: Array<'ADMIN' | 'CONTRACTOR' | 'CLIENT' | 'SUPER_ADMIN'>
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
