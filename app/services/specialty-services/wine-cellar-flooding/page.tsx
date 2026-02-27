import { Metadata } from 'next';
import { Star } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Wine Cellar Flood Recovery',
  description: 'Professional wine cellar flood recovery services in Queensland. 24/7 emergency response for wine storage, cellar water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/specialty-services/wine-cellar-flooding',
  },
};

export default function WineCellarFloodRecoveryPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Star className="h-12 w-12" />,
        title: 'Wine Cellar Flood Recovery',
        subtitle: 'Professional wine cellar flood recovery services in Queensland. 24/7 emergency response for wine storage, cellar water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services', href: '/services/specialty-services' },
        { label: 'Wine Cellar Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Wine Cellar Flood Recovery', parentCategory: 'Specialty Services', context: 'wine storage and cellar water damage restoration' })}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
