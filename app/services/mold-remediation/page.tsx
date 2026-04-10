import { Metadata } from 'next';
import Script from 'next/script';
import { Bug } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mould Remediation Services',
  description: 'Professional mould remediation services following IICRC S520:2025 standards. Black mould removal, toxic mould cleanup, mould testing and inspection. Licensed technicians available 24/7.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Mould Remediation',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Mould Remediation Services | IICRC S520:2025 Certified',
  description: 'Professional mould remediation services following IICRC S520:2025 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
  keywords: [
    'mould remediation',
    'black mould removal',
    'mould removal services',
    'toxic mould cleanup',
    'IICRC S520:2025 certified',
    'mould inspection',
    'mould testing',
    'mould remediation company',
    'professional mould removal',
    'mould contamination cleanup',
    'indoor air quality',
    'mould spore removal',
    'mould damage restoration',
    'certified mould specialists',
    'microbial remediation'
  ],
  openGraph: {
    title: 'Professional Mould Remediation | IICRC S520:2025 Certified Specialists',
    description: 'Expert mould remediation services following IICRC S520:2025 standards. Comprehensive black mould removal and toxic mould cleanup with 24/7 emergency response.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mould Remediation Services | IICRC S520:2025 Certified',
    description: 'Expert mould remediation services. IICRC S520:2025 certified technicians. Professional black mould removal available 24/7.',
  },
  alternates: {
    canonical: '/services/mould-remediation' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between mould removal and mould remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould removal implies eliminating all mould — which is not achievable, as mould spores exist naturally in all indoor and outdoor environments. Mould remediation is the correct industry term, describing the process of reducing mould levels to naturally occurring background concentrations by removing contaminated materials, cleaning affected surfaces, and addressing the underlying moisture source. IICRC S520 (Standard for Professional Mould Remediation, 2023 edition) defines the protocols used by certified contractors across Australia for all mould remediation projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the health risks associated with mould in Australian buildings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould exposure can cause a range of health effects depending on species, spore concentration, and individual sensitivity. Common effects include allergic reactions, rhinitis, asthma exacerbation, skin and eye irritation, and respiratory infections. Toxigenic species such as Stachybotrys chartarum and Aspergillus flavus can produce mycotoxins that cause more serious systemic effects. NSW Health, Queensland Health, and the AIHA identify children, elderly persons, pregnant women, and immunocompromised individuals as higher-risk groups requiring priority remediation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover mould remediation in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage depends on the cause of the mould. Mould resulting from a sudden and accidental insured event — such as a burst pipe or storm water ingress — is typically covered under standard home insurance policies. Mould from gradual or maintenance-related moisture ingress is generally excluded as a maintenance issue. Insurers may require IICRC-certified contractors and independent testing. Policy wording should be reviewed carefully; the Australian Financial Complaints Authority (AFCA) handles unresolved claim disputes where coverage is contested.',
      },
    }
  ],
});

export default function MoldRemediationPage() {
  return (
    <>
    <Script id="mold-remediation-schema" type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
    <Script id="mold-remediation-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-mould-remediation.webp',
        icon: <Bug className="h-12 w-12" />,
        title: 'Mould Remediation Services',
        subtitle: 'Professional mould remediation services following IICRC S520:2025 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-mould-remediation.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Mould Remediation Services' },
      ]}
      sections={getServiceChildSections({ serviceName: 'Mould Remediation Services', parentCategory: 'Mould Remediation', context: 'IICRC S520:2025 certified black mould removal and toxic mould cleanup' })}
      relatedPages={getRelatedPages('biohazard')}
    />
    </>
  );
}
