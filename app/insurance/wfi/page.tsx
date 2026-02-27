import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'WFI Insurance Claims | Rural & Commercial Restoration',
  description: 'IICRC-certified restoration for WFI insurance claims. Rural property, farm buildings, and commercial claims documentation. IAG brand.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/wfi' },
};

export default function WFIPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'WFI Insurance Claims',
        subtitle: 'Commercial Insurance • Full Claims Documentation • Flexible Payment Options',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'WFI Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'WFI', insurerSlug: 'wfi', tier: 'medium-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
