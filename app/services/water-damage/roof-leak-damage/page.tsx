import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Roof Leak Water Damage | Disaster Recovery',
  description: 'Professional roof leak water damage services in Queensland. 24/7 emergency response for roof leaking, storm water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/roof-leak-damage',
  },
};

export default function RoofLeakWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Roof Leak Water Damage',
        subtitle: 'Professional roof leak water damage services in Queensland. 24/7 emergency response for roof leaking, storm water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Roof Leak Water Damage' },
      ]}
    />
  );
}
