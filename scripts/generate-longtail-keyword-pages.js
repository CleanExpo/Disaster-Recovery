const fs = require('fs');
const path = require('path');

// Comprehensive longtail keywords for disaster recovery
const longtailKeywords = {
  // Question-based longtail keywords (High intent)
  questions: [
    {
      keyword: 'how much does water damage restoration cost in australia',
      slug: 'how-much-water-damage-restoration-cost',
      title: 'Water Damage Restoration Cost Guide Australia 2024',
      category: 'cost-guides'
    },
    {
      keyword: 'how long does fire damage restoration take',
      slug: 'how-long-fire-damage-restoration',
      title: 'Fire Damage Restoration Timeline: What to Expect',
      category: 'guides'
    },
    {
      keyword: 'what to do immediately after flood damage',
      slug: 'what-to-do-after-flood-damage',
      title: 'Immediate Steps After Flood Damage: Emergency Guide',
      category: 'emergency-guides'
    },
    {
      keyword: 'is mould removal covered by insurance in australia',
      slug: 'mould-removal-insurance-coverage',
      title: 'Is Mould Removal Covered by Insurance in Australia?',
      category: 'insurance-guides'
    },
    {
      keyword: 'who to call for emergency water damage',
      slug: 'who-to-call-water-damage-emergency',
      title: 'Emergency Water Damage: Who to Call First',
      category: 'emergency-guides'
    },
    {
      keyword: 'when to call professional disaster restoration',
      slug: 'when-to-call-disaster-restoration',
      title: 'When to Call Professional Disaster Restoration Services',
      category: 'guides'
    },
    {
      keyword: 'why hire iicrc certified restoration company',
      slug: 'why-hire-iicrc-certified',
      title: 'Why IICRC Certification Matters for Restoration',
      category: 'certifications'
    },
    {
      keyword: 'where to find 24 hour emergency restoration',
      slug: 'find-24-hour-emergency-restoration',
      title: '24 Hour Emergency Restoration Services Near You',
      category: 'emergency'
    },
    {
      keyword: 'which restoration company is best in australia',
      slug: 'best-restoration-company-australia',
      title: 'Best Restoration Companies in Australia: How to Choose',
      category: 'guides'
    },
    {
      keyword: 'what does disaster recovery service include',
      slug: 'what-disaster-recovery-includes',
      title: 'What\'s Included in Disaster Recovery Services',
      category: 'services'
    }
  ],

  // Specific scenario longtail keywords
  scenarios: [
    {
      keyword: 'burst pipe water damage ceiling repair cost',
      slug: 'burst-pipe-ceiling-repair-cost',
      title: 'Burst Pipe Ceiling Damage: Repair Costs & Process',
      category: 'water-damage'
    },
    {
      keyword: 'storm damage roof leak emergency repair',
      slug: 'storm-damage-roof-leak-repair',
      title: 'Emergency Storm Damage Roof Leak Repairs',
      category: 'storm-damage'
    },
    {
      keyword: 'sewage backup cleanup health risks',
      slug: 'sewage-backup-health-risks',
      title: 'Sewage Backup: Health Risks & Safe Cleanup',
      category: 'biohazard'
    },
    {
      keyword: 'black mould removal bathroom ceiling',
      slug: 'black-mould-bathroom-ceiling',
      title: 'Black Mould on Bathroom Ceiling: Removal Guide',
      category: 'mould'
    },
    {
      keyword: 'flood damage hardwood floor restoration',
      slug: 'flood-damage-hardwood-floors',
      title: 'Restoring Flood Damaged Hardwood Floors',
      category: 'flood-damage'
    },
    {
      keyword: 'smoke damage cleaning after house fire',
      slug: 'smoke-damage-cleaning-guide',
      title: 'Smoke Damage Cleaning After House Fire',
      category: 'fire-damage'
    },
    {
      keyword: 'category 3 water damage insurance claim',
      slug: 'category-3-water-damage-insurance',
      title: 'Category 3 Water Damage: Insurance Claims Guide',
      category: 'insurance'
    },
    {
      keyword: 'contents pack out storage restoration',
      slug: 'contents-pack-out-storage',
      title: 'Contents Pack Out & Storage During Restoration',
      category: 'services'
    },
    {
      keyword: 'emergency board up services after storm',
      slug: 'emergency-board-up-storm-damage',
      title: 'Emergency Board Up Services After Storm Damage',
      category: 'emergency'
    },
    {
      keyword: 'structural drying equipment rental cost',
      slug: 'structural-drying-equipment-cost',
      title: 'Structural Drying Equipment: Rental vs Professional Service',
      category: 'equipment'
    }
  ],

  // Location + service longtail keywords
  locationService: [
    {
      keyword: 'emergency water extraction sydney cbd after hours',
      slug: 'sydney-cbd-emergency-water-extraction',
      title: 'Sydney CBD Emergency Water Extraction - 24/7 Service',
      category: 'locations/sydney'
    },
    {
      keyword: 'melbourne apartment flood damage restoration',
      slug: 'melbourne-apartment-flood-restoration',
      title: 'Melbourne Apartment Flood Damage Restoration',
      category: 'locations/melbourne'
    },
    {
      keyword: 'brisbane commercial water damage restoration',
      slug: 'brisbane-commercial-water-damage',
      title: 'Brisbane Commercial Water Damage Restoration',
      category: 'locations/brisbane'
    },
    {
      keyword: 'perth storm damage emergency response team',
      slug: 'perth-storm-damage-emergency',
      title: 'Perth Storm Damage Emergency Response',
      category: 'locations/perth'
    },
    {
      keyword: 'adelaide mould remediation rental property',
      slug: 'adelaide-rental-mould-remediation',
      title: 'Adelaide Rental Property Mould Remediation',
      category: 'locations/adelaide'
    },
    {
      keyword: 'gold coast high rise water damage',
      slug: 'gold-coast-high-rise-water-damage',
      title: 'Gold Coast High Rise Water Damage Specialists',
      category: 'locations/gold-coast'
    },
    {
      keyword: 'canberra government building restoration',
      slug: 'canberra-government-restoration',
      title: 'Canberra Government Building Restoration Services',
      category: 'locations/canberra'
    },
    {
      keyword: 'newcastle industrial flood recovery services',
      slug: 'newcastle-industrial-flood-recovery',
      title: 'Newcastle Industrial Flood Recovery Services',
      category: 'locations/newcastle'
    },
    {
      keyword: 'sunshine coast hotel water damage restoration',
      slug: 'sunshine-coast-hotel-restoration',
      title: 'Sunshine Coast Hotel Water Damage Restoration',
      category: 'locations/sunshine-coast'
    },
    {
      keyword: 'wollongong coastal property storm damage',
      slug: 'wollongong-coastal-storm-damage',
      title: 'Wollongong Coastal Property Storm Damage Repair',
      category: 'locations/wollongong'
    }
  ],

  // Insurance-specific longtail keywords
  insurance: [
    {
      keyword: 'how to document water damage for insurance claim',
      slug: 'document-water-damage-insurance',
      title: 'Documenting Water Damage for Insurance Claims',
      category: 'insurance'
    },
    {
      keyword: 'insurance approved restoration contractors australia',
      slug: 'insurance-approved-contractors',
      title: 'Insurance Approved Restoration Contractors',
      category: 'insurance'
    },
    {
      keyword: 'make safe services insurance coverage',
      slug: 'make-safe-insurance-coverage',
      title: 'Make Safe Services: What Insurance Covers',
      category: 'insurance'
    },
    {
      keyword: 'loss assessor vs restoration contractor',
      slug: 'loss-assessor-vs-contractor',
      title: 'Loss Assessor vs Restoration Contractor: Roles Explained',
      category: 'insurance'
    },
    {
      keyword: 'insurance claim water damage depreciation',
      slug: 'insurance-depreciation-water-damage',
      title: 'Understanding Depreciation in Water Damage Claims',
      category: 'insurance'
    }
  ],

  // Commercial-specific longtail keywords
  commercial: [
    {
      keyword: 'office building water damage business interruption',
      slug: 'office-water-damage-business-interruption',
      title: 'Office Water Damage: Minimizing Business Interruption',
      category: 'commercial'
    },
    {
      keyword: 'restaurant kitchen fire damage restoration',
      slug: 'restaurant-fire-damage-restoration',
      title: 'Restaurant Kitchen Fire Damage Restoration',
      category: 'commercial'
    },
    {
      keyword: 'retail store flood damage inventory recovery',
      slug: 'retail-flood-inventory-recovery',
      title: 'Retail Store Flood: Inventory Recovery Process',
      category: 'commercial'
    },
    {
      keyword: 'warehouse roof leak damage restoration',
      slug: 'warehouse-roof-leak-restoration',
      title: 'Warehouse Roof Leak Damage Restoration',
      category: 'commercial'
    },
    {
      keyword: 'data centre water damage recovery',
      slug: 'data-centre-water-damage',
      title: 'Data Centre Water Damage Recovery Services',
      category: 'commercial'
    }
  ],

  // Emergency-specific longtail keywords
  emergency: [
    {
      keyword: 'middle of night flooding emergency help',
      slug: 'middle-night-flooding-emergency',
      title: 'Middle of Night Flooding: Emergency Response',
      category: 'emergency'
    },
    {
      keyword: 'weekend public holiday emergency restoration',
      slug: 'weekend-public-holiday-emergency',
      title: 'Weekend & Public Holiday Emergency Restoration',
      category: 'emergency'
    },
    {
      keyword: 'christmas day water damage emergency',
      slug: 'christmas-emergency-water-damage',
      title: 'Christmas Day Water Damage Emergency Services',
      category: 'emergency'
    },
    {
      keyword: 'new years eve disaster recovery services',
      slug: 'new-years-eve-disaster-recovery',
      title: 'New Year\'s Eve Disaster Recovery Services',
      category: 'emergency'
    },
    {
      keyword: 'easter long weekend emergency restoration',
      slug: 'easter-weekend-emergency-restoration',
      title: 'Easter Long Weekend Emergency Restoration',
      category: 'emergency'
    }
  ]
};

