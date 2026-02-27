import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Infectious Disease Sanitisation',
  description: 'Professional infectious disease sanitisation services in Queensland. 24/7 emergency response for COVID cleaning, virus disinfection.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/infectious-disease',
  },
};

export default function InfectiousDiseaseSanitisationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Infectious Disease Sanitisation',
        subtitle: 'Professional infectious disease sanitisation services in Queensland. 24/7 emergency response for COVID cleaning, virus disinfection.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Infectious Disease Sanitisation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Infectious Disease Sanitisation', parentCategory: 'Biohazard Cleaning', context: 'COVID cleaning and virus disinfection' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
