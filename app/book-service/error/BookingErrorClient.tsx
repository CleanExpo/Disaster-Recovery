'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Phone,
  Mail,
  HelpCircle,
  CreditCard,
  Shield,
  Clock
} from 'lucide-react';
import Link from 'next/link';

type ErrorType = 'payment' | 'validation' | 'network' | 'server' | 'timeout' | 'unknown';

interface ErrorDetails {
  type: ErrorType;
  message: string;
  code?: string;
  timestamp: string;
  attemptId?: string;
}

function BookingErrorPageContent() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Parse error details from URL parameters
    const errorType = (searchParams?.get('type') as ErrorType) || 'unknown';
    const errorCode = searchParams?.get('code') || 'ERR_UNKNOWN';
    const attemptId = searchParams?.get('attempt') || 'ATT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Map error types to user-friendly messages
    const errorMessages: Record<ErrorType, string> = {
      payment: 'Your payment could not be processed. Please check your payment details and try again.',
      validation: 'Some information in your form appears to be incorrect. Please review and correct the highlighted fields.',
      network: 'We couldn\'t connect to our servers. Please check your internet connection and try again.',
      server: 'Our servers are experiencing issues. Please try again in a few moments.',
      timeout: 'Your request took too long to process. This might be due to high demand. Please try again.',
      unknown: 'An unexpected error occurred while processing your booking. Please try again or contact support.'
    };

    const errorDetail: ErrorDetails = {
      type: errorType,
      message: errorMessages[errorType],
      code: errorCode,
      timestamp: new Date().toISOString(),
      attemptId: attemptId
    };

    setTimeout(() => {
      setErrorDetails(errorDetail);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading error details...</p>
        </div>
      </div>
    );
  }

  if (!errorDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Error Details Not Found</h2>
          <p className="mt-2 text-gray-600">Unable to load error information.</p>
          <Link href="/book-service" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            Try Booking Again
          </Link>
        </div>
      </div>
    );
  }

  const getErrorIcon = () => {
    switch (errorDetails.type) {
      case 'payment':
        return <CreditCard className="h-16 w-16 text-red-500" />;
      case 'network':
        return <AlertTriangle className="h-16 w-16 text-orange-500" />;
      case 'validation':
        return <XCircle className="h-16 w-16 text-yellow-500" />;
      default:
        return <XCircle className="h-16 w-16 text-red-500" />;
    }
  };

  const getTroubleshootingSteps = () => {
    switch (errorDetails.type) {
      case 'payment':
        return [
          'Verify your card details are entered correctly',
          'Ensure you have sufficient funds available',
          'Check if your card is enabled for online transactions',
          'Try using a different payment method',
          'Contact your bank if the issue persists'
        ];
      case 'validation':
        return [
          'Review all required fields are filled',
          'Check email format is correct (example@domain.com)',
          'Verify Australian postcode is 4 digits',
          'Ensure phone number includes area code',
          'Check that descriptions are under 500 characters'
        ];
      case 'network':
        return [
          'Check your internet connection',
          'Try refreshing the page',
          'Disable VPN if you\'re using one',
          'Clear your browser cache and cookies',
          'Try using a different browser'
        ];
      default:
        return [
          'Wait a few moments and try again',
          'Clear your browser cache',
          'Try using a different browser',
          'Check if JavaScript is enabled',
          'Contact support if the problem continues'
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Error Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
          {getErrorIcon()}
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">Booking Failed</h1>
          <p className="text-xl text-gray-600 mb-4">
            We couldn't complete your booking request
          </p>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600 mb-1">Error Reference</p>
            <p className="text-lg font-mono text-red-800">{errorDetails.code}</p>
            <p className="text-xs text-gray-500 mt-1">Attempt ID: {errorDetails.attemptId}</p>
          </div>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            What Went Wrong
          </h2>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
            <p className="text-gray-800">{errorDetails.message}</p>
          </div>

          <div className="text-sm text-gray-500">
            <p>Error Type: <span className="font-mono">{errorDetails.type.toUpperCase()}</span></p>
            <p>Timestamp: {new Date(errorDetails.timestamp).toLocaleString()}</p>
          </div>
        </div>

        {/* Troubleshooting Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            Troubleshooting Steps
          </h2>
          
          <ol className="space-y-3">
            {getTroubleshootingSteps().map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Your Data is Safe */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Your Information is Safe
          </h3>
          <ul className="space-y-2 text-green-800">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>No payment has been processed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Your card has not been charged</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>Your personal information remains secure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>You can safely retry your booking</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link 
            href="/book-service"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </Link>
          <Link 
            href="/"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            Return Home
          </Link>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 min-h-[44px]">
            <Mail className="h-5 w-5" />
            Contact Support
          </button>
        </div>

        {/* Alternative Options */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Need Immediate Help?
          </h3>
          <p className="text-blue-800 mb-4">
            If you're experiencing an emergency and need immediate assistance, you have these options:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Try Our AI Assistant</h4>
              <p className="text-gray-600 text-sm mb-3">Get instant help from our AI-powered chat assistant available 24/7</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Open Chat →
              </button>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Direct Contractor Contact</h4>
              <p className="text-gray-600 text-sm mb-3">Browse our verified contractor directory for direct contact</p>
              <Link href="/contractors" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View Directory →
              </Link>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600 mb-2">Still having trouble?</p>
          <p className="text-lg font-semibold">Support available via online form 24/7</p>
          <p className="text-sm text-gray-500 mt-2">
            Reference this error code when contacting support: <span className="font-mono">{errorDetails.code}</span>
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Email Support
            </button>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <Phone className="h-4 w-4" />
              Request Callback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingErrorPageOriginal() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading error information...</p>
        </div>
      </div>
    }>
      <BookingErrorPageContent />
    </Suspense>
  );
}
export default function BookingErrorPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <BookingErrorPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <BookingErrorPageOriginal />
      <AntigravityFooter />
    </>
  );
}
