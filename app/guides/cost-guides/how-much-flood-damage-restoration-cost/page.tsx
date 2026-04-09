import { Metadata } from 'next';
import Script from 'next/script';
import { Droplets } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Flood Damage Restoration Cost Guide Australia 2026',
  description: 'Expert answers on flood damage restoration costs in Australia — Category 1/2/3 water, inundation depth, Ex-TC Alfred claims, and IICRC S500:2025 requirements.',
  keywords: 'flood damage restoration cost australia, flood restoration cost, category 3 flood damage, ex-tc alfred insurance claim, flood damage cost guide, IICRC S500 flood',
  alternates: { canonical: `${NAP.url}/guides/cost-guides/how-much-flood-damage-restoration-cost` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does flood damage restoration cost in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flood damage restoration in Australia ranges from approximately $5,000 for minor subfloor flooding (Category 1 clean water, limited area) through to $100,000 or more for Category 3 sewage inundation of a two-storey home. The cost is primarily driven by the IICRC S500:2025 water category: Category 1 (clean water from rainfall or overflowing water bodies with no contamination) is the least expensive; Category 2 (grey water with some contamination) requires decontamination; Category 3 (black water — floodwater that has contacted sewage, soil, or chemical contamination) demands full biohazard decontamination, material disposal under strict protocols, and extended drying cycles. The affected area size, depth of inundation, material types (concrete slab vs. timber subfloor), and time elapsed before treatment all significantly affect final cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover flood damage restoration costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This depends on your policy and how the damage is categorised. In Australia, there is a critical legal distinction between "flood" (inundation from an external water body such as a river, creek, or storm surge) and "water damage" (internal water events such as burst pipes or storm water entering through a breach in the building). Most standard home insurance policies cover water damage but exclude flood unless you have purchased a separate flood extension. Many South East Queensland (SEQ) property owners discovered this distinction during Ex-TC Alfred in early 2026 — their standard policies did not include the flood extension, leaving inundation damage uncovered. Check your Product Disclosure Statement carefully for the definition of "flood" used in your policy, and confirm whether your property address is listed as a flood-affected location under your insurer\'s flood mapping.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is Category 3 floodwater so much more expensive to restore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 3 (black water) floodwater is classified as a biohazard under IICRC S500:2025 because it contains sewage, pathogens, chemical contaminants, and sediment from overflowing stormwater and wastewater infrastructure. Restoration under Cat 3 protocol requires full personal protective equipment (PPE) for all on-site technicians, biohazard decontamination of all affected surfaces, mandatory removal and disposal of porous materials (carpet, underlay, insulation, lower sections of plasterboard) that cannot be adequately decontaminated, antimicrobial treatment of structural elements, psychrometric drying logs maintained throughout the drying phase, and independent sign-off before reinstatement. Each of these steps adds cost that does not apply to Category 1 or 2 events. A ground-floor inundation by Category 3 floodwater that would cost $15,000–$20,000 to remediate under Cat 1 conditions can cost $40,000–$70,000 or more under full Cat 3 protocol.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does flood damage restoration take for a house?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a residential property, water extraction typically takes 1 day. Structural drying under IICRC S500:2025 psychrometric protocols takes 5–14 days depending on material types, ambient conditions, and the depth of saturation — timber subfloors and dense concrete slabs take significantly longer than carpet and hard flooring. Building repairs and reinstatement (new linings, flooring, painting, joinery) typically take 2–8 weeks after drying is certified complete. Category 3 properties require decontamination validation before drying commences, adding 1–3 days at the front end. In a declared catastrophe event such as Ex-TC Alfred 2026, contractor availability across the affected region can extend total project timelines significantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the $2,750 initial commitment fee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The $2,750 initial commitment comprises a $550 platform fee and a $2,200 contractor credit. The platform fee covers your claim lodgement, contractor matching, documentation pack, and ongoing support. The $2,200 contractor credit is held in trust and applied directly to your emergency restoration works — your assigned IICRC-certified contractor begins make-safe and water extraction immediately after the initial commitment is received. Your contractor then provides a formal contract with full transparent pricing for the complete restoration scope. This model means emergency works begin without waiting for insurer approval or panel contractor allocation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I still claim Ex-TC Alfred flood damage in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ex-Tropical Cyclone Alfred (February–March 2026) was declared a catastrophe by the Insurance Council of Australia (ICA), meaning insurers are required to prioritise and fast-track claims from affected areas. PERILS AG has estimated total insured losses from Ex-TC Alfred at AU$1.877 billion. Supplementary and late claims are still being accepted for properties across South East Queensland and Northern NSW. If you have not yet lodged, or need to submit supplementary damage documentation, contact your insurer immediately. Note that how the damage is categorised — flood inundation, storm surge, or water damage from storm — affects which policy coverage applies. Properties that suffered inundation from the Brisbane River, Bremer River, or coastal storm surge may face different coverage outcomes than those with roof damage or internal water ingress from wind-driven rain.',
      },
    },
  ],
};

