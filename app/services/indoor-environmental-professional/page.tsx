import { Metadata } from 'next';
import { Leaf } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Initial Consultation | Disaster Recovery',
  description: 'Certified Indoor Environmental Professionals (IEP) providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting nationwide.',
};

export default function IndoorEnvironmentalProfessionalPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Leaf className="h-12 w-12" />,
        title: 'Initial Consultation',
        subtitle: 'Certified Indoor Environmental Professionals (IEP) providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Initial Consultation' },
      ]}
    />
  );
}
