/**
 * Unit tests for src/lib/admin-constants.ts
 *
 * `isAdminRole` is the gate function used by every admin-portal route.
 */

import { describe, it, expect } from 'vitest';
import { ADMIN_ROLES, isAdminRole } from '../admin-constants';

describe('ADMIN_ROLES', () => {
  it('includes the canonical "admin" + "super_admin" roles', () => {
    expect(ADMIN_ROLES).toContain('admin');
    expect(ADMIN_ROLES).toContain('super_admin');
    expect(ADMIN_ROLES).toContain('SUPER_ADMIN');
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

  it('returns true for "super_admin" and SUPER_ADMIN', () => {
    expect(isAdminRole('super_admin')).toBe(true);
    expect(isAdminRole('SUPER_ADMIN')).toBe(true);
  });

  it('returns true for legacy "ADMIN" + "MANAGER"', () => {
    expect(isAdminRole('ADMIN')).toBe(true);
    expect(isAdminRole('MANAGER')).toBe(true);
  });

  it('returns false for non-admin roles', () => {
    expect(isAdminRole('user')).toBe(false);
    expect(isAdminRole('contractor')).toBe(false);
    expect(isAdminRole('CLIENT')).toBe(false);
  });

  it('returns false for undefined / null / empty', () => {
    expect(isAdminRole(undefined)).toBe(false);
    expect(isAdminRole(null)).toBe(false);
    expect(isAdminRole('')).toBe(false);
  });

  it('normalises mixed-case Admin via normaliseRole', () => {
    expect(isAdminRole('Admin')).toBe(true);
  });
});
