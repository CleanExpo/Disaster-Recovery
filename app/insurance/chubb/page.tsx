import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Chubb Insurance Claims | Commercial & Industrial Restoration',
  description: 'IICRC-certified restoration for Chubb commercial and industrial insurance claims. Property, liability, and engineering risk claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/chubb' },
};

export default function ChubbPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Chubb Insurance Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Chubb Insurance Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Chubb', insurerSlug: 'chubb', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
