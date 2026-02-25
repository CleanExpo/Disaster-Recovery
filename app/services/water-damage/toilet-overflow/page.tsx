import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Toilet Overflow Cleanup | Disaster Recovery',
  description: 'Professional toilet overflow cleanup services in Queensland. 24/7 emergency response for toilet flooding, bathroom water damage.',
};

export default function ToiletOverflowCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Toilet Overflow Cleanup',
        subtitle: 'Professional toilet overflow cleanup services in Queensland. 24/7 emergency response for toilet flooding, bathroom water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Toilet Overflow Cleanup' },
      ]}
    />
  );
}
