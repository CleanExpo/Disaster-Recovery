'use client';

import { CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUploadSlot } from './FileUploadSlot';
import { Section } from './Section';
import { AUSTRALIAN_STATES, type Step0SectionProps } from './types';

export function LicenceSection({ control }: Step0SectionProps) {
  const { data, set, onError } = control;

  const satisfied =
    data.driversLicenceFrontFileName.length > 0 &&
    data.driversLicenceBackFileName.length > 0 &&
    data.driversLicenceNumber.trim().length > 0 &&
    data.driversLicenceState.length > 0;

  return (
    <Section
      number={6}
      title="Driver's Licence — Identity Verification"
      subtitle="Front and back of a current Australian driver's licence held by the person completing this application. Used to verify identity against business registration details."
      satisfied={satisfied}
      icon={<CreditCard className="h-5 w-5 text-blue-400" />}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <FileUploadSlot
          label="Licence — Front"
          hint="Shows name, date of birth, licence number"
          fileName={data.driversLicenceFrontFileName}
          onFileSelected={(name, url) => {
            set('driversLicenceFrontFileName', name);
            set('driversLicenceFrontDataUrl', url);
          }}
          onFileRemoved={() => {
            set('driversLicenceFrontFileName', '');
            set('driversLicenceFrontDataUrl', '');
          }}
          onError={onError}
        />

        <FileUploadSlot
          label="Licence — Back"
          hint="Shows address and endorsements"
          fileName={data.driversLicenceBackFileName}
          onFileSelected={(name, url) => {
            set('driversLicenceBackFileName', name);
            set('driversLicenceBackDataUrl', url);
          }}
          onFileRemoved={() => {
            set('driversLicenceBackFileName', '');
            set('driversLicenceBackDataUrl', '');
          }}
          onError={onError}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">Licence Number</Label>
          <Input
            placeholder="As it appears on the licence"
            value={data.driversLicenceNumber}
            onChange={(e) => set('driversLicenceNumber', e.target.value)}
            className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">Issuing State / Territory</Label>
          <select
            value={data.driversLicenceState}
            onChange={(e) => set('driversLicenceState', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-700/60 border border-slate-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select state...</option>
            {AUSTRALIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Section>
  );
}
