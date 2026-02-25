import { Metadata } from 'next'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { AgContentPageTemplate } from '@/components/antigravity'
import { Waves, Shield, Clock, AlertTriangle, CheckCircle, Droplets, Home, Thermometer, FileCheck, AlertCircle } from 'lucide-react'

// ---------------------------------------------------------------------------
// SEO Metadata — flood damage restoration (national)
// ---------------------------------------------------------------------------
export const metadata: Metadata = generateSEO({
  title: 'Flood Damage Restoration Australia | 24/7 Emergency Flood Cleanup | Disaster Recovery',
  description:
    'Professional flood damage restoration across Australia. 24/7 emergency flood water extraction, structural drying, decontamination and full flood recovery. IICRC-certified contractors, insurance approved. Start your claim online now.',
  keywords: [
    'flood damage restoration',
    'flood cleanup',
    'flood water extraction',
    'flood recovery Australia',
    'emergency flood response',
    'flood damage insurance claim',
    'flood remediation',
    'flash flood cleanup',
    'flood restoration services',
    'flood damage repair',
    'flood water removal',
    'flood decontamination',
  ],
  canonical: 'https://disasterrecovery.com.au/services/flood-damage-restoration',
  openGraph: {
    title: 'Flood Damage Restoration Australia — 24/7 Emergency Response',
    description:
      'IICRC-certified flood restoration contractors Australia-wide. Emergency water extraction, structural drying, mould prevention and full property restoration after flooding.',
    images: [
      {
        url: '/images/services/flood-damage-restoration.webp',
        alt: 'Professional flood damage restoration — water extraction and structural drying',
      },
    ],
    type: 'website',
  },
})

// ---------------------------------------------------------------------------
// FAQ data (used in both schema and on-page section)
// ---------------------------------------------------------------------------
const floodFAQs = [
  {
    question: 'What are the different categories of flood water contamination?',
    answer:
      'Flood water is categorised into three levels. Category 1 (clean water) comes from a sanitary source such as a burst supply line. Category 2 (grey water) contains significant contamination from sources like washing machine overflows or dishwasher leaks. Category 3 (black water) is grossly contaminated and may contain sewage, chemicals or pathogens — this includes most natural flood water and always requires professional decontamination by IICRC-certified specialists.',
  },
  {
    question: 'Will my insurance cover flood damage restoration?',
    answer:
      'Most Australian home and contents policies now include flood cover following regulatory changes after the 2022 floods, though some policies still exclude riverine flooding. We bill you directly so work begins immediately, and provide comprehensive documentation to support your reimbursement claim with any insurer. Start your claim online and our system will guide you through the process.',
  },
  {
    question: 'How long does it take to dry out a property after flooding?',
    answer:
      'Drying time depends on the severity of flooding, building materials, humidity and ventilation. Typical residential properties take 3 to 5 days with industrial drying equipment. Larger or severely affected properties may take 7 to 14 days. IICRC-certified contractors monitor moisture levels daily with calibrated meters and thermal imaging to ensure complete structural drying before restoration begins.',
  },
  {
    question: 'How quickly can mould grow after a flood?',
    answer:
      'Mould can begin colonising within 24 to 48 hours of flooding in Australian conditions. Once established, it spreads rapidly and can cause structural damage plus serious health risks including respiratory illness. This is why rapid water extraction and professional drying within the first 48 hours is critical — it dramatically reduces mould risk and secondary damage.',
  },
  {
    question: 'How much does flood damage restoration cost in Australia?',
    answer:
      'Costs vary significantly based on flood severity, contamination category and property size. Minor Category 1 flooding in a single room may cost $2,000 to $5,000. A full house affected by Category 3 black water can range from $15,000 to $50,000 or more. Most costs are covered by insurance. We provide detailed scoping and cost documentation to support your claim.',
  },
  {
    question: 'Is it safe to enter my home after a flood?',
    answer:
      'Do not re-enter a flooded property until authorities confirm it is safe. Risks include structural collapse, electrical hazards, gas leaks, contaminated water and hidden debris. Even after water recedes, surfaces may be contaminated with sewage, chemicals or biological hazards. IICRC-certified contractors perform safety assessments and contamination testing before any re-entry or restoration work begins.',
  },
  {
    question: 'When can I return home after flood damage restoration?',
    answer:
      'You can return once the property has been fully dried (verified by moisture readings at or below normal levels), decontaminated, structurally assessed, and cleared by your restoration contractor. For minor flooding this may be within a week. For severe Category 3 flooding with structural damage, it may take several weeks. Your contractor will provide a clear timeline and regular progress updates.',
  },
  {
    question: 'How is structural damage assessed after a flood?',
    answer:
      'Structural assessment involves visual inspection of foundations, framing, load-bearing walls and subfloor areas, combined with moisture mapping using thermal imaging cameras and penetrating moisture meters. Concrete cores may be tested for moisture content. Engineers may be engaged for severe cases. This assessment determines whether materials can be dried and saved or must be removed and replaced as part of the restoration scope.',
  },
  {
    question: 'What should I do immediately after a flood?',
    answer:
      'First, ensure your family\'s safety and evacuate if required. Do not enter flood water — it may be electrically charged or contaminated. Once safe, document everything with photos and video for insurance. Turn off electricity and gas at the mains if accessible. Contact your insurer and start a claim online through our platform. Avoid removing water yourself as improper extraction can worsen structural damage.',
  },
  {
    question: 'Do you service regional and rural areas after floods?',
    answer:
      'Yes. Our network of IICRC-certified contractors covers all of Australia — from major capitals like Sydney, Melbourne and Brisbane to regional centres and rural communities. Flood events often affect regional areas hardest, and our national distribution model ensures rapid contractor deployment wherever you are.',
  },
]

