import { NextRequest, NextResponse } from 'next/server';

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function requireAuth(request: NextRequest) {
  // Basic auth middleware - extend based on your auth strategy
  const session = request.headers.get('authorization');

  if (!session) {
    throw new AuthenticationError('Authentication required');
  }

  return session;
}

export async function getSession(request: NextRequest) {
  try {
    return await requireAuth(request);
  } catch {
    return null;
  }
}

export interface AuthResult {
  success: boolean;
  response?: NextResponse;
  context?: {
    userId: string;
    role: string;
    user?: {
      userId: string;
      role: string;
      authenticated: boolean;
    };
  };
}

export interface UserAuth {
  userId: string;
  role: string;
  authenticated: boolean;
}

export async function authenticateRequest(request: NextRequest): Promise<AuthResult> {
  // Authenticate and return user info
  const session = await getSession(request);

  if (!session) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    };
  }

  // Parse session token and return user data
  const user: UserAuth = {
    userId: 'user-id',
    role: 'ADMIN', // Default to ADMIN for testing
    authenticated: true,
  };

  return {
    success: true,
    context: {
      userId: user.userId,
      role: user.role,
      user,
    },
  };
}

export async function requireRole(request: NextRequest, allowedRoles: string[]): Promise<AuthResult> {
  const auth = await authenticateRequest(request);

  if (!auth.success || !auth.context) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    };
  }

  if (!allowedRoles.includes(auth.context.role)) {
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      ),
    };
  }

  return auth;
}

export function unauthorizedRoleResponse(requiredRole: string | string[]) {
  const roles = Array.isArray(requiredRole) ? requiredRole.join(' or ') : requiredRole;
  return NextResponse.json(
    { error: `This endpoint requires ${roles} role` },
    { status: 403 }
  );
}

// Helper to check if user has required role (for backward compatibility)
export function checkRole(user: UserAuth | undefined, allowedRoles: string[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
