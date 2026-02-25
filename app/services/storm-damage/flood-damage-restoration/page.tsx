import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Flash Flood Damage Recovery | Disaster Recovery',
  description: 'Professional flash flood damage recovery services in Queensland. 24/7 emergency response for flood cleanup, storm flooding.',
};

export default function FlashFloodDamageRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Flash Flood Damage Recovery',
        subtitle: 'Professional flash flood damage recovery services in Queensland. 24/7 emergency response for flood cleanup, storm flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Flash Flood Damage Recovery' },
      ]}
    />
  );
}
