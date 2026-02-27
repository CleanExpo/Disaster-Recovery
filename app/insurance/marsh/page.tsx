import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Marsh Insurance Broker Claims | Commercial Restoration Provider',
  description: 'IICRC-certified restoration for Marsh-brokered insurance claims. Full claims documentation for commercial property, liability, and specialty covers.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/marsh' },
};

export default function MarshPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Marsh Insurance Claims',
        subtitle: 'Commercial Insurance • Full Claims Documentation • Flexible Payment Options',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Marsh Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Marsh', insurerSlug: 'marsh', tier: 'medium-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
