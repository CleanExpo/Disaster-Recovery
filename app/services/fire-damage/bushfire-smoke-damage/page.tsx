import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Bushfire Smoke Damage | Disaster Recovery',
  description: 'Professional bushfire smoke damage services in Queensland. 24/7 emergency response for wildfire smoke, outdoor fire damage.',
};

export default function BushfireSmokeDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Bushfire Smoke Damage',
        subtitle: 'Professional bushfire smoke damage services in Queensland. 24/7 emergency response for wildfire smoke, outdoor fire damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Bushfire Smoke Damage' },
      ]}
    />
  );
}
