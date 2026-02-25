import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Townsville Flood Restoration | Disaster Recovery',
  description: 'Professional townsville flood restoration services in Queensland. 24/7 emergency response for north QLD flooding, tropical recovery.',
};

export default function TownsvilleFloodRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: 'Townsville Flood Restoration',
        subtitle: 'Professional townsville flood restoration services in Queensland. 24/7 emergency response for north QLD flooding, tropical recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Location Specific', href: '/services/location-specific' },
        { label: 'Townsville Flood Restoration' },
      ]}
    />
  );
}