// Page template for longtail keyword pages
const createLongtailPage = (keyword, slug, title, category) => {
  return `import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmergencyCTA } from '@/components/ui/emergency-cta';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Shield,
  Phone,
  FileText,
  Users,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: '${title} | Disaster Recovery Australia',
  description: 'Expert answers and solutions for "${keyword}". IICRC certified professionals available 24/7 across Australia.',
  keywords: '${keyword}, disaster recovery, restoration services, Australia, IICRC certified',
};

export default function ${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: '${keyword}',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional disaster recovery services for ${keyword.toLowerCase()}. Our IICRC certified technicians provide expert solutions with 24/7 emergency response across Australia.',
      },
    }],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ${title}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Expert solutions and answers for "${keyword}"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Get Immediate Help
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Free Assessment
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Understanding ${title}
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg mb-4">
                  When searching for "${keyword}", you need reliable, professional answers from certified experts. 
                  At Disaster Recovery Australia, we provide comprehensive solutions backed by IICRC certification and years of experience.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-4">Key Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>IICRC certified professionals with 200+ hours of training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>24/7 emergency response across all major Australian cities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>Insurance approved with direct billing available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>Guaranteed response within 30-60 minutes</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">Our Process</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">1</span>
                    <div>
                      <strong>Initial Assessment:</strong> Comprehensive evaluation of the situation
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">2</span>
                    <div>
                      <strong>Emergency Response:</strong> Immediate action to prevent further damage
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">3</span>
                    <div>
                      <strong>Professional Restoration:</strong> Complete restoration using industry-leading equipment
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">4</span>
                    <div>
                      <strong>Quality Assurance:</strong> Final inspection and certification
                    </div>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-8 mb-4">Why Choose Our Services</h3>
                <p className="mb-4">
                  For "${keyword}", you need a restoration company that combines technical expertise with rapid response. 
                  Our team offers:
                </p>
                <ul className="space-y-2">
                  <li>• Advanced equipment including thermal imaging and moisture detection</li>
                  <li>• Specialised techniques for complete restoration</li>
                  <li>• Direct insurance billing to simplify your claim</li>
                  <li>• Transparent pricing with no hidden fees</li>
                  <li>• Guarantee on all restoration work</li>
                </ul>
              </div>
            </Card>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">30-60min</div>
                <p className="text-sm text-gray-600">Response Time</p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-sm text-gray-600">Availability</p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <p className="text-sm text-gray-600">Hours Training</p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-sm text-gray-600">Insurance Approved</p>
              </Card>
            </div>

            {/* Related Links */}
            <Card className="p-8 mt-12">
              <h3 className="text-xl font-bold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/services" className="text-blue-600 hover:underline">
                  → View All Services
                </Link>
                <Link href="/emergency" className="text-blue-600 hover:underline">
                  → Emergency Response
                </Link>
                <Link href="/insurance-claims" className="text-blue-600 hover:underline">
                  → Insurance Claims Help
                </Link>
                <Link href="/faq" className="text-blue-600 hover:underline">
                  → Frequently Asked Questions
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <EmergencyCTA />
      </div>
    </>
  );
}`;
};

