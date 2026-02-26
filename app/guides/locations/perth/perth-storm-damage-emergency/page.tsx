import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Perth Storm Damage Emergency Response | Disaster Recovery',
  description: 'Expert guide to storm damage emergency response in Perth. Severe thunderstorms, hail events, coastal wind damage, northern suburbs risk profiles, IICRC certified 24/7.',
  keywords: 'perth storm damage emergency, perth hail damage, coastal wind damage perth, storm damage repair perth, emergency restoration perth, IICRC certified' };

export default function PerthStormDamageEmergencyPage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Perth Storm Damage Emergency Response"
      subtitle="Expert guide to managing storm damage emergencies across Perth — from severe thunderstorms and hail in the northern suburbs to coastal wind damage along the western seaboard"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Perth Storm Damage Emergency Response' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'Perth&rsquo;s Storm Damage Risk Profile',
          body: (
            <div className="space-y-4">
              <p>
                Perth&rsquo;s climate delivers some of Australia&rsquo;s most intense and damaging storm events. The metropolitan area stretches over 150 km along the Indian Ocean coast and up to 60 km inland, creating diverse storm risk profiles across different suburbs. Understanding the specific risks in your area is essential for effective emergency response and insurance documentation.
              </p>
              <p>
                <strong>Severe thunderstorms and hail:</strong> Perth experiences frequent severe thunderstorms during the transitional months (October&ndash;November and March&ndash;April) when cold fronts interact with warm, unstable air masses. The March 2010 hailstorm caused over $1 billion in insured losses across Perth&rsquo;s northern and eastern suburbs. Giant hail (larger than 5 cm) perforated roofing, shattered skylights, destroyed solar panels, and smashed car windscreens across Joondalup, Wanneroo, Ellenbrook, and Midland. These events are not rare — Perth averages several significant hail events per decade.
              </p>
              <p>
                <strong>Northern suburbs risk:</strong> Perth&rsquo;s northern growth corridor — from Joondalup through Wanneroo, Clarkson, and Butler to Two Rocks — is particularly exposed to severe thunderstorms. The flat terrain and lack of natural windbreaks allow storms to develop and travel across the northern suburbs with minimal attenuation. Newer housing developments in these areas feature large roof areas with colorbond roofing that is vulnerable to hail denting and perforation.
              </p>
              <p>
                <strong>Coastal wind damage:</strong> The western suburbs — Cottesloe, Scarborough, Trigg, Hillarys, and Ocean Reef — experience intense wind events from both westerly frontal systems and summer easterly (Fremantle Doctor) wind patterns. Salt-laden coastal winds accelerate corrosion of metal roofing fixings, flashings, and guttering. During severe storms, wind uplift peels back ridge capping, lifts roofing sheets, and drives rain horizontally into building cavities through even small gaps in the building envelope.
              </p>
              <p>
                <strong>Sandy soil drainage issues:</strong> Perth is built predominantly on the Swan Coastal Plain, with sandy soils that generally drain well. However, in areas with clay subsoil lenses (common in the eastern suburbs including Midland, Kalamunda, and Forrestfield, and in parts of Rockingham and Mandurah to the south), stormwater can pool against foundations during intense rainfall. The Perth Hills suburbs (Kalamunda, Mundaring, Roleystone) also face stormwater runoff from steep terrain that channels water towards downhill properties.
              </p>
            </div>
          ),
        },
        {
          heading: 'Types of Storm Damage and Immediate Response',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Storm damage in Perth typically involves multiple damage types occurring simultaneously. A single severe thunderstorm can deliver hail, heavy rain, destructive wind gusts, and lightning, each creating distinct damage profiles that require coordinated assessment and response.
              </p>
              <p>
                <strong>Roof damage:</strong> The most common and consequential storm damage in Perth. Hail perforates colorbond and zincalume roofing, wind lifts ridge capping and roofing sheets, and debris impact damages tiles. Any breach in the roof membrane allows water ingress, which continues with every subsequent rainfall until the roof is repaired. Emergency tarping is the critical first response — securing the damaged roof section with industrial-grade tarpaulins prevents ongoing water damage to the interior.
              </p>
              <p>
                <strong>Window and skylight damage:</strong> Hail shatters single-glazed windows, skylights, and glass balcony balustrades. Wind-driven debris (branches, loose fencing, trampolines) impacts glazing. Broken windows and skylights create immediate water ingress points and security risks. Emergency board-up with plywood or polycarbonate sheeting secures these openings.
              </p>
              <p>
                <strong>Ceiling and insulation damage:</strong> Water entering through a damaged roof saturates ceiling insulation, which then collapses plasterboard ceilings under its weight. In Perth&rsquo;s warm climate, wet insulation creates a perfect mould growth environment within 24&ndash;48 hours. Saturated insulation must be removed promptly, and the ceiling cavity dried before replacement.
              </p>
              <p>
                <strong>Fencing, carport, and patio damage:</strong> Perth&rsquo;s ubiquitous colorbond fencing, patio structures, and carports are vulnerable to wind uplift and hail damage. While these are often lower-priority repairs, they form part of the overall insurance claim and should be documented immediately after the storm.
              </p>
              <p>
                <strong>Electrical damage:</strong> Lightning strikes, water ingress into switchboards, and storm damage to external electrical infrastructure (meter boxes, solar inverters) create immediate safety hazards. All electrical systems affected by storm damage must be isolated and inspected by a licensed electrician before re-energisation.
              </p>
            </div>
          ),
        },
        {
          heading: 'Emergency Tarping and Make-Safe Operations',
          body: (
            <div className="space-y-4">
              <p>
                Emergency tarping is the critical first response to storm-damaged roofs in Perth. Securing the roof prevents ongoing water damage from Perth&rsquo;s winter rainfall (June&ndash;August averages 125&ndash;170 mm per month) and limits the total scope of the restoration and insurance claim.
              </p>
              <p>
                <strong>Tarping methodology:</strong> IICRC-certified contractors deploy industrial-grade UV-stabilised tarpaulins secured with timber battens, screws (into existing roof structure), and weighted anchors. The tarp covers the damaged area plus a minimum 1-metre overlap on all sides to ensure water cannot enter at the edges. For tile roofs, tarps are secured without removing additional tiles. For metal roofs, the tarp is fastened to existing purlins or battens through the damaged sheeting.
              </p>
              <p>
                <strong>Safety considerations:</strong> Storm-damaged roofs present significant working-at-height risks. Damaged framing, loose tiles, wet surfaces, and ongoing storm activity all create hazards. Contractors assess roof access safety before commencing work. If conditions are unsafe (active lightning, severe wind, structural instability), internal water diversion using plastic sheeting and temporary guttering protects the interior until roof access is safe. All tarping work complies with the <em>Occupational Safety and Health Regulations 1996</em> (WA) requirements for working at height.
              </p>
              <p>
                <strong>Make-safe scope:</strong> Beyond tarping, the make-safe operation includes boarding up broken windows and skylights, isolating damaged electrical circuits, removing fallen debris from the property, and securing any structural elements at risk of further collapse. After make-safe is complete, the contractor provides a formal contract with full terms and conditions for the full restoration scope.
              </p>
              <p>
                <strong>Temporary repairs vs permanent restoration:</strong> Emergency tarping and board-up are temporary measures designed to prevent further damage. Permanent restoration — roof replacement, ceiling repair, window replacement, internal drying and remediation — is scoped separately after the make-safe assessment. Both the emergency make-safe and the permanent restoration are documented for your insurance claim.
              </p>
            </div>
          ),
        },
        {
          heading: 'Getting Your Perth Property Restored After Storm Damage — Process and Billing',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Disaster Recovery connects Perth property owners and managers with IICRC-certified storm damage contractors who respond across the entire metropolitan area, from Mandurah to Two Rocks and east to Kalamunda.
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Lodge your claim online</strong> — Submit your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> with photos of the damage, your suburb, and a description of the damage types (roof, windows, fencing, interior water damage). NRPG matches you with contractors experienced in Perth storm damage restoration.
                </li>
                <li>
                  <strong>Emergency response and make-safe</strong> — Contractors respond within 60 minutes, 24/7, across greater Perth. Emergency tarping, board-up, debris removal, and electrical isolation begin immediately when safe to do so. Work begins immediately without waiting for insurer approval.
                </li>
                <li>
                  <strong>Formal contract</strong> — After make-safe, the contractor provides a formal contract with full terms and conditions, including the complete restoration scope (roof repair/replacement, interior drying and restoration, window replacement, fencing, and structural repairs). We bill you directly so you control the process and timeline.
                </li>
                <li>
                  <strong>Restoration</strong> — Permanent roof repairs, internal drying (if water ingress has occurred), ceiling and insulation replacement, repainting, and all other restoration works are completed with ongoing documentation.
                </li>
                <li>
                  <strong>Full claims documentation</strong> — Comprehensive documentation is provided covering emergency make-safe, all damage categories, restoration works, and costs. You claim reimbursement from your insurer using this documentation.
                </li>
              </ol>
              <p className="mt-4">
                Payment plans are available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a> for storm damage restorations.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How quickly can emergency tarping be done after a storm in Perth?',
          answer: 'NRPG contractors provide a 60-minute emergency response across greater Perth, 24/7. However, after major storm events affecting thousands of properties (like the 2010 hailstorm), demand surges and response times may be longer. Lodging your claim immediately through disasterrecovery.com.au/claim ensures you are in the queue. Tarping typically takes 2–4 hours once the contractor is on site, depending on the damage extent and roof accessibility. If roof access is unsafe during active storms, internal water diversion protects the interior until conditions improve.',
        },
        {
          question: 'Does insurance cover storm damage in Perth?',
          answer: 'Most Australian home and building insurance policies cover storm damage including wind, hail, and rain damage to the building structure, roof, windows, contents, and fencing. However, policy excesses vary (some Perth policies have higher storm-specific excesses), and some policies exclude certain items like solar panels or have limits on fencing cover. Full claims documentation — including emergency make-safe, damage assessment, and restoration — is provided to support your claim for reimbursement.',
        },
        {
          question: 'Should I get emergency tarping or wait for my insurer to send someone?',
          answer: 'Get emergency tarping done immediately. Every rainfall event after the storm causes additional water damage through the damaged roof, increasing the total claim cost and the risk of mould growth. Insurers expect policyholders to take reasonable steps to mitigate further damage — emergency tarping is a recognised and claimable mitigation measure. We bill you directly so work begins immediately without waiting for insurer approval, and the emergency make-safe is documented as part of your overall claim.',
        },
        {
          question: 'What if my solar panels were damaged by hail in Perth?',
          answer: 'Hail-damaged solar panels are a common claim item after Perth storms. The contractor documents all panel damage (cracked glass, damaged frames, inverter impact) with photographs and model/serial numbers for your claim. Solar panel replacement is typically covered under building insurance, though some policies have sub-limits or specific solar exclusions — check your policy wording. Damaged panels should be isolated (switched off at the inverter and DC isolator) immediately for safety.',
        },
        {
          question: 'How is billing handled for Perth storm damage restoration?',
          answer: 'We bill you directly so work begins immediately without waiting for insurer approval. You control the process and the timeline. After make-safe, the contractor provides a formal contract with full terms and conditions. Full claims documentation is provided covering all damage categories and restoration works to support your insurance claim for reimbursement. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Emergency Board-Up After Storm Damage',
          href: '/guides/emergency/emergency-board-up-storm-damage',
          description: 'Comprehensive guide to securing storm-damaged properties through emergency board-up and tarping procedures.',
        },
        {
          title: 'Storm Damage Roof Leak Repair',
          href: '/guides/storm-damage/storm-damage-roof-leak-repair',
          description: 'Detailed guide to identifying, repairing, and documenting storm-caused roof leaks for insurance claims.',
        },
        {
          title: 'Wollongong Coastal Storm Damage',
          href: '/guides/locations/wollongong/wollongong-coastal-storm-damage',
          description: 'Coastal storm damage restoration covering salt spray, wind damage, and East Coast Low weather events.',
        },
      ]}
    />
  );
}
