import { Metadata } from 'next';
import Script from 'next/script';
import { Clock } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { WATER_DAMAGE_AUTHOR } from '@/lib/guide-authors';

export const metadata: Metadata = {
  title: 'How Long Does Water Damage Restoration Take? — 2025 Guide',
  description: 'Water damage restoration typically takes 3–5 days for drying, plus 1–4 weeks for repairs. Exact timeline depends on water category, affected area, and structural scope. IICRC-certified process explained.',
  keywords: [
    'how long does water damage restoration take',
    'water damage restoration timeline',
    'how long does flood restoration take',
    'water damage drying time',
    'structural drying timeline',
    'water damage repair time',
    'how long to dry out water damage',
    'water damage restoration process time',
    'flood restoration how long',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/water-damage/how-long-does-water-damage-restoration-take',
  },
  openGraph: {
    title: 'How Long Does Water Damage Restoration Take?',
    description: '3–5 days drying, 1–4 weeks repairs. Complete timeline guide for water damage restoration in Australia.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Long Does Water Damage Restoration Take? — 2025 Guide',
  description: 'A complete timeline for water damage restoration in Australia — from emergency extraction through structural drying to final repairs.',
  author: {
    '@type': 'Person',
    name: WATER_DAMAGE_AUTHOR.name,
    jobTitle: WATER_DAMAGE_AUTHOR.jobTitle,
    hasCredential: WATER_DAMAGE_AUTHOR.credentials?.map((c: string) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
    memberOf: { '@type': 'Organization', name: 'Disaster Recovery Australia', url: 'https://disasterrecovery.com.au' },
  },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery Australia',
    url: 'https://disasterrecovery.com.au',
    logo: { '@type': 'ImageObject', url: 'https://disasterrecovery.com.au/images/antigravity/dr-logo.webp' },
  },
  datePublished: '2025-08-01',
  dateModified: '2026-04-10',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://disasterrecovery.com.au/guides/water-damage/how-long-does-water-damage-restoration-take',
  },
  articleSection: 'Water Damage',
  inLanguage: 'en-AU',
  isAccessibleForFree: true,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.ag-hero-subtext', '.ag-prose h2'] },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does water damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Water damage restoration typically takes 3–5 days for structural drying, plus 1–4 weeks for repairs depending on scope. Emergency extraction takes 2–6 hours on the first day. Total project time from extraction to final completion is typically 1–3 weeks for standard residential water damage and 4–8 weeks for severe or Category 3 events.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to dry out a flooded house?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drying out a flooded house takes 3–5 days with professional IICRC-certified drying equipment (LGR dehumidifiers and air movers). Severe flooding or Category 3 (black water) events may take 5–7 days. Consumer fans and dehumidifiers are not effective — they cannot remove moisture from wall cavities, subfloors, and structural materials where secondary mould develops.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can water damage be fixed quickly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency make-safe (extraction, containment, drying equipment deployment) happens on Day 1 within hours of dispatch. However, structural drying cannot be rushed — it takes 3–5 days minimum to return building materials to pre-loss moisture levels. Attempting to speed up by closing up walls or repainting before drying is complete will trap moisture and cause mould within 2–4 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Category 3 water damage take longer to restore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Category 3 (black water from sewage, floodwater, or heavily contaminated sources) requires full containment, PPE protocols, antimicrobial treatment of all affected surfaces, and in many cases removal of porous building materials that cannot be decontaminated. Total restoration time for Category 3 events is typically 2–6 weeks depending on scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if water damage is not dried quickly enough?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mould amplification begins within 24–48 hours if moisture is not extracted and drying commenced. After 48 hours, clean Category 1 water degrades to Category 2. After 72+ hours, widespread mould and structural degradation become likely. Delayed restoration significantly increases total restoration costs and the scope of structural repairs required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does an insurer know when restoration is complete?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Restoration is confirmed complete via IICRC-certified drying logs showing daily moisture readings that have returned to pre-loss baseline values (typically <16% moisture content for timber substrates). These logs, combined with photographic evidence and a signed scope of works, are the standard documentation required for insurer claim sign-off.',
      },
    },
  ],
};

interface TimelinePhase {
  phase: string;
  duration: string;
  colour: string;
  steps: string[];
}

