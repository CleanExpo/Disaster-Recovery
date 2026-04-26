#!/usr/bin/env node
// Verify Stripe account configuration without exposing the secret key.
//
// Reads STRIPE_SECRET_KEY from .env.local (preferred) or .env, never echoes
// it to stdout/stderr. Outputs only metadata: account ID, business name,
// products, prices, webhooks, and a diff vs expected price IDs.
//
// Usage:
//   1. Add to .env.local (gitignored):
//        STRIPE_SECRET_KEY=sk_live_... or sk_test_...
//   2. Run:
//        node scripts/verify-stripe-products.mjs
//
// Exit code 0 = all 13 expected price IDs resolve.
// Exit code 1 = mismatches found.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Stripe from 'stripe';

// ---------- env loader (no dotenv dep) ----------

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const raw = readFileSync(resolve(process.cwd(), file), 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        if (!line || line.trim().startsWith('#')) continue;
        const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
        if (!m) continue;
        if (process.env[m[1]] !== undefined) continue; // existing wins
        let v = m[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        process.env[m[1]] = v;
      }
    } catch {
      // ignore missing file
    }
  }
}

loadEnv();

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('ERROR: STRIPE_SECRET_KEY not set in .env.local or .env');
  console.error('Add it to .env.local (gitignored) and re-run.');
  process.exit(2);
}

const mode =
  key.startsWith('sk_live_') || key.startsWith('rk_live_')
    ? 'LIVE'
    : key.startsWith('sk_test_') || key.startsWith('rk_test_')
      ? 'TEST'
      : 'UNKNOWN';

const keyType = key.startsWith('rk_') ? 'restricted' : 'secret';

if (mode === 'UNKNOWN') {
  console.error(
    'ERROR: STRIPE_SECRET_KEY must start with sk_live_ / sk_test_ / rk_live_ / rk_test_. Aborting.',
  );
  process.exit(2);
}

// ---------- expected catalogue (mirrors src/lib/stripe.ts) ----------

const EXPECTED_PRICE_IDS = {
  APPLICATION_FEE: process.env.STRIPE_APPLICATION_FEE_PRICE_ID || 'price_1TJVrEGib5mMf28diz8uurMV',
  JOINING_FEE: process.env.STRIPE_JOINING_FEE_PRICE_ID || 'price_1TJVrEGib5mMf28dmbv8SOcE',
  CALLOUT_FEE: process.env.STRIPE_CALLOUT_FEE_PRICE_ID || 'price_1TJVrFGib5mMf28dG3pvVzOj',
  TIER_25KM: process.env.STRIPE_SUB_TIER_25KM_PRICE_ID || 'price_1TJVrFGib5mMf28diy66Zxhw',
  TIER_50KM: process.env.STRIPE_SUB_TIER_50KM_PRICE_ID || 'price_1TJVrGGib5mMf28datKelIPp',
  TIER_75KM: process.env.STRIPE_SUB_TIER_75KM_PRICE_ID || 'price_1TJVrGGib5mMf28dyzPtJ7t2',
  TIER_100KM: process.env.STRIPE_SUB_TIER_100KM_PRICE_ID || 'price_1TJVrGGib5mMf28dv09Ck9zX',
  SUB_MONTH_1: process.env.STRIPE_SUB_MONTH_1_PRICE_ID || 'price_1TJVrGGib5mMf28dEdUMHFza',
  SUB_MONTH_2: process.env.STRIPE_SUB_MONTH_2_PRICE_ID || 'price_1TJVrHGib5mMf28dOTaEeb86',
  SUB_MONTH_3: process.env.STRIPE_SUB_MONTH_3_PRICE_ID || 'price_1TJVrHGib5mMf28d7aBrgiVy',
  SUB_REGULAR: process.env.STRIPE_SUB_REGULAR_PRICE_ID || 'price_1TJVrFGib5mMf28diy66Zxhw',
};

// ---------- main ----------

const stripe = new Stripe(key, { apiVersion: '2024-06-20', typescript: true });

const fmt = (cents, currency = 'aud') =>
  `${currency.toUpperCase()} $${(cents / 100).toFixed(2)}`;

async function main() {
  console.log(`\n=== Stripe verification — ${mode} mode (${keyType} key) ===\n`);

  // 1) Account
  const acct = await stripe.accounts.retrieve();
  console.log('Account');
  console.log(`  id:           ${acct.id}`);
  console.log(`  business:     ${acct.business_profile?.name || acct.settings?.dashboard?.display_name || '(none)'}`);
  console.log(`  country:      ${acct.country}`);
  console.log(`  charges_enabled:  ${acct.charges_enabled}`);
  console.log(`  payouts_enabled:  ${acct.payouts_enabled}`);
  console.log(`  details_submitted: ${acct.details_submitted}`);
  console.log('');

  // 2) Expected price IDs — resolve each
  console.log(`Expected price IDs (${Object.keys(EXPECTED_PRICE_IDS).length} total)`);
  let missing = 0;
  for (const [label, id] of Object.entries(EXPECTED_PRICE_IDS)) {
    try {
      const price = await stripe.prices.retrieve(id, { expand: ['product'] });
      const product = price.product;
      const name = typeof product === 'object' && 'name' in product ? product.name : '(no product)';
      const amount = price.unit_amount === null ? '(metered)' : fmt(price.unit_amount, price.currency);
      const interval = price.recurring ? ` / ${price.recurring.interval}` : '';
      console.log(`  ✓ ${label.padEnd(14)} ${id}  →  ${name}  ${amount}${interval}`);
    } catch (err) {
      missing++;
      console.log(`  ✗ ${label.padEnd(14)} ${id}  →  NOT FOUND (${err.message})`);
    }
  }
  console.log('');

  // 3) All Products in account (independent listing)
  const products = await stripe.products.list({ limit: 100, active: true });
  console.log(`Active products in account (${products.data.length})`);
  for (const p of products.data) {
    console.log(`  - ${p.id}  ${p.name}`);
  }
  console.log('');

  // 4) Webhook endpoints
  const webhooks = await stripe.webhookEndpoints.list({ limit: 100 });
  console.log(`Webhook endpoints (${webhooks.data.length})`);
  for (const w of webhooks.data) {
    console.log(`  - ${w.id}`);
    console.log(`    url:    ${w.url}`);
    console.log(`    status: ${w.status}`);
    console.log(`    events: ${w.enabled_events.length === 1 && w.enabled_events[0] === '*' ? '(all)' : w.enabled_events.join(', ')}`);
  }
  console.log('');

  // 5) Summary
  console.log('=== Summary ===');
  console.log(`  Mode:              ${mode}`);
  console.log(`  Account:           ${acct.id}`);
  console.log(`  Charges enabled:   ${acct.charges_enabled ? 'yes' : 'NO'}`);
  console.log(`  Expected prices:   ${Object.keys(EXPECTED_PRICE_IDS).length} expected, ${missing} missing`);
  console.log(`  Webhooks:          ${webhooks.data.length}`);
  console.log('');

  process.exit(missing === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
