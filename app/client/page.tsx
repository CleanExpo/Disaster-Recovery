'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, FileCheck, CreditCard, MessageSquare } from 'lucide-react'

export default function ClientPortalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || session.user.role !== 'CLIENT') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Client Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Button variant="outline" onClick={() => router.push('/logout')}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome, {session.user.name}</h2>
          <p className="text-muted-foreground">
            Access your audits, proposals, and invoices
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <FileText className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold">Audits</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">View your audits</p>
          </Card>

          <Card className="p-6">
            <FileCheck className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold">Proposals</h3>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Active proposals</p>
          </Card>

          <Card className="p-6">
            <CreditCard className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold">Invoices</h3>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">View invoices</p>
          </Card>

          <Card className="p-6">
            <MessageSquare className="mb-4 h-8 w-8 text-primary" />
            <h3 className="font-semibold">Support</h3>
            <p className="text-sm text-muted-foreground">Get help</p>
            <Button className="mt-2" size="sm">
              Contact
            </Button>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Recent Audits</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Website Audit {i}</p>
                    <p className="text-sm text-muted-foreground">
                      Completed {i} week ago
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Active Proposals</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Service Proposal {i}</p>
                    <p className="text-sm text-muted-foreground">
                      Valid until next month
                    </p>
                  </div>
                  <Button size="sm">Accept</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}