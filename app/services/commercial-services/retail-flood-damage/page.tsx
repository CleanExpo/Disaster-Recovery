import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Retail Store Flood Recovery',
  description: 'Professional retail store flood recovery services across Australia. 24/7 emergency response for shop flooding, retail water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/retail-flood-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can a retail store remain trading during flood damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In many cases, yes. If only part of the store is affected, unaffected trading areas can remain open while restoration proceeds behind containment barriers. NRPG installs barriers and drying equipment to minimise customer-facing disruption. Staging and visual merchandising adjustments can help maintain a professional trading environment during restoration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is stock and inventory handled after retail flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stock affected by water is separated into salvageable and non-salvageable categories. Salvageable stock is moved to a dry area for cleaning and assessment. Non-salvageable stock is documented with photographs, SKU records, and replacement cost evidence for your contents and stock insurance claim. Never dispose of damaged stock before photographing it for insurance purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does retail property insurance cover flood damage to stock?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commercial property insurance covers the building structure. Stock (inventory) is typically covered under a separate commercial contents or business property policy up to the declared stock value. Business interruption cover may apply for trading losses. We help coordinate documentation across all policy types.',
      },
    }
  ],
});

export default function RetailStoreFloodRecoveryPage() {
  return (
    <>
      <Script id="retail-flood-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Retail Store Flood Recovery',
        subtitle: 'Professional retail store flood recovery services across Australia. 24/7 emergency response for shop flooding, retail water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Retail Store Flood Recovery' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Retail Store Flood Recovery', parentCategory: 'Commercial Services', context: 'shop flooding and retail water damage restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
