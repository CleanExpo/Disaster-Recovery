import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cairns Cyclone Recovery | Disaster Recovery',
  description: 'Professional cairns cyclone recovery services in Queensland. 24/7 emergency response for tropical damage, FNQ restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/cairns-cyclone-damage',
  },
};

export default function CairnsCycloneRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-cyclone-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Cairns Cyclone Recovery',
        subtitle: 'Professional cairns cyclone recovery services in Queensland. 24/7 emergency response for tropical damage, FNQ restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-cyclone-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Cairns Cyclone Recovery' },
      ]}
    />
  );
}
