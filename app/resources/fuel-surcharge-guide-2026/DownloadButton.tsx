'use client'

declare const gtag: ((...args: unknown[]) => void) | undefined

export default function DownloadButton() {
  const handleDownload = () => {
    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
      gtag('event', 'guide_download', {
        event_category: 'engagement',
        event_label: 'fuel-surcharge-guide-2026',
      })
    }
    window.print()
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors text-lg border-2 border-white"
    >
      ⬇ Download Full Guide (PDF)
    </button>
  )
}
