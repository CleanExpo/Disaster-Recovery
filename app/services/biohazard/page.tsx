import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Professional Biohazard Cleanup Services | NRP Australia',
  description: 'Expert biohazard cleanup and decontamination services. IICRC certified technicians available 24/7 for crime scene cleanup, trauma scene cleanup, and infectious waste removal.',
  keywords: [
    'biohazard cleanup',
    'crime scene cleanup',
    'trauma scene cleanup',
    'biohazard decontamination',
    'bloodborne pathogen cleanup',
    'infectious waste removal',
    'hazmat cleanup',
    'OSHA compliance cleanup'
  ] };

export default function BiohazardPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Professional Biohazard Cleanup Services',
        subtitle: 'Expert biohazard cleanup and decontamination services. IICRC certified technicians available 24/7 for crime scene cleanup, trauma scene cleanup, and infectious waste removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Professional Biohazard Cleanup Services' },
      ]}
    />
  );
}
