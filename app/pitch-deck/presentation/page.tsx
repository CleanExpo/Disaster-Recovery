import { Suspense } from 'react'
import PitchDeckPresentation from '@/components/pitch/PitchDeckPresentation'

export const metadata = {
  title: 'Interactive Pitch Presentation | Disaster Recovery Platform',
  description: 'Experience our investor pitch presentation with AI-powered narration and interactive slides showcasing our HRM technology and growth trajectory.',
}

export default function PitchPresentationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Investor Presentation...</p>
        </div>
      </div>
    }>
      <PitchDeckPresentation />
    </Suspense>
  )
}