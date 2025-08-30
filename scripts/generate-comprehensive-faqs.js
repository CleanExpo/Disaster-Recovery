const fs = require('fs');
const path = require('path');

// Comprehensive FAQ data for each service
const faqCategories = [
  {
    slug: 'general',
    name: 'General Questions',
    description: 'Common questions about our disaster recovery services',
    faqs: [
      {
        question: 'How does your online system work?',
        answer: 'Simply fill out our online form with your damage details and location. We instantly match you with IICRC certified contractors within your selected radius (20-100km). You\'ll receive multiple quotes within 30-60 minutes.'
      },
      {
        question: 'Why is there a $2,200 minimum service fee?',
        answer: 'The $2,200 minimum covers emergency response, professional assessment, initial mitigation, industrial equipment, certified technicians, and insurance documentation. This ensures proper restoration and prevents secondary damage that could cost thousands more.'
      },
      {
        question: 'Are all contractors IICRC certified?',
        answer: 'Yes, 100% of our network contractors must maintain current IICRC certification, carry $20M public liability insurance, and meet strict Disaster Recovery Network standards.'
      },
      {
        question: 'How quickly can someone respond?',
        answer: 'Emergency response times vary by location and contractor availability. Typically: Metro areas 30-60 minutes, Regional areas 1-2 hours, Remote areas 2-4 hours. All contractors offer 24/7 emergency service.'
      },
      {
        question: 'Do you have a phone number to call?',
        answer: 'We operate exclusively through our online form system to ensure fastest response and proper contractor matching. This system is available 24/7 and connects you directly with qualified local contractors.'
      }
    ]
  },
  {
    slug: 'water-damage',
    name: 'Water Damage FAQs',
    description: 'Everything about water damage restoration',
    faqs: [
      {
        question: 'How long does water damage restoration take?',
        answer: 'Typical timeline: Day 1: Water extraction and assessment. Days 2-4: Drying and dehumidification. Days 5-7: Restoration and repairs. Severe damage may take 2-3 weeks. Acting within 24-48 hours prevents mould growth.'
      },
      {
        question: 'What are the categories of water damage?',
        answer: 'Category 1: Clean water from broken pipes or rain. Category 2: Grey water from appliances with contamination. Category 3: Black water from sewage or flooding, highly contaminated. Each requires different treatment protocols.'
      },
      {
        question: 'Will my insurance cover water damage?',
        answer: 'Most home insurance covers sudden water damage from burst pipes, storms, or appliance failures. Gradual damage from lack of maintenance usually isn\'t covered. Our contractors bill insurance directly.'
      },
      {
        question: 'Can I stay in my home during restoration?',
        answer: 'For minor damage in isolated areas, yes. For extensive damage, Category 3 water, or when electricity is affected, temporary relocation is recommended for safety and health reasons.'
      },
      {
        question: 'What happens if mould has already started?',
        answer: 'Mould can begin within 24-48 hours. Our contractors perform mould remediation including containment, removal, treatment, and prevention. Additional costs apply but are usually insurance covered.'
      }
    ]
  },
  {
    slug: 'fire-damage',
    name: 'Fire & Smoke Damage FAQs',
    description: 'Fire and smoke restoration questions answered',
    faqs: [
      {
        question: 'Is it safe to enter after a fire?',
        answer: 'Never enter until fire services declare it safe and structural integrity is confirmed. Dangers include structural collapse, toxic fumes, electrical hazards, and contaminated air. Wait for professional assessment.'
      },
      {
        question: 'How do you remove smoke smell?',
        answer: 'Complete odour removal requires: Thermal fogging, ozone treatment, hydroxyl generators, HEPA air filtration, sealing affected surfaces, and sometimes removing porous materials. DIY methods only mask odours temporarily.'
      },
      {
        question: 'What can be saved after fire damage?',
        answer: 'Many items can be restored: Metal and glass items, some electronics after professional cleaning, hard non-porous surfaces, some clothing and textiles. Items usually unsalvageable: Food, medicines, cosmetics, heavily charred materials.'
      },
      {
        question: 'How long does fire restoration take?',
        answer: 'Minor smoke damage: 3-7 days. Moderate fire damage: 2-4 weeks. Major structural damage: 2-6 months. Timeline includes assessment, cleaning, repairs, and reconstruction as needed.'
      },
      {
        question: 'Will insurance cover all fire damage?',
        answer: 'Most policies cover fire damage comprehensively including structure, contents, additional living expenses, and smoke damage. Coverage limits and deductibles apply. Document everything for claims.'
      }
    ]
  },
  {
    slug: 'mould-removal',
    name: 'Mould Remediation FAQs',
    description: 'Important information about mould removal',
    faqs: [
      {
        question: 'How dangerous is mould in my home?',
        answer: 'Mould poses health risks including allergies, respiratory issues, and toxic reactions. Black mould (Stachybotrys) is particularly dangerous. Children, elderly, and immune-compromised individuals are at highest risk.'
      },
      {
        question: 'Can I remove mould myself?',
        answer: 'Small areas under 1 square meter might be DIY with proper protection. Larger infestations require professional remediation due to health risks, proper containment needs, and risk of spreading spores.'
      },
      {
        question: 'How much does mould removal cost?',
        answer: 'Costs vary by extent: Small area (under 10 sq m): $2,200-$3,500. Medium area (10-30 sq m): $3,500-$7,000. Large area (30+ sq m): $7,000-$20,000+. Includes containment, removal, treatment, and prevention.'
      },
      {
        question: 'How do you prevent mould returning?',
        answer: 'Prevention requires: Fix moisture source, maintain humidity below 50%, ensure proper ventilation, use mould-resistant materials, regular inspections, and immediate water damage response.'
      },
      {
        question: 'Is mould removal covered by insurance?',
        answer: 'Coverage depends on cause. Mould from covered water damage (burst pipe, storm) is usually covered. Mould from maintenance issues or long-term leaks typically isn\'t. Check your specific policy.'
      }
    ]
  },
  {
    slug: 'insurance-claims',
    name: 'Insurance Claims FAQs',
    description: 'Navigate the insurance claim process',
    faqs: [
      {
        question: 'How does direct insurance billing work?',
        answer: 'Our contractors invoice your insurance company directly. You pay nothing upfront except your excess. We handle all documentation, photos, and reports required for your claim.'
      },
      {
        question: 'What if my claim is denied?',
        answer: 'We can help appeal denials by providing additional documentation, expert reports, and clarification. Many initial denials are overturned with proper supporting evidence.'
      },
      {
        question: 'Do I need multiple quotes for insurance?',
        answer: 'Most insurers accept our contractors\' quotes immediately due to their certification and reputation. Our online system provides multiple quotes automatically for comparison.'
      },
      {
        question: 'What documentation do I need?',
        answer: 'Keep your policy number, claim number, photos of damage, and any correspondence. Our contractors handle technical documentation, moisture readings, and restoration reports.'
      },
      {
        question: 'How long do insurance claims take?',
        answer: 'Emergency mitigation starts immediately. Initial approval usually within 24-48 hours. Full claim settlement varies from 1-4 weeks depending on damage extent and insurer.'
      }
    ]
  },
  {
    slug: 'emergency-response',
    name: 'Emergency Response FAQs',
    description: 'Critical information for disaster emergencies',
    faqs: [
      {
        question: 'What should I do first in an emergency?',
        answer: 'Ensure safety first - evacuate if necessary. Turn off water/electricity if safe. Document damage with photos. Submit our online form immediately. Do not attempt major cleanup yourself.'
      },
      {
        question: 'Are services available 24/7?',
        answer: 'Yes, our online system and contractor network operate 24/7/365 including weekends and holidays. After-hours surcharges may apply but are insurance covered.'
      },
      {
        question: 'What\'s the difference between emergency and scheduled service?',
        answer: 'Emergency service: Immediate response for active damage, 30-60 minute response, prevents secondary damage. Scheduled service: For non-urgent repairs, planned within 1-3 days, often lower cost.'
      },
      {
        question: 'How do I choose between multiple contractor quotes?',
        answer: 'Consider: Response time, specific experience with your damage type, customer reviews, included services, warranty offered. All our contractors meet minimum standards, so choose based on your specific needs.'
      },
      {
        question: 'What areas do you service?',
        answer: 'We cover all of Australia through our certified contractor network. Major cities have multiple contractors. Regional and remote areas are serviced through extended radius partnerships.'
      }
    ]
  }
];

