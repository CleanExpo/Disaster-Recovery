import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Fire Damaged Contents Restoration',
  description: 'Professional fire damaged contents restoration services across Australia. 24/7 emergency response for belongings restoration, document recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/contents-restoration',
  },
};

export default function FireDamagedContentsRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Fire Damaged Contents Restoration',
        subtitle: 'Professional fire damaged contents restoration services across Australia. 24/7 emergency response for belongings restoration, document recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Fire Damaged Contents Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Fire Damaged Contents Restoration', parentCategory: 'Fire Damage', context: 'salvaging and restoring belongings and documents after fire' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
