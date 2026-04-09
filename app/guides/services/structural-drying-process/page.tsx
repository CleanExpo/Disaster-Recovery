import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Structural Drying Process — What to Expect from IICRC Certified Contractors',
  description: 'How structural drying works, the equipment used, daily monitoring requirements, and when drying is complete — what IICRC-certified contractors do during the drying phase of water damage restoration.',
  keywords: 'structural drying, structural drying process, IICRC S500, psychrometric drying logs, LGR dehumidifier, air mover, drying standard, water damage drying, building drying',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/services/structural-drying-process' },
};

export default function StructuralDryingProcessPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is structural drying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Structural drying is the controlled evaporative drying of building materials — walls, floors, ceilings, and subfloors — following water damage. It uses commercial air movers to accelerate evaporation from wet materials and commercial dehumidifiers to remove that evaporated moisture from the air before it can re-absorb into structure. The process is governed by psychrometric science and the IICRC S500:2025 standard, which defines drying targets and monitoring requirements for certified contractors.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does structural drying take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Drying duration depends on the water damage class. Class 1 (minor, limited materials) typically takes 2–3 days. Class 2 (significant absorption into walls and floors) takes 3–5 days. Class 3 (overhead saturation, widespread absorption) takes 5–7 days. Class 4 (specialty drying — hardwood floors, concrete, plaster) takes 7–14 or more days. Daily moisture readings are required throughout to verify drying progress and adjust equipment placement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use household fans for structural drying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Household fans accelerate evaporation from wet building materials, which raises the relative humidity of the air. Without commercial dehumidifiers to capture that evaporated moisture, the air becomes increasingly humid and the moisture simply redistributes into unaffected materials and air cavities. High relative humidity accelerates mould growth and can cause secondary damage to unaffected areas. Commercial dehumidifiers are essential — they capture the moisture that air movers drive into the air.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are psychrometric drying logs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Psychrometric drying logs are daily records of temperature, relative humidity, and grains per pound (GPP) taken at each monitoring point in the drying chamber. These readings allow IICRC-certified contractors to calculate the dry standard — the target moisture condition for the materials being dried — and verify that drying is progressing on the expected curve. The IICRC S500:2025 standard requires these logs as part of the restoration documentation. Insurers require psychrometric drying logs for claim sign-off, and only IICRC-certified contractors are trained to produce them correctly.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="sdp-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Restoration Services"
        title="Structural Drying Process — What to Expect from IICRC Certified Contractors"
        subtitle="The science, equipment, and daily monitoring behind structural drying — what happens after water extraction and why commercial equipment is essential."
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Wind className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Services', href: '/guides/services' },
          { label: 'Structural Drying Process' },
        ]}
        cta={{ text: 'Book IICRC-Certified Drying', href: '/claim' }}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'How Structural Drying Works',
            body: (
              <div className="space-y-4">
                <p>
                  Structural drying is a controlled application of psychrometric science — the study of air and its relationship with moisture. Three variables determine how quickly wet building materials dry: air temperature, relative humidity, and air movement. IICRC-certified contractors manipulate all three simultaneously using commercial equipment.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Raise air temperature</strong> — Warmer air holds more moisture vapour. Commercial dehumidifiers generate heat as a by-product of their refrigerant cycle, raising the drying chamber temperature and increasing the air&rsquo;s capacity to carry moisture away from wet materials.
                  </li>
                  <li>
                    <strong>Lower relative humidity</strong> — Relative humidity is the percentage of moisture in the air relative to its maximum capacity at that temperature. When RH is high, wet materials dry slowly. Commercial dehumidifiers extract moisture from the air, lowering RH and creating a vapour pressure differential that draws moisture out of wet materials.
                  </li>
                  <li>
                    <strong>Increase air movement</strong> — Commercial air movers direct high-velocity airflow across wet surfaces, disrupting the boundary layer of saturated air that sits on wet materials and accelerating the rate of evaporation. Without air movement, the boundary layer acts as a barrier to drying.
                  </li>
                </ul>
                <p>
                  The combination is critical: air movers without dehumidifiers simply redistribute moisture into the air, raising RH and potentially spreading damage. Dehumidifiers without air movers cannot access moisture trapped in materials. Both must be used together, sized and positioned correctly for the drying chamber.
                </p>
              </div>
            ),
          },
          {
            heading: 'Drying Equipment Used',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  IICRC-certified contractors use a range of commercial equipment selected for the damage class, material types, and environmental conditions:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>LGR (Low Grain Refrigerant) dehumidifiers</strong> — The standard commercial dehumidifier for water damage restoration. LGR units operate efficiently at low grain conditions — removing moisture even when the air is already fairly dry — making them effective throughout the drying cycle, not just at the start. A typical residential LGR unit removes 70–100 litres of moisture per day.
                  </li>
                  <li>
                    <strong>Axial air movers</strong> — High-velocity, low-profile fans designed to direct airflow along walls and floors. Axial air movers create a vortex effect that lifts evaporated moisture away from surfaces and into the dehumidification stream.
                  </li>
                  <li>
                    <strong>Desiccant dehumidifiers</strong> — Used in cold climates or cool environments where refrigerant dehumidifiers are less efficient. Desiccant units use silica gel or similar material to absorb moisture regardless of temperature, making them effective during winter restoration projects.
                  </li>
                  <li>
                    <strong>Injection drying systems</strong> — For wall cavities and enclosed spaces that air movers cannot reach, injection drying injects dry heated air directly into the cavity through small access holes. This allows cavities to be dried without demolishing wall linings.
                  </li>
                  <li>
                    <strong>Subfloor drying mats</strong> — Specialised mats that create a sealed negative-pressure chamber beneath floating floors and over subfloors, drawing moisture upward through the floor boards while dehumidifiers capture it. This allows floating timber and engineered wood floors to be dried in place in many cases.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Daily Monitoring and Drying Logs',
            body: (
              <div className="space-y-4">
                <p>
                  Daily monitoring is a mandatory requirement of the IICRC S500:2025 standard — not an optional service. Every day the drying equipment is operating, your contractor must take and record psychrometric readings at each monitoring point.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Psychrometric readings</strong> — Each visit records temperature (°C or °F), relative humidity (%), and grains per pound (GPP) — the actual mass of moisture in the air. GPP readings allow the contractor to calculate the moisture removal rate and verify that drying is progressing.
                  </li>
                  <li>
                    <strong>Moisture content readings</strong> — Pin or non-penetrating moisture meters measure the moisture content of individual building materials — timber framing, plasterboard, concrete slab, subfloor sheeting — at the same monitoring points each day. These readings chart the drying curve for each material.
                  </li>
                  <li>
                    <strong>Dry standard calculation</strong> — The dry standard is the target moisture content for each material, calculated from the ambient conditions at time of damage. It accounts for the normal equilibrium moisture content of the material type and the pre-damage environmental conditions. Drying is not complete until materials reach their dry standard.
                  </li>
                  <li>
                    <strong>Insurance documentation</strong> — Insurers require complete psychrometric drying logs as evidence that drying was performed to the IICRC S500:2025 standard. Without these logs, insurers may dispute the drying claim or require re-drying at the policyholder&rsquo;s expense. Only IICRC-certified contractors are trained to produce compliant logs.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'When Drying Is Complete',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Drying is complete when all monitored materials have reached their dry standard — not when equipment has been running for a set number of days, and not when the property &ldquo;feels&rdquo; dry. Premature demobilisation of drying equipment is one of the most common causes of secondary damage, mould growth, and disputed insurance claims.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Material moisture content targets</strong> — Timber framing is typically dry at 12–15% moisture content. Plasterboard is dry at 0.5–1.0% by weight. Concrete slabs may take significantly longer and have specific targets based on slab thickness and sub-slab conditions. Your contractor monitors each material type separately.
                  </li>
                  <li>
                    <strong>IICRC S500:2025 dry standard</strong> — The dry standard is not a fixed number — it is calculated for each job based on the materials present and the ambient conditions at time of damage. A contractor who declares drying complete without calculating and documenting the dry standard is not working to the IICRC standard.
                  </li>
                  <li>
                    <strong>Post-drying clearance inspection</strong> — Once materials reach their dry standard, a final inspection documents moisture readings across the entire affected area. This clearance inspection report is included in your claims documentation and confirms to your insurer that drying is complete and remediation can proceed.
                  </li>
                </ul>
                <p>
                  Following a successful drying clearance, the project moves to the remediation and rebuild phase — making good any materials that required removal during drying, and restoring the property to its pre-damage condition.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is structural drying?',
            answer: 'Structural drying is the controlled evaporative drying of building materials — walls, floors, ceilings, and subfloors — following water damage. It uses commercial air movers to accelerate evaporation from wet materials and commercial dehumidifiers to remove that evaporated moisture from the air before it can re-absorb into structure. The process is governed by psychrometric science and the IICRC S500:2025 standard, which defines drying targets and monitoring requirements for certified contractors.',
          },
          {
            question: 'How long does structural drying take?',
            answer: 'Drying duration depends on the water damage class. Class 1 (minor, limited materials) typically takes 2–3 days. Class 2 (significant absorption into walls and floors) takes 3–5 days. Class 3 (overhead saturation, widespread absorption) takes 5–7 days. Class 4 (specialty drying — hardwood floors, concrete, plaster) takes 7–14 or more days. Daily moisture readings are required throughout to verify drying progress and adjust equipment placement.',
          },
          {
            question: 'Can I use household fans for structural drying?',
            answer: 'No. Household fans accelerate evaporation from wet building materials, which raises the relative humidity of the air. Without commercial dehumidifiers to capture that evaporated moisture, the air becomes increasingly humid and the moisture simply redistributes into unaffected materials and air cavities. High relative humidity accelerates mould growth and can cause secondary damage to unaffected areas. Commercial dehumidifiers are essential — they capture the moisture that air movers drive into the air.',
          },
          {
            question: 'What are psychrometric drying logs?',
            answer: 'Psychrometric drying logs are daily records of temperature, relative humidity, and grains per pound (GPP) taken at each monitoring point in the drying chamber. These readings allow IICRC-certified contractors to calculate the dry standard — the target moisture condition for the materials being dried — and verify that drying is progressing on the expected curve. The IICRC S500:2025 standard requires these logs as part of the restoration documentation. Insurers require psychrometric drying logs for claim sign-off, and only IICRC-certified contractors are trained to produce them correctly.',
          },
        ]}
        relatedGuides={[
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/guides/water-damage/iicrc-s500-water-damage-restoration-standard',
            description: 'What the IICRC S500:2025 standard requires of certified water damage contractors.',
          },
          {
            title: 'Water Damage Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Transparent pricing for water damage restoration in Australia — what affects cost.',
          },
          {
            title: 'Structural Drying Equipment',
            href: '/guides/equipment/structural-drying-equipment-cost',
            description: 'Commercial drying equipment explained — what it does and why it matters.',
          },
        ]}
      />
    </>
  );
}
