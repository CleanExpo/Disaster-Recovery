import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Restaurant Water Damage | Disaster Recovery',
  description: 'Professional restaurant water damage services in Queensland. 24/7 emergency response for kitchen flooding, hospitality water.',
};

export default function RestaurantWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Restaurant Water Damage',
        subtitle: 'Professional restaurant water damage services in Queensland. 24/7 emergency response for kitchen flooding, hospitality water.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Restaurant Water Damage' },
      ]}
    />
  );
}
