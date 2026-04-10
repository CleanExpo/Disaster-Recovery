import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Needle & Sharps Disposal',
  description: 'Professional needle & sharps disposal services across Australia. 24/7 emergency response for syringe cleanup, medical waste.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/sharps-disposal',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What risks do discarded sharps present and why does cleanup require specialists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Discarded needles and syringes present needlestick injury risk with potential transmission of Hepatitis B, Hepatitis C, and HIV. In properties used for illicit drug use, sharps may be contaminated with bloodborne pathogens and drug residues. Each sharp must be individually identified, collected with puncture-resistant equipment, and disposed of as regulated clinical waste under Australian state health regulations. Standard cleaning staff are not trained or equipped for this.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does professional sharps collection involve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG technicians conduct a systematic search of all accessible areas — inside and underneath furniture, in wall cavities accessible at floor level, in garden areas — using mirrors and torches. Sharps are individually collected with puncture-proof forceps into UN-approved sharps containers. Containers are sealed and transported for disposal by a licensed clinical waste contractor. We provide a manifest confirming safe disposal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is sharps cleanup covered by home or property insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the cause. Sharps discovered following an illegal occupation or break-in are generally covered under home insurance as malicious damage or vandalism. Sharps from an occupant\'s own drug use may not be covered. We document the circumstances of discovery and provide a professional report to support your insurance submission.',
      },
    }
  ],
});

export default function NeedleSharpsDisposalPage() {
  return (
    <>
      <Script id="sharps-disposal-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Needle & Sharps Disposal',
        subtitle: 'Professional needle & sharps disposal services across Australia. 24/7 emergency response for syringe cleanup, medical waste.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Needle & Sharps Disposal' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Needle & Sharps Disposal', parentCategory: 'Biohazard Cleaning', context: 'syringe cleanup and medical waste disposal' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
