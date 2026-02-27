import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Allianz Marine Insurance Claims | Maritime & Cargo Restoration',
  description: 'IICRC-certified restoration for Allianz Marine insurance claims. All marine operator types — vessel, cargo, and port facility damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/allianz-marine' },
};

export default function AllianzMarinePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Allianz Marine Insurance Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Allianz Marine Insurance Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: 'Allianz Marine', insurerSlug: 'allianz-marine' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
