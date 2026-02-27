import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: '360 Underwriting Claims | Marine Cargo & Transit Restoration',
  description: 'IICRC-certified restoration for 360 Underwriting Solutions marine claims. Cargo, transit, and marine property damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/360-underwriting' },
};

export default function ThreeSixtyUnderwritingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: '360 Underwriting Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: '360 Underwriting Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: '360 Underwriting Solutions', insurerSlug: '360-underwriting' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
