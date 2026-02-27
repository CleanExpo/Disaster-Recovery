import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bedroom Mould Remediation | Disaster Recovery',
  description: 'Professional bedroom mould remediation services in Queensland. 24/7 emergency response for sleeping area mould, health risks.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/bedroom-mould',
  },
};

export default function BedroomMouldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Bedroom Mould Remediation',
        subtitle: 'Professional bedroom mould remediation services in Queensland. 24/7 emergency response for sleeping area mould, health risks.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Bedroom Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bedroom Mould Remediation', parentCategory: 'Mould Remediation', context: 'bedroom mould removal and health risks' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
