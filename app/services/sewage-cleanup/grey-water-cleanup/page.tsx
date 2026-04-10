import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Grey Water Damage Cleanup',
  description: 'Professional grey water damage cleanup services across Australia. 24/7 emergency response for washing machine water, sink overflow.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/grey-water-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is grey water and does it require professional cleanup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Grey water (Category 2 water under IICRC S500:2025) is wastewater from washing machines, dishwashers, shower and bath drains, and hand basin drains — not toilet waste. It contains soap residues, bacteria, and biological matter that poses a health risk but is less severe than sewage (Category 3). While less hazardous than black water, grey water affecting building materials still requires professional extraction, antimicrobial treatment, and structural drying to prevent mould and secondary contamination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can grey water become black water?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Category 2 (grey water) degrades to Category 3 (black water) after 24-72 hours as bacteria multiply in the warm wet environment. The longer grey water sits in building materials, the more contaminated it becomes. This is why rapid extraction and drying are critical even for grey water events — delayed response turns a Category 2 remediation into a Category 3 job with significantly higher cost and more extensive material disposal requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What grey water sources most commonly cause building damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common grey water damage sources in Australian homes are: washing machine supply hose failure (typically a sudden, high-volume flood); dishwasher overflow or door seal failure; shower hob failure or waterproofing breakdown; and overflow of the bath or hand basin due to a blocked drain. Washing machine supply hoses have an expected lifespan of 5-10 years — stainless braided hoses significantly reduce failure risk.',
      },
    }
  ],
});

export default function GreyWaterDamageCleanupPage() {
  return (
    <>
      <Script id="grey-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Grey Water Damage Cleanup',
        subtitle: 'Professional grey water damage cleanup services across Australia. 24/7 emergency response for washing machine water, sink overflow.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Grey Water Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Grey Water Damage Cleanup', parentCategory: 'Sewage Cleanup', context: 'washing machine and sink overflow cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
