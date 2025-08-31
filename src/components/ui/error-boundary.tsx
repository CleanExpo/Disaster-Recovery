'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug, Mail, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  title?: string;
  description?: string;
  showReportButton?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error);
      console.error('Error Info:', errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, you might want to report this to an error tracking service
    // this.reportError(error, errorInfo);
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // Example: Send to error tracking service
    // Sentry.captureException(error, { contexts: { react: errorInfo } });
    console.log('Error reported:', { error, errorInfo, errorId: this.state.errorId });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    
    // Create error report
    const errorReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href };

    // In a real app, send this to your error reporting service
    console.log('Error report generated:', errorReport);
    
    // For now, just copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2));
    alert('Error report copied to clipboard. Please send it to support.');
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { 
        title = "Something went wrong", 
        description = "We're sorry, but something unexpected happened.",
        showDetails = false,
        showReportButton = true 
      } = this.props;
      
      const { error, errorInfo, errorId } = this.state;

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-white/95 backdrop-blur-sm border-red-200 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4 p-4 bg-red-100 rounded-full"
                >
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </motion.div>
                
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  {description}
                </CardDescription>
                
                {errorId && (
                  <div className="mt-4">
                    <Badge variant="outline" className="bg-gray-100">
                      Error ID: {errorId}
                    </Badge>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Details (Development/Debug Mode) */}
                {showDetails && error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <Bug className="h-4 w-4 mr-2" />
                        Technical Details
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm text-red-700">
                          <strong>Error:</strong> {error.message}
                        </p>
                        {error.stack && (
                          <details className="text-xs text-red-600">
                            <summary className="cursor-pointer font-medium hover:text-red-800">
                              Stack Trace (click to expand)
                            </summary>
                            <pre className="mt-2 p-2 bg-red-100 rounded border overflow-auto max-h-32">
                              {error.stack}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={this.handleRefresh}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 w-full sm:w-auto"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Page
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={this.handleGoHome}
                      variant="outline"
                      className="px-6 py-3 w-full sm:w-auto"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Go Home
                    </Button>
                  </motion.div>
                  
                  {showReportButton && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        onClick={this.handleReportError}
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 px-6 py-3 w-full sm:w-auto"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Report Error
                      </Button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Help Text */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-sm text-gray-500 space-y-2"
                >
                  <p>
                    If the problem persists, please contact our support team.
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    support@disasterrecovery.com.au
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends {}>(  
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Partial<ErrorBoundaryProps>
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook for manually reporting errors
export function useErrorHandler() {
  return {
    reportError: (error: Error, context?: string) => {
      console.error(`Manual error report ${context ? `(${context})` : ''}:`, error);
      
      // In production, send to error tracking service
      // Sentry.captureException(error, { tags: { context } });
    }
  };
}

// Simple error fallback components
export const SimpleErrorFallback = ({ error }: { error?: Error }) => (
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <FileX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600">Something went wrong loading this component.</p>
      <Button 
        onClick={() => window.location.reload()} 
        size="sm" 
        className="mt-4"
      >
        Retry
      </Button>
    </div>
  </div>
);

export const InlineErrorFallback = ({ error }: { error?: Error }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
    <div className="flex items-start">
      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
      <div>
        <p className="text-red-800 font-medium">Error loading component</p>
        <p className="text-red-600 text-sm mt-1">
          {error?.message || 'An unexpected error occurred'}
        </p>
      </div>
    </div>
  </div>
);

export default ErrorBoundary;