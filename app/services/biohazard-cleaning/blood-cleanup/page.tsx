import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Blood Spill Cleanup Services',
  description: 'Professional blood spill cleanup services services across Australia. 24/7 emergency response for bloodborne pathogen, accident cleanup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/blood-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why can\'t blood cleanup be done by regular cleaners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blood is a Category 3 biohazard under AS/NZS standards. It may contain bloodborne pathogens including HIV, Hepatitis B, Hepatitis C, and MRSA that survive on surfaces for hours to days. Standard cleaning products do not achieve the level of disinfection required. Biohazard technicians use EPA-registered hospital-grade disinfectants, HEPA vacuums, and specialised extraction equipment with appropriate PPE and waste disposal protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'What surfaces can be decontaminated after a blood event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hard, non-porous surfaces — concrete, tiles, sealed timber, metal — can typically be fully decontaminated. Porous materials such as carpet, mattresses, unsealed timber, and particleboard often require removal and disposal as they cannot be adequately decontaminated. Our technicians assess each surface individually and provide clearance testing to verify pathogen elimination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is blood cleanup after a traumatic event covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Blood cleanup following a traumatic event is covered under most Australian home and business insurance policies as an emergency make-safe or contents damage claim. We provide full documentation — incident description, scope of works, disposal manifests — required for claims. Contact your insurer as soon as possible and do not disturb the scene before professional assessment.',
      },
    }
  ],
});

export default function BloodSpillCleanupServicesPage() {
  return (
    <>
      <Script id="blood-cleanup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Blood Spill Cleanup Services',
        subtitle: 'Professional blood spill cleanup services services across Australia. 24/7 emergency response for bloodborne pathogen, accident cleanup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Blood Spill Cleanup Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Blood Spill Cleanup Services', parentCategory: 'Biohazard Cleaning', context: 'bloodborne pathogen and blood spill decontamination' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
