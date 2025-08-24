import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">CleanExpo SMB Agency</h1>
          </div>
          <nav className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-5xl font-bold tracking-tight">
              Modern SaaS for Local Service Agencies
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Built for SMBs, ready for local development, and scalable as you grow.
              Manage multiple brands, create audits & proposals, capture leads, and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline">View Demo</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40">
          <div className="container mx-auto px-4 py-24">
            <h3 className="text-center text-3xl font-bold">Core Features</h3>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold">Multi-Brand Support</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manage multiple agencies and brands from a single platform
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold">Audit & Proposals</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create, version, and share professional audits and proposals
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold">Lead Capture</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Capture and manage local search enquiries effectively
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold">Client Portal</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  White-label portal for clients to access their information
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold">Billing Integration</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Integrated Stripe billing for seamless payments
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold">CLI Admin Tools</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Powerful command-line tools for admin operations
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 CleanExpo SMB Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}