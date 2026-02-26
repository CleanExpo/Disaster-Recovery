import { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Wollongong Coastal Property Storm Damage Repair | Disaster Recovery',
  description: 'Expert guide to coastal storm damage repair in Wollongong. Illawarra escarpment weather, East Coast Lows, salt spray damage, Wollongong to Kiama coverage, IICRC certified 24/7.',
  keywords: 'wollongong coastal storm damage, illawarra storm damage, east coast low wollongong, salt spray damage wollongong, shellharbour storm repair, kiama storm damage, IICRC certified' };

export default function WollongongCoastalStormDamagePage() {
  return (
    <AgGuidePageTemplate
      category="Locations"
      title="Wollongong Coastal Property Storm Damage Repair"
      subtitle="Expert guide to repairing coastal storm damage across the Illawarra — from Wollongong and Shellharbour to Kiama, covering East Coast Low events, escarpment weather patterns, and salt spray deterioration"
      gradient="linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)"
      icon={<MapPin className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Locations', href: '/guides/locations' },
        { label: 'Wollongong Coastal Property Storm Damage Repair' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'The Illawarra&rsquo;s Unique Storm Damage Profile',
          body: (
            <div className="space-y-4">
              <p>
                The Illawarra region — stretching from Helensburgh in the north through Wollongong, Shellharbour, and south to Kiama and Gerringong — experiences some of the most intense weather events on the NSW coast. The unique geography of the Illawarra escarpment, rising 300&ndash;500 metres directly behind the narrow coastal plain, creates localised weather patterns that amplify rainfall, funnel destructive winds, and produce flash flooding that devastates coastal properties with little warning.
              </p>
              <p>
                <strong>East Coast Lows</strong> are the Illawarra&rsquo;s most damaging weather events. These intense low-pressure systems form in the Tasman Sea and deliver sustained heavy rainfall (100&ndash;300+ mm in 24 hours), destructive wind gusts (100&ndash;140 km/h), large ocean swells, and coastal erosion. The August 1998 East Coast Low dumped over 300 mm on Wollongong in 48 hours, causing catastrophic flash flooding that killed a woman at Coledale and destroyed homes across the region. East Coast Lows typically occur between April and August but can form at any time of year.
              </p>
              <p>
                <strong>Orographic enhancement:</strong> The Illawarra escarpment forces moisture-laden onshore winds upward, cooling the air mass and intensifying rainfall. This orographic effect means that suburbs at the base of the escarpment — Thirroul, Bulli, Woonona, Balgownie, Mount Keira, and Keiraville — receive significantly more rainfall than the flat coastal suburbs further south. Annual rainfall in the northern Illawarra escarpment zone exceeds 1,400 mm, compared to 1,100 mm at Wollongong city and 900 mm at Shellharbour.
              </p>
              <p>
                <strong>Flash flooding:</strong> The narrow coastal plain between the escarpment and the ocean means that rainwater reaches the coast rapidly. Creeks descending the escarpment — Towradgi Creek, Fairy Creek, American Creek, and Mullet Creek — can rise from benign trickles to dangerous torrents within 30&ndash;60 minutes during intense rainfall. Properties along these creek corridors, particularly in Towradgi, Corrimal, Fairy Meadow, and Unanderra, are within defined flood zones.
              </p>
              <p>
                <strong>Salt spray and coastal erosion:</strong> Properties within 500 metres of the coastline — North Wollongong, Wollongong city beach, Port Kembla, Windang, Shellharbour, and the Kiama headlands — experience persistent salt spray that accelerates corrosion of metal roofing, guttering, fixings, and structural steel. During storm events, wind-driven salt spray can penetrate several kilometres inland. Coastal erosion during East Coast Low events threatens beachfront properties, particularly along the sand dune systems at Woonona, Bulli, and Thirroul.
              </p>
            </div>
          ),
        },
        {
          heading: 'Types of Coastal Storm Damage in the Illawarra',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Coastal storm events in the Illawarra typically cause multiple damage types simultaneously, requiring coordinated assessment and response across the entire property.
              </p>
              <p>
                <strong>Roof damage:</strong> Wind uplift, flying debris, and (less commonly) hail damage roof coverings across the Illawarra. Tile roofs in established suburbs (Figtree, Mount Warrigal, Dapto) lose ridge capping and tiles, while colorbond roofs in newer developments (Calderwood, Shell Cove, Flinders) experience sheet lifting and fixing failure. Any roof breach during an East Coast Low admits heavy, sustained rainfall that continues for hours or days, causing extensive internal water damage.
              </p>
              <p>
                <strong>Wind-driven rain penetration:</strong> Even without visible roof damage, driving rain during East Coast Lows penetrates through window frames, door seals, weep holes, and facade joints. Older weatherboard and fibro homes in the northern suburbs (Thirroul, Austinmer, Stanwell Park) are particularly susceptible. Water entry through the building envelope saturates wall cavities and insulation, creating hidden moisture problems that lead to mould growth weeks after the storm has passed.
              </p>
              <p>
                <strong>Flash flood damage:</strong> Properties in creek corridors and low-lying areas experience overland water flow and creek flooding during intense rainfall. Floodwater — always classified as Category 3 (black water) due to contamination from road surfaces, gardens, septic overflow, and industrial runoff — enters through doorways, garage entries, and subfloor vents. Flash flood damage requires full decontamination in addition to drying and restoration.
              </p>
              <p>
                <strong>Tree and vegetation damage:</strong> The Illawarra escarpment is heavily vegetated with tall eucalyptus forest. Storm winds bring down trees and large branches onto roofs, vehicles, fences, and power lines. In suburbs bordering bushland — Mount Keira, Balgownie, Stanwell Tops, Helensburgh — falling trees can cause catastrophic structural damage. Tree impact often punctures roofs and walls simultaneously, creating immediate water ingress.
              </p>
              <p>
                <strong>Salt damage to building fabric:</strong> Persistent salt spray deposits on external surfaces corrode metal components, deteriorate mortar in brickwork, and attack painted surfaces. After severe storm events, salt deposits are driven deep into the building fabric. If not cleaned off, salt continues to draw moisture (hygroscopic action), accelerating corrosion and causing ongoing deterioration long after the storm.
              </p>
            </div>
          ),
        },
        {
          heading: 'Restoration Approach for Coastal Storm Damage',
          body: (
            <div className="space-y-4">
              <p>
                Restoring coastal storm damage in the Illawarra requires an approach that addresses both the immediate damage and the underlying coastal exposure that will continue to affect the property.
              </p>
              <p>
                <strong>Emergency make-safe:</strong> The first priority is stopping further water ingress and securing the property. Emergency tarping of damaged roofs, boarding of broken windows, and temporary structural bracing of impact-damaged walls prevent additional damage during the remainder of the storm event. In the Illawarra, where East Coast Lows can persist for 2&ndash;4 days, effective emergency tarping is critical because the rain does not stop when the tarp goes on.
              </p>
              <p>
                <strong>Water extraction and decontamination:</strong> Standing water from flash flooding (Category 3) is extracted using truck-mounted and portable pumping equipment. All surfaces contacted by floodwater are cleaned with antimicrobial solutions. Porous materials (carpet, underlay, plasterboard, insulation) that have been submerged in Category 3 water are removed and replaced — they cannot be effectively decontaminated.
              </p>
              <p>
                <strong>Structural drying:</strong> The Illawarra&rsquo;s coastal humidity (average 65&ndash;75% year-round) makes structural drying more challenging than in drier inland areas. Industrial dehumidifiers and air movers are deployed to create a controlled drying environment within the building. Drying in the Illawarra typically takes 5&ndash;7 days for moderate water damage — longer than the 3&ndash;5 day average in drier climates. Daily moisture monitoring ensures all building materials reach their dry standard before restoration begins.
              </p>
              <p>
                <strong>Salt remediation:</strong> Storm-deposited salt is removed from external surfaces through pressure washing with fresh water. Metal components — roofing, guttering, fixings, structural steel — are inspected for corrosion damage and treated or replaced as needed. For properties within the primary salt zone (0&ndash;500 m from the coast), the contractor specifies marine-grade replacement materials where possible to improve resilience against future salt exposure.
              </p>
              <p>
                <strong>Mould prevention:</strong> In the Illawarra&rsquo;s humid climate, mould colonisation can begin within 24 hours of water exposure. Rapid water extraction, antimicrobial treatment, and deployment of drying equipment within 6 hours of the event are essential for preventing mould. If the storm prevents access for more than 24 hours (as occurs during severe East Coast Low events), mould assessment and remediation may be required as part of the overall restoration.
              </p>
            </div>
          ),
        },
        {
          heading: 'Getting Your Illawarra Property Restored — Process and Billing',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Disaster Recovery connects property owners across the Illawarra — from Helensburgh to Gerringong — with IICRC-certified contractors experienced in coastal storm damage restoration.
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Lodge your claim online</strong> — Submit your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> with photos of the damage, your suburb, and a description of the damage types (roof, flooding, tree impact, coastal erosion). NRPG matches you with contractors experienced in Illawarra coastal storm damage.
                </li>
                <li>
                  <strong>Emergency response and make-safe</strong> — Contractors respond within 60 minutes, 24/7, across the Illawarra from Helensburgh to Kiama. Emergency tarping, board-up, tree removal from structures, and water extraction begin immediately when safe to do so. Work begins immediately without waiting for insurer approval.
                </li>
                <li>
                  <strong>Formal contract</strong> — After make-safe, the contractor provides a formal contract with full terms and conditions, including the full scope of roof repair, decontamination, drying, salt remediation, and structural restoration. We bill you directly so you control the process and timeline.
                </li>
                <li>
                  <strong>Restoration</strong> — Permanent roof repairs, structural drying, mould prevention, salt remediation, and all interior and exterior restoration works are completed with ongoing documentation and moisture monitoring.
                </li>
                <li>
                  <strong>Full claims documentation</strong> — Comprehensive documentation is provided covering all damage categories, emergency make-safe costs, restoration works, and salt/mould remediation. You claim reimbursement from your insurer using this documentation.
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
          question: 'How quickly can storm damage response start in Wollongong during an East Coast Low?',
          answer: 'NRPG contractors provide a 60-minute emergency response across the Illawarra, 24/7. During severe East Coast Low events, demand surges and access may be restricted by flooding, road closures, or fallen trees. Lodging your claim immediately through disasterrecovery.com.au/claim ensures you are prioritised. Emergency tarping and make-safe begin as soon as conditions allow safe roof access and site entry. Internal water diversion can begin even while external conditions prevent roof access.',
        },
        {
          question: 'Does insurance cover East Coast Low storm damage in the Illawarra?',
          answer: 'Most Australian home and building insurance policies cover storm damage including wind, rain, and hail damage. Flood cover — specifically overland water flow from creeks and waterways — is often a separate policy endorsement. After recent flooding events, some Illawarra properties in high-risk creek corridors face higher premiums or flood exclusions. Check your policy wording for the distinction between "storm damage" (usually covered) and "flood" (may require separate cover). Full claims documentation is provided to support your claim for reimbursement.',
        },
        {
          question: 'How long does coastal storm damage restoration take in the Illawarra?',
          answer: 'Timelines depend on damage severity. Emergency tarping and make-safe take 2–6 hours on site. Structural drying in the Illawarra\'s humid climate typically takes 5–7 days (longer than drier areas). Full restoration including roof repairs, ceiling replacement, repainting, and flooring replacement can take 3–8 weeks depending on the scope. Properties with flash flood damage requiring full decontamination add 1–2 weeks. The contractor provides an estimated timeline from day one.',
        },
        {
          question: 'What about salt damage to my coastal property — is that covered by insurance?',
          answer: 'Salt spray damage that occurs as part of a storm event (wind-driven salt during an East Coast Low) is typically covered under storm damage provisions. Gradual salt deterioration (progressive corrosion over months or years) is generally excluded as "gradual deterioration" or "maintenance." Professional documentation distinguishes storm-related salt damage from pre-existing corrosion, which is critical for the insurance claim. The contractor specifies marine-grade replacement materials where possible.',
        },
        {
          question: 'How is billing handled for storm damage restoration in the Illawarra?',
          answer: 'We bill you directly so work begins immediately without waiting for insurer approval. You control the process and timeline. After make-safe, the contractor provides a formal contract with full terms and conditions. Full claims documentation is provided covering all damage categories, emergency make-safe, restoration works, and salt/mould remediation to support your insurance claim for reimbursement. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Perth Storm Damage Emergency Response',
          href: '/guides/locations/perth/perth-storm-damage-emergency',
          description: 'Storm damage emergency response in Perth, covering hail events, coastal wind damage, and emergency tarping procedures.',
        },
        {
          title: 'Storm Damage Roof Leak Repair',
          href: '/guides/storm-damage/storm-damage-roof-leak-repair',
          description: 'Comprehensive guide to identifying, repairing, and documenting storm-caused roof leaks for insurance claims.',
        },
        {
          title: 'Emergency Board-Up After Storm Damage',
          href: '/guides/emergency/emergency-board-up-storm-damage',
          description: 'Securing storm-damaged properties through emergency board-up and tarping to prevent further losses.',
        },
      ]}
    />
  );
}
