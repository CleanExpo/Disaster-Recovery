import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Droplets } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Case Study: Burst Flexi Hose Water Damage — Brisbane 2024',
  description: 'A detailed IICRC-certified water damage restoration case study from Brisbane 2024. Burst flexi hose, Category 2 water, 4-day drying timeline, full moisture readings and insurance outcome documented.',
  keywords: [
    'burst flexi hose water damage Australia',
    'water damage restoration case study',
    'Category 2 water damage restoration',
    'Brisbane water damage restoration',
    'IICRC S500 case study',
    'water damage drying timeline',
    'burst flexi hose insurance claim',
  ],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/case-studies/burst-flexi-hose-brisbane-2024',
  },
  openGraph: {
    title: 'Case Study: Burst Flexi Hose Water Damage — Brisbane 2024',
    description: 'Detailed IICRC-certified restoration case study. Burst flexi hose, Category 2 water, 4-day drying, full insurance claim documentation.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Case Study: Burst Flexi Hose Water Damage Restoration — Brisbane 2024',
  description: 'IICRC S500:2025-compliant water damage restoration following a Category 2 burst flexi hose event in a Brisbane residential property. Includes full drying timeline, moisture readings, and insurance outcome.',
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
  datePublished: '2025-01-15',
  dateModified: '2026-04-10',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://disasterrecovery.com.au/case-studies/burst-flexi-hose-brisbane-2024',
  },
  articleSection: 'Case Studies',
  inLanguage: 'en-AU',
  isAccessibleForFree: true,
  about: {
    '@type': 'Thing',
    name: 'Water Damage Restoration',
    description: 'IICRC S500:2025 water damage restoration process for Category 2 burst pipe events',
  },
};

interface MoistureReading {
  day: string;
  location: string;
  reading: string;
  target: string;
  status: 'Wet' | 'Elevated' | 'Acceptable' | 'Dry';
}

const moistureReadings: MoistureReading[] = [
  { day: 'Day 0 (extraction)', location: 'Bathroom subfloor', reading: '94%', target: '<16%', status: 'Wet' },
  { day: 'Day 0 (extraction)', location: 'Hallway carpet pad', reading: 'Saturated', target: '<16%', status: 'Wet' },
  { day: 'Day 0 (extraction)', location: 'Bedroom 2 wall cavity', reading: '78%', target: '<16%', status: 'Wet' },
  { day: 'Day 1', location: 'Bathroom subfloor', reading: '62%', target: '<16%', status: 'Wet' },
  { day: 'Day 1', location: 'Bedroom 2 wall cavity', reading: '48%', target: '<16%', status: 'Wet' },
  { day: 'Day 2', location: 'Bathroom subfloor', reading: '31%', target: '<16%', status: 'Elevated' },
  { day: 'Day 2', location: 'Bedroom 2 wall cavity', reading: '22%', target: '<16%', status: 'Elevated' },
  { day: 'Day 3', location: 'Bathroom subfloor', reading: '18%', target: '<16%', status: 'Elevated' },
  { day: 'Day 3', location: 'Bedroom 2 wall cavity', reading: '14%', target: '<16%', status: 'Acceptable' },
  { day: 'Day 4', location: 'Bathroom subfloor', reading: '13%', target: '<16%', status: 'Dry' },
  { day: 'Day 4', location: 'All locations', reading: '11–14%', target: '<16%', status: 'Dry' },
];

const statusColour: Record<MoistureReading['status'], string> = {
  Wet: '#ef4444',
  Elevated: '#f97316',
  Acceptable: '#eab308',
  Dry: '#22c55e',
};

