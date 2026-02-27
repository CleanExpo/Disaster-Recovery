import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Coverforce Insurance Claims | Marine Industry Broker Restoration',
  description: 'IICRC-certified restoration for Coverforce-brokered marine insurance claims. Full claims documentation for marine, transport, and cargo covers.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/coverforce' },
};

export default function CoverforceInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Coverforce Insurance Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Coverforce Insurance Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: 'Coverforce', insurerSlug: 'coverforce' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
