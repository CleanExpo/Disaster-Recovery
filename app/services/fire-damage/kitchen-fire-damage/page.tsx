import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Kitchen Fire Damage Restoration | Disaster Recovery',
  description: 'Professional kitchen fire damage restoration services in Queensland. 24/7 emergency response for cooking fire, kitchen smoke damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/kitchen-fire-damage',
  },
};

export default function KitchenFireDamageRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Kitchen Fire Damage Restoration',
        subtitle: 'Professional kitchen fire damage restoration services in Queensland. 24/7 emergency response for cooking fire, kitchen smoke damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Kitchen Fire Damage Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Kitchen Fire Damage Restoration', parentCategory: 'Fire Damage', context: 'cooking fire and kitchen smoke damage cleanup and restoration' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
