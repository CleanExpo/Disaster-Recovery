import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Restaurant Kitchen Fire Damage Restoration | Disaster Recovery',
  description: 'Expert answers and solutions for "restaurant kitchen fire damage restoration". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'restaurant kitchen fire damage restoration, disaster recovery, restoration services, Australia, IICRC certified' };

export default function RestaurantFireDamageRestorationPage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Restaurant Kitchen Fire Damage Restoration"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Restaurant Kitchen Fire Damage Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      sections={[
        {
          heading: 'Unique Challenges of Restaurant Fire Damage',
          body: (
            <div className="space-y-4">
              <p>
                Restaurant fires present restoration challenges that are fundamentally different from residential or general commercial fires. The combination of commercial cooking equipment, grease-laden exhaust systems, food products, and strict health authority requirements creates a restoration scenario that demands specialist knowledge and experience.
              </p>
              <p>
                <strong>Commercial kitchen fires</strong> are the leading cause of restaurant fire damage in Australia. Deep fryers, cooktops, char grills, and woks operate at extremely high temperatures. When cooking oils and greases ignite, they burn at temperatures exceeding 300&deg;C &mdash; significantly hotter than typical structural fires. This intense heat causes deeper penetration of soot and smoke residue into surfaces, more severe structural damage in a shorter timeframe, and accelerated destruction of equipment and finishes.
              </p>
              <p>
                <strong>Grease fires spread through exhaust systems.</strong> Commercial kitchen exhaust hoods, ductwork, and roof-mounted fans accumulate grease over time despite regular cleaning. When a fire reaches the exhaust system, it can travel the full length of the ductwork, igniting grease deposits throughout the system and potentially emerging on the roof or spreading to adjacent tenancies. This means the fire damage zone often extends far beyond the kitchen itself.
              </p>
              <p>
                <strong>Food contamination</strong> is an immediate concern. All food products in the premises &mdash; whether directly fire-damaged or not &mdash; are typically condemned after a fire event. Smoke particles, fire suppression chemicals (both dry powder and wet chemical agents), and soot contamination render food unsafe regardless of packaging. Walk-in cool rooms, dry stores, and bar stock are all affected. The total food loss can represent a significant portion of the claim.
              </p>
              <p>
                <strong>Fire suppression system discharge</strong> adds complexity. Commercial kitchens in Australia are required to have fire suppression systems (typically wet chemical systems for cooking areas). When activated, these systems discharge fire suppressant across the entire kitchen, coating equipment, surfaces, and food preparation areas. While the suppression prevents catastrophic loss, the cleanup of suppressant chemicals requires specialist methods and the equipment must be fully decontaminated before reuse.
              </p>
            </div>
          ),
        },
        {
          heading: 'Health Authority Clearance Requirements',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Before a restaurant can reopen after fire damage, it must satisfy the relevant state or territory health authority that the premises meets food safety standards. This is a non-negotiable requirement that directly affects your restoration timeline and must be factored into your business interruption planning.
              </p>
              <p>
                <strong>Regulatory framework:</strong> Each Australian state and territory administers food safety under the Food Standards Australia New Zealand (FSANZ) framework, implemented through state legislation. Your local council environmental health officer (EHO) is typically the authority responsible for approving your return to trade.
              </p>
              <p>
                <strong>What the health authority requires:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Complete removal of contaminated materials</strong> &mdash; All surfaces, equipment, and materials that cannot be verified clean must be removed and replaced. Porous materials (timber, some benchtops, unsealed grout) that have absorbed smoke or fire suppression chemicals typically cannot be adequately decontaminated and must be replaced.</li>
                <li><strong>Professional cleaning certification</strong> &mdash; All food contact surfaces, equipment, and preparation areas must be professionally cleaned and sanitised to food-grade standards. The restoration contractor provides a cleaning certificate documenting the methods used and the results achieved.</li>
                <li><strong>Equipment verification</strong> &mdash; All cooking equipment, refrigeration, and food preparation equipment must be inspected and verified safe for food use. Equipment that has been exposed to fire, heat, or fire suppression chemicals may require manufacturer assessment or replacement.</li>
                <li><strong>Structural and services compliance</strong> &mdash; Rebuilt areas must comply with the Building Code of Australia (BCA) and relevant Australian Standards for commercial kitchens, including ventilation (AS 1668.2), plumbing, electrical, and food premises design requirements.</li>
                <li><strong>Pre-opening inspection</strong> &mdash; Most councils require a pre-opening inspection by an EHO before you can resume trading. Schedule this early &mdash; inspection wait times vary by council and can be 1&ndash;3 weeks during busy periods.</li>
              </ul>
              <p>
                <strong>Documentation your EHO will expect:</strong> Cleaning and sanitisation certificates, equipment service and compliance reports, builder&apos;s compliance certificates for rebuilt areas, and updated food safety plans if your layout or equipment has changed.
              </p>
            </div>
          ),
        },
        {
          heading: 'Equipment Salvage Assessment',
          body: (
            <div className="space-y-4">
              <p>
                Commercial kitchen equipment represents a major capital investment. A thorough salvage assessment determines what can be professionally restored, what requires manufacturer reconditioning, and what must be written off and replaced. Getting this assessment right is critical for both your restoration timeline and your insurance claim.
              </p>
              <p>
                <strong>Equipment categories and typical outcomes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Stainless steel equipment</strong> (benches, shelving, sinks, range hoods) &mdash; Stainless steel is generally resilient to fire damage. Surface discolouration from heat and smoke can usually be restored through professional cleaning and polishing. However, equipment that has been subjected to extreme heat may have warped or lost its structural integrity. Welds and joints should be inspected for heat stress.
                </li>
                <li>
                  <strong>Cooking equipment</strong> (ovens, fryers, cooktops, char grills) &mdash; These are assessed individually. Gas connections, electrical wiring, thermostats, and safety systems must all be verified functional and safe. Equipment that sustained direct fire damage or extreme heat exposure typically requires manufacturer inspection and recertification. In many cases, replacement is faster and more cost-effective than reconditioning.
                </li>
                <li>
                  <strong>Refrigeration</strong> (cool rooms, fridges, freezers) &mdash; Refrigeration equipment is particularly sensitive to smoke contamination. Smoke particles and odour penetrate seals, insulation, and internal surfaces. While the mechanical systems may be undamaged, food-grade decontamination of internal surfaces is essential. Cool room panel insulation that has absorbed smoke often cannot be adequately cleaned and requires panel replacement.
                </li>
                <li>
                  <strong>Dishwashers and glass washers</strong> &mdash; Internal pumps, heating elements, and spray arms may be contaminated with fire suppression chemicals. Manufacturer service and full chemical flush are typically required before returning to use.
                </li>
                <li>
                  <strong>Point-of-sale and IT systems</strong> &mdash; Smoke damage to electronic equipment is often invisible but progressive. Soot particles cause corrosion on circuit boards and connectors over time. POS terminals, printers, and networking equipment in the affected area should be assessed by an electronic restoration specialist.
                </li>
              </ul>
              <p>
                <strong>Insurance documentation:</strong> Every piece of equipment must be photographed, documented with make, model, serial number, and age, and assigned a status (restorable, repairable, or write-off). This inventory forms a critical part of your contents claim. Replacement costs should be sourced from current supplier pricing, not depreciated book values.
              </p>
            </div>
          ),
        },
        {
          heading: 'Smoke and Soot Removal from Commercial Kitchens',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Smoke and soot from commercial kitchen fires are particularly challenging to remediate. The combustion of cooking oils, grease, plastics, and food products creates a complex mixture of residues that require specialist cleaning techniques beyond standard fire restoration methods.
              </p>
              <p>
                <strong>Types of residue in restaurant fires:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Protein-based soot</strong> &mdash; From burned food and organic materials. This residue is extremely difficult to remove, often invisible until it discolours surfaces over time, and produces a persistent pungent odour. It penetrates deeply into porous surfaces.</li>
                <li><strong>Grease-based soot</strong> &mdash; From cooking oils and fats. Greasy, sticky residue that smears when cleaned with standard methods. Requires specialist degreasing agents and techniques.</li>
                <li><strong>Synthetic soot</strong> &mdash; From burned plastics, rubber, and synthetic materials (common in kitchen equipment housings, electrical wiring, and floor coverings). Black, powdery residue that can be wiped but leaves staining that penetrates into surface pores.</li>
                <li><strong>Fire suppression chemical residue</strong> &mdash; Wet chemical agents (typically potassium-based) leave a white residue that is mildly corrosive and must be neutralised and removed from all surfaces.</li>
              </ul>
              <p>
                <strong>The restoration process:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>HEPA vacuuming</strong> &mdash; All surfaces are HEPA-vacuumed to remove loose soot particles before any wet cleaning begins. Disturbing soot without capturing it first drives particles deeper into surfaces.</li>
                <li><strong>Chemical cleaning</strong> &mdash; Specialist soot removers matched to the residue type (alkaline for protein soot, solvent-based for grease soot) are applied to all hard surfaces. Multiple cleaning passes are typically required.</li>
                <li><strong>Exhaust system cleaning</strong> &mdash; The entire exhaust system &mdash; hood, filters, ductwork, and fan &mdash; is stripped and cleaned or replaced. Fire damage to ductwork may require complete replacement to meet AS 1668.2 compliance.</li>
                <li><strong>Sealing</strong> &mdash; After cleaning, all structural surfaces (walls, ceilings, exposed structure) are sealed with a shellac-based or specialist fire-restoration sealer to encapsulate any residual odour molecules before painting.</li>
                <li><strong>Odour elimination</strong> &mdash; Thermal fogging and hydroxyl generation are used to neutralise smoke odour in areas that cannot be sealed (HVAC systems, concealed cavities, fabric-covered areas in dining rooms). Ozone treatment may be used in unoccupied spaces.</li>
              </ol>
            </div>
          ),
        },
        {
          heading: 'Returning to Trade: The Restoration-to-Reopening Process',
          body: (
            <div className="space-y-4">
              <p>
                Getting your restaurant back to trading as quickly as possible is the overriding priority. Every day closed costs you revenue, risks losing regular customers to competitors, and adds to your business interruption claim. Disaster Recovery connects you with contractors who understand the urgency and the specific requirements of returning a food business to trade.
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Lodge your claim online</strong> &mdash; Submit your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> with details of the fire event, affected areas, and whether the fire suppression system activated. NRPG instantly matches you with contractors experienced in commercial kitchen restoration.
                </li>
                <li>
                  <strong>Emergency make-safe</strong> &mdash; Board-up, securing the premises, removing fire debris, and assessing structural safety. The contractor determines whether the dining room can be separated from the kitchen to allow partial trading (takeaway, front-of-house service from a temporary kitchen) during the restoration.
                </li>
                <li>
                  <strong>Formal contract and scope</strong> &mdash; After make-safe, the contractor provides a formal contract with full terms and conditions, including a detailed scope of works, equipment assessment, and a restoration timeline that identifies your target reopening date. We bill you directly so work begins immediately without waiting for insurer approval.
                </li>
                <li>
                  <strong>Parallel workstreams</strong> &mdash; Experienced restaurant restoration contractors run multiple workstreams simultaneously: structural restoration, equipment assessment and ordering, exhaust system remediation, electrical and plumbing certification, and health authority liaison. Running these in parallel rather than sequentially can cut weeks off the restoration timeline.
                </li>
                <li>
                  <strong>Health authority clearance and reopening</strong> &mdash; The contractor coordinates with your local council EHO for the pre-opening inspection, provides all required documentation, and ensures the kitchen meets compliance requirements before you resume trading. Full claims documentation is provided to support your property damage and business interruption insurance claims.
                </li>
              </ol>
              <p className="mt-4">
                Payment plans are available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a> for commercial restorations. You control the process and claim reimbursement from your insurer using the comprehensive documentation we provide.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How long does it take to restore a restaurant after a kitchen fire?',
          answer: 'Minor fires (contained to a single appliance, no structural damage) can typically be restored in 1–2 weeks. Significant kitchen fires with exhaust system involvement, structural damage, and equipment replacement typically take 4–8 weeks. The timeline depends on the extent of structural damage, lead times for replacement equipment, and health authority inspection scheduling. Phased restoration can sometimes allow partial trading from the dining room while the kitchen is being rebuilt.',
        },
        {
          question: 'Do we need health authority approval before reopening?',
          answer: 'Yes. After a fire event, most Australian local councils require a pre-opening inspection by an environmental health officer (EHO) before you can resume trading. This verifies that all food contact surfaces are clean and safe, equipment is compliant, the kitchen meets food safety standards, and structural repairs comply with the Building Code. Schedule the inspection early — wait times vary by council.',
        },
        {
          question: 'Can commercial kitchen equipment be restored after a fire?',
          answer: 'Stainless steel benches, shelving, and sinks can often be professionally cleaned and restored. Cooking equipment (ovens, fryers, cooktops) that sustained direct fire or extreme heat damage typically requires manufacturer inspection and recertification, or replacement. Refrigeration with smoke-contaminated insulation usually requires panel replacement. Each piece is assessed individually — the contractor provides a detailed inventory with status (restorable, repairable, or write-off) for your insurance claim.',
        },
        {
          question: 'How is billing handled for restaurant fire restoration?',
          answer: 'We bill you directly — the restaurant owner or tenant — so work begins immediately without waiting for insurer approval. You control the process and the timeline. After make-safe, the contractor provides a formal contract with full terms and conditions. We provide full claims documentation (photos, scope of works, equipment inventory, progress reports) to support your insurance claim for reimbursement. Payment plans are available through Blue Fire Finance.',
        },
        {
          question: 'What about lost food stock — is that covered by insurance?',
          answer: 'Yes, food stock loss is typically covered under your business contents insurance. All food products in the premises are usually condemned after a fire event due to smoke contamination, fire suppression chemical exposure, and temperature abuse (refrigeration failure). Document all stock with photographs, supplier invoices, and estimated replacement values. Your stock inventory forms part of the contents claim that we help you document.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Retail Store Flood: Inventory Recovery Process',
          href: '/guides/commercial/retail-flood-inventory-recovery',
          description: 'How to triage inventory, document stock losses, and restore retail environments after flood damage.',
        },
        {
          title: 'Office Water Damage: Minimising Business Interruption',
          href: '/guides/commercial/office-water-damage-business-interruption',
          description: 'Managing water damage in commercial office environments with a focus on reducing operational downtime.',
        },
        {
          title: 'Emergency Board-Up After Storm Damage',
          href: '/guides/emergency/emergency-board-up-storm-damage',
          description: 'Securing damaged commercial and residential premises after storm events to prevent further loss.',
        },
      ]}
    />
  );
}
