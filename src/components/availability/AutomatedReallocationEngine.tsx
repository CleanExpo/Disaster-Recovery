'use client';

import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Bell,
  Activity,
  Info
} from 'lucide-react';
import { 
  AvailabilityRule,
  RuleCondition,
  RuleAction,
  RuleNotification,
  LeadReallocation,
  ContractorAvailability,
  ConditionType,
  ActionType
} from '@/types/availability-management';

interface ReallocationEvent {
  id: string;
  timestamp: string;
  triggerType: 'status_change' | 'scheduled' | 'emergency' | 'manual';
  affectedContractor: string;
  leadCount: number;
  reallocatedTo: string[];
  successRate: number;
  averageResponseTime: number;
  ruleApplied?: string;
}

interface ContractorLoad {
  contractorId: string;
  name: string;
  currentStatus: string;
  activeLeads: number;
  capacity: number;
  utilizationRate: number;
  canAcceptMore: boolean;
  estimatedAvailability: string;
}

const AutomatedReallocationEngine: React.FC = () => {
  const [rules, setRules] = useState<AvailabilityRule[]>([]);
  const [reallocationEvents, setReallocationEvents] = useState<ReallocationEvent[]>([]);
  const [contractorLoads, setContractorLoads] = useState<ContractorLoad[]>([]);
  const [activeReallocations, setActiveReallocations] = useState<LeadReallocation[]>([]);
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [editingRule, setEditingRule] = useState<AvailabilityRule | null>(null);
  const [engineStatus, setEngineStatus] = useState<'active' | 'paused' | 'processing'>('active');
  const [stats, setStats] = useState({
    totalReallocations: 0,
    successfulReallocations: 0,
    failedReallocations: 0,
    averageReallocationTime: 0,
    activeRules: 0,
    queuedLeads: 0
  });

  // Rule builder form state
  const [newRule, setNewRule] = useState<Partial<AvailabilityRule>>({
    name: '',
    description: '',
    enabled: true,
    priority: 1,
    conditions: [],
    actions: [],
    notifications: []
  });

  const conditionTypes: { value: ConditionType; label: string; icon: React.ElementType }[] = [
    { value: 'status_change', label: 'Status Change', icon: Activity },
    { value: 'duration_exceeded', label: 'Duration Exceeded', icon: Clock },
    { value: 'advance_notice', label: 'Advance Notice', icon: Bell },
    { value: 'compliance_status', label: 'Compliance Status', icon: Shield },
    { value: 'job_count', label: 'Job Count', icon: Users },
    { value: 'date_range', label: 'Date Range', icon: Clock }
  ];

  const actionTypes: { value: ActionType; label: string; icon: React.ElementType }[] = [
    { value: 'reallocate_leads', label: 'Reallocate Leads', icon: RefreshCw },
    { value: 'notify_admin', label: 'Notify Admin', icon: Bell },
    { value: 'block_status_change', label: 'Block Change', icon: XCircle },
    { value: 'require_approval', label: 'Require Approval', icon: CheckCircle },
    { value: 'auto_approve', label: 'Auto Approve', icon: Zap },
    { value: 'send_reminder', label: 'Send Reminder', icon: Clock },
    { value: 'escalate', label: 'Escalate', icon: TrendingUp }
  ];

  useEffect(() => {
    loadMockData();
    const interval = setInterval(() => {
      simulateReallocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadMockData = () => {
    // Mock rules
    const mockRules: AvailabilityRule[] = [
      {
        id: 'AR001',
        name: 'Emergency Reallocation',
        description: 'Immediately reallocate leads when contractor goes into emergency status',
        enabled: true,
        priority: 1,
        conditions: [
          {
            type: 'status_change',
            operator: 'equals',
            value: 'emergency'
          }
        ],
        actions: [
          {
            type: 'reallocate_leads',
            parameters: { method: 'immediate', preferredContractors: [] }
          },
          {
            type: 'notify_admin',
            parameters: { urgency: 'high' }
          }
        ],
        notifications: [
          {
            recipient: 'admin',
            channel: 'email',
            template: 'emergency_reallocation',
            timing: 'immediate'
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'AR002',
        name: 'Vacation Reallocation',
        description: 'Reallocate leads when contractor schedules vacation',
        enabled: true,
        priority: 2,
        conditions: [
          {
            type: 'status_change',
            operator: 'equals',
            value: 'vacation'
          },
          {
            type: 'advance_notice',
            operator: 'greater_than',
            value: 48,
            timeframe: 'hours'
          }
        ],
        actions: [
          {
            type: 'reallocate_leads',
            parameters: { method: 'scheduled', leadTime: 24 }
          },
          {
            type: 'send_reminder',
            parameters: { to: 'contractor', when: '24_hours_before' }
          }
        ],
        notifications: [
          {
            recipient: 'contractor',
            channel: 'sms',
            template: 'vacation_confirmation',
            timing: 'before_change',
            advanceMinutes: 1440
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'AR003',
        name: 'Capacity Protection',
        description: 'Prevent overload by reallocating when near capacity',
        enabled: true,
        priority: 3,
        conditions: [
          {
            type: 'job_count',
            operator: 'greater_than',
            value: 10
          }
        ],
        actions: [
          {
            type: 'reallocate_leads',
            parameters: { method: 'overflow', threshold: 80 }
          }
        ],
        notifications: [
          {
            recipient: 'contractor',
            channel: 'in_app',
            template: 'capacity_warning',
            timing: 'immediate'
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Mock contractor loads
    const mockLoads: ContractorLoad[] = [
      {
        contractorId: 'C001',
        name: 'Elite Restoration Co',
        currentStatus: 'available',
        activeLeads: 5,
        capacity: 15,
        utilizationRate: 33,
        canAcceptMore: true,
        estimatedAvailability: 'Now'
      },
      {
        contractorId: 'C002',
        name: 'Rapid Response Team',
        currentStatus: 'busy',
        activeLeads: 12,
        capacity: 12,
        utilizationRate: 100,
        canAcceptMore: false,
        estimatedAvailability: '2 hours'
      },
      {
        contractorId: 'C003',
        name: 'Premier Services',
        currentStatus: 'available',
        activeLeads: 3,
        capacity: 20,
        utilizationRate: 15,
        canAcceptMore: true,
        estimatedAvailability: 'Now'
      },
      {
        contractorId: 'C004',
        name: 'Quick Fix Solutions',
        currentStatus: 'offline',
        activeLeads: 0,
        capacity: 10,
        utilizationRate: 0,
        canAcceptMore: false,
        estimatedAvailability: 'Tomorrow 8 AM'
      }
    ];

    // Mock reallocation events
    const mockEvents: ReallocationEvent[] = [
      {
        id: 'RE001',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        triggerType: 'status_change',
        affectedContractor: 'C002',
        leadCount: 3,
        reallocatedTo: ['C001', 'C003'],
        successRate: 100,
        averageResponseTime: 45,
        ruleApplied: 'Emergency Reallocation'
      },
      {
        id: 'RE002',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        triggerType: 'scheduled',
        affectedContractor: 'C004',
        leadCount: 5,
        reallocatedTo: ['C001', 'C002', 'C003'],
        successRate: 80,
        averageResponseTime: 120,
        ruleApplied: 'Vacation Reallocation'
      }
    ];

    setRules(mockRules);
    setContractorLoads(mockLoads);
    setReallocationEvents(mockEvents);
    setStats({
      totalReallocations: 25,
      successfulReallocations: 23,
      failedReallocations: 2,
      averageReallocationTime: 85,
      activeRules: mockRules.filter(r => r.enabled).length,
      queuedLeads: 3
    });
  };

  const simulateReallocation = () => {
    if (engineStatus !== 'active') return;

    const availableContractors = contractorLoads.filter(c => c.canAcceptMore);
    if (availableContractors.length === 0) return;

    // Simulate a random reallocation event
    if (Math.random() > 0.7) {
      const event: ReallocationEvent = {
        id: `RE${Date.now()}`,
        timestamp: new Date().toISOString(),
        triggerType: 'status_change',
        affectedContractor: contractorLoads[Math.floor(Math.random() * contractorLoads.length)].name,
        leadCount: Math.floor(Math.random() * 5) + 1,
        reallocatedTo: availableContractors.slice(0, 2).map(c => c.name),
        successRate: 90 + Math.floor(Math.random() * 10),
        averageResponseTime: 30 + Math.floor(Math.random() * 60),
        ruleApplied: rules[Math.floor(Math.random() * rules.length)]?.name
      };

      setReallocationEvents(prev => [event, ...prev].slice(0, 20));
      setStats(prev => ({
        ...prev,
        totalReallocations: prev.totalReallocations + 1,
        successfulReallocations: prev.successfulReallocations + 1
      }));
    }
  };

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.description) return;

    const rule: AvailabilityRule = {
      id: `AR${Date.now()}`,
      name: newRule.name,
      description: newRule.description,
      enabled: newRule.enabled || true,
      priority: newRule.priority || 1,
      conditions: newRule.conditions || [],
      actions: newRule.actions || [],
      notifications: newRule.notifications || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setRules([...rules, rule]);
    setShowRuleBuilder(false);
    resetRuleForm();
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const resetRuleForm = () => {
    setNewRule({
      name: '',
      description: '',
      enabled: true,
      priority: 1,
      conditions: [],
      actions: [],
      notifications: []
    });
    setEditingRule(null);
  };

  const addCondition = () => {
    const condition: RuleCondition = {
      type: 'status_change',
      operator: 'equals',
      value: ''
    };
    setNewRule({
      ...newRule,
      conditions: [...(newRule.conditions || []), condition]
    });
  };

  const addAction = () => {
    const action: RuleAction = {
      type: 'reallocate_leads',
      parameters: {}
    };
    setNewRule({
      ...newRule,
      actions: [...(newRule.actions || []), action]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'status_change': return Activity;
      case 'scheduled': return Clock;
      case 'emergency': return AlertTriangle;
      case 'manual': return Users;
      default: return Info;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Automated Reallocation Engine</h2>
              <p className="text-sm text-gray-500">Seamless lead redistribution when contractors are unavailable</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${
              engineStatus === 'active' ? 'bg-green-100 text-green-800' :
              engineStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                engineStatus === 'active' ? 'bg-green-500' :
                engineStatus === 'processing' ? 'bg-yellow-500 animate-pulse' :
                'bg-gray-500'
              }`} />
              <span className="text-sm font-medium capitalize">{engineStatus}</span>
            </div>
            <button
              onClick={() => setShowRuleBuilder(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Create Rule</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Total Reallocations</p>
            <p className="text-xl font-semibold">{stats.totalReallocations}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Successful</p>
            <p className="text-xl font-semibold text-green-600">{stats.successfulReallocations}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Failed</p>
            <p className="text-xl font-semibold text-red-600">{stats.failedReallocations}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Avg Time</p>
            <p className="text-xl font-semibold text-blue-600">{stats.averageReallocationTime}s</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Active Rules</p>
            <p className="text-xl font-semibold text-purple-600">{stats.activeRules}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">Queued Leads</p>
            <p className="text-xl font-semibold text-yellow-600">{stats.queuedLeads}</p>
          </div>
        </div>
      </div>

      {/* Contractor Load Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Current Contractor Availability
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {contractorLoads.map((contractor) => (
            <div key={contractor.contractorId} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{contractor.name}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    getStatusColor(contractor.currentStatus)
                  }`}>
                    {contractor.currentStatus}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">{contractor.utilizationRate}%</p>
                  <p className="text-xs text-gray-500">Utilization</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Leads</span>
                  <span className="font-medium">{contractor.activeLeads}/{contractor.capacity}</span>
                </div>
                
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full transition-all ${
                      contractor.utilizationRate > 80 ? 'bg-red-500' :
                      contractor.utilizationRate > 60 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${contractor.utilizationRate}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Can Accept</span>
                  <span className={`font-medium ${
                    contractor.canAcceptMore ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {contractor.canAcceptMore ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Est. Available</span>
                  <span className="font-medium">{contractor.estimatedAvailability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reallocation Rules */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-purple-600" />
          Active Reallocation Rules
        </h3>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => handleToggleRule(rule.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                  <div>
                    <p className="font-medium">{rule.name}</p>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Priority: {rule.priority}
                  </span>
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Conditions ({rule.conditions.length})</p>
                  {rule.conditions.slice(0, 2).map((condition, index) => (
                    <div key={index} className="text-xs bg-blue-50 px-2 py-1 rounded mb-1">
                      {condition.type}: {condition.operator} {condition.value}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Actions ({rule.actions.length})</p>
                  {rule.actions.slice(0, 2).map((action, index) => (
                    <div key={index} className="text-xs bg-green-50 px-2 py-1 rounded mb-1">
                      {action.type}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Notifications ({rule.notifications.length})</p>
                  {rule.notifications.slice(0, 2).map((notification, index) => (
                    <div key={index} className="text-xs bg-yellow-50 px-2 py-1 rounded mb-1">
                      {notification.recipient} via {notification.channel}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reallocation Events */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-green-600" />
          Recent Reallocation Events
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Trigger</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Affected</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reallocated To</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Success</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Response</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rule</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reallocationEvents.slice(0, 5).map((event) => {
                const TriggerIcon = getTriggerIcon(event.triggerType);
                return (
                  <tr key={event.id}>
                    <td className="px-4 py-2 text-sm">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <TriggerIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm capitalize">{event.triggerType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">{event.affectedContractor}</td>
                    <td className="px-4 py-2 text-sm font-medium">{event.leadCount}</td>
                    <td className="px-4 py-2 text-sm">{event.reallocatedTo.join(', ')}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.successRate === 100 
                          ? 'bg-green-100 text-green-800' 
                          : event.successRate >= 80
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {event.successRate}%
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">{event.averageResponseTime}s</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{event.ruleApplied || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rule Builder Modal */}
      {showRuleBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create Reallocation Rule</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rule Name</label>
                <input
                  type="text"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Emergency Lead Redistribution"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="Describe what this rule does..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <input
                    type="number"
                    value={newRule.priority}
                    onChange={(e) => setNewRule({ ...newRule, priority: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                    max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newRule.enabled ? 'enabled' : 'disabled'}
                    onChange={(e) => setNewRule({ ...newRule, enabled: e.target.value === 'enabled' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              {/* Conditions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Conditions</label>
                  <button
                    onClick={addCondition}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    + Add Condition
                  </button>
                </div>
                {newRule.conditions?.map((condition, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <select
                      value={condition.type}
                      onChange={(e) => {
                        const updated = [...(newRule.conditions || [])];
                        updated[index].type = e.target.value as ConditionType;
                        setNewRule({ ...newRule, conditions: updated });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      {conditionTypes.map(ct => (
                        <option key={ct.value} value={ct.value}>{ct.label}</option>
                      ))}
                    </select>
                    <select
                      value={condition.operator}
                      onChange={(e) => {
                        const updated = [...(newRule.conditions || [])];
                        updated[index].operator = e.target.value as any;
                        setNewRule({ ...newRule, conditions: updated });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="equals">Equals</option>
                      <option value="not_equals">Not Equals</option>
                      <option value="greater_than">Greater Than</option>
                      <option value="less_than">Less Than</option>
                    </select>
                    <input
                      type="text"
                      value={condition.value}
                      onChange={(e) => {
                        const updated = [...(newRule.conditions || [])];
                        updated[index].value = e.target.value;
                        setNewRule({ ...newRule, conditions: updated });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded flex-1"
                      placeholder="Value"
                    />
                    <button
                      onClick={() => {
                        const updated = newRule.conditions?.filter((_, i) => i !== index);
                        setNewRule({ ...newRule, conditions: updated });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Actions</label>
                  <button
                    onClick={addAction}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    + Add Action
                  </button>
                </div>
                {newRule.actions?.map((action, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <select
                      value={action.type}
                      onChange={(e) => {
                        const updated = [...(newRule.actions || [])];
                        updated[index].type = e.target.value as ActionType;
                        setNewRule({ ...newRule, actions: updated });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded"
                    >
                      {actionTypes.map(at => (
                        <option key={at.value} value={at.value}>{at.label}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const updated = newRule.actions?.filter((_, i) => i !== index);
                        setNewRule({ ...newRule, actions: updated });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowRuleBuilder(false);
                  resetRuleForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRule}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedReallocationEngine;