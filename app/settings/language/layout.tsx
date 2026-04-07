import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Settings | Disaster Recovery Australia',
  description: 'Choose your preferred language. Page content will be translated automatically.',
};

export default function LanguageSettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
