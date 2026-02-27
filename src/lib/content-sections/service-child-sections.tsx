import type { ContentSection } from '@/components/antigravity';

interface ServiceChildSectionParams {
  serviceName: string;
  parentCategory: string;
  context?: string;
}

export function getServiceChildSections({ serviceName, parentCategory, context }: ServiceChildSectionParams): ContentSection[] {
  const contextPhrase = context || `professional ${serviceName.toLowerCase()} services`;
  return [
    {
      heading: `Professional ${serviceName} Services`,
      body: (
        <>
          <p>
            {serviceName} is a specialist service within our {parentCategory.toLowerCase()} division,
            delivered by IICRC-certified technicians with hands-on experience in {contextPhrase}.
            Every job follows documented procedures aligned with Australian Standards and industry
            best practices.
          </p>
          <p>
            Our contractor network deploys trained professionals who understand the specific
            challenges of {serviceName.toLowerCase()} work — from initial assessment and containment
            through to complete restoration and post-job verification. We operate 24/7 across
            Australia, with rapid response times for emergency situations.
          </p>
          <p>
            When you submit a claim through our platform, we match you with the nearest qualified
            contractor who specialises in {serviceName.toLowerCase()}. All work is documented with
            photos, moisture readings, and progress reports to support your insurance claim.
          </p>
        </>
      ),
    },
    {
      heading: 'What to Expect',
      background: 'light' as const,
      body: (
        <>
          <p>
            When you engage our {serviceName.toLowerCase()} service, the process follows a structured
            approach to ensure thorough, compliant restoration:
          </p>
          <ul>
            <li><strong>Emergency response</strong> — A qualified technician arrives on-site to assess the situation, establish safety protocols, and begin immediate containment or make-safe actions.</li>
            <li><strong>Detailed assessment</strong> — Using professional equipment (moisture meters, thermal cameras, air quality monitors), the technician documents the full extent of damage for accurate scoping.</li>
            <li><strong>Scope of works</strong> — A detailed scope is prepared outlining all required restoration steps, expected timelines, and costs. This document supports your insurance claim.</li>
            <li><strong>Restoration</strong> — Work proceeds according to the approved scope, with regular progress updates and documentation at each stage.</li>
            <li><strong>Verification and handover</strong> — Post-restoration checks confirm all work meets required standards. Final documentation is provided for your records and insurance.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Why Professional Service Matters',
      body: (
        <>
          <p>
            Attempting {serviceName.toLowerCase()} without qualified professionals can lead to
            incomplete restoration, health risks, and insurance claim complications. Here is why
            professional service is essential:
          </p>
          <ul>
            <li><strong>Correct methodology</strong> — Different damage scenarios require specific techniques and equipment. Our certified technicians know which protocols to apply for {serviceName.toLowerCase()} to achieve a complete, lasting result.</li>
            <li><strong>Insurance compliance</strong> — Insurers require restoration work to be performed by qualified professionals following industry standards. Our documentation meets insurer requirements for claim approval.</li>
            <li><strong>Health and safety</strong> — Professional {serviceName.toLowerCase()} work follows WHS requirements, protecting both occupants and technicians from hazards that untrained workers may not recognise.</li>
            <li><strong>Equipment and materials</strong> — Commercial-grade equipment and professional-grade materials deliver results that consumer products cannot match, especially for larger or more complex jobs.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${serviceName} FAQ`,
      background: 'light' as const,
      body: (
        <>
          <h3>How quickly can you respond?</h3>
          <p>
            We provide 24/7 emergency response across Australia. In most metropolitan areas,
            a qualified technician can be on-site within 60 minutes. Regional response times
            vary but we prioritise urgent situations.
          </p>
          <h3>Is this covered by insurance?</h3>
          <p>
            {serviceName} is typically covered under home and contents or commercial property
            insurance policies when the damage results from a sudden or accidental event. We
            provide full documentation to support your claim, and our contractors bill you
            directly — you then claim reimbursement from your insurer.
          </p>
          <h3>What certifications do your technicians hold?</h3>
          <p>
            All technicians in our network hold current IICRC certification relevant to their
            specialisation, along with state-specific WorkSafe licences, police clearances,
            and first aid qualifications. Credentials are verified annually.
          </p>
        </>
      ),
    },
  ];
}
