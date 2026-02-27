import { Metadata } from 'next';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Sewage Decontamination Services',
  description: 'Professional sewage decontamination services services in Queensland. 24/7 emergency response for sanitisation, bacterial cleanup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/sewage-decontamination',
  },
};

export default function SewageDecontaminationServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Sewage Decontamination Services',
        subtitle: 'Professional sewage decontamination services services in Queensland. 24/7 emergency response for sanitisation, bacterial cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Sewage Decontamination Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Sewage Decontamination Services', parentCategory: 'Sewage Cleanup', context: 'sanitisation and bacterial sewage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
  );
}
