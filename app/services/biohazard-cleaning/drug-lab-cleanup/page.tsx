import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Drug Lab Decontamination',
  description: 'Professional drug lab decontamination services across Australia. 24/7 emergency response for meth lab cleanup, chemical remediation.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/drug-lab-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What chemicals are present in a drug lab and why are they dangerous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Illicit drug laboratories — particularly methamphetamine and fentanyl labs — contain volatile organic compounds, acids, solvents, and heavy metals including pseudoephedrine, acetone, hydrochloric acid, lithium, and phosphine gas residues. These chemicals deposit on all surfaces including walls, ceilings, HVAC systems, and insulation. Exposure causes respiratory damage, neurological effects, and chemical burns. Properties require specialist hazardous materials remediation, not standard cleaning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to notify authorities if I find evidence of a drug lab in my property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In all Australian states and territories, discovery of a suspected illicit drug laboratory must be reported to police. Do not enter or touch anything. The property may be a crime scene and entry may compromise evidence. A police-cleared property still requires professional drug lab decontamination before it is safe to occupy — police clearance does not certify the property is chemically safe.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a drug-lab-contaminated property be remediated or does it need demolition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most drug lab properties can be remediated without demolition if contamination is confined to surface materials and HVAC systems. Remediation involves removal of contaminated materials, specialist chemical decontamination of structure, HVAC replacement or cleaning, and air and surface testing to meet state health authority clearance standards. Properties with contamination in wall cavities and structural elements may require more extensive deconstruction.',
      },
    }
  ],
});

export default function DrugLabDecontaminationPage() {
  return (
    <>
      <Script id="drug-lab-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Drug Lab Decontamination',
        subtitle: 'Professional drug lab decontamination services across Australia. 24/7 emergency response for meth lab cleanup, chemical remediation.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Drug Lab Decontamination' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Drug Lab Decontamination', parentCategory: 'Biohazard Cleaning', context: 'meth lab cleanup and chemical remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
