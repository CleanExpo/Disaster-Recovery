import { Metadata } from 'next';
import { Siren } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Immediate Steps After Flood Damage: Emergency Guide',
  description: 'Expert answers and solutions for "what to do immediately after flood damage". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'what to do immediately after flood damage, disaster recovery, restoration services, Australia, IICRC certified',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/emergency-guides/what-to-do-after-flood-damage' },
};

export default function WhatToDoAfterFloodDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Emergency Guides"
      title="Immediate Steps After Flood Damage: Emergency Guide"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)"
      icon={<Siren className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency Guides', href: '/guides/emergency-guides' },
        { label: 'Immediate Steps After Flood Damage: Emergency G...' },
      ]}
      sections={[
        {
          heading: 'Immediate First Steps — Safety and Documentation',
          body: (
            <>
              <p>
                The first minutes after discovering flood damage are critical. Your safety comes first —
                property can be restored, but personal injury cannot be undone. Follow these steps in order.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Ensure personal safety:</strong> Do not enter a flooded area if the water level
                  is above ankle height, if you can smell gas, or if there is any risk of electrical contact.
                  Turn off power at the switchboard only if you can reach it safely without standing in water.
                  If in doubt, wait for your electricity provider or emergency services.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Stop the water source if safe:</strong> For burst pipes, turn off the mains water
                  at the meter. For appliance failures, disconnect the appliance. For storm or floodwater
                  ingress, there is nothing to turn off — focus on protecting yourself and documenting.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Document before you clean up:</strong> Use your phone to photograph and video
                  all affected areas before moving anything. Capture wide shots of each room, close-ups
                  of damage to walls, floors, and belongings, and the water source if visible. This evidence
                  is essential for your insurance claim.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Contact your insurer:</strong> Lodge a claim as soon as possible. Note your
                  claim reference number. Most policies require you to take reasonable steps to mitigate
                  further damage, so do not delay emergency response while waiting for insurer approval.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'The Critical 48-Hour Window',
          body: (
            <>
              <p>
                The first 48 hours after flood damage are the most important period for limiting
                secondary damage. Mould can begin colonising within 24–48 hours in Australian
                humidity conditions, particularly in Queensland, northern NSW, the Northern Territory,
                and during summer months across the country.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Water extraction (0–6 hours):</strong> Standing water must be removed as quickly
                  as possible using pumps and commercial wet vacuums. Every hour water remains in contact
                  with materials, it migrates further — wicking up walls, saturating underlay, and seeping
                  into subfloor cavities.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Structural drying (6–48 hours):</strong> Once standing water is extracted,
                  professional-grade air movers and dehumidifiers must be deployed to begin drying the
                  structure. IICRC S500 standards require moisture monitoring with meters and psychrometric
                  readings to track drying progress.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Mould prevention (24–48 hours):</strong> Antimicrobial treatments should be
                  applied to affected surfaces within the first 24 hours where possible. If mould has
                  already started (visible growth or musty odour), a separate mould remediation scope
                  under IICRC S520 may be required.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Professional restoration teams work around the clock during this critical window. The
                faster drying begins, the more materials can be saved and the lower the overall
                restoration cost.
              </p>
            </>
          ),
        },
        {
          heading: 'What to Save vs What to Discard',
          body: (
            <>
              <p>
                Not everything affected by floodwater needs to be thrown away. Understanding which
                materials can be restored and which must be discarded helps you manage costs and
                set realistic expectations.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Usually salvageable:</strong> Hard, non-porous surfaces like tiles, concrete,
                  metal, glass, and solid timber furniture can generally be cleaned, decontaminated, and
                  dried. Hardwood flooring may be salvageable with specialist drying if addressed within
                  24–48 hours.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Sometimes salvageable:</strong> Carpet may be restored if affected by Category 1
                  (clean) water and professionally cleaned within 24 hours. Plasterboard affected by clean
                  water may dry successfully if structural integrity remains. Upholstered furniture depends
                  on water category and soak time.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Usually must be discarded:</strong> Carpet underlay (absorbs contaminants and
                  is nearly impossible to fully dry), any porous material affected by Category 3 (black)
                  water such as floodwater or sewage, particle board and MDF that has swollen, insulation
                  that has been saturated, and any material with visible mould growth.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                A qualified IICRC-certified technician will assess each material and provide clear
                recommendations. Always photograph items before disposal — your insurer needs evidence
                of damaged goods to process your claim.
              </p>
            </>
          ),
        },
        {
          heading: 'Professional Restoration vs DIY — When Each Is Appropriate',
          body: (
            <>
              <p>
                Minor water incidents may be manageable without professional help, but most flood
                damage requires specialist intervention. Here is how to judge.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>DIY may be appropriate for:</strong> Small spills on hard surfaces (less than
                  2 square metres), minor appliance leaks caught within minutes, surface water on tiles
                  that has not reached walls or underlay. Use fans, towels, and a household dehumidifier.
                  Monitor for 48 hours for any signs of lingering moisture or odour.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Professional restoration is essential for:</strong> Any water that has reached
                  carpet, underlay, or wall cavities. Any Category 2 water (grey water from appliances,
                  dishwashers, washing machines) or Category 3 water (sewage, floodwater, stormwater
                  ingress). Any area larger than a single small room. Any situation where moisture has
                  been present for more than 24 hours.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Category 3 water is always professional:</strong> Floodwater, sewage overflows,
                  and stormwater ingress contain bacteria, viruses, and other pathogens. IICRC S500
                  requires full PPE, antimicrobial treatment, and often removal of all affected porous
                  materials. This is not safe as a DIY task.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                When in doubt, get a professional assessment. Disaster Recovery connects you with
                IICRC-certified contractors who can assess your situation and provide an honest
                recommendation — submit a claim through our platform to get started.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What should I do first after my house floods?',
          answer:
            'Ensure your safety first — do not enter floodwater above ankle height, and turn off power at the switchboard only if you can reach it safely without standing in water. Once safe, document all damage with photos and video before moving anything, then contact your insurer to lodge a claim. Begin removing standing water if you can do so safely, and contact a professional restoration company to start extraction and drying within the critical first 24 hours.',
        },
        {
          question: 'How quickly does mould grow after flooding in Australia?',
          answer:
            'Mould can begin colonising within 24 to 48 hours after flooding, particularly in warm, humid conditions common across Queensland, northern NSW, the Northern Territory, and during summer months nationwide. This is why the IICRC S500 standard emphasises rapid water extraction and structural drying. If mould is already visible or you detect a musty odour, a separate mould remediation scope under IICRC S520 will be required.',
        },
        {
          question: 'Should I throw away everything that got wet in a flood?',
          answer:
            'No. Non-porous materials like tiles, concrete, metal, glass, and solid timber can usually be cleaned and restored. Carpet affected by clean water may be salvageable if professionally cleaned within 24 hours. However, carpet underlay, particle board, saturated insulation, and any porous material affected by sewage or floodwater (Category 3) should be discarded. A qualified IICRC-certified technician can assess which items to save and which to remove. Always photograph items before disposal for your insurance claim.',
        },
        {
          question: 'Does my insurance cover flood damage restoration?',
          answer:
            'Most Australian home and contents insurance policies cover sudden water damage from burst pipes, storms, and appliance failures. Flood cover (riverine flooding) is included in many policies but check your Product Disclosure Statement (PDS) as some policies exclude it or have specific conditions. We bill you directly so work can begin immediately — no waiting for insurer approval. We provide full documentation including photos, moisture readings, and itemised invoices to support your reimbursement claim.',
        },
        {
          question: 'Can I stay in my home during flood damage restoration?',
          answer:
            'It depends on the extent of damage and the water category. For minor clean water damage (Category 1) confined to one area, you may be able to remain in the home while drying equipment operates. For extensive damage, Category 3 water (sewage or floodwater), or if mould remediation is required, you may need to relocate temporarily. Your IICRC-certified contractor will advise on habitability. Many insurance policies include temporary accommodation provisions — check your PDS for details.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Water Damage Restoration Guide',
          href: '/guides/water-damage',
          description: 'Complete guide to the professional water damage restoration process.',
        },
        {
          title: 'Mould Remediation Guide',
          href: '/guides/mould',
          description: 'Understanding mould risks, testing, and professional remediation.',
        },
        {
          title: 'Submit a Claim',
          href: '/claim',
          description: 'Get connected with IICRC-certified contractors in your area now.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
