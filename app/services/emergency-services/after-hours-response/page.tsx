import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'After Hours Emergency Response',
  description: 'Professional after hours emergency response services across Australia. 24/7 emergency response for night emergency, weekend service.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/after-hours-response',
  },
};

export default function AfterHoursEmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'After Hours Emergency Response',
        subtitle: 'Professional after hours emergency response services across Australia. 24/7 emergency response for night emergency, weekend service.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'After Hours Emergency Response' },
      ]}
      sections={getServiceChildSections({ serviceName: 'After Hours Emergency Response', parentCategory: 'Emergency Services', context: 'night and weekend emergency disaster response' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
