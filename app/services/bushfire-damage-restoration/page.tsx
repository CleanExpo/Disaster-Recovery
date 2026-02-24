import { Metadata } from 'next'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { AgContentPageTemplate } from '@/components/antigravity'
import {
  Flame,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Home,
  Wind,
  Thermometer,
  FileCheck,
  AlertCircle,
  MapPin,
  HardHat,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// SEO Metadata with AI optimisation
// ---------------------------------------------------------------------------
export const metadata: Metadata = generateSEO({
  title: 'Bushfire Damage Restoration Australia | Emergency Fire & Smoke Repair | Disaster Recovery',
  description:
    'Australia-wide bushfire damage restoration — emergency response for fire damage, smoke damage, ember attack and radiant heat damage. IICRC-certified contractors, insurance-approved, 24/7 availability. Start your claim online now.',
  keywords: [
    'bushfire damage restoration',
    'bushfire cleanup Australia',
    'fire damage repair',
    'smoke damage restoration',
    'bushfire recovery',
    'bushfire insurance claim',
    'ember attack damage',
    'bushfire property restoration',
    'bushfire smoke cleanup',
    'radiant heat damage repair',
    'bushfire emergency response',
    'bushfire asbestos risk',
    'bushfire rebuilding process',
    'bushfire damage cost estimate',
  ],
  canonical: 'https://disasterrecovery.com.au/services/bushfire-damage-restoration',
  openGraph: {
    title: 'Bushfire Damage Restoration Australia — 24/7 Emergency Response',
    description:
      'IICRC-certified bushfire damage restoration across Australia. Emergency make-safe, smoke and soot cleanup, structural restoration, full insurance claim support.',
    images: [
      {
        url: '/images/services/bushfire-damage-restoration.webp',
        alt: 'Professional bushfire damage restoration — emergency assessment and smoke damage cleanup',
      },
    ],
    type: 'website',
  },
})

// ---------------------------------------------------------------------------
// FAQ data for schema + on-page rendering
// ---------------------------------------------------------------------------
const bushfireFAQs = [
  {
    question: 'How do I make an insurance claim after a bushfire?',
    answer:
      'Contact your insurer as soon as it is safe to do so and lodge a claim. Document all visible damage with photographs and video before any cleanup begins. Our platform streamlines this process — start a claim through our online form and we connect you with IICRC-certified contractors who provide detailed damage reports, photographic evidence and a scope of works formatted to meet insurer requirements. Emergency make-safe costs are typically covered immediately under your policy.',
  },
  {
    question: 'What is the difference between smoke damage and structural damage from a bushfire?',
    answer:
      'Structural damage involves the physical destruction of building elements — walls, roofing, framing and foundations — caused by direct flame contact, radiant heat or ember attack. Smoke damage, while less visually obvious, can be equally destructive. Smoke infiltrates wall cavities, ceiling spaces, ductwork and soft furnishings, leaving acidic soot residues that corrode metals, discolour surfaces and create persistent odour. Both types require specialist restoration but involve very different techniques and equipment.',
  },
  {
    question: 'When is it safe to return to my home after a bushfire?',
    answer:
      'Do not return until authorities have officially declared the area safe. Even after the fire is extinguished, hazards remain — including unstable structures, fallen power lines, hazardous materials (such as asbestos), contaminated water supplies and toxic ash. A qualified contractor should conduct a structural safety assessment before the property is reoccupied. Our network coordinates this assessment as part of every bushfire restoration project.',
  },
  {
    question: 'How does a bushfire affect air quality and what are the health risks?',
    answer:
      'Bushfire smoke contains fine particulate matter (PM2.5), carbon monoxide, volatile organic compounds and other toxic gases. Exposure can cause respiratory irritation, aggravate asthma and cardiovascular conditions, and pose serious risks to children, the elderly and those with pre-existing health conditions. Even after the fire is out, residual soot and ash inside a property continue to affect indoor air quality until professional cleaning and air scrubbing is completed.',
  },
  {
    question: 'How much does bushfire damage restoration cost?',
    answer:
      'Costs vary significantly depending on the extent of damage. Smoke and soot cleanup for a lightly affected property may start from several thousand dollars, while properties with structural fire damage, asbestos removal and full rebuilds can exceed six figures. Our cost guide at /cost/fire-damage provides indicative ranges, and our contractors provide detailed quotes after an on-site assessment. Most costs are covered under standard home and commercial insurance policies.',
  },
  {
    question: 'How long does bushfire restoration take?',
    answer:
      'Timelines depend on the severity of damage and the scope of work required. Emergency make-safe and smoke cleanup for a lightly affected property may take one to two weeks. Properties with significant structural damage, asbestos abatement and full interior restoration can take three to twelve months. Widespread bushfire events may also introduce delays due to contractor demand, material supply constraints and insurer processing times.',
  },
  {
    question: 'Is there an asbestos risk after a bushfire damages my property?',
    answer:
      'Yes — this is a serious concern for any property built before 1990 in Australia. Bushfire can damage or destroy asbestos-containing materials (ACMs) found in roofing, eaves, cladding, fencing and insulation, releasing dangerous fibres into the air and surrounding soil. A licensed asbestos assessor must inspect the property before any cleanup begins. Our contractors coordinate asbestos testing and, where required, engage licensed removalists who follow all SafeWork Australia and state EPA regulations.',
  },
  {
    question: 'What is the rebuilding process after a bushfire destroys a home?',
    answer:
      'The rebuilding process typically follows five stages: safety assessment and hazard clearance, insurance claim documentation and approval, site clearing and debris removal (including hazardous materials), design and council approval for the rebuild, and construction of the new dwelling. Our platform coordinates the first three stages and connects you with qualified builders for the construction phase. The entire process — from loss to reoccupation — can take twelve to twenty-four months depending on complexity.',
  },
  {
    question: 'Do you handle ember attack damage where there was no direct flame contact?',
    answer:
      'Yes. Ember attack is one of the most common causes of property damage during a bushfire. Embers can travel kilometres ahead of the fire front, lodging in roof cavities, gutters, decking gaps and subfloor spaces, where they ignite spot fires. Damage from ember attack ranges from localised scorching and melted fixtures through to complete structural loss. Our contractors are experienced in assessing and restoring all levels of ember attack damage.',
  },
  {
    question: 'Does my insurance cover bushfire damage?',
    answer:
      'Most Australian home and commercial insurance policies include bushfire and grassfire as covered perils. Cover typically extends to the dwelling, outbuildings, contents, temporary accommodation and debris removal. However, policy terms, sum insured limits and excess amounts vary between providers. We recommend reviewing your Product Disclosure Statement (PDS) and contacting your insurer promptly. Our platform helps you prepare a thorough, well-documented claim to support a smooth approval process.',
  },
]

// ---------------------------------------------------------------------------
// Service schema (JSON-LD)
// ---------------------------------------------------------------------------
const bushfireServiceSchema = generateServiceSchema({
  name: 'Bushfire Damage Restoration',
  description:
    'Emergency bushfire damage restoration services across Australia — covering fire damage, smoke damage, ember attack damage, radiant heat damage and post-fire structural restoration. IICRC-certified contractors, 24/7 response, full insurance claim support.',
  image: '/images/services/bushfire-damage-restoration.webp',
  areaServed: [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Canberra',
    'Hobart',
    'Darwin',
    'Gold Coast',
    'Newcastle',
  ],
})

// ---------------------------------------------------------------------------
// Breadcrumb schema (JSON-LD)
// ---------------------------------------------------------------------------
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  {
    name: 'Bushfire Damage Restoration',
    url: 'https://disasterrecovery.com.au/services/bushfire-damage-restoration',
  },
])

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function BushfireDamageRestorationPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={bushfireServiceSchema} />
      <StructuredData data={generateFAQSchema(bushfireFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)',
          icon: <Flame className="h-12 w-12" />,
          title: 'Bushfire Damage Restoration',
          subtitle:
            'Australia-wide emergency bushfire response — IICRC-certified contractors for fire damage, smoke damage, ember attack and structural restoration. Insurance-approved, 24/7 availability.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Bushfire Damage Restoration' },
        ]}
        stats={[
          { value: '24/7', label: 'Emergency Response' },
          { value: 'Bushfire', label: 'Specialists' },
          { value: 'Insurance', label: 'Approved & Supported' },
          { value: 'National', label: 'Australia-Wide Coverage' },
        ]}
        sections={[
          /* ------------------------------------------------------------ */
          /* 1. Emergency Bushfire Response                                */
          /* ------------------------------------------------------------ */
          {
            heading: 'Emergency Bushfire Response',
            body: (
              <>
                <p>
                  After a bushfire passes through, the danger is far from over. Smouldering debris, compromised
                  structures, toxic ash and hidden hot spots can reignite at any time. Disaster Recovery connects
                  you with IICRC-certified contractors who deliver emergency make-safe and assessment services
                  across Australia — responding as soon as authorities grant property access.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Immediate steps after bushfire damage:</strong>
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <li>Do not return to the property until authorities confirm it is safe — bushfire areas may contain live embers, unstable structures and downed power lines</li>
                  <li>If safe to approach, photograph all visible damage from a safe distance before any cleanup begins</li>
                  <li>Do not disturb ash or debris — it may contain asbestos fibres or other hazardous materials</li>
                  <li>Contact your insurer to lodge a claim as early as possible</li>
                  <li>
                    <strong>Start your claim online</strong> — our platform lodges your details and dispatches the
                    nearest available contractor for emergency assessment and make-safe work
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Emergency make-safe work — including structural shoring, hazard fencing, temporary weatherproofing
                  and securing the site against further damage — is typically covered under your insurance policy.
                  Acting quickly prevents secondary damage from weather exposure, vandalism and continued smoke
                  infiltration.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 2. Types of Bushfire Damage                                   */
          /* ------------------------------------------------------------ */
          {
            heading: 'Types of Bushfire Damage',
            background: 'light',
            body: (
              <>
                <p>
                  Bushfires cause damage through multiple mechanisms — often simultaneously. Understanding the type
                  of damage is critical for accurate insurance documentation and selecting the correct restoration
                  approach. Our contractor network is certified to assess and restore all categories of bushfire damage.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {/* Direct Flame Damage */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Flame style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Direct Flame Contact</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Complete or partial destruction of building elements through direct fire contact —
                        collapsed roofing, burnt framing, destroyed cladding and melted fixtures. Often requires
                        demolition and full rebuild.
                      </p>
                    </div>
                  </div>

                  {/* Radiant Heat Damage */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Thermometer style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Radiant Heat Damage</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Intense radiant heat from a nearby fire front can crack and shatter windows, warp metal
                        roofing, melt PVC plumbing, degrade timber and ignite combustible materials inside the
                        property — even without direct flame contact.
                      </p>
                    </div>
                  </div>

                  {/* Ember Attack */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Wind style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Ember Attack</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Burning embers can travel kilometres ahead of the fire front, lodging in roof cavities,
                        gutters, decking gaps and subfloor spaces. Ember attack is the most common cause of
                        property loss in Australian bushfires.
                      </p>
                    </div>
                  </div>

                  {/* Smoke Infiltration */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <AlertCircle style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Smoke Infiltration</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Smoke penetrates wall cavities, ceiling spaces, HVAC ductwork, soft furnishings and
                        porous materials. Acidic soot residues corrode metals, discolour surfaces, damage
                        electronics and create persistent, harmful odour throughout the property.
                      </p>
                    </div>
                  </div>

                  {/* Water Damage from Firefighting */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Home style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Water Damage from Firefighting</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Properties that survive the fire often sustain significant water damage from firefighting
                        efforts. Thousands of litres of water and fire-retardant chemicals can saturate walls,
                        flooring, insulation and electrical systems — requiring professional drying and restoration.
                      </p>
                    </div>
                  </div>

                  {/* Contaminated Land */}
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <AlertTriangle style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Contaminated Soil & Ash</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Bushfire ash can contain heavy metals, asbestos fibres, household chemicals and other
                        toxins. Contaminated soil and ash must be professionally assessed and removed before
                        rebuilding or reoccupation to protect occupant health and meet EPA requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 3. Our Bushfire Restoration Process                           */
          /* ------------------------------------------------------------ */
          {
            heading: 'Our Bushfire Restoration Process',
            body: (
              <>
                <p>
                  From emergency make-safe through to final handover, our structured restoration process ensures
                  your property is safely assessed, thoroughly documented and professionally restored — with
                  insurance supported at every stage.
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
                  <div style={{ padding: '1.25rem', background: 'rgba(220,38,38,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(220,38,38,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#991B1B' }}>
                      1. Safety Assessment
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      A certified contractor inspects the property for structural stability, hazardous materials
                      (including asbestos), electrical safety and remaining fire risks. The site is secured with
                      hazard fencing and temporary shoring where required. Comprehensive photographic documentation
                      begins immediately.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(220,38,38,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(220,38,38,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#991B1B' }}>
                      2. Debris & Hazard Removal
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Fire-damaged debris, contaminated ash, hazardous materials and destroyed contents are
                      safely removed and disposed of in accordance with EPA regulations. Licensed asbestos
                      removalists are engaged where ACMs are identified. The site is cleared and prepared for
                      restoration works.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(220,38,38,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(220,38,38,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#991B1B' }}>
                      3. Smoke & Soot Cleanup
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Professional smoke and soot removal using HEPA-filtered vacuums, chemical sponges and
                      specialist cleaning agents. Air scrubbers and ozone generators are deployed to eliminate
                      smoke odour from wall cavities, ceiling spaces and ductwork. Thermal deodorisation
                      techniques neutralise embedded smoke particles.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div style={{ padding: '1.25rem', background: 'rgba(220,38,38,0.05)', borderRadius: '0.75rem', border: '1px solid rgba(220,38,38,0.1)' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#991B1B' }}>
                      4. Structural Restoration
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      Once the claim is approved, permanent repairs and rebuilding are completed — structural
                      framing, roofing, cladding, internal plastering, electrical rewiring, plumbing, painting
                      and any other works required to return the property to its pre-bushfire condition or to
                      meet current building standards.
                    </p>
                  </div>
                </div>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 4. Bushfire Insurance Claims                                  */
          /* ------------------------------------------------------------ */
          {
            heading: 'Bushfire Insurance Claims',
            background: 'light',
            body: (
              <>
                <p>
                  Navigating an insurance claim after a bushfire is complex — particularly when dealing with total
                  loss, hazardous materials, temporary accommodation and the emotional weight of losing a home
                  or business. Disaster Recovery simplifies the process by connecting you with experienced,
                  insurance-approved contractors who understand exactly what insurers require.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>How we support your bushfire insurance claim:</strong>
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <li>
                    <strong>Comprehensive damage documentation</strong> — every aspect of fire, smoke, heat and
                    water damage is photographed, measured and recorded using professional-grade equipment
                    including thermal imaging cameras and moisture meters
                  </li>
                  <li>
                    <strong>Detailed scope of works</strong> — a line-by-line breakdown of all required
                    restoration, demolition and rebuilding works is prepared in the format your insurer expects
                  </li>
                  <li>
                    <strong>Hazardous materials reporting</strong> — asbestos assessments, contaminated soil
                    reports and EPA compliance documentation are included where applicable
                  </li>
                  <li>
                    <strong>Emergency make-safe invoicing</strong> — immediate stabilisation costs are documented
                    separately to support prompt reimbursement under your policy
                  </li>
                  <li>
                    <strong>Comprehensive claims documentation</strong> — IICRC-certified contractors in our network
                    prepare detailed documentation, photos, and reports to support your insurance reimbursement claim
                  </li>
                  <li>
                    <strong>Progress reporting</strong> — regular updates with photographic evidence are provided
                    throughout the restoration to satisfy insurer milestones and maintain claim momentum
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Most Australian home and commercial insurance policies cover bushfire and grassfire as standard
                  perils. Cover typically extends to the dwelling, outbuildings, contents, temporary accommodation,
                  debris removal and professional fees. Review your Product Disclosure Statement (PDS) for specific
                  terms, sum insured limits and excess amounts.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 5. Health & Safety After a Bushfire                           */
          /* ------------------------------------------------------------ */
          {
            heading: 'Health & Safety After a Bushfire',
            body: (
              <>
                <p>
                  Bushfire aftermath presents serious health and safety hazards that are not always immediately
                  obvious. Professional assessment and remediation are essential before a property can be safely
                  reoccupied or rebuilt.
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
                    <AlertTriangle style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Smoke Inhalation & Air Quality</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Residual smoke particles, soot and volatile organic compounds persist inside fire-affected
                        properties long after the fire is extinguished. Fine particulate matter (PM2.5) poses
                        respiratory risks to all occupants, particularly children, the elderly and those with
                        asthma or cardiovascular conditions. Professional air scrubbing is essential.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <AlertCircle style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Asbestos Exposure</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Properties built before 1990 may contain asbestos in roofing, eaves, cladding, fencing,
                        insulation and flooring. When damaged or destroyed by fire, asbestos fibres are released
                        into the air and soil. A licensed asbestos assessor must inspect the site before any
                        cleanup, demolition or rebuilding commences.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Shield style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Contaminated Soil</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Ash and debris from burnt structures can contaminate surrounding soil with heavy metals,
                        household chemicals and asbestos. Soil testing may be required by your local EPA or
                        council before the site can be cleared for rebuilding. Children and pets must be kept
                        away from contaminated areas.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Home style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Structural Instability</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Fire-weakened structures can collapse without warning. Load-bearing walls, roof trusses,
                        retaining walls and concrete elements may have lost structural integrity due to extreme
                        heat exposure. A qualified structural engineer or building inspector must assess the
                        property before re-entry is permitted.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Clock style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Water Supply Contamination</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Bushfires can contaminate rainwater tanks, bore water and local water supply
                        infrastructure. Water should not be consumed, used for cooking or used for bathing until
                        it has been tested and cleared by the relevant authority. Contaminated water systems
                        require professional flushing and treatment.
                      </p>
                    </div>
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
                  IICRC-certified contractors in the Disaster Recovery network use specialist equipment designed
                  for bushfire restoration — from smoke deodorisation and air purification through to structural
                  drying and hazardous materials management.
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
                    <Wind style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Air Scrubbers & HEPA Filtration</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Industrial air scrubbers with HEPA filters capture fine particulate matter, soot particles
                        and airborne contaminants down to 0.3 microns. Deployed throughout the property to restore
                        safe indoor air quality during and after smoke damage cleanup.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Thermometer style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Ozone Generators & Thermal Deodorisation</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Ozone generators oxidise smoke odour molecules at the molecular level, while thermal
                        deodorisation (thermal fogging) penetrates wall cavities, ceiling spaces and porous
                        materials to neutralise embedded smoke particles that conventional cleaning cannot reach.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <CheckCircle style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Structural Drying Equipment</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Commercial-grade dehumidifiers, air movers and axial fans for rapid structural drying
                        of properties affected by firefighting water. Prevents secondary mould growth and timber
                        deterioration in fire-surviving structures.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <HardHat style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Hazardous Materials PPE & Containment</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Full respiratory protection, Tyvek suits, negative air pressure containment and
                        decontamination units for safe handling of asbestos, contaminated ash and other hazardous
                        materials commonly encountered on bushfire-damaged properties.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <FileCheck style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Digital Documentation Systems</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        Cloud-based reporting with geotagged photographs, timestamped readings, thermal imaging
                        results and standardised scope-of-works templates that meet all major insurer requirements
                        for bushfire damage claims.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Shield style={{ flexShrink: 0, width: 24, height: 24, color: '#DC2626' }} />
                    <div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>IICRC-Certified Practices</p>
                      <p style={{ fontSize: '0.9rem' }}>
                        All restoration work follows IICRC S500 (water damage), IICRC S520 (mould) and IICRC
                        S540 (fire and smoke) standards, ensuring best-practice outcomes and insurer confidence
                        in the completed works.
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
                  bushfire-prone regions across Australia. Whether your property is in a metropolitan fringe,
                  a regional township or a remote rural community, we coordinate the closest available
                  IICRC-certified contractor to your location.
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
                    { region: 'New South Wales', cities: 'Sydney, Newcastle, Wollongong, Blue Mountains, Central Coast' },
                    { region: 'Victoria', cities: 'Melbourne, Geelong, Ballarat, Bendigo, Gippsland' },
                    { region: 'Queensland', cities: 'Brisbane, Gold Coast, Sunshine Coast, Toowoomba, Townsville' },
                    { region: 'Western Australia', cities: 'Perth, Bunbury, Margaret River, Albany, Geraldton' },
                    { region: 'South Australia', cities: 'Adelaide, Adelaide Hills, Mount Gambier, Port Augusta' },
                    { region: 'Tasmania', cities: 'Hobart, Launceston, Devonport, Huon Valley' },
                    { region: 'Northern Territory', cities: 'Darwin, Alice Springs, Katherine' },
                    { region: 'ACT', cities: 'Canberra and surrounding region' },
                  ].map((area) => (
                    <div key={area.region} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <MapPin style={{ flexShrink: 0, width: 18, height: 18, color: '#DC2626', marginTop: 2 }} />
                      <div>
                        <p style={{ fontWeight: 600, marginBottom: '0.15rem' }}>{area.region}</p>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{area.cities}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  Bushfire-prone regions — including the Blue Mountains, Adelaide Hills, Gippsland, Margaret
                  River and the ACT surrounds — are priority coverage areas within our network. We also support
                  deployments to mining sites, remote pastoral properties and international operations including
                  Papua New Guinea. No location is too remote.
                </p>
              </>
            ),
          },

          /* ------------------------------------------------------------ */
          /* 8. Frequently Asked Questions                                 */
          /* ------------------------------------------------------------ */
          {
            heading: 'Bushfire Damage Restoration — Frequently Asked Questions',
            background: 'light',
            body: (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                {bushfireFAQs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1.25rem',
                      background: i % 2 === 0 ? 'rgba(220,38,38,0.03)' : 'transparent',
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
            title: 'Fire Damage Restoration',
            href: '/services/fire-damage-restoration',
            description:
              'Professional fire damage restoration for structural fires, kitchen fires and electrical fires — smoke cleanup, soot removal and full rebuild services.',
          },
          {
            title: 'Storm Damage Restoration',
            href: '/services/storm-damage-restoration',
            description:
              'Emergency storm damage response for cyclone, hail, wind and roof damage — 24/7 availability, insurance-approved contractors.',
          },
          {
            title: 'Smoke Damage Restoration',
            href: '/services/smoke-damage-restoration',
            description:
              'Specialist smoke and soot damage cleanup — air scrubbing, thermal deodorisation, HEPA filtration and content restoration.',
          },
          {
            title: 'Emergency Board Up',
            href: '/services/emergency-board-up',
            description:
              'Immediate board-up and make-safe services for fire-damaged properties — securing openings, temporary weatherproofing and hazard fencing.',
          },
          {
            title: 'Bushfire Damage Cost Guide',
            href: '/cost/fire-damage',
            description:
              'Indicative pricing for bushfire damage restoration including smoke cleanup, structural repairs, asbestos removal and full rebuild costs.',
          },
        ]}
      />
    </>
  )
}
