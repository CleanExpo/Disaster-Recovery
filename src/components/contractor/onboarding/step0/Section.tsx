'use client';

import type { ReactNode } from 'react';
import { ExternalLinkBtn } from './ExternalLinkBtn';
import { RequirementRow } from './RequirementRow';

export interface SectionProps {
  number: number;
  title: string;
  subtitle: string;
  satisfied: boolean;
  links?: { href: string; label: string }[];
  icon?: ReactNode;
  children: ReactNode;
}

export function Section({ number, title, subtitle, satisfied, links, children }: SectionProps) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 space-y-4">
      <RequirementRow satisfied={satisfied}>
        <div className="space-y-0.5">
          <p className="text-white font-semibold text-sm">
            {number}. {title}
          </p>
          <p className="text-slate-400 text-xs">{subtitle}</p>
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {links.map((l) => (
                <ExternalLinkBtn key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          )}
        </div>
      </RequirementRow>

      <div className="pl-8 space-y-3">{children}</div>
    </div>
  );
}
