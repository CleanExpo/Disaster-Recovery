import { Metadata } from 'next'
import { AntigravityServicePageTemplate } from '@/components/antigravity'
import { fireSmokeData } from '@/components/antigravity'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { generateServiceHowToSchema } from '@/lib/seo-schema'
import {  Clock, Shield, Flame, Wind, Home, AlertTriangle, CheckCircle, ArrowRight, AlertCircle, Truck, MessageSquare} from 'lucide-react'

// SEO Metadata with AI optimisation
export const metadata: Metadata = generateSEO({
  title: 'Fire Damage Restoration | 24/7 Response',
  description: 'Expert fire damage restoration across Australia. 24/7 emergency response for smoke damage, soot removal, odour elimination. IICRC-certified contractors.',
  keywords: [
    'fire damage restoration',
    'smoke damage cleanup',
    'fire restoration services',
    'smoke and soot removal',
    'fire damage repair',
    'odour removal after fire',
    'fire damage insurance claims',
    'emergency fire restoration',
    'IICRC fire damage certified',
    'structural fire damage repair',
    'contents restoration fire damage',
    'commercial fire damage restoration'
  ],
  canonical: 'https://disasterrecovery.com.au/services/fire-damage-restoration',
  openGraph: {
    title: 'Fire & Smoke Damage Restoration | 24/7 Emergency',
    description: 'Professional fire damage restoration and smoke cleanup across Australia. Fast response, IICRC-certified, complete restoration services.',
    images: [{ url: '/images/services/fire-damage-restoration.webp', alt: 'Fire Damage Restoration Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const fireDamageFAQs = [
  {
    question: "What should I do immediately after a fire?",
    answer: "First, ensure everyone is safe and don't re-enter the property until cleared by fire services. Contact your insurance company and lodge a claim online at disasterrecovery.com.au/claim — available 24/7. We'll secure your property, assess damage, and begin restoration immediately to prevent further damage from smoke and water."
  },
  {
    question: "How long does fire damage restoration take?",
    answer: "Minor fire damage typically takes 1-2 weeks to restore. Extensive fire damage requiring structural repairs can take 1-3 months. We provide a detailed timeline after our initial assessment and work efficiently to minimise disruption."
  },
  {
    question: "Will insurance cover fire damage restoration?",
    answer: "Most homeowner and business insurance policies cover fire damage restoration. We bill you directly so work begins immediately, then provide full documentation — photos, scope of works, and reports — to support your insurance reimbursement claim."
  },
  {
    question: "Can smoke damage be completely removed?",
    answer: "Yes, with professional equipment and techniques, smoke damage and odours can be completely eliminated. We use specialised cleaning agents, ozone treatment, thermal fogging, and air scrubbers to remove all traces of smoke from your property."
  },
  {
    question: "Is it safe to stay in my home after a fire?",
    answer: "This depends on the extent of damage. Even small fires can produce toxic smoke residues and compromise air quality. We perform air quality testing and recommend temporary relocation if necessary for your safety."
  },
  {
    question: "What items can be restored after fire damage?",
    answer: "Many items can be restored including furniture, electronics, clothing, documents, and photographs. Our content restoration specialists use ultrasonic cleaning, ozone treatment, and specialised techniques to salvage your valuable possessions."
  }
]

// Service schema data
const fireDamageServiceSchema = generateServiceSchema({
  name: 'Fire Damage Restoration',
  description: 'Complete fire damage restoration including smoke removal, soot cleanup, odour elimination, and structural repairs. 24/7 emergency response across Australia.',
  image: '/images/services/fire-damage-restoration.webp',
  areaServed: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Fire Damage Restoration', url: 'https://disasterrecovery.com.au/services/fire-damage-restoration' }
])

export default function FireDamageRestorationPage() {
  return <AntigravityServicePageTemplate data={fireSmokeData} heroImage="/images/generated/disaster-recovery/hero-fire-damage.webp" />;
}