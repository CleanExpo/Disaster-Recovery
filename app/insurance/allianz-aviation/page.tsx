import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getAviationInsuranceSections } from '@/lib/content-sections/aviation-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Allianz Aviation Insurance Claims | Corporate & Commercial Aviation Restoration',
  description: 'IICRC-certified restoration for Allianz Aviation insurance claims. Corporate aircraft, airlines, and airport facility damage documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/allianz-aviation' },
};

export default function AllianzAviationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1B2838 0%, #2C3E50 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Allianz Aviation Insurance Claims',
        subtitle: 'Aviation & Aerospace Specialist • Full Claims Documentation • CASA Compliance',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Allianz Aviation Insurance Claims' },
      ]}
      sections={getAviationInsuranceSections({ insurerName: 'Allianz Aviation', insurerSlug: 'allianz-aviation' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
