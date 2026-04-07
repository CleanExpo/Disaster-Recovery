'use client';

import type { ReactNode } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { AUTHORITATIVE_SOURCES } from '@/lib/knowledge-authority';

interface CitationTooltipProps {
  /** Source name, e.g. "IICRC S500:2025" */
  source: string;
  /** Credibility score 1-10 */
  credibility: number;
  /** Link to source */
  url?: string;
  /** The cited inline text */
  children: ReactNode;
}

function credibilityColour(score: number): string {
  if (score >= 9) return '#16a34a';  // green-600
  if (score >= 7) return '#2563eb';  // blue-600
  return '#6b7280';                  // grey-500
}

function credibilityLabel(score: number): string {
  if (score >= 9) return 'Highly Authoritative';
  if (score >= 7) return 'Authoritative';
  return 'Supplementary';
}

export function CitationTooltip({ source, credibility, url, children }: CitationTooltipProps) {
  const colour = credibilityColour(credibility);

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <span style={{ cursor: 'help', borderBottom: '1px dotted rgba(0,0,0,0.3)' }}>
          {children}
          <sup
            style={{
              fontSize: '0.65em',
              color: colour,
              fontWeight: 700,
              marginLeft: '1px',
            }}
            aria-label={`Source: ${source}`}
          >
            [{credibility}]
          </sup>
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="w-72"
        style={{ fontSize: '0.875rem', lineHeight: 1.5 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colour,
              flexShrink: 0,
            }}
          />
          <strong style={{ fontSize: '0.875rem' }}>{source}</strong>
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: colour,
            background: `${colour}15`,
            marginBottom: '0.5rem',
          }}
        >
          {credibilityLabel(credibility)} — {credibility}/10
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: '#2563eb',
              textDecoration: 'underline',
              marginTop: '0.25rem',
              wordBreak: 'break-all',
            }}
          >
            View Source
          </a>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
