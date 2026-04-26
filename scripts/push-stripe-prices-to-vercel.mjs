#!/usr/bin/env node
// Reads scripts/.stripe-catalogue.json (produced by setup-stripe-products.mjs)
// and pushes the 12 STRIPE_*_PRICE_ID env vars to Vercel production scope.
//
// Idempotent: removes existing values before adding (overwrite pattern).
// Price IDs are non-secret (they're product identifiers, equivalent to SKUs)
// so this script does not bother hiding them from terminal output.
//
// Usage:
//   node scripts/push-stripe-prices-to-vercel.mjs
//
// Requires:
//   - vercel CLI installed + authenticated (`vercel whoami`)
//   - .vercel/project.json present
//   - scripts/.stripe-catalogue.json (produced by setup-stripe-products.mjs)

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const CATALOGUE_PATH = resolve(process.cwd(), 'scripts/.stripe-catalogue.json');
const TARGET = 'production';

let catalogue;
try {
  catalogue = JSON.parse(readFileSync(CATALOGUE_PATH, 'utf8'));
} catch (err) {
  console.error(`ERROR: cannot read ${CATALOGUE_PATH}. Run setup-stripe-products.mjs first.`);
  process.exit(2);
}

function vercel(args, options = {}) {
  return spawnSync('vercel', args, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
    ...options,
  });
}

function removeKey(key, target) {
  const result = vercel(['env', 'rm', key, target, '--yes']);
  return result.status === 0 || /does not exist|not found/i.test(result.stderr || '');
}

function addKey(key, target, value) {
  const result = vercel(['env', 'add', key, target], { input: value });
  if (result.status !== 0) {
    throw new Error(`vercel env add ${key} ${target} failed:\n${result.stderr}`);
  }
  return true;
}

console.log(`Pushing ${catalogue.items.length} STRIPE_*_PRICE_ID env vars → ${TARGET}\n`);
console.log(`Source account: ${catalogue.accountId} (${catalogue.businessName || 'unknown'})\n`);

for (const item of catalogue.items) {
  process.stdout.write(`  ${item.envVar.padEnd(40)} `);
  removeKey(item.envVar, TARGET);
  addKey(item.envVar, TARGET, item.priceId);
  process.stdout.write(`= ${item.priceId}\n`);
}

console.log('\n✅ All env vars pushed.\n');
console.log('Trigger a redeploy to pick them up:');
console.log('  vercel --prod');
console.log('Or wait for the next push to main.');
