import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Elders Insurance Claims | Regional & Rural Property Restoration',
  description: 'IICRC-certified restoration for Elders Insurance claims. Regional and rural property specialist — full claims documentation for farm, home, and commercial property damage.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/elders-insurance' },
};

export default function EldersInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Elders Insurance Claims',
        subtitle: 'Regional & Rural Specialist • Farm & Commercial Property • Full Claims Documentation',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Elders Insurance Claims' },
      ]}
      sections={getInsuranceSections({ insurerName: 'Elders Insurance', insurerSlug: 'elders-insurance' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
