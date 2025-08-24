// Business Constants
export const BUSINESS_NAME = 'Disaster Recovery Australia';
export const BUSINESS_SHORT_NAME = 'Disaster Recovery';
// No phone number - online forms only
export const ONLINE_FORM_URL = '/get-help';
export const CONTRACTOR_PORTAL_URL = '/contractors';
export const EMAIL = 'info@disasterrecovery.com.au';

// Lead Distribution Radius Options
export const SERVICE_RADIUS_OPTIONS = [
  { value: 20, label: '20km - Local Priority' },
  { value: 25, label: '25km - Extended Local' },
  { value: 50, label: '50km - Regional' },
  { value: 100, label: '100km - Wide Area' }
];

// Contractor Requirements
export const CONTRACTOR_REQUIREMENTS = {
  certifications: ['IICRC Certified'],
  standards: 'Disaster Recovery Standards Compliant',
  membership: 'Current Disaster Recovery Network Member',
  insurance: 'Minimum $20M Public Liability',
  response: '24/7 Emergency Response Capability'
};
export const WEBSITE = 'https://disasterrecovery.com.au';
export const ABN = 'ABN: 12 345 678 901'; // Update with actual ABN

// Lead Pricing
export const LEAD_PRICE = 550;
export const LEAD_PRICE_PREMIUM = 750; // For capital cities
export const LEAD_PRICE_REGIONAL = 450; // For regional areas

// Coverage Areas - All Australian States and Territories
export const STATES = [
  { code: 'NSW', name: 'New South Wales', capital: 'Sydney' },
  { code: 'VIC', name: 'Victoria', capital: 'Melbourne' },
  { code: 'QLD', name: 'Queensland', capital: 'Brisbane' },
  { code: 'WA', name: 'Western Australia', capital: 'Perth' },
  { code: 'SA', name: 'South Australia', capital: 'Adelaide' },
  { code: 'TAS', name: 'Tasmania', capital: 'Hobart' },
  { code: 'ACT', name: 'Australian Capital Territory', capital: 'Canberra' },
  { code: 'NT', name: 'Northern Territory', capital: 'Darwin' }
];

// Major Cities by State
export const CITIES_BY_STATE = {
  NSW: [
    'Sydney', 'Newcastle', 'Central Coast', 'Wollongong', 'Maitland',
    'Wagga Wagga', 'Albury', 'Port Macquarie', 'Tamworth', 'Orange',
    'Dubbo', 'Bathurst', 'Coffs Harbour', 'Lismore', 'Broken Hill'
  ],
  VIC: [
    'Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton',
    'Mildura', 'Warrnambool', 'Traralgon', 'Wangaratta', 'Horsham',
    'Bairnsdale', 'Sale', 'Moe', 'Morwell', 'Portland'
  ],
  QLD: [
    'Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville', 'Cairns',
    'Toowoomba', 'Rockhampton', 'Mackay', 'Bundaberg', 'Hervey Bay',
    'Gladstone', 'Maryborough', 'Mount Isa', 'Gympie', 'Caboolture'
  ],
  WA: [
    'Perth', 'Bunbury', 'Kalgoorlie', 'Mandurah', 'Geraldton',
    'Albany', 'Karratha', 'Broome', 'Busselton', 'Port Hedland',
    'Esperance', 'Carnarvon', 'Newman', 'Northam', 'Merredin'
  ],
  SA: [
    'Adelaide', 'Mount Gambier', 'Whyalla', 'Murray Bridge', 'Port Lincoln',
    'Port Pirie', 'Port Augusta', 'Victor Harbor', 'Gawler', 'Mount Barker',
    'Crafers-Bridgewater', 'Renmark', 'Millicent', 'Kadina', 'Tanunda'
  ],
  TAS: [
    'Hobart', 'Launceston', 'Devonport', 'Burnie', 'Ulverstone',
    'Kingston', 'Bridgewater', 'Glenorchy', 'Clarence', 'New Norfolk',
    'Wynyard', 'George Town', 'Sorell', 'Smithton', 'Queenstown'
  ],
  ACT: [
    'Canberra', 'Belconnen', 'Tuggeranong', 'Woden Valley', 'Gungahlin',
    'Weston Creek', 'Molonglo Valley', 'Jerrabomberra'
  ],
  NT: [
    'Darwin', 'Alice Springs', 'Palmerston', 'Katherine', 'Tennant Creek',
    'Nhulunbuy', 'Wadeye', 'Jabiru', 'Yulara', 'Alyangula'
  ]
};

// Disaster Types by Region
export const REGIONAL_DISASTERS = {
  tropical: {
    regions: ['Far North QLD', 'NT', 'North WA'],
    disasters: ['Cyclones', 'Flooding', 'Storm Surge', 'Monsoon Damage']
  },
  bushfire: {
    regions: ['NSW', 'VIC', 'SA', 'TAS', 'WA'],
    disasters: ['Bushfires', 'Smoke Damage', 'Ember Attack', 'Fire Storms']
  },
  flood: {
    regions: ['QLD', 'NSW', 'VIC'],
    disasters: ['River Flooding', 'Flash Flooding', 'Storm Water', 'Dam Release']
  },
  drought: {
    regions: ['Inland NSW', 'QLD', 'SA', 'WA'],
    disasters: ['Dust Storms', 'Water Damage from Broken Pipes', 'Foundation Issues']
  },
  coastal: {
    regions: ['All Coastal Areas'],
    disasters: ['Storm Surge', 'Coastal Erosion', 'King Tides', 'Tsunami Risk']
  }
};

// Industries for Specific Pages
export const INDUSTRIES = [
  'Mining & Resources',
  'Agriculture & Farming',
  'Tourism & Hospitality',
  'Healthcare & Medical',
  'Education & Schools',
  'Government & Public Services',
  'Retail & Shopping Centers',
  'Manufacturing & Warehousing',
  'Transport & Logistics',
  'Marine & Ports',
  'Aviation & Airports',
  'Energy & Utilities'
];

// Insurance Companies for Partnership Pages
export const INSURANCE_PARTNERS = [
  'NRMA Insurance',
  'AAMI',
  'Allianz',
  'QBE',
  'Suncorp',
  'CGU',
  'Budget Direct',
  'RACQ',
  'RACV',
  'RAA',
  'RAC',
  'RACT',
  'Youi',
  'Woolworths Insurance',
  'Coles Insurance'
];

// Seasonal Disaster Patterns
export const SEASONAL_DISASTERS = {
  summer: {
    months: ['December', 'January', 'February'],
    disasters: ['Bushfires', 'Heatwave Damage', 'Thunderstorms', 'Cyclones']
  },
  autumn: {
    months: ['March', 'April', 'May'],
    disasters: ['Storm Damage', 'Flooding', 'Late Cyclones']
  },
  winter: {
    months: ['June', 'July', 'August'],
    disasters: ['Flooding', 'Wind Damage', 'Snow Damage (Alpine)', 'Pipe Bursts']
  },
  spring: {
    months: ['September', 'October', 'November'],
    disasters: ['Storm Season', 'Hail Damage', 'Early Bushfires', 'Flash Flooding']
  }
};