'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Download, BookOpen, Clock } from 'lucide-react';

function PaymentSuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Verify payment with backend
      verifyPayment(sessionId);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch('/api/stripe/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        setPaymentVerified(true);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to National Recovery Partners
          </p>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Confirmation</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Application Fee</span>
              <span className="font-semibold">$275.00</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Joining Fee</span>
              <span className="font-semibold">$2,200.00</span>
            </div>
            <div className="flex justify-between py-3 text-lg font-bold">
              <span>Total Paid</span>
              <span className="text-green-600">$2,475.00</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              A receipt has been sent to your registered email address. 
              You can also download it from your account dashboard.
            </p>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Begin Your 14-Day Onboarding</h3>
                <p className="text-gray-600 mt-1">
                  Access your personalized training dashboard to start the comprehensive onboarding program.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Complete Daily Modules</h3>
                <p className="text-gray-600 mt-1">
                  Each day unlocks new training content including videos, readings, and assessments.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Required Documentation</h3>
                <p className="text-gray-600 mt-1">
                  Upload certifications, insurance documents, and proof of work as you progress.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Certified & Start Receiving Leads</h3>
                <p className="text-gray-600 mt-1">
                  Upon successful completion, you'll be certified and ready to receive high-value insurance claims.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Information */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Subscription Benefits</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">Month 1</div>
              <div className="text-gray-600 mt-1">FREE</div>
              <div className="text-sm text-gray-500 mt-2">100% off while you train</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">Month 2</div>
              <div className="text-gray-600 mt-1">$198/month</div>
              <div className="text-sm text-gray-500 mt-2">60% discount applied</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">Month 3</div>
              <div className="text-gray-600 mt-1">$247.50/month</div>
              <div className="text-sm text-gray-500 mt-2">50% discount applied</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 text-center">
            Regular subscription rate of $495/month applies from month 4 onwards
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/contractor/onboarding')}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              <BookOpen className="w-5 h-5" />
              <span>Start Training</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition">
              <Download className="w-5 h-5" />
              <span>Download Receipt</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition">
              <Clock className="w-5 h-5" />
              <span>View Schedule</span>
            </button>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center text-gray-600">
          <p>Need help? Contact our support team at</p>
          <a href="mailto:support@nrpaus.com.au" className="text-blue-600 hover:underline">
            support@nrpaus.com.au
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      </div>
    }>
      <PaymentSuccessPageContent />
    </Suspense>
  );
}