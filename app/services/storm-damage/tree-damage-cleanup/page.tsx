import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Fallen Tree Damage Cleanup | Disaster Recovery',
  description: 'Professional fallen tree damage cleanup services in Queensland. 24/7 emergency response for tree removal, storm tree damage.',
};

export default function FallenTreeDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Fallen Tree Damage Cleanup',
        subtitle: 'Professional fallen tree damage cleanup services in Queensland. 24/7 emergency response for tree removal, storm tree damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Fallen Tree Damage Cleanup' },
      ]}
    />
  );
}
