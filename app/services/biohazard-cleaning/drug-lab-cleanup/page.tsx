import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Drug Lab Decontamination | Disaster Recovery',
  description: 'Professional drug lab decontamination services in Queensland. 24/7 emergency response for meth lab cleanup, chemical remediation.',
};

export default function DrugLabDecontaminationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Drug Lab Decontamination',
        subtitle: 'Professional drug lab decontamination services in Queensland. 24/7 emergency response for meth lab cleanup, chemical remediation.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Drug Lab Decontamination' },
      ]}
    />
  );
}
