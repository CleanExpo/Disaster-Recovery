import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hoarding Cleanup Services | Disaster Recovery',
  description: 'Professional hoarding cleanup services services in Queensland. 24/7 emergency response for hoarder house, extreme cleaning.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/hoarding-cleanup',
  },
};

export default function HoardingCleanupServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Hoarding Cleanup Services',
        subtitle: 'Professional hoarding cleanup services services in Queensland. 24/7 emergency response for hoarder house, extreme cleaning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Hoarding Cleanup Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Hoarding Cleanup Services', parentCategory: 'Biohazard Cleaning', context: 'hoarder house and extreme cleaning' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
