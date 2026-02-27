import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Biohazard Cleaning Brisbane | Disaster Recovery',
  description: 'Professional biohazard cleaning and crime scene cleanup in Brisbane. Discrete, compassionate trauma cleaning, unattended death, blood cleanup. Police-registered, IICRC-certified. Use Our Online Form',
};

export default function BiohazardCleaningPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Biohazard Cleaning Brisbane',
        subtitle: 'Professional biohazard cleaning and crime scene cleanup in Brisbane. Discrete, compassionate trauma cleaning, unattended death, blood cleanup. Police-registered, IICRC-certified. Use Our Online Form',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning Brisbane' },
      ]}
      sections={[
        {
          heading: 'Biohazard Cleanup Services',
          body: <ServiceChildLinks category="biohazard-cleaning" />,
        },
      ]}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
