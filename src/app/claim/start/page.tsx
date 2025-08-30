'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, Home, Phone, Mail, FileText, Calendar, Camera, AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { DEMO_DATA, simulateTyping } from '@/lib/demo-mode';

function ClaimStartContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    claimNumber: '',
    insuranceCompany: '',
    incidentType: '',
    incidentDate: '',
    description: '',
    urgency: 'standard',
    propertyType: 'residential'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [currentField, setCurrentField] = useState('');

  useEffect(() => {
    if (searchParams.get('demo') === 'auto') {
      runAutoDemo();
    }
  }, []);

  const runAutoDemo = async () => {
    setIsDemoRunning(true);
    const demoClient = DEMO_DATA.client;

    // Animate filling each field
    const fields = [
      { name: 'name', value: demoClient.name },
      { name: 'email', value: demoClient.email },
      { name: 'phone', value: demoClient.phone },
      { name: 'address', value: demoClient.address },
      { name: 'claimNumber', value: demoClient.claimNumber },
      { name: 'insuranceCompany', value: demoClient.insuranceCompany },
      { name: 'incidentType', value: demoClient.incidentType },
      { name: 'incidentDate', value: demoClient.incidentDate },
      { name: 'description', value: demoClient.description }
    ];

    for (const field of fields) {
      setCurrentField(field.name);
      const input = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await simulateTyping(input, field.value, 40);
        setFormData(prev => ({ ...prev, [field.name]: field.value }));
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Set urgency to urgent
    setFormData(prev => ({ ...prev, urgency: 'urgent' }));
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Submit the form
    const submitBtn = document.querySelector('[type="submit"]') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      submitBtn.click();
    }

    setTimeout(() => {
      alert('Demo Complete! This shows how a client would submit an insurance claim.');
      setIsDemoRunning(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Claim submitted successfully! (Demo Mode - No actual submission)');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Start Your Claim</h1>
                <p className="text-sm text-gray-600">24/7 Emergency Response</p>
              </div>
            </div>
            {isDemoRunning && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin" />
                Demo Running...
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Emergency Notice */}
        <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h2 className="font-bold text-red-900 mb-1">Emergency? Call Now!</h2>
              <p className="text-red-700">For immediate emergency response, call our 24/7 hotline:</p>
              <a href="tel:1300DISASTER" className="text-2xl font-bold text-red-600 hover:text-red-700">
                1300 DISASTER (1300 347 278)
              </a>
            </div>
          </div>
        </div>

        {/* Claim Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'name' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'email' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'phone' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="0400 000 000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'address' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="123 Main St, Sydney NSW 2000"
                />
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Insurance Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Company *
                </label>
                <input
                  type="text"
                  name="insuranceCompany"
                  value={formData.insuranceCompany}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'insuranceCompany' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="ABC Insurance"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Number (if available)
                </label>
                <input
                  type="text"
                  name="claimNumber"
                  value={formData.claimNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'claimNumber' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="CLM-123456"
                />
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Incident Details
            </h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Damage *
                  </label>
                  <select
                    name="incidentType"
                    value={formData.incidentType}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      currentField === 'incidentType' ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  >
                    <option value="">Select damage type</option>
                    <option value="Water Damage">Water Damage</option>
                    <option value="Fire Damage">Fire Damage</option>
                    <option value="Storm Damage">Storm Damage</option>
                    <option value="Mould">Mould</option>
                    <option value="Flood">Flood</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      currentField === 'incidentDate' ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description of Damage *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    currentField === 'description' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  placeholder="Please describe what happened and the extent of the damage..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['standard', 'urgent', 'emergency'].map((level) => (
                    <label
                      key={level}
                      className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        formData.urgency === level
                          ? level === 'emergency' 
                            ? 'border-red-500 bg-red-50'
                            : level === 'urgent'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={formData.urgency === level}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="font-medium capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || isDemoRunning}
              className={`
                flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all
                ${isSubmitting || isDemoRunning
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting Claim...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Claim
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ClaimStartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>}>
      <ClaimStartContent />
    </Suspense>
  );
}