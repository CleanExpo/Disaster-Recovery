// Dynamic Content Generator for SEO-Optimised Location Pages
// This system generates unique, non-plagiarized content for every Australian location

interface LocationData {
  city: string;
  state: string;
  population: number;
  climate: string;
  commonIssues: string[];
  landmarks: string[];
  suburbs: string[];
  postcode: string;
}

interface ServiceContent {
  service: string;
  localFactors: string[];
  seasonalConcerns: string[];
  regulations: string[];
  averageCost: string;
}

// Australian Cities Database
export const australianCities: LocationData[] = [
  // Capital Cities
  {
    city: 'Sydney',
    state: 'NSW',
    population: 5312000,
    climate: 'Temperate oceanic',
    commonIssues: ['Coastal flooding', 'Storm damage', 'High humidity mould', 'Sewage overflow', 'Bushfire smoke'],
    landmarks: ['Sydney Harbour', 'Opera House', 'Bondi Beach', 'Blue Mountains'],
    suburbs: ['Parramatta', 'Chatswood', 'Bondi', 'Manly', 'Cronulla', 'Penrith', 'Liverpool'],
    postcode: '2000'
  },
  {
    city: 'Melbourne',
    state: 'VIC',
    population: 5078000,
    climate: 'Temperate oceanic',
    commonIssues: ['Flash flooding', 'Storm damage', 'Cold weather mould', 'Hail damage', 'Wind damage'],
    landmarks: ['Federation Square', 'MCG', 'Yarra River', 'St Kilda Beach'],
    suburbs: ['Richmond', 'St Kilda', 'Brunswick', 'Footscray', 'Box Hill', 'Frankston', 'Dandenong'],
    postcode: '3000'
  },
  {
    city: 'Brisbane',
    state: 'QLD',
    population: 2560000,
    climate: 'Humid subtropical',
    commonIssues: ['Flooding', 'Cyclone damage', 'High humidity mould', 'Termite damage', 'Heat stress'],
    landmarks: ['Story Bridge', 'South Bank', 'Mount Coot-tha', 'Brisbane River'],
    suburbs: ['Fortitude Valley', 'New Farm', 'Paddington', 'Toowong', 'Chermside', 'Logan', 'Ipswich'],
    postcode: '4000'
  },
  {
    city: 'Perth',
    state: 'WA',
    population: 2192000,
    climate: 'Mediterranean',
    commonIssues: ['Seasonal storms', 'Bushfire damage', 'Sand infiltration', 'UV damage', 'Drought impact'],
    landmarks: ['Kings Park', 'Swan River', 'Cottesloe Beach', 'Fremantle'],
    suburbs: ['Fremantle', 'Subiaco', 'Northbridge', 'Joondalup', 'Rockingham', 'Midland', 'Armadale'],
    postcode: '6000'
  },
  {
    city: 'Adelaide',
    state: 'SA',
    population: 1418000,
    climate: 'Mediterranean',
    commonIssues: ['Seasonal flooding', 'Bushfire smoke', 'Extreme heat', 'Old building water damage', 'Asbestos concerns'],
    landmarks: ['Adelaide Oval', 'Botanic Garden', 'Glenelg Beach', 'Adelaide Hills'],
    suburbs: ['North Adelaide', 'Glenelg', 'Unley', 'Norwood', 'Marion', 'Tea Tree Gully', 'Playford'],
    postcode: '5000'
  }
];

// Service Templates for Different Disaster Types
export const serviceTemplates: { [key: string]: ServiceContent } = {
  waterDamage: {
    service: 'Water Damage Restoration',
    localFactors: ['Building age', 'Flood zones', 'Storm patterns', 'Infrastructure condition'],
    seasonalConcerns: ['Wet season preparation', 'Storm season readiness', 'Flood risk periods'],
    regulations: ['Local council requirements', 'Insurance standards', 'Building codes'],
    averageCost: '$3,500-$15,000'
  },
  mouldRemediation: {
    service: 'Mould Remediation',
    localFactors: ['Humidity levels', 'Ventilation issues', 'Building materials', 'Climate patterns'],
    seasonalConcerns: ['Wet season mould growth', 'Winter condensation', 'Summer heat stress'],
    regulations: ['Health department guidelines', 'Workplace safety standards', 'IAQ requirements'],
    averageCost: '$2,000-$10,000'
  },
  fireRestoration: {
    service: 'Fire Damage Restoration',
    localFactors: ['Bushfire risk', 'Building density', 'Fire service access', 'Insurance zones'],
    seasonalConcerns: ['Fire season preparation', 'Smoke damage risks', 'Ember protection'],
    regulations: ['Fire authority requirements', 'Building restoration codes', 'Insurance compliance'],
    averageCost: '$10,000-$50,000'
  }
};

