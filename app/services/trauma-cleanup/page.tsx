import { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Biohazard Cleanup Services | IICRC S540 Certified | Crime Scene & Trauma Cleanup',
  description: 'Professional biohazard cleanup services following IICRC S540 standards. Crime scene cleanup, trauma cleaning, blood cleanup, sewage cleanup. Licensed specialists available 24/7.',
  keywords: [
    'biohazard cleanup',
    'crime scene cleanup',
    'trauma cleanup',
    'blood cleanup',
    'sewage cleanup',
    'IICRC S540 certified',
    'biohazard remediation',
    'infectious disease cleanup',
    'bodily fluid cleanup',
    'unattended death cleanup',
    'suicide cleanup',
    'homicide cleanup',
    'biohazard removal',
    'HAZMAT cleanup',
    'biohazard restoration'
  ],
  openGraph: {
    title: 'Professional Biohazard Cleanup Services | IICRC S540 Certified',
    description: 'Expert biohazard cleanup services following IICRC S540 standards. Professional crime scene, trauma, and biohazard remediation with 24/7 response.',
    images: [
      {
        url: '/images/optimised/process/3D Hazardous Cleaning.png',
        width: 1200,
        height: 630,
        alt: 'Professional biohazard cleanup service' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Biohazard Cleanup Services | IICRC S540 Certified',
    description: 'Expert biohazard cleanup services. IICRC S540 certified technicians. Professional trauma and crime scene cleanup available 24/7.',
    images: ['/images/optimised/process/3D Hazardous Cleaning.png'] },
  alternates: {
    canonical: '/services/biohazard-cleanup' },
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
        { label: 'Biohazard Cleanup Services' },
      ]}
    />
  );
}
