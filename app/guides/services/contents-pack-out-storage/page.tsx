import { Metadata } from 'next';
import { Wrench } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Contents Pack-Out & Storage During Restoration',
  description: 'What contents pack-out means, when it is necessary, the full process from inventory to return, insurance coverage, and how DR coordinates pack-out during restoration.',
  keywords: 'contents pack out, contents storage restoration, pack out process, contents inventory, insurance contents claim, restoration contents handling, furniture storage disaster',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/services/contents-pack-out-storage' },
};

export default function ContentsPackOutStoragePage() {
  return (
    <AgGuidePageTemplate
      category="Services"
      title="Contents Pack-Out & Storage During Restoration"
      subtitle="Protecting your belongings during property restoration — what pack-out involves, when it is necessary, and how the process works from inventory through to return."
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<Wrench className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Services', href: '/guides/services' },
        { label: 'Contents Pack-Out & Storage During Restoration' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      lastReviewed="2026-02-27"
      sections={[
        {
          heading: 'What Contents Pack-Out Means',
          body: (
            <div className="space-y-4">
              <p>
                Contents pack-out is the process of carefully removing, inventorying, and storing your personal belongings and furniture from a property that is undergoing restoration. It is a specialist service performed by trained technicians — not simply moving furniture out of the way.
              </p>
              <p>
                A professional pack-out involves:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Detailed inventory</strong> — Every item is catalogued, photographed, and tagged with a unique identifier. This creates a complete record of your belongings, their condition at time of removal, and their location throughout storage. This inventory is critical for your insurance claim.
                </li>
                <li>
                  <strong>Professional packing</strong> — Items are packed using appropriate materials for their type — acid-free tissue for documents and artworks, bubble wrap for fragile items, wardrobe boxes for clothing, and specialist crating for high-value or oversized pieces.
                </li>
                <li>
                  <strong>Secure transport</strong> — Packed items are transported to a secure, climate-controlled storage facility in enclosed vehicles. Chain of custody is maintained from your property to the storage location.
                </li>
                <li>
                  <strong>Specialist cleaning</strong> — Depending on the damage type, contents may undergo specialist cleaning during storage. Smoke-affected clothing can be ozone-treated, water-damaged documents can be freeze-dried, and electronics can be assessed for internal contamination.
                </li>
              </ul>
              <p>
                Pack-out is not about moving — it is about protecting, documenting, and preserving your belongings during what can be a disruptive and damaging restoration process.
              </p>
            </div>
          ),
        },
        {
          heading: 'When Pack-Out Is Necessary',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Not every restoration project requires a full contents pack-out. In some cases, contents can be moved to an unaffected area of the property (called &ldquo;manipulation&rdquo; or &ldquo;move and protect&rdquo;). A full pack-out is typically required when:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>The entire property is affected</strong> — Major water events, significant fire and smoke damage, or whole-of-property mould contamination mean there is no safe area within the property to store contents. Everything must come out for the restoration to proceed effectively.
                </li>
                <li>
                  <strong>Structural drying requires clear rooms</strong> — Commercial drying equipment (dehumidifiers and air movers) works most efficiently when rooms are cleared. Furniture and belongings block airflow, trap moisture underneath, and slow drying times. Removing contents can reduce drying duration from 7 days to 3 to 4 days, saving significant cost.
                </li>
                <li>
                  <strong>Contents are at risk of secondary damage</strong> — During restoration, demolition creates dust and debris. Drying equipment increases air movement. Chemical treatments (antimicrobials, deodorants) are applied. If contents remain in the property, they can sustain additional damage from these processes.
                </li>
                <li>
                  <strong>Contents need specialist cleaning</strong> — Smoke-affected, water-damaged, or contaminated belongings often require off-site specialist treatment that cannot be performed in the property during active restoration.
                </li>
                <li>
                  <strong>The property will be uninhabitable during restoration</strong> — If the restoration timeline is weeks rather than days, pack-out protects contents from the extended exposure to construction activity, dust, and environmental conditions.
                </li>
              </ul>
              <p>
                Your restoration contractor will recommend whether a full pack-out, partial pack-out, or on-site manipulation is appropriate based on the damage type, severity, and restoration scope.
              </p>
            </div>
          ),
        },
        {
          heading: 'The Pack-Out Process: Inventory, Packing, Transport, Storage, Return',
          body: (
            <div className="space-y-4">
              <p>
                A professional pack-out follows a structured process designed to protect your belongings and create a clear documentary trail for insurance:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>Pre-pack survey</strong> — Technicians walk through the property with you (where possible) and document the condition and location of all contents. High-value, sentimental, or fragile items are identified for special handling. Items that are clearly damaged beyond salvage are documented and separated.
                </li>
                <li>
                  <strong>Inventory and photography</strong> — Every item is photographed in situ, assigned a unique tracking number, and entered into an inventory database. The inventory records item description, room of origin, condition (pre-existing damage vs event-related damage), and any special handling requirements. This inventory becomes part of your insurance claim documentation.
                </li>
                <li>
                  <strong>Packing</strong> — Items are packed by category and fragility. Specialist packing materials are used: acid-free tissue for documents and photos, custom crating for artworks and mirrors, sealed containers for items requiring decontamination, and standard moving boxes for general household items. Each box is labelled with its tracking number and room of origin.
                </li>
                <li>
                  <strong>Transport</strong> — Packed contents are loaded onto enclosed vehicles and transported to a secure storage facility. Chain of custody documentation records the handover from your property to the transport vehicle to the storage facility.
                </li>
                <li>
                  <strong>Storage</strong> — Contents are stored in a secure, climate-controlled facility. Climate control is important because temperature and humidity extremes can cause additional damage to already-compromised items — mould growth on damp textiles, warping of timber furniture, corrosion of electronics. Storage duration depends on the restoration timeline.
                </li>
                <li>
                  <strong>Specialist cleaning (if required)</strong> — During storage, items identified as salvageable but damaged undergo appropriate cleaning: ozone treatment for smoke odour, ultrasonic cleaning for hard surfaces, freeze-drying for water-damaged documents, and dry cleaning for textiles.
                </li>
                <li>
                  <strong>Return and placement</strong> — Once restoration is complete and the property is confirmed safe and clean, contents are returned and placed in their original rooms. You check items against the inventory and sign off on the return.
                </li>
              </ol>
            </div>
          ),
        },
        {
          heading: 'Insurance Coverage for Contents',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Contents pack-out, storage, and cleaning are generally covered under Australian home and contents insurance policies as part of the restoration process. However, there are important details to understand:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Pack-out as part of restoration</strong> — Most insurers recognise pack-out as a necessary component of the restoration process, not a separate service. When contents must be removed for effective structural drying or decontamination, the cost is typically part of the overall restoration claim.
                </li>
                <li>
                  <strong>Contents sum insured</strong> — Your contents insurance has a separate sum insured from your building insurance. Damaged contents (items that cannot be salvaged) are claimed under your contents cover. Pack-out, storage, and cleaning of salvageable items is typically claimed as a restoration cost under your building cover.
                </li>
                <li>
                  <strong>Documentation is critical</strong> — The detailed inventory created during pack-out is your evidence for the contents claim. Without a professional inventory with photographs, item descriptions, and condition notes, it is very difficult to substantiate the value of damaged or destroyed contents to your insurer.
                </li>
                <li>
                  <strong>Temporary accommodation</strong> — If your contents are packed out because the property is uninhabitable, you may also be entitled to claim temporary accommodation under your policy. This is separate from the contents and building claims.
                </li>
              </ul>
              <p>
                <strong>Important:</strong> We bill you directly so that work — including pack-out — begins immediately without waiting for insurer approval. The full inventory, photographs, and pack-out documentation are provided as part of your claims documentation package, giving your insurer everything they need to process your reimbursement.
              </p>
            </div>
          ),
        },
        {
          heading: 'How Disaster Recovery Coordinates Pack-Out',
          body: (
            <div className="space-y-4">
              <p>
                When you lodge a claim through the Disaster Recovery platform, your matched IICRC-certified contractor assesses whether pack-out is required as part of their initial damage evaluation. Here is how we coordinate the process:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Assessment during make-safe</strong> — During the initial emergency response (covered by the $2,200 contractor credit), your contractor evaluates the damage extent and determines whether contents need to be packed out, moved within the property, or can remain in place.
                </li>
                <li>
                  <strong>Pack-out recommendation</strong> — If pack-out is recommended, your contractor explains why, provides a scope of works, and includes it in the formal contract provided after make-safe. You approve all works, including pack-out, before they proceed.
                </li>
                <li>
                  <strong>Coordinated timing</strong> — Pack-out is timed to occur before structural drying and restoration begins, so that rooms are clear for equipment deployment and the restoration can proceed at maximum efficiency. This coordination reduces total project duration and cost.
                </li>
                <li>
                  <strong>Single point of coordination</strong> — Your contractor manages the entire process — pack-out, storage, restoration, and return. You deal with one team, not multiple service providers, which simplifies communication and accountability.
                </li>
                <li>
                  <strong>Complete documentation</strong> — The pack-out inventory, storage records, and cleaning reports are included in the full claims documentation provided to you. This supports your insurance reimbursement for both the contents and the restoration costs.
                </li>
              </ul>
              <p>
                We bill you directly so work begins immediately without waiting for insurer approval. After the initial $2,750 commitment ($550 platform fee + $2,200 contractor credit), additional works including pack-out are quoted in the formal contract with full terms and conditions. Payment plans are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a>.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is a contents pack-out during property restoration?',
          answer: 'A contents pack-out is the professional process of removing, inventorying, photographing, packing, and securely storing your personal belongings and furniture while your property undergoes restoration. Every item is catalogued with a unique tracking number and stored in a climate-controlled facility. Items may undergo specialist cleaning (ozone treatment, ultrasonic cleaning, freeze-drying) during storage. Contents are returned and placed in their original rooms once restoration is complete.',
        },
        {
          question: 'Does insurance cover contents pack-out and storage?',
          answer: 'Most Australian home and contents insurance policies cover pack-out and storage as a necessary component of the restoration process. The pack-out inventory and documentation serve as evidence for your contents claim. We bill you directly so pack-out work begins immediately without waiting for insurer approval, and provide full documentation to support your reimbursement claim.',
        },
        {
          question: 'How long are my belongings stored during restoration?',
          answer: 'Storage duration depends on the restoration timeline. A typical residential water damage restoration takes 1 to 3 weeks from drying through to rebuild completion. Fire and smoke restoration may take 3 to 8 weeks. Major structural restoration can take several months. Your contractor provides estimated timeframes in the formal contract issued after make-safe. Contents are stored in secure, climate-controlled facilities throughout.',
        },
        {
          question: 'Can I choose which items are packed out?',
          answer: 'Yes. You can request a full pack-out (all contents removed), partial pack-out (specific rooms or categories), or on-site manipulation (furniture moved within the property). Your contractor recommends the approach based on damage type and restoration requirements, but you make the final decision. High-value or sentimental items can be prioritised for immediate removal if the property is at risk of further damage.',
        },
        {
          question: 'How do I know my belongings are safe in storage?',
          answer: 'Professional pack-out uses secure, climate-controlled storage facilities with controlled access. Every item is inventoried with photographs, assigned a unique tracking number, and its location in the facility is recorded. Chain of custody documentation tracks items from your property to transport to storage and back. Climate control prevents mould growth, warping, and corrosion that uncontrolled storage environments can cause.',
        },
      ]}
      relatedGuides={[
        {
          title: 'What Disaster Recovery Includes',
          href: '/guides/services/what-disaster-recovery-includes',
          description: 'The full platform service breakdown — from claim lodgement through to restoration completion.',
        },
        {
          title: 'Should I Take an Insurance Payout?',
          href: '/guides/insurance/should-i-take-a-payout',
          description: 'When cash settlements help and when they hurt — including the contents claims strategy.',
        },
        {
          title: 'Real Emergency Response Costs',
          href: '/guides/pricing/real-emergency-response-costs',
          description: 'What emergency disaster response actually costs in Australia — transparent pricing explained.',
        },
      ]}
    />
  );
}
