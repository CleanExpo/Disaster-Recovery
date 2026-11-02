/**
 * Guard: no two source modules in one folder may share a name that differs
 * only by letter case or extension (e.g. `Button.jsx` next to `button.tsx`).
 *
 * On macOS (case-insensitive file system) `@/components/ui/button` resolved
 * to the legacy `Button.jsx` default export instead of `button.tsx`, so every
 * test rendering the claim form crashed locally while Linux CI passed
 * (found 02/11/2026). Keep module names unique per folder, ignoring case.
 */
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOTS = ['src', 'app', 'components', 'lib'];
const SOURCE = /\.(ts|tsx|js|jsx|mjs|cjs)$/;
const SKIP = new Set(['node_modules', '.next', '.git']);

function collisions(dir: string, found: string[]): void {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  const byKey = new Map<string, string[]>();
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name)) collisions(path.join(dir, entry.name), found);
      continue;
    }
    if (!SOURCE.test(entry.name) || /\.(test|spec|d)\./.test(entry.name)) continue;
    const key = entry.name.replace(SOURCE, '').toLowerCase();
    byKey.set(key, [...(byKey.get(key) ?? []), entry.name]);
  }
  for (const names of byKey.values()) {
    if (names.length > 1) found.push(`${dir}: ${names.sort().join(', ')}`);
  }
}

describe('module names', () => {
  it('are unique per folder ignoring case and extension', () => {
    const found: string[] = [];
    for (const root of ROOTS) collisions(path.resolve(process.cwd(), root), found);
    expect(found).toEqual([]);
  });
});
