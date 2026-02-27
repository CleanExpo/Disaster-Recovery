import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Sunshine Coast Water Damage | Disaster Recovery',
  description: 'Professional sunshine coast water damage services in Queensland. 24/7 emergency response for coastal damage, beach restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/sunshine-coast-water-damage',
  },
};

export default function SunshineCoastWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Sunshine Coast Water Damage',
        subtitle: 'Professional sunshine coast water damage services in Queensland. 24/7 emergency response for coastal damage, beach restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Sunshine Coast Water Damage' },
      ]}
    />
  );
}
