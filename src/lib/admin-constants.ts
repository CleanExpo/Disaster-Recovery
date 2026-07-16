/**
 * Admin role and route constants.
 * Users with these roles can access /admin and admin APIs.
 *
 * Canonical Prisma UserType: ADMIN | SUPER_ADMIN
 * Legacy strings still accepted via normaliseRole / isAdminRole.
 */

import { isAdminRole as isAdminRoleCanonical } from '@/lib/auth/roles';

export const ADMIN_ROLES = [
  'admin',
  'super_admin',
  'ADMIN',
  'SUPER_ADMIN',
  // Legacy values — kept for backwards compatibility
  'MANAGER',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

/** Gate for /admin and admin APIs — accepts enum + legacy forms including SUPER_ADMIN. */
export function isAdminRole(role: string | undefined | null): boolean {
  return isAdminRoleCanonical(role);
}
