import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'IAG Insurance Claims | Insurance Australia Group Restoration',
  description: 'IICRC-certified restoration for IAG (Insurance Australia Group) claims. Parent of NRMA, CGU, SGIO, WFI, and Lumley — full claims documentation for residential and commercial properties.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/iag' },
};

export default function IAGInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'IAG Insurance Claims',
        subtitle: 'Insurance Australia Group • Parent of NRMA, CGU, SGIO, WFI & Lumley • Full Claims Documentation',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'IAG Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'IAG (Insurance Australia Group)', insurerSlug: 'iag', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
