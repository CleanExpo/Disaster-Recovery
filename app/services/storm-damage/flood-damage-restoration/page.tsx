import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Flash Flood Damage Recovery | Disaster Recovery',
  description: 'Professional flash flood damage recovery services in Queensland. 24/7 emergency response for flood cleanup, storm flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/flood-damage-restoration',
  },
};

export default function FlashFloodDamageRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Flash Flood Damage Recovery',
        subtitle: 'Professional flash flood damage recovery services in Queensland. 24/7 emergency response for flood cleanup, storm flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Flash Flood Damage Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Flash Flood Damage Recovery', parentCategory: 'Storm Damage', context: 'flash flood cleanup and storm flooding restoration' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
