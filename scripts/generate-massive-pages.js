const fs = require('fs');
const path = require('path');

// Time-based emergency pages
const timeBasedPages = [
  { slug: 'after-hours', name: 'After Hours Emergency', time: '5PM - 9AM' },
  { slug: 'weekend', name: 'Weekend Emergency', time: 'Saturday & Sunday' },
  { slug: 'public-holiday', name: 'Public Holiday Emergency', time: 'All Australian Holidays' },
  { slug: 'midnight', name: 'Midnight Emergency', time: '12AM - 6AM' },
  { slug: 'early-morning', name: 'Early Morning Emergency', time: '4AM - 7AM' },
  { slug: 'late-night', name: 'Late Night Emergency', time: '10PM - 2AM' },
  { slug: 'christmas', name: 'Christmas Emergency', time: 'December 24-26' },
  { slug: 'new-year', name: 'New Year Emergency', time: 'December 31 - January 2' },
  { slug: 'easter', name: 'Easter Emergency', time: 'Easter Long Weekend' },
  { slug: 'anzac-day', name: 'ANZAC Day Emergency', time: 'April 25' }
];

// Property types
const propertyTypes = [
  { slug: 'residential', name: 'Residential Properties', description: 'Houses, units, apartments' },
  { slug: 'commercial', name: 'Commercial Buildings', description: 'Offices, shops, warehouses' },
  { slug: 'strata', name: 'Strata Properties', description: 'Body corporate managed properties' },
  { slug: 'government', name: 'Government Facilities', description: 'Federal, state, local government' },
  { slug: 'heritage', name: 'Heritage Buildings', description: 'Protected and historical properties' },
  { slug: 'high-rise', name: 'High Rise Buildings', description: 'Apartments and office towers' },
  { slug: 'industrial', name: 'Industrial Facilities', description: 'Factories and warehouses' },
  { slug: 'rental', name: 'Rental Properties', description: 'Investment and rental homes' },
  { slug: 'luxury', name: 'Luxury Properties', description: 'High-value estates and homes' },
  { slug: 'rural', name: 'Rural Properties', description: 'Farms and country properties' }
];

// Equipment and technology pages
const equipment = [
  { slug: 'thermal-imaging', name: 'Thermal Imaging Cameras', purpose: 'Moisture detection' },
  { slug: 'moisture-meters', name: 'Professional Moisture Meters', purpose: 'Water damage assessment' },
  { slug: 'industrial-dehumidifiers', name: 'Industrial Dehumidifiers', purpose: 'Structural drying' },
  { slug: 'air-scrubbers', name: 'HEPA Air Scrubbers', purpose: 'Air purification' },
  { slug: 'hydroxyl-generators', name: 'Hydroxyl Generators', purpose: 'Odour elimination' },
  { slug: 'infrared-drying', name: 'Infrared Drying Systems', purpose: 'Targeted drying' },
  { slug: 'negative-air-machines', name: 'Negative Air Machines', purpose: 'Containment' },
  { slug: 'ozone-generators', name: 'Ozone Generators', purpose: 'Deodorization' },
  { slug: 'ultrasonic-cleaning', name: 'Ultrasonic Cleaning', purpose: 'Contents restoration' },
  { slug: 'drone-inspection', name: 'Drone Roof Inspection', purpose: 'Damage assessment' }
];

// Insurance companies
const insuranceCompanies = [
  'NRMA', 'AAMI', 'Allianz', 'QBE', 'Suncorp', 'CGU', 'Budget Direct',
  'RACQ', 'RACV', 'RAA', 'RAC', 'RACT', 'Youi', 'Woolworths Insurance',
  'Coles Insurance', 'CommInsure', 'ANZ Insurance', 'Westpac Insurance',
  'NAB Insurance', 'SGIC', 'SGIO', 'GIO', 'Shannons', 'Vero'
];

// Certifications
const certifications = [
  { slug: 'iicrc-certified', name: 'IICRC Certified', standard: 'International restoration standard' },
  { slug: 'australian-standards', name: 'Australian Standards Compliant', standard: 'AS/NZS compliance' },
  { slug: 'worksafe-certified', name: 'WorkSafe Certified', standard: 'Safety compliance' },
  { slug: 'asbestos-licensed', name: 'Asbestos Removal Licensed', standard: 'Class A & B asbestos' },
  { slug: 'hazmat-certified', name: 'HAZMAT Certified', standard: 'Hazardous materials' },
  { slug: 'iso-certified', name: 'ISO Certified', standard: 'Quality management' }
];

