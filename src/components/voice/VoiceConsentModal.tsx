'use client';

/**
 * APP 8 cross-border-disclosure consent gate for in-browser voice
 * widgets (ElevenLabs convai). Mirrors the canonical wording in
 * `.claude/rules/compliance.md §3` and `src/lib/voice/consent-utterance.ts`.
 *
 * The widget script is NOT loaded until the user clicks "Yes, continue".
 * Decline / close → modal returns null and the parent renders a
 * non-AI fallback (link to the form, phone number, etc.).
 *
 * On consent grant, POSTs a `voice_widget_consent_given` event to
 * `/api/voice/widget-consent` for the 7-year audit ledger.
 *
 * Style: matches existing Antigravity modal pattern — Tailwind only,
 * no Radix dependency to keep the consent surface portable.
 */

import { useEffect, useState } from 'react';
import { CONSENT_UTTERANCE, CONSENT_UTTERANCE_VERSION } from '@/lib/voice/consent-utterance';

export interface VoiceConsentModalProps {
  /** Which agent the user is about to talk to. Used in compliance log only. */
  agent: 'olivia' | 'sarah';
  /** Called when consent is granted. Parent should then mount the widget. */
  onConsent: () => void;
  /** Called when the user declines or closes the modal. */
  onDecline: () => void;
}

export function VoiceConsentModal({ agent, onConsent, onDecline }: VoiceConsentModalProps) {
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Esc key declines (treats as opt-out, not "OK to continue").
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDecline();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDecline]);

  async function grant() {
    if (submitting) return;
    setSubmitting(true);
    try {
      // Best-effort log — never block consent on logging failure.
      await fetch('/api/voice/widget-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent,
          consentVersion: CONSENT_UTTERANCE_VERSION,
          surface: 'web_widget',
        }),
      }).catch(() => {});
    } finally {
      onConsent();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-consent-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-4"
    >
      <div className="relative max-w-lg rounded-2xl bg-slate-900 p-6 text-slate-100 shadow-2xl ring-1 ring-white/10 sm:p-8">
        <h2 id="voice-consent-title" className="mb-4 text-xl font-semibold text-white">
          Before we connect you to our AI assistant
        </h2>

        <p className="mb-4 text-sm leading-relaxed text-slate-200">{CONSENT_UTTERANCE}</p>

        <p className="mb-6 text-xs text-slate-400">
          By continuing you agree to the disclosure above. You can read the full Privacy Policy at{' '}
          <a
            href="/privacy"
            className="underline hover:text-blue-300"
            target="_blank"
            rel="noreferrer"
          >
            disasterrecovery.com.au/privacy
          </a>
          . Consent version{' '}
          <code className="rounded bg-slate-800 px-1 py-0.5 text-[10px]">
            {CONSENT_UTTERANCE_VERSION}
          </code>
          .
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onDecline}
            className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            No, take me to the form instead
          </button>
          <button
            type="button"
            onClick={grant}
            disabled={submitting}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-400 disabled:opacity-60"
          >
            {submitting ? 'Connecting…' : 'Yes, OK to continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
