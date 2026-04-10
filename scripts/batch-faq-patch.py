"""Batch-adds FAQPage schema Script tags to service pages that follow the
AgContentPageTemplate pattern with no existing schema."""
import os
import re

PROJ = r"C:\Users\PhillMcGurk\DR - NRPG COWORK\Disaster-Recovery\app\services"

pages = {
    r"emergency-services\emergency-board-up": {
        "id": "emergency-board-up-faq",
        "faqs": [
            ("When is emergency board-up required?", "Emergency board-up is required when a property's windows, doors, or structural openings are compromised by storm damage, fire, break-in, or collision. Unsecured openings allow water ingress, wildlife entry, and unauthorised access — each causing additional damage and liability. Board-up should begin as soon as the area is safe to access."),
            ("Does insurance cover emergency board-up costs?", "Yes. Most Australian home and business insurance policies cover emergency make-safe costs including board-up as part of the property damage claim. Begin immediately to prevent secondary damage — do not wait for insurer approval. Document all conditions before and after boarding for your claim."),
            ("How quickly can you board up a property after storm or fire damage?", "NRPG dispatches emergency make-safe teams 24/7. In most metro areas response is within 60 minutes. Board-up is temporary protection — full repair or replacement of compromised openings follows once assessment and insurance approval are in place."),
        ]
    },
    r"emergency-services\emergency-drying": {
        "id": "emergency-drying-faq",
        "faqs": [
            ("What is emergency structural drying and why is it needed?", "Emergency structural drying is the forced removal of moisture from building materials using commercial dehumidifiers and air movers after a water damage event. Without drying, retained moisture causes mould growth within 24-48 hours, structural degradation, and secondary health risks. IICRC S500:2025 requires drying to begin as soon as extraction is complete."),
            ("How long does emergency structural drying take?", "Standard structural drying takes 3-5 days under normal conditions. Category 3 water events or events involving thick structural elements may take 5-7 days. Moisture readings are taken at each visit — drying is only complete when all affected materials reach target moisture content per IICRC S500:2025."),
            ("Is structural drying covered by insurance?", "Yes. Structural drying is part of the emergency make-safe and restoration process covered under most Australian water damage insurance claims. We provide daily drying logs with moisture readings that serve as evidence of scope and necessity for your insurer."),
        ]
    },
    r"emergency-services\emergency-tarping": {
        "id": "emergency-tarping-faq",
        "faqs": [
            ("What is emergency roof tarping and when is it needed?", "Emergency roof tarping involves installing industrial-grade temporary covers over damaged or missing roof sections to prevent further water ingress after storm damage, fire, fallen trees, or hail. Tarping begins within hours to stop water entry that would otherwise spread damage to ceilings, walls, insulation, and contents."),
            ("Does insurance cover emergency tarping?", "Yes. Emergency tarping is a covered make-safe cost under most Australian home and business insurance policies. Document the damage with photographs before and after tarping. Tarping is temporary protection — permanent roof repair follows after claim approval and contractor scheduling."),
            ("How long does emergency tarping last?", "Industrial tarps installed by NRPG can remain in place for weeks to months while permanent repairs are arranged. They are secured against wind and weather. Monitor tarp condition after subsequent storms and contact your restoration contractor if any movement or degradation is observed."),
        ]
    },
    r"fire-damage\kitchen-fire-damage": {
        "id": "kitchen-fire-faq",
        "faqs": [
            ("Can a kitchen be restored after a fire or does it need full replacement?", "Most kitchens can be partially or fully restored depending on the extent of fire and smoke damage. Cabinets, benchtops, and appliances affected only by smoke and soot can often be cleaned using ultrasonic and chemical methods. Charred or structurally compromised elements require replacement. An IICRC-certified fire restoration assessment determines what is restorable versus what must be replaced — this assessment also forms the basis of your insurance claim."),
            ("How long does kitchen fire damage restoration take?", "Smoke and soot cleaning of a kitchen typically takes 2-5 days. If structural elements require replacement, the full scope may take 2-6 weeks depending on trades availability and insurance approval. Odour elimination using ozone treatment and thermal fogging follows structural work."),
            ("Does insurance cover kitchen fire damage?", "Yes. Sudden and accidental kitchen fire damage is covered by most Australian home and contents policies. Contents — appliances, cookware — may be claimed under contents insurance. Obtain IICRC-certified assessment and documentation before any cleanup to support your claim."),
        ]
    },
    r"fire-damage\smoke-odour-removal": {
        "id": "smoke-odour-faq",
        "faqs": [
            ("Can smoke odour be completely eliminated after a fire?", "Yes. Professional smoke odour removal using thermal fogging, ozone treatment, and hydroxyl generators can eliminate smoke odour at the molecular level. DIY cleaning and standard air fresheners are ineffective because smoke particles penetrate porous surfaces. IICRC-certified technicians treat all affected surfaces and airspace for complete odour neutralisation."),
            ("How long does smoke odour removal take?", "Surface deodorisation typically takes 1-3 days. Structural odour treatment using ozone or thermal fogging requires the property to be vacated for 4-12 hours per treatment cycle. Severe smoke events with deep penetration into wall cavities and insulation may require multiple treatment cycles and partial deconstruction."),
            ("Is smoke odour removal covered by fire insurance?", "Yes. Smoke odour removal is part of the scope of fire damage restoration covered under most Australian home and business policies. It must be completed to a professional standard — insurers expect IICRC S700:2025 certified documentation for smoke damage claims."),
        ]
    },
    r"fire-damage\contents-restoration": {
        "id": "contents-restoration-faq",
        "faqs": [
            ("What items can be restored after fire and smoke damage?", "Many items can be salvaged including furniture, clothing, documents, photographs, electronics, artwork, and collectibles using ultrasonic cleaning, ozone treatment, freeze-drying for documents, and specialist electronics drying. Porous materials with deep soot penetration may not be restorable. IICRC-certified contents specialists assess each item individually."),
            ("Is contents restoration covered by insurance?", "Yes. Contents restoration after fire damage is covered under most Australian contents insurance policies. You have the right to professional restoration attempts before contents are written off. Insurers must cover restoration costs up to replacement value. Document all affected items with photographs and purchase receipts before any cleaning or disposal."),
            ("What is pack-out and why is it used in fire restoration?", "Pack-out involves removing all salvageable contents from the fire-damaged property to a specialist facility for cleaning and storage. This protects items from ongoing smoke and soot exposure, allows structural cleaning to proceed unimpeded, and enables thorough contents decontamination. Items are catalogued, cleaned, and returned when the property is ready for reoccupation."),
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

    # 3. Wrap return body: change "return (\n    <AgContentPageTemplate" ->
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

    # 4. Close the fragment: last occurrence of "    />\n  );\n}" -> "    />\n    </>\n  );\n}"
    # The template closing is:   />\n  );\n}
    close_pattern = r"(    />\n  \);\n\})"
    replacement = "    />\n    </>\n  );\n}"
    content = re.sub(close_pattern, replacement, content)

    with open(file_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print(f"Patched: {file_path}")


for rel_path, cfg in pages.items():
    fp = os.path.join(PROJ, rel_path, "page.tsx")
    faq_block = make_faq_block(cfg["id"], cfg["faqs"])
    patch_file(fp, cfg["id"], faq_block)

print("\nAll done.")
