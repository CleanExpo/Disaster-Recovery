import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Gallagher Insurance Claims | Mid-Market Commercial Restoration',
  description: 'IICRC-certified restoration for Gallagher-brokered insurance claims. Mid-market commercial property and liability claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/gallagher' },
};

export default function GallagherPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Gallagher Insurance Claims',
        subtitle: 'Commercial Insurance • Full Claims Documentation • Flexible Payment Options',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Gallagher Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Gallagher', insurerSlug: 'gallagher', tier: 'medium-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
