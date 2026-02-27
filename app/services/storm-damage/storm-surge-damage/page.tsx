import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Storm Surge Flood Damage | Disaster Recovery',
  description: 'Professional storm surge flood damage services in Queensland. 24/7 emergency response for coastal flooding, tidal damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/storm-surge-damage',
  },
};

export default function StormSurgeFloodDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Storm Surge Flood Damage',
        subtitle: 'Professional storm surge flood damage services in Queensland. 24/7 emergency response for coastal flooding, tidal damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Storm Surge Flood Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Storm Surge Flood Damage', parentCategory: 'Storm Damage', context: 'coastal flooding and tidal damage recovery' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
