import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Power Solutions',
  description: 'Professional emergency power solutions services in Queensland. 24/7 emergency response for generators, temporary power.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-power',
  },
};

export default function EmergencyPowerSolutionsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Power Solutions',
        subtitle: 'Professional emergency power solutions services in Queensland. 24/7 emergency response for generators, temporary power.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Power Solutions' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Power Solutions', parentCategory: 'Emergency Services', context: 'temporary generators and emergency power supply after disasters' })}
      relatedPages={getRelatedPages('emergency')}
    />
  );
}
