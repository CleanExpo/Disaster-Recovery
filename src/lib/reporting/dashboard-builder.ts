/**
 * Dashboard Builder
 *
 * Create and manage custom dashboards with flexible components
 */

export type WidgetType =
  | 'metric'
  | 'chart'
  | 'table'
  | 'gauge'
  | 'timeline'
  | 'heatmap'
  | 'list'
  | 'map';

export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'scatter';

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  description?: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: {
    dataSource: string;
    metric?: string;
    chartType?: ChartType;
    refreshInterval?: number;
    filters?: Record<string, any>;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
  };
}

export interface CustomDashboard {
  id: string;
  name: string;
  description: string;
  owner: string;
  widgets: DashboardWidget[];
  layout: 'grid' | 'flow';
  theme: 'light' | 'dark';
  isPublic: boolean;
  sharedWith: string[];
  tags: string[];
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    lastViewedAt: Date;
    viewCount: number;
  };
}

export interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  widgets: DashboardWidget[];
  preview?: string;
  isPublic: boolean;
}

export interface ReportSchedule {
  id: string;
  dashboardId: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
  recipients: string[];
  format: 'pdf' | 'email' | 'slack' | 'webhook';
  config: {
    time?: string; // HH:MM for daily/weekly/monthly
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
    webhookUrl?: string;
  };
  isActive: boolean;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    lastRunAt?: Date;
    nextRunAt?: Date;
  };
}

/**
 * Dashboard Builder - Create and manage custom dashboards
 */
export class DashboardBuilder {
  private dashboards: Map<string, CustomDashboard> = new Map();
  private templates: Map<string, DashboardTemplate> = new Map();
  private schedules: Map<string, ReportSchedule> = new Map();

