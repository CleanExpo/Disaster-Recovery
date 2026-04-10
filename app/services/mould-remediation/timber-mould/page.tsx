import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Timber Mould Treatment',
  description: 'Professional timber mould treatment services across Australia. 24/7 emergency response for wood rot, structural mould.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/mould-remediation/timber-mould',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can timber framing be saved after mould growth or does it need replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timber framing affected by surface mould — where mould has not penetrated deeply into the wood grain — can typically be treated and retained. NRPG uses HEPA vacuuming, sanding, and penetrating antifungal treatment to remediate surface mould on structural timber. Timber with deep mould penetration, fungal decay, or structural compromise from wood rot must be replaced. A structural assessment determines which elements are restorable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you treat mould on exposed timber beams and floorboards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Exposed decorative or structural timber is treated with dry ice blasting, HEPA vacuuming, and penetrating antifungal treatment in preference to wet chemical methods that add moisture. Staining from mould is addressed with light sanding and re-finishing after treatment is complete and the timber is confirmed dry. We assess whether mould penetration has damaged the timber\'s surface integrity before recommending a finishing approach.',
      },
    },
    {
      '@type': 'Question',
      name: 'What moisture content is acceptable in timber after mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520:2025 and IICRC S500:2025 require timber to reach equilibrium moisture content (EMC) for the local climate before remediation is considered complete — typically 10-16% for Australian conditions. We take moisture readings at each visit during the drying phase and only certify timber as dry when readings are within the target range. Premature encapsulation of wet timber causes mould recurrence.',
      },
    }
  ],
});

export default function TimberMouldTreatmentPage() {
  return (
    <>
      <Script id="timber-mould-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Timber Mould Treatment',
        subtitle: 'Professional timber mould treatment services across Australia. 24/7 emergency response for wood rot, structural mould.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation', href: '/services/mould-remediation' },
        { label: 'Timber Mould Treatment' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Timber Mould Treatment', parentCategory: 'Mould Remediation', context: 'wood rot and structural timber mould treatment' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
