import type { ContentSection } from '@/components/antigravity';

interface MarineInsuranceSectionParams {
  insurerName: string;
  insurerSlug: string;
}

export function getMarineInsuranceSections({ insurerName, insurerSlug }: MarineInsuranceSectionParams): ContentSection[] {
  return [
    {
      heading: `How We Help ${insurerName} Marine Clients`,
      body: (
        <>
          <p>
            Marine and transport insurance claims require specialist restoration capabilities that
            go beyond standard property recovery. When vessels, port facilities, cargo, or maritime
            infrastructure suffer fire, water ingress, contamination, or storm damage, the response
            must account for marine-specific compliance, salvage logistics, and operational urgency.
          </p>
          <p>
            We understand {insurerName}&apos;s marine claims requirements, survey standards, and
            scope-of-works procedures. Our IICRC-certified contractors have experience with
            vessel interiors, engine rooms, cargo holds, port warehouses, wharf infrastructure,
            marina facilities, and freight terminals across Australia.
          </p>
          <p>
            We bill you directly — not your insurer or underwriter. This means work begins immediately without
            waiting for {insurerName} surveyor approval. Once restoration is complete,
            we provide full documentation to support your {insurerName} claim for reimbursement.
            Payment plans are available through our finance partner,{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
        </>
      ),
    },
    {
      heading: `Marine Claims Process with ${insurerName}`,
      background: 'light',
      body: (
        <>
          <p>
            Marine insurance claims follow a different workflow to property claims. Surveyors,
            classification societies, and maritime regulations add layers of complexity.
            Here is how we manage {insurerName} marine claims:
          </p>
          <ol>
            <li><strong>Emergency response and containment</strong> — We deploy to the vessel, port facility, or cargo location immediately. Make-safe includes water ingress control, fire suppression support, contamination containment, and environmental protection measures.</li>
            <li><strong>Marine damage survey support</strong> — Our technicians work alongside {insurerName}&apos;s appointed surveyors to document damage with photos, moisture readings, contamination samples, and structural assessments.</li>
            <li><strong>Scope and costings for {insurerName}</strong> — We prepare marine-grade documentation including salvage assessments, contamination reports, and detailed scopes of work that meet {insurerName}&apos;s underwriting standards.</li>
            <li><strong>Specialist restoration</strong> — Our crews are equipped for vessel decontamination, engine room drying, cargo hold remediation, port facility restoration, and marina infrastructure repair.</li>
            <li><strong>Completion and compliance</strong> — Final inspection, environmental clearance certificates, classification society documentation where required, and full handover package for {insurerName}.</li>
          </ol>
        </>
      ),
    },
    {
      heading: `${insurerName} Marine Coverage — What Is Typically Covered`,
      body: (
        <>
          <p>
            Marine insurance through {insurerName} covers a range of maritime risks.
            Coverage depends on your specific policy, but typically includes:
          </p>
          <ul>
            <li><strong>Hull and machinery</strong> — Physical damage to vessel hull, superstructure, engines, and onboard systems from collision, grounding, fire, or weather events.</li>
            <li><strong>Cargo damage</strong> — Loss or damage to goods in transit by sea, including contamination, water ingress, and temperature excursion during transport.</li>
            <li><strong>Port and terminal property</strong> — Damage to wharf structures, warehouses, cranes, loading equipment, and shore-side infrastructure.</li>
            <li><strong>Marina and boat storage</strong> — Fire, storm, or flood damage to marina berths, dry storage facilities, and hardstand areas.</li>
            <li><strong>Marine liability</strong> — Third-party property damage, wreck removal, pollution response, and environmental cleanup obligations.</li>
            <li><strong>Freight and logistics</strong> — Damage during road, rail, or sea transit segments of a multimodal freight journey.</li>
          </ul>
          <p>
            Common exclusions include wear and tear, gradual deterioration, inherent vice of cargo,
            and damage from lack of maintenance. If you are unsure about your {insurerName} marine
            coverage, our team can review your policy at no cost.
          </p>
        </>
      ),
    },
    {
      heading: 'How Billing & Payment Works',
      background: 'light',
      body: (
        <>
          <p>
            Marine losses require immediate action — vessels cannot sit idle, cargo cannot remain
            contaminated, and port operations cannot stay shut down. Our billing model supports this urgency:
          </p>
          <ul>
            <li><strong>We bill you directly</strong> — Our contractors invoice you (the vessel owner, cargo interest, port operator, or management company), not your insurer or underwriter. This allows emergency work to begin without waiting for surveyor approval.</li>
            <li><strong>You claim reimbursement from {insurerName}</strong> — We provide all documentation, photos, scope of works, contamination reports, and compliance certificates your insurer needs to process your claim.</li>
            <li><strong>Why this is better for marine clients</strong> — No waiting for survey appointments. No scope disputes delaying critical containment. You control the response timeline.</li>
            <li><strong>Payment options available</strong> — Flexible payment terms through our finance partner <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a> for fast loan approvals.</li>
            <li><strong>Contract provided</strong> — After the make-safe is completed, your contractor provides a formal contract with clear terms, milestones, and conditions.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${insurerName} Marine Claims FAQ`,
      body: (
        <>
          <h3>What types of marine property can you restore?</h3>
          <p>
            We handle restoration for commercial vessels, recreational boats, port and wharf facilities,
            marina infrastructure, cargo warehouses, freight terminals, and offshore support bases.
            Our contractors are equipped for both land-side and vessel-side operations.
          </p>
          <h3>How do marine claims differ from standard property claims?</h3>
          <p>
            Marine claims typically involve surveyors appointed by {insurerName} or their underwriters,
            classification society requirements, maritime safety regulations, and environmental
            compliance obligations. We coordinate with all parties to ensure documentation meets
            marine industry standards.
          </p>
          <h3>Can you respond to vessel emergencies at berth?</h3>
          <p>
            Yes. Our contractors can deploy to port facilities, marinas, and anchorages across
            Australia. For vessels at berth, we coordinate with port authorities and vessel
            operators to ensure safe access and compliance with maritime safety requirements.
          </p>
          <h3>What documentation do I need for my {insurerName} marine claim?</h3>
          <p>
            We prepare all technical documentation including damage surveys, moisture and contamination
            reports, scope of works, and restoration progress logs. You will need your {insurerName}
            policy details and may need to provide vessel registration or cargo manifests.
          </p>
        </>
      ),
    },
  ];
}
