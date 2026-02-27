import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Plumbing Services | Disaster Recovery',
  description: 'Professional emergency plumbing services services in Queensland. 24/7 emergency response for burst pipe repair, leak stop.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-plumbing',
  },
};

export default function EmergencyPlumbingServicesPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Plumbing Services',
        subtitle: 'Professional emergency plumbing services services in Queensland. 24/7 emergency response for burst pipe repair, leak stop.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Plumbing Services' },
      ]}
    />
  );
}
