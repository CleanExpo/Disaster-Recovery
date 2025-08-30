'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: 'page' | 'section' | 'component';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: NodeJS.Timeout | null = null;
  private previousResetKeys: Array<string | number> = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    }

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Auto-recovery attempt after 10 seconds (max 3 attempts)
    if (this.state.errorCount < 3) {
      this.resetTimeoutId = setTimeout(() => {
        this.resetErrorBoundary();
      }, 10000);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;
    
    // Reset error boundary when resetKeys change
    if (hasError && resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, idx) => 
        key !== this.previousResetKeys[idx]
      );
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
        this.previousResetKeys = [...resetKeys];
      }
    }

    // Reset when props change if enabled
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private logToService = async (errorData: any) => {
    // In production, send to a real logging service (e.g., Sentry, LogRocket)
    if (process.env.NODE_ENV === 'production') {
      try {
        // Example: Send to logging endpoint
        await fetch('/api/log-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData)
        });
      } catch (logError) {
        // Silently fail if logging fails - avoid creating more errors
      }
    } else {
      // Development only - log to console for debugging
      console.error('Error captured by boundary:', errorData);
    }
  };

  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    // Send error to monitoring service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
      url: typeof window !== 'undefined' ? window.location.href : 'Server',
      level: this.props.level || 'component'
    };

    // Send to logging service
    this.logToService(errorData);
  };

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    });
  };

  render() {
    const { hasError, error, errorCount } = this.state;
    const { children, fallback, isolate, level = 'component' } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Different error UIs based on level
      if (level === 'page') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-red-100 p-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h1>
                
                <p className="text-gray-600 mb-6">
                  We encountered an unexpected error. Our team has been notified.
                </p>

                {process.env.NODE_ENV === 'development' && (
                  <details className="w-full mb-6 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Error details (Development only)
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                      {error.message}
                      {'\n'}
                      {error.stack}
                    </pre>
                  </details>
                )}

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    onClick={this.resetErrorBoundary}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </button>
                  
                  <Link
                    href="/"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Link>
                </div>

                {errorCount >= 3 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      Multiple errors detected. Please{' '}
                      <a href="mailto:support@disasterrecovery.com.au" className="underline">
                        contact support
                      </a>{' '}
                      if this persists.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }

      if (level === 'section') {
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900 mb-1">
                  This section encountered an error
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  {isolate 
                    ? 'This error has been isolated and won\'t affect other parts of the page.'
                    : 'We couldn\'t load this section properly.'}
                </p>
                <button
                  onClick={this.resetErrorBoundary}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try reloading this section
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Component level error (minimal UI)
      return (
        <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
          <AlertTriangle className="h-3 w-3 mr-2" />
          <span>Component error</span>
          <button
            onClick={this.resetErrorBoundary}
            className="ml-2 hover:text-red-900"
            aria-label="Retry"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;