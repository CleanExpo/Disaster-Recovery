import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';

// The layout calls next/font at module load; return plain stand-ins.
vi.mock('next/font/google', () => {
  const font = () => ({ className: 'font', variable: '--font', style: {} });
  return { Inter: font, Poppins: font };
});

const root = path.resolve(__dirname, '../../..');

describe('root layout alternates', () => {
  it('root layout declares no language alternates', async () => {
    const { metadata } = await import('../../../app/layout');
    expect(metadata.alternates?.languages).toBeUndefined();
  });

  it('root layout sets no canonical that other pages would inherit', async () => {
    const { metadata } = await import('../../../app/layout');
    expect(metadata.alternates?.canonical).toBeUndefined();
  });

  it('root layout renders no hreflang link tags', () => {
    const source = readFileSync(path.join(root, 'app/layout.tsx'), 'utf8');
    expect(source).not.toMatch(/hrefLang/i);
  });

  it('home page declares its own canonical address', async () => {
    const { metadata } = await import('../../../app/page');
    expect(metadata.alternates?.canonical).toBe('https://disasterrecovery.com.au');
  });
});
