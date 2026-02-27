import type { ContentSection } from '@/components/antigravity';

/**
 * Content sections for the Emergency Cost Estimator tool page.
 * Rendered below the interactive CostEstimator component.
 */
export function getCostEstimatorSections(): ContentSection[] {
  return [
    {
      heading: 'How We Calculate Your Estimate',
      body: (
        <>
          <p>
            Our cost estimator uses real pricing data from thousands of completed restoration
            jobs across Australia. The calculation considers four key factors that directly
            influence the final cost of disaster recovery work:
          </p>
          <ol>
            <li>
              <strong>Damage type</strong> — Different types of damage require different
              specialist equipment, chemicals, and expertise. Fire damage restoration, for
              example, involves smoke and soot removal, structural assessment, and often
              asbestos testing, making it inherently more complex than a contained water
              leak.
            </li>
            <li>
              <strong>Property type</strong> — Commercial properties typically cost
              approximately 40% more than residential due to larger floor plates,
              compliance requirements (fire ratings, occupational health), business
              continuity pressures, and after-hours access needs.
            </li>
            <li>
              <strong>Affected area</strong> — Costs scale non-linearly with area. A 100 m²
              job does not cost ten times a 10 m² job because mobilisation, equipment setup,
              and project management costs are shared. However, large areas require more
              equipment, longer drying times, and additional personnel.
            </li>
            <li>
              <strong>Urgency level</strong> — Emergency response (immediate dispatch) carries
              a 15% premium for after-hours mobilisation and priority resource allocation.
              Conversely, scheduled work allows a 10% reduction through efficient resource
              planning.
            </li>
          </ol>
          <p>
            These estimates are indicative only. Every property and situation is unique.
            Our contractors provide a detailed, written estimate after the on-site assessment
            — before any chargeable work begins.
          </p>
        </>
      ),
    },
    {
      heading: 'Insurance Coverage by Damage Type',
      background: 'light',
      body: (
        <>
          <p>
            Most home and commercial insurance policies in Australia cover disaster restoration
            when caused by sudden, accidental events. Coverage varies significantly by damage
            type, insurer, and your specific policy terms. The table below shows typical
            coverage patterns across Australian insurers:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--ag-border-grey)' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Damage Type</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Coverage Likelihood</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Typical Excess</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontWeight: 700 }}>Key Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--ag-border-grey)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Water Damage</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>90–100%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$500 – $1,000</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Sudden burst pipes, appliance leaks typically fully covered</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ag-border-grey)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Fire & Smoke</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>95–100%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$500 – $1,000</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Comprehensive cover including contents, structure, and temporary accommodation</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ag-border-grey)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Mould</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>40–60%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$1,000 – $2,500</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Must demonstrate sudden cause — gradual neglect typically excluded</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ag-border-grey)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Flood</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>0–80%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$2,500 – $5,000</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Depends on flood cover inclusion — check your Product Disclosure Statement (PDS)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ag-border-grey)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Storm</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>80–90%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$1,000 – $2,500</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Covered, but verify flood vs storm damage definition in your policy</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--ag-border-grey)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Sewage</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>85–95%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$500 – $1,500</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Sudden sewage events typically covered as water damage</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 0.5rem' }}><strong>Biohazard</strong></td>
                <td style={{ padding: '0.75rem 0.5rem' }}>70–90%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>$1,000 – $2,500</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Most policies cover sudden biohazard events; check specialist clauses</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>Important:</strong> Our contractors bill you directly, allowing work to begin
            immediately without waiting for insurer approval. We provide all documentation your
            insurer requires to process your reimbursement claim. Payment plans are available through
            our finance partner.
          </p>
        </>
      ),
    },
    {
      heading: 'Cost Estimator FAQ',
      body: (
        <>
          <h3>How accurate is this estimate?</h3>
          <p>
            Our estimates are based on aggregated pricing data from completed restoration jobs
            across Australia. They provide a realistic ballpark to help you plan and assess
            quotes. Final costs depend on site-specific conditions discovered during the
            on-site assessment — including hidden damage, material types, and access
            constraints. Our contractors provide a detailed, written estimate before any
            chargeable work begins.
          </p>

          <h3>Does insurance cover my damage type?</h3>
          <p>
            Most Australian home and commercial insurance policies cover sudden, accidental
            damage (burst pipes, storms, fires). Coverage for mould and flood damage varies
            significantly between insurers and policies. Our team can review your policy
            details during the initial assessment and advise whether your situation is likely
            covered — before any financial commitment.
          </p>

          <h3>Why do commercial properties cost more?</h3>
          <p>
            Commercial restoration typically costs 30–40% more than residential due to larger
            floor areas, compliance requirements (fire ratings, AS/NZS standards, occupational
            health), business interruption pressures requiring faster completion, specialised
            materials (commercial flooring, ceiling systems), and after-hours access needs.
            Commercial policies usually reflect these higher costs with appropriate coverage
            limits.
          </p>

          <h3>What affects the final cost?</h3>
          <p>
            The biggest cost driver is speed of response. Properties where restoration begins
            within 24 hours typically see 40–60% lower total costs because secondary damage
            (mould colonisation, structural degradation, electrical corrosion) is prevented.
            Other major factors include the category of contamination (clean vs grey vs black
            water), structural demolition requirements, hazardous material presence (asbestos,
            lead paint), and the extent of contents affected.
          </p>
        </>
      ),
    },
  ];
}
