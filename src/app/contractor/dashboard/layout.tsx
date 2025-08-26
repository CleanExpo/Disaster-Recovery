import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';

export default function ContractorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary level="page">
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </ErrorBoundary>
  );
}