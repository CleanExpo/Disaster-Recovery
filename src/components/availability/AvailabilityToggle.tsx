'use client';

import React, { useState, useEffect } from 'react';
import { 
  Power, 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Briefcase,
  Home,
  Heart,
  Tool,
  GraduationCap,
  CloudRain,
  Info,
  Shield
} from 'lucide-react';
import { 
  ContractorAvailability, 
  AvailabilityStatus, 
  StatusReason,
  ReasonCategory,
  ComplianceStatus,
  PauseRequirements
} from '@/types/availability-management';

interface StatusOption {
  value: AvailabilityStatus;
  label: string;
  icon: React.ElementType;
  colour: string;
  requiresReason: boolean;
  requiresReturnDate: boolean;
}

interface ReasonOption {
  category: ReasonCategory;
  label: string;
  icon: React.ElementType;
  requiresDocumentation: boolean;
  maxDuration: number;
}

const AvailabilityToggle: React.FC = () => {
  const [availability, setAvailability] = useState<ContractorAvailability | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<AvailabilityStatus>('available');
  const [selectedReason, setSelectedReason] = useState<ReasonCategory | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showComplianceCheck, setShowComplianceCheck] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [minimumNoticeHours] = useState(24);

  const statusOptions: StatusOption[] = [
    { value: 'available', label: 'Available', icon: CheckCircle, colour: 'green', requiresReason: false, requiresReturnDate: false },
    { value: 'busy', label: 'Busy', icon: Briefcase, colour: 'yellow', requiresReason: false, requiresReturnDate: false },
    { value: 'offline', label: 'Offline', icon: Power, colour: 'gray', requiresReason: true, requiresReturnDate: true },
    { value: 'vacation', label: 'Vacation', icon: Home, colour: 'blue', requiresReason: true, requiresReturnDate: true },
    { value: 'sick_leave', label: 'Sick Leave', icon: Heart, colour: 'red', requiresReason: true, requiresReturnDate: false },
    { value: 'emergency', label: 'Emergency', icon: AlertCircle, colour: 'red', requiresReason: true, requiresReturnDate: false },
    { value: 'training', label: 'Training', icon: GraduationCap, colour: 'purple', requiresReason: true, requiresReturnDate: true },
    { value: 'paused', label: 'Paused', icon: XCircle, colour: 'orange', requiresReason: true, requiresReturnDate: false }
  ];

  const reasonOptions: ReasonOption[] = [
    { category: 'planned_vacation', label: 'Planned Vacation', icon: Home, requiresDocumentation: false, maxDuration: 30 },
    { category: 'sick_leave', label: 'Sick Leave', icon: Heart, requiresDocumentation: true, maxDuration: 7 },
    { category: 'family_emergency', label: 'Family Emergency', icon: AlertCircle, requiresDocumentation: false, maxDuration: 7 },
    { category: 'equipment_maintenance', label: 'Equipment Maintenance', icon: Tool, requiresDocumentation: false, maxDuration: 3 },
    { category: 'training_certification', label: 'Training/Certification', icon: GraduationCap, requiresDocumentation: true, maxDuration: 5 },
    { category: 'capacity_limit', label: 'At Capacity', icon: Briefcase, requiresDocumentation: false, maxDuration: 1 },
    { category: 'weather_event', label: 'Weather Event', icon: CloudRain, requiresDocumentation: false, maxDuration: 3 },
    { category: 'other', label: 'Other', icon: Info, requiresDocumentation: false, maxDuration: 7 }
  ];

  useEffect(() => {
    loadAvailabilityData();
  }, []);

  const loadAvailabilityData = () => {
    // Mock data
    const mockAvailability: ContractorAvailability = {
      id: 'CA001',
      contractorId: 'C001',
      currentStatus: 'available',
      lastStatusChange: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      statusHistory: [
        {
          id: 'SH001',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          previousStatus: 'offline',
          newStatus: 'available',
          reason: 'Returned from vacation',
          changedBy: 'contractor',
          changeMethod: 'manual',
          duration: 5 * 24 * 60
        }
      ],
      scheduledWindows: [],
      recurringSchedule: {
        id: 'RS001',
        contractorId: 'C001',
        enabled: true,
        weeklySchedule: [
          {
            dayOfWeek: 1,
            periods: [
              { startTime: '08:00', endTime: '18:00', status: 'available', capacity: 100 }
            ]
          },
          {
            dayOfWeek: 2,
            periods: [
              { startTime: '08:00', endTime: '18:00', status: 'available', capacity: 100 }
            ]
          },
          {
            dayOfWeek: 3,
            periods: [
              { startTime: '08:00', endTime: '18:00', status: 'available', capacity: 100 }
            ]
          },
          {
            dayOfWeek: 4,
            periods: [
              { startTime: '08:00', endTime: '18:00', status: 'available', capacity: 100 }
            ]
          },
          {
            dayOfWeek: 5,
            periods: [
              { startTime: '08:00', endTime: '17:00', status: 'available', capacity: 100 }
            ]
          }
        ],
        exceptions: [],
        timezone: 'America/Chicago',
        lastUpdated: new Date().toISOString()
      },
      blackoutDates: [],
      complianceStatus: {
        isCompliant: true,
        outstandingJobs: 2,
        pendingDocumentation: [],
        unResolvedIssues: [],
        lastComplianceCheck: new Date().toISOString(),
        canPause: false,
        blockReasons: ['2 jobs in progress must be completed']
      },
      pauseRequirements: {
        jobsCompleted: false,
        documentationSubmitted: true,
        qualityIssuesResolved: true,
        paymentsSettled: true,
        handoverCompleted: false,
        checklist: [
          {
            id: 'PC001',
            requirement: 'Complete all active jobs',
            status: 'in_progress',
            mandatory: true,
            category: 'operations'
          },
          {
            id: 'PC002',
            requirement: 'Submit final documentation',
            status: 'completed',
            completedAt: new Date().toISOString(),
            completedBy: 'contractor',
            mandatory: true,
            category: 'documentation'
          },
          {
            id: 'PC003',
            requirement: 'Resolve quality issues',
            status: 'completed',
            completedAt: new Date().toISOString(),
            completedBy: 'contractor',
            mandatory: true,
            category: 'quality'
          },
          {
            id: 'PC004',
            requirement: 'Handover active leads',
            status: 'pending',
            mandatory: true,
            category: 'operations'
          }
        ]
      }
    };

    setAvailability(mockAvailability);
    setSelectedStatus(mockAvailability.currentStatus);
  };

  const handleStatusChange = async () => {
    if (!availability) return;

    const statusOption = statusOptions.find(s => s.value === selectedStatus);
    
    // Check compliance for pause status
    if (selectedStatus === 'paused' && !availability.complianceStatus.canPause) {
      setShowComplianceCheck(true);
      return;
    }

    // Check if reason is required
    if (statusOption?.requiresReason && !selectedReason) {
      setShowReasonModal(true);
      return;
    }

    // Check minimum notice period
    const hoursNotice = calculateAdvanceNotice();
    if (hoursNotice < minimumNoticeHours && selectedStatus !== 'emergency') {
      if (!confirm(`This change requires ${minimumNoticeHours} hours advance notice. You're only giving ${hoursNotice} hours. Continue as emergency?`)) {
        return;
      }
    }

    setIsChangingStatus(true);

    // Simulate API call
    setTimeout(() => {
      const updatedAvailability: ContractorAvailability = {
        ...availability,
        currentStatus: selectedStatus,
        statusReason: selectedReason ? {
          category: selectedReason,
          description: customReason || reasonOptions.find(r => r.category === selectedReason)?.label || '',
          requiresApproval: hoursNotice < minimumNoticeHours,
          documentationRequired: reasonOptions.find(r => r.category === selectedReason)?.requiresDocumentation
        } : undefined,
        estimatedReturnDate: returnDate || undefined,
        lastStatusChange: new Date().toISOString(),
        statusHistory: [
          {
            id: `SH${Date.now()}`,
            timestamp: new Date().toISOString(),
            previousStatus: availability.currentStatus,
            newStatus: selectedStatus,
            reason: customReason || selectedReason || '',
            changedBy: 'contractor',
            changeMethod: 'manual'
          },
          ...availability.statusHistory
        ]
      };

      setAvailability(updatedAvailability);
      setIsChangingStatus(false);
      setShowReasonModal(false);
      resetForm();
    }, 1500);
  };

  const calculateAdvanceNotice = (): number => {
    if (!returnDate) return 0;
    const now = new Date();
    const changeDate = new Date(returnDate);
    const diffMs = changeDate.getTime() - now.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60));
  };

  const resetForm = () => {
    setSelectedReason(null);
    setCustomReason('');
    setReturnDate('');
  };

  const getStatusColor = (status: AvailabilityStatus) => {
    const option = statusOptions.find(s => s.value === status);
    switch (option?.colour) {
      case 'green': return 'bg-green-100 text-green-800 border-green-300';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'red': return 'bg-red-100 text-red-800 border-red-300';
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTimeSinceLastChange = () => {
    if (!availability) return '';
    const diff = Date.now() - new Date(availability.lastStatusChange).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  if (!availability) {
    return <div className="p-6">Loading availability data...</div>;
  }

  const CurrentStatusIcon = statusOptions.find(s => s.value === availability.currentStatus)?.icon || Power;

  return (
    <div className="p-6 space-y-6">
      {/* Current Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Power className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Availability Management</h2>
              <p className="text-sm text-gray-500">Control your availability status and schedule</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full border-2 ${getStatusColor(availability.currentStatus)}`}>
            <div className="flex items-center space-x-2">
              <CurrentStatusIcon className="h-5 w-5" />
              <span className="font-medium capitalize">{availability.currentStatus.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Last Status Change</p>
              <p className="text-sm font-medium">{getTimeSinceLastChange()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Jobs</p>
              <p className="text-sm font-medium">{availability.complianceStatus.outstandingJobs}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Compliance Status</p>
              <div className="flex items-center space-x-1 mt-1">
                {availability.complianceStatus.isCompliant ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">Compliant</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">Issues Found</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {availability.statusReason && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500">Current Reason</p>
              <p className="text-sm font-medium mt-1">{availability.statusReason.description}</p>
              {availability.estimatedReturnDate && (
                <p className="text-sm text-gray-600 mt-1">
                  Expected return: {new Date(availability.estimatedReturnDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quick Status Toggle */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Status Change</h3>
          <div className="grid grid-cols-4 gap-3">
            {statusOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              const isSelected = selectedStatus === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${
                    isSelected ? 'text-indigo-600' : 'text-gray-600'
                  }`} />
                  <p className="text-xs font-medium">{option.label}</p>
                </button>
              );
            })}
          </div>

          {/* More Options */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-700">
              More status options...
            </summary>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {statusOptions.slice(4).map((option) => {
                const Icon = option.icon;
                const isSelected = selectedStatus === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${
                      isSelected ? 'text-indigo-600' : 'text-gray-600'
                    }`} />
                    <p className="text-xs font-medium">{option.label}</p>
                  </button>
                );
              })}
            </div>
          </details>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowReasonModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Schedule Change
          </button>
          <button
            onClick={handleStatusChange}
            disabled={isChangingStatus || selectedStatus === availability.currentStatus}
            className={`px-6 py-2 rounded-lg font-medium ${
              isChangingStatus || selectedStatus === availability.currentStatus
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isChangingStatus ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>

      {/* Compliance Requirements */}
      {availability.pauseRequirements && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-purple-600" />
            Pause Requirements Checklist
          </h3>

          <div className="space-y-3">
            {availability.pauseRequirements.checklist.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {item.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : item.status === 'in_progress' ? (
                    <Clock className="h-5 w-5 text-blue-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{item.requirement}</p>
                    <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    item.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                  {item.mandatory && (
                    <p className="text-xs text-red-600 mt-1">Required</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!availability.complianceStatus.canPause && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Cannot Pause Account</p>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    {availability.complianceStatus.blockReasons.map((reason, index) => (
                      <li key={index}>• {reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-600" />
          Recent Status Changes
        </h3>

        <div className="space-y-3">
          {availability.statusHistory.slice(0, 5).map((history) => (
            <div key={history.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded ${getStatusColor(history.previousStatus)}`}>
                    {history.previousStatus}
                  </span>
                  <span className="mx-2">→</span>
                  <span className={`px-2 py-1 rounded ${getStatusColor(history.newStatus)}`}>
                    {history.newStatus}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {new Date(history.timestamp).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400">
                  by {history.changedBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Provide Status Change Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reason Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {reasonOptions.map((reason) => {
                    const Icon = reason.icon;
                    return (
                      <button
                        key={reason.category}
                        onClick={() => setSelectedReason(reason.category)}
                        className={`p-2 rounded-lg border text-left ${
                          selectedReason === reason.category
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{reason.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedReason === 'other' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Reason</label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Please provide details..."
                  />
                </div>
              )}

              {statusOptions.find(s => s.value === selectedStatus)?.requiresReturnDate && (
                <div>
                  <label className="block text-sm font-medium mb-2">Expected Return Date</label>
                  <input
                    type="datetime-local"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              )}

              {calculateAdvanceNotice() < minimumNoticeHours && calculateAdvanceNotice() > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      This change requires {minimumNoticeHours} hours advance notice. 
                      You're only giving {calculateAdvanceNotice()} hours.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowReasonModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                disabled={!selectedReason || (selectedReason === 'other' && !customReason)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  !selectedReason || (selectedReason === 'other' && !customReason)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Check Modal */}
      {showComplianceCheck && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              Cannot Pause - Compliance Issues
            </h3>
            
            <p className="text-gray-600 mb-4">
              You cannot pause your account until the following requirements are met:
            </p>

            <ul className="space-y-2 mb-6">
              {availability.complianceStatus.blockReasons.map((reason, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  <span className="text-sm">{reason}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowComplianceCheck(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityToggle;