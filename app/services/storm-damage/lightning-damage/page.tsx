import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Lightning Strike Damage',
  description: 'Professional lightning strike damage services in Queensland. 24/7 emergency response for electrical surge, lightning fire.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/lightning-damage',
  },
};

export default function LightningStrikeDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Lightning Strike Damage',
        subtitle: 'Professional lightning strike damage services in Queensland. 24/7 emergency response for electrical surge, lightning fire.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Lightning Strike Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Lightning Strike Damage', parentCategory: 'Storm Damage', context: 'electrical surge and lightning fire restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
