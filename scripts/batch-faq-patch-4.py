"""
batch-faq-patch-4.py
FAQPage schema patch — batch 4
Targets: 27 pages missing FAQPage schema
- Hub pages (pattern A: existing Script + serviceSchema + <> fragment)
- Location-specific sub-pages (pattern B: no Script, no fragment)

Fixes double-brace bug: uses string concatenation instead of f-strings
for TSX content to avoid {{ escaping confusion.
"""
import re
import os

BASE = r'C:\Users\PhillMcGurk\DR - NRPG COWORK\Disaster-Recovery\app\services'


def make_faq_const(faqs: list) -> str:
    """Generate faqSchema JS const. Uses regular strings (not f-strings) to avoid brace escaping issues."""
    entities = []
    for q, a in faqs:
        q_e = q.replace("'", "\\'")
        a_e = a.replace("'", "\\'")
        entities.append(
            "    {\n"
            "      '@type': 'Question',\n"
            "      name: '" + q_e + "',\n"
            "      acceptedAnswer: {\n"
            "        '@type': 'Answer',\n"
            "        text: '" + a_e + "',\n"
            "      },\n"
            "    }"
        )
    entity_str = ",\n".join(entities)
    return (
        "\nconst faqSchema = JSON.stringify({\n"
        "  '@context': 'https://schema.org',\n"
        "  '@type': 'FAQPage',\n"
        "  mainEntity: [\n" + entity_str + "\n  ],\n"
        "});\n"
    )


def make_script_tag(schema_id: str) -> str:
    """Return the <Script> JSX line. Regular string avoids f-string brace issues."""
    return (
        '      <Script id="' + schema_id + '" type="application/ld+json"'
        ' dangerouslySetInnerHTML={{ __html: faqSchema }} />\n'
    )