  /**
   * Create new dashboard
   */
  createDashboard(
    name: string,
    description: string,
    owner: string,
    layout: 'grid' | 'flow' = 'grid'
  ): CustomDashboard {
    const dashboard: CustomDashboard = {
      id: `dashboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      owner,
      widgets: [],
      layout,
      theme: 'light',
      isPublic: false,
      sharedWith: [],
      tags: [],
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        lastViewedAt: new Date(),
        viewCount: 0,
      },
    };

    this.dashboards.set(dashboard.id, dashboard);
    return dashboard;
  }

  /**
   * Add widget to dashboard
   */
  addWidget(
    dashboardId: string,
    widget: Omit<DashboardWidget, 'id' | 'metadata'>
  ): DashboardWidget | null {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) return null;

    const newWidget: DashboardWidget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: dashboard.owner,
      },
    };

    dashboard.widgets.push(newWidget);
    dashboard.metadata.updatedAt = new Date();

    return newWidget;
  }

  /**
   * Remove widget from dashboard
   */
  removeWidget(dashboardId: string, widgetId: string): boolean {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) return false;

    const initialLength = dashboard.widgets.length;
    dashboard.widgets = dashboard.widgets.filter((w) => w.id !== widgetId);
    dashboard.metadata.updatedAt = new Date();

    return dashboard.widgets.length < initialLength;
  }

  /**
   * Update widget
   */
  updateWidget(dashboardId: string, widgetId: string, updates: Partial<DashboardWidget>): DashboardWidget | null {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) return null;

    const widget = dashboard.widgets.find((w) => w.id === widgetId);
    if (!widget) return null;

    Object.assign(widget, updates);
    widget.metadata.updatedAt = new Date();
    dashboard.metadata.updatedAt = new Date();

    return widget;
  }

  /**
   * Reorder widgets
   */
  reorderWidgets(dashboardId: string, widgetIds: string[]): boolean {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) return false;

    const reorderedWidgets = widgetIds
      .map((id) => dashboard.widgets.find((w) => w.id === id))
      .filter((w) => w !== undefined) as DashboardWidget[];

    if (reorderedWidgets.length !== dashboard.widgets.length) return false;

    dashboard.widgets = reorderedWidgets;
    dashboard.metadata.updatedAt = new Date();
    return true;
  }

  /**
   * Clone dashboard
   */
  cloneDashboard(dashboardId: string, newOwner: string, newName: string): CustomDashboard | null {
    const original = this.dashboards.get(dashboardId);
    if (!original) return null;

    const cloned: CustomDashboard = {
      id: `dashboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newName,
      description: original.description,
      owner: newOwner,
      widgets: original.widgets.map((w) => ({
        ...w,
        id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: newOwner,
        },
      })),
      layout: original.layout,
      theme: original.theme,
      isPublic: false,
      sharedWith: [],
      tags: original.tags,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        lastViewedAt: new Date(),
        viewCount: 0,
      },
    };

    this.dashboards.set(cloned.id, cloned);
    return cloned;
  }

  /**
   * Share dashboard
   */
  shareDashboard(dashboardId: string, userIds: string[]): boolean {
    const dashboard = this.dashboards.get(dashboardId);
    if (!dashboard) return false;

    dashboard.sharedWith = [...new Set([...dashboard.sharedWith, ...userIds])];
    dashboard.metadata.updatedAt = new Date();

    return true;
  }

  /**
   * Create from template
   */
  createFromTemplate(templateId: string, owner: string, name: string): CustomDashboard | null {
    const template = this.templates.get(templateId);
    if (!template) return null;

    const dashboard: CustomDashboard = {
      id: `dashboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: template.description,
      owner,
      widgets: template.widgets.map((w) => ({
        ...w,
        id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: owner,
        },
      })),
      layout: 'grid',
      theme: 'light',
      isPublic: false,
      sharedWith: [],
      tags: [template.category],
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        lastViewedAt: new Date(),
        viewCount: 0,
      },
    };

    this.dashboards.set(dashboard.id, dashboard);
    return dashboard;
  }

  /**
   * Create report schedule
   */
  createSchedule(
    dashboardId: string,
    name: string,
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom',
    recipients: string[],
    format: 'pdf' | 'email' | 'slack' | 'webhook'
  ): ReportSchedule {
    const schedule: ReportSchedule = {
      id: `schedule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dashboardId,
      name,
      frequency,
      recipients,
      format,
      config: {},
      isActive: true,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    this.schedules.set(schedule.id, schedule);
    return schedule;
  }

  /**
   * Update schedule
   */
  updateSchedule(scheduleId: string, updates: Partial<ReportSchedule>): ReportSchedule | null {
    const schedule = this.schedules.get(scheduleId);
    if (!schedule) return null;

    Object.assign(schedule, updates);
    schedule.metadata.updatedAt = new Date();

    return schedule;
  }

  /**
   * Delete schedule
   */
  deleteSchedule(scheduleId: string): boolean {
    return this.schedules.delete(scheduleId);
  }

  /**
   * Get dashboard
   */
  getDashboard(dashboardId: string): CustomDashboard | null {
    const dashboard = this.dashboards.get(dashboardId);
    if (dashboard) {
      dashboard.metadata.viewCount++;
      dashboard.metadata.lastViewedAt = new Date();
    }
    return dashboard || null;
  }

  /**
   * Get dashboards by owner
   */
  getDashboardsByOwner(owner: string): CustomDashboard[] {
    return Array.from(this.dashboards.values()).filter((d) => d.owner === owner);
  }

  /**
   * Get shared dashboards
   */
  getSharedDashboards(userId: string): CustomDashboard[] {
    return Array.from(this.dashboards.values()).filter((d) => d.sharedWith.includes(userId) || d.isPublic);
  }

  /**
   * Get public dashboards
   */
  getPublicDashboards(): CustomDashboard[] {
    return Array.from(this.dashboards.values()).filter((d) => d.isPublic);
  }

  /**
   * Delete dashboard
   */
  deleteDashboard(dashboardId: string): boolean {
    return this.dashboards.delete(dashboardId);
  }

  /**
   * Create template
   */
  createTemplate(
    name: string,
    description: string,
    category: string,
    widgets: DashboardWidget[]
  ): DashboardTemplate {
    const template: DashboardTemplate = {
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      category,
      widgets,
      isPublic: false,
    };

    this.templates.set(template.id, template);
    return template;
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: string): DashboardTemplate[] {
    return Array.from(this.templates.values()).filter((t) => t.category === category && t.isPublic);
  }

  /**
   * Get all templates
   */
  getAllTemplates(): DashboardTemplate[] {
    return Array.from(this.templates.values()).filter((t) => t.isPublic);
  }

  /**
   * Get schedules for dashboard
   */
  getSchedulesForDashboard(dashboardId: string): ReportSchedule[] {
    return Array.from(this.schedules.values()).filter((s) => s.dashboardId === dashboardId);
  }

  /**
   * Generate dashboard report
   */
  generateReport(
    dashboardId: string,
    format: 'pdf' | 'html' | 'json' = 'pdf'
  ): { success: boolean; data?: any; error?: string } {
    const dashboard = this.getDashboard(dashboardId);
    if (!dashboard) {
      return { success: false, error: 'Dashboard not found' };
    }

    const report = {
      dashboardName: dashboard.name,
      generatedAt: new Date(),
      widgets: dashboard.widgets.map((w) => ({
        id: w.id,
        title: w.title,
        type: w.type,
        config: w.config,
      })),
      metadata: dashboard.metadata,
    };

    if (format === 'json') {
      return { success: true, data: report };
    }

    if (format === 'html') {
      const html = this.generateHtmlReport(dashboard);
      return { success: true, data: html };
    }

    // PDF would require additional library
    return { success: true, data: report };
  }

  /**
   * Generate HTML report
   */
  private generateHtmlReport(dashboard: CustomDashboard): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${dashboard.name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
    h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
    .widget { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
    .widget h3 { margin-top: 0; color: #007bff; }
    .metadata { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${dashboard.name}</h1>
    <p>${dashboard.description}</p>

    <div class="widgets">
      ${dashboard.widgets.map((w) => `<div class="widget"><h3>${w.title}</h3><p>${w.description || ''}</p></div>`).join('')}
    </div>

    <div class="metadata">
      <p>Generated: ${new Date().toLocaleString()}</p>
      <p>Dashboard Owner: ${dashboard.owner}</p>
      <p>Total Widgets: ${dashboard.widgets.length}</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Export dashboard
   */
  exportDashboard(dashboardId: string): any | null {
    const dashboard = this.dashboards.get(dashboardId);
    return dashboard
      ? {
          ...dashboard,
          exportedAt: new Date(),
          version: '1.0',
        }
      : null;
  }

  /**
   * Import dashboard
   */
  importDashboard(data: any, newOwner: string): CustomDashboard | null {
    if (!data || !data.name) return null;

    return this.createDashboard(data.name, data.description || '', newOwner, data.layout || 'grid');
  }
}

// Export singleton instance
export const dashboardBuilder = new DashboardBuilder();
