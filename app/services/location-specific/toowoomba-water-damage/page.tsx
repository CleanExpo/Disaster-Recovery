import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Toowoomba Water Damage | Disaster Recovery',
  description: 'Professional toowoomba water damage services in Queensland. 24/7 emergency response for highlands flooding, mountain damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/toowoomba-water-damage',
  },
};

export default function ToowoombaWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Toowoomba Water Damage',
        subtitle: 'Professional toowoomba water damage services in Queensland. 24/7 emergency response for highlands flooding, mountain damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Toowoomba Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Toowoomba Water Damage', parentCategory: 'Location Specific', context: 'highlands and Darling Downs water damage and flood restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
