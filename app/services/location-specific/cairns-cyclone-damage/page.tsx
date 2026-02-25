import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cairns Cyclone Recovery | Disaster Recovery',
  description: 'Professional cairns cyclone recovery services in Queensland. 24/7 emergency response for tropical damage, FNQ restoration.',
};

export default function CairnsCycloneRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Cairns Cyclone Recovery',
        subtitle: 'Professional cairns cyclone recovery services in Queensland. 24/7 emergency response for tropical damage, FNQ restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Cairns Cyclone Recovery' },
      ]}
    />
  );
}