// Cities for combinations
const majorCities = [
  'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast',
  'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong', 'Geelong',
  'Hobart', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat',
  'Bendigo', 'Albury', 'Launceston', 'Mackay', 'Rockhampton', 'Bunbury',
  'Bundaberg', 'Coffs Harbour', 'Wagga Wagga', 'Hervey Bay', 'Mildura'
];

// Services for combinations
const services = [
  'water-damage', 'fire-damage', 'flood-restoration', 'mould-removal',
  'storm-damage', 'sewage-cleanup', 'carpet-drying', 'ceiling-repairs',
  'emergency-plumbing', 'contents-restoration', 'document-drying',
  'electronics-restoration', 'odour-removal', 'biohazard-cleanup'
];

// Generate time-based emergency pages
console.log('Generating time-based emergency pages...');
timeBasedPages.forEach(timePage => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'emergency', timePage.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { Clock, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '${timePage.name} Services | ${timePage.time} | 24/7 Disaster Recovery',
  description: 'Emergency disaster recovery services available ${timePage.time}. No call-out fees, immediate response across Australia.',
};

export default function ${timePage.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-red-900 to-orange-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <Clock className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">${timePage.name} Services</h1>
          <p className="text-xl mb-2">Available ${timePage.time}</p>
          <p className="text-2xl mb-8">No Extra Charges • Same Day Response</p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            <Phone className="mr-2" /> Call 1300 DISASTER Now
          </Button>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate property type pages
console.log('Generating property type pages...');
propertyTypes.forEach(property => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'property-types', property.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { Building2, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '${property.name} Disaster Recovery | ${property.description} | Australia',
  description: 'Specialised disaster recovery for ${property.name.toLowerCase()}. ${property.description}. Insurance approved, 24/7 response.',
};

export default function ${property.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Building2 className="h-16 w-16 text-orange-500 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">${property.name} Disaster Recovery</h1>
          <p className="text-xl mb-8">${property.description}</p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            Get Immediate Help
          </Button>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate equipment pages
console.log('Generating equipment and technology pages...');
equipment.forEach(equip => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'equipment', equip.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { Settings, Zap, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '${equip.name} | ${equip.purpose} | Advanced Restoration Technology',
  description: 'Professional ${equip.name.toLowerCase()} for ${equip.purpose.toLowerCase()}. Latest technology for faster, better restoration results.',
};

export default function ${equip.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Settings className="h-16 w-16 text-blue-500 mb-6 animate-spin-slow" />
          <h1 className="text-4xl font-bold mb-4">${equip.name}</h1>
          <p className="text-xl">Professional Equipment for ${equip.purpose}</p>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate insurance company pages
console.log('Generating insurance company partnership pages...');
insuranceCompanies.forEach(company => {
  const slug = company.toLowerCase().replace(/\s+/g, '-');
  const dir = path.join(__dirname, '..', 'src', 'app', 'insurance', slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { Shield, FileCheck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '${company} Insurance Claims | Approved Restoration Provider | Direct Billing',
  description: 'Preferred ${company} insurance restoration provider. Direct billing, no upfront costs, claim assistance. Call 1300 DISASTER.',
};

export default function ${company.replace(/\s+/g, '')}InsurancePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Shield className="h-16 w-16 text-green-400 mb-6" />
          <h1 className="text-4xl font-bold mb-4">${company} Insurance Claims</h1>
          <p className="text-xl mb-8">Preferred Provider • Direct Billing • No Upfront Costs</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Phone className="mr-2" /> Start Your Claim
          </Button>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate certification pages
console.log('Generating certification pages...');
certifications.forEach(cert => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'certifications', cert.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { Award, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: '${cert.name} | ${cert.standard} | Disaster Recovery Australia',
  description: '${cert.name} restoration services. ${cert.standard}. Qualified, certified, and compliant disaster recovery.',
};

export default function ${cert.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">${cert.name}</h1>
          <p className="text-xl">${cert.standard}</p>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate cost pages for each city-service combination
console.log('Generating cost/pricing pages...');
const costDir = path.join(__dirname, '..', 'src', 'app', 'cost');
majorCities.slice(0, 10).forEach(city => { // Limit to first 10 cities for now
  services.slice(0, 5).forEach(service => { // Limit to first 5 services
    const slug = `${city.toLowerCase()}-${service}`;
    const dir = path.join(costDir, slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const content = `import { Metadata } from 'next';
import { DollarSign, Calculator, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '${city} ${service.replace(/-/g, ' ')} Cost | Pricing Guide 2024 | Free Quotes',
  description: 'How much does ${service.replace(/-/g, ' ')} cost in ${city}? Average prices, insurance coverage, payment plans. Get free quote now.',
};

export default function ${city}${service.replace(/-/g, '')}CostPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-green-800 to-teal-800 text-white py-20">
        <div className="container mx-auto px-4">
          <DollarSign className="h-16 w-16 text-green-300 mb-6" />
          <h1 className="text-4xl font-bold mb-4">${city} ${service.replace(/-/g, ' ').charAt(0).toUpperCase() + service.replace(/-/g, ' ').slice(1)} Cost</h1>
          <p className="text-xl mb-8">Transparent Pricing • Insurance Coverage • Free Quotes</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <Calculator className="mr-2" /> Get Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}`;
    
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
  });
});

// Generate FAQ pages for each service
console.log('Generating FAQ pages...');
services.forEach(service => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'faq', service);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '${service.replace(/-/g, ' ')} FAQ | Common Questions Answered | Expert Guide',
  description: 'Everything you need to know about ${service.replace(/-/g, ' ')}. Expert answers to common questions, tips, and advice.',
};

export default function ${service.replace(/-/g, '')}FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <HelpCircle className="h-16 w-16 text-indigo-300 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">${service.replace(/-/g, ' ').charAt(0).toUpperCase() + service.replace(/-/g, ' ').slice(1)} FAQ</h1>
          <p className="text-xl">Expert Answers to Your Questions</p>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate comparison pages
console.log('Generating comparison pages...');
const comparisons = [
  { slug: 'diy-vs-professional', name: 'DIY vs Professional Restoration' },
  { slug: 'insurance-vs-cash', name: 'Insurance Claim vs Cash Payment' },
  { slug: 'emergency-vs-scheduled', name: 'Emergency vs Scheduled Service' },
  { slug: 'local-vs-national', name: 'Local vs National Companies' },
  { slug: 'cheap-vs-quality', name: 'Cheap vs Quality Restoration' }
];

comparisons.forEach(comparison => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'compare', comparison.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { Scale, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '${comparison.name} | Comparison Guide | Make the Right Choice',
  description: 'Compare ${comparison.name.toLowerCase()}. Pros, cons, costs, and expert recommendations to help you decide.',
};

export default function ${comparison.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-purple-900 to-pink-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <Scale className="h-16 w-16 text-purple-300 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">${comparison.name}</h1>
          <p className="text-xl">Make an Informed Decision</p>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

// Generate case study pages
console.log('Generating case study pages...');
const caseStudies = [
  { slug: 'brisbane-floods-2022', name: 'Brisbane Floods 2022 Recovery' },
  { slug: 'black-summer-bushfires', name: 'Black Summer Bushfire Restoration' },
  { slug: 'townsville-floods-2019', name: 'Townsville Floods 2019' },
  { slug: 'cyclone-debbie-recovery', name: 'Cyclone Debbie Recovery' },
  { slug: 'sydney-storms-2021', name: 'Sydney Storms 2021' }
];

caseStudies.forEach(study => {
  const dir = path.join(__dirname, '..', 'src', 'app', 'case-studies', study.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const content = `import { Metadata } from 'next';
import { FileText, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '${study.name} | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from ${study.name}. Real results, timelines, and restoration process.',
};

export default function ${study.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <FileText className="h-16 w-16 text-green-300 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Case Study: ${study.name}</h1>
          <p className="text-xl">A Success Story in Disaster Recovery</p>
        </div>
      </section>
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

const totalPages = 
  timeBasedPages.length + 
  propertyTypes.length + 
  equipment.length + 
  insuranceCompanies.length + 
  certifications.length + 
  (10 * 5) + // cost pages
  services.length + // FAQ pages
  comparisons.length + 
  caseStudies.length;

console.log(`\n✅ Successfully generated ${totalPages} new pages!`);
console.log(`
Pages created:
- ${timeBasedPages.length} time-based emergency pages
- ${propertyTypes.length} property type pages
- ${equipment.length} equipment/technology pages
- ${insuranceCompanies.length} insurance company pages
- ${certifications.length} certification pages
- ${10 * 5} cost/pricing pages
- ${services.length} FAQ pages
- ${comparisons.length} comparison pages
- ${caseStudies.length} case study pages
`);