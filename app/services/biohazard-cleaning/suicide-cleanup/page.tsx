import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Suicide Cleanup Services',
  description: 'Professional suicide cleanup services services in Queensland. 24/7 emergency response for trauma cleaning, compassionate cleanup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/suicide-cleanup',
  },
};

export default function SuicideCleanupServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Suicide Cleanup Services',
        subtitle: 'Professional suicide cleanup services services in Queensland. 24/7 emergency response for trauma cleaning, compassionate cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Suicide Cleanup Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Suicide Cleanup Services', parentCategory: 'Biohazard Cleaning', context: 'trauma cleaning and compassionate scene remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
