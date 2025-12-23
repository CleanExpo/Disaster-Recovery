/**
 * Export Service
 *
 * Export analytics data in multiple formats
 */

import { AnalyticsMetrics, DailyStats } from './analytics-engine';

export type ExportFormat = 'json' | 'csv' | 'tsv' | 'html';

/**
 * Export Service - Handle data export operations
 */
export class ExportService {
  /**
   * Export metrics to JSON format
   */
  static exportToJSON(data: any, filename: string): void {
    const json = JSON.stringify(data, null, 2);
    this.downloadFile(json, filename, 'application/json');
  }

  /**
   * Export metrics to CSV format
   */
  static exportToCSV(data: Record<string, any>, filename: string): void {
    const csv = this.convertToCSV(data);
    this.downloadFile(csv, filename, 'text/csv');
  }

  /**
   * Export metrics to TSV format
   */
  static exportToTSV(data: Record<string, any>, filename: string): void {
    const tsv = this.convertToTSV(data);
    this.downloadFile(tsv, filename, 'text/tab-separated-values');
  }

  /**
   * Export metrics to HTML format
   */
  static exportToHTML(data: Record<string, any>, title: string, filename: string): void {
    const html = this.convertToHTML(data, title);
    this.downloadFile(html, filename, 'text/html');
  }

  /**
   * Export report with summary
   */
  static exportReport(reportData: any, format: ExportFormat, filename: string): void {
    switch (format) {
      case 'json':
        this.exportToJSON(reportData, filename);
        break;
      case 'csv':
        this.exportToCSV(reportData, filename);
        break;
      case 'tsv':
        this.exportToTSV(reportData, filename);
        break;
      case 'html':
        this.exportToHTML(reportData, 'Analytics Report', filename);
        break;
    }
  }

  /**
   * Convert data to CSV
   */
  private static convertToCSV(data: Record<string, any>): string {
    const lines: string[] = [];

    // Handle different data structures
    if (data.dailyStats) {
      lines.push('Date,TotalEvents,ActiveUsers,MessagesSent,CallsDuration,FilesUploaded,FilesDownloaded,SearchQueries');

      Object.entries(data.dailyStats).forEach(([date, stats]: [string, any]) => {
        lines.push(
          `${date},${stats.totalEvents},${stats.activeUsers},${stats.messagesSent},${stats.callsDuration},${stats.filesUploaded},${stats.filesDownloaded},${stats.searchQueries}`
        );
      });
    } else if (data.eventsByType) {
      lines.push('EventType,Count');

      Object.entries(data.eventsByType).forEach(([type, count]) => {
        lines.push(`"${type}",${count}`);
      });
    } else if (Array.isArray(data)) {
      // Handle array of objects
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        lines.push(headers.map((h) => `"${h}"`).join(','));

        data.forEach((row) => {
          const values = headers.map((h) => {
            const value = row[h];
            if (typeof value === 'string') {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          });
          lines.push(values.join(','));
        });
      }
    } else {
      // Flatten object
      lines.push('Key,Value');
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value !== 'object') {
          lines.push(`"${key}","${value}"`);
        }
      });
    }

    return lines.join('\n');
  }

  /**
   * Convert data to TSV
   */
  private static convertToTSV(data: Record<string, any>): string {
    const csv = this.convertToCSV(data);
    return csv.replace(/,/g, '\t');
  }

  /**
   * Convert data to HTML
   */
  private static convertToHTML(data: Record<string, any>, title: string): string {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; }
    h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
    h2 { color: #555; margin-top: 30px; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background-color: #007bff; color: white; padding: 12px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    tr:hover { background-color: #f9f9f9; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
    .summary-card { background-color: #f0f0f0; padding: 15px; border-radius: 5px; }
    .summary-card p { margin: 5px 0; }
    .summary-card .value { font-size: 24px; font-weight: bold; color: #007bff; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>Generated on: ${new Date().toLocaleString()}</p>

    ${this.generateHTMLContent(data)}

    <div class="footer">
      <p>This report was automatically generated by the Analytics System.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    return html;
  }

  /**
   * Generate HTML content from data
   */
  private static generateHTMLContent(data: Record<string, any>): string {
    let content = '';

    if (data.dailyStats) {
      content += '<h2>Daily Statistics</h2>';
      content += '<table><tr><th>Date</th><th>Total Events</th><th>Active Users</th><th>Messages</th><th>Call Duration</th></tr>';

      Object.entries(data.dailyStats).forEach(([date, stats]: [string, any]) => {
        content += `<tr><td>${date}</td><td>${stats.totalEvents}</td><td>${stats.activeUsers}</td><td>${stats.messagesSent}</td><td>${stats.callsDuration}</td></tr>`;
      });

      content += '</table>';
    }

    if (data.eventsByType) {
      content += '<h2>Event Distribution</h2>';
      content += '<table><tr><th>Event Type</th><th>Count</th></tr>';

      Object.entries(data.eventsByType).forEach(([type, count]) => {
        content += `<tr><td>${type}</td><td>${count}</td></tr>`;
      });

      content += '</table>';
    }

    if (data.topActivities) {
      content += '<h2>Top Activities</h2>';
      content += '<div class="summary">';

      data.topActivities.forEach((activity: any) => {
        content += `
<div class="summary-card">
  <p>${activity.activity}</p>
  <p class="value">${activity.count}</p>
  <p>${activity.percentage.toFixed(1)}% of total</p>
</div>
        `;
      });

      content += '</div>';
    }

    return content;
  }

  /**
   * Download file
   */
  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  /**
   * Generate filename with timestamp
   */
  static generateFilename(prefix: string, format: ExportFormat): string {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const extensionMap: Record<ExportFormat, string> = {
      json: 'json',
      csv: 'csv',
      tsv: 'tsv',
      html: 'html',
    };
    return `${prefix}-${timestamp}.${extensionMap[format]}`;
  }

  /**
   * Create summary statistics
   */
  static generateSummary(metrics: AnalyticsMetrics): Record<string, any> {
    const totalEvents = metrics.totalEvents;

    return {
      summary: {
        totalEvents,
        totalUsers: metrics.uniqueUsers.size,
        eventTypes: Object.keys(metrics.eventsByType).length,
      },
      topEvents: Object.entries(metrics.eventsByType)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([type, count]) => ({
          type,
          count,
          percentage: ((count / totalEvents) * 100).toFixed(2),
        })),
      peakHours: Object.entries(metrics.peakHours)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([hour, traffic]) => ({
          hour: `${hour}:00`,
          traffic,
        })),
      sessionStats: {
        avgDuration: Math.round(metrics.sessionDuration.avg / 1000),
        minDuration: Math.round(metrics.sessionDuration.min / 1000),
        maxDuration: Math.round(metrics.sessionDuration.max / 1000),
      },
    };
  }
}
