import { Metadata } from 'next';
import Script from 'next/script';
import { BarChart3 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';
import { NAP } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = generateSEO({
  title: 'Disaster Recovery Facts & Statistics | Verified Data About NRPG',
  description: 'Verified facts and statistics about Disaster Recovery Australia (NRPG). Platform metrics, Australian disaster data from ABS/BOM/ICA, contractor standards, and service coverage.',
  keywords: [
    'disaster recovery Australia statistics',
    'NRPG facts',
    'Australian disaster data',
    'property damage statistics Australia',
    'restoration industry facts',
    'IICRC certification Australia',
  ],
  canonical: '/facts',
});

// Facts-page FAQ — all data below is trusted static content authored by developers.
// No user-generated or external input. Safe to stringify for JSON-LD injection.
const factsFAQs = [
  {
    question: 'How many states and territories does Disaster Recovery cover?',
    answer: 'Disaster Recovery covers all 8 Australian states and territories: New South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, ACT, and Northern Territory.',
  },
  {
    question: 'What is the minimum service fee for disaster recovery work?',
    answer: 'The minimum service fee is $2,200 AUD. This covers emergency response, professional assessment, initial mitigation, industrial equipment, certified technicians, and full insurance documentation.',
  },
  {
    question: 'How many natural disasters does Australia experience annually?',
    answer: 'According to the Bureau of Meteorology and Insurance Council of Australia data, Australia experiences hundreds of severe weather events annually. In 2022 alone, the ICA declared 8 catastrophe events with total insured losses exceeding $7.4 billion AUD.',
  },
  {
    question: 'What certifications are required for contractors?',
    answer: 'All contractors must hold current IICRC certification, minimum $20 million public liability insurance, WorkSafe accreditation, and compliance with Australian Standards including AS/NZS 4360 for risk management.',
  },
  {
    question: 'What is IICRC certification?',
    answer: 'IICRC (Institute of Inspection, Cleaning and Restoration Certification) is the globally recognised standard for the restoration industry. It certifies technicians in water damage restoration (WRT), fire and smoke restoration (FSRT), mould remediation, and other specialisations.',
  },
  {
    question: 'How does Disaster Recovery bill for services?',
    answer: 'Contractors bill the client (property owner) directly. This means work begins immediately without waiting for insurer approval. Disaster Recovery provides comprehensive documentation to support the client\'s insurance reimbursement claim. Payment plans are available through Blue Fire Finance.',
  },
];

// Serialise schemas once at module level — static data, no XSS risk
const factsFAQSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: factsFAQs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

const datasetSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Disaster Recovery Australia Platform Facts',
  description: 'Verified facts and statistics about Disaster Recovery Australia, including platform metrics, contractor standards, and Australian disaster data.',
  url: `${NAP.url}/facts`,
  creator: { '@type': 'Organization', name: NAP.name, url: NAP.url },
  dateModified: '2026-02-26',
  license: `${NAP.url}/terms`,
  keywords: ['disaster recovery', 'Australia', 'restoration', 'IICRC', 'insurance claims'],
});

