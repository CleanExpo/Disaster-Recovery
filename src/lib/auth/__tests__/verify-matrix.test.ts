import { describe, it, expect } from 'vitest';
import { dashboardPathForRole, isAdminRole, normaliseRole } from '../roles';

/**
 * Manual verify matrix (automated):
 * each production role → dashboard path → admin gate expectation
 */
describe('auth role verify matrix', () => {
  const cases = [
    { role: 'CLIENT', path: '/account', admin: false },
    { role: 'CONTRACTOR', path: '/contractor/portal', admin: false },
    { role: 'ADMIN', path: '/admin', admin: true },
    { role: 'SUPER_ADMIN', path: '/admin', admin: true },
  ] as const;

  it.each(cases)('$role lands on $path (admin=$admin)', ({ role, path, admin }) => {
    const normalised = normaliseRole(role);
    expect(normalised).toBe(role);
    expect(dashboardPathForRole(normalised!)).toBe(path);
    expect(isAdminRole(role)).toBe(admin);
  });

  it('legacy seeds are not locked out of admin', () => {
    expect(isAdminRole('super_admin')).toBe(true);
    expect(isAdminRole('ADMIN')).toBe(true);
  });
});
