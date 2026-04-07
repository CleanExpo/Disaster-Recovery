import type { ContentSection } from '@/components/antigravity';

interface EquipmentSectionParams {
  equipmentName: string;
  useCase: string;
}

export function getEquipmentSections({ equipmentName, useCase }: EquipmentSectionParams): ContentSection[] {
  return [
    {
      heading: `Professional ${equipmentName} for Disaster Recovery`,
      body: (
        <>
          <p>
            {equipmentName} is a critical tool in professional disaster restoration, used for
            {useCase ? ` ${useCase}` : ' detecting, measuring, and resolving damage that is invisible to the naked eye'}.
            Our contractor network deploys commercial-grade {equipmentName.toLowerCase()} equipment
            on every job where it can improve outcomes, speed up restoration, or identify hidden
            damage.
          </p>
          <p>
            Unlike consumer-grade alternatives, professional {equipmentName.toLowerCase()} equipment
            delivers the precision and capacity required for Australian disaster restoration
            standards. Our technicians are trained and certified in the operation of this equipment,
            ensuring accurate readings and effective application.
          </p>
          <p>
            When you engage our services, the cost of specialist equipment deployment is included
            in the restoration scope — there are no additional equipment hire fees for insured
            events.
          </p>
        </>
      ),
    },
    {
      heading: `How ${equipmentName} Works`,
      background: 'light',
      body: (
        <>
          <p>
            Understanding how professional {equipmentName.toLowerCase()} equipment works helps you
            appreciate why it is essential for quality restoration outcomes:
          </p>
          <ul>
            <li><strong>Detection capability</strong> — Professional-grade {equipmentName.toLowerCase()} identifies damage, moisture, or contamination that visual inspection alone would miss.</li>
            <li><strong>Precision measurement</strong> — Quantitative readings allow technicians to track restoration progress objectively, ensuring drying and treatment targets are met before sign-off.</li>
            <li><strong>Documentation</strong> — Equipment readings provide verifiable evidence for insurance claims, compliance records, and quality assurance documentation.</li>
            <li><strong>Efficiency</strong> — Targeted application of restoration resources based on equipment data reduces overall project time and cost.</li>
          </ul>
          <p>
            Our technicians calibrate and verify equipment before every job, following manufacturer
            specifications and IICRC guidelines for accurate, reliable results.
          </p>
        </>
      ),
    },
    {
      heading: `When ${equipmentName} Is Used`,
      body: (
        <>
          <p>
            {equipmentName} is deployed in a range of disaster recovery scenarios across Australia.
            Common applications include:
          </p>
          <ul>
            <li><strong>Water damage restoration</strong> — Identifying the extent of moisture penetration in walls, floors, ceilings, and cavities to ensure thorough drying.</li>
            <li><strong>Fire and smoke damage assessment</strong> — Detecting hidden damage, structural compromise, and smoke penetration that is not visible on the surface.</li>
            <li><strong>Mould remediation</strong> — Locating moisture sources feeding mould growth and verifying that remediation has eliminated the underlying cause.</li>
            <li><strong>Pre-purchase and condition assessments</strong> — Identifying latent damage or risk factors in properties before purchase or after suspected incidents.</li>
            <li><strong>Quality assurance</strong> — Post-restoration verification that all areas meet drying targets, air quality standards, and restoration benchmarks.</li>
          </ul>
        </>
      ),
    },
    {
      heading: 'Equipment Specifications and Standards',
      background: 'light',
      body: (
        <>
          <p>
            Our contractor network uses only professional-grade equipment that meets or exceeds
            Australian and international standards for disaster restoration:
          </p>
          <ul>
            <li><strong>IICRC S500:2025/S520:2025 compliance</strong> — All equipment meets the standards set by the Institute of Inspection, Cleaning and Restoration Certification.</li>
            <li><strong>Regular calibration</strong> — Equipment is calibrated according to manufacturer schedules and verified before each deployment.</li>
            <li><strong>Commercial capacity</strong> — Our equipment is rated for commercial and industrial applications, handling larger areas and more demanding conditions than consumer products.</li>
            <li><strong>Safety certified</strong> — All electrical equipment carries current Australian safety certifications and is tested and tagged in accordance with WorkSafe requirements.</li>
          </ul>
        </>
      ),
    },
    {
      heading: `${equipmentName} FAQ`,
      body: (
        <>
          <h3>Is {equipmentName.toLowerCase()} equipment included in the service cost?</h3>
          <p>
            Yes. The cost of specialist equipment deployment is included in the overall restoration
            scope. For insured events, this is covered as part of the approved claim — no separate
            equipment hire charges.
          </p>
          <h3>Do I need {equipmentName.toLowerCase()} for my restoration?</h3>
          <p>
            Our technicians assess each situation and deploy the appropriate equipment for the best
            outcome. In most cases, professional equipment significantly improves results and is
            considered standard practice for quality restoration.
          </p>
          <h3>How do I know the equipment readings are accurate?</h3>
          <p>
            All equipment is calibrated according to manufacturer specifications and industry
            standards. Readings are recorded and included in your restoration documentation,
            providing verifiable evidence for insurance and compliance purposes.
          </p>
        </>
      ),
    },
  ];
}