// Create all longtail keyword pages
function generateLongtailPages() {
  const baseDir = path.join(__dirname, '../src/app/guides');
  
  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  let pagesCreated = 0;
  const allKeywords = [
    ...longtailKeywords.questions,
    ...longtailKeywords.scenarios,
    ...longtailKeywords.locationService,
    ...longtailKeywords.insurance,
    ...longtailKeywords.commercial,
    ...longtailKeywords.emergency
  ];

  allKeywords.forEach(({ keyword, slug, title, category }) => {
    const categoryDir = path.join(baseDir, category);
    const pageDir = path.join(categoryDir, slug);
    const pagePath = path.join(pageDir, 'page.tsx');

    // Create directory structure
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    // Create page file
    if (!fs.existsSync(pagePath)) {
      const content = createLongtailPage(keyword, slug, title, category);
      fs.writeFileSync(pagePath, content);
      pagesCreated++;
      console.log(`✅ Created: ${category}/${slug}`);
    } else {
      console.log(`⏭️  Exists: ${category}/${slug}`);
    }
  });

  console.log(`\n✨ Longtail keyword page generation complete!`);
  console.log(`📄 Total pages created: ${pagesCreated}`);
  console.log(`📊 Total longtail keywords covered: ${allKeywords.length}`);
}

// Run the generation
generateLongtailPages();