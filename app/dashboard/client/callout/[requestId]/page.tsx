import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CalloutCheckoutPanel } from '@/components/payments/callout-checkout-panel';

interface CalloutPageProps {
  params: { requestId: string };
  searchParams?: { status?: string; session_id?: string };
}

export default async function CalloutPage({ params, searchParams }: CalloutPageProps) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as unknown as { id?: string; email?: string | null; userType?: string } | undefined;

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

  if (user.userType !== 'CLIENT') {
    redirect('/dashboard');
  }

  const serviceRequest = await prisma.serviceRequest.findUnique({
    where: { id: params.requestId },
    select: { id: true, userId: true },
  });

  if (!serviceRequest || serviceRequest.userId !== user.id) {
    redirect('/dashboard/client');
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <CalloutCheckoutPanel
        requestId={serviceRequest.id}
        status={searchParams?.status}
        sessionId={searchParams?.session_id}
      />
    </div>
  );
}

