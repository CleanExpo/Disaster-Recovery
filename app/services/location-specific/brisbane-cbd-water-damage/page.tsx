import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Brisbane CBD Water Damage | Disaster Recovery',
  description: 'Professional brisbane cbd water damage services in Queensland. 24/7 emergency response for city flooding, downtown Brisbane.',
};

export default function BrisbaneCBDWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Brisbane CBD Water Damage',
        subtitle: 'Professional brisbane cbd water damage services in Queensland. 24/7 emergency response for city flooding, downtown Brisbane.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Brisbane CBD Water Damage' },
      ]}
    />
  );
}
