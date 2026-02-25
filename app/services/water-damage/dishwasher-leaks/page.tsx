import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Dishwasher Leak Water Damage | Disaster Recovery',
  description: 'Professional dishwasher leak water damage services in Queensland. 24/7 emergency response for dishwasher flooding, kitchen water damage.',
};

export default function DishwasherLeakWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Dishwasher Leak Water Damage',
        subtitle: 'Professional dishwasher leak water damage services in Queensland. 24/7 emergency response for dishwasher flooding, kitchen water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Dishwasher Leak Water Damage' },
      ]}
    />
  );
}
