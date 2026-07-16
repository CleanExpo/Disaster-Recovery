/**
 * Unified JWT + httpOnly cookie session (ADR path: replace NextAuth for authz).
 * Edge-safe: uses jose only (no Node crypto).
 */

import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import type { AppRole } from './roles';
import { isAdminRole, normaliseRole } from './roles';

export const ACCESS_COOKIE = 'dr_access';
export const REFRESH_COOKIE = 'dr_refresh';

const ACCESS_TTL = '15m';
const REFRESH_TTL_DEFAULT = '7d';
const REFRESH_TTL_REMEMBER = '30d';
const ACCESS_MAX_AGE = 15 * 60; // seconds
const REFRESH_MAX_AGE_DEFAULT = 7 * 24 * 60 * 60;
const REFRESH_MAX_AGE_REMEMBER = 30 * 24 * 60 * 60;

export type SessionUser = {
  userId: string;
  email: string;
  role: AppRole;
  name?: string | null;
  contractorId?: string | null;
};

export type SessionClaims = SessionUser & {
  typ: 'access' | 'refresh';
};

function getSecretKey(): Uint8Array {
  const secret =
    process.env.JWT_SECRET_KEY ||
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV !== 'production' ? 'dev-only-jwt-secret-change-me' : undefined);
  if (!secret) {
    throw new Error('JWT_SECRET_KEY or NEXTAUTH_SECRET must be set');
  }
  return new TextEncoder().encode(secret);
}

function cookieSecure(): boolean {
  return process.env.NODE_ENV === 'production';
}

function baseCookieOptions(maxAge: number) {
  return {
    httpOnly: true as const,
    secure: cookieSecure(),
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

export async function signAccessToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    userId: user.userId,
    email: user.email,
    role: user.role,
    name: user.name ?? undefined,
    contractorId: user.contractorId ?? undefined,
    typ: 'access',
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(user.userId)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .sign(getSecretKey());
}

export async function signRefreshToken(
  user: SessionUser,
  rememberMe = false,
): Promise<string> {
  return new SignJWT({
    userId: user.userId,
    email: user.email,
    role: user.role,
    contractorId: user.contractorId ?? undefined,
    typ: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(user.userId)
    .setIssuedAt()
    .setExpirationTime(rememberMe ? REFRESH_TTL_REMEMBER : REFRESH_TTL_DEFAULT)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const role = normaliseRole(payload.role as string);
    if (!role || !payload.userId || !payload.email) return null;
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      role,
      name: (payload.name as string) || null,
      contractorId: (payload.contractorId as string) || null,
      typ: (payload.typ as 'access' | 'refresh') || 'access',
    };
  } catch {
    return null;
  }
}

export function setAuthCookies(
  res: NextResponse,
  tokens: { access: string; refresh: string },
  rememberMe = false,
): void {
  res.cookies.set(ACCESS_COOKIE, tokens.access, baseCookieOptions(ACCESS_MAX_AGE));
  res.cookies.set(
    REFRESH_COOKIE,
    tokens.refresh,
    baseCookieOptions(rememberMe ? REFRESH_MAX_AGE_REMEMBER : REFRESH_MAX_AGE_DEFAULT),
  );
}

export function clearAuthCookies(res: NextResponse): void {
  res.cookies.set(ACCESS_COOKIE, '', { ...baseCookieOptions(0), maxAge: 0 });
  res.cookies.set(REFRESH_COOKIE, '', { ...baseCookieOptions(0), maxAge: 0 });
}

export async function issueSession(
  user: SessionUser,
  rememberMe = false,
): Promise<{ access: string; refresh: string }> {
  const [access, refresh] = await Promise.all([
    signAccessToken(user),
    signRefreshToken(user, rememberMe),
  ]);
  return { access, refresh };
}

/** Read session from cookies (or Authorization Bearer for API clients). */
export async function getSessionFromRequest(
  request: NextRequest | Request,
): Promise<SessionUser | null> {
  const cookieHeader =
    'cookies' in request && typeof request.cookies?.get === 'function'
      ? request.cookies.get(ACCESS_COOKIE)?.value
      : undefined;

  let token = cookieHeader ?? null;

  if (!token) {
    const auth =
      request.headers.get('authorisation') || request.headers.get('authorization');
    if (auth?.startsWith('Bearer ')) {
      token = auth.slice(7);
    }
  }

  // Also try parsing Cookie header directly (Edge edge-cases)
  if (!token) {
    const raw = request.headers.get('cookie') || '';
    const match = raw.match(new RegExp(`(?:^|;\\s*)${ACCESS_COOKIE}=([^;]*)`));
    if (match?.[1]) token = decodeURIComponent(match[1]);
  }

  if (!token) return null;

  const claims = await verifySessionToken(token);
  if (!claims || claims.typ === 'refresh') return null;

  return {
    userId: claims.userId,
    email: claims.email,
    role: claims.role,
    name: claims.name,
    contractorId: claims.contractorId,
  };
}

export async function requireSession(
  request: NextRequest | Request,
): Promise<SessionUser | NextResponse> {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }
  return session;
}

export async function requireRole(
  request: NextRequest | Request,
  allowed: AppRole[],
): Promise<SessionUser | NextResponse> {
  const sessionOrErr = await requireSession(request);
  if (sessionOrErr instanceof NextResponse) return sessionOrErr;
  if (!allowed.includes(sessionOrErr.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return sessionOrErr;
}

export async function requireAdminSession(
  request: NextRequest | Request,
): Promise<SessionUser | NextResponse> {
  const sessionOrErr = await requireSession(request);
  if (sessionOrErr instanceof NextResponse) return sessionOrErr;
  if (!isAdminRole(sessionOrErr.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return sessionOrErr;
}

/** Cookie value for Edge middleware (NextRequest). */
export function getAccessTokenFromNextRequest(request: NextRequest): string | null {
  return request.cookies.get(ACCESS_COOKIE)?.value ?? null;
}

/**
 * Server Component / Route Handler helper — read session from next/headers cookies.
 * Prefer getSessionFromRequest when you already have a NextRequest.
 */
export async function getSessionFromCookies(): Promise<SessionUser | null> {
  try {
    const { cookies } = await import('next/headers');
    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;
    if (!token) return null;
    const claims = await verifySessionToken(token);
    if (!claims || claims.typ === 'refresh') return null;
    return {
      userId: claims.userId,
      email: claims.email,
      role: claims.role,
      name: claims.name,
      contractorId: claims.contractorId,
    };
  } catch {
    return null;
  }
}
