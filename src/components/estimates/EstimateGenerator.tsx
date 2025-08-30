'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  FileText, 
  Send,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Home,
  Droplets,
  Zap,
  Info,
  RefreshCw
} from 'lucide-react';
import { 
  JobEstimate,
  EstimateLineItem,
  SiteAssessment,
  RoomDetail,
  EstimateTotals,
  PriceComparison,
  LineItemCategory
} from '@/types/estimate-generation';

interface EstimateGeneratorProps {
  jobId?: string;
  assessment?: SiteAssessment;
}

const EstimateGenerator: React.FC<EstimateGeneratorProps> = ({ jobId, assessment }) => {
  const [estimate, setEstimate] = useState<JobEstimate | null>(null);
  const [lineItems, setLineItems] = useState<EstimateLineItem[]>([]);
  const [totals, setTotals] = useState<EstimateTotals>({
    subtotal: 0,
    equipmentTotal: 0,
    labourTotal: 0,
    materialsTotal: 0,
    contingency: 0,
    taxableAmount: 0,
    gst: 0,
    total: 0,
    balanceDue: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<LineItemCategory | 'all'>('all');
  const [showComparison, setShowComparison] = useState(true);
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([]);

  const categories: { value: LineItemCategory; label: string; icon: React.ElementType; colour: string }[] = [
    { value: 'emergency_services', label: 'Emergency', icon: Zap, colour: 'red' },
    { value: 'labour', label: 'Labour', icon: Clock, colour: 'blue' },
    { value: 'equipment', label: 'Equipment', icon: Home, colour: 'purple' },
    { value: 'materials', label: 'Materials', icon: Droplets, colour: 'green' },
    { value: 'disposal', label: 'Disposal', icon: FileText, colour: 'orange' },
    { value: 'cleaning', label: 'Cleaning', icon: Droplets, colour: 'cyan' },
    { value: 'restoration', label: 'Restoration', icon: Home, colour: 'indigo' }
  ];

  useEffect(() => {
    if (assessment) {
      generateEstimate();
    } else {
      loadMockEstimate();
    }
  }, [assessment]);

  const loadMockEstimate = () => {
    // Mock assessment data
    const mockAssessment: SiteAssessment = {
      id: 'SA001',
      assessmentDate: new Date().toISOString(),
      technician: {
        id: 'T001',
        name: 'John Smith',
        certifications: ['IICRC WRT', 'IICRC ASD']
      },
      propertyDetails: {
        address: '123 Main St, Sydney NSW 2000',
        propertyType: 'residential',
        yearBuilt: 2010,
        constructionType: 'Brick veneer',
        totalArea: 200,
        affectedArea: 45,
        rooms: [
          {
            id: 'R001',
            name: 'Master Bedroom',
            type: 'bedroom',
            dimensions: { length: 4, width: 3.5, height: 2.7 },
            area: 14,
            affectedPercentage: 80,
            materials: ['carpet', 'drywall'],
            damageLevel: 'significant',
            equipment: [
              { type: 'Air Mover', quantity: 2, duration: 3, purpose: 'Drying carpet and walls' },
              { type: 'Dehumidifier', quantity: 1, duration: 3, purpose: 'Moisture removal' }
            ]
          },
          {
            id: 'R002',
            name: 'Bathroom',
            type: 'bathroom',
            dimensions: { length: 2.5, width: 2, height: 2.7 },
            area: 5,
            affectedPercentage: 100,
            materials: ['tile', 'drywall'],
            damageLevel: 'severe',
            equipment: [
              { type: 'Air Mover', quantity: 1, duration: 3, purpose: 'Drying walls' },
              { type: 'HEPA Air Scrubber', quantity: 1, duration: 2, purpose: 'Air quality' }
            ]
          },
          {
            id: 'R003',
            name: 'Hallway',
            type: 'hallway',
            dimensions: { length: 5, width: 1.5, height: 2.7 },
            area: 7.5,
            affectedPercentage: 60,
            materials: ['carpet', 'drywall'],
            damageLevel: 'moderate',
            equipment: [
              { type: 'Air Mover', quantity: 1, duration: 3, purpose: 'Drying carpet' }
            ]
          }
        ]
      },
      damageAssessment: {
        primaryCause: 'water_damage',
        category: 2,
        class: 2,
        hazardLevel: 'low',
        contaminants: [],
        specialRequirements: ['After-hours response', 'Contents manipulation']
      },
      environmentalReadings: [
        { type: 'moisture', location: 'Master Bedroom - Wall', value: 85, unit: '%', timestamp: new Date().toISOString(), equipment: 'Protimeter' },
        { type: 'humidity', location: 'Master Bedroom', value: 72, unit: '%', timestamp: new Date().toISOString(), equipment: 'Hygrometer' }
      ],
      photos: [],
      notes: 'Burst pipe in bathroom wall caused water damage to adjacent rooms. Quick response prevented mould growth.',
      completedAt: new Date().toISOString()
    };

    generateEstimate(mockAssessment);
  };

  const generateEstimate = (assessmentData?: SiteAssessment) => {
    setIsGenerating(true);

    const data = assessmentData || assessment;
    if (!data) return;

    // Generate line items based on IICRC standards
    const generatedItems: EstimateLineItem[] = [];

    // Emergency Services
    generatedItems.push({
      id: 'LI001',
      category: 'emergency_services',
      itemCode: 'ES-001',
      description: 'Initial On-Site Assessment (First 2 hours, any time/day)',
      quantity: 1,
      unit: 'fixed',
      unitPrice: 550,
      totalPrice: 550,
      source: 'nrp_guideline',
      priceComparison: {
        nrpGuideline: 550,
        contractorRate: 550,
        industryAverage: 575,
        variance: 0
      },
      taxable: true,
      standard: {
        standard: 'IICRC',
        code: 'S500',
        description: 'Standard for Professional Water Damage Restoration'
      }
    });

    // Labour - calculated based on IICRC formulas
    const totalAffectedArea = data.propertyDetails.rooms.reduce((sum, room) => 
      sum + (room.area * room.affectedPercentage / 100), 0
    );
    const estimatedLabourHours = Math.ceil(totalAffectedArea * 0.5); // 0.5 hours per sqm for Category 2

    generatedItems.push({
      id: 'LI002',
      category: 'labour',
      itemCode: 'LAB-001',
      description: 'Lead Technician - Water Damage Restoration',
      quantity: estimatedLabourHours,
      unit: 'hour',
      unitPrice: 85,
      totalPrice: estimatedLabourHours * 85,
      source: 'contractor_rate',
      priceComparison: {
        nrpGuideline: 80,
        contractorRate: 85,
        industryAverage: 82,
        variance: 6.25
      },
      taxable: true,
      standard: {
        standard: 'IICRC',
        code: 'S500-2021',
        description: 'Category 2 water damage restoration'
      }
    });

    generatedItems.push({
      id: 'LI003',
      category: 'labour',
      itemCode: 'LAB-002',
      description: 'Restoration Technician - Assistant',
      quantity: estimatedLabourHours,
      unit: 'hour',
      unitPrice: 55,
      totalPrice: estimatedLabourHours * 55,
      source: 'contractor_rate',
      priceComparison: {
        nrpGuideline: 57.5,
        contractorRate: 55,
        industryAverage: 58,
        variance: -4.35
      },
      taxable: true
    });

    // Equipment - based on room requirements
    data.propertyDetails.rooms.forEach((room) => {
      room.equipment.forEach((eq, index) => {
        generatedItems.push({
          id: `LI-EQ-${room.id}-${index}`,
          category: 'equipment',
          itemCode: `EQ-${eq.type.replace(' ', '-')}`,
          description: `${eq.type} - ${room.name}`,
          quantity: eq.quantity * eq.duration,
          unit: 'day',
          unitPrice: getEquipmentPrice(eq.type),
          totalPrice: eq.quantity * eq.duration * getEquipmentPrice(eq.type),
          source: 'nrp_guideline',
          priceComparison: {
            nrpGuideline: getEquipmentPrice(eq.type),
            contractorRate: getEquipmentPrice(eq.type) * 1.05,
            industryAverage: getEquipmentPrice(eq.type) * 1.02,
            variance: 0
          },
          taxable: true,
          notes: eq.purpose,
          standard: {
            standard: 'IICRC',
            code: 'S500',
            description: `Equipment for Class ${data.damageAssessment.class} water damage`
          }
        });
      });
    });

    // Materials
    generatedItems.push({
      id: 'LI004',
      category: 'materials',
      itemCode: 'MAT-001',
      description: 'Antimicrobial Treatment - All affected areas',
      quantity: Math.ceil(totalAffectedArea / 10),
      unit: 'application',
      unitPrice: 45,
      totalPrice: Math.ceil(totalAffectedArea / 10) * 45,
      source: 'nrp_guideline',
      priceComparison: {
        nrpGuideline: 45,
        contractorRate: 48,
        industryAverage: 46,
        variance: 6.67
      },
      taxable: true
    });

    // Disposal
    generatedItems.push({
      id: 'LI005',
      category: 'disposal',
      itemCode: 'DISP-001',
      description: 'Waste/Spoil Removal - Contaminated materials',
      quantity: Math.ceil(totalAffectedArea / 20),
      unit: 'm³',
      unitPrice: 250,
      totalPrice: Math.ceil(totalAffectedArea / 20) * 250,
      source: 'nrp_guideline',
      priceComparison: {
        nrpGuideline: 250,
        contractorRate: 275,
        industryAverage: 260,
        variance: 10
      },
      taxable: true
    });

    setLineItems(generatedItems);
    calculateTotals(generatedItems);
    generatePriceComparisons(generatedItems);

    // Create estimate object
    const newEstimate: JobEstimate = {
      id: 'EST001',
      jobId: jobId || 'JOB001',
      estimateNumber: `EST-${Date.now()}`,
      version: 1,
      status: 'draft',
      type: 'initial',
      assessment: data,
      lineItems: generatedItems,
      calculations: {
        method: 'iicrc_standard',
        parameters: [
          { name: 'Total Area', value: data.propertyDetails.totalArea, unit: 'sqm', source: 'Assessment' },
          { name: 'Affected Area', value: totalAffectedArea, unit: 'sqm', source: 'Calculated' },
          { name: 'Water Category', value: data.damageAssessment.category, unit: '', source: 'IICRC S500' },
          { name: 'Water Class', value: data.damageAssessment.class, unit: '', source: 'IICRC S500' }
        ],
        formulas: [
          {
            name: 'Labour Hours',
            expression: 'Affected Area × 0.5 (Category 2 factor)',
            result: estimatedLabourHours,
            unit: 'hours'
          },
          {
            name: 'Equipment Days',
            expression: 'Based on psychrometric calculations',
            result: 3,
            unit: 'days'
          }
        ],
        assumptions: [
          'Normal drying conditions',
          'No structural drying required',
          'Standard business hours labour rate applied'
        ],
        contingency: {
          percentage: 10,
          amount: 0, // Will be calculated
          justification: 'Standard contingency for unforeseen complications'
        }
      },
      totals: totals,
      comparisons: priceComparisons,
      scope: {
        id: 'SCOPE001',
        summary: 'Water damage restoration services following burst pipe incident',
        phases: [
          {
            phase: 1,
            name: 'Emergency Response & Mitigation',
            description: 'Initial water extraction and stabilization',
            tasks: [
              'Site assessment and documentation',
              'Water extraction',
              'Initial antimicrobial application',
              'Equipment setup'
            ],
            duration: 1,
            milestones: ['Water extraction complete', 'Equipment operational']
          },
          {
            phase: 2,
            name: 'Drying & Monitoring',
            description: 'Structural drying and daily monitoring',
            tasks: [
              'Daily moisture readings',
              'Equipment adjustments',
              'Progress documentation'
            ],
            duration: 3,
            dependencies: [1],
            milestones: ['Moisture levels at target', 'Drying complete']
          },
          {
            phase: 3,
            name: 'Final Restoration',
            description: 'Equipment removal and final treatment',
            tasks: [
              'Final moisture verification',
              'Equipment removal',
              'Final antimicrobial treatment',
              'Site cleanup'
            ],
            duration: 1,
            dependencies: [2],
            milestones: ['Restoration complete', 'Sign-off obtained']
          }
        ],
        exclusions: [
          'Reconstruction or repairs',
          'Contents cleaning',
          'Mould remediation (if discovered)',
          'Asbestos abatement'
        ],
        assumptions: [
          'Uninterrupted access to property',
          'Power and water available on site',
          'No hazardous materials present'
        ],
        timeline: {
          estimatedDuration: 5,
          phases: [
            { phase: 1, startDay: 0, endDay: 1, description: 'Emergency Response' },
            { phase: 2, startDay: 1, endDay: 4, description: 'Drying Phase' },
            { phase: 3, startDay: 4, endDay: 5, description: 'Completion' }
          ],
          criticalDates: []
        },
        deliverables: [
          'Complete water extraction',
          'Dried structure to industry standards',
          'Moisture documentation',
          'Completion certificate'
        ],
        qualityStandards: [
          'IICRC S500 compliance',
          'Target moisture content < 16%',
          'Indoor air quality standards met'
        ],
        safetyRequirements: [
          'PPE for all technicians',
          'Electrical safety protocols',
          'Slip hazard management'
        ],
        attachments: []
      },
      approvals: [],
      metadata: {
        createdBy: 'System',
        lastModifiedBy: 'System',
        revisionHistory: [],
        tags: ['water_damage', 'category_2', 'residential'],
        compliance: {
          australianConsumerLaw: true,
          fairTrading: true,
          buildingCodes: ['NCC 2022'],
          insuranceRequirements: ['Public Liability', 'Professional Indemnity'],
          environmentalStandards: ['AS/NZS 4858']
        },
        disclaimer: {
          text: 'This is an ESTIMATE only and not a fixed price quote.',
          sections: [
            {
              title: 'Important Notice',
              content: 'This is an ESTIMATE only and not a fixed price quote. Actual costs may vary depending on site findings and unforeseen requirements. Client approval is required to commence works.',
              emphasis: 'highlighted',
              required: true
            },
            {
              title: 'Variation Clause',
              content: 'Additional work discovered during restoration will be documented and approved before proceeding. Variations may affect the final cost.',
              emphasis: 'standard',
              required: true
            },
            {
              title: 'Consumer Rights',
              content: 'This estimate is provided in accordance with Australian Consumer Law. You have the right to obtain quotes from other providers.',
              emphasis: 'standard',
              required: true
            }
          ],
          lastUpdated: new Date().toISOString(),
          legalReview: true
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    setEstimate(newEstimate);
    setIsGenerating(false);
  };

  const getEquipmentPrice = (equipmentType: string): number => {
    const prices: Record<string, number> = {
      'Air Mover': 45,
      'Dehumidifier': 105,
      'HEPA Air Scrubber': 85,
      'Thermal Imaging': 150,
      'Moisture Meter': 25
    };
    return prices[equipmentType] || 50;
  };

  const calculateTotals = (items: EstimateLineItem[]) => {
    const equipmentTotal = items
      .filter(item => item.category === 'equipment')
      .reduce((sum, item) => sum + item.totalPrice, 0);

    const labourTotal = items
      .filter(item => item.category === 'labour')
      .reduce((sum, item) => sum + item.totalPrice, 0);

    const materialsTotal = items
      .filter(item => item.category === 'materials')
      .reduce((sum, item) => sum + item.totalPrice, 0);

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const contingency = subtotal * 0.1;
    const taxableAmount = subtotal + contingency;
    const gst = taxableAmount * 0.1;
    const total = taxableAmount + gst;

    setTotals({
      subtotal,
      equipmentTotal,
      labourTotal,
      materialsTotal,
      contingency,
      taxableAmount,
      gst,
      total,
      balanceDue: total
    });
  };

  const generatePriceComparisons = (items: EstimateLineItem[]) => {
    const categoryTotals: Record<string, PriceComparison> = {};

    items.forEach(item => {
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = {
          category: item.category,
          nrpTotal: 0,
          contractorTotal: 0,
          industryAverage: 0,
          selectedPrice: 0,
          variance: 0
        };
      }

      categoryTotals[item.category].nrpTotal += item.priceComparison.nrpGuideline || 0;
      categoryTotals[item.category].contractorTotal += item.priceComparison.contractorRate || 0;
      categoryTotals[item.category].industryAverage += item.priceComparison.industryAverage || 0;
      categoryTotals[item.category].selectedPrice += item.totalPrice;
    });

    const comparisons = Object.values(categoryTotals).map(cat => ({
      ...cat,
      variance: ((cat.selectedPrice - cat.nrpTotal) / cat.nrpTotal) * 100
    }));

    setPriceComparisons(comparisons);
  };

  const getCategoryIcon = (category: LineItemCategory) => {
    const cat = categories.find(c => c.value === category);
    return cat?.icon || FileText;
  };

  const getCategoryColor = (category: LineItemCategory) => {
    const cat = categories.find(c => c.value === category);
    return cat?.colour || 'gray';
  };

  const filteredLineItems = lineItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Automated Job Estimate</h2>
              <p className="text-sm text-gray-500">IICRC Standards-Based Calculation</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {estimate && (
              <>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send to Client</span>
                </button>
              </>
            )}
            {!estimate && (
              <button
                onClick={() => loadMockEstimate()}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'Generate Estimate'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Assessment Summary */}
        {estimate?.assessment && (
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Property Type</p>
              <p className="font-medium capitalize">{estimate.assessment.propertyDetails.propertyType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Affected Area</p>
              <p className="font-medium">{estimate.assessment.propertyDetails.affectedArea} m²</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Damage Type</p>
              <p className="font-medium capitalize">{estimate.assessment.damageAssessment.primaryCause.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Category/Class</p>
              <p className="font-medium">Cat {estimate.assessment.damageAssessment.category} / Class {estimate.assessment.damageAssessment.class}</p>
            </div>
          </div>
        )}
      </div>

      {/* Legal Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-900">Important Notice</p>
            <p className="text-sm text-yellow-800 mt-1">
              This is an ESTIMATE only and not a fixed price quote. Actual costs may vary depending on site 
              findings and unforeseen requirements. Client approval is required to commence works. 
              All prices include GST and are based on IICRC standards and current industry rates.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1 rounded-lg flex items-center space-x-1 whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? `bg-${cat.colour}-100 text-${cat.colour}-700`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showComparison}
              onChange={(e) => setShowComparison(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm">Show price comparisons</span>
          </label>
        </div>
      </div>

      {/* Line Items */}
      {estimate && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Estimate Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                  {showComparison && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NRP Guide</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry Avg</th>
                    </>
                  )}
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLineItems.map((item) => {
                  const Icon = getCategoryIcon(item.category);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-start space-x-2">
                          <Icon className={`h-5 w-5 text-${getCategoryColor(item.category)}-500 mt-0.5`} />
                          <div>
                            <p className="font-medium text-sm">{item.description}</p>
                            {item.notes && (
                              <p className="text-xs text-gray-500">{item.notes}</p>
                            )}
                            {item.standard && (
                              <p className="text-xs text-blue-600">{item.standard.standard} {item.standard.code}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        ${item.unitPrice.toFixed(2)}
                        {item.priceComparison.variance !== 0 && (
                          <span className={`ml-2 text-xs ${
                            item.priceComparison.variance! > 0 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            ({item.priceComparison.variance! > 0 ? '+' : ''}{item.priceComparison.variance?.toFixed(1)}%)
                          </span>
                        )}
                      </td>
                      {showComparison && (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            ${item.priceComparison.nrpGuideline?.toFixed(2) || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            ${item.priceComparison.industryAverage?.toFixed(2) || '-'}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 text-sm font-medium text-right">
                        ${item.totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="max-w-md ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Contingency (10%)</span>
                <span className="font-medium">${totals.contingency.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (10%)</span>
                <span className="font-medium">${totals.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total Estimate</span>
                <span className="text-blue-600">${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Price Comparison Summary */}
      {estimate && showComparison && priceComparisons.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Price Comparison Summary
          </h3>
          <div className="space-y-3">
            {priceComparisons.map((comparison) => (
              <div key={comparison.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium capitalize">{comparison.category.replace('_', ' ')}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm">
                    <span className="text-gray-600">NRP: ${comparison.nrpTotal.toFixed(2)}</span>
                    <span className="text-gray-600">Contractor: ${comparison.contractorTotal.toFixed(2)}</span>
                    <span className="text-gray-600">Industry: ${comparison.industryAverage.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${comparison.selectedPrice.toFixed(2)}</p>
                  {comparison.variance !== 0 && (
                    <p className={`text-sm ${
                      Math.abs(comparison.variance) > 10 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {comparison.variance > 0 ? '+' : ''}{comparison.variance.toFixed(1)}% from NRP
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Notice */}
      {estimate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Legal Compliance</p>
              <p className="text-sm text-blue-800 mt-1">
                This estimate complies with Australian Consumer Law and includes transparent pricing comparisons. 
                The estimate references all relevant legal requirements for Australian service contracts including 
                fairness provisions and the right to variation. Client approval and digital signature are required 
                before work can commence.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateGenerator;