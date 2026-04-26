#!/usr/bin/env node
// One-shot setup: creates the 11 DR contractor onboarding Products + Prices
// in the Stripe account behind STRIPE_SECRET_KEY (read from .env.local).
//
// Idempotent: tags every product with metadata.dr_catalogue_key. On re-run,
// checks for existing products with the same key and skips creation.
//
// Outputs: env-var snippets ready to paste into Vercel and a JSON summary
// at scripts/.stripe-catalogue.json (gitignored).
//
// Usage:
//   1. STRIPE_SECRET_KEY=sk_live_... in .env.local (NEEDS WRITE permission
//      to Products + Prices for this one-shot run; revoke after).
//   2. node scripts/setup-stripe-products.mjs
//
// SAFETY:
//   - Reads/writes only Products + Prices. Never touches Charges, Customers,
//     Subscriptions, or Webhooks.
//   - Live mode only — refuses if STRIPE_SECRET_KEY starts with sk_test_ /
//     rk_test_ (run separately for test mode if needed).

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Stripe from 'stripe';

// ---------- env loader ----------

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const raw = readFileSync(resolve(process.cwd(), file), 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        if (!line || line.trim().startsWith('#')) continue;
        const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
        if (!m) continue;
        if (process.env[m[1]] !== undefined) continue;
        let v = m[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        process.env[m[1]] = v;
      }
    } catch {}
  }
}

loadEnv();

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error('ERROR: STRIPE_SECRET_KEY not set in .env.local. Aborting.');
  process.exit(2);
}
if (!key.startsWith('sk_live_') && !key.startsWith('rk_live_')) {
  console.error('ERROR: This script is LIVE mode only. Use sk_live_ or rk_live_.');
  process.exit(2);
}

const stripe = new Stripe(key, { apiVersion: '2024-06-20', typescript: true });

// ---------- catalogue ----------
// Mirrors src/lib/stripe.ts PAYMENT_AMOUNTS + STRIPE_PRICES.
// All AUD. GST handled at Stripe Tax level (not here).

// Source of truth: src/lib/payment-security.ts PRICING_CONSTANTS
// (marked IMMUTABLE PRICING CONSTANTS - SERVER-SIDE ONLY, dated 2026-04-07).
// All amounts in cents AUD, GST-inclusive.

const CATALOGUE = [
  // One-time fees
  {
    key: 'APPLICATION_FEE',
    productName: 'Contractor Application Fee',
    productDescription: 'One-time fee charged when an applicant submits the contractor application.',
    unitAmount: 27500, // $275.00
    recurring: null,
    envVar: 'STRIPE_APPLICATION_FEE_PRICE_ID',
  },
  {
    key: 'JOINING_FEE',
    productName: 'Contractor Joining Fee',
    productDescription: 'One-time onboarding fee on contractor approval.',
    unitAmount: 220000, // $2,200.00
    recurring: null,
    envVar: 'STRIPE_JOINING_FEE_PRICE_ID',
  },
  {
    key: 'PERFORMANCE_BOND',
    productName: 'Contractor Performance Bond',
    productDescription: 'One-time security deposit held against contractor performance obligations.',
    unitAmount: 500000, // $5,000.00
    recurring: null,
    envVar: 'STRIPE_PERFORMANCE_BOND_PRICE_ID',
  },
  {
    key: 'CALLOUT_FEE',
    productName: 'Emergency Make-Safe Callout Fee',
    productDescription: 'Emergency make-safe minimum callout fee charged to the client. DR is the merchant of record. Of the $2,750 received: $2,200 (80%) is the contractor entitlement, released on KPI completion per NRPG membership rules; $550 (20%) is retained as platform fee.',
    unitAmount: 275000, // $2,750.00
    recurring: null,
    envVar: 'STRIPE_CALLOUT_FEE_PRICE_ID',
  },
  // Territory subscription tiers (recurring monthly)
  {
    key: 'TIER_25KM',
    productName: 'Contractor Subscription — 25 km territory',
    productDescription: 'Monthly subscription, 25 km service radius (base tier).',
    unitAmount: 49500, // $495.00
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_TIER_25KM_PRICE_ID',
  },
  {
    key: 'TIER_50KM',
    productName: 'Contractor Subscription — 50 km territory',
    productDescription: 'Monthly subscription, 50 km service radius.',
    unitAmount: 79500, // $795.00
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_TIER_50KM_PRICE_ID',
  },
  {
    key: 'TIER_75KM',
    productName: 'Contractor Subscription — 75 km territory',
    productDescription: 'Monthly subscription, 75 km service radius.',
    unitAmount: 99500, // $995.00
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_TIER_75KM_PRICE_ID',
  },
  {
    key: 'TIER_100KM',
    productName: 'Contractor Subscription — 100 km territory',
    productDescription: 'Monthly subscription, 100 km service radius.',
    unitAmount: 129500, // $1,295.00
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_TIER_100KM_PRICE_ID',
  },
  // Promo schedule (base tier)
  {
    key: 'SUB_MONTH_1',
    productName: 'Contractor Subscription — Promo Month 1 (Free)',
    productDescription: 'Introductory month 1: free.',
    unitAmount: 0,
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_MONTH_1_PRICE_ID',
  },
  {
    key: 'SUB_MONTH_2',
    productName: 'Contractor Subscription — Promo Month 2 (60% off)',
    productDescription: 'Introductory month 2: 60% off base ($198).',
    unitAmount: 19800, // $198.00
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_MONTH_2_PRICE_ID',
  },
  {
    key: 'SUB_MONTH_3',
    productName: 'Contractor Subscription — Promo Month 3 (50% off)',
    productDescription: 'Introductory month 3: 50% off base ($247.50).',
    unitAmount: 24750, // $247.50
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_MONTH_3_PRICE_ID',
  },
  {
    key: 'SUB_REGULAR',
    productName: 'Contractor Subscription — Regular',
    productDescription: 'Standard recurring monthly subscription (post-promo).',
    unitAmount: 49500, // $495.00
    recurring: { interval: 'month' },
    envVar: 'STRIPE_SUB_REGULAR_PRICE_ID',
  },
];

