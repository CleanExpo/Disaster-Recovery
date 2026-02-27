import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Roof Tarping',
  description: 'Professional emergency roof tarping services in Queensland. 24/7 emergency response for temporary roof, tarp installation.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-tarping',
  },
};

export default function EmergencyRoofTarpingPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Roof Tarping',
        subtitle: 'Professional emergency roof tarping services in Queensland. 24/7 emergency response for temporary roof, tarp installation.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Roof Tarping' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Roof Tarping', parentCategory: 'Emergency Services', context: 'temporary roof protection and tarp installation after storm damage' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
