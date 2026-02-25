import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Kitchen Fire Damage Restoration | Disaster Recovery',
  description: 'Professional kitchen fire damage restoration services in Queensland. 24/7 emergency response for cooking fire, kitchen smoke damage.',
};

export default function KitchenFireDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Kitchen Fire Damage Restoration',
        subtitle: 'Professional kitchen fire damage restoration services in Queensland. 24/7 emergency response for cooking fire, kitchen smoke damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Kitchen Fire Damage Restoration' },
      ]}
    />
  );
}
