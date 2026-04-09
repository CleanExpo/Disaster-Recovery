import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import ServiceChildLinks from '@/components/seo/ServiceChildLinks';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly should water damage be treated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage should be treated within 24–48 hours to prevent mould growth and structural deterioration. IICRC-certified technicians should extract standing water immediately and begin structural drying as soon as the water source is controlled.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is water damage covered by home insurance in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian home insurance policies cover sudden and accidental water damage from burst pipes, storm, or flooding. Gradual leaks or maintenance issues are generally excluded. Lodge your claim promptly and request an IICRC-certified assessor to document the full scope of damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the IICRC S500:2025 standard for water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ANSI/IICRC S500:2025 Standard for Professional Water Damage Restoration is the industry benchmark in Australia. It governs inspection, drying, documentation, and psychrometric monitoring. NRPG contractors are certified to this standard and provide full drying logs for insurer sign-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does water damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Structural drying typically takes 3–5 days for clean water losses and up to 2 weeks for Category 2–3 water events. Full repairs including plasterboard, flooring, and painting may take 2–8 additional weeks depending on scope and insurer approval timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I stay in my home during water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on the severity of the damage and safety assessments. For contained losses, temporary relocation may not be required. For Category 3 (sewage or floodwater) or extensive structural damage, temporary accommodation is recommended. Your insurer may cover accommodation costs under your Additional Living Expenses (ALE) benefit.',
      },
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Water Damage Restoration',
  description: 'Professional water damage restoration following ANSI/IICRC S500:2025 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Water Damage Restoration',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Water Damage Restoration | 24/7 IICRC S500:2025',
  description: 'Professional water damage restoration following ANSI/IICRC S500:2025 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
  keywords: 'water damage restoration, flood cleanup, water extraction, structural drying, IICRC S500:2025, emergency water removal, burst pipe repair, sewage cleanup, basement flooding, water mitigation',
  openGraph: {
    title: 'Emergency Water Damage - IICRC Certified Professionals',
    description: 'Immediate response for water damage emergencies. IICRC S500:2025 certified technicians, advanced drying equipment, IICRC-certified. Submit your claim online now.',
    type: 'website' },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage' }
};

export default function WaterDamageRestorationPage() {
  return (
    <>
    <Script id="water-damage-faq-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <Script id="water-damage-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1565C0 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
        icon: <Droplets className="h-12 w-12" />,
        title: 'Water Damage Restoration Services',
        subtitle: 'Professional water damage restoration following ANSI/IICRC S500:2025 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Water Damage Restoration Services' },
      ]}
      sections={[
        {
          heading: 'Water Damage Restoration Services',
          body: <ServiceChildLinks category="water-damage" />,
        },
      ]}
      relatedPages={getRelatedPages('water-damage')}
    />
    </>
  );
}
