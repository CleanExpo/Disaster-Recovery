import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'HDI Global Insurance Claims | Industrial & Engineering Restoration',
  description: 'IICRC-certified restoration for HDI Global insurance claims. Industrial property, engineering liability, and large commercial claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/hdi-global' },
};

export default function HDIGlobalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'HDI Global Insurance Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'HDI Global Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'HDI Global', insurerSlug: 'hdi-global', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
