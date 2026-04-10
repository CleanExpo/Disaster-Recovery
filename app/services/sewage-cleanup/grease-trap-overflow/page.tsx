import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Grease Trap Overflow',
  description: 'Professional grease trap overflow services across Australia. 24/7 emergency response for commercial kitchen, grease spill.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/grease-trap-overflow',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a grease trap overflow and what contamination risks does it create?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A grease trap overflow occurs when the grease interceptor in a commercial kitchen is full or blocked, causing FOG (fats, oils, and grease) and wastewater to back up into the kitchen floor drains, plumbing fixtures, or across the floor. Grease trap overflow is Category 2-3 contamination (grey-black water) — it contains food waste bacteria, pathogens, and high BOD (biological oxygen demand) that degrades surfaces and creates health risks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a grease trap overflow require council notification?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most Australian states and territories, grease trap overflows that discharge to the street, stormwater drains, or waterways must be reported to the local council and potentially the environmental protection authority. Discharge to sewerage is less critical but still a reportable incident in some jurisdictions. NRPG provides incident documentation to assist with your regulatory notification.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is a commercial kitchen restored after a grease trap overflow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Restoration involves: extraction of grease-contaminated wastewater; removal of all food products in contact with overflow; high-pressure hot water washing of all affected surfaces with degreaser; hospital-grade disinfection; floor drain cleaning; and air quality verification. The grease trap must be professionally serviced and cleared before the kitchen resumes operation. We recommend a council environmental health clearance before reopening food service operations.',
      },
    }
  ],
});

export default function GreaseTrapOverflowPage() {
  return (
    <>
      <Script id="grease-trap-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Grease Trap Overflow',
        subtitle: 'Professional grease trap overflow services across Australia. 24/7 emergency response for commercial kitchen, grease spill.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Grease Trap Overflow' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Grease Trap Overflow', parentCategory: 'Sewage Cleanup', context: 'commercial kitchen grease trap overflow cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
