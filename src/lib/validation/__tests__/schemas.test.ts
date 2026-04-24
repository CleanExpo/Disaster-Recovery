/**
 * Unit tests for Zod schema registry.
 */

import { describe, it, expect } from 'vitest';
import {
  claimClientSchema,
  claimPropertySchema,
  claimDamageSchema,
  claimSubmitSchema,
  claimTrackingSchema,
  proofOfWorkSchema,
  proofOfWorkEvidenceSchema,
  propertyTypeSchema,
  verificationStatusSchema,
  deviceTokenRegistrationSchema,
  nativePlatformSchema,
  reverseGeocodeRequestSchema,
  claimPhotoUploadSchema,
} from '../schemas';

const validClient = {
  fullName: 'Joe Smith',
  phone: '0412345678',
  email: 'joe@example.com',
};

const validProperty = {
  address: '42 Smith St',
  suburb: 'Brisbane',
  state: 'QLD',
  postcode: '4000',
};

const validDamage = {
  types: ['water'],
  urgencyLevel: 'urgent',
  description: 'burst pipe',
};

describe('claimClientSchema', () => {
  it('accepts a valid client payload', () => {
    expect(claimClientSchema.safeParse(validClient).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const res = claimClientSchema.safeParse({ ...validClient, email: 'not-an-email' });
    expect(res.success).toBe(false);
  });

  it('rejects an empty fullName', () => {
    const res = claimClientSchema.safeParse({ ...validClient, fullName: '' });
    expect(res.success).toBe(false);
  });

  it('rejects an empty phone', () => {
    const res = claimClientSchema.safeParse({ ...validClient, phone: '' });
    expect(res.success).toBe(false);
  });
});

describe('claimPropertySchema', () => {
  it('accepts a valid property payload', () => {
    expect(claimPropertySchema.safeParse(validProperty).success).toBe(true);
  });

  it('rejects missing postcode', () => {
    const { postcode: _, ...rest } = validProperty;
    const res = claimPropertySchema.safeParse(rest);
    expect(res.success).toBe(false);
  });

  it('rejects empty suburb', () => {
    const res = claimPropertySchema.safeParse({ ...validProperty, suburb: '' });
    expect(res.success).toBe(false);
  });
});

describe('claimDamageSchema', () => {
  it('accepts a valid damage payload', () => {
    expect(claimDamageSchema.safeParse(validDamage).success).toBe(true);
  });

  it('accepts an empty types array', () => {
    expect(claimDamageSchema.safeParse({ ...validDamage, types: [] }).success).toBe(true);
  });

  it('rejects when types is not an array', () => {
    const res = claimDamageSchema.safeParse({ ...validDamage, types: 'water' });
    expect(res.success).toBe(false);
  });
});

describe('claimSubmitSchema', () => {
  it('accepts a fully valid claim', () => {
    const res = claimSubmitSchema.safeParse({
      client: validClient,
      property: validProperty,
      damage: validDamage,
    });
    expect(res.success).toBe(true);
  });

  it('rejects when the client block is missing', () => {
    const res = claimSubmitSchema.safeParse({
      property: validProperty,
      damage: validDamage,
    });
    expect(res.success).toBe(false);
  });

  it('rejects when a nested field is invalid (bad email)', () => {
    const res = claimSubmitSchema.safeParse({
      client: { ...validClient, email: 'bad' },
      property: validProperty,
      damage: validDamage,
    });
    expect(res.success).toBe(false);
  });
});

describe('claimTrackingSchema', () => {
  it('accepts a claim with server-assigned tracking fields', () => {
    const res = claimTrackingSchema.safeParse({
      client: validClient,
      property: validProperty,
      damage: validDamage,
      id: 'claim-123',
      status: 'pending',
      createdAt: '2026-04-24T00:00:00Z',
      contractor: {
        companyName: null,
        contactPerson: null,
        directPhone: null,
        assignedAt: null,
        acceptedAt: null,
      },
      workflow: {
        paymentProcessed: false,
        contractorAssigned: false,
        contractorAccepted: false,
        initialContactMade: false,
        jobScheduled: false,
        makeSafeCompleted: false,
        documentationProvided: false,
        claimFinalized: false,
      },
    });
    expect(res.success).toBe(true);
  });

  it('rejects when workflow flags are missing', () => {
    const res = claimTrackingSchema.safeParse({
      client: validClient,
      property: validProperty,
      damage: validDamage,
      id: 'claim-123',
      status: 'pending',
      createdAt: '2026-04-24T00:00:00Z',
      contractor: {
        companyName: null,
        contactPerson: null,
        directPhone: null,
        assignedAt: null,
        acceptedAt: null,
      },
      workflow: { paymentProcessed: false },
    });
    expect(res.success).toBe(false);
  });
});

describe('propertyTypeSchema / verificationStatusSchema', () => {
  it('accepts each valid property type', () => {
    for (const t of ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'INSTITUTIONAL']) {
      expect(propertyTypeSchema.safeParse(t).success).toBe(true);
    }
  });

  it('rejects an unknown property type', () => {
    expect(propertyTypeSchema.safeParse('PALACE').success).toBe(false);
  });

  it('accepts verification statuses', () => {
    for (const s of ['PENDING', 'VERIFIED', 'REJECTED']) {
      expect(verificationStatusSchema.safeParse(s).success).toBe(true);
    }
  });
});

