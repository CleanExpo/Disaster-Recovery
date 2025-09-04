import fs from 'fs';
import path from 'path';

// All Australian locations for complete SEO domination
const AUSTRALIAN_LOCATIONS = {
  // Major Cities
  major: [
    { name: 'Sydney', state: 'NSW', postcode: '2000', population: 5312163 },
    { name: 'Melbourne', state: 'VIC', postcode: '3000', population: 5078193 },
    { name: 'Brisbane', state: 'QLD', postcode: '4000', population: 2560720 },
    { name: 'Perth', state: 'WA', postcode: '6000', population: 2192229 },
    { name: 'Adelaide', state: 'SA', postcode: '5000', population: 1376601 },
    { name: 'Gold Coast', state: 'QLD', postcode: '4217', population: 699226 },
    { name: 'Newcastle', state: 'NSW', postcode: '2300', population: 497955 },
    { name: 'Canberra', state: 'ACT', postcode: '2600', population: 462136 },
    { name: 'Sunshine Coast', state: 'QLD', postcode: '4556', population: 355631 },
    { name: 'Wollongong', state: 'NSW', postcode: '2500', population: 302739 },
    { name: 'Hobart', state: 'TAS', postcode: '7000', population: 252639 },
    { name: 'Geelong', state: 'VIC', postcode: '3220', population: 289400 },
    { name: 'Townsville', state: 'QLD', postcode: '4810', population: 196219 },
    { name: 'Cairns', state: 'QLD', postcode: '4870', population: 152729 },
    { name: 'Darwin', state: 'NT', postcode: '0800', population: 148564 },
    { name: 'Toowoomba', state: 'QLD', postcode: '4350', population: 143994 },
    { name: 'Ballarat', state: 'VIC', postcode: '3350', population: 113183 },
    { name: 'Bendigo', state: 'VIC', postcode: '3550', population: 121470 },
    { name: 'Launceston', state: 'TAS', postcode: '7250', population: 90953 },
    { name: 'Mackay', state: 'QLD', postcode: '4740', population: 85919 }
  ],
  // Regional Centers
  regional: [
    { name: 'Albury', state: 'NSW', postcode: '2640' },
    { name: 'Wodonga', state: 'VIC', postcode: '3690' },
    { name: 'Bundaberg', state: 'QLD', postcode: '4670' },
    { name: 'Rockhampton', state: 'QLD', postcode: '4700' },
    { name: 'Hervey Bay', state: 'QLD', postcode: '4655' },
    { name: 'Wagga Wagga', state: 'NSW', postcode: '2650' },
    { name: 'Port Macquarie', state: 'NSW', postcode: '2444' },
    { name: 'Tamworth', state: 'NSW', postcode: '2340' },
    { name: 'Orange', state: 'NSW', postcode: '2800' },
    { name: 'Dubbo', state: 'NSW', postcode: '2830' },
    { name: 'Shepparton', state: 'VIC', postcode: '3630' },
    { name: 'Mildura', state: 'VIC', postcode: '3500' },
    { name: 'Warrnambool', state: 'VIC', postcode: '3280' },
    { name: 'Gladstone', state: 'QLD', postcode: '4680' },
    { name: 'Maryborough', state: 'QLD', postcode: '4650' },
    { name: 'Mount Gambier', state: 'SA', postcode: '5290' },
    { name: 'Whyalla', state: 'SA', postcode: '5600' },
    { name: 'Kalgoorlie', state: 'WA', postcode: '6430' },
    { name: 'Bunbury', state: 'WA', postcode: '6230' },
    { name: 'Albany', state: 'WA', postcode: '6330' }
  ],
  // Remote/Rural for complete coverage
  remote: [
    { name: 'Broken Hill', state: 'NSW', postcode: '2880' },
    { name: 'Mount Isa', state: 'QLD', postcode: '4825' },
    { name: 'Alice Springs', state: 'NT', postcode: '0870' },
    { name: 'Broome', state: 'WA', postcode: '6725' },
    { name: 'Coober Pedy', state: 'SA', postcode: '5723' },
    { name: 'Thursday Island', state: 'QLD', postcode: '4875' },
    { name: 'Tennant Creek', state: 'NT', postcode: '0860' },
    { name: 'Katherine', state: 'NT', postcode: '0850' },
    { name: 'Port Hedland', state: 'WA', postcode: '6721' },
    { name: 'Karratha', state: 'WA', postcode: '6714' }
  ]
};

const SERVICES = [
  'water-damage',
  'fire-damage',
  'mould-remediation',
  'storm-damage',
  'flood-restoration',
  'sewage-cleanup',
  'biohazard-cleaning',
  'structural-drying',
  'smoke-damage',
  'emergency-restoration'
];