// ---------- main ----------

async function findExistingProduct(catalogueKey) {
  // Stripe doesn't expose direct metadata search on products list;
  // iterate active products and filter.
  let after = undefined;
  while (true) {
    const page = await stripe.products.list({ limit: 100, active: true, starting_after: after });
    for (const p of page.data) {
      if (p.metadata?.dr_catalogue_key === catalogueKey) return p;
    }
    if (!page.has_more) return null;
    after = page.data[page.data.length - 1].id;
  }
}

async function findExistingPrice(productId, unitAmount, recurring) {
  const prices = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  for (const p of prices.data) {
    if (p.unit_amount !== unitAmount) continue;
    if (recurring && (!p.recurring || p.recurring.interval !== recurring.interval)) continue;
    if (!recurring && p.recurring) continue;
    return p;
  }
  return null;
}

async function ensureProduct(item) {
  let product = await findExistingProduct(item.key);
  if (product) {
    console.log(`  [exists] ${item.key.padEnd(16)} ${product.id}  ${product.name}`);
  } else {
    product = await stripe.products.create({
      name: item.productName,
      description: item.productDescription,
      metadata: {
        dr_catalogue_key: item.key,
        managed_by: 'scripts/setup-stripe-products.mjs',
      },
    });
    console.log(`  [created] ${item.key.padEnd(16)} ${product.id}  ${product.name}`);
  }

  let price = await findExistingPrice(product.id, item.unitAmount, item.recurring);
  if (price) {
    console.log(`            price ${price.id}  (already exists at $${(item.unitAmount / 100).toFixed(2)})`);
  } else {
    const params = {
      product: product.id,
      unit_amount: item.unitAmount,
      currency: 'aud',
      metadata: { dr_catalogue_key: item.key },
    };
    if (item.recurring) params.recurring = item.recurring;
    price = await stripe.prices.create(params);
    console.log(`            price ${price.id}  CREATED at $${(item.unitAmount / 100).toFixed(2)}`);
  }

  return { catalogueKey: item.key, envVar: item.envVar, productId: product.id, priceId: price.id, amount: item.unitAmount };
}

async function main() {
  let acct = null;
  try {
    acct = await stripe.accounts.retrieve();
    console.log(`\nStripe account: ${acct.id} (${acct.business_profile?.name || acct.settings?.dashboard?.display_name || 'no name'})`);
  } catch (err) {
    console.log(`\nStripe account: (account.read permission not granted — proceeding without identity check)`);
  }
  console.log(`Currency: AUD\n`);

  console.log('Ensuring products + prices...');
  const results = [];
  for (const item of CATALOGUE) {
    const r = await ensureProduct(item);
    results.push(r);
  }
  console.log('');

  // Write JSON summary
  const summary = {
    generatedAt: new Date().toISOString(),
    accountId: acct?.id || 'unknown (account.read not granted)',
    businessName: acct?.business_profile?.name || acct?.settings?.dashboard?.display_name || '',
    items: results,
  };
  writeFileSync(
    resolve(process.cwd(), 'scripts/.stripe-catalogue.json'),
    JSON.stringify(summary, null, 2),
  );
  console.log('Wrote scripts/.stripe-catalogue.json (gitignored)\n');

  // Print env-var snippets
  console.log('=== Env vars to push to Vercel (production) ===\n');
  for (const r of results) {
    console.log(`${r.envVar}=${r.priceId}`);
  }
  console.log('');
  console.log(`All ${results.length} catalogue items present in Stripe.`);
}

main().catch((err) => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
