#!/usr/bin/env tsx
/**
 * Brand-name regression guard.
 *
 * Fails the build if "Disaster Recovery Australia" reappears in
 * operational paths after L10's rebrand to "Disaster Recovery".
 *
 * Run via:
 *   npx tsx scripts/check-brand-name.ts
 *
 * Wired into Husky pre-commit / CI to catch agents reintroducing the
 * old phrase.
 *
 * Historical paths (planning/, docs/history/, docs/proposals/, etc.)
 * are deliberately excluded — see docs/prd/loops/2026-05-01-dr-rename/
 * for the rationale.
 */

import { execSync } from 'node:child_process';

const BANNED_PHRASE = 'Disaster Recovery Australia';

const ALLOWED_PATHS_REGEX = [
  /^planning\//,
  /^docs\/history\//,
  /^docs\/proposals\//,
  /^docs\/competitive-intel\//,
  /^docs\/citation-audit-results-/,
  /^docs\/citation-cleanup\//,
  /^docs\/gbp-audit-/,
  /^docs\/accc-dark-pattern-audit-/,
  /^docs\/ask-maps-strategy-/,
  /^docs\/plans\/2026-02-25-/,
  /^docs\/prd\/loops\/2026-05-01-dr-rename\//, // the rebrand loop itself documents the old phrase
  /^docs\/prd\/loops\/2026-05-01-residual-cleanup\//, // residual-cleanup loop documents the rebrand context
  /^docs\/audits\/b11-ubiquitous-language-resolutions-/, // B11 audit doc explicitly discusses the historical brand-naming ambiguity
  /^scripts\/check-brand-name\.ts$/, // this script defines the banned phrase as a constant
];

function isHistoricalPath(filePath: string): boolean {
  const normalised = filePath.replace(/\\/g, '/');
  return ALLOWED_PATHS_REGEX.some((rx) => rx.test(normalised));
}

interface Violation {
  file: string;
  line: number;
  text: string;
}

function findViolations(): Violation[] {
  // ripgrep is the fastest; fall back to git grep if rg is missing.
  let raw: string;
  try {
    raw = execSync(
      `git grep -n --no-color "${BANNED_PHRASE}" -- "*.ts" "*.tsx" "*.js" "*.jsx" "*.md" "*.mdx" "*.json" "*.html" "*.txt" "*.css" "*.py" "*.toml"`,
      { encoding: 'utf8', cwd: process.cwd() },
    );
  } catch (err) {
    // git grep returns exit 1 when no matches; that's success for us.
    if (
      err &&
      typeof err === 'object' &&
      'status' in err &&
      (err as { status: number }).status === 1
    ) {
      return [];
    }
    throw err;
  }

  return raw
    .split('\n')
    .filter((l) => l.length > 0)
    .map((line) => {
      // Format: path:lineNum:matchedText
      const firstColon = line.indexOf(':');
      const secondColon = line.indexOf(':', firstColon + 1);
      const file = line.slice(0, firstColon);
      const lineNum = Number.parseInt(line.slice(firstColon + 1, secondColon), 10);
      const text = line.slice(secondColon + 1);
      return { file, line: lineNum, text };
    })
    .filter((v) => !isHistoricalPath(v.file));
}

function main(): void {
  const violations = findViolations();

  if (violations.length === 0) {
    console.log(`brand-name guard: no occurrences of "${BANNED_PHRASE}" in operational paths.`);
    return;
  }

  console.error(
    `\nbrand-name guard: ${violations.length} occurrence(s) of "${BANNED_PHRASE}" found in operational paths:\n`,
  );
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}: ${v.text.trim().slice(0, 120)}`);
  }
  console.error(
    `\nThe trading name is "Disaster Recovery" (no "Australia" suffix). See ` +
      `docs/prd/loops/2026-05-01-dr-rename/ for the rebrand context.\n` +
      `If this is a deliberate historical reference, add the file's path prefix to ` +
      `ALLOWED_PATHS_REGEX in scripts/check-brand-name.ts.\n`,
  );
  process.exit(1);
}

main();
