'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * useDashboards Hook
 *
 * Manage custom dashboards
 */
export function useDashboards(userId: string | null, type: 'owned' | 'shared' | 'public' = 'owned') {
  const [dashboards, setDashboards] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboards = useCallback(async () => {
    if (!userId && type !== 'public') return;

    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      params.append('type', type);

      const response = await fetch(`/api/dashboards?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch dashboards');
      }

      const data = await response.json();
      setDashboards(data.dashboards);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch dashboards';
      setError(message);
      console.error('Fetch dashboards error:', message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, type]);

  const createDashboard = useCallback(
    async (name: string, description: string, layout: 'grid' | 'flow' = 'grid') => {
      if (!userId) return null;

      try {
        const response = await fetch('/api/dashboards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, owner: userId, layout }),
        });

        if (!response.ok) {
          throw new Error('Failed to create dashboard');
        }

        const data = await response.json();
        await fetchDashboards(); // Refresh list
        return data.dashboard;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create dashboard';
        console.error('Create dashboard error:', message);
        return null;
      }
    },
    [userId, fetchDashboards]
  );

  const deleteDashboard = useCallback(
    async (dashboardId: string) => {
      try {
        const response = await fetch(`/api/dashboards/${dashboardId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete dashboard');
        }

        await fetchDashboards(); // Refresh list
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete dashboard';
        console.error('Delete dashboard error:', message);
        return false;
      }
    },
    [fetchDashboards]
  );

  useEffect(() => {
    fetchDashboards();
  }, [userId, type, fetchDashboards]);

  return {
    dashboards,
    isLoading,
    error,
    fetchDashboards,
    createDashboard,
    deleteDashboard,
  };
}

/**
 * useDashboard Hook
 *
 * Get and manage a specific dashboard
 */
export function useDashboard(dashboardId: string | null) {
  const [dashboard, setDashboard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!dashboardId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/dashboards/${dashboardId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard');
      }

      const data = await response.json();
      setDashboard(data.dashboard);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch dashboard';
      setError(message);
      console.error('Fetch dashboard error:', message);
    } finally {
      setIsLoading(false);
    }
  }, [dashboardId]);

  const updateDashboard = useCallback(
    async (updates: any) => {
      if (!dashboardId) return null;

      try {
        const response = await fetch(`/api/dashboards/${dashboardId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          throw new Error('Failed to update dashboard');
        }

        const data = await response.json();
        setDashboard(data.dashboard);
        return data.dashboard;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update dashboard';
        console.error('Update dashboard error:', message);
        return null;
      }
    },
    [dashboardId]
  );

  useEffect(() => {
    fetchDashboard();
  }, [dashboardId, fetchDashboard]);

  return {
    dashboard,
    isLoading,
    error,
    fetchDashboard,
    updateDashboard,
  };
}

/**
 * useReportSchedules Hook
 *
 * Manage report schedules
 */
export function useReportSchedules(dashboardId: string | null) {
  const [schedules, setSchedules] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    if (!dashboardId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/reports/schedules?dashboardId=${dashboardId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }

      const data = await response.json();
      setSchedules(data.schedules);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch schedules';
      setError(message);
      console.error('Fetch schedules error:', message);
    } finally {
      setIsLoading(false);
    }
  }, [dashboardId]);

  const createSchedule = useCallback(
    async (name: string, frequency: string, recipients: string[], format: string, createdBy: string) => {
      if (!dashboardId) return null;

      try {
        const response = await fetch('/api/reports/schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dashboardId, name, frequency, recipients, format, createdBy }),
        });

        if (!response.ok) {
          throw new Error('Failed to create schedule');
        }

        const data = await response.json();
        await fetchSchedules(); // Refresh list
        return data.schedule;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create schedule';
        console.error('Create schedule error:', message);
        return null;
      }
    },
    [dashboardId, fetchSchedules]
  );

  useEffect(() => {
    fetchSchedules();
  }, [dashboardId, fetchSchedules]);

  return {
    schedules,
    isLoading,
    error,
    fetchSchedules,
    createSchedule,
  };
}
