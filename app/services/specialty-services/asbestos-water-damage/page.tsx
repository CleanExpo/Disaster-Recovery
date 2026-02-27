import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Asbestos Water Damage | Disaster Recovery',
  description: 'Professional asbestos water damage services in Queensland. 24/7 emergency response for wet asbestos, contaminated materials.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/asbestos-water-damage',
  },
};

export default function AsbestosWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Asbestos Water Damage',
        subtitle: 'Professional asbestos water damage services in Queensland. 24/7 emergency response for wet asbestos, contaminated materials.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Asbestos Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Asbestos Water Damage', parentCategory: 'Specialty Services', context: 'wet asbestos and contaminated material handling' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
