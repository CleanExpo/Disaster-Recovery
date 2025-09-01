'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  FileText, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  Shield,
  AlertTriangle,
  Home,
  Download,
  Send,
  User, MessageSquare} from 'lucide-react';
import Link from 'next/link';

interface BookingDetails {
  bookingId: string;
  serviceType: string;
  urgencyLevel: string;
  customerName: string;
  email: string;
  
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  paymentAmount: number;
  contractorPayment: number;
  serviceFee: number;
  estimatedResponse: string;
}

function BookingSuccessPageContent() {
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch booking details from API using booking ID
    const bookingId = searchParams?.get('booking') || 'NRP-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Mock booking details
    const mockBooking: BookingDetails = {
      bookingId: bookingId,
      serviceType: searchParams?.get('service') || 'Water Damage Restoration',
      urgencyLevel: searchParams?.get('urgency') || 'emergency',
      customerName: 'John Smith',
      email: 'john.smith@email.com',
      
      address: '123 Example Street',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      paymentAmount: 2750,
      contractorPayment: 2200,
      serviceFee: 550,
      estimatedResponse: 'Within 30 minutes'
    };

    setTimeout(() => {
      setBookingDetails(mockBooking);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your booking...</p>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Booking Not Found</h2>
          <p className="mt-2 text-gray-600">Unable to load booking details.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-4">
            Your emergency service request has been received
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600 mb-1">Booking Reference Number</p>
            <p className="text-2xl font-bold text-green-800">{bookingDetails.bookingId}</p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            What Happens Next
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Contractor Assignment</h3>
                <p className="text-gray-600">We're immediately notifying qualified contractors in your area about your emergency.</p>
                <p className="text-sm text-blue-700 mt-1">
                  Expected response: {bookingDetails.estimatedResponse}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Direct Contact</h3>
                <p className="text-gray-600">The assigned contractor will contact you directly to schedule the service and discuss your specific needs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Service Delivery</h3>
                <p className="text-gray-600">The contractor will arrive at your property and begin the restoration work as agreed.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Payment Release</h3>
                <p className="text-gray-600">Once initial KPIs are met, we'll release ${bookingDetails.contractorPayment.toLocaleString()} to the contractor from your payment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Service Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              Service Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Service Type</p>
                <p className="font-semibold">{bookingDetails.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Urgency Level</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  bookingDetails.urgencyLevel === 'emergency' 
                    ? 'bg-red-100 text-red-800' 
                    : bookingDetails.urgencyLevel === 'urgent'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {bookingDetails.urgencyLevel.charAt(0).toUpperCase() + bookingDetails.urgencyLevel.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Property Location</p>
                <p className="font-semibold">
                  {bookingDetails.address}<br />
                  {bookingDetails.suburb}, {bookingDetails.state} {bookingDetails.postcode}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b">
                <span className="text-gray-600">Total Paid</span>
                <span className="font-bold text-xl">${bookingDetails.paymentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span>${bookingDetails.serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Contractor Payment (Held)</span>
                <span>${bookingDetails.contractorPayment.toLocaleString()}</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg mt-4">
                <p className="text-xs text-blue-800">
                  <strong>Payment Protection:</strong> Your contractor payment is securely held and will only be released when work commences and initial KPIs are met.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Your Contact Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            Please ensure your phone is available. The contractor will contact you on:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{bookingDetails.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{bookingDetails.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{bookingDetails.customerName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Important Information
          </h3>
          <ul className="space-y-2 text-orange-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-700 mt-1">•</span>
              <span>Keep your phone available - the contractor will call you directly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-700 mt-1">•</span>
              <span>Have your booking reference {bookingDetails.bookingId} ready when the contractor calls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-700 mt-1">•</span>
              <span>If you don't receive a call within the estimated response time, please contact our support team</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-700 mt-1">•</span>
              <span>Take photos of the damage for insurance purposes before work begins</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            Download Receipt
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours flex items-center justify-center gap-2">
            <Send className="h-5 w-5" />
            Email Confirmation
          </button>
          <Link 
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colours text-center"
          >
            Return to Home
          </Link>
        </div>

        {/* Support Contact */}
        <div className="text-center mt-8 p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600 mb-2">Need immediate assistance?</p>
          <p className="text-lg font-semibold">Call our 24/7 Support: Online Form Available 24/7</p>
          <p className="text-sm text-gray-500 mt-1">Reference: {bookingDetails.bookingId}</p>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking confirmation...</p>
        </div>
      </div>
    }>
      <BookingSuccessPageContent />
    </Suspense>
  );
}