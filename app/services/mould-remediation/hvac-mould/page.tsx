import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Air Conditioning Mould Removal',
  description: 'Professional air conditioning mould removal services in Queensland. 24/7 emergency response for AC duct mould, HVAC contamination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/hvac-mould',
  },
};

export default function AirConditioningMouldRemovalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Air Conditioning Mould Removal',
        subtitle: 'Professional air conditioning mould removal services in Queensland. 24/7 emergency response for AC duct mould, HVAC contamination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Air Conditioning Mould Removal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Air Conditioning Mould Removal', parentCategory: 'Mould Remediation', context: 'HVAC and air conditioning duct mould removal' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
