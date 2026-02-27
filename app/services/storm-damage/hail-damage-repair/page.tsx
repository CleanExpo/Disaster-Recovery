import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hail Damage Restoration',
  description: 'Professional hail damage restoration services in Queensland. 24/7 emergency response for hailstorm damage, ice damage repair.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/hail-damage-repair',
  },
};

export default function HailDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Hail Damage Restoration',
        subtitle: 'Professional hail damage restoration services in Queensland. 24/7 emergency response for hailstorm damage, ice damage repair.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Hail Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Hail Damage Restoration', parentCategory: 'Storm Damage', context: 'hailstorm and ice damage repair' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
