'use client';

import { useState } from 'react';
import { 
  Building2, Home, Factory, Hospital, Plane, 
  Droplets, Flame, Bug, AlertTriangle, Cloud, Wrench,
  CheckCircle, Info, Zap
} from 'lucide-react';
import { 
  ContractorOnboardingData, 
  PropertyType, 
  PropertyScale,
  DisasterType,
  ScaleCapability,
  ServiceCoverageMatrix
} from '@/types/contractor-onboarding';

interface Step5Props {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: any) => void;
  errors: Record<string, string[]>;
}

const PROPERTY_TYPE_CONFIG = [
  { 
    type: PropertyType.RESIDENTIAL, 
    icon: Home, 
    colour: 'green',
    label: 'Residential',
    description: 'Houses, apartments, units, townhouses',
    scales: [
      { value: PropertyScale.GRANNY_FLAT, label: 'Granny Flat' },
      { value: PropertyScale.SINGLE_HOUSE, label: 'Single House' },
      { value: PropertyScale.DUPLEX, label: 'Duplex/Triplex' },
      { value: PropertyScale.TOWNHOUSE, label: 'Townhouse' },
      { value: PropertyScale.LOW_RISE_APARTMENT, label: 'Low Rise (1-3 floors)' },
      { value: PropertyScale.MID_RISE_APARTMENT, label: 'Mid Rise (4-10 floors)' },
      { value: PropertyScale.HIGH_RISE_APARTMENT, label: 'High Rise (11-40 floors)' },
      { value: PropertyScale.LUXURY_TOWER, label: 'Luxury Tower (40-80+ floors)' }
    ]
  },
  { 
    type: PropertyType.COMMERCIAL, 
    icon: Building2, 
    colour: 'blue',
    label: 'Commercial',
    description: 'Offices, shops, restaurants, hotels',
    scales: [
      { value: PropertyScale.CORNER_SHOP, label: 'Corner Shop' },
      { value: PropertyScale.SMALL_OFFICE, label: 'Small Office' },
      { value: PropertyScale.RETAIL_STORE, label: 'Retail Store' },
      { value: PropertyScale.RESTAURANT, label: 'Restaurant/Cafe' },
      { value: PropertyScale.SHOPPING_CENTER, label: 'Shopping Centre' },
      { value: PropertyScale.OFFICE_BUILDING, label: 'Office Building' },
      { value: PropertyScale.HOTEL, label: 'Hotel/Motel' },
      { value: PropertyScale.MEGA_MALL, label: 'Mega Mall' }
    ]
  },
  { 
    type: PropertyType.INDUSTRIAL, 
    icon: Factory, 
    colour: 'orange',
    label: 'Industrial',
    description: 'Factories, warehouses, processing plants',
    scales: [
      { value: PropertyScale.SMALL_WORKSHOP, label: 'Small Workshop' },
      { value: PropertyScale.WAREHOUSE, label: 'Warehouse' },
      { value: PropertyScale.FACTORY, label: 'Factory' },
      { value: PropertyScale.PROCESSING_PLANT, label: 'Processing Plant' },
      { value: PropertyScale.DISTRIBUTION_CENTER, label: 'Distribution Centre' },
      { value: PropertyScale.HEAVY_INDUSTRIAL, label: 'Heavy Industrial' },
      { value: PropertyScale.OFFSHORE_PLATFORM, label: 'Offshore Platform/Oil Rig' }
    ]
  },
  { 
    type: PropertyType.INSTITUTIONAL, 
    icon: Hospital, 
    colour: 'purple',
    label: 'Institutional',
    description: 'Hospitals, schools, government buildings',
    scales: [
      { value: PropertyScale.LOCAL_CLINIC, label: 'Local Clinic' },
      { value: PropertyScale.MEDICAL_CENTER, label: 'Medical Centre' },
      { value: PropertyScale.SMALL_SCHOOL, label: 'School' },
      { value: PropertyScale.UNIVERSITY, label: 'University' },
      { value: PropertyScale.HOSPITAL, label: 'Hospital' },
      { value: PropertyScale.MAJOR_HOSPITAL, label: 'Major Hospital Complex' },
      { value: PropertyScale.GOVERNMENT_BUILDING, label: 'Government Building' }
    ]
  },
  { 
    type: PropertyType.INFRASTRUCTURE, 
    icon: Plane, 
    colour: 'red',
    label: 'Infrastructure',
    description: 'Airports, utilities, telecommunications',
    scales: [
      { value: PropertyScale.BUS_STOP, label: 'Bus Stop/Shelter' },
      { value: PropertyScale.TRAIN_STATION, label: 'Train Station' },
      { value: PropertyScale.POWER_SUBSTATION, label: 'Power Substation' },
      { value: PropertyScale.WATER_TREATMENT, label: 'Water Treatment' },
      { value: PropertyScale.TELECOMMUNICATIONS, label: 'Telecommunications' },
      { value: PropertyScale.AIRPORT_TERMINAL, label: 'Airport Terminal' },
      { value: PropertyScale.INTERNATIONAL_AIRPORT, label: 'International Airport' }
    ]
  }
];