const timelinePhases: TimelinePhase[] = [
  {
    phase: 'Emergency Response',
    duration: 'Day 1 — Hours 1–6',
    colour: '#EF4444',
    steps: [
      'Technician dispatch as soon as a certified contractor is confirmed for your area of claim lodgement',
      'Hazard assessment — electrical isolation, category classification',
      'Thermal imaging survey to map moisture penetration',
      'Bulk water extraction — truck-mounted and weighted rover units',
      'Carpet and pad lifted in severely affected zones',
      'LGR dehumidifiers and air movers installed immediately after extraction',
    ],
  },
  {
    phase: 'Structural Drying',
    duration: 'Days 1–5',
    colour: '#F97316',
    steps: [
      'Daily moisture readings via penetrometer (target: <16% for timber)',
      'Thermal imaging confirms moisture maps match readings',
      'Equipment adjusted daily based on readings and psychrometric calculations',
      'Wall cavity injection ports installed where readings remain elevated',
      'Subfloor access opened if subfloor readings not declining',
      'Drying logs updated daily — required for insurer documentation',
    ],
  },
  {
    phase: 'Antimicrobial Clearance',
    duration: 'Day 4–6 (after drying confirmed)',
    colour: '#EAB308',
    steps: [
      'Final moisture readings confirm all areas at pre-loss baseline',
      'EPA-registered botanical disinfectants applied to all affected surfaces',
      'Air quality testing where Category 2–3 contamination was present',
      'Final photographic documentation of cleared moisture readings',
      'Equipment removed after final sign-off',
    ],
  },
  {
    phase: 'Structural Repairs',
    duration: 'Week 2–4 (after drying complete)',
    colour: '#22C55E',
    steps: [
      'Replacement of non-restorable materials (plasterboard, insulation, carpet)',
      'Repainting of affected walls and ceilings',
      'Flooring replacement where required',
      'Cabinetry and fixtures reinstated',
      'Final trades sign-off and property handover',
    ],
  },
];

