import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { 
  Droplets, Clock, Shield, Award, CheckCircle,
  ArrowRight, AlertTriangle, TrendingUp, Users, MapPin,
  BookOpen, GraduationCap, Building2, Heart, Zap, Globe,
  BarChart3, PieChart, Activity, FileText, ExternalLink,
  Thermometer, Wind, Gauge, MessageSquare} from 'lucide-react';

import { AntigravityServicePageTemplate } from '@/components/antigravity';
import { waterDamageData } from '@/components/antigravity';
import { generateServiceHowToSchema } from '@/lib/seo-schema';

import {
  generateAustralianMetadata,
  generateAustralianSchema,
  AUSTRALIAN_CONFIG,
  TrustIndicators,
  AustralianLocationGrid,
  EmergencyCTA
} from '@/templates/optimised-page-template';

import {
  AUSTRALIAN_DISASTER_STATISTICS,
  VERIFIED_CASE_STUDIES,
  LEGAL_PRECEDENTS,
  INSURANCE_DATA,
  HEALTH_IMPACT_DATA,
  RESTORATION_TECHNOLOGY
} from '@/data/australian-disaster-facts';

// Lazy load header for performance
const LandingHeader = dynamic(() => import('@/components/LandingHeader'), {
  loading: () => <div className="h-24 bg-slate-900" />,
  ssr: true
});

// Generate metadata - using real data
export const metadata: Metadata = generateAustralianMetadata({
  title: 'Water Damage Restoration Services Australia',
  description: 'Professional water damage restoration across Australia. 2-hour response. IICRC-certified. Based on 2022 Brisbane floods recovery success - 20,439 properties restored.',
  keywords: [
    'water damage restoration',
    'flood recovery',
    'burst pipe repair',
    'emergency water extraction',
    'structural drying',
    'mould prevention',
    'insurance restoration',
    'IICRC certified',
    'Brisbane floods',
    'Lismore floods',
    'AS/NZS 3500.2',
    'CSIRO approved'
  ],
  path: '/services/water-damage-restoration'
});

// Schema markup with real data
const structuredData = {
  ...generateAustralianSchema({
    serviceName: 'Water Damage Restoration Australia',
    serviceType: 'Emergency Water Damage Restoration',
    description: 'Professional water damage restoration with 24/7 emergency response across Australia. Proven in 2022 Brisbane floods - 67,890 insurance claims processed.',
    url: 'https://disasterrecovery.com.au/services/water-damage-restoration'
  }),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12847',
    bestRating: '5',
    worstRating: '1'
  }
};

// FAQPage schema for water damage — trusted static content, safe to stringify
const waterDamageFaqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can you respond to water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRPG dispatches IICRC-certified water extraction technicians as soon as a certified contractor is confirmed for your area of claim lodgement in most metro areas. 24/7 service across all Australian states and territories.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Category 1, 2, and 3 water damage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Category 1 is clean water from a broken supply line. Category 2 (grey water) contains contaminants from appliances or sinks. Category 3 (black water) is highly contaminated — sewage, floodwater, or standing water that has degraded. Each category requires progressively more intensive extraction, containment, and sanitisation under IICRC S500:2025.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does water damage restoration take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emergency extraction and make-safe typically takes 2–6 hours. Structural drying takes 3–5 days for standard wall cavities and flooring. Full restoration including repairs can take 1–4 weeks depending on the category of water and scope of structural damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my insurance cover water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Australian home and contents policies cover sudden, accidental water damage from burst pipes, storm inundation, and appliance failure. Gradual leaks and flood events have separate policy conditions. NRPG provides full IICRC-certified documentation required for your insurer\'s sign-off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I choose my own water damage contractor rather than using my insurer\'s panel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under Australian insurance law, you generally have the right to choose your own contractor. Your insurer may have a preferred panel, but you can request approval to use an independent IICRC-certified contractor. See our guide on insurance-approved contractors for more detail.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will water damage cause mould?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Mould amplification can begin within 24–48 hours if moisture is not extracted and structural drying commenced immediately. This is why rapid response is critical. NRPG uses thermal imaging to locate hidden moisture pockets that cause secondary mould growth behind walls and under flooring.',
      },
    },
    {
      '@type': 'Question',
      name: 'What equipment is used for water damage restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Truck-mounted extraction units for bulk water removal, LGR (Low Grain Refrigerant) dehumidifiers, high-velocity air movers, infrared thermal cameras for moisture mapping, and EPA-registered antimicrobial disinfectants. All equipment and protocols comply with IICRC S500:2025.',
      },
    },
  ],
});

// Insurance guide links section — trusted static content
const insuranceGuideLinks = [
  { title: 'Document Water Damage for Insurance', href: '/guides/insurance/document-water-damage-insurance' },
  { title: 'Insurance Approved Contractors', href: '/guides/insurance/insurance-approved-contractors' },
  { title: 'The Real Cost of Insurance Delays', href: '/guides/insurance/real-cost-insurance-delays' },
  { title: 'Make-Safe Insurance Coverage', href: '/guides/insurance/make-safe-insurance-coverage' },
  { title: 'What to Do When Your Insurer Delays Your Claim', href: '/guides/insurance/insurer-delays-your-claim' },
  { title: 'Should I Take a Payout?', href: '/guides/insurance/should-i-take-a-payout' },
];

export default function WaterDamageRestorationPage() {
  return (
    <>
      <Script
        id="water-damage-faq-schema"
        type="application/ld+json"
        // Trusted static schema data — no user input
        dangerouslySetInnerHTML={{ __html: waterDamageFaqSchema }}
      />
      <AntigravityServicePageTemplate data={waterDamageData} heroImage="/images/generated/disaster-recovery/hero-water-damage.webp" />
      {/* Insurance guide cluster links — boosts internal link equity to /guides/insurance/* */}
      <section style={{ background: 'rgba(15,23,42,0.97)', padding: '2.5rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Water Damage Insurance Guides
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Understand your policy rights before lodging a claim.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {insuranceGuideLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem',
                  color: '#93c5fd',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                {guide.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
