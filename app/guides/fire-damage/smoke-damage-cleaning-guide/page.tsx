import { Metadata } from 'next';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Smoke Damage Cleaning After House Fire',
  description: 'Expert answers and solutions for "smoke damage cleaning after house fire". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'smoke damage cleaning after house fire, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/fire-damage/smoke-damage-cleaning-guide' },
};

export default function SmokeDamageCleaningGuidePage() {
  return (
    <AgGuidePageTemplate
      category="Fire Damage"
      title="Smoke Damage Cleaning After House Fire"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Flame className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Fire Damage', href: '/guides/fire-damage' },
        { label: 'Smoke Damage Cleaning After House Fire' },
      ]}
      sections={[
        {
          heading: 'Types of Smoke Residue',
          body: (
            <>
              <p>
                Not all smoke damage is the same. The type of residue left behind depends on what
                materials burned, and each requires a fundamentally different cleaning approach.
                Using the wrong method can permanently set stains or drive soot deeper into
                surfaces.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Protein residue</strong> — produced when meat, poultry or other organic
                  matter burns (common in kitchen fires). It leaves a virtually invisible
                  yellowish film with an extremely pungent odour. Standard wiping won&apos;t
                  remove it; enzymatic cleaners or solvent-based solutions are required.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Synthetic residue</strong> — created when plastics, nylon and
                  manufactured materials combust. This residue is black, smeary and notoriously
                  difficult to clean because it bonds chemically with surfaces. It often requires
                  specialist solvents and may permanently stain porous materials.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Natural wood residue</strong> — the most common type in Australian house
                  fires involving structural timbers or furniture. It produces dry, powdery soot
                  that is easier to clean when treated correctly, but smears instantly if wiped
                  with a wet cloth before dry-cleaning.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Oil-based residue</strong> — results from petroleum products, cooking
                  oils or fuel burning. It produces a thick, sticky black residue that is
                  extremely difficult to remove and typically requires professional-grade
                  degreasers.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                An IICRC-certified fire restoration technician will identify the residue type
                before selecting the correct cleaning method — this assessment is critical to
                avoiding further damage to your property.
              </p>
            </>
          ),
        },
        {
          heading: 'Professional Smoke Damage Cleaning Process',
          body: (
            <>
              <p>
                Professional smoke damage restoration follows a strict sequence established by the
                IICRC S540 standard. Skipping steps or performing them out of order can cause
                permanent damage to surfaces and contents.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 1 — Dry sponge cleaning:</strong> All soot-affected surfaces are
                  first treated with dry chemical sponges (also called chem sponges). This lifts
                  loose soot particles without smearing. Dry cleaning must always precede wet
                  cleaning.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 2 — Wet cleaning:</strong> After dry soot removal, surfaces are
                  cleaned with appropriate solutions matched to the residue type. Walls, ceilings,
                  and hard surfaces are washed methodically, often requiring multiple passes.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 3 — Thermal fogging for odour:</strong> A thermal fogger disperses
                  a deodorising agent as a heated vapour that penetrates the same cavities smoke
                  infiltrated. This neutralises odour at the molecular level rather than masking
                  it.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 4 — Ozone treatment:</strong> For persistent odours, ozone
                  generators oxidise odour-causing molecules. The property must be vacated during
                  treatment as ozone is harmful to humans and pets at working concentrations.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Step 5 — HEPA air scrubbing:</strong> Industrial HEPA filtration units
                  run continuously to capture airborne particulates, improving indoor air quality
                  to safe levels. Air quality is monitored throughout the process.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The entire process is documented with before-and-after photographs, moisture
                readings and air quality reports — providing full evidence for your insurance claim.
              </p>
            </>
          ),
        },
        {
          heading: 'What Can Be Saved After Smoke Damage',
          body: (
            <>
              <p>
                One of the most common questions after a house fire is &quot;what can actually be
                saved?&quot; The answer depends on the material, the type of smoke residue, and how
                quickly professional cleaning begins.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Hard, non-porous surfaces</strong> (glass, metal, stone benchtops,
                  tiles) — almost always salvageable with professional cleaning. These surfaces
                  don&apos;t absorb soot, so residue sits on top and can be removed effectively.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Porous surfaces</strong> (unsealed timber, plasterboard, concrete) —
                  salvageability depends on exposure duration and residue type. If soot has
                  penetrated deeply, sealing with a shellac-based primer may be more practical than
                  full removal.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Textiles and soft furnishings</strong> — curtains, clothing and upholstery
                  can often be restored through specialist ozone chambers and ultrasonic cleaning.
                  However, synthetic residue on delicate fabrics is frequently beyond recovery.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Electronics</strong> — smoke residue is corrosive to circuit boards and
                  internal components. Professional ultrasonic cleaning within 48 hours gives the
                  best chance of recovery. After that window, corrosion damage is often irreversible.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Documents and photographs</strong> — specialist document recovery
                  services can freeze-dry and restore fire-affected paperwork. Original photographs
                  can often be digitally restored even when physically damaged.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Your restoration contractor will provide an itemised assessment of what can be
                cleaned, what can be sealed and repainted, and what must be replaced — with full
                documentation for your insurance claim.
              </p>
            </>
          ),
        },
        {
          heading: 'DIY Safety Warnings for Smoke Damage',
          body: (
            <>
              <p>
                While minor smoke residue from a small contained fire can sometimes be addressed
                by homeowners, there are critical safety rules you must follow. Getting these wrong
                can cause permanent damage to your property and serious harm to your health.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Never use water on soot first.</strong> Applying water or wet cloths to
                  soot before dry-cleaning will smear the residue into surfaces, creating
                  permanent stains that even professionals may not be able to fully remove.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>N95 masks are the minimum PPE.</strong> Smoke residue contains
                  carcinogenic compounds including formaldehyde, acrolein and particulate matter.
                  A properly fitted P2/N95 respirator is essential — cloth masks and surgical
                  masks provide inadequate protection.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Ventilation is critical.</strong> Open all windows and doors before
                  starting any cleaning. If the property has been sealed since the fire, allow it
                  to air out for several hours before entering without respiratory protection.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Do not turn on the HVAC system.</strong> Running your air conditioning or
                  heating before ductwork has been professionally cleaned will spread soot and
                  odour throughout the entire property, dramatically increasing the scope of
                  contamination.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Call professionals when in doubt.</strong> If the fire involved synthetic
                  materials, if soot covers more than one room, or if the smell persists after
                  initial airing, professional restoration is strongly recommended. The health
                  risks of improper smoke damage cleanup are significant.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                We bill you directly — no waiting for insurer approval means work begins
                immediately. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">
                  Blue Fire Finance
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How long does professional smoke damage cleaning take?',
          answer:
            'The duration depends on the size of the affected area and the type of smoke residue. A single room with dry soot may take 1–2 days. A full house with synthetic residue, odour treatment and contents cleaning can take 1–3 weeks. Your IICRC-certified contractor will provide a detailed scope and timeline before work begins.',
        },
        {
          question: 'Can I stay in my house during smoke damage restoration?',
          answer:
            'In most cases, no. Smoke residue contains harmful compounds, and treatments such as ozone generation and thermal fogging require the property to be vacated. Your contractor will advise when it is safe to return, typically after air quality testing confirms particulate levels are within safe limits.',
        },
        {
          question: 'Will smoke smell go away on its own without professional cleaning?',
          answer:
            'No. Smoke odour is caused by microscopic particles embedded in porous materials — walls, carpet, timber, soft furnishings and even inside wall cavities. Without professional thermal fogging, ozone treatment or hydroxyl generation, the smell will persist for months or years and often worsens in warm or humid weather.',
        },
        {
          question: 'How much does smoke damage cleaning cost in Australia?',
          answer:
            'Costs vary depending on the extent of damage, residue type and property size. Minor kitchen fire cleanup may start from a few thousand dollars, while whole-house restoration after a structural fire can run to tens of thousands. We bill you directly with a transparent scope of works, and payment plans are available through Blue Fire Finance (bluefirefinance.com.au). Full documentation is provided for your insurance claim.',
        },
        {
          question: 'Should I try to clean smoke damage myself before the professionals arrive?',
          answer:
            'Avoid cleaning until a professional has assessed the residue type. The single most common mistake is wiping soot with a wet cloth, which permanently smears residue into surfaces. If you must act, only use dry chemical sponges on hard surfaces, wear a P2/N95 respirator, and do not turn on the HVAC system. Photograph everything before touching it for your insurance records.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Fire Damage Restoration Guides',
          href: '/guides/fire-damage',
          description: 'Complete guide hub for all fire damage restoration topics.',
        },
        {
          title: 'Documenting Water Damage for Insurance',
          href: '/guides/insurance/document-water-damage-insurance',
          description: 'How to photograph and document property damage for your insurer.',
        },
        {
          title: 'Submit a Claim',
          href: '/claim',
          description: 'Get matched with an IICRC-certified contractor in your area now.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
