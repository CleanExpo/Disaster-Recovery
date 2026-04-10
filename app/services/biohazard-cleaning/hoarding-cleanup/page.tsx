import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hoarding Cleanup Services',
  description: 'Professional hoarding cleanup services services across Australia. 24/7 emergency response for hoarder house, extreme cleaning.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/hoarding-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What biohazard risks are present in a hoarding cleanup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Severely hoarded properties frequently contain rodent infestations with associated droppings and urine, mould from trapped moisture and decomposing organic matter, insect infestations, rotting food, sharps, and decaying animal carcasses. These create compounding biohazard risks requiring full PPE, respirators, and HEPA filtration during cleanup. Structural damage from weight loads and water infiltration through inaccessible areas is also common.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you manage a hoarding cleanup sensitively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG works with the property owner, family members, or appointed guardian to categorise items before disposal. Items are photographed and sorted into retain, donate, and dispose categories. We do not arbitrarily discard items without consent except where immediate biohazard risk requires it. Our team is trained in trauma-informed practice and maintains respect and dignity throughout the process.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a hoarding cleanup take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single-room hoarding cleanup typically takes 1-2 days. A whole-property extreme hoarding remediation — with biohazard contamination, structural repair, and full decontamination — can take 1-4 weeks depending on the volume of material, structural condition, and depth of contamination. We provide a scoped timeline after initial assessment.',
      },
    }
  ],
});

export default function HoardingCleanupServicesPage() {
  return (
    <>
      <Script id="hoarding-cleanup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Hoarding Cleanup Services',
        subtitle: 'Professional hoarding cleanup services services across Australia. 24/7 emergency response for hoarder house, extreme cleaning.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Hoarding Cleanup Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Hoarding Cleanup Services', parentCategory: 'Biohazard Cleaning', context: 'hoarder house and extreme cleaning' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
