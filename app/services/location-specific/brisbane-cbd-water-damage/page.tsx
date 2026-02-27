import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Brisbane CBD Water Damage | Disaster Recovery',
  description: 'Professional brisbane cbd water damage services in Queensland. 24/7 emergency response for city flooding, downtown Brisbane.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/brisbane-cbd-water-damage',
  },
};

export default function BrisbaneCBDWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Brisbane CBD Water Damage',
        subtitle: 'Professional brisbane cbd water damage services in Queensland. 24/7 emergency response for city flooding, downtown Brisbane.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Brisbane CBD Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Brisbane CBD Water Damage', parentCategory: 'Location Specific', context: 'CBD and downtown Brisbane water damage and flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
