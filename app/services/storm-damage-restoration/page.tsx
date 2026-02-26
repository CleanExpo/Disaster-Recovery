import { Metadata } from 'next'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { generateServiceHowToSchema } from '@/lib/seo-schema'
import { AgContentPageTemplate } from '@/components/antigravity'
import {
  CloudLightning,
  Shield,
  Home,
  Droplets,
  Wind,
  Zap,
  FileCheck,
  TreePine,
  Thermometer,
  Camera,
  HardHat,
  MapPin,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// SEO Metadata with AI optimisation
// ---------------------------------------------------------------------------
export const metadata: Metadata = generateSEO({
  title: 'Storm Damage Restoration Australia | Emergency Cyclone, Hail & Wind Repair | Disaster Recovery',
  description:
    'Australia-wide storm damage restoration — emergency response for cyclone damage, hail damage, wind damage, roof damage and fallen trees. IICRC-certified contractors, claims-ready documentation, 24/7 availability. Start your claim online now.',
  keywords: [
    'storm damage restoration',
    'cyclone damage repair',
    'hail damage repair',
    'wind damage restoration',
    'roof damage repair',
    'emergency storm response',
    'storm cleanup Australia',
    'storm damage insurance claim',
    'fallen tree removal',
    'storm water ingress repair',
    'emergency board up after storm',
    'hail damage roof assessment',
    'cyclone damage restoration Australia',
    'storm damage cost estimate',
  ],
  canonical: 'https://disasterrecovery.com.au/services/storm-damage-restoration',
  openGraph: {
    title: 'Storm Damage Restoration Australia — 24/7 Emergency Response',
    description:
      'IICRC-certified storm damage restoration across Australia. Emergency make-safe, roof repairs, hail and cyclone damage, full insurance claim support.',
    images: [
      {
        url: '/images/services/storm-damage-restoration.webp',
        alt: 'Professional storm damage restoration — emergency roof tarp and debris removal',
      },
    ],
    type: 'website',
  },
})

// ---------------------------------------------------------------------------
// FAQ data for schema + on-page rendering
// ---------------------------------------------------------------------------
const stormFAQs = [
  {
    question: 'What should I do immediately after a storm damages my property?',
    answer:
      'Ensure everyone is safe and stay away from downed power lines or structurally compromised areas. Document visible damage with photographs, then start a claim through our online form. Our network of IICRC-certified contractors can provide emergency make-safe work — including tarping, board-up and debris removal — to prevent further damage while your full restoration is organised.',
  },
  {
    question: 'How quickly can you respond to storm damage?',
    answer:
      'Our contractor network operates 24/7 across Australia. In most metropolitan areas, emergency make-safe crews can be on-site within hours of a claim being lodged. During widespread storm events, response times may vary due to demand, but we prioritise urgent safety risks such as exposed roofing and structural instability.',
  },
  {
    question: 'What types of storm damage do you handle?',
    answer:
      'We coordinate restoration for all storm-related damage including wind damage to roofs, walls and fences; hail damage to roofing, cladding and vehicles; cyclone and severe weather structural damage; fallen trees on buildings, driveways and power lines; water ingress from broken windows, lifted roofing or failed flashings; and flooding caused by storm-driven rain.',
  },
  {
    question: 'Will my insurance cover storm damage restoration?',
    answer:
      'Most Australian home and commercial insurance policies include storm damage as a covered peril. Cover typically extends to wind, hail, lightning and rainwater ingress that results from storm damage. Our platform helps you document every detail — photos, moisture readings, scope of works — so your insurer receives a thorough, well-supported claim from day one.',
  },
  {
    question: 'Do you perform temporary repairs before the full restoration?',
    answer:
      'Yes. Emergency make-safe is a critical first step. Contractors in our network install temporary roof tarps, board up broken windows and doors, remove hazardous debris and set up industrial drying equipment if water has entered the property. These temporary measures are typically covered under your insurance policy and prevent secondary damage such as mould growth.',
  },
  {
    question: 'How much does storm damage restoration cost?',
    answer:
      'Costs vary widely depending on the type and extent of damage. Minor roof repairs may start from a few hundred dollars, while major cyclone or hail events involving structural, roofing and internal water damage can run into tens of thousands. Our cost guide at /cost/storm-damage provides indicative ranges, and our contractors provide detailed quotes after an on-site assessment.',
  },
  {
    question: 'Is it safe to stay in my home after a storm?',
    answer:
      'It depends on the severity of damage. If the roof is compromised, walls are cracked, or water is actively entering the building, temporary relocation is recommended until a qualified contractor confirms the structure is safe. Never enter a building where you can see sagging ceilings, smell gas, or observe exposed electrical wiring. Our contractors perform a safety assessment as part of every emergency response.',
  },
  {
    question: 'How do you handle fallen trees on a property?',
    answer:
      'Fallen tree removal is coordinated alongside structural assessment. Certified arborists or qualified contractors safely section and remove the tree, assess damage to the roof or structure beneath, and perform emergency make-safe work. If the tree has brought down power lines, the electricity provider must isolate the supply before any work begins. All tree removal and associated structural repairs are documented for your insurance claim.',
  },
  {
    question: 'What equipment do your contractors use for storm damage assessment?',
    answer:
      'IICRC-certified contractors use professional-grade equipment including moisture meters and thermal imaging cameras to detect hidden water ingress, drone photography for safe roof inspections, industrial dehumidifiers and air movers for drying, and digital documentation systems for comprehensive insurance reporting. This ensures every area of damage is identified, even where it is not visible to the naked eye.',
  },
  {
    question: 'Do you service rural and remote areas of Australia?',
    answer:
      'Yes. Disaster Recovery operates a nationwide contractor network covering metropolitan, regional, rural and remote Australia. While response times in remote areas may be longer than in capital cities, we coordinate with the closest available IICRC-certified contractors to reach every location. Our platform also supports deployments to mining sites, offshore facilities and operations in Papua New Guinea.',
  },
]

// ---------------------------------------------------------------------------
// Service schema (JSON-LD)
// ---------------------------------------------------------------------------
const stormServiceSchema = generateServiceSchema({
  name: 'Storm Damage Restoration',
  description:
    'Emergency storm damage restoration services across Australia — covering wind damage, hail damage, cyclone damage, fallen trees, roof repairs and water ingress. IICRC-certified contractors, 24/7 response, full insurance claim support.',
  image: '/images/services/storm-damage-restoration.webp',
  areaServed: [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Newcastle',
    'Canberra',
    'Hobart',
    'Darwin',
  ],
})

// ---------------------------------------------------------------------------
// Breadcrumb schema (JSON-LD)
// ---------------------------------------------------------------------------
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  {
    name: 'Storm Damage Restoration',
    url: 'https://disasterrecovery.com.au/services/storm-damage-restoration',
  },
])

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function StormDamageRestorationPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={stormServiceSchema} />
      <StructuredData data={generateFAQSchema(stormFAQs)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={generateServiceHowToSchema('storm-damage-restoration')} />

      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-storm-damage.webp',
          icon: <CloudLightning className="h-12 w-12" />,
          title: 'Storm Damage Restoration',
          subtitle:
            'Australia-wide emergency storm response — IICRC-certified contractors for cyclone, hail, wind and roof damage. Claims-ready documentation, 24/7 availability.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-storm-damage.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Storm Damage Restoration' },
        ]}
        stats={[
          { value: '24/7', label: 'Emergency Response' },
          { value: 'All Types', label: 'Storm Damage Covered' },
          { value: 'Insurance', label: 'Approved & Supported' },
          { value: 'National', label: 'Australia-Wide Coverage' },
        ]}
        sections={[
          /* ------------------------------------------------------------ */
          /* 1. Emergency Storm Response                                   */
          /* ------------------------------------------------------------ */
          {
            heading: 'Emergency Storm Response',
            body: (
              <>
                <p>
                  When a severe storm hits, every minute counts. Exposed roofing, shattered windows and waterlogged
                  interiors deteriorate rapidly — turning a manageable repair into a major rebuild if left unprotected.
                  Disaster Recovery connects you with IICRC-certified contractors who deliver emergency make-safe services
                  across Australia, day or night.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>What to do immediately after storm damage:</strong>
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <li>Ensure all occupants are safe — do not re-enter a structurally compromised building</li>
                  <li>Stay clear of downed power lines and report them to your electricity provider</li>
                  <li>Photograph all visible damage before any cleanup begins</li>
                  <li>Cover exposed belongings with plastic sheeting if it is safe to do so</li>
                  <li>
                    <strong>Start your claim online</strong> — our platform lodges your details and dispatches the
                    nearest available contractor for emergency make-safe work
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Emergency make-safe work — including roof tarping, window board-up, debris clearance and temporary
                  waterproofing — is typically covered under your insurance policy and prevents costly secondary damage
                  such as mould growth and structural deterioration.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 2. Types of Storm Damage We Handle                            */
          /* ------------------------------------------------------------ */
          {
            heading: 'Types of Storm Damage We Handle',
            background: 'light',
            body: (
              <>
                <p>
                  Australia's climate delivers everything from tropical cyclones in the north to severe hailstorms
                  across the eastern seaboard and destructive wind events nationwide. Our contractor network is equipped
                  and certified to restore damage from every type of storm event.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {/* Wind Damage */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Wind style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Wind Damage</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Lifted roofing, blown-off ridge caps, damaged fencing, collapsed carports and compromised
                        wall cladding from high winds and gusts.
                      </p>
                    </div>
                  </div>

                  {/* Hail Damage */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CloudLightning style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Hail Damage</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Cracked and dented roofing tiles, shattered skylights, pitted metal roofing, broken
                        guttering and downpipes, and damaged external cladding.
                      </p>
                    </div>
                  </div>

                  {/* Cyclone Damage */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Zap style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Cyclone Damage</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Severe structural damage, complete roof loss, widespread debris impact and major water
                        ingress from tropical cyclone events across northern Australia.
                      </p>
                    </div>
                  </div>

                  {/* Fallen Trees */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <TreePine style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Fallen Trees</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Tree strike on roofs, vehicles, fences and power lines. Includes safe tree removal,
                        structural assessment and associated repair work.
                      </p>
                    </div>
                  </div>

                  {/* Roof Damage */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Home style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Roof Damage</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Displaced tiles, torn metal sheeting, damaged flashings, compromised valleys and ridges
                        — from minor leaks through to complete roof replacement.
                      </p>
                    </div>
                  </div>

                  {/* Water Ingress */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Droplets style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Water Ingress</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Storm-driven rain entering through damaged roofing, broken windows, failed seals or
                        overwhelmed guttering — causing ceiling, wall and flooring damage inside the property.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 3. Our Storm Restoration Process                              */
          /* ------------------------------------------------------------ */
          {
            heading: 'Our Storm Restoration Process',
            body: (
              <>
                <p>
                  From emergency call-out to final sign-off, our four-stage process ensures your property is
                  stabilised, documented and fully restored — with insurance supported at every step.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {/* Step 1 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      1. Assessment
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      A certified contractor inspects the property, documents all damage with photographs and
                      moisture readings, and produces an initial scope of works. Drone photography is used for
                      safe roof inspections where required.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      2. Emergency Make-Safe
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Temporary roof tarps, board-up of broken windows and doors, hazardous debris removal and
                      deployment of industrial drying equipment to arrest water ingress and prevent secondary damage.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      3. Insurance Documentation
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Comprehensive reports including photo evidence, moisture mapping, thermal imaging results
                      and a detailed scope of works are prepared and submitted to your insurer to support a
                      smooth claims process.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      4. Full Restoration
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Once the claim is approved, permanent repairs are completed — roofing replacement, structural
                      repairs, internal plastering, painting and any other works required to return your property
                      to its pre-storm condition.
                    </p>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 4. Storm Damage Insurance Claims                              */
          /* ------------------------------------------------------------ */
          {
            heading: 'Storm Damage Insurance Claims',
            background: 'light',
            body: (
              <>
                <p>
                  Navigating an insurance claim after a storm can be overwhelming — especially when you are dealing
                  with property damage and displacement at the same time. Disaster Recovery simplifies the process
                  by connecting you with experienced, IICRC-certified contractors who understand exactly what
                  insurers require.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>How we support your storm damage claim:</strong>
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <li>
                    <strong>Thorough documentation</strong> — every aspect of damage is photographed, measured and
                    recorded using professional-grade equipment including moisture meters and thermal imaging cameras
                  </li>
                  <li>
                    <strong>Detailed scope of works</strong> — a line-by-line breakdown of all required repairs is
                    prepared in the format your insurer expects
                  </li>
                  <li>
                    <strong>Emergency make-safe invoicing</strong> — temporary repair costs are documented separately
                    to support immediate reimbursement under your policy
                  </li>
                  <li>
                    <strong>Comprehensive claims documentation</strong> — IICRC-certified contractors in our network
                    prepare detailed documentation, photos, and reports to support your insurance reimbursement claim
                  </li>
                  <li>
                    <strong>Progress reporting</strong> — regular updates with photographic evidence are provided
                    throughout the restoration to satisfy insurer milestones
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Most Australian home and commercial insurance policies cover storm damage as a standard peril.
                  Cover typically extends to wind, hail, lightning strike, fallen trees and rainwater ingress that
                  results from storm damage to the building.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 5. Equipment & Technology Used                                */
          /* ------------------------------------------------------------ */
          {
            heading: 'Equipment & Technology',
            body: (
              <>
                <p>
                  IICRC-certified contractors in the Disaster Recovery network use professional-grade equipment to
                  ensure every area of storm damage is identified, stabilised and restored to the highest standard.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Thermometer style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Moisture Meters & Thermal Imaging</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Non-invasive detection of hidden moisture behind walls, under flooring and within ceiling
                        cavities — critical for identifying water ingress that is not visible to the naked eye.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Camera style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Drone Roof Inspections</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Safe, high-resolution aerial photography of damaged roofing without the need for ladder
                        access on unstable structures. Provides clear evidence for insurance documentation.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Wind style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Industrial Drying Equipment</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Commercial-grade dehumidifiers, air movers and axial fans for rapid structural drying.
                        Prevents mould growth and timber deterioration following storm water ingress.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <HardHat style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Temporary Roofing & Board-Up</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Heavy-duty tarps, structural-grade boarding, and temporary waterproofing membranes to
                        secure exposed areas until permanent repairs can be completed.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <FileCheck style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Digital Documentation Systems</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Cloud-based reporting with geotagged photographs, timestamped readings and standardised
                        scope-of-works templates that meet all major insurer requirements.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Shield style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>IICRC-Certified Practices</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        All restoration work follows IICRC S500 (water damage) and IICRC S520 (mould) standards,
                        ensuring best-practice outcomes and insurer confidence in the completed works.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 6. Areas We Service                                           */
          /* ------------------------------------------------------------ */
          {
            heading: 'Areas We Service',
            background: 'light',
            body: (
              <>
                <p>
                  Disaster Recovery operates a nationwide contractor network, ensuring storm damage restoration
                  coverage across every state and territory. Whether you are in a capital city CBD or a remote
                  regional community, we coordinate the closest available IICRC-certified contractor to your location.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {[
                    { region: 'New South Wales', cities: 'Sydney, Newcastle, Wollongong, Central Coast' },
                    { region: 'Victoria', cities: 'Melbourne, Geelong, Ballarat, Bendigo' },
                    { region: 'Queensland', cities: 'Brisbane, Gold Coast, Sunshine Coast, Townsville, Cairns' },
                    { region: 'Western Australia', cities: 'Perth, Bunbury, Geraldton, Broome' },
                    { region: 'South Australia', cities: 'Adelaide, Mount Gambier, Port Augusta' },
                    { region: 'Tasmania', cities: 'Hobart, Launceston, Devonport' },
                    { region: 'Northern Territory', cities: 'Darwin, Alice Springs, Katherine' },
                    { region: 'ACT', cities: 'Canberra and surrounding region' },
                  ].map((area) => (
                    <div key={area.region} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <MapPin style={{ flexShrink: 0, width: 18, height: 18, color: '#2563eb', marginTop: 2 }} />
                      <div>
                        <p style={{ fontWeight: 600, marginBottom: '0.15rem' }}>{area.region}</p>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{area.cities}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  Our network also supports deployments to mining sites, offshore facilities and international
                  operations including Papua New Guinea. No location is too remote.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 7. Frequently Asked Questions                                 */
          /* ------------------------------------------------------------ */
          {
            heading: 'Storm Damage Restoration — Frequently Asked Questions',
            body: (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                {stormFAQs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1.25rem',
                      background: i % 2 === 0 ? 'rgba(37,99,235,0.03)' : 'transparent',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(0,0,0,0.06)',
                    }}
                  >
                    <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                      {faq.question}
                    </p>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{faq.answer}</p>
                  </div>
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
              'Professional water extraction, structural drying and restoration for burst pipes, leaks and storm water ingress.',
          },
          {
            title: 'Flood Damage Restoration',
            href: '/services/flood-damage-restoration',
            description:
              'Emergency flood response including water removal, sanitisation and full property restoration after flood events.',
          },
          {
            title: 'Roof Leak Repair',
            href: '/services/roof-leak-repair',
            description:
              'Fast roof leak detection and repair — temporary tarping through to permanent roof restoration and replacement.',
          },
          {
            title: 'Emergency Board Up',
            href: '/services/emergency-board-up',
            description:
              'Immediate board-up and make-safe services for broken windows, doors and exposed openings after storm damage.',
          },
          {
            title: 'Storm Damage Cost Guide',
            href: '/cost/storm-damage',
            description:
              'Indicative pricing for common storm damage repairs including roof replacement, water damage drying and structural works.',
          },
        ]}
      />
    </>
  )
}
