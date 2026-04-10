import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Basement Flooding Cleanup | 24/7 Response',
  description: 'Emergency basement flooding cleanup and restoration across Australia. 24/7 water extraction, drying, and flood damage repair services. IICRC-certified.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage/basement-flooding',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does basement flooding damage building materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Concrete absorbs water slowly but connected timber elements — floor joists, bearer, stud walls — begin absorbing moisture within hours. After 24-48 hours, mould can begin growing on wet timber and plasterboard. Electrical systems submerged in basement flooding must be de-energised and inspected before any power is restored. IICRC S500:2025 requires structural drying to begin as soon as extraction is complete — not after insurance approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes basement flooding in Australian homes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common causes include: surface water ingress through window wells and door thresholds during heavy rain; groundwater rising through the floor slab (hydrostatic pressure); plumbing failures inside the basement; and blocked or failed sump pumps. Properties in low-lying areas or with high water tables are at greatest risk. Waterproofing failures in basement walls and slabs are a common cause in older construction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a flooded basement be self-dried with fans and a consumer dehumidifier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Consumer dehumidifiers and box fans do not have the capacity to dry structural materials in a flooded basement. They may reduce surface moisture but leave deep moisture in the slab, wall footings, and framing. This results in mould growth within weeks. Commercial desiccant dehumidifiers and high-velocity air movers are required. NRPG calculates the equipment capacity needed using psychrometric analysis of the actual space volume and material moisture content.',
      },
    }
  ],
});

export default function BasementFloodingPage() {
  return (
    <>
      <Script id="basement-flooding-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Basement Flooding Cleanup',
        subtitle: 'Emergency basement flooding cleanup and restoration across Australia. 24/7 water extraction, drying, and flood damage repair services. IICRC-certified.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Basement Flooding Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Basement Flooding Cleanup', parentCategory: 'Water Damage', context: 'basement water extraction and flood damage repair' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
