import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Natural Disaster Response',
  description: 'Professional natural disaster response services across Australia. 24/7 emergency response for catastrophe response, major event.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-services/disaster-response',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between emergency response and standard restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency response is the immediate make-safe phase — stopping active damage, extracting standing water, boarding broken openings, and stabilising the structure within the first 24-72 hours. Standard restoration is the full reinstatement phase — drying, decontamination, structural repair, and fit-out — which follows after emergency make-safe is complete and insurance approval is obtained. NRPG handles both phases under a single coordinated scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does NRPG manage large-scale disaster response across multiple properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG maintains a national network of IICRC-certified contractors with surge capacity for catastrophic events. During major disasters — cyclones, floods, bushfires — we activate a coordinated dispatch system, prioritising properties by risk severity. Large commercial and strata properties are assigned dedicated project managers. We coordinate directly with insurers, loss adjusters, and government recovery agencies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do in the first hour after a disaster before help arrives?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Safety first — evacuate if the structure is unsafe. Turn off electricity and gas at the mains if it is safe to do so. Do not enter flood-affected rooms if there is any risk of electrical hazard. Take photographs of all damage before touching anything. Move valuables to a dry area if safe. Contact your insurer to register the claim, then call NRPG for emergency dispatch. Do not dispose of any damaged items before they are documented.',
      },
    }
  ],
});

export default function NaturalDisasterResponsePage() {
  return (
    <>
      <Script id="disaster-response-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: 'Natural Disaster Response',
        subtitle: 'Professional natural disaster response services across Australia. 24/7 emergency response for catastrophe response, major event.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Emergency Services', href: '/services/emergency-services' },
        { label: 'Natural Disaster Response' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Natural Disaster Response', parentCategory: 'Emergency Services', context: 'catastrophe response and major event recovery' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
