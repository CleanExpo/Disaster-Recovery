import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Solar Panel Water Damage | Disaster Recovery',
  description: 'Professional solar panel water damage services in Queensland. 24/7 emergency response for solar system, panel flooding.',
};

export default function SolarPanelWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Star className="h-12 w-12" />,
        title: 'Solar Panel Water Damage',
        subtitle: 'Professional solar panel water damage services in Queensland. 24/7 emergency response for solar system, panel flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Solar Panel Water Damage' },
      ]}
    />
  );
}
