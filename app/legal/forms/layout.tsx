import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Forms & Agreements | Disaster Recovery',
  description:
    'Legal forms, contractor agreements, compliance documents, and business policies for the Disaster Recovery platform.',
};

export default function LegalFormsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">{children}</div>
    </div>
  );
}
