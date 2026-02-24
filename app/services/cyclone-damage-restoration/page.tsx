import { Metadata } from 'next'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { AgContentPageTemplate } from '@/components/antigravity'
import {
  Wind,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Home,
  Droplets,
  Zap,
  FileCheck,
  AlertCircle,
  MapPin,
  Thermometer,
  Camera,
  HardHat,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// SEO Metadata — cyclone damage restoration (national, cyclone-prone focus)
// ---------------------------------------------------------------------------
export const metadata: Metadata = generateSEO({
  title: 'Cyclone Damage Restoration Australia | Emergency Tropical Cyclone Recovery | Disaster Recovery',
  description:
    'Australia-wide cyclone damage restoration — emergency response for Category 1 to Category 5 cyclone damage, roof loss, structural failure, storm surge flooding and wind damage. IICRC-certified contractors, insurance-approved, 24/7 availability. Start your claim online now.',
  keywords: [
    'cyclone damage restoration',
    'cyclone cleanup Australia',
    'cyclone damage repair',
    'tropical cyclone recovery',
    'cyclone insurance claim',
    'cyclone roof damage',
    'cyclone flooding',
    'cyclone emergency response',
    'Category 5 cyclone damage',
    'cyclone structural damage repair',
    'cyclone storm surge cleanup',
    'cyclone make safe',
    'cyclone restoration services',
    'northern Australia cyclone repair',
  ],
  canonical: 'https://disasterrecovery.com.au/services/cyclone-damage-restoration',
  openGraph: {
    title: 'Cyclone Damage Restoration Australia — 24/7 Emergency Response',
    description:
      'IICRC-certified cyclone damage restoration across Australia. Emergency make-safe, roof restoration, structural repair, storm surge cleanup and full insurance claim support for Category 1 to 5 cyclones.',
    images: [
      {
        url: '/images/services/cyclone-damage-restoration.webp',
        alt: 'Professional cyclone damage restoration — emergency roof repair and structural bracing after tropical cyclone',
      },
    ],
    type: 'website',
  },
})

// ---------------------------------------------------------------------------
// FAQ data (used in both schema and on-page section)
// ---------------------------------------------------------------------------
const cycloneFAQs = [
  {
    question: 'What are the different cyclone categories and what damage do they cause?',
    answer:
      'Australian tropical cyclones are rated on a 1 to 5 scale by the Bureau of Meteorology. Category 1 (63–88 km/h gusts) causes minor damage to trees and caravans. Category 2 (89–124 km/h) causes significant damage to roofing, windows and vegetation. Category 3 (125–164 km/h) — classified as severe — causes roof sheeting loss, structural damage and power failures. Category 4 (165–224 km/h) causes significant structural damage including airborne debris and widespread destruction. Category 5 (over 225 km/h) causes the most extreme destruction — complete roof loss, collapse of walls and widespread devastation across entire communities.',
  },
  {
    question: 'Will my insurance cover cyclone damage restoration?',
    answer:
      'Most Australian home and commercial insurance policies include cyclone and storm damage as a covered peril. Cover typically extends to wind damage, roof loss, structural failure, debris impact and water ingress caused by the cyclone. Storm surge and flood damage may be covered separately under the flood component of your policy. Our platform helps you document every detail — photographs, drone footage, moisture readings, structural assessments and a comprehensive scope of works — so your insurer receives a thorough, well-supported claim from day one.',
  },
  {
    question: 'How quickly can you respond after a cyclone?',
    answer:
      'Our contractor network provides 24/7 emergency response across cyclone-prone regions of Australia. Response times after a cyclone depend on the severity of the event, road accessibility and whether emergency services have cleared the area for safe re-entry. In most cases, IICRC-certified contractors can begin emergency make-safe work within 24 to 48 hours of the cyclone passing and the area being declared safe by authorities. During major events, we pre-position contractors and equipment to enable the fastest possible deployment.',
  },
  {
    question: 'How is structural damage assessed after a cyclone?',
    answer:
      'Structural assessment begins with a safety inspection to determine whether the building is safe to enter. Engineers and qualified contractors then inspect foundations, load-bearing walls, roof structures and framing for damage. Drone photography provides high-resolution imagery of roof and upper-storey damage without requiring unsafe ladder access. Moisture mapping identifies water ingress behind walls and under floors. The assessment produces a detailed scope of works and cost estimate for insurance purposes.',
  },
  {
    question: 'What should I do about flooding caused by a cyclone?',
    answer:
      'Cyclones frequently cause significant flooding from storm surge, heavy rainfall and overflowing waterways. Flood water from cyclone events is almost always classified as Category 3 (black water) due to contamination from sewage, debris and chemical runoff. Do not re-enter a flooded property until authorities confirm it is safe. Our contractors deploy submersible pumps for rapid water extraction, followed by structural drying, decontamination and antimicrobial treatment. All flood-related restoration is documented separately for your insurance claim.',
  },
  {
    question: 'Can my property be rebuilt to cyclone-rated standards?',
    answer:
      'Yes. Australian Building Code requirements for cyclone-prone regions (Wind Region C and D) mandate specific construction standards including cyclone-rated tie-downs, reinforced roofing connections, impact-resistant windows and engineered structural bracing. Our IICRC-certified contractors work with structural engineers to ensure all restoration and rebuilding meets or exceeds these standards, giving your property improved resilience against future cyclone events.',
  },
  {
    question: 'Is it safe to return to my property after a cyclone?',
    answer:
      'Do not return to your property until authorities confirm the area is safe. Post-cyclone hazards include downed power lines, weakened structures at risk of collapse, contaminated flood water, sharp debris, displaced wildlife (including snakes) and asbestos exposure from damaged older buildings. Even when the exterior appears intact, hidden structural damage may make the building unsafe. An IICRC-certified contractor will perform a thorough safety assessment before any re-entry or restoration work begins.',
  },
  {
    question: 'How long does cyclone damage restoration take?',
    answer:
      'Restoration timelines depend on the cyclone category and extent of damage. Minor Category 1 or 2 damage — such as lost roof sheeting, broken windows and water ingress — may be fully restored within 2 to 4 weeks. Severe Category 3 to 5 damage involving structural failure, complete roof loss, flooding and widespread debris impact can take 3 to 12 months for full restoration. Emergency make-safe work is completed first to secure and stabilise the property, with permanent repairs following once your insurance claim is approved.',
  },
  {
    question: 'What areas of Australia are most affected by cyclones?',
    answer:
      'Tropical cyclones primarily affect Australia\'s northern coastline from November to April. The highest-risk regions include the Queensland coast from Bundaberg to Cape York (including Cairns, Townsville and Mackay), the Northern Territory coast (Darwin and surrounding areas), and the Western Australian coast from Broome to Exmouth (including Port Hedland and Karratha). However, ex-tropical cyclones can track further south, affecting South East Queensland, northern New South Wales and inland regions with severe wind and rainfall.',
  },
  {
    question: 'Do you provide emergency temporary accommodation assistance after cyclone damage?',
    answer:
      'While we do not provide accommodation directly, our platform helps expedite the insurance claim process so your insurer can arrange temporary accommodation under your policy. Most comprehensive home insurance policies include temporary accommodation provisions when your home is rendered uninhabitable by a covered event such as a cyclone. Our contractors prioritise emergency make-safe work to secure the property and begin the claims process as quickly as possible.',
  },
]

// ---------------------------------------------------------------------------
// Structured data — Service schema (cyclone-prone areas)
// ---------------------------------------------------------------------------
const cycloneServiceSchema = generateServiceSchema({
  name: 'Cyclone Damage Restoration',
  description:
    'Emergency cyclone damage restoration services across Australia — covering wind damage, roof loss, structural failure, storm surge flooding, debris impact and water ingress from tropical cyclone events. IICRC-certified contractors, 24/7 response, full insurance claim support.',
  image: '/images/services/cyclone-damage-restoration.webp',
  areaServed: [
    'Cairns',
    'Townsville',
    'Darwin',
    'Brisbane',
    'Mackay',
    'Rockhampton',
    'Bundaberg',
    'Broome',
    'Port Hedland',
    'Gold Coast',
  ],
})

// ---------------------------------------------------------------------------
// Structured data — Breadcrumb schema
// ---------------------------------------------------------------------------
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  {
    name: 'Cyclone Damage Restoration',
    url: 'https://disasterrecovery.com.au/services/cyclone-damage-restoration',
  },
])

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function CycloneDamageRestorationPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={cycloneServiceSchema} />
      <StructuredData data={generateFAQSchema(cycloneFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
          icon: <Wind className="h-12 w-12" />,
          title: 'Cyclone Damage Restoration',
          subtitle:
            'Australia-wide emergency cyclone response — IICRC-certified contractors for Category 1 to 5 cyclone damage, roof restoration, structural repair, storm surge cleanup and full insurance claim support.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Cyclone Damage Restoration' },
        ]}
        stats={[
          { value: '24/7', label: 'Emergency Response' },
          { value: 'Cat 1–5', label: 'Cyclone Experience' },
          { value: 'Insurance', label: 'Approved & Supported' },
          { value: 'Northern', label: 'Australia Coverage' },
        ]}
        sections={[
          /* ------------------------------------------------------------ */
          /* 1. Emergency Cyclone Response                                 */
          /* ------------------------------------------------------------ */
          {
            heading: 'Emergency Cyclone Response',
            body: (
              <>
                <p>
                  When a tropical cyclone passes through, the aftermath can be devastating — from total roof
                  loss and structural collapse to widespread flooding and debris fields stretching for
                  kilometres. Disaster Recovery connects you with IICRC-certified contractors who deploy
                  emergency make-safe crews across northern Australia as soon as authorities declare the area
                  safe for re-entry.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>What to do immediately after a cyclone:</strong>
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <li>Stay inside until authorities confirm the cyclone has passed and the area is safe — the eye of the cyclone is not a safe period</li>
                  <li>Do not re-enter damaged buildings until a structural assessment has been completed</li>
                  <li>Stay well clear of downed power lines, damaged trees, floodwater and debris</li>
                  <li>Photograph all visible damage from a safe distance before any cleanup begins</li>
                  <li>Beware of displaced wildlife — snakes and other animals are commonly displaced by cyclone events</li>
                  <li>
                    <strong>Start your claim online</strong> — our platform lodges your details and dispatches the
                    nearest available IICRC-certified contractor for emergency make-safe work
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(30, 41, 59, 0.06)', borderRadius: '0.5rem', borderLeft: '4px solid #475569' }}>
                  <strong>Pre-positioning:</strong> During cyclone season (November to April), our contractor
                  network pre-positions equipment and crews in cyclone-prone regions. This includes industrial
                  pumps, temporary roofing materials, structural bracing and commercial drying equipment — enabling
                  rapid deployment the moment conditions allow safe access.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 2. Types of Cyclone Damage                                    */
          /* ------------------------------------------------------------ */
          {
            heading: 'Types of Cyclone Damage',
            background: 'light',
            body: (
              <>
                <p>
                  Tropical cyclones deliver a combination of destructive forces — extreme wind, storm surge,
                  torrential rainfall and airborne debris. A single cyclone event can inflict multiple types of
                  damage simultaneously, each requiring specialist restoration techniques.
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
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Extreme Wind Damage</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Lifted and lost roof sheeting, blown-off ridge caps, collapsed carports and pergolas,
                        damaged wall cladding, shattered windows and displaced fencing from sustained winds
                        exceeding 200 km/h in severe events.
                      </p>
                    </div>
                  </div>

                  {/* Storm Surge */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Droplets style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Storm Surge Flooding</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Coastal inundation driven by cyclone-generated storm surge — saltwater flooding that
                        penetrates inland, contaminating properties with Category 3 black water containing
                        sand, debris, sewage and marine contaminants.
                      </p>
                    </div>
                  </div>

                  {/* Debris Impact */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <AlertTriangle style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Debris Impact</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Airborne debris — roofing iron, tree limbs, fencing, signage and building materials —
                        propelled at destructive speeds, penetrating walls, smashing windows and causing
                        structural puncture damage across wide areas.
                      </p>
                    </div>
                  </div>

                  {/* Roof Loss */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Home style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Roof Loss</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Partial or complete roof loss where wind forces exceed the structural capacity of
                        roofing connections. Exposes the entire interior to rainfall, causing catastrophic
                        water damage to ceilings, walls, flooring and contents.
                      </p>
                    </div>
                  </div>

                  {/* Structural Failure */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Zap style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Structural Failure</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Collapse or severe compromise of load-bearing walls, roof trusses, support columns
                        and foundations. In Category 4 and 5 events, entire buildings can be reduced to
                        slabs, requiring complete demolition and rebuild.
                      </p>
                    </div>
                  </div>

                  {/* Water Ingress */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Shield style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Water Ingress</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Wind-driven rain forced through damaged roofing, broken windows, failed seals and
                        compromised wall cladding — saturating internal linings, insulation and flooring
                        and creating ideal conditions for rapid mould growth.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 3. Australian Cyclone Category Guide                          */
          /* ------------------------------------------------------------ */
          {
            heading: 'Australian Cyclone Category Guide',
            body: (
              <>
                <p>
                  The Australian Bureau of Meteorology classifies tropical cyclones on a 1 to 5 severity
                  scale based on maximum sustained wind speed and gust intensity. Understanding the category
                  helps property owners anticipate the likely extent of damage and the restoration response
                  required.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                  {/* Category 1 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(34, 197, 94, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(34, 197, 94, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#15803d' }}>Category 1</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>— Gusts 63–88 km/h</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Minor damage to gardens, trees and caravans. Minimal structural impact to well-maintained
                      buildings. May cause minor roof damage to poorly secured sheeting and dislodge loose items.
                      Restoration typically involves minor repairs, debris cleanup and tree removal.
                    </p>
                  </div>

                  {/* Category 2 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(234, 179, 8, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(234, 179, 8, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#a16207' }}>Category 2</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>— Gusts 89–124 km/h</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Significant damage to roofing, windows and vegetation. Caravans may be destroyed and
                      poorly constructed buildings suffer structural damage. Power outages likely. Restoration
                      includes roof repairs, window replacement, water ingress drying and debris clearance.
                    </p>
                  </div>

                  {/* Category 3 — Severe */}
                  <div style={{ padding: '1.25rem', background: 'rgba(249, 115, 22, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(249, 115, 22, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#c2410c' }}>Category 3 — Severe</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>— Gusts 125–164 km/h</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Roof sheeting blown off, structural damage to walls, power failures across wide areas
                      and dangerous airborne debris. Some buildings experience partial roof loss. Restoration
                      involves emergency tarping, significant roof replacement, structural repairs, water
                      extraction and comprehensive drying programs.
                    </p>
                  </div>

                  {/* Category 4 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.06)', borderRadius: '0.75rem', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#dc2626' }}>Category 4</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>— Gusts 165–224 km/h</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      Significant structural damage including complete roof loss on some buildings, airborne
                      debris causing widespread damage, exterior wall failure and large-scale flooding.
                      Restoration is major — structural engineering assessment, temporary roofing and
                      bracing, extensive water damage remediation and potentially partial rebuild.
                    </p>
                  </div>

                  {/* Category 5 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(127, 29, 29, 0.08)', borderRadius: '0.75rem', border: '1px solid rgba(127, 29, 29, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#7f1d1d' }}>Category 5 — Extreme</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748B' }}>— Gusts over 225 km/h</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', margin: 0 }}>
                      The most extreme destruction — complete roof loss, collapse of walls and entire
                      structures, widespread devastation across communities. Examples include Cyclone Tracy
                      (Darwin, 1974), Cyclone Larry (Innisfail, 2006) and Cyclone Yasi (Mission Beach, 2011).
                      Restoration ranges from major structural rebuild to complete demolition and new
                      construction, often taking 6 to 12 months or longer.
                    </p>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 4. Our Cyclone Restoration Process                            */
          /* ------------------------------------------------------------ */
          {
            heading: 'Our Cyclone Restoration Process',
            background: 'light',
            body: (
              <>
                <p>
                  From the moment conditions allow safe access through to final sign-off, our five-stage
                  process ensures your property is stabilised, documented and fully restored — with your
                  insurance claim supported at every step.
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
                      1. Safety Assessment
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      A qualified contractor inspects the property to determine if it is safe to enter.
                      Structural integrity, electrical hazards, asbestos risk and flood contamination are
                      all assessed before any work begins. Engineers are engaged for severe structural damage.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      2. Emergency Make-Safe
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Temporary roofing installation, structural bracing to prevent further collapse, board-up
                      of broken windows and openings, hazardous debris removal and isolation of damaged
                      electrical and gas services. Priority is preventing further damage.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      3. Water Extraction & Drying
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Submersible pumps remove standing flood water. Industrial dehumidifiers and air movers
                      are deployed for structural drying. Contaminated water from storm surge is treated with
                      antimicrobial agents. Daily moisture readings track progress to pre-loss levels.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      4. Structural Repair
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Roof replacement or restoration, wall and framing repairs, window and door replacement,
                      and foundation stabilisation — all completed to current Australian Building Code
                      standards for cyclone-rated construction (Wind Region C and D).
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(37,99,235,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(37,99,235,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>
                      5. Full Restoration
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Internal fit-out including plastering, painting, flooring, cabinetry and electrical
                      and plumbing reinstatement. Your property is returned to pre-cyclone condition — or
                      better, with cyclone-rated upgrades where required by current building codes.
                    </p>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 5. Cyclone Insurance Claims                                   */
          /* ------------------------------------------------------------ */
          {
            heading: 'Cyclone Insurance Claims',
            body: (
              <>
                <p>
                  After a major cyclone, insurers receive thousands of claims simultaneously. Properties
                  with thorough, professional documentation are processed faster and with fewer disputes.
                  Disaster Recovery connects you with experienced, insurance-approved contractors who know
                  exactly what insurers require for cyclone damage claims.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>How we support your cyclone damage claim:</strong>
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <li>
                    <strong>Drone assessment</strong> — high-resolution aerial photography of roof and structural
                    damage without requiring unsafe ladder access on compromised buildings
                  </li>
                  <li>
                    <strong>Comprehensive documentation</strong> — every aspect of damage is photographed, measured
                    and recorded using moisture meters, thermal imaging and professional reporting systems
                  </li>
                  <li>
                    <strong>Detailed scope of works</strong> — a line-by-line breakdown of all required repairs,
                    materials and labour prepared in the format your insurer expects
                  </li>
                  <li>
                    <strong>Emergency make-safe invoicing</strong> — temporary repair costs documented separately
                    for immediate reimbursement under your policy's emergency provisions
                  </li>
                  <li>
                    <strong>Comprehensive claims documentation</strong> — IICRC-certified contractors prepare detailed
                    documentation, photos, and reports — everything you need to support your insurance reimbursement claim
                  </li>
                  <li>
                    <strong>Progress reporting</strong> — photographic evidence at every milestone throughout the
                    restoration, satisfying insurer requirements for staged approvals and payments
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Most comprehensive Australian home and commercial insurance policies cover cyclone damage
                  including wind damage, roof loss, debris impact and water ingress. Storm surge flooding may
                  be covered under the flood component of your policy. Check your Product Disclosure Statement
                  or contact your insurer for specific coverage details.
                </p>
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
                  IICRC-certified contractors in the Disaster Recovery network deploy specialised equipment
                  designed for the unique challenges of cyclone damage restoration — from large-scale water
                  extraction to structural stabilisation and comprehensive documentation.
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
                    <Droplets style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Industrial Pumps & Extraction</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        High-capacity submersible and trash pumps capable of extracting thousands of litres
                        per hour, including debris-laden Category 3 flood water from storm surge inundation.
                        Truck-mounted extractors for large-scale commercial properties.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Thermometer style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Commercial Drying Systems</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        LGR and desiccant dehumidifiers, high-velocity air movers and axial fans engineered
                        for tropical humidity levels. Injectidry cavity drying systems reach moisture trapped
                        behind walls and under floors where conventional equipment cannot.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <HardHat style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Temporary Roofing & Structural Bracing</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Heavy-duty cyclone-rated tarps, structural-grade steel bracing, temporary
                        waterproofing membranes and engineered propping systems to stabilise damaged
                        structures and prevent further collapse during the restoration period.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Camera style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Drone Photography & Thermal Imaging</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Commercial drones capture high-resolution roof and structural imagery without
                        requiring unsafe access. FLIR thermal cameras and calibrated moisture meters create
                        detailed moisture maps to identify hidden water damage throughout the property.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Shield style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Antimicrobial & Decontamination</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        EPA-registered, hospital-grade antimicrobial agents applied via fogging, spraying
                        and direct treatment to eliminate bacteria, viruses and mould spores from storm surge
                        contaminated surfaces. HEPA-filtered air scrubbers maintain air quality during works.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <FileCheck style={{ flexShrink: 0, width: 24, height: 24, color: '#2563eb' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Digital Documentation Systems</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Cloud-based reporting platforms with geotagged photographs, timestamped moisture
                        readings, drone footage and standardised scope-of-works templates that meet all
                        major insurer requirements for cyclone damage claims.
                      </p>
                    </div>
                  </div>
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
                  Disaster Recovery operates a nationwide contractor network with particular strength in
                  cyclone-prone regions of Australia. Our IICRC-certified contractors are experienced in
                  tropical cyclone restoration and understand the unique building codes, environmental
                  conditions and insurance requirements of northern Australia.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {[
                    { region: 'North Queensland', cities: 'Cairns, Townsville, Mackay, Bowen, Innisfail, Mission Beach', highlight: true },
                    { region: 'Central Queensland', cities: 'Rockhampton, Gladstone, Bundaberg, Emerald, Yeppoon', highlight: true },
                    { region: 'South East Queensland', cities: 'Brisbane, Gold Coast, Sunshine Coast, Ipswich, Toowoomba', highlight: false },
                    { region: 'Northern Territory', cities: 'Darwin, Palmerston, Katherine, Nhulunbuy, Tennant Creek', highlight: true },
                    { region: 'Western Australia — North', cities: 'Broome, Port Hedland, Karratha, Exmouth, Derby', highlight: true },
                    { region: 'Western Australia — South', cities: 'Perth, Geraldton, Bunbury, Mandurah', highlight: false },
                    { region: 'New South Wales', cities: 'Sydney, Newcastle, Coffs Harbour, Port Macquarie, Lismore', highlight: false },
                    { region: 'Other States', cities: 'Melbourne, Adelaide, Hobart, Canberra and all regional areas', highlight: false },
                  ].map((area) => (
                    <div
                      key={area.region}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'flex-start',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        background: area.highlight ? 'rgba(37,99,235,0.05)' : 'transparent',
                        border: area.highlight ? '1px solid rgba(37,99,235,0.1)' : '1px solid rgba(0,0,0,0.04)',
                      }}
                    >
                      <MapPin style={{ flexShrink: 0, width: 18, height: 18, color: area.highlight ? '#2563eb' : '#64748b', marginTop: 2 }} />
                      <div>
                        <p style={{ fontWeight: 600, marginBottom: '0.15rem', color: area.highlight ? '#1e40af' : 'inherit' }}>
                          {area.region}
                          {area.highlight && (
                            <span style={{ fontSize: '0.75rem', color: '#2563eb', marginLeft: '0.5rem', fontWeight: 400 }}>
                              High cyclone risk
                            </span>
                          )}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{area.cities}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  Our network also supports deployments to mining sites, offshore facilities and
                  international operations including Papua New Guinea. No location is too remote.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 8. Frequently Asked Questions                                 */
          /* ------------------------------------------------------------ */
          {
            heading: 'Cyclone Damage Restoration — Frequently Asked Questions',
            background: 'light',
            body: (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {cycloneFAQs.map((faq, i) => (
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
                    <summary style={{ fontWeight: 600, fontSize: '1.05rem', color: '#1E293B' }}>
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
            title: 'Storm Damage Restoration',
            href: '/services/storm-damage-restoration',
            description:
              'Emergency storm damage response including hail, wind, fallen trees and roof damage restoration across Australia.',
          },
          {
            title: 'Flood Damage Restoration',
            href: '/services/flood-damage-restoration',
            description:
              'Professional flood water extraction, decontamination, structural drying and full property restoration after flooding.',
          },
          {
            title: 'Water Damage Restoration',
            href: '/services/water-damage-restoration',
            description:
              'IICRC-certified water damage restoration for burst pipes, leaks and water ingress — emergency extraction and drying.',
          },
          {
            title: 'Roof Leak Repair',
            href: '/services/roof-leak-repair',
            description:
              'Fast roof leak detection and repair — emergency tarping through to permanent roof restoration and replacement.',
          },
          {
            title: 'Emergency Board Up',
            href: '/services/emergency-board-up',
            description:
              'Immediate board-up and make-safe services for broken windows, doors and exposed openings after cyclone damage.',
          },
        ]}
      />
    </>
  )
}
