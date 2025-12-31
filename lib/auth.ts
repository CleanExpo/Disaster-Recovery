import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV === 'test' ? 'test-only-jwt-secret' : undefined);

function requireJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET (or NEXTAUTH_SECRET fallback)');
  }
  return JWT_SECRET;
}

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

  return jwt.sign(payload, requireJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, requireJwtSecret()) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * NextAuth options export.
 *
 * This enables cookie-based sessions (`getServerSession(authOptions)`) across App Router API routes.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? '';

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        const hashedPassword = user?.password || '$2a$10$dummyhashtopreventtimingleak';
        const isValidPassword = await verifyPasswordSafe(password, hashedPassword);

        if (!user || !user.password || !isValidPassword) {
          return null;
        }

        if (!user.isActive || user.isBlocked) {
          return null;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType,
          avatar: user.avatar,
        } as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.userType = (user as any).userType;
        token.role = (user as any).userType;
        token.avatar = (user as any).avatar ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).userType = (token as any).userType;
        (session.user as any).role = (token as any).userType;
        (session.user as any).avatar = (token as any).avatar ?? null;
      }
      return session;
    },
  },
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
  return jwt.sign({ userId, type: 'password-reset' } satisfies Partial<JWTPayload>, requireJwtSecret(), {
    expiresIn: '1h',
  });
}

export function generateVerificationToken(userId: string): string {
  return jwt.sign({ userId, type: 'email-verification' } satisfies Partial<JWTPayload>, requireJwtSecret(), {
    expiresIn: '24h',
  });
}

export function isAdmin(roleOrUserType: string): boolean {
  return roleOrUserType === 'ADMIN' || roleOrUserType === 'SUPER_ADMIN';
}

export function isSuperAdmin(roleOrUserType: string): boolean {
  return roleOrUserType === 'SUPER_ADMIN';
}
