import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getCommercialInsuranceSections } from '@/lib/content-sections/commercial-insurance-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Liberty Specialty Markets Claims | Complex Commercial Restoration',
  description: 'IICRC-certified restoration for Liberty Specialty Markets insurance claims. Complex commercial risks, property, and liability claims documentation.',
  alternates: { canonical: 'https://disasterrecovery.com.au/insurance/liberty-specialty' },
};

export default function LibertySpecialtyPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Liberty Specialty Markets Claims',
        subtitle: 'Commercial & Industrial Specialist • Full Claims Documentation • Project Management',
      }}
      cta={{ text: 'Start Your Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Liberty Specialty Markets Claims' },
      ]}
      sections={getCommercialInsuranceSections({ insurerName: 'Liberty Specialty Markets', insurerSlug: 'liberty-specialty', tier: 'heavy-commercial' })}
      relatedPages={getRelatedPages('insurance')}
    />
  );
}
