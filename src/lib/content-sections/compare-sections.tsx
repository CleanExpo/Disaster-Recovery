import type { ContentSection } from '@/components/antigravity';

interface CompareSectionParams {
  option1: string;
  option2: string;
}

export function getCompareSections({ option1, option2 }: CompareSectionParams): ContentSection[] {
  return [
    {
      heading: `${option1} vs ${option2} — Making the Right Choice`,
      body: (
        <>
          <p>
            Choosing between {option1.toLowerCase()} and {option2.toLowerCase()} disaster recovery
            approaches is a decision many Australian property owners face after an incident. Both
            options have genuine advantages and trade-offs, and the best choice depends on your
            specific situation, damage type, and priorities.
          </p>
          <p>
            This comparison guide breaks down the key differences to help you make an informed
            decision. We cover cost, quality, timeline, insurance implications, and long-term
            outcomes so you can choose the approach that best protects your property and your
            investment.
          </p>
          <p>
            As certified restoration professionals, we have seen the outcomes of both approaches
            across thousands of Australian properties. The information below reflects real-world
            experience, not theory.
          </p>
        </>
      ),
    },
    {
      heading: `${option1} — Advantages and Considerations`,
      background: 'light',
      body: (
        <>
          <p>
            The {option1.toLowerCase()} approach to disaster recovery offers several potential
            advantages:
          </p>
          <ul>
            <li><strong>Key advantage</strong> — The primary benefit of choosing {option1.toLowerCase()} is often related to cost perception, control, or convenience in specific situations.</li>
            <li><strong>When it works well</strong> — For minor, contained damage where the scope is clear and the risks are low, {option1.toLowerCase()} can be a viable option.</li>
            <li><strong>Potential savings</strong> — In situations where {option1.toLowerCase()} is appropriate, it may reduce immediate out-of-pocket costs.</li>
          </ul>
          <p>However, there are important considerations:</p>
          <ul>
            <li>Hidden damage may be missed without professional equipment (moisture meters, thermal imaging).</li>
            <li>Incomplete restoration can lead to mould growth, structural degradation, and recurring problems.</li>
            <li>Insurance claims may be complicated or denied if restoration does not meet professional standards.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${option2} — Advantages and Considerations`,
      body: (
        <>
          <p>
            The {option2.toLowerCase()} approach offers its own set of advantages:
          </p>
          <ul>
            <li><strong>Thoroughness</strong> — {option2} approaches typically involve comprehensive assessment, professional equipment, and documented quality benchmarks.</li>
            <li><strong>Insurance alignment</strong> — For insured events, {option2.toLowerCase()} options often align better with insurer requirements and claim processes.</li>
            <li><strong>Long-term outcomes</strong> — Professional standards and quality assurance reduce the risk of recurring problems and secondary damage.</li>
          </ul>
          <p>Considerations include:</p>
          <ul>
            <li>May involve higher upfront cost perception, though insurance often covers the majority.</li>
            <li>Scheduling and availability depend on the restoration provider and current demand.</li>
            <li>Requires trust in the provider — choosing certified, insurer-approved professionals mitigates this.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Side-by-Side Comparison',
      background: 'light',
      body: (
        <>
          <p>Here is a direct comparison across the factors that matter most:</p>
          <ul>
            <li><strong>Cost:</strong> {option1} may seem cheaper initially, but hidden damage and rework can increase total cost. {option2} involves professional pricing with flexible payment options and full documentation for your insurance reimbursement claim.</li>
            <li><strong>Quality:</strong> {option2} delivers certified, documented results that meet Australian Standards. {option1} quality depends entirely on individual capability and equipment access.</li>
            <li><strong>Timeline:</strong> {option1} may start sooner but take longer overall. {option2} uses industrial equipment that significantly accelerates drying, cleaning, and restoration.</li>
            <li><strong>Insurance:</strong> {option2} from an approved provider simplifies claims and is accepted by all major insurers. {option1} work may not meet insurer documentation or quality requirements.</li>
            <li><strong>Risk:</strong> {option1} carries higher risk of incomplete restoration, mould growth, and structural issues. {option2} includes post-restoration verification and quality guarantees.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Our Recommendation',
      body: (
        <>
          <p>
            Based on our experience restoring thousands of Australian properties, here is our honest
            guidance on choosing between {option1.toLowerCase()} and {option2.toLowerCase()}:
          </p>
          <ul>
            <li><strong>For minor, surface-level damage</strong> — Small spills, cosmetic marks, or localised issues with no structural involvement may suit a simpler approach, provided you are confident no hidden damage exists.</li>
            <li><strong>For any structural involvement</strong> — Water in wall cavities, smoke damage, flood contamination, or mould behind surfaces requires professional assessment and equipment. The risk of incomplete restoration is too high.</li>
            <li><strong>For insured events</strong> — Always use a certified, insurer-approved provider. It protects your claim, costs you only your excess, and ensures the job is done to Australian Standards.</li>
          </ul>
          <p>
            If you are unsure which approach is right for your situation, lodge a claim for an on-site
            assessment. A qualified technician will inspect the damage and give you an honest
            recommendation — including advising you if the damage is minor enough to handle yourself.
          </p>
        </>
      ),
    },
  ];
}
