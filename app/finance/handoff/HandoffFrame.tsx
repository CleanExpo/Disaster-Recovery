'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const EQUIPPED_EMBED_ORIGIN = 'https://equippedcf.com.au';

// Equipped hasn't stood up /embed yet — for Phase 1 we default to their public
// quote form. When Equipped enables the embed endpoint, set
// NEXT_PUBLIC_EQUIPPED_EMBED_URL=https://equippedcf.com.au/embed and the iframe
// will pick it up automatically.
const EMBED_URL =
  process.env.NEXT_PUBLIC_EQUIPPED_EMBED_URL || `${EQUIPPED_EMBED_ORIGIN}/get-a-quote`;

export function HandoffFrame({ token, referralId }: { token: string; referralId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'sent' | 'acknowledged' | 'error'>('idle');

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function onLoad() {
      try {
        iframe?.contentWindow?.postMessage(
          { type: 'dr.finance.prefill', token, referralId, version: 1 },
          EQUIPPED_EMBED_ORIGIN
        );
        setStatus('sent');
      } catch {
        setStatus('error');
      }
    }

    function onMessage(e: MessageEvent) {
      if (e.origin !== EQUIPPED_EMBED_ORIGIN) return;
      const data = e.data as { type?: string; status?: string };
      if (data?.type === 'equipped.prefill.ack') {
        setStatus('acknowledged');
      } else if (data?.type === 'equipped.referral.status' && data.status) {
        router.push(`/finance/thank-you?id=${encodeURIComponent(referralId)}&status=${encodeURIComponent(data.status)}`);
      }
    }

    iframe.addEventListener('load', onLoad);
    window.addEventListener('message', onMessage);
    return () => {
      iframe.removeEventListener('load', onLoad);
      window.removeEventListener('message', onMessage);
    };
  }, [token, referralId, router]);

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-600 flex justify-between">
        <span>Equipped Commercial Finance — secure embed</span>
        <span>
          {status === 'idle' && 'Connecting…'}
          {status === 'sent' && 'Handoff sent'}
          {status === 'acknowledged' && 'Prefill acknowledged'}
          {status === 'error' && 'Embed error'}
        </span>
      </div>
      <iframe
        ref={iframeRef}
        src={EMBED_URL}
        title="Equipped Commercial Finance application"
        className="w-full"
        style={{ height: '70vh', minHeight: '620px', border: 0 }}
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