def patch_file(rel_path: str, schema_id: str, faqs: list) -> None:
    filepath = os.path.join(BASE, rel_path)
    if not os.path.exists(filepath):
        print(f'  NOT FOUND: {rel_path}')
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "'@type': 'FAQPage'" in content or 'FAQPage' in content or 'generateFAQSchema' in content:
        print(f'  SKIP (has FAQ): {rel_path}')
        return

    faq_const = make_faq_const(faqs)
    script_tag = make_script_tag(schema_id)

    # 1. Add Script import if missing
    if "import Script from 'next/script'" not in content:
        lines = content.split('\n')
        last_import_idx = 0
        for i, line in enumerate(lines):
            if line.startswith('import '):
                last_import_idx = i
        lines.insert(last_import_idx + 1, "import Script from 'next/script';")
        content = '\n'.join(lines)

    # 2. Add faqSchema const before export default function
    if 'const faqSchema' not in content:
        content = content.replace(
            '\nexport default function',
            faq_const + '\nexport default function',
            1
        )

    # 3. Add FAQ Script tag in JSX return
    if '{{ __html: faqSchema }}' not in content:
        # Detect pattern from the export default section
        export_idx = content.find('export default function')
        export_section = content[export_idx:]

        # Pattern A: already has <> fragment wrapper in return
        if re.search(r'return \(\s*\n\s*<>', export_section):
            # Insert script_tag before first <AgContentPageTemplate or <AntigravityServicePageTemplate
            match = re.search(
                r'\n(\s+)(<AgContentPageTemplate|<AntigravityServicePageTemplate)',
                export_section
            )
            if match:
                indent = match.group(1)
                insert_at = export_idx + match.start() + 1  # after \n
                content = (
                    content[:insert_at]
                    + indent + script_tag.strip() + '\n'
                    + content[insert_at:]
                )
        else:
            # Pattern B: no fragment — wrap return and add Script
            match = re.search(
                r'(  return \(\n    )(<AgContentPageTemplate|<AntigravityServicePageTemplate)',
                export_section
            )
            if match:
                old_str = match.group(1) + match.group(2)
                new_str = (
                    '  return (\n'
                    '    <>\n'
                    + script_tag
                    + '    ' + match.group(2)
                )
                content = content[:export_idx] + export_section.replace(old_str, new_str, 1)
                # Close fragment before ); — find last />  \n  );\n}
                content = re.sub(r'\n    />\n  \);\n\}', '\n    />\n    </>\n  );\n}', content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  PATCHED: {rel_path}')


# ── PAGES ─────────────────────────────────────────────────────────────────────

PAGES = {

    'biohazard-cleanup/page.tsx': (
        'biohazard-cleanup-faq',
        [
            (
                'What IICRC standard governs biohazard cleanup in Australia?',
                'IICRC S540 (Standard for Trauma and Crime Scene Cleanup, 2023 edition) is the governing standard for professional biohazard cleanup in Australia. It establishes protocols for hazard assessment, personal protective equipment (PPE), containment, disinfection, verification, and disposal of biohazardous waste. Australian contractors must also comply with state-specific Public Health Acts and relevant Work Health and Safety (WHS) Act 2011 regulations governing handling and disposal of biohazardous materials.',
            ),
            (
                'Who is legally responsible for arranging biohazard cleanup after a trauma event in Australia?',
                'Responsibility varies by circumstance. For incidents in a private home, the property owner or estate is responsible for engaging remediation. For incidents in a rental property, the lessor (landlord) bears primary responsibility under residential tenancy legislation across Australian states. In workplaces, the duty holder under the WHS Act 2011 must arrange cleanup to restore a safe work environment. Queensland, NSW, and Victoria have specific guidance on unattended death cleanup responsibilities issued by the relevant state health departments.',
            ),
            (
                'How is biohazardous waste from cleanup disposed of in Australia?',
                'Biohazardous waste generated during cleanup — including blood-saturated materials, sharps, tissue, and contaminated PPE — is classified as clinical and related waste under the relevant state Environmental Protection Act. It must be segregated into UN-approved biohazard containers, stored appropriately, and transported and disposed of by a licensed clinical waste contractor to an approved facility. NRPG coordinates with licensed waste contractors to manage disposal in accordance with state EPA requirements.',
            ),
        ]
    ),

    'bushfire-damage-restoration/page.tsx': (
        'bushfire-damage-faq',
        [
            (
                'How does bushfire restoration differ from standard fire damage restoration?',
                'Bushfire damage presents distinct challenges compared to structural house fires. Properties sustain ember attack damage, extensive smoke and ash deposition across large surface areas, and debris from multiple sources — all while being located in remote or semi-rural areas with access challenges. Restorations may involve coordinating with state rural fire authorities, working within government-declared disaster zones, and managing health risks from smoke particulates, asbestos in older rural structures, and contaminated water supplies. IICRC S700 (Standard for Professional Smoke and Soot Restoration) and S500 both apply depending on the damage type.',
            ),
            (
                'What smoke and ash residue hazards remain after a bushfire?',
                'Bushfire smoke and ash contain complex mixtures of polycyclic aromatic hydrocarbons (PAHs), heavy metals, asbestos fibres from pre-1990 structures, and fine particulate matter. Indoor air quality testing is essential before reoccupation. IICRC S700 classifies wet, dry, and protein smoke residues — each requiring different cleaning methods. Ash from bushfires is typically alkaline and can cause chemical reactions with building surfaces if not promptly and correctly neutralised and removed.',
            ),
            (
                'What does bushfire insurance typically cover in Australia?',
                'Under standard home and contents policies, bushfire is a named peril and losses are generally covered subject to policy excess and sum insured limits. Total loss situations may involve separate building and contents payouts. Where a property is declared uninhabitable, many policies provide temporary accommodation benefits. The Australian Financial Complaints Authority (AFCA) handles unresolved claim disputes. Documenting all structural damage with IICRC-certified assessment reports, photographs, and moisture and air quality data strengthens claim settlements.',
            ),
        ]
    ),

    'cyclone-damage-restoration/page.tsx': (
        'cyclone-damage-faq',
        [
            (
                'What are the phases of professional cyclone damage restoration?',
                'Cyclone restoration follows three broad phases. The emergency phase begins during or immediately after the event: structural make-safe, emergency tarping, water extraction, and securing of the property. The assessment phase involves IICRC-certified contractors and structural engineers assessing wind, water, and debris damage in detail for insurance scope. The restoration phase includes structural repairs, drying to IICRC S500 standards, decontamination of Category 3 floodwater where applicable, mould remediation, and full reinstatement of affected areas.',
            ),
            (
                'What building code compliance is required after cyclone damage repairs in Australia?',
                'Cyclone-prone regions of Australia (northern WA, QLD, NT, and parts of SA) are subject to cyclonic wind loading requirements under AS 1170.2 and the National Construction Code (NCC). When major structural repairs are required, the replacement work must meet current cyclone-rated standards, which may be more stringent than original construction requirements. A licensed building certifier or council approval is often required before reinstatement works are complete. NRPG project managers coordinate compliance certification as part of the full restoration scope.',
            ),
            (
                'How does insurance claim processing work after a cyclone in Australia?',
                'Insurance claims for cyclone events typically involve an insurer-appointed loss adjuster who assesses quantum and scope. Insurers use IICRC-certified scope documentation and structural engineering reports as the basis for settlement. For declared disaster events, state governments may activate the Commonwealth-State Disaster Recovery Funding Arrangements (DRFA), which can provide grants to uninsured or underinsured property owners through programs such as the Disaster Recovery Payment and the Disaster Recovery Allowance administered by Services Australia.',
            ),
        ]
    ),

    'emergency-response/page.tsx': (
        'emergency-response-faq',
        [
            (
                'What constitutes a property emergency requiring immediate professional response?',
                'A property emergency is any event causing sudden, significant damage that creates immediate health, safety, or structural risk — or where delayed response will substantially worsen the damage. Common triggers include burst pipes, sewage overflow, severe storm damage, fire, flooding, and unattended deaths. The IICRC defines emergency conditions where mitigation must begin within 24-48 hours to prevent secondary damage such as mould growth, structural deterioration, or contamination spread. Delayed response can also affect insurance claim validity under policy mitigation obligations.',
            ),
            (
                'What does a professional emergency response assessment include?',
                'A professional emergency response assessment covers: source identification and isolation, safety assessment of structural integrity and electrical and gas systems, water category and classification per IICRC S500 (Categories 1, 2, or 3), affected material mapping, moisture mapping using thermal imaging and calibrated metres, immediate extraction and stabilisation requirements, and documentation for insurance notification. This assessment forms the basis of the emergency mitigation scope and is provided to the insurer as part of initial claim lodgement.',
            ),
            (
                'How quickly can NRPG contractors respond to a property emergency?',
                'NRPG\'s contractor network is structured for 24/7 response across metropolitan and regional areas. Emergency response times vary by location — metropolitan areas typically achieve on-site attendance within 2-4 hours, and regional areas within 4-8 hours where contractors are available. For declared disaster events affecting widespread areas, NRPG deploys multiple contractor teams to triage the most urgent jobs and coordinates response according to hazard severity and access clearances from state emergency services.',
            ),
        ]
    ),

    'fire-damage-restoration/page.tsx': (
        'fire-damage-restoration-faq',
        [
            (
                'What damage categories are assessed in professional fire damage restoration?',
                'IICRC S700 (Standard for Professional Smoke and Soot Restoration) identifies four primary damage categories in fire restoration: structural fire damage (charring, compromised load-bearing elements), smoke and soot damage (surface deposits across unburned areas), water damage from firefighting operations (typically Category 2 or 3), and odour penetration into porous materials. Each category requires specific techniques — and all interact. For example, firefighting water accelerates deposition of soluble soot residues into substrates, requiring rapid extraction alongside smoke remediation.',
            ),
            (
                'How is fire damage restoration scope determined for insurance purposes?',
                'Scope is determined through systematic inspection by IICRC-certified fire restoration contractors, typically with a structural engineer for significant structural events. The scope documents every affected material, surface, and system by room or zone, specifying whether restoration or replacement is the appropriate remedy. Insurers and their loss adjusters review this scope against the policy and independent pricing guides such as CoreLogic. Scope disputes are resolved through independent assessment or AFCA complaints where necessary.',
            ),
            (
                'Does insurance cover temporary accommodation during fire restoration in Australia?',
                'Most home and contents policies include an Additional Living Expenses (ALE) or Temporary Accommodation benefit covering comparable rental accommodation while the primary residence is being restored following an insured event. Coverage limits and daily caps vary by policy. The accommodation benefit typically applies from the date the property is declared uninhabitable and continues until the property is certified habitable again. NRPG provides property status documentation for insurers to initiate and extend accommodation claims.',
            ),
        ]
    ),

    'flood-damage-restoration/page.tsx': (
        'flood-damage-restoration-faq',
        [
            (
                'What is the difference between Category 1, 2, and 3 floodwater under IICRC S500?',
                'IICRC S500 (Standard for Professional Water Damage Restoration, 2021 edition) classifies water by contamination level. Category 1 is clean water from a sanitary source posing no health risk. Category 2 (grey water) contains contamination that may cause illness on skin contact or ingestion — overflowing dishwashers, washing machine discharge. Category 3 (black water) is grossly contaminated with pathogenic agents — sewage, natural disaster floodwater, or any water that has been stagnant and putrefied. Category and Class (rate of evaporation) together determine the appropriate drying protocol.',
            ),
            (
                'How do IICRC-certified contractors document flood damage for insurance?',
                'Documentation follows IICRC S500 methodology: a moisture map recording readings from calibrated metres at standardised grid points across all affected materials; thermal imaging for hidden moisture behind linings; water category and Class assessment; photographic evidence of all affected areas; scope of affected materials with quantities; and drying logs tracking daily moisture readings, equipment type and number, temperature, humidity, and psychrometric calculations until drying goals are met. This package supports insurance claims and demonstrates industry-standard due diligence.',
            ),
            (
                'What drying standards apply to flood restoration in Australia?',
                'IICRC S500 provides the primary technical framework for structural drying in Australia. Drying goals require equalising moisture content in structural materials with unaffected reference materials in the same building — typically to within 4% moisture content for timber framing. Relative humidity in the drying zone should achieve 40-50% before equipment is demobilised. AIRAH (Australian Institute of Refrigeration Air Conditioning and Heating) guidance informs psychrometric calculations for equipment sizing. Final clearance requires documented confirmation that drying goals have been met across all monitoring points.',
            ),
        ]
    ),

    'indoor-environmental-professional/page.tsx': (
        'iep-faq',
        [
            (
                'What does an Indoor Environmental Professional (IEP) assess after water or mould damage?',
                'An IEP provides independent environmental testing and assessment of indoor air quality, moisture levels, and biological contamination. After water or mould events, an IEP conducts: air sampling for mould spore counts and species identification; surface swab samples from affected materials; moisture and humidity mapping; assessment of HVAC contamination; and a written report recommending remediation scope. The IEP is typically engaged by the property owner or insurer independent of the restoration contractor to provide an objective assessment of the scope required.',
            ),
            (
                'When is an IEP inspection required after water or mould damage?',
                'An IEP inspection is required or strongly recommended where: visible mould exceeds one square metre and occupants have health symptoms; mould has been identified in HVAC systems; a Category 3 (sewage or floodwater) contamination event has occurred; a commercial property governed by the WHS Act 2011 requires employer due diligence documentation; or the insurer or building certifier requires independent clearance testing before reoccupation is permitted following remediation. IEP clearance is increasingly required by insurers as standard for significant mould and water damage claims.',
            ),
            (
                'How does an IEP clearance certificate support a property insurance claim?',
                'An IEP clearance certificate issued after successful remediation provides independent third-party confirmation that the property has been restored to acceptable indoor environmental conditions — typically AIHA or IICRC-referenced spore count thresholds. This document protects the property owner against future liability for health complaints from occupants, provides evidence for the insurer that the loss has been fully addressed, and in commercial properties satisfies WHS Act 2011 due diligence requirements for safe return to work. It also protects the restoration contractor from post-completion disputes.',
            ),
        ]
    ),

    'laser-cleaning/page.tsx': (
        'laser-cleaning-faq',
        [
            (
                'What damage types is laser cleaning used for in property restoration?',
                'Laser cleaning (laser ablation) is used in specialist restoration contexts where conventional methods risk damaging delicate surfaces. It is particularly effective for smoke, soot, and char removal from heritage masonry, stonework, exposed timber beams, decorative plasterwork, and architectural metalwork. Laser cleaning removes carbonised surface residue with high precision without abrasives, chemicals, or water — making it appropriate for materials that cannot withstand conventional restoration techniques or where substrate preservation is paramount.',
            ),
            (
                'Is laser cleaning safe for heritage and listed buildings in Australia?',
                'Yes, laser cleaning is accepted by state heritage authorities in Australia (NSW Heritage Office, Heritage Victoria, Queensland Heritage Council, and others) because it is a non-contact, non-abrasive process that preserves the original fabric of historic materials. Its controllable energy parameters allow technicians to remove fire residue without penetrating or altering the substrate. The Burra Charter (ICOMOS Australia) principles supporting minimally invasive, reversible conservation techniques are satisfied by laser cleaning, making it appropriate for buildings with statutory heritage protection.',
            ),
            (
                'How does laser cleaning compare to conventional fire restoration methods on cost and speed?',
                'Conventional methods — chemical cleaning, dry ice blasting, soda blasting, and abrasive media — are significantly faster and lower cost for large-area smoke and soot restoration on standard materials. Laser cleaning is slower and higher cost but provides precision and substrate safety for irreplaceable or architecturally significant surfaces. In most fire restoration projects it is used in combination: laser cleaning for heritage features, exposed timber, and stonework, with conventional methods applied to standard painted surfaces and linings. This hybrid approach optimises both cost and conservation outcomes.',
            ),
        ]
    ),

    'location-specific/page.tsx': (
        'location-specific-faq',
        [
            (
                'Why does professional restoration response time vary by location across Australia?',
                'Response time is determined by contractor proximity, equipment availability, and access conditions. Metropolitan areas such as Sydney, Melbourne, and Brisbane have dense contractor networks enabling 2-4 hour emergency response. Regional centres like Toowoomba, Ballarat, and Cairns have established contractor presence with 4-8 hour response typical. Remote rural and outback areas require logistics planning for equipment and personnel deployment, with response times potentially extending 12-24+ hours depending on distance and road conditions. NRPG\'s national network is structured to triage jobs by severity and route nearest available contractors.',
            ),
            (
                'How do local building codes and council requirements affect restoration work?',
                'Restoration work often triggers notification or approval obligations under local planning schemes and the National Construction Code (NCC). Structural repairs, changes to building fabric, and reinstatement works may require a building permit or development approval from the local council. In flood-affected areas, Queensland QFES, NSW SES, and other state authorities may specify drainage and resilience improvements as conditions of rebuilding permits. NRPG project managers coordinate compliance with local requirements as part of the full restoration project scope for each location.',
            ),
            (
                'How are NRPG\'s local contractors selected and vetted for specific locations?',
                'NRPG\'s contractor network is built on a proprietary vetting and onboarding process that includes: verification of current IICRC certification for the relevant work category; confirmation of adequate professional indemnity and public liability insurance (minimum $10M); trade licensing relevant to the scope (builder, plumber, electrician as applicable); police clearance for trauma and sensitive work categories; structured capability assessment for local equipment, vehicle assets, and crew capacity; and ongoing performance monitoring against response time, quality, and compliance standards.',
            ),
        ]
    ),

    'meth-lab-decontamination/page.tsx': (
        'meth-lab-faq',
        [
            (
                'What is involved in professional methamphetamine lab decontamination?',
                'Methamphetamine lab decontamination involves removal of chemical residues and contaminated materials from properties used for clandestine drug manufacturing. The process follows state-specific guidelines (e.g., Queensland Health\'s Clandestine Drug Lab Remediation Guidelines) and Australian Standard AS 4040. It includes initial air sampling and surface wipe testing to quantify contamination; removal of all porous materials above contamination thresholds; chemical wash-down of hard surfaces using approved decontamination agents; HEPA vacuuming of HVAC systems; and final clearance testing by an independent assessor before reoccupation is permitted.',
            ),
            (
                'What Australian standards and regulations govern meth lab decontamination?',
                'Methamphetamine decontamination is governed by a combination of standards. Australian Standard AS 4040 provides guidance on volatile compounds in indoor environments. State-specific guidelines include Queensland Health\'s Clandestine Drug Lab Remediation Guidelines and equivalent documents from WA Department of Health and SA EPA. The WHS Act 2011 governs contractor safety during decontamination operations. Environmental Protection Acts in each state govern disposal of chemical waste generated during the process. IICRC S540 principles for hazardous environments also inform industry practice.',
            ),
            (
                'Who is responsible for meth lab decontamination costs in a rental property?',
                'If a tenant has operated a drug lab in a rental property, the tenant is legally liable for remediation costs under residential tenancy legislation in all Australian states. In practice, cost recovery from tenants is often difficult and landlords bear the immediate financial burden. Some landlord insurance policies include limited clandestine drug lab cover. Property owners should notify their insurer, police, and local council immediately upon discovery. All property transactions involving known contaminated properties require disclosure under relevant state property law and consumer protection legislation.',
            ),
        ]
    ),

    'mold-remediation/page.tsx': (
        'mold-remediation-faq',
        [
            (
                'What is the difference between mould removal and mould remediation?',
                'Mould removal implies eliminating all mould — which is not achievable, as mould spores exist naturally in all indoor and outdoor environments. Mould remediation is the correct industry term, describing the process of reducing mould levels to naturally occurring background concentrations by removing contaminated materials, cleaning affected surfaces, and addressing the underlying moisture source. IICRC S520 (Standard for Professional Mould Remediation, 2023 edition) defines the protocols used by certified contractors across Australia for all mould remediation projects.',
            ),
            (
                'What are the health risks associated with mould in Australian buildings?',
                'Mould exposure can cause a range of health effects depending on species, spore concentration, and individual sensitivity. Common effects include allergic reactions, rhinitis, asthma exacerbation, skin and eye irritation, and respiratory infections. Toxigenic species such as Stachybotrys chartarum and Aspergillus flavus can produce mycotoxins that cause more serious systemic effects. NSW Health, Queensland Health, and the AIHA identify children, elderly persons, pregnant women, and immunocompromised individuals as higher-risk groups requiring priority remediation.',
            ),
            (
                'Does home insurance cover mould remediation in Australia?',
                'Coverage depends on the cause of the mould. Mould resulting from a sudden and accidental insured event — such as a burst pipe or storm water ingress — is typically covered under standard home insurance policies. Mould from gradual or maintenance-related moisture ingress is generally excluded as a maintenance issue. Insurers may require IICRC-certified contractors and independent testing. Policy wording should be reviewed carefully; the Australian Financial Complaints Authority (AFCA) handles unresolved claim disputes where coverage is contested.',
            ),
        ]
    ),

    'specialty-services/page.tsx': (
        'specialty-services-faq',
        [
            (
                'What types of specialty restoration does NRPG coordinate through its contractor network?',
                'NRPG\'s specialty restoration services cover assets and scenarios outside standard water, fire, or mould restoration: laser cleaning for heritage surfaces and architectural features; document and photograph drying and digitisation; electronics assessment and drying for water-damaged IT and AV equipment; antique and fine art conservation; wine cellar flooding and stock assessment; boat and caravan water damage; piano and musical instrument restoration; asbestos-containing material management in disaster scenarios; and solar panel assessment and replacement after storm or fire events.',
            ),
            (
                'How are specialty subcontractors vetted for complex restoration projects?',
                'NRPG vets specialist subcontractors using the same criteria applied to all network contractors: evidence of relevant professional memberships, licensing, and insurance; site-specific Safe Work Method Statements (SWMS) for the specialist scope; references from prior comparable projects; and compliance with IICRC, AIHA, or relevant Australian Standards for the specialist discipline. For heritage and conservation work, NRPG requires contractors with demonstrated experience under state heritage authority guidelines and, where applicable, endorsement from a qualified conservation specialist.',
            ),
            (
                'How are specialty restoration services integrated into an insurance claim scope?',
                'Specialty services are documented separately within the overall claim scope, with itemised reports from each specialist covering assessment methodology, confirmed extent of damage, recommended treatment, and cost. For example, an electronics restoration provider will provide a component-level assessment; a fine art conservator will provide a condition report and treatment plan. These documents are submitted to the insurer\'s loss adjuster as supporting attachments to the primary IICRC-certified restoration scope, enabling comprehensive settlement of all loss components.',
            ),
        ]
    ),

    'storm-damage-restoration/page.tsx': (
        'storm-damage-restoration-faq',
        [
            (
                'What types of damage are addressed in professional storm damage restoration?',
                'Storm damage restoration encompasses damage from multiple hazard mechanisms: wind damage to roof structures, cladding, and openings; hail impact damage to roofing, gutters, windows, and external cladding; water ingress from compromised building envelope; debris impact damage; fallen trees on structures; and secondary damage from delayed water ingress following the event. Restoration also addresses damage from emergency protective measures — temporary tarping, boarding, and temporary roofing — which must be replaced with permanent works as part of full reinstatement.',
            ),
            (
                'How quickly must storm damage be addressed to prevent secondary damage?',
                'IICRC S500 and industry best practice require water ingress to be addressed within 24-48 hours to prevent secondary mould growth (mould colonisation can begin on wet organic materials within 48-72 hours under favourable conditions). Emergency tarping and boarding of damaged openings must be completed as promptly as safe site access allows. Delays in emergency response can result in claims complications, as insurers may attribute secondary damage to owner neglect rather than the original insured event, reducing the settlement.',
            ),
            (
                'What temporary protection measures are applied immediately after storm damage?',
                'Standard temporary protection after storm damage includes: roofing tarps or temporary roofing panels to prevent ongoing water ingress; board-up of broken windows and damaged door openings; emergency generator power for critical systems where main power is isolated; temporary fencing for hazardous accessible areas; and emergency pumping of accumulated water from the building interior. All temporary measures are documented and included in the insurance claim scope as emergency mitigation costs, which are separately claimable under most storm damage policies.',
            ),
        ]
    ),

    'structural-drying/page.tsx': (
        'structural-drying-faq',
        [
            (
                'What equipment is used in professional structural drying?',
                'Professional structural drying uses a combination of refrigerant and desiccant dehumidifiers (typically LGR — low grain refrigerant — units), axial and centrifugal air movers to create directional airflow across wet materials, injectidry or drying mat systems to inject warm dry air directly into wall cavities without full demolition, and precision moisture monitoring equipment including calibrated pin and pinless metres and thermal imaging cameras. Equipment is selected, sized, and positioned according to IICRC S500 psychrometric principles to achieve efficient drying within the target timeframe.',
            ),
            (
                'How is structural drying progress monitored during a restoration project?',
                'Drying technicians record daily monitoring logs at each visit documenting: moisture content readings at mapped reference points in each material type; ambient temperature and relative humidity in the drying zone; equipment status (type, quantity, placement, and settings); and daily psychrometric calculations (grains per pound). This data is charted against a drying curve to confirm progress toward drying goals. IICRC-trained technicians adjust equipment placement and settings based on daily readings to maintain efficient drying rates throughout the project.',
            ),
            (
                'What moisture levels confirm structural drying is complete?',
                'IICRC S500 drying goals require structural materials to reach moisture content within 4% of unaffected reference materials in the same building, confirmed across all monitoring points. Relative humidity in the drying zone should stabilise at 40-50% before equipment is demobilised. Floor coverings, wall linings, and subflooring are each verified individually using the appropriate instrument. Final documentation includes a drying completion report with all monitoring data confirming drying goals have been achieved before reconstruction or reinstatement begins.',
            ),
        ]
    ),

    'technical-assessment/page.tsx': (
        'technical-assessment-faq',
        [
            (
                'What does a technical restoration assessment include?',
                'A technical restoration assessment is a comprehensive, systematic inspection conducted by an IICRC-certified assessor to document and scope the full extent of damage from a loss event. It includes: category and class determination for water events (IICRC S500); smoke type and residue classification for fire events (IICRC S700); contamination classification for biohazard events (IICRC S540); moisture mapping; thermal imaging; photographic documentation; materials inventory; and a written scope of works with quantities and recommended methods for each component. This assessment is the foundation of both the restoration project and the insurance claim.',
            ),
            (
                'When is a structural engineer required as part of a technical restoration assessment?',
                'A structural engineer is required when the loss event may have compromised the structural integrity of load-bearing elements: significant fire damage to roof framing, wall studs, floor joists, or columns; severe storm, cyclone, or tree impact damage; flooding that has caused subfloor erosion or foundation movement; or any scenario where the safety of re-entry to the structure is uncertain. Structural engineers assess residual load capacity, prescribe remediation or replacement, and provide certification for reinstatement works where council or building certifier approval is required.',
            ),
            (
                'How does a technical assessment report support an insurance claim settlement?',
                'The technical assessment report provides the insurer and their loss adjuster with the scope of works, quantities, and methodology justification required to value the claim. Without an IICRC-certified assessment, insurers rely solely on their own assessors, which may underestimate scope or apply inappropriate methods. A well-documented third-party technical assessment creates a factual record of damage extent, prevents scope disputes, and enables faster settlement. The report also provides legal protection for the property owner if the claim is subsequently disputed or litigated.',
            ),
        ]
    ),

    'trauma-cleanup/page.tsx': (
        'trauma-cleanup-faq',
        [
            (
                'What training is required for trauma scene cleanup technicians in Australia?',
                'Trauma scene cleanup technicians in Australia require training in biological hazard management under the WHS Act 2011, including: bloodborne pathogen exposure control; correct use of personal protective equipment (PPE) including appropriate respiratory protection under AS/NZS 1715 and 1716; biohazardous waste handling and disposal under state EPA regulations; and IICRC S540 (Standard for Trauma and Crime Scene Cleanup). Contractors must hold current vaccinations including hepatitis B at minimum and undergo exposure assessment and incident reporting training.',
            ),
            (
                'How is a trauma scene decontaminated to safe levels?',
                'Decontamination follows IICRC S540 protocols: containment of the affected area to prevent cross-contamination; removal and appropriate disposal of all contaminated porous materials (flooring, soft furnishings, linings) above threshold levels; chemical disinfection of hard surfaces using hospital-grade disinfectants with documented efficacy against bloodborne pathogens; HEPA vacuuming of residues; and independent surface ATP testing or swab testing to confirm decontamination to acceptable microbial levels before clearance. Air quality testing is performed where airborne contamination risk is identified.',
            ),
            (
                'What support is available for family members during trauma scene cleanup?',
                'NRPG\'s network contractors are trained to work with sensitivity and discretion in difficult circumstances. The compassionate framework includes: family members being fully briefed on the process without having to be present on-site; liaison with a single point of contact who manages all communications with the restoration team; coordination with the coroner\'s office and police for access clearances where required; and referral to victim support services and grief counselling where appropriate. All NRPG contractors follow a professional code that prohibits documentation beyond what is strictly required for insurance purposes.',
            ),
        ]
    ),

    'trauma-cleanup/biohazard-cleanup/page.tsx': (
        'trauma-biohazard-cleanup-faq',
        [
            (
                'How does biohazard cleanup within trauma scenes differ from general biohazard work?',
                'Trauma scene biohazard cleanup presents specific challenges beyond standard biohazard remediation: high-volume bloodborne pathogen contamination; the presence of human tissue and remains where coronial clearance may be required before work can begin; complex surface penetration into subfloor, wall cavities, and grout lines; psychological stressors for technicians; and expectations of discretion and sensitivity from family members and the public. IICRC S540 specifically addresses trauma scenarios, requiring documentation of contamination extent, maintenance of chain of custody for biological materials, and coordination with law enforcement where applicable.',
            ),
            (
                'What PPE is required for trauma scene biohazard cleanup in Australia?',
                'Under IICRC S540 and Australian WHS regulations, trauma scene biohazard cleanup requires: full-body Tyvek or equivalent disposable coveralls; N95 or higher respirators (P2 minimum under AS/NZS 1715 and 1716) or full-face PAPR where significant airborne risk exists; double-gloved nitrile gloves with taped cuffs; full-face eye protection; and disposable boot covers. Containment barriers with negative air pressure units (HEPA filtration) are deployed for large or heavily contaminated scenes to prevent cross-contamination to unaffected building areas.',
            ),
            (
                'Can trauma scene biohazard cleanup be claimed through home insurance?',
                'Many home and contents insurance policies provide cover for trauma and emergency cleanup following an insured event at the property. Coverage terms vary significantly — some insurers include a specific trauma cleanup benefit, while others cover it under general building repair provisions. Professional insurers such as CGU, IAG, QBE, and Allianz have specific guidelines for trauma claims, and NRPG\'s documentation — IICRC-certified assessment report, scope, photographic evidence, and final clearance certificate — satisfies standard insurer requirements. Review your Product Disclosure Statement and contact your insurer at the time of lodgement.',
            ),
        ]
    ),

    # ── LOCATION-SPECIFIC SUB-PAGES (Pattern B — no Script, no fragment) ────

    'location-specific/brisbane-cbd-water-damage/page.tsx': (
        'brisbane-cbd-water-damage-faq',
        [
            (
                'What causes water damage events in Brisbane CBD buildings?',
                'Brisbane CBD water damage events arise from several sources: extreme rainfall causing stormwater and roof drainage overwhelm in high-density buildings; plumbing failures in ageing high-rise building services; cooling tower overflow and HVAC condensate line blockages; subfloor water table intrusion during extended wet periods; and historically Brisbane River flooding in low-lying CBD precincts. The 2022 South East Queensland floods caused significant damage to basement and lower-level CBD premises. Buildings constructed before 2011 may not meet current flood-resilient design guidelines under Brisbane City Council flood amendments.',
            ),
            (
                'How does water damage restoration in Brisbane CBD buildings differ from residential work?',
                'CBD building restoration involves additional complexity: building management approval for access to common areas, basement plant rooms, and riser cupboards; coordination with strata and body corporate for multi-tenancy buildings; compliance with commercial building codes under the NCC and BCC building regulations; insurance claim management for both building and business interruption losses; minimising disruption to building occupants and adjacent tenancies; and managing wet works within secure server rooms, plant rooms, or tenancy fit-outs containing high-value equipment.',
            ),
            (
                'What documentation is required for flood restoration insurance claims in Brisbane?',
                'Brisbane insurer documentation requirements typically include: IICRC-certified contractor assessment report with water category and Class determination; photographic evidence of all affected areas before, during, and after remediation; drying logs recording daily moisture readings; scope of works with quantities and unit rates; council flood level certificates or Flood Check reports confirming flood plain status; and a clearance report from the certifying contractor confirming drying goals have been met. Business interruption claims require additional financial documentation from the property owner or tenant.',
            ),
        ]
    ),

    'location-specific/cairns-cyclone-damage/page.tsx': (
        'cairns-cyclone-damage-faq',
        [
            (
                'Why is Cairns particularly vulnerable to cyclone damage?',
                'Cairns sits within Australia\'s most active cyclone zone — the Gulf of Carpentaria and Coral Sea approaches — and experiences a direct or near-miss tropical cyclone event approximately every 3-5 years on historical averages. The region\'s high sea surface temperatures intensify cyclone development. Cairns\' topography, with coastal low-lying suburbs and hinterland ranges, creates wind funnelling effects. Rapid population growth since the 1980s means a significant proportion of buildings were constructed under older, less stringent cyclone loading standards prior to current NCC requirements.',
            ),
            (
                'What cyclone-specific building standards apply to restoration in Cairns?',
                'Cairns falls within Wind Region C under AS 1170.2, which requires buildings to be designed and constructed to withstand the highest cyclone wind loads in the standard. Under the National Construction Code (NCC), cyclonic construction requirements mandate specific roof-to-wall tie-down connections, cyclone-rated windows and doors, continuous load path connections, and specific cladding ratings. Buildings predating these standards — many constructed before 1985 — may have significant structural vulnerabilities. Post-cyclone structural assessments check these connection points as a priority.',
            ),
            (
                'How does North Queensland\'s tropical climate affect structural drying timelines after cyclone damage?',
                'Cairns\' high year-round humidity (average 75-85% relative humidity) significantly reduces natural evaporation rates and requires more aggressive mechanical drying compared to southern Australian climates. IICRC S500 psychrometric calculations must account for high ambient grains-per-pound (GPP) levels, requiring larger dehumidifier capacity to achieve the required drying differential. Extended drying timelines — 50-100% longer than equivalent projects in drier climates — should be anticipated for insurance scheduling. NRPG project managers apply climate-adjusted drying projections for all Far North Queensland restoration projects.',
            ),
        ]
    ),

    'location-specific/gold-coast-flood-restoration/page.tsx': (
        'gold-coast-flood-restoration-faq',
        [
            (
                'What areas of the Gold Coast are most at risk of flooding?',
                'The Gold Coast\'s complex canal network, tidal rivers (Nerang, Coomera, Pimpama), and hinterland catchments create multiple flood risk zones. SEQWATER flood mapping identifies high-risk precincts including: Labrador, Paradise Point, and Runaway Bay (tidal inundation and canal flooding); Nerang and Carrara (Nerang River flooding); Oxenford and Coomera (Coomera River flooding); and Mudgeeraba and Reedy Creek (overland flow from the hinterland). Gold Coast City Council\'s Local Flood Study is updated regularly and should be consulted for property-specific flood risk assessment.',
            ),
            (
                'How does the Gold Coast\'s coastal humidity affect water damage restoration timelines?',
                'The Gold Coast\'s subtropical coastal climate (average 65-75% relative humidity) slows evaporation compared to inland Australian climates. IICRC S500 drying protocols require humidity control within the drying zone (targeting 40-50% RH) regardless of external ambient conditions, meaning higher dehumidifier capacity or longer drying periods in humid coastal conditions. Fungal colonisation risk is also elevated in subtropical climates — mould can establish on wet organic materials within 48 hours, making rapid water extraction and dehumidification critical for all Gold Coast flood events.',
            ),
            (
                'What documentation is required for flood restoration insurance on the Gold Coast?',
                'Gold Coast insurers require: IICRC-certified assessment with water category determination and photographic mapping; drying logs with daily readings until goals are met; scope of works approved by the insurer\'s loss adjuster; SEQWATER flood data confirming the flood event and extent; and contamination clearance testing for Category 3 (floodwater) events. For strata properties, body corporate minutes, by-laws, and strata manager correspondence are often required to confirm insurance responsibilities between lot owner and body corporate policies.',
            ),
        ]
    ),

    'location-specific/ipswich-flood-recovery/page.tsx': (
        'ipswich-flood-recovery-faq',
        [
            (
                'Why does Ipswich experience repeated flooding?',
                'Ipswich\'s flood risk is structural — the Bremer River and its tributaries drain a large catchment from the Darling Downs ranges and converge in Ipswich before joining the Brisbane River. The city\'s historical development on floodplain land and its position at the confluence of multiple catchments means it is affected by both localised stormwater flooding and major river flooding events. The 2011, 2013, 2022, and subsequent flood events have repeatedly inundated low-lying Ipswich suburbs including Goodna, Rosewood, Leichhardt, and Bundamba, to depths of 1-4 metres or more.',
            ),
            (
                'What makes flood recovery in Ipswich particularly complex?',
                'Ipswich flood recovery challenges include: a large proportion of pre-1980 housing stock with timber stumped subfloors that absorb and retain Category 3 floodwater contamination; ageing plumbing infrastructure that sustains primary damage during flood events; multiple repeat events in some properties requiring repeated restoration; asbestos-containing materials in older pre-1990 construction that require specialist management during demolition and restoration; and the volume of simultaneous claims from repeated events straining both contractor availability and insurance processing timelines.',
            ),
            (
                'Are there government assistance programs available to Ipswich flood victims?',
                'For declared disaster events under the Disaster Recovery Funding Arrangements (DRFA), affected Ipswich residents may access: the Disaster Recovery Payment through Services Australia; the Disaster Recovery Allowance for income lost due to the disaster; and the Queensland Government\'s Resilient Homes Fund for eligible properties in high-risk flood zones, providing funded buyback, raising, or retrofitting options. Ipswich City Council also coordinates local emergency and community recovery grants. Programs vary by event and activation status — contact the Queensland Disaster Hub or Services Australia for current program availability.',
            ),
        ]
    ),

    'location-specific/logan-water-damage/page.tsx': (
        'logan-water-damage-faq',
        [
            (
                'What types of water damage are most common in Logan City?',
                'Logan City experiences water damage events from multiple sources: Bremer and Logan River flooding in low-lying suburbs including Eagleby, Waterford, and Browns Plains; stormwater drainage overwhelm during intense summer thunderstorm events; flash flooding from the many creek and drainage corridors across the city; plumbing failures in Logan\'s significant proportion of 1970s-1990s housing stock; and insurance claims arising from burst flexible hose connections on toilets and tapware — a leading source of sudden water damage in Australian residential properties.',
            ),
            (
                'How does Logan City\'s housing age affect water damage risk and restoration scope?',
                'A significant proportion of Logan\'s residential housing was constructed in the 1970s-1990s during rapid suburban expansion. This housing stock commonly features: flexible braided hose connections on toilets and tapware that deteriorate and fail unexpectedly; galvanised water supply pipes approaching end of service life; weathered roof cladding on older dwellings; and subfloor moisture problems in stumped-floor homes from drainage changes over time. IICRC-certified assessors account for these pre-existing material vulnerabilities when determining the appropriate restoration scope.',
            ),
            (
                'What restoration standards apply to residential water damage in Logan City?',
                'All water damage restoration in Logan must meet IICRC S500 (Standard for Professional Water Damage Restoration, 2021 edition) requirements, which are referenced by Queensland insurers as the industry standard. The Queensland Building and Construction Commission (QBCC) licenses contractors performing structural drying and related building works, and all licensed work must comply with the National Construction Code. For properties in flood-prone zones, Logan City Council\'s flood overlay code may specify requirements for permanent reinstatement works following flood events.',
            ),
        ]
    ),

    'location-specific/moreton-bay-flooding/page.tsx': (
        'moreton-bay-flooding-faq',
        [
            (
                'What flood risks exist across the Moreton Bay region?',
                'The Moreton Bay Regional Council area faces diverse flood risks: coastal tidal inundation along the foreshore from Sandgate to Redcliffe; creek and waterway flooding throughout the Pine Rivers and Caboolture catchments; stormwater overland flow across low-lying residential areas in Strathpine, Morayfield, and Narangba; and the compound effects of coincident rainfall events and king tide periods. The 2022 South East Queensland floods caused major inundation across multiple Moreton Bay suburbs, and the region\'s rapid population growth continues to intensify existing stormwater infrastructure pressures.',
            ),
            (
                'How does tidal surge affect flooding and restoration in coastal Moreton Bay communities?',
                'Coastal Moreton Bay communities are exposed to tidal surge flooding during major weather events — storm surge from east coast low pressure systems can raise sea level 0.5-2m above normal tidal height. This introduces saline water into properties, classified as Category 3 (black water) under IICRC S500, which requires more extensive decontamination, material removal, and post-drying verification than freshwater flooding. Salt residues accelerate corrosion of embedded steel and fasteners and must be thoroughly removed from masonry and concrete surfaces during restoration.',
            ),
            (
                'What response capacity does NRPG maintain for flooding events in the Moreton Bay region?',
                'NRPG maintains contractor resources across the Moreton Bay region, including contractors based in Redcliffe, Caboolture, and North Lakes with equipment sufficient for residential and commercial flood response. For major regional events, NRPG activates its extended network to supplement local capacity with additional crews and equipment. Moreton Bay Regional Council coordinates disaster response through the Local Disaster Management Group (LDMG), and NRPG contractors operate in accordance with LDMG access clearances and priority protocols for affected areas.',
            ),
        ]
    ),

    'location-specific/redlands-storm-damage/page.tsx': (
        'redlands-storm-damage-faq',
        [
            (
                'What types of storm damage are most common in the Redlands area?',
                'The Redland City area — including Redland Bay, Victoria Point, Thornlands, and the Bay Islands — experiences storm damage primarily from: severe thunderstorm cells and hail events during the summer storm season (October-March); tropical-influenced heavy rainfall causing stormwater and creek flooding; coastal storm surge on low-lying island and foreshore areas; and wind damage from east coast low pressure systems causing roof cladding, fence, and tree damage across the bayside suburbs. Older housing stock in areas like Cleveland and Ormiston is particularly vulnerable to wind uplift damage.',
            ),
            (
                'How does Redlands\' proximity to Moreton Bay affect storm damage risk and restoration logistics?',
                'Redlands\' eastern boundary adjoins Moreton Bay, exposing coastal properties to sea-spray, wind-driven rain, and storm surge. Bay-facing properties experience accelerated roof and cladding deterioration from salt exposure, creating pre-existing vulnerabilities that become significant damage pathways during storm events. The Bay Islands — accessible only by ferry or barge — present particular challenges for emergency response and materials logistics during major events, requiring pre-planning of access routes and barge schedules for restoration equipment and crews.',
            ),
            (
                'What temporary protection measures are standard after storm damage in Redlands?',
                'Standard emergency temporary protection for Redlands storm damage includes: emergency tarping of breached roof areas using specialist storm tarps secured with timber battens (not secured directly to roof tiles or capping); board-up of broken or compromised glazing; temporary fencing around structurally unsafe structures; and for Bay Islands properties, barge logistics planning for equipment and crew. All temporary protective works are documented with photographs and included in the insurance claim scope as Emergency Mitigation Measures, which are separately claimable under most storm policies.',
            ),
        ]
    ),

    'location-specific/sunshine-coast-water-damage/page.tsx': (
        'sunshine-coast-water-damage-faq',
        [
            (
                'What causes water damage events on the Sunshine Coast?',
                'Sunshine Coast water damage arises from: intense hinterland rainfall draining through the Maroochy, Mooloolah, and Noosa River systems into coastal plains; severe thunderstorm activity during the summer storm season producing localised flash flooding and roof damage; stormwater overwhelm in lower-lying residential areas of Maroochydore, Nambour, and Caloundra; plumbing failures in the region\'s mix of newer coastal developments and older hinterland housing stock; and groundwater infiltration into subfloor areas during extended wet periods in high water table areas near the coast and rivers.',
            ),
            (
                'How does the Sunshine Coast\'s growth affect restoration access and timelines?',
                'The Sunshine Coast\'s rapid growth has created large new residential areas — Aura, Harmony, Sippy Downs, Palmview — where high construction activity can limit emergency access during concurrent loss events. Hinterland communities (Maleny, Montville, Kenilworth) require longer equipment travel times and may have road access limitations during major weather events. NRPG maintains contractor resources across both coastal and hinterland Sunshine Coast areas and coordinates logistics planning for multi-site activations during declared disaster events.',
            ),
            (
                'What documentation is required for Sunshine Coast water damage insurance claims?',
                'Sunshine Coast insurers require standard IICRC-compliant documentation: water category and Class assessment; photographic evidence at all stages; drying logs with daily moisture readings; scope of works with agreed quantities; and a clearance report confirming drying goals have been met. For properties in the Sunshine Coast Council\'s flood overlay areas, a Flood Check property report confirming flood risk category and historical flood level may be requested by the insurer. Where DRFA assistance is also sought, additional documentation to the relevant state authority is required.',
            ),
        ]
    ),

    'location-specific/toowoomba-water-damage/page.tsx': (
        'toowoomba-water-damage-faq',
        [
            (
                'What significant water events have affected Toowoomba?',
                'Toowoomba experienced a catastrophic flash flood event on 10 January 2011 when intense rainfall (approximately 90mm in 30 minutes) overwhelmed the city\'s stormwater infrastructure, sending a flash flood surge through the CBD and residential areas — killing 3 people and causing hundreds of millions of dollars in damage. The event occurred despite Toowoomba\'s elevated inland location (700m ASL), demonstrating that water damage risk is not limited to flood-prone lowlands. Ongoing creekline flooding risk exists in several suburbs including areas draining East Creek and Ruthven Street catchments.',
            ),
            (
                'How does Toowoomba\'s elevated inland location create unique water damage risks?',
                'Toowoomba\'s position on the rim of the Great Dividing Range creates several distinct water damage risks: storm runoff concentrates rapidly in natural creek channels before engineered stormwater systems can absorb it; steep terrain accelerates stormwater velocity, increasing scouring and erosion damage; properties on the escarpment may experience hillside water intrusion and subsurface seepage; and the region\'s significant annual rainfall (around 750mm per year) accelerates roof and cladding deterioration. Temperature variations at elevation — frost and heat cycles — also contribute to pipe failure rates above those in warmer coastal regions.',
            ),
            (
                'What restoration services are available for rural and agricultural properties around Toowoomba?',
                'NRPG\'s contractor network covers Toowoomba city and surrounding agricultural areas including Highfields, Pittsworth, Warwick, and the Lockyer Valley. For rural properties — including farm buildings, sheds, and station infrastructure — NRPG coordinates contractors experienced in rural building construction, including steel-frame and post-and-beam structures, and grain and machinery storage damaged by flood or storm events. Queensland DRFA activation for affected rural areas may provide additional funding pathways through the Queensland Rural and Industry Development Authority (QRIDA).',
            ),
        ]
    ),

    'location-specific/townsville-flood-restoration/page.tsx': (
        'townsville-flood-restoration-faq',
        [
            (
                'What is Townsville\'s flood history and risk profile?',
                'Townsville\'s most significant modern flood event occurred in late January to February 2019, when a monsoon trough delivered over 1,000mm of rainfall in 10 days — causing Ross River Dam to spill at maximum capacity and inundating over 20,000 properties across low-lying suburbs including Idalia, Hermit Park, Mundingburra, and Vincent. The event was the most severe urban flooding in Townsville\'s recorded history. Flood risk zones are mapped by Townsville City Council\'s FloodWise Property Report system, which property owners and buyers can access for specific site risk information.',
            ),
            (
                'How does North Queensland\'s monsoonal climate affect flood restoration timelines in Townsville?',
                'Townsville\'s monsoon season (December-April) delivers the majority of the region\'s average 1,100mm annual rainfall in concentrated burst events. Restoration projects initiated during the wet season face ongoing moisture ingress risk, requiring active temporary protection throughout the drying phase. Townsville\'s high ambient humidity (70-85% RH during the wet season) significantly increases the drying equipment capacity required per IICRC S500 psychrometric protocols, extending drying timelines and increasing equipment costs compared to dry season restorations. Project managers must account for ongoing weather risk in all scheduling and protection planning.',
            ),
            (
                'What government assistance programs have supported Townsville flood victims?',
                'Following the 2019 Townsville floods, assistance programs included: the Commonwealth Government\'s Disaster Recovery Payment (a lump sum for eligible uninsured losses) and Disaster Recovery Allowance (for income lost due to the disaster); Queensland Government\'s Rapid Repair program providing immediate safety repairs to private residences; and Townsville City Council\'s community recovery grants. The Queensland Government\'s Resilient Homes Fund — introduced following the 2022 SE Queensland floods — may also apply to eligible Townsville properties in high-risk flood zones. Contact the Queensland Disaster Hub (disasters.qld.gov.au) or Services Australia for current program availability.',
            ),
        ]
    ),

}


# ── MAIN ──────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    success = 0
    skipped = 0
    not_found = 0

    for rel_path, (schema_id, faqs) in PAGES.items():
        filepath = os.path.join(BASE, rel_path)
        if not os.path.exists(filepath):
            print(f'  NOT FOUND: {rel_path}')
            not_found += 1
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if "'@type': 'FAQPage'" in content or 'FAQPage' in content or 'generateFAQSchema' in content:
            print(f'  SKIP: {rel_path}')
            skipped += 1
            continue

        patch_file(rel_path, schema_id, faqs)
        success += 1

    print(f'\nDone. Patched: {success}  Skipped: {skipped}  Not found: {not_found}')
