import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Needle & Sharps Disposal | Disaster Recovery',
  description: 'Professional needle & sharps disposal services in Queensland. 24/7 emergency response for syringe cleanup, medical waste.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/sharps-disposal',
  },
};

export default function NeedleSharpsDisposalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Needle & Sharps Disposal',
        subtitle: 'Professional needle & sharps disposal services in Queensland. 24/7 emergency response for syringe cleanup, medical waste.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Needle & Sharps Disposal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Needle & Sharps Disposal', parentCategory: 'Biohazard Cleaning', context: 'syringe cleanup and medical waste disposal' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
