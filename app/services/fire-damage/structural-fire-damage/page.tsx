import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Structural Fire Damage Repair | Disaster Recovery',
  description: 'Professional structural fire damage repair services in Queensland. 24/7 emergency response for building fire, frame damage.',
};

export default function StructuralFireDamageRepairPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Structural Fire Damage Repair',
        subtitle: 'Professional structural fire damage repair services in Queensland. 24/7 emergency response for building fire, frame damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Structural Fire Damage Repair' },
      ]}
    />
  );
}
