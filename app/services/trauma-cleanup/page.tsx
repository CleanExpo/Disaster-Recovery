import { Metadata } from 'next';
import Script from 'next/script';
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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Trauma Scene Cleanup',
  description: 'Professional trauma scene cleanup services across Australia. IICRC-certified technicians for unattended death, accident, and crime scene restoration. Compassionate, discreet, available 24/7.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization', name: 'Disaster Recovery' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Trauma Scene Cleanup and Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim', serviceType: 'Online' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What training is required for trauma scene cleanup technicians in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trauma scene cleanup technicians in Australia require training in biological hazard management under the WHS Act 2011, including: bloodborne pathogen exposure control; correct use of personal protective equipment (PPE) including appropriate respiratory protection under AS/NZS 1715 and 1716; biohazardous waste handling and disposal under state EPA regulations; and IICRC S540 (Standard for Trauma and Crime Scene Cleanup). Contractors must hold current vaccinations including hepatitis B at minimum and undergo exposure assessment and incident reporting training.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is a trauma scene decontaminated to safe levels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Decontamination follows IICRC S540 protocols: containment of the affected area to prevent cross-contamination; removal and appropriate disposal of all contaminated porous materials (flooring, soft furnishings, linings) above threshold levels; chemical disinfection of hard surfaces using hospital-grade disinfectants with documented efficacy against bloodborne pathogens; HEPA vacuuming of residues; and independent surface ATP testing or swab testing to confirm decontamination to acceptable microbial levels before clearance. Air quality testing is performed where airborne contamination risk is identified.',
      },
    },
    {
      '@type': 'Question',
      name: 'What support is available for family members during trauma scene cleanup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG\'s network contractors are trained to work with sensitivity and discretion in difficult circumstances. The compassionate framework includes: family members being fully briefed on the process without having to be present on-site; liaison with a single point of contact who manages all communications with the restoration team; coordination with the coroner\'s office and police for access clearances where required; and referral to victim support services and grief counselling where appropriate. All NRPG contractors follow a professional code that prohibits documentation beyond what is strictly required for insurance purposes.',
      },
    }
  ],
});

export default function TraumaCleanupPage() {
  return (
    <>
    <Script id="trauma-cleanup-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <Script id="trauma-cleanup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
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
    </>
  );
}
