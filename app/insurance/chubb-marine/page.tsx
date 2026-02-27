import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Chubb Marine Insurance Claims | Maritime Restoration Provider',
  description: 'IICRC-certified restoration for Chubb Marine insurance claims. Ship builders, freight forwarders, and maritime facility damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/chubb-marine' },
};

export default function ChubbMarinePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Chubb Marine Insurance Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Chubb Marine Insurance Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: 'Chubb Marine', insurerSlug: 'chubb-marine' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
