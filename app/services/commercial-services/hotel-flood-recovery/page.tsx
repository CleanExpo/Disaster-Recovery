import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Hotel Flood Restoration',
  description: 'Professional hotel flood restoration services across Australia. 24/7 emergency response for accommodation flooding, guest room water.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/hotel-flood-recovery',
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you restore a hotel after flooding with minimal guest disruption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG works in stages — containing and extracting affected rooms while keeping unaffected areas operational. Drying equipment is installed and monitored remotely. Intensive work is scheduled during low-occupancy periods. We coordinate directly with your facilities manager and can set up a temporary operations area if required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long before flood-damaged hotel rooms can be re-let?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard water damage to a hotel room typically takes 3–5 days for structural drying under IICRC S500:2025 protocols. With rapid extraction and commercial-grade equipment, rooms may clear sooner. Category 3 contamination (sewage or floodwater) requires longer decontamination. We provide daily moisture readings so you know exactly when each room is ready.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does hotel flood damage fall under commercial property insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Commercial property policies cover sudden flood and water damage events. Business interruption insurance may also apply for revenue loss during restoration. We provide IICRC-certified scope of works, moisture drying logs, and room-by-room photographic evidence to support your insurer\'s assessment.',
      },
    },
  ],
});

export default function HotelFloodRestorationPage() {
  return (
    <>
      <Script id="hotel-flood-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
          icon: <Building2 className="h-12 w-12" />,
          title: 'Hotel Flood Restoration',
          subtitle: 'Professional hotel flood restoration services across Australia. 24/7 emergency response for accommodation flooding, guest room water.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Commercial Services', href: '/services/commercial-services' },
          { label: 'Hotel Flood Restoration' },
        ]}
        sections={getServiceChildSections({ serviceName: 'Hotel Flood Restoration', parentCategory: 'Commercial Services', context: 'accommodation flooding and guest room water damage' })}
        relatedPages={getRelatedPages('water-damage')}
      />
    </>
  );
}
