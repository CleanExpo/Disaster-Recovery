/**
 * Admin role and route constants.
 * Users with these roles can access /admin and admin APIs.
 *
 * Supported role values (stored as String in DB):
 *   "user"        — default, no admin access
 *   "contractor"  — no admin access
 *   "admin"       — admin panel access
 *   "super_admin" — admin panel access + elevated privileges
 *
 * Legacy values seeded before RBAC (still honoured):
 *   "ADMIN"   | "MANAGER"
 */
export const ADMIN_ROLES = [
  'admin',
  'super_admin',
  // Legacy values — kept for backwards compatibility
  'ADMIN',
  'MANAGER',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export function isAdminRole(role: string | undefined | null): boolean {
  return !!role && ADMIN_ROLES.includes(role as AdminRole);
}
