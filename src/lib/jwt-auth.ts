import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { clientLogger } from '@/lib/observability/client-logger';
import { getSessionFromRequest, type SessionUser } from '@/lib/auth/session';
import type { AppRole } from '@/lib/auth/roles';

const getJwtSecretKey = () => {
  const secret =
    process.env.JWT_SECRET_KEY ||
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV !== 'production' ? 'dev-only-jwt-secret-change-me' : undefined);
  if (!secret) {
    throw new Error('JWT_SECRET_KEY or NEXTAUTH_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
};

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

/**
 * Legacy role strings used by older JWT payloads and hasRole() checks.
 * Prefer AppRole (CLIENT | CONTRACTOR | ADMIN | SUPER_ADMIN) for new code.
 */
export enum UserRole {
  ADMIN = 'admin',
  TECHNICIAN = 'technician',
  CONTRACTOR = 'contractor',
  CUSTOMER = 'customer',
  SUPER_ADMIN = 'super_admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  permissions: string[];
}

export interface TokenPayload {
  id: string;
  userId: string;
  email: string;
  role: UserRole;
  permissions: string[];
  contractorId?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
}

function mapAppRoleToUserRole(role: AppRole): UserRole {
  switch (role) {
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return UserRole.ADMIN;
    case 'CONTRACTOR':
      return UserRole.CONTRACTOR;
    case 'CLIENT':
    default:
      return UserRole.CUSTOMER;
  }
}

function sessionToTokenPayload(session: SessionUser): TokenPayload {
  const role = mapAppRoleToUserRole(session.role);
  const id =
    session.role === 'CONTRACTOR' && session.contractorId
      ? session.contractorId
      : session.userId;
  return {
    id,
    userId: id,
    email: session.email,
    role,
    permissions: getRolePermissions(role),
    contractorId: session.contractorId ?? undefined,
  };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateAccessToken(user: User): Promise<string> {
  return new SignJWT({
    userId: user.id,
    id: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setNotBefore(0)
    .sign(getJwtSecretKey());
}

export async function generateRefreshToken(userId: string): Promise<string> {
  return new SignJWT({ userId, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setNotBefore(0)
    .sign(getJwtSecretKey());
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    const p = payload as Record<string, unknown>;
    const userId = String(p.userId || p.sub || '');
    return {
      id: String(p.id || userId),
      userId,
      email: String(p.email || ''),
      role: p.role as UserRole,
      permissions: (p.permissions as string[]) || [],
      contractorId: p.contractorId ? String(p.contractorId) : undefined,
      exp: p.exp as number | undefined,
      iat: p.iat as number | undefined,
    };
  } catch {
    throw new Error('Invalid or expired token');
  }
}

export function extractTokenFromHeader(request: NextRequest): string | null {
  const authHeader =
    request.headers.get('authorisation') || request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/** Prefer httpOnly cookie session; fall back to Bearer JWT (legacy localStorage). */
export async function verifyAuth(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const session = await getSessionFromRequest(request);
    if (session) {
      return sessionToTokenPayload(session);
    }

    const token = extractTokenFromHeader(request);
    if (!token) return null;

    return await verifyToken(token);
  } catch (error) {
    clientLogger.error('Auth verification error:', { source: 'lib/jwt-auth' }, error);
    return null;
  }
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes('admin:all');
}

export function hasRole(userRole: UserRole | string, allowedRoles: UserRole[]): boolean {
  const normalised = String(userRole).toLowerCase();
  return allowedRoles.some((r) => r === userRole || String(r).toLowerCase() === normalised);
}

export function getRolePermissions(role: UserRole): string[] {
  const permissions: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: [
      'admin:all',
      'users:read',
      'users:write',
      'users:delete',
      'bookings:all',
      'reports:all',
      'settings:all',
    ],
    [UserRole.SUPER_ADMIN]: [
      'admin:all',
      'users:read',
      'users:write',
      'users:delete',
      'bookings:all',
      'reports:all',
      'settings:all',
    ],
    [UserRole.TECHNICIAN]: [
      'bookings:read',
      'bookings:update',
      'reports:read',
      'reports:create',
      'customers:read',
    ],
    [UserRole.CONTRACTOR]: [
      'bookings:read',
      'bookings:create',
      'bookings:update',
      'reports:read',
      'invoices:read',
    ],
    [UserRole.CUSTOMER]: [
      'bookings:read:own',
      'bookings:create:own',
      'invoices:read:own',
      'profile:read:own',
      'profile:update:own',
    ],
  };

  return permissions[role] || [];
}

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters long');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  return { isValid: errors.length === 0, errors };
}

export function generateSecurePassword(): string {
  const length = 16;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|:;<>?,.';
  let password = 'Aa1!';
  for (let i = 4; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