const DISASTER_TYPE_CONFIG = [
  { type: DisasterType.WATER_DAMAGE, icon: Droplets, colour: 'blue', label: 'Water Damage' },
  { type: DisasterType.FLOOD, icon: Droplets, colour: 'blue', label: 'Flood' },
  { type: DisasterType.BURST_PIPES, icon: Droplets, colour: 'blue', label: 'Burst Pipes' },
  { type: DisasterType.SEWAGE_OVERFLOW, icon: Droplets, colour: 'brown', label: 'Sewage Overflow' },
  { type: DisasterType.FIRE_DAMAGE, icon: Flame, colour: 'orange', label: 'Fire Damage' },
  { type: DisasterType.SMOKE_DAMAGE, icon: Flame, colour: 'gray', label: 'Smoke Damage' },
  { type: DisasterType.BUSHFIRE, icon: Flame, colour: 'red', label: 'Bushfire' },
  { type: DisasterType.MOULD, icon: Bug, colour: 'green', label: 'Mould' },
  { type: DisasterType.BACTERIA, icon: Bug, colour: 'yellow', label: 'Bacteria' },
  { type: DisasterType.VIRUS, icon: Bug, colour: 'purple', label: 'Virus' },
  { type: DisasterType.BIOHAZARD, icon: AlertTriangle, colour: 'red', label: 'Biohazard' },
  { type: DisasterType.TRAUMA_SCENE, icon: AlertTriangle, colour: 'red', label: 'Trauma Scene' },
  { type: DisasterType.STORM_DAMAGE, icon: Cloud, colour: 'purple', label: 'Storm Damage' },
  { type: DisasterType.CYCLONE, icon: Cloud, colour: 'purple', label: 'Cyclone' },
  { type: DisasterType.HAIL_DAMAGE, icon: Cloud, colour: 'white', label: 'Hail Damage' },
  { type: DisasterType.CHEMICAL_SPILL, icon: AlertTriangle, colour: 'yellow', label: 'Chemical Spill' },
  { type: DisasterType.VANDALISM, icon: Wrench, colour: 'red', label: 'Vandalism' },
  { type: DisasterType.STRUCTURAL_DAMAGE, icon: Wrench, colour: 'gray', label: 'Structural Damage' }
];

const SCALE_CAPABILITY_CONFIG = [
  { value: ScaleCapability.SINGLE_ROOM, label: 'Single Room', floors: '1 room' },
  { value: ScaleCapability.MULTIPLE_ROOMS, label: 'Multiple Rooms', floors: '2-5 rooms' },
  { value: ScaleCapability.SINGLE_FLOOR, label: 'Single Floor', floors: '1 floor' },
  { value: ScaleCapability.MULTIPLE_FLOORS_2_10, label: 'Multiple Floors', floors: '2-10 floors' },
  { value: ScaleCapability.HIGH_RISE_10_40, label: 'High Rise', floors: '10-40 floors' },
  { value: ScaleCapability.MEGA_HIGH_RISE_40_80, label: 'Mega High Rise', floors: '40-80 floors' },
  { value: ScaleCapability.EXTREME_80_PLUS, label: 'Extreme Scale', floors: '80+ floors' },
  { value: ScaleCapability.ENTIRE_COMPLEX, label: 'Entire Complex', floors: 'Full campus/complex' }
];

