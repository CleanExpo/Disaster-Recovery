import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'NTI Insurance Claims | Transport & Marine Restoration',
  description: 'IICRC-certified restoration for National Transport Insurance (NTI) claims. Specialist transport, cargo, and marine damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/nti' },
};

export default function NTIInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'NTI Insurance Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'NTI Insurance Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: 'NTI', insurerSlug: 'nti' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
