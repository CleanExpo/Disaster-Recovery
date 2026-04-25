'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Section } from './Section';
import type { Step0SectionProps } from './types';

export function CarsiSection({ control }: Step0SectionProps) {
  const { data, set } = control;
  const satisfied = data.carsiAccountConfirmed && data.carsiMemberNumber.trim().length > 0;

  return (
    <Section
      number={1}
      title="CARSI Account"
      subtitle="Cleaning and Restoration Science Institute — NRPG's primary training partner."
      satisfied={satisfied}
      links={[
        { href: 'https://carsi.com.au/membership/', label: 'Subscribe to CARSI' },
        { href: 'https://carsi.com.au/', label: 'CARSI login' },
      ]}
    >
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={data.carsiAccountConfirmed}
          onChange={(e) => set('carsiAccountConfirmed', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded accent-blue-500"
        />
        <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
          Confirm: the business has an active CARSI account.
        </span>
      </label>

      <div className="space-y-1.5">
        <Label className="text-slate-300 text-xs">CARSI Account / Member Number</Label>
        <Input
          placeholder="e.g. CARSI-12345"
          value={data.carsiMemberNumber}
          onChange={(e) => set('carsiMemberNumber', e.target.value)}
          className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
        />
      </div>
    </Section>
  );
}
