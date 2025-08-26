'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Edit2,
  Save,
  X,
  AlertCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { 
  EstimateLineItem, 
  LineItemCategory,
  PriceSource,
  DamageLevel,
  MaterialType,
  RoomDetail
} from '@/types/estimate-generation';

interface LineItemCalculatorProps {
  rooms: RoomDetail[];
  damageLevel: DamageLevel;
  category: number; // IICRC category
  onItemsCalculated: (items: EstimateLineItem[]) => void;
}

const EstimateLineItemCalculator: React.FC<LineItemCalculatorProps> = ({
  rooms,
  damageLevel,
  category,
  onItemsCalculated
}) => {
  const [lineItems, setLineItems] = useState<EstimateLineItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [customItem, setCustomItem] = useState<Partial<EstimateLineItem>>({
    category: 'materials',
    quantity: 1,
    unit: 'each',
    unitPrice: 0,
    taxable: true
  });

  // IICRC-based calculation formulas
  const calculateDryingEquipment = () => {
    const totalArea = rooms.reduce((sum, room) => sum + room.area, 0);
    const items: EstimateLineItem[] = [];

    // Dehumidifiers - 1 per 50-60 sqm for Category 2
    const dehumidifierCount = Math.ceil(totalArea / 55);
    items.push({
      id: `dehumidifier-${Date.now()}`,
      category: 'equipment',
      subcategory: 'drying',
      itemCode: 'IICRC-DH-01',
      description: 'Commercial Dehumidifier (50L/day capacity)',
      quantity: dehumidifierCount,
      unit: 'day',
      unitPrice: 95,
      totalPrice: dehumidifierCount * 95 * 3, // 3 days average
      source: 'nrp_guideline',
      priceComparison: {
        nrpGuideline: 95,
        contractorRate: 100,
        industryAverage: 97,
        variance: 5.26
      },
      taxable: true,
      notes: `${dehumidifierCount} units for ${totalArea.toFixed(0)}sqm (1 per 55sqm)`,
      standard: {
        standard: 'IICRC',
        code: 'S500-2021',
        description: 'Standard for Professional Water Damage Restoration',
        methodology: 'Psychrometric calculation based on Category 2 water damage'
      }
    });

    // Air movers - 1 per 10-15 linear meters of affected walls
    const totalPerimeter = rooms.reduce((sum, room) => {
      return sum + 2 * (room.dimensions.length + room.dimensions.width);
    }, 0);
    const airMoverCount = Math.ceil(totalPerimeter / 12);
    
    items.push({
      id: `airmover-${Date.now()}`,
      category: 'equipment',
      subcategory: 'drying',
      itemCode: 'IICRC-AM-01',
      description: 'Axial Air Mover (2800 CFM)',
      quantity: airMoverCount,
      unit: 'day',
      unitPrice: 45,
      totalPrice: airMoverCount * 45 * 3,
      source: 'nrp_guideline',
      priceComparison: {
        nrpGuideline: 45,
        contractorRate: 48,
        industryAverage: 46,
        variance: 6.67
      },
      taxable: true,
      notes: `${airMoverCount} units for ${totalPerimeter.toFixed(0)}m perimeter`,
      standard: {
        standard: 'IICRC',
        code: 'S500-2021',
        description: 'Air movement calculation',
        methodology: '1 air mover per 10-15 linear meters of affected wall'
      }
    });

    return items;
  };

  const calculateLabourItems = () => {
    const totalArea = rooms.reduce((sum, room) => sum + room.area * (room.affectedPercentage / 100), 0);
    const items: EstimateLineItem[] = [];

    // Initial extraction and setup
    items.push({
      id: `labour-extraction-${Date.now()}`,
      category: 'labour',
      subcategory: 'extraction',
      itemCode: 'IICRC-LB-01',
      description: 'Water Extraction and Initial Setup - Lead Technician',
      quantity: Math.ceil(totalArea * 0.15), // 0.15 hours per sqm
      unit: 'hour',
      unitPrice: 85,
      totalPrice: Math.ceil(totalArea * 0.15) * 85,
      source: 'contractor_rate',
      priceComparison: {
        nrpGuideline: 80,
        contractorRate: 85,
        industryAverage: 82,
        variance: 6.25
      },
      taxable: true,
      notes: `Category ${category} water extraction for ${totalArea.toFixed(0)}sqm`,
      standard: {
        standard: 'IICRC',
        code: 'S500-2021',
        description: 'Water extraction labor standards',
        methodology: 'Time-based calculation for Category 2 clean water'
      }
    });

    // Monitoring visits
    const monitoringDays = category === 3 ? 5 : 3;
    items.push({
      id: `labour-monitoring-${Date.now()}`,
      category: 'labour',
      subcategory: 'monitoring',
      itemCode: 'IICRC-LB-02',
      description: 'Daily Monitoring and Adjustment',
      quantity: monitoringDays * 1.5, // 1.5 hours per visit
      unit: 'hour',
      unitPrice: 75,
      totalPrice: monitoringDays * 1.5 * 75,
      source: 'nrp_guideline',
      priceComparison: {
        nrpGuideline: 75,
        contractorRate: 78,
        industryAverage: 76,
        variance: 4
      },
      taxable: true,
      notes: `${monitoringDays} monitoring visits with equipment adjustments`
    });

    return items;
  };

  const calculateMaterialItems = () => {
    const items: EstimateLineItem[] = [];
    
    rooms.forEach(room => {
      const affectedArea = room.area * (room.affectedPercentage / 100);
      
      // Anti-microbial treatment
      if (category >= 2) {
        items.push({
          id: `antimicrobial-${room.id}-${Date.now()}`,
          category: 'materials',
          subcategory: 'chemicals',
          itemCode: 'IICRC-CH-01',
          description: `Anti-microbial Treatment - ${room.name}`,
          quantity: Math.ceil(affectedArea),
          unit: 'sqm',
          unitPrice: 8.5,
          totalPrice: Math.ceil(affectedArea) * 8.5,
          source: 'nrp_guideline',
          priceComparison: {
            nrpGuideline: 8.5,
            contractorRate: 9,
            industryAverage: 8.75,
            variance: 5.88
          },
          taxable: true,
          notes: 'EPA-registered anti-microbial for Category 2+ water damage'
        });
      }

      // Material replacement based on damage level
      if (room.damageLevel === 'severe' || room.damageLevel === 'total_loss') {
        room.materials.forEach(material => {
          if (material === 'drywall') {
            items.push({
              id: `drywall-${room.id}-${Date.now()}`,
              category: 'materials',
              subcategory: 'reconstruction',
              itemCode: 'MAT-DW-01',
              description: `Drywall Replacement - ${room.name}`,
              quantity: Math.ceil(affectedArea * 0.3), // 30% of floor area for walls
              unit: 'sqm',
              unitPrice: 45,
              totalPrice: Math.ceil(affectedArea * 0.3) * 45,
              source: 'industry_average',
              priceComparison: {
                nrpGuideline: 42,
                contractorRate: 48,
                industryAverage: 45,
                variance: 14.29
              },
              taxable: true,
              notes: 'Includes removal, disposal, and installation'
            });
          }
        });
      }
    });

    return items;
  };

  useEffect(() => {
    const equipment = calculateDryingEquipment();
    const labour = calculateLabourItems();
    const materials = calculateMaterialItems();
    
    const allItems = [...equipment, ...labour, ...materials];
    setLineItems(allItems);
    onItemsCalculated(allItems);
  }, [rooms, damageLevel, category]);

  const handleUpdateItem = (itemId: string, updates: Partial<EstimateLineItem>) => {
    setLineItems(prev => {
      const updated = prev.map(item => 
        item.id === itemId 
          ? { ...item, ...updates, totalPrice: (updates.quantity || item.quantity) * (updates.unitPrice || item.unitPrice) }
          : item
      );
      onItemsCalculated(updated);
      return updated;
    });
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    setLineItems(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      onItemsCalculated(updated);
      return updated;
    });
  };

  const handleAddCustomItem = () => {
    const newItem: EstimateLineItem = {
      id: `custom-${Date.now()}`,
      category: customItem.category as LineItemCategory,
      description: customItem.description || 'Custom Item',
      quantity: customItem.quantity || 1,
      unit: customItem.unit || 'each',
      unitPrice: customItem.unitPrice || 0,
      totalPrice: (customItem.quantity || 1) * (customItem.unitPrice || 0),
      source: 'custom',
      taxable: customItem.taxable !== false,
      priceComparison: {}
    };

    setLineItems(prev => {
      const updated = [...prev, newItem];
      onItemsCalculated(updated);
      return updated;
    });

    setShowAddItem(false);
    setCustomItem({
      category: 'materials',
      quantity: 1,
      unit: 'each',
      unitPrice: 0,
      taxable: true
    });
  };

  const getCategoryColor = (category: LineItemCategory) => {
    const colors = {
      emergency_services: 'bg-red-100 text-red-800',
      labour: 'bg-blue-100 text-blue-800',
      equipment: 'bg-purple-100 text-purple-800',
      materials: 'bg-green-100 text-green-800',
      disposal: 'bg-gray-100 text-gray-800',
      cleaning: 'bg-yellow-100 text-yellow-800',
      restoration: 'bg-indigo-100 text-indigo-800',
      reconstruction: 'bg-pink-100 text-pink-800',
      testing: 'bg-orange-100 text-orange-800',
      administration: 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const groupedItems = lineItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<LineItemCategory, EstimateLineItem[]>);

  const categoryTotals = Object.entries(groupedItems).map(([category, items]) => ({
    category,
    total: items.reduce((sum, item) => sum + item.totalPrice, 0)
  }));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-blue-600" />
            Line Item Calculator
          </h3>
          <button
            onClick={() => setShowAddItem(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Item
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {categoryTotals.map(({ category, total }) => (
            <div key={category} className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600 capitalize">{category.replace('_', ' ')}</p>
              <p className="text-xl font-bold text-gray-900">
                ${total.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Line Items by Category */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b">
            <h4 className="font-semibold text-gray-900 capitalize">
              {category.replace('_', ' ')}
            </h4>
          </div>
          
          <div className="divide-y">
            {items.map(item => (
              <div key={item.id} className="p-6">
                {editingItem === item.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <div className="grid grid-cols-4 gap-4">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, { quantity: parseFloat(e.target.value) })}
                        className="px-3 py-2 border rounded"
                        placeholder="Quantity"
                      />
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleUpdateItem(item.id, { unit: e.target.value })}
                        className="px-3 py-2 border rounded"
                        placeholder="Unit"
                      />
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(item.id, { unitPrice: parseFloat(e.target.value) })}
                        className="px-3 py-2 border rounded"
                        placeholder="Unit Price"
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(item.category as LineItemCategory)}`}>
                          {item.subcategory || item.category}
                        </span>
                        {item.itemCode && (
                          <span className="text-xs text-gray-500">
                            {item.itemCode}
                          </span>
                        )}
                      </div>
                      
                      <p className="font-medium text-gray-900">{item.description}</p>
                      
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                        <span>{item.quantity} {item.unit}</span>
                        <span>@ ${item.unitPrice}/unit</span>
                        <span className="font-semibold text-gray-900">
                          = ${item.totalPrice.toLocaleString('en-AU', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      {item.priceComparison && Object.keys(item.priceComparison).length > 0 && (
                        <div className="mt-2 flex items-center space-x-3 text-xs">
                          {item.priceComparison.nrpGuideline && (
                            <span className="text-blue-600">
                              NRP: ${item.priceComparison.nrpGuideline}
                            </span>
                          )}
                          {item.priceComparison.variance && (
                            <span className={`flex items-center ${
                              Math.abs(item.priceComparison.variance) > 10 ? 'text-orange-600' : 'text-green-600'
                            }`}>
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {item.priceComparison.variance > 0 ? '+' : ''}{item.priceComparison.variance.toFixed(1)}%
                            </span>
                          )}
                        </div>
                      )}

                      {item.notes && (
                        <p className="mt-2 text-sm text-gray-500 italic">{item.notes}</p>
                      )}
                      
                      {item.standard && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                          <span className="font-medium">{item.standard.standard} {item.standard.code}:</span>
                          <span className="ml-2">{item.standard.description}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setEditingItem(item.id)}
                        className="p-2 text-gray-400 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Custom Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Custom Line Item</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={customItem.category}
                  onChange={(e) => setCustomItem({ ...customItem, category: e.target.value as LineItemCategory })}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="materials">Materials</option>
                  <option value="labour">Labour</option>
                  <option value="equipment">Equipment</option>
                  <option value="disposal">Disposal</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="administration">Administration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={customItem.description || ''}
                  onChange={(e) => setCustomItem({ ...customItem, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter item description"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={customItem.quantity || ''}
                    onChange={(e) => setCustomItem({ ...customItem, quantity: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={customItem.unit || ''}
                    onChange={(e) => setCustomItem({ ...customItem, unit: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price/Unit</label>
                  <input
                    type="number"
                    value={customItem.unitPrice || ''}
                    onChange={(e) => setCustomItem({ ...customItem, unitPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={customItem.taxable !== false}
                  onChange={(e) => setCustomItem({ ...customItem, taxable: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">GST Applicable</label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddItem(false);
                  setCustomItem({
                    category: 'materials',
                    quantity: 1,
                    unit: 'each',
                    unitPrice: 0,
                    taxable: true
                  });
                }}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomItem}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateLineItemCalculator;