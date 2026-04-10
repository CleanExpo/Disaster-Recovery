import { Metadata } from 'next';
import Script from 'next/script';
import { Waves } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'What to Do After a Flood in Australia — Step-by-Step Guide 2025',
  description: 'A step-by-step guide on what to do after a flood in Australia. Safety checks, insurance steps, water extraction, and how to prevent mould. Practical advice for homeowners and tenants.',
  keywords: [
    'what to do after a flood Australia',
    'flood recovery steps Australia',
    'after flood checklist',
    'flood water damage what to do',
    'flood insurance claim Australia',
    'after flood mould prevention',
    'flood damage recovery guide',
    'house flooded what to do',
    'home flooded Australia',
    'flood restoration Australia',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia',
  },
  openGraph: {
    title: 'What to Do After a Flood in Australia — Step-by-Step Guide 2025',
    description: 'Step-by-step flood recovery guide for Australian homeowners and tenants. Safety, insurance, extraction, and mould prevention.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What to Do After a Flood in Australia — Step-by-Step Guide 2025',
  description: 'A complete step-by-step guide on what to do after a flood in Australia, covering safety, insurance, water extraction, and mould prevention.',
  author: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
    logo: {
      '@type': 'ImageObject',
      url: 'https://disasterrecovery.com.au/images/antigravity/dr-logo.webp',
    },
  },
  datePublished: '2025-08-01',
  dateModified: '2026-04-10',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia',
  },
  articleSection: 'Flood Damage',
  inLanguage: 'en-AU',
  isAccessibleForFree: true,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.ag-hero-subtext', '.ag-prose h2'],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'What to Do After a Flood in Australia',
  description: 'Step-by-step flood recovery process for Australian homeowners and tenants.',
  totalTime: 'P7D',
  supply: [
    { '@type': 'HowToSupply', name: 'Smartphone with camera' },
    { '@type': 'HowToSupply', name: 'Insurance policy documents' },
    { '@type': 'HowToSupply', name: 'Rubber gloves and boots (for Category 2–3 water)' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Confirm safety before entering',
      text: 'Do not re-enter a flooded property until electricity has been isolated at the mains. Check with your energy provider or an electrician if in doubt. Floodwater (Category 3) is highly contaminated — wear waterproof gloves and boots minimum. Check for structural damage, gas leaks, and unstable ceilings before entering.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Document all damage before touching anything',
      text: 'Photograph every room, ceiling, floor, wall, and affected item before removing water or cleaning up. Video walkthroughs are valuable. This documentation is essential for your insurance claim — insurers can deny claims or reduce payouts when damage evidence is not preserved.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Notify your insurer immediately',
      text: 'Contact your insurer as soon as possible after discovering flood damage. Most policies require prompt notification. Emergency make-safe does not require pre-approval — you can and should begin extraction immediately. Under the General Insurance Code of Practice, your insurer must acknowledge your claim within 10 business days.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Begin emergency water extraction',
      text: 'Lodge an emergency claim with an IICRC-certified restoration contractor immediately. Professional truck-mounted extraction removes water from carpet backing, subfloors, and wall cavities that consumer pumps cannot reach. Every hour of delay increases structural damage and mould risk. Mould can begin amplifying within 24 hours.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-4',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Deploy structural drying equipment',
      text: 'After bulk water extraction, LGR dehumidifiers and air movers are installed throughout the affected area. Thermal imaging is used to locate hidden moisture pockets in walls and ceilings. Drying typically takes 3–5 days for standard structures. Do not replace flooring, repaint, or close up walls until moisture readings confirm drying is complete.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-5',
    },
    {
      '@type': 'HowToStep',
      position: 6,
      name: 'Apply antimicrobial treatment',
      text: 'All surfaces that contacted floodwater should be treated with EPA-registered antimicrobial disinfectants after drying. This is especially critical for Category 2 and 3 flood events. Flood-affected cavities and building materials that cannot be dried to baseline should be removed and replaced.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-6',
    },
    {
      '@type': 'HowToStep',
      position: 7,
      name: 'Monitor for mould and manage your insurance claim',
      text: 'Monitor for visible mould, musty odours, and elevated humidity in the weeks following the event. Provide your insurer with the IICRC-certified drying logs and scope of works from your contractor. If your insurer is delaying, lodge an IDR (Internal Dispute Resolution) complaint and escalate to AFCA if unresolved within 30 days.',
      url: 'https://disasterrecovery.com.au/guides/flood-damage/what-to-do-after-a-flood-australia#step-7',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to enter my house after a flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not until the electricity supply has been isolated at the mains. Floodwater is Category 3 (black water) — highly contaminated with sewage, bacteria, and chemicals. Wear waterproof boots and gloves minimum. Check for structural damage, gas leaks, and unstable ceilings before entering. Contact your energy provider if you are unsure whether power has been safely isolated.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my home insurance cover flood damage in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard home insurance policies in Australia were required to include flood cover (defined as inundation from an overflowing water body) from 2012 after changes to the Insurance Contracts Act. However, storm surge, rainwater runoff, and rising groundwater are treated differently by different policies. Read your Product Disclosure Statement carefully or contact your insurer to confirm exactly what is covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after a flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould amplification can begin within 24–48 hours of a flood event in Australian climate conditions, particularly in warm and humid areas. This is why emergency water extraction must begin immediately — not after insurance approval is received. Once mould is established in building cavities, remediation costs increase significantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Category 3 flood event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 3 (Black Water) is the highest contamination classification under IICRC S500:2025. It includes overflow from rivers, creeks, and stormwater systems, sewage backup, and any standing water that has been stationary for more than 48 hours. Category 3 water poses serious health risks and requires specialist containment, protective equipment, and antimicrobial treatment — not just extraction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I clean up flood damage myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can safely remove undamaged contents and open windows for ventilation. Do not use consumer wet vacuums as a substitute for professional extraction — they remove surface water only and miss moisture in walls, subfloors, and insulation. DIY cleanup of Category 2–3 flood water is hazardous without protective equipment. More importantly, insurers require IICRC-certified documentation of professional restoration work for claim sign-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if my insurer is slow to respond after a flood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the General Insurance Code of Practice (GICP), your insurer must acknowledge your claim within 10 business days and provide a decision within 10 business days of receiving all requested information. If these timeframes are breached, lodge an Internal Dispute Resolution (IDR) complaint with your insurer. If unresolved within 30 days, escalate to the Australian Financial Complaints Authority (AFCA) at afca.org.au — free for consumers.',
      },
    },
  ],
};

