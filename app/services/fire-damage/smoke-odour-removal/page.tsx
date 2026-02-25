import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Smoke Odour Removal Services | Disaster Recovery',
  description: 'Professional smoke odour removal services services in Queensland. 24/7 emergency response for smoke smell, fire odour elimination.',
};

export default function SmokeOdourRemovalServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Smoke Odour Removal Services',
        subtitle: 'Professional smoke odour removal services services in Queensland. 24/7 emergency response for smoke smell, fire odour elimination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Smoke Odour Removal Services' },
      ]}
    />
  );
}