// Helper to render JSON-LD — all data is developer-authored static content
function SchemaScript({ id, data }: { id: string; data: string }) {
  return <Script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export default function FactsPage() {
  return (
    <>
      <SchemaScript id="facts-faq-schema" data={factsFAQSchema} />
      <SchemaScript id="facts-dataset-schema" data={datasetSchema} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
          icon: <BarChart3 className="h-12 w-12" />,
          title: 'Facts & Statistics',
          subtitle: 'Verified data about Disaster Recovery Australia, the Australian disaster landscape, and the restoration industry.',
        }}
        cta={{ text: 'Start a Claim', href: '/claim' }}
        secondaryCta={{ text: 'About Us', href: '/about' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Facts & Statistics' },
        ]}
        stats={[
          { label: 'Coverage', value: 'All 8 States' },
          { label: 'Availability', value: '24/7/365' },
          { label: 'Contractor Standard', value: 'IICRC Certified' },
          { label: 'Data Sources', value: 'ABS / BOM / ICA' },
        ]}
        sections={[
          {
            heading: 'Platform Facts',
            body: (
              <div className="space-y-4">
                <p>
                  Verified metrics about the Disaster Recovery Australia platform, current as of February 2026.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { fact: 'Platform type', value: 'National claims distribution network', source: 'NRPG' },
                    { fact: 'Operating entity', value: 'National Restoration Professionals Group Pty Ltd', source: 'ABR' },
                    { fact: 'ABN', value: '85 151 794 142', source: 'ABR' },
                    { fact: 'Service model', value: 'Contractor bills client directly; full documentation for insurance reimbursement', source: 'NRPG' },
                    { fact: 'Geographic coverage', value: 'All 8 Australian states and territories', source: 'NRPG' },
                    { fact: 'Platform availability', value: '24 hours, 7 days, 365 days per year', source: 'NRPG' },
                    { fact: 'Contractor certification', value: '100% IICRC certified', source: 'NRPG' },
                    { fact: 'Minimum public liability', value: '$20,000,000 AUD', source: 'NRPG' },
                    { fact: 'Minimum service fee', value: '$2,200 AUD', source: 'NRPG' },
                    { fact: 'Target emergency response', value: '60 minutes (metropolitan areas)', source: 'NRPG' },
                    { fact: 'Service categories', value: '10+ (water, fire, mould, storm, flood, biohazard, sewage, bushfire, cyclone, emergency)', source: 'NRPG' },
                    { fact: 'Payment plans', value: 'Available via Blue Fire Finance', source: 'NRPG' },
                  ].map(({ fact, value, source }) => (
                    <div key={fact} className="border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">{fact}</div>
                      <div className="text-white font-medium">{value}</div>
                      <div className="text-xs text-gray-500 mt-1">Source: {source}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            heading: 'Australian Disaster Statistics',
            body: (
              <div className="space-y-4">
                <p>
                  Key statistics about natural disasters and property damage in Australia, sourced from the Bureau of Meteorology (BOM), Insurance Council of Australia (ICA), and Australian Bureau of Statistics (ABS).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { stat: 'ICA catastrophe events (2022)', value: '8 declared events', source: 'ICA' },
                    { stat: 'Total insured losses (2022)', value: '$7.4 billion AUD', source: 'ICA' },
                    { stat: 'Flood-affected properties (Feb 2022)', value: '60,000+ homes across NSW and QLD', source: 'BOM / SES' },
                    { stat: 'Annual severe weather events', value: '100+ (storms, cyclones, floods, bushfires)', source: 'BOM' },
                    { stat: 'Black Summer bushfire losses (2019-20)', value: '$2.32 billion insured losses', source: 'ICA' },
                    { stat: 'Water damage claims', value: 'Most common property insurance claim in Australia', source: 'ICA' },
                    { stat: 'Australian residential properties', value: '10.8 million (2021 Census)', source: 'ABS' },
                    { stat: 'Properties in high-risk flood zones', value: '1 in 10 Australian properties', source: 'Climate Council' },
                    { stat: 'Average water damage claim value', value: '$5,000–$50,000+ depending on severity', source: 'ICA' },
                    { stat: 'Cyclone-exposed population', value: '1.1 million Australians in cyclone-prone areas', source: 'BOM' },
                  ].map(({ stat, value, source }) => (
                    <div key={stat} className="border border-gray-700 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">{stat}</div>
                      <div className="text-white font-medium">{value}</div>
                      <div className="text-xs text-gray-500 mt-1">Source: {source}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
            background: 'light',
          },
          {
            heading: 'Industry Certifications & Standards',
            body: (
              <div className="space-y-4">
                <p>
                  The restoration industry in Australia is governed by international and national standards. All Disaster Recovery network contractors must comply with the following:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    { cert: 'IICRC', fullName: 'Institute of Inspection, Cleaning and Restoration Certification', scope: 'Global standard for restoration professionals. Certifications include WRT (water), FSRT (fire/smoke), AMRT (mould).', href: '/certifications/iicrc-certified' },
                    { cert: 'AS/NZS 4360', fullName: 'Risk Management Standard', scope: 'Australian/New Zealand standard for risk assessment, treatment, and monitoring in restoration projects.', href: '/certifications/australian-standards' },
                    { cert: 'WorkSafe', fullName: 'Workplace Health & Safety', scope: 'Mandatory state-based WHS accreditation for all restoration contractors.', href: '/certifications/worksafe-certified' },
                    { cert: 'ISO 9001', fullName: 'Quality Management Systems', scope: 'International standard for consistent quality management processes.', href: '/certifications/iso-certified' },
                    { cert: 'Asbestos Licence', fullName: 'Asbestos Handling & Removal', scope: 'Required for pre-1990 properties. Class A (friable) and Class B (non-friable) categories.', href: '/certifications/asbestos-licensed' },
                    { cert: 'HAZMAT', fullName: 'Hazardous Materials Handling', scope: 'Certification for biohazard, chemical spill, and contamination cleanup operations.', href: '/certifications/hazmat-certified' },
                  ].map(({ cert, fullName, scope, href }) => (
                    <div key={cert} className="border border-gray-700 rounded-lg p-4">
                      <Link href={href} className="text-blue-400 hover:text-blue-300 font-bold text-lg">{cert}</Link>
                      <div className="text-sm text-gray-300 mt-1">{fullName}</div>
                      <div className="text-sm text-gray-400 mt-2">{scope}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            heading: 'Frequently Asked Questions',
            body: (
              <div className="space-y-6">
                {factsFAQs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            ),
            background: 'light',
          },
        ]}
        relatedPages={[
          { title: 'About Us', href: '/about', description: 'Learn about Disaster Recovery Australia and our national claims distribution platform.' },
          { title: 'Our Certifications', href: '/certifications', description: 'View the professional certifications required for all contractors in our network.' },
          { title: 'How It Works', href: '/how-it-works', description: 'Step-by-step guide to using our platform for disaster recovery claims.' },
          { title: 'Start a Claim', href: '/claim', description: 'Submit your damage claim online for immediate contractor matching.' },
        ]}
      />
    </>
  );
}