export default function WhatToDoAfterFloodPage() {
  return (
    <>
      <Script
        id="flood-guide-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="flood-guide-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="flood-guide-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Flood Damage"
        title="What to Do After a Flood in Australia"
        subtitle="A step-by-step guide for homeowners and tenants. Safety checks, insurance steps, water extraction, mould prevention — what to do and in what order."
        gradient="linear-gradient(135deg, #0C2340 0%, #1D4ED8 100%)"
        icon={<Waves className="h-10 w-10" />}
        lastReviewed="2026-04-10"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Flood Damage', href: '/guides/flood-damage' },
          { label: 'What to Do After a Flood' },
        ]}
        sections={[
          {
            heading: 'Step 1 — Confirm Safety Before Entering',
            body: (
              <div id="step-1" className="space-y-3 text-gray-300">
                <p>
                  Do not re-enter a flooded property until electricity has been isolated at the mains. Water and electricity are an immediately lethal combination. Contact your energy provider or a licensed electrician if you are uncertain.
                </p>
                <p>
                  Floodwater from overflowing waterways, stormwater systems, or backed-up sewage is classified as Category 3 (Black Water) under IICRC S500:2025. It contains sewage, bacteria, chemicals, and biological hazards. Minimum protective equipment: waterproof boots and gloves. Full PPE is required for anyone entering heavily affected areas.
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside text-gray-400">
                  <li>Check for visible structural damage — sagging ceilings, cracked walls, or shifted foundations.</li>
                  <li>Check for gas smell — if present, leave immediately and call your gas provider.</li>
                  <li>Do not use generators, power tools, or appliances in wet areas.</li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Step 2 — Document All Damage Before Touching Anything',
            body: (
              <div id="step-2" className="space-y-3 text-gray-300">
                <p>
                  Before removing water, lifting carpet, or cleaning up any damage — photograph and video every affected room. Walk through the entire property systematically. Capture ceilings, walls, flooring, structural elements, and every damaged or destroyed item.
                </p>
                <p>
                  This evidence is required by your insurer and cannot be recreated after cleanup begins. Insurers can reduce or deny claims when there is insufficient photographic evidence of the original damage scope.
                </p>
                <div style={{
                  background: 'rgba(29,78,216,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                  color: '#93c5fd',
                }}>
                  <strong>Documentation checklist:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-gray-300">
                    <li>Photograph all four walls of every affected room from floor to ceiling.</li>
                    <li>Photograph flooring including any visible waterline marks.</li>
                    <li>Record the water level reached (mark on wall with tape if possible).</li>
                    <li>Photograph all damaged contents before moving them.</li>
                    <li>Note the date and time you discovered the damage and when the event occurred.</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            heading: 'Step 3 — Notify Your Insurer',
            body: (
              <div id="step-3" className="space-y-3 text-gray-300">
                <p>
                  Contact your insurer as soon as practicable after discovering flood damage. Most policies require prompt notification as a condition of coverage. This does not mean you must wait for insurer approval before beginning emergency make-safe work — you should not wait.
                </p>
                <p>
                  Under the General Insurance Code of Practice (GICP), your insurer must acknowledge your claim within <strong className="text-white">10 business days</strong> and provide a decision within 10 business days of receiving all required information.
                </p>
                <p>
                  Inform your insurer that you are commencing emergency make-safe — including water extraction and structural drying — to prevent escalating damage. Provide photographs as evidence of the pre-cleanup state.
                </p>
              </div>
            ),
          },
          {
            heading: 'Step 4 — Begin Emergency Water Extraction Immediately',
            body: (
              <div id="step-4" className="space-y-3 text-gray-300">
                <p>
                  Mould amplification can begin within 24–48 hours in Australian conditions. Emergency water extraction must not wait for insurance approval. Lodge your claim with an IICRC-certified restoration contractor immediately.
                </p>
                <p>
                  Professional truck-mounted extraction units remove water from sources consumer pumps cannot reach: carpet backing, subfloor cavities, wall insulation, and structural voids. These are the moisture sources that cause secondary mould growth behind walls and under flooring — the most expensive flood damage outcome.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  {[
                    { label: '24–48 hrs', note: 'Mould can start within this window' },
                    { label: 'Cat 3', note: 'Floodwater classification — highly contaminated' },
                    { label: '60 min', note: 'NRPG dispatch time in metro areas' },
                  ].map((item) => (
                    <div key={item.label} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.5rem',
                      padding: '0.875rem',
                      textAlign: 'center',
                    }}>
                      <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '1.25rem' }}>{item.label}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.2rem' }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            heading: 'Step 5 — Structural Drying (3–5 Days)',
            body: (
              <div id="step-5" className="space-y-3 text-gray-300">
                <p>
                  After bulk water extraction, LGR (Low Grain Refrigerant) dehumidifiers and high-velocity air movers are installed throughout all affected areas. Thermal imaging cameras locate hidden moisture pockets inside walls and under flooring.
                </p>
                <p>
                  Do not repaint, re-carpet, or close up walls until your restoration contractor confirms via moisture readings that drying is complete. Sealing over wet building materials traps moisture and guarantees a mould problem within weeks.
                </p>
                <p>
                  Standard structural drying for residential flood damage takes <strong className="text-white">3–5 days</strong>. Severe events with Category 3 water, deep subfloor saturation, or widespread structural damage may require longer.
                </p>
              </div>
            ),
          },
          {
            heading: 'Step 6 — Antimicrobial Treatment',
            body: (
              <div id="step-6" className="space-y-3 text-gray-300">
                <p>
                  All surfaces that contacted floodwater should be treated with EPA-registered botanical disinfectants after the drying phase. This step is critical for Category 2 and 3 flood events and is required for IICRC S500:2025 compliant restoration.
                </p>
                <p>
                  Building materials that cannot be dried to pre-loss moisture baselines — insulation batts, certain types of particleboard, and saturated plasterboard — must be removed and replaced rather than treated.
                </p>
              </div>
            ),
          },
          {
            heading: 'Step 7 — Monitor and Manage Your Claim',
            body: (
              <div id="step-7" className="space-y-3 text-gray-300">
                <p>
                  In the weeks following restoration, monitor for visible mould, musty odours, or elevated indoor humidity. These are signs that residual moisture was missed during drying or that new moisture is entering through damaged building fabric.
                </p>
                <p>
                  Provide your insurer with the IICRC-certified drying logs, moisture readings, and scope of works from your contractor. These documents are the standard evidence set required for claim finalisation.
                </p>
                <p>
                  If your insurer is delaying beyond GICP timeframes, lodge an IDR complaint in writing. If unresolved within 30 days, escalate to the Australian Financial Complaints Authority (AFCA) — free for consumers and legally binding for insurers.
                </p>
              </div>
            ),
          },
        ]}
        faqs={faqSchema.mainEntity.map((faq) => ({
          question: faq.name,
          answer: faq.acceptedAnswer.text,
        }))}
        relatedGuides={[
          { title: 'Emergency Water Extraction', href: '/services/emergency-water-extraction', description: 'Lodge an emergency claim for immediate water extraction dispatch.' },
          { title: 'Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', description: 'Detailed guide on photographing and documenting flood damage for your insurer.' },
          { title: 'Category 3 Water Damage Insurance', href: '/guides/insurance/category-3-water-damage-insurance', description: 'How black water contamination affects your insurance claim and coverage.' },
          { title: 'When Your Insurer Delays Your Claim', href: '/guides/insurance/insurer-delays-your-claim', description: 'GICP timeframes and escalation steps if your insurer is slow.' },
          { title: 'What to Do After a Burst Pipe', href: '/guides/insurance/burst-pipe-insurance-claim', description: 'Insurance steps and restoration process for burst pipe flooding.' },
        ]}
        cta={{ text: 'Lodge Emergency Claim', href: '/claim?service=flood' }}
      />
    </>
  );
}
