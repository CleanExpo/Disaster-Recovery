'use client';

import { Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLinkBtn } from './ExternalLinkBtn';
import { Section } from './Section';
import type { Step0SectionProps } from './types';

export function BusinessRegistrationSection({ control }: Step0SectionProps) {
  const { data, set } = control;

  const satisfied =
    data.abn.replace(/\s/g, '').length === 11 &&
    data.abnVerified &&
    data.registeredBusinessName.trim().length > 0 &&
    data.asicVerified;

  return (
    <Section
      number={7}
      title="Business Registration — ABN & ASIC Verification"
      subtitle="Verify the ABN against the Australian Business Register and confirm the business is registered with ASIC. Enter details exactly as they appear in the official registers."
      satisfied={satisfied}
      icon={<Building2 className="h-5 w-5 text-blue-400" />}
      links={[
        {
          href: 'https://abr.business.gov.au/',
          label: 'ABN Lookup — Australian Business Register',
        },
        { href: 'https://connectonline.asic.gov.au/', label: 'ASIC Connect — company search' },
      ]}
    >
      {/* ABN */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-slate-300 text-xs">Australian Business Number (ABN)</Label>
          <ExternalLinkBtn href="https://abr.business.gov.au/" label="Look up ABN" />
        </div>
        <Input
          placeholder="e.g. 51 824 753 556"
          value={data.abn}
          onChange={(e) => {
            set('abn', e.target.value);
            set('abnVerified', false);
          }}
          className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
        />
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.abnVerified}
            onChange={(e) => set('abnVerified', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-500"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            Confirm: the ABN above has been verified on the{' '}
            <a
              href="https://abr.business.gov.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              Australian Business Register
            </a>{' '}
            and is current and active.
          </span>
        </label>
      </div>

      {/* ASIC / ACN */}
      <div className="space-y-2 pt-2 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          <Label className="text-slate-300 text-xs">
            ASIC-Registered Business Name
            <span className="text-slate-500 ml-1">(Pty Ltd or trading name — as registered)</span>
          </Label>
          <ExternalLinkBtn href="https://connectonline.asic.gov.au/" label="Search ASIC Connect" />
        </div>
        <Input
          placeholder="Exact registered name from ASIC"
          value={data.registeredBusinessName}
          onChange={(e) => {
            set('registeredBusinessName', e.target.value);
            set('asicVerified', false);
          }}
          className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
        />

        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">
            ACN (Australian Company Number)
            <span className="text-slate-500 ml-1">— optional, if registered as a company</span>
          </Label>
          <Input
            placeholder="e.g. 691 477 844"
            value={data.acn}
            onChange={(e) => set('acn', e.target.value)}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.asicVerified}
            onChange={(e) => set('asicVerified', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-500"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            Confirm: the business name above has been verified via{' '}
            <a
              href="https://connectonline.asic.gov.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              ASIC Connect
            </a>{' '}
            and the business is currently registered and in good standing.
          </span>
        </label>
      </div>
    </Section>
  );
}
