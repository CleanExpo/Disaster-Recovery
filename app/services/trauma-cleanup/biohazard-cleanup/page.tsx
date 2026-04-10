import { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Biohazard Cleanup After Trauma | IICRC S540 Certified',
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

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does biohazard cleanup within trauma scenes differ from general biohazard work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trauma scene biohazard cleanup presents specific challenges beyond standard biohazard remediation: high-volume bloodborne pathogen contamination; the presence of human tissue and remains where coronial clearance may be required before work can begin; complex surface penetration into subfloor, wall cavities, and grout lines; psychological stressors for technicians; and expectations of discretion and sensitivity from family members and the public. IICRC S540 specifically addresses trauma scenarios, requiring documentation of contamination extent, maintenance of chain of custody for biological materials, and coordination with law enforcement where applicable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What PPE is required for trauma scene biohazard cleanup in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under IICRC S540 and Australian WHS regulations, trauma scene biohazard cleanup requires: full-body Tyvek or equivalent disposable coveralls; N95 or higher respirators (P2 minimum under AS/NZS 1715 and 1716) or full-face PAPR where significant airborne risk exists; double-gloved nitrile gloves with taped cuffs; full-face eye protection; and disposable boot covers. Containment barriers with negative air pressure units (HEPA filtration) are deployed for large or heavily contaminated scenes to prevent cross-contamination to unaffected building areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can trauma scene biohazard cleanup be claimed through home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many home and contents insurance policies provide cover for trauma and emergency cleanup following an insured event at the property. Coverage terms vary significantly — some insurers include a specific trauma cleanup benefit, while others cover it under general building repair provisions. Professional insurers such as CGU, IAG, QBE, and Allianz have specific guidelines for trauma claims, and NRPG\'s documentation — IICRC-certified assessment report, scope, photographic evidence, and final clearance certificate — satisfies standard insurer requirements. Review your Product Disclosure Statement and contact your insurer at the time of lodgement.',
      },
    }
  ],
});

export default function BiohazardCleanupPage() {
  return (
    <>
      <Script id="trauma-biohazard-cleanup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
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
      sections={getServiceChildSections({ serviceName: 'Biohazard Cleanup Services', parentCategory: 'Trauma Cleanup', context: 'biohazard decontamination and S540-certified remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
