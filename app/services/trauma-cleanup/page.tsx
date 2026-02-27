import { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Trauma Scene Cleanup | IICRC-Certified Specialists',
  description: 'Professional trauma scene cleanup services across Australia. IICRC-certified technicians for unattended death, accident, and crime scene restoration. Compassionate, discreet, available 24/7.',
  keywords: [
    'trauma cleanup',
    'trauma scene cleaning',
    'unattended death cleanup',
    'accident scene cleanup',
    'crime scene cleanup',
    'IICRC certified trauma',
    'blood cleanup',
    'bodily fluid cleanup',
    'trauma remediation',
    'compassionate cleanup',
  ],
  openGraph: {
    title: 'Trauma Scene Cleanup | IICRC-Certified Specialists',
    description: 'Professional trauma scene cleanup across Australia. Compassionate, discreet IICRC-certified technicians available 24/7.',
    images: [
      {
        url: '/images/optimised/process/3D Hazardous Cleaning.png',
        width: 1200,
        height: 630,
        alt: 'Professional trauma scene cleanup service' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Trauma Scene Cleanup | IICRC-Certified Specialists',
    description: 'Professional trauma scene cleanup. IICRC-certified technicians. Compassionate, discreet service available 24/7.',
    images: ['/images/optimised/process/3D Hazardous Cleaning.png'] },
  alternates: {
    canonical: '/services/trauma-cleanup' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

export default function TraumaCleanupPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <Heart className="h-12 w-12" />,
        title: 'Trauma Scene Cleanup',
        subtitle: 'Compassionate, discreet trauma scene cleanup by IICRC-certified specialists. Unattended death, accident scene, and crime scene restoration. Available 24/7 across Australia.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Trauma Scene Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Trauma Scene Cleanup', parentCategory: 'Trauma Cleanup', context: 'compassionate trauma scene and crime scene restoration' })}
      relatedPages={getRelatedPages('biohazard')}
    />
  );
}
