'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, Clock, MapPin, User, Mail, 
  Briefcase, Home, AlertTriangle, Shield, CheckCircle,
  ChevronLeft, ChevronRight, Loader2, AlertCircle,
  Building2, FileText, DollarSign, Sparkles, MessageSquare} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TimeSlot {
  time: string;
  available: boolean;
  emergency?: boolean;
}

interface FormData {
  // Contact Information
  name: string;
  email: string;
  phone: string;
  company?: string;
  
  // Service Details
  serviceType: string;
  urgency: 'emergency' | 'urgent' | 'routine' | 'planning';
  propertyType: 'residential' | 'commercial' | 'industrial';
  
  // Location
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  
  // Scheduling
  date: string;
  time: string;
  
  // Additional Information
  description: string;
  hasInsurance: boolean;
  insuranceProvider?: string;
  estimatedValue?: string;
  
  // Preferences
  contactPreference: 'phone' | 'email' | 'sms';
  bestTimeToCall?: string;
}

const services = [
  { id: 'water', label: 'Water Damage', icon: '💧' },
  { id: 'fire', label: 'Fire Damage', icon: '🔥' },
  { id: 'mould', label: 'Mould Remediation', icon: '🦠' },
  { id: 'storm', label: 'Storm Damage', icon: '⛈️' },
  { id: 'biohazard', label: 'Biohazard Cleanup', icon: '☣️' },
  { id: 'other', label: 'Other Services', icon: '🏗️' }
];

const timeSlots: TimeSlot[] = [
  { time: '07:00', available: true },
  { time: '08:00', available: true },
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: false },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
  { time: '18:00', available: true },
  { time: 'Emergency', available: true, emergency: true }
];

