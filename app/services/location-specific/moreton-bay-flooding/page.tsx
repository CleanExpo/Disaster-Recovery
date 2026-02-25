import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Moreton Bay Flood Services | Disaster Recovery',
  description: 'Professional moreton bay flood services services in Queensland. 24/7 emergency response for northern flooding, bay area.',
};

export default function MoretonBayFloodServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Moreton Bay Flood Services',
        subtitle: 'Professional moreton bay flood services services in Queensland. 24/7 emergency response for northern flooding, bay area.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Moreton Bay Flood Services' },
      ]}
    />
  );
}
