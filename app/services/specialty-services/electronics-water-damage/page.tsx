import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Electronics Water Damage | Disaster Recovery',
  description: 'Professional electronics water damage services in Queensland. 24/7 emergency response for computer water damage, device recovery.',
};

export default function ElectronicsWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Star className="h-12 w-12" />,
        title: 'Electronics Water Damage',
        subtitle: 'Professional electronics water damage services in Queensland. 24/7 emergency response for computer water damage, device recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Electronics Water Damage' },
      ]}
    />
  );
}
