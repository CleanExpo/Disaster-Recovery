const fs = require('fs');
const path = require('path');

// Industry-specific disaster recovery pages
const industries = [
  {
    slug: 'mining-resources',
    name: 'Mining & Resources',
    description: 'Specialized disaster recovery for mining operations, processing plants, and resource facilities',
    risks: ['Equipment damage', 'Site flooding', 'Chemical spills', 'Structural damage'],
    locations: ['Pilbara WA', 'Hunter Valley NSW', 'Bowen Basin QLD', 'Goldfields WA'],
    keywords: ['mining disaster recovery', 'mine site restoration', 'processing plant cleanup']
  },
  {
    slug: 'agriculture-farming',
    name: 'Agriculture & Farming',
    description: 'Farm and agricultural facility disaster recovery including livestock areas and crop storage',
    risks: ['Flood damage', 'Bushfire', 'Storm damage', 'Drought-related issues'],
    locations: ['Murray-Darling Basin', 'Wheatbelt WA', 'Darling Downs QLD'],
    keywords: ['farm disaster recovery', 'agricultural restoration', 'rural property cleanup']
  },
  {
    slug: 'healthcare-medical',
    name: 'Healthcare & Medical Facilities',
    description: 'Critical disaster recovery for hospitals, clinics, aged care, and medical centers',
    risks: ['Contamination', 'Power outages', 'Water damage', 'Biohazard incidents'],
    locations: ['All capital cities', 'Regional health districts'],
    keywords: ['hospital disaster recovery', 'medical facility restoration', 'healthcare cleanup']
  },
  {
    slug: 'education-schools',
    name: 'Education & Schools',
    description: 'School and university disaster recovery with minimal disruption to learning',
    risks: ['Water damage', 'Mould growth', 'Storm damage', 'Fire damage'],
    locations: ['All education precincts nationwide'],
    keywords: ['school disaster recovery', 'university restoration', 'education facility cleanup']
  },
  {
    slug: 'retail-shopping',
    name: 'Retail & Shopping Centers',
    description: 'Rapid restoration for retail stores and shopping centers to minimize business interruption',
    risks: ['Water damage', 'Fire damage', 'Storm damage', 'Vandalism cleanup'],
    locations: ['CBD areas', 'Westfield centers', 'DFO outlets'],
    keywords: ['retail disaster recovery', 'shopping center restoration', 'store cleanup']
  },
  {
    slug: 'hospitality-tourism',
    name: 'Hospitality & Tourism',
    description: 'Hotel, resort, and tourism facility disaster recovery across Australia',
    risks: ['Cyclone damage', 'Flooding', 'Fire damage', 'Guest area contamination'],
    locations: ['Gold Coast', 'Cairns', 'Sydney', 'Melbourne', 'Perth'],
    keywords: ['hotel disaster recovery', 'resort restoration', 'tourism facility cleanup']
  }
];

// Generate industry pages
industries.forEach(industry => {
  const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Shield, Clock, AlertTriangle, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '${industry.name} Disaster Recovery | Specialized Industrial Restoration | Australia',
  description: '${industry.description}. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: ${JSON.stringify(industry.keywords)}
};

export default function ${industry.name.replace(/[&\s]+/g, '')}Page() {
  const risks = ${JSON.stringify(industry.risks)};
  const locations = ${JSON.stringify(industry.locations)};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Building2 className="h-16 w-16 text-orange-500 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ${industry.name} Disaster Recovery
            </h1>
            <p className="text-xl mb-8">
              ${industry.description}
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: 1300 DISASTER
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-gray-900">
                Get Priority Response
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Risks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ${industry.name} Disaster Risks We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {risks.map((risk, index) => (
              <Card key={index} className="p-6">
                <AlertTriangle className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="font-bold mb-2">{risk}</h3>
                <p className="text-sm text-gray-600">
                  Specialized response protocols for ${industry.name.toLowerCase()} sector
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why ${industry.name} Trusts Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Minimal Downtime</h3>
                <p className="text-gray-600">
                  Priority response to get your operations running again
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Compliance Assured</h3>
                <p className="text-gray-600">
                  Meet all industry regulations and safety standards
                </p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Insurance Expertise</h3>
                <p className="text-gray-600">
                  Direct billing and claim management
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Servicing ${industry.name} Across Australia
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((location, index) => (
              <Card key={index} className="px-6 py-3">
                <span className="font-semibold">{location}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Protect Your ${industry.name} Assets
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let disasters disrupt your operations. Get priority emergency response 
            and expert restoration services tailored to ${industry.name.toLowerCase()}.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Phone className="mr-2 h-5 w-5" />
            Call 1300 DISASTER Now
          </Button>
        </div>
      </section>
    </div>
  );
}`;

  // Create industry directory and page
  const industryDir = path.join(__dirname, '..', 'src', 'app', 'industries', industry.slug);
  
  if (!fs.existsSync(industryDir)) {
    fs.mkdirSync(industryDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(industryDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${industry.name} page`);
});

// Create main industries index page
const indexContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry-Specific Disaster Recovery | Commercial & Industrial Restoration',
  description: 'Specialized disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
};

const industries = ${JSON.stringify(industries.map(i => ({ name: i.name, slug: i.slug, description: i.description })), null, 2)};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Building2 className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industry-Specific Disaster Recovery
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Tailored emergency response and restoration services for every Australian industry
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold mb-3">{industry.name}</h2>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <Link href={\`/industries/\${industry.slug}\`}>
                  <Button variant="outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}`;

const industriesDir = path.join(__dirname, '..', 'src', 'app', 'industries');
if (!fs.existsSync(industriesDir)) {
  fs.mkdirSync(industriesDir, { recursive: true });
}
fs.writeFileSync(path.join(industriesDir, 'page.tsx'), indexContent);

console.log('\\n✅ All industry pages generated successfully!');