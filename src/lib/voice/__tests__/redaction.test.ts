/**
 * DR-714 redaction smoke test. Plain TS — run with `npx tsx`.
 * Exits 1 on any assertion failure.
 */

import {
  redactTranscript,
  redactTranscriptWithFlags,
} from '../redaction';

let failures = 0;
let assertions = 0;

function assert(cond: boolean, label: string, detail?: string): void {
  assertions++;
  if (!cond) {
    failures++;
    // eslint-disable-next-line no-console
    console.error(`FAIL: ${label}${detail ? ` — ${detail}` : ''}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`ok  : ${label}`);
  }
}

// 1. Valid PAN (Luhn-valid test card) → redacted
{
  const out = redactTranscript('card 4242 4242 4242 4242 please');
  assert(out.includes('[REDACTED_PAN]'), 'valid PAN redacted', out);
  assert(!out.includes('4242 4242 4242 4242'), 'raw PAN removed', out);
}

// 2. Invalid PAN (fails Luhn) → untouched
{
  const out = redactTranscript('number 1234 5678 9012 3456 here');
  assert(!out.includes('[REDACTED_PAN]'), 'invalid PAN untouched', out);
}

// 3. CVV near keyword
{
  const out = redactTranscript('security code 123 confirmed');
  assert(out.includes('[REDACTED_CVV]'), 'CVV redacted', out);
  assert(!/\b123\b/.test(out), 'raw CVV removed', out);
}

// 4. BSB + account
{
  const out = redactTranscript('BSB 062-000 account 12345678');
  assert(out.includes('[REDACTED_BANK]'), 'BSB redacted', out);
  assert(!out.includes('062-000'), 'raw BSB removed', out);
}

// 5. Email preservation
{
  const out = redactTranscript(
    'caller joe@example.com cc sally@example.com',
    { preserveCallerEmail: 'joe@example.com' },
  );
  assert(out.includes('joe@example.com'), 'caller email preserved', out);
  assert(!out.includes('sally@example.com'), 'other email redacted', out);
  assert(out.includes('[REDACTED_EMAIL]'), 'redacted placeholder present', out);
}

// 6. Street address redacted, postcode preserved
{
  const out = redactTranscript('I live at 42 Smith Street, Brisbane 4101');
  assert(out.includes('[REDACTED_ADDRESS]'), 'street address redacted', out);
  assert(!/42 Smith Street/i.test(out), 'raw address removed', out);
  assert(out.includes('4101'), 'postcode preserved', out);
}

// 7. Secret prefix → secret_leak flag
{
  const r = redactTranscriptWithFlags('token is sk_live_abc123def456 ok');
  assert(r.text.includes('[REDACTED_SECRET]'), 'secret redacted', r.text);
  assert(!r.text.includes('sk_live_'), 'raw secret removed', r.text);
  assert(r.flags.secret_leak === true, 'secret_leak flag set');
}

// 8. Deny-list → internal_leak flag
{
  const r = redactTranscriptWithFlags(
    'Acme Restoration handles this',
    { contractorDenyList: ['Acme Restoration'] },
  );
  assert(r.text.includes('[REDACTED_INTERNAL]'), 'deny-list redacted', r.text);
  assert(!/Acme Restoration/i.test(r.text), 'raw deny-list term removed', r.text);
  assert(r.flags.internal_leak === true, 'internal_leak flag set');
}

// 9. Benign sentence untouched
{
  const out = redactTranscript('The weather is nice today');
  assert(out === 'The weather is nice today', 'benign untouched', out);
}

// eslint-disable-next-line no-console
console.log(`\nDR-714 redaction smoke test: ${assertions} assertions, ${failures} failures`);
if (failures > 0) process.exit(1);
