import { Metadata } from 'next'
import { AntigravityServicePageTemplate } from '@/components/antigravity'
import { mouldRemediationData } from '@/components/antigravity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import ServiceChildLinks from '@/components/seo/ServiceChildLinks'
import { generateServiceHowToSchema } from '@/lib/seo-schema'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import {  Clock, Shield, AlertTriangle, CheckCircle, ArrowRight, Wind, Microscope, Home, Heart, FileCheck, AlertCircle, MessageSquare} from 'lucide-react'

// SEO Metadata with AI optimisation
export const metadata: Metadata = generateSEO({
  title: 'Mould Remediation Services | IICRC Certified',
  description: 'Expert mould remediation and removal across Australia. IICRC-certified mould inspection, testing, and complete removal. Health-focused solutions with 24/7 response.',
  keywords: [
    'mould remediation',
    'mould removal services',
    'black mould removal',
    'mould inspection services',
    'mould testing',
    'toxic mould remediation',
    'bathroom mould removal',
    'ceiling mould treatment',
    'mould prevention',
    'IICRC mould certified',
    'air quality testing mould',
    'flood mould remediation',
    'commercial mould removal',
    'residential mould services'
  ],
  canonical: 'https://disasterrecovery.com.au/services/mould-remediation',
  openGraph: {
    title: 'Professional Mould Remediation | IICRC-Certified',
    description: 'IICRC-certified mould remediation experts across Australia. Complete mould removal, air quality testing, and prevention. Lodge a claim online now.',
    images: [{ url: '/images/services/mould-remediation.webp', alt: 'Professional Mould Remediation Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const mouldFAQs = [
  {
    question: "How do I know if I have a mould problem?",
    answer: "Common signs include visible mould growth (black, green, or white patches), musty odours, water stains, peeling paint, and health symptoms like allergies or respiratory issues. If you suspect mould, use our online form for immediate assessment."
  },
  {
    question: "Is mould dangerous to my health?",
    answer: "Yes, mould can cause serious health issues including allergic reactions, asthma attacks, respiratory infections, and toxic effects from certain species like black mould. Children, elderly, and those with compromised immune systems are especially vulnerable. Professional remediation is essential for safety."
  },
  {
    question: "Can I remove mould myself?",
    answer: "Small areas (less than 1 square meter) might be DIY-manageable, but larger infestations require professional remediation. Improper removal can spread spores throughout your property and worsen the problem. Our certified technicians use containment, HEPA filtration, and proper PPE to safely remove mould."
  },
  {
    question: "How long does mould remediation take?",
    answer: "Small projects typically take 1-3 days, while extensive remediation can take 5-7 days. The timeline depends on the affected area size, mould type, and necessary repairs. We provide a detailed timeline after our initial assessment."
  },
  {
    question: "Will mould come back after remediation?",
    answer: "When properly remediated and with moisture sources addressed, mould should not return. We identify and fix the root cause, apply antimicrobial treatments, and provide prevention recommendations to ensure long-lasting results."
  },
  {
    question: "Does insurance cover mould remediation?",
    answer: "Coverage varies by policy. Mould resulting from covered perils like burst pipes or storms is often covered. We work with insurance companies and can help document your claim for maximum coverage."
  },
  {
    question: "What's the difference between mould removal and remediation?",
    answer: "Mould removal implies complete elimination, which is impossible as spores exist naturally. Remediation involves reducing mould to safe, natural levels through professional cleaning, removal of contaminated materials, and addressing moisture sources for long-term prevention."
  }
]

// Service schema data
const mouldServiceSchema = generateServiceSchema({
  name: 'Mould Remediation Services',
  description: 'Professional mould inspection, testing, removal and remediation services. IICRC-certified technicians providing safe, thorough mould elimination across Australia.',
  image: '/images/services/mould-remediation.webp',
  areaServed: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Mould Remediation', url: 'https://disasterrecovery.com.au/services/mould-remediation' }
])

export default function MouldRemediationPage() {
  return (
    <>
      <AntigravityServicePageTemplate data={mouldRemediationData} heroImage="/images/generated/disaster-recovery/hero-mould-remediation.webp" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">Mould Remediation Services</h2>
        <ServiceChildLinks category="mould-remediation" />
      </section>
    </>
  );
}
