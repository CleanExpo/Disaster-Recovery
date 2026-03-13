/**
 * Admin role and route constants.
 * Users with these roles can access /admin and admin APIs.
 */
export const ADMIN_ROLES = ['ADMIN', 'MANAGER'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export function isAdminRole(role: string | undefined | null): boolean {
  return !!role && ADMIN_ROLES.includes(role as AdminRole);
}
