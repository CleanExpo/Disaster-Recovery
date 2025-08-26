/**
 * Professional Equipment Catalog Database
 * Contains detailed specifications, images, and technical data for all disaster recovery equipment
 */

export interface EquipmentSpecification {
  id: string;
  category: string;
  name: string;
  model: string;
  manufacturer: string;
  images: string[];
  primaryImage: string;
  specifications: {
    [key: string]: string | number | boolean;
  };
  features: string[];
  applications: string[];
  certifications: string[];
  dimensions: {
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
  };
  performance: {
    [key: string]: string | number;
  };
  availability: 'available' | 'limited' | 'on-request';
  rentalPrice?: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  description: string;
  technicalDetails: string;
  operationalRequirements?: string[];
  safetyFeatures?: string[];
}

export const equipmentCatalog: EquipmentSpecification[] = [
  // Air Scrubbers
  {
    id: 'phoenix-guardian-hepa',
    category: 'Air Scrubbers',
    name: 'Phoenix Guardian HEPA System',
    model: 'Guardian R500',
    manufacturer: 'Phoenix Restoration Equipment',
    primaryImage: '/images/equipment/air-scrubbers/phoenix-guardian-r500.jpg',
    images: [
      '/images/equipment/air-scrubbers/phoenix-guardian-r500.jpg',
      '/images/equipment/air-scrubbers/phoenix-guardian-filter.jpg',
      '/images/equipment/air-scrubbers/phoenix-guardian-controls.jpg'
    ],
    specifications: {
      airFlow: '500 CFM',
      filtration: 'True HEPA + Carbon',
      efficiency: '99.97% @ 0.3 microns',
      powerRequirement: '115V/60Hz',
      amperage: 4.5,
      soundLevel: '58 dBA',
      ductPorts: 2
    },
    features: [
      'Variable speed control',
      'Filter change indicator',
      'Hour meter',
      'Stackable design',
      'Ducting capability',
      'GFCI protection'
    ],
    applications: [
      'Mould remediation',
      'Fire damage restoration',
      'Sewage cleanup',
      'Construction dust control',
      'Hospital-grade air purification'
    ],
    certifications: [
      'ETL Listed',
      'CE Certified',
      'AHAM Verified'
    ],
    dimensions: {
      length: '23.5"',
      width: '20"',
      height: '24.5"',
      weight: '65 lbs'
    },
    performance: {
      coverageArea: '2000 sq ft',
      airChangesPerHour: 6,
      filterLife: '6-12 months'
    },
    availability: 'available',
    rentalPrice: {
      daily: 150,
      weekly: 750,
      monthly: 2500
    },
    description: 'Professional-grade negative air machine with true HEPA filtration for critical air quality control during restoration projects.',
    technicalDetails: 'Features a 3-stage filtration system including pre-filter, HEPA filter, and optional carbon filter. Designed for continuous operation in harsh environments.',
    operationalRequirements: [
      'Standard 115V power outlet',
      'Regular filter maintenance',
      'Adequate ventilation space'
    ],
    safetyFeatures: [
      'GFCI protection',
      'Thermal overload protection',
      'Safety interlock system'
    ]
  },

  // Industrial Dehumidifiers
  {
    id: 'drizair-lgr-7000xli',
    category: 'Industrial Dehumidifiers',
    name: 'Dri-Eaz LGR 7000XLi',
    model: 'LGR 7000XLi',
    manufacturer: 'Dri-Eaz',
    primaryImage: '/images/equipment/dehumidifiers/drizair-lgr-7000xli.jpg',
    images: [
      '/images/equipment/dehumidifiers/drizair-lgr-7000xli.jpg',
      '/images/equipment/dehumidifiers/lgr-7000xli-controls.jpg',
      '/images/equipment/dehumidifiers/lgr-7000xli-action.jpg'
    ],
    specifications: {
      extractionCapacity: '130 PPD @ AHAM',
      airFlow: '210 CFM',
      operatingTemp: '33°F - 100°F',
      powerRequirement: '115V/60Hz',
      amperage: 11.5,
      refrigerant: 'R410A',
      grainDepression: 246
    },
    features: [
      'Low grain refrigerant technology',
      'Digital control panel',
      'Auto-restart function',
      'Internal pump with 40ft lift',
      'Dual intake design',
      'Hot gas bypass defrost'
    ],
    applications: [
      'Water damage restoration',
      'Flood recovery',
      'Structural drying',
      'Climate control',
      'Construction drying'
    ],
    certifications: [
      'ETL Listed',
      'CE Marked',
      'Energy Star Certified'
    ],
    dimensions: {
      length: '32.1"',
      width: '20.8"',
      height: '39.5"',
      weight: '135 lbs'
    },
    performance: {
      coverageArea: '7500 sq ft',
      waterRemoval: '16 gallons/day @ 80°F/60%RH',
      efficiency: '2.9 L/kWh'
    },
    availability: 'available',
    rentalPrice: {
      daily: 225,
      weekly: 1125,
      monthly: 3750
    },
    description: 'High-performance LGR dehumidifier designed for the most challenging water damage restoration projects.',
    technicalDetails: 'Features advanced low grain refrigerant technology for maximum moisture extraction in extreme conditions. Includes Xactimate code for insurance billing.',
    operationalRequirements: [
      'Dedicated 15A circuit recommended',
      'Drainage setup required',
      'Temperature above 33°F'
    ],
    safetyFeatures: [
      'Automatic pump-out system',
      'High temperature shutoff',
      'Filter indicator light',
      'Overflow protection'
    ]
  },

  // Thermal Imaging Cameras
  {
    id: 'flir-e96-advanced',
    category: 'Thermal Imaging',
    name: 'FLIR E96 Advanced Thermal Camera',
    model: 'E96-24',
    manufacturer: 'FLIR Systems',
    primaryImage: '/images/equipment/thermal-imaging/flir-e96.jpg',
    images: [
      '/images/equipment/thermal-imaging/flir-e96.jpg',
      '/images/equipment/thermal-imaging/flir-e96-screen.jpg',
      '/images/equipment/thermal-imaging/flir-e96-case.jpg'
    ],
    specifications: {
      resolution: '640 x 480 pixels',
      thermalSensitivity: '< 0.03°C @ 30°C',
      temperatureRange: '-20°C to 1500°C',
      fieldOfView: '24° x 18°',
      frameRate: '30 Hz',
      accuracy: '±2°C or ±2%'
    },
    features: [
      'MSX image enhancement',
      'Wi-Fi connectivity',
      'GPS location data',
      'Voice annotation',
      'Laser distance meter',
      '4" touchscreen display'
    ],
    applications: [
      'Moisture detection',
      'Electrical inspections',
      'Building diagnostics',
      'Energy audits',
      'Predictive maintenance'
    ],
    certifications: [
      'IP54 Rated',
      'MIL-STD-810G',
      'IEC 60825-1'
    ],
    dimensions: {
      length: '10.9"',
      width: '4.9"',
      height: '3.7"',
      weight: '2.2 lbs'
    },
    performance: {
      batteryLife: '4 hours',
      storageCapacity: '500+ radiometric images',
      reportingFormats: 'PDF, JPEG, Video'
    },
    availability: 'available',
    rentalPrice: {
      daily: 350,
      weekly: 1750,
      monthly: 5250
    },
    description: 'Professional-grade thermal imaging camera with exceptional resolution and advanced features for comprehensive building diagnostics.',
    technicalDetails: 'Features FLIR\'s proprietary MSX technology that adds visible light details to thermal images. Includes FLIR Tools+ software for advanced analysis.',
    operationalRequirements: [
      'Regular calibration',
      'Proper training for operation',
      'Environmental conditions consideration'
    ],
    safetyFeatures: [
      'Class 2 laser',
      'Drop protection (6.6 ft)',
      'IP54 environmental protection'
    ]
  },

  // Moisture Meters
  {
    id: 'protimeter-mms2',
    category: 'Moisture Meters',
    name: 'Protimeter MMS2 Complete System',
    model: 'MMS2',
    manufacturer: 'Protimeter',
    primaryImage: '/images/equipment/moisture-meters/protimeter-mms2.jpg',
    images: [
      '/images/equipment/moisture-meters/protimeter-mms2.jpg',
      '/images/equipment/moisture-meters/mms2-probes.jpg',
      '/images/equipment/moisture-meters/mms2-case-complete.jpg'
    ],
    specifications: {
      measurementRange: '6-90% WME',
      pinMoisture: '8-99% WME',
      searchMode: '60-1000 relative',
      hygroscopicRange: '0-99% RH',
      temperatureRange: '-10°C to 50°C',
      accuracy: '±1% WME'
    },
    features: [
      'Pin and pinless measurement',
      'Hygrometric probe capability',
      'Data logging function',
      'Bluetooth connectivity',
      'Multiple probe options',
      'Backlit display'
    ],
    applications: [
      'Flood damage assessment',
      'Building surveys',
      'Restoration monitoring',
      'Quality control',
      'Pre-purchase inspections'
    ],
    certifications: [
      'CE Marked',
      'FCC Compliant',
      'BS7919 Standard'
    ],
    dimensions: {
      length: '7.1"',
      width: '3.5"',
      height: '1.9"',
      weight: '0.8 lbs'
    },
    performance: {
      batteryLife: '20+ hours',
      dataStorage: '8000 readings',
      responseTime: 'Instantaneous'
    },
    availability: 'available',
    rentalPrice: {
      daily: 75,
      weekly: 375,
      monthly: 1250
    },
    description: 'Industry-leading moisture measurement system combining pin, pinless, and environmental readings in one device.',
    technicalDetails: 'Features advanced digital signal processing for accurate readings across 170+ material types. Includes comprehensive probe kit for various applications.',
    operationalRequirements: [
      'Regular calibration check',
      'Appropriate probe selection',
      'Clean measurement surface'
    ],
    safetyFeatures: [
      'Non-destructive search mode',
      'Protective rubber boot',
      'Auto power-off function'
    ]
  },

  // Hydroxyl Generators
  {
    id: 'titan-4000-hydroxyl',
    category: 'Hydroxyl Generators',
    name: 'Titan 4000 Hydroxyl Generator',
    model: 'Titan 4000',
    manufacturer: 'International Ozone Technologies',
    primaryImage: '/images/equipment/hydroxyl-generators/titan-4000.jpg',
    images: [
      '/images/equipment/hydroxyl-generators/titan-4000.jpg',
      '/images/equipment/hydroxyl-generators/titan-4000-uv-chamber.jpg',
      '/images/equipment/hydroxyl-generators/titan-4000-controls.jpg'
    ],
    specifications: {
      coverage: '4000 sq ft',
      uvLamps: '4 x 95W',
      airFlow: '500 CFM',
      powerRequirement: '115V/60Hz',
      amperage: 4.5,
      hydroxylOutput: 'High concentration'
    },
    features: [
      'Safe for occupied spaces',
      'No residual chemicals',
      'Destroys odors at molecular level',
      'Kills bacteria and viruses',
      'Variable speed fan',
      'UV lamp hour meter'
    ],
    applications: [
      'Fire and smoke odor removal',
      'Mould odor elimination',
      'Pet odor treatment',
      'Chemical odor neutralization',
      'Viral decontamination'
    ],
    certifications: [
      'FDA Compliant',
      'ETL Listed',
      'EPA Registered'
    ],
    dimensions: {
      length: '16"',
      width: '16"',
      height: '20"',
      weight: '45 lbs'
    },
    performance: {
      odorRemoval: '99.9%',
      bacteriaReduction: '99.99%',
      treatmentTime: '24-72 hours typical'
    },
    availability: 'available',
    rentalPrice: {
      daily: 175,
      weekly: 875,
      monthly: 2925
    },
    description: 'Advanced hydroxyl radical generator that safely eliminates odors and pathogens without evacuation requirements.',
    technicalDetails: 'Uses multiple UV wavelengths to generate atmospheric hydroxyls that break down odor molecules and kill microorganisms. Safe for use around people and pets.',
    operationalRequirements: [
      'Standard power outlet',
      'UV lamp replacement schedule',
      'Adequate air circulation'
    ],
    safetyFeatures: [
      'UV containment chamber',
      'Safety interlock switch',
      'No ozone production',
      'Cool operation temperature'
    ]
  },

  // Drone Inspection Systems
  {
    id: 'dji-matrice-300rtk',
    category: 'Drone Inspection',
    name: 'DJI Matrice 300 RTK',
    model: 'M300 RTK',
    manufacturer: 'DJI Enterprise',
    primaryImage: '/images/equipment/drones/dji-matrice-300rtk.jpg',
    images: [
      '/images/equipment/drones/dji-matrice-300rtk.jpg',
      '/images/equipment/drones/matrice-300-thermal.jpg',
      '/images/equipment/drones/matrice-300-controller.jpg'
    ],
    specifications: {
      flightTime: '55 minutes',
      range: '15 km',
      windResistance: '15 m/s',
      operatingTemp: '-20°C to 50°C',
      maxAltitude: '7000 m',
      protection: 'IP45'
    },
    features: [
      'Triple redundancy flight systems',
      'AI spot-check capability',
      'Thermal imaging payload',
      '6-directional sensing',
      'Real-time data transmission',
      'Automated flight planning'
    ],
    applications: [
      'Roof damage assessment',
      'Flood extent mapping',
      'Fire damage documentation',
      'Structural inspections',
      'Insurance documentation'
    ],
    certifications: [
      'CE Marked',
      'FCC Compliant',
      'CASA Approved'
    ],
    dimensions: {
      length: '810 mm',
      width: '670 mm',
      height: '430 mm',
      weight: '6.3 kg'
    },
    performance: {
      maxSpeed: '23 m/s',
      payload: '2.7 kg',
      transmissionRange: '15 km'
    },
    availability: 'limited',
    rentalPrice: {
      daily: 850,
      weekly: 4250,
      monthly: 14500
    },
    description: 'Professional inspection drone with advanced imaging capabilities for comprehensive disaster assessment and documentation.',
    technicalDetails: 'Features H20T hybrid sensor with 20MP zoom camera, 12MP wide camera, 640×512 thermal camera, and laser rangefinder for complete site documentation.',
    operationalRequirements: [
      'Licensed drone pilot',
      'CASA approvals',
      'Weather conditions assessment',
      'Flight planning software'
    ],
    safetyFeatures: [
      'Obstacle avoidance system',
      'Return-to-home function',
      'Redundant IMU & compass',
      'Emergency landing protocol'
    ]
  },

  // Ultrasonic Cleaning Systems
  {
    id: 'morantz-ultrasonics-pro',
    category: 'Ultrasonic Cleaning',
    name: 'Morantz Ultrasonics Pro System',
    model: 'M-9000',
    manufacturer: 'Morantz Ultrasonics',
    primaryImage: '/images/equipment/ultrasonic/morantz-m9000.jpg',
    images: [
      '/images/equipment/ultrasonic/morantz-m9000.jpg',
      '/images/equipment/ultrasonic/m9000-controls.jpg',
      '/images/equipment/ultrasonic/m9000-cleaning.jpg'
    ],
    specifications: {
      frequency: '28/40 kHz dual',
      tankCapacity: '90 gallons',
      heaterPower: '6000W',
      ultrasonicPower: '3000W',
      temperatureRange: 'Ambient to 80°C',
      dimensions: '48" x 24" x 24"'
    },
    features: [
      'Dual frequency operation',
      'Digital temperature control',
      'Automatic filling system',
      'Filtration system',
      'Lid and basket included',
      'Sweep frequency technology'
    ],
    applications: [
      'Fire damage restoration',
      'Electronics cleaning',
      'Document restoration',
      'Precision parts cleaning',
      'Smoke damage removal'
    ],
    certifications: [
      'CE Certified',
      'ETL Listed',
      'RoHS Compliant'
    ],
    dimensions: {
      length: '52"',
      width: '28"',
      height: '36"',
      weight: '450 lbs'
    },
    performance: {
      cleaningTime: '5-30 minutes typical',
      particleRemoval: '< 1 micron',
      energyEfficiency: 'Class A'
    },
    availability: 'on-request',
    rentalPrice: {
      daily: 450,
      weekly: 2250,
      monthly: 7500
    },
    description: 'Industrial ultrasonic cleaning system for delicate restoration of fire and smoke damaged items.',
    technicalDetails: 'Utilizes cavitation process to remove contaminants at microscopic level. Dual frequency allows optimization for different material types.',
    operationalRequirements: [
      '220V power supply',
      'Water supply connection',
      'Drainage system',
      'Adequate ventilation'
    ],
    safetyFeatures: [
      'Emergency stop button',
      'Over-temperature protection',
      'Ground fault protection',
      'Safety lid interlock'
    ]
  },

  // Negative Air Machines
  {
    id: 'bluedri-predator-750',
    category: 'Negative Air Machines',
    name: 'BlueDri Predator 750',
    model: 'BD-AS-750-BL',
    manufacturer: 'BlueDri',
    primaryImage: '/images/equipment/negative-air/bluedri-predator-750.jpg',
    images: [
      '/images/equipment/negative-air/bluedri-predator-750.jpg',
      '/images/equipment/negative-air/predator-750-filters.jpg',
      '/images/equipment/negative-air/predator-750-ducting.jpg'
    ],
    specifications: {
      airFlow: '750 CFM',
      stages: '3-stage filtration',
      hepaEfficiency: '99.97% @ 0.3 microns',
      powerRequirement: '115V/60Hz',
      amperage: 5.5,
      soundLevel: '62 dBA'
    },
    features: [
      'Variable speed control',
      'HEPA filter included',
      'Optional carbon filter',
      'Daisy chain capability',
      'Filter change indicator',
      'Stackable design'
    ],
    applications: [
      'Containment areas',
      'Mould remediation',
      'Asbestos abatement',
      'Construction dust control',
      'Hospital renovations'
    ],
    certifications: [
      'ETL Certified',
      'CARB Compliant',
      'Energy Star'
    ],
    dimensions: {
      length: '25"',
      width: '20"',
      height: '24"',
      weight: '68 lbs'
    },
    performance: {
      roomSize: '3000 sq ft',
      airChanges: '6 per hour',
      negativePresure: '-0.05" WC'
    },
    availability: 'available',
    rentalPrice: {
      daily: 165,
      weekly: 825,
      monthly: 2750
    },
    description: 'High-performance negative air machine designed for critical containment and air filtration applications.',
    technicalDetails: 'Creates negative pressure environments while filtering airborne contaminants. Ideal for maintaining containment zones during remediation.',
    operationalRequirements: [
      'Proper containment setup',
      'Regular filter monitoring',
      'Adequate makeup air'
    ],
    safetyFeatures: [
      'GFCI protection',
      'Sealed housing',
      'Safety certification labels',
      'Protective inlet guards'
    ]
  },

  // Ozone Generators
  {
    id: 'boss-ozone-oz24000',
    category: 'Ozone Generators',
    name: 'BOSS Ozone Generator OZ24000',
    model: 'OZ24000',
    manufacturer: 'BOSS International',
    primaryImage: '/images/equipment/ozone/boss-oz24000.jpg',
    images: [
      '/images/equipment/ozone/boss-oz24000.jpg',
      '/images/equipment/ozone/oz24000-plates.jpg',
      '/images/equipment/ozone/oz24000-timer.jpg'
    ],
    specifications: {
      ozoneOutput: '24,000 mg/hr',
      coverage: '6000 sq ft',
      plateCount: 4,
      powerRequirement: '115V/60Hz',
      amperage: 2.5,
      timer: '0-12 hours'
    },
    features: [
      'Ceramic ozone plates',
      'Digital timer control',
      'Hold function',
      'Washable pre-filter',
      'Carrying handle',
      'Compact design'
    ],
    applications: [
      'Severe odor removal',
      'Smoke damage treatment',
      'Mould odor elimination',
      'Vehicle deodorization',
      'Crime scene cleanup'
    ],
    certifications: [
      'CE Marked',
      'EPA Guidelines',
      'California CARB'
    ],
    dimensions: {
      length: '14"',
      width: '11"',
      height: '10"',
      weight: '16 lbs'
    },
    performance: {
      ozoneConcentration: 'High output',
      treatmentTime: '2-24 hours',
      maintenance: 'Plate cleaning monthly'
    },
    availability: 'available',
    rentalPrice: {
      daily: 125,
      weekly: 625,
      monthly: 2100
    },
    description: 'Commercial-grade ozone generator for aggressive odor elimination in unoccupied spaces.',
    technicalDetails: 'Generates high concentrations of ozone to oxidize odor molecules. Requires complete evacuation of treatment area including pets and plants.',
    operationalRequirements: [
      'Unoccupied space only',
      'Proper ventilation after use',
      'Warning signage required',
      'Trained operator'
    ],
    safetyFeatures: [
      'Timer auto-shutoff',
      'Warning labels',
      'Safety instructions included',
      'Delayed start option'
    ]
  },

  // Infrared Drying Systems
  {
    id: 'drymatic-boost-bar',
    category: 'Infrared Drying',
    name: 'Drymatic Boost Bar System',
    model: 'DBB-4',
    manufacturer: 'Drymatic',
    primaryImage: '/images/equipment/infrared/drymatic-boost-bar.jpg',
    images: [
      '/images/equipment/infrared/drymatic-boost-bar.jpg',
      '/images/equipment/infrared/boost-bar-setup.jpg',
      '/images/equipment/infrared/boost-bar-controls.jpg'
    ],
    specifications: {
      heatingElements: 4,
      powerOutput: '1000W per element',
      coverage: '40 sq ft',
      temperatureRange: 'Up to 70°C surface',
      powerRequirement: '115V/60Hz',
      wavelength: 'Medium wave IR'
    },
    features: [
      'Targeted heat drying',
      'Adjustable positioning',
      'Digital temperature control',
      'Remote monitoring capable',
      'Energy efficient',
      'Quick setup'
    ],
    applications: [
      'Hardwood floor drying',
      'Wall cavity drying',
      'Concrete drying',
      'Cabinet drying',
      'Spot drying applications'
    ],
    certifications: [
      'UL Listed',
      'CE Approved',
      'Energy Star'
    ],
    dimensions: {
      length: '48"',
      width: '6"',
      height: '8"',
      weight: '35 lbs'
    },
    performance: {
      dryingTime: '50% faster than conventional',
      energyUsage: '4kW total',
      penetration: 'Up to 2 inches'
    },
    availability: 'available',
    rentalPrice: {
      daily: 195,
      weekly: 975,
      monthly: 3250
    },
    description: 'Advanced infrared drying system for rapid, targeted moisture removal from building materials.',
    technicalDetails: 'Uses medium-wave infrared radiation to heat materials from within, accelerating evaporation without surface damage.',
    operationalRequirements: [
      'Adequate power supply',
      'Proper spacing from materials',
      'Temperature monitoring'
    ],
    safetyFeatures: [
      'Over-temperature protection',
      'Tip-over switch',
      'Protective guards',
      'Warning indicators'
    ]
  }
];