// ---------------------------------------------------------------------------
// Structured data — Service schema (national)
// ---------------------------------------------------------------------------
const floodServiceSchema = generateServiceSchema({
  name: 'Flood Damage Restoration',
  description:
    'Professional flood damage restoration including emergency water extraction, structural drying, decontamination and full property restoration. 24/7 emergency response with IICRC-certified contractors across Australia.',
  image: '/images/services/flood-damage-restoration.webp',
  areaServed: [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Newcastle',
    'Canberra',
    'Townsville',
    'Darwin',
  ],
})

// ---------------------------------------------------------------------------
// Structured data — Breadcrumb schema
// ---------------------------------------------------------------------------
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  {
    name: 'Flood Damage Restoration',
    url: 'https://disasterrecovery.com.au/services/flood-damage-restoration',
  },
])

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function FloodDamageRestorationPage() {
  return (
    <>
      <StructuredData data={floodServiceSchema} />
      <StructuredData data={generateFAQSchema(floodFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-water-damage.webp',
          icon: <Waves className="h-12 w-12" />,
          title: 'Flood Damage Restoration',
          subtitle:
            'Australia-wide 24/7 emergency flood response. IICRC-certified contractors for water extraction, structural drying, decontamination and full property restoration — all insurance companies accepted.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-water-damage.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Flood Damage Restoration' },
        ]}
        stats={[
          { label: 'Emergency Response', value: '24/7' },
          { label: 'Flood Types', value: 'All Categories' },
          { label: 'Insurer Approved', value: 'All Major' },
          { label: 'Coverage', value: 'Australia-Wide' },
        ]}
        sections={[
          /* ------------------------------------------------------------ */
          /* 1. Emergency Flood Response                                    */
          /* ------------------------------------------------------------ */
          {
            heading: 'Emergency Flood Response',
            body: (
              <>
                <p>
                  When flood water enters your property, every hour counts. Rapid response is the single
                  most important factor in reducing total damage, preventing mould growth and preserving
                  structural integrity. Our national network of IICRC-certified contractors provides 24/7
                  emergency flood response across Australia.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Clock style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', color: '#0369A1' }} />
                    <div>
                      <strong>Immediate Water Extraction</strong>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>
                        Submersible pumps and truck-mounted extractors deployed within hours to remove
                        standing flood water before it saturates structural materials.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <AlertTriangle style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', color: '#D97706' }} />
                    <div>
                      <strong>Contamination Assessment</strong>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>
                        All flood water is tested and categorised (Category 1, 2 or 3) to determine the
                        correct decontamination protocol and safety requirements.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <FileCheck style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', color: '#059669' }} />
                    <div>
                      <strong>Insurance Documentation</strong>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>
                        Comprehensive photo and video documentation captured from the first visit to
                        support your insurance claim with evidence-grade records.
                      </p>
                    </div>
                  </div>
                </div>

                <p style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(12, 74, 110, 0.08)', borderRadius: '0.5rem', borderLeft: '4px solid #0369A1' }}>
                  <strong>Critical window:</strong> Mould can begin growing within 24 to 48 hours of
                  flooding. Structural drying that begins within 48 hours reduces secondary damage by up
                  to 87%. Do not delay — start your claim online now.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 2. Flood Water Categories                                     */
          /* ------------------------------------------------------------ */
          {
            heading: 'Understanding Flood Water Categories',
            background: 'light',
            body: (
              <>
                <p>
                  Not all flood water is the same. The IICRC S500 standard classifies water damage into
                  three categories based on contamination level. Understanding these categories is
                  essential because each requires a different restoration approach, safety protocol and
                  cost structure.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  {/* Category 1 */}
                  <div style={{ padding: '1.25rem', background: 'white', borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <Droplets style={{ width: '1.25rem', height: '1.25rem', color: '#0EA5E9' }} />
                      <strong style={{ color: '#0369A1' }}>Category 1 — Clean Water</strong>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Water from a sanitary source such as a broken supply line, overflowing sink with no
                      contaminants, or rainwater intrusion. Poses no substantial health risk. Standard
                      extraction and drying protocols apply.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
                      <strong>Examples:</strong> Burst mains pipe, leaking tap, overflowing bath
                    </p>
                  </div>

                  {/* Category 2 */}
                  <div style={{ padding: '1.25rem', background: 'white', borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#D97706' }} />
                      <strong style={{ color: '#92400E' }}>Category 2 — Grey Water</strong>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Contains significant contamination that could cause illness if ingested or exposed
                      to. Includes chemical, biological or physical contaminants. Requires antimicrobial
                      treatment and may require removal of porous materials.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
                      <strong>Examples:</strong> Washing machine overflow, dishwasher leak, aquarium rupture
                    </p>
                  </div>

                  {/* Category 3 */}
                  <div style={{ padding: '1.25rem', background: 'white', borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#DC2626' }} />
                      <strong style={{ color: '#991B1B' }}>Category 3 — Black Water</strong>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Grossly contaminated water containing pathogenic agents, sewage, chemicals and other
                      harmful substances. <strong>Most natural flood water is Category 3.</strong> Requires
                      full personal protective equipment, removal of all affected porous materials, and
                      professional antimicrobial decontamination.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
                      <strong>Examples:</strong> River flooding, storm surge, sewage backup, ground-surface water
                    </p>
                  </div>
                </div>

                <p style={{ marginTop: '1.25rem', fontSize: '0.95rem' }}>
                  <strong>Important:</strong> Untreated Category 1 water can deteriorate to Category 2
                  within 48 hours and to Category 3 within 72 hours if left stagnant. Time is critical in
                  every flood scenario.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 3. Our Flood Restoration Process                              */
          /* ------------------------------------------------------------ */
          {
            heading: 'Our Flood Restoration Process',
            body: (
              <>
                <p>
                  Our IICRC-certified contractors follow a proven, systematic restoration process aligned
                  with the IICRC S500 standard and Australian building codes. Every step is documented
                  for your insurance claim.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                  {[
                    {
                      step: '1',
                      title: 'Emergency Water Extraction',
                      time: '0–24 hours',
                      description:
                        'Submersible pumps, truck-mounted extractors and portable extraction units remove standing water. Thermal imaging identifies hidden moisture behind walls and under floors.',
                      icon: <Waves style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />,
                      colour: '#0369A1',
                    },
                    {
                      step: '2',
                      title: 'Structural Drying',
                      time: '1–7 days',
                      description:
                        'Industrial dehumidifiers (LGR and desiccant), high-velocity air movers and targeted heat drying bring moisture content to pre-loss levels. Daily moisture readings track progress.',
                      icon: <Thermometer style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />,
                      colour: '#0284C7',
                    },
                    {
                      step: '3',
                      title: 'Decontamination & Antimicrobial Treatment',
                      time: '2–5 days',
                      description:
                        'All affected surfaces are cleaned, sanitised and treated with EPA-registered antimicrobial agents. Contaminated porous materials (carpet, underlay, gyprock) are safely removed and disposed of.',
                      icon: <Shield style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />,
                      colour: '#059669',
                    },
                    {
                      step: '4',
                      title: 'Restoration & Rebuild',
                      time: '1–4 weeks',
                      description:
                        'Full property restoration including replacement of removed materials, repainting, flooring installation, cabinetry and any structural repairs. Your property returned to pre-loss condition.',
                      icon: <Home style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />,
                      colour: '#7C3AED',
                    },
                  ].map((item) => (
                    <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          flexShrink: 0,
                          width: '2.75rem',
                          height: '2.75rem',
                          borderRadius: '50%',
                          background: item.colour,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1.1rem',
                        }}
                      >
                        {item.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <strong>{item.title}</strong>
                          <span style={{ fontSize: '0.85rem', color: '#64748B' }}>({item.time})</span>
                        </div>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 4. Flood Damage Insurance Claims                              */
          /* ------------------------------------------------------------ */
          {
            heading: 'Flood Damage Insurance Claims',
            background: 'light',
            body: (
              <>
                <p>
                  Navigating insurance after a flood can be overwhelming. Our platform streamlines the
                  entire process — from initial documentation to final settlement — connecting you with
                  IICRC-certified contractors who understand insurer requirements and produce
                  claim-ready scoping documents.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
                  {[
                    {
                      icon: <FileCheck style={{ width: '1.5rem', height: '1.5rem', color: '#0369A1' }} />,
                      title: 'Damage Documentation',
                      text: 'Evidence-grade photo and video records captured at every stage. Moisture readings, thermal images and contamination test results compiled into a comprehensive report.',
                    },
                    {
                      icon: <Shield style={{ width: '1.5rem', height: '1.5rem', color: '#0369A1' }} />,
                      title: 'Scope of Works',
                      text: 'Detailed line-item scoping that meets insurer audit standards. Materials, labour, equipment and disposal costs documented with industry-standard pricing.',
                    },
                    {
                      icon: <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: '#0369A1' }} />,
                      title: 'Full Claims Documentation',
                      text: 'We bill you directly and provide comprehensive documentation to support your reimbursement claim with any insurer. Payment plans available through Blue Fire Finance.',
                    },
                    {
                      icon: <Clock style={{ width: '1.5rem', height: '1.5rem', color: '#0369A1' }} />,
                      title: 'Fast Claim Processing',
                      text: 'Start your claim online 24/7 through our platform. Your claim is matched to an approved, IICRC-certified contractor and scoping begins immediately.',
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</div>
                      <div>
                        <strong>{item.title}</strong>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.95rem' }}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 5. Health & Safety After Flooding                             */
          /* ------------------------------------------------------------ */
          {
            heading: 'Health & Safety After Flooding',
            body: (
              <>
                <p>
                  Flood water poses serious health and safety risks that persist long after the water
                  recedes. Professional assessment and remediation are essential to protect occupants.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  {/* Contamination Risks */}
                  <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(220, 38, 38, 0.2)', background: 'rgba(254, 242, 242, 0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <AlertTriangle style={{ width: '1.25rem', height: '1.25rem', color: '#DC2626' }} />
                      <strong style={{ color: '#991B1B' }}>Contamination Risks</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      <li>Sewage and faecal bacteria (E. coli, Salmonella)</li>
                      <li>Chemical contaminants from agricultural or industrial runoff</li>
                      <li>Pesticides, herbicides and fuel residues</li>
                      <li>Dead animals and biological hazards</li>
                    </ul>
                  </div>

                  {/* Mould Prevention */}
                  <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(217, 119, 6, 0.2)', background: 'rgba(255, 251, 235, 0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <Droplets style={{ width: '1.25rem', height: '1.25rem', color: '#D97706' }} />
                      <strong style={{ color: '#92400E' }}>Mould Prevention</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      <li>Mould colonises within 24 to 48 hours in warm, humid conditions</li>
                      <li>Airborne spores cause respiratory illness and allergic reactions</li>
                      <li>Hidden mould behind walls and under floors requires thermal imaging to detect</li>
                      <li>Professional antimicrobial treatment prevents re-growth</li>
                    </ul>
                  </div>

                  {/* Electrical Safety */}
                  <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(3, 105, 161, 0.2)', background: 'rgba(240, 249, 255, 0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#0369A1' }} />
                      <strong style={{ color: '#0C4A6E' }}>Electrical & Structural Safety</strong>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      <li>Never enter a flooded property with power still connected</li>
                      <li>All electrical systems must be inspected by a licensed electrician before reconnection</li>
                      <li>Subfloor and foundation integrity must be assessed before re-occupancy</li>
                      <li>Gas lines require professional inspection and clearance</li>
                    </ul>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 6. Equipment & Technology                                     */
          /* ------------------------------------------------------------ */
          {
            heading: 'Equipment & Technology',
            background: 'light',
            body: (
              <>
                <p>
                  Our IICRC-certified contractors deploy commercial-grade equipment and proven
                  technology at every stage of the flood restoration process.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
                  {[
                    {
                      title: 'Submersible Pumps',
                      description:
                        'High-capacity submersible and trash pumps capable of extracting thousands of litres per hour, even with debris-laden Category 3 flood water.',
                    },
                    {
                      title: 'Industrial Dehumidifiers',
                      description:
                        'LGR (Low Grain Refrigerant) and desiccant dehumidifiers that extract up to 90 litres of moisture per day per unit, engineered for Australian humidity levels.',
                    },
                    {
                      title: 'Moisture Mapping',
                      description:
                        'FLIR thermal imaging cameras and calibrated penetrating moisture meters create detailed moisture maps to identify hidden water and verify complete drying.',
                    },
                    {
                      title: 'Antimicrobial Treatments',
                      description:
                        'EPA-registered, hospital-grade antimicrobial agents applied via fogging, spraying and direct application to eliminate bacteria, viruses and mould spores.',
                    },
                    {
                      title: 'Air Movers & Scrubbers',
                      description:
                        'High-velocity axial and centrifugal air movers combined with HEPA-filtered air scrubbers to accelerate drying and maintain air quality during restoration.',
                    },
                    {
                      title: 'Injectidry Systems',
                      description:
                        'Specialised cavity drying systems that force warm, dry air into wall cavities, cabinetry and subfloor spaces where conventional equipment cannot reach.',
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '1.25rem', background: 'white', borderRadius: '0.75rem', border: '1px solid rgba(0,0,0,0.06)' }}>
                      <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0C4A6E' }}>{item.title}</strong>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 7. Areas We Service                                           */
          /* ------------------------------------------------------------ */
          {
            heading: 'Areas We Service',
            body: (
              <>
                <p>
                  Our national network of IICRC-certified flood restoration contractors covers every
                  state and territory in Australia. From capital cities to regional centres and rural
                  communities — wherever flooding strikes, we deploy qualified contractors fast.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                  {[
                    { state: 'NSW', cities: 'Sydney, Newcastle, Wollongong, Central Coast, Lismore' },
                    { state: 'VIC', cities: 'Melbourne, Geelong, Ballarat, Bendigo, Shepparton' },
                    { state: 'QLD', cities: 'Brisbane, Gold Coast, Sunshine Coast, Townsville, Cairns, Rockhampton' },
                    { state: 'WA', cities: 'Perth, Fremantle, Mandurah, Bunbury, Geraldton' },
                    { state: 'SA', cities: 'Adelaide, Mount Gambier, Port Augusta, Murray Bridge' },
                    { state: 'TAS', cities: 'Hobart, Launceston, Devonport, Burnie' },
                    { state: 'NT', cities: 'Darwin, Alice Springs, Katherine, Palmerston' },
                    { state: 'ACT', cities: 'Canberra, Belconnen, Tuggeranong, Woden Valley' },
                  ].map((region) => (
                    <div key={region.state} style={{ padding: '1rem', background: 'rgba(12, 74, 110, 0.04)', borderRadius: '0.5rem' }}>
                      <strong style={{ color: '#0C4A6E', display: 'block', marginBottom: '0.25rem' }}>
                        {region.state}
                      </strong>
                      <span style={{ fontSize: '0.9rem' }}>{region.cities}</span>
                    </div>
                  ))}
                </div>

                <p style={{ marginTop: '1.25rem', fontSize: '0.95rem' }}>
                  Don't see your location? We service <strong>all of Australia</strong>. Start your
                  claim online and we will connect you with the nearest certified contractor.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 8. Frequently Asked Questions                                 */
          /* ------------------------------------------------------------ */
          {
            heading: 'Frequently Asked Questions',
            background: 'light',
            body: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {floodFAQs.map((faq, i) => (
                  <details
                    key={i}
                    style={{
                      padding: '1.25rem',
                      background: 'white',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                    }}
                  >
                    <summary style={{ fontWeight: 600, fontSize: '1.05rem', color: '#0C4A6E' }}>
                      {faq.question}
                    </summary>
                    <p style={{ margin: '0.75rem 0 0', fontSize: '0.95rem', lineHeight: 1.65 }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            ),
          },
        ]}
        relatedPages={[
          {
            title: 'Water Damage Restoration',
            href: '/services/water-damage-restoration',
            description:
              'Professional water damage restoration for burst pipes, leaks and non-flood water events. IICRC S500 certified.',
          },
          {
            title: 'Storm Damage Restoration',
            href: '/services/storm-damage-restoration',
            description:
              'Emergency storm damage response including roof repairs, fallen tree removal and water ingress restoration.',
          },
          {
            title: 'Mould Remediation',
            href: '/services/mould-remediation',
            description:
              'Professional mould inspection, testing, containment and removal. Prevent secondary damage after flooding.',
          },
          {
            title: 'Sewage Cleanup',
            href: '/services/sewage-cleanup',
            description:
              'Specialist Category 3 sewage cleanup and decontamination. Health-certified technicians, all insurers accepted.',
          },
          {
            title: 'Flood Damage Cost Guide',
            href: '/cost/flood-damage',
            description:
              'Understand flood damage restoration costs across Australia. Pricing by category, property size and region.',
          },
        ]}
      />
    </>
  )
}