export default function SchedulePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>(timeSlots);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    urgency: 'routine',
    propertyType: 'residential',
    address: '',
    suburb: '',
    state: 'NSW',
    postcode: '',
    date: '',
    time: '',
    description: '',
    hasInsurance: false,
    insuranceProvider: '',
    estimatedValue: '',
    contactPreference: 'phone',
    bestTimeToCall: ''
  });

  // Generate calendar dates for next 30 days
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const calendarDates = generateCalendarDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const isDateAvailable = (date: Date) => {
    // Simulate availability - weekends have limited slots
    const dayOfWeek = date.getDay();
    return dayOfWeek !== 0; // Not available on Sundays
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setFormData({ ...formData, date: formattedDate });
    
    // Simulate fetching available slots for selected date
    // In production, this would be an API call
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 6) {
      // Saturday - limited slots
      setAvailableSlots(timeSlots.map((slot, idx) => ({
        ...slot,
        available: idx < 6 || slot.emergency
      })));
    } else {
      setAvailableSlots(timeSlots);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.serviceType && formData.urgency && formData.propertyType);
      case 2:
        return !!(formData.date && formData.time);
      case 3:
        return !!(formData.name && formData.email && formData.phone && 
                 formData.address && formData.suburb && formData.postcode);
      case 4:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError('');
    } else {
      setError('Please fill in all required fields');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push(`/schedule/confirmation?id=${data.bookingId}`);
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (err) {
      setError('Failed to submit booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Briefcase className="h-5 w-5" />;
      case 2: return <Calendar className="h-5 w-5" />;
      case 3: return <User className="h-5 w-5" />;
      case 4: return <FileText className="h-5 w-5" />;
      default: return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Service Details';
      case 2: return 'Schedule Appointment';
      case 3: return 'Contact Information';
      case 4: return 'Additional Information';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">Schedule Service</h1>
          <p className="text-xl text-white/90">Book your restoration service in minutes</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full
                  ${currentStep === step ? 'bg-blue-600 text-white' : 
                    currentStep > step ? 'bg-green-500 text-white' : 
                    'bg-gray-200 text-gray-500'}
                `}>
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    getStepIcon(step)
                  )}
                </div>
                {step < 4 && (
                  <div className={`w-24 h-1 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Step {currentStep}: {getStepTitle(currentStep)}
            </h2>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Service Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceType: service.id })}
                          className={`
                            p-4 rounded-lg border-2 transition-all text-center
                            ${formData.serviceType === service.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <div className="text-2xl mb-2">{service.icon}</div>
                          <div className="text-sm font-medium">{service.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Urgency Level *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { value: 'emergency', label: 'Emergency', colour: 'red', icon: <AlertTriangle /> },
                        { value: 'urgent', label: 'Urgent', colour: 'orange', icon: <Clock /> },
                        { value: 'routine', label: 'Routine', colour: 'blue', icon: <Calendar /> },
                        { value: 'planning', label: 'Planning', colour: 'gray', icon: <FileText /> }
                      ].map((urgency) => (
                        <button
                          key={urgency.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, urgency: urgency.value as any })}
                          className={`
                            p-4 rounded-lg border-2 transition-all
                            ${formData.urgency === urgency.value
                              ? `border-${urgency.colour}-500 bg-${urgency.colour}-50`
                              : 'border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <div className="flex flex-col items-center">
                            {urgency.icon}
                            <span className="text-sm font-medium mt-2">{urgency.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Property Type *
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'residential', label: 'Residential', icon: <Home /> },
                        { value: 'commercial', label: 'Commercial', icon: <Building2 /> },
                        { value: 'industrial', label: 'Industrial', icon: <Shield /> }
                      ].map((property) => (
                        <button
                          key={property.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, propertyType: property.value as any })}
                          className={`
                            p-4 rounded-lg border-2 transition-all
                            ${formData.propertyType === property.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <div className="flex flex-col items-center">
                            {property.icon}
                            <span className="text-sm font-medium mt-2">{property.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Date *
                    </label>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDates.map((date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const available = isDateAvailable(date);
                        const isSelected = dateStr === selectedDate;
                        
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            disabled={!available}
                            onClick={() => handleDateSelect(date)}
                            className={`
                              p-3 rounded-lg border text-center transition-all
                              ${isSelected
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : available
                                ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}
                            `}
                          >
                            <div className="text-xs font-medium">
                              {date.toLocaleDateString('en-AU', { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-bold">
                              {date.getDate()}
                            </div>
                            <div className="text-xs">
                              {date.toLocaleDateString('en-AU', { month: 'short' })}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Time *
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!slot.available}
                            onClick={() => setFormData({ ...formData, time: slot.time })}
                            className={`
                              p-3 rounded-lg border transition-all
                              ${formData.time === slot.time
                                ? 'border-blue-500 bg-blue-50'
                                : slot.available
                                ? slot.emergency
                                  ? 'border-red-300 hover:border-red-400 bg-red-50'
                                  : 'border-gray-200 hover:border-gray-300'
                                : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}
                            `}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">{slot.time}</span>
                            </div>
                            {slot.emergency && (
                              <Badge className="mt-1 bg-red-100 text-red-800 text-xs">
                                24/7
                              </Badge>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
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
                        placeholder="04XX XXX XXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Suburb *
                      </label>
                      <input
                        type="text"
                        name="suburb"
                        value={formData.suburb}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        pattern="[0-9]{4}"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe the Damage (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide any additional details about the damage or special requirements..."
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="hasInsurance"
                        checked={formData.hasInsurance}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        I have insurance coverage for this damage
                      </span>
                    </label>
                  </div>

                  {formData.hasInsurance && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Provider
                      </label>
                      <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Property Value (Optional)
                    </label>
                    <select
                      name="estimatedValue"
                      value={formData.estimatedValue}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select range</option>
                      <option value="0-5000">$0 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000-50000">$25,000 - $50,000</option>
                      <option value="50000+">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'phone', label: 'Phone', icon: <MessageSquare /> },
                        { value: 'email', label: 'Email', icon: <Mail /> },
                        { value: 'sms', label: 'SMS', icon: <Mail /> }
                      ].map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, contactPreference: method.value as any })}
                          className={`
                            p-3 rounded-lg border transition-all
                            ${formData.contactPreference === method.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {method.icon}
                            <span className="text-sm">{method.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium">
                          {services.find(s => s.id === formData.serviceType)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {formData.date && new Date(formData.date).toLocaleDateString('en-AU')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property:</span>
                        <span className="font-medium capitalize">{formData.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Urgency:</span>
                        <span className="font-medium capitalize">{formData.urgency}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Confirm Booking
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Card>

          {/* Emergency Notice */}
          {formData.urgency === 'emergency' && (
            <Alert className="mt-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <strong>Emergency Service:</strong> For immediate emergency assistance, 
                please use our 24/7 online emergency form
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}