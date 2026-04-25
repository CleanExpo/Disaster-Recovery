#!/usr/bin/env node
// One-shot fixer for Supabase pooler DATABASE_URL + DIRECT_URL in .env.
//
// Prompts for the database password interactively (hidden as you type),
// URL-encodes any special characters, and rewrites both lines in .env.
//
// Usage:
//   node scripts/fix-supabase-env.mjs
//
// The password never appears in:
//   - this script's source
//   - the chat transcript
//   - shell history (because we use stdin, not args)
//   - logs (we never echo the value)
//
// After this runs successfully, delete `.env.bak-2026-05-01` if you want.

import { createInterface } from 'node:readline';
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';

const PROJECT_REF = 'lccqasmurmsisnnjqqmr';
const POOLER_HOST = 'aws-1-ap-southeast-2.pooler.supabase.com';
const ENV_PATH = '.env';

function promptHidden(prompt) {
  return new Promise((resolve) => {
    const rl = createInterface({ input, output, terminal: true });
    // Hide echo by overriding _writeToOutput.
    rl._writeToOutput = (s) => {
      // Echo the prompt itself, but replace typed chars with '*'.
      if (s.includes(prompt)) {
        output.write(s);
      } else {
        // Each keypress sends a single char; show '*' instead.
        output.write('*');
      }
    };
    rl.question(prompt, (answer) => {
      rl.close();
      output.write('\n');
      resolve(answer);
    });
  });
}

function buildUrls(password) {
  const encoded = encodeURIComponent(password);
  const username = `postgres.${PROJECT_REF}`;
  return {
    database: `postgresql://${username}:${encoded}@${POOLER_HOST}:6543/postgres?pgbouncer=true`,
    direct: `postgresql://${username}:${encoded}@${POOLER_HOST}:5432/postgres`,
  };
}

function rewriteEnv(databaseUrl, directUrl) {
  copyFileSync(ENV_PATH, `${ENV_PATH}.bak-fixsupabase-${Date.now()}`);
  let content = readFileSync(ENV_PATH, 'utf8');

  // Strip every existing DATABASE_URL and DIRECT_URL line.
  content = content
    .split(/\r?\n/)
    .filter((line) => !/^\s*DATABASE_URL\s*=/.test(line) && !/^\s*DIRECT_URL\s*=/.test(line))
    .join('\n');

  // Trim any trailing whitespace, then append the new pair.
  content = content.replace(/\s+$/, '\n');
  content += `\n# Supabase pooler — auto-set by scripts/fix-supabase-env.mjs\n`;
  content += `DATABASE_URL="${databaseUrl}"\n`;
  content += `DIRECT_URL="${directUrl}"\n`;

  writeFileSync(ENV_PATH, content, 'utf8');
}

async function main() {
  console.log('Supabase pooler URL fixer.');
  console.log(`  Project ref: ${PROJECT_REF}`);
  console.log(`  Pooler host: ${POOLER_HOST}`);
  console.log('  Username   : postgres.' + PROJECT_REF);
  console.log('');
  console.log('Paste the database password and press Enter.');
  console.log('(Each character will display as * — the password is not echoed.)');
  console.log('');

  const password = await promptHidden('Password: ');

  if (!password || password.length < 4) {
    console.error('No password entered. Aborting.');
    process.exit(1);
  }

  const { database, direct } = buildUrls(password);

  // Sanity-check URL length (typical Supabase password makes URL ~150 chars).
  console.log('');
  console.log('Built URLs:');
  console.log('  DATABASE_URL length:', database.length, 'chars');
  console.log('  DIRECT_URL   length:', direct.length, 'chars');
  console.log('  Both use username  : postgres.' + PROJECT_REF);
  console.log('  Both use host      :', POOLER_HOST);
  console.log('  Password URL-encoded:', password === encodeURIComponent(password) ? 'no encoding needed' : 'YES (special chars escaped)');
  console.log('');

  rewriteEnv(database, direct);
  console.log('Updated .env. Backup saved with timestamp prefix `.env.bak-fixsupabase-`.');
  console.log('');
  console.log('Now run: npx prisma migrate deploy');
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
