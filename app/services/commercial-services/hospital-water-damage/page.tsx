import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Healthcare Facility Water Damage | Disaster Recovery',
  description: 'Professional healthcare facility water damage services across Australia. 24/7 emergency response for medical facility, hospital flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/hospital-water-damage',
  },
};

export default function HealthcareFacilityWaterDamagePage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Healthcare Facility Water Damage',
        subtitle: 'Professional healthcare facility water damage services across Australia. 24/7 emergency response for medical facility, hospital flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Healthcare Facility Water Damage' },
      ]}
    />
  );
}
