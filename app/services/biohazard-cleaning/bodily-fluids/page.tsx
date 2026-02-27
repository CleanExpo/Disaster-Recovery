import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bodily Fluid Cleanup',
  description: 'Professional bodily fluid cleanup services in Queensland. 24/7 emergency response for vomit cleanup, human waste.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/bodily-fluids',
  },
};

export default function BodilyFluidCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Bodily Fluid Cleanup',
        subtitle: 'Professional bodily fluid cleanup services in Queensland. 24/7 emergency response for vomit cleanup, human waste.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Bodily Fluid Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bodily Fluid Cleanup', parentCategory: 'Biohazard Cleaning', context: 'vomit and human waste sanitisation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
