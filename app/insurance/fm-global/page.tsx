import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'FM Global Insurance Claims | Industrial & Manufacturing Restoration',
  description: 'IICRC-certified restoration for FM Global insurance claims. Industrial property, manufacturing facilities, and engineering loss documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/fm-global' },
};

export default function FMGlobalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'FM Global Insurance Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'FM Global Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'FM Global', insurerSlug: 'fm-global', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
