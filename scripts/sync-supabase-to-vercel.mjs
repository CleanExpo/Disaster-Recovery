#!/usr/bin/env node
// Push DATABASE_URL + DIRECT_URL from local .env to Vercel for the
// production + preview environments. Values flow .env → Vercel CLI →
// Vercel API and never touch stdout / chat / shell history.
//
// Usage:
//   node scripts/sync-supabase-to-vercel.mjs
//
// Requires:
//   - vercel CLI installed + authenticated (`vercel whoami`)
//   - .vercel/project.json present (run `vercel link` if missing)
//   - .env with valid DATABASE_URL and DIRECT_URL
//
// Idempotent: removes the existing keys before adding, so re-running
// the script just overwrites.

import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const ENV_PATH = '.env';
const KEYS = ['DATABASE_URL', 'DIRECT_URL'];
const TARGETS = ['production', 'preview']; // skip 'development' (you have .env locally)

function parseEnv(path) {
  const raw = readFileSync(path, 'utf8');
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    // Strip surrounding quotes.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[m[1]] = value;
  }
  return out;
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
  // `vercel env rm KEY ENV --yes` — silent if it doesn't exist.
  const result = vercel(['env', 'rm', key, target, '--yes']);
  // We don't check exit code; if it didn't exist that's fine.
  return result.status === 0 || /does not exist/i.test(result.stderr || '');
}

function addKey(key, target, value) {
  // `vercel env add KEY ENV` reads value from stdin when piped.
  const result = vercel(['env', 'add', key, target], { input: value });
  if (result.status !== 0) {
    // Print stderr but redact any echoed value.
    const stderr = (result.stderr || '').replace(value, '<REDACTED>');
    throw new Error(`vercel env add ${key} ${target} failed:\n${stderr}`);
  }
  return true;
}

function main() {
  console.log('Reading .env...');
  const env = parseEnv(ENV_PATH);

  for (const k of KEYS) {
    if (!env[k]) {
      console.error(`Missing ${k} in .env. Aborting.`);
      process.exit(1);
    }
    console.log(`  ${k}: <set>, ${env[k].length} chars`);
  }
  console.log('');

  for (const target of TARGETS) {
    console.log(`=== ${target} ===`);
    for (const key of KEYS) {
      process.stdout.write(`  removing existing ${key}...`);
      removeKey(key, target);
      process.stdout.write(' done\n');

      process.stdout.write(`  adding new ${key}...`);
      addKey(key, target, env[key]);
      process.stdout.write(' done\n');
    }
    console.log('');
  }

  console.log('Vercel env vars synced.');
  console.log('');
  console.log('Trigger a redeploy to pick them up:');
  console.log('  vercel --prod');
  console.log('Or just push a commit / let the next CI deploy pick up the new env.');
}

main();
