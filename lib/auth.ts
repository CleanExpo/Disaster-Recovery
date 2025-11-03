import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  userType: 'ADMIN' | 'CONTRACTOR' | 'CLIENT';
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    userType: user.userType,
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
