import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Epsilon Insurance Claims | Marine Liability Restoration',
  description: 'IICRC-certified restoration for Epsilon Insurance marine claims. Marine liability specialist — vessel, port, and maritime claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/epsilon-insurance' },
};

export default function EpsilonInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Epsilon Insurance Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Epsilon Insurance Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: 'Epsilon Insurance', insurerSlug: 'epsilon-insurance' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
