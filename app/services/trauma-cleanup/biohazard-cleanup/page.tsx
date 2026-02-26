import { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Biohazard Cleanup After Trauma | IICRC S540 Certified | 24/7',
  description: 'Specialised biohazard cleanup following trauma events. IICRC S540-certified decontamination for blood, bodily fluids, and infectious materials. Discreet, professional service Australia-wide.',
  keywords: [
    'biohazard cleanup trauma',
    'biohazard decontamination',
    'blood cleanup service',
    'bodily fluid cleanup',
    'IICRC S540 certified',
    'infectious material cleanup',
    'biohazard remediation',
    'trauma biohazard',
  ],
  openGraph: {
    title: 'Biohazard Cleanup After Trauma | IICRC S540 Certified',
    description: 'Specialised biohazard decontamination following trauma events. IICRC S540-certified technicians available 24/7 Australia-wide.',
    images: [
      {
        url: '/images/optimised/process/3D Hazardous Cleaning.png',
        width: 1200,
        height: 630,
        alt: 'Professional biohazard cleanup after trauma' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Biohazard Cleanup After Trauma | IICRC S540 Certified',
    description: 'Specialised biohazard cleanup after trauma events. S540-certified decontamination available 24/7 Australia-wide.',
    images: ['/images/optimised/process/3D Hazardous Cleaning.png'] },
  alternates: {
    canonical: '/services/trauma-cleanup/biohazard-cleanup' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function BiohazardCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <Heart className="h-12 w-12" />,
        title: 'Biohazard Cleanup Services',
        subtitle: 'Professional biohazard cleanup services following IICRC S540 standards. Crime scene cleanup, trauma cleaning, blood cleanup, sewage cleanup. Licensed specialists available 24/7.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Trauma Cleanup', href: '/services/trauma-cleanup' },
        { label: 'Biohazard Cleanup Services' },
      ]}
    />
  );
}
