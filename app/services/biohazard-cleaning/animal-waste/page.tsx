import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Animal Waste Cleanup',
  description: 'Professional animal waste cleanup services across Australia. 24/7 emergency response for pet hoarding, feces removal.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/animal-waste',
  },
};

export default function AnimalWasteCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Animal Waste Cleanup',
        subtitle: 'Professional animal waste cleanup services across Australia. 24/7 emergency response for pet hoarding, feces removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Animal Waste Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Animal Waste Cleanup', parentCategory: 'Biohazard Cleaning', context: 'animal waste and pet hoarding remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
