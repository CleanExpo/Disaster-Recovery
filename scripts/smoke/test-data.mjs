/**
 * Deterministic AU test data generators for the overnight smoke battery.
 *
 * Every generator is seeded by `seq` so a failed run can be reproduced
 * exactly by passing the seq number back in.
 */

import { generateAbn } from './abn.mjs';

const FIRST_NAMES = [
  'Phillip', 'Sarah', 'Marcus', 'Olivia', 'Daniel', 'Emily', 'Liam', 'Sophie',
  'Noah', 'Ava', 'Ethan', 'Charlotte', 'Lucas', 'Amelia', 'Mason', 'Mia',
  'Logan', 'Harper', 'Benjamin', 'Evelyn', 'James', 'Abigail', 'Henry', 'Isla',
  'William', 'Chloe', 'Alexander', 'Zoe', 'Michael', 'Lily', 'Jack', 'Ella',
  'Oliver', 'Grace', 'Sebastian', 'Ruby', 'Owen', 'Scarlett', 'Caleb', 'Maya',
  'Connor', 'Layla', 'Hunter', 'Hannah', 'Adam', 'Aria', 'Cooper', 'Eva',
  'Jaxon', 'Willow',
];

const LAST_NAMES = [
  'Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White',
  'Martin', 'Anderson', 'Thompson', 'Nguyen', 'Singh', 'Patel', 'Lee', 'Chen',
  'Wang', 'Liu', 'Garcia', 'Robinson', 'Walker', 'Wright', 'Stewart', 'Young',
  'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Mitchell',
  'Carter', 'Roberts', 'Phillips', 'Evans', 'Turner', 'Cook', 'Bailey', 'Cooper',
  'Murphy', 'Kelly', 'Harris', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Bennett',
  'Wood', 'Watson',
];

const SUBURBS = [
  // QLD
  { suburb: 'Brisbane City', state: 'QLD', postcode: '4000' },
  { suburb: 'South Brisbane', state: 'QLD', postcode: '4101' },
  { suburb: 'Fortitude Valley', state: 'QLD', postcode: '4006' },
  { suburb: 'New Farm', state: 'QLD', postcode: '4005' },
  { suburb: 'Surfers Paradise', state: 'QLD', postcode: '4217' },
  { suburb: 'Cairns City', state: 'QLD', postcode: '4870' },
  { suburb: 'Toowoomba City', state: 'QLD', postcode: '4350' },
  // NSW
  { suburb: 'Sydney', state: 'NSW', postcode: '2000' },
  { suburb: 'Parramatta', state: 'NSW', postcode: '2150' },
  { suburb: 'Newcastle', state: 'NSW', postcode: '2300' },
  { suburb: 'Wollongong', state: 'NSW', postcode: '2500' },
  { suburb: 'Bondi Beach', state: 'NSW', postcode: '2026' },
  { suburb: 'Manly', state: 'NSW', postcode: '2095' },
  // VIC
  { suburb: 'Melbourne', state: 'VIC', postcode: '3000' },
  { suburb: 'Richmond', state: 'VIC', postcode: '3121' },
  { suburb: 'St Kilda', state: 'VIC', postcode: '3182' },
  { suburb: 'Geelong', state: 'VIC', postcode: '3220' },
  { suburb: 'Ballarat Central', state: 'VIC', postcode: '3350' },
  { suburb: 'Bendigo', state: 'VIC', postcode: '3550' },
  // SA
  { suburb: 'Adelaide', state: 'SA', postcode: '5000' },
  { suburb: 'Glenelg', state: 'SA', postcode: '5045' },
  { suburb: 'Mount Gambier', state: 'SA', postcode: '5290' },
  // WA
  { suburb: 'Perth', state: 'WA', postcode: '6000' },
  { suburb: 'Fremantle', state: 'WA', postcode: '6160' },
  { suburb: 'Joondalup', state: 'WA', postcode: '6027' },
  // TAS
  { suburb: 'Hobart', state: 'TAS', postcode: '7000' },
  { suburb: 'Launceston', state: 'TAS', postcode: '7250' },
  // NT
  { suburb: 'Darwin', state: 'NT', postcode: '0800' },
  { suburb: 'Alice Springs', state: 'NT', postcode: '0870' },
  // ACT
  { suburb: 'Canberra', state: 'ACT', postcode: '2601' },
];

const STREETS = [
  'High St', 'Park Rd', 'Smith St', 'King St', 'Queen St', 'Albert St',
  'Victoria St', 'George St', 'William St', 'Elizabeth St', 'Macquarie St',
  'Beach Rd', 'Ocean Dr', 'Hill St', 'Forest Rd', 'River Rd', 'Lake St',
  'Garden Ave', 'Market St', 'Church St', 'Station St', 'Railway Rd',
];

const DAMAGE_TYPES = [
  'water', 'fire', 'mould', 'storm', 'biohazard', 'sewage', 'vehicle_impact', 'trauma',
];

const URGENCY = ['emergency', 'urgent', 'standard'];

const PROPERTY_TYPES = ['Residential', 'Commercial', 'Industrial', 'Strata'];

