import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Infectious Disease Sanitisation',
  description: 'Professional infectious disease sanitisation services across Australia. 24/7 emergency response for COVID cleaning, virus disinfection.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/infectious-disease',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is professional infectious disease decontamination required for a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional infectious disease decontamination is required after confirmed cases of highly infectious diseases including tuberculosis, COVID-19 in high-transmission scenarios, norovirus outbreaks, meningococcal disease, or any notifiable disease where surface contamination poses ongoing transmission risk. Healthcare facilities, aged care, schools, and commercial properties are most frequently affected. Regulatory notification to the relevant state health authority may also be required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What disinfection methods are used for infectious disease decontamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG uses a combination of EPA-registered hospital-grade liquid disinfectants, electrostatic spraying for even surface coverage, UV-C germicidal irradiation, and HEPA air filtration. The specific protocol is pathogen-specific — norovirus requires different chemistry than coronavirus or mycobacterial contamination. All work follows state health authority guidelines and relevant Australian standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you verify that a property is safe after infectious disease decontamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Post-decontamination verification uses ATP (adenosine triphosphate) bioluminescence testing for general surface cleanliness and targeted pathogen-specific environmental swab testing where clinically indicated. Results are documented in a clearance report suitable for your insurer, health authority, or property manager. Re-entry is only authorised after clearance criteria are met.',
      },
    }
  ],
});

export default function InfectiousDiseaseSanitisationPage() {
  return (
    <>
      <Script id="infectious-disease-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Infectious Disease Sanitisation',
        subtitle: 'Professional infectious disease sanitisation services across Australia. 24/7 emergency response for COVID cleaning, virus disinfection.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Infectious Disease Sanitisation' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Infectious Disease Sanitisation', parentCategory: 'Biohazard Cleaning', context: 'COVID cleaning and virus disinfection' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
