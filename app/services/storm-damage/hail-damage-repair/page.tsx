import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Hail Damage Restoration | Disaster Recovery',
  description: 'Professional hail damage restoration services in Queensland. 24/7 emergency response for hailstorm damage, ice damage repair.',
};

export default function HailDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Hail Damage Restoration',
        subtitle: 'Professional hail damage restoration services in Queensland. 24/7 emergency response for hailstorm damage, ice damage repair.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Hail Damage Restoration' },
      ]}
    />
  );
}
