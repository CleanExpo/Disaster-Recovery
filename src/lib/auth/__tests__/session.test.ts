import { describe, it, expect } from 'vitest';
import { issueSession, verifySessionToken } from '../session';

describe('cookie session tokens', () => {
  it('issues and verifies an access token with role + optional contractorId', async () => {
    process.env.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test-secret-for-vitest';

    const tokens = await issueSession({
      userId: 'user-1',
      email: 'c@example.com',
      role: 'CONTRACTOR',
      name: 'Test Co',
      contractorId: 'ctr-9',
    });

    const claims = await verifySessionToken(tokens.access);
    expect(claims).not.toBeNull();
    expect(claims?.userId).toBe('user-1');
    expect(claims?.role).toBe('CONTRACTOR');
    expect(claims?.contractorId).toBe('ctr-9');
    expect(claims?.typ).toBe('access');

    const refresh = await verifySessionToken(tokens.refresh);
    expect(refresh?.typ).toBe('refresh');
  });
});
