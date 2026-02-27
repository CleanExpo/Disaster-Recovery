import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fallen Tree Damage Cleanup',
  description: 'Professional fallen tree damage cleanup services in Queensland. 24/7 emergency response for tree removal, storm tree damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/tree-damage-cleanup',
  },
};

export default function FallenTreeDamageCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Fallen Tree Damage Cleanup',
        subtitle: 'Professional fallen tree damage cleanup services in Queensland. 24/7 emergency response for tree removal, storm tree damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Fallen Tree Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Fallen Tree Damage Cleanup', parentCategory: 'Storm Damage', context: 'fallen tree removal and storm tree damage repair' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
