import { Metadata } from 'next';
import { DollarSign } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Cost Guide Australia 2026 | Disaster Recovery',
  description: 'Expert answers and solutions for "how much does water damage restoration cost in australia". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'how much does water damage restoration cost in australia, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/cost-guides/how-much-water-damage-restoration-cost' },
};

export default function HowMuchWaterDamageRestorationCostPage() {
  return (
    <AgGuidePageTemplate
      category="Cost Guides"
      title="Water Damage Restoration Cost Guide Australia 2026"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #14532D 0%, #15803D 100%)"
      icon={<DollarSign className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Cost Guides', href: '/guides/cost-guides' },
        { label: 'Water Damage Restoration Cost Guide Australia 2026' },
      ]}
      sections={[
        {
          heading: 'Cost Breakdown by Damage Class',
          body: (
            <>
              <p>
                Water damage restoration costs in Australia vary significantly depending on the IICRC damage
                classification. The Institute of Inspection, Cleaning and Restoration Certification (IICRC)
                defines four classes based on the amount of water, evaporation rate, and affected materials.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Class 1 — Minor damage ($2,000–$4,000):</strong> Affects only a small area with
                  minimal moisture absorption. Typically a single room with water on hard surfaces. Drying
                  usually takes 2–3 days with standard equipment.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Class 2 — Significant damage ($4,000–$8,000):</strong> Water has wicked up walls
                  to at least 60 cm and saturated carpet and underlay across an entire room or multiple rooms.
                  Requires structural drying equipment for 3–5 days.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Class 3 — Extensive damage ($8,000–$15,000):</strong> Water has come from overhead
                  (e.g. burst ceiling pipes, roof leaks during storms), saturating walls, ceilings, insulation,
                  carpet, and subfloor materials. Typically 5–7 days of drying with high-capacity dehumidifiers.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Class 4 — Specialty drying ($15,000+):</strong> Involves deep saturation of
                  low-permeance materials such as hardwood floors, plaster, concrete, and stone. Requires
                  specialist drying techniques including injection drying and desiccant systems over 7+ days.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                These figures are indicative for a standard residential property. Commercial properties,
                multi-storey buildings, and properties with specialist materials will sit at the higher end
                or above these ranges.
              </p>
            </>
          ),
        },
        {
          heading: 'Factors That Affect Restoration Cost',
          body: (
            <>
              <p>
                No two water damage events are identical. Several key factors determine the final cost
                of your restoration project.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Water category:</strong> Clean water from a burst supply line (Category 1) is
                  the least expensive to remediate. Grey water from appliances or overflows (Category 2)
                  requires additional decontamination. Black water from sewage or floodwater (Category 3)
                  demands full PPE, antimicrobial treatment, and often material removal — significantly
                  increasing costs.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Affected area size:</strong> Larger affected areas require more extraction
                  equipment, additional air movers and dehumidifiers, and longer drying times. Multi-room
                  or multi-level damage can double or triple the base cost.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Materials damaged:</strong> Carpet and underlay are relatively straightforward.
                  Hardwood flooring, engineered timber, plasterboard linings, and insulation all add
                  complexity. Specialty materials like marble, heritage features, or commercial fitouts
                  require specialist restoration techniques.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Response time:</strong> The faster restoration begins, the less damage spreads.
                  Every hour of delay can increase the final cost as water migrates to adjacent rooms,
                  wicks further up walls, and begins degrading structural materials.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Mould risk:</strong> If mould growth has already started (common in Australian
                  humidity, particularly in QLD, NSW, and NT), a separate mould remediation scope is
                  required under IICRC S520, adding to the overall project cost.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Platform Pricing — How Disaster Recovery Works',
          body: (
            <>
              <p>
                Disaster Recovery connects you with IICRC-certified contractors through a transparent,
                fixed-fee platform model. There are no hidden charges or surprise invoices.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$550 platform fee:</strong> Covers your claim lodgement, contractor matching,
                  documentation pack, and ongoing support throughout the restoration process.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$2,200 contractor credit:</strong> Held in trust and applied directly to your
                  restoration works. Your contractor provides a formal contract with full terms and
                  conditions after the initial make-safe assessment.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>$2,750 total initial commitment:</strong> This gets your project started with
                  emergency make-safe and a detailed scope of works. Additional restoration costs are
                  quoted transparently by your assigned contractor.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>{' '}
                to help manage the upfront cost while you wait for your insurance reimbursement.
              </p>
            </>
          ),
        },
        {
          heading: 'Insurance and Claiming',
          body: (
            <>
              <p>
                We bill you directly — not your insurer. This means work begins immediately without
                waiting for insurer approval, scope disputes, or panel contractor availability. You
                control the process from day one.
              </p>
              <p style={{ marginTop: '1rem' }}>
                We provide full claims documentation to support your insurance reimbursement, including:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Timestamped photo and video evidence of all damage</li>
                <li style={{ marginBottom: '0.5rem' }}>Moisture mapping and psychrometric readings</li>
                <li style={{ marginBottom: '0.5rem' }}>Detailed scope of works aligned to IICRC standards</li>
                <li style={{ marginBottom: '0.5rem' }}>Daily drying logs and progress reports</li>
                <li style={{ marginBottom: '0.5rem' }}>Itemised invoicing suitable for insurer submission</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This documentation package gives your insurer everything they need to process your
                claim efficiently. Most Australian home and contents policies cover water damage
                restoration — check your Product Disclosure Statement (PDS) for specific inclusions
                and exclusions.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How much does water damage restoration typically cost in Australia?',
          answer:
            'Water damage restoration in Australia typically ranges from $2,000 for minor Class 1 damage (a single room with surface water) to $15,000 or more for Class 4 specialty drying involving hardwood floors, plaster, or concrete. The exact cost depends on damage class, water category (clean, grey, or black water), affected area size, materials involved, and response time. Commercial properties and multi-storey buildings are generally at the higher end.',
        },
        {
          question: 'Does insurance cover water damage restoration costs?',
          answer:
            'Most Australian home and contents insurance policies cover sudden and accidental water damage such as burst pipes, appliance failures, and storm damage. Gradual damage from slow leaks or lack of maintenance is typically excluded. Check your Product Disclosure Statement (PDS) for specifics. We bill you directly and provide full claims documentation — photos, moisture readings, scope of works, and itemised invoices — so you can submit to your insurer for reimbursement.',
        },
        {
          question: 'Why does water damage restoration cost so much?',
          answer:
            'Water damage restoration involves specialist IICRC-certified technicians, commercial-grade extraction and drying equipment (air movers, dehumidifiers, injection drying systems), antimicrobial treatments, moisture monitoring over multiple days, and often material removal and disposal. Category 2 and 3 water (grey and black water) requires additional decontamination and PPE. The cost reflects the technical expertise, equipment, and time required to properly dry a structure and prevent secondary damage like mould.',
        },
        {
          question: 'How long does water damage restoration take?',
          answer:
            'Drying time depends on the damage class. Class 1 damage typically dries in 2–3 days. Class 2 takes 3–5 days. Class 3 requires 5–7 days. Class 4 specialty drying can take 7–14 days or longer. These timeframes assume professional equipment is deployed promptly. Delays in starting restoration increase both drying time and total cost, as water continues to migrate and degrade materials.',
        },
        {
          question: 'Are payment plans available for water damage restoration?',
          answer:
            'Yes. Payment plans are available through Blue Fire Finance (bluefirefinance.com.au) to help manage the cost of restoration while you await your insurance reimbursement. The Disaster Recovery platform requires a $2,750 initial commitment ($550 platform fee plus $2,200 contractor credit) to begin emergency make-safe works. Your contractor then provides a formal contract with transparent pricing for the full scope of restoration.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Water Damage Restoration Guide',
          href: '/guides/water-damage',
          description: 'Complete guide to the water damage restoration process from extraction to drying.',
        },
        {
          title: 'How to Document Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'Step-by-step guide to documenting damage for a successful insurance claim.',
        },
        {
          title: 'Structural Drying Equipment Cost Guide',
          href: '/guides/equipment/structural-drying-equipment-cost',
          description: 'Understand the equipment used in professional water damage restoration.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
