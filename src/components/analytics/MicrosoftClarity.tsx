'use client';

import Script from 'next/script';

export function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  
  if (!clarityId) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      type="text/partytown"
      // C5 perf (DR-700, 2026-04-29): lazyOnload (was afterInteractive).
      // Clarity is a session-recording / heatmap tool with no first-paint
      // dependency. Defers ~120-250ms of script eval off the TTI critical path.
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        ` }}
    />
  );
}