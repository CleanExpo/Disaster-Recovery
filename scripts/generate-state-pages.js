const fs = require('fs');
const path = require('path');

// All Australian states and their major cities
const stateData = {
  nsw: {
    name: 'New South Wales',
    capital: 'Sydney',
    cities: ['Newcastle', 'Wollongong', 'Central Coast', 'Parramatta', 'Blacktown', 'Liverpool', 'Penrith'],
    disasters: ['Bushfires', 'Flooding', 'Storms', 'Coastal Erosion'],
    climateRisks: 'Increasing bushfire frequency and severe flooding events'
  },
  vic: {
    name: 'Victoria',
    capital: 'Melbourne',
    cities: ['Geelong', 'Ballarat', 'Bendigo', 'Frankston', 'Dandenong', 'Cranbourne', 'Shepparton'],
    disasters: ['Bushfires', 'Flooding', 'Storms', 'Heatwaves'],
    climateRisks: 'Extreme bushfire conditions and flash flooding'
  },
  qld: {
    name: 'Queensland',
    capital: 'Brisbane',
    cities: ['Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns', 'Toowoomba', 'Rockhampton', 'Mackay'],
    disasters: ['Cyclones', 'Flooding', 'Severe Storms', 'Storm Surge'],
    climateRisks: 'Tropical cyclones and monsoonal flooding'
  },
  wa: {
    name: 'Western Australia',
    capital: 'Perth',
    cities: ['Fremantle', 'Mandurah', 'Bunbury', 'Rockingham', 'Joondalup', 'Armadale', 'Midland'],
    disasters: ['Bushfires', 'Cyclones', 'Flooding', 'Severe Storms'],
    climateRisks: 'Northern cyclones and southern bushfires'
  },
  sa: {
    name: 'South Australia',
    capital: 'Adelaide',
    cities: ['Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Augusta', 'Port Lincoln', 'Gawler'],
    disasters: ['Bushfires', 'Heatwaves', 'Flooding', 'Severe Storms'],
    climateRisks: 'Extreme heat events and bushfire danger'
  },
  tas: {
    name: 'Tasmania',
    capital: 'Hobart',
    cities: ['Launceston', 'Devonport', 'Burnie', 'Kingston', 'Ulverstone', 'Bridgewater'],
    disasters: ['Bushfires', 'Flooding', 'Severe Storms', 'Landslides'],
    climateRisks: 'Increased bushfire risk and extreme weather events'
  },
  act: {
    name: 'Australian Capital Territory',
    capital: 'Canberra',
    cities: ['Belconnen', 'Tuggeranong', 'Gungahlin', 'Woden Valley', 'Weston Creek'],
    disasters: ['Bushfires', 'Storms', 'Hail', 'Frost Damage'],
    climateRisks: 'Bushfire smoke and severe storm events'
  },
  nt: {
    name: 'Northern Territory',
    capital: 'Darwin',
    cities: ['Palmerston', 'Alice Springs', 'Katherine', 'Tennant Creek', 'Nhulunbuy'],
    disasters: ['Cyclones', 'Flooding', 'Bushfires', 'Extreme Heat'],
    climateRisks: 'Severe tropical cyclones and monsoon flooding'
  }
};

