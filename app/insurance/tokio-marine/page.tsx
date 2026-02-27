import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Tokio Marine Insurance Claims | Commercial Property Restoration',
  description: 'IICRC-certified restoration for Tokio Marine insurance claims. Commercial property, liability, and industrial claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/tokio-marine' },
};

export default function TokioMarinePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Tokio Marine Insurance Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Tokio Marine Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Tokio Marine', insurerSlug: 'tokio-marine', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
