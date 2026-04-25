'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUploadSlot } from './FileUploadSlot';
import { Section } from './Section';
import type { Step0SectionProps } from './types';

export function IicrcSection({ control }: Step0SectionProps) {
  const { data, set, onError } = control;

  const satisfied =
    data.iicrcCertNumber.trim().length > 0 && data.iicrcCertCardFrontFileName.length > 0;

  return (
    <Section
      number={3}
      title="IICRC Certification Card"
      subtitle="Current IICRC certification registered to an active business member with 2+ years experience. Upload a photo of the physical card."
      satisfied={satisfied}
      links={[
        { href: 'https://iicrccert.org/', label: 'Verify certification at iicrccert.org' },
        { href: 'https://iicrc.org/iicrcgloballocator/', label: 'IICRC Global Locator' },
        { href: 'https://iicrc.org/ausfaqs/', label: 'IICRC Australia FAQs' },
      ]}
    >
      <div className="space-y-1.5">
        <Label className="text-slate-300 text-xs">IICRC Certification Number</Label>
        <Input
          placeholder="e.g. 123456789"
          value={data.iicrcCertNumber}
          onChange={(e) => set('iicrcCertNumber', e.target.value)}
          className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 text-sm"
        />
      </div>

      <FileUploadSlot
        label="IICRC Card — Front"
        hint="Must show name, certification type, and expiry"
        fileName={data.iicrcCertCardFrontFileName}
        onFileSelected={(name, url) => {
          set('iicrcCertCardFrontFileName', name);
          set('iicrcCertCardFrontDataUrl', url);
        }}
        onFileRemoved={() => {
          set('iicrcCertCardFrontFileName', '');
          set('iicrcCertCardFrontDataUrl', '');
        }}
        onError={onError}
      />
    </Section>
  );
}
