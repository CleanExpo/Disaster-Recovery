import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getAviationInsuranceSections } from '@/lib/content-sections/aviation-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Global Aerospace Insurance Claims | Aviation Specialist Restoration',
  description: 'IICRC-certified restoration for Global Aerospace insurance claims. Berkshire Hathaway aviation specialist — hangar, terminal, and MRO facility documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/global-aerospace' },
};

export default function GlobalAerospacePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1B2838 0%, #2C3E50 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Global Aerospace Insurance Claims',
        subtitle: 'Aviation & Aerospace Specialist • Full Claims Documentation • CASA Compliance',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Global Aerospace Insurance Claims' },
      ]}
      sections={getAviationInsuranceSections({ insurerName: 'Global Aerospace', insurerSlug: 'global-aerospace' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
