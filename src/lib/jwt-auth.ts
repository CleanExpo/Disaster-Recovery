import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

// Secret key for JWT signing (in production, use environment variable)
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY || 'disaster-recovery-australia-secret-key-2024';
  return new TextEncoder().encode(secret);
};

// Token expiry times
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

// User roles and permissions
export enum UserRole {
  ADMIN = 'admin',
  TECHNICIAN = 'technician',
  CONTRACTOR = 'contractor',
  CUSTOMER = 'customer',
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
  userId: string;
  email: string;
  role: UserRole;
  permissions: string[];
  exp?: number;
  iat?: number;
  nbf?: number;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT access token
 */
export async function generateAccessToken(user: User): Promise<string> {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setNotBefore(0)
    .sign(getJwtSecretKey());
  
  return token;
}

/**
 * Generate a JWT refresh token
 */
export async function generateRefreshToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setNotBefore(0)
    .sign(getJwtSecretKey());
  
  return token;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Extract token from Authorisation header
 */
export function extractTokenFromHeader(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorisation');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Middleware to verify authentication
 */
export async function verifyAuth(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const token = extractTokenFromHeader(request);
    if (!token) {
      return null;
    }
    
    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

/**
 * Check if user has required permission
 */
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes('admin:all');
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Get role-based permissions
 */
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

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|:;<>?,.';
  let password = '';
  
  // Ensure at least one of each required character type
  password += 'A'; // Uppercase
  password += 'a'; // Lowercase
  password += '1'; // Number
  password += '!'; // Special character
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}