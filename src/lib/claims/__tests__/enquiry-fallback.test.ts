/**
 * Unit tests for src/lib/claims/enquiry-fallback.ts
 *
 * D4 Path 1 — write public claim submissions to Enquiry instead of
 * letting them fall through to the read-only /tmp filesystem fallback.
 */

import { describe, it, expect, vi } from 'vitest';
import {
  summariseClaimForEnquiry,
  writeEnquiryFromClaimBody,
  type ClaimBodyShape,
} from '../enquiry-fallback';

describe('summariseClaimForEnquiry', () => {
  it('formats urgency + damageTypes + location', () => {
    const summary = summariseClaimForEnquiry({
      fullName: 'Jane Citizen',
      email: 'jane@example.com',
      propertyAddress: '12 Example St',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      damageDescription: 'Burst pipe in bathroom',
      damageTypes: ['water', 'mould'],
      urgencyLevel: 'urgent',
    });
    expect(summary).toContain('[public-claim-submit]');
    expect(summary).toContain('urgent');
    expect(summary).toContain('water, mould');
    expect(summary).toContain('Brisbane QLD 4000');
    expect(summary).toContain('Burst pipe in bathroom');
  });

  it('falls back to "unspecified" when damageTypes is empty', () => {
    const summary = summariseClaimForEnquiry({
      fullName: 'X',
      email: 'x@example.com',
      propertyAddress: '1 Y St',
      damageDescription: 'desc',
      damageTypes: [],
    });
    expect(summary).toContain('unspecified');
  });

  it('falls back to propertyAddress when suburb/state/postcode are empty', () => {
    const summary = summariseClaimForEnquiry({
      fullName: 'X',
      email: 'x@example.com',
      propertyAddress: '99 Fallback Rd, Cooktown',
      damageDescription: 'desc',
    });
    expect(summary).toContain('99 Fallback Rd, Cooktown');
  });
});

describe('writeEnquiryFromClaimBody', () => {
  const body: ClaimBodyShape = {
    fullName: 'Jane Citizen',
    email: 'jane@example.com',
    phone: '0400 123 456',
    propertyAddress: '12 Example St',
    suburb: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    damageDescription: 'Burst pipe in bathroom',
    damageTypes: ['water'],
    urgencyLevel: 'urgent',
    insuranceCompany: 'Suncorp',
    policyNumber: 'POL-12345',
  };

  it('writes a single Enquiry row with the correct top-level fields', async () => {
    const create = vi.fn().mockResolvedValue({
      id: 'enq-abc',
      createdAt: new Date('2026-05-01T10:00:00Z'),
    });
    const prisma = { enquiry: { create } } as any;

    const result = await writeEnquiryFromClaimBody(prisma, body);

    expect(result.enquiryId).toBe('enq-abc');
    expect(result.writtenAt).toBe('2026-05-01T10:00:00.000Z');

    expect(create).toHaveBeenCalledTimes(1);
    const call = create.mock.calls[0][0];
    expect(call.data.name).toBe('Jane Citizen');
    expect(call.data.email).toBe('jane@example.com');
    expect(call.data.phone).toBe('0400 123 456');
    expect(call.data.source).toBe('public_claim_submit');
    expect(call.data.responded).toBe(false);
  });

  it('preserves the full body in metadata for ops promotion', async () => {
    const create = vi.fn().mockResolvedValue({
      id: 'enq-xyz',
      createdAt: new Date('2026-05-01T10:00:00Z'),
    });
    const prisma = { enquiry: { create } } as any;

    await writeEnquiryFromClaimBody(prisma, body, {
      ipAddress: '10.0.0.1',
      userAgent: 'Mozilla/5.0',
    });

    const call = create.mock.calls[0][0];
    const metadata = JSON.parse(call.data.metadata);
    expect(metadata.payload).toEqual(body);
    expect(metadata.submission.ipAddress).toBe('10.0.0.1');
    expect(metadata.submission.userAgent).toBe('Mozilla/5.0');
    expect(metadata.submission.submittedAt).toBeTruthy();
  });

  it('defaults submission ipAddress + userAgent to "unknown" when not supplied', async () => {
    const create = vi.fn().mockResolvedValue({
      id: 'enq-1',
      createdAt: new Date(),
    });
    const prisma = { enquiry: { create } } as any;
    await writeEnquiryFromClaimBody(prisma, body);
    const metadata = JSON.parse(create.mock.calls[0][0].data.metadata);
    expect(metadata.submission.ipAddress).toBe('unknown');
    expect(metadata.submission.userAgent).toBe('unknown');
  });

  it('writes phone as null when not provided', async () => {
    const create = vi.fn().mockResolvedValue({
      id: 'enq-1',
      createdAt: new Date(),
    });
    const prisma = { enquiry: { create } } as any;
    const noPhoneBody: ClaimBodyShape = { ...body, phone: undefined };
    await writeEnquiryFromClaimBody(prisma, noPhoneBody);
    expect(create.mock.calls[0][0].data.phone).toBeNull();
  });
});
