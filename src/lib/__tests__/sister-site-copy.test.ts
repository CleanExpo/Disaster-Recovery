import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Sister-site copy guard.
 *
 * NRPG is the National Restoration Professionals Group (founder-approved logo, 19/10/2026); any
 * other expansion is wrong. CARSI's old WordPress /product/ and /membership URLs 404, so link the
 * current carsi.com.au pages instead (/courses/<slug>, /subscribe).
 *
 * SCAN_ROOT points the guard at another tree (used to prove it fails on the pre-fix code).
 */
const ROOT = process.env.SCAN_ROOT || process.cwd();
const DIRS = ['app', 'src', 'lib', 'components', 'public'];
const TEXT = /\.(tsx?|jsx?|mjs|json|md|mdx|html|hbs|txt|svg)$/;
const SELF = path.join('src', 'lib', '__tests__', 'sister-site-copy.test.ts');

function files(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'node_modules' || e.name === '.next' ? [] : files(p);
    return TEXT.test(e.name) ? [p] : [];
  });
}

function scan(pattern: RegExp): string[] {
  const hits: string[] = [];
  for (const file of DIRS.flatMap((d) => files(path.join(ROOT, d)))) {
    if (path.relative(ROOT, file) === SELF) continue;
    fs.readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        for (const m of line.matchAll(pattern))
          hits.push(`${path.relative(ROOT, file)}:${i + 1}: ${m[0]}`);
      });
  }
  return hits;
}

describe('sister-site copy', () => {
  it('expands NRPG only as National Restoration Professionals Group', () => {
    const expansions = scan(
      /\bNatural Resources Property Group\b|\bNational(?: [A-Z][a-z]+){1,3} (?:Group|Guild)\b/g,
    );
    expect(
      expansions.filter((h) => !h.endsWith(': National Restoration Professionals Group')),
    ).toEqual([]);
  });

  it('links no dead CARSI WordPress /product/ or /membership URL', () => {
    expect(scan(/carsi\.com\.au\/(?:product|membership)\b[^\s'"<)]*/gi)).toEqual([]);
  });
});
