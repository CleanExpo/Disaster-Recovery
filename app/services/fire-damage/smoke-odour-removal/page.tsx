import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Smoke Odour Removal Services | Disaster Recovery',
  description: 'Professional smoke odour removal services services in Queensland. 24/7 emergency response for smoke smell, fire odour elimination.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/smoke-odour-removal',
  },
};

export default function SmokeOdourRemovalServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Smoke Odour Removal Services',
        subtitle: 'Professional smoke odour removal services services in Queensland. 24/7 emergency response for smoke smell, fire odour elimination.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Smoke Odour Removal Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Smoke Odour Removal Services', parentCategory: 'Fire Damage', context: 'smoke smell elimination and fire odour treatment' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
