import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Factory Flood Recovery',
  description: 'Professional factory flood recovery services across Australia. 24/7 emergency response for manufacturing plant, industrial water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/factory-water-damage',
  },
};

export default function FactoryFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Factory Flood Recovery',
        subtitle: 'Professional factory flood recovery services across Australia. 24/7 emergency response for manufacturing plant, industrial water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Factory Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Factory Flood Recovery', parentCategory: 'Commercial Services', context: 'manufacturing plant and industrial water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
