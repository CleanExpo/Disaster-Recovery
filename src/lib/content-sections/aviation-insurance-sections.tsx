import type { ContentSection } from '@/components/antigravity';

interface AviationInsuranceSectionParams {
  insurerName: string;
  insurerSlug: string;
}

export function getAviationInsuranceSections({ insurerName, insurerSlug }: AviationInsuranceSectionParams): ContentSection[] {
  return [
    {
      heading: `How We Help ${insurerName} Aviation Clients`,
      body: (
        <>
          <p>
            Aviation and aerospace facilities demand restoration providers who understand the unique
            requirements of hangars, terminals, maintenance facilities, and aircraft storage environments.
            When fire, water, storm, or contamination damage affects aviation infrastructure,
            the response must meet strict safety and compliance standards.
          </p>
          <p>
            We understand {insurerName}&apos;s aviation claims requirements, survey standards, and
            scope-of-works procedures. Our IICRC-certified contractors have experience with
            aircraft hangars, maintenance repair and overhaul (MRO) facilities, airport terminals,
            cargo handling areas, fuelling infrastructure, and air traffic control buildings.
          </p>
          <p>
            We bill you directly — not your insurer or underwriter. This means work begins immediately without
            waiting for {insurerName} loss adjuster approval. Once restoration is complete,
            we provide full documentation to support your {insurerName} claim for reimbursement.
            Payment plans are available through our finance partner,{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
        </>
      ),
    },
    {
      heading: `Aviation Claims Process with ${insurerName}`,
      background: 'light',
      body: (
        <>
          <p>
            Aviation insurance claims require coordination with airport operators, CASA regulations,
            and often involve specialised decontamination protocols.
            Here is how we manage {insurerName} aviation claims:
          </p>
          <ol>
            <li><strong>Emergency response and site security</strong> — We deploy to the hangar, terminal, or airside facility immediately. Make-safe includes fire suppression support, water extraction, contamination containment, and coordination with airport operations for airside access.</li>
            <li><strong>Aviation-grade damage assessment</strong> — Our technicians document all damage with photos, moisture readings, contamination samples, and structural assessments. For hangars and MRO facilities, we assess impact on aircraft storage environments and sensitive equipment.</li>
            <li><strong>Scope and costings for {insurerName}</strong> — We prepare aviation-grade documentation including environmental assessments, decontamination plans, and detailed scopes of work that meet {insurerName}&apos;s underwriting standards.</li>
            <li><strong>Specialist restoration</strong> — Our crews are equipped for hangar decontamination, terminal facility restoration, clean room remediation, and aviation-grade environmental controls. All work follows CASA-compliant protocols where applicable.</li>
            <li><strong>Completion and compliance sign-off</strong> — Final inspection, air quality certificates, environmental clearance, and full documentation package for {insurerName} including before-and-after evidence and compliance certifications.</li>
          </ol>
        </>
      ),
    },
    {
      heading: `${insurerName} Aviation Coverage — What Is Typically Covered`,
      body: (
        <>
          <p>
            Aviation insurance through {insurerName} covers a range of aerospace and airport risks.
            Coverage depends on your specific policy, but typically includes:
          </p>
          <ul>
            <li><strong>Hangar and facility damage</strong> — Fire, water, storm, and impact damage to aircraft hangars, maintenance facilities, and aviation workshops.</li>
            <li><strong>Airport terminal property</strong> — Damage to terminal buildings, passenger facilities, retail tenancies, and ground-side infrastructure.</li>
            <li><strong>Aviation liability</strong> — Third-party property damage, hangar keepers liability, and airport operators liability for covered events.</li>
            <li><strong>Ground support equipment</strong> — Damage to ground handling equipment, fuelling systems, and airside operational vehicles.</li>
            <li><strong>Aircraft storage environments</strong> — Contamination, moisture damage, or environmental exposure affecting aircraft in storage or maintenance.</li>
            <li><strong>Business interruption</strong> — Loss of revenue from facility closures, including runway operations, terminal services, and MRO downtime.</li>
          </ul>
          <p>
            Common exclusions include wear and tear, gradual deterioration, and damage from lack of
            maintenance. Aircraft hull and flight risks are typically covered under separate hull
            policies. If you are unsure about your {insurerName} aviation coverage,
            our team can review your policy at no cost.
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
            Aviation facility damage requires immediate response — hangars cannot sit water-damaged,
            terminals cannot remain contaminated, and MRO facilities cannot stay offline.
            Our billing model supports this urgency:
          </p>
          <ul>
            <li><strong>We bill you directly</strong> — Our contractors invoice you (the airport operator, airline, MRO company, or facility owner), not your insurer. This allows emergency work to begin without waiting for loss adjuster approval.</li>
            <li><strong>You claim reimbursement from {insurerName}</strong> — We provide all documentation, photos, scope of works, decontamination reports, and compliance certificates your insurer needs to process your claim.</li>
            <li><strong>Why this is better for aviation clients</strong> — No waiting for panel assessors. No scope disputes delaying critical facility restoration. You control the response timeline and quality.</li>
            <li><strong>Payment options available</strong> — Flexible payment terms through our finance partner <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a> for fast loan approvals.</li>
            <li><strong>Contract provided</strong> — After the make-safe is completed, your contractor provides a formal contract with clear terms, milestones, and conditions.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${insurerName} Aviation Claims FAQ`,
      body: (
        <>
          <h3>What types of aviation facilities can you restore?</h3>
          <p>
            We handle restoration for aircraft hangars, MRO facilities, airport terminals, cargo
            handling areas, fuelling infrastructure, air traffic control buildings, and general
            aviation facilities. Our contractors can work both airside and landside with appropriate
            security clearances.
          </p>
          <h3>How do aviation claims differ from standard commercial claims?</h3>
          <p>
            Aviation claims involve CASA regulatory compliance, airport security protocols, airside
            access requirements, and often require specialised decontamination to protect aircraft
            and sensitive avionics equipment. We coordinate with airport operators and {insurerName}
            to meet all aviation-specific requirements.
          </p>
          <h3>Can you handle hangar fire or flood damage?</h3>
          <p>
            Yes. Hangar fire and flood events are among the most common aviation facility claims.
            We deploy industrial drying equipment, smoke and soot removal systems, and contamination
            control measures designed for aviation environments where aircraft may be present.
          </p>
          <h3>What documentation do I need for my {insurerName} aviation claim?</h3>
          <p>
            We prepare all technical documentation including damage surveys, environmental reports,
            decontamination certificates, scope of works, and progress logs. You will need your
            {insurerName} policy details and facility ownership or lease documentation.
          </p>
        </>
      ),
    },
  ];
}
