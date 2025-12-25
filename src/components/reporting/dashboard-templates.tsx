'use client';

import { useState } from 'react';

interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  widgets: Array<{
    type: string;
    title: string;
    size: string;
    dataSource: string;
  }>;
  previewUrl?: string;
}

interface DashboardTemplatesProps {
  onTemplateSelect?: (template: DashboardTemplate) => void;
}

/**
 * Dashboard Templates Component
 *
 * Pre-configured dashboard templates for quick setup
 */
export function DashboardTemplates({ onTemplateSelect }: DashboardTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: DashboardTemplate[] = [
    {
      id: 'sales_dashboard',
      name: 'Sales Performance',
      description: 'Track sales metrics, revenue, and team performance',
      category: 'sales',
      icon: '📊',
      widgets: [
        { type: 'metric', title: 'Total Revenue', size: 'small', dataSource: 'sales.revenue' },
        { type: 'metric', title: 'Total Orders', size: 'small', dataSource: 'sales.orders' },
        { type: 'metric', title: 'Conversion Rate', size: 'small', dataSource: 'sales.conversionRate' },
        { type: 'chart', title: 'Revenue Trend', size: 'large', dataSource: 'sales.trend' },
        { type: 'table', title: 'Top Products', size: 'medium', dataSource: 'sales.topProducts' },
        { type: 'gauge', title: 'Target Progress', size: 'small', dataSource: 'sales.targetProgress' },
      ],
    },
    {
      id: 'analytics_dashboard',
      name: 'User Analytics',
      description: 'Monitor user behavior, engagement, and growth metrics',
      category: 'analytics',
      icon: '📈',
      widgets: [
        { type: 'metric', title: 'Active Users', size: 'small', dataSource: 'users.activeCount' },
        { type: 'metric', title: 'New Users', size: 'small', dataSource: 'users.newCount' },
        { type: 'metric', title: 'Retention Rate', size: 'small', dataSource: 'users.retention' },
        { type: 'chart', title: 'User Growth', size: 'large', dataSource: 'users.growth' },
        { type: 'heatmap', title: 'Activity Heatmap', size: 'large', dataSource: 'users.heatmap' },
        { type: 'timeline', title: 'User Events', size: 'medium', dataSource: 'users.timeline' },
      ],
    },
    {
      id: 'operations_dashboard',
      name: 'Operations',
      description: 'Monitor system health, uptime, and performance',
      category: 'operations',
      icon: '⚙️',
      widgets: [
        { type: 'metric', title: 'System Uptime', size: 'small', dataSource: 'system.uptime' },
        { type: 'metric', title: 'Avg Response Time', size: 'small', dataSource: 'system.responseTime' },
        { type: 'metric', title: 'Error Rate', size: 'small', dataSource: 'system.errorRate' },
        { type: 'chart', title: 'Server Load', size: 'large', dataSource: 'system.load' },
        { type: 'gauge', title: 'CPU Usage', size: 'small', dataSource: 'system.cpu' },
        { type: 'gauge', title: 'Memory Usage', size: 'small', dataSource: 'system.memory' },
      ],
    },
    {
      id: 'marketing_dashboard',
      name: 'Marketing',
      description: 'Campaign performance, lead generation, and ROI tracking',
      category: 'marketing',
      icon: '📢',
      widgets: [
        { type: 'metric', title: 'Campaign Reach', size: 'small', dataSource: 'marketing.reach' },
        { type: 'metric', title: 'Leads Generated', size: 'small', dataSource: 'marketing.leads' },
        { type: 'metric', title: 'ROI', size: 'small', dataSource: 'marketing.roi' },
        { type: 'chart', title: 'Campaign Performance', size: 'large', dataSource: 'marketing.campaigns' },
        { type: 'table', title: 'Top Channels', size: 'medium', dataSource: 'marketing.channels' },
        { type: 'gauge', title: 'Budget Utilization', size: 'small', dataSource: 'marketing.budget' },
      ],
    },
    {
      id: 'team_dashboard',
      name: 'Team Collaboration',
      description: 'Track team activity, communication, and collaboration metrics',
      category: 'team',
      icon: '👥',
      widgets: [
        { type: 'metric', title: 'Total Messages', size: 'small', dataSource: 'team.messages' },
        { type: 'metric', title: 'Active Rooms', size: 'small', dataSource: 'team.activeRooms' },
        { type: 'metric', title: 'Team Members', size: 'small', dataSource: 'team.members' },
        { type: 'chart', title: 'Activity Timeline', size: 'large', dataSource: 'team.timeline' },
        { type: 'table', title: 'Team Members', size: 'medium', dataSource: 'team.memberStats' },
        { type: 'heatmap', title: 'Communication Pattern', size: 'large', dataSource: 'team.pattern' },
      ],
    },
    {
      id: 'financial_dashboard',
      name: 'Financial',
      description: 'Expenses, budget tracking, and financial metrics',
      category: 'financial',
      icon: '💰',
      widgets: [
        { type: 'metric', title: 'Total Expenses', size: 'small', dataSource: 'financial.expenses' },
        { type: 'metric', title: 'Budget Remaining', size: 'small', dataSource: 'financial.remaining' },
        { type: 'metric', title: 'Burn Rate', size: 'small', dataSource: 'financial.burnRate' },
        { type: 'chart', title: 'Spending Trend', size: 'large', dataSource: 'financial.trend' },
        { type: 'table', title: 'Recent Transactions', size: 'medium', dataSource: 'financial.transactions' },
        { type: 'gauge', title: 'Budget Status', size: 'small', dataSource: 'financial.status' },
      ],
    },
  ];

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleSelectTemplate = (template: DashboardTemplate) => {
    setSelectedTemplate(selectedTemplate === template.id ? null : template.id);
    onTemplateSelect?.(template);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">📋 Dashboard Templates</h2>
        <p className="text-gray-600 mt-1">Choose a pre-configured template to get started quickly</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category === 'all' ? 'All Templates' : category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer border-2 ${
              selectedTemplate === template.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-transparent'
            }`}
          >
            {/* Template Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <p className="text-3xl">{template.icon}</p>
                {selectedTemplate === template.id && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                    SELECTED
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>

            {/* Template Preview */}
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Includes {template.widgets.length} widgets:</p>

              <div className="space-y-2">
                {template.widgets.map((widget, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>{widget.title}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {widget.size === 'small' ? '1x1' : widget.size === 'medium' ? '2x1' : '2x2'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={() => handleSelectTemplate(template)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedTemplate === template.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {selectedTemplate === template.id ? '✓ Selected' : 'Select'}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Could show preview or more details
                }}
                className="px-3 py-2 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Info */}
      {selectedTemplate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ✓ Template selected. You can now create a new dashboard using this template or customize it further.
          </p>
        </div>
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg mb-2">No templates found</p>
          <p className="text-gray-500">Try a different category</p>
        </div>
      )}
    </div>
  );
}
