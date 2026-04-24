'use client';

import { memo } from 'react';
import { ExternalLink } from 'lucide-react';

export const ExternalLinkBtn = memo(function ExternalLinkBtn({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
});
