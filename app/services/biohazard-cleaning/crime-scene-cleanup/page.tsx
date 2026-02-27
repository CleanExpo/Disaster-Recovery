import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Crime Scene Cleanup Brisbane',
  description: 'Professional crime scene cleanup brisbane services in Queensland. 24/7 emergency response for forensic cleaning, trauma cleanup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/crime-scene-cleanup',
  },
};

export default function CrimeSceneCleanupBrisbanePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Crime Scene Cleanup Brisbane',
        subtitle: 'Professional crime scene cleanup brisbane services in Queensland. 24/7 emergency response for forensic cleaning, trauma cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Crime Scene Cleanup Brisbane' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Crime Scene Cleanup Brisbane', parentCategory: 'Biohazard Cleaning', context: 'forensic cleaning and trauma scene remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
