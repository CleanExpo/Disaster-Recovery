import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Pool Leak Property Damage | Disaster Recovery',
  description: 'Professional pool leak property damage services in Queensland. 24/7 emergency response for swimming pool leak, pool water damage.',
};

export default function PoolLeakPropertyDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Pool Leak Property Damage',
        subtitle: 'Professional pool leak property damage services in Queensland. 24/7 emergency response for swimming pool leak, pool water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Pool Leak Property Damage' },
      ]}
    />
  );
}
