import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Storm Surge Flood Damage | Disaster Recovery',
  description: 'Professional storm surge flood damage services in Queensland. 24/7 emergency response for coastal flooding, tidal damage.',
};

export default function StormSurgeFloodDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm Surge Flood Damage',
        subtitle: 'Professional storm surge flood damage services in Queensland. 24/7 emergency response for coastal flooding, tidal damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Storm Surge Flood Damage' },
      ]}
    />
  );
}
