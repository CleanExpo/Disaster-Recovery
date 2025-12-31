import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface ContractorProfileLayoutProps {
  children: React.ReactNode
  params: { id: string }
}

export default async function ContractorProfileLayout({
  children,
  params,
}: ContractorProfileLayoutProps) {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as unknown as { id?: string; userType?: string } | undefined

  if (!sessionUser?.id) {
    redirect('/login')
  }

  const contractor = await prisma.contractorProfile.findUnique({
    where: { id: params.id },
    select: { userId: true },
  })

  if (!contractor) {
    notFound()
  }

  const isAdminUser = isAdmin(sessionUser.userType || '')
  const isOwner = contractor.userId === sessionUser.id

  // Contractor identities are private; only admins and the contractor themselves can view.
  if (!isAdminUser && !isOwner) {
    redirect('/dashboard')
  }

  return children
}

