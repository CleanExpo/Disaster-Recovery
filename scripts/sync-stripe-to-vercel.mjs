#!/usr/bin/env node
// Push Stripe Live + Test keys from interactive prompt → Vercel env vars,
// targeting Production (live) and Preview (test) scopes.
//
// Account: Disaster Recovery Qld (acct_1GNs4CC8kkd3m9ZX).
// Owner email: phill@disasterrecovery.com.au.
// Verified live on 2026-04-26.
//
// Usage:
//   node scripts/sync-stripe-to-vercel.mjs
//
// Requires:
//   - vercel CLI installed + authenticated (`vercel whoami`)
//   - .vercel/project.json present (run `vercel link` if missing)
//
// Values flow: keyboard → process.stdin → child_process stdin → Vercel.
// Never echoed to terminal. Never written to disk. Never logged.
//
// Idempotent: removes the existing key in the target scope before adding,
// so re-running just overwrites.

import { spawnSync } from 'node:child_process';
import readline from 'node:readline';
import { Writable } from 'node:stream';

// ---------- prompt helpers ----------

function maskedPrompt(question) {
  return new Promise((resolve) => {
    const muted = new Writable({
      write(chunk, _enc, cb) {
        // Echo the question prefix once, then suppress everything else
        // so the secret never appears on screen.
        cb();
      },
    });
    const rl = readline.createInterface({
      input: process.stdin,
      output: muted,
      terminal: true,
    });
    process.stdout.write(question);
    rl.question('', (answer) => {
      rl.close();
      process.stdout.write('\n');
      resolve(answer.trim());
    });
  });
}

function plainPrompt(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ---------- vercel CLI ----------

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
    const stderr = (result.stderr || '').replace(value, '<REDACTED>');
    throw new Error(`vercel env add ${key} ${target} failed:\n${stderr}`);
  }
  return true;
}

// ---------- secret slots ----------

const LIVE_SLOTS = [
  {
    name: 'STRIPE_SECRET_KEY',
    label: 'Live secret key',
    prefix: 'sk_live_',
    target: 'production',
    public: false,
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    label: 'Live publishable key',
    prefix: 'pk_live_',
    target: 'production',
    public: true,
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    label: 'Live webhook signing secret',
    prefix: 'whsec_',
    target: 'production',
    public: false,
  },
];

const TEST_SLOTS = [
  {
    name: 'STRIPE_SECRET_KEY',
    label: 'Test secret key',
    prefix: 'sk_test_',
    target: 'preview',
    public: false,
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    label: 'Test publishable key',
    prefix: 'pk_test_',
    target: 'preview',
    public: true,
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    label: 'Test webhook signing secret',
    prefix: 'whsec_',
    target: 'preview',
    public: false,
  },
];

// ---------- collect ----------

async function collectSlot(slot) {
  while (true) {
    const ask = slot.public
      ? `  ${slot.label} (${slot.prefix}...): `
      : `  ${slot.label} (${slot.prefix}..., HIDDEN): `;
    const value = slot.public ? await plainPrompt(ask) : await maskedPrompt(ask);

    if (!value) {
      console.log('  (skipped — leaving existing value in place)');
      return null;
    }
    if (!value.startsWith(slot.prefix)) {
      console.log(
        `  ❌ Expected prefix "${slot.prefix}" but got "${value.slice(0, 8)}...". Try again or press Enter to skip.`,
      );
      continue;
    }
    return value;
  }
}

// ---------- main ----------

async function main() {
  console.log('Stripe → Vercel env sync');
  console.log('Account: Disaster Recovery Qld (acct_1GNs4CC8kkd3m9ZX)\n');

  const proceed = await plainPrompt(
    'This will REPLACE existing Stripe keys in Vercel. Continue? (y/N): ',
  );
  if (proceed.toLowerCase() !== 'y') {
    console.log('Aborted.');
    process.exit(0);
  }

  console.log('\n=== LIVE keys (Production scope) ===');
  console.log('Press Enter at any prompt to skip that key (leaves existing in place).');
  const liveValues = {};
  for (const slot of LIVE_SLOTS) {
    liveValues[slot.name] = await collectSlot(slot);
  }

  console.log('\n=== TEST keys (Preview scope — DR-509) ===');
  console.log('Press Enter at any prompt to skip.');
  const testValues = {};
  for (const slot of TEST_SLOTS) {
    testValues[slot.name] = await collectSlot(slot);
  }

  console.log('\n=== Pushing to Vercel ===\n');

  for (const slot of LIVE_SLOTS) {
    const value = liveValues[slot.name];
    if (!value) {
      console.log(`  [skip] ${slot.name} → ${slot.target}`);
      continue;
    }
    process.stdout.write(`  removing existing ${slot.name} → ${slot.target}...`);
    removeKey(slot.name, slot.target);
    process.stdout.write(' done\n');
    process.stdout.write(`  adding new ${slot.name} → ${slot.target}...`);
    addKey(slot.name, slot.target, value);
    process.stdout.write(' done\n');
  }

  for (const slot of TEST_SLOTS) {
    const value = testValues[slot.name];
    if (!value) {
      console.log(`  [skip] ${slot.name} → ${slot.target}`);
      continue;
    }
    process.stdout.write(`  removing existing ${slot.name} → ${slot.target}...`);
    removeKey(slot.name, slot.target);
    process.stdout.write(' done\n');
    process.stdout.write(`  adding new ${slot.name} → ${slot.target}...`);
    addKey(slot.name, slot.target, value);
    process.stdout.write(' done\n');
  }

  console.log('\n✅ Stripe env vars synced.\n');
  console.log('Trigger a redeploy to pick them up:');
  console.log('  vercel --prod                # production with new live keys');
  console.log('  (preview deploys auto-pick test keys on next push)\n');
  console.log(
    'NOTE: The 13 STRIPE_*_PRICE_ID values are tied to the specific Stripe',
  );
  console.log(
    '  account that owns the Products/Prices. If they 404 against the new',
  );
  console.log(
    '  account (acct_1GNs4CC8kkd3m9ZX), recreate Products in this account',
  );
  console.log('  and rerun this script with the new price IDs.');
}

main().catch((err) => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
