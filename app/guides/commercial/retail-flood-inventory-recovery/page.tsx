import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Retail Store Flood: Inventory Recovery Process | Disaster Recovery',
  description: 'Expert answers and solutions for "retail store flood damage inventory recovery". IICRC certified professionals available 24/7 nationwide.',
  keywords: 'retail store flood damage inventory recovery, disaster recovery, restoration services, Australia, IICRC certified' };

export default function RetailFloodInventoryRecoveryPage() {
  return (
    <AgGuidePageTemplate
      category="Commercial"
      title="Retail Store Flood: Inventory Recovery Process"
      subtitle="Expert answers and solutions for"
      gradient="linear-gradient(135deg, #1E293B 0%, #334155 100%)"
      icon={<Building2 className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Commercial', href: '/guides/commercial' },
        { label: 'Retail Store Flood: Inventory Recovery Process' },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      sections={[
        {
          heading: 'Inventory Triage: What Can Be Saved vs Written Off',
          body: (
            <div className="space-y-4">
              <p>
                When flood water enters a retail environment, the immediate question is: what stock can be saved? The answer depends on the type of water, the duration of exposure, and the nature of the inventory. Getting this triage right is critical &mdash; saving stock that should be condemned creates liability, while writing off stock that could be restored wastes money and inflates your claim unnecessarily.
              </p>
              <p>
                <strong>Water category determines salvageability:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Category 1 (clean water)</strong> &mdash; Burst pipes, supply line failures, rainwater ingress. Inventory contacted by clean water has the highest salvage potential. Non-porous items (sealed packaging, glass, metal, hard plastics) can often be cleaned and returned to stock. Porous items (clothing, textiles, paper products) may be recoverable through professional cleaning.</li>
                <li><strong>Category 2 (grey water)</strong> &mdash; Washing machine overflow, dishwasher discharge, HVAC condensate. Inventory contacted by grey water requires assessment. Sealed, non-porous items can potentially be decontaminated. Porous items and any food products are typically written off.</li>
                <li><strong>Category 3 (black water)</strong> &mdash; Sewage overflow, stormwater flooding, rising flood water. All porous inventory contacted by black water is written off without exception. Non-porous items in sealed packaging may be salvageable after decontamination, but the cost-benefit often favours write-off for lower-value items.</li>
              </ul>
              <p>
                <strong>Inventory types and typical outcomes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Electronics</strong> &mdash; Any electronic item that has been submerged or exposed to significant moisture is typically written off. Even brief water contact can cause corrosion on circuit boards that leads to failure days or weeks later. High-value electronics may warrant specialist electronic restoration assessment.</li>
                <li><strong>Clothing and textiles</strong> &mdash; Clean water exposure: professional laundering or dry cleaning can restore most garments. Grey or black water: write-off. Leather goods and suede are rarely recoverable after any water exposure.</li>
                <li><strong>Packaged food and beverages</strong> &mdash; Products in sealed, intact cans or glass with sealed lids may be salvageable after exterior decontamination. Products in cardboard, paper, or flexible packaging that has been compromised are written off. Any food product contacted by Category 2 or 3 water is condemned under FSANZ requirements.</li>
                <li><strong>Furniture and homewares</strong> &mdash; Solid timber can often be dried and restored. MDF, particleboard, and laminated products swell irreversibly when wet and are typically written off. Upholstered items contacted by contaminated water are written off.</li>
                <li><strong>Paper products, books, stationery</strong> &mdash; Wet paper products can be stabilised through freeze-drying if acted upon within 48 hours. This is most cost-effective for high-value items (rare books, important documents). General stationery stock is typically written off.</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Stock Documentation for Insurance Claims',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Thorough stock documentation is the foundation of a successful inventory insurance claim. Insurers require evidence of what was in the store, what was damaged, and what it will cost to replace. Start documenting before you begin any cleanup or disposal.
              </p>
              <p>
                <strong>Before you touch anything:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Photograph everything</strong> &mdash; Wide shots showing the water level and extent of flooding across the store. Close-up shots of damaged stock in situ, showing the type and extent of water contact. Photographs of shelving, displays, and storage areas with stock still in place. Your phone&apos;s timestamp and GPS metadata provide valuable evidence of timing and location.</li>
                <li><strong>Video walkthrough</strong> &mdash; A continuous video walkthrough of the store narrating what you see provides context that photographs alone cannot. Note the water level, the areas affected, and any visible damage to stock and fitout.</li>
                <li><strong>Do not dispose of damaged stock</strong> until it has been documented and your insurer has been notified. If stock must be moved for safety reasons (blocking exits, contamination hazard), photograph it in its original position first, then photograph it again after relocation.</li>
              </ol>
              <p>
                <strong>Building your stock claim:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Inventory records</strong> &mdash; Your point-of-sale (POS) system is your most valuable asset for stock claims. Pull reports showing current stock-on-hand quantities and cost prices. If you do not have a POS system, recent purchase orders, supplier invoices, and delivery dockets serve as evidence of stock levels and costs.
                </li>
                <li>
                  <strong>Categorised damage schedule</strong> &mdash; Create a spreadsheet listing each damaged item or product line with: description, quantity, purchase cost, retail value, damage status (write-off, restorable, undamaged), and the water category of exposure. This schedule becomes the core document of your stock claim.
                </li>
                <li>
                  <strong>Replacement cost evidence</strong> &mdash; Obtain current supplier quotes or price lists for replacement stock. Insurance policies typically cover replacement cost (what it costs to replace the stock today), not historical purchase cost or depreciated value. If suppliers have increased prices since your last order, use current pricing.
                </li>
                <li>
                  <strong>Disposal records</strong> &mdash; When damaged stock is disposed of, photograph the disposal, record the quantities, and if possible keep a sample of each product type as physical evidence. Disposal receipts from waste contractors provide additional documentation.
                </li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Store Fitout Restoration',
          body: (
            <div className="space-y-4">
              <p>
                Beyond inventory, the store fitout itself &mdash; flooring, wall linings, shelving, counters, lighting, signage, and point-of-sale infrastructure &mdash; requires assessment and restoration. Retail fitouts are designed for aesthetics and customer experience, which means water damage is often more visible and more impactful than in industrial or office environments.
              </p>
              <p>
                <strong>Flooring</strong> is typically the most affected element. Carpet tiles and broadloom carpet in retail environments must be assessed based on water category: Category 1 water may allow professional extraction, cleaning, and drying; Category 3 water requires removal and replacement. Vinyl and laminate flooring can trap water underneath, causing subfloor damage and mould growth if not lifted and the subfloor dried. Polished concrete and sealed tile floors are the most resilient and can usually be cleaned and dried in situ.
              </p>
              <p>
                <strong>Wall linings and display systems</strong> absorb water through capillary action, wicking moisture above the visible waterline. Plasterboard must be removed to at least 300mm above the highest point of water contact to allow the wall cavity to dry. Display shelving attached to wet walls must be removed to allow access. Melamine and MDF fixtures that have swelled are not recoverable and must be replaced.
              </p>
              <p>
                <strong>Electrical and data systems</strong> require inspection and testing by a licensed electrician before the store can be re-energised. Power outlets, data points, and switch plates below the waterline must be replaced. Cable that has been submerged must be tested and, if contaminated water was involved, typically replaced. POS terminals, EFTPOS machines, and customer display screens require specialist electronic assessment.
              </p>
              <p>
                <strong>The customer experience factor:</strong> Unlike industrial or back-of-house restoration, retail fitout restoration must deliver a result that is visually indistinguishable from pre-loss condition. Customers will not return to a store that looks or smells like it has been flooded. Odour elimination, fresh paint, and attention to finish quality are not cosmetic extras &mdash; they are essential to your return to trade.
              </p>
            </div>
          ),
        },
        {
          heading: 'Trading While Restoration Occurs',
          background: 'light',
          body: (
            <div className="space-y-4">
              <p>
                Every day a retail store is closed represents lost revenue and lost customers. Where possible, maintaining some level of trading during restoration reduces your total business interruption loss and keeps your customer base engaged.
              </p>
              <p>
                <strong>Options for continued trading:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Partial store operation</strong> &mdash; If the flood damage is contained to one section of the store, the restoration contractor can establish containment barriers (dust walls, plastic sheeting with negative air pressure) to separate the work zone from a functioning retail area. This works best in larger format stores with distinct departments.
                </li>
                <li>
                  <strong>Temporary premises</strong> &mdash; Pop-up shops, market stalls, or short-term leases in nearby vacant retail space can maintain your presence in the area. Document all costs (rent, signage, fit-out, advertising) for your business interruption claim.
                </li>
                <li>
                  <strong>Online sales pivot</strong> &mdash; If you have an e-commerce capability, redirecting customers to online ordering during the restoration period maintains revenue. If you do not have an existing online presence, setting up a basic ordering page and promoting it via social media and in-store signage (on the closed shopfront) can capture some sales. The cost of establishing this capability may be claimable as an &ldquo;increased cost of working&rdquo;.
                </li>
                <li>
                  <strong>Click and collect / phone orders</strong> &mdash; Even without a full online store, taking phone or email orders and fulfilling them from undamaged stock (stored off-site or at a temporary location) keeps revenue flowing and customers engaged.
                </li>
              </ul>
              <p>
                <strong>Important for your BI claim:</strong> Your insurer expects you to take &ldquo;reasonable steps to minimise the interruption&rdquo;. Demonstrating that you explored and implemented alternative trading arrangements strengthens your BI claim. Conversely, simply closing and waiting for restoration to finish, when alternative trading was feasible, may result in your BI payout being reduced.
              </p>
            </div>
          ),
        },
        {
          heading: 'Commercial Claims Documentation and Getting Back to Trade',
          body: (
            <div className="space-y-4">
              <p>
                Retail flood claims involve multiple insurance components: building damage (fitout and structure), contents (stock and equipment), and business interruption (lost revenue and additional costs). Each component requires its own documentation, and the quality of that documentation directly determines the outcome of your claim.
              </p>
              <p>
                <strong>Disaster Recovery connects you with IICRC-certified commercial restoration contractors</strong> who understand retail environments and the documentation requirements of commercial insurance claims. The process is designed to get you back to trading as quickly as possible.
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Lodge your claim online</strong> &mdash; Submit your emergency through <a href="/claim" className="text-blue-400 hover:underline">disasterrecovery.com.au/claim</a> with details of the flooding, affected stock and floor area, and whether the store is currently trading. NRPG instantly matches you with contractors experienced in retail restoration.
                </li>
                <li>
                  <strong>60-minute emergency response</strong> &mdash; Matched contractors respond within 60 minutes, 24/7. The initial focus is water extraction, stock triage and protection of salvageable inventory, and containment to limit the spread of damage.
                </li>
                <li>
                  <strong>Make-safe and stock documentation</strong> &mdash; The contractor documents all damaged stock and fitout with photographs, video, and detailed inventories before any cleanup or disposal begins. This documentation is provided as part of your claims package.
                </li>
                <li>
                  <strong>Formal contract and restoration</strong> &mdash; After make-safe, the contractor provides a formal contract with full terms and conditions, including scope of works and target reopening date. We bill you directly so work begins immediately without waiting for insurer approval. You control the process and claim reimbursement from your insurer using the full claims documentation we provide.
                </li>
                <li>
                  <strong>Fitout restoration and reopening</strong> &mdash; Structural drying, fitout restoration, and customer-facing finishes are completed to a standard that is indistinguishable from pre-loss condition. The contractor provides all documentation needed for your building, contents, and business interruption claims.
                </li>
              </ol>
              <p className="mt-4">
                Payment plans are available through <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Blue Fire Finance</a> for commercial restorations.
              </p>
            </div>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can flood-damaged retail stock be saved?',
          answer: 'It depends on the water category and the type of stock. Clean water (burst pipe) allows the highest salvage rates — non-porous items in sealed packaging can usually be cleaned and returned to stock. Contaminated water (stormwater flooding, sewage) means all porous items are written off. Electronics that have been submerged are typically written off regardless of water type. A professional triage assessment on day one is essential to maximise salvage and avoid condemning recoverable stock.',
        },
        {
          question: 'How do I document stock losses for my insurance claim?',
          answer: 'Photograph all damage before any cleanup begins (wide shots and close-ups). Pull stock-on-hand reports from your POS system. Create a categorised damage schedule listing every affected product with quantity, purchase cost, replacement cost, and damage status. Obtain current supplier pricing for replacement stock. Do not dispose of any stock until it has been documented and your insurer has been notified. Keep disposal receipts and sample items as physical evidence.',
        },
        {
          question: 'How long does it take to restore a flooded retail store?',
          answer: 'Minor flooding (Category 1 water, limited area) can typically be dried and restored within 5–10 days. Significant flooding requiring fitout replacement, new flooring, and complete restocking typically takes 3–6 weeks. The timeline depends on the extent of fitout damage, lead times for replacement materials and fixtures, and whether partial trading is possible during restoration. The contractor provides a target reopening date in the initial scope of works.',
        },
        {
          question: 'Can we keep trading while the store is being restored?',
          answer: 'Often, yes. Options include operating from an unaffected section of the store while restoration is contained to the damaged area, setting up a temporary pop-up location, pivoting to online or phone orders, or operating click-and-collect from a temporary location. Your insurer expects you to take reasonable steps to minimise the interruption — demonstrating alternative trading arrangements strengthens your business interruption claim.',
        },
        {
          question: 'How is billing handled for commercial retail restoration?',
          answer: 'We bill you directly — the store owner or tenant — so work begins immediately without waiting for insurer approval. You control the process and the timeline. After make-safe, the contractor provides a formal contract with full terms and conditions. We provide comprehensive claims documentation covering building damage, contents (stock) losses, and business interruption to support your insurance claim for reimbursement. Payment plans are available through Blue Fire Finance.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Restaurant Kitchen Fire Damage Restoration',
          href: '/guides/commercial/restaurant-fire-damage-restoration',
          description: 'Specialist restoration for restaurants including health authority clearance and commercial kitchen recovery.',
        },
        {
          title: 'Warehouse Roof Leak Damage Restoration',
          href: '/guides/commercial/warehouse-roof-leak-restoration',
          description: 'Large-scale restoration for warehouse environments affected by roof leaks, including stock protection and structural drying.',
        },
        {
          title: 'Middle-of-the-Night Flooding Emergency',
          href: '/guides/emergency/middle-night-flooding-emergency',
          description: 'What to do when flooding strikes outside business hours — emergency response and immediate actions.',
        },
      ]}
    />
  );
}
