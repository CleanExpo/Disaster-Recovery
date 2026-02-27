import type { ContentSection } from '@/components/antigravity';

interface CommercialInsuranceSectionParams {
  insurerName: string;
  insurerSlug: string;
  tier: 'heavy-commercial' | 'medium-commercial';
}

export function getCommercialInsuranceSections({ insurerName, insurerSlug, tier }: CommercialInsuranceSectionParams): ContentSection[] {
  const isHeavy = tier === 'heavy-commercial';
  return [
    {
      heading: `How We Help ${insurerName} Commercial Clients`,
      body: (
        <>
          <p>
            Commercial and industrial property damage demands a fundamentally different response to residential work.
            When your {isHeavy ? 'warehouse, factory, or multi-site facility' : 'office, retail premises, or commercial property'} suffers
            fire, water, or contamination damage, business continuity becomes the priority — not just restoration.
          </p>
          <p>
            We understand {insurerName}&apos;s commercial claims requirements, documentation standards, and
            scope-of-works procedures for {isHeavy ? 'large-scale industrial losses' : 'mid-market commercial claims'}.
            Our IICRC-certified contractors have experience with {isHeavy
              ? 'manufacturing facilities, data centres, cold storage, high-rise commercial towers, and critical infrastructure'
              : 'offices, retail fit-outs, hospitality venues, medical practices, and strata commercial lots'}.
          </p>
          <p>
            We bill you directly — not your insurer. This means work begins immediately without
            waiting for {insurerName} approval or scope-of-works sign-off. Once restoration is complete,
            we provide full documentation to support your {insurerName} claim for reimbursement.
            Payment plans are available through our finance partner,{' '}
            <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>.
          </p>
        </>
      ),
    },
    {
      heading: `Commercial Claims Process with ${insurerName}`,
      background: 'light',
      body: (
        <>
          <p>
            Commercial claims are more complex than residential — larger scopes, multiple stakeholders,
            and business interruption considerations. Here is how we manage {insurerName} commercial claims:
          </p>
          <ol>
            <li><strong>Emergency make-safe and containment</strong> — We deploy immediately to secure the site, prevent secondary damage, and establish containment zones. {isHeavy ? 'For industrial sites, this includes hazmat assessment and environmental compliance.' : 'For commercial premises, this includes securing stock, equipment, and tenant areas.'}</li>
            <li><strong>Comprehensive damage assessment</strong> — Our technicians document all damage with photos, moisture readings, air quality data, and a detailed scope of works. {isHeavy ? 'For large facilities, we use thermal imaging and drone surveys where required.' : 'We coordinate with building managers and tenants to minimise disruption.'}</li>
            <li><strong>Scope and costings for {insurerName}</strong> — We prepare commercial-grade documentation that meets {insurerName}&apos;s requirements, including business interruption impact assessment where applicable.</li>
            <li><strong>Managed restoration program</strong> — We assign a dedicated project manager for commercial jobs. {isHeavy ? 'Multi-site and large-scale losses receive coordinated crew deployment across all affected areas.' : 'We schedule work around your business operations to minimise downtime.'}</li>
            <li><strong>Completion, commissioning, and sign-off</strong> — Final inspection, air quality clearance certificates, compliance documentation, and handover to {insurerName} with full supporting evidence.</li>
          </ol>
        </>
      ),
    },
    {
      heading: `${insurerName} Commercial Coverage — What Is Typically Covered`,
      body: (
        <>
          <p>
            Commercial insurance policies through {insurerName} are significantly more complex than
            residential policies. Coverage depends on your specific policy wording, but typically includes:
          </p>
          <ul>
            <li><strong>Property damage</strong> — Fire, water, storm, and impact damage to the building structure, fit-out, and fixed plant.</li>
            <li><strong>Business interruption</strong> — Loss of revenue, additional operating costs, and increased cost of working during the restoration period.</li>
            {isHeavy ? (
              <>
                <li><strong>Machinery breakdown</strong> — Damage to plant, equipment, and production machinery from insured events.</li>
                <li><strong>Environmental liability</strong> — Contamination, hazardous material release, and environmental remediation costs.</li>
                <li><strong>Engineering risks</strong> — Construction, erection, and project-specific covers for industrial operations.</li>
              </>
            ) : (
              <>
                <li><strong>Stock and contents</strong> — Damage to inventory, fixtures, fittings, and business equipment.</li>
                <li><strong>Glass and signage</strong> — Shopfront glass, display cases, and external signage damage.</li>
                <li><strong>Tenant fit-out</strong> — Improvements and fit-out works within leased premises.</li>
              </>
            )}
          </ul>
          <p>
            Common exclusions include gradual deterioration, wear and tear, faulty workmanship, and
            maintenance-related damage. If you are unsure about your {insurerName} commercial coverage,
            our team can review your policy documentation at no cost.
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
            Our billing model is designed for commercial clients who need work to begin immediately,
            without the delays of insurer-managed procurement:
          </p>
          <ul>
            <li><strong>We bill you directly</strong> — Our contractors invoice you (the property owner, management company, or body corporate), not your insurer. This allows emergency work to begin without waiting for scope approval.</li>
            <li><strong>You claim reimbursement from {insurerName}</strong> — We provide all documentation, photos, scope of works, and compliance certificates your insurer needs to process your claim.</li>
            <li><strong>Why this is better for commercial clients</strong> — No waiting for panel assessors. No scope disputes delaying critical make-safe. You control the timeline and the quality of work.</li>
            <li><strong>Payment options available</strong> — Flexible payment terms through our finance partner <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a> for fast loan approvals.</li>
            <li><strong>Contract provided</strong> — After the make-safe is completed, your contractor provides a formal contract with clear terms, milestones, and conditions.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${insurerName} Commercial Claims FAQ`,
      body: (
        <>
          <h3>How do large commercial claims differ from residential?</h3>
          <p>
            Commercial claims involve larger scopes, business interruption calculations, multiple
            stakeholders (owners, tenants, body corporate), and more complex documentation requirements.
            We assign a dedicated project manager to coordinate all aspects of {insurerName} commercial claims.
          </p>
          <h3>Can you handle multi-site losses?</h3>
          <p>
            Yes. Our national network of IICRC-certified contractors can deploy to multiple sites
            simultaneously. We coordinate logistics, documentation, and {insurerName} reporting
            across all affected locations from a single point of contact.
          </p>
          <h3>What about business interruption claims?</h3>
          <p>
            We document the full timeline and impact of the loss event, including before-and-after
            conditions, drying logs, and restoration milestones. This documentation supports your
            business interruption claim with {insurerName} by establishing the period of disruption.
          </p>
          <h3>Can I choose my own restorer for a {insurerName} commercial claim?</h3>
          <p>
            Yes. Under Australian consumer law and insurance contract law, you have the right to
            appoint your own restoration provider — even on commercial policies. Nominating an
            IICRC-certified provider like us often results in faster, higher-quality outcomes.
          </p>
        </>
      ),
    },
  ];
}
