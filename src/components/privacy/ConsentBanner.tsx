'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, Shield, BarChart3, Languages, Activity, Megaphone } from 'lucide-react';
import { updateConsentMode } from '@/lib/analytics/consent';

const CONSENT_KEY = 'dr-consent-preferences';
const CONSENT_VERSION = '2.0';

interface ConsentPreferences {
  version: string;
  timestamp: string;
  essential: boolean;
  analytics: boolean;
  aiTranslation: boolean;
  productExperience: boolean;
  marketing: boolean;
}

function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as ConsentPreferences;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(prefs: ConsentPreferences): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage unavailable
  }
  // Bridge to Google Consent Mode v2 so GTM-loaded tags respect the choice
  // without a page reload.
  updateConsentMode({
    analytics: prefs.analytics,
    productExperience: prefs.productExperience,
    marketing: prefs.marketing,
  });
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [aiTranslation, setAiTranslation] = useState(false);
  const [productExperience, setProductExperience] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const buildPrefs = useCallback(
    (values: {
      analytics: boolean;
      aiTranslation: boolean;
      productExperience: boolean;
      marketing: boolean;
    }): ConsentPreferences => ({
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: values.analytics,
      aiTranslation: values.aiTranslation,
      productExperience: values.productExperience,
      marketing: values.marketing,
    }),
    []
  );

  const handleAcceptAll = useCallback(() => {
    saveConsent(buildPrefs({ analytics: true, aiTranslation: true, productExperience: true, marketing: true }));
    setVisible(false);
  }, [buildPrefs]);

  const handleAcceptSelected = useCallback(() => {
    saveConsent(buildPrefs({ analytics, aiTranslation, productExperience, marketing }));
    setVisible(false);
  }, [analytics, aiTranslation, productExperience, marketing, buildPrefs]);

  const handleRejectOptional = useCallback(() => {
    saveConsent(buildPrefs({ analytics: false, aiTranslation: false, productExperience: false, marketing: false }));
    setVisible(false);
  }, [buildPrefs]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie and privacy consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
        {/* Compact view */}
        {!showDetails && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Necessary cookies are always on. Analytics, session recording, and marketing cookies are off by default and only turn on when you accept them.{' '}
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Manage preferences
                </button>
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectOptional}
                className="min-h-[44px] min-w-[44px] text-sm"
              >
                Reject optional
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="min-h-[44px] min-w-[44px] bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Accept all
              </Button>
            </div>
          </div>
        )}

        {/* Detailed view */}
        {showDetails && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Privacy Preferences
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-sm text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                aria-label="Close preferences"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* Essential - always on */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <Shield className="h-5 w-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Necessary</span>
                    <span className="text-xs text-green-600 font-medium">Always on</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Session, security, and load-balancing. Required for the site to function.</p>
                </div>
              </div>

              {/* Analytics */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750">
                <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Analytics</span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                      aria-label="Enable analytics cookies"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Google Analytics 4 and Tag Manager. Helps us understand which pages are useful.</p>
                </div>
              </label>

              {/* Product experience (Clarity) */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750">
                <Activity className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Product experience</span>
                    <input
                      type="checkbox"
                      checked={productExperience}
                      onChange={(e) => setProductExperience(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                      aria-label="Enable product experience recording"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Microsoft Clarity — anonymised session replays and heatmaps so we can improve the claim form.</p>
                </div>
              </label>

              {/* Marketing (Meta Pixel) */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750">
                <Megaphone className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Marketing</span>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                      aria-label="Enable marketing cookies"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Meta (Facebook) Pixel — used for ad retargeting if we run ads. Off unless you opt in.</p>
                </div>
              </label>

              {/* AI Translation */}
              <label className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750">
                <Languages className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">AI Translation</span>
                    <input
                      type="checkbox"
                      checked={aiTranslation}
                      onChange={(e) => setAiTranslation(e.target.checked)}
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                      aria-label="Enable AI translation"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Enables Gemma 4 AI translation for UI content in 23 languages. No personal information is sent.</p>
                </div>
              </label>
            </div>

            <div className="flex gap-2 justify-end flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectOptional}
                className="min-h-[44px] min-w-[44px] text-sm"
              >
                Reject optional
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptSelected}
                className="min-h-[44px] min-w-[44px] text-sm"
              >
                Save preferences
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="min-h-[44px] min-w-[44px] bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Accept all
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Utility to check consent status from anywhere in the app */
export function getConsentStatus(): ConsentPreferences | null {
  return getStoredConsent();
}

/** Check if a specific consent type is granted */
export function hasConsent(
  type: 'analytics' | 'aiTranslation' | 'productExperience' | 'marketing'
): boolean {
  const prefs = getStoredConsent();
  if (!prefs) return false;
  return prefs[type] === true;
}