function generateLocationPage(location: any, service?: string) {
  const slug = location.name.toLowerCase().replace(/\s+/g, '-');
  const serviceSlug = service || '';
  
  const content = `import type { Metadata } from 'next'
import { generateAllSchemas } from '@/lib/seo-schema'
import Script from 'next/script'

export const metadata: Metadata = {
  title: \`${service ? service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' ' : ''}${location.name} - 24/7 Emergency Restoration | Disaster Recovery\`,
  description: \`Leading disaster recovery in ${location.name}, ${location.state}. 24/7 emergency ${service ? service.replace('-', ' ') : 'restoration'} services. Insurance approved. Response within 60 minutes. Call 1300-DISASTER.\`,
  keywords: [
    '${service || 'disaster recovery'} ${location.name}',
    'emergency ${service || 'restoration'} ${location.name}',
    '${location.name} ${service || 'water damage'} restoration',
    '24 hour ${service || 'emergency'} ${location.name}',
    'insurance approved ${service || 'restoration'} ${location.name}',
    'IICRC certified ${location.name}',
    '${service || 'flood'} damage ${location.name} ${location.state}',
    'same day ${service || 'restoration'} ${location.name}',
    '${location.name} ${service || 'property'} damage repair',
    'best ${service || 'restoration'} company ${location.name}'
  ].join(', '),
  alternates: {
    canonical: \`https://disasterrecovery.com.au/${slug}${serviceSlug ? '/' + serviceSlug : ''}\`
  },
  openGraph: {
    title: \`${location.name} ${service ? service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Disaster Recovery'} - 24/7 Emergency Service\`,
    description: \`Trusted disaster recovery specialists in ${location.name}. Immediate response, insurance approved, certified contractors.\`,
    url: \`https://disasterrecovery.com.au/${slug}${serviceSlug ? '/' + serviceSlug : ''}\`,
    images: ['/images/disaster-recovery-og.jpg']
  }
}

export default function ${location.name.replace(/\s+/g, '')}${service ? service.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') : ''}Page() {
  const schemas = generateAllSchemas('location', '${location.name}', '${location.postcode}');
  
  return (
    <>
      <Script
        id="location-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas)
        }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold mb-6">
              ${service ? service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' ' : ''}${location.name} 
              <span className="block text-3xl mt-2">24/7 Emergency Restoration</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              Immediate disaster recovery response in ${location.name} and surrounding areas. 
              Our network of ${location.population ? Math.floor(location.population / 1000) : '50'}+ certified contractors 
              are ready 24/7 for any emergency.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:1300-DISASTER" className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-xl font-bold">
                Call 1300-DISASTER
              </a>
              <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-lg text-xl font-bold">
                Get Instant Estimate
              </button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Emergency Services in ${location.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              ${SERVICES.map(s => `
              <div className="border rounded-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4">
                  ${s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional ${s.replace('-', ' ')} restoration services across ${location.name}, ${location.state}. 
                  24/7 availability with 60-minute response time.
                </p>
                <a href="/${slug}/${s}" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Learn More →
                </a>
              </div>
              `).slice(0, 6).join('')}
            </div>
          </div>
        </section>

        {/* Local Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Servicing All ${location.name} Areas
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg mb-6">
                Our ${location.name} disaster recovery network provides comprehensive coverage across:
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  ${location.name} CBD and Metro Areas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  All ${location.name} Suburbs
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  ${location.state} Regional Areas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  24/7 Emergency Response
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600">60min</div>
                <p className="text-gray-600">Response Time</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">24/7</div>
                <p className="text-gray-600">Availability</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">100%</div>
                <p className="text-gray-600">Insurance Approved</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600">IICRC</div>
                <p className="text-gray-600">Certified</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}`;
  
  return { slug, content };
}

// Generate all location pages
function generateAllLocationPages() {
  const pagesDir = path.join(process.cwd(), 'app');
  
  // Combine all locations
  const allLocations = [
    ...AUSTRALIAN_LOCATIONS.major,
    ...AUSTRALIAN_LOCATIONS.regional,
    ...AUSTRALIAN_LOCATIONS.remote
  ];
  
  let generated = 0;
  
  allLocations.forEach(location => {
    const slug = location.name.toLowerCase().replace(/\s+/g, '-');
    const locationDir = path.join(pagesDir, slug);
    
    // Create location directory
    if (!fs.existsSync(locationDir)) {
      fs.mkdirSync(locationDir, { recursive: true });
    }
    
    // Generate main location page
    const mainPage = generateLocationPage(location);
    fs.writeFileSync(path.join(locationDir, 'page.tsx'), mainPage.content);
    generated++;
    
    // Generate service-specific pages for each location
    SERVICES.forEach(service => {
      const serviceDir = path.join(locationDir, service);
      if (!fs.existsSync(serviceDir)) {
        fs.mkdirSync(serviceDir, { recursive: true });
      }
      
      const servicePage = generateLocationPage(location, service);
      fs.writeFileSync(path.join(serviceDir, 'page.tsx'), servicePage.content);
      generated++;
    });
  });
  
  console.log(`✅ Generated ${generated} location pages for complete Australian coverage!`);
  console.log(`📍 ${allLocations.length} locations x ${SERVICES.length + 1} pages each`);
}

// Run if called directly
if (require.main === module) {
  generateAllLocationPages();
}

export { generateAllLocationPages, AUSTRALIAN_LOCATIONS, SERVICES };