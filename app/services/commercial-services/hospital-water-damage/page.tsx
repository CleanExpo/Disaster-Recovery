import { Metadata } from 'next';
import Script from 'next/script';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Healthcare Facility Water Damage',
  description: 'Professional healthcare facility water damage services across Australia. 24/7 emergency response for medical facility, hospital flooding.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/commercial-services/hospital-water-damage',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you restore water damage in a hospital without disrupting patient care?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG develops a staged restoration plan with your facilities and infection control teams before work begins. Containment is set up to prevent moisture migration and dust spread to clinical areas. HEPA air filtration is deployed. Work in patient care zones is scheduled during low-census periods or after hours. All personnel comply with your hospital\'s infection control protocols.',
      },
    },
    {
      '@type': 'Question',
      name: 'What infection control requirements apply to hospital water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Healthcare facilities have strict infection control requirements — restoration contractors must comply with your hospital\'s Infection Control Risk Assessment (ICRA) protocols. NRPG technicians are trained in healthcare environment standards including containment barrier requirements, HEPA filtration, PPE protocols, and decontamination procedures appropriate to clinical settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can water-damaged clinical equipment be restored?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clinical and medical equipment must be assessed by qualified biomedical technicians before reuse. Water exposure may compromise sterility, calibration, and electrical safety. Do not use water-exposed clinical equipment until formally cleared. NRPG coordinates with your biomedical team and notifies relevant stakeholders per your facility\'s incident management protocol.',
      },
    }
  ],
});

export default function HealthcareFacilityWaterDamagePage() {
  return (
    <>
      <Script id="hospital-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Healthcare Facility Water Damage',
        subtitle: 'Professional healthcare facility water damage services across Australia. 24/7 emergency response for medical facility, hospital flooding.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Commercial Services', href: '/services/commercial-services' },
        { label: 'Healthcare Facility Water Damage' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Healthcare Facility Water Damage', parentCategory: 'Commercial Services', context: 'medical facility and hospital flooding restoration' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
