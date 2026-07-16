/**
 * Canonical app roles — aligned with prisma UserType.
 * Legacy strings are normalised via normaliseRole().
 */

export type AppRole = 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN';

const ADMIN_SET = new Set<string>([
  'ADMIN',
  'SUPER_ADMIN',
  'admin',
  'super_admin',
  'MANAGER', // legacy
]);

/**
 * Map any legacy / mixed-case role string to AppRole.
 */
export function normaliseRole(role: string | undefined | null): AppRole | null {
  if (!role) return null;
  const r = role.trim();
  const upper = r.toUpperCase().replace(/-/g, '_');

  if (upper === 'SUPER_ADMIN' || r === 'super_admin') return 'SUPER_ADMIN';
  if (upper === 'ADMIN' || r === 'admin' || upper === 'MANAGER') return 'ADMIN';
  if (upper === 'CONTRACTOR' || r === 'contractor') return 'CONTRACTOR';
  if (
    upper === 'CLIENT' ||
    upper === 'CUSTOMER' ||
    r === 'client' ||
    r === 'customer' ||
    r === 'user'
  ) {
    return 'CLIENT';
  }
  return null;
}

export function isAdminRole(role: string | undefined | null): boolean {
  if (!role) return false;
  if (ADMIN_SET.has(role)) return true;
  const n = normaliseRole(role);
  return n === 'ADMIN' || n === 'SUPER_ADMIN';
}

export function isContractorRole(role: string | undefined | null): boolean {
  return normaliseRole(role) === 'CONTRACTOR';
}

export function isClientRole(role: string | undefined | null): boolean {
  return normaliseRole(role) === 'CLIENT';
}

/** Post-login destination by role */
export function dashboardPathForRole(role: AppRole): string {
  switch (role) {
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return '/admin';
    case 'CONTRACTOR':
      return '/contractor/portal';
    case 'CLIENT':
    default:
      return '/account';
  }
}
