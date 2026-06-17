import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a Disaster Recovery account to manage claims and recovery support.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
