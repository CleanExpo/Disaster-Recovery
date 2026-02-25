import { Metadata } from 'next';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Mould Remediation Services | IICRC S520 Certified | Black Mould Removal Specialists',
  description: 'Professional mould remediation services following IICRC S520 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
  keywords: [
    'mould remediation',
    'black mould removal',
    'mould removal services',
    'toxic mould cleanup',
    'IICRC S520 certified',
    'mould inspection',
    'mould testing',
    'mould remediation company',
    'professional mould removal',
    'mould contamination cleanup',
    'indoor air quality',
    'mould spore removal',
    'mould damage restoration',
    'certified mould specialists',
    'microbial remediation'
  ],
  openGraph: {
    title: 'Professional Mould Remediation | IICRC S520 Certified Specialists',
    description: 'Expert mould remediation services following IICRC S520 standards. Comprehensive black mould removal and toxic mould cleanup with 24/7 emergency response.',
    images: [
      {
        url: '/images/optimised/damage/3D Mould Damage.png',
        width: 1200,
        height: 630,
        alt: 'Professional mould remediation service' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Mould Remediation Services | IICRC S520 Certified',
    description: 'Expert mould remediation services. IICRC S520 certified technicians. Professional black mould removal available 24/7.',
    images: ['/images/optimised/damage/3D Mould Damage.png'] },
  alternates: {
    canonical: '/services/mould-remediation' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function MoldRemediationPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        icon: <Bug className="h-12 w-12" />,
        title: 'Mould Remediation Services',
        subtitle: 'Professional mould remediation services following IICRC S520 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation Services' },
      ]}
    />
  );
}
