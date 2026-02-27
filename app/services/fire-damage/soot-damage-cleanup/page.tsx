import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Soot Damage Cleaning',
  description: 'Professional soot damage cleaning services across Australia. 24/7 emergency response for soot removal, carbon cleaning.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/soot-damage-cleanup',
  },
};

export default function SootDamageCleaningPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Soot Damage Cleaning',
        subtitle: 'Professional soot damage cleaning services across Australia. 24/7 emergency response for soot removal, carbon cleaning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Soot Damage Cleaning' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Soot Damage Cleaning', parentCategory: 'Fire Damage', context: 'soot removal and carbon cleaning after fire damage' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
