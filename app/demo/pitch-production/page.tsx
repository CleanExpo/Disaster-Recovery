'use client'

import dynamic from 'next/dynamic'

// Dynamically import the production pitch deck to avoid SSR issues
const PitchDeckProductionV2 = dynamic(
  () => import('@/components/pitch/PitchDeckProductionV2'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading presentation...</div>
      </div>
    )
  }
)

export default function PitchProductionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Investor Pitch Deck - Production Version
          </h1>
          <p className="text-blue-200 text-lg">
            Professional presentation with ElevenLabs voice narration and synchronized slides
          </p>
        </div>
        
        <PitchDeckProductionV2 />
        
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Press SPACE to play/pause • Arrow keys to navigate • F for fullscreen</p>
          <p className="mt-2">Audio narration powered by ElevenLabs AI</p>
        </div>
      </div>
    </div>
  )
}