import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Tornado Damage Cleanup | Disaster Recovery',
  description: 'Professional tornado damage cleanup services in Queensland. 24/7 emergency response for twister damage, severe wind.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/tornado-damage',
  },
};

export default function TornadoDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Tornado Damage Cleanup',
        subtitle: 'Professional tornado damage cleanup services in Queensland. 24/7 emergency response for twister damage, severe wind.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Tornado Damage Cleanup' },
      ]}
    />
  );
}
