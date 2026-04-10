import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Emergency Sanitisation',
  description: 'Professional emergency sanitisation services across Australia. 24/7 emergency response for urgent disinfection, contamination control.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/emergency-sanitization',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is emergency sanitization required after a water or sewage event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency sanitization is required whenever water ingress involves Category 2 (grey water — dishwasher overflow, washing machine, fish tank) or Category 3 (black water — sewage backup, floodwater, toilet overflow) contamination. These water categories contain bacteria, parasites, and viruses that pose immediate health risks. NRPG applies EPA-registered hospital-grade antimicrobial treatments to all affected surfaces after extraction and before drying commences, per IICRC S500:2025 protocol.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does emergency sanitization involve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency sanitization involves: application of biocide to all affected surfaces to eliminate bacteria and mould spores; HEPA air scrubbing to remove airborne contaminants; removal and disposal of non-restorable porous materials that cannot be adequately decontaminated; and post-treatment clearance assessment. All treatments are documented for your insurance claim and for occupational health compliance in commercial settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is emergency sanitization covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Antimicrobial treatment and sanitization are standard components of water damage restoration covered under most Australian home and business insurance policies when the water event is a covered loss. In commercial settings, sanitization documentation also supports occupational health compliance requirements for returning workers to the site.',
      },
    }
  ],
});

export default function EmergencySanitisationPage() {
  return (
    <>
      <Script id="emergency-sanitization-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Emergency Sanitisation',
        subtitle: 'Professional emergency sanitisation services across Australia. 24/7 emergency response for urgent disinfection, contamination control.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Emergency Sanitisation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Emergency Sanitisation', parentCategory: 'Emergency Services', context: 'urgent disinfection and contamination control after disasters' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
