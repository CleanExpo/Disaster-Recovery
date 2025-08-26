'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle, CheckCircle, Clock, PlayCircle, PauseCircle,
  User, Calendar, MessageSquare, Paperclip, TrendingUp, Target,
  AlertOctagon, Edit3, Trash2, Plus, Filter, Search, Archive,
  ChevronRight, Check, X, RefreshCw, Send, Flag, Shield
} from 'lucide-react';
import type { 
  RemediationPlan, 
  RemediationTask, 
  RemediationStatus,
  TaskStatus,
  TaskComment,
  AuditFinding,
  Priority,
  FindingSeverity
} from '@/types/audit-compliance';

interface RemediationManagementProps {
  auditId?: string;
  contractorId?: string;
  userRole: 'admin' | 'auditor' | 'contractor' | 'compliance_manager';
  userId: string;
  className?: string;
}

const RemediationManagement: React.FC<RemediationManagementProps> = ({
  auditId,
  contractorId,
  userRole,
  userId,
  className = ''
}) => {
  const [remediationPlans, setRemediationPlans] = useState<RemediationPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<RemediationPlan | null>(null);
  const [selectedTask, setSelectedTask] = useState<RemediationTask | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRemediationPlans();
  }, [auditId, contractorId]);

  const loadRemediationPlans = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockPlans: RemediationPlan[] = [
        {
          id: 'plan_001',
          auditId: 'audit_002',
          status: 'in_progress',
          tasks: [
            {
              id: 'task_001',
              title: 'Implement Safety Training Program',
              description: 'Develop and deliver comprehensive safety training to all field employees',
              findingId: 'finding_001',
              priority: 'critical',
              status: 'in_progress',
              assignedTo: 'contractor_002',
              dueDate: '2024-04-25T17:00:00Z',
              comments: [
                {
                  id: 'comment_001',
                  taskId: 'task_001',
                  userId: 'contractor_002',
                  userName: 'John Smith',
                  comment: 'Training materials have been prepared. Scheduling sessions for next week.',
                  timestamp: '2024-04-16T10:00:00Z'
                }
              ],
              estimatedHours: 40,
              actualHours: 12
            },
            {
              id: 'task_002',
              title: 'Distribute PPE to All Employees',
              description: 'Purchase and distribute required personal protective equipment',
              findingId: 'finding_001',
              priority: 'high',
              status: 'completed',
              assignedTo: 'contractor_002',
              dueDate: '2024-04-20T17:00:00Z',
              completedDate: '2024-04-18T14:30:00Z',
              comments: [],
              estimatedHours: 8,
              actualHours: 6
            },
            {
              id: 'task_003',
              title: 'Update Safety Protocols Documentation',
              description: 'Review and update all safety protocols and procedures',
              findingId: 'finding_001',
              priority: 'medium',
              status: 'pending',
              assignedTo: 'contractor_002',
              dueDate: '2024-04-30T17:00:00Z',
              comments: [],
              dependencies: ['task_001'],
              estimatedHours: 16
            }
          ],
          timeline: {
            startDate: '2024-04-15T00:00:00Z',
            targetCompletionDate: '2024-04-30T23:59:59Z'
          },
          assignedTo: 'contractor_002',
          approvedBy: 'admin_001',
          approvalDate: '2024-04-15T09:00:00Z',
          verificationRequired: true,
          verificationStatus: 'pending'
        },
        {
          id: 'plan_002',
          auditId: 'audit_001',
          status: 'pending_approval',
          tasks: [
            {
              id: 'task_004',
              title: 'Renew Mold Remediation Certification',
              description: 'Complete renewal process for expiring certification',
              findingId: 'finding_002',
              priority: 'high',
              status: 'pending',
              assignedTo: 'contractor_001',
              dueDate: '2024-04-28T17:00:00Z',
              comments: [],
              estimatedHours: 4
            }
          ],
          timeline: {
            startDate: '2024-04-20T00:00:00Z',
            targetCompletionDate: '2024-04-28T23:59:59Z'
          },
          assignedTo: 'contractor_001',
          verificationRequired: false
        }
      ];

      setRemediationPlans(mockPlans);
    } catch (error) {
      console.error('Error loading remediation plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (planId: string, task: Partial<RemediationTask>) => {
    try {
      const newTask: RemediationTask = {
        id: `task_${Date.now()}`,
        title: task.title || '',
        description: task.description || '',
        findingId: task.findingId || '',
        priority: task.priority || 'medium',
        status: 'pending',
        assignedTo: task.assignedTo || userId,
        dueDate: task.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        comments: [],
        estimatedHours: task.estimatedHours || 8
      };

      setRemediationPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? { ...plan, tasks: [...plan.tasks, newTask] }
          : plan
      ));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTaskStatus = async (planId: string, taskId: string, status: TaskStatus) => {
    try {
      setRemediationPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              tasks: plan.tasks.map(task => 
                task.id === taskId 
                  ? { 
                      ...task, 
                      status,
                      completedDate: status === 'completed' ? new Date().toISOString() : undefined
                    }
                  : task
              )
            }
          : plan
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleAddComment = async (planId: string, taskId: string, comment: string) => {
    try {
      const newComment: TaskComment = {
        id: `comment_${Date.now()}`,
        taskId,
        userId,
        userName: 'Current User',
        comment,
        timestamp: new Date().toISOString()
      };

      setRemediationPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              tasks: plan.tasks.map(task => 
                task.id === taskId 
                  ? { ...task, comments: [...(task.comments || []), newComment] }
                  : task
              )
            }
          : plan
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getStatusColor = (status: RemediationStatus | TaskStatus) => {
    switch (status) {
      case 'draft':
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved':
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'verified':
      case 'closed': return 'bg-purple-100 text-purple-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <PlayCircle className="w-4 h-4" />;
      case 'blocked': return <PauseCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'verified': return <Shield className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <AlertOctagon className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPlans = remediationPlans.filter(plan => {
    const matchesTab = 
      (activeTab === 'active' && ['in_progress', 'approved'].includes(plan.status)) ||
      (activeTab === 'pending' && ['draft', 'pending_approval'].includes(plan.status)) ||
      (activeTab === 'completed' && ['completed', 'verified', 'closed'].includes(plan.status));

    const matchesSearch = !searchQuery || 
      plan.tasks.some(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesTab && matchesSearch;
  });

  const RemediationPlanCard = ({ plan }: { plan: RemediationPlan }) => {
    const totalTasks = plan.tasks.length;
    const completedTasks = plan.tasks.filter(t => t.status === 'completed' || t.status === 'verified').length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Remediation Plan #{plan.id.slice(-4)}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Audit: {plan.auditId}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plan.status)}`}>
              {plan.status.replace('_', ' ')}
            </span>
            {plan.verificationRequired && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Verification Required
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-600">Assigned To</p>
            <p className="text-sm font-medium">{plan.assignedTo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Start Date</p>
            <p className="text-sm font-medium">
              {new Date(plan.timeline.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Target Completion</p>
            <p className="text-sm font-medium">
              {new Date(plan.timeline.targetCompletionDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Progress</p>
            <p className="text-sm font-medium">{completedTasks}/{totalTasks} tasks</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          {plan.tasks.slice(0, 3).map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-1 rounded ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-600">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>

        {plan.tasks.length > 3 && (
          <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700">
            View all {plan.tasks.length} tasks
          </button>
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {plan.status === 'pending_approval' && userRole === 'admin' && (
              <button className="flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                <Check className="w-4 h-4 mr-1" />
                Approve
              </button>
            )}
            <button 
              onClick={() => setSelectedPlan(plan)}
              className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit Plan
            </button>
          </div>
          <button 
            onClick={() => setShowTaskModal(true)}
            className="flex items-center px-3 py-1.5 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </button>
        </div>
      </div>
    );
  };

  const TaskDetailModal = () => {
    if (!selectedTask) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h2>
              <button 
                onClick={() => setSelectedTask(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-900">{selectedTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <select
                  value={selectedTask.status}
                  onChange={(e) => {
                    if (selectedPlan) {
                      handleUpdateTaskStatus(selectedPlan.id, selectedTask.id, e.target.value as TaskStatus);
                    }
                  }}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="completed">Completed</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority</p>
                <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-medium">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned To</p>
                <p className="font-medium">{selectedTask.assignedTo}</p>
              </div>
            </div>

            {selectedTask.estimatedHours && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Estimated Hours</p>
                  <p className="font-medium">{selectedTask.estimatedHours}h</p>
                </div>
                {selectedTask.actualHours && (
                  <div>
                    <p className="text-sm text-gray-600">Actual Hours</p>
                    <p className="font-medium">{selectedTask.actualHours}h</p>
                  </div>
                )}
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Comments & Updates</h3>
              <div className="space-y-3 mb-4">
                {(selectedTask.comments || []).map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{comment.userName}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && selectedPlan) {
                      const input = e.target as HTMLInputElement;
                      handleAddComment(selectedPlan.id, selectedTask.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              onClick={() => setSelectedTask(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Remediation Management</h1>
          <p className="text-gray-600 mt-1">Track and manage audit finding remediations</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          {(userRole === 'admin' || userRole === 'compliance_manager') && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search remediation tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {(['active', 'pending', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                activeTab === tab 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredPlans.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No remediation plans found</h3>
          <p className="text-gray-600">
            {searchQuery || filterPriority !== 'all' 
              ? 'Try adjusting your search or filters' 
              : `No ${activeTab} remediation plans`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPlans.map((plan) => (
            <RemediationPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

      {selectedTask && <TaskDetailModal />}
    </div>
  );
};

export default RemediationManagement;