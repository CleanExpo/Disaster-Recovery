import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Ipswich Flood Recovery | Disaster Recovery',
  description: 'Professional ipswich flood recovery services in Queensland. 24/7 emergency response for western flooding, Ipswich restoration.',
};

export default function IpswichFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Ipswich Flood Recovery',
        subtitle: 'Professional ipswich flood recovery services in Queensland. 24/7 emergency response for western flooding, Ipswich restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Ipswich Flood Recovery' },
      ]}
    />
  );
}
