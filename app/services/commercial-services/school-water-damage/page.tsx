import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'School Water Damage Cleanup',
  description: 'Professional school water damage cleanup services across Australia. 24/7 emergency response for education facility, classroom flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/school-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can students return to school during water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students should not return to affected areas until they are certified dry, decontaminated, and safe. NRPG works with school leadership to establish a restoration timeline that accounts for term dates. In some cases, unaffected classrooms and facilities remain open while restoration proceeds in isolated areas. We prioritise approaches that minimise disruption to the school year.',
      },
    },
    {
      '@type': 'Question',
      name: 'What indoor air quality requirements apply during school restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'School environments have heightened duty of care for indoor air quality. NRPG deploys HEPA air scrubbers in restoration zones and monitors air quality throughout the project. Mould remediation in school environments follows IICRC S520:2025 protocols with clearance testing before reoccupation. All work complies with your state\'s school facilities guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who pays for school water damage restoration — the school or the government?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Government schools typically carry state government insurance through agencies such as Treasury Managed Fund (NSW) or similar. Independent and Catholic schools carry their own commercial insurance. We work with whichever insurer or authority is responsible, providing IICRC-certified documentation to support the claim and approval process.',
      },
    }
  ],
});

export default function SchoolWaterDamageCleanupPage() {
  return (
    <>
      <Script id="school-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'School Water Damage Cleanup',
        subtitle: 'Professional school water damage cleanup services across Australia. 24/7 emergency response for education facility, classroom flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'School Water Damage Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'School Water Damage Cleanup', parentCategory: 'Commercial Services', context: 'education facility and classroom flooding restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
