import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Sanitisation',
  description: 'Professional emergency sanitisation services in Queensland. 24/7 emergency response for urgent disinfection, contamination control.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-sanitization',
  },
};

export default function EmergencySanitisationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Sanitisation',
        subtitle: 'Professional emergency sanitisation services in Queensland. 24/7 emergency response for urgent disinfection, contamination control.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Sanitisation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Sanitisation', parentCategory: 'Emergency Services', context: 'urgent disinfection and contamination control after disasters' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
