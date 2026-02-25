import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Soot Damage Cleaning | Disaster Recovery',
  description: 'Professional soot damage cleaning services in Queensland. 24/7 emergency response for soot removal, carbon cleaning.',
};

export default function SootDamageCleaningPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Flame className="h-12 w-12" />,
        title: 'Soot Damage Cleaning',
        subtitle: 'Professional soot damage cleaning services in Queensland. 24/7 emergency response for soot removal, carbon cleaning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Soot Damage Cleaning' },
      ]}
    />
  );
}
