"""Batch 3: Adds unique, E-E-A-T-compliant FAQPage schema to remaining service sub-pages.

Covers: biohazard-cleaning, emergency-services, mould-remediation,
        sewage-cleanup, storm-damage, water-damage, specialty-services sub-pages.

Uses correct single-brace Python string pattern (no f-string/regular-string mixing bug).
"""
import os
import re

PROJ = r"C:\Users\PhillMcGurk\DR - NRPG COWORK\Disaster-Recovery\app\services"

pages = {
    # ── BIOHAZARD-CLEANING ────────────────────────────────────────────────────
    r"biohazard-cleaning\animal-waste": {
        "id": "animal-waste-faq",
        "faqs": [
            ("What health risks does animal waste present in a property?", "Animal waste — including rodent droppings, bird faeces, bat guano, and pet waste — contains bacteria, fungi, parasites, and viruses including Hantavirus, Salmonella, Cryptosporidium, and Histoplasma capsulatum. Disturbing dried faeces releases airborne particles that can cause serious respiratory illness. Professional biohazard cleanup with HEPA filtration and full PPE is required — do not attempt DIY removal."),
            ("Can I clean up animal waste myself?", "No. Animal waste remediation requires Class P2/P3 respiratory protection, chemical-resistant PPE, and HEPA-filtered vacuums. Standard cleaning products do not neutralise biohazardous pathogens. Dried rodent droppings in particular must never be swept or vacuumed without HEPA filtration as this aerosolises Hantavirus particles. Professional decontamination ensures the area is certified pathogen-free before reoccupation."),
            ("Is animal waste cleanup covered by insurance?", "Coverage depends on how the infestation occurred. Sudden damage events — such as a wildlife intrusion after storm damage — are more likely to be covered than gradual infestations. Review your Product Disclosure Statement under vermin or pest damage exclusions. We provide assessment documentation that clearly describes the cause and scope to support your claim."),
        ]
    },
    r"biohazard-cleaning\blood-cleanup": {
        "id": "blood-cleanup-faq",
        "faqs": [
            ("Why can\'t blood cleanup be done by regular cleaners?", "Blood is a Category 3 biohazard under AS/NZS standards. It may contain bloodborne pathogens including HIV, Hepatitis B, Hepatitis C, and MRSA that survive on surfaces for hours to days. Standard cleaning products do not achieve the level of disinfection required. Biohazard technicians use EPA-registered hospital-grade disinfectants, HEPA vacuums, and specialised extraction equipment with appropriate PPE and waste disposal protocols."),
            ("What surfaces can be decontaminated after a blood event?", "Hard, non-porous surfaces — concrete, tiles, sealed timber, metal — can typically be fully decontaminated. Porous materials such as carpet, mattresses, unsealed timber, and particleboard often require removal and disposal as they cannot be adequately decontaminated. Our technicians assess each surface individually and provide clearance testing to verify pathogen elimination."),
            ("Is blood cleanup after a traumatic event covered by insurance?", "Yes. Blood cleanup following a traumatic event is covered under most Australian home and business insurance policies as an emergency make-safe or contents damage claim. We provide full documentation — incident description, scope of works, disposal manifests — required for claims. Contact your insurer as soon as possible and do not disturb the scene before professional assessment."),
        ]
    },
    r"biohazard-cleaning\bodily-fluids": {
        "id": "bodily-fluids-faq",
        "faqs": [
            ("What category of biohazard are bodily fluids?", "Bodily fluids — vomit, urine, faeces, blood, and other biological secretions — are classified as Category 2 to Category 3 biohazards depending on the presence of bloodborne pathogens. They present risks of bacterial infection (E. coli, Salmonella, Staphylococcus) and viral transmission. Cleanup requires hospital-grade disinfection, appropriate PPE, and waste disposal under biological waste regulations."),
            ("How do you decontaminate carpets and soft furnishings after bodily fluid exposure?", "Carpets and soft furnishings affected by bodily fluids are assessed for salvageability. Localised contamination on carpet may be treatable with enzyme-based biological cleaners and hospital-grade disinfectants followed by extraction drying. Severe or widespread contamination typically requires removal and disposal. Upholstered furniture is usually non-restorable after significant bodily fluid exposure due to deep penetration into foam."),
            ("How quickly should bodily fluid cleanup be completed?", "Immediately — pathogens in bodily fluids degrade surfaces and remain infectious for hours to days. The longer cleanup is delayed, the greater the contamination spread and structural damage. NRPG provides 24/7 emergency biohazard response. Occupants should not re-enter the contaminated area until clearance testing confirms pathogen elimination."),
        ]
    },
    r"biohazard-cleaning\drug-lab-cleanup": {
        "id": "drug-lab-faq",
        "faqs": [
            ("What chemicals are present in a drug lab and why are they dangerous?", "Illicit drug laboratories — particularly methamphetamine and fentanyl labs — contain volatile organic compounds, acids, solvents, and heavy metals including pseudoephedrine, acetone, hydrochloric acid, lithium, and phosphine gas residues. These chemicals deposit on all surfaces including walls, ceilings, HVAC systems, and insulation. Exposure causes respiratory damage, neurological effects, and chemical burns. Properties require specialist hazardous materials remediation, not standard cleaning."),
            ("Do I need to notify authorities if I find evidence of a drug lab in my property?", "Yes. In all Australian states and territories, discovery of a suspected illicit drug laboratory must be reported to police. Do not enter or touch anything. The property may be a crime scene and entry may compromise evidence. A police-cleared property still requires professional drug lab decontamination before it is safe to occupy — police clearance does not certify the property is chemically safe."),
            ("Can a drug-lab-contaminated property be remediated or does it need demolition?", "Most drug lab properties can be remediated without demolition if contamination is confined to surface materials and HVAC systems. Remediation involves removal of contaminated materials, specialist chemical decontamination of structure, HVAC replacement or cleaning, and air and surface testing to meet state health authority clearance standards. Properties with contamination in wall cavities and structural elements may require more extensive deconstruction."),
        ]
    },
    r"biohazard-cleaning\hoarding-cleanup": {
        "id": "hoarding-cleanup-faq",
        "faqs": [
            ("What biohazard risks are present in a hoarding cleanup?", "Severely hoarded properties frequently contain rodent infestations with associated droppings and urine, mould from trapped moisture and decomposing organic matter, insect infestations, rotting food, sharps, and decaying animal carcasses. These create compounding biohazard risks requiring full PPE, respirators, and HEPA filtration during cleanup. Structural damage from weight loads and water infiltration through inaccessible areas is also common."),
            ("How do you manage a hoarding cleanup sensitively?", "NRPG works with the property owner, family members, or appointed guardian to categorise items before disposal. Items are photographed and sorted into retain, donate, and dispose categories. We do not arbitrarily discard items without consent except where immediate biohazard risk requires it. Our team is trained in trauma-informed practice and maintains respect and dignity throughout the process."),
            ("How long does a hoarding cleanup take?", "A single-room hoarding cleanup typically takes 1-2 days. A whole-property extreme hoarding remediation — with biohazard contamination, structural repair, and full decontamination — can take 1-4 weeks depending on the volume of material, structural condition, and depth of contamination. We provide a scoped timeline after initial assessment."),
        ]
    },
    r"biohazard-cleaning\infectious-disease": {
        "id": "infectious-disease-faq",
        "faqs": [
            ("When is professional infectious disease decontamination required for a property?", "Professional infectious disease decontamination is required after confirmed cases of highly infectious diseases including tuberculosis, COVID-19 in high-transmission scenarios, norovirus outbreaks, meningococcal disease, or any notifiable disease where surface contamination poses ongoing transmission risk. Healthcare facilities, aged care, schools, and commercial properties are most frequently affected. Regulatory notification to the relevant state health authority may also be required."),
            ("What disinfection methods are used for infectious disease decontamination?", "NRPG uses a combination of EPA-registered hospital-grade liquid disinfectants, electrostatic spraying for even surface coverage, UV-C germicidal irradiation, and HEPA air filtration. The specific protocol is pathogen-specific — norovirus requires different chemistry than coronavirus or mycobacterial contamination. All work follows state health authority guidelines and relevant Australian standards."),
            ("How do you verify that a property is safe after infectious disease decontamination?", "Post-decontamination verification uses ATP (adenosine triphosphate) bioluminescence testing for general surface cleanliness and targeted pathogen-specific environmental swab testing where clinically indicated. Results are documented in a clearance report suitable for your insurer, health authority, or property manager. Re-entry is only authorised after clearance criteria are met."),
        ]
    },
    r"biohazard-cleaning\sharps-disposal": {
        "id": "sharps-disposal-faq",
        "faqs": [
            ("What risks do discarded sharps present and why does cleanup require specialists?", "Discarded needles and syringes present needlestick injury risk with potential transmission of Hepatitis B, Hepatitis C, and HIV. In properties used for illicit drug use, sharps may be contaminated with bloodborne pathogens and drug residues. Each sharp must be individually identified, collected with puncture-resistant equipment, and disposed of as regulated clinical waste under Australian state health regulations. Standard cleaning staff are not trained or equipped for this."),
            ("What does professional sharps collection involve?", "NRPG technicians conduct a systematic search of all accessible areas — inside and underneath furniture, in wall cavities accessible at floor level, in garden areas — using mirrors and torches. Sharps are individually collected with puncture-proof forceps into UN-approved sharps containers. Containers are sealed and transported for disposal by a licensed clinical waste contractor. We provide a manifest confirming safe disposal."),
            ("Is sharps cleanup covered by home or property insurance?", "It depends on the cause. Sharps discovered following an illegal occupation or break-in are generally covered under home insurance as malicious damage or vandalism. Sharps from an occupant\'s own drug use may not be covered. We document the circumstances of discovery and provide a professional report to support your insurance submission."),
        ]
    },
    r"biohazard-cleaning\suicide-cleanup": {
        "id": "suicide-cleanup-faq",
        "faqs": [
            ("Who should I contact first after a suicide at a property?", "Contact emergency services (000) first. Police and coronial authorities will need to clear and release the scene before any cleanup can begin. Do not attempt to clean the scene yourself. Once the property is released, contact a specialist trauma and biohazard cleaning service — not a general cleaner. Family members and property owners should not be present during the cleanup if possible, to protect their wellbeing."),
            ("Why does suicide scene cleanup require specialist contractors?", "Suicide scenes involve blood, bodily fluids, and decomposition materials that are Category 3 biohazards. These materials may have penetrated subfloors, wall cavities, and structural elements not visible on the surface. Standard cleaning does not achieve biohazard clearance. NRPG technicians are trained in trauma-informed practice, use clinical-grade decontamination protocols, and are experienced in working with families and property managers with sensitivity and discretion."),
            ("Is suicide scene cleanup covered by insurance?", "Yes. Most Australian home and property insurance policies cover biohazard cleanup costs following a traumatic event at the property, including suicide, as part of the property damage claim. We provide full documentation — scope of works, disposal manifests, clearance certificates — for your insurer. Contact us and your insurer simultaneously — do not delay cleanup as decomposition rapidly escalates the restoration scope."),
        ]
    },

    # ── EMERGENCY-SERVICES ────────────────────────────────────────────────────
    r"emergency-services\disaster-response": {
        "id": "disaster-response-faq",
        "faqs": [
            ("What is the difference between emergency response and standard restoration?", "Emergency response is the immediate make-safe phase — stopping active damage, extracting standing water, boarding broken openings, and stabilising the structure within the first 24-72 hours. Standard restoration is the full reinstatement phase — drying, decontamination, structural repair, and fit-out — which follows after emergency make-safe is complete and insurance approval is obtained. NRPG handles both phases under a single coordinated scope."),
            ("How does NRPG manage large-scale disaster response across multiple properties?", "NRPG maintains a national network of IICRC-certified contractors with surge capacity for catastrophic events. During major disasters — cyclones, floods, bushfires — we activate a coordinated dispatch system, prioritising properties by risk severity. Large commercial and strata properties are assigned dedicated project managers. We coordinate directly with insurers, loss adjusters, and government recovery agencies."),
            ("What should I do in the first hour after a disaster before help arrives?", "Safety first — evacuate if the structure is unsafe. Turn off electricity and gas at the mains if it is safe to do so. Do not enter flood-affected rooms if there is any risk of electrical hazard. Take photographs of all damage before touching anything. Move valuables to a dry area if safe. Contact your insurer to register the claim, then call NRPG for emergency dispatch. Do not dispose of any damaged items before they are documented."),
        ]
    },
    r"emergency-services\emergency-plumbing": {
        "id": "emergency-plumbing-faq",
        "faqs": [
            ("When is a plumbing failure a restoration emergency rather than just a plumbing job?", "A plumbing failure becomes a restoration emergency when water has escaped into the building structure — soaking flooring, walls, ceiling cavities, or subfloor. A plumber stops the leak; a restoration contractor dries the structure. If water has been present for more than 30 minutes in a building, professional moisture assessment and structural drying are required. Category 2 or 3 water (grey or black water from burst sewage or contaminated sources) requires biohazard treatment in addition to drying."),
            ("What should I do immediately when a pipe bursts?", "Turn off the water at the main stopcock immediately. Turn off electricity to the affected zone if water is near electrical fittings — do not do this if you must stand in water to reach the switchboard. Open windows to begin air circulation. Mop up as much surface water as possible with towels but do not use a standard vacuum — water will damage the motor. Call an emergency plumber and an IICRC-certified restoration contractor simultaneously."),
            ("Does insurance cover burst pipe water damage?", "Yes. Sudden and accidental burst pipe damage is covered by most Australian home and business insurance policies. The cost of repairing or replacing the failed pipe itself may or may not be covered depending on the cause — ask your insurer. All consequential water damage to the building and contents is claimable. Begin emergency make-safe and drying immediately — do not wait for insurer approval as delay escalates the claim scope."),
        ]
    },
    r"emergency-services\emergency-power": {
        "id": "emergency-power-faq",
        "faqs": [
            ("When is emergency power restoration required after a disaster?", "Emergency power restoration is required when a disaster event — storm, flood, fire, or structural damage — has disabled a building\'s electrical supply in a way that creates safety hazards or prevents essential systems (fire suppression, security, refrigeration, medical equipment) from operating. NRPG coordinates with licensed electricians for emergency switchboard assessment, temporary power supply, and safe reconnection as part of a broader make-safe scope."),
            ("Is it safe to restore power to a property that has been flooded?", "No. Never restore power to a flood-affected property without a licensed electrician\'s inspection and sign-off. Floodwater infiltrates switchboards, conduit, and electrical fittings. Energising a water-damaged electrical system causes electrocution risk, fire risk, and equipment damage. All electrical infrastructure must be inspected, tested, dried, and certified before reconnection. This applies to the mains connection and to every sub-circuit in the affected area."),
            ("Who pays for emergency electrical repairs after storm or flood damage?", "Licensed electrician costs for emergency make-safe and reinstatement of electrical systems damaged by a covered event are claimable under home or business insurance. We coordinate with your licensed electrical subcontractor and provide the scope and cost documentation your insurer requires. Some insurers require their own assessor to approve major electrical scopes before work commences — we manage this process on your behalf."),
        ]
    },
    r"emergency-services\emergency-sanitization": {
        "id": "emergency-sanitization-faq",
        "faqs": [
            ("When is emergency sanitization required after a water or sewage event?", "Emergency sanitization is required whenever water ingress involves Category 2 (grey water — dishwasher overflow, washing machine, fish tank) or Category 3 (black water — sewage backup, floodwater, toilet overflow) contamination. These water categories contain bacteria, parasites, and viruses that pose immediate health risks. NRPG applies EPA-registered hospital-grade antimicrobial treatments to all affected surfaces after extraction and before drying commences, per IICRC S500:2025 protocol."),
            ("What does emergency sanitization involve?", "Emergency sanitization involves: application of biocide to all affected surfaces to eliminate bacteria and mould spores; HEPA air scrubbing to remove airborne contaminants; removal and disposal of non-restorable porous materials that cannot be adequately decontaminated; and post-treatment clearance assessment. All treatments are documented for your insurance claim and for occupational health compliance in commercial settings."),
            ("Is emergency sanitization covered by insurance?", "Yes. Antimicrobial treatment and sanitization are standard components of water damage restoration covered under most Australian home and business insurance policies when the water event is a covered loss. In commercial settings, sanitization documentation also supports occupational health compliance requirements for returning workers to the site."),
        ]
    },
    r"emergency-services\priority-response": {
        "id": "priority-response-faq",
        "faqs": [
            ("What qualifies a property for priority emergency response?", "Properties qualify for priority dispatch when: there is active water ingress or fire spread; the structure is unsafe or uninhabitable; essential services (power, water, gas) are disrupted; vulnerable occupants (elderly, children, people with disability) are present; or the commercial property has critical operations at risk. NRPG triages incoming requests and dispatches the closest available certified team to priority sites first."),
            ("How does NRPG guarantee a rapid response time?", "NRPG maintains IICRC-certified response teams in all major Australian metro areas and regional centres. Dispatch is 24/7 with a target response time of 60 minutes in metro areas, 2-4 hours in regional areas. Response time guarantees are subject to simultaneous catastrophic events affecting multiple properties — during declared disasters, response is prioritised by risk severity."),
            ("What happens if the emergency escalates after the first team arrives?", "The attending team assesses the full scope and calls for reinforcements immediately if the situation exceeds their capacity. NRPG has surge capacity through its national contractor network. In catastrophic events, we coordinate with emergency services, insurer catastrophe response teams, and government recovery agencies. You will receive a scope and timeline update within 2 hours of the initial team\'s arrival."),
        ]
    },

    # ── MOULD-REMEDIATION ─────────────────────────────────────────────────────
    r"mould-remediation\attic-mould": {
        "id": "attic-mould-faq",
        "faqs": [
            ("What causes mould to grow in attics and roof spaces?", "Attic mould is caused by moisture accumulation from inadequate roof ventilation, condensation on cold roof sheeting in winter, roof leaks, and blocked or undersized eave vents. Bathroom and kitchen exhaust fans venting into the roof space (rather than outside) are a common cause. Mould grows on timber framing, sarking, and insulation batts when relative humidity exceeds 60% consistently."),
            ("Is attic mould dangerous to occupants below?", "Yes. Mould spores in roof spaces can enter living areas through ceiling penetrations, light fittings, exhaust fan openings, and leaks in the ceiling lining. Attic mould significantly worsens indoor air quality throughout the property. Structural timber affected by mould for extended periods also suffers structural degradation — roof framing strength is compromised over time."),
            ("How is attic mould remediated?", "IICRC S520:2025-compliant attic mould remediation involves: containment of the roof space; HEPA vacuuming of all spore-contaminated surfaces; application of EPA-registered antifungal to timber framing and sarking; replacement of contaminated insulation batts; and addressing the moisture source (improving ventilation, fixing roof leaks). Post-remediation clearance air testing verifies spore counts are within acceptable limits before the roof space is resealed."),
        ]
    },
    r"mould-remediation\bathroom-mould": {
        "id": "bathroom-mould-faq",
        "faqs": [
            ("Why does bathroom mould keep coming back after cleaning?", "Surface mould returns because the underlying moisture source has not been addressed. Grout lines and silicone joints allow moisture to penetrate behind tiles, where mould grows on the substrate. Bleach-based surface cleaners kill visible mould but do not penetrate to remove the root structure (hyphae) embedded in grout or behind tiles. Professional mould remediation identifies the moisture source, removes contaminated materials, and treats the substrate with penetrating antifungal agents."),
            ("When does bathroom mould require professional remediation versus DIY cleaning?", "DIY cleaning with commercial antifungal products is appropriate for surface mould on glazed tiles covering less than 1 square metre with no underlying moisture problem. Professional remediation is required when: mould covers more than 1 square metre; mould is present behind tiles or in wall cavities; grout or silicone shows widespread mould penetration; or occupants are experiencing respiratory symptoms. IICRC S520:2025 defines the scope threshold for professional intervention."),
            ("Is bathroom mould covered by home insurance?", "Mould resulting from a sudden and accidental water event — a burst pipe, tap failure, or roof leak — is typically covered as consequential damage. Mould resulting from long-term inadequate ventilation or maintenance neglect is generally excluded as a maintenance issue. We provide moisture source assessment reports that document the causation for your insurance claim."),
        ]
    },
    r"mould-remediation\bedroom-mould": {
        "id": "bedroom-mould-faq",
        "faqs": [
            ("What causes mould in bedrooms?", "Bedroom mould is typically caused by condensation on cold walls (common in poorly insulated homes in winter), moisture from occupant breath and perspiration overnight, water ingress through window frames or wall penetrations, or undetected leaks above the ceiling. Fitted wardrobes against external walls trap moist air and create cold spots. Poor cross-ventilation allows humidity to accumulate to levels that support mould growth."),
            ("Can bedroom mould cause health problems?", "Yes. Sleeping in a mould-affected room involves prolonged, low-level exposure to mould spores and mycotoxins. Health effects include respiratory irritation, allergic sensitisation, asthma exacerbation, recurrent sinus infections, skin reactions, and fatigue. Children, the elderly, and immunocompromised individuals are most at risk. Health symptoms should resolve after professional remediation and the source moisture is eliminated."),
            ("How do you remove mould from bedroom walls without making it worse?", "Do not dry-brush or vacuum mould without HEPA filtration — this releases spores throughout the room. NRPG technicians work under containment with negative air pressure to prevent spore spread, using HEPA-vacuuming, damp wiping with antifungal solutions, and penetrating biocide treatment. Affected plasterboard is replaced if mould has penetrated the paper facing. The moisture source is identified and rectified as part of the scope."),
        ]
    },
    r"mould-remediation\black-mould-removal": {
        "id": "black-mould-faq",
        "faqs": [
            ("Is black mould more dangerous than other types of mould?", "\'Black mould\' commonly refers to Stachybotrys chartarum, which produces trichothecene mycotoxins that are toxic at low concentrations. However, colour alone does not identify mould species — many non-toxic moulds are black. Only laboratory testing can confirm Stachybotrys. Any extensive mould growth — regardless of colour — should be treated as potentially hazardous and remediated professionally under IICRC S520:2025 protocols."),
            ("Can black mould be killed with bleach?", "Bleach disinfects surface mould on non-porous surfaces but does not penetrate porous materials to eliminate the root structure (hyphae). Stachybotrys grows on cellulose-based materials (plasterboard, timber) where bleach cannot reach. Water in bleach solution can also add moisture and feed further mould growth. Professional remediation involves removing contaminated materials and treating the underlying substrate with penetrating antifungal agents rather than surface-only disinfection."),
            ("When should occupants vacate a property during black mould remediation?", "Occupants should vacate during active mould remediation work that involves demolition, HEPA vacuuming, and antifungal application. Children, pregnant women, the elderly, and immunocompromised individuals should not return until post-remediation air clearance testing is complete and spore counts meet IICRC S520:2025 clearance criteria. NRPG provides a clearance report before reoccupation."),
        ]
    },
    r"mould-remediation\carpet-mould": {
        "id": "carpet-mould-faq",
        "faqs": [
            ("Can mouldy carpet be cleaned or does it need to be replaced?", "Carpet that has been wet for more than 24-48 hours with Category 1 (clean) water and shows early surface mould may be restorable with professional extraction, antifungal treatment, and drying. Carpet wet with Category 2 or 3 water (grey or black water) cannot be decontaminated to a safe standard and must be disposed of. Carpet that has developed mould through the backing and underlay is not restorable regardless of water category and requires full removal."),
            ("How do you remove mould from carpet safely?", "NRPG technicians use containment to prevent spore spread, HEPA vacuuming of the surface, truck-mounted extraction with antifungal solution, and high-velocity drying. If the mould has penetrated the backing or underlay, the carpet is removed and disposed of as biological waste. The subfloor is treated with antifungal before new flooring is installed."),
            ("Is mouldy carpet covered by insurance?", "Carpet mould following a water damage event (burst pipe, flood, roof leak) that is a covered loss is claimable under home or contents insurance. The key factors are the cause of the water event and whether the response was timely. Mould resulting from delayed drying or pre-existing moisture problems may not be covered. We document the incident timeline, cause, and drying response to support your claim."),
        ]
    },
    r"mould-remediation\commercial-mould": {
        "id": "commercial-mould-faq",
        "faqs": [
            ("What are an employer\'s obligations when mould is found in a commercial workplace?", "Under the Work Health and Safety Act 2011 (Cth) and state equivalents, employers must provide a safe working environment. Discovery of significant mould in a workplace triggers a duty to assess the risk, control the hazard, and notify affected workers. The property may need to be partially or fully vacated during remediation. NRPG provides IICRC S520:2025-compliant clearance documentation required for WorkSafe and WHS compliance."),
            ("How do you remediate mould in a commercial building without closing the business?", "NRPG establishes containment zones with negative air pressure to isolate affected areas from operational spaces. HEPA air scrubbers maintain air quality in occupied zones. Intensive work is scheduled outside business hours. A staged remediation plan allows operations to continue in unaffected areas. The business continuity approach is developed with your facilities and WHS teams before work commences."),
            ("What documentation do insurers require for commercial mould claims?", "Commercial insurers require: IICRC S520:2025 certified assessment report with identified moisture source; scope of works with line-item costings; photographic evidence of extent and severity; moisture readings pre- and post-remediation; air quality test results; and clearance report post-remediation. NRPG provides all required documentation in insurer-ready format to expedite claim approval."),
        ]
    },
    r"mould-remediation\crawl-space-mould": {
        "id": "crawl-space-mould-faq",
        "faqs": [
            ("Why do crawl spaces develop mould and what damage does it cause?", "Crawl spaces develop mould because they combine three conditions for mould growth: organic material (timber floor joists, bearer, blocking), moisture (rising damp from soil, plumbing leaks, surface water ingress), and poor ventilation. Mould in crawl spaces affects the structural integrity of floor framing over time and generates spores that rise through the floor into living areas, degrading indoor air quality throughout the property."),
            ("How is crawl space mould remediated?", "Crawl space remediation involves: removing contaminated insulation batts; HEPA vacuuming of all affected timber surfaces; treatment of floor framing with penetrating antifungal agent; addressing the moisture source (French drain installation, vapour barrier, improved subfloor ventilation); and air clearance testing post-treatment. In severe cases, structurally compromised timber elements require replacement before the crawl space is resealed."),
            ("Is crawl space mould covered by home insurance?", "Mould resulting from a sudden water event (burst pipe, flash flooding) is typically covered. Mould from rising damp — a gradual moisture accumulation — is generally treated as a maintenance issue and excluded. We conduct a causation assessment to document the moisture source and timeline, which informs how the claim is characterised. Cases involving a specific triggering event have the best coverage prospects."),
        ]
    },
    r"mould-remediation\hvac-mould": {
        "id": "hvac-mould-faq",
        "faqs": [
            ("Why does mould grow in HVAC and air conditioning systems?", "HVAC systems accumulate mould when: condensate drain pans overflow or block; cooling coils operate in humid conditions without adequate drainage; return air filters are not regularly replaced; ductwork has moisture ingress from roof leaks or condensation on uninsulated ducts in humid climates; or systems are shut down for extended periods in warm humid conditions. Mould in HVAC systems distributes spores throughout all connected spaces every time the system operates."),
            ("Can an HVAC system be cleaned after mould or does it need full replacement?", "Many HVAC systems can be professionally cleaned and decontaminated without full replacement. NRPG coordinates HVAC mould remediation involving: replacement of contaminated filters and drain pan; coil cleaning with antifungal solution; duct inspection via camera; and HEPA vacuuming of accessible ductwork. If ductwork is severely contaminated or has penetrations allowing moisture ingress, replacement of affected duct sections is required. Post-remediation air quality testing confirms clearance."),
            ("Should I turn off my air conditioning if I suspect HVAC mould?", "Yes. Stop operating the system immediately — continued use distributes mould spores to all connected rooms. Do not run the system again until a qualified HVAC technician and mould remediation contractor have assessed it. We recommend scheduling an indoor air quality test alongside the HVAC inspection to establish baseline spore counts before and after remediation."),
        ]
    },
    r"mould-remediation\timber-mould": {
        "id": "timber-mould-faq",
        "faqs": [
            ("Can timber framing be saved after mould growth or does it need replacement?", "Timber framing affected by surface mould — where mould has not penetrated deeply into the wood grain — can typically be treated and retained. NRPG uses HEPA vacuuming, sanding, and penetrating antifungal treatment to remediate surface mould on structural timber. Timber with deep mould penetration, fungal decay, or structural compromise from wood rot must be replaced. A structural assessment determines which elements are restorable."),
            ("How do you treat mould on exposed timber beams and floorboards?", "Exposed decorative or structural timber is treated with dry ice blasting, HEPA vacuuming, and penetrating antifungal treatment in preference to wet chemical methods that add moisture. Staining from mould is addressed with light sanding and re-finishing after treatment is complete and the timber is confirmed dry. We assess whether mould penetration has damaged the timber\'s surface integrity before recommending a finishing approach."),
            ("What moisture content is acceptable in timber after mould remediation?", "IICRC S520:2025 and IICRC S500:2025 require timber to reach equilibrium moisture content (EMC) for the local climate before remediation is considered complete — typically 10-16% for Australian conditions. We take moisture readings at each visit during the drying phase and only certify timber as dry when readings are within the target range. Premature encapsulation of wet timber causes mould recurrence."),
        ]
    },
    r"mould-remediation\wall-cavity-mould": {
        "id": "wall-cavity-mould-faq",
        "faqs": [
            ("How do you detect mould inside wall cavities without opening the wall?", "NRPG uses thermal imaging cameras to identify moisture pockets and cold spots that indicate condensation or water infiltration behind wall linings. Boroscope cameras can be inserted through small access holes to inspect cavity conditions without full demolition. Elevated moisture readings on the wall surface using a non-invasive moisture meter indicate likely cavity contamination. Where cavity mould is confirmed, targeted deconstruction is required for remediation."),
            ("Does wall cavity mould always require opening the wall?", "Yes. Mould inside a wall cavity cannot be effectively treated without opening the wall to access the contamination. Fogging or spraying antifungal through small holes does not achieve adequate surface contact with mould growing on cavity-facing surfaces. IICRC S520:2025 requires physical access to contaminated surfaces for proper remediation. We minimise demolition scope with targeted access panels rather than full wall removal wherever possible."),
            ("What causes mould to grow inside wall cavities?", "Wall cavity mould is caused by: plumbing leaks from within the wall (pipe joints, shower recess waterproofing failures); roof and gutter leaks tracking down wall framing; window frame condensation and seal failures; rising damp in masonry walls; and condensation on vapour barriers in poorly detailed construction. The moisture source must be identified and rectified — mould will recur if the cavity remains wet after treatment."),
        ]
    },

    # ── SEWAGE-CLEANUP ────────────────────────────────────────────────────────
    r"sewage-cleanup\basement-sewage": {
        "id": "basement-sewage-faq",
        "faqs": [
            ("What category of water is sewage in a basement?", "Sewage is Category 3 (black water) — the highest contamination category under IICRC S500:2025. It contains bacteria (E. coli, Salmonella), viruses (Hepatitis A, Norovirus), and parasites (Cryptosporidium, Giardia). Do not enter a sewage-flooded basement without full PPE. Do not operate electrical appliances or switches. All porous materials in contact with black water must be removed and disposed of — they cannot be adequately decontaminated."),
            ("How quickly must sewage cleanup begin in a basement?", "Immediately. Category 3 water begins degrading structural materials within hours and creates ideal conditions for mould growth within 24-48 hours. The health risk to occupants increases with every hour sewage remains in the space. NRPG provides 24/7 emergency sewage extraction. All work follows IICRC S500:2025 — extraction, decontamination, structural drying, and clearance testing in sequence."),
            ("Can basement contents be saved after a sewage backup?", "Non-porous items — metal tools, sealed appliances, glass, sealed plastic containers — can typically be decontaminated. All porous materials that were in direct contact with sewage (cardboard, timber furniture, rugs, clothing, paper) must be disposed of as contaminated waste. We conduct a contents assessment and document all disposed items for your insurance claim."),
        ]
    },
    r"sewage-cleanup\black-water-cleanup": {
        "id": "black-water-faq",
        "faqs": [
            ("What is black water and why is it the most dangerous water category?", "Black water (Category 3 water under IICRC S500:2025) is water that is grossly contaminated with pathogenic organisms — sewage, floodwater containing agricultural or industrial runoff, seawater, and water that has been standing long enough that bacteria have multiplied to dangerous levels. It contains enteric pathogens capable of causing serious illness. All porous materials in contact with black water must be removed. All non-porous surfaces require clinical-grade disinfection."),
            ("What PPE is required for black water cleanup?", "Black water cleanup requires Class P2 or P3 respiratory protection, full disposable coveralls, chemical-resistant gloves (double-gloving recommended), and waterproof boots. Eye protection (goggles, not safety glasses) prevents splash exposure. Skin wounds must be covered with waterproof dressings. All PPE is disposed of as biological waste after use. Vaccination against Hepatitis A and Tetanus is recommended for technicians working regularly with Category 3 water."),
            ("What surfaces can be saved after black water exposure?", "Concrete, ceramic tiles, steel, and other non-porous sealed surfaces can be decontaminated with appropriate hospital-grade disinfectants and EPA-registered biocides if cleaned within 24-48 hours. All porous materials — carpet, plasterboard, timber (except sealed or painted surfaces at the extreme non-porous end), insulation, and particleboard — must be removed and disposed of. Structural timber in contact with Category 3 water is assessed individually."),
        ]
    },
    r"sewage-cleanup\commercial-sewage": {
        "id": "commercial-sewage-faq",
        "faqs": [
            ("What are the immediate obligations for a business after a sewage event?", "The business must: evacuate the affected area immediately; turn off electricity to the zone if safe to do so; contact an emergency sewage remediation contractor; notify the building owner or strata manager; and in food service or healthcare settings, notify the relevant regulatory authority (local council environmental health, health department). Employees must not re-enter until the space is certified safe. Workers\' compensation obligations apply if employees are exposed."),
            ("How do you remediate commercial sewage while minimising business disruption?", "NRPG establishes containment barriers and deploys extraction and drying equipment to limit the affected zone. Unaffected areas of the premises remain operational where structurally and safety-wise possible. Intensive remediation work is scheduled outside trading hours. We provide documentation for your property manager, insurer, and any regulatory authority requiring evidence of professional remediation."),
            ("Can a commercial kitchen or food service area be returned to use after sewage backup?", "Yes, but only after: professional extraction and decontamination of all affected surfaces; disposal of all food, packaging, and consumables in the contaminated area; clearance testing meeting food safety authority standards; and inspection and clearance by your local council environmental health officer. We provide IICRC-certified clearance documentation to support your regulatory reinspection and business reopening."),
        ]
    },
    r"sewage-cleanup\grease-trap-overflow": {
        "id": "grease-trap-faq",
        "faqs": [
            ("What is a grease trap overflow and what contamination risks does it create?", "A grease trap overflow occurs when the grease interceptor in a commercial kitchen is full or blocked, causing FOG (fats, oils, and grease) and wastewater to back up into the kitchen floor drains, plumbing fixtures, or across the floor. Grease trap overflow is Category 2-3 contamination (grey-black water) — it contains food waste bacteria, pathogens, and high BOD (biological oxygen demand) that degrades surfaces and creates health risks."),
            ("Does a grease trap overflow require council notification?", "In most Australian states and territories, grease trap overflows that discharge to the street, stormwater drains, or waterways must be reported to the local council and potentially the environmental protection authority. Discharge to sewerage is less critical but still a reportable incident in some jurisdictions. NRPG provides incident documentation to assist with your regulatory notification."),
            ("How is a commercial kitchen restored after a grease trap overflow?", "Restoration involves: extraction of grease-contaminated wastewater; removal of all food products in contact with overflow; high-pressure hot water washing of all affected surfaces with degreaser; hospital-grade disinfection; floor drain cleaning; and air quality verification. The grease trap must be professionally serviced and cleared before the kitchen resumes operation. We recommend a council environmental health clearance before reopening food service operations."),
        ]
    },
    r"sewage-cleanup\grey-water-cleanup": {
        "id": "grey-water-faq",
        "faqs": [
            ("What is grey water and does it require professional cleanup?", "Grey water (Category 2 water under IICRC S500:2025) is wastewater from washing machines, dishwashers, shower and bath drains, and hand basin drains — not toilet waste. It contains soap residues, bacteria, and biological matter that poses a health risk but is less severe than sewage (Category 3). While less hazardous than black water, grey water affecting building materials still requires professional extraction, antimicrobial treatment, and structural drying to prevent mould and secondary contamination."),
            ("Can grey water become black water?", "Yes. Category 2 (grey water) degrades to Category 3 (black water) after 24-72 hours as bacteria multiply in the warm wet environment. The longer grey water sits in building materials, the more contaminated it becomes. This is why rapid extraction and drying are critical even for grey water events — delayed response turns a Category 2 remediation into a Category 3 job with significantly higher cost and more extensive material disposal requirements."),
            ("What grey water sources most commonly cause building damage?", "The most common grey water damage sources in Australian homes are: washing machine supply hose failure (typically a sudden, high-volume flood); dishwasher overflow or door seal failure; shower hob failure or waterproofing breakdown; and overflow of the bath or hand basin due to a blocked drain. Washing machine supply hoses have an expected lifespan of 5-10 years — stainless braided hoses significantly reduce failure risk."),
        ]
    },
    r"sewage-cleanup\main-line-backup": {
        "id": "main-line-backup-faq",
        "faqs": [
            ("What causes a main sewer line backup?", "Main sewer line backups are caused by: tree root intrusion into clay or PVC pipes; collapsed or cracked pipe sections; grease and solid material accumulation; offset pipe joints from ground movement; and during heavy rainfall, surcharging of council sewer mains that causes wastewater to backflow into private properties through the lowest drain point. Properties without a backflow prevention valve (reflux valve) on the sewer connection are most vulnerable during storm events."),
            ("Who is responsible for repairing a main line sewer backup — the property owner or the council?", "The sewer lateral (the pipe from your property boundary to the main) is the property owner\'s responsibility. The main sewer (in the street) is the council or water authority\'s responsibility. If the backup was caused by a surcharging council main, you may have a claim against the council. NRPG documents the sewage ingress point and cause to assist you in determining liability and making the appropriate claim."),
            ("How do you prevent future main line sewer backups?", "Prevention measures include: installation of a reflux (backflow prevention) valve on the sewer lateral; CCTV inspection of the sewer lateral to identify root intrusion or pipe damage before failure; regular high-pressure jet cleaning of the lateral; and avoiding disposal of fats, oils, and grease down kitchen drains. NRPG can arrange CCTV sewer inspection and coordinate plumbing rectification works as part of the post-cleanup scope."),
        ]
    },
    r"sewage-cleanup\septic-overflow": {
        "id": "septic-overflow-faq",
        "faqs": [
            ("What causes a septic system to overflow?", "Septic system overflows are caused by: tank reaching capacity (requiring pump-out); excessive water use overwhelming the tank and leach field; blocked inlet or outlet baffles; leach field failure due to saturation, root intrusion, or biomat accumulation; and damaged or cracked tank allowing groundwater ingress. In rural properties after heavy rain, saturated soils around the leach field prevent absorption, causing sewage to surface."),
            ("Is a septic overflow a health emergency?", "Yes. Septic overflow involves Category 3 (black water) contamination containing human pathogens. Surface overflow on a property presents a direct health risk to occupants and a serious risk to groundwater, waterways, and neighbouring properties. Contact a licensed plumber and wastewater contractor immediately. In most states, uncontrolled sewage discharge is a regulatory breach — contact your local council or EPA."),
            ("Is septic overflow damage covered by home insurance?", "Coverage depends on the cause. Sudden and accidental septic system failure — such as a tank collapse or unexpected leach field failure — may be covered under home insurance. Overflow from a full tank that was not maintained is generally excluded as a maintenance issue. NRPG provides causation assessment and documentation to support your claim and assist in determining whether a sudden failure event has occurred."),
        ]
    },
    r"sewage-cleanup\sewage-decontamination": {
        "id": "sewage-decontamination-faq",
        "faqs": [
            ("What does complete sewage decontamination involve?", "Complete sewage decontamination following a Category 3 water event involves: extraction of all standing sewage; removal and disposal of all porous materials in contact with sewage (carpet, plasterboard, insulation, skirting boards, cabinetry with particleboard substrate); HEPA vacuuming of all solid waste residue; hot-pressure washing of hard surfaces; application of EPA-registered hospital-grade biocide to all affected surfaces; structural drying of the space; and post-remediation ATP and microbial testing to verify clearance."),
            ("How long does sewage decontamination take?", "A single-bathroom sewage backup typically takes 1-3 days for extraction, decontamination, and initial drying. A basement or multiple-room sewage event takes 3-7 days. Structural drying continues for 3-5 days after decontamination. Total project duration from sewage event to clearance certification is typically 5-10 business days depending on scope and insurance approval timelines."),
            ("Can I return to the property during sewage decontamination?", "Occupants — particularly children, elderly, and immunocompromised individuals — should not be present during active sewage decontamination. The area must be cleared and air tested before reoccupation. In whole-property sewage events, temporary accommodation is necessary. Most insurers will cover temporary accommodation costs for a property rendered uninhabitable by a sewage event."),
        ]
    },
    r"sewage-cleanup\storm-drain-backup": {
        "id": "storm-drain-backup-faq",
        "faqs": [
            ("Why do storm drains back up during heavy rain and what enters a property?", "During intense rainfall, stormwater volumes exceed the capacity of council stormwater infrastructure. Surcharging stormwater drains cause water to back up through low-lying floor drains, downpipe connections, and property stormwater outlets. Stormwater backflow is classified as Category 3 (black water) because it contains sediment, agricultural runoff, animal waste, industrial chemicals, and microorganisms from the catchment — it is not clean water despite originating as rain."),
            ("How do you protect against future storm drain backups?", "Protection measures include: installation of stormwater backflow prevention valves on all property drain connections to the council system; raising floor drain outlets above the property\'s flood level; improving surface drainage to direct water away from the building perimeter; and considering a sump pump system for basements or below-grade areas. NRPG can advise on appropriate flood mitigation measures as part of the post-event assessment."),
            ("Is storm drain backup damage covered by home insurance?", "Stormwater and storm surge damage is covered under most Australian storm damage insurance policies. The key factor is whether the event was caused by a sudden storm — which it typically is. Check your PDS for flood versus storm exclusions, as some policies distinguish between riverine flooding and stormwater inundation. We provide incident documentation including storm date, rainfall data, and ingress point to support your claim."),
        ]
    },
    r"sewage-cleanup\toilet-backup": {
        "id": "toilet-backup-faq",
        "faqs": [
            ("Why does a toilet backup into a bath or floor drain in other bathrooms?", "When the main sewer lateral is blocked downstream, backpressure causes sewage to emerge from the lowest available drain point — typically a bath drain, floor waste, or second toilet. This indicates a blockage in the main lateral or at the connection to the council sewer, not a single fixture problem. High-pressure water jetting of the main lateral is required. Standard plunging of individual fixtures will not resolve a main line blockage."),
            ("What should I do immediately after a sewage toilet backup?", "Stop using all plumbing fixtures in the property immediately — flushing or running water worsens the backup. Do not use a mop or standard wet vacuum — these spread contaminated water and are not safe for Category 3 contamination. Ventilate the area. Call a licensed plumber for emergency drain clearing and an IICRC-certified restoration contractor for extraction and decontamination. Photograph all affected areas before cleanup begins."),
            ("Is toilet backup damage covered by insurance?", "Yes. Sudden sewage backup or overflow is covered under most Australian home insurance policies. Contents damaged by sewage — flooring, cabinetry, soft furnishings — are claimable under home and contents insurance. The key is acting promptly: delays in extraction increase the scope of damage and may attract scrutiny from the insurer regarding whether preventive action was taken. NRPG\'s emergency response documentation protects your claim."),
        ]
    },

    # ── STORM-DAMAGE ──────────────────────────────────────────────────────────
    r"storm-damage\cyclone-damage": {
        "id": "cyclone-damage-faq",
        "faqs": [
            ("What types of damage does a cyclone cause to buildings?", "Cyclones cause wind damage (roof sheet failure, cladding loss, window and door failures), water ingress through breached envelopes, storm surge flooding in coastal areas, structural damage from uplift forces on roofs, impact damage from flying debris, and flash flooding from extreme rainfall. Damage occurs simultaneously across multiple building systems — roof, structural frame, electrical, and contents — requiring a coordinated multi-trade restoration approach."),
            ("When is it safe to inspect cyclone damage after the event?", "Only re-enter a cyclone-damaged property once emergency services confirm the area is clear and the all-clear has been issued. Inspect for structural damage, downed powerlines, and gas leaks before entering. Do not enter if the roof or walls appear compromised. Take photographs of all damage immediately after entering. The ATO and state governments maintain disaster assistance portals for cyclone-affected areas."),
            ("How does insurance respond to cyclone damage?", "Cyclone damage — both wind damage and storm surge/rainfall flooding — is covered under most Australian home and business insurance policies if the event is classified as a named cyclone or declared natural disaster. Some policies distinguish between wind and flood damage, so review your PDS carefully. Insurer catastrophe response teams are typically deployed after major cyclone events to expedite assessments. File your claim and lodge your NRPG emergency make-safe documentation as quickly as possible after the event."),
        ]
    },
    r"storm-damage\fence-storm-damage": {
        "id": "fence-storm-faq",
        "faqs": [
            ("Is a storm-damaged fence covered by home insurance?", "Yes. Most Australian home insurance policies cover sudden storm damage to fences as part of the structures or outbuildings coverage. The storm event must be the direct cause of damage — pre-existing fence deterioration or poor maintenance may be excluded. Colorbond and timber pool fences that fall due to wind uplift are the most common storm fence claim type. Photograph the fence damage and any storm evidence (fallen branches, debris) immediately."),
            ("Who is responsible for a shared fence damaged by a storm?", "Under state Fencing Acts, boundary fence costs are generally shared equally between adjoining owners. Where one property\'s tree has fallen and caused the fence damage, the tree owner may bear greater liability. NRPG provides an assessment report that documents the cause and scope of damage, which assists with negotiations between neighbours and respective insurers."),
            ("How quickly can a storm-damaged fence be repaired or replaced?", "Temporary make-safe (securing the damaged fence to prevent hazard) is completed within 24-48 hours. Permanent fence replacement typically takes 3-7 days after scope confirmation and material procurement. Pool fences are prioritised due to child safety obligations — Australian Standard AS1926.1 pool barrier compliance must be maintained throughout the make-safe and repair process."),
        ]
    },
    r"storm-damage\flood-damage-restoration": {
        "id": "storm-flood-restoration-faq",
        "faqs": [
            ("What is the difference between storm flooding and riverine flooding for insurance purposes?", "Most Australian insurance policies distinguish between stormwater inundation (flash flooding from extreme rainfall overwhelming drainage systems) and riverine flooding (rising water levels from overflowing rivers and creeks). Standard policies typically cover storm flooding; flood cover for riverine flooding is often a separate add-on or available only through specific flood policies. Check your PDS carefully and lodge your claim with the correct classification."),
            ("What are the immediate steps after a property floods from storm runoff?", "Only re-enter once the water level has receded and the property is confirmed structurally safe. Turn off electricity at the mains before entering (do not do this from inside the property if you must stand in water). Photograph all damage. Do not use generators inside. Open windows and doors to ventilate. Contact your insurer to register the claim and call NRPG for emergency water extraction and make-safe."),
            ("How long does storm flood damage restoration take?", "A single-storey residential property with moderate storm flooding (under 300mm water level, Category 1 water, affected for less than 24 hours) typically requires 2-4 weeks for complete restoration including drying, material replacement, and reinstatement. Properties with extensive flooding, Category 3 contamination, or significant structural damage require 6-16 weeks. Timeline is significantly affected by insurance approval speed."),
        ]
    },
    r"storm-damage\hail-damage-repair": {
        "id": "hail-damage-faq",
        "faqs": [
            ("What building elements are most vulnerable to hail damage?", "The most hail-vulnerable elements are: roof tiles (cracking and fracture), roof sheeting (denting on steel, cracking on fibreglass), skylights and polycarbonate roofing, gutters and downpipes, solar panels, air conditioning condensers, soft metal flashings, and painted cladding. Even hail that does not cause immediately visible structural damage can fracture roof tiles or crack coatings in ways that become water ingress paths in subsequent rain events."),
            ("How do you assess hail damage to a roof?", "NRPG conducts a systematic roof inspection using thermal imaging to identify areas of moisture ingress through cracked tiles or damaged flashings, combined with physical inspection of every roof element. Impact damage to tiles is identified by tapping (hollow sound indicates fracture). Roof sheeting dent mapping documents the extent and density of impact damage. This assessment forms the basis of the insurance scope."),
            ("Is hail damage always visible immediately or can it be hidden?", "Some hail damage is immediately visible (broken tiles, smashed skylights). Cracked tile glazing and hairline tile fractures may not be visible from ground level and only manifest as leaks during subsequent rain. Hail damage to solar panels often shows internally (delamination, microcracking) without obvious external damage but causes measurable power output loss. A professional post-hail inspection within 30 days of the event is recommended for all properties in the hail path."),
        ]
    },
    r"storm-damage\lightning-damage": {
        "id": "lightning-damage-faq",
        "faqs": [
            ("What damage does a lightning strike cause to a property?", "A direct lightning strike or near-strike causes: electrical surge damage throughout the property\'s wiring and connected devices; fire at the strike point or in wiring within walls; structural damage at the strike point (chimney, roof apex, aerial); and induced voltage in telephone, data, and electrical cables causing downstream equipment failure. Lightning-induced surges cause appliance and electronics damage throughout a property even without a direct strike."),
            ("Are appliances damaged by lightning covered by home insurance?", "Yes. Lightning damage to appliances is covered under most Australian home and contents insurance policies as an accidental damage or electrical surge event. Document all affected appliances with model numbers, purchase receipts or valuations, and photographs. Some policies have sub-limits for surge damage or require a licensed electrician\'s report confirming the lightning cause. Do not discard any damaged items before insurer inspection or written permission."),
            ("Can lightning cause a fire inside a wall without it being immediately visible?", "Yes. Lightning can arc between wiring and timber framing inside wall cavities, igniting a slow-smouldering fire that may not break out for hours. Any property struck by lightning or near-strike should be inspected by emergency services for evidence of hidden fire and by a licensed electrician for electrical system integrity before the property is reoccupied. NRPG provides structural assessment for fire and heat damage following lightning events."),
        ]
    },
    r"storm-damage\storm-surge-damage": {
        "id": "storm-surge-faq",
        "faqs": [
            ("What is storm surge and how is it different from regular flooding?", "Storm surge is a rise in sea level caused by the low atmospheric pressure and onshore wind of a tropical cyclone or severe storm system. It produces a sudden inundation of seawater that is saltwater (not freshwater) and carries debris, sediment, and marine contamination. Storm surge damage is significantly more severe than freshwater flooding because salt accelerates corrosion of metals, concrete, and electrical systems, and saltwater is classified as Category 3 contamination regardless of its apparent cleanliness."),
            ("Does salt water damage require different restoration than freshwater flooding?", "Yes. Saltwater (storm surge) damage requires more aggressive and immediate intervention than freshwater flooding. Salt must be flushed from structural materials before drying commences — residual salt draws moisture back into dried materials. All metal fixings, reinforcement, and electrical infrastructure must be assessed for corrosion. Drying equipment must run at higher capacity due to elevated hygroscopic moisture load from salt residues."),
            ("Is storm surge damage covered by insurance?", "Storm surge coverage in Australian home insurance policies is complex — some policies include it under storm damage, others require separate flood or cyclone cover. Storm surge events associated with declared cyclones are typically covered if cyclone cover is included. Review your PDS for storm surge-specific inclusions and exclusions. After a major storm surge event, government disaster assistance (AGDRP) may also be available."),
        ]
    },
    r"storm-damage\tornado-damage": {
        "id": "tornado-damage-faq",
        "faqs": [
            ("Do tornadoes occur in Australia?", "Yes. Australia experiences tornadoes — referred to locally as \'willy-willies\' (dust devils) at the weak end and true tornadoes at the destructive end. Most Australian tornadoes are EF0-EF2 intensity. South-east Queensland, Western Australia\'s midwest, and parts of Victoria experience the highest tornado frequency. Damage patterns resemble cyclone damage but in a more localised path — intense roof and structural damage along a narrow corridor."),
            ("What makes tornado damage restoration different from general storm damage?", "Tornado damage is extremely localised and often involves significant structural damage including roof removal, wall collapse, and impact damage from high-velocity debris. The restoration approach must address structural engineering assessment first, before any cleaning or material removal, to ensure the remaining structure is safe to work in. NRPG coordinates structural engineers as part of the initial site assessment for tornado-affected properties."),
            ("How does insurance handle tornado damage versus cyclone damage?", "Tornado damage in Australia is covered under storm damage provisions in most home and business insurance policies. It does not require a cyclone declaration to be claimable — any sudden and extreme wind event causing structural damage is claimable as storm damage. Document the damage thoroughly with photographs from all angles immediately after the event and before any emergency repairs are made."),
        ]
    },
    r"storm-damage\tree-damage-cleanup": {
        "id": "tree-damage-faq",
        "faqs": [
            ("A tree fell on my house — what do I do first?", "Ensure everyone is safe and evacuate the affected area if the structural integrity is uncertain. Do not re-enter rooms where the tree has penetrated — roof sections may be unstable. Turn off electricity and gas at the mains if it is safe to do so. Call emergency services if the tree has caused gas leaks, downed powerlines, or immediate structural danger. Photograph all damage before any cleanup begins, then call your insurer and an emergency make-safe contractor."),
            ("Who is responsible if a neighbour\'s tree falls on my property?", "In most Australian states and territories, liability depends on whether the tree owner knew or should have known the tree was a risk (diseased, dead, or previously reported). If the neighbour had no knowledge of any defect, the damage falls on the property owner\'s insurance as a sudden and accidental event. NRPG provides documentation of the damage and entry point, which supports both insurance claims and legal proceedings if liability is disputed."),
            ("Does insurance cover tree removal and structural repair after storm damage?", "Most Australian home insurance policies cover the cost of removing a tree that has fallen on an insured structure (roof, fence, wall) and the cost of repairing the resulting structural damage. Tree removal from the garden only (without structural impact) is generally not covered. Confirm with your insurer whether arborist costs for the fallen tree are included in your claim scope."),
        ]
    },
    r"storm-damage\wind-damage-repair": {
        "id": "wind-damage-faq",
        "faqs": [
            ("What wind speed causes structural damage to Australian homes?", "Sustained winds above 90 km/h begin causing damage to roof cladding and fencing. At 120 km/h, tile loss and partial roof sheeting uplift occurs. At 160+ km/h (cyclone intensity), significant structural failure of standard construction occurs. Australian Standard AS4055 classifies wind regions (N1-N6 for non-cyclonic, C1-C4 for cyclonic) — properties built to the correct wind class for their region have significantly better storm performance than older or non-compliant buildings."),
            ("Can wind-lifted roof sections be repaired or do they need full replacement?", "Partial roof repairs are often possible for limited sheeting or tile loss. However, if wind uplift has displaced multiple rows of tiles or sheeting sections, or if the underlying sarking and insulation have been water-damaged, a more extensive roof restoration is warranted. NRPG assesses whether spot repairs are sufficient or whether a full roof restoration better serves the property\'s long-term waterproofing integrity and insurance claim value."),
            ("Is wind damage always covered by home insurance?", "Wind damage from a sudden storm event is covered by most Australian home insurance policies. Wind damage due to normal wear and pre-existing maintenance neglect (deteriorated roof fixings, rotted fascia) may be subject to exclusion. Our assessment documents the storm cause and distinguishes storm-caused damage from pre-existing conditions — this is critical for claims where the insurer seeks to apply a maintenance exclusion."),
        ]
    },
    r"storm-damage\window-storm-damage": {
        "id": "window-storm-faq",
        "faqs": [
            ("Should I cover broken storm windows with temporary boarding before the restoration contractor arrives?", "Yes — temporary boarding is critical. A broken window exposes the interior to further rain ingress, wind damage to contents, and wildlife and unauthorised entry. Use heavy-duty polythene sheeting or timber ply secured over the opening. Do not use single sheets of glass to replace broken panes temporarily — only safety glass or polycarbonate. NRPG can provide emergency boarding as part of storm make-safe, typically within 60-90 minutes."),
            ("Can impact-damaged window frames be repaired or do they need full replacement?", "Aluminium window frames that have been bent or racked by wind pressure or impact cannot be safely repaired — they must be replaced. Timber frames with minor damage may be repairable if the frame is structurally sound and weather-tight sealing can be re-established. In cyclone-rated areas, replacement windows must meet the wind load requirements for the cyclone design wind speed applicable to the location."),
            ("Is storm window damage covered by insurance?", "Yes. Window breakage and frame damage from a sudden storm event is covered under most Australian home and business insurance policies as a storm damage claim. Contents damage from subsequent rain entry through broken windows is also claimable. Make-safe boarding costs are claimable as emergency make-safe expenses. Document all damage with photographs before boarding and before any glass disposal."),
        ]
    },

    # ── WATER-DAMAGE ──────────────────────────────────────────────────────────
    r"water-damage\basement-flooding": {
        "id": "basement-flooding-faq",
        "faqs": [
            ("How quickly does basement flooding damage building materials?", "Concrete absorbs water slowly but connected timber elements — floor joists, bearer, stud walls — begin absorbing moisture within hours. After 24-48 hours, mould can begin growing on wet timber and plasterboard. Electrical systems submerged in basement flooding must be de-energised and inspected before any power is restored. IICRC S500:2025 requires structural drying to begin as soon as extraction is complete — not after insurance approval."),
            ("What causes basement flooding in Australian homes?", "Common causes include: surface water ingress through window wells and door thresholds during heavy rain; groundwater rising through the floor slab (hydrostatic pressure); plumbing failures inside the basement; and blocked or failed sump pumps. Properties in low-lying areas or with high water tables are at greatest risk. Waterproofing failures in basement walls and slabs are a common cause in older construction."),
            ("Can a flooded basement be self-dried with fans and a consumer dehumidifier?", "No. Consumer dehumidifiers and box fans do not have the capacity to dry structural materials in a flooded basement. They may reduce surface moisture but leave deep moisture in the slab, wall footings, and framing. This results in mould growth within weeks. Commercial desiccant dehumidifiers and high-velocity air movers are required. NRPG calculates the equipment capacity needed using psychrometric analysis of the actual space volume and material moisture content."),
        ]
    },
    r"water-damage\burst-pipes": {
        "id": "burst-pipes-faq",
        "faqs": [
            ("How much water damage can a burst pipe cause in one hour?", "A 20mm domestic supply pipe running at 400kPa mains pressure can discharge 1,000-2,000 litres per hour. In one hour undetected, this saturates subfloors, wall cavities, and ceilings across multiple rooms. A flexible braided appliance hose failure — the most common cause of severe domestic water damage in Australia — can empty a home\'s entire water supply into the building before anyone notices. Every minute counts."),
            ("Why do hot water system and appliance hoses burst?", "Flexible braided hoses connecting dishwashers, washing machines, and under-sink plumbing have a finite lifespan of 5-10 years. The inner rubber tube degrades and can fail without visible external warning. Stainless braided hoses with an inner EPDM tube are significantly more reliable than PVC inner hoses. Annual inspection and replacement every 10 years is the recommended maintenance standard. Old chrome or copper compression fittings are also common failure points."),
            ("Should I try to mop up a burst pipe flood myself before the restoration team arrives?", "Yes — remove as much standing water as possible using mops, towels, and buckets. This reduces secondary damage and makes the restoration team\'s job faster. Do not use a standard wet/dry shop vacuum unless it is specifically rated for water recovery. Do not use electrical equipment in rooms with standing water. Leave wall cavities and subfloor drying to the professionals — consumer equipment cannot achieve the drying needed for structural materials."),
        ]
    },
    r"water-damage\ceiling-water-damage": {
        "id": "ceiling-water-faq",
        "faqs": [
            ("Is a wet or bulging ceiling dangerous?", "Yes. A water-saturated plasterboard ceiling is at risk of sudden collapse. The weight of retained water can cause the ceiling to fail without warning. Do not stand under a bulging ceiling. If safe to do so, place a bucket and carefully make a small hole in the lowest point of the bulge to release water in a controlled manner rather than risking sudden collapse. Evacuate the area and contact an emergency make-safe contractor."),
            ("What causes ceiling water damage?", "The most common causes in Australian properties are: roof leaks (cracked or displaced tiles, deteriorated flashing, failed skylights); burst or leaking plumbing in the ceiling space (bathroom above, roof-space hot water system or solar thermal); blocked gutters causing overflow under the eaves; and air conditioning condensate drain blockages. The cause must be identified and rectified before ceiling repairs — repairing the ceiling without fixing the source guarantees recurrence."),
            ("Can water-damaged plasterboard ceilings be dried and retained or do they need replacement?", "Wet plasterboard loses approximately 50% of its structural strength when saturated and does not return to full strength after drying. Plasterboard that has been wet for more than 24 hours, has delaminated, shows sagging or cracking, or is confirmed to have mould penetration must be replaced. Minor surface staining on plasterboard that dried rapidly (within 24 hours) and has not lost structural integrity may be retained after antimicrobial treatment and painting with stain-blocking primer."),
        ]
    },
    r"water-damage\concrete-water-damage": {
        "id": "concrete-water-faq",
        "faqs": [
            ("How does water damage affect concrete and how long does concrete take to dry?", "Concrete is porous and absorbs water into its matrix, reducing compressive strength, promoting rebar corrosion, and supporting mould growth on the surface. Concrete slabs in contact with floodwater take significantly longer to dry than timber or plasterboard — a standard 100mm concrete slab can take 30-90 days to reach equilibrium moisture content after saturation. Desiccant dehumidifiers with floor mats accelerate drying, but flooring cannot be reinstated until the slab is fully dry."),
            ("Can flooring be installed over a wet concrete slab after flooding?", "No. Installing timber, engineered timber, vinyl planks, or carpet over a wet slab causes immediate moisture damage to the new floor covering and creates the ideal conditions for mould growth between the slab and the floor. A moisture vapour emission rate (MVER) test or concrete relative humidity test must confirm the slab is within tolerance (typically below 75-80% RH in-slab) before any non-breathable floor covering is installed. Tile and grout can be installed over a moderately damp slab with appropriate moisture tolerant adhesives."),
            ("Does flood-damaged concrete need to be replaced?", "Rarely. Concrete that has been structurally sound prior to flooding and does not show cracking, spalling, or significant rebar corrosion does not need replacement — it needs drying and, in some cases, surface preparation before reinstating floor coverings. Concrete that was structurally compromised before the flood (poor curing, inadequate reinforcement, significant pre-existing cracking) should be assessed by a structural engineer."),
        ]
    },
    r"water-damage\crawl-space-flooding": {
        "id": "crawl-space-flooding-faq",
        "faqs": [
            ("Why is crawl space flooding particularly dangerous for a home?", "Crawl space flooding threatens the structural integrity of the entire home — floor framing, bearer, and subfloor are continuously exposed to standing water and elevated humidity. Timber moisture content above 19% enables decay fungi; above 25% enables rapid mould growth and structural degradation. Crawl spaces are also inaccessible to standard drying equipment, requiring specialist low-profile equipment and potentially a vapour barrier installation after drying."),
            ("How do you extract water from a crawl space?", "Extraction involves deploying submersible pump in standing water, followed by trailer-mounted extraction equipment for residual water in the soil. Commercial desiccant dehumidifiers are then positioned with ducting into the crawl space, combined with air movers to circulate air through the timber structure. Moisture readings are taken at each visit until floor framing reaches equilibrium moisture content for the local climate."),
            ("Should a vapour barrier be installed in a crawl space after flooding?", "Yes — a vapour barrier (minimum 0.2mm polyethylene membrane) installed over the soil floor of a crawl space significantly reduces ongoing moisture vapour migration from the soil into the timber structure. After a flooding event, the barrier should only be installed after the soil and timber structure have been dried to acceptable moisture levels. NRPG assesses existing vapour barrier condition and installs or replaces as part of the crawl space restoration scope."),
        ]
    },
    r"water-damage\dishwasher-leaks": {
        "id": "dishwasher-leak-faq",
        "faqs": [
            ("What parts of a dishwasher are most likely to leak?", "The most common dishwasher leak sources are: the door seal (especially on older machines where the door gasket has hardened); the inlet water supply hose (flexible braided hose at the dishwasher connection or the undersink isolation valve); the drain hose connection to the waste trap; the pump and motor housing in older machines; and the detergent dispenser seal. Undersink water damage from a dishwasher supply hose is one of the most common causes of kitchen base cabinet water damage."),
            ("How much damage can an undetected dishwasher leak cause?", "A slow drip from a dishwasher supply hose inside the cabinet can saturate the particleboard base of the cabinet and the subfloor beneath within days, without any visible water on the floor. By the time the damage is noticed, particleboard has swollen and delaminated, the floor covering is damaged, and mould is growing in the cabinet base. If a hose fails completely during a wash cycle, the dishwasher\'s water intake (typically 6-15 litres per cycle) floods continuously until the supply is turned off."),
            ("Is dishwasher leak damage covered by home insurance?", "Yes. Sudden and accidental water damage from a leaking dishwasher is covered under most Australian home insurance policies. Gradual leaks from a slow drip that was not reported promptly may face scrutiny — insurers may apply a gradual damage exclusion if the damage is consistent with a long-standing slow leak rather than a sudden failure. Acting quickly on any sign of moisture under the dishwasher or in adjoining cabinets protects your claim."),
        ]
    },
    r"water-damage\garage-flooding": {
        "id": "garage-flooding-faq",
        "faqs": [
            ("What causes garages to flood and what damage results?", "Garages flood from: stormwater inundation through the door threshold (most common after heavy rain); surface drainage failure directing water into the garage; plumbing failure from a laundry or hot water system in the garage; and roof leaks. Damage includes water-damaged contents, flooring deterioration, particleboard or plasterboard wall lining damage, rust on metal shelving and stored vehicles, and potential mould if drying is delayed."),
            ("Do garages need professional drying after flooding or is it fine to let them air dry?", "A concrete garage floor typically dries adequately by air circulation if water exposure was brief (under a few hours) and the volume was limited. However, if water infiltrated internal wall linings, affected stored items, or reached the garage door bottom seal and frame, professional drying assessment is warranted. Any particleboard or plasterboard that absorbed water will not dry adequately without mechanical drying and will develop mould within weeks."),
            ("Is garage flooding covered by insurance?", "Yes. Garage flooding from a storm event or plumbing failure is covered under most Australian home insurance policies as part of the structures cover (for the garage) and contents cover (for items stored in the garage). Motor vehicles must be covered under a separate comprehensive motor vehicle policy. Items stored in an unattached garage may be subject to contents sub-limits — check your PDS."),
        ]
    },
    r"water-damage\hot-water-system-burst": {
        "id": "hot-water-burst-faq",
        "faqs": [
            ("How much water does a hot water system hold and how much damage can it cause?", "Australian domestic hot water systems hold between 50 litres (small electric) and 400 litres (large gas or heat pump storage systems). A failed storage unit can release its entire volume in minutes. Unlike mains pressure burst pipes, the release is a fixed volume — but 200-400 litres of scalding hot water in a roof space or laundry causes severe and immediate structural damage to flooring, ceiling, and adjacent wall cavities."),
            ("Why do hot water systems fail suddenly?", "Hot water system failures are caused by: relief valve activation due to excessive pressure or temperature (may drain continuously if valve sticks open); corrosion of the cylinder wall or sacrificial anode failure causing slow leaks that accelerate to failure; pipe fitting failure at the connections; and age-related cylinder failure (most storage systems have a 10-15 year lifespan). Annual anode inspection and replacement significantly extends service life and prevents sudden cylinder failure."),
            ("Does insurance cover burst hot water system damage?", "The water damage caused by a suddenly failed or burst hot water system is covered under most Australian home insurance policies. The hot water unit itself is generally not covered (it is considered a maintenance item). Make-safe and structural drying costs are claimable. Document the failed unit with photographs before it is removed — the failure mode (burst tank, failed valve, pipe connection failure) is relevant to the claim."),
        ]
    },
    r"water-damage\pool-leak-damage": {
        "id": "pool-leak-faq",
        "faqs": [
            ("How can I tell if my pool is leaking rather than just evaporating?", "The bucket test distinguishes pool leaks from evaporation: fill a bucket with pool water to the same level as the pool surface, place it on a pool step, and compare water level loss after 24 hours. If the pool loses more than the bucket, the pool is leaking. A pool typically loses 3-7mm per week to evaporation in Australian conditions — losses exceeding 15-20mm per week indicate a structural or plumbing leak."),
            ("What damage does a pool leak cause to surrounding property?", "A leaking pool gradually saturates the surrounding soil, causing subsidence under paths and paving, undermining fencing footings, and introducing moisture into adjacent building footings and subfloors. Pool plumbing buried underground can leak for months before the surface effects are noticed. In severe cases, pool leaks cause significant structural damage to the house if the pool is adjacent to the building."),
            ("Is pool leak damage covered by home insurance?", "The structural damage to paths, fencing, and building elements caused by a leaking pool may be claimable if the leak was sudden and accidental. Gradual pool leaks are typically excluded as maintenance issues. The pool itself (as a structure) may have specific coverage under your home insurance — check your PDS for pool inclusions. NRPG provides assessment and documentation of the resulting property damage to support your claim."),
        ]
    },
    r"water-damage\roof-leak-damage": {
        "id": "roof-leak-faq",
        "faqs": [
            ("Why do roof leaks appear inside a property in a different location from the actual roof fault?", "Water entering a roof cavity follows the roof framing and sarking until it finds a penetration point — typically a light fitting, ceiling cornice, or wall framing junction. The visible ceiling stain may be several metres from the actual roof entry point. This is why tracing the leak to the roof surface requires inspection of the roof space during or immediately after rain, not just external inspection from the ground."),
            ("How much roof damage is required before water penetrates the ceiling?", "Even minor tile cracking, lifting, or displaced ridge capping allows water ingress during driving rain. A single lifted roof tile over a sarking tear can allow hundreds of litres of water into the roof space during a prolonged rain event. Roof leaks are progressive — small initial entry points worsen with each subsequent rain, expanding the structural damage and increasing mould risk. Prompt repair after the first sign of a leak is always the lowest-cost outcome."),
            ("Is roof leak water damage covered by insurance?", "Yes. Water damage resulting from a sudden roof leak — caused by storm damage, hail, or sudden tile failure — is covered under most Australian home insurance policies. Damage resulting from a long-standing roof leak that went unrepaired may face a maintenance exclusion. The claim outcome often depends on whether there is evidence of sudden versus gradual damage. Our assessment documents the storm date, damage pattern, and moisture timeline to support the claim characterisation."),
        ]
    },
    r"water-damage\shower-leaks": {
        "id": "shower-leak-faq",
        "faqs": [
            ("What causes shower leaks and how do they damage the building?", "Shower leaks occur when: the shower base waterproofing membrane fails or is not adequately lapped; grout or silicone in the tiled enclosure cracks or deteriorates; the shower screen seals fail; or drain connections develop leaks under the shower floor. Water migrates through these failures into the substrate, wall framing, and subfloor. Because leaks occur slowly and are hidden, significant structural damage — wet timber framing, mould in wall cavities, subfloor damage — often accumulates over months before it becomes apparent."),
            ("How do you test for a shower leak?", "NRPG uses moisture meters and thermal imaging cameras to detect moisture in wall cavities and subfloor adjacent to the shower without demolition. A flood test (plugging the drain and filling the shower base for 24 hours) confirms whether the leak is from the base waterproofing or the shower plumbing. If significant moisture is detected, exploratory access into the wall cavity confirms the extent and nature of the damage."),
            ("Is shower leak damage covered by home insurance?", "This depends on whether the damage is classified as sudden or gradual. A sudden waterproofing failure causing rapid damage may be covered. A slow leak that has been present for years causing gradual structural degradation is generally excluded as a maintenance issue. We provide a moisture timeline assessment that documents how long the damage has been occurring, which is the key factor in claim determination."),
        ]
    },
    r"water-damage\toilet-overflow": {
        "id": "toilet-overflow-faq",
        "faqs": [
            ("What water category is a toilet overflow and what does that mean for cleanup?", "Toilet overflows are Category 2 or Category 3 depending on the source: an overflowing cistern (clean water) is Category 1; a toilet bowl overflow with toilet paper but no faecal matter is Category 2 (grey water); a sewage backup through the toilet bowl is Category 3 (black water). Category determines the cleanup protocol — Category 3 requires disposal of all porous materials in contact with the overflow and hospital-grade disinfection of all surfaces, per IICRC S500:2025."),
            ("How much damage can a running toilet cause if the overflow goes undetected overnight?", "A toilet cistern filling continuously (e.g., from a failed fill valve) can overflow at 6-15 litres per minute. Undetected overnight (8 hours), this equates to 2,800-7,200 litres — enough to saturate the entire bathroom floor, subfloor, and adjacent rooms. A running toilet that overflows a full cistern onto the floor is one of the most damaging domestic water events due to its continuous nature."),
            ("Is toilet overflow damage covered by insurance?", "Yes. Sudden and accidental toilet overflow damage is covered under most Australian home insurance policies. Both the structural damage (flooring, subfloor, cabinetry) and affected contents are claimable. Failed fill valves and faulty cistern mechanisms that cause overflows are considered sudden mechanical failures — not maintenance exclusions in most policies. Act immediately: delay increases the claim scope."),
        ]
    },
    r"water-damage\washing-machine-flooding": {
        "id": "washing-machine-flood-faq",
        "faqs": [
            ("Why do washing machines flood suddenly and what causes the most damage?", "Washing machine flooding is caused by: inlet hose failure (the single most common cause of major domestic flooding — rubber inlet hoses have a 5-10 year lifespan); door seal failure on front-loaders; pump or motor failure during a cycle; and blocked drainage causing the tub to overflow. Inlet hose failure is catastrophic because mains water pressure (up to 500kPa) runs continuously until the supply is isolated — the machine does not stop filling."),
            ("What should I do immediately when the washing machine floods?", "Turn off the water supply to the washing machine at the isolation valve (behind the machine or under the sink) immediately. If you cannot reach the isolation valve, turn off at the mains stopcock. Turn off the machine power. Remove washing and begin absorbing surface water with towels. Do not use the machine again until a plumber has inspected and replaced the faulty component. Call NRPG for extraction and assessment of structural moisture."),
            ("Is washing machine flood damage covered by home insurance?", "Yes. Sudden and accidental water damage from a leaking or flooding washing machine is covered under most Australian home insurance policies. The replacement cost of the washing machine itself is covered under contents insurance if it is damaged as part of the same event. Damage to neighbouring units (in a strata property) from a washing machine flood in your unit is covered under your liability provisions — notify the building manager and your insurer immediately."),
        ]
    },

    # ── SPECIALTY-SERVICES ────────────────────────────────────────────────────
    r"specialty-services\antique-restoration": {
        "id": "antique-restoration-faq",
        "faqs": [
            ("Can antique furniture be restored after water damage?", "Many antique furniture pieces can be restored after water damage if treated promptly. Solid timber construction responds better than veneered or laminated pieces. Immediate priorities are controlled slow drying (antiques must never be force-dried), gentle cleaning of water marks, and specialist re-finishing by a conservator. Joint weakening and veneer lifting are addressed with appropriate adhesives and clamping. Do not place antiques near heaters or in direct sun for rapid drying — this causes irreversible splitting and veneer loss."),
            ("How do you prevent antique furniture from warping after water damage?", "Controlled, slow drying is critical. Remove the piece from the wet environment immediately. Clean surface water gently with soft cloths — do not scrub. Store in a consistent temperature environment (ideally 18-22°C, 40-55% RH). Use weights or clamping to maintain shape during drying. Drawers should be removed for separate drying. Rapid or uneven drying is the primary cause of antique timber warping and joint failure."),
            ("Are antiques covered by home insurance after fire or water damage?", "Antiques require specialist valuation to be adequately covered. Most standard home insurance policies cover contents at replacement value, but antiques may be irreplaceable — a listed or separately insured schedule with an agreed value is preferable. We provide condition and treatment reports for antiques submitted for restoration that support your insurance claim and replacement value assessment."),
        ]
    },
    r"specialty-services\art-restoration": {
        "id": "art-restoration-faq",
        "faqs": [
            ("Can water-damaged artworks be restored?", "Many artworks can be stabilised and partially or fully restored by specialist conservators if treatment begins within hours. The key variables are the medium (oil on canvas is more resilient than watercolour on paper), the extent of water contact, whether the water was clean or contaminated, and how quickly treatment begins. Oil paintings on canvas soaked briefly with clean water have good restoration prospects. Watercolours and works on paper with extended water contact have much poorer prognosis."),
            ("What should I do immediately if artwork is water damaged?", "Remove the artwork from the wet environment immediately. Lay it flat (not upright) on a clean dry surface — do not lean a wet canvas against a wall as this causes deformation. Blot (do not wipe) surface water gently with clean white cotton cloths. Do not apply heat or place in direct sun. Contact a conservator or specialist restoration service within hours. Photographs of the damage condition before any treatment are essential for insurance and restoration records."),
            ("Is damaged art covered by home insurance?", "Artworks above a certain value typically require separate scheduling on a home insurance policy with a professionally assessed agreed value. Standard contents cover may include artworks up to a sub-limit (often $3,000-$5,000) which may be insufficient for significant pieces. We coordinate with specialist art insurance assessors and conservators, providing damage condition reports in the format insurers require for art damage claims."),
        ]
    },
    r"specialty-services\asbestos-water-damage": {
        "id": "asbestos-water-faq",
        "faqs": [
            ("When does water damage create an asbestos risk?", "Water damage creates an asbestos risk in any property built before 1987 (when asbestos use in building materials began to be restricted in Australia) if the water has damaged or disturbed asbestos-containing materials (ACM). Common ACM in older Australian homes include: fibro (flat or corrugated asbestos cement sheeting used in walls, eaves, and roofs), vinyl floor tiles, ceiling tiles, and pipe lagging. Undisturbed ACM that is wet but intact does not release fibres — the risk arises when ACM is damaged, crumbling, or disturbed by water entry."),
            ("Can water-damaged asbestos be repaired or does it always need removal?", "Intact, non-friable ACM (bonded asbestos cement) that has been water-damaged but not cracked or broken can sometimes be encapsulated rather than removed. Friable asbestos (crumbling, powdery, or damaged by water) must be removed by a licensed asbestos removalist under state regulations. NRPG engages licensed asbestos assessors to determine whether encapsulation or removal is required before any restoration work begins in affected areas."),
            ("Who pays for asbestos removal after a water damage event?", "Where asbestos removal is required as a direct consequence of a covered water damage event (storm, burst pipe, fire), the asbestos removal costs are generally claimable as part of the restoration scope. This includes both the asbestos removal cost and the disposal costs. NRPG provides a detailed scope that identifies ACM removal requirements within the restoration claim, supported by a licensed asbestos assessor\'s report."),
        ]
    },
    r"specialty-services\boat-water-damage": {
        "id": "boat-water-faq",
        "faqs": [
            ("What types of water damage affect boats most severely?", "Boats are most severely damaged by: bilge flooding from hull penetration, failed through-hulls, or sinking; storm damage to deck fittings and hatches causing below-decks flooding; freshwater ingress into navigation electronics and engine; and extended submersion causing corrosion of wiring, electronics, and engine components. Saltwater is significantly more damaging than freshwater — it corrodes electrical systems and mechanical components rapidly and requires immediate freshwater flushing."),
            ("Can a swamped or sunk boat be restored?", "Many boats can be restored after swamping or partial sinking if treatment begins within days. The engine must be immediately assessed by a marine mechanic — submersion causes hydrolocking and severe corrosion if not treated promptly. Upholstery, carpeting, and electrical systems typically require replacement. Navigation electronics may or may not be recoverable depending on submersion depth and duration. GRP (fibreglass) hulls are generally restorable; timber hulls require more extensive assessment."),
            ("Is boat water damage covered by marine insurance?", "Boat water damage from storm events, sinking, and accidental flooding is covered under most Australian recreational marine insurance policies. Cover depends on the vessel being appropriately maintained and operated within the policy conditions. NRPG provides condition and scope reports for marine insurance claims, working with your marine insurer\'s assessor to establish the restoration scope and claim value."),
        ]
    },
    r"specialty-services\caravan-water-damage": {
        "id": "caravan-water-faq",
        "faqs": [
            ("What types of water damage commonly affect caravans?", "Caravans are prone to: roof seal deterioration allowing water ingress around roof vents, skylights, and A/C units; window frame seal failures; body joint seal degradation; storm damage to the roof or slide-out; and plumbing fitting failures in the internal water system. Because caravan walls and ceilings are typically ply and composite construction, water ingress rapidly causes delamination, soft spots in the floor, and mould growth within wall cavities."),
            ("How do you detect hidden moisture damage in a caravan?", "NRPG uses non-invasive moisture meters and thermal imaging to map moisture within caravan wall panels, floor composite, and roof cavity without invasive opening. Soft spots in floors and walls indicate long-term moisture damage even if the surface appears sound. Moisture assessment before buying a second-hand caravan or during periodic maintenance is strongly recommended to identify hidden water ingress before it becomes structural damage."),
            ("Is caravan water damage covered by insurance?", "Yes. Water damage to a caravan from storm events, sudden leaks, or flooding is covered under most Australian caravan and motorhome insurance policies. Cover conditions typically require the caravan to be securely stored and maintained. Long-standing moisture damage from inadequate maintenance or unrepaired leaks may be excluded. NRPG provides causation and condition reports for caravan insurance claims."),
        ]
    },
    r"specialty-services\document-drying": {
        "id": "document-drying-faq",
        "faqs": [
            ("Can water-damaged documents be restored?", "Many water-damaged documents can be stabilised and partially or fully restored if treated within 24-72 hours. Photographs, books, archival records, legal documents, and business records can be freeze-dried (vacuum freeze drying) to halt biological deterioration and remove moisture without further physical damage. Severely degraded or disintegrated documents may not be recoverable, but even partially legible documents can often be photographically captured before further degradation."),
            ("What is the priority order for saving documents after a flood?", "Prioritise by replacement impossibility: irreplaceable originals (wills, property deeds, certificates, passports, historic photographs) first; then documents with business or legal significance; then documents with financial records. Do not attempt to open or unfold wet bound documents — this causes tearing. Stack flat and refrigerate (not freeze) wet papers to slow biological degradation while awaiting professional treatment. Photograph everything in wet condition for insurance documentation."),
            ("Is document restoration covered by insurance after water or fire damage?", "The cost of professionally drying and restoring documents and records damaged in a covered water or fire event is claimable under most Australian home and business insurance policies. Business interruption insurance may also cover the cost of recreating business records that cannot be restored. We provide treatment scope and outcome documentation for insurance submissions."),
        ]
    },
    r"specialty-services\electronics-water-damage": {
        "id": "electronics-water-faq",
        "faqs": [
            ("Can electronics be saved after water damage?", "Electronics recovery depends on three factors: whether the device was powered on during water exposure, the category of water (clean versus contaminated), and how quickly treatment begins. Unpowered electronics exposed briefly to clean water have reasonable recovery prospects if treated within hours. Powered electronics that short-circuited during exposure, or those exposed to saltwater or contaminated water, have much lower recovery rates. Do not attempt to power on a water-damaged device — this causes irreversible damage."),
            ("What should I do immediately with a water-damaged laptop or phone?", "Power off immediately if still on. Remove the battery if accessible. Do not shake, blow into, or use a hairdryer on the device. Remove SIM and memory cards and dry them separately. Place the device in a sealed bag with silica gel desiccant packets or in a warm (not hot) dry environment. Do not place in rice — this is ineffective and introduces starch particles into ports. Contact a specialist electronics recovery service within 24 hours."),
            ("Is electronics water damage covered by home insurance?", "Electronics damaged by a covered water event (burst pipe, storm flooding) are claimable under home contents insurance up to the policy\'s contents limits and any applicable electronics sub-limits. Accidental water damage to portable electronics (dropping a phone in water) is covered under policies with accidental damage cover — check your PDS. We provide a damage assessment for each item to support the insurance claim."),
        ]
    },
    r"specialty-services\piano-water-damage": {
        "id": "piano-water-faq",
        "faqs": [
            ("Can a piano be restored after water damage?", "Many pianos can be partially or fully restored after water damage depending on the extent of exposure and the speed of response. Uprights and grand pianos have different vulnerability — the soundboard, strings, pin block, and felt hammers are the most affected components. A brief clean water exposure with rapid drying has much better prospects than prolonged submersion or contaminated water exposure. Do not attempt to dry a piano with heaters — rapid drying causes the soundboard to crack."),
            ("What is the immediate treatment for a water-damaged piano?", "Move the piano away from water as soon as safely possible. Open the lid and front panels to allow air circulation. Remove standing water from the bottom of an upright piano with a dry cloth — do not tip the instrument. Allow the piano to dry slowly at room temperature (18-22°C) for at least two weeks before any mechanical assessment or tuning is attempted. Contact a piano technician to assess the pin block and strings before the first post-restoration tuning."),
            ("Is a piano covered by home insurance after flooding?", "Pianos are contents items and are claimable under home contents insurance after a covered water damage event, up to the contents limit or any separately declared value. High-value instruments should be listed specifically on the policy with an agreed value. We provide condition assessment and restoration scope reports for piano insurance claims, coordinating with specialist piano technicians for technical assessment."),
        ]
    },
    r"specialty-services\solar-panel-water-damage": {
        "id": "solar-panel-water-faq",
        "faqs": [
            ("Can solar panels survive water damage from hail or flooding?", "Solar panels are designed to withstand rain and are typically rated to IEC 61215 standards for hail resistance (up to 25mm hail at 23m/s). However, severe hail (larger than 35-40mm) causes glass cracking and internal delamination. Flooding that submerges panels or inverter components causes damage to electrical connections and inverters even if panels appear visually intact. A post-storm performance test reveals power output reduction indicating internal damage."),
            ("What damage does storm or hail cause to solar panels that isn\'t visible?", "Internal damage from hail impact includes: microcracks in solar cells (visible only under electroluminescence testing); delamination of the EVA encapsulant; junction box seal failure allowing moisture ingress; and bypass diode failure. These faults reduce power output progressively over time without visible exterior damage. An electroluminescence inspection within 30 days of a hail event is recommended for properties in the hail path to document damage for insurance before it self-presents as system degradation."),
            ("Is solar panel storm or hail damage covered by insurance?", "Yes. Storm and hail damage to solar panels mounted on an insured dwelling is covered under most Australian home insurance policies as part of the building structures cover. Solar systems not permanently fixed (portable or temporary systems) may be covered under contents. We provide storm damage assessment reports for solar system insurance claims, coordinating with solar technicians for performance testing and scope of replacement."),
        ]
    },
    r"specialty-services\wine-cellar-flooding": {
        "id": "wine-cellar-flood-faq",
        "faqs": [
            ("Can wine bottles be saved after a cellar floods?", "Unopened bottles with intact corks may survive brief clean water flooding with minimal damage to the wine itself, though labels are typically destroyed. The key risks are: contaminated water ingress around cork closures (if bottles were submerged with the cork below water level); label destruction; and cork degradation from extended moisture exposure. Screwcap-sealed bottles are significantly more water-resistant. Any wine showing evidence of cork contamination (discolouration, off-odour) should not be consumed."),
            ("How do you restore a flooded wine cellar while protecting the wine?", "NRPG conducts extraction with particular care around wine storage racks — avoiding vibration, which disturbs wine sediment and accelerates premature ageing. Temperature-controlled drying is critical as fluctuating temperature during restoration damages wine quality. Wine should be relocated to temperature-controlled storage during cellar restoration where possible. We minimise the exposure of wine to temperature swings, excessive light, and vibration throughout the restoration process."),
            ("Is a wine collection covered by insurance after cellar flooding?", "Wine collections above a standard contents value are typically excluded from standard home insurance or subject to low sub-limits. High-value cellars require specialist wine insurance or a separately endorsed fine wine schedule on a home or investment policy with an agreed value based on current market valuation. We provide damage assessment and condition reporting for wine insurance claims, coordinating with specialist wine assessors."),
        ]
    },
}


