import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Restaurant Water Damage | Disaster Recovery',
  description: 'Professional restaurant water damage services across Australia. 24/7 emergency response for kitchen flooding, hospitality water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/restaurant-water-damage',
  },
};

export default function RestaurantWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Restaurant Water Damage',
        subtitle: 'Professional restaurant water damage services across Australia. 24/7 emergency response for kitchen flooding, hospitality water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Restaurant Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Restaurant Water Damage', parentCategory: 'Commercial Services', context: 'kitchen flooding and hospitality water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