export default function HowLongWaterDamagePage() {
  return (
    <>
      <Script id="wdt-article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="wdt-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Water Damage"
        title="How Long Does Water Damage Restoration Take?"
        subtitle="3–5 days for structural drying. 1–4 weeks for repairs. Total project time 1–3 weeks for standard events. Here is what happens at each stage and why the timeline cannot be shortened."
        author={WATER_DAMAGE_AUTHOR}
        gradient="linear-gradient(135deg, #0C2340 0%, #0369A1 100%)"
        icon={<Clock className="h-10 w-10" />}
        lastReviewed="2026-04-10"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Water Damage', href: '/guides/water-damage' },
          { label: 'How Long Does Restoration Take?' },
        ]}
        sections={[
          {
            heading: 'The Short Answer',
            body: (
              <div style={{
                background: 'rgba(3,105,161,0.15)',
                border: '1px solid rgba(56,189,248,0.3)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  {[
                    { label: 'Emergency extraction', value: '2–6 hours', sub: 'Day 1' },
                    { label: 'Structural drying', value: '3–5 days', sub: 'Standard residential' },
                    { label: 'Severe / Cat 3 drying', value: '5–7 days', sub: 'Extended scope' },
                    { label: 'Structural repairs', value: '1–4 weeks', sub: 'After drying complete' },
                    { label: 'Full project (standard)', value: '1–3 weeks', sub: 'Extraction to handover' },
                    { label: 'Full project (severe)', value: '4–8 weeks', sub: 'Cat 3 or major flood' },
                  ].map((item) => (
                    <div key={item.label} style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>{item.value}</div>
                      <div style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600, marginTop: '0.25rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.1rem' }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            heading: 'Why the Timeline Cannot Be Shortened',
            body: (
              <div className="space-y-4 text-gray-300">
                <p>
                  Structural drying is governed by physics, not speed of work. Water molecules bonded into timber,
                  concrete, and gypsum must be drawn out by maintaining a precise vapour pressure differential
                  between the building material and the surrounding air. This is achieved by running LGR dehumidifiers
                  and air movers continuously for 3–5 days.
                </p>
                <p>
                  Attempting to accelerate by closing up walls, repainting, or relaying flooring before readings confirm
                  drying is complete will trap residual moisture. That trapped moisture generates mould within 2–4 weeks,
                  requiring the restoration to be reopened — at significantly greater cost.
                </p>
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  fontSize: '0.875rem',
                }}>
                  <strong style={{ color: '#fca5a5', display: 'block', marginBottom: '0.5rem' }}>Do not do this before drying is confirmed complete:</strong>
                  <ul className="space-y-1 list-disc list-inside text-gray-400">
                    <li>Close up wall cavities or install new plasterboard</li>
                    <li>Repaint walls or ceilings</li>
                    <li>Install new flooring or carpet</li>
                    <li>Replace insulation batts in cavities</li>
                  </ul>
                </div>
              </div>
            ),
          },
          {
            heading: 'Full Restoration Timeline — Phase by Phase',
            body: (
              <div className="space-y-4">
                {timelinePhases.map((phase) => (
                  <div
                    key={phase.phase}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${phase.colour}44`,
                      borderLeft: `4px solid ${phase.colour}`,
                      borderRadius: '0.5rem',
                      padding: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <strong style={{ color: '#fff', fontSize: '1rem' }}>{phase.phase}</strong>
                      <span style={{ background: `${phase.colour}22`, color: phase.colour, padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {phase.duration}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {phase.steps.map((step) => (
                        <li key={step} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                          <span style={{ color: phase.colour, flexShrink: 0 }}>→</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ),
          },
          {
            heading: 'What Affects the Timeline',
            body: (
              <div className="space-y-3 text-gray-300">
                <p>Several factors can extend or compress total restoration time:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { factor: 'Water category', detail: 'Category 1 (clean) dries fastest. Category 3 (black water) requires full containment and antimicrobial treatment — adds 2–4 days minimum.' },
                    { factor: 'Time before extraction starts', detail: 'Every hour of delay allows moisture to penetrate deeper into structural materials. 18+ hours undetected adds 1–2 days to drying.' },
                    { factor: 'Affected area size', detail: 'A single bathroom may dry in 3 days. A whole-house flood may take 5–7 days even with full equipment deployment.' },
                    { factor: 'Building materials', detail: 'Hardwood subfloors, thick concrete slabs, and dense wall insulation retain moisture longer than carpet, plasterboard, and softwood framing.' },
                    { factor: 'Climate and humidity', detail: 'Queensland\'s tropical humidity extends drying times. Arid SA/WA conditions accelerate them. Equipment output is calibrated accordingly.' },
                    { factor: 'Insurer access requirements', detail: 'If the insurer requires their own assessor visit before repairs begin, this can add 5–15 business days to the repair phase — not the drying phase.' },
                  ].map((item) => (
                    <div key={item.factor} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '0.5rem',
                      padding: '0.875rem',
                    }}>
                      <strong style={{ color: '#38BDF8', display: 'block', fontSize: '0.875rem', marginBottom: '0.35rem' }}>{item.factor}</strong>
                      <span style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.6 }}>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            heading: 'Insurance and Timing — What to Know',
            body: (
              <div className="space-y-3 text-gray-300">
                <p>
                  Emergency make-safe — including water extraction and drying equipment deployment — does not require
                  insurer pre-approval. Begin immediately to prevent mould and escalating damage.
                </p>
                <p>
                  Under the General Insurance Code of Practice, your insurer must acknowledge your claim within
                  10 business days and provide a decision within 10 business days of receiving all required information.
                  If your insurer delays the repair phase by failing to provide assessor access or approval within
                  reasonable timeframes, this is a GICP compliance issue.
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
          { title: 'Emergency Water Extraction', href: '/services/emergency-water-extraction', description: 'Lodge an emergency claim — priority dispatch.' },
          { title: 'What to Do After a Flood', href: '/guides/flood-damage/what-to-do-after-a-flood-australia', description: 'Step-by-step flood recovery guide.' },
          { title: 'When Your Insurer Delays Your Claim', href: '/guides/insurance/insurer-delays-your-claim', description: 'GICP timeframes and how to escalate.' },
          { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Full water damage restoration service.' },
        ]}
        cta={{ text: 'Lodge Emergency Claim', href: '/claim?service=water-damage' }}
      />
    </>
  );
}