def make_faq_block(schema_id: str, faqs: list) -> str:
    entities = []
    for q, a in faqs:
        q_escaped = q.replace("'", r"\'")
        a_escaped = a.replace("'", r"\'")
        entities.append(
            "    {\n"
            "      '@type': 'Question',\n"
            f"      name: '{q_escaped}',\n"
            "      acceptedAnswer: {\n"
            "        '@type': 'Answer',\n"
            f"        text: '{a_escaped}',\n"
            "      },\n"
            "    }"
        )
    entity_str = ",\n".join(entities)
    return (
        f"\nconst faqSchema = JSON.stringify({{\n"
        "  '@context': 'https://schema.org',\n"
        "  '@type': 'FAQPage',\n"
        f"  mainEntity: [\n{entity_str}\n  ],\n"
        "});\n"
    )


def patch_file(file_path: str, schema_id: str, faq_block: str):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "FAQPage" in content or "faqSchema" in content:
        print(f"SKIP (already has FAQ): {file_path}")
        return

    # 1. Add Script import after Metadata import
    content = content.replace(
        "import { Metadata } from 'next';",
        "import { Metadata } from 'next';\nimport Script from 'next/script';",
        1,
    )

    # 2. Insert faq schema constant before "export default"
    idx = content.find("export default function")
    if idx == -1:
        print(f"WARNING: no export default in {file_path}")
        return
    content = content[:idx] + faq_block + "\n" + content[idx:]

    # 3. Wrap return body
    import re
    content = re.sub(
        r"(  return \(\n)(    <AgContentPageTemplate)",
        (
            r"\1"
            r"    <>\n"
            f"      <Script id=\"{schema_id}\" type=\"application/ld+json\" dangerouslySetInnerHTML={{{{ __html: faqSchema }}}} />\n"
            r"      <AgContentPageTemplate"
        ),
        content,
    )

    # 4. Close the fragment
    content = re.sub(r"(    />\n  \);\n\})", "    />\n    </>\n  );\n}", content)

    with open(file_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print(f"Patched: {file_path}")


for rel_path, cfg in pages.items():
    fp = os.path.join(PROJ, rel_path, "page.tsx")
    faq_block = make_faq_block(cfg["id"], cfg["faqs"])
    patch_file(fp, cfg["id"], faq_block)

print("\nAll done.")
