import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';

export default function ContractorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary 
      level="page"
      onError={(error, errorInfo) => {
        // Log contractor-specific errors
        console.error('Contractor Dashboard Error:', {
          error: error.message,
          stack: error.stack,
          component: errorInfo.componentStack,
          timestamp: new Date().toISOString()
        });
      }}
    >
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </ErrorBoundary>
  );
}