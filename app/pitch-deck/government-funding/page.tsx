import { Suspense } from 'react'
import GovernmentFundingDetails from '@/components/pitch/GovernmentFundingDetails'

export const metadata = {
  title: 'Government Funding Framework | Disaster Recovery Platform',
  description: 'Comprehensive pathway to $2.4B in Australian government funding and industry recognition for the specialty cleaning and restoration sector.',
}

export default function GovernmentFundingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Government Funding Framework...</p>
        </div>
      </div>
    }>
      <GovernmentFundingDetails />
    </Suspense>
  )
}