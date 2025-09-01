'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  FileText, 
  Info,
  Clock,
  Tool,
  Beaker,
  Briefcase,
  Shield,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Printer
} from 'lucide-react';
import { 
  PriceGuideline,
  PriceCategory,
  LabourRate,
  EquipmentRate,
  ClientPriceView
} from '@/types/billing-pricing';

interface CategorySection {
  category: PriceCategory;
  title: string;
  icon: React.ElementType;
  colour: string;
  description?: string;
}

const TransparencyBillingDashboard: React.FC = () => {
  const [priceGuidelines, setPriceGuidelines] = useState<PriceGuideline[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<PriceCategory>>(new Set(['call_out']));
  const [selectedCategory, setSelectedCategory] = useState<PriceCategory | 'all'>('all');
  const [showPrintView, setShowPrintView] = useState(false);

  const categories: CategorySection[] = [
    { category: 'call_out', title: 'Call-Out Fee', icon: Shield, colour: 'blue', 
      description: 'Initial assessment and emergency response charges' },
    { category: 'labour', title: 'Labour (Hourly Rates)', icon: Clock, colour: 'green',
      description: 'Normal Hours: 8am–4pm (Mon–Fri). All other times are after hours.' },
    { category: 'equipment', title: 'Equipment Hire', icon: Tool, colour: 'purple',
      description: 'Price 1: With remote monitoring. Price 2: Standard (max 4 days drying per week)' },
    { category: 'chemicals', title: 'Chemicals & Consumables', icon: Beaker, colour: 'orange',
      description: 'Treatment products and consumable materials' },
    { category: 'services', title: 'Additional Services', icon: Briefcase, colour: 'indigo',
      description: 'Specialised restoration and remediation services' },
    { category: 'administration', title: 'Administration & Insurance', icon: FileText, colour: 'gray',
      description: 'Processing and administrative charges' }
  ];

  useEffect(() => {
    loadPriceGuidelines();
  }, []);

  const loadPriceGuidelines = () => {
    // Mock price guidelines data matching the specification
    const mockGuidelines: PriceGuideline[] = [
      // Call-Out Fee
      {
        id: 'PG001',
        category: 'call_out',
        itemName: 'Initial On-Site Assessment (First 2 hours, any time/day)',
        unit: 'fixed',
        priceRange: { min: 550, max: 550, fixed: 550 },
        gstIncluded: true,
        notes: 'Covers site visit, assessment, documentation; applies 24/7.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      
      // Labour Rates
      {
        id: 'PG002',
        category: 'labour',
        itemName: 'Lead Technician (One per job)',
        unit: 'per_hour',
        priceRange: {
          min: 70, max: 90,
          normalHours: { min: 70, max: 90 },
          afterHours: { min: 100, max: 140 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG003',
        category: 'labour',
        itemName: '2nd/Other Technicians',
        unit: 'per_hour',
        priceRange: {
          min: 50, max: 65,
          normalHours: { min: 50, max: 65 },
          afterHours: { min: 80, max: 105 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG004',
        category: 'labour',
        itemName: 'Specialised Technician (e.g. Mould/Sewage)',
        unit: 'per_hour',
        priceRange: {
          min: 110, max: 150,
          normalHours: { min: 110, max: 150 },
          afterHours: { min: 155, max: 185 }
        },
        gstIncluded: true,
        notes: 'Industry data range for hazardous work.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },

      // Equipment Hire
      {
        id: 'PG005',
        category: 'equipment',
        itemName: 'Air Mover',
        unit: 'per_day',
        priceRange: {
          min: 40, max: 50,
          withRemoteMonitoring: { min: 45, max: 50 },
          standard: { min: 40, max: 45 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG006',
        category: 'equipment',
        itemName: 'Axial Air Mover',
        unit: 'per_day',
        priceRange: {
          min: 50, max: 70,
          withRemoteMonitoring: { min: 60, max: 70 },
          standard: { min: 50, max: 60 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG007',
        category: 'equipment',
        itemName: 'Dehumidifier',
        unit: 'per_day',
        priceRange: {
          min: 90, max: 115,
          withRemoteMonitoring: { min: 105, max: 115 },
          standard: { min: 90, max: 100 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG008',
        category: 'equipment',
        itemName: 'AFD/HEPA Filtration Unit',
        unit: 'per_day',
        priceRange: {
          min: 75, max: 95,
          withRemoteMonitoring: { min: 85, max: 95 },
          standard: { min: 75, max: 85 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG009',
        category: 'equipment',
        itemName: 'Drymatic D2 Heat Dryer',
        unit: 'per_day',
        priceRange: {
          min: 140, max: 200,
          withRemoteMonitoring: { min: 180, max: 200 },
          standard: { min: 140, max: 150 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG010',
        category: 'equipment',
        itemName: 'Drymatic Boost Bar',
        unit: 'per_day',
        priceRange: {
          min: 65, max: 100,
          withRemoteMonitoring: { min: 80, max: 100 },
          standard: { min: 65, max: 75 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG011',
        category: 'equipment',
        itemName: 'Electric Extraction',
        unit: 'per_hour',
        priceRange: {
          min: 60, max: 160,
          firstUnit: { min: 150, max: 160 },
          additionalUnit: { min: 60, max: 70 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG012',
        category: 'equipment',
        itemName: 'Truck Mount Extraction',
        unit: 'per_hour',
        priceRange: {
          min: 150, max: 280,
          firstUnit: { min: 250, max: 280 },
          additionalUnit: { min: 150, max: 160 }
        },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG013',
        category: 'equipment',
        itemName: 'Thermal Imaging (per site visit)',
        unit: 'per_visit',
        priceRange: { min: 95, max: 175 },
        gstIncluded: true,
        notes: 'Used for advanced water/moisture detection.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG014',
        category: 'equipment',
        itemName: 'HEPA Air Scrubber',
        unit: 'per_day',
        priceRange: { min: 80, max: 100 },
        gstIncluded: true,
        notes: 'Billed if required for airborne contaminants.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG015',
        category: 'equipment',
        itemName: 'Containment Materials (per 30m roll)',
        unit: 'fixed',
        priceRange: { min: 120, max: 180 },
        gstIncluded: true,
        notes: 'Best practice for isolating affected areas.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },

      // Chemicals & Consumables
      {
        id: 'PG016',
        category: 'chemicals',
        itemName: 'Antimicrobial/Mould Treatment',
        unit: 'per_room',
        priceRange: { min: 40, max: 65 },
        gstIncluded: true,
        notes: 'Or $15–$25/litre used',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG017',
        category: 'chemicals',
        itemName: 'Odour Neutraliser',
        unit: 'per_application',
        priceRange: { min: 35, max: 45 },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG018',
        category: 'chemicals',
        itemName: 'Surface Disinfectant (biohazard/mould)',
        unit: 'per_application',
        priceRange: { min: 60, max: 90 },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },

      // Additional Services
      {
        id: 'PG019',
        category: 'services',
        itemName: 'Carpet/Underlay Relaying',
        unit: 'per_sqm',
        priceRange: { min: 7.50, max: 11 },
        gstIncluded: true,
        notes: 'After drying; includes equipment and adhesive.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG020',
        category: 'services',
        itemName: 'Mould Remediation (affected surface)',
        unit: 'per_sqm',
        priceRange: { min: 60, max: 125 },
        gstIncluded: true,
        notes: 'Industry guideline for significant infestation.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG021',
        category: 'services',
        itemName: 'Waste/Spoil Removal',
        unit: 'per_cubic_meter',
        priceRange: { min: 190, max: 350 },
        gstIncluded: true,
        notes: 'For contaminated materials, includes disposal fees.',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },

      // Administration & Insurance
      {
        id: 'PG022',
        category: 'administration',
        itemName: 'Claim Administration (per claim, min.)',
        unit: 'per_claim',
        priceRange: { min: 275, max: 275, fixed: 275 },
        gstIncluded: true,
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      },
      {
        id: 'PG023',
        category: 'administration',
        itemName: 'Insurance Processing Fee (per claim)',
        unit: 'per_claim',
        priceRange: { min: 49.95, max: 49.95, fixed: 49.95 },
        gstIncluded: true,
        notes: 'Client-visible fee',
        validFrom: '2024-01-01',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      }
    ];

    setPriceGuidelines(mockGuidelines);
  };

  const toggleCategory = (category: PriceCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const formatPriceRange = (range: any, unit: string): string => {
    if (range.fixed !== undefined) {
      return `Fixed $${range.fixed.toFixed(2)}`;
    }
    if (range.normalHours && range.afterHours) {
      return '';  // Handled separately for labour rates
    }
    if (range.withRemoteMonitoring && range.standard) {
      return '';  // Handled separately for equipment
    }
    if (range.firstUnit && range.additionalUnit) {
      return `First hour: $${range.firstUnit.min}–$${range.firstUnit.max} | Additional: $${range.additionalUnit.min}–$${range.additionalUnit.max}/hr`;
    }
    return `$${range.min.toFixed(2)}–$${range.max.toFixed(2)}${unit !== 'fixed' ? `/${unit.replace('per_', '')}` : ''}`;
  };

  const getCategoryIcon = (category: PriceCategory) => {
    const section = categories.find(c => c.category === category);
    return section?.icon || FileText;
  };

  const getCategoryColor = (category: PriceCategory) => {
    const section = categories.find(c => c.category === category);
    return section?.colour || 'gray';
  };

  const exportPDF = () => {
    // Implementation would generate PDF
    alert('PDF export would be implemented here');
  };

  const printGuidelines = () => {
    setShowPrintView(true);
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Transparency Billing – Industry Cost Guidelines</h2>
              <p className="text-sm text-gray-500">(AUD, incl GST)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={printGuidelines}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </button>
            <button
              onClick={exportPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Important Notice</p>
              <p className="text-sm text-blue-800 mt-1">
                The following rates are provided for transparency and client understanding. These are industry guideline 
                rates only; exact pricing will always be quoted by your assigned NRP contractor after assessment. 
                Contractors may upload their own rates for validation. Any new line items or out-of-range prices 
                will be flagged for admin review.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3 py-1 rounded-lg flex items-center space-x-1 whitespace-nowrap ${
                  selectedCategory === cat.category
                    ? `bg-${cat.colour}-100 text-${cat.colour}-700`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Guidelines by Category */}
      <div className="space-y-4">
        {categories
          .filter(cat => selectedCategory === 'all' || selectedCategory === cat.category)
          .map((categorySection) => {
            const Icon = categorySection.icon;
            const categoryGuidelines = priceGuidelines.filter(g => g.category === categorySection.category);
            const isExpanded = expandedCategories.has(categorySection.category);

            return (
              <div key={categorySection.category} className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => toggleCategory(categorySection.category)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colours"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${categorySection.colour}-100 rounded-lg`}>
                      <Icon className={`h-5 w-5 text-${categorySection.colour}-600`} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{categorySection.title}</h3>
                      {categorySection.description && (
                        <p className="text-sm text-gray-600 mt-1">{categorySection.description}</p>
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t">
                    {categorySection.category === 'labour' ? (
                      // Special layout for labour rates
                      <div className="p-4 space-y-3">
                        {categoryGuidelines.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-3">{item.itemName}</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Normal Hours (8am-4pm Mon-Fri)</p>
                                <p className="text-lg font-semibold text-green-600">
                                  ${item.priceRange.normalHours?.min}–${item.priceRange.normalHours?.max}/hr
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">After Hours</p>
                                <p className="text-lg font-semibold text-blue-700">
                                  ${item.priceRange.afterHours?.min}–${item.priceRange.afterHours?.max}/hr
                                </p>
                              </div>
                            </div>
                            {item.notes && (
                              <p className="text-sm text-gray-600 mt-2 italic">{item.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : categorySection.category === 'equipment' ? (
                      // Special layout for equipment
                      <div className="p-4 space-y-3">
                        {categoryGuidelines.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-3">{item.itemName}</h4>
                            {item.priceRange.withRemoteMonitoring && item.priceRange.standard ? (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">With Remote Monitoring</p>
                                  <p className="text-lg font-semibold text-purple-600">
                                    ${item.priceRange.withRemoteMonitoring.min}–${item.priceRange.withRemoteMonitoring.max}/day
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Standard (max 4 days/week)</p>
                                  <p className="text-lg font-semibold text-blue-600">
                                    ${item.priceRange.standard.min}–${item.priceRange.standard.max}/day
                                  </p>
                                </div>
                              </div>
                            ) : item.priceRange.firstUnit && item.priceRange.additionalUnit ? (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">First Hour</p>
                                  <p className="text-lg font-semibold text-purple-600">
                                    ${item.priceRange.firstUnit.min}–${item.priceRange.firstUnit.max}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Each Additional Hour</p>
                                  <p className="text-lg font-semibold text-blue-600">
                                    ${item.priceRange.additionalUnit.min}–${item.priceRange.additionalUnit.max}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-lg font-semibold text-green-600">
                                {formatPriceRange(item.priceRange, item.unit)}
                              </p>
                            )}
                            {item.notes && (
                              <p className="text-sm text-gray-600 mt-2 italic">{item.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Standard layout for other categories
                      <div className="divide-y">
                        {categoryGuidelines.map((item) => (
                          <div key={item.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium">{item.itemName}</p>
                                {item.notes && (
                                  <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-lg font-semibold text-green-600">
                                  {formatPriceRange(item.priceRange, item.unit)}
                                </p>
                                {item.unit !== 'fixed' && (
                                  <p className="text-sm text-gray-500">
                                    {item.unit.replace('per_', 'per ').replace('_', ' ')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-blue-700" />
          Client Information
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-700 mr-2">•</span>
            All price guidelines above are inclusive of GST.
          </li>
          <li className="flex items-start">
            <span className="text-blue-700 mr-2">•</span>
            Clients receive itemized quote before works commence and are notified of any additional costs or 'extras' required.
          </li>
          <li className="flex items-start">
            <span className="text-blue-700 mr-2">•</span>
            Final pricing may vary based on specific job requirements, site conditions, and contractor assessment.
          </li>
          <li className="flex items-start">
            <span className="text-blue-700 mr-2">•</span>
            Emergency and after-hours services may incur additional charges as specified in the labour rates section.
          </li>
        </ul>
      </div>

      {/* Print View */}
      {showPrintView && (
        <div className="hidden print:block">
          <style jsx>{`
            @media print {
              @page { margin: 1cm; }
              body { font-size: 12pt; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default TransparencyBillingDashboard;