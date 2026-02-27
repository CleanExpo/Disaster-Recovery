import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Board Up Services',
  description: 'Professional emergency board up services services across Australia. 24/7 emergency response for security boarding, window boarding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-board-up',
  },
};

export default function EmergencyBoardUpServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Board Up Services',
        subtitle: 'Professional emergency board up services services across Australia. 24/7 emergency response for security boarding, window boarding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Board Up Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Board Up Services', parentCategory: 'Emergency Services', context: 'security boarding and window boarding after damage' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
