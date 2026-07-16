'use client';

import { AuthShell } from '@/components/auth/AuthShell';
import type { AppRole } from '@/lib/auth/roles';

export function AuthShellClient(props: {
  role: AppRole;
  email?: string | null;
  name?: string | null;
  children: React.ReactNode;
}) {
  return <AuthShell {...props} />;
}
