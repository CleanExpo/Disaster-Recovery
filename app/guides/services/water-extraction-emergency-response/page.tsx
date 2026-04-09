import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Emergency Water Extraction — What Happens in the First 24 Hours',
  description: 'What happens during emergency water extraction, why the first 24 hours are critical, the equipment used, and how the extraction process sets up effective structural drying.',
  keywords: 'emergency water extraction, water extraction process, flood water removal, truck mount extractor, water damage first 24 hours, water extraction equipment, emergency flood response',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/services/water-extraction-emergency-response' },
};

export default function WaterExtractionEmergencyResponsePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What happens during emergency water extraction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Emergency water extraction follows a structured sequence. First, technicians conduct a site safety assessment — isolating electricity and gas before entering flooded areas. The water source is then identified and isolated if still active. Water is classified by category (clean, grey, or black) as this determines decontamination requirements. Truck-mounted extractors remove the majority of standing water, with portable extractors used for upper floors or inaccessible areas. Finally, initial moisture mapping documents the full extent of water migration before drying equipment is deployed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly should water be extracted?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Water should be extracted within 24 hours of the damage event wherever possible. Category 1 (clean) water degrades to Category 2 (grey water) within 24–48 hours as it contacts building materials and supports bacterial growth. Mould begins to establish in warm, humid conditions within 24–48 hours of water intrusion. Each hour of delayed extraction increases the extent of saturation, the risk of category upgrade, and the overall restoration cost. 60-minute emergency response is the benchmark for professional restoration contractors.',
        },
      },
      {
        '@type': 'Question',
        name: 'What equipment is used for water extraction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Professional water extraction uses commercial-grade equipment scaled to the volume of water and the areas affected. Truck-mounted extractors with 200-litre-per-minute capacity are the primary tool for large volumes of standing water. Portable extractors handle upper floors and areas the truck mount cannot reach via hose. Submersible pumps handle deep flooding (basements, subfloors with more than 150mm standing water). Wand extractors fitted with water claws extract water from carpet and carpet underlay. Subfloor extraction plates connect to truck mounts for subfloor flooding.',
        },
      },
      {
        '@type': 'Question',
        name: 'What comes after extraction?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After extraction, the structural drying phase begins immediately. Air movers and dehumidifiers are deployed based on the moisture map completed during extraction. For Category 2 or Category 3 water events, antimicrobial treatment is applied to affected surfaces before drying equipment is set up. If contents need to be protected or the property will be uninhabitable, contents pack-out is coordinated alongside drying setup. A scope of works documenting the damage extent, water category, and proposed restoration approach is prepared for the insurer.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="wextr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Restoration Services"
        title="Emergency Water Extraction — What Happens in the First 24 Hours"
        subtitle="The step-by-step process of emergency water extraction — from site safety through to drying setup — and why the first 24 hours determine the outcome of the restoration."
        gradient="linear-gradient(135deg, #0F2942 0%, #1565C0 100%)"
        icon={<Droplets className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Services', href: '/guides/services' },
          { label: 'Emergency Water Extraction' },
        ]}
        cta={{ text: 'Get 60-Minute Emergency Response', href: '/claim' }}
        lastReviewed="2026-04-09"
        sections={[
          {
            heading: 'The First Hour — Emergency Response',
            body: (
              <div className="space-y-4">
                <p>
                  The first hour of an emergency water damage response determines the scope and cost of the entire restoration. Professional contractors follow a structured sequence designed to make the property safe, stop ongoing damage, and document conditions before extraction begins.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Safety check — electricity and gas</strong> — No technician enters a flooded area without confirming electrical hazards have been isolated. Water and live electricity are a life-safety risk. The site supervisor confirms the main switchboard is isolated and calls the electricity network if the hazard cannot be safely managed on-site. Gas isolation follows the same protocol.
                  </li>
                  <li>
                    <strong>Source isolation</strong> — If the water source is still active — burst pipe, overflowing appliance, roof leak with active rain — it must be isolated before extraction begins. Extracting water from a still-flooding property achieves nothing. The source is identified (plumbing leak, appliance failure, stormwater entry) and isolated at the appropriate valve or by emergency plumber if required.
                  </li>
                  <li>
                    <strong>Water category assessment</strong> — Water is classified as Category 1 (clean water — supply line, rain), Category 2 (grey water — appliance overflow, minor sewage exposure, water that has contacted building materials for 24+ hours), or Category 3 (black water — sewage, floodwater with soil or debris). Category determines decontamination requirements and personal protective equipment (PPE) requirements for technicians and occupants.
                  </li>
                  <li>
                    <strong>Scope documentation</strong> — Before extraction begins, the affected area is photographed and moisture-mapped. Thermal imaging cameras identify areas of hidden water migration behind walls and under floors that would not be visible in standard photographs. This pre-extraction documentation is essential for the insurance claim.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Water Extraction Methodology',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Professional water extraction uses different techniques and equipment for different types of water accumulation. A single method cannot address all scenarios effectively.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Large standing water — submersible pump</strong> — For flooding deeper than approximately 150mm (basements, subfloors, lower ground floor areas), submersible pumps discharge water volumes that would overwhelm extraction wands. The pump is positioned at the lowest point of the flooded area and discharges outside the building via a 38mm or 50mm hose.
                  </li>
                  <li>
                    <strong>Residual water — truck-mounted extractor</strong> — After the bulk of standing water is removed, truck-mounted extractors (operating at 200+ litres per minute) draw residual water from hard floors, the surfaces of building materials, and shallow flooding. The truck mount is stationed outside the property with 30–50 metres of hose run to the affected area.
                  </li>
                  <li>
                    <strong>Carpet and underlay — water claw technique</strong> — Carpet flooring traps significant volumes of water within the pile and underlay. A water claw attachment — a flat extraction head designed to penetrate carpet — is dragged across the carpet surface in overlapping passes, extracting water from the underlay without requiring carpet removal in many cases. A 3m&sup2; patch of waterlogged carpet may yield 5–10 litres of extracted water.
                  </li>
                  <li>
                    <strong>Subfloor — extraction plates</strong> — Subfloor spaces are accessed via existing vents or access hatches. Extraction plates seal against the subfloor surface and connect to the truck mount to draw water from the subfloor void. In some situations, additional access holes are drilled to improve extraction coverage.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Setting Up for Structural Drying',
            body: (
              <div className="space-y-4">
                <p>
                  Extraction removes free-standing water but leaves significant moisture absorbed into building materials. Structural drying equipment is deployed immediately after extraction — often by the same crew on the same visit — to begin addressing absorbed moisture before it migrates further.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Air mover placement</strong> — Axial air movers are positioned to direct high-velocity airflow along the base of walls and across wet floors. Placement follows a pattern calculated from the square meterage of the affected area — typically one air mover per 18–20m&sup2; of affected floor area, adjusted based on damage class and construction type.
                  </li>
                  <li>
                    <strong>Dehumidifier sizing</strong> — Commercial dehumidifier capacity is calculated based on the volume of the drying chamber, the estimated moisture load, and the ambient temperature. Undersized dehumidification is one of the most common causes of extended drying times and mould growth during the drying phase.
                  </li>
                  <li>
                    <strong>Chamber creation for wall cavities</strong> — Where moisture has migrated into wall cavities, small access holes are drilled between wall studs and injection drying hoses or directional air movers are used to introduce dry, heated air directly into the cavity. In some cases, a negative pressure chamber is created to draw moisture out of the cavity rather than push dry air in.
                  </li>
                  <li>
                    <strong>Initial psychrometric readings</strong> — Before leaving the property after the first visit, the contractor takes and records the initial psychrometric readings — temperature, relative humidity, and grains per pound (GPP) — at each monitoring point. These baseline readings are the reference from which daily drying progress is measured.
                  </li>
                </ul>
              </div>
            ),
          },
          {
            heading: 'Documentation for Insurance',
            background: 'light' as const,
            body: (
              <div className="space-y-4">
                <p>
                  Emergency response documentation is the foundation of the insurance claim. Thorough documentation completed during the extraction visit protects the policyholder and supports fast claim processing.
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Before, during, and after photographs</strong> — Photographs are taken of every affected area before extraction begins, during extraction to document water volumes and material condition, and after extraction to show the baseline condition for the drying phase. Time-stamped photographs with GPS data provide objective evidence of conditions at time of response.
                  </li>
                  <li>
                    <strong>Moisture readings</strong> — Initial moisture content readings using pin meters and thermal imaging cameras are taken and recorded at each monitoring point before drying equipment is deployed. These readings establish the pre-drying moisture baseline and are compared against daily drying progress readings.
                  </li>
                  <li>
                    <strong>Water category report</strong> — The water category classification is documented with the evidence supporting the classification — the source of the water, the duration of the event, any contamination observed. Category determines whether antimicrobial treatment is required and what demolition is necessary (Category 3 events typically require removal of all soft materials in the affected area).
                  </li>
                  <li>
                    <strong>Initial scope of works for insurer</strong> — After the extraction visit, the contractor prepares an initial scope of works for the insurer documenting the damage extent, the affected areas, the equipment deployed, the estimated drying duration, and the anticipated demolition and rebuild scope. This initial scope allows the insurer to begin processing the claim while restoration is underway.
                  </li>
                </ul>
                <p>
                  We bill you directly so that emergency response — including extraction and initial drying setup — begins immediately without waiting for insurer approval. Full documentation is provided as part of your claims package.
                </p>
              </div>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What happens during emergency water extraction?',
            answer: 'Emergency water extraction follows a structured sequence. First, technicians conduct a site safety assessment — isolating electricity and gas before entering flooded areas. The water source is then identified and isolated if still active. Water is classified by category (clean, grey, or black) as this determines decontamination requirements. Truck-mounted extractors remove the majority of standing water, with portable extractors used for upper floors or inaccessible areas. Finally, initial moisture mapping documents the full extent of water migration before drying equipment is deployed.',
          },
          {
            question: 'How quickly should water be extracted?',
            answer: 'Water should be extracted within 24 hours of the damage event wherever possible. Category 1 (clean) water degrades to Category 2 (grey water) within 24–48 hours as it contacts building materials and supports bacterial growth. Mould begins to establish in warm, humid conditions within 24–48 hours of water intrusion. Each hour of delayed extraction increases the extent of saturation, the risk of category upgrade, and the overall restoration cost. 60-minute emergency response is the benchmark for professional restoration contractors.',
          },
          {
            question: 'What equipment is used for water extraction?',
            answer: 'Professional water extraction uses commercial-grade equipment scaled to the volume of water and the areas affected. Truck-mounted extractors with 200-litre-per-minute capacity are the primary tool for large volumes of standing water. Portable extractors handle upper floors and areas the truck mount cannot reach via hose. Submersible pumps handle deep flooding (basements, subfloors with more than 150mm standing water). Wand extractors fitted with water claws extract water from carpet and carpet underlay. Subfloor extraction plates connect to truck mounts for subfloor flooding.',
          },
          {
            question: 'What comes after extraction?',
            answer: 'After extraction, the structural drying phase begins immediately. Air movers and dehumidifiers are deployed based on the moisture map completed during extraction. For Category 2 or Category 3 water events, antimicrobial treatment is applied to affected surfaces before drying equipment is set up. If contents need to be protected or the property will be uninhabitable, contents pack-out is coordinated alongside drying setup. A scope of works documenting the damage extent, water category, and proposed restoration approach is prepared for the insurer.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Structural Drying Process',
            href: '/guides/services/structural-drying-process',
            description: 'What happens after extraction — the science and equipment behind structural drying.',
          },
          {
            title: 'Water Damage Restoration Cost',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Transparent pricing for water damage restoration in Australia — what affects cost.',
          },
          {
            title: 'What to Do After Flood Damage',
            href: '/guides/emergency-guides/what-to-do-after-flood-damage',
            description: 'Step-by-step guidance for the first hours after a flood event.',
          },
        ]}
      />
    </>
  );
}
