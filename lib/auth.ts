import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: string;
  email?: string;
  userType?: 'ADMIN' | 'CONTRACTOR' | 'CLIENT' | 'SUPER_ADMIN';
  type?: 'auth' | 'password-reset' | 'email-verification' | '2fa';
  iat?: number;
  exp?: number;
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    userType: user.userType,
    type: 'auth',
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Minimal NextAuth options export.
 *
 * Some API routes use `getServerSession(authOptions)` but this codebase primarily uses JWT auth.
 * Keeping this export prevents build-time import errors; if you want NextAuth sessions,
 * implement `app/api/auth/[...nextauth]/route.ts` with a real provider setup.
 */
export const authOptions: NextAuthOptions = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
};

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

/**
 * Timing-safe password verification to prevent timing attacks
 * Follows Anthropic security best practices
 */
export async function verifyPasswordSafe(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const bcrypt = require('bcryptjs');
  const crypto = require('crypto');
  
  try {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    await new Promise(resolve => setTimeout(resolve, 5 + crypto.randomInt(10)));
    return result;
  } catch (error) {
    await new Promise(resolve => setTimeout(resolve, 5 + crypto.randomInt(10)));
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = require('bcryptjs');
  return bcrypt.hash(password, 12);
}

export function generateResetToken(userId: string): string {
  return jwt.sign({ userId, type: 'password-reset' } satisfies Partial<JWTPayload>, JWT_SECRET, {
    expiresIn: '1h',
  });
}

export function generateVerificationToken(userId: string): string {
  return jwt.sign({ userId, type: 'email-verification' } satisfies Partial<JWTPayload>, JWT_SECRET, {
    expiresIn: '24h',
  });
}

export function isAdmin(roleOrUserType: string): boolean {
  return roleOrUserType === 'ADMIN' || roleOrUserType === 'SUPER_ADMIN';
}

export function isSuperAdmin(roleOrUserType: string): boolean {
  return roleOrUserType === 'SUPER_ADMIN';
}
