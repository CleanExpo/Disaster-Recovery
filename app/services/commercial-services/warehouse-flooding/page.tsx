import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Warehouse Flood Cleanup',
  description: 'Professional warehouse flood cleanup services across Australia. 24/7 emergency response for industrial flooding, storage water damage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/warehouse-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you dry out a large warehouse after flooding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Large-volume warehouse drying requires industrial dehumidifiers, high-capacity air movers, and sometimes temporary heating or refrigeration to control temperature and humidity. NRPG conducts a psychrometric analysis to calculate the required equipment capacity for the space volume and structural materials. Drying typically takes 3-7 days for standard warehouse construction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can racking, machinery, and stock be left in place during warehouse drying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Where possible, racking stays in place if structurally sound. Equipment and stock on affected floors must be lifted or moved to allow drying of the floor slab. Porous pallet stock (cardboard, timber) in direct contact with floodwater must be assessed for salvageability. NRPG minimises operational disruption with a staged approach.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does warehouse flood damage affect fire sprinkler certification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the flooding event involved sprinkler activation or if sprinkler infrastructure was submerged, the system must be inspected and certified by a licensed fire protection engineer before reactivation. Do not assume the sprinkler system is operational after flooding. We coordinate with your fire protection contractor as part of the building clearance process.',
      },
    }
  ],
});

export default function WarehouseFloodCleanupPage() {
  return (
    <>
      <Script id="warehouse-flood-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Warehouse Flood Cleanup',
        subtitle: 'Professional warehouse flood cleanup services across Australia. 24/7 emergency response for industrial flooding, storage water damage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Warehouse Flood Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Warehouse Flood Cleanup', parentCategory: 'Commercial Services', context: 'industrial flooding and storage water damage recovery' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
