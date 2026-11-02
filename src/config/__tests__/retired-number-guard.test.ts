/**
 * Keeps the retired DR 1300 number out of everything that ships.
 * planning/ and docs/ keep their historical references on purpose.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Built from parts so this file does not match itself.
const RETIRED = new RegExp(['1300', '309', '361'].join('[^0-9]{0,3}'));

function shippedFiles(): string[] {
  return execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
    .split('\0')
    .filter((file) => /\.(tsx?|jsx?|mjs|cjs|json|html|txt|xml|webmanifest)$/.test(file))
    .filter((file) => !file.startsWith('planning/') && !file.startsWith('docs/'))
    .filter((file) => !file.startsWith('.claude/done/'));
}

function isMissing(file: string): boolean {
  try {
    readFileSync(file);
    return false;
  } catch {
    return true;
  }
}

describe('retired DR 1300 number', () => {
  it('the pattern catches every spelling that has been used', () => {
    for (const parts of [
      ['1300', '309', '361'],
      ['1300', ' 309', ' 361'],
      ['1300', '-309', '-361'],
    ]) {
      expect(RETIRED.test(`tel:${parts.join('')}`)).toBe(true);
    }
    expect(RETIRED.test('1300 363 992')).toBe(false);
  });

  it('the scan actually covers app, src and the service worker', () => {
    const files = shippedFiles();
    expect(files).toContain('app/claim/page.tsx');
    expect(files).toContain('src/config/contact.ts');
    expect(files).toContain('public/service-worker.js');
  });

  it('appears in no shipped file', () => {
    const offenders = shippedFiles().filter(
      (file) => !isMissing(file) && RETIRED.test(readFileSync(file, 'utf8')),
    );
    expect(offenders).toEqual([]);
  });
});
