import { Metadata } from 'next';
import { CloudLightning } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Cyclone Damage Restoration',
  description: 'Professional cyclone damage restoration services across Australia. 24/7 emergency response for tropical cyclone, hurricane damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/storm-damage/cyclone-damage',
  },
};

export default function CycloneDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
        icon: <CloudLightning className="h-12 w-12" />,
        title: 'Cyclone Damage Restoration',
        subtitle: 'Professional cyclone damage restoration services across Australia. 24/7 emergency response for tropical cyclone, hurricane damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Storm Damage', href: '/services/storm-damage' },
        { label: 'Cyclone Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Cyclone Damage Restoration', parentCategory: 'Storm Damage', context: 'tropical cyclone and hurricane damage recovery' })}
      relatedPages={getRelatedPages('storm-damage')}
    />
  );
}