describe('proofOfWorkSchema', () => {
  const validPoW = {
    workType: 'water_mitigation',
    projectName: 'Smith residence',
    clientName: 'Joe',
    clientContact: 'joe@example.com',
    projectAddress: '42 Smith St',
    completionDate: '2026-01-15',
    projectValue: 12000,
    projectDescription: 'Extraction + drying',
    damageType: ['water'],
    propertyType: 'RESIDENTIAL' as const,
    emergencyResponse: true,
    insuranceClaim: true,
    evidence: [
      {
        type: 'BEFORE_PHOTO' as const,
        url: 'https://example.com/1.jpg',
        description: 'before',
        uploadedAt: '2026-01-10',
      },
    ],
  };

  it('accepts a valid proof-of-work payload', () => {
    expect(proofOfWorkSchema.safeParse(validPoW).success).toBe(true);
  });

  it('rejects a non-numeric projectValue', () => {
    const res = proofOfWorkSchema.safeParse({ ...validPoW, projectValue: 'lots' });
    expect(res.success).toBe(false);
  });

  it('rejects an evidence item with an unknown type', () => {
    const res = proofOfWorkEvidenceSchema.safeParse({
      type: 'SELFIE',
      url: 'x',
      description: 'x',
      uploadedAt: 'x',
    });
    expect(res.success).toBe(false);
  });
});

describe('deviceTokenRegistrationSchema', () => {
  const validAPNsToken = 'a'.repeat(64); // APNs tokens are 64 hex chars.

  const validPayload = {
    token: validAPNsToken,
    platform: 'ios' as const,
    appId: 'au.com.disasterrecovery.app' as const,
    appVersion: '1.0.0+1',
  };

  it('accepts a minimal iOS registration', () => {
    const res = deviceTokenRegistrationSchema.safeParse(validPayload);
    expect(res.success).toBe(true);
  });

  it('accepts an Android registration with optional fields', () => {
    const res = deviceTokenRegistrationSchema.safeParse({
      ...validPayload,
      platform: 'android',
      token: 'f'.repeat(163),
      deviceId: 'abc-123',
      claimId: 'claim-xyz',
    });
    expect(res.success).toBe(true);
  });

  it('rejects an unknown platform', () => {
    const res = deviceTokenRegistrationSchema.safeParse({
      ...validPayload,
      platform: 'windows',
    });
    expect(res.success).toBe(false);
  });

  it('rejects a different appId (bundle spoof protection)', () => {
    const res = deviceTokenRegistrationSchema.safeParse({
      ...validPayload,
      appId: 'com.attacker.fake',
    });
    expect(res.success).toBe(false);
  });

  it('rejects a token shorter than 32 chars', () => {
    const res = deviceTokenRegistrationSchema.safeParse({
      ...validPayload,
      token: 'short',
    });
    expect(res.success).toBe(false);
  });

  it('nativePlatformSchema only accepts ios or android', () => {
    expect(nativePlatformSchema.safeParse('ios').success).toBe(true);
    expect(nativePlatformSchema.safeParse('android').success).toBe(true);
    expect(nativePlatformSchema.safeParse('web').success).toBe(false);
  });
});

