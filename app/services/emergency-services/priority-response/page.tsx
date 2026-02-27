import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Priority Emergency Response',
  description: 'Professional priority emergency response services in Queensland. 24/7 emergency response for rapid deployment, first response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/priority-response',
  },
};

export default function PriorityEmergencyResponsePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Priority Emergency Response',
        subtitle: 'Professional priority emergency response services in Queensland. 24/7 emergency response for rapid deployment, first response.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Priority Emergency Response' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Priority Emergency Response', parentCategory: 'Emergency Services', context: 'rapid deployment and first response for urgent disaster situations' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