const lastReviewed = '2026-04-09';

export default function HowMuchFloodDamageRestorationCostPage() {
  return (
    <>
      <Script
        id="fdc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="fdc-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Flood Damage Restoration Cost Guide Australia 2026',
            dateModified: lastReviewed,
            author: { '@type': 'Organization', name: 'Disaster Recovery' },
          }),
        }}
      />
      <AgGuidePageTemplate
        category="Cost Guides"
        title="Flood Damage Restoration Cost Guide Australia 2026"
        subtitle="Expert answers and solutions for"
        gradient="linear-gradient(135deg, #0C2340 0%, #0D47A1 100%)"
        icon={<Droplets className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Cost Guides', href: '/guides/cost-guides' },
          { label: 'Flood Damage Restoration Cost' },
        ]}
        sections={[
          {
            heading: 'Flood Damage Cost Factors',
            body: (
              <>
                <p>
                  Flood damage restoration cost in Australia is driven by several interdependent
                  factors. Understanding these helps you assess your exposure and scrutinise
                  contractor quotes accurately.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water category (Cat 1/2/3):</strong> This is the single biggest
                    cost driver. Category 1 (clean water — rainfall-fed inundation with no sewage
                    or chemical contamination) is the least expensive to remediate. Category 2
                    (grey water — some contamination present) requires decontamination.
                    Category 3 (black water — floodwater that has contacted sewage infrastructure,
                    soil, or chemical contamination) demands full biohazard protocol under IICRC
                    S500:2025, including mandatory material removal and disposal, and can cost
                    three to five times a Category 1 event of the same scale.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Depth of inundation:</strong> Shallow subfloor flooding requires
                    extraction and drying of the void space only. Ground-floor inundation of
                    150–300 mm affects flooring, lower wall linings, cabinetry, and appliances.
                    Inundation above 600 mm begins affecting electrical systems, insulation,
                    and structural elements. Each 300 mm increase in inundation depth typically
                    adds a full scope tier to the restoration.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Affected area and floor plan:</strong> Open-plan homes with large
                    floor areas require more extraction runs and more drying equipment than
                    compartmentalised layouts. Multi-storey properties where upper floors were
                    affected by floodwater wicking or roof storm damage compound the scope.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Materials — concrete vs timber subfloor:</strong> Concrete slabs
                    absorb and retain moisture deeply, requiring extended drying cycles (often
                    10–21 days) and specialist concrete drying equipment. Timber subfloors dry
                    faster in some conditions but are more susceptible to swelling, warping, and
                    permanent structural damage. Hardwood flooring over a saturated timber
                    subfloor is one of the most expensive material combinations to restore.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Duration of saturation before treatment:</strong> Every 24 hours of
                    delay after inundation recedes increases the depth of moisture migration and
                    the risk of Category degradation (e.g., Category 1 water becomes Category 3
                    after significant contact with contaminated surfaces or prolonged standing).
                    In major flood events, contractor availability constraints can extend this
                    period, increasing both cost and complexity.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents vs structure:</strong> Structure-only restoration (drying
                    and reinstatement of building fabric) is quoted separately from contents
                    restoration or replacement. Large contents losses — furniture, appliances,
                    personal items — are typically handled under the contents component of your
                    policy rather than your building cover.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Cost by Damage Scenario',
            body: (
              <>
                <p>
                  These indicative ranges are based on residential properties in metropolitan
                  South East Queensland and coastal NSW. Commercial properties, heritage buildings,
                  and properties with specialty materials will sit above these ranges.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Subfloor flooding only — $5,000–$15,000:</strong> Category 1 or 2
                    water entering a subfloor void without penetrating the ground floor slab or
                    flooring. Scope includes extraction from the subfloor void, antimicrobial
                    treatment, and drying verification. Timber bearers and joists may require
                    additional treatment or replacement if saturation was prolonged.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Ground floor inundation (Category 1/2) — $15,000–$40,000:</strong>{' '}
                    Inundation of the main living area to 150–600 mm depth with no sewage
                    contamination. Scope includes extraction, removal of affected carpet and
                    underlay, structural drying of slab and lower wall linings, antimicrobial
                    treatment, and building reinstatement (new flooring, linings, painting).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>
                      Two-storey Category 3 sewage inundation — $40,000–$100,000+:
                    </strong>{' '}
                    Full IICRC S500:2025 Cat 3 biohazard protocol. Mandatory removal of all
                    porous materials (carpet, underlay, insulation, lower sections of plasterboard
                    to 400–600 mm above the inundation line), decontamination of structural
                    elements, psychrometric drying with daily log maintenance, and independent
                    hygienist sign-off before reinstatement. This scope regularly exceeds
                    $100,000 for a standard 4-bedroom home.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Commercial properties — $100,000+:</strong> Commercial fit-outs,
                    warehouse floors, retail premises, and strata buildings all carry
                    significantly higher reinstatement costs due to specialist flooring, data
                    infrastructure, compliance requirements, and business interruption scope.
                    Commercial flood events in SEQ during Ex-TC Alfred regularly exceeded
                    AU$500,000 per premises.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Ex-TC Alfred — Brisbane and SEQ Flood Claims',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred made landfall on the South East Queensland coast in
                  late February 2026, producing significant rainfall, storm surge, and riverine
                  flooding across Greater Brisbane, the Gold Coast, the Sunshine Coast, and coastal
                  Northern NSW. The Insurance Council of Australia (ICA) declared a catastrophe,
                  activating expedited claims handling obligations for member insurers.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  PERILS AG has estimated total insured losses from the event at{' '}
                  <strong>AU$1.877 billion</strong> — making Ex-TC Alfred one of the most
                  significant insured loss events in Australian history. As at April 2026,
                  supplementary and late claims continue to be accepted across the affected region.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  A critical issue for many SEQ property owners has been the categorisation of
                  damage for insurance purposes:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Flood inundation</strong> (from the Brisbane River, Bremer River, or
                    other water bodies overflowing their banks) is covered only if your policy
                    includes a flood extension. Many standard policies in QLD explicitly exclude
                    flood without this extension.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm surge</strong> (coastal inundation driven by the cyclone&apos;s
                    low pressure system pushing seawater inland) is typically treated as flood
                    under standard policy definitions, and is similarly excluded without a flood
                    extension.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water damage</strong> (rainwater entering through storm-breached roof,
                    windows, or damaged building fabric) is covered under most standard policies as
                    a storm damage event, regardless of whether a flood extension is present.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your insurer has declined or reduced your Ex-TC Alfred claim on flood
                  exclusion grounds, review your Product Disclosure Statement definitions carefully.
                  If the water entered through a breach in the building envelope caused by the
                  storm rather than ground inundation, the correct categorisation may be storm
                  water damage rather than flood. AFCA has jurisdiction over disputes of this
                  nature and can issue binding determinations.
                </p>
              </>
            ),
          },
          {
            heading: 'IICRC S500:2025 — Why Category Matters for Your Claim',
            body: (
              <>
                <p>
                  The IICRC S500:2025 Standard for Professional Water Damage Restoration defines
                  three water categories that determine the restoration protocol required. Insurers
                  increasingly require correct IICRC S500:2025 water categorisation and
                  psychrometric drying documentation before approving reinstatement costs or
                  signing off on make-good payments.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 1 — Clean water:</strong> Water originating from a sanitary
                    source with no substantial risk to human health in its originating form. For
                    flood events, this means rainfall-fed surface water that has not contacted
                    sewage infrastructure, contaminated soil, or chemical sources. Category 1
                    protocol permits drying in place of many materials without mandatory removal.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 2 — Grey water:</strong> Water containing significant
                    contamination with potential to cause discomfort or sickness. Floodwater that
                    has contacted urban stormwater drains, some soil types, or standing water is
                    typically classified Category 2. Additional decontamination is required before
                    drying commences.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 3 — Black water:</strong> Grossly contaminated water with
                    unsanitary agents that can cause serious adverse health reactions. Any
                    floodwater that has contacted sewage overflows (common when stormwater and
                    wastewater infrastructure is overwhelmed during major flood events) is
                    classified Category 3 regardless of visual appearance. This classification
                    mandates full biohazard decontamination and removal of all porous materials
                    that cannot be adequately decontaminated — it is not optional.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Psychrometric drying logs</strong> are daily records of temperature,
                  relative humidity, and moisture content readings taken throughout the drying
                  period. IICRC S500:2025 requires these logs to demonstrate that drying has
                  reached target moisture levels before reinstatement begins. Insurers, loss
                  adjusters, and building certifiers increasingly require these logs as a
                  condition of claim payment. All IICRC-certified contractors on the Disaster
                  Recovery platform maintain S500:2025 compliant drying logs as standard.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How much does flood damage restoration cost in Australia?',
            answer:
              'Flood damage restoration in Australia ranges from approximately $5,000 for minor subfloor flooding (Category 1 clean water, limited area) through to $100,000 or more for Category 3 sewage inundation of a two-storey home. The cost is primarily driven by the IICRC S500:2025 water category: Category 1 (clean water) is the least expensive; Category 2 (grey water) requires decontamination; Category 3 (black water — floodwater that has contacted sewage or chemical contamination) demands full biohazard decontamination and material disposal, and can cost three to five times a Category 1 event of the same scale.',
          },
          {
            question: 'Does home insurance cover flood damage restoration costs?',
            answer:
              'This depends on your policy and how the damage is categorised. In Australia, "flood" (inundation from an external water body) is legally distinct from "water damage" (internal events such as burst pipes or storm water entering through a building breach). Most standard home insurance policies cover water damage but exclude flood unless you have purchased a separate flood extension. Many SEQ property owners discovered this distinction during Ex-TC Alfred in 2026. Check your Product Disclosure Statement for the definition of "flood" used in your policy.',
          },
          {
            question: 'Why is Category 3 floodwater so much more expensive to restore?',
            answer:
              'Category 3 (black water) floodwater is a biohazard under IICRC S500:2025 because it contains sewage, pathogens, and chemical contaminants. Restoration requires full PPE, biohazard decontamination of all surfaces, mandatory removal of all porous materials that cannot be adequately decontaminated (carpet, insulation, lower plasterboard), psychrometric drying logs, and independent sign-off before reinstatement. A ground-floor inundation that costs $15,000–$20,000 under Category 1 conditions can cost $40,000–$70,000 or more under full Category 3 protocol.',
          },
          {
            question: 'How long does flood damage restoration take for a house?',
            answer:
              'Water extraction typically takes 1 day. Structural drying under IICRC S500:2025 psychrometric protocols takes 5–14 days depending on material types and depth of saturation. Building repairs and reinstatement take 2–8 weeks after drying is certified complete. Category 3 properties require decontamination validation before drying commences, adding 1–3 days at the front end. In a declared catastrophe event such as Ex-TC Alfred 2026, contractor availability across the affected region can extend total project timelines significantly.',
          },
          {
            question: 'What is the $2,750 initial commitment fee?',
            answer:
              'The $2,750 initial commitment comprises a $550 platform fee and a $2,200 contractor credit. The platform fee covers your claim lodgement, contractor matching, documentation pack, and ongoing support. The $2,200 contractor credit is held in trust and applied directly to your emergency restoration works — your assigned IICRC-certified contractor begins make-safe and water extraction immediately. Your contractor then provides a formal contract with full transparent pricing for the complete restoration scope, without waiting for insurer approval or panel contractor allocation.',
          },
          {
            question: 'Can I still claim Ex-TC Alfred flood damage in 2026?',
            answer:
              'Yes. Ex-Tropical Cyclone Alfred was declared a catastrophe by the Insurance Council of Australia (ICA), and supplementary claims are still being accepted across South East Queensland and Northern NSW. PERILS AG has estimated total insured losses at AU$1.877 billion. If you have not yet lodged, or need to submit supplementary damage documentation, contact your insurer immediately. Note that how the damage is categorised — flood inundation, storm surge, or water damage from storm — affects which policy coverage applies.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Restoration Cost',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'Comprehensive cost guide for water damage restoration — by damage class and water category.',
          },
          {
            title: 'Category 3 Water Damage Insurance',
            href: '/guides/insurance/category-3-water-damage-insurance',
            description: 'How insurers assess Category 3 (black water) damage claims and what documentation you need.',
          },
          {
            title: 'Flood Damage Brisbane',
            href: '/flood-damage-restoration-brisbane',
            description: 'Local flood damage restoration services across Greater Brisbane and SEQ.',
          },
        ]}
        cta={{ text: 'Get Emergency Flood Help Now', href: '/claim' }}
      />
    </>
  );
}
