import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

export const metadata: Metadata = {
  title: 'Flood & Water Emergencies',
  description: '24/7 emergency disaster response services across Australia. Immediate response for water, fire, storm, and hazardous material incidents.',
  keywords: [
    'emergency restoration services',
    '24/7 emergency response',
    'emergency water extraction',
    'emergency board up',
    'emergency tarping',
    'disaster response team',
    'emergency plumbing response',
    'emergency drying services',
    'after hours emergency response',
    'emergency sanitisation',
    'priority response team',
    'emergency power restoration',
    'flood emergency response',
    'storm emergency services',
    'emergency disaster recovery',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services',
  },
};

export default function EmergencyServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Flood & Water Emergencies',
        subtitle: '24/7 emergency disaster response services across Queensland. Immediate response for water, fire, storm, and hazardous material incidents.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Flood & Water Emergencies' },
      ]}
      sections={[
        {
          heading: 'Emergency Response Services',
          body: <ServiceChildLinks category="emergency-services" />,
        },
      ]}
    />
  );
}
