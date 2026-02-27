import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bushfire Smoke Damage',
  description: 'Professional bushfire smoke damage services in Queensland. 24/7 emergency response for wildfire smoke, outdoor fire damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/bushfire-smoke-damage',
  },
};

export default function BushfireSmokeDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Bushfire Smoke Damage',
        subtitle: 'Professional bushfire smoke damage services in Queensland. 24/7 emergency response for wildfire smoke, outdoor fire damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Bushfire Smoke Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bushfire Smoke Damage', parentCategory: 'Fire Damage', context: 'wildfire and bushfire smoke damage restoration and air quality recovery' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
