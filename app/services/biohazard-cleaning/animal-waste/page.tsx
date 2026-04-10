import { Metadata } from 'next';
import Script from 'next/script';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Animal Waste Cleanup',
  description: 'Professional animal waste cleanup services across Australia. 24/7 emergency response for pet hoarding, feces removal.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning/animal-waste',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What health risks does animal waste present in a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Animal waste — including rodent droppings, bird faeces, bat guano, and pet waste — contains bacteria, fungi, parasites, and viruses including Hantavirus, Salmonella, Cryptosporidium, and Histoplasma capsulatum. Disturbing dried faeces releases airborne particles that can cause serious respiratory illness. Professional biohazard cleanup with HEPA filtration and full PPE is required — do not attempt DIY removal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I clean up animal waste myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Animal waste remediation requires Class P2/P3 respiratory protection, chemical-resistant PPE, and HEPA-filtered vacuums. Standard cleaning products do not neutralise biohazardous pathogens. Dried rodent droppings in particular must never be swept or vacuumed without HEPA filtration as this aerosolises Hantavirus particles. Professional decontamination ensures the area is certified pathogen-free before reoccupation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is animal waste cleanup covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage depends on how the infestation occurred. Sudden damage events — such as a wildlife intrusion after storm damage — are more likely to be covered than gradual infestations. Review your Product Disclosure Statement under vermin or pest damage exclusions. We provide assessment documentation that clearly describes the cause and scope to support your claim.',
      },
    }
  ],
});

export default function AnimalWasteCleanupPage() {
  return (
    <>
      <Script id="animal-waste-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-biohazard.webp',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Animal Waste Cleanup',
        subtitle: 'Professional animal waste cleanup services across Australia. 24/7 emergency response for pet hoarding, feces removal.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-biohazard.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Biohazard Cleaning', href: '/services/biohazard-cleaning' },
        { label: 'Animal Waste Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Animal Waste Cleanup', parentCategory: 'Biohazard Cleaning', context: 'animal waste and pet hoarding remediation' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
