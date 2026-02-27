import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Redlands Storm Damage | Disaster Recovery',
  description: 'Professional redlands storm damage services in Queensland. 24/7 emergency response for bayside damage, island restoration.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/location-specific/redlands-storm-damage',
  },
};

export default function RedlandsStormDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Redlands Storm Damage',
        subtitle: 'Professional redlands storm damage services in Queensland. 24/7 emergency response for bayside damage, island restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Redlands Storm Damage' },
      ]}
    />
  );
}
