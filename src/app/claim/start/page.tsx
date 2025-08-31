'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, Home, Phone, Mail, FileText, Calendar, Camera, AlertCircle, CheckCircle, Loader2, Send, Upload, Image, X, Info } from 'lucide-react';
import { DEMO_DATA, simulateTyping } from '@/lib/demo-mode';

function ClaimStartContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    
    address: '',
    claimNumber: '',
    insuranceCompany: '',
    incidentType: '',
    incidentDate: '',
    description: '',
    urgency: 'standard',
    propertyType: 'residential',
    images: [] as File[]
  });
  const [imagePreview, setImagePreview] = useState<string[]>([]);
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
        input.scrollIntoView({ behaviour: 'smooth', block: 'centre' });
        await simulateTyping(input, field.value, 46); // 15% slower
        setFormData(prev => ({ ...prev, [field.name]: field.value }));
      }
      await new Promise(resolve => setTimeout(resolve, 575)); // 15% slower
    }

    // Simulate image upload
    const uploadSection = document.querySelector('[type="file"]')?.parentElement?.parentElement;
    if (uploadSection) {
      uploadSection.scrollIntoView({ behaviour: 'smooth', block: 'centre' });
      await new Promise(resolve => setTimeout(resolve, 1150)); // 15% slower
      
      // Show simulated image previews
      const demoImages = [
        'Water damage in living room - ceiling',
        'Damaged flooring - hallway', 
        'Moisture reading - 98% saturation'
      ];
      
      // Create mock preview
      const previewContainer = document.createElement('div');
      previewContainer.className = 'mt-4 p-3 bg-green-50 border border-green-200 rounded-lg';
      previewContainer.innerHTML = `
        <p class="text-sm font-semibold text-green-800 mb-2">📸 3 photos uploaded:</p>
        <ul class="text-xs text-green-700 space-y-1">
          ${demoImages.map(img => `<li>✓ ${img}</li>`).join('')}
        </ul>
      `;
      uploadSection.appendChild(previewContainer);
      await new Promise(resolve => setTimeout(resolve, 1150)); // 15% slower
    }

    // Set urgency to urgent
    setFormData(prev => ({ ...prev, urgency: 'urgent' }));
    await new Promise(resolve => setTimeout(resolve, 1150)); // 15% slower

    // Submit the form
    const submitBtn = document.querySelector('[type="submit"]') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.scrollIntoView({ behaviour: 'smooth', block: 'centre' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      submitBtn.click();
    }

    setTimeout(() => {
      // Show detailed completion modal
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-[3000] bg-black/50 flex items-center justify-center p-4';
      modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-3xl animate-scale-in">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">✅ Claim Successfully Submitted!</h2>
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-semibold text-green-900 mb-2">Immediate Actions:</h3>
              <ul class="text-sm text-green-800 space-y-1">
                <li>• Emergency crew dispatched</li>
                <li>• ETA: 45 minutes</li>
                <li>• SMS updates enabled</li>
                <li>• Contractor: Demo Restorations</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-900 mb-2">What Happens Next:</h3>
              <ul class="text-sm text-blue-800 space-y-1">
                <li>• Initial assessment & photos</li>
                <li>• Moisture mapping</li>
                <li>• Emergency mitigation</li>
                <li>• Insurance coordination</li>
                <li>• Full restoration quote</li>
              </ul>
            </div>
          </div>
          <div class="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
            <h3 class="font-semibold text-amber-900 mb-2">📱 AI Damage Assessment Available</h3>
            <p class="text-sm text-amber-800">Take photos with your phone for instant AI analysis and accurate quote estimation.</p>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Close Demo</button>
        </div>
      `;
      document.body.appendChild(modal);
      setIsDemoRunning(false);
    }, 2300); // 15% slower
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
                <p className="text-sm text-gray-600">24/7 Online Emergency Response</p>
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
              <h2 className="font-bold text-red-900 mb-1">Emergency? Submit Form Now!</h2>
              <p className="text-red-700">For immediate emergency response, use our 24/7 online form:</p>
              <a href="#contact-form" className="text-2xl font-bold text-red-600 hover:text-red-700">
                Online Form Available 24/7
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
                  placeholder="Enter details" />
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
                  Upload Photos of Damage
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colours">
                  <input
                    type="file"
                    id="image-upload"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFormData({ ...formData, images: [...formData.images, ...files] });
                      
                      // Create preview URLs
                      const newPreviews = files.map(file => URL.createObjectURL(file));
                      setImagePreview([...imagePreview, ...newPreviews]);
                    }}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700">Click to upload photos</p>
                    <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>
                
                {/* Image Preview Grid */}
                {imagePreview.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Damage photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = formData.images.filter((_, i) => i !== index);
                            const newPreviews = imagePreview.filter((_, i) => i !== index);
                            setFormData({ ...formData, images: newImages });
                            setImagePreview(newPreviews);
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-700">
                      <p className="font-semibold mb-1">Photo Tips for Faster Processing:</p>
                      <ul className="space-y-0.5">
                        <li>• Take wide shots showing full extent of damage</li>
                        <li>• Include close-ups of specific damage areas</li>
                        <li>• Photograph damaged items and serial numbers</li>
                        <li>• Capture moisture readings if available</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (Select based on safety and habitability)
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-4 mb-3">
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
                
                {/* Urgency Level Descriptions */}
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="text-sm font-semibold text-green-900">Standard (24-48 hours)</p>
                        <p className="text-xs text-green-700">Minor damage, property is habitable, no immediate safety concerns. Example: Small water stain, minor mould spot.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="text-sm font-semibold text-orange-900">Urgent (4-12 hours)</p>
                        <p className="text-xs text-orange-700">Significant damage affecting habitability, spreading damage risk. Example: Active water leak, large mould area, smoke damage.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                      <div>
                        <p className="text-sm font-semibold text-red-900">Emergency (Within 2 hours)</p>
                        <p className="text-xs text-red-700">Property uninhabitable, immediate safety risk, ongoing severe damage. Example: Major flooding, fire damage, sewage overflow, structural damage.</p>
                      </div>
                    </div>
                  </div>
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