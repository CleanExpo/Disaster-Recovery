import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * The set of roles that can be present on a session user.
 * Matches the values stored in the User.role column (see admin-constants.ts
 * for the full admin-role list and the prisma schema for the DB enum).
 */
export type SessionRole =
  | 'admin'
  | 'super_admin'
  | 'contractor'
  | 'client'
  | 'user'
  | 'public';

export interface CallerIdentity {
  /** Role derived from the validated server session, or 'public' when unauthenticated. */
  role: SessionRole;
  /** The authenticated user's DB id, or null when unauthenticated. */
  userId: string | null;
  /** The authenticated user's email, or null when unauthenticated. */
  email: string | null;
}

/**
 * Resolves the caller's identity from the NextAuth server session.
 *
 * This replaces the trivially-forgeable x-caller-role / x-caller-id request
 * headers that were used as a placeholder (DR-521). The JWT is validated
 * server-side by next-auth — callers cannot forge their role.
 *
 * Usage in a Route Handler:
 *   const { role, userId } = await getCallerIdentity();
 *   const canRead = role === 'admin' || role === 'contractor';
 */
export async function getCallerIdentity(): Promise<CallerIdentity> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { role: 'public', userId: null, email: null };
  }

  // session.user.role is typed as string via next-auth.d.ts augmentation.
  // Cast to SessionRole after narrowing — the value is written by our own
  // JWT callback so the set of possible strings is known and controlled.
  const rawRole = (session.user.role ?? 'user') as SessionRole;

  return {
    role: rawRole,
    userId: session.user.id ?? null,
    email: session.user.email ?? null,
  };
}