export default function Step5ServiceCoverage({ data, updateData, errors }: Step5Props) {
  const [serviceCoverage, setServiceCoverage] = useState<ServiceCoverageMatrix>(
    data.serviceCoverage || {
      propertyTypes: [],
      propertyScales: [],
      disasterTypes: [],
      scaleCapabilities: [],
      geographicCapabilities: [],
      emergencyResponse: false,
      afterHours: false,
      publicHolidays: false,
      weekendService: false
    }
  );

  const [expandedProperty, setExpandedProperty] = useState<PropertyType | null>(null);

  const handlePropertyTypeToggle = (propertyType: PropertyType) => {
    const updated = { ...serviceCoverage };
    if (updated.propertyTypes.includes(propertyType)) {
      updated.propertyTypes = updated.propertyTypes.filter(t => t !== propertyType);
      // Also remove associated scales
      const propertyConfig = PROPERTY_TYPE_CONFIG.find(p => p.type === propertyType);
      if (propertyConfig) {
        updated.propertyScales = updated.propertyScales.filter(
          s => !propertyConfig.scales.map(sc => sc.value).includes(s)
        );
      }
    } else {
      updated.propertyTypes.push(propertyType);
    }
    setServiceCoverage(updated);
    updateData({ serviceCoverage: updated });
  };

  const handlePropertyScaleToggle = (scale: PropertyScale) => {
    const updated = { ...serviceCoverage };
    if (updated.propertyScales.includes(scale)) {
      updated.propertyScales = updated.propertyScales.filter(s => s !== scale);
    } else {
      updated.propertyScales.push(scale);
    }
    setServiceCoverage(updated);
    updateData({ serviceCoverage: updated });
  };

  const handleDisasterTypeToggle = (disasterType: DisasterType) => {
    const updated = { ...serviceCoverage };
    if (updated.disasterTypes.includes(disasterType)) {
      updated.disasterTypes = updated.disasterTypes.filter(t => t !== disasterType);
    } else {
      updated.disasterTypes.push(disasterType);
    }
    setServiceCoverage(updated);
    updateData({ serviceCoverage: updated });
  };

  const handleScaleCapabilityToggle = (scale: ScaleCapability) => {
    const updated = { ...serviceCoverage };
    if (updated.scaleCapabilities.includes(scale)) {
      updated.scaleCapabilities = updated.scaleCapabilities.filter(s => s !== scale);
    } else {
      updated.scaleCapabilities.push(scale);
    }
    setServiceCoverage(updated);
    updateData({ serviceCoverage: updated });
  };

  const handleServiceOptionToggle = (option: string) => {
    const updated = { ...serviceCoverage, [option]: !serviceCoverage[option as keyof ServiceCoverageMatrix] };
    setServiceCoverage(updated);
    updateData({ serviceCoverage: updated });
  };

  // Calculate estimated page count
  const estimatedPageCount = 
    serviceCoverage.propertyTypes.length * 
    serviceCoverage.disasterTypes.length * 
    10; // Multiply by estimated locations

  return (
    <div className="space-y-8">
      {/* Property Types */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Property Types You Service</h3>
        <p className="text-slate-400 text-sm mb-4">
          Select all property types you can handle. Click to expand and select specific scales.
        </p>
        
        <div className="space-y-3">
          {PROPERTY_TYPE_CONFIG.map(property => {
            const Icon = property.icon;
            const isSelected = serviceCoverage.propertyTypes.includes(property.type);
            const isExpanded = expandedProperty === property.type;
            
            return (
              <div key={property.type} className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePropertyTypeToggle(property.type)}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition
                        ${isSelected 
                          ? `bg-${property.colour}-600/20 border-2 border-${property.colour}-500` 
                          : 'bg-slate-800 border-2 border-slate-700'}
                      `}>
                        <Icon className={`h-5 w-5 ${isSelected ? `text-${property.colour}-400` : 'text-slate-400'}`} />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-white">{property.label}</div>
                        <div className="text-sm text-slate-400">{property.description}</div>
                      </div>
                    </button>
                    
                    {isSelected && (
                      <button
                        onClick={() => setExpandedProperty(isExpanded ? null : property.type)}
                        className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300"
                      >
                        {isExpanded ? 'Hide Scales' : 'Select Scales'}
                      </button>
                    )}
                  </div>
                  
                  {isSelected && isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <div className="grid md:grid-cols-2 gap-2">
                        {property.scales.map(scale => (
                          <label
                            key={scale.value}
                            className="flex items-center gap-2 p-2 hover:bg-slate-800/50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={serviceCoverage.propertyScales.includes(scale.value)}
                              onChange={() => handlePropertyScaleToggle(scale.value)}
                              className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-300">{scale.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disaster Types */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Disaster Types You Handle</h3>
        <p className="text-slate-400 text-sm mb-4">
          Select all disaster types you're equipped and qualified to handle.
        </p>
        
        <div className="grid md:grid-cols-3 gap-3">
          {DISASTER_TYPE_CONFIG.map(disaster => {
            const Icon = disaster.icon;
            const isSelected = serviceCoverage.disasterTypes.includes(disaster.type);
            
            return (
              <button
                key={disaster.type}
                onClick={() => handleDisasterTypeToggle(disaster.type)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border-2 transition
                  ${isSelected 
                    ? 'bg-slate-800/50 border-blue-500 text-white' 
                    : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'}
                `}
              >
                <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                <span className="text-sm font-medium">{disaster.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale Capabilities */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Project Scale Capabilities</h3>
        <p className="text-slate-400 text-sm mb-4">
          Select the maximum scale of projects you can handle.
        </p>
        
        <div className="grid md:grid-cols-2 gap-3">
          {SCALE_CAPABILITY_CONFIG.map(scale => {
            const isSelected = serviceCoverage.scaleCapabilities.includes(scale.value);
            
            return (
              <button
                key={scale.value}
                onClick={() => handleScaleCapabilityToggle(scale.value)}
                className={`
                  flex items-center justify-between p-3 rounded-lg border-2 transition
                  ${isSelected 
                    ? 'bg-slate-800/50 border-green-500' 
                    : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'}
                `}
              >
                <div className="text-left">
                  <div className={`font-medium ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                    {scale.label}
                  </div>
                  <div className="text-sm text-slate-500">{scale.floors}</div>
                </div>
                {isSelected && <CheckCircle className="h-5 w-5 text-green-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Options */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Service Availability</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
            <input
              type="checkbox"
              checked={serviceCoverage.emergencyResponse}
              onChange={() => handleServiceOptionToggle('emergencyResponse')}
              className="w-5 h-5 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-white">24/7 Emergency Response</div>
              <div className="text-sm text-slate-400">Available for emergency callouts</div>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
            <input
              type="checkbox"
              checked={serviceCoverage.afterHours}
              onChange={() => handleServiceOptionToggle('afterHours')}
              className="w-5 h-5 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-white">After Hours Service</div>
              <div className="text-sm text-slate-400">Work outside business hours</div>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
            <input
              type="checkbox"
              checked={serviceCoverage.weekendService}
              onChange={() => handleServiceOptionToggle('weekendService')}
              className="w-5 h-5 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-white">Weekend Service</div>
              <div className="text-sm text-slate-400">Available on weekends</div>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600">
            <input
              type="checkbox"
              checked={serviceCoverage.publicHolidays}
              onChange={() => handleServiceOptionToggle('publicHolidays')}
              className="w-5 h-5 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <div className="font-medium text-white">Public Holiday Service</div>
              <div className="text-sm text-slate-400">Available on public holidays</div>
            </div>
          </label>
        </div>
      </div>

      {/* Estimated Impact */}
      <div className="p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-4">
          <Zap className="h-6 w-6 text-yellow-400 mt-1" />
          <div>
            <h4 className="font-semibold text-white mb-2">Your Coverage Impact</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-slate-400">Property Types</div>
                <div className="text-2xl font-bold text-blue-400">{serviceCoverage.propertyTypes.length}</div>
              </div>
              <div>
                <div className="text-slate-400">Disaster Types</div>
                <div className="text-2xl font-bold text-green-400">{serviceCoverage.disasterTypes.length}</div>
              </div>
              <div>
                <div className="text-slate-400">Est. Pages Generated</div>
                <div className="text-2xl font-bold text-yellow-400">{estimatedPageCount.toLocaleString()}+</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm mt-3">
              Based on your selections, we'll automatically generate location-specific pages for your service areas, 
              maximizing your visibility across all selected property and disaster types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}