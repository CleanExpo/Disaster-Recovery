import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Sewage Decontamination Services',
  description: 'Professional sewage decontamination services services across Australia. 24/7 emergency response for sanitisation, bacterial cleanup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/sewage-decontamination',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does complete sewage decontamination involve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Complete sewage decontamination following a Category 3 water event involves: extraction of all standing sewage; removal and disposal of all porous materials in contact with sewage (carpet, plasterboard, insulation, skirting boards, cabinetry with particleboard substrate); HEPA vacuuming of all solid waste residue; hot-pressure washing of hard surfaces; application of EPA-registered hospital-grade biocide to all affected surfaces; structural drying of the space; and post-remediation ATP and microbial testing to verify clearance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does sewage decontamination take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single-bathroom sewage backup typically takes 1-3 days for extraction, decontamination, and initial drying. A basement or multiple-room sewage event takes 3-7 days. Structural drying continues for 3-5 days after decontamination. Total project duration from sewage event to clearance certification is typically 5-10 business days depending on scope and insurance approval timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I return to the property during sewage decontamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Occupants — particularly children, elderly, and immunocompromised individuals — should not be present during active sewage decontamination. The area must be cleared and air tested before reoccupation. In whole-property sewage events, temporary accommodation is necessary. Most insurers will cover temporary accommodation costs for a property rendered uninhabitable by a sewage event.',
      },
    }
  ],
});

export default function SewageDecontaminationServicesPage() {
  return (
    <>
      <Script id="sewage-decontamination-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Sewage Decontamination Services',
        subtitle: 'Professional sewage decontamination services services across Australia. 24/7 emergency response for sanitisation, bacterial cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Sewage Decontamination Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Sewage Decontamination Services', parentCategory: 'Sewage Cleanup', context: 'sanitisation and bacterial sewage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