// Equipment categories with descriptions
export const equipmentCategories = [
  {
    name: 'Air Scrubbers',
    slug: 'air-scrubbers',
    description: 'Professional air filtration systems for removing airborne contaminants',
    icon: '🌬️'
  },
  {
    name: 'Industrial Dehumidifiers',
    slug: 'industrial-dehumidifiers',
    description: 'High-capacity moisture extraction equipment for structural drying',
    icon: '💧'
  },
  {
    name: 'Thermal Imaging',
    slug: 'thermal-imaging',
    description: 'Advanced infrared cameras for detecting hidden moisture and damage',
    icon: '🔍'
  },
  {
    name: 'Moisture Meters',
    slug: 'moisture-meters',
    description: 'Precision instruments for measuring moisture content in materials',
    icon: '📊'
  },
  {
    name: 'Hydroxyl Generators',
    slug: 'hydroxyl-generators',
    description: 'Safe odor elimination technology for occupied spaces',
    icon: '✨'
  },
  {
    name: 'Drone Inspection',
    slug: 'drone-inspection',
    description: 'Aerial assessment and documentation systems',
    icon: '🚁'
  },
  {
    name: 'Ultrasonic Cleaning',
    slug: 'ultrasonic-cleaning',
    description: 'Delicate cleaning systems for fire and smoke damaged items',
    icon: '🔊'
  },
  {
    name: 'Negative Air Machines',
    slug: 'negative-air-machines',
    description: 'Containment and pressure control equipment',
    icon: '🌀'
  },
  {
    name: 'Ozone Generators',
    slug: 'ozone-generators',
    description: 'Powerful odor oxidation systems for severe contamination',
    icon: '⚡'
  },
  {
    name: 'Infrared Drying',
    slug: 'infrared-drying',
    description: 'Targeted heat drying technology for rapid moisture removal',
    icon: '🔥'
  }
];

// Helper functions
export function getEquipmentByCategory(category: string): EquipmentSpecification[] {
  return equipmentCatalog.filter(item => item.category === category);
}

export function getEquipmentById(id: string): EquipmentSpecification | undefined {
  return equipmentCatalog.find(item => item.id === id);
}

export function searchEquipment(query: string): EquipmentSpecification[] {
  const lowerQuery = query.toLowerCase();
  return equipmentCatalog.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.manufacturer.toLowerCase().includes(lowerQuery) ||
    item.model.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.applications.some(app => app.toLowerCase().includes(lowerQuery))
  );
}

export function getFeaturedEquipment(): EquipmentSpecification[] {
  return equipmentCatalog.slice(0, 6); // Return first 6 items as featured
}
