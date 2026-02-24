'use client';

import Link from 'next/link';
import { AgLegalPageTemplate } from '@/components/antigravity';

export default function SoftwareLicenseAgreementsPage() {
  return (
    <AgLegalPageTemplate
      title="Software Licence Agreements"
      category="Software Licence"
      description="Legal documents and agreements for software licence"
    />
  );
}
