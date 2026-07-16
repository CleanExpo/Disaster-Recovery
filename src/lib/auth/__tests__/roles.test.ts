import { describe, it, expect } from 'vitest';
import {
  normaliseRole,
  isAdminRole,
  isContractorRole,
  isClientRole,
  dashboardPathForRole,
} from '../roles';

describe('normaliseRole', () => {
  it('maps prisma enums', () => {
    expect(normaliseRole('CLIENT')).toBe('CLIENT');
    expect(normaliseRole('CONTRACTOR')).toBe('CONTRACTOR');
    expect(normaliseRole('ADMIN')).toBe('ADMIN');
    expect(normaliseRole('SUPER_ADMIN')).toBe('SUPER_ADMIN');
  });

  it('maps legacy forms', () => {
    expect(normaliseRole('admin')).toBe('ADMIN');
    expect(normaliseRole('super_admin')).toBe('SUPER_ADMIN');
    expect(normaliseRole('contractor')).toBe('CONTRACTOR');
    expect(normaliseRole('customer')).toBe('CLIENT');
  });
});

describe('role helpers', () => {
  it('detects admin including SUPER_ADMIN', () => {
    expect(isAdminRole('SUPER_ADMIN')).toBe(true);
    expect(isAdminRole('ADMIN')).toBe(true);
    expect(isContractorRole('CONTRACTOR')).toBe(true);
    expect(isClientRole('CLIENT')).toBe(true);
  });

  it('dashboard paths', () => {
    expect(dashboardPathForRole('ADMIN')).toBe('/admin');
    expect(dashboardPathForRole('SUPER_ADMIN')).toBe('/admin');
    expect(dashboardPathForRole('CONTRACTOR')).toBe('/contractor/portal');
    expect(dashboardPathForRole('CLIENT')).toBe('/account');
  });
});
