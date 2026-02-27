import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getMarineInsuranceSections } from '@/lib/content-sections/marine-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'NM Insurance Claims | Marine Underwriting Restoration',
  description: 'IICRC-certified restoration for NM Insurance marine claims. Zurich-backed marine underwriter — hull, cargo, and marine liability documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/nm-insurance' },
};

export default function NMInsurancePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #003366 0%, #006994 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'NM Insurance Claims',
        subtitle: 'Marine & Transport Specialist • Full Claims Documentation • Vessel to Port',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'NM Insurance Claims' },
      ]}
      sections={getMarineInsuranceSections({ insurerName: 'NM Insurance', insurerSlug: 'nm-insurance' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
