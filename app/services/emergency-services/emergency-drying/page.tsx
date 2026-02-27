import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Structural Drying',
  description: 'Professional emergency structural drying services across Australia. 24/7 emergency response for rapid drying, moisture removal.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-drying',
  },
};

export default function EmergencyStructuralDryingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Structural Drying',
        subtitle: 'Professional emergency structural drying services across Australia. 24/7 emergency response for rapid drying, moisture removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Structural Drying' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Structural Drying', parentCategory: 'Emergency Services', context: 'rapid structural drying and moisture removal after water damage' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
