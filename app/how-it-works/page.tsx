import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works | Damage to Restoration',
  description: 'Your complete 6-step journey from property damage to full restoration. Emergency make-safe from $2,750, IICRC-certified contractors, client-direct billing, and flexible payment plans via Blue Fire Finance.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 50%, #0F2942 100%)',
        icon: <FileText className="h-12 w-12" />,
        title: 'How It Works',
        subtitle: 'From Damage to Restoration — Your Complete 6-Step Journey',
      }}
      cta={{ text: 'Lodge a Claim', href: '/claim' }}
      secondaryCta={{ text: 'Emergency Make-Safe Guide', href: '/insurance/emergency-make-safe-guide' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'How It Works' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Emergency Make-Safe', value: '$2,750' },
        { label: 'Certified Network', value: 'IICRC' },
        { label: 'Available', value: '24/7/365' },
      ]}
      sections={[
        {
          heading: 'Step 1: Lodge Your Claim Online',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Submit your property damage details through our online form — available 24 hours a day, 7 days a week, 365 days a year. No phone queues, no business-hours limitations. Provide information about the type of damage, your property location, and any insurance details you have on hand.</p>
              <p>Our platform accepts all damage types including water, fire, storm, mould, flood, biohazard, and sewage. Whether it is a residential home, commercial building, or industrial facility, we handle it all — from single rooms to 80-floor towers.</p>
            </div>
          ),
        },
        {
          heading: 'Step 2: Matched With a Certified Contractor',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Once your claim is submitted, our system immediately matches you with an IICRC-certified contractor in your area from the NRPG network. All contractors meet strict industry standards and carry comprehensive insurance.</p>
              <p><strong>A qualified restoration professional will contact you within 60 minutes</strong> to discuss your situation and schedule an on-site inspection. Your contractor communicates directly with you — no intermediaries, no delays.</p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Step 3: Emergency Make-Safe — $2,750',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Your contractor performs an emergency make-safe to stabilise the property and prevent further damage. The <strong>$2,750 initial emergency service</strong> covers:</p>
              <ul>
                <li><strong>24/7 emergency dispatch</strong> — IICRC-certified technician deployed to your property</li>
                <li><strong>Initial damage assessment</strong> — documented with photos, moisture readings, and scope notes</li>
                <li><strong>Emergency water extraction</strong> — industrial-grade pumps and extractors for standing water</li>
                <li><strong>Temporary weatherproofing</strong> — tarping, boarding, and sealing to prevent further damage</li>
                <li><strong>Insurance-compliant documentation</strong> — photos, readings, and initial scope for claim lodgement</li>
              </ul>
              <p>The $2,750 covers the emergency attendance and initial make-safe — not the total restoration cost. Full restoration is scoped and quoted separately once the emergency is resolved.</p>
              <p>
                <Link href="/insurance/emergency-make-safe-guide" className="text-blue-600 hover:underline font-medium">
                  Read the full Emergency Make-Safe Guide →
                </Link>
              </p>
            </div>
          ),
        },
        {
          heading: 'Step 4: Documentation & Formal Contract',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>After the emergency make-safe, your contractor provides an <strong>Authority to Commence</strong> — the formal contract that defines the full scope of restoration works, terms and conditions, and cost breakdown.</p>
              <p>This documentation is specifically designed for insurance claim support:</p>
              <ul>
                <li><strong>Detailed scope of works</strong> — exactly what restoration will be performed</li>
                <li><strong>Photo documentation</strong> — contemporaneous evidence of all damage at attendance</li>
                <li><strong>Moisture readings and assessment data</strong> — technical evidence supporting the scope</li>
                <li><strong>Compliant tax invoice</strong> — formatted with all fields required by Australian insurers for reimbursement</li>
              </ul>
              <p>You receive digital copies of all documentation for your records and for submission to your insurer.</p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Step 5: Full Restoration',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Your assigned contractor completes the full restoration to pre-loss condition. Depending on the damage type, this may include:</p>
              <ul>
                <li><strong>Structural drying</strong> — industrial dehumidification and air movement to IICRC S500 standards</li>
                <li><strong>Mould remediation</strong> — containment, removal, and treatment per IICRC S520 protocols</li>
                <li><strong>Smoke and soot removal</strong> — chemical cleaning, deodorisation, and air scrubbing</li>
                <li><strong>Structural repairs</strong> — rebuilding damaged walls, floors, ceilings, and fixtures</li>
                <li><strong>Contents restoration</strong> — cleaning, restoring, or replacing damaged belongings</li>
              </ul>
              <p>All work is performed to IICRC standards with ongoing documentation throughout the restoration process.</p>
            </div>
          ),
        },
        {
          heading: 'Step 6: Insurance Claim Support',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Once restoration is complete, you have all the documentation needed to claim reimbursement from your insurer. Your contractor provides:</p>
              <ul>
                <li><strong>Compliant invoicing</strong> — all invoices formatted for insurer acceptance with ABN, scope breakdown, and event details</li>
                <li><strong>Before-and-after photo evidence</strong> — documenting the damage and completed restoration</li>
                <li><strong>Technical reports</strong> — moisture readings, drying logs, and scope of works completed</li>
                <li><strong>Authority to Commence</strong> — the signed contract supporting your claim</li>
              </ul>
              <p><strong>We bill you directly — not your insurer.</strong> This means work begins immediately without waiting for insurer approval. You lodge the documentation with your insurer to claim reimbursement. Under the General Insurance Code of Practice (GICOP), insurers must respond to claims within <strong>10 business days</strong> of receipt.</p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Billing & Payment Options',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Disaster Recovery contractors bill you directly — the client, not the insurer. This is by design:</p>
              <ul>
                <li><strong>Work begins immediately</strong> — no waiting for insurer approval or scope disputes</li>
                <li><strong>You control the process</strong> — direct communication with your contractor, no intermediaries</li>
                <li><strong>Full claims documentation provided</strong> — we give you everything your insurer needs for reimbursement</li>
                <li><strong>Contractor provides a formal contract</strong> — clear terms and conditions after make-safe</li>
              </ul>
              <p><strong>Flexible payment plans</strong> are available through{' '}
                <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Blue Fire Finance</a>
                {' '}— so you can manage restoration costs while your insurance claim is processed.
              </p>
            </div>
          ),
          background: 'dark',
        },
        {
          heading: 'Why Choose Disaster Recovery?',
          body: (
            <div className="prose prose-lg max-w-none">
              <ul>
                <li><strong>Australia-wide coverage</strong> — certified contractors in every state and territory</li>
                <li><strong>24/7/365 availability</strong> — submit your claim any time, day or night, every day of the year</li>
                <li><strong>IICRC-certified network</strong> — every contractor meets the highest industry standards</li>
                <li><strong>60-minute response guarantee</strong> — a contractor will call you within the hour</li>
                <li><strong>Insurance-compliant documentation</strong> — all invoicing formatted for insurer acceptance</li>
                <li><strong>Client-direct billing</strong> — work begins immediately, no insurer delays</li>
                <li><strong>Flexible payment plans</strong> — manage costs through{' '}
                  <a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Blue Fire Finance</a>
                </li>
              </ul>
            </div>
          ),
        },
      ]}
      relatedPages={getRelatedPages('how-it-works')}
    />
  );
}
