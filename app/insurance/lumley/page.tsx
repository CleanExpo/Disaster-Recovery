import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Lumley Insurance Claims | Commercial Restoration Provider',
  description: 'IICRC-certified restoration for Lumley insurance claims. Intermediated commercial property and liability claims documentation. IAG brand.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/lumley' },
};

export default function LumleyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Lumley Insurance Claims',
        subtitle: 'Commercial Insurance • Full Claims Documentation • Flexible Payment Options',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Lumley Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Lumley', insurerSlug: 'lumley', tier: 'medium-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
