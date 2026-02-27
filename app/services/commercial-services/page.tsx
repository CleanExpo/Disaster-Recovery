import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Commercial Restoration Services | Disaster Recovery',
  description: 'Professional commercial restoration services for businesses across Australia. Minimising downtime and protecting your business assets.',
};

export default function CommercialServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Commercial Restoration Services',
        subtitle: 'Professional commercial restoration services for businesses across Australia. Minimising downtime and protecting your business assets.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Restoration Services' },
      ]}
      sections={[
        {
          heading: 'Commercial Restoration Services',
          body: <ServiceChildLinks category="commercial-services" />,
        },
      ]}
    />
  );
}
