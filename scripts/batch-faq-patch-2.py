"""Batch 2: Adds FAQPage schema to remaining fire-damage and commercial-services sub-pages."""
import os
import re

PROJ = r"C:\Users\PhillMcGurk\DR - NRPG COWORK\Disaster-Recovery\app\services"

pages = {
    r"fire-damage\bushfire-smoke-damage": {
        "id": "bushfire-smoke-faq",
        "related": "fire-damage",
        "faqs": [
            ("Can bushfire smoke damage a home that was not directly in the fire zone?", "Yes. Bushfire smoke can travel tens of kilometres, depositing toxic soot and particulates on surfaces inside and outside properties not directly affected by flames. Properties within smoke plume zones often require professional cleaning of HVAC systems, soft furnishings, and hard surfaces. Smoke particulate penetrates ceiling insulation, wall cavities, and roof spaces — standard cleaning is insufficient."),
            ("What health risks does bushfire smoke cause inside a home?", "Bushfire smoke contains fine particulate matter (PM2.5), carbon monoxide, nitrogen oxides, and toxic compounds from burned vegetation and structures. Indoor exposure causes respiratory irritation, asthma exacerbation, and cardiovascular effects. Vulnerable occupants should not re-enter a smoke-affected property until professional air quality testing confirms safe levels."),
            ("Does insurance cover bushfire smoke damage if the property was not burned?", "Many Australian home insurance policies cover smoke damage as part of bushfire or fire damage coverage, even if the property was not directly burned. Check your Product Disclosure Statement under fire or smoke damage inclusions. We provide IICRC S700:2025 certified assessment reports to support smoke damage claims."),
        ]
    },
    r"fire-damage\chimney-fire-damage": {
        "id": "chimney-fire-faq",
        "related": "fire-damage",
        "faqs": [
            ("What happens during a chimney fire and what damage does it cause?", "A chimney fire occurs when creosote or soot deposits inside the chimney flue ignite, producing intense heat that can crack or collapse the flue liner, spread to surrounding timber framing, and fill the property with smoke. Damage includes structural damage to the chimney and firebox, smoke and soot contamination throughout the property, and risk of hidden structural fire spread in wall and ceiling cavities."),
            ("Do I need a structural inspection after a chimney fire?", "Yes. A chimney fire must be inspected by a licensed chimney professional and a structural engineer before the fireplace is used again. Hidden structural damage — cracked flue tiles, compromised mortar, fire spread to timber framing — is common and not visible without inspection. Insurance will require professional assessment documentation before approving restoration costs."),
            ("Is chimney fire damage covered by home insurance?", "Yes. Chimney fires are typically covered as accidental fire events under Australian home insurance policies. Damage to the chimney structure, surrounding walls, and smoke contamination throughout the property is claimable. Do not use the fireplace again until the chimney is professionally inspected and certified safe."),
        ]
    },
    r"fire-damage\commercial-fire-damage": {
        "id": "commercial-fire-faq",
        "related": "fire-damage",
        "faqs": [
            ("How is commercial fire damage restoration different from residential?", "Commercial fire restoration must balance restoration quality with business continuity. NRPG works in stages to restore operational sections while completing remediation of fire-damaged areas. Commercial sites have compliance requirements — asbestos, hazardous materials, occupational health — that residential properties do not. We coordinate with your insurer, loss adjuster, and facilities manager throughout."),
            ("Can a commercial property be partially operational during fire restoration?", "Yes. NRPG establishes containment zones so unaffected areas remain operational during restoration. Air scrubbers maintain indoor air quality in occupied zones. Intensive work such as demolition, structural repair, and heavy cleaning is scheduled outside operating hours. A business continuity plan is developed before work begins."),
            ("How long does commercial fire damage restoration take?", "Minor commercial fire damage with limited structural impact typically takes 1-4 weeks. Major structural fire events requiring engineering assessment, hazardous material removal, structural repair, and full fit-out replacement can take 3-6 months. We provide a detailed timeline after initial assessment and update it weekly throughout the project."),
        ]
    },
    r"fire-damage\electrical-fire-damage": {
        "id": "electrical-fire-faq",
        "related": "fire-damage",
        "faqs": [
            ("Is it safe to re-enter a property after an electrical fire?", "Do not re-enter until emergency services and a licensed electrician have confirmed the property is safe. Electrical fires can cause hidden smouldering in wall cavities and ceiling spaces that reignites hours later. The electrical system must be isolated and inspected before any power is restored. Air quality testing is recommended before occupants return."),
            ("What causes electrical fires in Australian homes?", "Common causes include faulty wiring in older homes (especially pre-1980s with aluminium wiring), overloaded circuits, damaged or frayed power cords, malfunctioning appliances, and faults in switchboards. Electrical fires often begin inside wall cavities where the fire smoulders undetected before breaking out."),
            ("Does insurance cover electrical fire damage?", "Yes. Sudden and accidental electrical fire damage is covered by most Australian home and business insurance policies. The cause of the fire should be documented by a licensed electrician — this report is important evidence if the insurer seeks to deny the claim on maintenance grounds. Begin restoration documentation before any cleanup."),
        ]
    },
    r"fire-damage\garage-fire-damage": {
        "id": "garage-fire-faq",
        "related": "fire-damage",
        "faqs": [
            ("Can garage fire damage spread to the main house?", "Yes. Garage fires frequently spread to the main structure through the shared wall, ceiling penetrations, or ductwork. Australian building codes require a fire-rated separation between an attached garage and the habitable dwelling — but older homes may lack compliant separation. A structural inspection is required after any garage fire to assess whether fire spread has occurred inside wall cavities."),
            ("What items in a garage are typically restorable after fire?", "Metal tools, garden equipment, and stored items with non-porous surfaces can often be cleaned and deodorised. Vehicles require specialist assessment. Timber furniture, cardboard storage, and soft items heavily affected by smoke and heat are generally not restorable. A contents restoration specialist will assess each item individually."),
            ("Does home insurance cover garage fire damage?", "Yes. The garage structure and its contents are typically covered under Australian home and contents insurance policies. Items stored in the garage may be subject to contents sub-limits — check your Product Disclosure Statement. Vehicles must be covered under a separate comprehensive motor vehicle policy."),
        ]
    },
    r"fire-damage\soot-damage-cleanup": {
        "id": "soot-damage-faq",
        "related": "fire-damage",
        "faqs": [
            ("What is soot and why is it hazardous?", "Soot is a byproduct of incomplete combustion — fine carbon particles mixed with chemical residues from burned materials. It is hazardous because it contains carcinogens, heavy metals, and toxic organic compounds. Soot embeds in surfaces and airspace and cannot be removed safely by standard cleaning. Skin and respiratory contact must be avoided without PPE."),
            ("Can I clean soot damage myself?", "No. DIY soot cleanup spreads contamination, drives particles deeper into porous surfaces, and creates airborne hazards. IICRC-certified technicians use HEPA-filtered vacuums, chemical sponges, and specialist cleaning agents to safely remove soot without spreading it. Attempting to wipe soot with standard cleaning materials typically worsens the damage and the resulting smell."),
            ("How is soot removed from painted walls and ceilings?", "Dry chemical sponges are used first to absorb loose soot without smearing. Specialist alkaline cleaning solutions neutralise soot deposits on hard surfaces. In severe cases, walls and ceilings require repainting after cleaning — soot residue will bleed through standard paint without an appropriate sealer. IICRC S700:2025 protocols govern the full process."),
        ]
    },
    r"fire-damage\structural-fire-damage": {
        "id": "structural-fire-faq",
        "related": "fire-damage",
        "faqs": [
            ("How is structural fire damage assessed?", "IICRC-certified fire restoration contractors assess the structural integrity of load-bearing elements — roof framing, floor joists, wall studs, beams — for fire exposure, char depth, and residual strength. A structural engineer is engaged for elements where fire exposure may have compromised load capacity. This assessment forms the basis of the restoration scope and insurance claim."),
            ("When is a fire-damaged structure demolished versus restored?", "Most fire-damaged residential structures are restorable unless the fire was extremely severe or the building was already at end of life. Restoration is nearly always less expensive than demolition and rebuild. The decision is made based on the structural engineer's assessment of residual structural integrity and the scope of required repairs versus new build costs."),
            ("How long does structural fire damage restoration take?", "Structural restoration following a significant fire event typically takes 8-24 weeks depending on the scope of structural repair, engineering requirements, council approvals, trades availability, and insurance settlement timing. We provide a project timeline after the initial structural assessment and update it regularly throughout the project."),
        ]
    },
    r"commercial-services\data-center-flooding": {
        "id": "data-center-flood-faq",
        "related": "water-damage",
        "faqs": [
            ("What are the immediate priorities when a data centre floods?", "Immediately: isolate electrical supply to the affected zone — do not attempt this unless you have qualified electrical personnel on-site. Activate your business continuity plan and contact your managed services provider. Do not power on wet equipment — this causes permanent damage and creates electrical hazards. Contact an IICRC-certified restoration contractor for emergency water extraction and environmental stabilisation (temperature and humidity control) to protect sensitive equipment."),
            ("Can water-damaged server and network equipment be recovered?", "Some hardware can be recovered if power was off during water exposure and extraction begins within hours. Solid-state storage (SSDs, flash) has better recovery prospects than mechanical hard drives. Specialist IT asset recovery services can attempt recovery of individual drives. However, significant exposure — especially to contaminated or saline water — often results in total loss for electronic components."),
            ("How do you restore air conditioning and power infrastructure after flooding?", "Electrical switchgear, UPS systems, PDUs, and HVAC equipment must be fully de-energised, inspected, and cleared by licensed electrical and mechanical engineers before reinstatement. NRPG coordinates specialist subcontractors for electrical, mechanical, and communications infrastructure as part of the data centre restoration scope."),
        ]
    },
    r"commercial-services\factory-water-damage": {
        "id": "factory-water-faq",
        "related": "water-damage",
        "faqs": [
            ("Can production continue in a factory during water damage restoration?", "In many cases, yes — NRPG establishes containment zones to separate affected production areas from operational ones. Drying equipment is positioned to minimise interference with production lines. Intensive demolition or repair work is scheduled during shutdowns. We develop a site-specific business continuity plan before work begins."),
            ("Does factory flooding affect machinery warranties or compliance?", "Water exposure may void equipment manufacturer warranties. Electrical and automated machinery must be inspected and cleared by qualified technicians before reuse. In regulated industries (food manufacturing, pharmaceutical), water ingress may require regulatory notification and re-certification of affected production areas. We coordinate with your compliance team on these requirements."),
            ("Is factory flood damage covered by commercial insurance?", "Yes. Commercial property insurance typically covers factory flood damage from sudden and accidental water events including burst pipes, roof leaks, and stormwater ingress. Business interruption insurance may cover lost production revenue during restoration. We provide IICRC-certified documentation — scope of works, moisture logs, photographs — for your insurance claim."),
        ]
    },
    r"commercial-services\gym-flooding": {
        "id": "gym-flood-faq",
        "related": "water-damage",
        "faqs": [
            ("Can a gym remain open during water damage restoration?", "In many cases, sections of the gym can remain operational while affected areas are isolated for restoration. Equipment not in the affected zone can often continue to be used. NRPG establishes containment and drying in the affected area while keeping unaffected zones accessible. This is coordinated with your facility manager to minimise member disruption."),
            ("How does water damage affect gym flooring and equipment?", "Rubber gym flooring absorbs water and can develop mould if not dried within 24-48 hours. Wooden flooring cups and warps. Fixed equipment may have water in motor housings — do not use until cleared by a technician. Free weights and metal equipment can be dried and sanitised. Upholstered padding and foam elements may require replacement depending on water category."),
            ("Does business insurance cover gym flood damage and lost membership revenue?", "Commercial property insurance covers the physical damage to the facility. Business interruption insurance may cover lost membership revenue and ongoing fixed costs during restoration. We provide full documentation to support both streams of your insurance claim."),
        ]
    },
    r"commercial-services\hospital-water-damage": {
        "id": "hospital-water-faq",
        "related": "water-damage",
        "faqs": [
            ("How do you restore water damage in a hospital without disrupting patient care?", "NRPG develops a staged restoration plan with your facilities and infection control teams before work begins. Containment is set up to prevent moisture migration and dust spread to clinical areas. HEPA air filtration is deployed. Work in patient care zones is scheduled during low-census periods or after hours. All personnel comply with your hospital's infection control protocols."),
            ("What infection control requirements apply to hospital water damage restoration?", "Healthcare facilities have strict infection control requirements — restoration contractors must comply with your hospital's Infection Control Risk Assessment (ICRA) protocols. NRPG technicians are trained in healthcare environment standards including containment barrier requirements, HEPA filtration, PPE protocols, and decontamination procedures appropriate to clinical settings."),
            ("Can water-damaged clinical equipment be restored?", "Clinical and medical equipment must be assessed by qualified biomedical technicians before reuse. Water exposure may compromise sterility, calibration, and electrical safety. Do not use water-exposed clinical equipment until formally cleared. NRPG coordinates with your biomedical team and notifies relevant stakeholders per your facility's incident management protocol."),
        ]
    },
    r"commercial-services\restaurant-water-damage": {
        "id": "restaurant-water-faq",
        "related": "water-damage",
        "faqs": [
            ("Can a restaurant reopen quickly after water damage?", "Timeline depends on the scope of damage and regulatory requirements. If kitchen equipment, food storage, and preparation surfaces are affected, the restaurant may need to close until health authority clearance is obtained. NRPG works to restore and certify the affected areas as quickly as possible, coordinating with your local council environmental health officer where required."),
            ("Do health regulations require a council inspection after restaurant flooding?", "In most Australian states and territories, food businesses must notify their local council environmental health officer after a significant flooding event and obtain clearance before resuming food preparation. We provide IICRC-certified restoration reports and moisture clearance documentation that supports your council re-inspection and reopening process."),
            ("Does business insurance cover a restaurant closure after flood damage?", "Yes. Commercial property insurance covers physical damage. Business interruption insurance may cover revenue loss during closure, ongoing staff wages, and fixed costs. We provide complete documentation — scope of works, moisture logs, council clearance requirements — to support all components of your insurance claim."),
        ]
    },
    r"commercial-services\retail-flood-damage": {
        "id": "retail-flood-faq",
        "related": "water-damage",
        "faqs": [
            ("Can a retail store remain trading during flood damage restoration?", "In many cases, yes. If only part of the store is affected, unaffected trading areas can remain open while restoration proceeds behind containment barriers. NRPG installs barriers and drying equipment to minimise customer-facing disruption. Staging and visual merchandising adjustments can help maintain a professional trading environment during restoration."),
            ("How is stock and inventory handled after retail flooding?", "Stock affected by water is separated into salvageable and non-salvageable categories. Salvageable stock is moved to a dry area for cleaning and assessment. Non-salvageable stock is documented with photographs, SKU records, and replacement cost evidence for your contents and stock insurance claim. Never dispose of damaged stock before photographing it for insurance purposes."),
            ("Does retail property insurance cover flood damage to stock?", "Commercial property insurance covers the building structure. Stock (inventory) is typically covered under a separate commercial contents or business property policy up to the declared stock value. Business interruption cover may apply for trading losses. We help coordinate documentation across all policy types."),
        ]
    },
    r"commercial-services\school-water-damage": {
        "id": "school-water-faq",
        "related": "water-damage",
        "faqs": [
            ("Can students return to school during water damage restoration?", "Students should not return to affected areas until they are certified dry, decontaminated, and safe. NRPG works with school leadership to establish a restoration timeline that accounts for term dates. In some cases, unaffected classrooms and facilities remain open while restoration proceeds in isolated areas. We prioritise approaches that minimise disruption to the school year."),
            ("What indoor air quality requirements apply during school restoration?", "School environments have heightened duty of care for indoor air quality. NRPG deploys HEPA air scrubbers in restoration zones and monitors air quality throughout the project. Mould remediation in school environments follows IICRC S520:2025 protocols with clearance testing before reoccupation. All work complies with your state's school facilities guidelines."),
            ("Who pays for school water damage restoration — the school or the government?", "Government schools typically carry state government insurance through agencies such as Treasury Managed Fund (NSW) or similar. Independent and Catholic schools carry their own commercial insurance. We work with whichever insurer or authority is responsible, providing IICRC-certified documentation to support the claim and approval process."),
        ]
    },
    r"commercial-services\warehouse-flooding": {
        "id": "warehouse-flood-faq",
        "related": "water-damage",
        "faqs": [
            ("How do you dry out a large warehouse after flooding?", "Large-volume warehouse drying requires industrial dehumidifiers, high-capacity air movers, and sometimes temporary heating or refrigeration to control temperature and humidity. NRPG conducts a psychrometric analysis to calculate the required equipment capacity for the space volume and structural materials. Drying typically takes 3-7 days for standard warehouse construction."),
            ("Can racking, machinery, and stock be left in place during warehouse drying?", "Where possible, racking stays in place if structurally sound. Equipment and stock on affected floors must be lifted or moved to allow drying of the floor slab. Porous pallet stock (cardboard, timber) in direct contact with floodwater must be assessed for salvageability. NRPG minimises operational disruption with a staged approach."),
            ("Does warehouse flood damage affect fire sprinkler certification?", "If the flooding event involved sprinkler activation or if sprinkler infrastructure was submerged, the system must be inspected and certified by a licensed fire protection engineer before reactivation. Do not assume the sprinkler system is operational after flooding. We coordinate with your fire protection contractor as part of the building clearance process."),
        ]
    },
    r"commercial-services\page": {
        "id": "commercial-svcs-faq",
        "related": "water-damage",
        "faqs": [
            ("How do you minimise business interruption during commercial restoration?", "NRPG develops a business continuity plan before any work begins. This includes staging work to keep operational areas running, scheduling intensive work outside business hours, coordinating with your facilities manager daily, and prioritising systems critical to your operations. We target the fastest path to full reoccupation without compromising restoration quality."),
            ("Do you handle commercial insurance claims directly with insurers?", "Yes. We provide complete claims-ready documentation — IICRC-certified assessment reports, scope of works, photographic evidence, moisture drying logs, and invoices — in the format commercial insurers require. We can liaise directly with your insurer or appointed loss adjuster to expedite claim approval and avoid delays that extend business disruption."),
            ("What commercial property types do you restore?", "NRPG restores all commercial property types: offices, retail centres, warehouses, factories, restaurants and hospitality venues, healthcare facilities, aged care, schools, strata buildings, data centres, and specialist industrial facilities. Each requires specific compliance knowledge that our IICRC-certified contractors and project managers are trained to address."),
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
            "      acceptedAnswer: {{\n"
            "        '@type': 'Answer',\n"
            f"        text: '{a_escaped}',\n"
            "      }},\n"
            "    }"
        )
    entity_str = ",\n".join(entities)
    return (
        f"\nconst faqSchema = JSON.stringify({{\n"
        "  '@context': 'https://schema.org',\n"
        "  '@type': 'FAQPage',\n"
        f"  mainEntity: [\n{entity_str}\n  ],\n"
        "}});\n"
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

    # 3. Wrap return: change "return (\n    <AgContentPageTemplate" ->
    #    "return (\n    <>\n      <Script .../>\n      <AgContentPageTemplate"
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
    fp = os.path.join(PROJ, rel_path + ".tsx") if rel_path.endswith("page") else os.path.join(PROJ, rel_path, "page.tsx")
    faq_block = make_faq_block(cfg["id"], cfg["faqs"])
    patch_file(fp, cfg["id"], faq_block)

print("\nAll done.")
