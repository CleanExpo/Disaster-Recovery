/**
 * Unit tests for src/lib/admin-constants.ts
 *
 * `isAdminRole` is the gate function used by every admin-portal route.
 * A regression here either locks legitimate admins out (false) or
 * lets non-admins in (false-positive). Pin tightly.
 */

import { describe, it, expect } from 'vitest';
import { ADMIN_ROLES, isAdminRole } from '../admin-constants';

describe('ADMIN_ROLES', () => {
  it('includes the canonical "admin" + "super_admin" roles', () => {
    expect(ADMIN_ROLES).toContain('admin');
    expect(ADMIN_ROLES).toContain('super_admin');
  });

  it('retains the legacy uppercase ADMIN + MANAGER values', () => {
    expect(ADMIN_ROLES).toContain('ADMIN');
    expect(ADMIN_ROLES).toContain('MANAGER');
  });
});

describe('isAdminRole', () => {
  it('returns true for "admin"', () => {
    expect(isAdminRole('admin')).toBe(true);
  });

  it('returns true for "super_admin"', () => {
    expect(isAdminRole('super_admin')).toBe(true);
  });

  it('returns true for legacy "ADMIN" + "MANAGER"', () => {
    expect(isAdminRole('ADMIN')).toBe(true);
    expect(isAdminRole('MANAGER')).toBe(true);
  });

  it('returns false for non-admin roles', () => {
    expect(isAdminRole('user')).toBe(false);
    expect(isAdminRole('contractor')).toBe(false);
  });

  it('returns false for undefined / null / empty', () => {
    expect(isAdminRole(undefined)).toBe(false);
    expect(isAdminRole(null)).toBe(false);
    expect(isAdminRole('')).toBe(false);
  });

  it('does NOT do case-insensitive matching (case-sensitive by design)', () => {
    // "Admin" is neither "admin" nor "ADMIN" — must match exactly.
    expect(isAdminRole('Admin')).toBe(false);
  });
});
