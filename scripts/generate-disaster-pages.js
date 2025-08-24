const fs = require('fs');
const path = require('path');

// Disaster types by region
const disasters = [
  {
    slug: 'cyclone-response',
    name: 'Cyclone Damage Recovery',
    regions: ['Far North Queensland', 'Northern Territory', 'North Western Australia'],
    description: 'Expert cyclone damage restoration including structural repairs, water extraction, and debris removal',
    severity: 'Extreme',
    responseTime: '2-4 hours',
    keywords: ['cyclone damage', 'tropical storm recovery', 'wind damage repair'],
    cities: ['Cairns', 'Townsville', 'Darwin', 'Broome', 'Port Hedland']
  },
  {
    slug: 'bushfire-restoration',
    name: 'Bushfire & Smoke Damage',
    regions: ['NSW', 'Victoria', 'South Australia', 'Tasmania', 'Western Australia'],
    description: 'Complete bushfire recovery including smoke damage, soot removal, and structural restoration',
    severity: 'Extreme',
    responseTime: 'Immediate',
    keywords: ['bushfire restoration', 'smoke damage cleanup', 'fire recovery'],
    cities: ['Sydney', 'Melbourne', 'Adelaide', 'Hobart', 'Perth']
  },
  {
    slug: 'flood-recovery',
    name: 'Major Flood Recovery',
    regions: ['Queensland', 'Northern NSW', 'Victoria'],
    description: 'Comprehensive flood damage restoration, water extraction, and mould prevention',
    severity: 'High',
    responseTime: '1-2 hours',
    keywords: ['flood recovery', 'water damage restoration', 'flood cleanup'],
    cities: ['Brisbane', 'Gold Coast', 'Lismore', 'Ballarat', 'Shepparton']
  },
  {
    slug: 'storm-damage',
    name: 'Severe Storm Response',
    regions: ['All Australian States'],
    description: 'Emergency storm damage repairs including roof tarping, water extraction, and debris removal',
    severity: 'High',
    responseTime: '30 minutes',
    keywords: ['storm damage repair', 'emergency tarping', 'hail damage'],
    cities: ['All Capital Cities']
  },
  {
    slug: 'coastal-erosion',
    name: 'Coastal & Storm Surge Damage',
    regions: ['All Coastal Areas'],
    description: 'Specialized coastal property restoration from storm surge, king tides, and erosion damage',
    severity: 'High',
    responseTime: '2-4 hours',
    keywords: ['coastal damage', 'storm surge recovery', 'beach erosion repair'],
    cities: ['Gold Coast', 'Sunshine Coast', 'Newcastle', 'Wollongong', 'Perth Beaches']
  }
];

// Generate disaster-specific pages
disasters.forEach(disaster => {
  const pageContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Clock, Shield, Phone, MapPin, CheckCircle2, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '${disaster.name} Services | 24/7 Emergency Response | Disaster Recovery Australia',
  description: '${disaster.description}. Serving ${disaster.regions.join(', ')}. ${disaster.responseTime} response time.',
  keywords: ${JSON.stringify(disaster.keywords)}
};

export default function ${disaster.name.replace(/[&\s]+/g, '')}Page() {
  const regions = ${JSON.stringify(disaster.regions)};
  const cities = ${JSON.stringify(disaster.cities)};

  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">EMERGENCY HOTLINE: 1300 DISASTER (1300 347 278)</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                {disaster.severity.toUpperCase()} PRIORITY
              </span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {disaster.responseTime} RESPONSE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ${disaster.name}
            </h1>
            <p className="text-xl mb-8">
              ${disaster.description}
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Response Now
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-gray-900">
                <Zap className="mr-2 h-5 w-5" />
                Rapid Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our ${disaster.name} Response Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Emergency Contact</h3>
              <p className="text-sm text-gray-600">
                ${disaster.responseTime} guaranteed response
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Rapid Assessment</h3>
              <p className="text-sm text-gray-600">
                Complete damage evaluation & safety check
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Immediate Action</h3>
              <p className="text-sm text-gray-600">
                Emergency mitigation to prevent further damage
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Full Restoration</h3>
              <p className="text-sm text-gray-600">
                Complete recovery to pre-disaster condition
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Regions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ${disaster.name} Service Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <Card key={index} className="p-6">
                <MapPin className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">{region}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive coverage with local teams ready for deployment
                </p>
                <div className="flex flex-wrap gap-2">
                  {cities.slice(index * 2, index * 2 + 2).map((city, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {city}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disaster Statistics */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
              ${disaster.name} Impact & Response
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-bold text-orange-600">24/7</p>
                <p className="text-gray-600">Emergency Response</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">${disaster.responseTime}</p>
                <p className="text-gray-600">Response Time</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">100%</p>
                <p className="text-gray-600">Insurance Approved</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">10,000+</p>
                <p className="text-gray-600">Properties Restored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ${disaster.name} Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - every minute counts. Our expert teams are standing by 
            to respond immediately to your ${disaster.name.toLowerCase()} emergency.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call 1300 DISASTER Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Request Immediate Help
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Average response time: <strong>${disaster.responseTime}</strong> | 
            Service areas: <strong>${disaster.regions.length} regions</strong>
          </p>
        </div>
      </section>
    </div>
  );
}`;

  // Create disaster directory and page
  const disasterDir = path.join(__dirname, '..', 'src', 'app', 'disasters', disaster.slug);
  
  if (!fs.existsSync(disasterDir)) {
    fs.mkdirSync(disasterDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(disasterDir, 'page.tsx'), pageContent);
  console.log(`✅ Created ${disaster.name} page`);
});

// Create disasters index page
const indexContent = `import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Types & Emergency Response | All Australian Natural Disasters',
  description: 'Comprehensive disaster recovery for all types of natural disasters in Australia. Cyclones, bushfires, floods, storms, and more.',
};

const disasters = ${JSON.stringify(disasters.map(d => ({ 
  name: d.name, 
  slug: d.slug, 
  description: d.description,
  severity: d.severity,
  regions: d.regions 
})), null, 2)};

export default function DisastersPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-red-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            All Disaster Types Coverage
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Complete disaster recovery services for every type of natural disaster across Australia
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasters.map((disaster, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <span className={\`px-2 py-1 rounded text-xs font-bold text-white \${
                    disaster.severity === 'Extreme' ? 'bg-red-600' : 'bg-orange-600'
                  }\`}>
                    {disaster.severity}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3">{disaster.name}</h2>
                <p className="text-gray-600 mb-4">{disaster.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  Regions: {disaster.regions.slice(0, 2).join(', ')}
                  {disaster.regions.length > 2 && \` +\${disaster.regions.length - 2} more\`}
                </div>
                <Link href={\`/disasters/\${disaster.slug}\`}>
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

const disastersDir = path.join(__dirname, '..', 'src', 'app', 'disasters');
if (!fs.existsSync(disastersDir)) {
  fs.mkdirSync(disastersDir, { recursive: true });
}
fs.writeFileSync(path.join(disastersDir, 'page.tsx'), indexContent);

console.log('\\n✅ All disaster-specific pages generated successfully!');