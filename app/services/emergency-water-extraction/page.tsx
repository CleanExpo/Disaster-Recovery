import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Water Extraction Australia | 60-Minute Response',
  description: 'Emergency water extraction across Australia. IICRC-certified technicians, priority dispatch, truck-mounted extraction units. Available 24/7 for burst pipes, flooding, and sewage backup.',
  keywords: [
    'emergency water extraction',
    'emergency water extraction Australia',
    'flood water removal',
    'burst pipe water extraction',
    'emergency water removal',
    '24 hour water extraction',
    'water extraction service',
    'emergency flood cleanup',
    'sewage water extraction',
    'rapid water removal',
    'IICRC water extraction',
    'water damage emergency response',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/emergency-water-extraction',
  },
  openGraph: {
    title: 'Emergency Water Extraction Australia | 60-Minute Response',
    description: 'IICRC-certified emergency water extraction. priority dispatch, 24/7, Australia-wide.',
    type: 'website',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Water Extraction',
  description: 'Emergency water extraction and flood mitigation with IICRC-certified technicians. priority dispatch across Australia.',
  provider: {
    '@type': 'Organization',
    '@id': 'https://disasterrecovery.com.au/#organization',
    name: 'Disaster Recovery Australia',
  },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Emergency Water Extraction',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://disasterrecovery.com.au/claim',
    serviceType: 'Online',
  },
  hoursAvailable: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'AUD',
      minPrice: '450',
      maxPrice: '2500',
      description: 'Emergency water extraction — standard residential scope. Commercial and Category 3 priced on assessment.',
    },
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you extract water from a flooded property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches certified extraction technicians as soon as a certified contractor is confirmed for your area of claim lodgement in major metropolitan areas. Truck-mounted extraction units can remove thousands of litres per hour. Most residential extractions are completed in 2–4 hours, followed immediately by drying equipment deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What equipment is used for emergency water extraction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Truck-mounted extraction units for bulk standing water, weighted extraction rovers for carpet and subfloor moisture, portable submersible pumps for confined spaces, and LGR dehumidifiers deployed immediately after extraction to begin structural drying. All equipment and methods comply with IICRC S500:2025.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does emergency water extraction cost in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency water extraction typically costs $450–$2,500 for a standard residential property, depending on the volume of water, property size, and category of contamination. Category 3 (sewage or heavily contaminated water) requires additional containment and sanitisation. Most insurance policies cover emergency extraction — NRPG provides IICRC-certified documentation for claim lodgement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is emergency water extraction covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — most Australian home and contents policies cover emergency water extraction following sudden, accidental events (burst pipes, storm inundation, appliance failure). Emergency make-safe including extraction does not require insurer pre-approval. Lodge your claim and begin extraction immediately to prevent secondary mould damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I do my own water extraction with a wet vacuum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consumer wet vacuums extract surface water only. They cannot remove moisture trapped in carpet backing, subfloor timber, wall cavities, or insulation. Unextracted structural moisture triggers mould within 24–48 hours. Professional truck-mounted extraction is significantly more effective and is required for IICRC S500:2025 compliant restoration documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after water extraction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Immediately after bulk extraction, technicians deploy LGR dehumidifiers and air movers to begin structural drying. Thermal imaging confirms moisture levels in walls, floors, and ceilings. Daily moisture monitoring continues until readings return to pre-loss baselines (typically 3–5 days). Final antimicrobial clearance is applied before equipment removal and restoration repairs begin.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do Immediately After a Water Damage Event',
  description: 'Steps to take in the first hour after discovering water damage in your home or business.',
  totalTime: 'PT60M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Ensure safety first',
      text: 'Do not enter flooded areas until you have confirmed there is no electrical hazard. Turn off power at the switchboard if water is near electrical outlets. Do not enter Category 3 (sewage) water without protective equipment.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Stop the source',
      text: 'Locate and close the main water shut-off valve to stop ongoing water flow from a burst pipe or appliance. For storm or flood water, move contents to higher ground.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Document all damage before any cleanup',
      text: 'Photograph all affected areas from multiple angles before moving or cleaning anything. This evidence is required for your insurance claim. Note the time you discovered the damage.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Lodge an emergency claim',
      text: 'Lodge online at disasterrecovery.com.au/claim or call the 24/7 emergency line. Provide your address, type of water, and approximate affected area. An IICRC-certified technician will be dispatched as soon as a certified contractor is confirmed for your area.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Notify your insurer',
      text: 'Contact your insurer as soon as practicable after discovery. Emergency make-safe does not require pre-approval. Provide your claim reference number from NRPG for documentation.',
    },
  ],
};

