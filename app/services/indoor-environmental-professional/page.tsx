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
        icon: <Leaf className="h-12 w-12" />,
        title: 'Initial Consultation',
        subtitle: 'Certified Indoor Environmental Professionals (IEP) providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting nationwide.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Initial Consultation' },
      ]}
    />
  );
}