// Content Generation Functions
export function generateLocationIntro(location: LocationData): string {
  const templates = [
    `${location.city}, ${location.state} residents face unique challenges when it comes to property damage restoration. With a population of ${location.population.toLocaleString()}, this ${location.climate} climate city experiences specific environmental factors that can impact your home or business.`,
    
    `Located in ${location.state}, ${location.city} is home to ${location.population.toLocaleString()} people who understand the importance of reliable disaster recovery services. The local ${location.climate} climate creates specific conditions that require specialized restoration expertise.`,
    
    `When disaster strikes in ${location.city}, you need local experts who understand the unique challenges of this ${location.state} location. Our ${location.city} team serves all ${location.population.toLocaleString()} residents with specialized knowledge of regional restoration requirements.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

export function generateCommonIssuesSection(location: LocationData): string {
  const issues = location.commonIssues.slice(0, 3).join(', ');
  return `${location.city} properties commonly experience ${issues}. These local conditions require specialized restoration techniques that our certified technicians are trained to handle. We understand the specific challenges that ${location.climate} climates present to property owners.`;
}

export function generateServiceAreas(location: LocationData): string {
  const suburbs = location.suburbs.slice(0, 5);
  const suburbList = suburbs.slice(0, -1).join(', ') + ', and ' + suburbs.slice(-1)[0];
  
  return `Our ${location.city} restoration services cover all metropolitan areas including ${suburbList}. We maintain rapid response times across all ${location.state} service zones, ensuring help arrives when you need it most.`;
}

export function generateLocalRegulations(location: LocationData, service: string): string {
  const serviceData = serviceTemplates[service];
  if (!serviceData) return '';
  
  return `${location.city} ${serviceData.service.toLowerCase()} must comply with ${location.state} regulations and local council requirements. Our certified technicians ensure all work meets current building codes and insurance standards specific to the ${location.city} area.`;
}

export function generateWeatherContext(location: LocationData): string {
  const weatherDescriptions = {
    'Temperate oceanic': 'moderate temperatures with seasonal rainfall',
    'Humid subtropical': 'warm, humid summers and mild winters with wet season risks',
    'Mediterranean': 'hot, dry summers and mild, wet winters'
  };
  
  const description = weatherDescriptions[location.climate as keyof typeof weatherDescriptions] || 'variable seasonal conditions';
  
  return `${location.city}'s ${location.climate.toLowerCase()} climate means ${description}. This creates specific restoration challenges that our local team is equipped to handle year-round.`;
}

export function generateEmergencyResponse(location: LocationData): string {
  return `When emergencies strike ${location.city}, our 24/7 response team is ready. We understand that disasters don't wait for business hours, which is why we maintain rapid response capabilities across all ${location.suburbs.length}+ suburbs in the ${location.city} metropolitan area.`;
}

export function generateInsuranceSection(location: LocationData): string {
  return `Working with ${location.city} insurance claims is our specialty. We're approved by all major insurers operating in ${location.state} and can direct bill to streamline your claim process. Our local expertise ensures compliance with regional insurance requirements.`;
}

export function generatePreventionTips(location: LocationData): string {
  const tips = location.commonIssues.slice(0, 2).map(issue => {
    const preventionMap: { [key: string]: string } = {
      'Coastal flooding': 'Install flood barriers and maintain drainage systems',
      'Storm damage': 'Secure outdoor items and trim overhanging branches',
      'High humidity mould': 'Ensure proper ventilation and monitor humidity levels',
      'Flash flooding': 'Clear gutters regularly and maintain stormwater drainage',
      'Bushfire smoke': 'Seal gaps and use air filtration during fire season',
      'Flooding': 'Maintain flood-resistant landscaping and drainage',
      'Cyclone damage': 'Secure building materials and prepare emergency kits'
    };
    
    return preventionMap[issue] || 'Maintain regular property inspections';
  });
  
  return `${location.city} property owners can reduce risk by: ${tips.join(' and ')}. Our team provides comprehensive prevention advice specific to local conditions.`;
}

export function generateTestimonial(location: LocationData): string {
  const suburbs = location.suburbs;
  const suburb = suburbs[Math.floor(Math.random() * suburbs.length)];
  
  const testimonials = [
    `"When our ${suburb} home was flooded, this team responded within hours. Their knowledge of ${location.city} building standards made all the difference." - Sarah M., ${suburb}`,
    `"Professional service from start to finish. They understood exactly what ${location.city} insurance required and handled everything." - Michael T., ${suburb}`,
    `"After storm damage to our ${suburb} business, they had us operational quickly. True local expertise." - Jennifer K., ${suburb}`
  ];
  
  return testimonials[Math.floor(Math.random() * testimonials.length)];
}

export function generateContactSection(location: LocationData): string {
  return `For immediate ${location.city} disaster recovery assistance, call 1300 814 870 or complete our online emergency form. Our ${location.state}-based team provides rapid response across all ${location.city} areas including ${location.suburbs.slice(0, 3).join(', ')} and surrounding regions.`;
}

// Main Content Assembly Function
export function generateLocationContent(
  location: LocationData, 
  service: keyof typeof serviceTemplates,
  keyword: string
): {
  title: string;
  metaDescription: string;
  h1: string;
  sections: { [key: string]: string };
} {
  const serviceData = serviceTemplates[service];
  
  return {
    title: `${serviceData.service} ${location.city} ${location.state} | 24/7 Emergency Response`,
    metaDescription: `Professional ${serviceData.service.toLowerCase()} in ${location.city}, ${location.state}. 24/7 emergency service, insurance approved, rapid response across all ${location.city} suburbs. Call 1300 814 870.`,
    h1: `${serviceData.service} Services in ${location.city}, ${location.state}`,
    sections: {
      intro: generateLocationIntro(location),
      commonIssues: generateCommonIssuesSection(location),
      serviceAreas: generateServiceAreas(location),
      weatherContext: generateWeatherContext(location),
      regulations: generateLocalRegulations(location, service),
      emergencyResponse: generateEmergencyResponse(location),
      insurance: generateInsuranceSection(location),
      prevention: generatePreventionTips(location),
      testimonial: generateTestimonial(location),
      contact: generateContactSection(location)
    }
  };
}

// Generate Schema Markup for Local Pages
export function generateLocalSchema(location: LocationData, service: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Disaster Recovery ${location.city}`,
    "description": `Professional ${service} services in ${location.city}, ${location.state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.city,
      "addressRegion": location.state,
      "postalCode": location.postcode,
      "addressCountry": "AU"
    },
    "telephone": "1300814870",
    "url": `https://disaster-recovery.vercel.app/locations/${location.city.toLowerCase().replace(' ', '-')}`,
    "openingHours": "Mo-Su 00:00-23:59",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "addressLocality": location.city,
        "addressRegion": location.state
      }
    }
  };
}

// Generate FAQ Schema
export function generateFAQSchema(location: LocationData, service: string) {
  const serviceData = serviceTemplates[service];
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How quickly can you respond to ${service} emergencies in ${location.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We provide 24/7 emergency response across all ${location.city} areas with typical response times of 30-60 minutes depending on location and conditions.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you work with insurance companies in ${location.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, we're approved by all major insurers operating in ${location.state} and can direct bill to streamline your claim process.`
        }
      },
      {
        "@type": "Question",
        "name": `What areas of ${location.city} do you service?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We service all ${location.city} metropolitan areas including ${location.suburbs.slice(0, 5).join(', ')} and surrounding regions.`
        }
      }
    ]
  };
}