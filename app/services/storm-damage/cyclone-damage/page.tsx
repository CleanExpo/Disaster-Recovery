import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration | Disaster Recovery',
  description: 'Professional cyclone damage restoration services in Queensland. 24/7 emergency response for tropical cyclone, hurricane damage.',
};

export default function CycloneDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Cyclone Damage Restoration',
        subtitle: 'Professional cyclone damage restoration services in Queensland. 24/7 emergency response for tropical cyclone, hurricane damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Cyclone Damage Restoration' },
      ]}
    />
  );
}
