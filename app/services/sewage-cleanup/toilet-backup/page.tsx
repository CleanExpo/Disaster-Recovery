import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Toilet Sewage Backup Cleanup',
  description: 'Professional toilet sewage backup cleanup services across Australia. 24/7 emergency response for toilet overflow, bathroom sewage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/toilet-backup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does a toilet backup into a bath or floor drain in other bathrooms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When the main sewer lateral is blocked downstream, backpressure causes sewage to emerge from the lowest available drain point — typically a bath drain, floor waste, or second toilet. This indicates a blockage in the main lateral or at the connection to the council sewer, not a single fixture problem. High-pressure water jetting of the main lateral is required. Standard plunging of individual fixtures will not resolve a main line blockage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do immediately after a sewage toilet backup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stop using all plumbing fixtures in the property immediately — flushing or running water worsens the backup. Do not use a mop or standard wet vacuum — these spread contaminated water and are not safe for Category 3 contamination. Ventilate the area. Call a licensed plumber for emergency drain clearing and an IICRC-certified restoration contractor for extraction and decontamination. Photograph all affected areas before cleanup begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is toilet backup damage covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sudden sewage backup or overflow is covered under most Australian home insurance policies. Contents damaged by sewage — flooring, cabinetry, soft furnishings — are claimable under home and contents insurance. The key is acting promptly: delays in extraction increase the scope of damage and may attract scrutiny from the insurer regarding whether preventive action was taken. NRPG\'s emergency response documentation protects your claim.',
      },
    }
  ],
});

export default function ToiletSewageBackupCleanupPage() {
  return (
    <>
      <Script id="toilet-backup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Toilet Sewage Backup Cleanup',
        subtitle: 'Professional toilet sewage backup cleanup services across Australia. 24/7 emergency response for toilet overflow, bathroom sewage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Toilet Sewage Backup Cleanup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Toilet Sewage Backup Cleanup', parentCategory: 'Sewage Cleanup', context: 'toilet overflow and bathroom sewage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
