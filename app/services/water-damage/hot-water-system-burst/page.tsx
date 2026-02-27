import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Hot Water System Burst Damage | Disaster Recovery',
  description: 'Professional hot water system burst damage services in Queensland. 24/7 emergency response for hot water tank leak, heater flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/hot-water-system-burst',
  },
};

export default function HotWaterSystemBurstDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Hot Water System Burst Damage',
        subtitle: 'Professional hot water system burst damage services in Queensland. 24/7 emergency response for hot water tank leak, heater flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Hot Water System Burst Damage' },
      ]}
    />
  );
}
