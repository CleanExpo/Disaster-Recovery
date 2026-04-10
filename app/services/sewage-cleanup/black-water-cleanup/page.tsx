import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Black Water Contamination',
  description: 'Professional black water contamination services across Australia. 24/7 emergency response for category 3 water, hazardous sewage.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup/black-water-cleanup',
  },
};


const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is black water and why is it the most dangerous water category?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Black water (Category 3 water under IICRC S500:2025) is water that is grossly contaminated with pathogenic organisms — sewage, floodwater containing agricultural or industrial runoff, seawater, and water that has been standing long enough that bacteria have multiplied to dangerous levels. It contains enteric pathogens capable of causing serious illness. All porous materials in contact with black water must be removed. All non-porous surfaces require clinical-grade disinfection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What PPE is required for black water cleanup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Black water cleanup requires Class P2 or P3 respiratory protection, full disposable coveralls, chemical-resistant gloves (double-gloving recommended), and waterproof boots. Eye protection (goggles, not safety glasses) prevents splash exposure. Skin wounds must be covered with waterproof dressings. All PPE is disposed of as biological waste after use. Vaccination against Hepatitis A and Tetanus is recommended for technicians working regularly with Category 3 water.',
      },
    },
    {
      '@type': 'Question',
      name: 'What surfaces can be saved after black water exposure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Concrete, ceramic tiles, steel, and other non-porous sealed surfaces can be decontaminated with appropriate hospital-grade disinfectants and EPA-registered biocides if cleaned within 24-48 hours. All porous materials — carpet, plasterboard, timber (except sealed or painted surfaces at the extreme non-porous end), insulation, and particleboard — must be removed and disposed of. Structural timber in contact with Category 3 water is assessed individually.',
      },
    }
  ],
});

export default function BlackWaterContaminationPage() {
  return (
    <>
      <Script id="black-water-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-sewage-cleanup.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Black Water Contamination',
        subtitle: 'Professional black water contamination services across Australia. 24/7 emergency response for category 3 water, hazardous sewage.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-sewage-cleanup.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Sewage Cleanup', href: '/services/sewage-cleanup' },
        { label: 'Black Water Contamination' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Black Water Contamination', parentCategory: 'Sewage Cleanup', context: 'category 3 water and hazardous sewage cleanup' })}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
