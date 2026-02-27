import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Window Damage | Disaster Recovery',
  description: 'Professional storm window damage services in Queensland. 24/7 emergency response for broken windows, glass damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/window-storm-damage',
  },
};

export default function StormWindowDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm Window Damage',
        subtitle: 'Professional storm window damage services in Queensland. 24/7 emergency response for broken windows, glass damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Storm Window Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Storm Window Damage', parentCategory: 'Storm Damage', context: 'broken window and glass damage from storms' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
