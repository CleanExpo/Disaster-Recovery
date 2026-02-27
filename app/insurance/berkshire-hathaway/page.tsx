import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Berkshire Hathaway (BHSI) Claims | Large Commercial Restoration',
  description: 'IICRC-certified restoration for Berkshire Hathaway Specialty Insurance claims. Large commercial property damage and industrial risk documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/berkshire-hathaway' },
};

export default function BerkshireHathawayPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Berkshire Hathaway (BHSI) Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Berkshire Hathaway (BHSI) Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Berkshire Hathaway Specialty Insurance', insurerSlug: 'berkshire-hathaway', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