export default function BurstFlexiHoseCaseStudyPage() {
  return (
    <>
      <Script
        id="case-study-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0C2340 0%, #1D4ED8 100%)',
          icon: <Droplets className="h-12 w-12" />,
          title: 'Case Study: Burst Flexi Hose Water Damage',
          subtitle: 'Brisbane residential property, 2024. Category 2 water damage restoration. IICRC S500:2025 protocol. 4-day structural drying. Full insurance claim documentation.',
        }}
        cta={{ text: 'Lodge Your Claim', href: '/claim?service=water-damage' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Burst Flexi Hose — Brisbane 2024' },
        ]}
        sections={[
          {
            heading: 'Incident Overview',
            body: (
              <div className="space-y-4 text-gray-300">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  {[
                    { label: 'Location', value: 'Brisbane, QLD' },
                    { label: 'Property type', value: 'Residential — 3 bed, 2 bath' },
                    { label: 'Water category', value: 'Category 2 (Grey Water)' },
                    { label: 'Source', value: 'Burst braided steel flexi hose under bathroom vanity' },
                    { label: 'Discovery time', value: '~18 hours after failure' },
                    { label: 'Affected area', value: '~68m² across 4 rooms' },
                    { label: 'Drying duration', value: '4 days' },
                    { label: 'Insurance outcome', value: 'Approved — full scope paid' },
                  ].map((item) => (
                    <div key={item.label} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '0.5rem',
                      padding: '0.875rem',
                    }}>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{item.label}</div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <p>
                  A braided steel flexi hose on the hot water supply to the bathroom vanity failed at the fitting. The homeowner was away for approximately 18 hours before discovery. Water had discharged at mains pressure into the vanity cabinet, across the bathroom floor, through the hallway, and into two adjacent bedrooms.
                </p>
                <p>
                  Because the event occurred overnight, the water had 18 hours to penetrate carpet backing, subfloor timber, and the base of plasterboard walls before extraction began. The standing water was classified <strong className="text-white">Category 2 (grey water)</strong> — not clean water — due to contact with contaminants inside the vanity cabinet and 18-hour stagnation period.
                </p>
              </div>
            ),
          },
          {
            heading: 'Day 0 — Emergency Response and Extraction',
            body: (
              <div className="space-y-3 text-gray-300">
                <p><strong className="text-white">Dispatch time:</strong> 47 minutes from claim lodgement to on-site.</p>
                <p>
                  On arrival, the technician isolated the water supply and conducted a full hazard assessment including electrical isolation check and thermal imaging survey. Category 2 classification was confirmed and containment protocols initiated.
                </p>
                <div className="space-y-2">
                  <strong className="text-white block">Extraction and initial readings:</strong>
                  <ul className="text-sm list-disc list-inside space-y-1 text-gray-400">
                    <li>Weighted extraction rover deployed across all carpet zones — approximately 340 litres removed from carpet and pad.</li>
                    <li>Truck-mounted extractor cleared 120 litres of standing water from bathroom and hallway.</li>
                    <li>Thermal imaging confirmed moisture penetration into hallway subfloor, bathroom subfloor, and base of Bedroom 2 wall cavity (the adjacent room).</li>
                    <li>Penetrometer readings: bathroom subfloor 94%, hallway carpet pad saturated, Bedroom 2 wall cavity 78%.</li>
                    <li>Carpet and pad in hallway assessed as non-restorable (contamination + saturation) — lifted and bagged for disposal.</li>
                  </ul>
                </div>
                <p>
                  Equipment installed Day 0: 4 × LGR dehumidifiers, 8 × high-velocity air movers (floor-mounted, directed into wall cavities via injection ports), 1 × desiccant dehumidifier for bathroom. All power draw logged for insurer documentation.
                </p>
              </div>
            ),
          },
          {
            heading: 'Drying Timeline — Moisture Readings by Day',
            body: (
              <div>
                <p className="text-gray-300 text-sm mb-4">
                  All readings taken using a penetrometer calibrated per IICRC S500:2025 requirements. Target: return to pre-loss baseline (&lt;16% moisture content for timber substrates).
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.08)' }}>
                        {['Day', 'Location', 'Reading', 'Target', 'Status'].map((h) => (
                          <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', color: '#cbd5e1', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {moistureReadings.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '0.5rem 0.75rem', color: '#94a3b8' }}>{row.day}</td>
                          <td style={{ padding: '0.5rem 0.75rem', color: '#e2e8f0' }}>{row.location}</td>
                          <td style={{ padding: '0.5rem 0.75rem', color: '#fff', fontWeight: 600 }}>{row.reading}</td>
                          <td style={{ padding: '0.5rem 0.75rem', color: '#94a3b8' }}>{row.target}</td>
                          <td style={{ padding: '0.5rem 0.75rem' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '0.15rem 0.6rem',
                              borderRadius: '999px',
                              background: `${statusColour[row.status]}22`,
                              color: statusColour[row.status],
                              fontSize: '0.75rem',
                              fontWeight: 700,
                            }}>{row.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ),
          },
          {
            heading: 'Day 4 — Final Clearance and Antimicrobial Treatment',
            body: (
              <div className="space-y-3 text-gray-300">
                <p>
                  All penetrometer readings returned to pre-loss baseline on Day 4 (11–14% across all locations). Equipment removed after final photo documentation of moisture readings.
                </p>
                <p>
                  Antimicrobial treatment applied to all surfaces that contacted Category 2 water: EPA-registered botanical disinfectant, applied at manufacturer-specified dilution, covering bathroom subfloor, hallway subfloor exposed after carpet removal, Bedroom 2 baseboard and lower wall framing.
                </p>
                <p>
                  <strong className="text-white">Scope of repairs recommended post-drying:</strong>
                </p>
                <ul className="text-sm list-disc list-inside space-y-1 text-gray-400">
                  <li>Replace hallway carpet and pad (non-restorable — contaminated and removed Day 0).</li>
                  <li>Replace 3 linear metres of Bedroom 2 plasterboard base (bottom 300mm showed elevated moisture at Day 2 that did not fully recover).</li>
                  <li>Repaint bathroom and Bedroom 2 lower walls.</li>
                  <li>Plumber to assess and replace vanity flexi hose and inspect all other flexi hoses in property.</li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Insurance Outcome',
            body: (
              <div className="space-y-3 text-gray-300">
                <p>
                  The homeowner&apos;s insurer accepted the claim as a sudden and accidental event. The IICRC-certified drying logs, scope of works, and photographic documentation provided by NRPG were accepted without dispute.
                </p>
                <div style={{
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                }}>
                  <strong className="text-white block mb-2">Claim outcome:</strong>
                  <ul className="text-sm space-y-1 list-disc list-inside text-gray-300">
                    <li>Emergency extraction and drying: Approved in full.</li>
                    <li>Carpet replacement (hallway): Approved.</li>
                    <li>Plasterboard replacement (Bedroom 2): Approved.</li>
                    <li>Repainting (bathroom and Bedroom 2): Approved.</li>
                    <li>Flexi hose replacement: Denied (maintenance — not covered as a defined event). Homeowner paid this directly.</li>
                    <li>Total restoration claim settled within 18 business days of lodgement.</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  The homeowner also had all remaining braided steel flexi hoses in the property replaced by a plumber after this event. Braided flexi hoses have an approximate 10-year lifespan and are a leading cause of residential water damage in Australia.
                </p>
              </div>
            ),
          },
          {
            heading: 'Key Lessons',
            body: (
              <div className="space-y-3 text-gray-300">
                <ul className="space-y-3">
                  {[
                    'Braided steel flexi hoses are the leading cause of sudden residential water damage events in Australia. Any flexi hose older than 10 years should be replaced proactively.',
                    'Category 2 classification (not Category 1 clean water) was triggered by the 18-hour stagnation period. Earlier discovery and faster response would have resulted in a lower-cost, Category 1 restoration.',
                    'Thermal imaging on Day 0 identified moisture penetration into Bedroom 2 that was not visible to the naked eye. Without this step, the wall cavity would have been sealed over wet — guaranteeing mould within 2–4 weeks.',
                    'IICRC-certified documentation eliminated any dispute with the insurer. The drying logs and moisture readings provided a clear, objective record of the restoration scope and outcome.',
                    'Emergency make-safe began within 47 minutes — before any insurance approval was received. Waiting for approval would have extended water contact time and likely escalated the damage scope significantly.',
                  ].map((point, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '0.5rem',
                      listStyle: 'none',
                    }}>
                      <span style={{
                        flexShrink: 0,
                        color: '#22c55e',
                        fontWeight: 700,
                        fontSize: '1rem',
                        marginTop: '0.1rem',
                      }}>✓</span>
                      <span style={{ fontSize: '0.875rem' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            heading: 'Experienced a Burst Pipe?',
            body: (
              <div className="space-y-3 text-gray-300">
                <p>
                  Shut off the main water supply, photograph all damage before touching anything, and lodge an emergency claim immediately. Every hour of delay increases the risk of mould amplification and escalating restoration costs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Link
                    href="/claim?service=water-damage"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 1.75rem',
                      background: '#1D4ED8',
                      color: '#fff',
                      borderRadius: '0.5rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                    }}
                  >
                    Lodge Emergency Claim
                  </Link>
                  <Link
                    href="/guides/insurance/burst-pipe-insurance-claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 1.75rem',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#93c5fd',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    Burst Pipe Insurance Guide →
                  </Link>
                </div>
              </div>
            ),
          },
        ]}
        relatedPages={[
          { title: 'Burst Pipe Insurance Claim Guide', href: '/guides/insurance/burst-pipe-insurance-claim', description: 'What is covered, gradual leak disputes, and how to maximise your settlement.' },
          { title: 'Emergency Water Extraction', href: '/services/emergency-water-extraction', description: 'Lodge an emergency claim for 60-minute water extraction dispatch.' },
          { title: 'Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance', description: 'How to photograph and document water damage for your claim.' },
          { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Full water damage restoration service — extraction, drying, and repairs.' },
        ]}
      />
    </>
  );
}
