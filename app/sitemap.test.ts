import { describe, expect, it } from 'vitest';
import sitemap from './sitemap';

describe('app sitemap', () => {
  const urls = sitemap().map((entry) => entry.url);

  it('excludes redirected legacy event URLs', () => {
    expect(urls).not.toContain('https://disasterrecovery.com.au/cyclone-alfred-queensland-2026');
    expect(urls).toContain('https://disasterrecovery.com.au/events/cyclone-alfred-fnq-2026');
  });

  it('publishes the canonical business hub route instead of its redirect alias', () => {
    expect(urls).toContain('https://disasterrecovery.com.au/for-business');
    expect(urls).not.toContain('https://disasterrecovery.com.au/for');
  });
});
