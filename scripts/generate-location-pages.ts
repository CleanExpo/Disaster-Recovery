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
  // Regional Centres
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
  const svcLabel = service ? service.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) + ' ' : '';
  const safeName = location.name.replace(/\s+/g, '') + (service ? service.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('') : '');

  const content = `import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: '${svcLabel}${location.name} - 24/7 Emergency Restoration | Disaster Recovery',
  description: 'Leading disaster recovery in ${location.name}, ${location.state}. 24/7 emergency ${service ? service.replace(/-/g, " ") : "restoration"} services. Insurance approved.',
};

export default function ${safeName}Page() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        icon: <MapPin className="h-12 w-12" />,
        title: '${svcLabel}${location.name}',
        subtitle: 'Immediate disaster recovery response in ${location.name} and surrounding areas. 24/7 emergency service.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim/start' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: '${location.name}'${service ? ", href: '/" + slug + "'" : ''} },
        ${service ? "{ label: '" + svcLabel.trim() + "' }," : ''}
      ]}
    />
  );
}
`;

  return { slug, content };
}

function generateAllLocationPages() {
  const pagesDir = path.join(process.cwd(), 'app');
  const allLocations = [
    ...AUSTRALIAN_LOCATIONS.major,
    ...AUSTRALIAN_LOCATIONS.regional,
    ...AUSTRALIAN_LOCATIONS.remote
  ];

  let generated = 0;

  allLocations.forEach(location => {
    const slug = location.name.toLowerCase().replace(/\s+/g, '-');
    const locationDir = path.join(pagesDir, slug);
    if (!fs.existsSync(locationDir)) fs.mkdirSync(locationDir, { recursive: true });

    const mainPage = generateLocationPage(location);
    fs.writeFileSync(path.join(locationDir, 'page.tsx'), mainPage.content);
    generated++;

    SERVICES.forEach(service => {
      const serviceDir = path.join(locationDir, service);
      if (!fs.existsSync(serviceDir)) fs.mkdirSync(serviceDir, { recursive: true });
      const servicePage = generateLocationPage(location, service);
      fs.writeFileSync(path.join(serviceDir, 'page.tsx'), servicePage.content);
      generated++;
    });
  });

  console.log(`✅ Generated ${generated} location pages with Antigravity templates!`);
  console.log(`📍 ${allLocations.length} locations x ${SERVICES.length + 1} pages each`);
}

if (require.main === module) {
  generateAllLocationPages();
}

export { generateAllLocationPages, AUSTRALIAN_LOCATIONS, SERVICES };
