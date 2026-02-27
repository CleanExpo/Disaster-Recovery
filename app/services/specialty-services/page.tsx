import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Specialty Restoration Services | Document, Art, Electronics & More',
  description: 'Specialist disaster recovery for valuable and unique items. Document drying, electronics restoration, art conservation, antique repair, and more. IICRC-certified technicians.',
  alternates: { canonical: 'https://disasterrecovery.com.au/services/specialty-services' },
};

export default function SpecialtyServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #4A1D96 0%, #7C3AED 100%)',
        icon: <Sparkles className="h-12 w-12" />,
        title: 'Specialty Restoration Services',
        subtitle: 'Specialist disaster recovery for valuable and unique items. Document drying, electronics restoration, art conservation, antique repair, and more.',
      }}
      cta={{ text: 'Get Specialist Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-specialty-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Specialty Services' },
      ]}
      sections={[
        {
          heading: 'Specialty Restoration Services',
          body: <ServiceChildLinks category="specialty-services" />,
        },
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}
