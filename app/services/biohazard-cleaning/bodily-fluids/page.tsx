import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Bodily Fluid Cleanup',
  description: 'Professional bodily fluid cleanup services across Australia. 24/7 emergency response for vomit cleanup, human waste.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/bodily-fluids',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What category of biohazard are bodily fluids?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bodily fluids — vomit, urine, faeces, blood, and other biological secretions — are classified as Category 2 to Category 3 biohazards depending on the presence of bloodborne pathogens. They present risks of bacterial infection (E. coli, Salmonella, Staphylococcus) and viral transmission. Cleanup requires hospital-grade disinfection, appropriate PPE, and waste disposal under biological waste regulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you decontaminate carpets and soft furnishings after bodily fluid exposure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Carpets and soft furnishings affected by bodily fluids are assessed for salvageability. Localised contamination on carpet may be treatable with enzyme-based biological cleaners and hospital-grade disinfectants followed by extraction drying. Severe or widespread contamination typically requires removal and disposal. Upholstered furniture is usually non-restorable after significant bodily fluid exposure due to deep penetration into foam.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly should bodily fluid cleanup be completed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immediately — pathogens in bodily fluids degrade surfaces and remain infectious for hours to days. The longer cleanup is delayed, the greater the contamination spread and structural damage. NRPG provides 24/7 emergency biohazard response. Occupants should not re-enter the contaminated area until clearance testing confirms pathogen elimination.',
      },
    }
  ],
});

export default function BodilyFluidCleanupPage() {
  return (
    <>
      <Script id="bodily-fluids-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Bodily Fluid Cleanup',
        subtitle: 'Professional bodily fluid cleanup services across Australia. 24/7 emergency response for vomit cleanup, human waste.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Bodily Fluid Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Bodily Fluid Cleanup', parentCategory: 'Biohazard Cleaning', context: 'vomit and human waste sanitisation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
