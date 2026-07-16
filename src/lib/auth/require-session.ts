import { getSessionFromCookies } from '@/lib/auth/session';
import { normaliseRole } from '@/lib/auth/roles';

/**
 * Roles present on a session user (legacy lowercase + AppRole enums).
 */
export type SessionRole =
  | 'admin'
  | 'super_admin'
  | 'contractor'
  | 'client'
  | 'user'
  | 'public'
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'CONTRACTOR'
  | 'CLIENT';

export interface CallerIdentity {
  role: SessionRole;
  userId: string | null;
  email: string | null;
}

/**
 * Resolves the caller's identity from the jose cookie session.
 */
export async function getCallerIdentity(): Promise<CallerIdentity> {
  const session = await getSessionFromCookies();

  if (!session) {
    return { role: 'public', userId: null, email: null };
  }

  const appRole = normaliseRole(session.role) ?? 'CLIENT';
  const legacyMap: Record<string, SessionRole> = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    CONTRACTOR: 'contractor',
    CLIENT: 'client',
  };

  return {
    role: legacyMap[appRole] ?? 'user',
    userId: session.userId,
    email: session.email,
  };
}