// Generate FAQ pages
faqCategories.forEach(category => {
  const pageContent = `import { Metadata } from 'next';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${category.name} | FAQ | Disaster Recovery',
  description: '${category.description}. Get answers to common questions about disaster recovery services, insurance claims, and emergency response.',
  keywords: ['disaster recovery FAQ', '${category.slug} questions', 'restoration help', 'insurance claims FAQ']
};

export default function ${category.name.replace(/[\s&]+/g, '')}Page() {
  const faqs = ${JSON.stringify(category.faqs, null, 2)};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <HelpCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ${category.name}
            </h1>
            <p className="text-xl">
              ${category.description}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <details className="group">
                    <summary className="flex items-start justify-between cursor-pointer list-none">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                          <HelpCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold pr-4">{faq.question}</h2>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:hidden" />
                      <ChevronUp className="h-5 w-5 text-gray-500 hidden group-open:block" />
                    </summary>
                    <div className="mt-4 ml-14">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            More FAQ Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            ${faqCategories.filter(c => c.slug !== category.slug).map(cat => `
            <Link href="/faq/${cat.slug}">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">${cat.name}</h3>
                <p className="text-sm text-gray-600">${cat.description}</p>
              </Card>
            </Link>`).join('')}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-centre">
          <AlertCircle className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Need Emergency Help Now?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - get connected with IICRC certified contractors in your area
          </p>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
              Get Emergency Help Online
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}`;

  // Create FAQ directory and page
  const faqDir = path.join(__dirname, '..', 'src', 'app', 'faq', category.slug);
  
  if (!fs.existsSync(faqDir)) {
    fs.mkdirSync(faqDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(faqDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${category.name} FAQ page`);
});

// Create main FAQ index page
const indexContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | All FAQs | Disaster Recovery',
  description: 'Find answers to all your questions about disaster recovery, water damage, fire restoration, mould removal, insurance claims, and emergency response.',
};

const categories = ${JSON.stringify(faqCategories.map(c => ({
  name: c.name,
  slug: c.slug,
  description: c.description,
  questionCount: c.faqs.length
})), null, 2)};

export default function FAQIndexPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <HelpCircle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get answers to common questions about disaster recovery, 
            insurance claims, and our contractor network.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link key={index} href={\`/faq/\${category.slug}\`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <HelpCircle className="h-10 w-10 text-blue-600" />
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-bold">
                      {category.questionCount} Questions
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-centre text-blue-600 font-bold">
                    View Questions <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Quick Answers to Top Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">How does your online system work?</h3>
              <p className="text-gray-700">
                Fill out our form, select your service radius (20-100km), and receive multiple 
                quotes from IICRC certified contractors within 30-60 minutes.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Why is there a $2,200 minimum fee?</h3>
              <p className="text-gray-700">
                This covers emergency response, professional assessment, equipment, certified 
                technicians, and insurance documentation - preventing thousands in secondary damage.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Is insurance coverage available?</h3>
              <p className="text-gray-700">
                Yes, most disasters are insurance covered. Our contractors bill insurance directly 
                so you only pay your excess.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Can't Find Your Answer?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get immediate help from certified professionals in your area
          </p>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Get Help Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}`;

const faqDir = path.join(__dirname, '..', 'src', 'app', 'faq');
if (!fs.existsSync(faqDir)) {
  fs.mkdirSync(faqDir, { recursive: true });
}
fs.writeFileSync(path.join(faqDir, 'page.tsx'), indexContent);

console.log('\n✅ All FAQ pages generated successfully!');
console.log(`Generated ${faqCategories.length} FAQ category pages.`);