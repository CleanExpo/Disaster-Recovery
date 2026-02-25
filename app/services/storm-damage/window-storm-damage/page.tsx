import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Storm Window Damage | Disaster Recovery',
  description: 'Professional storm window damage services in Queensland. 24/7 emergency response for broken windows, glass damage.',
};

export default function StormWindowDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm Window Damage',
        subtitle: 'Professional storm window damage services in Queensland. 24/7 emergency response for broken windows, glass damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Storm Window Damage' },
      ]}
    />
  );
}
