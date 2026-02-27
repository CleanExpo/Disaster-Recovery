import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Commercial Fire Restoration',
  description: 'Professional commercial fire restoration services in Queensland. 24/7 emergency response for business fire, office fire damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/fire-damage/commercial-fire-damage',
  },
};

export default function CommercialFireRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-fire-damage.webp',
        icon: <Flame className="h-12 w-12" />,
        title: 'Commercial Fire Restoration',
        subtitle: 'Professional commercial fire restoration services in Queensland. 24/7 emergency response for business fire, office fire damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-fire-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Fire Damage', href: '/services/fire-damage' },
        { label: 'Commercial Fire Restoration' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Commercial Fire Restoration', parentCategory: 'Fire Damage', context: 'business and office fire damage restoration and recovery' })}
      relatedPages={getRelatedPages('fire-damage')}
    />
  );
}
