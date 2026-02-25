import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Garage Fire Restoration | Disaster Recovery',
  description: 'Professional garage fire restoration services in Queensland. 24/7 emergency response for vehicle fire, garage smoke damage.',
};

export default function GarageFireRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Garage Fire Restoration',
        subtitle: 'Professional garage fire restoration services in Queensland. 24/7 emergency response for vehicle fire, garage smoke damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Garage Fire Restoration' },
      ]}
    />
  );
}
