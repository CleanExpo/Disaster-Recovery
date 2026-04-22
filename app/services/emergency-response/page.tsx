import { Metadata } from 'next';
import Script from 'next/script';
import { Siren } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getServiceChildSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '24/7 Emergency Response Services',
  description: 'Professional 24/7 emergency response services for disaster recovery. Water damage, fire damage, storm damage emergency mitigation. Target 60-minute metropolitan response; regional times vary.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Emergency Response',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: '24/7 Emergency Response | 1-Hour Response',
  description: 'Professional 24/7 emergency response services for disaster recovery. Water damage, fire damage, storm damage emergency mitigation. Target 60-minute metropolitan response; regional times vary.',
  keywords: [
    'emergency response services',
    '24/7 emergency response',
    'disaster emergency response',
    'emergency mitigation',
    'emergency restoration',
    'rapid response team',
    'emergency water extraction',
    'emergency board up',
    'emergency tarping',
    'disaster response team',
    'emergency cleanup',
    'immediate response',
    'emergency contractors',
    '24 hour emergency service',
    'disaster mitigation'
  ],
  openGraph: {
    title: '24/7 Online Emergency Response Services | 1-Hour Response Time',
    description: 'Professional 24/7 emergency response for disaster recovery. Rapid response team available for water, fire, and storm damage emergencies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '24/7 Online Emergency Response Services',
    description: 'Professional emergency response team available 24/7. Target 60-minute metropolitan response for disaster recovery emergencies.',
  },
  alternates: {
    canonical: '/services/emergency-services' },
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
      name: 'What constitutes a property emergency requiring immediate professional response?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A property emergency is any event causing sudden, significant damage that creates immediate health, safety, or structural risk — or where delayed response will substantially worsen the damage. Common triggers include burst pipes, sewage overflow, severe storm damage, fire, flooding, and unattended deaths. The IICRC defines emergency conditions where mitigation must begin within 24-48 hours to prevent secondary damage such as mould growth, structural deterioration, or contamination spread. Delayed response can also affect insurance claim validity under policy mitigation obligations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a professional emergency response assessment include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A professional emergency response assessment covers: source identification and isolation, safety assessment of structural integrity and electrical and gas systems, water category and classification per IICRC S500 (Categories 1, 2, or 3), affected material mapping, moisture mapping using thermal imaging and calibrated metres, immediate extraction and stabilisation requirements, and documentation for insurance notification. This assessment forms the basis of the emergency mitigation scope and is provided to the insurer as part of initial claim lodgement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can NRPG contractors respond to a property emergency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG\'s contractor network is structured for 24/7 response across metropolitan and regional areas. Emergency response times vary by location — metropolitan areas typically achieve on-site attendance within 2-4 hours, and regional areas within 4-8 hours where contractors are available. For declared disaster events affecting widespread areas, NRPG deploys multiple contractor teams to triage the most urgent jobs and coordinates response according to hazard severity and access clearances from state emergency services.',
      },
    }
  ],
});

export default function EmergencyResponsePage() {
  const schemaStr = JSON.stringify(serviceSchema);
  return (
    <>
    <Script id="emergency-response-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />
    <Script id="emergency-response-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-emergency-response.webp',
        icon: <Siren className="h-12 w-12" />,
        title: '24/7 Online Emergency Response Services',
        subtitle: 'Professional 24/7 emergency response services for disaster recovery. Water damage, fire damage, storm damage emergency mitigation. Target 60-minute metropolitan response; regional times vary.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-emergency-response.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: '24/7 Online Emergency Response Services' },
      ]}
      sections={getServiceChildSections({ serviceName: '24/7 Online Emergency Response Services', parentCategory: 'Emergency Services', context: 'rapid disaster mitigation and emergency response' })}
      relatedPages={getRelatedPages('emergency')}
    />
    </>
  );
}
