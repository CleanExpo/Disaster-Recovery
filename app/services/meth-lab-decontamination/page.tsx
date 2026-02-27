import { Metadata } from 'next';
import Script from 'next/script';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityServicePageTemplate } from '@/components/antigravity';
import { methLabDecontaminationData } from '@/components/antigravity';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Clandestine Drug Lab Decontamination',
  description: 'Professional clandestine drug laboratory decontamination and methamphetamine residue remediation. NATA-accredited testing, council clearance certificates, and Level C hazmat protocols across Australia.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Drug Lab Decontamination',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
  hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
};

export const metadata: Metadata = {
  title: 'Clandestine Drug Lab Decontamination',
  description:
    'Professional clandestine drug laboratory decontamination and methamphetamine residue remediation. NATA-accredited testing, council clearance certificates, and Level C hazmat protocols across Australia.',
  keywords: [
    'meth lab decontamination',
    'clandestine drug lab remediation',
    'methamphetamine residue removal',
    'drug lab cleanup Australia',
    'NATA accredited testing',
    'council clearance certificate',
    'hazmat decontamination',
  ].join(', '),
  openGraph: {
    title: 'Drug Lab Decontamination',
    description:
      'Certified clandestine drug laboratory remediation with NATA-accredited testing and council clearance. Discreet, compliance-certified teams Australia-wide.',
    type: 'website',
  },
};

export default function MethLabDecontaminationPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  const schemaTag = <Script id="meth-lab-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />;
  if (FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <>{schemaTag}<AntigravityServicePageTemplate data={methLabDecontaminationData} heroImage="/images/generated/disaster-recovery/hero-biohazard.webp" /></>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Clandestine Drug Lab Decontamination</h1>
        <p className="text-lg text-gray-600">Coming soon — certified biohazard remediation services.</p>
      </div>
    </div>
  );
}
