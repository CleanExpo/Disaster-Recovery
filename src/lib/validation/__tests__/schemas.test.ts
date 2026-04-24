/**
 * Plain-TS smoke tests for src/lib/validation/schemas.ts.
 *
 * Run: npx tsx src/lib/validation/__tests__/schemas.test.ts
 *
 * Deliberately not pulling in Vitest / Jest — this file is an assertion
 * script so it can run without adding a test runner to the Day 7-8 PR.
 */

import {
  abnSchema,
  australianPhoneSchema,
  australianPostcodeSchema,
  bookingCreateSchema,
  claimSubmitSchema,
  contactSubmitSchema,
  emailSchema,
} from '../schemas';

let passed = 0;
let failed = 0;

function ok(name: string, cond: boolean, detail?: string) {
  if (cond) {
    passed += 1;
    // eslint-disable-next-line no-console
    console.log(`  ok   ${name}`);
  } else {
    failed += 1;
    // eslint-disable-next-line no-console
    console.error(`  FAIL ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

function assertParses<T>(name: string, schema: { safeParse: (v: unknown) => { success: boolean; error?: unknown } }, value: unknown) {
  const r = schema.safeParse(value);
  ok(name, r.success, r.success ? undefined : JSON.stringify(r.error));
}

function assertRejects<T>(name: string, schema: { safeParse: (v: unknown) => { success: boolean } }, value: unknown) {
  const r = schema.safeParse(value);
  ok(name, !r.success, r.success ? 'expected rejection but passed' : undefined);
}

// eslint-disable-next-line no-console
console.log('\naustralianPhoneSchema');
assertParses('mobile with spaces', australianPhoneSchema, '0412 345 678');
assertParses('mobile with +61', australianPhoneSchema, '+61412345678');
assertParses('Sydney landline', australianPhoneSchema, '0298765432');
assertParses('1300 number', australianPhoneSchema, '1300 123 456');
assertRejects('too short', australianPhoneSchema, '123');
assertRejects('non-numeric', australianPhoneSchema, 'abc');
assertRejects('too long', australianPhoneSchema, '1234567890123');

// eslint-disable-next-line no-console
console.log('\nemailSchema');
{
  const r = emailSchema.safeParse('  Phill@Example.COM  ');
  ok('trims and lowercases', r.success && (r as any).data === 'phill@example.com');
}
assertRejects('not an email', emailSchema, 'not-an-email');

// eslint-disable-next-line no-console
console.log('\nabnSchema');
assertParses('valid ABN 51 824 753 556', abnSchema, '51824753556');
assertParses('valid ABN with spaces', abnSchema, '51 824 753 556');
assertRejects('10 digits', abnSchema, '5182475355');
assertRejects('invalid checksum', abnSchema, '11111111111');

// eslint-disable-next-line no-console
console.log('\naustralianPostcodeSchema');
assertParses('Brisbane 4000', australianPostcodeSchema, '4000');
assertRejects('letters', australianPostcodeSchema, 'ABCD');
assertRejects('3 digits', australianPostcodeSchema, '400');

// eslint-disable-next-line no-console
console.log('\nclaimSubmitSchema');
assertParses('valid claim', claimSubmitSchema, {
  fullName: 'Phill McGurk',
  email: 'phill@example.com',
  phone: '0412345678',
  propertyAddress: '1 Test St',
  suburb: 'Brisbane',
  state: 'QLD',
  postcode: '4000',
  damageTypes: ['water'],
  damageDescription: 'Burst pipe in kitchen.',
  urgencyLevel: 'emergency',
});
assertRejects('missing damageTypes', claimSubmitSchema, {
  fullName: 'Phill McGurk',
  email: 'phill@example.com',
  propertyAddress: '1 Test St',
  damageDescription: 'Burst pipe.',
});

// eslint-disable-next-line no-console
console.log('\ncontactSubmitSchema');
assertParses('valid contact', contactSubmitSchema, {
  name: 'Phill McGurk',
  email: 'phill@example.com',
  phone: '0412 345 678',
  message: 'Need urgent help with water damage.',
  service: 'water',
  urgency: 'emergency',
});

// eslint-disable-next-line no-console
console.log('\nbookingCreateSchema');
assertParses('valid booking', bookingCreateSchema, {
  serviceType: 'water',
  urgency: 'urgent',
  propertyType: 'residential',
  estimatedDamage: '5000',
  date: '2026-05-01',
  time: '09:00',
  firstName: 'Phill',
  lastName: 'McGurk',
  email: 'phill@example.com',
  phone: '0412345678',
  preferredContact: 'phone',
  streetAddress: '1 Test Street',
  suburb: 'Brisbane',
  state: 'QLD',
  postcode: '4000',
  hasInsurance: true,
});

// eslint-disable-next-line no-console
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
