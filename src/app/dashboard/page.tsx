'use client'

import { useSession } from 'next-auth/react'
import { Card } from '@/components/ui/card'
import { Users, FileText, FileCheck, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  const { data: session } = useSession()

  const stats = [
    {
      name: 'Total Clients',
      value: '12',
      icon: Users,
      change: '+2 this month' },
    {
      name: 'Active Audits',
      value: '5',
      icon: FileText,
      change: '3 in progress' },
    {
      name: 'Proposals Sent',
      value: '8',
      icon: FileCheck,
      change: '2 pending' },
    {
      name: 'Revenue',
      value: '$12,450',
      icon: DollarSign,
      change: '+15% from last month' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </div>
              <stat.icon className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Audits</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Website Audit #{i}</p>
                  <p className="text-sm text-muted-foreground">
                    Client {i} - 2 days ago
                  </p>
                </div>
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Enquiries</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Lead from website</p>
                  <p className="text-sm text-muted-foreground">
                    contact{i}@example.com
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  New
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}