const INSURANCE_PROVIDERS = ['Suncorp', 'NRMA', 'Allianz', 'IAG', 'QBE', 'AAMI', 'Youi', 'Bupa'];

/** Pick from array deterministically by seq. */
function pick(arr, seq) {
  return arr[seq % arr.length];
}

/** AU mobile in 04xx xxx xxx format. */
function mobile(seq) {
  // Vary the starting digits across the test set so they look real.
  const block = [`04${String(10 + (seq % 90))}`, String((seq * 7) % 1000).padStart(3, '0'), String((seq * 13) % 1000).padStart(3, '0')];
  return block.join(' ');
}

/** Generates the full client claim payload for /api/claims/submit. */
export function clientClaimBody(seq) {
  const first = pick(FIRST_NAMES, seq);
  const last = pick(LAST_NAMES, Math.floor(seq / 3));
  const sub = pick(SUBURBS, seq);
  const street = pick(STREETS, seq * 2);
  const damage = pick(DAMAGE_TYPES, seq);
  const urgencyLevel = pick(URGENCY, seq);
  const hasInsurance = seq % 5 < 3; // 60% have insurance
  const streetNum = ((seq * 17) % 200) + 1;

  return {
    fullName: `${first} ${last}`,
    email: `smoke-2026-04-28-claim-${seq}@disasterrecovery.smoke.invalid`,
    phone: mobile(seq),
    propertyType: pick(PROPERTY_TYPES, seq),
    propertyAddress: `${streetNum} ${street}`,
    suburb: sub.suburb,
    state: sub.state,
    postcode: sub.postcode,
    damageTypes: [damage],
    damageDescription: `Smoke test claim seq=${seq}: ${damage} damage at property in ${sub.suburb}`,
    urgencyLevel,
    hasInsurance,
    insuranceCompany: hasInsurance ? pick(INSURANCE_PROVIDERS, seq) : null,
    policyNumber: hasInsurance ? `POL-SMOKE-${seq}-${(seq * 99991) % 1000000}` : null,
    paymentConfirmed: false,
    consent: { collection: true, marketing: false },
  };
}

/** Generates the full contractor onboarding payload for /api/contractor/onboarding/submit. */
export function contractorApplicationBody(seq) {
  const first = pick(FIRST_NAMES, seq * 3);
  const last = pick(LAST_NAMES, seq * 5);
  const sub = pick(SUBURBS, seq * 7);
  const damage = pick(DAMAGE_TYPES, seq);
  const yearsInBusiness = ((seq * 11) % 30) + 1;

  return {
    application: {
      businessInfo: {
        companyName: `${first} ${last} Restoration Services Pty Ltd`,
        contactName: `${first} ${last}`,
        email: `smoke-2026-04-28-contractor-${seq}@disasterrecovery.smoke.invalid`,
        phone: mobile(seq * 3),
        abn: generateAbn(seq),
        yearsInBusiness,
      },
      services: {
        areas: [sub.suburb, sub.state],
      },
      certifications: ['IICRC S500', 'IICRC S520'].slice(0, (seq % 2) + 1),
      marketing: {
        source: pick(['google', 'referral', 'direct', 'facebook'], seq),
        utm: {
          source: 'smoke-2026-04-28',
          medium: 'overnight-battery',
          campaign: `seq-${seq}`,
        },
      },
      // Path B-style sections (will be flattened to JSONB columns per DR-815)
      insurance: {
        publicLiability: {
          provider: pick(INSURANCE_PROVIDERS, seq),
          policyNumber: `INS-SMOKE-${seq}`,
          coverAmount: 20_000_000,
          expiryDate: '2027-04-28',
        },
      },
      experience: {
        majorProjects: [
          {
            client: `Test Client ${seq}`,
            value: ((seq * 12345) % 500000) + 10000,
            year: 2024 - (seq % 5),
          },
        ],
        yearsInBusiness,
      },
      equipment: {
        teamSize: ((seq * 3) % 15) + 1,
        items: ['truck-mounted extractor', 'air movers', 'dehumidifiers'],
      },
      healthSafety: {
        whsTicket: true,
        firstAidCertified: true,
      },
      banking: {
        bankName: pick(['CBA', 'Westpac', 'NAB', 'ANZ'], seq),
        bsb: '062-000',
        accountNumber: `1000${String(seq).padStart(4, '0')}`,
      },
    },
  };
}

/** Generates a contractor signup payload for /api/auth/signup. */
export function contractorSignupBody(seq) {
  const first = pick(FIRST_NAMES, seq * 7);
  const last = pick(LAST_NAMES, seq * 11);
  return {
    name: `${first} ${last}`,
    email: `smoke-2026-04-28-signup-${seq}@disasterrecovery.smoke.invalid`,
    password: `SmokeP@ssw0rd${seq}!`,
  };
}

/** Total IPs to cycle through to avoid hitting the 5/60s rate limit. */
export const FAKE_IP_POOL_SIZE = 25;

export function fakeIp(seq) {
  // Cycle through 192.0.2.1 - 192.0.2.25 (TEST-NET-1 RFC 5737 — guaranteed never real).
  return `192.0.2.${(seq % FAKE_IP_POOL_SIZE) + 1}`;
}
