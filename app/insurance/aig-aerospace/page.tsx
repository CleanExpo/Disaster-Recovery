import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getAviationInsuranceSections } from '@/lib/content-sections/aviation-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'AIG Aerospace Insurance Claims | Global Aerospace Restoration',
  description: 'IICRC-certified restoration for AIG Aerospace insurance claims. Global aerospace leader — hangar, MRO, and terminal facility damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/aig-aerospace' },
};

export default function AIGAerospacePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1B2838 0%, #2C3E50 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'AIG Aerospace Insurance Claims',
        subtitle: 'Aviation & Aerospace Specialist • Full Claims Documentation • CASA Compliance',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'AIG Aerospace Insurance Claims' },
      ]}
      sections={getAviationInsuranceSections({ insurerName: 'AIG Aerospace', insurerSlug: 'aig-aerospace' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
