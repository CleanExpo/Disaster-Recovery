import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// DR-984: a crawler that matches a named group ignores the "*" group, so every
// named group must repeat the private-path Disallow lines itself.
const text = readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8');

type Group = { agents: string[]; lines: string[] };

function parseGroups(src: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let lastWasAgent = false;
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (/^user-agent:/i.test(line)) {
      const agent = line.slice(line.indexOf(':') + 1).trim();
      if (current && lastWasAgent) current.agents.push(agent);
      else {
        current = { agents: [agent], lines: [] };
        groups.push(current);
      }
      lastWasAgent = true;
    } else {
      current?.lines.push(line);
      lastWasAgent = false;
    }
  }
  return groups;
}

const EXPECTED_NAMED = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-Web',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'cohere-ai',
  'Bingbot',
];

describe('public/robots.txt', () => {
  const groups = parseGroups(text);
  const star = groups.find((g) => g.agents.includes('*'));
  const named = groups.filter((g) => !g.agents.includes('*'));

  it('has a "*" group with private-path Disallow lines', () => {
    expect(star).toBeDefined();
    const disallows = star!.lines.filter((l) => l.startsWith('Disallow:'));
    expect(disallows.length).toBeGreaterThan(10);
    expect(disallows).toContain('Disallow: /admin');
    expect(disallows).toContain('Disallow: /portal');
  });

  it('names exactly the expected AI and search crawlers', () => {
    expect(named.map((g) => g.agents.join(','))).toEqual(EXPECTED_NAMED);
  });

  it('repeats every "*" Disallow line in every named group', () => {
    const disallows = star!.lines.filter((l) => l.startsWith('Disallow:'));
    for (const g of named) {
      for (const d of disallows) {
        expect(g.lines, `${g.agents.join(',')} is missing "${d}"`).toContain(d);
      }
    }
  });

  it('never allows a path the "*" group disallows', () => {
    const blocked = star!.lines
      .filter((l) => l.startsWith('Disallow:'))
      .map((l) => l.slice('Disallow:'.length).trim())
      .filter(Boolean);
    for (const g of named) {
      const allows = g.lines
        .filter((l) => l.startsWith('Allow:'))
        .map((l) => l.slice('Allow:'.length).trim());
      for (const a of allows) {
        for (const d of blocked) {
          expect(
            a.startsWith(d),
            `${g.agents.join(',')} allows "${a}" under disallowed "${d}"`,
          ).toBe(false);
        }
      }
    }
  });

  it('lists the sitemap once', () => {
    expect(text.split('\n').filter((l) => /^sitemap:/i.test(l.trim()))).toHaveLength(1);
  });
});
