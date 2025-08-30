'use client';

import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Save,
  Plus,
  Trash2,
  Edit,
  RefreshCw,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { 
  ContractorRate,
  PriceGuideline,
  ValidationResult,
  PriceUpload,
  RateStatus,
  PriceCategory
} from '@/types/billing-pricing';

interface UploadProgress {
  total: number;
  processed: number;
  approved: number;
  flagged: number;
  rejected: number;
}

const ContractorPriceUpload: React.FC = () => {
  const [contractorRates, setContractorRates] = useState<ContractorRate[]>([]);
  const [guidelines, setGuidelines] = useState<PriceGuideline[]>([]);
  const [uploadHistory, setUploadHistory] = useState<PriceUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [selectedRate, setSelectedRate] = useState<ContractorRate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<RateStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<PriceCategory | 'all'>('all');
  
  // Form state for adding/editing rates
  const [rateForm, setRateForm] = useState({
    category: 'labour' as PriceCategory,
    itemName: '',
    price: 0,
    normalHoursPrice: 0,
    afterHoursPrice: 0,
    unit: 'per_hour',
    notes: ''
  });

  useEffect(() => {
    loadContractorRates();
    loadGuidelines();
    loadUploadHistory();
  }, []);

  const loadContractorRates = () => {
    // Mock contractor rates
    const mockRates: ContractorRate[] = [
      {
        id: 'CR001',
        contractorId: 'CONT001',
        contractorName: 'Elite Restoration Co',
        guidelineId: 'PG002',
        category: 'labour',
        itemName: 'Lead Technician',
        customItem: false,
        unit: 'per_hour',
        price: 85,
        normalHoursPrice: 85,
        afterHoursPrice: 120,
        status: 'approved',
        validationResult: {
          isValid: true,
          isWithinRange: true,
          percentageDeviation: 0,
          flags: [],
          requiresReview: false
        },
        submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        reviewedBy: 'system',
        validFrom: '2024-01-01'
      },
      {
        id: 'CR002',
        contractorId: 'CONT001',
        contractorName: 'Elite Restoration Co',
        category: 'equipment',
        itemName: 'Industrial Dehumidifier Pro',
        customItem: true,
        unit: 'per_day',
        price: 125,
        status: 'flagged',
        validationResult: {
          isValid: false,
          isWithinRange: false,
          percentageDeviation: 15,
          flags: [
            { type: 'new_item', severity: 'warning', message: 'New item not in guidelines' },
            { type: 'unusual_unit', severity: 'info', message: 'Review pricing structure' }
          ],
          requiresReview: true,
          message: 'Custom item requires admin review'
        },
        submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        validFrom: '2024-01-01'
      },
      {
        id: 'CR003',
        contractorId: 'CONT001',
        contractorName: 'Elite Restoration Co',
        guidelineId: 'PG005',
        category: 'equipment',
        itemName: 'Air Mover',
        customItem: false,
        unit: 'per_day',
        price: 48,
        status: 'approved',
        validationResult: {
          isValid: true,
          isWithinRange: true,
          percentageDeviation: 0,
          flags: [],
          requiresReview: false
        },
        submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 47 * 60 * 60 * 1000).toISOString(),
        reviewedBy: 'system',
        validFrom: '2024-01-01'
      },
      {
        id: 'CR004',
        contractorId: 'CONT001',
        contractorName: 'Elite Restoration Co',
        guidelineId: 'PG016',
        category: 'chemicals',
        itemName: 'Antimicrobial Treatment',
        customItem: false,
        unit: 'per_room',
        price: 75,
        status: 'flagged',
        validationResult: {
          isValid: false,
          isWithinRange: false,
          percentageDeviation: 25,
          flags: [
            { type: 'out_of_range', severity: 'warning', message: 'Price exceeds guideline by 25%' },
            { type: 'excessive_deviation', severity: 'error', message: 'Requires justification' }
          ],
          requiresReview: true,
          message: 'Price significantly above guideline range'
        },
        submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        validFrom: '2024-01-01'
      }
    ];

    setContractorRates(mockRates);
  };

  const loadGuidelines = () => {
    // Would load from API
  };

  const loadUploadHistory = () => {
    // Mock upload history
    const mockHistory: PriceUpload[] = [
      {
        id: 'UP001',
        contractorId: 'CONT001',
        uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'John Smith',
        filename: 'price-list-jan-2024.csv',
        status: 'completed',
        totalItems: 45,
        processedItems: 45,
        approvedItems: 38,
        rejectedItems: 2,
        flaggedItems: 5
      },
      {
        id: 'UP002',
        contractorId: 'CONT001',
        uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: 'John Smith',
        filename: 'initial-rates.csv',
        status: 'completed',
        totalItems: 32,
        processedItems: 32,
        approvedItems: 30,
        rejectedItems: 0,
        flaggedItems: 2
      }
    ];

    setUploadHistory(mockHistory);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress({ total: 0, processed: 0, approved: 0, flagged: 0, rejected: 0 });

    // Simulate file processing
    simulateUpload();
  };

  const simulateUpload = () => {
    const total = 25;
    let processed = 0;
    let approved = 0;
    let flagged = 0;
    let rejected = 0;

    const interval = setInterval(() => {
      processed++;
      
      // Simulate validation results
      const random = Math.random();
      if (random < 0.7) {
        approved++;
      } else if (random < 0.9) {
        flagged++;
      } else {
        rejected++;
      }

      setUploadProgress({ total, processed, approved, flagged, rejected });

      if (processed >= total) {
        clearInterval(interval);
        setIsUploading(false);
        loadContractorRates();
        loadUploadHistory();
      }
    }, 200);
  };

  const validateRate = (rate: ContractorRate): ValidationResult => {
    // Mock validation logic
    const guideline = guidelines.find(g => g.id === rate.guidelineId);
    
    if (!guideline && !rate.customItem) {
      return {
        isValid: false,
        isWithinRange: false,
        flags: [{ type: 'missing_guideline', severity: 'error', message: 'No matching guideline found' }],
        requiresReview: true,
        message: 'Missing guideline reference'
      };
    }

    if (rate.customItem) {
      return {
        isValid: false,
        isWithinRange: false,
        flags: [{ type: 'new_item', severity: 'warning', message: 'Custom item requires review' }],
        requiresReview: true,
        message: 'Custom item needs admin approval'
      };
    }

    // Check if within range
    const deviation = Math.random() * 30 - 15; // Mock deviation
    const isWithinRange = Math.abs(deviation) <= 10;

    return {
      isValid: isWithinRange,
      isWithinRange,
      percentageDeviation: deviation,
      flags: isWithinRange ? [] : [
        { 
          type: 'out_of_range', 
          severity: deviation > 20 ? 'error' : 'warning',
          message: `Price ${deviation > 0 ? 'above' : 'below'} guideline by ${Math.abs(deviation).toFixed(1)}%`
        }
      ],
      requiresReview: !isWithinRange
    };
  };

  const handleAddRate = () => {
    const newRate: ContractorRate = {
      id: `CR${Date.now()}`,
      contractorId: 'CONT001',
      contractorName: 'Elite Restoration Co',
      category: rateForm.category,
      itemName: rateForm.itemName,
      customItem: true,
      unit: rateForm.unit as any,
      price: rateForm.price,
      normalHoursPrice: rateForm.normalHoursPrice,
      afterHoursPrice: rateForm.afterHoursPrice,
      notes: rateForm.notes,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      validFrom: new Date().toISOString()
    };

    // Validate the new rate
    newRate.validationResult = validateRate(newRate);
    newRate.status = newRate.validationResult.isValid ? 'approved' : 'flagged';

    setContractorRates([newRate, ...contractorRates]);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setRateForm({
      category: 'labour',
      itemName: '',
      price: 0,
      normalHoursPrice: 0,
      afterHoursPrice: 0,
      unit: 'per_hour',
      notes: ''
    });
  };

  const downloadTemplate = () => {
    // Would generate and download CSV template
    alert('CSV template download would be implemented here');
  };

  const getStatusIcon = (status: RateStatus) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'rejected': return XCircle;
      case 'flagged': return AlertCircle;
      case 'pending': return RefreshCw;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: RateStatus) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'flagged': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRates = contractorRates.filter(rate => {
    const matchesStatus = filterStatus === 'all' || rate.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || rate.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-centre justify-between mb-4">
          <div className="flex items-centre space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Contractor Price Management</h2>
              <p className="text-sm text-gray-500">Upload and manage your service rates</p>
            </div>
          </div>
          <div className="flex items-centre space-x-2">
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-centre space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Template</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-centre space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Rate</span>
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          {isUploading && uploadProgress ? (
            <div className="space-y-4">
              <div className="flex items-centre justify-between">
                <p className="text-sm font-medium">Processing rates...</p>
                <p className="text-sm text-gray-600">
                  {uploadProgress.processed} of {uploadProgress.total}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${(uploadProgress.processed / uploadProgress.total) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-centre">
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-2xl font-semibold text-green-600">{uploadProgress.approved}</p>
                  <p className="text-xs text-gray-600">Approved</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-2">
                  <p className="text-2xl font-semibold text-yellow-600">{uploadProgress.flagged}</p>
                  <p className="text-xs text-gray-600">Flagged</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2">
                  <p className="text-2xl font-semibold text-red-600">{uploadProgress.rejected}</p>
                  <p className="text-xs text-gray-600">Rejected</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-centre">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drop your price list CSV here or click to browse</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer inline-block"
              >
                Select File
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-centre justify-between">
          <div className="flex items-centre space-x-4">
            <div className="flex items-centre space-x-2">
              <label className="text-sm font-medium">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-centre space-x-2">
              <label className="text-sm font-medium">Category:</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                <option value="labour">Labour</option>
                <option value="equipment">Equipment</option>
                <option value="chemicals">Chemicals</option>
                <option value="services">Services</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredRates.length} items
          </div>
        </div>
      </div>

      {/* Rates List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRates.map((rate) => {
                const StatusIcon = getStatusIcon(rate.status);
                return (
                  <tr key={rate.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-centre space-x-1 px-2 py-1 text-xs rounded-full ${getStatusColor(rate.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{rate.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 capitalize">
                      {rate.category}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{rate.itemName}</p>
                        {rate.customItem && (
                          <span className="text-xs text-purple-600">Custom Item</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {rate.normalHoursPrice && rate.afterHoursPrice ? (
                        <div>
                          <p>${rate.normalHoursPrice} (normal)</p>
                          <p className="text-xs text-gray-500">${rate.afterHoursPrice} (after)</p>
                        </div>
                      ) : (
                        <p>${rate.price}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {rate.unit.replace('per_', '').replace('_', ' ')}
                    </td>
                    <td className="px-4 py-3">
                      {rate.validationResult && (
                        <div>
                          {rate.validationResult.isWithinRange ? (
                            <span className="text-green-600 text-sm">Within range</span>
                          ) : rate.validationResult.percentageDeviation !== undefined ? (
                            <span className={`text-sm ${
                              Math.abs(rate.validationResult.percentageDeviation) > 20 
                                ? 'text-red-600' 
                                : 'text-yellow-600'
                            }`}>
                              {rate.validationResult.percentageDeviation > 0 ? '+' : ''}
                              {rate.validationResult.percentageDeviation.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-yellow-600 text-sm">Review needed</span>
                          )}
                          {rate.validationResult.flags.length > 0 && (
                            <div className="mt-1">
                              {rate.validationResult.flags.map((flag, index) => (
                                <div key={index} className="flex items-centre space-x-1">
                                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                  <span className="text-xs text-gray-600">{flag.message}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-centre space-x-2">
                        <button
                          onClick={() => setSelectedRate(rate)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4 flex items-centre">
          <FileSpreadsheet className="h-5 w-5 mr-2 text-gray-600" />
          Upload History
        </h3>
        <div className="space-y-3">
          {uploadHistory.map((upload) => (
            <div key={upload.id} className="flex items-centre justify-between p-3 border rounded-lg">
              <div className="flex items-centre space-x-3">
                <FileSpreadsheet className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-sm">{upload.filename}</p>
                  <p className="text-xs text-gray-500">
                    Uploaded {new Date(upload.uploadedAt).toLocaleDateString()} by {upload.uploadedBy}
                  </p>
                </div>
              </div>
              <div className="flex items-centre space-x-4">
                <div className="text-sm text-right">
                  <p className="font-medium">{upload.totalItems} items</p>
                  <div className="flex items-centre space-x-2 text-xs">
                    <span className="text-green-600">{upload.approvedItems} approved</span>
                    <span className="text-yellow-600">{upload.flaggedItems} flagged</span>
                    <span className="text-red-600">{upload.rejectedItems} rejected</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Rate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-centre justify-centre z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Rate</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={rateForm.category}
                  onChange={(e) => setRateForm({ ...rateForm, category: e.target.value as PriceCategory })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="labour">Labour</option>
                  <option value="equipment">Equipment</option>
                  <option value="chemicals">Chemicals</option>
                  <option value="services">Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Item Name</label>
                <input
                  type="text"
                  value={rateForm.itemName}
                  onChange={(e) => setRateForm({ ...rateForm, itemName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Senior Technician"
                />
              </div>

              {rateForm.category === 'labour' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Normal Hours Rate</label>
                    <input
                      type="number"
                      value={rateForm.normalHoursPrice}
                      onChange={(e) => setRateForm({ ...rateForm, normalHoursPrice: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">After Hours Rate</label>
                    <input
                      type="number"
                      value={rateForm.afterHoursPrice}
                      onChange={(e) => setRateForm({ ...rateForm, afterHoursPrice: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="0.00"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={rateForm.price}
                    onChange={(e) => setRateForm({ ...rateForm, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="0.00"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select
                  value={rateForm.unit}
                  onChange={(e) => setRateForm({ ...rateForm, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="per_hour">Per Hour</option>
                  <option value="per_day">Per Day</option>
                  <option value="per_sqm">Per Sqm</option>
                  <option value="per_room">Per Room</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                <textarea
                  value={rateForm.notes}
                  onChange={(e) => setRateForm({ ...rateForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Additional information..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRate}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Rate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractorPriceUpload;