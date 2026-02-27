import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'AIG Insurance Claims | Industrial & Aerospace Restoration',
  description: 'IICRC-certified restoration for AIG industrial and commercial insurance claims. Large-scale property damage, aerospace, and complex risk documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/aig' },
};

export default function AIGPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'AIG Insurance Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'AIG Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'AIG', insurerSlug: 'aig', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
