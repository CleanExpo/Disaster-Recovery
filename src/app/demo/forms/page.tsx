import { Suspense } from 'react'
import FormDemonstration from '@/components/demo/FormDemonstration'

export const metadata = {
  title: 'Form Demonstration | Disaster Recovery Platform',
  description: 'Watch our HRM-powered platform demonstrate intelligent form processing with realistic mock data for emergency restoration requests.',
}

export default function FormDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Form Demonstration...</p>
        </div>
      </div>
    }>
      <FormDemonstration />
    </Suspense>
  )
}