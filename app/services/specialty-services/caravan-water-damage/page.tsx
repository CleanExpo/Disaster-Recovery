import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Caravan Water Damage',
  description: 'Professional caravan water damage services in Queensland. 24/7 emergency response for RV flooding, mobile home water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/caravan-water-damage',
  },
};

export default function CaravanWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Caravan Water Damage',
        subtitle: 'Professional caravan water damage services in Queensland. 24/7 emergency response for RV flooding, mobile home water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Caravan Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Caravan Water Damage', parentCategory: 'Specialty Services', context: 'RV and mobile home water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
