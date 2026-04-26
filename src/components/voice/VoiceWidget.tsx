'use client';

/**
 * ElevenLabs convai widget loader. Loads the EL widget script lazily
 * AFTER the APP 8 consent modal has been granted, so users who decline
 * never trigger the widget script download.
 *
 * Two surfaces:
 *   - <VoiceWidget agent="olivia" /> → contractor onboarding (Olivia)
 *   - <VoiceWidget agent="sarah" />  → claims intake (Sarah/Tannika)
 *
 * Agent IDs come from `src/lib/voice/agents-registry.ts` — agent IDs
 * are PUBLIC-safe (they identify the conversational agent on EL's
 * platform, not a credential). Per privacy.md §2, what is SECRET is
 * the API key + webhook signing secret — neither is exposed here.
 *
 * Behaviour:
 *   - Renders a "Talk to <agent>" button.
 *   - On click → mounts <VoiceConsentModal />.
 *   - On consent → injects <script src="https://unpkg.com/@elevenlabs/convai-widget-embed">
 *     once, then renders the <elevenlabs-convai> custom element.
 *   - On decline → resets state; user can click again or use the
 *     fallback link.
 *
 * Feature flag: respects FEATURE_FLAGS.VOICE_WIDGET. When off, this
 * component returns null (zero impact on bundle / network).
 */

import Script from 'next/script';
import { createElement, useState } from 'react';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { SARAH, OLIVIA } from '@/lib/voice/agents-registry';
import { VoiceConsentModal } from './VoiceConsentModal';

// React doesn't know about the EL custom element. We render it via
// React.createElement to avoid needing a JSX intrinsic-element typing
// (which requires module augmentation that conflicts with ESLint
// `no-namespace` in this repo's config).

export interface VoiceWidgetProps {
  /** Which agent to connect to. Determines agent_id + button label. */
  agent: 'olivia' | 'sarah';
  /** Optional CTA text override. Defaults are scoped to each agent. */
  ctaLabel?: string;
  /** Fallback href for users who decline consent. */
  fallbackHref?: string;
}

const WIDGET_SCRIPT_URL = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

export function VoiceWidget({ agent, ctaLabel, fallbackHref }: VoiceWidgetProps) {
  const [phase, setPhase] = useState<'idle' | 'consent' | 'live' | 'declined'>('idle');

  if (!FEATURE_FLAGS.VOICE_WIDGET) {
    return null;
  }

  const agentSpec = agent === 'olivia' ? OLIVIA : SARAH;
  const defaultLabel =
    agent === 'olivia'
      ? 'Talk to Olivia about joining the network'
      : 'Talk to Sarah about your claim';
  const defaultFallback = agent === 'olivia' ? '/contractor/apply' : '/claim';

  return (
    <div className="ag-voice-widget my-6">
      {phase === 'idle' && (
        <button
          type="button"
          onClick={() => setPhase('consent')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
        >
          <span aria-hidden="true">🎙️</span>
          {ctaLabel ?? defaultLabel}
        </button>
      )}

      {phase === 'consent' && (
        <VoiceConsentModal
          agent={agent}
          onConsent={() => setPhase('live')}
          onDecline={() => setPhase('declined')}
        />
      )}

      {phase === 'live' && (
        <>
          <Script src={WIDGET_SCRIPT_URL} strategy="afterInteractive" />
          {createElement('elevenlabs-convai', { 'agent-id': agentSpec.id })}
          <p className="mt-2 text-xs text-slate-400">
            Talking to <strong>{agentSpec.name}</strong>. Press the close button on the widget to
            end the session.
          </p>
        </>
      )}

      {phase === 'declined' && (
        <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4 text-sm text-slate-200">
          <p className="mb-2">No problem — you can continue without the AI assistant.</p>
          <a
            href={fallbackHref ?? defaultFallback}
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Continue to the form
          </a>
          <button
            type="button"
            onClick={() => setPhase('idle')}
            className="ml-3 text-xs text-slate-400 underline hover:text-slate-200"
          >
            Or try the assistant again
          </button>
        </div>
      )}
    </div>
  );
}
