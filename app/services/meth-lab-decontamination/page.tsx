import { Metadata } from 'next';
import Script from 'next/script';
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

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is involved in professional methamphetamine lab decontamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Methamphetamine lab decontamination involves removal of chemical residues and contaminated materials from properties used for clandestine drug manufacturing. The process follows state-specific guidelines (e.g., Queensland Health\'s Clandestine Drug Lab Remediation Guidelines) and Australian Standard AS 4040. It includes initial air sampling and surface wipe testing to quantify contamination; removal of all porous materials above contamination thresholds; chemical wash-down of hard surfaces using approved decontamination agents; HEPA vacuuming of HVAC systems; and final clearance testing by an independent assessor before reoccupation is permitted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Australian standards and regulations govern meth lab decontamination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Methamphetamine decontamination is governed by a combination of standards. Australian Standard AS 4040 provides guidance on volatile compounds in indoor environments. State-specific guidelines include Queensland Health\'s Clandestine Drug Lab Remediation Guidelines and equivalent documents from WA Department of Health and SA EPA. The WHS Act 2011 governs contractor safety during decontamination operations. Environmental Protection Acts in each state govern disposal of chemical waste generated during the process. IICRC S540 principles for hazardous environments also inform industry practice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is responsible for meth lab decontamination costs in a rental property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If a tenant has operated a drug lab in a rental property, the tenant is legally liable for remediation costs under residential tenancy legislation in all Australian states. In practice, cost recovery from tenants is often difficult and landlords bear the immediate financial burden. Some landlord insurance policies include limited clandestine drug lab cover. Property owners should notify their insurer, police, and local council immediately upon discovery. All property transactions involving known contaminated properties require disclosure under relevant state property law and consumer protection legislation.',
      },
    }
  ],
});

export default function MethLabDecontaminationPage() {
  const schemaStr = JSON.stringify(serviceSchema);
  const schemaTag = <Script id="meth-lab-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html: schemaStr}} />;
  return <>{schemaTag}<AntigravityServicePageTemplate data={methLabDecontaminationData} heroImage="/images/generated/disaster-recovery/hero-biohazard.webp" /></>;
}
