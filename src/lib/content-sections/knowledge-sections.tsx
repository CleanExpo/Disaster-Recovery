import type { ContentSection } from '@/components/antigravity';
import { CitationTooltip } from '@/components/knowledge/CitationTooltip';
import { ProTip } from '@/components/knowledge/ProTip';
import { VettedComparison } from '@/components/knowledge/VettedComparison';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

interface KnowledgeEntry {
  slug: string;
  title: string;
  snippetAnswer: React.ReactNode;
  technicalSections: React.ReactNode;
  legalSections: React.ReactNode;
  vettedComparison: { topic: string; vetted: string[]; unvetted: string[] };
  faqs: { question: string; answer: string }[];
}

/* -------------------------------------------------------------------------- */
/* Data for all 10 entries                                                     */
/* -------------------------------------------------------------------------- */

const ENTRIES: Record<string, KnowledgeEntry> = {
  'water-damage-restoration-science': {
    slug: 'water-damage-restoration-science',
    title: 'Water Damage Restoration Science',
    snippetAnswer: (
      <>
        <p>
          <strong>Water damage restoration</strong> uses{' '}
          <CitationTooltip source="IICRC S500" credibility={10} url="https://www.iicrc.org">
            IICRC S500 protocols
          </CitationTooltip>{' '}
          to classify contamination into 3 categories and 4 classes based on water source and material
          saturation. Category 1 (clean water) requires extraction and drying within 24–48 hours.
          Category 3 (black water from sewage or floods) demands full containment, antimicrobial treatment,
          and removal of all porous materials. Professional restoration maintains a{' '}
          <CitationTooltip source="IICRC S500 Water Damage Restoration Standard" credibility={10}>
            vapour pressure differential of at least 4.5 mmHg
          </CitationTooltip>{' '}
          to ensure structural drying meets Australian building standards.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          The science of water damage restoration is governed by{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC S500 — the Standard and Reference Guide for Professional Water Damage Restoration
          </CitationTooltip>
          . This standard classifies water damage along two axes:
        </p>
        <h3>Water Contamination Categories</h3>
        <ul>
          <li>
            <strong>Category 1 (Clean Water)</strong> — Originates from a sanitary source such as a broken
            supply line or leaking tap. Bacterial count below 1 CFU/mL. Safe for occupants if addressed
            within 24–48 hours before microbial amplification occurs.
          </li>
          <li>
            <strong>Category 2 (Grey Water)</strong> — Contains significant contamination from sources like
            dishwasher overflow, washing machine discharge, or aquarium leaks. Bacterial count below
            10⁴ CFU/mL. Requires antimicrobial treatment and PPE during restoration.
          </li>
          <li>
            <strong>Category 3 (Black Water)</strong> — Grossly contaminated water from sewage, rising
            floodwater, or prolonged Category 1–2 exposure. Bacterial count exceeds 10⁴ CFU/mL. Demands
            full containment, removal of all affected porous materials, and professional-grade
            decontamination.
          </li>
        </ul>
        <ProTip title="Time Is Critical">
          <CitationTooltip source="IICRC S520 Standard" credibility={10}>
            Mould can begin growing within 24–48 hours
          </CitationTooltip>{' '}
          in conditions above 60% relative humidity. Every hour of delay increases restoration cost
          and health risk. Category 1 water left untreated for 48+ hours degrades to Category 2 or 3.
        </ProTip>
        <h3>Drying Classes (Material Saturation)</h3>
        <ul>
          <li><strong>Class 1</strong> — Least amount of water. Affects only part of a room with low-porosity materials.</li>
          <li><strong>Class 2</strong> — Significant water. Wicks up walls to 600mm. Affects carpet and underlay.</li>
          <li><strong>Class 3</strong> — Greatest amount of water. Saturates walls, ceilings, insulation, and subfloor.</li>
          <li><strong>Class 4</strong> — Specialty drying. Deep-seated moisture in hardwood, plaster, concrete, or stone requiring low-humidity drying.</li>
        </ul>
        <h3>Psychrometric Principles in Structural Drying</h3>
        <p>
          Effective drying relies on maintaining a{' '}
          <CitationTooltip source="ASHRAE Standards" credibility={10}>
            vapour pressure differential
          </CitationTooltip>{' '}
          between the wet material surface and the surrounding air. Technicians use dehumidifiers to lower
          air moisture content while air movers increase evaporation rate across wet surfaces. The target
          is to reduce material moisture content to 8–12% for timber framing as defined by{' '}
          <CitationTooltip source="Australian Building Codes Board" credibility={10} url="https://www.abcb.gov.au">
            Australian Building Codes
          </CitationTooltip>
          .
        </p>
        <ProTip>
          Professional restorers use thermal hygrometers, moisture meters, and psychrometric charts to
          monitor drying progress daily. Without scientific monitoring, &quot;dry to touch&quot; surfaces can
          retain dangerous hidden moisture that causes structural rot and mould months later.
        </ProTip>
      </>
    ),
    legalSections: (
      <>
        <p>
          Australian property owners have specific legal protections and obligations when dealing with
          water damage:
        </p>
        <h3>Insurance Contracts Act 1984 (Cth)</h3>
        <p>
          Under the{' '}
          <CitationTooltip source="Standards Australia" credibility={10} url="https://www.standards.org.au">
            Insurance Contracts Act 1984
          </CitationTooltip>
          , insurers must handle claims in good faith. Policyholders are required to mitigate further
          damage — meaning you must take reasonable steps to stop ongoing water ingress and begin drying
          as soon as possible. Failure to mitigate can reduce your claim payout.
        </p>
        <h3>Australian Consumer Law</h3>
        <p>
          Restoration contractors must provide services with due care and skill under the Australian
          Consumer Law. Work must be fit for purpose and completed within a reasonable timeframe.
          You have the right to a remedy if work is substandard.
        </p>
        <ProTip variant="legal" title="Duty to Mitigate">
          Your insurance policy requires you to take &quot;reasonable steps&quot; to prevent further damage.
          This includes turning off water at the mains, removing furniture from affected areas, and
          contacting a professional restorer immediately. Document everything with photos and timestamps
          for your claim.
        </ProTip>
        <h3>AFCA Complaints Process</h3>
        <p>
          If your insurer disputes your water damage claim, you can lodge a complaint with the
          Australian Financial Complaints Authority (AFCA). AFCA provides free, independent dispute
          resolution for consumers and covers claims up to $1,085,000 for general insurance.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Water Damage Response',
      vetted: [
        'IICRC S500 certified — follows scientific drying protocols',
        'Police-checked technicians with current Working with Children clearances',
        'Moisture mapping with thermal imaging and pin/pinless meters',
        'Daily psychrometric monitoring with documented drying logs',
        'Full claims documentation provided — everything your insurer needs for reimbursement',
        '$20M public liability insurance verified annually',
      ],
      unvetted: [
        'No formal training — may use incorrect drying methods',
        'No background checks — unknown individuals in your home',
        'No moisture monitoring — hidden moisture causes mould months later',
        'No documentation — weakens your insurance claim position',
        'Cash-only with no warranty or recourse if problems arise',
        'Inadequate insurance — you bear liability for workplace injuries',
      ],
    },
    faqs: [
      { question: 'How long does water damage restoration take?', answer: 'Most residential water damage jobs take 3–5 days for Category 1 damage and 5–10 days for Category 2–3 contamination. The timeline depends on the volume of water, materials affected, drying class, and whether mould remediation is needed. Commercial projects with larger footprints can take 2–4 weeks.' },
      { question: 'What are the 3 categories of water damage?', answer: 'Category 1 is clean water from supply lines or rain. Category 2 is grey water from appliance overflows or similar sources with moderate contamination. Category 3 is black water from sewage, flooding, or long-standing water with heavy bacterial contamination. Each category requires progressively more intensive restoration protocols.' },
      { question: 'Does insurance cover water damage restoration in Australia?', answer: 'Most Australian home and contents policies cover sudden and accidental water damage such as burst pipes and storm damage. Gradual damage from poor maintenance, slow leaks, or rising damp is typically excluded. Check your Product Disclosure Statement (PDS) for specific inclusions and exclusions. You must mitigate further damage to maintain your claim.' },
      { question: 'Can I dry water damage myself?', answer: 'Minor Category 1 spills on hard surfaces can sometimes be managed with household fans and towels. However, any water damage affecting carpet, underlay, wall cavities, or subfloor requires professional equipment including commercial dehumidifiers and air movers. DIY drying without moisture monitoring frequently leads to hidden mould growth within 2–8 weeks.' },
      { question: 'What happens if water damage is left untreated?', answer: 'Untreated water damage leads to mould growth within 24–48 hours, structural timber rot within weeks, electrical hazards from water ingress into wiring, and potential health issues from microbial contamination. Restoration costs increase by 40–60% for every 24 hours of delay. Category 1 water degrades to Category 2 or 3 over time.' },
      { question: 'How much does water damage restoration cost in Australia?', answer: 'Costs vary by damage category, class, and scope. A small Category 1 job (single room, hard floor) typically costs $2,000–$5,000. A moderate Category 2 job affecting multiple rooms costs $5,000–$15,000. Large Category 3 events with structural drying can exceed $30,000. Insurance covers most accidental damage events.' },
    ],
  },

  'mould-remediation-standards': {
    slug: 'mould-remediation-standards',
    title: 'Mould Remediation Standards',
    snippetAnswer: (
      <>
        <p>
          <strong>Professional mould remediation</strong> follows{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC S520 standards
          </CitationTooltip>
          , requiring negative-pressure containment at ≥0.03 Pa, HEPA-filtered air scrubbing, and
          antimicrobial treatment of affected materials. Mould can begin growing within 24–48 hours
          when relative humidity exceeds 60%.{' '}
          <CitationTooltip source="WHO Guidelines" credibility={10} url="https://www.who.int">
            The World Health Organisation
          </CitationTooltip>{' '}
          links indoor mould exposure to respiratory illness in 21% of asthma cases. Australian
          remediation must address both visible mould and the underlying moisture source.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Mould remediation is governed by{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC S520 — Standard for Professional Mould Remediation
          </CitationTooltip>
          . Unlike surface cleaning, professional remediation addresses the root cause (moisture),
          contains the contamination, and verifies successful treatment.
        </p>
        <h3>The Remediation Process</h3>
        <ul>
          <li><strong>Assessment</strong> — Qualified assessors identify mould species, contamination extent, and moisture source using air sampling, surface sampling, and moisture mapping.</li>
          <li><strong>Containment</strong> — Affected areas are sealed with polyethylene sheeting and negative air pressure (≥0.03 Pa) to prevent cross-contamination to unaffected areas.</li>
          <li><strong>HEPA Filtration</strong> — Air scrubbers with HEPA filters (99.97% efficiency at 0.3μm) run continuously to capture airborne spores during remediation.</li>
          <li><strong>Removal</strong> — All porous materials with mould penetration (drywall, carpet, insulation) are removed and disposed of as contaminated waste.</li>
          <li><strong>Treatment</strong> — Non-porous and semi-porous surfaces are treated with registered antimicrobial agents and physically cleaned.</li>
          <li><strong>Verification</strong> — Post-remediation air testing confirms spore counts return to normal background levels before containment is removed.</li>
        </ul>
        <ProTip title="Why DIY Mould Removal Fails">
          Spraying bleach on visible mould only kills surface growth — it does not address root
          systems (hyphae) penetrating porous materials or airborne spores throughout the property.
          Without containment, disturbing mould colonies spreads millions of spores into the air,
          potentially contaminating previously clean areas.
        </ProTip>
        <h3>Common Australian Mould Species</h3>
        <p>
          Over{' '}
          <CitationTooltip source="CSIRO" credibility={10} url="https://www.csiro.au">
            1,000 mould species are common in Australian buildings
          </CitationTooltip>
          . The three most prevalent genera — Aspergillus, Penicillium, and Cladosporium — represent
          approximately 80% of indoor fungal ecology. Some species produce mycotoxins (toxic metabolites)
          that pose serious health risks even at low concentrations.
        </p>
      </>
    ),
    legalSections: (
      <>
        <h3>Landlord and Tenant Obligations</h3>
        <p>
          Under Australian residential tenancy legislation, landlords must maintain rental properties
          in a reasonable state of repair, including addressing mould caused by structural defects or
          inadequate ventilation. Tenants must maintain reasonable ventilation and report mould promptly.
          Failure by either party can result in tribunal orders for remediation or compensation.
        </p>
        <h3>Work Health and Safety (WHS) Act</h3>
        <p>
          Commercial property owners and employers have duties under WHS legislation to maintain
          safe workplaces free from biological hazards including mould. Employees exposed to
          mould may be entitled to workers compensation claims.
        </p>
        <ProTip variant="legal" title="Strata and Body Corporate">
          In strata properties, responsibility for mould remediation depends on whether the moisture
          source is within the lot (owner responsibility) or common property (body corporate
          responsibility). The Strata Schemes Management Act 2015 (NSW) and equivalent legislation
          in other states governs this distinction.
        </ProTip>
        <h3>Insurance Coverage for Mould</h3>
        <p>
          Most Australian insurance policies cover mould remediation when it results from a sudden,
          insured event (e.g., burst pipe, storm damage). Gradual mould from poor maintenance,
          condensation, or rising damp is typically excluded. Check your PDS for specific terms.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Mould Remediation',
      vetted: [
        'IICRC S520 certified with containment and HEPA protocols',
        'Pre- and post-remediation air testing for verification',
        'Identifies and resolves the moisture source — not just symptoms',
        'Registered antimicrobial agents used per manufacturer specifications',
        'Detailed remediation report for insurance and legal records',
        'Warranty on workmanship with post-treatment monitoring',
      ],
      unvetted: [
        'Surface-only treatment — bleach kills surface mould but not root systems',
        'No containment — disturbing mould spreads spores to clean areas',
        'No moisture source investigation — mould returns within weeks',
        'Unregistered chemicals that may not be effective or safe',
        'No documentation — no proof of remediation for resale or insurance',
        'No verification testing — no way to confirm remediation was successful',
      ],
    },
    faqs: [
      { question: 'How long does professional mould remediation take?', answer: 'Small-scale remediation (single room, <3m²) typically takes 1–3 days. Medium jobs (multiple rooms or wall cavities) take 3–5 days. Large-scale remediation with extensive contamination can take 1–2 weeks. Post-remediation verification adds 1–2 days for laboratory results.' },
      { question: 'Is mould dangerous to health?', answer: 'Yes. The World Health Organisation identifies indoor mould exposure as a cause of respiratory symptoms, asthma exacerbation, and allergic reactions. Some mould species produce mycotoxins that can cause more serious health effects. Children, elderly people, and those with respiratory conditions are particularly vulnerable.' },
      { question: 'What causes mould in Australian homes?', answer: 'The most common causes are water leaks (burst pipes, roof leaks), poor ventilation (especially in bathrooms and laundries), condensation on cold surfaces, flood damage, and rising damp. Australia\'s humid climate zones (particularly coastal QLD, NSW, and northern regions) are naturally prone to mould growth.' },
      { question: 'Can I remove mould myself?', answer: 'Small areas of surface mould (<1m²) on hard, non-porous surfaces can be cleaned with appropriate products. However, any mould affecting porous materials, wall cavities, HVAC systems, or areas larger than 1m² should be professionally remediated to prevent cross-contamination and ensure complete removal.' },
      { question: 'Does insurance cover mould removal in Australia?', answer: 'Insurance typically covers mould remediation when caused by a sudden, insured event such as a burst pipe or storm damage. Pre-existing mould, gradual deterioration, poor maintenance, and condensation-related mould are generally excluded. Always check your Product Disclosure Statement for specific terms.' },
      { question: 'How do I prevent mould returning after remediation?', answer: 'Maintain indoor relative humidity below 60% using ventilation and dehumidification. Fix all water leaks promptly. Ensure adequate ventilation in bathrooms, laundries, and kitchens with exhaust fans. Monitor moisture levels in high-risk areas. Address condensation by improving insulation on cold surfaces.' },
    ],
  },

  'fire-damage-restoration-process': {
    slug: 'fire-damage-restoration-process',
    title: 'Fire Damage Restoration Process',
    snippetAnswer: (
      <>
        <p>
          <strong>Fire damage restoration</strong> involves 4 phases: safety assessment, debris removal,
          smoke and soot cleaning, and structural repair.{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC S540 standards
          </CitationTooltip>{' '}
          govern the process, which addresses both visible fire damage and invisible hazards including{' '}
          <CitationTooltip source="EPA Australia" credibility={10} url="https://www.epa.gov.au">
            400+ toxic combustion compounds
          </CitationTooltip>{' '}
          (PAHs, VOCs, and heavy metals). Smoke particles measuring 0.01–4 microns penetrate deep into
          building materials, requiring HEPA filtration and specialised cleaning agents for safe removal.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Fire restoration is one of the most complex disaster recovery disciplines, involving
          structural, chemical, and biological hazards. The{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC S540 Standard for Cleaning and Restoration of Fire/Smoke Damaged Structures
          </CitationTooltip>{' '}
          provides the framework for professional restoration.
        </p>
        <h3>The Four Restoration Phases</h3>
        <ul>
          <li><strong>Phase 1: Safety Assessment</strong> — Structural engineers assess load-bearing integrity. Hazmat teams test for asbestos (common in pre-1990 Australian buildings), lead paint, and chemical contamination. Utilities are isolated.</li>
          <li><strong>Phase 2: Debris and Contents Removal</strong> — Damaged materials are categorised as salvageable or non-salvageable. Contents are inventoried for insurance purposes. Hazardous waste is disposed of per EPA regulations.</li>
          <li><strong>Phase 3: Smoke and Soot Remediation</strong> — Different fire types produce different residues: protein fires (kitchen) leave invisible, pungent films; synthetic fires produce thick, sticky soot. HEPA vacuuming, dry sponging, wet cleaning, and thermal fogging address each residue type.</li>
          <li><strong>Phase 4: Structural Repair</strong> — Ranges from minor plasterboard replacement to full structural rebuild. Must comply with current National Construction Code (NCC) standards, which may exceed the original construction standard.</li>
        </ul>
        <ProTip title="Smoke Particle Science">
          Smoke particles range from 0.01 to 4 microns — far smaller than the 10-micron particles
          visible to the naked eye. These PM2.5 particles penetrate deep into porous materials including
          concrete, timber framing, and soft furnishings. Standard household cleaning cannot remove
          embedded smoke particles, which continue off-gassing toxic VOCs for months.
        </ProTip>
        <h3>Types of Fire Residue</h3>
        <ul>
          <li><strong>Dry smoke</strong> — Fast-burning, high-temperature fires. Powdery, easier to clean.</li>
          <li><strong>Wet smoke</strong> — Low-temperature, smouldering fires. Sticky, pungent residue that smears during cleaning.</li>
          <li><strong>Protein residue</strong> — Kitchen fires. Nearly invisible but extremely odorous. Discolours paints and finishes over time.</li>
          <li><strong>Fuel oil soot</strong> — Furnace malfunctions. Dense, black, sticky residue requiring specialised solvents.</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>Asbestos Obligations</h3>
        <p>
          Properties built before 1990 in Australia may contain asbestos-containing materials (ACMs).
          Fire damage can expose, disturb, or release asbestos fibres. Under WHS Regulations,
          any asbestos removal must be performed by a licensed asbestos removalist. Penalties for
          unlicensed removal exceed $50,000 for individuals and $250,000 for corporations.
        </p>
        <ProTip variant="legal" title="Building Compliance">
          Fire-damaged structures repaired under insurance must comply with the current National
          Construction Code (NCC), not the code applicable when the building was originally constructed.
          This can significantly affect repair scope and cost — ensure your insurance assessor
          accounts for code upgrade requirements.
        </ProTip>
        <h3>Insurance Claims for Fire Damage</h3>
        <p>
          Fire damage is typically covered under Australian home and contents insurance, including the
          building, contents, temporary accommodation, and demolition/rebuild costs. Arson by the
          policyholder voids coverage. You must not dispose of damaged items until the insurer has
          inspected or authorised disposal.
        </p>
        <h3>EPA Waste Disposal</h3>
        <p>
          Fire debris containing hazardous materials (asbestos, chemicals, electronics) must be
          disposed of at licensed facilities per state EPA regulations. Illegal dumping carries
          penalties up to $1 million for corporations.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Fire Damage Restoration',
      vetted: [
        'IICRC S540 certified with fire-specific training',
        'Asbestos awareness and licensed removal coordination',
        'Structural engineering assessment before any work begins',
        'Thermal fogging and hydroxyl generators for odour elimination',
        'Complete contents inventory with photographic documentation',
        'NCC-compliant structural repairs with council sign-off',
      ],
      unvetted: [
        'No fire-specific certification — may miss hidden damage',
        'No asbestos testing — risk of fibre release during demolition',
        'No structural assessment — rebuilding on compromised framework',
        'Surface cleaning only — smoke odour returns within weeks',
        'Incomplete documentation weakens insurance claim value',
        'Non-compliant repairs may fail council inspection',
      ],
    },
    faqs: [
      { question: 'How long does fire damage restoration take?', answer: 'Minor fire damage (single room, no structural impact) typically takes 1–2 weeks. Moderate damage affecting multiple rooms with smoke penetration takes 4–8 weeks. Major structural fire damage requiring demolition and rebuild can take 3–12 months. Timeline depends on asbestos presence, insurance assessment speed, and council approval requirements.' },
      { question: 'Is it safe to stay in a fire-damaged house?', answer: 'Generally no. Even after flames are extinguished, fire-damaged properties contain toxic smoke residues, potential structural instability, electrical hazards, and compromised fire-resistance ratings. Professional assessment should be completed before re-occupation. Most insurance policies cover temporary accommodation during restoration.' },
      { question: 'What does fire damage restoration cost in Australia?', answer: 'Costs vary enormously. Minor smoke damage cleanup starts at $5,000–$10,000. Moderate fire damage restoration for a 3-bedroom house typically costs $30,000–$80,000. Major structural damage requiring partial or full rebuild can exceed $200,000–$500,000+. Insurance covers most accidental fire damage.' },
      { question: 'Can smoke damage be fully removed?', answer: 'Yes, with professional equipment and techniques. Smoke particles embedded in materials require HEPA vacuuming, chemical cleaning agents specific to the residue type, and thermal fogging or hydroxyl generation for odour elimination. Severely affected porous materials (carpet, insulation, soft furnishings) are typically replaced rather than cleaned.' },
      { question: 'Do I need to check for asbestos after a fire?', answer: 'If your property was built before 1990, asbestos testing is strongly recommended before any restoration work begins. Fire can expose previously encapsulated asbestos in eaves, wall cladding, roofing, and floor tiles. Disturbing asbestos without proper licensing is illegal and poses serious health risks.' },
    ],
  },

  'insurance-claims-process-australia': {
    slug: 'insurance-claims-process-australia',
    title: 'Insurance Claims Process Australia',
    snippetAnswer: (
      <>
        <p>
          <strong>Australian insurance claims</strong> for disaster recovery are governed by the{' '}
          <CitationTooltip source="Standards Australia" credibility={10} url="https://www.standards.org.au">
            Insurance Contracts Act 1984
          </CitationTooltip>{' '}
          and the General Insurance Code of Practice. Insurers must acknowledge claims within 10
          business days and make a decision within 4 months. The Australian Financial Complaints
          Authority (AFCA) provides free dispute resolution. Policyholders have a duty to mitigate
          further damage and must not dispose of damaged property before insurer inspection.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Understanding the insurance claims process is critical for disaster recovery outcomes. The
          process follows a structured timeline with legal obligations on both parties.
        </p>
        <h3>The Claims Timeline</h3>
        <ul>
          <li><strong>Immediate (0–24 hours)</strong> — Mitigate further damage (e.g., turn off water, tarp roof). Contact insurer to lodge claim. Begin photographic documentation of all damage.</li>
          <li><strong>Assessment (1–10 days)</strong> — Insurer acknowledges claim. Loss assessor or insurance assessor inspects property. Scope of loss is documented.</li>
          <li><strong>Decision (10 days – 4 months)</strong> — Insurer determines coverage, appoints restoration contractor or approves policyholder-nominated contractor. Cash settlement or managed repair offered.</li>
          <li><strong>Restoration (variable)</strong> — Approved works proceed. Progress inspections by insurer-appointed assessors. Completion sign-off and policy excess payment.</li>
        </ul>
        <ProTip title="Document Everything">
          Take timestamped photos and video of all damage before any cleanup begins. Keep receipts for
          all emergency expenses (accommodation, food, temporary repairs). Maintain a written log of
          all communications with your insurer, including dates, names, and reference numbers.
          This documentation is critical if a dispute arises.
        </ProTip>
        <h3>Key Insurance Terminology</h3>
        <ul>
          <li><strong>Sum insured</strong> — The maximum amount your insurer will pay for a claim.</li>
          <li><strong>Excess</strong> — The amount you pay towards each claim (typically $500–$1,000).</li>
          <li><strong>PDS (Product Disclosure Statement)</strong> — The legal document outlining what is and is not covered.</li>
          <li><strong>Duty to mitigate</strong> — Your legal obligation to prevent further damage after an event.</li>
          <li><strong>Cash settlement</strong> — Payment of estimated repair costs directly to you, rather than managed repair.</li>
          <li><strong>Scope of loss</strong> — The documented extent of damage used to calculate claim value.</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>Insurance Contracts Act 1984 (Cth)</h3>
        <p>
          This federal legislation sets the framework for all insurance contracts in Australia. Key
          provisions include the duty of utmost good faith (both parties), insurer obligations to
          handle claims efficiently and fairly, and policyholder rights to dispute decisions.
        </p>
        <h3>General Insurance Code of Practice 2020</h3>
        <p>
          The industry code requires insurers to: acknowledge claims within 10 business days, keep you
          informed of claim progress, make a decision within 4 months (or explain delays), and provide
          written reasons for any denial.
        </p>
        <ProTip variant="legal" title="Your Rights Under AFCA">
          If your insurer denies your claim, delays beyond reasonable timeframes, or offers an
          inadequate settlement, you can lodge a free complaint with the Australian Financial
          Complaints Authority (AFCA). AFCA can award compensation up to $1,085,000 for general
          insurance disputes. There is no cost to the consumer.
        </ProTip>
        <h3>Common Exclusions</h3>
        <p>
          Standard Australian insurance policies typically exclude: gradual damage from maintenance
          neglect, pre-existing damage, wear and tear, intentional damage by the policyholder,
          damage during renovations without insurer notification, and specific flood exclusions
          in some policies.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Insurance Claims Management',
      vetted: [
        'Full claims documentation provided — everything your insurer needs for reimbursement',
        'Detailed scope of loss documentation with photographic evidence',
        'Understands insurer requirements to prevent claim disputes',
        'Experience with all major Australian insurers and their processes',
        'Advocates for full restoration scope, not minimum repair',
        'Provides insurer-compliant reports and progress documentation',
      ],
      unvetted: [
        'Minimal documentation — you may struggle to get insurer reimbursement',
        'Minimal documentation that may not meet insurer evidence standards',
        'Unfamiliar with insurance processes — delays and disputes common',
        'No relationship with insurers — your claim may be deprioritised',
        'May underquote to win work then dispute scope with your insurer',
        'No standardised reporting — claim may be rejected for inadequate evidence',
      ],
    },
    faqs: [
      { question: 'How long do insurance claims take in Australia?', answer: 'Under the General Insurance Code of Practice, insurers must acknowledge your claim within 10 business days and make a decision within 4 months. Straightforward claims (e.g., small water damage) may be resolved in 2–4 weeks. Complex claims involving structural damage, disputes, or multiple parties can take 6–12 months.' },
      { question: 'What should I do immediately after property damage?', answer: 'Ensure safety first. Then: mitigate further damage (turn off water, tarp roof), take timestamped photos and video of all damage, contact your insurer to lodge a claim, keep receipts for emergency expenses, and do not dispose of damaged items until your insurer has inspected or authorised disposal.' },
      { question: 'Can I choose my own restoration contractor?', answer: 'Yes, in most cases. Your insurer may recommend their panel contractors (which can speed up the process), but you generally have the right to nominate your own contractor. The insurer may require quotes from your contractor for approval before work begins.' },
      { question: 'What if my insurance claim is denied?', answer: 'Request written reasons for the denial. Review your PDS to check coverage terms. You can request an internal review by the insurer, then lodge a complaint with AFCA if unsatisfied. AFCA provides free dispute resolution and can overturn insurer decisions.' },
      { question: 'Does insurance cover temporary accommodation?', answer: 'Most Australian home insurance policies include temporary accommodation cover if your home is uninhabitable due to an insured event. This typically covers reasonable accommodation costs for the duration of repairs. Check your PDS for specific limits and conditions.' },
      { question: 'What is the duty to mitigate?', answer: 'The duty to mitigate is your legal obligation to take reasonable steps to prevent further damage after an insured event. Examples include turning off water mains during a leak, covering a damaged roof with a tarp, or removing valuables from flooded areas. Failure to mitigate can reduce your claim payout.' },
    ],
  },

  'emergency-response-protocols': {
    slug: 'emergency-response-protocols',
    title: 'Emergency Response Protocols',
    snippetAnswer: (
      <>
        <p>
          <strong>Emergency disaster response</strong> follows the{' '}
          <CitationTooltip source="Bureau of Meteorology" credibility={10} url="http://www.bom.gov.au">
            PPRR framework
          </CitationTooltip>{' '}
          — Prevention, Preparedness, Response, and Recovery — as defined by Emergency Management Australia.
          Professional emergency response requires arrival within 60 minutes, immediate containment to prevent
          secondary damage, and coordination with{' '}
          <CitationTooltip source="Safe Work Australia" credibility={10} url="https://www.safeworkaustralia.gov.au">
            Safe Work Australia
          </CitationTooltip>{' '}
          WHS requirements. The first 24 hours are critical: every hour of delay increases total
          restoration costs by an estimated 10–15%.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Emergency response in disaster recovery is time-critical and follows structured protocols
          developed by Emergency Management Australia and aligned with international best practices.
        </p>
        <h3>The PPRR Framework</h3>
        <ul>
          <li><strong>Prevention</strong> — Measures to eliminate or reduce the impact of disasters. Includes building maintenance, water leak detection systems, fire suppression, and structural reinforcement.</li>
          <li><strong>Preparedness</strong> — Plans and arrangements to ensure effective response. Emergency contact lists, insurance review, contents inventory, and household emergency kits.</li>
          <li><strong>Response</strong> — Actions taken immediately before, during, and after a disaster. Life safety first, property preservation second. Containment, extraction, and stabilisation.</li>
          <li><strong>Recovery</strong> — Restoration of the affected community and environment. Cleanup, repair, rebuild, and support services for affected people.</li>
        </ul>
        <ProTip title="The Golden Hour in Restoration">
          Just as emergency medicine has the &quot;golden hour&quot; for trauma, disaster restoration has a
          critical first-response window. Water extraction within 60 minutes reduces drying time by
          up to 40%. Smoke residue removed within 24 hours prevents permanent staining. Fire damage
          stabilised within 48 hours prevents secondary water damage from firefighting efforts.
        </ProTip>
        <h3>Professional Emergency Response Sequence</h3>
        <ul>
          <li><strong>Dispatch (0–15 minutes)</strong> — Emergency call received, nearest qualified team dispatched, ETA confirmed.</li>
          <li><strong>Arrival and Assessment (15–60 minutes)</strong> — Site safety check, hazard identification, initial damage assessment, containment plan developed.</li>
          <li><strong>Containment (1–4 hours)</strong> — Water extraction begins, temporary board-up/tarp-up, electrical isolation, access restriction for unsafe areas.</li>
          <li><strong>Stabilisation (4–24 hours)</strong> — Drying equipment deployed, air quality monitoring commenced, detailed scope of loss documented, insurer notified.</li>
          <li><strong>Recovery Planning (24–72 hours)</strong> — Full restoration plan developed, timeline and cost estimate prepared, approved works scheduled.</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>Work Health and Safety Obligations</h3>
        <p>
          Emergency response in disaster recovery carries significant WHS obligations under the Work
          Health and Safety Act 2011. Restorers must conduct risk assessments before entering damaged
          properties, use appropriate PPE (respiratory protection, protective clothing, eye protection),
          and follow Safe Work Method Statements (SWMS) for high-risk construction work.
        </p>
        <ProTip variant="legal" title="Your Safety as a Property Owner">
          Do not re-enter a fire-damaged, flood-affected, or structurally compromised property until
          it has been assessed by a qualified professional. Electrical hazards, structural collapse,
          contaminated water, and toxic fumes pose immediate life-threatening risks. Emergency services
          may issue access restrictions that carry legal force.
        </ProTip>
        <h3>Emergency Management Legislation</h3>
        <p>
          Each Australian state has emergency management legislation (e.g., State Emergency and Rescue
          Management Act 1989 in NSW) that empowers SES, fire services, and police to restrict access,
          order evacuations, and coordinate disaster response. Private restoration contractors must
          coordinate with these authorities.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Emergency Response',
      vetted: [
        '60-minute response guarantee with 24/7 dispatch capability',
        'WHS-compliant with current Safe Work Method Statements',
        'Full equipment inventory: extractors, dehumidifiers, air scrubbers',
        'Coordinates directly with emergency services and insurers',
        'Immediate containment prevents secondary damage escalation',
        'Real-time progress reporting to property owner and insurer',
      ],
      unvetted: [
        'No guaranteed response time — delays cost thousands more',
        'May lack WHS compliance — liability risk for property owner',
        'Limited equipment — inadequate for large-scale emergencies',
        'No insurer relationship — claim process becomes adversarial',
        'Delayed containment allows secondary damage to spread',
        'No structured reporting — insurer disputes more likely',
      ],
    },
    faqs: [
      { question: 'How quickly should I respond to water damage?', answer: 'Immediately. Professional water extraction should begin within 60 minutes of discovery for best outcomes. Mould can begin growing within 24–48 hours. Every hour of delay increases restoration costs by an estimated 10–15%. Turn off the water source and electricity to affected areas while waiting for professionals.' },
      { question: 'What should I do in the first hour after a disaster?', answer: 'Ensure personal safety first. Call emergency services if needed (000). Turn off utilities if safe to do so. Take photos and video of all damage. Contact your insurance company. Call a professional restoration company. Do not enter structurally compromised areas.' },
      { question: 'Is 24/7 emergency response really available?', answer: 'Yes, professional disaster recovery companies maintain 24/7 emergency dispatch capability. Disasters do not follow business hours — burst pipes commonly occur at night, storms hit at any time, and fires can start in the early morning. NRPG coordinates emergency response around the clock across Australia.' },
      { question: 'What does emergency board-up and tarp-up involve?', answer: 'Board-up secures broken windows, doors, and openings with plywood to prevent further damage and unauthorised entry. Tarp-up covers damaged roofing with heavy-duty tarpaulins to prevent rain ingress. Both are temporary measures to stabilise the property until permanent repairs can begin.' },
      { question: 'Who pays for emergency response?', answer: 'Emergency response and temporary stabilisation (board-up, tarp-up, water extraction) are typically covered under your insurance policy as reasonable mitigation costs. You have a duty to mitigate further damage, and insurers generally cover these emergency costs even before the full claim is assessed.' },
    ],
  },

  'psychrometric-science-restoration': {
    slug: 'psychrometric-science-restoration',
    title: 'Psychrometric Science in Restoration',
    snippetAnswer: (
      <>
        <p>
          <strong>Psychrometric science</strong> measures the relationship between temperature, humidity,
          and dew point to control{' '}
          <CitationTooltip source="ASHRAE Standards" credibility={10}>
            structural drying in disaster restoration
          </CitationTooltip>
          . Professional restorers use psychrometric charts to calculate the grain depression (difference
          between ambient humidity and target humidity) needed for effective evaporation. The IICRC S500
          standard requires maintaining a{' '}
          <CitationTooltip source="IICRC S500 Water Damage Restoration Standard" credibility={10}>
            vapour pressure differential of at least 4.5 mmHg
          </CitationTooltip>{' '}
          across wet materials to achieve efficient drying within Australian climate conditions.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Psychrometrics is the scientific foundation of all professional structural drying. It is
          the discipline that separates qualified restorers from unqualified ones — and the reason
          why professional drying succeeds where DIY attempts fail.
        </p>
        <h3>Core Psychrometric Concepts</h3>
        <ul>
          <li><strong>Relative Humidity (RH)</strong> — The percentage of water vapour in air relative to the maximum it can hold at that temperature. RH = (Actual vapour pressure / Saturation vapour pressure) × 100%. Target indoor RH: 30–50%.</li>
          <li><strong>Dew Point</strong> — The temperature at which air becomes saturated and condensation occurs. Td ≈ T − ((100 − RH) / 5). Condensation on building surfaces causes secondary water damage.</li>
          <li><strong>Grains Per Pound (GPP)</strong> — The absolute measure of moisture in air. One pound of air can hold varying amounts of water vapour depending on temperature. GPP is temperature-independent, making it the professional&apos;s preferred metric.</li>
          <li><strong>Grain Depression</strong> — The difference between ambient GPP and the dehumidifier&apos;s outlet GPP. Higher grain depression = faster drying.</li>
          <li><strong>Specific Humidity</strong> — Mass of water vapour per unit mass of dry air. Used in engineering calculations for HVAC and drying system design.</li>
        </ul>
        <ProTip title="Why Temperature Matters for Drying">
          Warmer air holds more moisture (higher saturation capacity). Raising the temperature in a
          drying chamber from 20°C to 30°C nearly doubles the air&apos;s moisture-carrying capacity.
          Professional restorers use this principle by combining heated air movers with
          dehumidification to dramatically accelerate drying rates.
        </ProTip>
        <h3>The Drying Equation</h3>
        <p>
          Evaporation Rate = (Vapour Pressure Differential × Air Flow) / Material Resistance
        </p>
        <p>
          This equation drives every decision in professional structural drying. To maximise
          evaporation, restorers optimise three variables:
        </p>
        <ul>
          <li><strong>Vapour pressure differential</strong> — Increased by dehumidification (lowering air RH below material RH)</li>
          <li><strong>Air flow</strong> — Increased by air movers positioned to create laminar flow across wet surfaces</li>
          <li><strong>Material resistance</strong> — Varies by material type. Hardwood resists moisture release more than carpet</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>Documentation Requirements</h3>
        <p>
          Insurance companies increasingly require psychrometric documentation to support drying
          claims. Daily moisture readings, psychrometric calculations, and equipment logs demonstrate
          that professional standards were followed. Without this documentation, insurers may dispute
          the duration and cost of drying operations.
        </p>
        <ProTip variant="legal" title="Industry Standard of Care">
          The IICRC S500 standard establishes the industry standard of care for structural drying.
          Restorers who fail to follow psychrometric drying principles may be liable for
          consequential damage (e.g., mould growth from inadequate drying). This standard is
          referenced in insurance disputes and legal proceedings.
        </ProTip>
        <h3>Building Standards Compliance</h3>
        <p>
          The National Construction Code (NCC) and Australian Standards (AS 1684 for timber framing)
          specify acceptable moisture content for building materials. Timber framing must be dried to
          8–12% moisture content before any enclosure work (plastering, painting). Failing to meet
          these thresholds before closing walls creates conditions for timber rot and mould.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Structural Drying',
      vetted: [
        'Psychrometric-trained technicians with daily monitoring',
        'Calibrated moisture meters and thermal hygrometers',
        'Documented drying curves showing daily progress',
        'Equipment matched to drying class (LGR, desiccant, or conventional)',
        'Drying to Australian building standard moisture thresholds',
        'Complete moisture map at start and verified dry at completion',
      ],
      unvetted: [
        'No psychrometric knowledge — drying by guesswork',
        'No calibrated instruments — relies on "touch test"',
        'No documentation — cannot prove drying was adequate',
        'Wrong equipment for the job — extends drying time and cost',
        'May declare "dry" with moisture still trapped in structure',
        'No moisture verification — hidden moisture causes mould later',
      ],
    },
    faqs: [
      { question: 'What is psychrometrics in restoration?', answer: 'Psychrometrics is the science of air-moisture relationships. In restoration, it is used to calculate optimal drying conditions by measuring temperature, relative humidity, dew point, and grains per pound of moisture in the air. Professional restorers use psychrometric charts and instruments to monitor and control the drying process scientifically.' },
      { question: 'Why does structural drying take so long?', answer: 'Structural drying time depends on the drying class, material types, and environmental conditions. Concrete and hardwood release moisture much slower than carpet or drywall. The drying process must be controlled to prevent cracking, warping, and secondary damage. Rushing drying with excessive heat can damage materials. Typical structural drying takes 3–7 days for standard materials.' },
      { question: 'What equipment is used for professional drying?', answer: 'Professional drying uses: Low Grain Refrigerant (LGR) dehumidifiers for most conditions, desiccant dehumidifiers for low-temperature or specialty drying, centrifugal air movers for surface evaporation, axial fans for large-area air circulation, and thermal hygrometers and moisture meters for daily monitoring.' },
      { question: 'What is the ideal humidity for drying a building?', answer: 'The target relative humidity for effective structural drying is typically 30–40%, which creates sufficient vapour pressure differential to drive moisture from wet materials into the air. The IICRC recommends maintaining at least 4.5 mmHg vapour pressure differential across wet surfaces. Conditions vary by climate zone — tropical Queensland requires different parameters than temperate Melbourne.' },
      { question: 'How do you know when a building is fully dry?', answer: 'A building is considered dry when moisture meter readings in all affected materials return to normal equilibrium moisture content (EMC). For timber, this is 8–12% in most Australian climates. Multiple measurement points are checked with both pin-type and pinless meters. Drying is documented with final moisture maps confirming all areas meet standard.' },
    ],
  },

  'biohazard-trauma-cleaning-standards': {
    slug: 'biohazard-trauma-cleaning-standards',
    title: 'Biohazard & Trauma Cleaning Standards',
    snippetAnswer: (
      <>
        <p>
          <strong>Biohazard cleaning in Australia</strong> follows{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC S540 standards
          </CitationTooltip>{' '}
          and state WHS regulations for handling bloodborne pathogens, bodily fluids, and chemical
          contamination. Technicians require Hepatitis B vaccination, bloodborne pathogen training,
          and compliance with{' '}
          <CitationTooltip source="Standards Australia" credibility={10} url="https://www.standards.org.au">
            AS/NZS 3816 (management of clinical waste)
          </CitationTooltip>
          . All biohazard waste must be disposed of through licensed clinical waste contractors with
          chain-of-custody documentation.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Biohazard and trauma cleaning is the most regulated area of disaster restoration, involving
          biological hazards that pose direct health risks to technicians and occupants.
        </p>
        <h3>Biohazard Classification</h3>
        <ul>
          <li><strong>Level 1 (Low risk)</strong> — Small blood spills, single-room bodily fluid cleanup. Standard PPE and hospital-grade disinfectant.</li>
          <li><strong>Level 2 (Moderate risk)</strong> — Decomposition (early stage), drug lab residue, sewage overflow affecting multiple rooms. Enhanced PPE, HEPA filtration, and antimicrobial treatment.</li>
          <li><strong>Level 3 (High risk)</strong> — Advanced decomposition, large-scale trauma scenes, methamphetamine labs, infectious disease contamination. Full containment, respiratory protection, and decontamination showers.</li>
        </ul>
        <ProTip variant="warning" title="Never Attempt Biohazard Cleanup Yourself">
          Bloodborne pathogens including Hepatitis B (survives on surfaces for up to 7 days),
          Hepatitis C, and HIV require specific decontamination protocols. Household cleaning products
          cannot achieve the required log reduction (99.99% kill rate) for these pathogens.
          Improper cleanup risks infection and does not meet legal disposal requirements.
        </ProTip>
        <h3>Decontamination Process</h3>
        <ul>
          <li><strong>Scene assessment</strong> — Hazard identification, PPE selection, SWMS development.</li>
          <li><strong>Gross removal</strong> — Physical removal of contaminated materials using biohazard containers.</li>
          <li><strong>Chemical treatment</strong> — Application of hospital-grade disinfectant with demonstrated efficacy against bloodborne pathogens (TGA-registered).</li>
          <li><strong>Structural treatment</strong> — Porous materials that absorbed biological matter are removed. Non-porous surfaces are chemically treated and verified.</li>
          <li><strong>Verification</strong> — ATP (adenosine triphosphate) testing confirms surfaces meet decontamination standards.</li>
          <li><strong>Waste disposal</strong> — All biohazard waste is packaged in yellow clinical waste bags and disposed of via licensed clinical waste contractor.</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>WHS Regulations for Biohazard Work</h3>
        <p>
          Under the Work Health and Safety Regulations, biohazard cleanup is classified as high-risk
          work requiring specific controls including risk assessment, Safe Work Method Statements,
          PPE including respiratory protection, and health monitoring for workers.
        </p>
        <ProTip variant="legal" title="Clinical Waste Disposal">
          AS/NZS 3816 governs the management of clinical and related waste. Biohazard materials must
          be contained in yellow clinical waste bags, transported by licensed carriers, and disposed
          of at approved facilities. Failure to comply carries penalties under state environmental
          and health legislation.
        </ProTip>
        <h3>Privacy and Sensitivity</h3>
        <p>
          Trauma and crime scene cleaning often involves sensitive personal circumstances. Professional
          cleaners maintain strict confidentiality regarding the nature and details of the scene.
          Police clearance certificates are mandatory for all technicians working in these environments.
        </p>
        <h3>Meth Lab Decontamination Standards</h3>
        <p>
          Clandestine drug laboratory cleanup in Australia must meet state-specific remediation
          standards (e.g., NSW Clandestine Drug Laboratory Guidelines). Properties must be tested
          before and after remediation, with surface contamination reduced below 0.5 μg/100cm² for
          methamphetamine. Clearance certificates are required before re-occupation.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Biohazard Cleaning',
      vetted: [
        'Bloodborne pathogen trained with current Hepatitis B vaccination',
        'Police-cleared technicians for trauma and crime scene work',
        'TGA-registered hospital-grade disinfectants with verified kill rates',
        'Licensed clinical waste disposal with chain-of-custody documentation',
        'ATP verification testing post-decontamination',
        'Compassionate, discreet service respecting privacy and sensitivity',
      ],
      unvetted: [
        'No pathogen training — risk of cross-contamination and infection',
        'No police checks — unknown individuals at sensitive scenes',
        'Household cleaning products insufficient for pathogen elimination',
        'Illegal disposal of biohazard waste — environmental and health risk',
        'No verification — contamination may remain undetected',
        'Lack of sensitivity training — additional distress for affected parties',
      ],
    },
    faqs: [
      { question: 'What is biohazard cleaning?', answer: 'Biohazard cleaning is the professional decontamination of spaces contaminated with biological hazards including blood, bodily fluids, infectious materials, chemical residue, and decomposition matter. It requires specialised training, equipment, and disposal protocols that exceed standard commercial cleaning.' },
      { question: 'How much does trauma cleaning cost in Australia?', answer: 'Costs vary significantly by scope and contamination level. Small, contained biohazard cleanups start at $1,500–$3,000. Moderate trauma scenes typically cost $3,000–$8,000. Large-scale contamination, advanced decomposition, or meth lab remediation can cost $10,000–$50,000+. Insurance or victim support services may cover some costs.' },
      { question: 'Is trauma cleaning covered by insurance?', answer: 'It depends on the circumstances. Biohazard cleanup from insured events (fire, storm, pipe burst) is typically covered. Trauma scene cleaning may be covered under home insurance or funded through victim support services and government programs. Meth lab decontamination for property purchasers is typically at the buyer\'s expense.' },
      { question: 'Who is responsible for crime scene cleanup?', answer: 'In Australia, police are responsible for evidence collection and scene release, but not cleanup. Once the scene is released, cleanup responsibility falls to the property owner (or their insurer). Many states have victim support services that can fund or subsidise trauma cleaning costs for affected families.' },
      { question: 'How long does biohazard cleanup take?', answer: 'Small biohazard cleanups (Level 1) can be completed in 2–6 hours. Moderate contamination (Level 2) typically takes 1–3 days. Extensive contamination, decomposition, or meth lab remediation (Level 3) can take 3–14 days including verification testing and clearance.' },
    ],
  },

  'storm-flood-damage-recovery': {
    slug: 'storm-flood-damage-recovery',
    title: 'Storm & Flood Damage Recovery',
    snippetAnswer: (
      <>
        <p>
          <strong>Storm and flood damage recovery</strong> requires immediate water extraction within
          24 hours to prevent mould growth and structural deterioration.{' '}
          <CitationTooltip source="Bureau of Meteorology" credibility={10} url="http://www.bom.gov.au">
            The Bureau of Meteorology
          </CitationTooltip>{' '}
          records over 10,000 severe weather events across Australia annually.{' '}
          <CitationTooltip source="IICRC S500 Water Damage Restoration Standard" credibility={10}>
            IICRC S500 protocols
          </CitationTooltip>{' '}
          classify floodwater as Category 3 (black water), requiring full contamination protocols
          including antimicrobial treatment, removal of all affected porous materials, and structural
          drying to Australian building code moisture thresholds.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Australia is one of the most storm- and flood-affected nations in the developed world.
          Recovery from these events requires understanding both the immediate extraction needs and
          the long-term contamination risks.
        </p>
        <h3>Floodwater Classification</h3>
        <p>
          All floodwater is classified as Category 3 (black water) under IICRC S500, regardless of its
          visual appearance. Floodwater collects contaminants from sewage systems, agricultural runoff,
          industrial sites, and decaying organic matter. This means every flood event requires full
          contamination protocols.
        </p>
        <h3>Storm Damage Categories</h3>
        <ul>
          <li><strong>Wind damage</strong> — Roof lifting, window breakage, structural damage, fallen trees. Requires immediate tarp-up and board-up to prevent secondary water ingress.</li>
          <li><strong>Hail damage</strong> — Roof denting/perforation, vehicle damage, external cladding damage. Perforated roofing allows water ingress during subsequent rain events.</li>
          <li><strong>Water ingress</strong> — Storm-driven rain entering through compromised roof, windows, or walls. Category 1 initially but can degrade if not addressed within 48 hours.</li>
          <li><strong>Flash flooding</strong> — Rapid water rise from intense rainfall. Category 3 contamination. Often affects lower levels, basements, and ground-floor properties.</li>
          <li><strong>Riverine flooding</strong> — Prolonged inundation from river system overflow. Extended exposure causes greater structural damage and contamination.</li>
        </ul>
        <ProTip title="After the Flood Recedes">
          Floodwater leaves behind contaminated silt, mud, and debris that continue to harbour
          bacteria and pathogens. Do not assume the property is safe once water recedes. All
          flood-affected areas require professional decontamination. Remove waterlogged contents
          promptly — furniture left in contact with flood silt becomes a contamination source.
        </ProTip>
      </>
    ),
    legalSections: (
      <>
        <h3>Flood Insurance in Australia</h3>
        <p>
          Since 2012, Australian insurers have been required to use a standard definition of
          &quot;flood&quot; in their policies. However, coverage varies significantly between policies.
          Some policies exclude riverine flood while covering storm surge and rainwater runoff.
          Always check your PDS for the specific flood definition and any sub-limits that apply.
        </p>
        <ProTip variant="legal" title="Flood vs Storm Damage">
          Insurance policies distinguish between &quot;storm damage&quot; (covered by almost all policies)
          and &quot;flood damage&quot; (which may have separate coverage, higher excess, or exclusion).
          Understanding this distinction is critical for your claim. If water enters through a
          storm-damaged roof, it is storm damage. If water rises from ground level due to
          overflowing waterways, it is flood damage.
        </ProTip>
        <h3>Government Disaster Recovery Assistance</h3>
        <p>
          Following declared natural disasters, the Australian and state governments provide disaster
          recovery assistance including emergency payments, essential household goods grants, and
          structural assistance grants. These are means-tested and do not replace insurance coverage.
          Apply through your state emergency management agency.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Storm & Flood Recovery',
      vetted: [
        'Category 3 contamination protocols for all floodwater',
        'Industrial water extraction equipment for rapid removal',
        'Structural drying to verified moisture thresholds',
        'Antimicrobial treatment for all flood-affected materials',
        'Coordination with SES, council, and emergency services',
        'Insurance-compliant documentation for maximum claim recovery',
      ],
      unvetted: [
        'May treat floodwater as clean water — inadequate decontamination',
        'Domestic-grade equipment insufficient for flood volumes',
        'Incomplete drying leads to mould and structural damage',
        'No antimicrobial treatment — pathogens remain in materials',
        'No coordination with authorities — potential compliance issues',
        'Inadequate documentation — insurance claim disputes likely',
      ],
    },
    faqs: [
      { question: 'Is all floodwater contaminated?', answer: 'Yes. Under IICRC S500, all floodwater is classified as Category 3 (black water) regardless of its appearance. Floodwater collects contaminants from sewage, agricultural chemicals, industrial waste, and decaying matter. Even clear-looking floodwater requires full contamination protocols.' },
      { question: 'Does my insurance cover flood damage?', answer: 'It depends on your policy. Since 2012, Australian insurers use a standard definition of flood, but coverage inclusion varies. Many policies offer flood as an optional add-on or include it with a higher excess. Check your Product Disclosure Statement for your specific flood coverage terms.' },
      { question: 'How long after a flood does mould appear?', answer: 'Mould can begin growing within 24–48 hours of a flood event in warm, humid conditions. In tropical areas of Australia (QLD, NT, northern NSW), mould growth can appear even faster. Professional water extraction and drying should begin as soon as floodwaters recede to minimise mould risk.' },
      { question: 'What government assistance is available after a flood?', answer: 'Following declared natural disasters, the Australian Government provides Disaster Recovery Payments (up to $1,000 per adult). State governments offer essential household goods grants, structural assistance grants, and emergency accommodation. Apply through your state emergency management agency or Services Australia.' },
      { question: 'Can flood-damaged furniture be saved?', answer: 'It depends on the material and contamination level. Non-porous items (metal, glass, hard plastic) can be professionally cleaned and disinfected. Porous items (upholstered furniture, mattresses, particle board) that have been submerged in Category 3 floodwater generally cannot be salvaged and should be disposed of.' },
    ],
  },

  'commercial-vs-residential-restoration': {
    slug: 'commercial-vs-residential-restoration',
    title: 'Commercial vs Residential Restoration',
    snippetAnswer: (
      <>
        <p>
          <strong>Commercial restoration</strong> differs from residential in scale, compliance requirements,
          and business continuity urgency.{' '}
          <CitationTooltip source="Australian Building Codes Board" credibility={10} url="https://www.abcb.gov.au">
            Building Code of Australia (BCA)
          </CitationTooltip>{' '}
          Class 5–9 commercial buildings have stricter fire, access, and ventilation requirements
          than Class 1–2 residential buildings. Commercial projects require{' '}
          <CitationTooltip source="ISO Standards" credibility={10} url="https://www.iso.org">
            ISO 22301 business continuity planning
          </CitationTooltip>
          , after-hours work scheduling, and coordination with multiple stakeholders including building
          managers, tenants, insurers, and regulatory authorities.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          While the core restoration science is the same, commercial and residential projects differ
          significantly in execution requirements, regulatory compliance, and project management.
        </p>
        <h3>Key Differences</h3>
        <ul>
          <li><strong>Scale</strong> — Commercial projects can affect multiple floors, thousands of square metres, and dozens of tenants simultaneously. Equipment and staffing requirements are correspondingly larger.</li>
          <li><strong>Business continuity</strong> — Every day a commercial property is offline costs revenue. Restoration must minimise downtime through staging, after-hours work, and parallel workflows.</li>
          <li><strong>Compliance</strong> — Commercial buildings must meet BCA Class 5–9 requirements for fire rating, ventilation (AS/NZS 1668.2), accessibility, and essential services. All repairs must maintain or upgrade these standards.</li>
          <li><strong>Stakeholders</strong> — Commercial restoration involves building owners, property managers, multiple tenants, insurers, building certifiers, councils, and potentially health authorities.</li>
          <li><strong>Documentation</strong> — Commercial claims require detailed project management documentation including daily progress reports, cost tracking, variation management, and compliance certificates.</li>
        </ul>
        <ProTip title="Business Continuity Planning">
          The best time to plan for disaster recovery is before a disaster occurs. ISO 22301
          provides a framework for business continuity management that includes identifying critical
          business functions, establishing recovery time objectives, and maintaining relationships
          with qualified restoration contractors for rapid mobilisation.
        </ProTip>
        <h3>Commercial-Specific Considerations</h3>
        <ul>
          <li><strong>Data and IT recovery</strong> — Server rooms, networking equipment, and digital records require specialist recovery services alongside physical restoration.</li>
          <li><strong>Regulatory compliance</strong> — Healthcare facilities (AS/NZS 3003), food premises (Food Standards Code), and childcare centres have sector-specific requirements.</li>
          <li><strong>Heritage buildings</strong> — Heritage-listed commercial buildings require specialist restoration that preserves original materials and features.</li>
          <li><strong>Multi-tenancy coordination</strong> — Access scheduling, noise management, and containment must consider all building occupants.</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>Building Code of Australia Compliance</h3>
        <p>
          Commercial restorations must comply with the current BCA (National Construction Code Volume 1).
          Repairs to fire-rated walls, ceilings, and doors must restore the original fire rating
          with materials and methods that meet current standards — not just original construction
          standards.
        </p>
        <ProTip variant="legal" title="Tenant and Landlord Obligations">
          Under commercial lease agreements, the allocation of restoration responsibilities between
          landlord and tenant depends on the lease terms. Generally, structural damage is the
          landlord&apos;s responsibility, while tenant fit-out damage falls to the tenant. Business
          interruption insurance and loss of rent cover should be reviewed alongside property insurance.
        </ProTip>
        <h3>Essential Services Compliance</h3>
        <p>
          Commercial buildings must maintain essential safety measures (fire detection, sprinklers,
          emergency lighting, exit signage) at all times, including during restoration. Annual
          essential services statements must be maintained. Restoration work must not compromise
          these systems.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Commercial Restoration',
      vetted: [
        'Experience with BCA Class 5–9 compliance requirements',
        'Project management with daily progress reporting',
        'After-hours and weekend capability to minimise business disruption',
        'Multi-stakeholder coordination (owner, manager, tenants, insurer)',
        'Maintains essential services compliance during restoration',
        'Business continuity focus — staged restoration to keep areas operational',
      ],
      unvetted: [
        'Residential experience only — unfamiliar with commercial compliance',
        'No project management structure for complex commercial projects',
        'Business-hours only — maximum disruption to operations',
        'Cannot coordinate between multiple stakeholders effectively',
        'May compromise essential services compliance during work',
        'No business continuity planning — entire building offline unnecessarily',
      ],
    },
    faqs: [
      { question: 'How does commercial restoration differ from residential?', answer: 'Commercial restoration involves larger scale, stricter BCA compliance requirements, business continuity urgency, multiple stakeholders, and more complex project management. Commercial buildings have higher fire rating, ventilation, and accessibility standards. Work must minimise business disruption and coordinate with tenants, managers, and regulatory authorities.' },
      { question: 'Can restoration work be done after hours?', answer: 'Yes, and it is often preferred for commercial properties. After-hours restoration minimises disruption to business operations, tenants, and customers. Professional commercial restoration companies maintain crews capable of 24/7 operation including evenings, weekends, and public holidays.' },
      { question: 'What is business continuity planning for disasters?', answer: 'Business continuity planning (ISO 22301) involves identifying critical business functions, establishing recovery time objectives, maintaining emergency contacts and contractor relationships, and documenting procedures for maintaining operations during and after a disaster. Every commercial property should have a current BCP.' },
      { question: 'Who is responsible for commercial property restoration — landlord or tenant?', answer: 'Responsibility depends on the lease agreement and the nature of the damage. Generally, structural damage to the building fabric is the landlord\'s responsibility. Damage to tenant fit-out and contents is the tenant\'s responsibility. Lease agreements should clearly define restoration obligations for both parties.' },
      { question: 'Does commercial insurance cover restoration costs?', answer: 'Commercial property insurance typically covers the building structure and common areas. Tenant insurance covers fit-out and contents. Business interruption insurance covers lost revenue during restoration. Material damage, business interruption, and public liability are the three key commercial insurance coverages for disaster recovery.' },
    ],
  },

  'iicrc-certification-standards': {
    slug: 'iicrc-certification-standards',
    title: 'IICRC Certification Standards',
    snippetAnswer: (
      <>
        <p>
          <strong>IICRC certification</strong> requires 14+ hours of training, continuing education,
          and adherence to 8 core standards across restoration disciplines.{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            The Institute of Inspection, Cleaning and Restoration Certification (IICRC)
          </CitationTooltip>{' '}
          is the international standard-setting body recognised by insurers, government agencies, and
          the{' '}
          <CitationTooltip source="RIA Guidelines" credibility={9} url="https://www.restorationindustry.org">
            Restoration Industry Association (RIA)
          </CitationTooltip>
          . Key standards include S500 (water damage), S520 (mould), S540 (fire/smoke), and S700
          (carpet cleaning). Australian insurers overwhelmingly prefer IICRC-certified contractors
          for insured restoration work.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          The IICRC is the gold-standard certification body for the restoration industry worldwide.
          Understanding its standards, certification process, and significance helps property owners
          make informed decisions about who restores their property.
        </p>
        <h3>The 8 Core IICRC Standards</h3>
        <ul>
          <li><strong>S500</strong> — Standard for Professional Water Damage Restoration. Covers contamination categories, drying classes, psychrometric drying, and antimicrobial treatment.</li>
          <li><strong>S520</strong> — Standard for Professional Mould Remediation. Covers assessment, containment, remediation protocols, and post-remediation verification.</li>
          <li><strong>S540</strong> — Standard for Cleaning and Restoration of Fire/Smoke Damaged Structures. Covers smoke types, cleaning methods, deodorisation, and structural assessment.</li>
          <li><strong>S590</strong> — Standard for Professional Water Damage Restoration of HVAC Systems. Covers HVAC contamination assessment, cleaning, and verification.</li>
          <li><strong>S700</strong> — Standard for Professional Carpet Cleaning. Covers cleaning methods, chemical selection, and quality verification.</li>
          <li><strong>S710</strong> — Standard for Inspection of Installed Carpet. Covers installation defects, wear assessment, and manufacturer warranty evaluation.</li>
          <li><strong>S740</strong> — Standard for Professional Cleaning of Textile Floor Coverings. Covers specialised fibre types and cleaning requirements.</li>
          <li><strong>S790</strong> — Standard for Inspection of Installed Resilient Floor Coverings. Covers vinyl, tile, and engineered flooring assessment.</li>
        </ul>
        <ProTip title="What Certification Means in Practice">
          An IICRC WRT (Water Restoration Technician) certified professional has completed at least
          14 hours of formal training covering the science of water damage restoration, passed a
          written examination, and commits to continuing education to maintain certification.
          This ensures they understand not just what to do, but why — the scientific basis for
          every restoration decision.
        </ProTip>
        <h3>Certification Levels</h3>
        <ul>
          <li><strong>Technician</strong> — Entry-level certification in a specific discipline (e.g., WRT, FSRT, AMRT). Requires formal training and examination.</li>
          <li><strong>Journeyman</strong> — Advanced certification requiring multiple technician certifications and practical experience.</li>
          <li><strong>Master</strong> — Highest individual certification requiring comprehensive training across multiple disciplines and demonstrated expertise.</li>
          <li><strong>Certified Firm</strong> — Company-level certification requiring certified staff, equipment standards, and business practice compliance.</li>
        </ul>
      </>
    ),
    legalSections: (
      <>
        <h3>Insurance Industry Recognition</h3>
        <p>
          Major Australian insurers (IAG, Suncorp, QBE, Allianz) recognise IICRC certification as the
          industry standard for restoration work. Many insurer panel contractor agreements require
          IICRC-certified firms. Using non-certified contractors may complicate your insurance claim
          or result in dispute over workmanship quality.
        </p>
        <ProTip variant="legal" title="Standard of Care in Legal Proceedings">
          IICRC standards are frequently cited in Australian legal proceedings as the benchmark
          for professional restoration work. If restoration work does not meet IICRC standards
          and subsequent damage occurs (e.g., mould growth from inadequate drying), the contractor
          may be found negligent based on failure to meet the industry standard of care.
        </ProTip>
        <h3>Consumer Protections</h3>
        <p>
          IICRC-certified firms commit to a code of ethics and complaint resolution process.
          If you are dissatisfied with work performed by an IICRC-certified firm, you can lodge
          a complaint through the IICRC&apos;s formal review process. This provides a recourse pathway
          beyond standard Australian Consumer Law protections.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Restoration Certification',
      vetted: [
        'IICRC-certified firm with multiple certified technicians',
        'Current certifications verified annually by NRPG',
        'Continuing education maintained for latest industry standards',
        'Equipment calibration and maintenance per IICRC requirements',
        'Code of ethics commitment with formal complaint resolution',
        'Insurance-panel preferred — smoother claims process',
      ],
      unvetted: [
        'No formal certification — learned by trial and error',
        'No verification of qualifications or training currency',
        'Outdated methods that do not reflect current standards',
        'Uncalibrated equipment producing unreliable readings',
        'No ethical code or formal recourse if work is substandard',
        'May be rejected by insurer — claim disputes and delays',
      ],
    },
    faqs: [
      { question: 'What is IICRC certification?', answer: 'The IICRC (Institute of Inspection, Cleaning and Restoration Certification) is the international standard-setting and certification body for the restoration industry. IICRC certification requires formal training, examination, and ongoing education. It is recognised worldwide and preferred by Australian insurers for restoration work.' },
      { question: 'Why should I choose an IICRC-certified contractor?', answer: 'IICRC-certified contractors have demonstrated competence through formal training and examination, commit to ethical business practices, follow scientific restoration protocols, and are preferred by insurance companies. Using certified contractors typically results in better restoration outcomes, smoother insurance claims, and legal protection through demonstrated standard of care.' },
      { question: 'What IICRC certifications should a water damage restorer have?', answer: 'At minimum, a water damage restorer should hold WRT (Water Restoration Technician) certification. For comprehensive water damage work, look for additional certifications: ASD (Applied Structural Drying) for complex drying, AMRT (Applied Microbial Remediation Technician) if mould is present, and FSRT (Fire and Smoke Restoration Technician) if secondary fire damage exists.' },
      { question: 'How do I verify a contractor\'s IICRC certification?', answer: 'You can verify IICRC certification directly through the IICRC website at iicrc.org using their contractor search tool. Certified firms and technicians are listed with their current certification status, disciplines, and expiry dates. NRPG verifies all network contractor certifications annually.' },
      { question: 'Do Australian insurers require IICRC certification?', answer: 'While not legally mandated, most major Australian insurers strongly prefer or require IICRC-certified contractors for insured restoration work. Insurer panel contractor agreements typically include IICRC certification as a condition. Using non-certified contractors may result in claim disputes or reduced coverage.' },
      { question: 'How often must IICRC certification be renewed?', answer: 'IICRC certifications must be renewed through continuing education credits. Technicians must accumulate a specified number of education hours within each certification cycle. Firms must maintain certified staff ratios and comply with business practice standards. Certifications lapse if renewal requirements are not met.' },
    ],
  },

  'make-safe-forensic-assessment': {
    slug: 'make-safe-forensic-assessment',
    title: 'Make Safe & Forensic Assessment Service',
    snippetAnswer: (
      <>
        <p>
          <strong>The NRPG Make Safe &amp; Forensic Assessment</strong> is a $2,750 (AUD) scientific
          risk mitigation and liability transfer service. It includes{' '}
          <CitationTooltip source="IICRC Standards" credibility={10} url="https://www.iicrc.org">
            IICRC-compliant forensic inspection
          </CitationTooltip>
          {' '}with moisture mapping, thermal imaging, and safety audit; emergency stabilisation using HEPA
          filtration, dehumidifiers, and containment barriers; and a comprehensive Paperwork Assurance
          Report with scope of works, scientific justification, cost estimation, and{' '}
          <CitationTooltip source="Standards Australia" credibility={10} url="https://www.standards.org.au">
            Insurance Contracts Act 1984
          </CitationTooltip>
          {' '}liability transfer documentation — ensuring your insurer cannot deny your claim on technical grounds.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          The Make Safe &amp; Forensic Assessment is a three-stage service designed to protect your
          property, your health, and your insurance claim from the moment our team arrives.
        </p>
        <h3>Stage 1: Forensic Engineering &amp; IICRC Inspection</h3>
        <ul>
          <li><strong>Source identification</strong> — Pinpointing the exact origin of damage using thermal imaging cameras, penetrating moisture meters, and visual inspection of concealed spaces.</li>
          <li><strong>Moisture mapping</strong> — Creating a grid-based moisture map of all affected areas using pin-type and pinless meters, documenting baseline readings for the drying protocol.</li>
          <li><strong>Thermal imaging survey</strong> — FLIR thermal cameras identify hidden moisture behind walls, under floors, and in ceiling cavities that visual inspection cannot detect.</li>
          <li><strong>Safety audit</strong> — Assessment of electrical hazards, structural integrity, air quality, asbestos risk (pre-1990 buildings), and occupant safety clearance.</li>
        </ul>
        <ProTip title="Why Forensic Assessment Matters">
          Insurance assessors increasingly challenge claims that lack scientific documentation.
          A forensic assessment provides objective, measurable evidence that supports your claim
          scope — often recovering 30–50% more in claim value compared to undocumented submissions.
          The $2,750 investment typically pays for itself many times over in claim recovery.
        </ProTip>
        <h3>Stage 2: Emergency Stabilisation</h3>
        <ul>
          <li><strong>HEPA filtration</strong> — Air scrubbers with HEPA filters (99.97% at 0.3μm) deployed to capture airborne contaminants, mould spores, and particulate matter.</li>
          <li><strong>Dehumidifier deployment</strong> — Commercial-grade LGR dehumidifiers placed strategically based on psychrometric calculations to begin immediate moisture reduction.</li>
          <li><strong>Containment barriers</strong> — Polyethylene sheeting and negative air pressure systems isolate affected areas to prevent cross-contamination of unaffected spaces.</li>
          <li><strong>Water extraction</strong> — Truck-mounted or portable extraction units remove standing water. Submersible pumps deployed for significant volumes.</li>
        </ul>
        <h3>Stage 3: Paperwork Assurance Report</h3>
        <ul>
          <li><strong>Scope of works</strong> — Detailed, line-item scope document that insurers can assess directly, eliminating back-and-forth disputes over what needs to be done.</li>
          <li><strong>Scientific justification</strong> — Every recommendation backed by IICRC standards, Australian Building Codes, and psychrometric data — making it virtually impossible for an assessor to reject on technical grounds.</li>
          <li><strong>Cost estimation</strong> — Market-rate pricing aligned with insurer expectations, prepared in formats compatible with major insurer claim systems (RestoreAssist.app).</li>
          <li><strong>Liability transfer</strong> — The report formally documents that reasonable mitigation steps have been taken under the Insurance Contracts Act 1984 &quot;Duty of Utmost Good Faith&quot;, transferring ongoing liability risk from the property owner to the professional restoration process.</li>
        </ul>
        <ProTip>
          The Paperwork Assurance Report is your most powerful insurance document. It transforms
          your claim from &quot;I had water damage&quot; into &quot;Here is the scientific evidence of damage,
          the standards-based remediation protocol, and the documented cost to restore&quot;. Insurers
          process documented claims 60% faster than undocumented ones.
        </ProTip>
      </>
    ),
    legalSections: (
      <>
        <h3>Duty of Utmost Good Faith — Insurance Contracts Act 1984</h3>
        <p>
          Section 13 of the Insurance Contracts Act 1984 (Cth) imposes a duty of utmost good faith
          on both the insurer and the insured. By engaging a professional Make Safe service, the
          property owner demonstrates compliance with their duty to mitigate further damage — a
          critical legal requirement that, if neglected, can reduce or void claim entitlements.
        </p>
        <ProTip variant="legal" title="Liability Transfer">
          The Paperwork Assurance Report creates a documented chain of professional responsibility.
          Once the report is delivered to the insurer, the property owner has formally discharged
          their duty to mitigate. Any further delay in restoration becomes the insurer&apos;s
          responsibility under the General Insurance Code of Practice 2020 timeline obligations.
        </ProTip>
        <h3>Consumer Protection</h3>
        <p>
          The $2,750 Make Safe fee is a fixed-price, all-inclusive service. Under the Australian
          Consumer Law, this constitutes a quoted price that cannot be increased without written
          agreement. The service includes all equipment, labour, materials, and the Paperwork
          Assurance Report — no hidden costs or surprise invoices.
        </p>
        <h3>Tax Deductibility</h3>
        <p>
          For investment properties and commercial premises, the Make Safe fee is generally
          tax-deductible as a repair and maintenance expense. Consult your accountant for
          specific advice regarding your circumstances.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Make Safe Assessment',
      vetted: [
        'IICRC-certified forensic inspection with thermal imaging and moisture mapping',
        'Comprehensive Paperwork Assurance Report for insurer submission',
        'Fixed-price $2,750 service — no hidden costs or scope creep',
        'Liability transfer documentation under Insurance Contracts Act 1984',
        'Emergency stabilisation with commercial-grade HEPA, dehumidifiers, and containment',
        'Insurer-compatible cost estimation (RestoreAssist.app format)',
      ],
      unvetted: [
        'Visual inspection only — no thermal imaging or moisture mapping',
        'No formal documentation — weak insurance claim position',
        'Hourly billing with no fixed price — costs escalate unpredictably',
        'No liability transfer — property owner retains mitigation risk',
        'Domestic-grade equipment insufficient for proper stabilisation',
        'Handwritten quotes that insurers frequently dispute or reject',
      ],
    },
    faqs: [
      { question: 'What is included in the $2,750 Make Safe fee?', answer: 'The fixed-price service includes: forensic IICRC inspection with thermal imaging and moisture mapping, emergency stabilisation (HEPA filtration, dehumidifiers, containment barriers, water extraction), and a comprehensive Paperwork Assurance Report with scope of works, scientific justification, cost estimation, and liability transfer documentation. All equipment, labour, and materials are included.' },
      { question: 'Is the Make Safe fee covered by insurance?', answer: 'Yes, in most cases. The Make Safe fee qualifies as reasonable mitigation costs under your insurance policy. Insurers are required to cover reasonable costs incurred to prevent further damage. The Paperwork Assurance Report specifically documents these costs in insurer-compatible format for direct reimbursement.' },
      { question: 'What is the Paperwork Assurance Report?', answer: 'It is a comprehensive document that includes: detailed scope of works, scientific justification referencing IICRC standards, baseline moisture readings, thermal imaging results, cost estimation in insurer-compatible format, and liability transfer documentation. It is designed to make your insurance claim virtually dispute-proof.' },
      { question: 'How does liability transfer work?', answer: 'Under the Insurance Contracts Act 1984, property owners have a duty to mitigate further damage. The Make Safe service and Paperwork Assurance Report formally document that professional mitigation steps have been taken. This transfers the ongoing liability risk from the property owner to the professional restoration process and the insurer\'s claim timeline.' },
      { question: 'How quickly can a Make Safe assessment be completed?', answer: 'The Make Safe assessment typically begins within 60 minutes of contact and is completed within 4–6 hours for standard residential properties. The Paperwork Assurance Report is delivered within 24 hours. Larger commercial properties may require additional time depending on the scale of damage.' },
      { question: 'Why should I pay $2,750 upfront instead of waiting for my insurer?', answer: 'Every hour of delay increases restoration costs by 10–15% and increases mould risk. The Make Safe fee is recovered through your insurance claim in most cases. More importantly, the forensic assessment and Paperwork Assurance Report typically recover 30–50% more in total claim value by providing documented, scientific evidence that insurers cannot easily dispute.' },
    ],
  },
  'insurance-payout-settlement': {
    slug: 'insurance-payout-settlement',
    title: 'Insurance Payouts & Cash Settlements',
    snippetAnswer: (
      <>
        <p>
          An <strong>insurance cash settlement</strong> (payout) is when your insurer offers a lump sum instead of managing repairs directly. Cash settlements can work in your favour in specific situations — when contents loss exceeds the sum insured and you want to preserve your full contents claim, when you know the replacement costs and can organise repairs faster yourself, or when you do not want to replace the compromised item. However, payouts frequently work against property owners when hidden damage — water behind walls, mould in concealed cavities, smoke residue distributed through HVAC systems, sewage contamination wicked into sub-floor structures — turns out to be far more extensive than the initial assessment suggested. Roof damage, fire damage, water damage, mould, clandestine contamination, and crime scene damage are almost always under-assessed at first inspection. Once you accept a cash settlement, the claim is typically closed and additional costs become your responsibility. Before accepting any cash offer, get an independent assessment from an IICRC-certified restoration professional who can identify concealed damage through moisture mapping, thermal imaging, and invasive investigation that a general insurer assessor will not perform.
        </p>
      </>
    ),
    technicalSections: (
      <>
        <p>
          Insurance cash settlements in Australia are governed by the <em>Insurance Contracts Act 1984</em> (Cth) and the <em>General Insurance Code of Practice</em>. Understanding the mechanics, risks, and strategies is essential before accepting or rejecting any offer.
        </p>
        <h3>How Cash Settlement Offers Are Calculated</h3>
        <p>
          After you lodge a claim, the insurer sends an assessor (loss adjuster) to inspect the property. The assessor produces a scope of works based on visible damage and calculates a cost estimate using the insurer&apos;s pricing schedule. This estimate typically uses the lowest available labour rates, builder&apos;s-grade materials (not necessarily matching your existing finishes), and accounts only for damage visible at the time of inspection. The insurer then presents this figure as a cash-in-lieu offer — take the money and organise repairs yourself, or opt for the insurer&apos;s managed repair pathway.
        </p>
        <p>
          <strong>The core problem:</strong> the offer is based on what the assessor can see during a non-invasive visual inspection. There is no moisture mapping, no thermal imaging, no invasive investigation behind wall linings or under floor coverings. For damage types where concealed damage is common — which includes nearly all water, fire, mould, sewage, and contamination events — this means the scope of works is almost certainly incomplete.
        </p>

        <h3>When Payouts Work in Your Favour</h3>
        <ul>
          <li><strong>Contents loss exceeding the sum insured</strong> — Your policy has separate building and contents covers. If your contents damage is significant (furniture, electronics, clothing, personal items — a typical family home contains $80,000&ndash;$150,000 in contents), taking a cash payout for the building repair means the repair costs are <em>not subtracted from your contents claim</em>. This split strategy can maximise your total claim value by tens of thousands of dollars. Example: a kitchen fire with $30,000 building damage and $45,000 contents damage — taking a building payout preserves your full contents entitlement.</li>
          <li><strong>Known replacement costs with reliable quotes</strong> — If you have genuine quotes from qualified tradespeople, understand the full scope, and can manage the project yourself, a cash settlement bypasses the managed repair timeline (assessor visit, scope approval, panel builder allocation, builder scheduling — typically 6&ndash;12 weeks before work even begins).</li>
          <li><strong>Items you planned to replace or upgrade</strong> — If the damaged area was due for renovation, a payout gives flexibility to direct funds toward what you actually want rather than a like-for-like restoration of something you intended to change anyway.</li>
          <li><strong>Genuinely cosmetic or surface-level damage</strong> — A stain, a cracked tile, a damaged benchtop with no underlying moisture or structural concern. When damage is truly what-you-see-is-what-you-get, a payout for straightforward repair is practical.</li>
        </ul>

        <h3>When Payouts Work Against You — Hidden Damage by Type</h3>
        <p>
          Each type of property damage has characteristic patterns of concealed damage that insurer assessors routinely miss because they do not perform invasive investigation:
        </p>
        <ul>
          <li><strong>Water damage</strong> — Water wicks into timber framing, travels along pipework and electrical cables, and pools in the lowest accessible cavity. A 2m&sup2; ceiling stain may indicate 10m&sup2; of saturated framing, insulation, and wiring behind the plasterboard. Moisture mapping with thermal imaging frequently reveals 3&ndash;5 times more affected area than visible. Without professional drying within 24&ndash;48 hours, mould colonisation begins in concealed spaces.</li>
          <li><strong>Fire and smoke damage</strong> — Visible fire damage is often the smaller cost. Smoke residue (soot, PAHs, VOCs) penetrates every porous surface and is distributed throughout the property via HVAC ducts — not just the room where the fire occurred. Charred structural timber concealed behind wall linings may be weakened. Soft furnishings, carpet underlay, and insulation absorb combustion byproducts requiring specialist cleaning or removal.</li>
          <li><strong>Roof and storm damage</strong> — Roof damage creates progressive water ingress that is not visible for weeks or months. Water enters through damaged tiles, flashing, or sarking, tracks along roof timbers, and saturates insulation. Hail creates hundreds of micro-perforations admitting water during subsequent rain. By the time ceiling staining appears, the roof cavity may have significant mould growth and timber damage.</li>
          <li><strong>Mould</strong> — Visible mould is the tip. Colonies grow on the back side of wall linings, under floor coverings, and inside ceiling cavities where moisture and organic material meet low airflow. A visible mould patch almost always indicates a much larger colony behind the surface. Remediation that addresses only visible growth without investigating concealed areas will fail — the mould returns within weeks.</li>
          <li><strong>Sewage and contaminated water (Category 3)</strong> — Black water contamination from sewage overflow requires complete removal of all porous materials the water contacted — carpet, underlay, plasterboard to 300mm above waterline, insulation, absorbent contents. Contamination zone is always larger than the visible waterline because water wicks upward through porous materials (capillary action) and seeps through joints and gaps.</li>
          <li><strong>Clandestine contamination</strong> — Former drug laboratories (methamphetamine) and undisclosed chemical contamination may only appear during demolition when residue is found on concealed internal surfaces. Scope increases dramatically once invasive investigation begins. Specialist decontamination to safe residue levels is legally required.</li>
          <li><strong>Crime scene and biohazard</strong> — Blood-borne pathogens and biological material penetrate porous surfaces (timber, carpet, concrete) and migrate along joints and gaps. Visual cleanup is insufficient — biological contamination must be verified clear through ATP testing. Sub-floor, wall cavity, and ceiling contamination is common and frequently missed.</li>
        </ul>

        <h3>Building vs Contents — The Split Strategy</h3>
        <p>
          Building insurance covers the structure and fixed fittings (walls, floors, ceilings, plumbing, electrical, built-in cabinetry, ducted air conditioning). Contents insurance covers moveable possessions (furniture, clothing, electronics, portable appliances, artwork). These are separate covers with separate claim pathways. When a disaster damages both, the total claim is split between building and contents components.
        </p>
        <p>
          If you accept a cash settlement for the building portion, those repair costs are settled separately and your contents claim remains fully intact. This matters most when contents damage is extensive — after significant water, fire, or storm events, contents replacement costs frequently approach or exceed the sum insured. Preserving the full contents entitlement by settling building damage separately can be worth tens of thousands of dollars.
        </p>
        <p>
          <strong>Caution:</strong> This strategy is only safe when the building damage is genuinely understood and the cash offer is fair. If there is hidden damage risk, an inadequate building payout becomes your problem after claim closure.
        </p>

        <h3>What a Professional Assessment Includes</h3>
        <p>
          An independent assessment by an IICRC-certified restoration professional includes: visual inspection and documentation of all visible damage; moisture mapping using pin-type and pinless moisture meters across all potentially affected surfaces; thermal imaging to reveal concealed moisture, missing insulation, and thermal bridging; air quality testing where mould or contamination is suspected; a comprehensive scope of works with line-item costings for every remediation and repair task; and full photographic documentation with readings. This is the document you compare against the insurer&apos;s cash offer — and the evidence you use if you need to negotiate or dispute.
        </p>
      </>
    ),
    legalSections: (
      <>
        <h3>Insurance Contracts Act 1984</h3>
        <p>
          The ICA 1984 provides the legal framework for all insurance contracts in Australia. Key sections relevant to cash settlements include:
        </p>
        <ul>
          <li><strong>Section 54</strong> — Prevents insurers from refusing claims on technical grounds when the policyholder has acted reasonably. This is particularly relevant if you engaged emergency restoration services before the insurer&apos;s assessor arrived — the insurer cannot reduce your claim because you took reasonable steps to mitigate further damage.</li>
          <li><strong>Section 13</strong> — Imposes a duty of utmost good faith on both insurer and insured. The insurer must provide fair and accurate settlement offers. A cash offer calculated using inadequate scope, below-market labour rates, or cheapest-available materials (when your property had premium finishes) may breach this duty.</li>
          <li><strong>Section 57</strong> — Addresses subrogation rights, relevant if you accept a payout and later discover the damage was caused by a third party (e.g., a neighbour&apos;s plumbing, a builder&apos;s defect).</li>
          <li><strong>Section 14</strong> — Requires contracts to be interpreted in a way that gives effect to the reasonable expectations of the insured. If your policy says &ldquo;like-for-like replacement&rdquo;, the settlement should reflect actual like-for-like costs, not the cheapest alternative.</li>
        </ul>

        <h3>General Insurance Code of Practice</h3>
        <p>
          The Code of Practice is an industry self-regulation framework that all major Australian insurers subscribe to. Relevant obligations include:
        </p>
        <ul>
          <li>Insurers must handle claims in an honest, fair, transparent, and timely manner</li>
          <li>Insurers must provide reasons for settlement amounts when requested</li>
          <li>Policyholders must be given reasonable time to consider cash settlement offers</li>
          <li>Insurers must not pressure policyholders into accepting settlements before they have had time to obtain independent advice</li>
          <li>Cash settlement offers must be based on fair and reasonable assessment of the loss</li>
        </ul>

        <h3>AFCA Dispute Resolution</h3>
        <p>
          If you believe a cash settlement offer is unfair or does not reflect the true cost of restoration, you have a clear escalation pathway:
        </p>
        <ol>
          <li><strong>Negotiate directly</strong> — Present your independent scope of works and request a revised offer. Show line-item comparisons between the insurer&apos;s scope and yours.</li>
          <li><strong>Internal Dispute Resolution (IDR)</strong> — Lodge a formal complaint through the insurer&apos;s internal complaints process. The insurer must respond within 30 calendar days. Reference specific policy terms, ICA 1984 sections, and your independent documentation.</li>
          <li><strong>AFCA</strong> — If IDR does not resolve the dispute, lodge a complaint with the Australian Financial Complaints Authority. AFCA provides free, independent dispute resolution for insurance complaints up to $1.085 million. AFCA&apos;s determinations are binding on the insurer.</li>
        </ol>
        <p>
          <strong>Critical point:</strong> The documentation from a professional assessment — scope of works, moisture mapping data, thermal images, air quality results, photographic evidence — becomes your evidence at every stage of this process. Without it, you are disputing on opinion. With it, you are disputing on evidence.
        </p>

        <h3>Your Right to a Fair Settlement</h3>
        <p>
          Under Australian law, you are entitled to a settlement that reflects the actual cost of restoring your property to its pre-loss condition using like-for-like materials and finishes. An insurer offering a cash settlement based on cheaper materials, lower labour rates than local market rates, or an incomplete scope of works may not be meeting their obligations under the ICA 1984 or the General Insurance Code of Practice. You do not have to accept it.
        </p>
      </>
    ),
    vettedComparison: {
      topic: 'Cash Settlement Assessment',
      vetted: [
        'Independent scope of works with line-item costings before you commit',
        'Invasive investigation — moisture mapping, thermal imaging, air quality testing',
        'Like-for-like replacement costing matching your actual materials and finishes',
        'Documentation package that supports AFCA dispute if settlement is inadequate',
        'IICRC-certified assessment identifying concealed damage an insurer assessor cannot see',
        'Contents claims strategy advice to maximise your total claim value',
        'Honest assessment of whether a payout or managed repair is better for your situation',
      ],
      unvetted: [
        'Reliance on insurer assessor scope — non-invasive inspection that misses concealed damage',
        'No moisture mapping or thermal imaging — hidden damage discovered after claim closure',
        'Cash offer based on cheapest materials and below-market labour rates',
        'No independent documentation to support a dispute or reopened claim',
        'General assessor without restoration-specific qualifications or IICRC certification',
        'No contents claims strategy — building and contents costs mixed, reducing total payout',
        'Acceptance pressure without adequate time to get independent professional advice',
      ],
    },
    faqs: [
      { question: 'Can I reopen my claim after accepting a cash settlement?', answer: 'Generally, accepting a cash settlement closes the claim. However, if you discover damage that could not reasonably have been identified at the time of settlement (e.g., concealed water damage behind walls, mould in ceiling cavities, contamination under flooring), you may be able to request the insurer reopen the claim or lodge a complaint with AFCA. This is significantly harder than negotiating before acceptance, which is why we always recommend getting an independent assessment with moisture mapping and thermal imaging before committing to a cash settlement.' },
      { question: 'Should I get an independent assessment before accepting a payout?', answer: 'Yes, always — particularly if the damage involves water, fire, smoke, mould, sewage, or any form of contamination. An independent assessment by an IICRC-certified restoration professional includes moisture mapping, thermal imaging, and potentially invasive investigation that identifies concealed damage a general insurer assessor will miss. The cost of an independent assessment is minimal compared to the risk of accepting an under-scoped payout. This assessment can be the difference between a $15,000 offer and a $40,000–$60,000 actual restoration cost.' },
      { question: 'How do I know if the cash settlement offer is fair?', answer: 'Request the insurer provide a detailed, line-item breakdown of how the cash settlement was calculated — what labour rates, what materials, what scope items are included and excluded. Then get independent quotes from qualified restoration professionals for the full scope of works required. Compare the two documents line by line. If there is a significant gap — particularly if the insurer used below-market rates, builder\'s-grade materials replacing premium finishes, or excluded concealed damage areas — the offer may not be fair under the General Insurance Code of Practice.' },
      { question: 'What is the contents claims strategy and when should I use it?', answer: 'Your building and contents insurance are separate covers with separate claim pathways. If contents damage is significant (a typical family home has $80,000–$150,000 in contents), taking a cash settlement for the building repair means building costs are settled separately and your full contents entitlement is preserved. This is most valuable when contents loss is close to or exceeds the sum insured. However, it only works safely when the building damage is genuinely understood — if hidden building damage appears after you accept the building payout, those costs are yours.' },
      { question: 'What types of damage are most commonly under-assessed?', answer: 'Water damage, fire and smoke damage, roof/storm damage, mould, sewage contamination, clandestine contamination, and crime scene/biohazard damage are all consistently under-assessed at first inspection. These damage types share a common characteristic: the concealed damage is significantly greater than what is visible. Water wicks behind walls, smoke distributes through HVAC systems, mould grows on the back of surfaces, sewage contaminates sub-floor structures. An insurer assessor performing a visual-only inspection will miss all of this.' },
      { question: 'Can I negotiate a higher cash settlement?', answer: 'Yes. Cash settlement offers are negotiable. Present the insurer with your independent scope of works, line-item costings from qualified professionals, moisture mapping data, thermal images, and any air quality test results. Show the specific gap between their scope and the actual scope. Many insurers increase the offer when presented with documented evidence. If they refuse, escalate through Internal Dispute Resolution (30-day response requirement) and then to AFCA if necessary.' },
      { question: 'How long do I have to decide on a cash settlement offer?', answer: 'There is no legislated deadline, but insurers may propose a response timeframe. You are entitled to reasonable time to consider the offer and obtain independent advice. Under the General Insurance Code of Practice, insurers must not pressure policyholders into hasty decisions. If you feel rushed, request an extension in writing and document the request. Take the time to get a professional assessment — a few days of delay is far less costly than accepting an inadequate settlement.' },
      { question: 'What if I accept a payout and the repair costs more than expected?', answer: 'If you accepted the settlement and the claim is closed, costs above the settlement amount are generally your responsibility. This is the primary risk of accepting a cash settlement without a thorough independent assessment. If the additional costs are due to damage that could not reasonably have been identified at settlement (truly concealed damage), you may have grounds to request the claim be reopened or to lodge an AFCA complaint — but this is difficult and not guaranteed. Prevention (independent assessment before acceptance) is always better than remedy.' },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Section Factory                                                             */
/* -------------------------------------------------------------------------- */

export function getKnowledgeBaseSections(slug: string): ContentSection[] {
  const entry = ENTRIES[slug];
  if (!entry) return [];

  return [
    // Section 1: Featured Snippet Target
    {
      heading: entry.title,
      body: entry.snippetAnswer,
    },
    // Section 2: Technical Standards
    {
      heading: 'Technical Standards & Science',
      background: 'light',
      body: entry.technicalSections,
    },
    // Section 3: Legal & Insurance
    {
      heading: 'Legal & Insurance Framework',
      body: entry.legalSections,
    },
    // Section 4: Vetted vs Unvetted
    {
      heading: 'Why Choose a Vetted Contractor?',
      background: 'light',
      body: (
        <VettedComparison
          topic={entry.vettedComparison.topic}
          vetted={entry.vettedComparison.vetted}
          unvetted={entry.vettedComparison.unvetted}
        />
      ),
    },
    // Section 5: FAQ
    {
      heading: 'Frequently Asked Questions',
      body: (
        <div>
          {entry.faqs.map((faq, i) => (
            <details key={i} style={{ marginBottom: '0.75rem', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.75rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '1rem', padding: '0.5rem 0', color: 'var(--ag-primary-blue, #0F2942)' }}>
                {faq.question}
              </summary>
              <p style={{ padding: '0.5rem 0 0.25rem', lineHeight: 1.7, color: 'var(--ag-text-muted, #4B5563)' }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      ),
    },
  ];
}

/** Get FAQ data for a knowledge entry (used by KnowledgeSchema) */
export function getKnowledgeEntryFaqs(slug: string): { question: string; answer: string }[] {
  return ENTRIES[slug]?.faqs ?? [];
}

/** Get all knowledge entry slugs */
export function getKnowledgeEntrySlugs(): string[] {
  return Object.keys(ENTRIES);
}
