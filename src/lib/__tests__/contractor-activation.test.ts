import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createContractorActivationToken,
  verifyContractorActivationToken,
} from '../contractor-activation';

const SECRET = 'test-secret-with-more-than-sixteen-chars';

describe('contractor activation tokens', () => {
  beforeEach(() => {
    process.env.CONTRACTOR_ACTIVATION_SECRET = SECRET;
    vi.useRealTimers();
  });

  afterEach(() => {
    delete process.env.CONTRACTOR_ACTIVATION_SECRET;
    vi.useRealTimers();
  });

  it('round-trips a signed contractor activation token', () => {
    const token = createContractorActivationToken(
      'contractor_123',
      new Date('2026-06-18T00:00:00Z'),
    );
    const payload = verifyContractorActivationToken(token);

    expect(payload.contractorId).toBe('contractor_123');
    expect(payload.purpose).toBe('contractor_activation');
    expect(payload.exp).toBe(new Date('2026-06-25T00:00:00Z').getTime());
  });

  it('rejects tampered tokens', () => {
    const token = createContractorActivationToken('contractor_123');
    const [payload] = token.split('.');
    const tampered = `${payload}.bad-signature`;

    expect(() => verifyContractorActivationToken(tampered)).toThrow('Invalid activation token');
  });

  it('rejects expired tokens', () => {
    const token = createContractorActivationToken(
      'contractor_123',
      new Date('2026-06-18T00:00:00Z'),
    );
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-26T00:00:00Z'));

    expect(() => verifyContractorActivationToken(token)).toThrow('Activation token expired');
  });
});
