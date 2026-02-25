import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Logan Water Damage Services | Disaster Recovery',
  description: 'Professional logan water damage services services in Queensland. 24/7 emergency response for Logan flooding, southern Brisbane.',
};

export default function LoganWaterDamageServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Logan Water Damage Services',
        subtitle: 'Professional logan water damage services services in Queensland. 24/7 emergency response for Logan flooding, southern Brisbane.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Logan Water Damage Services' },
      ]}
    />
  );
}
