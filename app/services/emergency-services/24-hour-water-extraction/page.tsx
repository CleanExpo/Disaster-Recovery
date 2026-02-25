import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '24 Hour Water Extraction | Disaster Recovery',
  description: 'Professional 24 hour water extraction services in Queensland. 24/7 emergency response for emergency pumping, rapid extraction.',
};

export default function TwentyFourHourWaterExtractionPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        icon: <Siren className="h-12 w-12" />,
        title: '24 Hour Water Extraction',
        subtitle: 'Professional 24 hour water extraction services in Queensland. 24/7 emergency response for emergency pumping, rapid extraction.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: '24 Hour Water Extraction' },
      ]}
    />
  );
}
