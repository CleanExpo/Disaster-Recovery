'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  DollarSign,
  Clock,
  Mail,
  Building2,
  FileText,
  Info, MessageSquare} from 'lucide-react';

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams?.get('amount') || '2750';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    address: '',
    city: '',
    state: '',
    postcode: ''
  });
  const [errors, setErrors] = useState<any>({});

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validatePayment = () => {
    const newErrors: any = {};

    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 16) {
      newErrors.number = 'Valid card number required';
    }
    if (!cardDetails.name) {
      newErrors.name = 'Cardholder name required';
    }
    if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
      newErrors.expiry = 'Valid expiry date required';
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      newErrors.cvv = 'CVV required';
    }
    if (!billingAddress.address) {
      newErrors.address = 'Billing address required';
    }
    if (!billingAddress.city) {
      newErrors.city = 'City required';
    }
    if (!billingAddress.state) {
      newErrors.state = 'State required';
    }
    if (!billingAddress.postcode || !/^\d{4}$/.test(billingAddress.postcode)) {
      newErrors.postcode = 'Valid postcode required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);

    try {
      // In production, this would:
      // 1. Create Stripe PaymentIntent
      // 2. Process payment using Stripe Elements
      // 3. Handle 3D Secure authentication if required
      // 4. Create lead in database
      // 5. Send to job distribution system
      // 6. Send confirmation emails

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Redirect to success page
      router.push('/book-service/success');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colours"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Secure Payment</h1>
                <p className="text-sm text-gray-600">Complete your booking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Amount Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Amount</h2>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Initial Assessment Fee</p>
                      <p className="text-3xl font-bold text-gray-900">${amount}.00</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-blue-500" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-sm text-blue-800">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      $2,200 credited toward restoration work
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                
                <div className="flex gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <span className="text-sm font-medium">Credit/Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building2 className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                    <span className="text-sm font-medium">Bank Transfer</span>
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        maxLength={19}
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({
                          ...cardDetails,
                          number: formatCardNumber(e.target.value)
                        })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.number ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="John Smith"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          maxLength={5}
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            expiry: formatExpiry(e.target.value)
                          })}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.expiry ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, '')
                          })}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Bank Transfer Instructions</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Name:</span>
                        <span className="font-mono">NRP Disaster Recovery</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">BSB:</span>
                        <span className="font-mono">123-456</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-mono">12345678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference:</span>
                        <span className="font-mono">BOOK-{Date.now()}</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-sm text-yellow-800">
                        <AlertCircle className="h-4 w-4 inline mr-1" />
                        Please include the reference number. Service will be confirmed once payment is received (1-2 business days).
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              {paymentMethod === 'card' && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={billingAddress.address}
                        onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>

                      <div>
                        <label htmlFor="billingState" className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <select
                          id="billingState"
                          value={billingAddress.state}
                          onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.state ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select</option>
                          {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="billingPostcode" className="block text-sm font-medium text-gray-700 mb-2">
                        Postcode
                      </label>
                      <input
                        type="text"
                        id="billingPostcode"
                        maxLength={4}
                        value={billingAddress.postcode}
                        onChange={(e) => setBillingAddress({
                          ...billingAddress,
                          postcode: e.target.value.replace(/\D/g, '')
                        })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.postcode ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.postcode && <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colours flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    {paymentMethod === 'card' ? `Pay $${amount}.00` : 'Confirm Bank Transfer'}
                  </>
                )}
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="pb-4 border-b">
                    <h3 className="font-medium text-gray-900 mb-2">Service Booking</h3>
                    <p className="text-sm text-gray-600">Emergency Restoration Assessment</p>
                    <p className="text-xs text-gray-500 mt-1">Includes on-site assessment and detailed quote</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Assessment Fee:</span>
                      <span className="font-medium">$2,750.00</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Credit toward work:</span>
                      <span className="font-medium">-$2,200.00</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="font-semibold">Service Fee:</span>
                        <span className="font-semibold">$550.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Due:</span>
                      <span className="text-blue-600">${amount}.00</span>
                    </div>
                  </div>

                  {/* What Happens Next */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-3">What Happens Next?</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <p className="text-xs text-gray-600">Contractor contacts you within 30 minutes</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <p className="text-xs text-gray-600">On-site assessment scheduled</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <p className="text-xs text-gray-600">Detailed quote provided</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <p className="text-xs text-gray-600">$2,200 credited to final invoice</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-center gap-4">
                      <Shield className="h-8 w-8 text-gray-400" />
                      <Lock className="h-8 w-8 text-gray-400" />
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Secure payment powered by Stripe
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <a href="/contact" className="flex items-center gap-2 text-blue-700 hover:text-blue-800">
                    <MessageSquare className="h-4 w-4" />
                    1800 DISASTER
                  </a>
                  <a href="mailto:support@nrp.com.au" className="flex items-center gap-2 text-blue-700 hover:text-blue-800">
                    <Mail className="h-4 w-4" />
                    support@nrp.com.au
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment...</p>
        </div>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
}