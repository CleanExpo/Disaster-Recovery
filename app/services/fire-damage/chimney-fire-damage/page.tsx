import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Chimney Fire Damage Cleanup | Disaster Recovery',
  description: 'Professional chimney fire damage cleanup services in Queensland. 24/7 emergency response for flue fire, chimney restoration.',
};

export default function ChimneyFireDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Chimney Fire Damage Cleanup',
        subtitle: 'Professional chimney fire damage cleanup services in Queensland. 24/7 emergency response for flue fire, chimney restoration.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Chimney Fire Damage Cleanup' },
      ]}
    />
  );
}
