// NOT LEGAL ADVICE — flag-gated scaffold.
//
// Plain-TS smoke test for output filter + SMS sanitiser.
// Run via: npx tsx src/lib/voice/__tests__/output-filter.test.ts
// Exits non-zero on failure.

import { filterToolOutput, sanitiseSmsBody } from '../output-filter';

let failed = 0;

function assert(cond: boolean, msg: string) {
  if (!cond) {
    // eslint-disable-next-line no-console
    console.error('FAIL:', msg);
    failed += 1;
  } else {
    // eslint-disable-next-line no-console
    console.log('ok  —', msg);
  }
}

// filterToolOutput drops unexpected keys
{
  const filtered = filterToolOutput(
    { covered: true, typical_response_hours: 1, secret: 'hidden' },
    ['covered', 'typical_response_hours']
  );
  assert(filtered.covered === true, 'covered preserved');
  assert(filtered.typical_response_hours === 1, 'typical_response_hours preserved');
  assert(!('secret' in filtered), 'secret key stripped');
}

// sanitiseSmsBody redacts known secrets
{
  const out = sanitiseSmsBody('sk_live_abc123DEF tap here for claim');
  assert(!out.includes('sk_live_abc123DEF'), 'sk_live_ redacted');
  assert(out.includes('[REDACTED]'), 'redaction marker present');
}

// sanitiseSmsBody redacts UUIDs
{
  const out = sanitiseSmsBody('claim 550e8400-e29b-41d4-a716-446655440000 ready');
  assert(!out.includes('550e8400-e29b-41d4-a716-446655440000'), 'uuid redacted');
}

// sanitiseSmsBody preserves innocuous text
{
  const out = sanitiseSmsBody('Disaster Recovery: tap here https://example.com');
  assert(out.includes('Disaster Recovery'), 'innocuous text preserved');
  assert(out.includes('https://example.com'), 'url preserved');
}

if (failed > 0) {
  // eslint-disable-next-line no-console
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
// eslint-disable-next-line no-console
console.log('\nall tests passed');
