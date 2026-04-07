/**
 * Unite-Group Analytics & Reporting
 * DR-284: Push events; report-fetch helpers for dashboards
 */

import { getUniteGroupClient } from './client';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp?: string;
}

interface Report {
  id: string;
  name: string;
  data: Record<string, unknown>[];
  generatedAt: string;
}

export async function trackEvent(event: AnalyticsEvent) {
  const client = getUniteGroupClient();
  return client.post('/analytics/events', {
    ...event,
    timestamp: event.timestamp || new Date().toISOString(),
  });
}

export async function trackEvents(events: AnalyticsEvent[]) {
  const client = getUniteGroupClient();
  return client.post('/analytics/events/batch', { events });
}

export async function getReport(reportId: string, params?: Record<string, string>) {
  const client = getUniteGroupClient();
  return client.get<Report>(`/analytics/reports/${reportId}`, params);
}

export async function getDashboardSummary(dateRange?: { from: string; to: string }) {
  const client = getUniteGroupClient();
  const params: Record<string, string> = {};
  if (dateRange) {
    params.from = dateRange.from;
    params.to = dateRange.to;
  }
  return client.get<Record<string, unknown>>('/analytics/dashboard', params);
}
