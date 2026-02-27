import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Wind Damage Restoration',
  description: 'Professional wind damage restoration services in Queensland. 24/7 emergency response for cyclone damage, storm wind repair.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/wind-damage-repair',
  },
};

export default function WindDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Wind Damage Restoration',
        subtitle: 'Professional wind damage restoration services in Queensland. 24/7 emergency response for cyclone damage, storm wind repair.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Wind Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Wind Damage Restoration', parentCategory: 'Storm Damage', context: 'cyclone and storm wind damage repair' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
