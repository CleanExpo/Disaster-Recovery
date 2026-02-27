import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bathroom Mould Remediation',
  description: 'Professional bathroom mould remediation services in Queensland. 24/7 emergency response for shower mould, bathroom ceiling mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/bathroom-mould',
  },
};

export default function BathroomMouldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Bathroom Mould Remediation',
        subtitle: 'Professional bathroom mould remediation services in Queensland. 24/7 emergency response for shower mould, bathroom ceiling mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Bathroom Mould Remediation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bathroom Mould Remediation', parentCategory: 'Mould Remediation', context: 'bathroom mould removal and prevention' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
