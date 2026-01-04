'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ClientJobTracker } from '@/components/realtime/ClientJobTracker'

interface PageProps {
  params: Promise<{ jobId: string }>
}

export default function JobTrackingPage({ params }: PageProps) {
  const router = useRouter()
  const { jobId } = use(params)

  // Demo job data - in production this would be fetched
  const demoJob = {
    id: jobId,
    serviceType: 'Water Damage Restoration',
    address: '42 Harbour St, Sydney NSW 2000',
    status: 'en_route' as const,
    priority: 'urgent' as const,
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
    eta: 18,
    contractor: {
      id: 'contractor-1',
      businessName: 'Sydney Restoration Pro',
      contactName: 'Michael Chen',
      phone: '0412 345 678',
      rating: 4.8,
      completedJobs: 234,
    },
    statusHistory: [
      {
        status: 'pending' as const,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        status: 'accepted' as const,
        timestamp: new Date(Date.now() - 2400000).toISOString(),
        message: 'Contractor accepted your job',
      },
      {
        status: 'en_route' as const,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        message: 'On the way to your location',
      },
    ],
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-4"
      >
        ← Back to Jobs
      </Button>

      <ClientJobTracker
        jobId={jobId}
        userId="demo-client"
        initialJob={demoJob}
      />

      {/* Help Section */}
      <div className="mt-8 p-4 rounded-lg bg-gray-50 border">
        <h3 className="font-medium mb-2">Need help?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          If you have questions about your service or need to make changes,
          our support team is here to help.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:support@disasterrecovery.com.au">
              ✉️ Email Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
