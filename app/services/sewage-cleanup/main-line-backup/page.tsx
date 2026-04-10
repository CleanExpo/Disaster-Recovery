import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Main Sewer Line Backup',
  description: 'Professional main sewer line backup services across Australia. 24/7 emergency response for sewer blockage, main drain backup.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/main-line-backup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes a main sewer line backup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Main sewer line backups are caused by: tree root intrusion into clay or PVC pipes; collapsed or cracked pipe sections; grease and solid material accumulation; offset pipe joints from ground movement; and during heavy rainfall, surcharging of council sewer mains that causes wastewater to backflow into private properties through the lowest drain point. Properties without a backflow prevention valve (reflux valve) on the sewer connection are most vulnerable during storm events.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is responsible for repairing a main line sewer backup — the property owner or the council?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The sewer lateral (the pipe from your property boundary to the main) is the property owner\'s responsibility. The main sewer (in the street) is the council or water authority\'s responsibility. If the backup was caused by a surcharging council main, you may have a claim against the council. NRPG documents the sewage ingress point and cause to assist you in determining liability and making the appropriate claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you prevent future main line sewer backups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prevention measures include: installation of a reflux (backflow prevention) valve on the sewer lateral; CCTV inspection of the sewer lateral to identify root intrusion or pipe damage before failure; regular high-pressure jet cleaning of the lateral; and avoiding disposal of fats, oils, and grease down kitchen drains. NRPG can arrange CCTV sewer inspection and coordinate plumbing rectification works as part of the post-cleanup scope.',
      },
    }
  ],
});

export default function MainSewerLineBackupPage() {
  return (
    <>
      <Script id="main-line-backup-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Main Sewer Line Backup',
        subtitle: 'Professional main sewer line backup services across Australia. 24/7 emergency response for sewer blockage, main drain backup.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Main Sewer Line Backup' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Main Sewer Line Backup', parentCategory: 'Sewage Cleanup', context: 'main sewer blockage and drain backup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