describe('reverseGeocodeRequestSchema', () => {
  it('accepts a valid lat/lng pair', () => {
    const res = reverseGeocodeRequestSchema.safeParse({ lat: -27.4698, lng: 153.0251 });
    expect(res.success).toBe(true);
  });

  it('rejects lat out of range', () => {
    const res = reverseGeocodeRequestSchema.safeParse({ lat: 91, lng: 0 });
    expect(res.success).toBe(false);
  });

  it('rejects lng out of range', () => {
    const res = reverseGeocodeRequestSchema.safeParse({ lat: 0, lng: -181 });
    expect(res.success).toBe(false);
  });

  it('rejects non-number coordinates', () => {
    const res = reverseGeocodeRequestSchema.safeParse({ lat: '-27.4698', lng: '153.0251' });
    expect(res.success).toBe(false);
  });

  it('accepts the boundary values', () => {
    expect(reverseGeocodeRequestSchema.safeParse({ lat: -90, lng: -180 }).success).toBe(true);
    expect(reverseGeocodeRequestSchema.safeParse({ lat: 90, lng: 180 }).success).toBe(true);
  });
});

describe('claimPhotoUploadSchema', () => {
  function makeDataUrl(rawBytes: number, mime = 'jpeg'): string {
    const chars = Math.ceil((rawBytes * 4) / 3);
    const padded = chars + ((4 - (chars % 4)) % 4);
    return `data:image/${mime};base64,${'A'.repeat(padded)}`;
  }

  const validPayload = {
    photoDataUrl: makeDataUrl(100 * 1024),
    platform: 'ios' as const,
    appId: 'au.com.disasterrecovery.app' as const,
    appVersion: '1.0.0+1',
    capturedAt: '2026-04-24T10:00:00+10:00',
  };

  it('accepts a valid iOS payload without claimId or geo', () => {
    const res = claimPhotoUploadSchema.safeParse(validPayload);
    expect(res.success).toBe(true);
  });

  it('accepts a valid Android payload with claimId and geo', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      platform: 'android',
      claimId: 'claim-abc-123',
      geo: { lat: -27.4698, lng: 153.0251, accuracyMeters: 8.5 },
    });
    expect(res.success).toBe(true);
  });

  it('rejects a data URL without the data:image/ prefix', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      photoDataUrl: 'data:application/pdf;base64,AAAA',
    });
    expect(res.success).toBe(false);
  });

  it('rejects a photo smaller than 10KB', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      photoDataUrl: makeDataUrl(1024),
    });
    expect(res.success).toBe(false);
  });

  it('rejects a photo larger than 20MB', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      photoDataUrl: makeDataUrl(21 * 1024 * 1024),
    });
    expect(res.success).toBe(false);
  });

  it('rejects a spoofed appId (bundle identifier guard)', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      appId: 'com.attacker.fake',
    });
    expect(res.success).toBe(false);
  });

  it('rejects an unknown platform', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      platform: 'windows',
    });
    expect(res.success).toBe(false);
  });

  it('rejects a non-ISO-8601 capturedAt', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      capturedAt: '24/04/2026 10:00',
    });
    expect(res.success).toBe(false);
  });

  it('rejects geo with out-of-range latitude', () => {
    const res = claimPhotoUploadSchema.safeParse({
      ...validPayload,
      geo: { lat: 123, lng: 0, accuracyMeters: 10 },
    });
    expect(res.success).toBe(false);
  });
});
