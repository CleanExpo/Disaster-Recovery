import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface ContractorDashboardLayoutProps {
  children: ReactNode;
}

export default async function ContractorDashboardLayout({ children }: ContractorDashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as unknown as { id?: string; email?: string | null } | undefined;

  const sessionUserId = sessionUser?.id;
  const sessionUserEmail = sessionUser?.email?.toLowerCase().trim();

  if (!sessionUserId && !sessionUserEmail) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: sessionUserId ? { id: sessionUserId } : { email: sessionUserEmail! },
    select: { id: true, userType: true },
  });

  if (!user) {
    redirect('/login');
  }

  const allowed = user.userType === 'CONTRACTOR' || user.userType === 'ADMIN' || user.userType === 'SUPER_ADMIN';
  if (!allowed) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}

