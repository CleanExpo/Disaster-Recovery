import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Concrete Water Damage Restoration | Disaster Recovery',
  description: 'Professional concrete water damage restoration services in Queensland. 24/7 emergency response for concrete flooding, slab moisture.',
};

export default function ConcreteWaterDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Concrete Water Damage Restoration',
        subtitle: 'Professional concrete water damage restoration services in Queensland. 24/7 emergency response for concrete flooding, slab moisture.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Concrete Water Damage Restoration' },
      ]}
    />
  );
}
