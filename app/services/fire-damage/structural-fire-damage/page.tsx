import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Structural Fire Damage Repair',
  description: 'Professional structural fire damage repair services in Queensland. 24/7 emergency response for building fire, frame damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/structural-fire-damage',
  },
};

export default function StructuralFireDamageRepairPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Structural Fire Damage Repair',
        subtitle: 'Professional structural fire damage repair services in Queensland. 24/7 emergency response for building fire, frame damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Structural Fire Damage Repair' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Structural Fire Damage Repair', parentCategory: 'Fire Damage', context: 'building frame and structural fire damage assessment and repair' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
