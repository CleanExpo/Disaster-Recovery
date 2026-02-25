import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Commercial Restoration Services | Business Continuity | 24/7 Online Emergency Response',
  description: 'Professional commercial restoration services with business continuity focus. Office water damage, retail fire damage, industrial restoration. Minimize downtime with expert disaster recovery.',
  keywords: [
    'commercial restoration',
    'business restoration',
    'commercial water damage',
    'office restoration',
    'retail restoration',
    'industrial restoration',
    'business continuity',
    'commercial disaster recovery'
  ]
};

export default function CommercialRestorationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Commercial Restoration Services',
        subtitle: 'Professional commercial restoration services with business continuity focus. Office water damage, retail fire damage, industrial restoration. Minimize downtime with expert disaster recovery.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Restoration Services' },
      ]}
    />
  );
}
