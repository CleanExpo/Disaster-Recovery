/**
 * Algolia Search Analytics
 *
 * Tracks search behavior for insights and optimization
 * Includes click tracking, conversion tracking, and A/B testing
 */

import { getAlgoliaSearchClient } from './client';
import type { SearchAnalyticsEvent } from './types';

/**
 * Track search click (user clicked on a result)
 */
export async function trackSearchClick({
  query,
  index,
  objectID,
  position,
  queryID,
  userId,
  sessionId,
}: Omit<SearchAnalyticsEvent, 'timestamp' | 'resultType'>) {
  try {
    const event: SearchAnalyticsEvent = {
      query,
      index,
      objectID,
      position,
      queryID,
      timestamp: Date.now(),
      userId,
      sessionId,
      resultType: 'click',
    };

    // Send to Algolia Insights API
    if (typeof window !== 'undefined' && window.aa) {
      window.aa('clickedObjectIDsAfterSearch', {
        index,
        eventName: 'Search Result Clicked',
        queryID,
        objectIDs: [objectID!],
        positions: [position!],
        userToken: userId || sessionId,
      });
    }

    // Send to internal analytics (optional)
    await sendToInternalAnalytics(event);

    console.log('[Analytics] Search click tracked:', event);
  } catch (error) {
    console.error('[Analytics] Failed to track search click:', error);
  }
}

/**
 * Track search conversion (user performed desired action)
 */
export async function trackSearchConversion({
  query,
  index,
  objectID,
  queryID,
  userId,
  sessionId,
}: Omit<SearchAnalyticsEvent, 'timestamp' | 'resultType' | 'position'>) {
  try {
    const event: SearchAnalyticsEvent = {
      query,
      index,
      objectID,
      queryID,
      timestamp: Date.now(),
      userId,
      sessionId,
      resultType: 'conversion',
    };

    // Send to Algolia Insights API
    if (typeof window !== 'undefined' && window.aa) {
      window.aa('convertedObjectIDsAfterSearch', {
        index,
        eventName: 'Search Result Conversion',
        queryID,
        objectIDs: [objectID!],
        userToken: userId || sessionId,
      });
    }

    // Send to internal analytics (optional)
    await sendToInternalAnalytics(event);

    console.log('[Analytics] Search conversion tracked:', event);
  } catch (error) {
    console.error('[Analytics] Failed to track search conversion:', error);
  }
}

/**
 * Track search view (result was viewed but not clicked)
 */
export async function trackSearchView({
  query,
  index,
  objectID,
  queryID,
  userId,
  sessionId,
}: Omit<SearchAnalyticsEvent, 'timestamp' | 'resultType' | 'position'>) {
  try {
    const event: SearchAnalyticsEvent = {
      query,
      index,
      objectID,
      queryID,
      timestamp: Date.now(),
      userId,
      sessionId,
      resultType: 'view',
    };

    // Send to Algolia Insights API
    if (typeof window !== 'undefined' && window.aa) {
      window.aa('viewedObjectIDs', {
        index,
        eventName: 'Search Result Viewed',
        objectIDs: [objectID!],
        userToken: userId || sessionId,
      });
    }

    // Send to internal analytics (optional)
    await sendToInternalAnalytics(event);
  } catch (error) {
    console.error('[Analytics] Failed to track search view:', error);
  }
}

/**
 * Send analytics event to internal API
 */
async function sendToInternalAnalytics(event: SearchAnalyticsEvent) {
  try {
    await fetch('/api/analytics/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  } catch (error) {
    // Fail silently - analytics shouldn't break user experience
    console.error('[Analytics] Failed to send to internal API:', error);
  }
}

/**
 * Get search analytics insights
 */
export async function getSearchAnalytics({
  startDate,
  endDate,
  index,
}: {
  startDate: Date;
  endDate: Date;
  index?: string;
}) {
  try {
    const response = await fetch(
      `/api/analytics/search?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}${
        index ? `&index=${index}` : ''
      }`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }

    return await response.json();
  } catch (error) {
    console.error('[Analytics] Failed to fetch analytics:', error);
    return null;
  }
}

/**
 * Initialize Algolia Insights (call in _app or layout)
 */
export function initializeAlgoliaInsights() {
  if (typeof window !== 'undefined') {
    // Load Algolia Insights library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/search-insights@2.6.0';
    script.async = true;
    script.onload = () => {
      if (window.aa) {
        const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
        const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

        if (appId && apiKey) {
          window.aa('init', {
            appId,
            apiKey,
            useCookie: true,
          });
          console.log('[Analytics] Algolia Insights initialized');
        }
      }
    };
    document.head.appendChild(script);
  }
}

// Type augmentation for window.aa
declare global {
  interface Window {
    aa?: any;
  }
}

/**
 * Hook for tracking search interactions
 */
export function useSearchAnalytics() {
  const [sessionId] = React.useState(() => {
    if (typeof window !== 'undefined') {
      let id = sessionStorage.getItem('search-session-id');
      if (!id) {
        id = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('search-session-id', id);
      }
      return id;
    }
    return undefined;
  });

  const trackClick = React.useCallback(
    (params: Omit<Parameters<typeof trackSearchClick>[0], 'sessionId'>) => {
      return trackSearchClick({ ...params, sessionId });
    },
    [sessionId]
  );

  const trackConversion = React.useCallback(
    (params: Omit<Parameters<typeof trackSearchConversion>[0], 'sessionId'>) => {
      return trackSearchConversion({ ...params, sessionId });
    },
    [sessionId]
  );

  const trackView = React.useCallback(
    (params: Omit<Parameters<typeof trackSearchView>[0], 'sessionId'>) => {
      return trackSearchView({ ...params, sessionId });
    },
    [sessionId]
  );

  return {
    trackClick,
    trackConversion,
    trackView,
    sessionId,
  };
}

// React import for hook
import React from 'react';