export default function EmergencyWaterExtractionPage() {
  return (
    <>
      <Script
        id="eme-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="eme-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="eme-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #051A2E 0%, #0369A1 100%)',
          icon: <Droplets className="h-12 w-12" />,
          title: 'Emergency Water Extraction',
          subtitle: 'IICRC-certified water extraction and flood mitigation. priority dispatch, 24/7, across Australia. Truck-mounted extraction for all categories of water damage.',
        }}
        cta={{ text: 'Lodge Emergency Claim', href: '/claim?service=water-extraction' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Emergency Water Extraction' },
        ]}
        sections={[
          {
            heading: 'Why Rapid Extraction Matters',
            body: (
              <div className="space-y-4 text-gray-300">
                <p>
                  Water damage behaves progressively. Clean Category 1 water from a burst pipe degrades into highly contaminated Category 3 within 48 hours as it contacts building materials, sewage systems, and organic matter. Every hour of delay increases structural damage, contamination risk, and restoration cost.
                </p>
                <p>
                  NRPG deploys truck-mounted extraction units capable of removing thousands of litres per hour. Unlike consumer wet vacuums, professional equipment removes moisture from carpet backing, subfloor cavities, and wall voids — the moisture sources that cause secondary mould amplification.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {[
                    { stat: '60 min', label: 'Average dispatch time' },
                    { stat: '24 hrs', label: 'Mould window — act before this' },
                    { stat: '3–5 days', label: 'Structural drying time (standard)' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                        padding: '1.25rem',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38BDF8' }}>{item.stat}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            heading: 'Extraction Process — IICRC S500:2025 Protocol',
            body: (
              <ol className="space-y-4">
                {[
                  { step: '1', title: 'Hazard assessment', detail: 'Electrical isolation, category classification, and thermal imaging to define the extraction scope.' },
                  { step: '2', title: 'Bulk water removal', detail: 'Truck-mounted extraction removes standing water. Weighted rovers extract moisture from carpet and subfloor padding.' },
                  { step: '3', title: 'Structural drying deployment', detail: 'LGR dehumidifiers and high-velocity air movers installed immediately after extraction to begin structural drying.' },
                  { step: '4', title: 'Daily moisture monitoring', detail: 'Thermal imaging and hygrometer readings taken daily until all readings return to pre-loss baselines.' },
                  { step: '5', title: 'Antimicrobial clearance', detail: 'EPA-registered botanical disinfectants applied to all affected surfaces before equipment removal.' },
                  { step: '6', title: 'IICRC-certified documentation', detail: 'Complete drying logs, moisture readings, and scope reports provided for insurer sign-off.' },
                ].map((item) => (
                  <li
                    key={item.step}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: '#0369A1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#fff',
                    }}>{item.step}</span>
                    <div>
                      <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>{item.title}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            ),
          },
          {
            heading: 'What to Do Right Now',
            body: (
              <div className="space-y-3 text-gray-300">
                <p className="font-semibold text-white">Follow these steps in the first 60 minutes:</p>
                <ol className="space-y-2 list-decimal list-inside text-sm">
                  <li>Check for electrical hazards — turn off power at the switchboard if water is near outlets.</li>
                  <li>Shut off the main water valve if the source is a burst pipe or appliance failure.</li>
                  <li>Photograph all affected areas before moving anything — this is required for your insurance claim.</li>
                  <li>Lodge your emergency claim online or call NRPG 24/7 — a certified technician dispatches as soon as a certified contractor is confirmed for your area.</li>
                  <li>Notify your insurer as soon as practicable — emergency make-safe does not require pre-approval.</li>
                </ol>
                <div className="mt-6">
                  <Link
                    href="/claim?service=water-extraction"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#0369A1',
                      color: '#fff',
                      borderRadius: '0.5rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Lodge Emergency Claim Now
                  </Link>
                </div>
              </div>
            ),
          },
          {
            heading: 'Emergency Water Extraction — Frequently Asked Questions',
            body: (
              <div className="space-y-4">
                {faqSchema.mainEntity.map((faq) => (
                  <details
                    key={faq['@type']}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                    }}
                  >
                    <summary style={{ color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>
                      {faq.name}
                    </summary>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                      {faq.acceptedAnswer.text}
                    </p>
                  </details>
                ))}
              </div>
            ),
          },
          {
            heading: 'Related Insurance Guides',
            body: (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', desc: 'Step-by-step guide to documenting water damage evidence for a successful claim.' },
                  { title: 'Make-Safe Insurance Coverage', href: '/guides/insurance/make-safe-insurance-coverage', desc: 'What emergency make-safe costs are covered and your rights under Australian law.' },
                  { title: 'When Your Insurer Delays Your Claim', href: '/guides/insurance/insurer-delays-your-claim', desc: 'GICP timeframes your insurer must meet and how to escalate delays to AFCA.' },
                  { title: 'Insurance Approved Contractors', href: '/guides/insurance/insurance-approved-contractors', desc: 'Your right to choose your own IICRC-certified contractor over your insurer\'s panel.' },
                ].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    style={{
                      display: 'block',
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ color: '#93c5fd', fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>
                      {guide.title}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{guide.desc}</span>
                  </Link>
                ))}
              </div>
            ),
          },
        ]}
        relatedPages={[
          { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Full water damage mitigation and structural drying service.' },
          { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'Professional mould removal following water damage events.' },
          { title: 'Emergency Services', href: '/services/emergency-services', description: 'Full range of 24/7 emergency disaster response services.' },
          { title: 'Start a Claim', href: '/claim', description: 'Lodge your emergency claim online now.' },
        ]}
      />
    </>
  );
}
