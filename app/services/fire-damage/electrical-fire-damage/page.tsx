import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Electrical Fire Damage Cleanup | Disaster Recovery',
  description: 'Professional electrical fire damage cleanup services in Queensland. 24/7 emergency response for wiring fire, electrical burn damage.',
};

export default function ElectricalFireDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Electrical Fire Damage Cleanup',
        subtitle: 'Professional electrical fire damage cleanup services in Queensland. 24/7 emergency response for wiring fire, electrical burn damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Electrical Fire Damage Cleanup' },
      ]}
    />
  );
}