// Template for state pages
const generateStatePage = (stateCode, state) => {
  return `import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MapPin, Shield, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Recovery ${state.name} | 24/7 Emergency Services | ${state.capital} & All Cities',
  description: 'Leading disaster recovery services across ${state.name}. Emergency response for ${state.disasters.join(', ')}. Serving ${state.capital}, ${state.cities.slice(0, 3).join(', ')} and all ${stateCode.toUpperCase()} regions. Call 1300 DISASTER.',
  keywords: [
    'disaster recovery ${state.name}',
    'emergency services ${state.capital}',
    '${state.disasters[0].toLowerCase()} cleanup ${stateCode.toUpperCase()}',
    'water damage ${state.name}',
    'fire damage restoration ${state.capital}',
    ...state.cities.map(city => \`\${city.toLowerCase()} disaster recovery\`),
    'insurance restoration ${state.name}',
    '24/7 emergency ${stateCode.toUpperCase()}'
  ]
};

export default function ${state.name.replace(/\s+/g, '')}Page() {
  const cities = ${JSON.stringify(state.cities)};
  const disasters = ${JSON.stringify(state.disasters)};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Disaster Recovery ${state.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              24/7 Emergency Response Across All ${stateCode.toUpperCase()} Regions
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-centre mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Phone className="mr-2 h-5 w-5" />
                1300 DISASTER
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
                Get Immediate Help
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-centre">
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm">Emergency Response</p>
              </div>
              <div>
                <p className="text-3xl font-bold">${state.cities.length + 1}+</p>
                <p className="text-sm">Cities Covered</p>
              </div>
              <div>
                <p className="text-3xl font-bold">30min</p>
                <p className="text-sm">Response Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm">Insurance Approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            ${state.name} Disaster Response Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disasters.map((disaster, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <AlertTriangle className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{disaster}</h3>
                <p className="text-gray-600 mb-4">
                  Rapid response and complete restoration for {disaster.toLowerCase()} damage.
                </p>
                <Link href={\`/services/\${disaster.toLowerCase().replace(/\s+/g, '-')}\`}>
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Serving All ${state.name} Regions
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <MapPin className="h-5 w-5 text-blue-600 inline mr-2" />
              <span className="font-bold">${state.capital}</span> (Capital)
            </Card>
            {cities.map((city, index) => (
              <Card key={index} className="p-4 hover:bg-gray-50 transition-colours">
                <MapPin className="h-5 w-5 text-gray-600 inline mr-2" />
                <Link href={\`/locations/\${stateCode.toLowerCase()}/\${city.toLowerCase().replace(/\s+/g, '-')}\`}>
                  <span className="hover:text-blue-600 cursor-pointer">{city}</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Risks */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <AlertTriangle className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              ${state.name} Climate & Disaster Risks
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              ${state.climateRisks}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Shield className="h-10 w-10 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Preparedness Plans</h3>
                <p className="text-sm text-gray-600">
                  Custom disaster preparedness for ${state.name} conditions
                </p>
              </Card>
              <Card className="p-6">
                <Clock className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Rapid Response</h3>
                <p className="text-sm text-gray-600">
                  Teams stationed across ${stateCode.toUpperCase()} for immediate deployment
                </p>
              </Card>
              <Card className="p-6">
                <CheckCircle2 className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Full Recovery</h3>
                <p className="text-sm text-gray-600">
                  Complete restoration to pre-disaster condition
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            ${state.name}'s Trusted Disaster Recovery Partner
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            When disaster strikes in ${state.name}, we're here 24/7. 
            From ${state.capital} to regional areas, no location is too remote.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-centre">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Call 1300 DISASTER
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
              Request Service Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}`;
};

// Create directories and files
const baseDir = path.join(__dirname, '..', 'src', 'app', 'locations');

Object.entries(stateData).forEach(([stateCode, state]) => {
  const stateDir = path.join(baseDir, stateCode);
  
  // Create state directory
  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }
  
  // Create state page
  const pagePath = path.join(stateDir, 'page.tsx');
  fs.writeFileSync(pagePath, generateStatePage(stateCode, state));
  
  console.log(`✅ Created ${state.name} page at locations/${stateCode}/page.tsx`);
  
  // Create city subdirectories
  state.cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    const cityDir = path.join(stateDir, citySlug);
    
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
    }
    
    // Create city-specific page
    const cityPageContent = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disaster Recovery ${city} | Emergency Services ${state.name}',
  description: '24/7 disaster recovery in ${city}, ${state.name}. Water damage, fire restoration, mould removal. Call 1300 DISASTER.',
};

export default function ${city.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Disaster Recovery ${city}</h1>
      <p className="text-xl">24/7 Emergency Services in ${city}, ${state.name}</p>
    </div>
  );
}`;
    
    fs.writeFileSync(path.join(cityDir, 'page.tsx'), cityPageContent);
  });
});

console.log('\\n✅ All state and city pages generated successfully!');